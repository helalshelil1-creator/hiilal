/* ========================================
   FAVORITES - إدارة المفضلة
======================================== */

const Favorites = {
    /* الحصول على كل المفضلة */
    getAll() {
        return (window.Store) ? Store.getFavorites() : [];
    },

    /* التحقق من وجود عنصر */
    has(id) {
        return this.getAll().includes(id);
    },

    /* تبديل الإضافة/الإزالة */
    toggle(id) {
        if (!window.Store) return false;
        return Store.toggleFavorite(id);
    },

    /* إزالة عنصر */
    remove(id) {
        if (!window.Store) return;
        const list = this.getAll().filter(x => x !== id);
        Store.set("favorites", list);
    },

    /* عدد المفضلة */
    count() {
        return this.getAll().length;
    },

    /* تحديث شارة المفضلة في النافبار */
    updateBadge() {
        const b = document.getElementById("favCount");
        if (b) b.textContent = this.count();
    },

    /* ربط زر Heart في الكارد */
    bindBadge(el, id) {
        if (!el) return;
        const isFav = this.has(id);
        el.classList.toggle("active", isFav);
        el.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const added = this.toggle(id);
            el.classList.toggle("active", added);
            if (typeof toast === "function") {
                toast(added ? "❤️ تمت الإضافة للمفضلة" : "💔 تم الحذف", added ? "success" : "info");
            }
        };
    }
};

/* ========================================
   GLOBAL toggleFav (يستخدم في onclick)
======================================== */
function toggleFav(el, id) {
    if (!el) return;
    const added = Favorites.toggle(id);
    el.classList.toggle("active", added);
    if (typeof toast === "function") {
        toast(added ? "❤️ تمت الإضافة للمفضلة" : "💔 تم الحذف", added ? "success" : "info");
    }
}

window.Favorites = Favorites;
window.toggleFav = toggleFav;