/* ========================================
   PDF EXPORT - تصدير النتائج إلى PDF
   ميزة 14 (بدون مكتبات خارجية — Print to PDF)
======================================== */

const PDFExport = {
    exportElement(elementId, filename = "eng-result") {
        const el = document.getElementById(elementId);
        if (!el) {
            if (typeof toast === "function") toast("❌ العنصر غير موجود", "error");
            return;
        }

        // إنشاء نافذة طباعة
        const printWindow = window.open("", "_blank", "width=900,height=700");
        if (!printWindow) {
            if (typeof toast === "function") toast("⚠️ الرجاء السماح بالنوافذ المنبثقة", "warning");
            return;
        }

        const content = el.outerHTML;
        const styles = Array.from(document.styleSheets)
            .map(sheet => {
                try {
                    return Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
                } catch (e) {
                    return "";
                }
            })
            .join("\n");

        printWindow.document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${filename}</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
        ${styles}
        body {
            background: white !important;
            color: black !important;
            padding: 30px !important;
            max-width: 800px;
            margin: 0 auto;
        }
        .pdf-header {
            text-align: center;
            padding-bottom: 20px;
            margin-bottom: 30px;
            border-bottom: 3px solid #00d9ff;
        }
        .pdf-header h1 {
            color: #0a1628 !important;
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 6px;
        }
        .pdf-header p {
            color: #64748b;
            font-size: 14px;
        }
        .pdf-header .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            border-radius: 20px;
        }
        .pdf-footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #64748b;
        }
        .pdf-footer strong { color: #00d9ff; }
        @media print {
            body { padding: 15px !important; }
        }
    </style>
</head>
<body>
    <div class="pdf-header">
        <img src="${window.location.origin}${window.location.pathname.replace(/\/[^\/]*$/, '/')}images/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'">
        <h1>مكتب المهندس هلال شليل</h1>
        <p>Eng. Helal Shalil — Electrical & MEP Engineering</p>
    </div>
    ${content}
    <div class="pdf-footer">
        <p>© ${new Date().getFullYear()} <strong>مكتب المهندس هلال شليل</strong> — جميع الحقوق محفوظة</p>
        <p>📞 01124169656 | ✉️ helalshelil1@gmail.com</p>
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    <\/script>
</body>
</html>
        `);

        printWindow.document.close();

        if (typeof toast === "function") toast("📄 جاهز للطباعة/الحفظ PDF", "success");
    },

    /* تصدير نتيجة حاسبة */
    exportCalcResult(calcName) {
        const resultEl = document.getElementById("calcResult");
        if (!resultEl || !resultEl.innerHTML.trim()) {
            if (typeof toast === "function") toast("⚠️ لا توجد نتيجة للتصدير", "warning");
            return;
        }
        this.exportElement("calcResult", `calc-${Date.now()}`);
    },

    /* تصدير نتيجة جدول */
    exportTable(tableId, title = "Schedule") {
        const table = document.getElementById(tableId);
        if (!table) {
            if (typeof toast === "function") toast("❌ الجدول غير موجود", "error");
            return;
        }
        const wrapper = table.closest(".sch-wrap") || table.parentElement;
        this.exportElement(wrapper.id || tableId, title);
    },

    /* تصدير عنصر عن طريق ID */
    exportById(id, filename) {
        this.exportElement(id, filename);
    }
};

window.PDFExport = PDFExport;