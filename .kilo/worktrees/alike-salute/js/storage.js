/* ========================================
   STORAGE - إدارة البيانات المحلية
   الإصدار: 2.0 — مع Analytics
======================================== */

const Store = {
    prefix: "engOffice_",

    /* ========================================
       BASIC
    ======================================== */
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(this.prefix + key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    },

    clear() {
        Object.keys(localStorage)
            .filter(k => k.startsWith(this.prefix))
            .forEach(k => localStorage.removeItem(k));
    },

    /* ========================================
       FAVORITES
    ======================================== */
    getFavorites() {
        return this.get("favorites", []);
    },

    isFavorite(id) {
        return this.getFavorites().includes(id);
    },

    toggleFavorite(id) {
        const favs = this.getFavorites();
        const idx = favs.indexOf(id);
        if (idx > -1) {
            favs.splice(idx, 1);
        } else {
            favs.unshift(id);
        }
        this.set("favorites", favs);
        return idx === -1;
    },

    /* ========================================
       RECENT
    ======================================== */
    getRecent() {
        return this.get("recent", []);
    },

    addRecent(id) {
        let list = this.getRecent().filter(x => x !== id);
        list.unshift(id);
        list = list.slice(0, 8);
        this.set("recent", list);
    },

    /* ========================================
       THEME
    ======================================== */
    getTheme() {
        return localStorage.getItem("engOffice_theme") || "auto";
    },

    setTheme(t) {
        localStorage.setItem("engOffice_theme", t);
    },

    /* ========================================
       COLOR
    ======================================== */
    getColor() {
        return localStorage.getItem("engOffice_color") || "cyan";
    },

    setColor(c) {
        localStorage.setItem("engOffice_color", c);
    },

    /* ========================================
       LANGUAGE
    ======================================== */
    getLang() {
        return localStorage.getItem("engOffice_lang") || "ar";
    },

    setLang(l) {
        localStorage.setItem("engOffice_lang", l);
    },

    /* ========================================
       CUSTOM DATA
    ======================================== */
    getCustom(type) {
        return this.get("custom_" + type, []);
    },

    addCustom(type, item) {
        const list = this.getCustom(type);
        item.id = item.id || (type + "-" + Date.now());
        item.addedAt = new Date().toISOString();
        item.isCustom = true;
        list.unshift(item);
        this.set("custom_" + type, list);
        return item;
    },

    removeCustom(type, id) {
        const list = this.getCustom(type).filter(x => x.id !== id);
        this.set("custom_" + type, list);
    },

    updateCustom(type, id, updates) {
        const list = this.getCustom(type);
        const idx = list.findIndex(x => x.id === id);
        if (idx === -1) return false;
        list[idx] = { ...list[idx], ...updates };
        this.set("custom_" + type, list);
        return true;
    },

    /* ========================================
       ميزة 16: ANALYTICS (تتبع الزيارات)
    ======================================== */
    trackVisit(page) {
        try {
            // عدد الزيارات الكلي
            let totalVisits = this.get("analytics_total_visits", 0);
            totalVisits++;
            this.set("analytics_total_visits", totalVisits);

            // عدد الزيارات لكل صفحة
            let pageVisits = this.get("analytics_page_visits", {});
            pageVisits[page] = (pageVisits[page] || 0) + 1;
            this.set("analytics_page_visits", pageVisits);

            // تاريخ آخر زيارة
            this.set("analytics_last_visit", new Date().toISOString());

            // تاريخ أول زيارة
            if (!this.get("analytics_first_visit")) {
                this.set("analytics_first_visit", new Date().toISOString());
            }

            // سجل آخر 30 زيارة
            let history = this.get("analytics_history", []);
            history.unshift({
                page: page,
                timestamp: new Date().toISOString(),
                url: window.location.pathname
            });
            history = history.slice(0, 30);
            this.set("analytics_history", history);

        } catch (e) {
            // صامت
        }
    },

    getAnalytics() {
        return {
            totalVisits: this.get("analytics_total_visits", 0),
            pageVisits: this.get("analytics_page_visits", {}),
            lastVisit: this.get("analytics_last_visit", null),
            firstVisit: this.get("analytics_first_visit", null),
            history: this.get("analytics_history", [])
        };
    },

    resetAnalytics() {
        ["analytics_total_visits", "analytics_page_visits",
         "analytics_last_visit", "analytics_first_visit",
         "analytics_history"].forEach(k => this.remove(k));
    },

    /* ========================================
       ميزة 9: SAVED CALCULATIONS
    ======================================== */
    saveCalculation(calcId, inputs, results, title) {
        const saved = this.get("saved_calculations", []);
        const item = {
            id: "calc-" + Date.now(),
            calcId: calcId,
            title: title || calcId,
            inputs: inputs,
            results: results,
            savedAt: new Date().toISOString()
        };
        saved.unshift(item);
        // الاحتفاظ بآخر 50 حساب فقط
        this.set("saved_calculations", saved.slice(0, 50));
        return item;
    },

    getSavedCalculations() {
        return this.get("saved_calculations", []);
    },

    removeSavedCalculation(id) {
        const list = this.getSavedCalculations().filter(x => x.id !== id);
        this.set("saved_calculations", list);
    },

    /* ========================================
       ميزة 15: UPLOADED IMAGES (كـ Base64)
    ======================================== */
    saveImage(id, base64) {
        const images = this.get("uploaded_images", {});
        images[id] = base64;
        this.set("uploaded_images", images);
    },

    getImage(id) {
        const images = this.get("uploaded_images", {});
        return images[id] || null;
    },

    removeImage(id) {
        const images = this.get("uploaded_images", {});
        delete images[id];
        this.set("uploaded_images", images);
    }
};

window.Store = Store;

/* ========================================
   تتبع الزيارة تلقائيًا عند تحميل الصفحة
======================================== */
(function autoTrack() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            const page = document.body.dataset.page || "unknown";
            Store.trackVisit(page);
        });
    } else {
        const page = document.body.dataset.page || "unknown";
        Store.trackVisit(page);
    }
})();