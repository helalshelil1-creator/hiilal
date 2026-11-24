// hiilal — Firestore backup (export) tool. Runs LOCALLY with the project
// owner's credentials. Never run with anyone else's account.
//
// Setup (once):
//   npm init -y && npm install firebase-admin
//   Firebase console (hilal-web-1dfe4) → Project settings → Service accounts
//     → "Generate new private key" → save as serviceAccountKey.json NEXT TO
//     this script. NEVER commit that file (see .gitignore note below).
//
// Run:
//   node scripts/firestore-backup.js
// Output:
//   backup/firestore-backup-<timestamp>.json  (all collections, all docs)
//
// Restore: scripts/firestore-restore.js reads the same JSON format.

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const COLLECTIONS = [
  'content', 'codes', 'specs', 'products', 'projects',
  'youtube_videos',
  'software_electrical', 'software_mechanical',
  'software_civil', 'software_general',
];

async function main() {
  const keyPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(keyPath)) {
    console.error('Missing scripts/serviceAccountKey.json — see header comments.');
    process.exit(1);
  }
  admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) });
  const db = admin.firestore();

  const out = { project: 'hilal-web-1dfe4', exportedAt: new Date().toISOString(), collections: {} };
  for (const col of COLLECTIONS) {
    const snap = await db.collection(col).get();
    out.collections[col] = snap.docs.map(d => ({ id: d.id, data: d.data() }));
    console.log(`${col}: ${snap.size} docs`);
  }

  const dir = path.join(__dirname, '..', 'backup');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `firestore-backup-${out.exportedAt.replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log('Wrote', file);
}

main().catch(e => { console.error(e); process.exit(1); });
