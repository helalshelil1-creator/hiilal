/* ========================================
   DATA - المنتجات والمعدات
======================================== */

const PRODUCT_CATEGORIES = [
    { id: "all",      name: "الكل",     icon: "package" },
    { id: "breakers", name: "قواطع",    icon: "shield" },
    { id: "cables",   name: "كابلات",   icon: "plug" },
    { id: "lighting", name: "إضاءة",    icon: "lightbulb" }
];

const PRODUCTS = [
    { id: "schneider-ic60", name: "قاطع Schneider iC60N", nameEn: "Schneider iC60N", category: "breakers", manufacturer: "Schneider Electric", model: "iC60N", description: "قاطع مصغر حتى 63A (مواصفات عامة، راجع داتاشيت المصنّع)" },
    { id: "schneider-nsx", name: "قاطع Schneider NSX", nameEn: "Schneider NSX", category: "breakers", manufacturer: "Schneider Electric", model: "NSX100-630", description: "قاطع MCCB صناعي حتى 630A (مواصفات عامة، راجع داتاشيت المصنّع)" },
    { id: "abb-s200", name: "قاطع ABB S200", nameEn: "ABB S200", category: "breakers", manufacturer: "ABB", model: "S200", description: "قاطع مصغر حتى 63A (مواصفات عامة، راجع داتاشيت المصنّع)" },
    { id: "elsewedy-xlpe", name: "كابل Elsewedy XLPE", nameEn: "Elsewedy XLPE Cable", category: "cables", manufacturer: "Elsewedy Electric", model: "Cu/XLPE/PVC", description: "كابل نحاس معزول XLPE حتى 90°C (مواصفات عامة، راجع داتاشيت المصنّع)" },
    { id: "nexans-cu", name: "كابل Nexans Cu/PVC", nameEn: "Nexans Cu/PVC Cable", category: "cables", manufacturer: "Nexans", model: "Cu/PVC/PVC", description: "كابل نحاس معزول PVC للاستخدام الداخلي (مواصفات عامة، راجع داتاشيت المصنّع)" },
    { id: "philips-coreline", name: "وحدة إضاءة Philips CoreLine", nameEn: "Philips CoreLine LED", category: "lighting", manufacturer: "Philips", model: "CoreLine", description: "لوحة إضاءة LED 600×600 مم، القدرة والتدفق الضوئي يختلفان حسب الموديل (راجع داتاشيت المصنّع)" },
    { id: "opple-panel", name: "وحدة إضاءة Opple Panel", nameEn: "Opple LED Panel", category: "lighting", manufacturer: "Opple", model: "Slim Panel", description: "لوحة LED 600×600 مم، القدرة حسب الموديل (راجع داتاشيت المصنّع)" }
];

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.PRODUCTS = PRODUCTS;