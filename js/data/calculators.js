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
            { id: "mvAm", label: "mV/A/m (قيمة جدول الدائرة الكاملة)", unit: "mV/A/m", type: "number", required: true, min: 0.001 },
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
            const Vd = (mvAm * I * L) / 1000;
            const percent = (Vd / V) * 100;
            const pass = percent <= maxDrop;
            return {
                results: [
                    { label: "الهبوط ΔV", value: Vd.toFixed(2), unit: "V" },
                    { label: "النسبة", value: percent.toFixed(2), unit: "%" },
                    { label: "الحالة", value: pass ? "مقبول ✓" : "مرفوض ✗", unit: "" }
                ],
                formula: "ΔV = (mV/A/m × I × L) / 1000",
                steps: [`ΔV = ${Vd.toFixed(2)} V`, `${percent.toFixed(2)}% من ${V}V`],
                notes: ["استخدم قيمة mV/A/m الخاصة بالنظام من جدول الكابل (BS 7671 Appendix 4): عمود أحادي الطور للدائرة ذات موصلين، وعمود ثلاثي الأطوار للدائرة الثلاثية. القيمة المجدولة تشمل بالفعل عامل √3 أو 2، فلا يُضرب فيهما مرة ثانية.", pass ? "الهبوط داخل الحد المسموح." : "الهبوط يتجاوز الحد — قلل الطول أو زوّد المقطع."],
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
        name: "حساب عدد الطوب للشقة",
        nameEn: "Brick Quantity (Flat)",
        category: "takeoff",
        icon: "building",
        desc: "كمية الطوب من مساحة الغرف وأطوال الحيطان وارتفاعها وسمكها وفتحات الأبواب والشبابيك. مساحة الأرضية وحدها لا تكفي لحساب الكمية.",
        inputs: [
            { id: "flatArea", label: "مساحة الشقة كاملة (للمراجعة)", unit: "m²", type: "number", min: 0, help: "اختياري. تُقارن بمجموع مساحات الغرف للتنبيه لو في غرفة ناقصة." },
            { id: "r1", label: "مساحة الغرفة 1", unit: "m²", type: "number", min: 0 },
            { id: "r2", label: "مساحة الغرفة 2", unit: "m²", type: "number", min: 0 },
            { id: "r3", label: "مساحة الغرفة 3", unit: "m²", type: "number", min: 0 },
            { id: "r4", label: "مساحة الغرفة 4", unit: "m²", type: "number", min: 0 },
            { id: "r5", label: "مساحة الغرفة 5", unit: "m²", type: "number", min: 0 },
            { id: "r6", label: "مساحة الغرفة 6", unit: "m²", type: "number", min: 0 },
            { id: "r7", label: "مساحة الغرفة 7", unit: "m²", type: "number", min: 0 },
            { id: "r8", label: "مساحة الغرفة 8", unit: "m²", type: "number", min: 0, help: "اكتب كل الغرف وكمان الصالة والحمامات والمطبخ والطرقة. اترك الفاضي فارغاً." },
            { id: "shape", label: "شكل الغرفة التقريبي (لتقدير المحيط)", type: "select", options: [
                { value: "1", label: "مربعة تقريباً" },
                { value: "1.5", label: "مستطيلة (طول = 1.5 × العرض)" },
                { value: "2", label: "مستطيلة طويلة (طول = 2 × العرض)" }
            ]},
            { id: "sumPerim", label: "مجموع محيط كل الغرف من المخطط", unit: "m", type: "number", min: 0, help: "اختياري وأدق. لو كتبته يتم استخدامه بدل التقدير من المساحة." },
            { id: "extPerim", label: "طول الحيطان الخارجية (محيط الشقة)", unit: "m", type: "number", min: 0, help: "اختياري. لو فارغ يُقدّر من مساحة الغرف." },
            { id: "extLeaves", label: "سمك الحيطان الخارجية", type: "select", options: [
                { value: "2", label: "طوبة كاملة (ورقتين، نحو 25 سم)" },
                { value: "1", label: "نصف طوبة (ورقة واحدة، نحو 12 سم)" }
            ]},
            { id: "intLeaves", label: "سمك الحيطان الداخلية", type: "select", options: [
                { value: "1", label: "نصف طوبة (ورقة واحدة، نحو 12 سم)" },
                { value: "2", label: "طوبة كاملة (ورقتين، نحو 25 سم)" }
            ]},
            { id: "height", label: "ارتفاع الحيطان (صافي)", unit: "m", type: "number", default: 3, min: 1, help: "من أرضية الدور لتحت السقف أو الكمرة." },
            { id: "doors", label: "عدد الأبواب", type: "number", default: 5, min: 0 },
            { id: "doorArea", label: "مساحة الباب الواحد", unit: "m²", type: "number", default: 1.9, min: 0 },
            { id: "windows", label: "عدد الشبابيك والبلكونات", type: "number", default: 4, min: 0 },
            { id: "windowArea", label: "مساحة الشباك الواحد", unit: "m²", type: "number", default: 1.5, min: 0 },
            { id: "unit", label: "نوع الطوب", type: "select", options: [
                { value: "red", label: "أحمر طفلي 25×12×6 سم" },
                { value: "white", label: "أبيض جيري 25×12×6 سم" },
                { value: "custom", label: "مقاس آخر (بلوك أو غيره): اكتب الأبعاد تحت" }
            ]},
            { id: "cl", label: "طول الوحدة (للمقاس الآخر)", unit: "cm", type: "number", default: 40, min: 5 },
            { id: "cw", label: "عرض الوحدة = سمك الورقة (للمقاس الآخر)", unit: "cm", type: "number", default: 20, min: 5 },
            { id: "ch", label: "ارتفاع الوحدة (للمقاس الآخر)", unit: "cm", type: "number", default: 20, min: 3 },
            { id: "joint", label: "سمك المونة", unit: "cm", type: "number", default: 1, min: 0 },
            { id: "waste", label: "نسبة الهالك", unit: "%", type: "number", default: 5, min: 0, help: "المصادر تذكر 5 إلى 10 بالمئة." }
        ],
        calculate(v) {
            const n = (x, d) => { const y = parseFloat(x); return isFinite(y) ? y : d; };
            const rooms = [v.r1, v.r2, v.r3, v.r4, v.r5, v.r6, v.r7, v.r8].map(x => n(x, 0)).filter(x => x > 0);
            if (!rooms.length) return { error: "اكتب مساحة غرفة واحدة على الأقل." };
            const sumA = rooms.reduce((a, b) => a + b, 0);
            const r = n(v.shape, 1);
            const est = A => 2 * Math.sqrt(A / r) * (1 + r);
            const roomPerim = n(v.sumPerim, 0) > 0 ? n(v.sumPerim, 0) : rooms.reduce((a, A) => a + est(A), 0);
            const perimSrc = n(v.sumPerim, 0) > 0 ? "من المخطط" : "مقدّر من المساحة";
            const ext = n(v.extPerim, 0) > 0 ? n(v.extPerim, 0) : est(sumA);
            const extSrc = n(v.extPerim, 0) > 0 ? "من المدخلات" : "مقدّر";
            if (roomPerim < ext) return { error: "مجموع محيط الغرف أصغر من محيط الشقة. راجع الأرقام." };
            const intLen = (roomPerim - ext) / 2;
            const H = n(v.height, 3);
            const sizes = { red: [25, 12, 6], white: [25, 12, 6] };
            let l, w, h;
            if (v.unit === "custom") { l = n(v.cl, 40); w = n(v.cw, 20); h = n(v.ch, 20); }
            else { [l, w, h] = sizes[v.unit] || sizes.red; }
            const j = n(v.joint, 1);
            const perLeaf = 10000 / ((l + j) * (h + j));
            const extL = Math.round(n(v.extLeaves, 2));
            const intL = Math.round(n(v.intLeaves, 1));
            const grossExt = ext * H, grossInt = intLen * H;
            const openings = n(v.doors, 0) * n(v.doorArea, 0) + n(v.windows, 0) * n(v.windowArea, 0);
            const gross = grossExt + grossInt;
            if (openings >= gross) return { error: "مساحة الفتحات أكبر من مساحة الحيطان. راجع الأرقام." };
            const net = gross - openings;
            // openings are deducted pro rata between external and internal walls (windows are usually in external walls)
            const winA = n(v.windows, 0) * n(v.windowArea, 0);
            const doorA = n(v.doors, 0) * n(v.doorArea, 0);
            const netExt = Math.max(0, grossExt - winA - doorA * 0.2);
            const netInt = Math.max(0, grossInt - doorA * 0.8);
            const bricks = netExt * perLeaf * extL + netInt * perLeaf * intL;
            const withWaste = bricks * (1 + n(v.waste, 5) / 100);
            const fmt = x => Math.round(x).toLocaleString("en-US");
            const warn = [];
            const fa = n(v.flatArea, 0);
            if (fa > 0 && Math.abs(sumA - fa) / fa > 0.1) warn.push(`مجموع مساحات الغرف (${sumA.toFixed(1)} م²) يختلف عن مساحة الشقة (${fa} م²) بأكتر من 10 بالمئة. غالباً في غرفة أو طرقة ناقصة، والكمية ستكون أقل من الفعلية.`);
            return {
                results: [
                    { label: "عدد الطوب بدون هالك", value: fmt(bricks), unit: "طوبة" },
                    { label: "عدد الطوب مع الهالك", value: fmt(withWaste), unit: "طوبة" },
                    { label: "طول الحيطان الخارجية (" + extSrc + ")", value: ext.toFixed(1), unit: "m" },
                    { label: "طول الحيطان الداخلية (" + perimSrc + ")", value: intLen.toFixed(1), unit: "m" },
                    { label: "مساحة الحيطان قبل الفتحات", value: gross.toFixed(1), unit: "m²" },
                    { label: "مساحة الفتحات المخصومة", value: openings.toFixed(1), unit: "m²" },
                    { label: "صافي مساحة الحيطان", value: net.toFixed(1), unit: "m²" },
                    { label: "طوبة لكل م² ورقة واحدة", value: perLeaf.toFixed(1), unit: "طوبة/م²" }
                ],
                formula: "الطوب = (صافي مساحة الحائط × عدد الأوراق) ÷ ((طول الوحدة + المونة) × (ارتفاع الوحدة + المونة))",
                steps: [
                    `مجموع مساحات الغرف = ${sumA.toFixed(1)} م² (${rooms.length} غرف)`,
                    `طول الحيطان الداخلية = (مجموع محيط الغرف ${roomPerim.toFixed(1)} - المحيط الخارجي ${ext.toFixed(1)}) / 2 = ${intLen.toFixed(1)} م`,
                    `مساحة الحيطان = (${ext.toFixed(1)} + ${intLen.toFixed(1)}) × ${H} = ${gross.toFixed(1)} م²`,
                    `طوبة/م² لورقة = 10000 / ((${l}+${j}) × (${h}+${j})) = ${perLeaf.toFixed(1)}`,
                    `خارجي: ${netExt.toFixed(1)} م² × ${perLeaf.toFixed(1)} × ${extL} = ${fmt(netExt * perLeaf * extL)}`,
                    `داخلي: ${netInt.toFixed(1)} م² × ${perLeaf.toFixed(1)} × ${intL} = ${fmt(netInt * perLeaf * intL)}`
                ].concat(v.unit === "custom" ? [`المقاس الآخر: عرض الوحدة ${w} سم هو سمك الورقة الواحدة`] : []),
                notes: warn.concat([
                    "الطول ينقسم هنا: المحيط الخارجي من المدخلات أو تقدير، والداخلي = (مجموع محيط الغرف - الخارجي) ÷ 2 لأن كل حيطة داخلية تفصل غرفتين. الحساب سليم فقط لو كل غرف الشقة مكتوبة.",
                    "الأبواب تُخصم 80 بالمئة من الحيطان الداخلية و20 بالمئة من الخارجية، والشبابيك كلها من الخارجية. هذا افتراض، عدّله بالأرقام الفعلية لو مختلف.",
                    "عدد الطوب لورقتين تقريبي ويفترض ورقتين متجاورتين بنفس العدد. الأعمدة والكمرات والزوايا والأسوار الصغيرة وحيطان الحمامات المبلّطة غير محسوبة. اخصم أماكن الأعمدة الخرسانية من الطول لو الحيطان بينها.",
                    "الطوب الأحمر والأبيض الجيري هنا بنفس المقاس 25×12×6 سم، فالفرق بينهم في السعر والوزن وليس في العدد. البلوك أو السيبوركس: اختر مقاس آخر واكتب أبعاد المورد. السيبوركس يحتاج مونة رقيقة فاجعل المونة 0.3 سم تقريباً حسب المورد.",
                    "كمية تقديرية للمقارنة. اطلب حصر نهائي من المهندس أو المقاول قبل الشراء."
                ]),
                references: ["مقاسات الطوب: alamarmasr.com/brick-standard-sizes-egypt-guide", "55 و110 طوبة/م²: elbashmadni.com/2026/10/bricks-per-square-meter.html", "هالك 5-10%: alamarmasr.com/brick-quantity-calculation-guide"]
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
        name: "حمل التكييف (تقدير مبدئي)",
        nameEn: "Cooling Load (rule of thumb)",
        category: "mep",
        icon: "wind",
        desc: "تقدير مبدئي للحمل التبريدي بالمتر المربع. لا يغني عن حساب الأحمال التفصيلي.",
        inputs: [
            { id: "area", label: "المساحة المكيّفة", unit: "m²", type: "number", required: true, min: 1 },
            { id: "type", label: "نوع المكان", type: "select", options: [
                { value: "res", label: "سكني (100–200 W/m²)" },
                { value: "hotel", label: "غرف فندقية (120 W/m²)" },
                { value: "office", label: "مكاتب (100–180 W/m²)" },
                { value: "clinic", label: "عيادات/مكاتب طبية (185–190 W/m²)" },
                { value: "restaurant", label: "مطاعم/كافتيريا (350 W/m²)" }
            ]}
        ],
        calculate(v) {
            const A = Number(v.area);
            // [أدنى, نموذجي, أعلى] W/m² من جدول Cooling Load Check Figures (IBSE HK): http://ibse.hk/MEBS6006/CoolingLoadCheckFigures.pdf
            const lf = { res: [100, 150, 200], hotel: [120, 120, 120], office: [100, 150, 180], clinic: [185, 188, 190], restaurant: [350, 350, 350] };
            const f = lf[v.type] || lf.office;
            if (!(A > 0)) return { error: "تحقق من المساحة" };
            const kw = f.map(x => A * x / 1000);
            const tr = kw.map(x => x / 3.517);
            return {
                results: [
                    { label: "الحمل النموذجي", value: kw[1].toFixed(2), unit: "kW" },
                    { label: "الحمل النموذجي", value: tr[1].toFixed(2), unit: "TR" },
                    { label: "المدى (أدنى – أعلى)", value: kw[0].toFixed(2) + " – " + kw[2].toFixed(2), unit: "kW" },
                    { label: "المدى (أدنى – أعلى)", value: tr[0].toFixed(2) + " – " + tr[2].toFixed(2), unit: "TR" }
                ],
                formula: "Q = Area × (W/m²)",
                steps: [`Q = ${A} × ${f[1]} = ${(A * f[1]).toFixed(0)} W (نموذجي)`, `المدى: ${f[0]}–${f[2]} W/m²`],
                notes: ["قيم استرشادية للمرحلة المبكرة فقط، والحمل الفعلي يتأثر بالاتجاه والعزل والزجاج والتهوية والأحمال الداخلية. للتصميم النهائي استخدم حساب الأحمال التفصيلي (ASHRAE/HAP)."],
                references: ["Cooling Load Check Figures — IBSE HK (ibse.hk/MEBS6006)", "ASHRAE Handbook — Fundamentals"]
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
            const peakFlow = peak / (24 * 3600); // L/day ÷ 86400 s = L/s (متوسط تدفق يوم الذروة، وليس ذروة اللحظة)
            return {
                results: [
                    { label: "الاستهلاك اليومي", value: (daily / 1000).toFixed(2), unit: "m³/day" },
                    { label: "الاستهلاك الأقصى", value: (peak / 1000).toFixed(2), unit: "m³/day" },
                    { label: "متوسط تدفق يوم الذروة", value: peakFlow.toFixed(3), unit: "L/s" }
                ],
                formula: "Q = N × Consumption × Peak Factor",
                steps: [`Q_daily = ${(daily/1000).toFixed(2)} m³/day`, `Q_peak-day = ${(peak/1000).toFixed(2)} m³/day → ${peakFlow.toFixed(3)} L/s (÷ 86400)`],
                notes: ["التدفق اللحظي لتصميم المواسير والمضخات يُحسب بطريقة وحدات التركيب (Fixture Units) وفق الكود المعتمد، وهو أعلى من هذا المتوسط."],
                references: ["IPC", "ASPE"]
            };
        }
    }
];

window.CALCULATORS = CALCULATORS;