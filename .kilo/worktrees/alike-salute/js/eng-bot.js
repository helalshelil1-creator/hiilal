/* ========================================
   ENG-BOT - المساعد الهندسي الذكي
   الإصدار: 3.0 — متوافق مع chatbotWindow
======================================== */

const EngBot = {
    isProcessing: false,
    hasWelcomed: false,

    knowledge: {
        "قانون أوم": "⚡ **قانون أوم**\n\nV = I × R\n\n• V = الجهد (Volt)\n• I = التيار (Ampere)\n• R = المقاومة (Ohm)\n\nP = V×I = I²R = V²/R",
        "القدرة": "⚡ **القدرة الكهربائية**\n\nP = V × I × cos φ\n\n• 1 فاز: P = V × I × PF\n• 3 فاز: P = √3 × V × I × PF\n\nS² = P² + Q²",
        "معامل القدرة": "🔋 **معامل القدرة**\n\nPF = cos φ = P / S\n\nالقيمة بين 0 و 1، والأفضل قريب من 1.",
        "هبوط الجهد": "📉 **هبوط الجهد**\n\n3 فاز: ΔV = (√3 × mV/A/m × I × L) / 1000\n1 فاز: ΔV = (2 × mV/A/m × I × L) / 1000\n\n% = ΔV / V × 100\n\nالحد الأقصى 3-5%.",
        "كابل": "🔌 **اختيار الكابل**\n\nالشروط الأربعة:\n1. Ib ≤ In ≤ Iz\n2. هبوط الجهد ≤ 5%\n3. تيار القصر\n4. شروط التركيب\n\nIz = Iz_table × Ca × Cg × Ci",
        "تأريض": "⚓ **التأريض**\n\nR = (ρ / 2πL) × [ln(8L/d) − 1]\n\nالقيم المقبولة:\n• منازل: ≤ 5 Ω\n• مصانع: ≤ 1 Ω\n• محطات: ≤ 0.5 Ω"
    },

    /* ========================================
       GREET — فتح البوت مع رسالة ترحيب
    ======================================== */
    greet() {
        const win = document.getElementById("chatbotWindow");
        if (!win) {
            console.warn("chatbotWindow غير موجود");
            return;
        }

        win.classList.add("show");

        const container = document.getElementById("chatbotMessages");
        if (container) {
            setTimeout(() => {
                container.insertAdjacentHTML("beforeend", `
                    <div class="chat-message bot">
                        <div class="chat-bubble">
                            <strong>أهلاً بك يا هندسة 👷‍♂️⚡</strong><br>
                            معك <strong>المهندس هلال شليل</strong> — مساعدك الهندسي الذكي.<br><br>
                            اسألني عن أي حاجة في:
                            <br>• التصميم الكهربائي
                            <br>• الحصر والكميات
                            <br>• الأكواد والمعايير
                            <br>• MEP والأنظمة المتخصصة
                            <br><br>
                            <em>اكتب سؤالك بالأسفل 👇</em>
                        </div>
                    </div>
                `);
                container.scrollTop = container.scrollHeight;
                document.getElementById("chatbotInput")?.focus();
            }, 300);
        }

        this.hasWelcomed = true;
    },

    /* ========================================
       TOGGLE
    ======================================== */
    toggle() {
        const win = document.getElementById("chatbotWindow");
        if (!win) return;

        win.classList.toggle("show");

        if (win.classList.contains("show")) {
            setTimeout(() => document.getElementById("chatbotInput")?.focus(), 300);

            if (!this.hasWelcomed) {
                const c = document.getElementById("chatbotMessages");
                if (c) {
                    c.insertAdjacentHTML("beforeend", `
                        <div class="chat-message bot">
                            <div class="chat-bubble">معك المهندس هلال شليل جاهز لأي استفسار هندسي يا هندسة ❤️</div>
                        </div>
                    `);
                    c.scrollTop = c.scrollHeight;
                }
                this.hasWelcomed = true;
            }
        }
    },

    /* ========================================
       SEND
    ======================================== */
    async send() {
        const input = document.getElementById("chatbotInput");
        const container = document.getElementById("chatbotMessages");
        if (!input || !container) return;

        const text = input.value.trim();
        if (!text || this.isProcessing) return;
        this.isProcessing = true;

        container.insertAdjacentHTML("beforeend", `
            <div class="chat-message user"><div class="chat-bubble">${this.escape(text)}</div></div>
        `);
        input.value = "";
        container.scrollTop = container.scrollHeight;

        const typingId = "typing-" + Date.now();
        container.insertAdjacentHTML("beforeend", `
            <div class="chat-message bot" id="${typingId}">
                <div class="chat-bubble typing"><span></span><span></span><span></span></div>
            </div>
        `);
        container.scrollTop = container.scrollHeight;

        try {
            const reply = await this.getAnswer(text);
            document.getElementById(typingId)?.remove();
            container.insertAdjacentHTML("beforeend", `
                <div class="chat-message bot"><div class="chat-bubble">${this.format(reply)}</div></div>
            `);
            container.scrollTop = container.scrollHeight;
        } catch (err) {
            document.getElementById(typingId)?.remove();
            container.insertAdjacentHTML("beforeend", `
                <div class="chat-message bot"><div class="chat-bubble">⚠️ عذرًا، حدث خطأ. تواصل مباشرة: <a href="tel:01124169656">01124169656</a></div></div>
            `);
        }
        this.isProcessing = false;
    },

    /* ========================================
       GET ANSWER
    ======================================== */
    async getAnswer(query) {
        const lower = query.toLowerCase().trim();
        for (const [key, value] of Object.entries(this.knowledge)) {
            if (lower.includes(key.toLowerCase())) return value;
        }

        try {
            const res = await fetch("https://text.pollinations.ai/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "openai",
                    messages: [
                        { role: "system", content: "أنت مساعد هندسي ذكي لمهندس الكهرباء والـ MEP. أجب بالعربية بوضوح وإيجاز، مع ذكر القوانين والمراجع إن أمكن." },
                        { role: "user", content: query }
                    ]
                })
            });
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            return data.choices?.[0]?.message?.content || "لم أتمكن من الحصول على رد.";
        } catch (err) {
            return `⚠️ عذرًا يا هندسة، حدث خطأ في الاتصال.<br>تواصل مباشرة: 📞 <a href="tel:01124169656">01124169656</a>`;
        }
    },

    /* ========================================
       FORMAT
    ======================================== */
    format(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>")
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
    },

    escape(text) {
        const d = document.createElement("div");
        d.textContent = text;
        return d.innerHTML;
    }
};

window.EngBot = EngBot;