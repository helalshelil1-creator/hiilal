# حالة شغل الأرشيف (للاستئناف لاحقًا) — 28 نوفمبر 2026

## الفروع
- `main` = الإنتاج المباشر (hiilal.vercel.app) عند 6a08372 — الصفحة الرئيسية الكلاسيكية + صفحة العادات بتصميم Power BI. لم يُلمس أثناء شغل الأرشيف.
- `archive-work` المحلي = `archive-preview` على GitHub → Vercel preview. ممنوع الدمج إلى main بدون موافقة هلال الصريحة.

## المنجز على archive-work
- الصفحة الرئيسية الجديدة (index.html) على تيمبليت "أرشيف VHS المنحني": 22 أداة → 66 شريط، محرك القوس/الرف، timeline 01–22، صفحة تفاصيل ببوستر، RTL، موبايل أولًا. كل الروابط والأدوات القديمة شغالة (tools.html وغيرها لم تتغير).
- js/art-scenes.js: 22 مشهد SVG مرسوم يدويًا (رفضها هلال — يريد صور واقعية).
- js/art-scenes.js → window.toolPhotos: لو فيه صورة حقيقية للأداة في assets/covers/<id>.webp بتظهر على الغلاف والبوستر، غير كده يرجع لمشهد الـ SVG.
- assets/covers/: عينات واقعية من AI Horde (Juggernaut XL، مجهول، مجاني، بدون ووترمارك، 576×448):
  - mep-hub.webp (ممتازة)، control-circuit-simulator.webp (كويسة جدًا)، distribution-tools.webp (الجيل الثاني بسيد 987654).

## لاستئناف الصور (المسار المعلّق)
- برومبتات الـ 22 أداة جاهزة: /home/sandbox/work/cover-prompts.json (نمط موحّد: documentary editorial photography, muted warm tones, no text).
- AI Horde: POST https://stablehorde.net/api/v2/generate/async بمفتاح مجهول "0000000000"، موديل "Juggernaut XL"، 576×448، ~15 دقيقة انتظار للصورة، جودة متفاوتة (تقريبًا 2 من 3 مقبولة؛ أعد التوليد بسيد مختلف عند العيوب).
- مرفوض: Pollinations (ووترمارك حتى مع nologo=true)، HF FLUX space (يتطلب تسجيل)، Perchance (Cloudflare).
- بديل أعلى جودة يتطلب حساب هلال: Google (Gemini/Imagen) أو ChatGPT — عبر المتصفح السحابي بحسابه هو فقط.
- بعد النجاح: اختبار jsdom (/home/sandbox/work/test-archive.js) → commit → push لـ archive-preview فقط → سكرينشوت موبايل 390px → تقرير.

## معلّق عند هلال
- قرار نشر الصفحة الرئيسية الجديدة على main (أُرسلت له معاينة وسكرينشوتس، لم يرد قبل إيقاف الشغل).
- ملاحظة النشر: الصفحة القديمة فيها قطاعات نصية on-page تُستبدل؛ SEO meta/JSON-LD محفوظة + sr-only + noscript.

## دفعات الأدوات (batches) — موقوفة
- الدفعة الرابعة كانت مخططة (تقدير أحمال حسب نوع المبنى / كابل XLPE مدفون / معامل القدرة / فحص تحميل المحول) على main باتجاه tools/*.html الكلاسيكي. لم تبدأ.

## تحديث 28 نوفمبر 2:48 م — النشر على الإنتاج
- هلال وافق صوتيًا على نشر تيمبليت الأرشيف مباشرة على الإنتاج: "لو معجبتوش هقول وترجعها زي ما كانت".
- نقطة الرجوع (revert point): main عند 6a08372 (قبل الأرشيف). التراجع = إعادة main إلى 6a08372 وإعادة النشر.
- دُمج archive-work إلى main (fast-forward) ونُشر. شغل الصور المتبقي يكمل على main مباشرة.

## 2026-11-28 15:19 — batch 3: six new tools from user photo pack
- New pages (classic tools/*.html style, RTL, mobile): tools/fire-pump.html, fire-alarm.html, duct-sizing.html, plumbing.html, bim-lod.html, cad-symbols.html — all real calculators/guides (NFPA 13/20, NFPA 72, ASHRAE, Hunter's curve, BIMForum LOD, IEC 60617), each shows formula+steps+reference+simplified-method note.
- js/data/tools.js: 22 → 28 archive cards (ids 23-28 appended). js/data.js classic grid: 13 → 19.
- Covers: all 16 user-pack photos now used; assets/covers/<id>.webp for the 6 new ids; js/art-scenes.js toolPhotos = 19 ids (13 + 6). index.html aria-valuemax dynamic (=N).
- Smoke test: /home/sandbox/work/test-newpages.js — all 6 pages compute, no jsdom errors.
- Still pending: 9 generated covers (load-schedule + boq-template in flight on AI Horde; 7 queued in work/horde-remaining.txt).
