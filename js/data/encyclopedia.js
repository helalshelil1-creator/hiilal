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
                references: [],
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
                    { type: "warning", title: "⚠️ تنبيه", content: "قد تطبّق شركة الكهرباء غرامات عند انخفاض معامل القدرة عن حد معين حسب التعرفة السارية (الحد يختلف). راجع تعرفة شركتك." }
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
                    { type: "formula", title: "📐 المعادلة (جداول BS 7671)", formula: "ΔV = (mV/A/m × I × L) / 1000", variants: ["mV/A/m: قيمة جدول الكابل للدائرة كاملة (عمود أحادي أو ثلاثي حسب النظام)، وهي تشمل √3 أو 2 مسبقًا", "من المقاومة والمفاعلة: 1-Phase: ΔV = 2 × I × L × (R cosφ + X sinφ) | 3-Phase: ΔV = √3 × I × L × (R cosφ + X sinφ)، حيث R وX للموصل الواحد بـ Ω/m", "مثال: 3-Phase، 16 mm² نحاس PVC بقيمة تقريبية 2.4 mV/A/m، I = 60 A، L = 50 m ⇒ ΔV = 2.4 × 60 × 50 / 1000 = 7.2 V ⇒ 1.8% من 400 V"] },
                    { type: "table", title: "📊 الحدود المسموحة", headers: ["النظام", "حد الهبوط"], rows: [["تغذية مباشرة من شبكة التوزيع العامة (جهد منخفض) — إضاءة", "3%"], ["نفس التغذية — قوى وتسخين", "5%"], ["تغذية من محول خاص — إضاءة", "6%"], ["تغذية من محول خاص — قوى وتسخين", "8%"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "الحدود من الشبكة إلى أبعد نقطة حمل حسب IEC 60364-5-52 جدول G.52.1 (كما ينقلها دليل Schneider للتركيبات الكهربائية). الحد الملزم هو ما يحدده الكود المعتمد في مشروعك (الكود المصري أو غيره). 8% قد يسبب مشاكل للمحركات عند البدء." }
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
                    { type: "table", title: "📊 كثافات الأحمال", headers: ["النوع", "W/m²"], rows: [["سكني فاخر", "40-60"], ["سكني عادي", "30-40"], ["مكاتب", "50-80"], ["مطاعم", "100-150"], ["مولات", "80-120"], ["مستشفيات", "100-150"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "كثافات أحمال تقريبية للتقدير المبدئي وغير مأخوذة من كود محدد. للتصميم استخدم قوائم الأحمال الفعلية ومعاملات الطلب وفق الكود المعتمد." }
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
                    { type: "formula", title: "📐 المبسط", formula: "Isc = (S × 100) / (√3 × V × Z%)", variants: ["S = قدرة المحول (VA)", "V = جهد الجانب الثانوي (خط-خط)", "Z% = ممانعة المحول بالنسبة المئوية", "مثال: 1000 kVA، 400 V، Z = 5% ⇒ Isc ≈ 28.9 kA (أقصى تيار قصر عند أطراف المحول، مع إهمال ممانعة المصدر)"] },
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
                sections: [{ type: "table", title: "📊 مقارنة شاملة", headers: ["النوع", "التيار", "Icu", "الاستخدام"], rows: [["MCB", "≤ 125A", "6-10 kA", "دوائر نهائية"], ["MCCB", "16-1600A", "25-100 kA", "لوحات فرعية"], ["ACB", "> 800A", "50-150 kA", "لوحة رئيسية"], ["RCD", "≤ 125A", "—", "حماية تسرب"]]},
                    { type: "warning", title: "⚠️ تنبيه", content: "قيم Icu أعلاه نطاقات نموذجية تقريبية للتعريف بالفئات. قدرة القطع الفعلية تختلف باختلاف الموديل والجهد، فاعتمد داتاشيت المصنّع وتحقق أنها أكبر من تيار القصر عند نقطة التركيب." }],
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
                sections: [{ type: "table", title: "📊 الحساسيات", headers: ["الحساسية", "الاستخدام"], rows: [["≤ 30 mA", "حماية إضافية ضد الصدمة الكهربائية (BS 7671 م. 415.1، وتشترط م. 411.3.3 ذلك لبعض المآخذ)"], ["≤ 300 mA", "حماية من الحريق (BS 7671 م. 422.3.9): أقصى تيار تشغيل 300 mA"], ["> 30 mA", "لا يوفر حماية إضافية ضد الصدمة؛ يُستخدم للحماية من أعطال التأريض (fault protection) أو للحريق، وقيمته تتبع مقاومة مسار التأريض"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "التصنيف أعلاه من إرشادات IET حول أنواع حماية RCD (حماية الأعطال، الحماية الإضافية ≤30 mA، حماية الحريق ≤300 mA). الإلزام والتفاصيل تحددها النسخة المعتمدة من الكود (BS 7671 أو IEC 60364-4-41 أو الكود المحلي) ونظام التأريض. مراجع BS 7671 مذكورة من المصدر ولم تُقرأ من نص الكود نفسه." }],
                references: [{ name: "IET Wiring Matters: Which RCD type (additional, fault and fire protection)", url: "https://electrical.theiet.org/wiring-matters/years/2019/77-september-2019/which-rcd-type", source: "IET" }],
                related: ["breaker-types"]
            },
            {
                id: "coordination",
                title: "تنسيق الحمايات",
                titleEn: "Protection Coordination",
                summary: "ضمان عمل القاطع الأقرب للعطل فقط.",
                sections: [
                    { type: "text", title: "📖 المبدأ", content: "عند حدوث عطل، يجب أن يعمل القاطع الأقرب للعطل فقط." },
                    { type: "text", title: "📐 التطبيق", content: "يُتحقق من الانتقائية بمقارنة منحنيات الفصل أو جداول الانتقائية الصادرة من المصنّع للقواطع المحددة، ولا توجد نسبة زمنية ثابتة تصلح لكل الحالات." }
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
                sections: [{ type: "table", title: "📊 قيم استرشادية (نحاس/PVC)، موصلان محملان", headers: ["مقطع (mm²)", "طريقة C (مثبت على سطح)", "طريقة B (في مواسير على حائط)"], rows: [["1.5", "19.5A", "16.5A"], ["2.5", "27A", "23A"], ["4", "36A", "30A"], ["6", "46A", "38A"], ["10", "63A", "52A"], ["16", "85A", "69A"], ["25", "112A", "90A"], ["35", "138A", "111A"], ["50", "168A", "133A"], ["70", "213A", "168A"], ["95", "258A", "201A"], ["120", "299A", "232A"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "قيم تعليمية. القيم مطابقة لجدول BS 7671 رقم 4D2A (كابل متعدد القلوب نحاس PVC 70°م، موصلان محمّلان، حرارة محيط 30°م): العمود 6 للطريقة C والعمود 4 للطريقة B (كما ينقله جدول Eland Cables https://www.elandcables.com/media/ek1mri4h/table-4d2a-and-4d2b.pdf). لا تنطبق على XLPE أو الألمنيوم أو الكابلات المدفونة أو 3 موصلات محمّلة. للتصميم استخدم الجداول الرسمية ومعاملات التخفيض (حرارة، تجميع، تركيب) من الكود المعتمد أو بيانات المصنع." }],
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
                    { type: "table", title: "📊 القيم المقبولة", headers: ["النوع", "المقاومة"], rows: [["منازل", "≤ 5 Ω"], ["مصانع", "≤ 1 Ω"], ["محطات", "≤ 0.5 Ω"], ["أبراج", "≤ 10 Ω"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "أرقام عملية شائعة وليست حدودًا من كود محدد. المقاومة المطلوبة تعتمد على نظام التأريض وجهاز الحماية (مثلاً RCD) وجهد اللمس المسموح. راجع الكود المعتمد." }
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
                    { type: "formula", title: "📐 القانون", formula: "N = (E × A) / (Φ × UF × MF)", variants: ["E: مستوى الإضاءة (lux)", "A: المساحة (m²)", "Φ: تدفق الوحدة (lm)", "UF: عامل الاستفادة، 0.5-0.8 تقريبي من جداول المصنّع للكشاف والغرفة", "MF: عامل الصيانة، 0.7-0.85 تقريبي حسب نوع الكشاف والبيئة"] },
                    { type: "table", title: "📊 مستويات الإضاءة (EN 12464)", headers: ["المكان", "E (lux)"], rows: [["ممرات", "100"], ["سلالم", "150"], ["مكاتب", "300-500"], ["قاعات", "500"], ["رسم هندسي", "750-1000"], ["مخازن", "100-200"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "قيم تقريبية للتعريف بالمستويات. المستويات الملزمة لكل نشاط في EN 12464-1 (النسخة الحالية) أو الكود المحلي، ولم تُقرأ من نص المعيار هنا." }
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
                sections: [{ type: "table", title: "📊 مقارنة", headers: ["الطريقة", "تيار البدء"], rows: [["DOL", "6-8 × FLC"], ["Star-Delta", "2-2.5 × FLC"], ["Soft Starter", "2-4 × FLC"], ["VFD", "1-1.5 × FLC"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "نطاقات نموذجية تقريبية. تيار البدء الفعلي في داتاشيت المحرك والمشغّل." }],
                references: [],
                related: ["motor-types", "vfd"]
            },
            {
                id: "vfd",
                title: "VFD - مغير السرعة",
                titleEn: "Variable Frequency Drive",
                summary: "التحكم في سرعة الموتور.",
                sections: [
                    { type: "formula", title: "📐 العلاقات", formula: "Ns = (120 × f) / P", variants: ["Ns: السرعة التزامنية (rpm)، والسرعة الفعلية للمحرك الحثي أقل منها بالانزلاق", "f: التردد (Hz)", "P: عدد الأقطاب"] },
                    { type: "list", title: "💡 المزايا", items: ["توفير طاقة في أحمال المراوح والمضخات متغيرة الحمل (النسبة تتوقف على نمط التشغيل)", "تحكم دقيق", "بدء ناعم", "حماية شاملة"] }
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
                    { type: "table", title: "📊 التغطية", headers: ["النوع", "المساحة", "الارتفاع"], rows: [["كاشف دخان نقطي", "حتى 100 م² (نصف قطر 7.5 م)", "حتى 10.5 م"], ["كاشف حرارة نقطي", "حتى 50 م² (نصف قطر 5.3 م)", "حتى 9 م (A1) / 7.5 م (فئات أخرى)"], ["Beam", "حسب داتاشيت الكاشف", "حسب داتاشيت الكاشف"]] },
                    { type: "warning", title: "⚠️ تنبيه", content: "القيم تمثل ممارسة BS 5839-1 / EN 54 كما تلخصها مصادر ثانوية (مدونة SSS Fire عن تباعد الكاشفات في الإمارات، ودليل Eaton للمركّبين). يسمح حتى 12.5 م لكاشف الدخان في 10% من مساحة السقف. NFPA 72 يستخدم تباعدًا مختلفًا (حوالي 9.1 م) فاعتمد الكود المطبق في المشروع وداتاشيت الكاشف، وهذه القيم لا تكفي للتصميم." }
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
/* صور أقسام الموسوعة الظاهرة في الرئيسية */
const ENC_IMAGES = {
    "fundamentals": "assets/covers/v2/enc-fundamentals.webp",
    "design": "assets/covers/v2/enc-design.webp",
    "protection": "assets/covers/v2/safety-checklist.webp",
    "cables": "assets/covers/v2/cable-schedule.webp",
    "earthing": "assets/covers/v2/earthing-resistance.webp",
    "lighting": "assets/covers/v2/lighting-design.webp",
    "motors": "assets/covers/v2/motor-current.webp",
    "fire": "assets/covers/v2/fire-alarm.webp"
};
ENCYCLOPEDIA.forEach(c => { if (ENC_IMAGES[c.id]) c.img = ENC_IMAGES[c.id]; });
