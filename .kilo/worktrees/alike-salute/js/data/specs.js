/* ========================================
   DATA - المواصفات الفنية
======================================== */

const SPEC_CATEGORIES = [
    { id: "all",      name: "الكل",     icon: "clipboard-list" },
    { id: "cables",   name: "كابلات",   icon: "plug" },
    { id: "breakers", name: "قواطع",    icon: "shield" },
    { id: "panels",   name: "لوحات",    icon: "grid" },
    { id: "lighting", name: "إضاءة",    icon: "lightbulb" }
];

const SPECS = [
    { id: "cable-cu-pvc", name: "كابل نحاس - PVC/PVC", nameEn: "Cu/PVC/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع عزل PVC للاستخدامات الداخلية.", specs: ["الموصل: نحاس مجدول", "العزل: PVC", "الجهد: 0.6/1 kV", "الحرارة: 70°C"] },
    { id: "cable-cu-xlpe", name: "كابل نحاس - XLPE/PVC", nameEn: "Cu/XLPE/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع عزل XLPE يتحمل حرارة أعلى.", specs: ["الموصل: نحاس", "العزل: XLPE", "الجهد: 0.6/1 kV", "الحرارة: 90°C"] },
    { id: "cable-cu-swa", name: "كابل نحاس مسلح - SWA", nameEn: "Cu/XLPE/SWA/PVC Cable", category: "cables", manufacturer: "Elsewedy / Nexans", description: "كابل نحاس مع تسليح سلكي للاستخدام المدفون.", specs: ["الموصل: نحاس", "العزل: XLPE", "التسليح: SWA", "الاستخدام: مدفون"] },
    { id: "mcb-schneider", name: "قاطع مصغر MCB - Schneider", nameEn: "MCB - Schneider iC60N", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع مصغر للدوائر النهائية حتى 63A.", specs: ["التيار: 6-63A", "الأقطاب: 1P-4P", "Icu: 6 kA", "المنحنيات: B, C, D"] },
    { id: "mcb-abb", name: "قاطع مصغر MCB - ABB", nameEn: "MCB - ABB S200", category: "breakers", manufacturer: "ABB", description: "قاطع مصغر من ABB، قدرة قطع 10kA.", specs: ["التيار: 6-63A", "Icu: 10 kA", "المنحنيات: B, C, D, K, Z"] },
    { id: "mccb-schneider", name: "قاطع MCCB - Schneider", nameEn: "MCCB - Schneider NSX", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع صناعي للوحات التوزيع حتى 630A.", specs: ["التيار: 16-630A", "Icu: حتى 100 kA", "الأقطاب: 3P, 4P"] },
    { id: "rcd-schneider", name: "قاطع تسرب أرضي RCD", nameEn: "RCD - Schneider", category: "breakers", manufacturer: "Schneider Electric", description: "قاطع تسرب أرضي 30mA لحماية الأرواح.", specs: ["الحساسية: 30 mA", "التيار: 25-100A", "الأقطاب: 2P, 4P"] },
    { id: "panel-schneider", name: "لوحة توزيع - Schneider Prisma", nameEn: "Distribution Panel - Prisma", category: "panels", manufacturer: "Schneider Electric", description: "لوحة توزيع معيارية IP30/IP54.", specs: ["التيار: حتى 6300A", "IP: IP30 / IP54", "البارات: نحاس مطلي"] },
    { id: "led-panel", name: "وحدة إضاءة LED Panel", nameEn: "LED Panel Light", category: "lighting", manufacturer: "Philips / Opple", description: "وحدة إضاءة LED 600×600 للمكاتب.", specs: ["القدرة: 36W", "التدفق: 3600 lm", "CCT: 3000-6500K", "CRI: >80"] },
    { id: "led-highbay", name: "وحدة إضاءة High Bay", nameEn: "LED High Bay", category: "lighting", manufacturer: "Philips / Cree", description: "وحدة إضاءة LED للارتفاعات العالية.", specs: ["القدرة: 100-200W", "التدفق: 12000-24000 lm", "IP: IP65"] }
];

window.SPEC_CATEGORIES = SPEC_CATEGORIES;
window.SPECS = SPECS;