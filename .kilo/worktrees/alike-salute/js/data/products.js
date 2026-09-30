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
    { id: "schneider-ic60", name: "قاطع Schneider iC60N", nameEn: "Schneider iC60N", category: "breakers", manufacturer: "Schneider Electric", model: "iC60N", price: "250 ج.م", description: "قاطع مصغر 1-4 بوصات، 6A-63A" },
    { id: "schneider-nsx", name: "قاطع Schneider NSX", nameEn: "Schneider NSX", category: "breakers", manufacturer: "Schneider Electric", model: "NSX100-630", price: "1500 ج.م", description: "قاطع MCCB صناعي حتى 630A" },
    { id: "abb-s200", name: "قاطع ABB S200", nameEn: "ABB S200", category: "breakers", manufacturer: "ABB", model: "S200", price: "280 ج.م", description: "قاطع مصغر حتى 63A" },
    { id: "elsewedy-xlpe", name: "كابل Elsewedy XLPE", nameEn: "Elsewedy XLPE Cable", category: "cables", manufacturer: "Elsewedy Electric", model: "Cu/XLPE/PVC", price: "60 ج.م/م", description: "كابل نحاس معزول XLPE حتى 90°C" },
    { id: "nexans-cu", name: "كابل Nexans Cu/PVC", nameEn: "Nexans Cu/PVC Cable", category: "cables", manufacturer: "Nexans", model: "Cu/PVC/PVC", price: "45 ج.م/م", description: "كابل نحاس معزول PVC للاستخدام الداخلي" },
    { id: "philips-coreline", name: "وحدة إضاءة Philips CoreLine", nameEn: "Philips CoreLine LED", category: "lighting", manufacturer: "Philips", model: "CoreLine", price: "450 ج.م", description: "وحدة إضاءة LED 36W، 3600lm" },
    { id: "opple-panel", name: "وحدة إضاءة Opple Panel", nameEn: "Opple LED Panel", category: "lighting", manufacturer: "Opple", model: "Slim Panel", price: "320 ج.م", description: "وحدة LED 600×600، 36W" }
];

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.PRODUCTS = PRODUCTS;