/* ========================================
   APP - المنطق الأساسي للموقع
   الإصدار: 6.0 — مع Auto-Update SW
======================================== */

/* ========================================
   1. THEME MANAGER
======================================== */
const ThemeManager = {
    get() { return (function(){try{return sessionStorage.getItem("hilal_visit_theme")}catch(e){return null}})() || "dark"; },
    set(theme) {
        try{sessionStorage.setItem("hilal_visit_theme", theme)}catch(e){}
        this.apply(theme);
    },
    toggle() {
        const current = this.get() === "dark" ? "light" : "dark";
        this.set(current);
        return current;
    },
    apply(theme) {
        if (theme === "auto") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            theme = prefersDark ? "dark" : "light";
        }
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }
};

/* ========================================
   2. COLOR MANAGER
======================================== */
const ColorManager = {
    get() { return localStorage.getItem("engOffice_color") || "cyan"; },
    set(color) {
        localStorage.setItem("engOffice_color", color);
        this.apply(color);
    },
    toggle() {
        const current = this.get() === "cyan" ? "purple" : "cyan";
        this.set(current);
        return current;
    },
    apply(color) {
        if (color === "purple") {
            document.documentElement.setAttribute("data-color", "purple");
        } else {
            document.documentElement.removeAttribute("data-color");
        }
    }
};

/* ========================================
   3. TOAST
======================================== */
function toast(msg, type = "success") {
    let el = document.getElementById("app-toast");
    if (!el) {
        el = document.createElement("div");
        el.id = "app-toast";
        document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = type;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ========================================
   4. TOGGLES
======================================== */
function toggleTheme() {
    const next = ThemeManager.toggle();
    toast(next === "dark" ? "🌙 الوضع الليلي" : "☀️ الوضع النهاري", "info");
}

function toggleColor() {
    const next = ColorManager.toggle();
    toast(next === "purple" ? "🟣 البنفسجي" : "🔵 الأزرق السماوي", "info");
}

function toggleLanguage() {
    if (window.I18N) I18N.toggle();
}

/* ========================================
   5. CATEGORY NAME
======================================== */
function catName(id) {
    if (typeof CATEGORIES === "undefined") return id;
    const c = CATEGORIES.find(x => x.id === id);
    return c ? c.name : id;
}

/* ========================================
   6. RENDER: TOOLS HOME
======================================== */
function renderToolsHome(containerId, limit = 3) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const list = (window.ContentManager)
        ? ContentManager.getTools().slice(0, limit)
        : ((typeof TOOLS !== "undefined") ? TOOLS.slice(0, limit) : []);

    el.innerHTML = list.map(t => {
        const iconHTML = (window.Icons) ? Icons.build(t.icon, "", 26) : "";
        return `
            <a href="${t.url}" class="tool-card">
                ${t.img ? `<div class="tool-card-media"><img src="${t.img}" alt="" loading="lazy"></div>` : ""}
                <div class="tool-card-head">
                    <div class="cat-icon">${iconHTML}</div>
                    <div>
                        <h3>${t.name}</h3>
                        <span class="tool-name-en">${t.nameEn || ""}</span>
                    </div>
                </div>
                <p>${t.desc || ""}</p>
                <div class="tool-card-footer">
                    <span class="tool-tag">${catName(t.category)}</span>
                    <span style="color: var(--theme-color); font-weight: 800; font-size: 13px;">فتح ←</span>
                </div>
            </a>
        `;
    }).join("");
}

/* ========================================
   7. RENDER: CALCULATORS
======================================== */
function renderCalculators(containerId, filterCat) {
    const el = document.getElementById(containerId);
    if (!el) return;

    let list = (window.ContentManager)
        ? ContentManager.getCalculators()
        : ((typeof CALCULATORS !== "undefined") ? CALCULATORS : []);

    if (filterCat && filterCat !== "all") {
        list = list.filter(c => c.category === filterCat);
    }

    if (list.length === 0) {
        el.innerHTML = `<div class="empty" style="grid-column: 1 / -1;"><div class="empty-icon">🧮</div><h2>لا توجد حاسبات</h2></div>`;
        return;
    }

    el.innerHTML = list.map(c => {
        const url = c.externalUrl ? c.externalUrl : `calculator.html?id=${c.id}`;
        const iconHTML = (window.Icons) ? Icons.build(c.icon, "", 26) : "";
        const catLabel = catName(c.category);
        const isFav = (window.Store && Store.isFavorite("calc:" + c.id));
        const favIconHTML = (window.Icons) ? Icons.build("heart", "", 16) : "";
        return `
            <a href="${url}" class="tool-card">
                <div class="fav-badge ${isFav ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); toggleFav(this, 'calc:${c.id}');">
                    ${favIconHTML}
                </div>
                <div class="tool-card-head">
                    <div class="cat-icon">${iconHTML}</div>
                    <div style="flex:1;">
                        <h3>${c.name}</h3>
                        <span class="tool-name-en">${c.nameEn || ""}</span>
                    </div>
                </div>
                <p>${c.desc || ""}</p>
                <div class="tool-card-footer">
                    <span class="tool-tag">${catLabel}</span>
                    <span style="color: var(--theme-color); font-weight: 800; font-size: 13px;">فتح ←</span>
                </div>
            </a>
        `;
    }).join("");
}

/* ========================================
   8. RENDER: ENCYCLOPEDIA HOME
======================================== */
function renderEncyclopediaHome(containerId, limit = 3) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const list = (typeof ENCYCLOPEDIA !== "undefined") ? ENCYCLOPEDIA.slice(0, limit) : [];

    el.innerHTML = list.map(cat => {
        const iconHTML = (window.Icons) ? Icons.build(cat.icon, "", 26) : "";
        return `
            <a href="topic.html?cat=${cat.id}" class="tool-card">
                <div class="tool-card-head">
                    <div class="cat-icon">${iconHTML}</div>
                    <div>
                        <h3>${cat.name}</h3>
                        <span class="tool-name-en">${cat.nameEn || ""}</span>
                    </div>
                </div>
                <p>${cat.desc || ""}</p>
                <div class="tool-card-footer">
                    <span class="tool-tag">${cat.topics ? cat.topics.length : 0} موضوع</span>
                    <span style="color: var(--theme-color); font-weight: 800; font-size: 13px;">فتح ←</span>
                </div>
            </a>
        `;
    }).join("");
}

/* ========================================
   9. RENDER: CATEGORIES
======================================== */
function renderCategories(containerId, limit) {
    const el = document.getElementById(containerId);
    if (!el || typeof CATEGORIES === "undefined") return;
    const list = limit ? CATEGORIES.slice(0, limit) : CATEGORIES;

    el.innerHTML = list.map(c => {
        const iconHTML = (window.Icons) ? Icons.build(c.icon, "", 26) : "";
        return `
            <a href="tools.html?cat=${c.id}" class="cat-card">
                <div class="cat-icon">${iconHTML}</div>
                <h3>${c.name}</h3>
                <p>${c.desc || ""}</p>
            </a>
        `;
    }).join("");
}

/* ========================================
   10. NAV BUTTONS INJECTION
======================================== */
function injectNavButtons() {
    document.querySelectorAll(".nav-actions").forEach(actions => {
        if (actions.querySelector(".theme-toggle")) return;

        const langBtn = document.createElement("button");
        langBtn.className = "icon-btn lang-toggle";
        langBtn.title = "تغيير اللغة";
        langBtn.onclick = toggleLanguage;
        langBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

        const colorBtn = document.createElement("button");
        colorBtn.className = "icon-btn color-toggle";
        colorBtn.title = "تغيير الألوان";
        colorBtn.onclick = toggleColor;
        colorBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.5" fill="currentColor"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/></svg>';

        const themeBtn = document.createElement("button");
        themeBtn.className = "icon-btn theme-toggle";
        themeBtn.title = "الوضع الليلي/النهاري";
        themeBtn.onclick = toggleTheme;
        themeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

        actions.insertBefore(langBtn, actions.firstChild);
        actions.insertBefore(colorBtn, actions.firstChild);
        actions.insertBefore(themeBtn, actions.firstChild);
    });
}

/* ========================================
   11. CHATBOT TOGGLE — خوذة المهندس 👷
======================================== */
function initChatbotToggle() {
    if (document.querySelector(".chatbot-toggle")) return;

    const btn = document.createElement("button");
    btn.className = "chatbot-toggle";
    btn.setAttribute("aria-label", "المساعد الهندسي");
    btn.setAttribute("title", "المساعد الهندسي — اضغط للتحدث");
    btn.onclick = () => {
        if (window.EngBot && EngBot.toggle) EngBot.toggle();
    };

    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/>
            <path d="M10 10V5a2 2 0 1 1 4 0v5"/>
            <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
        </svg>
    `;

    document.body.appendChild(btn);
}

/* ========================================
   12. INIT ICONS
======================================== */
function initIcons() {
    if (window.Icons && Icons.replaceAll) {
        Icons.replaceAll(document);
    }
}

/* ========================================
   13. FAVORITES BADGE
======================================== */
function updateFavBadge() {
    const b = document.getElementById("favCount");
    if (b && window.Store) b.textContent = Store.getFavorites().length;
}

/* ========================================
   14. IMAGE FALLBACK
======================================== */
function initImageFallback() {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", function() {
            if (!this.dataset.fallback) {
                this.dataset.fallback = "1";
                this.style.background = "linear-gradient(135deg, #00d9ff, #22d3ee)";
                this.style.minHeight = this.style.minHeight || "40px";
            }
        }, { once: true });
    });
}

/* ========================================
   15. READING PROGRESS
======================================== */
function initReadingProgress() {
    let bar = document.getElementById("reading-progress");
    if (!bar) {
        bar = document.createElement("div");
        bar.id = "reading-progress";
        document.body.appendChild(bar);
    }
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? scrolled / max : 0;
        bar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
}

/* ========================================
   16. BACK TO TOP
======================================== */
function initBackToTop() {
    let btn = document.getElementById("back-to-top");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "back-to-top";
        btn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
        document.body.appendChild(btn);
    }
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) btn.classList.add("show");
        else btn.classList.remove("show");
    }, { passive: true });
}

/* ========================================
   17. WHATSAPP FLOAT
======================================== */
function initWhatsAppFloat() {
    // personal-use site: no WhatsApp consultation float
}

/* ========================================
   18. BOTTOM NAV
======================================== */
function initBottomNav() {
    if (document.querySelector(".bottom-nav")) return;
    const currentPage = document.body.dataset.page || "";
    // pages inside sub-folders (tools/, calculators/) need ../ to reach root pages
    const base = /\/(tools|calculators)\//.test(location.pathname) ? "../" : "";
    const items = [
        { id: "index", icon: "home", label: "الرئيسية", url: base + "index.html" },
        { id: "tools", icon: "toolbox", label: "الأدوات", url: base + "tools.html" },
        { id: "calculators", icon: "calculator", label: "الحاسبات", url: base + "calculators.html" },
        { id: "encyclopedia", icon: "library", label: "الموسوعة", url: base + "encyclopedia.html" },
        { id: "content", icon: "folder", label: "المحتوى", url: base + "content.html" }
    ];
    const nav = document.createElement("nav");
    nav.className = "bottom-nav";
    nav.innerHTML = `
        <div class="bottom-nav-inner">
            ${items.map(item => {
                const iconHTML = (window.Icons) ? Icons.build(item.icon, "", 22) : "";
                const active = currentPage === item.id ? "active" : "";
                return `<a href="${item.url}" class="bottom-nav-item ${active}">
                    ${iconHTML}
                    <span>${item.label}</span>
                </a>`;
            }).join("")}
        </div>
    `;
    document.body.appendChild(nav);
}

/* ========================================
   19. LOADER
======================================== */
window.addEventListener("load", () => {
    const l = document.getElementById("loader");
    if (l) setTimeout(() => l.classList.add("hide"), 400);
});

/* ========================================
   20. ⭐ SERVICE WORKER — Auto Update
======================================== */
function initInstallBanner() {
    const appScript = document.querySelector('script[src*="js/app.js"]');
    if (!appScript || document.querySelector('script[src*="install-banner.js"]')) return;
    const el = document.createElement("script");
    el.src = new URL("install-banner.js", appScript.src).href;
    el.defer = true;
    document.head.appendChild(el);
}

function initServiceWorker() {
    initInstallBanner();
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
        // Resolve SW path from this script's own URL so it works from any
        // page depth (root, /tools/, /calculators/) and any deploy subpath.
        const appScript = document.querySelector('script[src*="js/app.js"]');
        const swUrl = appScript ? new URL("../service-worker.js", appScript.src).href : "service-worker.js";
        navigator.serviceWorker.register(swUrl)
            .then(reg => {
                // فحص تحديثات كل دقيقة
                setInterval(() => reg.update(), 60 * 1000);

                // لو في SW جديد
                reg.addEventListener("updatefound", () => {
                    const newWorker = reg.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener("statechange", () => {
                        if (newWorker.state === "installed" &&
                            navigator.serviceWorker.controller) {
                            console.log("🔄 نسخة جديدة من الموقع متاحة");

                            // فعّلها فورًا
                            newWorker.postMessage("SKIP_WAITING");

                            // أعد تحميل الصفحة مرة واحدة
                            let refreshing = false;
                            navigator.serviceWorker.addEventListener("controllerchange", () => {
                                if (!refreshing) {
                                    refreshing = true;
                                    window.location.reload();
                                }
                            });
                        }
                    });
                });

                // رسائل من الـ SW
                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data === "REFRESH_PAGE") {
                        window.location.reload();
                    }
                });
            })
            .catch(err => console.warn("SW registration failed:", err));
    });
}


/* ========================================
   20. HUB ACCORDION (homepage)
======================================== */
function initHubAccordion() {
    document.querySelectorAll('.hub-acc-head').forEach(function (head) {
        head.addEventListener('click', function () {
            var body = head.nextElementSibling;
            var isOpen = head.classList.toggle('open');
            if (body) body.classList.toggle('open', isOpen);
            head.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
}

/* ========================================
   21. INIT EVERYTHING
======================================== */
document.addEventListener("DOMContentLoaded", () => {
    ThemeManager.apply(ThemeManager.get());
    ColorManager.apply(ColorManager.get());

    injectNavButtons();
    initIcons();
    updateFavBadge();
    initImageFallback();

    initReadingProgress();
    initBackToTop();
    initWhatsAppFloat();
    initBottomNav();
    initHubAccordion();

    // زر البوت — خوذة المهندس
    setTimeout(initChatbotToggle, 600);

    setTimeout(() => {
        if (window.Icons) Icons.replaceAll(document);
    }, 800);
});

// ⭐ Service Worker
initServiceWorker();

/* ========================================
   EXPOSE
======================================== */
window.ThemeManager = ThemeManager;
window.ColorManager = ColorManager;
window.toast = toast;
window.toggleTheme = toggleTheme;
window.toggleColor = toggleColor;
window.toggleLanguage = toggleLanguage;
window.catName = catName;
window.renderCategories = renderCategories;
window.renderCalculators = renderCalculators;
window.renderToolsHome = renderToolsHome;
window.renderEncyclopediaHome = renderEncyclopediaHome;
window.initIcons = initIcons;
window.initHubAccordion = initHubAccordion;
