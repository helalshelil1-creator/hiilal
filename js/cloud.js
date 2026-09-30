/* ========================================
   CLOUD — Firebase Sync
   يجعل كل الإضافات تظهر على كل الأجهزة
======================================== */

const Cloud = {
    db: null,
    ready: false,
    cache: {},

    /* ========================================
       INIT
    ======================================== */
    async init() {
        if (this.ready) return true;

        if (!window.firebase) {
            console.warn("⚠️ Firebase SDK مش محمّل");
            return false;
        }
        if (!window.FIREBASE_CONFIG?.apiKey || window.FIREBASE_CONFIG.apiKey.includes("ضع-قيمة")) {
            console.warn("⚠️ Firebase Config مش متظبط");
            return false;
        }

        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(window.FIREBASE_CONFIG);
            }
            this.db = firebase.firestore();

            try {
                await this.db.enablePersistence({ synchronizeTabs: true });
            } catch (e) {
                // بعض المتصفحات مش بتدعم persistence
            }

            this.ready = true;
            console.log("✅ Cloud: Firebase جاهز");
            return true;
        } catch (err) {
            console.error("❌ Cloud init:", err);
            return false;
        }
    },

    /* ========================================
       GET ALL
    ======================================== */
    async getAll(name) {
        if (!this.ready) await this.init();
        if (!this.ready) return [];

        try {
            const snap = await this.db.collection(name).get();
            const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // ترتيب: الأحدث أولاً
            items.sort((a, b) => {
                const ta = a.addedAt?.seconds || 0;
                const tb = b.addedAt?.seconds || 0;
                return tb - ta;
            });
            this.cache[name] = items;
            return items;
        } catch (err) {
            console.error(`❌ getAll(${name}):`, err);
            return this.cache[name] || [];
        }
    },

    /* ========================================
       ADD
    ======================================== */
    async add(name, item) {
        if (!this.ready) await this.init();
        if (!this.ready) throw new Error("Cloud غير جاهز");

        const doc = {
            ...item,
            addedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        const ref = await this.db.collection(name).add(doc);
        console.log(`✅ Added to ${name}:`, ref.id);
        return { id: ref.id, ...item };
    },

    /* ========================================
       REMOVE
    ======================================== */
    async remove(name, id) {
        if (!this.ready) await this.init();
        if (!this.ready) throw new Error("Cloud غير جاهز");
        await this.db.collection(name).doc(id).delete();
        console.log(`🗑️ Removed from ${name}:`, id);
    },

    /* ========================================
       UPDATE
    ======================================== */
    async update(name, id, updates) {
        if (!this.ready) await this.init();
        if (!this.ready) throw new Error("Cloud غير جاهز");
        await this.db.collection(name).doc(id).update(updates);
    },

    /* ========================================
       LISTEN — تحديث لحظي
    ======================================== */
    listen(name, callback) {
        if (!this.ready) return null;
        return this.db.collection(name).onSnapshot(snap => {
            const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            items.sort((a, b) => {
                const ta = a.addedAt?.seconds || 0;
                const tb = b.addedAt?.seconds || 0;
                return tb - ta;
            });
            this.cache[name] = items;
            callback(items);
        }, err => console.warn(`listen(${name}):`, err));
    },

    /* ========================================
       MIGRATION — نقل البيانات القديمة من localStorage
    ======================================== */
    async migrateLocalToCloud() {
        if (!this.ready) await this.init();
        if (!this.ready) return;

        const collections = [
            "content", "codes", "specs", "products", "projects",
            "software_autocad", "software_revit", "software_hotkeys",
            "youtube_videos", "software_guide_links"
        ];

        for (const col of collections) {
            const localKey = "engOffice_custom_" + col;
            const localData = localStorage.getItem(localKey);
            if (!localData) continue;

            try {
                const items = JSON.parse(localData);
                if (!Array.isArray(items) || items.length === 0) continue;

                console.log(`🔄 Migrating ${items.length} items → ${col}`);
                for (const item of items) {
                    const { id, ...rest } = item;
                    await this.add(col, rest);
                }
                localStorage.removeItem(localKey);
            } catch (e) {
                console.warn(`Migration failed for ${col}:`, e);
            }
        }
        console.log("✅ Migration complete");
    }
};

window.Cloud = Cloud;