/* ========================================
   ANALYTICS - عرض إحصائيات الزيارات
   ميزة 16
======================================== */

const Analytics = {
    render() {
        const el = document.getElementById("analyticsPanel");
        if (!el || !window.Store) return;

        const data = Store.getAnalytics();
        const pageNames = {
            index: "🏠 الرئيسية",
            tools: "🧰 الأدوات",
            calculators: "🧮 الحاسبات",
            calculator: "🔢 حاسبة",
            encyclopedia: "📚 الموسوعة",
            topic: "📄 موضوع",
            content: "📁 المحتوى",
            codes: "📘 الأكواد",
            specs: "📋 المواصفات",
            products: "📦 المنتجات",
            projects: "🏗️ المشاريع",
            favorites: "❤️ المفضلة",
            about: "ℹ️ عن المكتب",
            admin: "🔐 لوحة التحكم"
        };

        const topPages = Object.entries(data.pageVisits || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        const lastVisit = data.lastVisit
            ? new Date(data.lastVisit).toLocaleString("ar-EG")
            : "—";
        const firstVisit = data.firstVisit
            ? new Date(data.firstVisit).toLocaleString("ar-EG")
            : "—";

        el.innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="analytics-num">${data.totalVisits || 0}</div>
                    <div class="analytics-lbl">إجمالي الزيارات</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-num">${Object.keys(data.pageVisits || {}).length}</div>
                    <div class="analytics-lbl">صفحات تمت زيارتها</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-num">${(data.history || []).length}</div>
                    <div class="analytics-lbl">آخر 30 زيارة</div>
                </div>
            </div>

            <div class="panel" style="margin-top:20px;">
                <h3>🔥 أكثر الصفحات زيارة</h3>
                ${topPages.length === 0
                    ? `<p style="color:var(--muted);text-align:center;padding:20px;">لا توجد بيانات بعد</p>`
                    : `<div class="items-list">
                        ${topPages.map(([page, count]) => `
                            <div class="item-row">
                                <div class="item-row-info">
                                    <h4>${pageNames[page] || page}</h4>
                                    <small>${count} زيارة</small>
                                </div>
                                <div style="font-family:var(--font-mono);font-weight:900;color:var(--cyan);font-size:18px;">
                                    ${count}
                                </div>
                            </div>
                        `).join("")}
                    </div>`
                }
            </div>

            <div class="panel">
                <h3>📅 معلومات إضافية</h3>
                <div style="line-height:2;font-size:14px;">
                    <div><strong>أول زيارة:</strong> ${firstVisit}</div>
                    <div><strong>آخر زيارة:</strong> ${lastVisit}</div>
                </div>
            </div>

            <div class="panel">
                <h3>📜 آخر الزيارات</h3>
                ${(data.history || []).length === 0
                    ? `<p style="color:var(--muted);text-align:center;padding:20px;">لا يوجد سجل بعد</p>`
                    : `<div class="items-list">
                        ${data.history.slice(0, 10).map(h => `
                            <div class="item-row">
                                <div class="item-row-info">
                                    <h4>${pageNames[h.page] || h.page}</h4>
                                    <small>${new Date(h.timestamp).toLocaleString("ar-EG")}</small>
                                </div>
                            </div>
                        `).join("")}
                    </div>`
                }
            </div>

            <div style="text-align:center;margin-top:20px;">
                <button onclick="Analytics.reset()" class="admin-btn admin-btn-danger" style="display:inline-flex;">
                    🗑️ مسح الإحصائيات
                </button>
            </div>
        `;
    },

    reset() {
        if (!confirm("هل تريد مسح كل الإحصائيات؟")) return;
        if (!confirm("تأكيد أخير: لا يمكن التراجع!")) return;
        if (window.Store) Store.resetAnalytics();
        this.render();
        if (typeof adminToast === "function") adminToast("🗑️ تم مسح الإحصائيات", "info");
    }
};

window.Analytics = Analytics;