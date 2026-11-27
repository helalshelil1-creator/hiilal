/* ========================================
   تحديث أسعار السوق المصري أسبوعياً
   المصدر المجاني: QS Mind (prices.qsmind.app) — أسعار القاهرة الكبرى،
   تُفحص يومياً وتُعرض بتاريخ جمعها وشروطها.
   يقرأ الصفحات العامة، يستخرج الأرقام بحدود منطقية، ويكتب
   js/data/market-prices.js فقط عند نجاح الاستخراج.
   عند فشل أي بند يُبقي قيمته القديمة ولا يكسر الملف.
======================================== */

import { readFileSync, writeFileSync } from "node:fs";

const FILE = "js/data/market-prices.js";
const BASE = "https://prices.qsmind.app/en/egypt";

const MONTHS = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function stripHtml(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'")
        .replace(/\s+/g, " ");
}

function isoDate(d, mon, y) {
    return `${y}-${MONTHS[mon]}-${String(d).padStart(2, "0")}`;
}

/* يستخرج «اسم البند ... PRICE per UNIT DD Mon YYYY» من نص الصفحة */
function extract(text, itemName, unit, bounds) {
    const i = text.indexOf(itemName);
    if (i === -1) return null;
    const win = text.slice(i, i + 900);
    const re = new RegExp(`([\\d,]+\\.\\d{2}) per ${unit} (\\d{1,2}) (\\w{3}) (\\d{4})`);
    const m = win.match(re);
    if (!m) return null;
    const price = Math.round(parseFloat(m[1].replace(/,/g, "")));
    if (price < bounds[0] || price > bounds[1]) return null;
    return { price, updated: isoDate(+m[2], m[3], m[4]) };
}

/* متوسط أسعار الحديد المعلنة في صفحة مصر الرئيسية */
function rebarAverage(text) {
    const re = /([A-Za-z][\w .'-]*[Rr]ebar)[^]{0,500}?([\d,]+\.\d{2}) per ton (\d{1,2}) (\w{3}) (\d{4})/g;
    let m, sum = 0, n = 0, latest = null;
    while ((m = re.exec(text))) {
        const price = parseFloat(m[2].replace(/,/g, ""));
        if (price < 20000 || price > 80000) continue;
        sum += price; n++;
        const d = isoDate(+m[3], m[4], m[5]);
        if (!latest || d > latest) latest = d;
    }
    if (n < 5) return null;
    return { price: Math.round(sum / n / 50) * 50, updated: latest, count: n };
}

async function get(path) {
    const r = await fetch(BASE + path, { headers: { "user-agent": "hiilal-price-updater/1.0" } });
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    return stripHtml(await r.text());
}

const today = new Date().toISOString().slice(0, 10);
const rawFile = readFileSync(FILE, "utf8").match(/const MARKET_PRICES = (\{[\s\S]*?\});\s*\n\s*window\.MARKET_PRICES/);
if (!rawFile) throw new Error("could not parse market-prices.js");
const cur = JSON.parse(rawFile[1]);

let changed = false;
const fails = [];

try {
    const [cement, aggregates, concrete, index] = await Promise.all([
        get("/cement"), get("/aggregates"), get("/concrete"), get("/")
    ]);

    const jobs = [
        ["cementBag", extract(cement, "Grey cement, retail bag", "bag 50 kg", [100, 600]),
            v => ({ price: v.price, unit: "شكارة 50 كجم", updated: v.updated, source: "أسمنت رمادي 42.5، سعر شكارة التجزئة للمستهلك (QS Mind)" })],
        ["sandM3", extract(aggregates, "Coarse sand", "m³", [50, 600]),
            v => ({ price: v.price, unit: "م³", updated: v.updated, source: "رمل خشن، متوسط سعر السوق شامل الضريبة وغير شامل النقل (QS Mind)" })],
        ["gravelM3", extract(aggregates, "Natural gravel", "m³", [100, 1000]),
            v => ({ price: v.price, unit: "م³", updated: v.updated, source: "زلط طبيعي للخرسانة، توريد الموقع بحمولة كاملة شامل الضريبة (QS Mind)" })],
        ["readyMixM3", extract(concrete, "Ready-mix concrete 300", "m³", [1500, 10000]),
            v => ({ price: v.price, unit: "م³", updated: v.updated, source: "خرسانة جاهزة C300 توريد داخل القاهرة الكبرى شامل الضريبة، المضخة بسعر منفصل (QS Mind)" })],
        ["rebarTon", rebarAverage(index),
            v => ({ price: v.price, unit: "طن", updated: v.updated, source: `متوسط الأسعار المعلنة لـ ${v.count} مصنعاً (QS Mind) — غالبها تسليم أرض المصنع؛ سعر المستهلك أعلى بالنقل والتوزيع` })]
    ];

    for (const [key, val, build] of jobs) {
        if (!val) { fails.push(key); continue; }
        const next = build(val);
        if (JSON.stringify(cur.items[key]) !== JSON.stringify(next)) {
            cur.items[key] = next;
            changed = true;
        }
    }
} catch (e) {
    console.error("fetch failed, keeping current prices:", e.message);
    process.exit(0);
}

if (!changed) {
    console.log("no change; skipped items:", fails.join(", ") || "none");
    process.exit(0);
}

cur.updated = today;

const out = `/* ========================================
   أسعار السوق المصري — القاهرة الكبرى (ج.م)
   تُحدَّث تلقائياً كل أسبوع عبر GitHub Action
   (scripts/update-market-prices.mjs — المصدر: prices.qsmind.app)
   كل الأسعار استرشادية وتختلف حسب المحافظة والمورد والكمية.
======================================== */

const MARKET_PRICES = ${JSON.stringify(cur, null, 4)};

window.MARKET_PRICES = MARKET_PRICES;
`;

writeFileSync(FILE, out);
console.log("updated:", Object.keys(cur.items).map(k => `${k}=${cur.items[k].price}`).join(" "), "| skipped:", fails.join(", ") || "none");
