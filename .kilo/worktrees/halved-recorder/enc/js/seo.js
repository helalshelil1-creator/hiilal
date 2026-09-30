/* ========================================
   SEO — Auto-inject meta tags + Schema
   Eng. Helal Shalil
   الإصدار: 1.0
======================================== */

const SEO = {
    baseUrl: "https://hiilal.vercel.app",
    defaultImage: "https://hiilal.vercel.app/images/og-image.jpg",
    siteName: "مكتب المهندس هلال شليل",

    /* ========================================
       DETECT CURRENT PAGE
    ======================================== */
    getCurrentPage() {
        // 1) data-page attribute
        const dataPage = document.body?.dataset?.page;
        if (dataPage && window.SEO_DATA?.[dataPage]) {
            return dataPage;
        }

        // 2) From URL path
        const path = location.pathname.toLowerCase();

        if (path.includes("software-guide"))       return "software-guide";
        if (path.includes("unit-converter"))       return "unit-converter";
        if (path.includes("ip-rating"))            return "ip-rating";
        if (path.includes("checklists"))           return "checklists";
        if (path.includes("schedules"))            return "schedules";
        if (path.includes("documents"))            return "documents";
        if (path.includes("cable-breaker"))        return "cable-breaker";
        if (path.includes("calculators"))          return "calculators";
        if (path.includes("calculator"))           return "calculator";
        if (path.includes("encyclopedia"))         return "encyclopedia";
        if (path.includes("topic"))                return "topic";
        if (path.includes("content"))              return "content";
        if (path.includes("codes"))                return "codes";
        if (path.includes("specs"))                return "specs";
        if (path.includes("products"))             return "products";
        if (path.includes("projects"))             return "projects";
        if (path.includes("favorites"))            return "favorites";
        if (path.includes("about"))                return "about";
        if (path.includes("admin"))                return "admin";
        if (path.includes("404"))                  return "404";
        if (path.includes("tools"))                return "tools";
        if (path === "/" || path.endsWith("/index.html") || path === "") return "index";

        return "index";
    },

    /* ========================================
       META HELPERS
    ======================================== */
    setMeta(name, content, attr = "name") {
        if (!content) return;
        let tag = document.querySelector(`meta[${attr}="${name}"]`);
        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
    },

    setLink(rel, href) {
        if (!href) return;
        let tag = document.querySelector(`link[rel="${rel}"]`);
        if (!tag) {
            tag = document.createElement("link");
            tag.setAttribute("rel", rel);
            document.head.appendChild(tag);
        }
        tag.setAttribute("href", href);
    },

    /* ========================================
       INJECT META
    ======================================== */
    injectMeta(data) {
        // Title
        if (data.title) document.title = data.title;

        // Basic
        this.setMeta("description", data.description);
        this.setMeta("keywords", data.keywords);
        this.setMeta("author", "Eng. Helal Shalil");
        this.setMeta("robots", data.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
        this.setMeta("language", "Arabic");

        // Canonical
        this.setLink("canonical", data.canonical);

        // Open Graph
        this.setMeta("og:type", data.ogType || "website", "property");
        this.setMeta("og:site_name", this.siteName, "property");
        this.setMeta("og:title", data.title, "property");
        this.setMeta("og:description", data.description, "property");
        this.setMeta("og:url", data.canonical, "property");
        this.setMeta("og:image", this.defaultImage, "property");
        this.setMeta("og:image:width", "1200", "property");
        this.setMeta("og:image:height", "630", "property");
        this.setMeta("og:image:alt", data.title, "property");
        this.setMeta("og:locale", "ar_EG", "property");

        // Twitter
        this.setMeta("twitter:card", "summary_large_image");
        this.setMeta("twitter:title", data.title);
        this.setMeta("twitter:description", data.description);
        this.setMeta("twitter:image", this.defaultImage);
        this.setMeta("twitter:creator", "@helalshalil");
    },

    /* ========================================
       INJECT SCHEMA
    ======================================== */
    injectSchema(data, page) {
        if (!data.schemaType) return;

        const graph = [
            {
                "@type": "WebSite",
                "@id": `${this.baseUrl}/#website`,
                "url": `${this.baseUrl}/`,
                "name": this.siteName,
                "inLanguage": "ar",
                "publisher": { "@id": `${this.baseUrl}/#person` }
            },
            {
                "@type": "Person",
                "@id": `${this.baseUrl}/#person`,
                "name": "هلال شليل",
                "alternateName": ["Eng. Helal Shalil", "المهندس هلال شليل"],
                "jobTitle": "Electrical & MEP Engineer",
                "url": `${this.baseUrl}/about.html`,
                "image": `${this.baseUrl}/images/alamein.jpg`,
                "telephone": "+201124169656",
                "email": "helalshelil1@gmail.com",
                "sameAs": [
                    "https://www.facebook.com/share/1LZyJP2zat/"
                ],
                "knowsAbout": [
                    "Electrical Engineering", "MEP Engineering", "AutoCAD",
                    "Revit MEP", "BIM", "Fire Alarm", "Fire Fighting",
                    "ELV", "BMS", "IEC 60364", "NFPA 72"
                ]
            },
            {
                "@type": "Organization",
                "@id": `${this.baseUrl}/#organization`,
                "name": this.siteName,
                "url": `${this.baseUrl}/`,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${this.baseUrl}/images/logo.png`
                },
                "founder": { "@id": `${this.baseUrl}/#person` },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+201124169656",
                    "contactType": "customer service",
                    "availableLanguage": ["Arabic", "English"],
                    "areaServed": "EG"
                }
            },
            {
                "@type": data.schemaType,
                "@id": `${data.canonical}#page`,
                "url": data.canonical,
                "name": data.title,
                "description": data.description,
                "inLanguage": "ar",
                "isPartOf": { "@id": `${this.baseUrl}/#website` },
                "about": { "@id": `${this.baseUrl}/#person` }
            }
        ];

        // Add BreadcrumbList
        if (data.breadcrumb && data.breadcrumb.length > 0) {
            const items = data.breadcrumb.map((item, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": item.name,
                ...(item.url ? { "item": this.resolveUrl(item.url) } : {})
            }));

            graph.push({
                "@type": "BreadcrumbList",
                "itemListElement": items
            });
        }

        const schema = {
            "@context": "https://schema.org",
            "@graph": graph
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    },

    /* ========================================
       RESOLVE URL
    ======================================== */
    resolveUrl(url) {
        if (!url) return this.baseUrl;
        if (url.startsWith("http")) return url;
        // Handle relative paths
        if (url.startsWith("../")) {
            return `${this.baseUrl}/${url.substring(3)}`;
        }
        return `${this.baseUrl}/${url}`;
    },

    /* ========================================
       INJECT BREADCRUMB (visible)
    ======================================== */
    injectBreadcrumb(data) {
        if (!data.breadcrumb || data.breadcrumb.length === 0) return;

        // Skip if already exists
        if (document.querySelector(".breadcrumb-nav")) return;

        const isSubdir = location.pathname.split("/").length > 2 &&
                         !location.pathname.endsWith(".html") === false;

        const itemsHTML = data.breadcrumb.map((item, idx) => {
            const isLast = idx === data.breadcrumb.length - 1;
            const prefix = isSubdir && item.url && !item.url.startsWith("../") ? "../" : "";
            const url = item.url ? (item.url.startsWith("http") ? item.url : prefix + item.url) : null;

            if (isLast || !url) {
                return `<li><span>${item.name}</span></li>`;
            }
            return `<li><a href="${url}">${item.name}</a></li><li>›</li>`;
        }).join("");

        const nav = document.createElement("nav");
        nav.className = "breadcrumb-nav";
        nav.setAttribute("aria-label", "breadcrumb");
        nav.innerHTML = `<ol>${itemsHTML}</ol>`;

        // Add styles
        if (!document.getElementById("seo-breadcrumb-styles")) {
            const style = document.createElement("style");
            style.id = "seo-breadcrumb-styles";
            style.textContent = `
                .breadcrumb-nav {
                    max-width: 1240px;
                    margin: 20px auto 0;
                    padding: 0 5%;
                }
                .breadcrumb-nav ol {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-size: 13px;
                    color: var(--muted, #64748b);
                }
                .breadcrumb-nav a {
                    color: var(--cyan, #00d9ff);
                    font-weight: 700;
                    text-decoration: none;
                }
                .breadcrumb-nav a:hover {
                    text-decoration: underline;
                }
                .breadcrumb-nav span {
                    color: var(--muted, #64748b);
                    font-weight: 700;
                }
            `;
            document.head.appendChild(style);
        }

        // Insert after navbar
        const navbar = document.querySelector(".navbar");
        if (navbar && navbar.parentNode) {
            navbar.parentNode.insertBefore(nav, navbar.nextSibling);
        } else {
            // Or at start of body
            const container = document.querySelector(".container") || document.querySelector(".sg-wrap");
            if (container && container.parentNode) {
                container.parentNode.insertBefore(nav, container);
            }
        }
    },

    /* ========================================
       INJECT HREFLANG
    ======================================== */
    injectHreflang(data) {
        // Only if multi-language version exists
        // this.setLink("alternate", data.canonical, "hreflang", "ar");
        // this.setLink("alternate", data.canonicalEn, "hreflang", "en");
    },

    /* ========================================
       INIT
    ======================================== */
    init() {
        if (!window.SEO_DATA) {
            console.warn("SEO: SEO_DATA not loaded");
            return;
        }

        const page = this.getCurrentPage();
        const data = window.SEO_DATA[page];

        if (!data) {
            console.warn(`SEO: No data for page "${page}"`);
            return;
        }

        // Add data-page to body if missing
        if (document.body && !document.body.dataset.page) {
            document.body.dataset.page = page;
        }

        this.injectMeta(data);
        this.injectSchema(data, page);
        this.injectBreadcrumb(data);

        console.log(`✅ SEO loaded for: ${page}`);
    }
};

/* ========================================
   AUTO INIT
======================================== */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => SEO.init());
} else {
    SEO.init();
}

window.SEO = SEO;