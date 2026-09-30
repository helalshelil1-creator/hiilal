/* ========================================
   SERVICE WORKER — Production Ready
   Eng. Helal Shalil
   الإصدار: 3.0
========================================
   
   الاستراتيجية:
   - HTML / JS / CSS / JSON → Network First (دائمًا آخر نسخة)
   - Images / Fonts → Cache First (سرعة)
   - Google Fonts → Cache First
   - Offline Fallback → من الكاش
   
======================================== */

const CACHE_VERSION = "v3.0.0";
const STATIC_CACHE = `eng-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `eng-runtime-${CACHE_VERSION}`;

/* ========================================
   CORE ASSETS
   ملفات أساسية للـ offline
======================================== */
const CORE_ASSETS = [
    // الصفحات الرئيسية
    "./",
    "./index.html",
    "./about.html",
    "./tools.html",
    "./calculators.html",
    "./calculator.html",
    "./encyclopedia.html",
    "./topic.html",
    "./content.html",
    "./codes.html",
    "./specs.html",
    "./products.html",
    "./projects.html",
    "./favorites.html",
    "./library.html",
    "./404.html",
    "./admin.html",

    // PWA
    "./manifest.json",
    "./browserconfig.xml",

    // CSS
    "./css/style.css",
    "./css/animations.css",
    "./css/welcome.css",

    // JS Core
    "./js/storage.js",
    "./js/i18n.js",
    "./js/icons.js",
    "./js/app.js",
    "./js/animations.js",
    "./js/eng-bot.js",
    "./js/pdf-export.js",
    "./js/favorites.js",
    "./js/content-manager.js",
    "./js/analytics.js",

    // JS SEO
    "./js/seo-data.js",
    "./js/seo.js",

    // JS Data
    "./js/data/categories.js",
    "./js/data/tools.js",
    "./js/data/calculators.js",
    "./js/data/encyclopedia.js",
    "./js/data/content.js",
    "./js/data/codes.js",
    "./js/data/specs.js",
    "./js/data/products.js",
    "./js/data/projects.js",

    // Tools
    "./tools/software-guide.html",
    "./tools/unit-converter.html",
    "./tools/ip-rating.html",
    "./tools/checklists.html",
    "./tools/schedules.html",
    "./tools/documents.html",

    // Calculators
    "./calculators/cable-breaker.html",

    // Images
    "./images/logo.png",
    "./images/hero-bg.jpg"
];

/* ========================================
   INSTALL
   تخزين الملفات الأساسية
======================================== */
self.addEventListener("install", (event) => {
    console.log("🔧 SW: Installing...", CACHE_VERSION);

    // تنشيط فوري للنسخة الجديدة
    self.skipWaiting();

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                // استخدام allSettled عشان ملف واحد مش يوقف الباقي
                return Promise.allSettled(
                    CORE_ASSETS.map((url) =>
                        cache.add(url).catch((err) => {
                            console.warn(`⚠️ SW: Failed to cache ${url}`, err.message);
                            return null;
                        })
                    )
                );
            })
            .then((results) => {
                const success = results.filter((r) => r.status === "fulfilled").length;
                console.log(`✅ SW: Cached ${success}/${CORE_ASSETS.length} files`);
            })
    );
});

/* ========================================
   ACTIVATE
   مسح الكاش القديم
======================================== */
self.addEventListener("activate", (event) => {
    console.log("🚀 SW: Activating...", CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys
                        .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
                        .map((key) => {
                            console.log(`🗑️ SW: Deleting old cache: ${key}`);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => {
                // تفعيل فوري لكل الصفحات المفتوحة
                return self.clients.claim();
            })
            .then(() => {
                // إبلاغ كل الصفحات بتحديث
                return self.clients.matchAll({ type: "window" });
            })
            .then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ type: "SW_ACTIVATED", version: CACHE_VERSION });
                });
            })
    );
});

/* ========================================
   FETCH
   استراتيجية التخزين
======================================== */
self.addEventListener("fetch", (event) => {
    const { request } = event;

    // تجاهل الطلبات غير GET
    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // تجاهل Chrome extensions و browser APIs
    if (
        url.protocol === "chrome-extension:" ||
        url.protocol === "moz-extension:" ||
        url.protocol === "chrome:" ||
        url.protocol === "edge:"
    ) {
        return;
    }

    // تجاهل طلبات GA و Analytics
    if (
        url.hostname.includes("google-analytics.com") ||
        url.hostname.includes("googletagmanager.com") ||
        url.hostname.includes("vercel.com/_vercel")
    ) {
        return;
    }

    // ========================================
    // 1. Google Fonts → Cache First
    // ========================================
    if (
        url.hostname.includes("fonts.googleapis.com") ||
        url.hostname.includes("fonts.gstatic.com")
    ) {
        event.respondWith(cacheFirst(request, RUNTIME_CACHE));
        return;
    }

    // ========================================
    // 2. Images / Fonts / Icons → Cache First
    // ========================================
    if (/\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname)) {
        event.respondWith(cacheFirst(request, RUNTIME_CACHE));
        return;
    }

    // ========================================
    // 3. HTML / JS / CSS / JSON → Network First
    // ========================================
    if (
        request.mode === "navigate" ||
        /\.(html|js|css|json|xml)$/i.test(url.pathname) ||
        url.pathname.endsWith("/")
    ) {
        event.respondWith(networkFirst(request, RUNTIME_CACHE));
        return;
    }

    // ========================================
    // 4. الباقي → Network First (افتراضي)
    // ========================================
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

/* ========================================
   STRATEGY: Cache First
   الكاش أولاً، ثم الشبكة
======================================== */
async function cacheFirst(request, cacheName) {
    try {
        const cached = await caches.match(request);
        if (cached) {
            // حدّث الكاش في الخلفية (بدون انتظار)
            updateCache(request, cacheName).catch(() => {});
            return cached;
        }

        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone()).catch(() => {});
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        return offlineFallback(request);
    }
}

/* ========================================
   STRATEGY: Network First
   الشبكة أولاً، ثم الكاش
======================================== */
async function networkFirst(request, cacheName) {
    try {
        const response = await fetch(request);

        // خزّن نسخة جديدة
        if (response && response.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone()).catch(() => {});
        }

        return response;
    } catch (err) {
        // Offline → استخدم الكاش
        const cached = await caches.match(request);
        if (cached) return cached;

        // Fallback للصفحة الرئيسية لو navigation
        if (request.mode === "navigate") {
            const indexCached = await caches.match("./index.html");
            if (indexCached) return indexCached;
        }

        return offlineFallback(request);
    }
}

/* ========================================
   UPDATE CACHE (Background)
======================================== */
async function updateCache(request, cacheName) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, response);
        }
    } catch (e) {
        // صامت
    }
}

/* ========================================
   OFFLINE FALLBACK
======================================== */
async function offlineFallback(request) {
    // لو الطلب HTML
    if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
        const cached = await caches.match("./index.html");
        if (cached) return cached;
    }

    // صورة → ارجع SVG placeholder
    if ((request.headers.get("accept") || "").includes("image")) {
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <rect fill="#0a1628" width="100" height="100"/>
                <text x="50" y="55" fill="#00d9ff" font-size="40" text-anchor="middle" font-family="monospace">⚡</text>
            </svg>`,
            { headers: { "Content-Type": "image/svg+xml" } }
        );
    }

    // نص → رسالة offline
    return new Response("أنت غير متصل بالإنترنت", {
        status: 200,
        statusText: "Offline",
        headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
}

/* ========================================
   MESSAGE HANDLER
   للتحكم من الصفحات
======================================== */
self.addEventListener("message", (event) => {
    const data = event.data;

    // تفعيل فوري للنسخة الجديدة
    if (data === "SKIP_WAITING") {
        self.skipWaiting();
    }

    // مسح كل الكاش
    if (data === "CLEAR_CACHE") {
        event.waitUntil(
            caches.keys()
                .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
                .then(() => {
                    console.log("🗑️ SW: All caches cleared");
                    event.source?.postMessage({ type: "CACHE_CLEARED" });
                })
        );
    }

    // إرجاع رقم الإصدار
    if (data === "GET_VERSION") {
        event.source?.postMessage({
            type: "VERSION_INFO",
            version: CACHE_VERSION,
            caches: [STATIC_CACHE, RUNTIME_CACHE]
        });
    }

    // جلب إحصائيات الكاش
    if (data === "GET_CACHE_STATS") {
        event.waitUntil(
            (async () => {
                const stats = {};
                const keys = await caches.keys();
                for (const key of keys) {
                    const cache = await caches.open(key);
                    const reqs = await cache.keys();
                    stats[key] = reqs.length;
                }
                event.source?.postMessage({ type: "CACHE_STATS", stats });
            })()
        );
    }
});

/* ========================================
   PUSH NOTIFICATIONS (اختياري)
======================================== */
self.addEventListener("push", (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();
        event.waitUntil(
            self.registration.showNotification(data.title || "Eng. Helal Shalil", {
                body: data.body || "",
                icon: "./images/logo.png",
                badge: "./images/logo.png",
                dir: "rtl",
                lang: "ar",
                data: { url: data.url || "./" }
            })
        );
    } catch (e) {
        console.warn("Push error:", e);
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const url = event.notification.data?.url || "./";
    event.waitUntil(
        clients.matchAll({ type: "window" }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === url && "focus" in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});

/* ========================================
   SYNC (Background Sync — للـ Forms)
======================================== */
self.addEventListener("sync", (event) => {
    if (event.tag === "sync-forms") {
        event.waitUntil(
            (async () => {
                console.log("🔄 SW: Syncing forms...");
                // منطق مزامنة النماذج (اختياري)
            })()
        );
    }
});

console.log(`✅ SW: Loaded — ${CACHE_VERSION}`);