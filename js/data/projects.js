
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
    { name: "مقر شركة النقيب — تجهيز كهروميكانيكي", client: "AL NAQEEB GROUP", description: "تجهيز كهروميكانيكي متكامل: كهرباء، تكييف، مكافحة حريق، لوحات تحكم، أنظمة ذكية.", location: "مدينة السادس من أكتوبر", type: "تجاري", status: "مكتمل" },
    { name: "مجتمع سكني — بنية تحتية", client: "عميل خاص", description: "شبكات مياه وصرف وكهرباء لمجمع سكني من فلل وشقق.", location: "القاهرة الجديدة", type: "سكني", status: "مكتمل" },
    { name: "مستودع لوجستي — طاقة", client: "عميل لوجستي", description: "توزيع HV/LV، إضاءة، وطاقة احتياطية لمستودع لوجستي.", location: "مدينة العاشر من رمضان", type: "صناعي", status: "مكتمل" },
    { name: "تحديث تكييف — مركز تجاري", client: "مركز تجاري", description: "تحديث محطة تبريد ماء مبرد وتوزيع هواء.", location: "بغداد", type: "تجاري", status: "مكتمل" },
    { name: "شبكة مكافحة حريق — مجمع", client: "مجمع سكني", description: "شبكة مكافحة حريق كاملة: مضخات، رشاشات، إنذار.", location: "مكّة", type: "بنية تحتية", status: "مكتمل" },
    { name: "لوحات تحكم MCC — Suite", client: "عميل صناعي", description: "تصميم وتنفيذ لوحات تحكم MCC و PLC.", location: "الدمام", type: "صناعي", status: "مكتمل" }
];

window.PROJECT_CATEGORIES = PROJECT_CATEGORIES;
window.PROJECTS = PROJECTS;