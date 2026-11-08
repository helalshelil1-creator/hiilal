
/* ========================================
   DATA - المشاريع
======================================== */

const PROJECT_CATEGORIES = [
    { id: "all",       name: "الكل",         icon: "building" },
    { id: "residential", name: "سكني",        icon: "home" },
    { id: "commercial",  name: "تجاري",       icon: "briefcase" },
    { id: "industrial",  name: "صناعي",       icon: "settings" },
    { id: "infrastructure", name: "بنية تحتية", icon: "layers" }
];

const PROJECTS = [
    { id: "p1", title: "مقر شركة النقيب — تجهيز كهروميكانيكي", category: "commercial", status: "مكتمل", location: "مدينة السادس من أكتوبر", year: "2025", desc: "تجهيز كهروميكانيكي متكامل لمقر شركة مقاولات: كهرباء، تكييف، مكافحة حريق، لوحات تحكم، أنظمة ذكية." },
    { id: "p2", title: "مجتمع سكني — بنية تحتية", category: "residential", status: "مكتمل", location: "القاهرة الجديدة", year: "2024", desc: "شبكات مياه وصرف وكهرباء لمجمع سكني من فلل وشقق." },
    { id: "p3", title: "مستودع لوجستي — طاقة", category: "industrial", status: "مكتمل", location: "مدينة العاشر من رمضان", year: "2024", desc: "توزيع HV/LV، إضاءة، وطاقة احتياطية لمستودع لوجستي." },
    { id: "p4", title: "تحديث تكييف — مركز تجاري", category: "commercial", status: "مكتمل", location: "بغداد", year: "2023", desc: "تحديث محطة تبريد ماء مبرد وتوزيع هواء." },
    { id: "p5", title: "شبكة مكافحة حريق — مجمع", category: "infrastructure", status: "مكتمل", location: "مكّة", year: "2023", desc: "شبكة مكافحة حريق كاملة: مضخات، رشاشات، إنذار." },
    { id: "p6", title: "لوحات تحكم MCC — Suite", category: "industrial", status: "مكتمل", location: "الدمام", year: "2024", desc: "تصميم وتنفيذ لوحات تحكم MCC و PLC." }
];

window.PROJECT_CATEGORIES = PROJECT_CATEGORIES;
window.PROJECTS = PROJECTS;