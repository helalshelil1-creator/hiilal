// calc-v2 fixture tests — repeatable, with independently computed expectations.
// Run from repo root:  node tests/calc-v2.test.js
// Requires: puppeteer-core (dev only) and a Chrome/Chromium binary.
//   CHROME env var overrides the binary path (default /usr/bin/google-chrome).
//
// Scenario math (independent of the page code):
//   static load, V=380, pf=0.85, L=30m, SF=1.25, cg=1, amb=40C, parMode=1.
//   17 kW 3ph: FLC=17000/(sqrt3*380*0.85)=30.39  Ib=37.98  In=40 (MCB)
//   17 kW 1ph: FLC=17000/(380*0.85)=52.63       Ib=65.79  In=80 (MCB)
//   Selection: smallest IEC size with izBase*kTemp >= In and I2 check and VD<=2.5%.
//   kTemp at 40C: air/wall pvc 0.87, xlpe 0.91 (B.52.14);
//                 ground/duct pvc 0.77, xlpe 0.85 (B.52.15).

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHROME = process.env.CHROME || '/usr/bin/google-chrome';

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
      fs.readFile(f, (e, d) => {
        if (e) { res.writeHead(404); res.end('nf'); return; }
        res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
        res.end(d);
      });
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

// [insul, phases, method, expected mm2]
const CONFIG_FIXTURES = [
  ['xlpe', 3, 'ground', 6],  ['xlpe', 3, 'duct', 10], ['xlpe', 3, 'wall', 6], ['xlpe', 3, 'air', 6],
  ['pvc',  3, 'ground', 10], ['pvc',  3, 'duct', 16], ['pvc',  3, 'wall', 10], ['pvc',  3, 'air', 10],
  ['xlpe', 1, 'ground', 16], ['xlpe', 1, 'duct', 25], ['xlpe', 1, 'wall', 16], ['xlpe', 1, 'air', 16],
  ['pvc',  1, 'ground', 25], ['pvc',  1, 'duct', 35], ['pvc',  1, 'wall', 35], ['pvc',  1, 'air', 16],
];

(async () => {
  const puppeteer = require('puppeteer-core');
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await puppeteer.launch({ headless: 'new', executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(String(e)));

  let pass = 0, fail = 0;
  const check = (name, ok, detail) => {
    if (ok) { pass++; console.log('PASS', name); }
    else { fail++; console.log('FAIL', name, '::', detail); }
  };

  async function setAndCalc(inputs) {
    await page.evaluate(inp => {
      const set = (id, v) => { const el = document.getElementById(id); el.value = String(v); };
      set('ph', inp.phases); set('insul', inp.insul); set('installMethod', inp.method);
      set('amb', inp.amb); set('kw', inp.kw); set('len', inp.len);
      if (inp.parMode) set('parMode', inp.parMode);
      if (inp.neutralMode) set('neutralMode', inp.neutralMode);
      calc();
    }, inputs);
    await new Promise(r => setTimeout(r, 250));
  }
  const read = () => page.evaluate(() => ({
    rcab: document.getElementById('rcab').textContent,
    rbr: document.getElementById('rbr').textContent,
    rvd: document.getElementById('rvd').textContent,
    spec: document.getElementById('spec').textContent,
    rcabSub: document.getElementById('rcabSub').textContent,
    msg: document.getElementById('msg').textContent,
    cc: document.getElementById('costCompare').children.length,
    sug: document.getElementById('sug').children.length,
    unsupported: window.__calcUnsupported,
  }));

  await page.goto(`${base}/calc-v2/index.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  // parMode default must be single cable, and no automatic-parallel option may exist
  const defPar = await page.evaluate(() => document.getElementById('parMode').value);
  check('parMode defaults to 1 cable', defPar === '1', `got ${defPar}`);
  const parOpts = await page.evaluate(() => [...document.getElementById('parMode').options].map(o => o.value));
  check('parMode has no automatic parallel option', !parOpts.includes('auto'), parOpts.join(','));
  const defNeu = await page.evaluate(() => document.getElementById('neutralMode').value);
  check('neutralMode defaults to full (safe)', defNeu === 'full', `got ${defNeu}`);

  // 16 supported-config fixtures
  for (const [insul, phases, method, want] of CONFIG_FIXTURES) {
    await setAndCalc({ insul, phases, method, amb: 40, kw: 17, len: 30, parMode: 1 });
    const r = await read();
    check(`pick ${insul}/${phases}ph/${method} = ${want}mm2`, r.rcab === String(want) && r.unsupported === null,
      `got rcab=${r.rcab} unsupported=${r.unsupported}`);
  }

  const compareTitles = () => page.evaluate(() =>
    [...document.querySelectorAll('#costCompare .ci-head .ttl')].map(el => el.textContent.trim()));
  // after the 16 fixtures (parMode=1), compare must offer single-cable options only
  let titles = await compareTitles();
  check('compare offers no parallel alternatives by default',
    titles.length > 0 && titles.every(t => t.startsWith('1 ×')), JSON.stringify(titles));

  // Neutral/earth fixture: 40kW 3ph xlpe ground -> 35mm2.
  // Safe default (full): N=35, E=35. Conditional opt-in: N=25 (cl.524.2), E=16 (Table 54.2).
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 40, kw: 40, len: 30, parMode: 1, neutralMode: 'full' });
  let r = await read();
  check('neutral/earth default full 35 -> 3x35+35+35', r.rcab === '35' && r.rcabSub.includes('3×35+35+35'),
    `got ${r.rcab} :: ${r.rcabSub}`);
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 40, kw: 40, len: 30, parMode: 1, neutralMode: 'auto' });
  r = await read();
  check('neutral/earth conditional opt-in 35 -> 3x35+25+16', r.rcab === '35' && r.rcabSub.includes('3×35+25+16'),
    `got ${r.rcab} :: ${r.rcabSub}`);
  check('reduction note is conditional with exact citations',
    /مشروط/.test(r.spec) && /524\.2/.test(r.spec) && /54\.2/.test(r.spec) && /60364-5-52/.test(r.spec) && /60364-5-54/.test(r.spec),
    r.spec.slice(0, 200));

  // Boundary: pvc air 60C supported, 61C blocked
  await setAndCalc({ insul: 'pvc', phases: 3, method: 'air', amb: 60, kw: 17, len: 30, parMode: 1 });
  r = await read();
  check('pvc air 60C supported', r.unsupported === null && r.rcab !== '—', JSON.stringify(r));
  await setAndCalc({ insul: 'pvc', phases: 3, method: 'air', amb: 61, kw: 17, len: 30, parMode: 1 });
  r = await read();
  check('pvc air 61C blocked, ALL execution outputs gated',
    r.unsupported !== null && r.rcab === '—' && r.rbr === '—' && r.rvd === '—' && r.spec === '—'
    && r.cc === 0 && r.sug === 0 && r.msg.includes('⛔'),
    JSON.stringify(r));

  // stale export: blocked state must refuse download
  const toast = await page.evaluate(() => { downloadSelf(); return document.getElementById('toast').textContent; });
  check('export refused while unsupported', toast.includes('غير مدعوم'), toast);

  // Boundary: xlpe ground 80C supported, 81C blocked
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 80, kw: 17, len: 30, parMode: 1 });
  r = await read();
  check('xlpe ground 80C supported', r.unsupported === null && r.rcab !== '—', JSON.stringify(r));
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 81, kw: 17, len: 30, parMode: 1 });
  r = await read();
  check('xlpe ground 81C blocked', r.unsupported !== null && r.rcab === '—' && r.rbr === '—', JSON.stringify(r));

  // Parallel path: 200kW with default single cable -> no solution + hint; explicit 3 -> 3x150
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 40, kw: 200, len: 30, parMode: 1 });
  r = await read();
  check('200kW single cable: breaker gated with cable (no In without Iz)', r.rbr === '\u2014', `got rbr=${r.rbr}`);
  check('200kW single cable: no automatic parallel recommendation',
    r.rcab === '—' && r.msg.includes('متوازية'), `rcab=${r.rcab} msg=${r.msg.slice(0, 80)}`);
  await setAndCalc({ insul: 'xlpe', phases: 3, method: 'ground', amb: 40, kw: 200, len: 30, parMode: 3 });
  r = await read();
  check('200kW explicit parallel: 3x150 user-selected', r.rcab === '150' && r.rcabSub.startsWith('3 ×'),
    `rcab=${r.rcab} sub=${r.rcabSub}`);
  titles = await compareTitles();
  check('compare under explicit par=3 shows only 3-cable options',
    titles.length > 0 && titles.every(t => t.startsWith('3 ×')), JSON.stringify(titles));

  check('zero page errors across all fixtures', pageErrors.length === 0, pageErrors.join(' | ').slice(0, 300));

  await browser.close();
  srv.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
