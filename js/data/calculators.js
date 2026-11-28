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
        desc: "كمية الطوب من عدد الغرف ومساحاتها وأطوال الحيطان وارتفاعها وسمكها وفتحات الأبواب والشبابيك. مساحة الأرضية وحدها لا تكفي. لو لم تكتب أطوال الحيطان من المخطط تصبح النتيجة تقديرية فقط ولا تُستخدم للشراء.",
        inputs: [
            { id: "roomCount", label: "عدد الغرف (كل المساحات المفصولة بحيطان)", type: "number", required: true, min: 1, max: 12, step: 1, default: 6 },
            { id: "r1", label: "مساحة الغرفة 1", unit: "m²", type: "number", min: 0 },
            { id: "r2", label: "مساحة الغرفة 2", unit: "m²", type: "number", min: 0 },
            { id: "r3", label: "مساحة الغرفة 3", unit: "m²", type: "number", min: 0 },
            { id: "r4", label: "مساحة الغرفة 4", unit: "m²", type: "number", min: 0 },
            { id: "r5", label: "مساحة الغرفة 5", unit: "m²", type: "number", min: 0 },
            { id: "r6", label: "مساحة الغرفة 6", unit: "m²", type: "number", min: 0 },
            { id: "r7", label: "مساحة الغرفة 7", unit: "m²", type: "number", min: 0 },
            { id: "r8", label: "مساحة الغرفة 8", unit: "m²", type: "number", min: 0 },
            { id: "r9", label: "مساحة الغرفة 9", unit: "m²", type: "number", min: 0 },
            { id: "r10", label: "مساحة الغرفة 10", unit: "m²", type: "number", min: 0 },
            { id: "r11", label: "مساحة الغرفة 11", unit: "m²", type: "number", min: 0 },
            { id: "r12", label: "مساحة الغرفة 12", unit: "m²", type: "number", min: 0, help: "اكتب مساحات بعدد الغرف المكتوب فوق بالضبط. الصالة والحمام والمطبخ والطرقة تحسب غرف." },
            { id: "flatArea", label: "مساحة الشقة كاملة (للمراجعة)", unit: "m²", type: "number", min: 0, help: "اختياري. تُقارن بمجموع مساحات الغرف." },
            { id: "extPerim", label: "طول الحيطان الخارجية من المخطط (محيط الشقة)", unit: "m", type: "number", min: 0, help: "مطلوب لنتيجة دقيقة. يشمل الحيطان المشتركة مع الجيران لو بالطوب." },
            { id: "intLen", label: "طول الحيطان الداخلية من المخطط", unit: "m", type: "number", min: 0, help: "مطلوب لنتيجة دقيقة. اجمع طول كل حيطة تفصل غرفتين مرة واحدة." },
            { id: "shape", label: "شكل الغرفة (فقط لو الأطوال غير مكتوبة)", type: "select", options: [
                { value: "1", label: "مربعة تقريباً" },
                { value: "1.5", label: "مستطيلة (طول = 1.5 × العرض)" },
                { value: "2", label: "مستطيلة طويلة (طول = 2 × العرض)" }
            ]},
            { id: "extLeaves", label: "سمك الحيطان الخارجية", type: "select", options: [
                { value: "2", label: "طوبة كاملة (ورقتين، نحو 25 سم)" },
                { value: "1", label: "نصف طوبة (ورقة واحدة، نحو 12 سم)" }
            ]},
            { id: "intLeaves", label: "سمك الحيطان الداخلية", type: "select", options: [
                { value: "1", label: "نصف طوبة (ورقة واحدة، نحو 12 سم)" },
                { value: "2", label: "طوبة كاملة (ورقتين، نحو 25 سم)" }
            ]},
            { id: "height", label: "ارتفاع الحيطان (صافي)", unit: "m", type: "number", default: 3, min: 1, help: "من الأرضية لتحت السقف أو الكمرة." },
            { id: "extDoors", label: "عدد الأبواب في الحيطان الخارجية", type: "number", default: 0, min: 0 },
            { id: "intDoors", label: "عدد الأبواب في الحيطان الداخلية", type: "number", default: 0, min: 0 },
            { id: "doorArea", label: "مساحة الباب الواحد", unit: "m²", type: "number", default: 1.9, min: 0 },
            { id: "extWindows", label: "عدد الشبابيك والبلكونات في الحيطان الخارجية", type: "number", default: 0, min: 0 },
            { id: "intWindows", label: "عدد الشبابيك في الحيطان الداخلية", type: "number", default: 0, min: 0 },
            { id: "windowArea", label: "مساحة الشباك الواحد", unit: "m²", type: "number", default: 1.5, min: 0 },
            { id: "unit", label: "نوع الطوب", type: "select", options: [
                { value: "red", label: "أحمر طفلي 25×12×6 سم" },
                { value: "white", label: "أبيض جيري 25×12×6 سم" },
                { value: "custom", label: "مقاس آخر (بلوك أو غيره): اكتب الأبعاد تحت" }
            ]},
            { id: "cl", label: "طول الوحدة (للمقاس الآخر)، يظهر في وجه الحائط", unit: "cm", type: "number", default: 40, min: 5 },
            { id: "cw", label: "عرض الوحدة = سمك الورقة في الحائط (للمقاس الآخر)", unit: "cm", type: "number", default: 20, min: 5 },
            { id: "ch", label: "ارتفاع الوحدة، يظهر في وجه الحائط (للمقاس الآخر)", unit: "cm", type: "number", default: 20, min: 3 },
            { id: "joint", label: "سمك المونة", unit: "cm", type: "number", default: 1, min: 0 },
            { id: "waste", label: "نسبة الهالك", unit: "%", type: "number", default: 5, min: 0, help: "المصادر تذكر 5 إلى 10 بالمئة." }
        ],
        calculate(v) {
            const n = (x, d) => { const y = parseFloat(x); return isFinite(y) ? y : d; };
            const N = Math.round(n(v.roomCount, 0));
            if (!(N >= 1 && N <= 12)) return { error: "عدد الغرف لازم يكون من 1 إلى 12." };
            const rooms = [];
            for (let i = 1; i <= 12; i++) { const a = n(v["r" + i], 0); if (a > 0) rooms.push(a); }
            if (rooms.length !== N) return { error: `كتبت عدد الغرف ${N} لكن المساحات المكتوبة ${rooms.length}. اكتب مساحة لكل غرفة بالضبط وسيب الباقي فارغ.` };
            const sumA = rooms.reduce((a, b) => a + b, 0);
            const H = n(v.height, 3);
            const extHave = n(v.extPerim, 0) > 0, intHave = n(v.intLen, 0) > 0;
            const exact = extHave && intHave;
            const geom = r => {
                const est = A => 2 * Math.sqrt(A / r) * (1 + r);
                const ext = extHave ? n(v.extPerim, 0) : est(sumA);
                const int = intHave ? n(v.intLen, 0) : Math.max(0, (rooms.reduce((a, A) => a + est(A), 0) - ext) / 2);
                return { ext, int };
            };
            let l, w, h;
            if (v.unit === "custom") { l = n(v.cl, 40); w = n(v.cw, 20); h = n(v.ch, 20); }
            else { l = 25; w = 12; h = 6; }
            const j = n(v.joint, 1);
            const perLeaf = 10000 / ((l + j) * (h + j));
            const extL = Math.round(n(v.extLeaves, 2)), intL = Math.round(n(v.intLeaves, 1));
            const eD = n(v.extDoors, 0), iD = n(v.intDoors, 0), dA = n(v.doorArea, 0);
            const eW = n(v.extWindows, 0), iW = n(v.intWindows, 0), wA = n(v.windowArea, 0);
            const openExt = eD * dA + eW * wA, openInt = iD * dA + iW * wA;
            const run = g => {
                const gE = g.ext * H, gI = g.int * H;
                const nE = gE - openExt, nI = gI - openInt;
                if (nE < 0 || nI < 0) return null;
                return { gE, gI, nE, nI, bricks: (nE * extL + nI * intL) * perLeaf };
            };
            const g0 = geom(n(v.shape, 1));
            const R = run(g0);
            if (!R) {
                const bad = [];
                if (g0.ext * H - openExt < 0) bad.push(`الحيطان الخارجية: مساحة ${(g0.ext * H).toFixed(1)} م² (طول ${g0.ext.toFixed(1)} م × ارتفاع ${H} م) وفتحات ${openExt.toFixed(1)} م² (${eD} باب و${eW} شباك)`);
                if (g0.int * H - openInt < 0) bad.push(`الحيطان الداخلية: مساحة ${(g0.int * H).toFixed(1)} م² (طول ${g0.int.toFixed(1)} م${intHave ? " مدخل" : " تقديري"} × ارتفاع ${H} م) وفتحات ${openInt.toFixed(1)} م² (${iD} باب و${iW} شباك)`);
                return { error: "فتحات أكبر من مساحة الحيطان المخصوم منها، فلم يُحسب شيء. " + bad.join(" | ") + ". راجع عدد الأبواب والشبابيك في الخانة المذكورة أو طول الحيطان" + (g0.int === 0 ? " (لا توجد حيطان داخلية، وده يحصل مع غرفة واحدة أو لو طول الداخلي صفر)" : "") + "." };
            }
            const wf = 1 + n(v.waste, 5) / 100;
            const fmt = x => Math.ceil(x - 1e-9).toLocaleString("en-US");
            const tE = extL * w + (extL - 1) * j, tI = intL * w + (intL - 1) * j;
            const warn = [];
            if (!exact) {
                const lo = run(geom(1)), hi = run(geom(2));
                const vals = [R, lo, hi].filter(Boolean).map(x => x.bricks);
                warn.push(`الأطوال المقدّرة: ${[!extHave ? "الخارجية" : "", !intHave ? "الداخلية" : ""].filter(Boolean).join(" و")}. التقدير من المساحات وشكل الغرفة فقط. عند تغيير الشكل يتراوح الرقم من ${fmt(Math.min(...vals))} إلى ${fmt(Math.max(...vals))} طوبة بدون هالك، والفرق الحقيقي قد يكون أكبر. لا تشتري من هذا الرقم.`);
            }
            const fa = n(v.flatArea, 0);
            if (fa > 0 && Math.abs(sumA - fa) / fa > 0.1) warn.push(`مجموع مساحات الغرف (${sumA.toFixed(1)} م²) يختلف عن مساحة الشقة (${fa} م²) بأكتر من 10 بالمئة. غالباً غرفة أو طرقة ناقصة.`);
            if (exact && g0.int < 0.15 * g0.ext) warn.push("طول الحيطان الداخلية صغير جداً مقارنة بالخارجية. راجع الرقم.");
            if (openExt + openInt === 0) warn.push("لم تُدخل أي أبواب أو شبابيك، فلم يُخصم شيء. الكمية أعلى من الفعلية بمساحة الفتحات.");
            const baseRows = exact ? [] : [{ label: "⚠ دقة النتيجة", value: "تقديرية فقط", unit: "غير صالحة للشراء" }]
            if (openExt + openInt === 0) baseRows.push({ label: "⚠ الفتحات", value: "لم تُخصم", unit: "الكمية أعلى من الفعلية" });
            const tag = exact ? "" : " (تقريبي)";
            return {
                results: baseRows.concat([
                    { label: "عدد الطوب بدون هالك" + tag, value: (exact ? "" : "~") + fmt(R.bricks), unit: "طوبة" },
                    { label: "عدد الطوب مع الهالك" + tag, value: (exact ? "" : "~") + fmt(R.bricks * wf), unit: "طوبة" },
                    { label: "طول الحيطان الخارجية " + (extHave ? "(مدخل من المخطط)" : "(تقديري من المساحة)"), value: g0.ext.toFixed(1), unit: "m" },
                    { label: "طول الحيطان الداخلية " + (intHave ? "(مدخل من المخطط)" : "(تقديري من المساحة)"), value: g0.int.toFixed(1), unit: "m" },
                    { label: "مساحة الحيطان الخارجية قبل الفتحات", value: R.gE.toFixed(1), unit: "m²" },
                    { label: "فتحات الحيطان الخارجية (" + eD + " باب، " + eW + " شباك)", value: openExt.toFixed(1), unit: "m²" },
                    { label: "مساحة الحيطان الداخلية قبل الفتحات", value: R.gI.toFixed(1), unit: "m²" },
                    { label: "فتحات الحيطان الداخلية (" + iD + " باب، " + iW + " شباك)", value: openInt.toFixed(1), unit: "m²" },
                    { label: "السمك الفعلي: خارجي / داخلي", value: tE.toFixed(1) + " / " + tI.toFixed(1), unit: "cm" },
                    { label: "طوبة لكل م² ورقة واحدة", value: perLeaf.toFixed(1), unit: "طوبة/م²" }
                ]),
                formula: "الطوب = (صافي مساحة الحائط × عدد الأوراق) ÷ ((طول الوحدة + المونة) × (ارتفاع الوحدة + المونة))",
                steps: [
                    `عدد الغرف = ${N}، مجموع المساحات = ${sumA.toFixed(1)} م²`,
                    `خارجي: (${g0.ext.toFixed(1)} × ${H} - ${openExt.toFixed(1)}) = ${R.nE.toFixed(1)} م² × ${extL} ورقة`,
                    `داخلي: (${g0.int.toFixed(1)} × ${H} - ${openInt.toFixed(1)}) = ${R.nI.toFixed(1)} م² × ${intL} ورقة`,
                    `طوبة/م² لورقة = 10000 / ((${l}+${j}) × (${h}+${j})) = ${perLeaf.toFixed(1)}`,
                    `الإجمالي = (${R.nE.toFixed(1)}×${extL} + ${R.nI.toFixed(1)}×${intL}) × ${perLeaf.toFixed(1)} = ${fmt(R.bricks)}`
                ].concat(v.unit === "custom" ? [`المقاس الآخر: يظهر في وجه الحائط ${l}×${h} سم، والسمك ${w} سم لكل ورقة`] : []),
                notes: warn.concat((exact ? [] : ["الأطوال المقدّرة: الداخلي = (مجموع محيط الغرف - الخارجي) ÷ 2 بافتراض أن كل حيطة داخلية تفصل غرفتين وأن الغرف تملأ الشقة، ولا تفرق بين المحور والوجه الداخلي للحيطة."
]).concat(
                    (v.unit === "custom" ? [`المقاس الآخر: السمك الفعلي للحيطان الخارجية ${tE.toFixed(1)} سم والداخلية ${tI.toFixed(1)} سم (عرض الوحدة × عدد الأوراق + المونة بين الأوراق). عناوين "نحو 25 سم" و"نحو 12 سم" في الاختيارات تخص الطوب 25×12×6 فقط.`] : []).concat(["الأبواب والشبابيك تُخصم حسب الأعداد التي كتبتها لكل نوع حيطة. لا يوجد توزيع تلقائي.",
                    "الأعمدة والكمرات وسمك الأوراق عند الزوايا غير محسوبة. لورقتين نفترض ورقتين بنفس العدد لكل م².",
                    "الطوب الأحمر والأبيض الجيري هنا بنفس المقاس 25×12×6 سم، فالفرق في السعر والوزن لا في العدد. للبلوك أو السيبوركس اختر مقاس آخر واكتب أبعاد المورد (السيبوركس بمونة رقيقة جداً).",
                    "الكمية للتقدير. اطلب حصراً نهائياً من المهندس أو المقاول قبل الشراء."
                ]))),
                references: ["مقاسات الطوب: alamarmasr.com/brick-standard-sizes-egypt-guide", "55 و110 طوبة/م²: elbashmadni.com/2026/10/bricks-per-square-meter.html", "هالك 5-10%: alamarmasr.com/brick-quantity-calculation-guide"]
            };
        }
    },
    {
        id: "concrete-quantities",
        name: "كميات الخرسانة والحديد والتكلفة",
        nameEn: "Concrete, Rebar & Cost Quantities",
        category: "construction",
        icon: "building",
        desc: "حصر كميات وميزانية فقط، من أبعاد وبيانات تصميم يعطيها المهندس الإنشائي. لا تحسب سمك البلاطة ولا عدد الأعمدة أو القواعد ولا التسليح، ولا تقترحها من مساحة الأرض. اترك أي عنصر غير موجود فارغاً.",
        inputs: [
            { id: "sArea", label: "بلاطة: المساحة", unit: "m²", type: "number", min: 0, help: "من المخطط الإنشائي. اترك الخانات الثلاث فارغة لو لا توجد بلاطة." },
            { id: "sT", label: "بلاطة: السمك (من التصميم)", unit: "cm", type: "number", min: 0 },
            { id: "sRebar", label: "بلاطة: وزن الحديد لكل م³ خرسانة (من جدول الحديد)", unit: "kg/m³", type: "number", min: 0 },
            { id: "cN", label: "أعمدة: العدد", type: "number", min: 0, step: 1, help: "العدد من المخطط الإنشائي، وليس تقديراً من المساحة." },
            { id: "cW", label: "أعمدة: العرض", unit: "cm", type: "number", min: 0 },
            { id: "cD", label: "أعمدة: العمق", unit: "cm", type: "number", min: 0 },
            { id: "cH", label: "أعمدة: الارتفاع", unit: "m", type: "number", min: 0 },
            { id: "cRebar", label: "أعمدة: وزن الحديد لكل م³ خرسانة", unit: "kg/m³", type: "number", min: 0 },
            { id: "fN", label: "قواعد: العدد", type: "number", min: 0, step: 1 },
            { id: "fL", label: "قواعد: الطول", unit: "m", type: "number", min: 0 },
            { id: "fW", label: "قواعد: العرض", unit: "m", type: "number", min: 0 },
            { id: "fT", label: "قواعد: السمك", unit: "cm", type: "number", min: 0 },
            { id: "fRebar", label: "قواعد: وزن الحديد لكل م³ خرسانة", unit: "kg/m³", type: "number", min: 0 },
            { id: "mixType", label: "مصدر الخرسانة", type: "select", options: [
                { value: "site", label: "خلط بالموقع بنسبة حجمية (أسمنت : رمل : زلط)" },
                { value: "ready", label: "خرسانة جاهزة (سعر المتر المكعب)" }
            ]},
            { id: "mC", label: "نسبة الأسمنت (للخلط بالموقع، من المهندس)", type: "number", min: 0, help: "مثال للكتابة فقط: 1. لا توجد قيمة افتراضية لأن النسبة تأتي من تصميم الخلطة." },
            { id: "mS", label: "نسبة الرمل", type: "number", min: 0 },
            { id: "mA", label: "نسبة الزلط", type: "number", min: 0 },
            { id: "dry", label: "معامل الحجم الجاف", type: "number", default: 1.54, min: 1, help: "1.54 قيمة شائعة في المصادر. غيّرها لو المهندس أو المورد حدد غيرها." },
            { id: "cDen", label: "كثافة الأسمنت", unit: "kg/m³", type: "number", default: 1440, min: 1000 },
            { id: "bag", label: "وزن شكارة الأسمنت", unit: "kg", type: "number", default: 50, min: 1 },
            { id: "wC", label: "هالك الخرسانة", unit: "%", type: "number", default: 5, min: 0 },
            { id: "wR", label: "هالك الحديد (فوق وزن جدول الحديد)", unit: "%", type: "number", default: 0, min: 0, help: "جدول حديد المهندس يشمل الوصلات غالباً. أضف نسبة فقط لو قال ذلك." },
            { id: "pCem", label: "سعر شكارة الأسمنت (50 كجم)", unit: "ج.م", type: "number", min: 0 },
            { id: "pSand", label: "سعر م³ الرمل", unit: "ج.م", type: "number", min: 0 },
            { id: "pAgg", label: "سعر م³ الزلط", unit: "ج.م", type: "number", min: 0 },
            { id: "pReady", label: "سعر م³ الخرسانة الجاهزة", unit: "ج.م", type: "number", min: 0 },
            { id: "pRebar", label: "سعر طن الحديد", unit: "ج.م", type: "number", min: 0 },
            { id: "pOther", label: "تكلفة أخرى لكل م³ خرسانة (عمالة، شدة، صب...)", unit: "ج.م", type: "number", min: 0 }
        ],
        calculate(v) {
            const num = x => { const y = parseFloat(x); return isFinite(y) ? y : null; };
            const pos = x => { const y = num(x); return y !== null && y > 0 ? y : null; };
            const els = [];
            const miss = [];
            // slab
            const sIn = [v.sArea, v.sT].map(pos);
            if (sIn.some(x => x) ) {
                if (!sIn.every(x => x)) return { error: "البلاطة: اكتب المساحة والسمك معاً أو اترك الاثنين فارغين." };
                els.push({ name: "البلاطة", vol: sIn[0] * sIn[1] / 100, reb: num(v.sRebar), key: "sRebar" });
            }
            const cIn = [v.cN, v.cW, v.cD, v.cH].map(pos);
            if (cIn.some(x => x)) {
                if (!cIn.every(x => x)) return { error: "الأعمدة: اكتب العدد والعرض والعمق والارتفاع كلها أو اتركها فارغة." };
                els.push({ name: "الأعمدة", vol: cIn[0] * (cIn[1] / 100) * (cIn[2] / 100) * cIn[3], reb: num(v.cRebar), key: "cRebar" });
            }
            const fIn = [v.fN, v.fL, v.fW, v.fT].map(pos);
            if (fIn.some(x => x)) {
                if (!fIn.every(x => x)) return { error: "القواعد: اكتب العدد والطول والعرض والسمك كلها أو اتركها فارغة." };
                els.push({ name: "القواعد", vol: fIn[0] * fIn[1] * fIn[2] * fIn[3] / 100, reb: num(v.fRebar), key: "fRebar" });
            }
            if (!els.length) return { error: "اكتب بيانات عنصر واحد على الأقل من التصميم الإنشائي (بلاطة أو أعمدة أو قواعد)." };
            for (const e of els) if (e.reb === null || e.reb < 0) return { error: `${e.name}: اكتب وزن الحديد لكل م³ من جدول الحديد (اكتب 0 لو بدون حديد).` };
            const ready = v.mixType === "ready";
            let parts = null;
            if (!ready) {
                const c = pos(v.mC), s = num(v.mS), a = num(v.mA);
                if (!c || s === null || a === null || s < 0 || a < 0) return { error: "اكتب نسبة الخلط (أسمنت ورمل وزلط) من تصميم الخلطة، أو اختر خرسانة جاهزة." };
                parts = { c, s, a, sum: c + s + a };
            }
            const f = num(v.dry) || 1.54, den = num(v.cDen) || 1440, bag = num(v.bag) || 50;
            const wc = 1 + (num(v.wC) || 0) / 100, wr = 1 + (num(v.wR) || 0) / 100;
            const up = x => Math.ceil(x * 100 - 1e-9) / 100;
            const fmt = x => Math.ceil(x - 1e-9).toLocaleString("en-US");
            const price = { cem: pos(v.pCem), sand: pos(v.pSand), agg: pos(v.pAgg), ready: pos(v.pReady), reb: pos(v.pRebar), other: num(v.pOther) || 0 };
            const totNet = els.reduce((a, e) => a + e.vol, 0);
            const totOrder = totNet * wc;
            const totReb = els.reduce((a, e) => a + e.vol * e.reb, 0) * wr;
            const rows = [];
            els.forEach(e => { rows.push({ label: `${e.name}: حجم الخرسانة (صافي)`, value: e.vol.toFixed(2), unit: "m³" }); rows.push({ label: `${e.name}: الحديد`, value: (e.vol * e.reb * wr).toFixed(0), unit: "كجم" }); });
            rows.push({ label: "إجمالي الخرسانة بدون هالك", value: totNet.toFixed(2), unit: "m³" });
            rows.push({ label: "الخرسانة المطلوبة مع الهالك", value: up(totOrder).toFixed(2), unit: "m³" });
            rows.push({ label: "الحديد", value: (totReb / 1000).toFixed(3), unit: "طن" });
            let matCost = 0, partial = false;
            let cemKg = 0, sandV = 0, aggV = 0;
            if (!ready) {
                const dry = totOrder * f;
                cemKg = dry * parts.c / parts.sum * den;
                sandV = dry * parts.s / parts.sum;
                aggV = dry * parts.a / parts.sum;
                rows.push({ label: "الأسمنت", value: fmt(cemKg / bag), unit: "شكارة (" + bag + " كجم)" });
                rows.push({ label: "الرمل", value: up(sandV).toFixed(2), unit: "m³" });
                rows.push({ label: "الزلط", value: up(aggV).toFixed(2), unit: "m³" });
            }
            const costOf = (e) => {
                const share = e.vol / totNet;
                let t = 0, p = false;
                if (ready) { if (price.ready) t += totOrder * share * price.ready; else p = true; }
                else {
                    if (price.cem) t += Math.ceil(cemKg / bag) * share * price.cem; else p = true;
                    if (price.sand) t += sandV * share * price.sand; else p = true;
                    if (price.agg) t += aggV * share * price.agg; else p = true;
                }
                if (e.reb > 0) { if (price.reb) t += e.vol * e.reb * wr / 1000 * price.reb; else p = true; }
                t += totOrder * share * price.other;
                return { t, p };
            };
            let grand = 0;
            els.forEach(e => { const c = costOf(e); grand += c.t; if (c.p) partial = true; rows.push({ label: `تكلفة ${e.name}${c.p ? " (جزئية، سعر ناقص)" : ""}`, value: fmt(c.t), unit: "ج.م" }); });
            rows.push({ label: partial ? "⚠ إجمالي التكلفة (جزئي: أسعار ناقصة)" : "إجمالي التكلفة", value: fmt(grand), unit: "ج.م" });
            const notes = [
                "كل أبعاد العناصر وعدد الأعمدة والقواعد ووزن الحديد لكل م³ ونسبة الخلط تأتي من التصميم الإنشائي للمهندس. الحاسبة لا تحدد سمك البلاطة ولا عدد الأعمدة ولا التسليح من مساحة الأرض.",
                (typeof MARKET_PRICES !== "undefined" && MARKET_PRICES.items)
                    ? `الأسعار المعبأة مسبقاً متوسط السوق المصري (القاهرة الكبرى) وهي استرشادية — آخر تحديث ${MARKET_PRICES.updated}، المصدر: ${MARKET_PRICES.source.name}. تختلف الأسعار حسب المحافظة والمورد والكمية، فعدّلها بأسعارك الفعلية قبل الاعتماد على الإجمالي.`
                    : "كل الأسعار من إدخالك. لم تُستخدم أسعار سوق.",
                "الحجوم من الأبعاد الصافية ولا تخصم تداخل البلاطة مع الأعمدة أو الكمرات، ولا تشمل الكمرات والسلالم والأسقف الأخرى. اضفها كعناصر منفصلة من المهندس.",
                "الخلط بالموقع: الأسمنت = (الحجم المطلوب × معامل الحجم الجاف ÷ مجموع النسب) × نسبة الأسمنت × كثافة الأسمنت. الرمل والزلط بنفس الطريقة بدون الكثافة. المعامل 1.54 والكثافة 1440 قيم شائعة من مصادر ثانوية (civilmath.com وconcretecivil.com وbuildnumerics.com) وتختلف مع المواد الفعلية. الخرسانة الإنشائية تُحدد بتصميم الخلطة وليس بنسبة عامة."
            ];
            if (!ready && partial) notes.unshift("بعض الأسعار غير مكتوبة، فالإجمالي جزئي وليس ميزانية كاملة.");
            return {
                results: rows,
                formula: "الحجم = الأبعاد الصافية | المطلوب = الحجم × (1 + الهالك) | الحديد = الحجم × كجم/م³ | الأسمنت = (المطلوب × معامل الجاف ÷ مجموع النسب) × نسبة الأسمنت × الكثافة",
                steps: els.map(e => `${e.name}: ${e.vol.toFixed(3)} م³ × ${e.reb} كجم/م³ = ${(e.vol * e.reb).toFixed(0)} كجم`).concat([`إجمالي الخرسانة ${totNet.toFixed(3)} × ${wc.toFixed(2)} = ${totOrder.toFixed(3)} م³`]),
                notes,
                references: ["معامل 1.54: civilmath.com/articles/cement-bags-per-cubic-meter-m15-m20-m25", "طريقة الحساب: concretecivil.com/calculation-of-materials-for-different-mix-ratio-of-concrete", "كثافة الأسمنت 1440 وشكارة 50 كجم: buildnumerics.com/calculators/cement-calculator"]
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
    },
    {
        id: "short-circuit",
        name: "تيار القصر وقدرة قطع القاطع",
        nameEn: "Short-Circuit Current & Breaking Capacity",
        category: "protection",
        icon: "zap",
        desc: "تيار القصر من المحول ونهاية الكابل، وقدرة القطع المطلوبة للقاطع، والتحقق الحراري لمقطع الكابل.",
        badge: "NEW",
        inputs: [
            { id: "sn", label: "قدرة المحول", unit: "kVA", type: "number", required: true, min: 25, default: 1000 },
            { id: "uk", label: "معاوقة المحول uk", unit: "%", type: "number", required: true, min: 2, max: 20, step: 0.1, default: 6, help: "من لوحة المحول — 4% و6% هما الشائعان." },
            { id: "u", label: "جهد الجانب المنخفض", unit: "V", type: "number", required: true, min: 100, default: 400, help: "400 للشبكات 380/400، و415 للشبكات 415." },
            { id: "size", label: "مقطع كابل التغذية", unit: "mm²", type: "number", required: true, min: 1, default: 95 },
            { id: "length", label: "طول كابل التغذية", unit: "m", type: "number", required: true, min: 1, default: 30 },
            { id: "material", label: "مادة الموصل", type: "select", options: [{ value: "cu", label: "نحاس Cu" }, { value: "al", label: "ألمنيوم Al" }] },
            { id: "insul", label: "نوع العزل", type: "select", options: [{ value: "pvc", label: "PVC — k=115 (نحاس)" }, { value: "xlpe", label: "XLPE — k=143 (نحاس)" }] },
            { id: "t", label: "زمن فصل العطل", unit: "s", type: "number", required: true, min: 0.01, max: 5, step: 0.01, default: 0.1, help: "الزمن الفعلي من منحنى القاطع عند تيار القصر، وليس الزمن المقنن." }
        ],
        calculate(v) {
            const Sn = Number(v.sn) * 1000;
            const uk = Number(v.uk) / 100;
            const U = Number(v.u);
            const S = Number(v.size);
            const L = Number(v.length);
            const t = Number(v.t);
            const isAl = v.material === "al";
            const k = isAl ? (v.insul === "xlpe" ? 94 : 76) : (v.insul === "xlpe" ? 143 : 115);
            if (!(Sn > 0 && uk > 0 && U > 0 && S > 0 && L > 0 && t > 0)) return { error: "تحقق من القيم المدخلة" };
            const Zt = (U * U * uk) / Sn;
            const rho = isAl ? 0.036 : 0.0225;
            const Rc = (rho * L) / S;
            const Xc = 0.00008 * L;
            const Zc = Math.sqrt(Rc * Rc + Xc * Xc);
            const IscPanel = U / (Math.sqrt(3) * Zt) / 1000;
            const IscEnd = U / (Math.sqrt(3) * (Zt + Zc)) / 1000;
            const minS = (IscEnd * 1000 * Math.sqrt(t)) / k;
            const icuList = [4, 6, 10, 15, 20, 25, 36, 50, 65, 85, 100];
            const icu = icuList.find(x => x >= IscPanel);
            const thermalOK = minS <= S;
            return {
                results: [
                    { label: "تيار القصر عند أطراف المحول", value: IscPanel.toFixed(2), unit: "kA" },
                    { label: "تيار القصر عند نهاية الكابل", value: IscEnd.toFixed(2), unit: "kA" },
                    { label: "أقل قدرة قطع Icu للقاطع", value: icu ? String(icu) : "أكبر من 100", unit: "kA" },
                    { label: "أقل مقطع للتحمل الحراري", value: minS.toFixed(1), unit: "mm²" },
                    { label: "حالة المقطع الحالي", value: thermalOK ? "كافٍ ✓" : "غير كافٍ ✗", unit: "" }
                ],
                formula: "Isc = U / (√3 × Z) — Z = Zt + Zc — S ≥ Isc·√t / k",
                steps: [
                    "Zt = (U² × uk) / Sn = " + Zt.toFixed(4) + " Ω",
                    "Zc = " + Zc.toFixed(4) + " Ω (R=" + Rc.toFixed(4) + "، X=" + Xc.toFixed(4) + ")",
                    "Isc = " + U + " / (√3 × " + (Zt + Zc).toFixed(4) + ") = " + (IscEnd * 1000).toFixed(0) + " A",
                    "k²S² = " + Math.pow(k * S, 2).toExponential(2) + " ≥ I²t = " + (Math.pow(IscEnd * 1000, 2) * t).toExponential(2)
                ],
                notes: [
                    "حساب مبسّط وفق IEC 60909: لا يشمل مساهمة الموتورات ولا مقاومة شبكة التغذية، ومناسب للتقدير واختيار Icu المبدئي.",
                    "تيار القصر في الواقع قد يزيد 10–20% في الكابلات الكبيرة بسبب نسبة X/R؛ استخدم برنامج الحساب في التصميم النهائي.",
                    "قدرة القطع Icu للقاطع يجب أن تكون ≥ تيار القصر عند نقطة التركيب، وتحقق كذلك من Ics (قدرة القطع التشغيلية) وIcm (التحمل الديناميكي).",
                    "التحقق الحراري: k²S² ≥ I²t. قيمة k من IEC 60364-4-43: نحاس PVC 115، نحاس XLPE 143، ألمنيوم PVC 76، ألمنيوم XLPE 94."
                ],
                references: ["IEC 60909", "IEC 60364-4-43", "IEC 60947-2"]
            };
        }
    },
    {
        id: "transformer-sizing",
        name: "اختيار قدرة المحول",
        nameEn: "Transformer Sizing",
        category: "design",
        icon: "layers",
        desc: "قدرة المحول المطلوبة من الحمل المتصل ومعامل الطلب والهامش المستقبلي، مع نسبة التحميل وتيار القصر.",
        badge: "NEW",
        inputs: [
            { id: "load", label: "الحمل المتصل", unit: "kW", type: "number", required: true, min: 1, default: 600 },
            { id: "df", label: "معامل الطلب", unit: "%", type: "number", required: true, min: 10, max: 100, default: 80, help: "نسبة الحمل الفعلي إلى المتصل — 70–85% للمباني الإدارية والسكنية." },
            { id: "pf", label: "معامل القدرة", type: "number", required: true, min: 0.5, max: 1, step: 0.01, default: 0.85 },
            { id: "growth", label: "هامش مستقبلي", unit: "%", type: "number", required: true, min: 0, max: 100, default: 20 },
            { id: "u", label: "جهد الجانب المنخفض", unit: "V", type: "number", required: true, min: 100, default: 400 },
            { id: "uk", label: "معاوقة المحول uk", unit: "%", type: "number", required: true, min: 2, max: 20, step: 0.1, default: 6 }
        ],
        calculate(v) {
            const load = Number(v.load);
            const df = Number(v.df) / 100;
            const pf = Number(v.pf);
            const growth = Number(v.growth) / 100;
            const U = Number(v.u);
            const uk = Number(v.uk) / 100;
            if (!(load > 0 && df > 0 && pf > 0 && U > 0 && uk > 0)) return { error: "تحقق من القيم المدخلة" };
            const demand = load * df;
            const kva = (demand / pf) * (1 + growth);
            const ratings = [100, 160, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500];
            const chosen = ratings.find(r => r >= kva);
            const loading = chosen ? (kva / chosen) * 100 : 0;
            const IFL = chosen ? (chosen * 1000) / (Math.sqrt(3) * U) : 0;
            const Isc = chosen ? (chosen * 1000) / (Math.sqrt(3) * U * uk) / 1000 : 0;
            return {
                results: [
                    { label: "الحمل التصميمي", value: demand.toFixed(0), unit: "kW" },
                    { label: "القدرة المطلوبة", value: kva.toFixed(1), unit: "kVA" },
                    { label: "المحول المقترح", value: chosen ? String(chosen) : "أكبر من 2500", unit: "kVA" },
                    { label: "نسبة التحميل", value: chosen ? loading.toFixed(0) : "—", unit: "%" },
                    { label: "تيار الحمل الكامل", value: IFL.toFixed(0), unit: "A" },
                    { label: "تيار القصر المتوقع", value: Isc.toFixed(1), unit: "kA" }
                ],
                formula: "kVA = (Load × DF / PF) × (1 + Growth)",
                steps: [
                    "الحمل التصميمي = " + load + " × " + (df * 100).toFixed(0) + "% = " + demand.toFixed(0) + " kW",
                    "kVA = " + demand.toFixed(0) + " / " + pf + " × " + (1 + growth).toFixed(2) + " = " + kva.toFixed(1) + " kVA",
                    "أقرب مقاس قياسي أعلى = " + (chosen || "—") + " kVA"
                ],
                notes: [
                    "المقاسات القياسية المستخدمة: 100، 160، 250، 315، 400، 500، 630، 800، 1000، 1250، 1600، 2000، 2500 kVA (IEC 60076).",
                    "نسبة تحميل أعلى من 85% لا تترك مجالًا للاحتياطي — اختر المقاس الأعلى إن كان الحمل قابلًا للزيادة.",
                    "المحولات تحتاج تخفيض قدرة عند درجات حرارة عالية أو تركيب في غرفة غير جيدة التهوية — راجع داتاشيت المصنع.",
                    "الأحمال غير الخطية (VFD، UPS، إضاءة LED) تحتاج محولًا بعامل K مناسب أو تكبير القدرة 10–15%."
                ],
                references: ["IEC 60076", "IEC 60364-5-52"]
            };
        }
    },
    {
        id: "generator-sizing",
        name: "اختيار المولد وبدء الموتور",
        nameEn: "Generator Sizing & Motor Starting",
        category: "design",
        icon: "activity",
        desc: "قدرة المولد المطلوبة للحمل المستقر ولبدء أكبر موتور، وهبوط الجهد المتوقع عند البدء.",
        badge: "NEW",
        inputs: [
            { id: "steady", label: "الحمل المستقر", unit: "kW", type: "number", required: true, min: 0, default: 200, help: "إجمالي الأحمال التي تعمل معًا بعد بدء الموتورات." },
            { id: "pf", label: "معامل القدرة", type: "number", required: true, min: 0.5, max: 1, step: 0.01, default: 0.8 },
            { id: "motor", label: "قدرة أكبر موتور", unit: "kW", type: "number", required: true, min: 0.1, default: 45 },
            { id: "motorPf", label: "معامل قدرة الموتور", type: "number", required: true, min: 0.5, max: 1, step: 0.01, default: 0.85 },
            { id: "motorEff", label: "كفاءة الموتور", unit: "%", type: "number", required: true, min: 50, max: 100, default: 92 },
            { id: "start", label: "طريقة البدء", type: "select", options: [{ value: "dol", label: "مباشر DOL — 6× التيار" }, { value: "sd", label: "نجمة/دلتا — 2.5×" }, { value: "soft", label: "Soft Starter — 3×" }, { value: "vfd", label: "VFD (عاكس) — 1.5×" }] },
            { id: "u", label: "الجهد", unit: "V", type: "number", required: true, min: 100, default: 400 },
            { id: "dip", label: "أقصى هبوط جهد مسموح", unit: "%", type: "number", required: true, min: 5, max: 40, default: 15, help: "15% حد شائع عند بدء الموتور؛ 10% لو فيه أحمال حساسة." },
            { id: "xd", label: "معاوقة المولد X″d", unit: "pu", type: "number", required: true, min: 0.05, max: 0.4, step: 0.01, default: 0.18, help: "من داتاشيت المولد — 0.10–0.20 للمولدات القياسية." }
        ],
        calculate(v) {
            const steady = Number(v.steady);
            const pf = Number(v.pf);
            const motor = Number(v.motor);
            const motorPf = Number(v.motorPf);
            const motorEff = Number(v.motorEff) / 100;
            const U = Number(v.u);
            const dip = Number(v.dip) / 100;
            const xd = Number(v.xd);
            const factors = { dol: 6, sd: 2.5, soft: 3, vfd: 1.5 };
            const factor = factors[v.start] || 6;
            if (!(motor > 0 && pf > 0 && motorPf > 0 && motorEff > 0 && U > 0 && dip > 0 && xd > 0)) return { error: "تحقق من القيم المدخلة" };
            const FLC = (motor * 1000) / (Math.sqrt(3) * U * motorPf * motorEff);
            const startKVA = (factor * FLC * Math.sqrt(3) * U) / 1000;
            const genStart = (xd * startKVA) / dip;
            const genSteady = (steady / pf) * 1.1;
            const required = Math.max(genStart, genSteady);
            const ratings = [20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600];
            const chosen = ratings.find(r => r >= required);
            const dipActual = chosen ? (xd * startKVA / chosen) * 100 : 0;
            const engineKW = chosen ? chosen * 0.8 : 0;
            return {
                results: [
                    { label: "تيار الحمل الكامل للموتور", value: FLC.toFixed(1), unit: "A" },
                    { label: "قدرة البدء (kVA)", value: startKVA.toFixed(0), unit: "kVA" },
                    { label: "المولد المطلوب للبدء", value: genStart.toFixed(0), unit: "kVA" },
                    { label: "المولد المطلوب للحمل", value: genSteady.toFixed(0), unit: "kVA" },
                    { label: "المولد المقترح", value: chosen ? String(chosen) : "أكبر من 1600", unit: "kVA" },
                    { label: "هبوط الجهد عند البدء", value: chosen ? dipActual.toFixed(1) : "—", unit: "%" },
                    { label: "أقل قدرة محرك ديزل", value: engineKW ? engineKW.toFixed(0) : "—", unit: "kW" }
                ],
                formula: "kVA_gen ≥ X″d × S_start / ΔV — I_start = factor × I_FL",
                steps: [
                    "I_FL = " + motor + "×1000 / (√3 × " + U + " × " + motorPf + " × " + motorEff.toFixed(2) + ") = " + FLC.toFixed(1) + " A",
                    "S_start = " + factor + " × " + FLC.toFixed(1) + " × √3 × " + U + " = " + startKVA.toFixed(0) + " kVA",
                    "kVA للبدء = " + xd + " × " + startKVA.toFixed(0) + " / " + (dip * 100).toFixed(0) + "% = " + genStart.toFixed(0) + " kVA",
                    "kVA للحمل المستقر = " + steady + " / " + pf + " × 1.1 = " + genSteady.toFixed(0) + " kVA"
                ],
                notes: [
                    "قانون هبوط الجهد تقريبي: ΔV ≈ X″d × (S_start / S_gen) — بدون حساب الأحمال الأخرى المصاحبة للبدء.",
                    "ابدأ أكبر موتور أولًا ثم شغّل الباقي بالتتابع؛ بدء موتورين معًا يضاعف قدرة البدء المطلوبة.",
                    "Soft starter وVFD يقللان قدرة البدء بشكل كبير — راجع منحنى البدء الفعلي من داتاشيت الجهاز.",
                    "قدرة محرك الديزل يجب ألا تقل عن 0.8 × kVA المولد تقريبًا، مع مراعاة تصنيفات ISO 8528 (PRP/COP) والارتفاع ودرجة الحرارة.",
                    "هبوط 15% مقبول لمعظم الأحمال؛ لو فيه PLC أو أجهزة حساسة استخدم حدًا 10% أو أضف مثبت جهد."
                ],
                references: ["ISO 8528", "IEC 60034", "IEEE 141"]
            };
        }
    },
    {
        id: "cable-derating",
        name: "معاملات تخفيض سعة الكابل",
        nameEn: "Cable Derating Factors",
        category: "design",
        icon: "trending-down",
        desc: "تطبيق معاملات الحرارة والتجميع والعزل الحراري على سعة الكابل، وحساب السعة الأساسية المطلوبة.",
        badge: "NEW",
        inputs: [
            { id: "ib", label: "تيار التصميم Ib", unit: "A", type: "number", required: true, min: 0.1, default: 100 },
            { id: "iz", label: "سعة الكابل الأساسية Iz", unit: "A", type: "number", required: true, min: 0.1, default: 130, help: "من جدول المصنع أو الكود لدائرة واحدة بحرارة 30°م — قبل أي تخفيض." },
            { id: "insul", label: "نوع العزل", type: "select", options: [{ value: "pvc", label: "PVC — 70°م" }, { value: "xlpe", label: "XLPE — 90°م" }] },
            { id: "ambient", label: "حرارة المحيط التصميمية", unit: "°م", type: "number", required: true, min: 20, max: 60, default: 40, help: "استخدم أعلى حرارة متوقعة: 45–50°م في غرف الماكينات والأسطح في مصر." },
            { id: "circuits", label: "عدد الدوائر المجمعة", type: "number", required: true, min: 1, max: 9, default: 1 },
            { id: "insulation", label: "الكابل ملامس لعزل حراري؟", type: "select", options: [{ value: "no", label: "لا" }, { value: "yes", label: "نعم — Ci = 0.75" }] }
        ],
        calculate(v) {
            const Ib = Number(v.ib);
            const Iz = Number(v.iz);
            const amb = Number(v.ambient);
            const n = Math.round(Number(v.circuits));
            const pvc = { 25: 1.03, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.50 };
            const xlpe = { 25: 1.02, 30: 1.0, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76, 60: 0.71 };
            const table = v.insul === "xlpe" ? xlpe : pvc;
            const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
            let Ca;
            if (amb <= keys[0]) Ca = table[keys[0]];
            else if (amb >= keys[keys.length - 1]) Ca = table[keys[keys.length - 1]];
            else {
                for (let i = 0; i < keys.length - 1; i++) {
                    if (amb >= keys[i] && amb <= keys[i + 1]) {
                        const t = (amb - keys[i]) / (keys[i + 1] - keys[i]);
                        Ca = table[keys[i]] + t * (table[keys[i + 1]] - table[keys[i]]);
                        break;
                    }
                }
            }
            const group = { 1: 1.0, 2: 0.8, 3: 0.7, 4: 0.65, 5: 0.6, 6: 0.57, 7: 0.54, 8: 0.52, 9: 0.5 };
            const Cg = group[Math.min(Math.max(n, 1), 9)];
            const Ci = v.insulation === "yes" ? 0.75 : 1.0;
            if (!(Ib > 0 && Iz > 0 && amb > 0)) return { error: "تحقق من القيم المدخلة" };
            const total = Ca * Cg * Ci;
            const corrected = Iz * total;
            const required = Ib / total;
            const ok = corrected >= Ib;
            return {
                results: [
                    { label: "معامل الحرارة Ca", value: Ca.toFixed(2), unit: "" },
                    { label: "معامل التجميع Cg", value: Cg.toFixed(2), unit: "" },
                    { label: "معامل العزل الحراري Ci", value: Ci.toFixed(2), unit: "" },
                    { label: "المعامل الكلي", value: total.toFixed(3), unit: "" },
                    { label: "السعة بعد التخفيض", value: corrected.toFixed(1), unit: "A" },
                    { label: "أقل Iz أساسية مطلوبة", value: required.toFixed(1), unit: "A" },
                    { label: "الحالة", value: ok ? "الكابل كافٍ ✓" : "الكابل غير كافٍ ✗", unit: "" }
                ],
                formula: "Iz' = Iz × Ca × Cg × Ci ≥ Ib",
                steps: [
                    "Ca عند " + amb + "°م (" + (v.insul === "xlpe" ? "XLPE" : "PVC") + ") = " + Ca.toFixed(2),
                    "Cg لعدد " + n + " دائرة = " + Cg.toFixed(2),
                    "Iz' = " + Iz + " × " + total.toFixed(3) + " = " + corrected.toFixed(1) + " A",
                    "المطلوب: Iz ≥ " + Ib + " / " + total.toFixed(3) + " = " + required.toFixed(1) + " A"
                ],
                notes: [
                    "المعاملات من BS 7671: الجدول 4B1 (حرارة المحيط في الهواء) والجدول 4C1 (تجميع الدوائر) — وهي القيم المستخدمة في الكود المصري والممارسة الشائعة.",
                    "السعة الأساسية Iz يجب أن تكون من جدول المصنع أو الكود لطريقة التركيب الفعلية (هواء، مواسير، مدفون، صينية) — لكل طريقة جدولها.",
                    "الكابلات المدفونة في الأرض لها معاملات حرارة تربة ومعاملات مقاومة حرارية مختلفة (لا تستخدم هذا الجدول لها).",
                    "لو النتيجة غير كافية: كبّر المقطع، أو قلل عدد الدوائر في المسار، أو حسّن التهوية — ولا تعتمد على تخمين."
                ],
                references: ["BS 7671 Table 4B1", "BS 7671 Table 4C1", "IEC 60364-5-52"]
            };
        }
    },
    {
        id: "earth-fault-loop",
        name: "أقصى طول دائرة وفصل العطل",
        nameEn: "Earth Fault Loop & Max Circuit Length",
        category: "protection",
        icon: "shield",
        desc: "أقصى طول مسموح للدائرة حتى يفصل القاطع تيار العطل الأرضي في الزمن المطلوب، وفق منحنى القاطع.",
        badge: "NEW",
        inputs: [
            { id: "u0", label: "جهد الطور U0", unit: "V", type: "number", required: true, min: 100, default: 230 },
            { id: "ze", label: "معاوقة مصدر الأرضي Ze", unit: "Ω", type: "number", required: true, min: 0.01, step: 0.01, default: 0.35, help: "من المحول/المصدر — 0.35Ω شائع في TN-C-S." },
            { id: "size", label: "مقطع موصل الطور", unit: "mm²", type: "number", required: true, min: 0.5, default: 2.5 },
            { id: "cpc", label: "مقطع موصل الحماية", unit: "mm²", type: "number", required: true, min: 0.5, default: 2.5 },
            { id: "in", label: "تيار القاطع المقنن In", unit: "A", type: "number", required: true, min: 1, default: 16 },
            { id: "curve", label: "منحنى القاطع", type: "select", options: [{ value: "b", label: "B — 5×In" }, { value: "c", label: "C — 10×In" }, { value: "d", label: "D — 20×In" }] },
            { id: "length", label: "طول الدائرة الفعلي", unit: "m", type: "number", required: true, min: 0.1, default: 30 }
        ],
        calculate(v) {
            const U0 = Number(v.u0);
            const Ze = Number(v.ze);
            const S = Number(v.size);
            const Scpc = Number(v.cpc);
            const In = Number(v.in);
            const L = Number(v.length);
            const mult = v.curve === "d" ? 20 : v.curve === "c" ? 10 : 5;
            if (!(U0 > 0 && Ze > 0 && S > 0 && Scpc > 0 && In > 0 && L > 0)) return { error: "تحقق من القيم المدخلة" };
            const Ia = mult * In;
            const maxZs = (0.95 * U0) / Ia;
            const rPerM = 0.0225 * (1 / S + 1 / Scpc);
            const maxLen = (maxZs - Ze) / rPerM;
            const ok = L <= maxLen;
            const zsActual = Ze + rPerM * L;
            return {
                results: [
                    { label: "تيار الفصل Ia", value: Ia.toFixed(0), unit: "A" },
                    { label: "أقصى معاوقة Zs", value: maxZs.toFixed(3), unit: "Ω" },
                    { label: "مقاومة المتر (R1+R2)", value: rPerM.toFixed(4), unit: "Ω/m" },
                    { label: "أقصى طول للدائرة", value: maxLen > 0 ? maxLen.toFixed(0) : "0", unit: "m" },
                    { label: "Zs عند الطول الفعلي", value: zsActual.toFixed(3), unit: "Ω" },
                    { label: "الحالة", value: ok ? "الطول مسموح ✓" : "الطول كبير ✗ — استخدم RCD", unit: "" }
                ],
                formula: "Zs = 0.95·U0 / Ia ≤ Ze + (R1+R2)·L",
                steps: [
                    "Ia = " + mult + " × " + In + " = " + Ia + " A",
                    "Zs_max = 0.95 × " + U0 + " / " + Ia + " = " + maxZs.toFixed(3) + " Ω",
                    "R1+R2 للمتر = 0.0225 × (1/" + S + " + 1/" + Scpc + ") = " + rPerM.toFixed(4) + " Ω/m",
                    "L_max = (" + maxZs.toFixed(3) + " − " + Ze + ") / " + rPerM.toFixed(4) + " = " + (maxLen > 0 ? maxLen.toFixed(0) : 0) + " m"
                ],
                notes: [
                    "عامل 0.95 هو Cmin وفق IEC 60364-4-41 (أسوأ حالة جهد).",
                    "المقاومة محسوبة عند حرارة التشغيل (ρ=0.0225 Ω·mm²/m للنحاس). للألمنيوم استخدم 0.036.",
                    "لو الطول أكبر من المسموح: قلل تيار القاطع، كبّر المقطع، أو استخدم RCD بتيار 30mA للحماية من الصعق (لا يعفي من فصل العطل).",
                    "في أنظمة TT يجب استخدام RCD دائمًا؛ هذه الحاسبة لأنظمة TN (TN-S / TN-C-S)."
                ],
                references: ["IEC 60364-4-41", "BS 7671 — 411"]
            };
        }
    }
];

/* ========================================
   تعبئة أسعار السوق المصري تلقائياً في حاسبة الكميات
   (js/data/market-prices.js — تُحدَّث أسبوعياً)
======================================== */
(function () {
    const MP = (typeof MARKET_PRICES !== "undefined") ? MARKET_PRICES : null;
    if (!MP || !MP.items) return;
    const calc = CALCULATORS.find(c => c.id === "concrete-quantities");
    if (!calc) return;
    const map = { pCem: "cementBag", pSand: "sandM3", pAgg: "gravelM3", pReady: "readyMixM3", pRebar: "rebarTon" };
    calc.inputs.forEach(inp => {
        const key = map[inp.id];
        if (!key || !MP.items[key]) return;
        const it = MP.items[key];
        inp.default = it.price;
        inp.help = `متوسط السوق المصري: ${it.price} ${MP.currency}/${it.unit} (بتاريخ ${it.updated} — ${it.source}). سعر استرشادي، عدّله بسعر موردك الفعلي.`;
    });
})();

window.CALCULATORS = CALCULATORS;
/* ========================================
   صور الحاسبات — ربط كل حاسبة بصورة مطابقة لمحتواها
======================================== */
const CALC_IMAGES = {
    "cable-breaker-calc": "assets/covers/v2/cable-breaker.webp",
    "load-current": "assets/covers/v2/unit-converter.webp",
    "voltage-drop": "assets/covers/v2/cable-schedule.webp",
    "pf-correction": "assets/covers/v2/pf-correction.webp",
    "motor-current": "assets/covers/v2/motor-current.webp",
    "lighting-design": "assets/covers/v2/lighting-design.webp",
    "earthing-resistance": "assets/covers/v2/earthing-resistance.webp",
    "battery-bank": "assets/covers/v2/battery-bank.webp",
    "ups-sizing": "assets/covers/v2/ups-sizing.webp",
    "concrete-volume": "assets/covers/v2/concrete-volume.webp",
    "paint-quantity": "assets/covers/v2/paint-quantity.webp",
    "brick-quantity": "assets/covers/v2/brick-quantity.webp",
    "concrete-quantities": "assets/covers/v2/concrete-quantities.webp",
    "cable-tray": "assets/covers/v2/cable-tray.webp",
    "cooling-load": "assets/covers/v2/cooling-load.webp",
    "duct-sizing": "assets/covers/v2/duct-sizing.webp",
    "water-demand": "assets/covers/v2/water-demand.webp",
    "short-circuit": "assets/covers/v2/panel-schedule.webp",
    "transformer-sizing": "assets/covers/v2/transformer-sizing.webp",
    "generator-sizing": "assets/covers/v2/generator-sizing.webp",
    "cable-derating": "assets/covers/v2/cable-derating.webp",
    "earth-fault-loop": "assets/covers/v2/earth-fault-loop.webp"
};
CALCULATORS.forEach(c => { if (CALC_IMAGES[c.id]) c.img = CALC_IMAGES[c.id]; });
