/* ========================================
   DATA - الموسوعة الهندسية
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
                references: [{ name: "IEC 60050-131 — International Electrotechnical Vocabulary", url: "https://webstore.iec.ch/publication/120", source: "IEC" }],
                related: ["power-law", "pf"]
            },
            {
                id: "power-law",
                title: "القدرة الكهربائية",
                titleEn: "Electrical Power",
                summary: "حساب القدرة في الأنظمة أحادية وثلاثية الأوجه.",
                sections: [{ type: "formula", title: "📐 القوانين", formula: "P = V × I × cosφ", units: "Watt", variants: ["1φ: P = V × I × PF", "3φ: P = √3 × V × I × PF", "S = V × I (VA)", "Q = V × I × sinφ (VAR)", "S² = P² + Q²"] }],
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
                sections: [{ type: "table", title: "📊 مقارنة شاملة", headers: ["النوع", "التيار", "Icu", "الاستخدام"], rows: [["MCB", "≤ 125A", "6-10 kA", "دوائر نهائية"], ["MCCB", "16-1600A", "25-100 kA", "لوحات فرعية"], ["ACB", "> 800A", "50-150 kA", "لوحة رئيسية"], ["RCD", "≤ 125A", "—", "حماية تسرب"]] }],
                references: [],
                related: ["trip-curves", "rcd"]
            },
            {
                id: "trip-curves",
                title: "منحنيات الفصل",
                titleEn: "Trip Curves",
                summary: "أنواع B, C, D, K, Z.",
                sections: [{ type: "table", title: "📊 الأنواع", headers: ["النوع", "المدى", "الاستخدام"], rows: [["Type B", "3-5 × In", "مقاومية - إضاءة"], ["Type C", "5-10 × In", "محركات صغيرة"], ["Type D", "10-20 × In", "محركات كبيرة"]] }],
                references: [],
                related: ["breaker-types"]
            },
            {
                id: "rcd",
                title: "قواطع التسرب الأرضي RCD",
                titleEn: "RCD",
                summary: "حماية من التسرب الأرضي للتيار.",
                sections: [{ type: "table", title: "📊 الحساسيات", headers: ["الحساسية", "الاستخدام"], rows: [["10 mA", "غرف عمليات"], ["30 mA", "حماية أرواح"], ["100 mA", "حماية حريق"], ["300 mA", "حماية معدات"]] }],
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
                sections: [{ type: "table", title: "📊 جداول مرجعية (نحاس/PVC)", headers: ["مقطع (mm²)", "هواء", "مدفون"], rows: [["1.5", "19.5A", "17A"], ["2.5", "27A", "23A"], ["4", "36A", "30A"], ["6", "46A", "38A"], ["10", "63A", "52A"], ["16", "85A", "69A"], ["25", "112A", "90A"], ["35", "138A", "111A"], ["50", "168A", "133A"], ["70", "213A", "168A"], ["95", "258A", "201A"], ["120", "299A", "232A"]] }],
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
                sections: [{ type: "table", title: "📊 مقارنة", headers: ["النظام", "الحماية", "الاستخدام"], rows: [["TT", "RCD إجباري", "مناطق ريفية"], ["TN-S", "قواطع", "مدن حديثة"], ["TN-C", "قواطع", "قديم"], ["TN-C-S", "قواطع", "شائع"], ["IT", "مراقب عزل", "مستشفيات"]] }],
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
                sections: [{ type: "table", title: "📊 مقارنة", headers: ["الطريقة", "تيار البدء"], rows: [["DOL", "6-8 × FLC"], ["Star-Delta", "2-2.5 × FLC"], ["Soft Starter", "2-4 × FLC"], ["VFD", "1-1.5 × FLC"]] }],
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
                sections: [{ type: "table", title: "📊 الأنواع", headers: ["النظام", "الاستخدام"], rows: [["Wet Sprinkler", "مباني عادية"], ["Dry Sprinkler", "مناطق متجمدة"], ["CO2", "كهرباء ومختبرات"], ["FM200/NOVEC", "مراكز بيانات"], ["Foam", "وقود وكيماويات"]] }],
                references: [],
                related: ["fa-intro"]
            }
        ]
    }
];

window.ENCYCLOPEDIA = ENCYCLOPEDIA;