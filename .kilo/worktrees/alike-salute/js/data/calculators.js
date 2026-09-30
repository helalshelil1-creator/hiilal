/* ========================================
   DATA - الحاسبات الهندسية
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
            const I = is3Ph ? P / (Math.sqrt(3) * V * PF) : P / (V * PF);
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
            const Vd = is3Ph
                ? (Math.sqrt(3) * mvAm * I * L) / 1000
                : (2 * mvAm * I * L) / 1000;
            const percent = (Vd / V) * 100;
            const pass = percent <= maxDrop;
            return {
                results: [
                    { label: "الهبوط ΔV", value: Vd.toFixed(2), unit: "V" },
                    { label: "النسبة", value: percent.toFixed(2), unit: "%" },
                    { label: "الحالة", value: pass ? "مقبول ✓" : "مرفوض ✗", unit: "" }
                ],
                formula: is3Ph ? "ΔV = (√3 × mV/A/m × I × L) / 1000" : "ΔV = (2 × mV/A/m × I × L) / 1000",
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
                results: [{ label: "مقاومة القضيب الواحد", value: R.toFixed(2), unit: "Ω" }],
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

window.CALCULATORS = CALCULATORS;