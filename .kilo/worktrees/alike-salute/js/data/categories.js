/* ========================================
   DATA - التصنيفات
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

window.CATEGORIES = CATEGORIES;