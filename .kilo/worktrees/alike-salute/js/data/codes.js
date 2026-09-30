/* ========================================
   DATA - الأكواد والمعايير
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

window.CODE_CATEGORIES = CODE_CATEGORIES;
window.CODES = CODES;