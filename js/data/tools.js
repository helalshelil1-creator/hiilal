/* ========================================
   DATA - الأدوات الهندسية
   الإصدار: 2.0 — مع دليل AutoCAD & Revit
======================================== */

const TOOLS = [
    {
        id: "mep-hub",
        name: "MEP ENGINEERING HUB",
        nameEn: "MEP Engineering Hub",
        category: "platform",
        icon: "layers",
        desc: "منصة عمل هندسية متكاملة — حاسبات، أكواد، مواصفات، موسوعة، وأدوات في مكان واحد.",
        url: "mep-hub/index.html",
        badge: "NEW"
    },
    {
        id: "boq-fire",
        name: "BOQ — مقايسة خط حريق",
        nameEn: "Fire Line BOQ Estimator",
        category: "design",
        icon: "clipboard-list",
        desc: "أداة مقايسة وتسعير لخط حريق — رشاشات، ماسورة، صمامات، مضخات.",
        url: "boq/index.htm",
        badge: "NEW"
    },
    {
        id: "calc-v2",
        name: "حاسبة كابل وقاطع V2",
        nameEn: "Cable & Breaker Calculator V2",
        category: "design",
        icon: "plug",
        desc: "نسخة محسّنة من حاسبة الكابل والقاطع — dark mode، حساب تلقائي، تصميم عصري.",
        url: "calc-v2/index.html",
        badge: "NEW"
    },
    {
        id: "control-simulator",
        name: "محاكي دوائر الكنترول",
        nameEn: "Control Circuit Simulator",
        category: "platform",
        icon: "cpu",
        desc: "محاكاة فعلية لدوائر الكنترول — contactors, relays, timers, sensors.",
        url: "https://classic-control-simulator.app/",
        badge: "NEW"
    },
    {
        id: "distribution-tools",
        name: "أدوات التوزيع",
        nameEn: "Distribution Tools",
        category: "design",
        icon: "layers",
        desc: "كل ملفات دورة ودبلومة التوزيع — 18 محاضرة بالترتيب، مخططات SLD، جداول لوحات، حساب سعة المولد، حصر BOQ، وقواعد التصميم.",
        url: "tools/distribution.html",
        badge: "NEW"
    },
    {
        id: "control-circuit-simulator",
        name: "محاكي دوائر الكنترول — المجاني",
        nameEn: "Control Circuit Simulator (Ours)",
        category: "platform",
        icon: "cpu",
        desc: "نسخة المكتب من محاكي دوائر الكنترول — فاريك، أوتوترانس، تايمر يومي، فريكوينسي ميتر، وحساب هبوط الجهد.",
        url: "https://control-circuit-simulator-6ary.vercel.app/",
        badge: "NEW"
    },
    {
        id: "habit-tracker",
        name: "جدول متابعة العادات",
        nameEn: "Habit Tracker",
        category: "design",
        icon: "check",
        desc: "جدول شهري لتتبع 8 عادات يومية — علّم على اللي عملته، والدايرة والنسب والرسوم بتتحدّث لوحدها، وبيتحفظ على جهازك.",
        url: "tools/habits.html",
        badge: "NEW"
    },
    {
        id: "software-guide",
        name: "دليل AutoCAD & Revit",
        nameEn: "AutoCAD & Revit Guide",
        category: "bim",
        icon: "cpu",
        desc: "كل أوامر واختصارات AutoCAD و Revit مع روابط وفيديوهات شرح.",
        url: "tools/software-guide.html",
        badge: "NEW"
    },
    {
        id: "cable-breaker",
        name: "حاسبة الكابل والقاطع",
        nameEn: "Cable & Breaker Calculator",
        category: "design",
        icon: "plug",
        desc: "اختيار مقطع الكابل والقاطع المناسب تلقائيًا حسب IEC 60364.",
        url: "calculators/cable-breaker.html",
        badge: "NEW"
    },
    {
        id: "unit-converter",
        name: "محول الوحدات",
        nameEn: "Unit Converter",
        category: "design",
        icon: "refresh",
        desc: "محول شامل للوحدات الهندسية — الطول، القدرة، الضغط، الحرارة.",
        url: "tools/unit-converter.html",
        badge: "NEW"
    },
    {
        id: "ip-rating",
        name: "دليل أكواد IP",
        nameEn: "IP Rating Guide",
        category: "design",
        icon: "shield-check",
        desc: "دليل شامل لأكواد الحماية IP ضد الغبار والماء.",
        url: "tools/ip-rating.html",
        badge: "NEW"
    },
    {
        id: "site-inspection",
        name: "Checklist فحص الموقع",
        nameEn: "Site Inspection Checklist",
        category: "site",
        icon: "clipboard-list",
        desc: "قائمة فحص شاملة لزيارة الموقع — الكهرباء، MEP، السلامة.",
        url: "tools/checklists.html#site",
        badge: "NEW"
    },
    {
        id: "testing-checklist",
        name: "Checklist الاختبار",
        nameEn: "Testing & Commissioning",
        category: "testing",
        icon: "check",
        desc: "قائمة فحص الاختبار والتشغيل — Megger، Continuity، Earth Loop.",
        url: "tools/checklists.html#testing",
        badge: "NEW"
    },
    {
        id: "safety-checklist",
        name: "Checklist السلامة",
        nameEn: "Safety Checklist",
        category: "site",
        icon: "shield-check",
        desc: "قائمة فحص السلامة اليومية — PPE، Toolbox Talk، مخاطر الموقع.",
        url: "tools/checklists.html#safety",
        badge: "NEW"
    },
    {
        id: "cable-schedule",
        name: "جدول الكابلات",
        nameEn: "Cable Schedule Template",
        category: "technical",
        icon: "file-text",
        desc: "نموذج جدول كابلات جاهز للتعبئة مع حفظ تلقائي وطباعة.",
        url: "tools/schedules.html#cable",
        badge: "NEW"
    },
    {
        id: "panel-schedule",
        name: "جدول اللوحة",
        nameEn: "Panel Schedule",
        category: "technical",
        icon: "grid",
        desc: "نموذج جدول لوحة توزيع — الأبواب، الدوائر، الأحمال.",
        url: "tools/schedules.html#panel",
        badge: "NEW"
    },
    {
        id: "load-schedule",
        name: "جدول الأحمال",
        nameEn: "Load Schedule",
        category: "technical",
        icon: "bar-chart",
        desc: "نموذج جدول أحمال مع حساب تلقائي للحمل التصميمي.",
        url: "tools/schedules.html#load",
        badge: "NEW"
    },
    {
        id: "boq-template",
        name: "جدول الكميات BOQ",
        nameEn: "Bill of Quantities",
        category: "takeoff",
        icon: "calculator",
        desc: "نموذج BOQ جاهز — البند، الوحدة، الكمية، السعر.",
        url: "tools/schedules.html#boq",
        badge: "NEW"
    },
    {
        id: "rfi-template",
        name: "طلب استفسار فني RFI",
        nameEn: "Request for Information",
        category: "technical",
        icon: "info",
        desc: "نموذج RFI جاهز للإرسال للاستشاري.",
        url: "tools/documents.html#rfi",
        badge: "NEW"
    },
    {
        id: "submittal",
        name: "اعتماد المواد",
        nameEn: "Material Submittal",
        category: "technical",
        icon: "package",
        desc: "نموذج تقديم المواد للاعتماد من الاستشاري.",
        url: "tools/documents.html#submittal",
        badge: "NEW"
    },
    {
        id: "variation",
        name: "أمر التغيير",
        nameEn: "Variation Order",
        category: "technical",
        icon: "edit",
        desc: "نموذج أمر التغيير للأعمال الإضافية مع التسعير.",
        url: "tools/documents.html#variation",
        badge: "NEW"
    },
    {
    id: "schedules-reference",
    name: "جدول اللبنات الاسترشادي",
    nameEn: "Circuit Schedules Reference",
    category: "technical",
    icon: "clipboard-list",
    desc: "جدول مرجعي لملء فرغات اللبنات — ماسورة، سلك، قاطع، معامل الطلب والقدرة",
    url: "tools/schedules-reference.html",
    badge: "NEW"
    },
    {
        id: "fire-pump",
        name: "حاسبة طرمب الحريق",
        nameEn: "Fire Pump Calculator",
        category: "fire-fighting",
        icon: "flame",
        desc: "تقدير تدفق وضغط طرمب الحريق وقدرة الموتور — طريقة الكثافة والمساحة المبسطة حسب NFPA 13/20.",
        url: "tools/fire-pump.html",
        badge: "NEW"
    },
    {
        id: "fire-alarm",
        name: "حاسبة كواشف الحريق",
        nameEn: "Fire Detector Layout Calculator",
        category: "fire-alarm",
        icon: "alert-triangle",
        desc: "عدد وتوزيع كواشف الدخان والحرارة على المساحة وارتفاع السقف — حسب NFPA 72 مع رسم توضيحي للشبكة.",
        url: "tools/fire-alarm.html",
        badge: "NEW"
    },
    {
        id: "duct-sizing",
        name: "حاسبة مقاس الدكت",
        nameEn: "Duct Sizing Calculator",
        category: "mep",
        icon: "wrench",
        desc: "قطر الدكت الدائري والمقاسات المستطيلة المكافئة من التدفق — طريقة السرعة أو الاحتكاك المتساوي (ASHRAE).",
        url: "tools/duct-sizing.html",
        badge: "NEW"
    },
    {
        id: "plumbing",
        name: "حاسبة مواسير التغذية",
        nameEn: "Pipe Sizing by Fixture Units",
        category: "mep",
        icon: "wrench",
        desc: "قطر ماسورة التغذية من وحدات الأجهزة الصحية WSFU عبر منحنى هنتر — مع السرعة الفعلية في الماسورة.",
        url: "tools/plumbing.html",
        badge: "NEW"
    },
    {
        id: "bim-lod",
        name: "دليل مستويات LOD",
        nameEn: "BIM LOD Guide",
        category: "bim",
        icon: "box",
        desc: "مستويات تطوير النموذج 100–500: التعريف والاستخدام والمخرجات وأمثلة MEP لكل مستوى + قاموس مصطلحات BIM.",
        url: "tools/bim-lod.html",
        badge: "NEW"
    },
    {
        id: "cad-symbols",
        name: "مكتبة رموز الرسم الكهربائي",
        nameEn: "CAD Electrical Symbols",
        category: "technical",
        icon: "edit",
        desc: "رموز IEC الشائعة في اللوحات الكهربائية مع بحث سريع واقتراح أسماء الطبقات (E-LITE / E-POWR / E-FIRE).",
        url: "tools/cad-symbols.html",
        badge: "NEW"
    }
];


/* أغلفة الأدوات: كل أداة لها صورة واقعية في assets/covers/<id>.webp */
TOOLS.forEach(function(t){ t.img = "assets/covers/" + t.id + ".webp"; });

window.TOOLS = TOOLS;