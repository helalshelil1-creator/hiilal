/* ========================================
   DATA - كل بيانات الموقع
   الإصدار: 2.0 — مع حاسبات وموسوعة موسّعة
======================================== */

/* ========================================
   1. التصنيفات
======================================== */
const CATEGORIES = [
    { id: "design",        name: "التصميم",            icon: "target",         desc: "أدوات وحاسبات التصميم الكهربائي" },
    { id: "site",          name: "التنفيذ",            icon: "hard-hat",       desc: "أدوات مهندس الموقع والتنفيذ" },
    { id: "technical",     name: "المكتب الفني",       icon: "clipboard-list", desc: "المستندات والشوب دروينج" },
    { id: "takeoff",       name: "الحصر",              icon: "bar-chart",      desc: "حصر الكميات وإعداد BOQ" },
    { id: "mep",           name: "MEP",                icon: "wrench",         desc: "الميكانيكا والكهرباء والسباكة" },
    { id: "fire-alarm",    name: "إنذار الحريق",       icon: "alert-triangle", desc: "أنظمة إنذار الحريق" },
    { id: "fire-fighting", name: "مكافحة الحريق",      icon: "flame",          desc: "أنظمة مكافحة الحريق" },
    { id: "elv",           name: "التيار الخفيف",      icon: "radio",          desc: "CCTV, Data, Access, BMS" },
    { id: "bim",           name: "BIM / Revit",        icon: "box",            desc: "نمذجة معلومات البناء" },
    { id: "testing",       name: "الاختبار والتشغيل",  icon: "activity",       desc: "اختبار وتشغيل الأنظمة" },
    { id: "maintenance",   name: "الصيانة",            icon: "settings",       desc: "الصيانة الدورية" },
    { id: "library",       name: "المكتبة",            icon: "library",        desc: "الأكواد والمواصفات والمراجع" }
];

/* ========================================
   2. الأدوات
======================================== */
const TOOLS = [
    { id: "cable-breaker", name: "حاسبة الكابل والقاطع", nameEn: "Cable & Breaker Calculator", category: "design", icon: "plug", desc: "اختيار مقطع الكابل والقاطع المناسب تلقائيًا حسب IEC 60364.", url: "calculators/cable-breaker.html", badge: "NEW" },
    { id: "unit-converter", name: "محول الوحدات", nameEn: "Unit Converter", category: "design", icon: "refresh", desc: "محول شامل للوحدات الهندسية — الطول، القدرة، الضغط، الحرارة.", url: "tools/unit-converter.html", badge: "NEW" },
    { id: "ip-rating", name: "دليل أكواد IP", nameEn: "IP Rating Guide", category: "design", icon: "shield-check", desc: "دليل شامل لأكواد الحماية IP ضد الغبار والماء.", url: "tools/ip-rating.html", badge: "NEW" },
    { id: "site-inspection", name: "Checklist فحص الموقع", nameEn: "Site Inspection Checklist", category: "site", icon: "clipboard-list", desc: "قائمة فحص شاملة لزيارة الموقع — الكهرباء، MEP، السلامة.", url: "tools/checklists.html#site", badge: "NEW" },
    { id: "testing-checklist", name: "Checklist الاختبار", nameEn: "Testing & Commissioning", category: "testing", icon: "check", desc: "قائمة فحص الاختبار والتشغيل — Megger، Continuity، Earth Loop.", url: "tools/checklists.html#testing", badge: "NEW" },
    { id: "safety-checklist", name: "Checklist السلامة", nameEn: "Safety Checklist", category: "site", icon: "shield-check", desc: "قائمة فحص السلامة اليومية — PPE، Toolbox Talk، مخاطر الموقع.", url: "tools/checklists.html#safety", badge: "NEW" },
    { id: "cable-schedule", name: "جدول الكابلات", nameEn: "Cable Schedule Template", category: "technical", icon: "file-text", desc: "نموذج جدول كابلات جاهز للتعبئة مع حفظ تلقائي وطباعة.", url: "tools/schedules.html#cable", badge: "NEW" },
    { id: "panel-schedule", name: "جدول اللوحة", nameEn: "Panel Schedule", category: "technical", icon: "grid", desc: "نموذج جدول لوحة توزيع — الأبواب، الدوائر، الأحمال.", url: "tools/schedules.html#panel", badge: "NEW" },
    { id: "load-schedule", name: "جدول الأحمال", nameEn: "Load Schedule", category: "technical", icon: "bar-chart", desc: "نموذج جدول أحمال مع حساب تلقائي للحمل التصميمي.", url: "tools/schedules.html#load", badge: "NEW" },
    { id: "boq-template", name: "جدول الكميات BOQ", nameEn: "Bill of Quantities", category: "takeoff", icon: "calculator", desc: "نموذج BOQ جاهز — البند، الوحدة، الكمية، السعر.", url: "tools/schedules.html#boq", badge: "NEW" },
    { id: "rfi-template", name: "طلب استفسار فني RFI", nameEn: "Request for Information", category: "technical", icon: "info", desc: "نموذج RFI جاهز للإرسال للاستشاري.", url: "tools/documents.html#rfi", badge: "NEW" },
    { id: "submittal", name: "اعتماد المواد", nameEn: "Material Submittal", category: "technical", icon: "package", desc: "نموذج تقديم المواد للاعتماد من الاستشاري.", url: "tools/documents.html#submittal", badge: "NEW" },
    { id: "variation", name: "أمر التغيير", nameEn: "Variation Order", category: "technical", icon: "edit", desc: "نموذج أمر التغيير للأعمال الإضافية مع التسعير.", url: "tools/documents.html#variation", badge: "NEW" }
];

/* ========================================
   3. الحاسبات (موسّعة — 15 حاسبة)
======================================== */
const CALCULATORS = [
    {
        id: "cable-breaker-calc",
        name: "حاسبة الكابل والقاطع",
        nameEn: "Cable & Breaker Calculator",
        category: "design",
        icon: "plug",
        desc: "اختيار مقطع الكابل والقاطع المناسب تلقائيًا",
        externalUrl: "calculators/cable-breaker.html"
    },
    {
        id: "load-current",
        name: "حساب تيار الحمل",
        nameEn: "Load Current Calculator",
        category: "design",
        icon: "zap",
        desc: "حساب تيار الحمل من القدرة والجهد ومعامل القدرة.",
        inputs: [
            { id: "power", label: "القدرة", unit: "kW", type: "number", required: true, min: 0.001 },
            { id: "voltage", label: "الجهد", unit: "V", type: "number", required: true, min: 1, default: 380 },
            { id: "phase", label: "النظام", type: "select", options: [{ value: "3", label: "3 فاز" }, { value: "1", label: "1 فاز" }] },
            { id: "pf", label: "معامل القدرة", type: "number", required: true, min: 0.1, max: 1, step: 0.01, default: 0.85 }
        ],
        calculate(v) {
            const P = Number(v.power) * 1000;
            const V = Number(v.voltage);
            const PF = Number(v.pf);
            const is3Ph = v.phase === "3";
            if (P <= 0 || V <= 0 || PF <= 0 || PF > 1) return { error: "تحقق من المدخلات" };
            const sqrt3 = Math.sqrt(3);
            const I = is3Ph ? P / (sqrt3 * V * PF) : P / (V * PF);
            return {
                results: [
                    { label: "تيار الحمل I", value: I.toFixed(2), unit: "A" },
                    { label: "القدرة الظاهرة S", value: (P / PF / 1000).toFixed(2), unit: "kVA" }
                ],
                formula: is3Ph ? "I = P / (√3 × V × PF)" : "I = P / (V × PF)",
                steps: [`P = ${P} W`, `V = ${V} V, PF = ${PF}`, `I = ${I.toFixed(2)} A`],
                notes: [],
                references: ["IEC 60364-5-52"]
            };
        }
    },
    {
        id: "voltage-drop",
        name: "هبوط الجهد",
        nameEn: "Voltage Drop Calculator",
        category: "design",
        icon: "trending-down",
        desc: "حساب الهبوط في الجهد على طول الكابل.",
        inputs: [
            { id: "current", label: "التيار", unit: "A", type: "number", required: true, min: 0.01 },
            { id: "length", label: "الطول", unit: "m", type: "number", required: true, min: 0.1 },
            { id: "mvAm", label: "mV/A/m", unit: "mV/A/m", type: "number", required: true, min: 0.001 },
            { id: "voltage", label: "الجهد", unit: "V", type: "number", required: true, min: 1, default: 380 },
            { id: "phase", label: "النظام", type: "select", options: [{ value: "3", label: "3 فاز" }, { value: "1", label: "1 فاز" }] },
            { id: "maxDrop", label: "أقصى هبوط مسموح", unit: "%", type: "number", default: 5, min: 0.5, max: 20 }
        ],
        calculate(v) {
            const I = Number(v.current);
            const L = Number(v.length);
            const mvAm = Number(v.mvAm);
            const V = Number(v.voltage);
            const is3Ph = v.phase === "3";
            const maxDrop = Number(v.maxDrop) || 5;
            if (I <= 0 || L <= 0 || mvAm <= 0 || V <= 0) return { error: "تحقق من القيم" };
            const sqrt3 = Math.sqrt(3);
            let Vd, formula;
            if (is3Ph) {
                Vd = (sqrt3 * mvAm * I * L) / 1000;
                formula = "ΔV = (√3 × mV/A/m × I × L) / 1000";
            } else {
                Vd = (2 * mvAm * I * L) / 1000;
                formula = "ΔV = (2 × mV/A/m × I × L) / 1000";
            }
            const percent = (Vd / V) * 100;
            const pass = percent <= maxDrop;
            return {
                results: [
                    { label: "الهبوط ΔV", value: Vd.toFixed(2), unit: "V" },
                    { label: "النسبة", value: percent.toFixed(2), unit: "%" },
                    { label: "الحالة", value: pass ? "مقبول ✓" : "مرفوض ✗", unit: "" }
                ],
                formula: formula,
                steps: [`ΔV = ${Vd.toFixed(2)} V`, `${percent.toFixed(2)}% من ${V}V`],
                notes: [pass ? "الهبوط داخل الحد المسموح." : "الهبوط يتجاوز الحد — قلل الطول أو زوّد المقطع."],
                references: ["IEC 60364-5-52", "BS 7671"]
            };
        }
    },
    {
        id: "pf-correction",
        name: "تحسين معامل القدرة",
        nameEn: "Power Factor Correction",
        category: "design",
        icon: "battery",
        desc: "حساب سعة المكثفات المطلوبة.",
        inputs: [
            { id: "p", label: "القدرة الفعالة", unit: "kW", type: "number", required: true, min: 0.001 },
            { id: "pf1", label: "PF الحالي", type: "number", required: true, min: 0.1, max: 1, step: 0.01 },
            { id: "pf2", label: "PF المستهدف", type: "number", required: true, min: 0.1, max: 1, step: 0.01, default: 0.95 }
        ],
        calculate(v) {
            const P = Number(v.p) * 1000;
            const pf1 = Number(v.pf1);
            const pf2 = Number(v.pf2);
            if (P <= 0 || pf1 <= 0 || pf1 > 1 || pf2 <= 0 || pf2 > 1) return { error: "تحقق" };
            if (pf2 <= pf1) return { error: "PF المستهدف > الحالي" };
            const phi1 = Math.acos(pf1);
            const phi2 = Math.acos(pf2);
            const Qc = P * (Math.tan(phi1) - Math.tan(phi2));
            return {
                results: [
                    { label: "Qc", value: (Qc / 1000).toFixed(2), unit: "kVAR" },
                    { label: "φ1", value: (phi1 * 180 / Math.PI).toFixed(2), unit: "°" },
                    { label: "φ2", value: (phi2 * 180 / Math.PI).toFixed(2), unit: "°" }
                ],
                formula: "Qc = P × (tan φ1 − tan φ2)",
                steps: [`Qc = ${(Qc / 1000).toFixed(2)} kVAR`],
                notes: ["اختر أقرب قيمة قياسية من كتالوج المصنّع."],
                references: ["IEC 60831", "IEEE 1036"]
            };
        }
    },
    {
        id: "motor-current",
        name: "تيار الموتور",
        nameEn: "Motor Current Calculator",
        category: "design",
        icon: "settings",
        desc: "حساب تيار الحمل الكامل للموتور.",
        inputs: [
            { id: "kw", label: "القدرة", unit: "kW", type: "number", required: true, min: 0.01 },
            { id: "voltage", label: "الجهد", unit: "V", type: "number", required: true, min: 1, default: 380 },
            { id: "pf", label: "PF", type: "number", required: true, min: 0.1, max: 1, default: 0.85, step: 0.01 },
            { id: "eff", label: "الكفاءة", unit: "%", type: "number", required: true, min: 1, max: 100, default: 90 }
        ],
        calculate(v) {
            const P = Number(v.kw) * 1000;
            const V = Number(v.voltage);
            const PF = Number(v.pf);
            const eff = Number(v.eff) / 100;
            if (P <= 0 || V <= 0 || PF <= 0 || PF > 1 || eff <= 0 || eff > 1) return { error: "تحقق" };
            const I = P / (Math.sqrt(3) * V * PF * eff);
            return {
                results: [
                    { label: "FLC", value: I.toFixed(2), unit: "A" },
                    { label: "تيار البدء (تقديري)", value: (I * 6).toFixed(1), unit: "A" },
                    { label: "القاطع المقترح", value: Math.ceil(I * 1.25), unit: "A" }
                ],
                formula: "I = P / (√3 × V × PF × η)",
                steps: [`I = ${I.toFixed(2)} A`],
                notes: ["تيار البدء عادة 6-8 أضعاف FLC.", "القاطع = 1.25 × FLC"],
                references: ["IEC 60034-1"]
            };
        }
    },
    {
        id: "lighting-design",
        name: "تصميم الإضاءة",
        nameEn: "Lighting Design",
        category: "design",
        icon: "lightbulb",
        desc: "حساب عدد وحدات الإضاءة بطريقة اللومن.",
        inputs: [
            { id: "lux", label: "الإضاءة E", unit: "lux", type: "number", required: true, min: 1, default: 500 },
            { id: "area", label: "المساحة", unit: "m²", type: "number", required: true, min: 0.1 },
            { id: "lumens", label: "Φ الوحدة", unit: "lm", type: "number", required: true, min: 1, default: 3500 },
            { id: "uf", label: "UF", type: "number", default: 0.7, min: 0.1, max: 1, step: 0.01 },
            { id: "mf", label: "MF", type: "number", default: 0.8, min: 0.1, max: 1, step: 0.01 }
        ],
        calculate(v) {
            const E = Number(v.lux);
            const A = Number(v.area);
            const Phi = Number(v.lumens);
            const UF = Number(v.uf);
            const MF = Number(v.mf);
            if (E <= 0 || A <= 0 || Phi <= 0 || UF <= 0 || MF <= 0) return { error: "كل القيم موجبة" };
            const N = (E * A) / (Phi * UF * MF);
            return {
                results: [
                    { label: "عدد الوحدات", value: N.toFixed(2), unit: "وحدة" },
                    { label: "تقريب لأعلى", value: Math.ceil(N), unit: "وحدة" }
                ],
                formula: "N = (E × A) / (Φ × UF × MF)",
                steps: [`N = ${N.toFixed(2)}`, `تقريب = ${Math.ceil(N)} وحدة`],
                notes: ["التوزيع الفعلي يحتاج برنامج مثل DIALux."],
                references: ["EN 12464-1", "IES"]
            };
        }
    },
    {
        id: "earthing-resistance",
        name: "حساب التأريض",
        nameEn: "Earthing Resistance",
        category: "design",
        icon: "anchor",
        desc: "حساب مقاومة قضيب التأريض.",
        inputs: [
            { id: "rho", label: "مقاومة التربة ρ", unit: "Ω·m", type: "number", required: true, min: 0.1, default: 100 },
            { id: "length", label: "طول القضيب L", unit: "m", type: "number", required: true, min: 0.1, default: 3 },
            { id: "diameter", label: "قطر القضيب d", unit: "mm", type: "number", required: true, min: 1, default: 16 }
        ],
        calculate(v) {
            const rho = Number(v.rho);
            const L = Number(v.length);
            const d = Number(v.diameter) / 1000;
            if (rho <= 0 || L <= 0 || d <= 0) return { error: "تحقق" };
            const R = (rho / (2 * Math.PI * L)) * (Math.log(8 * L / d) - 1);
            return {
                results: [
                    { label: "مقاومة القضيب الواحد", value: R.toFixed(2), unit: "Ω" }
                ],
                formula: "R = (ρ / 2πL) × [ln(8L/d) − 1]",
                steps: [`R = ${R.toFixed(2)} Ω`],
                notes: ["لعدة أقطاب: R_total = R × (1 + K) / n"],
                references: ["IEEE 80", "BS 7430"]
            };
        }
    },
    {
        id: "battery-bank",
        name: "حساب بنك البطاريات",
        nameEn: "Battery Bank Calculator",
        category: "design",
        icon: "battery",
        desc: "حساب سعة البطاريات المطلوبة لـ UPS أو Solar.",
        inputs: [
            { id: "load", label: "الحمل", unit: "kW", type: "number", required: true, min: 0.01 },
            { id: "voltage", label: "جهد النظام", unit: "V", type: "number", required: true, min: 12, default: 48 },
            { id: "backup", label: "مدة الاحتياط", unit: "hours", type: "number", required: true, min: 0.1, default: 2 },
            { id: "efficiency", label: "كفاءة النظام", unit: "%", type: "number", default: 90, min: 50, max: 100 },
            { id: "dod", label: "عمق التفريغ DoD", unit: "%", type: "number", default: 80, min: 30, max: 100 }
        ],
        calculate(v) {
            const P = Number(v.load) * 1000;
            const V = Number(v.voltage);
            const t = Number(v.backup);
            const eff = Number(v.efficiency) / 100;
            const dod = Number(v.dod) / 100;
            if (P <= 0 || V <= 0 || t <= 0) return { error: "تحقق" };
            const Wh = P * t;
            const Ah = Wh / (V * eff * dod);
            return {
                results: [
                    { label: "الطاقة المطلوبة", value: (Wh / 1000).toFixed(2), unit: "kWh" },
                    { label: "السعة المطلوبة", value: Ah.toFixed(1), unit: "Ah" },
                    { label: "عدد بطاريات 100Ah", value: Math.ceil(Ah / 100), unit: "بطارية" }
                ],
                formula: "Ah = (P × t) / (V × η × DoD)",
                steps: [`Energy = ${(Wh/1000).toFixed(2)} kWh`, `Capacity = ${Ah.toFixed(1)} Ah`],
                references: ["IEEE 1188", "IEC 60896"]
            };
        }
    },
    {
        id: "ups-sizing",
        name: "حساب قدرة UPS",
        nameEn: "UPS Sizing",
        category: "design",
        icon: "battery",
        desc: "اختيار UPS المناسب للأحمال.",
        inputs: [
            { id: "totalLoad", label: "الحمل الإجمالي", unit: "kW", type: "number", required: true, min: 0.01 },
            { id: "pf", label: "معامل القدرة", type: "number", default: 0.9, min: 0.1, max: 1, step: 0.01 },
            { id: "future", label: "هامش مستقبلي", unit: "%", type: "number", default: 25, min: 0, max: 50 }
        ],
        calculate(v) {
            const P = Number(v.totalLoad);
            const pf = Number(v.pf);
            const future = Number(v.future) / 100;
            if (P <= 0 || pf <= 0) return { error: "تحقق" };
            const S = P / pf;
            const S_future = S * (1 + future);
            return {
                results: [
                    { label: "القدرة الظاهرة", value: S.toFixed(2), unit: "kVA" },
                    { label: "مع هامش", value: S_future.toFixed(2), unit: "kVA" },
                    { label: "UPS المقترح", value: Math.ceil(S_future / 10) * 10, unit: "kVA" }
                ],
                formula: "S = P / PF × (1 + Future)",
                steps: [`S = ${S_future.toFixed(2)} kVA`],
                notes: ["اختر UPS بقدرة أقرب قيمة قياسية أعلى."],
                references: ["IEC 62040"]
            };
        }
    },
    {
        id: "concrete-volume",
        name: "حساب حجم الخرسانة",
        nameEn: "Concrete Volume",
        category: "takeoff",
        icon: "building",
        desc: "حساب حجم الخرسانة للأساسات والكمرات.",
        inputs: [
            { id: "length", label: "الطول", unit: "m", type: "number", required: true, min: 0.01 },
            { id: "width", label: "العرض", unit: "m", type: "number", required: true, min: 0.01 },
            { id: "depth", label: "الارتفاع", unit: "m", type: "number", required: true, min: 0.01 },
            { id: "count", label: "العدد", type: "number", default: 1, min: 1 }
        ],
        calculate(v) {
            const L = Number(v.length);
            const W = Number(v.width);
            const D = Number(v.depth);
            const N = Number(v.count);
            if (L <= 0 || W <= 0 || D <= 0) return { error: "تحقق" };
            const V = L * W * D * N;
            return {
                results: [
                    { label: "حجم الخرسانة", value: V.toFixed(2), unit: "m³" },
                    { label: "الأسمنت (~350 kg/m³)", value: (V * 350).toFixed(0), unit: "kg" },
                    { label: "الرمل", value: (V * 0.4).toFixed(2), unit: "m³" },
                    { label: "السن", value: (V * 0.8).toFixed(2), unit: "m³" }
                ],
                formula: "V = L × W × D × N",
                steps: [`V = ${V.toFixed(2)} m³`],
                notes: ["نسب تقريبية لخرسانة 350 kg/m³"],
                references: ["ECP", "ACI 211"]
            };
        }
    },
    {
        id: "paint-quantity",
        name: "حساب كمية الدهان",
        nameEn: "Paint Quantity",
        category: "takeoff",
        icon: "package",
        desc: "حساب كمية الدهان المطلوبة للجدران.",
        inputs: [
            { id: "area", label: "المساحة الكلية", unit: "m²", type: "number", required: true, min: 0.1 },
            { id: "coats", label: "عدد الأوجه", type: "number", default: 2, min: 1, max: 5 },
            { id: "coverage", label: "التغطية", unit: "m²/L", type: "number", default: 10, min: 1 }
        ],
        calculate(v) {
            const A = Number(v.area);
            const coats = Number(v.coats);
            const cov = Number(v.coverage);
            if (A <= 0 || cov <= 0) return { error: "تحقق" };
            const L = (A * coats) / cov;
            const buckets = Math.ceil(L / 18);
            return {
                results: [
                    { label: "كمية الدهان", value: L.toFixed(2), unit: "لتر" },
                    { label: "عدد الجالونات (18L)", value: buckets, unit: "جالون" }
                ],
                formula: "L = (Area × Coats) / Coverage",
                steps: [`L = ${L.toFixed(2)}`],
                references: ["Jotun", "Sipes"]
            };
        }
    },
    {
        id: "brick-quantity",
        name: "حساب عدد الطوب",
        nameEn: "Brick Quantity",
        category: "takeoff",
        icon: "building",
        desc: "حساب عدد الطوب لبناء حائط.",
        inputs: [
            { id: "area", label: "مساحة الحائط", unit: "m²", type: "number", required: true, min: 0.1 },
            { id: "thickness", label: "سماكة الحائط", type: "select", options: [
                { value: "12", label: "12 سم (نصف طوبة)" },
                { value: "25", label: "25 سم (طوبة كاملة)" }
            ]},
            { id: "brickSize", label: "حجم الطوبة", type: "select", options: [
                { value: "standard", label: "قياسي (25×12×6)" },
                { value: "big", label: "كبير (40×20×20)" }
            ]}
        ],
        calculate(v) {
            const A = Number(v.area);
            const thick = Number(v.thickness);
            const sizes = {
                standard: { perM2: 60, perM2Half: 30 },
                big: { perM2: 13, perM2Half: 6.5 }
            };
            const s = sizes[v.brickSize] || sizes.standard;
            const perM2 = thick === 12 ? s.perM2Half : s.perM2;
            const total = A * perM2;
            const totalWaste = total * 1.05;
            return {
                results: [
                    { label: "عدد الطوب", value: Math.ceil(total), unit: "طوبة" },
                    { label: "مع هامش 5%", value: Math.ceil(totalWaste), unit: "طوبة" }
                ],
                formula: "N = Area × Bricks/m²",
                steps: [`N = ${A} × ${perM2} = ${Math.ceil(total)}`],
                references: ["ECP", "Egyptian Standards"]
            };
        }
    },
    {
        id: "cable-tray",
        name: "حساب طول التراي",
        nameEn: "Cable Tray Length",
        category: "takeoff",
        icon: "layers",
        desc: "حساب طول التراي المطلوب مع الأكواع.",
        inputs: [
            { id: "straight", label: "الطول المستقيم", unit: "m", type: "number", required: true, min: 0.1 },
            { id: "bends", label: "عدد الأكواع", type: "number", default: 4, min: 0 },
            { id: "rises", label: "عدد الصواعد", type: "number", default: 2, min: 0 },
            { id: "floorHeight", label: "ارتفاع الدور", unit: "m", type: "number", default: 3.5, min: 2 }
        ],
        calculate(v) {
            const S = Number(v.straight);
            const B = Number(v.bends);
            const R = Number(v.rises);
            const h = Number(v.floorHeight);
            if (S <= 0) return { error: "تحقق" };
            const riseLength = R * h;
            const bendLength = B * 0.3;
            const total = S + riseLength + bendLength;
            const withWaste = total * 1.07;
            return {
                results: [
                    { label: "الطول الكلي", value: total.toFixed(2), unit: "m" },
                    { label: "مع هامش 7%", value: withWaste.toFixed(2), unit: "m" }
                ],
                formula: "L = Straight + Rises × h + Bends × 0.3",
                steps: [`Total = ${total.toFixed(2)} m`],
                references: ["NEMA VE 1"]
            };
        }
    },
    {
        id: "cooling-load",
        name: "حمل التكييف",
        nameEn: "Cooling Load",
        category: "mep",
        icon: "wind",
        desc: "حساب الحمل الحراري للمساحة بطريقة Load Factor.",
        inputs: [
            { id: "area", label: "المساحة", unit: "m²", type: "number", required: true, min: 1 },
            { id: "type", label: "نوع المكان", type: "select", options: [
                { value: "res", label: "سكني (40 W/m²)" },
                { value: "office", label: "مكاتب (60 W/m²)" },
                { value: "restaurant", label: "مطاعم (120 W/m²)" },
                { value: "mall", label: "مولات (100 W/m²)" },
                { value: "hospital", label: "مستشفيات (120 W/m²)" }
            ]}
        ],
        calculate(v) {
            const A = Number(v.area);
            const loadFactors = { res: 40, office: 60, restaurant: 120, mall: 100, hospital: 120 };
            const lf = loadFactors[v.type] || 60;
            if (A <= 0) return { error: "تحقق" };
            const Q_W = A * lf;
            const Q_kW = Q_W / 1000;
            const Q_TR = Q_kW / 3.517;
            return {
                results: [
                    { label: "الحمل", value: Q_kW.toFixed(2), unit: "kW" },
                    { label: "الحمل", value: Q_TR.toFixed(2), unit: "TR" },
                    { label: "الحمل", value: (Q_W * 3.412 / 1000).toFixed(1), unit: "kBTU/hr" }
                ],
                formula: "Q = Area × Load Factor",
                steps: [`Q = ${A} × ${lf} = ${Q_W} W`],
                notes: ["هذا تقدير مبدئي — للحساب الدقيق استخدم HAP."],
                references: ["ASHRAE Handbook"]
            };
        }
    },
    {
        id: "duct-sizing",
        name: "تصميم الدكتات",
        nameEn: "Duct Sizing",
        category: "mep",
        icon: "wind",
        desc: "حساب أبعاد الدكت من معدل التدفق.",
        inputs: [
            { id: "cfm", label: "معدل التدفق", unit: "CFM", type: "number", required: true, min: 1 },
            { id: "velocity", label: "السرعة المسموحة", unit: "fpm", type: "number", default: 1200, min: 400, max: 2500 },
            { id: "shape", label: "الشكل", type: "select", options: [
                { value: "round", label: "دائري" },
                { value: "square", label: "مربع" }
            ]}
        ],
        calculate(v) {
            const CFM = Number(v.cfm);
            const V = Number(v.velocity);
            if (CFM <= 0 || V <= 0) return { error: "تحقق" };
            const area_ft2 = CFM / V;
            const area_in2 = area_ft2 * 144;
            const diameter_in = Math.sqrt((4 * area_in2) / Math.PI);
            const side_in = Math.sqrt(area_in2);
            return {
                results: [
                    { label: "المساحة", value: area_in2.toFixed(2), unit: "in²" },
                    { label: "القطر (دائري)", value: diameter_in.toFixed(1), unit: "inch" },
                    { label: "الضلع (مربع)", value: side_in.toFixed(1), unit: "inch" }
                ],
                formula: "A = Q / V",
                steps: [`A = ${area_in2.toFixed(2)} in²`],
                notes: ["السرعة الموصى بها: 1000-1500 fpm للمكاتب"],
                references: ["ASHRAE", "SMACNA"]
            };
        }
    },
    {
        id: "water-demand",
        name: "حساب احتياج المياه",
        nameEn: "Water Demand",
        category: "mep",
        icon: "droplet",
        desc: "حساب الاحتياج اليومي والأقصى من المياه.",
        inputs: [
            { id: "occupants", label: "عدد الأفراد", type: "number", required: true, min: 1 },
            { id: "perCapita", label: "استهلاك الفرد", unit: "L/day", type: "number", default: 200, min: 20 },
            { id: "peakFactor", label: "معامل الذروة", type: "number", default: 2.5, min: 1, max: 4, step: 0.1 }
        ],
        calculate(v) {
            const N = Number(v.occupants);
            const L = Number(v.perCapita);
            const pf = Number(v.peakFactor);
            if (N <= 0 || L <= 0) return { error: "تحقق" };
            const daily = N * L;
            const peak = daily * pf;
            const peakFlow = peak / (24 * 3600) * 1000;
            return {
                results: [
                    { label: "الاستهلاك اليومي", value: (daily / 1000).toFixed(2), unit: "m³/day" },
                    { label: "الاستهلاك الأقصى", value: (peak / 1000).toFixed(2), unit: "m³/day" },
                    { label: "معدل التدفق الذروة", value: peakFlow.toFixed(2), unit: "L/s" }
                ],
                formula: "Q = N × Consumption × Peak Factor",
                steps: [`Q_daily = ${(daily/1000).toFixed(2)} m³/day`],
                references: ["IPC", "ASPE"]
            };
        }
    }
];

/* ========================================
   4. الموسوعة (موسّعة)
======================================== */
const ENCYCLOPEDIA = [
    {
        id: "fundamentals",
        name: "أساسيات الكهرباء",
        nameEn: "Electrical Fundamentals",
        icon: "zap",
        desc: "القوانين والمفاهيم الأساسية — أوم، قدرة، AC/DC، معامل القدرة.",
        topics: [
            {
                id: "ohms-law",
                title: "قانون أوم",
                titleEn: "Ohm's Law",
                summary: "العلاقة بين الجهد والتيار والمقاومة.",
                sections: [
                    { type: "text", title: "📖 التعريف", content: "ينص قانون أوم على أن شدة التيار المار في موصل تتناسب طرديًا مع فرق الجهد بين طرفيه، وعكسيًا مع مقاومته، بشرط ثبات درجة الحرارة." },
                    { type: "formula", title: "📐 القانون", formula: "V = I × R", units: "V: Volt | I: Ampere | R: Ohm", variants: ["I = V / R", "R = V / I", "P = V × I = I²R = V²/R"] },
                    { type: "list", title: "💡 تطبيقات عملية", items: ["حساب التيار في مقاومة معروفة", "حساب المقاومة المطلوبة لحماية LED", "حساب هبوط الجهد على طول سلك", "حساب القدرة المبددة كحرارة"] },
                    { type: "table", title: "📊 أمثلة محلولة", headers: ["V", "R", "I", "P"], rows: [["12V", "6Ω", "2A", "24W"], ["220V", "44Ω", "5A", "1100W"], ["380V", "10Ω", "38A", "14.4kW"]] }
                ],
                references: [
                    { name: "IEC 60050-131 — International Electrotechnical Vocabulary", url: "https://webstore.iec.ch/publication/120", source: "IEC" }
                ],
                related: ["power-law", "pf"]
            },
            {
                id: "power-law",
                title: "القدرة الكهربائية",
                titleEn: "Electrical Power",
                summary: "حساب القدرة في الأنظمة أحادية وثلاثية الأوجه.",
                sections: [
                    { type: "formula", title: "📐 القوانين", formula: "P = V × I × cosφ", units: "Watt", variants: ["1φ: P = V × I × PF", "3φ: P = √3 × V × I × PF", "S = V × I (VA)", "Q = V × I × sinφ (VAR)", "S² = P² + Q²"] }
                ],
                references: [],
                related: ["ohms-law", "pf"]
            },
            {
                id: "pf",
                title: "معامل القدرة",
                titleEn: "Power Factor",
                summary: "قياس كفاءة استخدام الطاقة وطرق تحسينها.",
                sections: [
                    { type: "formula", title: "📐 القانون", formula: "PF = cos φ = P / S = kW / kVA", units: "0 إلى 1" },
                    { type: "table", title: "📊 قيم شائعة", headers: ["نوع الحمل", "PF التقريبي"], rows: [["محركات حثية", "0.7 - 0.85"], ["أفران قوسية", "0.6 - 0.7"], ["أفران حثية", "0.5 - 0.7"], ["أحمال إضاءة LED", "0.9 - 0.95"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "PF < 0.9 عادةً يؤدي لغرامات شهرية من شركة الكهرباء." }
                ],
                references: [],
                related: ["power-law"]
            },
            {
                id: "ac-dc",
                title: "التيار المتردد والمستمر",
                titleEn: "AC vs DC",
                summary: "الفرق بين AC و DC وقيم RMS و Peak.",
                sections: [
                    { type: "formula", title: "📐 قيم AC", formula: "V_rms = V_peak / √2 = 0.707 × V_peak", variants: ["V_peak = V_rms × 1.414", "V_avg (full wave) = 0.637 × V_peak"] },
                    { type: "table", title: "📊 مقارنة", headers: ["الخاصية", "AC", "DC"], rows: [["الاتجاه", "متغير", "ثابت"], ["التردد", "50/60 Hz", "0 Hz"], ["الاستخدام", "نقل الطاقة", "إلكترونيات"]] }
                ],
                references: [],
                related: ["power-law"]
            }
        ]
    },
    {
        id: "design",
        name: "التصميم الكهربائي",
        nameEn: "Electrical Design",
        icon: "target",
        desc: "أسس تصميم الأنظمة الكهربائية من البداية للتشغيل.",
        topics: [
            {
                id: "cable-sizing",
                title: "اختيار مقطع الكابل",
                titleEn: "Cable Sizing",
                summary: "4 شروط أساسية لاختيار الكابل المناسب.",
                sections: [
                    { type: "text", title: "📖 الشروط الأربعة", content: "(1) السعة الحرارية، (2) هبوط الجهد، (3) تيار القصر، (4) شروط التركيب." },
                    { type: "formula", title: "📐 الشرط الأساسي", formula: "Ib ≤ In ≤ Iz", variants: ["Ib = تيار التصميم", "In = القاطع المقنن", "Iz = تحمل الكابل"] },
                    { type: "formula", title: "📐 معاملات التخفيض", formula: "Iz = Iz_table × Ca × Cg × Ci" }
                ],
                references: [],
                related: ["voltage-drop"]
            },
            {
                id: "voltage-drop",
                title: "هبوط الجهد",
                titleEn: "Voltage Drop",
                summary: "حساب الهبوط والحدود المسموحة.",
                sections: [
                    { type: "formula", title: "📐 3-Phase", formula: "ΔV = (√3 × mV/A/m × I × L) / 1000", variants: ["1-Phase: ΔV = (2 × mV/A/m × I × L) / 1000"] },
                    { type: "table", title: "📊 الحدود المسموحة", headers: ["النظام", "حد الهبوط"], rows: [["إضاءة", "3%"], ["قوى", "5%"], ["إجمالي", "6%"]] }
                ],
                references: [],
                related: ["cable-sizing"]
            },
            {
                id: "load-estimation",
                title: "تقدير الأحمال",
                titleEn: "Load Estimation",
                summary: "حساب الحمل الكلي للمبنى بطريقة W/m².",
                sections: [
                    { type: "formula", title: "📐 القانون", formula: "Total Load = Σ (Area × Load Density × Diversity Factor)", units: "kW" },
                    { type: "table", title: "📊 كثافات الأحمال", headers: ["النوع", "W/m²"], rows: [["سكني فاخر", "40-60"], ["سكني عادي", "30-40"], ["مكاتب", "50-80"], ["مطاعم", "100-150"], ["مولات", "80-120"], ["مستشفيات", "100-150"]] }
                ],
                references: [],
                related: ["cable-sizing"]
            },
            {
                id: "short-circuit",
                title: "تيار القصر",
                titleEn: "Short Circuit Current",
                summary: "حساب تيارات القصر واختيار المعدات.",
                sections: [
                    { type: "formula", title: "📐 المبسط", formula: "Isc = S / (√3 × V × Z%)", variants: ["S = قدرة المحول (VA)", "Z% = ممانعة المحول"] },
                    { type: "warning", title: "⚠️ مهم جداً", content: "اختيار القواطع بناءً على Icu أكبر من Isc عند نقطة التركيب." }
                ],
                references: [],
                related: ["cable-sizing"]
            }
        ]
    },
    {
        id: "protection",
        name: "الحماية الكهربائية",
        nameEn: "Protection",
        icon: "shield-check",
        desc: "قواطع، منحنيات، RCD، تنسيق الحمايات.",
        topics: [
            {
                id: "breaker-types",
                title: "أنواع القواطع",
                titleEn: "Breaker Types",
                summary: "MCB, MCCB, ACB, RCD, RCBO.",
                sections: [
                    { type: "table", title: "📊 مقارنة شاملة", headers: ["النوع", "التيار", "Icu", "الاستخدام"], rows: [["MCB", "≤ 125A", "6-10 kA", "دوائر نهائية"], ["MCCB", "16-1600A", "25-100 kA", "لوحات فرعية"], ["ACB", "> 800A", "50-150 kA", "لوحة رئيسية"], ["RCD", "≤ 125A", "—", "حماية تسرب"]] }
                ],
                references: [],
                related: ["trip-curves", "rcd"]
            },
            {
                id: "trip-curves",
                title: "منحنيات الفصل",
                titleEn: "Trip Curves",
                summary: "أنواع B, C, D, K, Z.",
                sections: [
                    { type: "table", title: "📊 الأنواع", headers: ["النوع", "المدى", "الاستخدام"], rows: [["Type B", "3-5 × In", "مقاومية - إضاءة"], ["Type C", "5-10 × In", "محركات صغيرة"], ["Type D", "10-20 × In", "محركات كبيرة"]] }
                ],
                references: [],
                related: ["breaker-types"]
            },
            {
                id: "rcd",
                title: "قواطع التسرب الأرضي RCD",
                titleEn: "RCD",
                summary: "حماية من التسرب الأرضي للتيار.",
                sections: [
                    { type: "table", title: "📊 الحساسيات", headers: ["الحساسية", "الاستخدام"], rows: [["10 mA", "غرف عمليات"], ["30 mA", "حماية أرواح"], ["100 mA", "حماية حريق"], ["300 mA", "حماية معدات"]] }
                ],
                references: [],
                related: ["breaker-types"]
            },
            {
                id: "coordination",
                title: "تنسيق الحمايات",
                titleEn: "Protection Coordination",
                summary: "ضمان عمل القاطع الأقرب للعطل فقط.",
                sections: [
                    { type: "text", title: "📖 المبدأ", content: "عند حدوث عطل، يجب أن يعمل القاطع الأقرب للعطل فقط." },
                    { type: "formula", title: "📐 القاعدة", formula: "t_upstream ≥ 1.5 × t_downstream" }
                ],
                references: [],
                related: ["breaker-types"]
            }
        ]
    },
    {
        id: "cables",
        name: "الكابلات",
        nameEn: "Cables",
        icon: "plug",
        desc: "أنواع، عوازل، طرق تركيب، سعات، اختبارات.",
        topics: [
            {
                id: "cable-types",
                title: "أنواع الكابلات",
                titleEn: "Cable Types",
                summary: "تصنيف كامل للكابلات.",
                sections: [
                    { type: "list", title: "🔧 العوازل", items: ["PVC: 70°C عادي", "XLPE: 90°C (الأفضل)", "EPR: 90°C مرن", "LSZH: بدون هالوجين"] },
                    { type: "table", title: "📋 التكويد", headers: ["الرمز", "المعنى"], rows: [["Cu", "نحاس"], ["Al", "ألومنيوم"], ["PVC", "عزل PVC"], ["XLPE", "عزل XLPE"], ["SWA", "تسليح سلكي"]] }
                ],
                references: [],
                related: ["ampacity"]
            },
            {
                id: "ampacity",
                title: "سعة الحمل الحرارية",
                titleEn: "Cable Ampacity",
                summary: "جداول الحمل الحرارية ومعاملات التخفيض.",
                sections: [
                    { type: "table", title: "📊 جداول مرجعية (نحاس/PVC)", headers: ["مقطع (mm²)", "هواء", "مدفون"], rows: [["1.5", "19.5A", "17A"], ["2.5", "27A", "23A"], ["4", "36A", "30A"], ["6", "46A", "38A"], ["10", "63A", "52A"], ["16", "85A", "69A"], ["25", "112A", "90A"], ["35", "138A", "111A"], ["50", "168A", "133A"], ["70", "213A", "168A"], ["95", "258A", "201A"], ["120", "299A", "232A"]] }
                ],
                references: [],
                related: ["cable-types", "cable-sizing"]
            }
        ]
    },
    {
        id: "earthing",
        name: "التأريض",
        nameEn: "Earthing",
        icon: "anchor",
        desc: "أنظمة التأريض، الأقطاب، المقاومة، القياس.",
        topics: [
            {
                id: "earthing-purpose",
                title: "أنظمة التأريض",
                titleEn: "Earthing Systems",
                summary: "TT, TN-S, TN-C, TN-C-S, IT.",
                sections: [
                    { type: "table", title: "📊 مقارنة", headers: ["النظام", "الحماية", "الاستخدام"], rows: [["TT", "RCD إجباري", "مناطق ريفية"], ["TN-S", "قواطع", "مدن حديثة"], ["TN-C", "قواطع", "قديم"], ["TN-C-S", "قواطع", "شائع"], ["IT", "مراقب عزل", "مستشفيات"]] }
                ],
                references: [],
                related: ["earth-resistance"]
            },
            {
                id: "earth-resistance",
                title: "قياس مقاومة التأريض",
                titleEn: "Earth Resistance Measurement",
                summary: "طرق القياس والقيم المقبولة.",
                sections: [
                    { type: "list", title: "🔧 الطرق", items: ["3-pole (Fall of Potential)", "4-pole (Wenner)", "Clamp-on", "Selective"] },
                    { type: "table", title: "📊 القيم المقبولة", headers: ["النوع", "المقاومة"], rows: [["منازل", "≤ 5 Ω"], ["مصانع", "≤ 1 Ω"], ["محطات", "≤ 0.5 Ω"], ["أبراج", "≤ 10 Ω"]] }
                ],
                references: [],
                related: ["earthing-purpose"]
            }
        ]
    },
    {
        id: "lighting",
        name: "الإضاءة",
        nameEn: "Lighting",
        icon: "lightbulb",
        desc: "وحدات، تصميم، DIALux، حسابات.",
        topics: [
            {
                id: "photometric-units",
                title: "الوحدات الضوئية",
                titleEn: "Photometric Units",
                summary: "Lumen, Lux, Candela, CRI, CCT.",
                sections: [
                    { type: "list", title: "📊 الوحدات", items: ["Lumen (lm) — التدفق الضوئي", "Lux (lx) — الإضاءة على السطح", "Candela (cd) — شدة الإضاءة", "CRI (0-100) — دقة الألوان", "CCT (2700-6500K) — درجة حرارة اللون"] },
                    { type: "formula", title: "📐 العلاقات", formula: "E (lux) = Φ (lm) / A (m²)", variants: ["I (cd) = Φ / Ω"] }
                ],
                references: [],
                related: ["lighting-design"]
            },
            {
                id: "lighting-design",
                title: "تصميم الإضاءة",
                titleEn: "Lumen Method",
                summary: "طريقة اللومن لحساب عدد المصابيح.",
                sections: [
                    { type: "formula", title: "📐 القانون", formula: "N = (E × A) / (Φ × UF × MF)", variants: ["E: مستوى الإضاءة (lux)", "A: المساحة (m²)", "Φ: تدفق الوحدة (lm)", "UF: 0.5-0.8", "MF: 0.7-0.85"] },
                    { type: "table", title: "📊 مستويات الإضاءة (EN 12464)", headers: ["المكان", "E (lux)"], rows: [["ممرات", "100"], ["سلالم", "150"], ["مكاتب", "300-500"], ["قاعات", "500"], ["رسم هندسي", "750-1000"], ["مخازن", "100-200"]] }
                ],
                references: [],
                related: ["photometric-units"]
            }
        ]
    },
    {
        id: "motors",
        name: "الموتورات والتحكم",
        nameEn: "Motors & Control",
        icon: "settings",
        desc: "أنواع، بدء، VFD، حماية، PLC.",
        topics: [
            {
                id: "motor-types",
                title: "أنواع الموتورات",
                titleEn: "Motor Types",
                summary: "Induction, Synchronous, DC, Servo.",
                sections: [
                    { type: "list", title: "🔧 الأنواع", items: ["Induction 3φ (الأشهر)", "Induction 1φ (صغير)", "Synchronous", "DC Motors", "Servo", "Stepper"] },
                    { type: "table", title: "📊 كفاءة IE", headers: ["الفئة", "الكفاءة"], rows: [["IE1", "Standard"], ["IE2", "High"], ["IE3", "Premium"], ["IE4", "Super Premium"]] }
                ],
                references: [],
                related: ["motor-starting", "vfd"]
            },
            {
                id: "motor-starting",
                title: "طرق بدء الموتور",
                titleEn: "Motor Starting Methods",
                summary: "DOL, Star-Delta, Soft, VFD.",
                sections: [
                    { type: "table", title: "📊 مقارنة", headers: ["الطريقة", "تيار البدء"], rows: [["DOL", "6-8 × FLC"], ["Star-Delta", "2-2.5 × FLC"], ["Soft Starter", "2-4 × FLC"], ["VFD", "1-1.5 × FLC"]] }
                ],
                references: [],
                related: ["motor-types", "vfd"]
            },
            {
                id: "vfd",
                title: "VFD - مغير السرعة",
                titleEn: "Variable Frequency Drive",
                summary: "التحكم في سرعة الموتور.",
                sections: [
                    { type: "formula", title: "📐 العلاقات", formula: "N = (120 × f) / P", variants: ["N: السرعة (rpm)", "f: التردد (Hz)", "P: عدد الأقطاب"] },
                    { type: "list", title: "💡 المزايا", items: ["توفير طاقة 30-50%", "تحكم دقيق", "بدء ناعم", "حماية شاملة"] }
                ],
                references: [],
                related: ["motor-starting"]
            }
        ]
    },
    {
        id: "fire",
        name: "إنذار ومكافحة الحريق",
        nameEn: "Fire Alarm & Fighting",
        icon: "alert-triangle",
        desc: "أنظمة الإنذار والمكافحة والتشغيل.",
        topics: [
            {
                id: "fa-intro",
                title: "أنظمة إنذار الحريق",
                titleEn: "Fire Alarm Systems",
                summary: "Conventional, Addressable, Analog.",
                sections: [
                    { type: "list", title: "🔧 المكونات", items: ["FACP: لوحة تحكم", "Detectors: كاشفات", "MCP: نقاط اتصال يدوية", "Sounders: أجراس", "Strobes: إشارات ضوئية"] },
                    { type: "table", title: "📊 الأنواع", headers: ["النوع", "الميزة"], rows: [["Conventional", "بسيط"], ["Addressable", "كل جهاز بعنوان"], ["Analog Addressable", "دقة عالية"]] }
                ],
                references: [],
                related: ["fa-devices"]
            },
            {
                id: "fa-devices",
                title: "أجهزة الإنذار",
                titleEn: "Fire Alarm Devices",
                summary: "أنواع الكاشفات واختيارها.",
                sections: [
                    { type: "list", title: "🔧 الكاشفات", items: ["Smoke Optical", "Smoke Ionization", "Heat Fixed", "Heat ROR", "Multi-Criteria", "Beam", "Flame"] },
                    { type: "table", title: "📊 التغطية", headers: ["النوع", "المساحة", "الارتفاع"], rows: [["Smoke", "≤ 100 m²", "≤ 12 m"], ["Heat", "≤ 50 m²", "≤ 7.5 m"], ["Beam", "≤ 1600 m²", "≤ 25 m"]] }
                ],
                references: [],
                related: ["fa-intro"]
            },
            {
                id: "fire-fighting",
                title: "أنظمة مكافحة الحريق",
                titleEn: "Fire Fighting Systems",
                summary: "Sprinkler, CO2, FM200, Foam.",
                sections: [
                    { type: "table", title: "📊 الأنواع", headers: ["النظام", "الاستخدام"], rows: [["Wet Sprinkler", "مباني عادية"], ["Dry Sprinkler", "مناطق متجمدة"], ["CO2", "كهرباء ومختبرات"], ["FM200/NOVEC", "مراكز بيانات"], ["Foam", "وقود وكيماويات"]] }
                ],
                references: [],
                related: ["fa-intro"]
            }
        ]
    }
];

/* ========================================
   5. الأكواد
======================================== */
const CODE_CATEGORIES = [
    { id: "all",      name: "الكل",         icon: "library" },
    { id: "egyptian", name: "الكود المصري", icon: "flag" },
    { id: "iec",      name: "IEC",          icon: "globe" },
    { id: "nfpa",     name: "NFPA",         icon: "alert-triangle" },
    { id: "bs",       name: "BS",           icon: "file-text" },
    { id: "ieee",     name: "IEEE",         icon: "zap" }
];

const CODES = [
    { id: "ecp-2015", code: "ECP 2015", name: "Egyptian Code for Electrical Installations", nameAr: "الكود المصري لتصميم التركيبات الكهربائية", category: "egyptian", description: "الكود المصري الرسمي لتصميم وتنفيذ التركيبات الكهربائية.", url: "" },
    { id: "iec-60364", code: "IEC 60364", name: "Low-voltage Electrical Installations", nameAr: "التركيبات الكهربائية منخفضة الجهد", category: "iec", description: "المعيار الدولي الأهم في تصميم وتنفيذ التركيبات الكهربائية.", url: "https://webstore.iec.ch/publication/1877" },
    { id: "iec-60364-5-52", code: "IEC 60364-5-52", name: "Wiring Systems & Cable Selection", nameAr: "أنظمة التمديدات واختيار الكابلات", category: "iec", description: "جداول السعة الحرارية للكابلات ومعاملات التخفيض.", url: "" },
    { id: "iec-60898", code: "IEC 60898-1", name: "Circuit Breakers for Household", nameAr: "القواطع المنزلية MCB", category: "iec", description: "مواصفات القواطع المصغرة للمنازل.", url: "" },
    { id: "iec-60947", code: "IEC 60947", name: "Low-voltage Switchgear", nameAr: "لوحات الجهد المنخفض", category: "iec", description: "مواصفات القواطع الصناعية MCCB و ACB.", url: "" },
    { id: "iec-61008", code: "IEC 61008", name: "Residual Current Devices (RCD)", nameAr: "قواطع التسرب الأرضي", category: "iec", description: "مواصفات قواطع التسرب الأرضي RCCB.", url: "" },
    { id: "nfpa-70", code: "NFPA 70", name: "National Electrical Code (NEC)", nameAr: "الكود الكهربائي الأمريكي", category: "nfpa", description: "الكود الكهربائي الأمريكي الشامل.", url: "" },
    { id: "nfpa-72", code: "NFPA 72", name: "National Fire Alarm Code", nameAr: "كود إنذار الحريق", category: "nfpa", description: "الكود الأمريكي الشامل لأنظمة إنذار الحريق.", url: "" },
    { id: "nfpa-13", code: "NFPA 13", name: "Sprinkler Systems", nameAr: "أنظمة الرشاشات", category: "nfpa", description: "معيار تصميم وتنفيذ أنظمة رشاشات الحريق.", url: "" },
    { id: "nfpa-20", code: "NFPA 20", name: "Fire Pumps", nameAr: "مضخات الحريق", category: "nfpa", description: "مواصفات وتصميم مضخات الحريق.", url: "" },
    { id: "bs-7671", code: "BS 7671", name: "IET Wiring Regulations", nameAr: "لوائح التمديدات الكهربائية البريطانية", category: "bs", description: "المعيار البريطاني للتركيبات الكهربائية.", url: "" },
    { id: "bs-5839", code: "BS 5839-1", name: "Fire Detection and Alarm Systems", nameAr: "أنظمة إنذار الحريق للمباني", category: "bs", description: "المعيار البريطاني لأنظمة إنذار الحريق.", url: "" },
    { id: "ieee-80", code: "IEEE 80", name: "Safety in AC Substation Grounding", nameAr: "سلامة التأريض في محطات AC", category: "ieee", description: "دليل تصميم أنظمة التأريض في محطات القوى.", url: "" },
    { id: "ieee-141", code: "IEEE 141", name: "Electric Power Distribution", nameAr: "توزيع القوى للمصانع", category: "ieee", description: "دليل تصميم أنظمة توزيع القوى في المصانع.", url: "" }
];

/* ========================================
   6. المواصفات
======================================== */
const SPEC_CATEGORIES = [
    { id: "all",      name: "الكل",     icon: "clipboard-list" },
    { id: "cables",   name: "كابلات",   icon: "plug" },
    { id: "breakers", name: "قواطع",    icon: "shield" },
    { id: "panels",   name: "لوحات",    icon: "grid" },
    { id: "lighting", name: "إضاءة",    icon: "lightbulb" }
];

const SPECS = [
    { id: "cable-cu-pvc", name: "كابل نحاس - PVC/PVC", nameEn: "Cu/PVC/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع عزل PVC للاستخدامات الداخلية.", specs: ["الموصل: نحاس مجدول", "العزل: PVC", "الجهد: 0.6/1 kV", "الحرارة: 70°C"] },
    { id: "cable-cu-xlpe", name: "كابل نحاس - XLPE/PVC", nameEn: "Cu/XLPE/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع عزل XLPE يتحمل حرارة أعلى.", specs: ["الموصل: نحاس", "العزل: XLPE", "الجهد: 0.6/1 kV", "الحرارة: 90°C"] },
    { id: "cable-cu-swa", name: "كابل نحاس مسلح - SWA", nameEn: "Cu/XLPE/SWA/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع تسليح سلكي للاستخدام المدفون.", specs: ["الموصل: نحاس", "العزل: XLPE", "التسليح: SWA", "الاستخدام: مدفون"] },
    { id: "mcb-schneider", name: "قاطع مصغر MCB - Schneider", nameEn: "MCB - Schneider iC60N", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع مصغر للدوائر النهائية حتى 63A.", specs: ["التيار: 6-63A", "الأقطاب: 1P-4P", "Icu: 6 kA", "المنحنيات: B, C, D"] },
    { id: "mcb-abb", name: "قاطع مصغر MCB - ABB", nameEn: "MCB - ABB S200", category: "breakers", manufacturer: "ABB", description: "قاطع مصغر من ABB، قدرة قطع 10kA.", specs: ["التيار: 6-63A", "Icu: 10 kA", "المنحنيات: B, C, D, K, Z"] },
    { id: "mccb-schneider", name: "قاطع MCCB - Schneider", nameEn: "MCCB - Schneider NSX", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع صناعي للوحات التوزيع حتى 630A.", specs: ["التيار: 16-630A", "Icu: حتى 100 kA", "الأقطاب: 3P, 4P"] },
    { id: "rcd-schneider", name: "قاطع تسرب أرضي RCD", nameEn: "RCD - Schneider", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع تسرب أرضي 30mA لحماية الأرواح.", specs: ["الحساسية: 30 mA", "التيار: 25-100A", "الأقطاب: 2P, 4P"] },
    { id: "panel-schneider", name: "لوحة توزيع - Schneider Prisma", nameEn: "Distribution Panel - Prisma", category: "panels", manufacturer: "Schneider Electric", description: "لوحة توزيع معيارية IP30/IP54.", specs: ["التيار: حتى 6300A", "IP: IP30 / IP54", "البارات: نحاس مطلي"] },
    { id: "led-panel", name: "وحدة إضاءة LED Panel", nameEn: "LED Panel Light", category: "lighting", manufacturer: "Philips / Opple", description: "وحدة إضاءة LED 600×600 للمكاتب.", specs: ["القدرة: 36W", "التدفق: 3600 lm", "CCT: 3000-6500K", "CRI: >80"] },
    { id: "led-highbay", name: "وحدة إضاءة High Bay", nameEn: "LED High Bay", category: "lighting", manufacturer: "Philips / Cree", description: "وحدة إضاءة LED للارتفاعات العالية.", specs: ["القدرة: 100-200W", "التدفق: 12000-24000 lm", "IP: IP65"] }
];

/* ========================================
   7. المنتجات
======================================== */
const PRODUCT_CATEGORIES = [
    { id: "all",      name: "الكل",     icon: "package" },
    { id: "breakers", name: "قواطع",    icon: "shield" },
    { id: "cables",   name: "كابلات",   icon: "plug" },
    { id: "lighting", name: "إضاءة",    icon: "lightbulb" }
];

const PRODUCTS = [
    { id: "schneider-ic60", name: "قاطع Schneider iC60N", nameEn: "Schneider iC60N", category: "breakers", manufacturer: "Schneider Electric", model: "iC60N", price: "250 ج.م", description: "قاطع مصغر 1-4 بوصات، 6A-63A" },
    { id: "schneider-nsx", name: "قاطع Schneider NSX", nameEn: "Schneider NSX", category: "breakers", manufacturer: "Schneider Electric", model: "NSX100-630", price: "1500 ج.م", description: "قاطع MCCB صناعي حتى 630A" },
    { id: "abb-s200", name: "قاطع ABB S200", nameEn: "ABB S200", category: "breakers", manufacturer: "ABB", model: "S200", price: "280 ج.م", description: "قاطع مصغر حتى 63A" },
    { id: "elsewedy-xlpe", name: "كابل Elsewedy XLPE", nameEn: "Elsewedy XLPE Cable", category: "cables", manufacturer: "Elsewedy Electric", model: "Cu/XLPE/PVC", price: "60 ج.م/م", description: "كابل نحاس معزول XLPE حتى 90°C" },
    { id: "nexans-cu", name: "كابل Nexans Cu/PVC", nameEn: "Nexans Cu/PVC Cable", category: "cables", manufacturer: "Nexans", model: "Cu/PVC/PVC", price: "45 ج.م/م", description: "كابل نحاس معزول PVC للاستخدام الداخلي" },
    { id: "philips-coreline", name: "وحدة إضاءة Philips CoreLine", nameEn: "Philips CoreLine LED", category: "lighting", manufacturer: "Philips", model: "CoreLine", price: "450 ج.م", description: "وحدة إضاءة LED 36W، 3600lm" },
    { id: "opple-panel", name: "وحدة إضاءة Opple Panel", nameEn: "Opple LED Panel", category: "lighting", manufacturer: "Opple", model: "Slim Panel", price: "320 ج.م", description: "وحدة LED 600×600، 36W" }
];

/* ========================================
   8. المحتوى
======================================== */
const CONTENT = [
    { id: "c1", type: "document", title: "IEC 60364 — التركيبات الكهربائية", description: "المعيار الدولي الأهم في تصميم التركيبات الكهربائية.", url: "https://webstore.iec.ch/publication/1877" },
    { id: "c2", type: "video", title: "شرح قانون أوم بالعربي", description: "شرح مبسط لقانون أوم مع أمثلة عملية.", url: "https://www.youtube.com/watch?v=HsLLq6Rm5tU" },
    { id: "c3", type: "program", title: "AutoCAD Electrical", description: "برنامج Autodesk للرسم الكهربائي.", url: "https://www.autodesk.com/products/autocad-electrical" },
    { id: "c4", type: "program", title: "DIALux Evo", description: "برنامج مجاني لتصميم الإضاءة.", url: "https://www.dialux.com/" },
    { id: "c5", type: "program", title: "ETAP", description: "برنامج احترافي لتحليل الأنظمة الكهربائية.", url: "https://etap.com/" },
    { id: "c6", type: "link", title: "Electrical Engineering Portal", description: "أكبر موقع تعليمي للمهندسين الكهربائيين.", url: "https://electrical-engineering-portal.com/" }
];

/* ========================================
   Expose to window
======================================== */
window.CATEGORIES = CATEGORIES;
window.TOOLS = TOOLS;
window.CALCULATORS = CALCULATORS;
window.ENCYCLOPEDIA = ENCYCLOPEDIA;
window.CODE_CATEGORIES = CODE_CATEGORIES;
window.CODES = CODES;
window.SPEC_CATEGORIES = SPEC_CATEGORIES;
window.SPECS = SPECS;
window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.PRODUCTS = PRODUCTS;
window.CONTENT = CONTENT;