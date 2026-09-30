/* ========================================
   CONTENT MANAGER - إدارة المحتوى المخصص
   يدمج البيانات الافتراضية مع المخصصة من Admin
======================================== */

const ContentManager = {
    /* دمج المحتوى الافتراضي مع المخصص */
    merge(defaultList, customType) {
        const custom = (window.Store) ? Store.getCustom(customType) : [];
        return [...custom, ...defaultList];
    },

    /* الأدوات الكاملة */
    getTools() {
        const base = (typeof TOOLS !== "undefined") ? TOOLS : [];
        const custom = (window.Store) ? Store.getCustom("tools") : [];
        return [...custom, ...base];
    },

    /* الحاسبات الكاملة */
    getCalculators() {
        const base = (typeof CALCULATORS !== "undefined") ? CALCULATORS : [];
        const custom = (window.Store) ? Store.getCustom("calculators") : [];
        return [...custom, ...base];
    },

    /* الأكواد الكاملة */
    getCodes() {
        const base = (typeof CODES !== "undefined") ? CODES : [];
        const custom = (window.Store) ? Store.getCustom("codes") : [];
        return [...custom, ...base];
    },

    /* المواصفات الكاملة */
    getSpecs() {
        const base = (typeof SPECS !== "undefined") ? SPECS : [];
        const custom = (window.Store) ? Store.getCustom("specs") : [];
        return [...custom, ...base];
    },

    /* المنتجات الكاملة */
    getProducts() {
        const base = (typeof PRODUCTS !== "undefined") ? PRODUCTS : [];
        const custom = (window.Store) ? Store.getCustom("products") : [];
        return [...custom, ...base];
    },

    /* المشاريع الكاملة */
    getProjects() {
        const base = (typeof PROJECTS !== "undefined") ? PROJECTS : [];
        const custom = (window.Store) ? Store.getCustom("projects") : [];
        return [...custom, ...base];
    },

    /* المحتوى الكامل */
    getContent() {
        const base = (typeof CONTENT !== "undefined") ? CONTENT : [];
        const custom = (window.Store) ? Store.get("custom_content", []) : [];
        return [...custom, ...base];
    },

    /* الموسوعة */
    getEncyclopedia() {
        return (typeof ENCYCLOPEDIA !== "undefined") ? ENCYCLOPEDIA : [];
    },

    /* التصنيفات */
    getCategories() {
        return (typeof CATEGORIES !== "undefined") ? CATEGORIES : [];
    },

    /* تفريغ المخصص لقسم */
    clearCustom(type) {
        if (window.Store) Store.remove("custom_" + type);
    }
};

window.ContentManager = ContentManager;