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
