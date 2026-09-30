/* ========================================
   I18N - نظام الترجمة عربي/إنجليزي
   ميزة 6: Language Toggle
======================================== */

const I18N = {
    current: "ar",

    translations: {
        ar: {
            // Navbar
            "nav.home": "الرئيسية",
            "nav.tools": "الأدوات",
            "nav.calculators": "الحاسبات",
            "nav.encyclopedia": "الموسوعة",
            "nav.content": "المحتوى",
            "nav.projects": "المشاريع",
            "nav.about": "عن المكتب",
            "nav.admin": "لوحة التحكم",

            // Bottom Nav
            "bnav.home": "الرئيسية",
            "bnav.tools": "الأدوات",
            "bnav.calc": "الحاسبات",
            "bnav.enc": "الموسوعة",
            "bnav.more": "المزيد",

            // Hero
            "welcome.top": "مرحبًا بك في",
            "welcome.brand": "مكتب المهندس هلال شليل",
            "welcome.desc": "منصة هندسية متكاملة لمهندس الكهرباء والـ MEP — التصميم، التنفيذ، المكتب الفني، الحصر، الأكواد، والمواصفات… في مكان واحد.",
            "welcome.search": "ابحث عن أداة، حاسبة، موضوع، كود، منتج، أو مواصفة...",

            // Sections
            "section.tools": "أدوات هندسية متقدمة",
            "section.calc": "حاسبات سريعة",
            "section.enc": "الموسوعة الهندسية",
            "section.cat": "التصنيفات الرئيسية",
            "section.lib": "المكتبات الهندسية",
            "section.contact": "تواصل معي",
            "section.viewAll": "عرض الكل ←",

            // Stats
            "stat.tools": "أداة هندسية",
            "stat.calc": "حاسبة",
            "stat.topics": "موضوع هندسي",
            "stat.projects": "مشروع",

            // Contact
            "contact.phone": "اتصال هاتفي",
            "contact.whatsapp": "واتساب",
            "contact.facebook": "فيسبوك",
            "contact.email": "البريد الإلكتروني",
            "contact.send": "راسلني مباشرة",
            "contact.page": "صفحة المكتب",
            "contact.inquiries": "للاستفسارات",

            // Actions
            "action.open": "فتح ←",
            "action.save": "حفظ",
            "action.cancel": "إلغاء",
            "action.delete": "حذف",
            "action.edit": "تعديل",
            "action.search": "ابحث",
            "action.export": "تصدير",
            "action.print": "طباعة",
            "action.back": "← رجوع",
            "action.next": "التالي →",

            // Footer
            "footer.quick": "روابط سريعة",
            "footer.libs": "المكتبات",
            "footer.contact": "التواصل",
            "footer.rights": "جميع الحقوق محفوظة",
            "footer.credit": "حقوق التصميم للمهندس",

            // Tools
            "tools.title": "الأدوات الهندسية",
            "tools.search": "ابحث عن أداة، حاسبة، Checklist...",
            "tools.noResults": "لا توجد نتائج",
            "tools.tryDifferent": "جرب كلمة بحث مختلفة أو اختر تصنيفاً آخر",

            // Calculators
            "calc.title": "الحاسبات الهندسية",
            "calc.subtitle": "كل حاسبة توضح المدخلات، القانون، النتيجة، والمرجع.",
            "calc.inputs": "المدخلات",
            "calc.result": "النتيجة",
            "calc.formula": "القانون المستخدم",
            "calc.steps": "خطوات الحساب",
            "calc.notes": "ملاحظات مهمة",
            "calc.refs": "المراجع",
            "calc.calculate": "احسب",
            "calc.reset": "إعادة",
            "calc.saveToFav": "حفظ في المفضلة",
            "calc.exportPDF": "تصدير PDF",
            "calc.notFound": "الحاسبة غير موجودة",

            // Encyclopedia
            "enc.title": "الموسوعة الهندسية",
            "enc.search": "ابحث في المواضيع...",
            "enc.topics": "موضوع",
            "enc.categories": "تصنيف",
            "enc.noResults": "لا توجد نتائج",

            // Content
            "content.title": "المحتوى الهندسي",
            "content.filter.all": "الكل",
            "content.filter.docs": "مستندات",
            "content.filter.videos": "فيديوهات",
            "content.filter.programs": "برامج",
            "content.filter.articles": "مقالات",
            "content.filter.links": "روابط",

            // Codes
            "codes.title": "الأكواد والمعايير",
            "codes.subtitle": "مكتبة منظمة للأكواد والمعايير الهندسية",

            // Specs
            "specs.title": "المواصفات الفنية",
            "specs.subtitle": "مكتبة المواصفات الفنية لكل عناصر المشروع",

            // Products
            "products.title": "المنتجات والمعدات",
            "products.subtitle": "قاعدة بيانات المنتجات والمعدات الكهربائية",

            // Projects
            "projects.title": "المشاريع",
            "projects.empty": "لا توجد مشاريع",
            "projects.add": "إضافة مشروع",

            // Favorites
            "fav.title": "المفضلة",
            "fav.subtitle": "كل الأدوات والحاسبات التي حفظتها",
            "fav.empty": "المفضلة فارغة",
            "fav.browse": "تصفح الحاسبات",

            // Admin
            "admin.title": "لوحة التحكم",
            "admin.subtitle": "هذه الصفحة مخصصة للمهندس فقط",
            "admin.password": "كلمة المرور",
            "admin.login": "دخول",
            "admin.logout": "خروج",
            "admin.back": "← العودة للمنصة",

            // Toasts
            "toast.fav.added": "❤️ تمت الإضافة للمفضلة",
            "toast.fav.removed": "💔 تم الحذف من المفضلة",
            "toast.saved": "✅ تم الحفظ",
            "toast.deleted": "🗑️ تم الحذف",
            "toast.copied": "📋 تم النسخ",
            "toast.lang.switched": "تم تغيير اللغة",
            "toast.theme.dark": "🌙 الوضع الليلي",
            "toast.theme.light": "☀️ الوضع النهاري",
            "toast.color.cyan": "🔵 الأزرق السماوي",
            "toast.color.purple": "🟣 البنفسجي",
            "toast.pdf.exported": "📄 تم تصدير PDF",
            "toast.pdf.error": "❌ فشل التصدير"
        },

        en: {
            // Navbar
            "nav.home": "Home",
            "nav.tools": "Tools",
            "nav.calculators": "Calculators",
            "nav.encyclopedia": "Encyclopedia",
            "nav.content": "Content",
            "nav.projects": "Projects",
            "nav.about": "About",
            "nav.admin": "Admin",

            // Bottom Nav
            "bnav.home": "Home",
            "bnav.tools": "Tools",
            "bnav.calc": "Calc",
            "bnav.enc": "Wiki",
            "bnav.more": "More",

            // Hero
            "welcome.top": "Welcome to",
            "welcome.brand": "Eng. Helal Shalil Office",
            "welcome.desc": "Complete engineering platform for Electrical & MEP engineers — Design, Execution, Technical Office, Quantity Takeoff, Codes & Specifications… all in one place.",
            "welcome.search": "Search for a tool, calculator, topic, code, product, or spec...",

            // Sections
            "section.tools": "Advanced Engineering Tools",
            "section.calc": "Quick Calculators",
            "section.enc": "Engineering Encyclopedia",
            "section.cat": "Main Categories",
            "section.lib": "Engineering Libraries",
            "section.contact": "Contact Me",
            "section.viewAll": "View All →",

            // Stats
            "stat.tools": "Engineering Tools",
            "stat.calc": "Calculators",
            "stat.topics": "Topics",
            "stat.projects": "Projects",

            // Contact
            "contact.phone": "Phone Call",
            "contact.whatsapp": "WhatsApp",
            "contact.facebook": "Facebook",
            "contact.email": "Email",
            "contact.send": "Send Message",
            "contact.page": "Office Page",
            "contact.inquiries": "For Inquiries",

            // Actions
            "action.open": "Open →",
            "action.save": "Save",
            "action.cancel": "Cancel",
            "action.delete": "Delete",
            "action.edit": "Edit",
            "action.search": "Search",
            "action.export": "Export",
            "action.print": "Print",
            "action.back": "← Back",
            "action.next": "Next →",

            // Footer
            "footer.quick": "Quick Links",
            "footer.libs": "Libraries",
            "footer.contact": "Contact",
            "footer.rights": "All rights reserved",
            "footer.credit": "Design rights to Eng.",

            // Tools
            "tools.title": "Engineering Tools",
            "tools.search": "Search for a tool, calculator, checklist...",
            "tools.noResults": "No results found",
            "tools.tryDifferent": "Try a different search or category",

            // Calculators
            "calc.title": "Engineering Calculators",
            "calc.subtitle": "Each calculator shows inputs, formula, result, and reference.",
            "calc.inputs": "Inputs",
            "calc.result": "Result",
            "calc.formula": "Formula Used",
            "calc.steps": "Calculation Steps",
            "calc.notes": "Important Notes",
            "calc.refs": "References",
            "calc.calculate": "Calculate",
            "calc.reset": "Reset",
            "calc.saveToFav": "Save to Favorites",
            "calc.exportPDF": "Export PDF",
            "calc.notFound": "Calculator not found",

            // Encyclopedia
            "enc.title": "Engineering Encyclopedia",
            "enc.search": "Search topics...",
            "enc.topics": "topics",
            "enc.categories": "categories",
            "enc.noResults": "No results found",

            // Content
            "content.title": "Engineering Content",
            "content.filter.all": "All",
            "content.filter.docs": "Documents",
            "content.filter.videos": "Videos",
            "content.filter.programs": "Programs",
            "content.filter.articles": "Articles",
            "content.filter.links": "Links",

            // Codes
            "codes.title": "Codes & Standards",
            "codes.subtitle": "Organized library of engineering codes and standards",

            // Specs
            "specs.title": "Technical Specs",
            "specs.subtitle": "Technical specifications library for all project elements",

            // Products
            "products.title": "Products & Equipment",
            "products.subtitle": "Database of electrical products and equipment",

            // Projects
            "projects.title": "Projects",
            "projects.empty": "No projects yet",
            "projects.add": "Add Project",

            // Favorites
            "fav.title": "Favorites",
            "fav.subtitle": "All tools and calculators you saved",
            "fav.empty": "Favorites is empty",
            "fav.browse": "Browse Calculators",

            // Admin
            "admin.title": "Admin Panel",
            "admin.subtitle": "This page is for the engineer only",
            "admin.password": "Password",
            "admin.login": "Login",
            "admin.logout": "Logout",
            "admin.back": "← Back to Platform",

            // Toasts
            "toast.fav.added": "❤️ Added to favorites",
            "toast.fav.removed": "💔 Removed from favorites",
            "toast.saved": "✅ Saved",
            "toast.deleted": "🗑️ Deleted",
            "toast.copied": "📋 Copied",
            "toast.lang.switched": "Language switched",
            "toast.theme.dark": "🌙 Dark Mode",
            "toast.theme.light": "☀️ Light Mode",
            "toast.color.cyan": "🔵 Cyan Theme",
            "toast.color.purple": "🟣 Purple Theme",
            "toast.pdf.exported": "📄 PDF exported",
            "toast.pdf.error": "❌ Export failed"
        }
    },

    /* ========================================
       INIT
    ======================================== */
    init() {
        const saved = localStorage.getItem("engOffice_lang") || "ar";
        this.current = saved;
        this.apply();
    },

    /* ========================================
       TRANSLATE
    ======================================== */
    t(key) {
        const dict = this.translations[this.current] || {};
        return dict[key] || key;
    },

    /* ========================================
       TOGGLE
    ======================================== */
    toggle() {
        this.current = this.current === "ar" ? "en" : "ar";
        localStorage.setItem("engOffice_lang", this.current);
        this.apply();

        // تحديث الزر
        document.querySelectorAll(".lang-toggle").forEach(btn => {
            btn.setAttribute("title", this.current === "ar" ? "Switch to English" : "التبديل للعربية");
            const label = btn.querySelector(".lang-label");
            if (label) label.textContent = this.current === "ar" ? "ع" : "EN";
        });

        // إعادة رسم الصفحات اللي فيها محتوى مترجم
        if (typeof renderAllContent === "function") renderAllContent();

        if (typeof toast === "function") {
            toast(this.current === "ar" ? "🇪🇬 العربية" : "🇬🇧 English", "info");
        }
    },

    /* ========================================
       APPLY
    ======================================== */
    apply() {
        document.documentElement.lang = this.current;
        document.documentElement.dir = this.current === "ar" ? "rtl" : "ltr";

        // [data-i18n] → textContent
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const translated = this.t(key);
            if (translated && translated !== key) {
                el.textContent = translated;
            }
        });

        // [data-i18n-placeholder] → placeholder
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            const translated = this.t(key);
            if (translated && translated !== key) el.placeholder = translated;
        });

        // [data-i18n-title] → title
        document.querySelectorAll("[data-i18n-title]").forEach(el => {
            const key = el.getAttribute("data-i18n-title");
            const translated = this.t(key);
            if (translated && translated !== key) el.title = translated;
        });

        // [data-i18n-html] → innerHTML
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            const translated = this.t(key);
            if (translated && translated !== key) el.innerHTML = translated;
        });
    }
};

window.I18N = I18N;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => I18N.init());
} else {
    I18N.init();
}