/* ========================================
   ANIMATIONS - تحكم كامل في الحركات
======================================== */

const Animations = {
    /* ========================================
       SCROLL REVEAL
    ======================================== */
    initScrollReveal() {
        const elements = document.querySelectorAll(".reveal");
        if (!elements.length) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach(el => el.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -50px 0px"
        });

        elements.forEach(el => {
            // العناصر الظاهرة بالفعل في الشاشة تظهر فورًا
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add("visible");
            } else {
                observer.observe(el);
            }
        });

        // Fallback: بعد 3 ثواني أظهر كل حاجة
        setTimeout(() => {
            elements.forEach(el => el.classList.add("visible"));
        }, 3000);
    },

    /* ========================================
       RIPPLE EFFECT
    ======================================== */
    initRipple() {
        const targets = ".btn, .icon-btn, .filter-btn, .admin-btn, .bottom-nav-item, .chatbot-input-area button";

        document.addEventListener("click", (e) => {
            const target = e.target.closest(targets);
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";

            const pos = getComputedStyle(target).position;
            if (pos === "static") target.style.position = "relative";
            target.style.overflow = "hidden";

            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    },

    /* ========================================
       NUMBER COUNTER
    ======================================== */
    animateNumber(el, target, duration = 1000) {
        if (!el) return;
        if (target === 0) { el.textContent = "0"; return; }

        const startTime = performance.now();
        const startVal = 0;

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(startVal + (target - startVal) * eased);
            el.textContent = current;

            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }

        requestAnimationFrame(update);
    },

    /* ========================================
       PARALLAX HERO
    ======================================== */
    initHeroParallax() {
        const hero = document.querySelector(".welcome");
        if (!hero) return;

        // لا تفعّل على الموبايل
        if (window.matchMedia("(max-width: 700px)").matches) return;

        let ticking = false;

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        const inner = hero.querySelector(".welcome-inner");
                        if (inner) {
                            inner.style.transform = `translateY(${scrolled * 0.15}px)`;
                            inner.style.opacity = Math.max(0, 1 - scrolled / 600);
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },

    /* ========================================
       TYPING EFFECT (للعناوين)
    ======================================== */
    typeWriter(el, text, speed = 60) {
        if (!el) return;
        el.textContent = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    },

    /* ========================================
       INIT ALL
    ======================================== */
    init() {
        this.initScrollReveal();
        this.initRipple();
        this.initHeroParallax();
    }
};

/* ========================================
   AUTO INIT
======================================== */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => Animations.init());
} else {
    Animations.init();
}

window.Animations = Animations;