// hiilal — Firestore restore tool. Reads a file produced by
// scripts/firestore-backup.js and writes the documents back.
// Runs LOCALLY with the project owner's credentials (same
// serviceAccountKey.json setup as firestore-backup.js).
//
// Run:
//   node scripts/firestore-restore.js backup/firestore-backup-<timestamp>.json
//
// This OVERWRITES documents with the same IDs in the target collections.
// It does not delete documents that are absent from the backup.

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

async function main() {
  const backupFile = process.argv[2];
  if (!backupFile || !fs.existsSync(backupFile)) {
    console.error('Usage: node scripts/firestore-restore.js <backup-file.json>');
    process.exit(1);
  }
  const keyPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(keyPath)) {
    console.error('Missing scripts/serviceAccountKey.json — see firestore-backup.js header.');
    process.exit(1);
  }
  admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) });
  const db = admin.firestore();

  const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
  for (const [col, docs] of Object.entries(backup.collections || {})) {
    let batch = db.batch();
    let n = 0, total = 0;
    for (const d of docs) {
      batch.set(db.collection(col).doc(d.id), d.data);
      if (++n === 400) { await batch.commit(); total += n; batch = db.batch(); n = 0; }
    }
    if (n > 0) { await batch.commit(); total += n; }
    console.log(`${col}: restored ${total} docs`);
  }
  console.log('Restore complete.');
}

main().catch(e => { console.error(e); process.exit(1); });
