/* Install banner: welcomes the visitor and offers to install the site as an app.
   - Native prompt when the browser provides one (beforeinstallprompt).
   - Manual steps on iOS Safari and other mobile browsers without the prompt.
   - Never shown when already installed; once closed it stays away for 90 days. */
(function () {
  "use strict";
  var KEY = "hiilal_install_dismissed", DAYS = 90, DELAY = 3500;
  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
             set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  function installed() {
    return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) ||
           window.navigator.standalone === true || ls.get("hiilal_installed") === "1";
  }
  function dismissed() {
    var t = parseInt(ls.get(KEY) || "0", 10);
    return t && (Date.now() - t) < DAYS * 864e5;
  }
  if (installed() || dismissed()) return;

  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isMobile = isIOS || isAndroid;
  var inApp = /FBAN|FBAV|Instagram|Line\/|MicroMessenger|Snapchat|TikTok|; wv\)|WhatsApp/i.test(ua);
  var isIOSSafari = isIOS && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) && !inApp;
  var deferred = null, shown = false, root = null;

  function lang() {
    var l = ls.get("engOffice_lang") || document.documentElement.lang || "ar";
    return l.indexOf("en") === 0 ? "en" : "ar";
  }
  var T = {
    ar: { title: "أهلاً بك في منصة هلال شليل", sub: "ثبّت التطبيق على هاتفك لتفتحه بسرعة وتستخدم الأدوات حتى لو النت ضعيف.",
          btn: "ثبّت التطبيق على هاتفك", close: "إغلاق", done: "تم", howTitle: "طريقة التثبيت",
          ios: ["اضغط زر المشاركة <b>⎙</b> أسفل Safari", "اختر <b>«إضافة إلى الشاشة الرئيسية»</b>", "اضغط <b>«إضافة»</b>"],
          android: ["افتح قائمة المتصفح <b>⋮</b>", "اختر <b>«تثبيت التطبيق»</b> أو <b>«إضافة إلى الشاشة الرئيسية»</b>", "أكّد الإضافة"],
          inapp: ["افتح الموقع في <b>Chrome</b> أو <b>Safari</b> أولاً (من قائمة ⋮ اختر «فتح في المتصفح»)", "ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية»"] },
    en: { title: "Welcome to Helal Shelil's platform", sub: "Install the app on your phone to open it fast and use the tools even on a weak connection.",
          btn: "Install the app on your phone", close: "Close", done: "Got it", howTitle: "How to install",
          ios: ["Tap the Share button <b>⎙</b> at the bottom of Safari", "Choose <b>“Add to Home Screen”</b>", "Tap <b>“Add”</b>"],
          android: ["Open the browser menu <b>⋮</b>", "Choose <b>“Install app”</b> or <b>“Add to Home screen”</b>", "Confirm"],
          inapp: ["First open this site in <b>Chrome</b> or <b>Safari</b> (menu ⋮, then “Open in browser”)", "Then choose “Install app” or “Add to Home screen”"] }
  };

  function css() {
    if (document.getElementById("hiilal-ib-css")) return;
    var s = document.createElement("style"); s.id = "hiilal-ib-css";
    s.textContent =
      "#hiilal-ib{position:fixed;left:12px;right:12px;bottom:calc(var(--bottom-nav-h,0px) + 12px + env(safe-area-inset-bottom,0px));z-index:9998;max-width:460px;margin:0 auto;" +
      "background:linear-gradient(160deg,#0b1f3a,#071326);color:#e6f1ff;border:1px solid rgba(6,182,212,.45);border-radius:20px;padding:16px 16px 14px;" +
      "box-shadow:0 18px 48px rgba(0,0,0,.45);font-family:inherit;transform:translateY(24px);opacity:0;transition:transform .35s ease,opacity .35s ease}" +
      "#hiilal-ib.in{transform:none;opacity:1}" +
      "#hiilal-ib .ib-row{display:flex;gap:12px;align-items:center}" +
      "#hiilal-ib img{width:52px;height:52px;border-radius:14px;flex:none;background:#050d1a}" +
      "#hiilal-ib h2{margin:0 0 2px;font-size:15px;line-height:1.4;font-weight:800;color:#fff}" +
      "#hiilal-ib p{margin:0;font-size:12.5px;line-height:1.6;color:#b8cbe3}" +
      "#hiilal-ib .ib-x{position:absolute;top:6px;inset-inline-end:6px;width:44px;height:44px;border:0;background:transparent;color:#9fb6d3;font-size:22px;line-height:1;cursor:pointer;border-radius:12px}" +
      "#hiilal-ib .ib-x:focus-visible,#hiilal-ib .ib-go:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}" +
      "#hiilal-ib .ib-go{margin-top:12px;width:100%;min-height:46px;border:0;border-radius:14px;background:linear-gradient(135deg,#06b6d4,#22d3ee);color:#021018;font:800 14.5px inherit;font-family:inherit;cursor:pointer}" +
      "#hiilal-ib ol{margin:10px 0 0;padding-inline-start:20px;font-size:13px;line-height:1.8;color:#d7e6f8}" +
      "#hiilal-ib .ib-t{padding-inline-end:36px}" +
      "@media (prefers-reduced-motion:reduce){#hiilal-ib{transition:none}}";
    document.head.appendChild(s);
  }

  function close(remember) {
    if (remember) ls.set(KEY, String(Date.now()));
    if (!root) return;
    root.classList.remove("in");
    var r = root; root = null;
    setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 380);
  }

  function steps() {
    var t = T[lang()];
    var list = inApp ? t.inapp : (isIOSSafari || (isIOS && !inApp) ? t.ios : t.android);
    if (isIOS && !isIOSSafari && !inApp) list = t.inapp; /* iOS needs Safari for Add to Home Screen */
    var box = root.querySelector(".ib-box");
    box.innerHTML = "<b style='font-size:13px;color:#fff'>" + t.howTitle + "</b><ol>" + list.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>" +
      "<button type='button' class='ib-go' data-ib='done'>" + t.done + "</button>";
    var d = box.querySelector("[data-ib=done]"); d.onclick = function () { close(true); }; d.focus();
  }

  function show() {
    if (shown || installed() || dismissed() || !document.body) return;
    if (!deferred && !isMobile) return;           /* desktop browsers without install support: stay quiet */
    shown = true; css();
    var t = T[lang()];
    root = document.createElement("div"); root.id = "hiilal-ib"; root.setAttribute("role", "dialog"); root.setAttribute("aria-label", t.title);
    root.dir = lang() === "en" ? "ltr" : "rtl";
    var base = (document.querySelector('script[src*="install-banner.js"]') || {}).src;
    var icon = base ? new URL("../images/icon-192.png", base).href : "images/icon-192.png";
    root.innerHTML = "<button type='button' class='ib-x' aria-label='" + t.close + "'>×</button>" +
      "<div class='ib-row'><img src='" + icon + "' alt='' width='52' height='52'><div class='ib-t'><h2>" + t.title + "</h2><p>" + t.sub + "</p></div></div>" +
      "<div class='ib-box'><button type='button' class='ib-go' data-ib='go'>" + t.btn + "</button></div>";
    document.body.appendChild(root);
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (root) root.classList.add("in"); }); });
    root.querySelector(".ib-x").onclick = function () { close(true); };
    root.querySelector("[data-ib=go]").onclick = function () {
      if (deferred) {
        var p = deferred; deferred = null;
        p.prompt();
        p.userChoice.then(function (c) { close(c && c.outcome !== "accepted"); }).catch(function () { close(true); });
      } else { steps(); }
    };
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e;
    if (shown && root) return;
    setTimeout(show, 0 + (shown ? 0 : 0)); /* fires after DELAY gate below */
  });
  window.addEventListener("appinstalled", function () { ls.set("hiilal_installed", "1"); close(false); deferred = null; });

  var armed = false;
  function arm() { if (armed) return; armed = true; setTimeout(function () { delayed = true; show(); }, DELAY); }
  var delayed = false;
  /* beforeinstallprompt may arrive before the delay: hold the banner until the delay passed */
  var origShow = show; show = function () { if (!delayed) return; origShow(); };
  if (document.readyState === "complete") arm(); else window.addEventListener("load", arm);
})();
