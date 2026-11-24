
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
    { name: "مثال: تجهيز كهروميكانيكي لمقر شركة", client: "عميل افتراضي", description: "تجهيز كهروميكانيكي متكامل: كهرباء، تكييف، مكافحة حريق، لوحات تحكم، أنظمة ذكية.", location: "موقع افتراضي", type: "تجاري", status: "نموذج توضيحي" },
    { name: "مثال: مجتمع سكني — بنية تحتية", client: "عميل افتراضي", description: "شبكات مياه وصرف وكهرباء لمجمع سكني من فلل وشقق.", location: "موقع افتراضي", type: "سكني", status: "نموذج توضيحي" },
    { name: "مثال: مستودع لوجستي — طاقة", client: "عميل افتراضي", description: "توزيع HV/LV، إضاءة، وطاقة احتياطية لمستودع لوجستي.", location: "موقع افتراضي", type: "صناعي", status: "نموذج توضيحي" },
    { name: "مثال: تحديث تكييف — مركز تجاري", client: "عميل افتراضي", description: "تحديث محطة تبريد ماء مبرد وتوزيع هواء.", location: "موقع افتراضي", type: "تجاري", status: "نموذج توضيحي" },
    { name: "مثال: شبكة مكافحة حريق — مجمع", client: "عميل افتراضي", description: "شبكة مكافحة حريق كاملة: مضخات، رشاشات، إنذار.", location: "موقع افتراضي", type: "بنية تحتية", status: "نموذج توضيحي" },
    { name: "مثال: لوحات تحكم MCC — Suite", client: "عميل افتراضي", description: "تصميم وتنفيذ لوحات تحكم MCC و PLC.", location: "موقع افتراضي", type: "صناعي", status: "نموذج توضيحي" }
];

window.PROJECT_CATEGORIES = PROJECT_CATEGORIES;
window.PROJECTS = PROJECTS;