/* ========================================
   DATA - الأدوات الهندسية
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

window.TOOLS = TOOLS;