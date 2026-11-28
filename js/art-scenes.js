/* ========================================
   ART SCENES - رسم توضيحي لكل أداة (صناعة ذاتية)
   Duotone screen-print scenes for the archive covers.
   Coordinate space: x -195..195, y -150..150 (390x300)
======================================== */
(function () {
"use strict";

function R(x, y, w, h, fill, o) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' +
    (o && o.rx ? ' rx="' + o.rx + '"' : '') +
    (o && o.stroke ? ' fill="none" stroke="' + o.stroke + '" stroke-width="' + (o.sw || 5) + '"' : ' fill="' + fill + '"') +
    (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
}
function C(cx, cy, r, fill, o) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"' +
    (o && o.stroke ? ' fill="none" stroke="' + o.stroke + '" stroke-width="' + (o.sw || 5) + '"' : ' fill="' + fill + '"') +
    (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
}
function L(x1, y1, x2, y2, stroke, w, o) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (w || 5) + '"' +
    (o && o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + (o && o.cap ? ' stroke-linecap="' + o.cap + '"' : '') + '/>';
}
function P(d, fill, o) {
  return '<path d="' + d + '"' +
    (o && o.stroke ? ' fill="none" stroke="' + o.stroke + '" stroke-width="' + (o.sw || 5) + '"' + (o.cap ? ' stroke-linecap="' + o.cap + '"' : '') + (o.join ? ' stroke-linejoin="' + o.join + '"' : '') : ' fill="' + fill + '"') +
    (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
}
function T(x, y, str, size, fill, o) {
  return '<text x="' + x + '" y="' + y + '" font-family="' + ((o && o.fam) || 'Inter Tight,sans-serif') + '" font-weight="' + ((o && o.w) || 700) + '" font-size="' + size + '" fill="' + fill + '"' +
    ' text-anchor="' + ((o && o.a) || 'middle') + '"' + (o && o.ls ? ' letter-spacing="' + o.ls + '"' : '') + '>' + str + '</text>';
}
/* halftone dot field behind a scene */
function dots(cx, cy, cols, rows, step, color, op) {
  var s = '';
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var fade = 1 - (Math.abs(c - (cols - 1) / 2) + Math.abs(r - (rows - 1) / 2)) / (cols + rows - 2) * 2;
    if (fade <= .15) continue;
    s += '<circle cx="' + (cx + (c - (cols - 1) / 2) * step) + '" cy="' + (cy + (r - (rows - 1) / 2) * step) + '" r="' + (step * .22 * fade).toFixed(1) + '" fill="' + color + '" opacity="' + (op * fade).toFixed(2) + '"/>';
  }
  return s;
}

var INK = "#141414", CREAM = "#F3F0EA";

function scenes(id, m, s) {
  switch (id) {

/* 1 MEP HUB: مبنى بأنظمة كهرباء وميكانيكا وسباكة */
case "mep-hub": return dots(0, 10, 11, 7, 34, m, .18) +
  R(-120, -70, 240, 190, null, {stroke: INK, sw: 6}) +
  L(-120, -8, 120, -8, INK, 5) + L(-120, 56, 120, 56, INK, 5) +
  P("M-60-38l16-26h-12l14-22 24 30h-13l12 18z", m) +
  C(0, -38, 17, null, {stroke: s, sw: 6}) + P("M0-51v26M-13-25l26-26M-15-38h30", s, {sw: 5, cap: "round"}) +
  P("M52-52c14 0 22 10 22 22h-44c0-12 8-22 22-22z", null, {stroke: m, sw: 5}) + L(52, -52, 52, -30, m, 5) +
  R(-92, 6, 60, 34, m) + T(-62, 30, "AC", 17, CREAM) +
  P("M8 8h70M8 24h70M8 40h70", INK, {sw: 6, cap: "round"}) +
  P("M78 8v-16h14", s, {sw: 5}) + P("M8 8v-16", s, {sw: 5}) +
  P("M-80 70h50v34h-50z", null, {stroke: INK, sw: 5}) + C(-55, 87, 9, s) +
  P("M-8 74c14 0 24 10 24 24h-48c0-14 10-24 24-24z", m) +
  P("M40 70h60M40 86h60M40 102h40", INK, {sw: 6, cap: "round"}) +
  T(0, 143, "M · E · P", 20, m, {ls: ".2em"});

/* 2 BOQ حريق: خط رشاشات + إيصال تسعير */
case "boq-fire": return dots(0, -10, 11, 7, 34, m, .18) +
  P("M-170-60H110", INK, {sw: 10, cap: "round"}) +
  P("M-120-60v24M-40-60v24M40-60v24", INK, {sw: 7}) +
  P("M-132-36h24l-6 10h-12zM-52-36h24l-6 10h-12zM28-36h24l-6 10h-12z", s) +
  P("M-120-26c-4 10-8 16-14 22M-120-26v24M-120-26c4 10 8 16 14 22", m, {sw: 4, cap: "round"}) +
  P("M-40-26c-4 10-8 16-14 22M-40-26v24M-40-26c4 10 8 16 14 22", m, {sw: 4, cap: "round"}) +
  P("M40-26c-4 10-8 16-14 22M40-26v24M40-26c4 10 8 16 14 22", m, {sw: 4, cap: "round"}) +
  C(140, -60, 30, null, {stroke: INK, sw: 6}) + P("M140-60l10-10M140-60v-18", s, {sw: 5, cap: "round"}) + C(140, -60, 4, INK) +
  P("M-60 20h160v96l-14 12h-146z", null, {stroke: INK, sw: 6, join: "round"}) +
  P("M-40 42h120M-40 64h120M-40 86h84", INK, {sw: 6, cap: "round"}) +
  P("M-40 42h120", m, {sw: 0}) + R(-40, 96, 54, 0, null, {}) +
  T(60, 118, "BOQ", 22, m, {ls: ".1em"});

/* 3 حاسبة كابل وقاطع V2: مقطع كابل + قاطع */
case "calc-v2": return dots(-10, 5, 11, 7, 34, m, .18) +
  C(-70, 0, 66, null, {stroke: INK, sw: 7}) + C(-70, 0, 50, m) + C(-70, 0, 30, CREAM, {op: .9}) + C(-70, 0, 15, s) +
  P("M-70-66v-26M-70 66v26", INK, {sw: 7}) +
  R(30, -70, 76, 140, null, {stroke: INK, sw: 7, rx: 8}) +
  R(48, -46, 40, 56, null, {stroke: m, sw: 6, rx: 5}) +
  P("M68-18v22", m, {sw: 9, cap: "round"}) +
  P("M46 30h44M46 48h44", INK, {sw: 5, cap: "round"}) +
  T(-70, 110, "mm²", 20, s) + T(68, 96, "MCB", 18, m, {ls: ".08em"});

/* 4 محاكي الكنترول: لوحة كنترول بكونتاكتورات */
case "control-simulator": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-150, -90, 300, 190, null, {stroke: INK, sw: 7, rx: 6}) +
  L(-135, -62, 135, -62, INK, 5) +
  R(-120, -48, 62, 74, null, {stroke: m, sw: 6, rx: 4}) + L(-120, -26, -58, -26, m, 4) + L(-120, -6, -58, -6, m, 4) +
  R(-40, -48, 62, 74, null, {stroke: m, sw: 6, rx: 4}) + L(-40, -26, 22, -26, m, 4) + L(-40, -6, 22, -6, m, 4) +
  C(78, -30, 15, s) + C(78, -30, 6, CREAM) +
  C(122, -30, 15, m) + C(122, -30, 6, CREAM) +
  P("M-120 26v30M-58 26v30M-40 26v30M22 26v30", INK, {sw: 4, dash: "5 5"}) +
  L(-135, 62, 135, 62, INK, 5) +
  T(-89, 86, "K1", 16, INK) + T(-9, 86, "K2", 16, INK) + T(78, 86, "T", 16, s) + T(122, 86, "R", 16, m);

/* 5 أدوات التوزيع: محول توزيع على عمود */
case "distribution-tools": return dots(0, -15, 11, 7, 34, m, .18) +
  L(-10, -120, -10, 140, INK, 10) +
  L(-70, -96, 50, -96, INK, 7) +
  P("M-52-96v14M-10-96v14M32-96v14", s, {sw: 6, cap: "round"}) +
  P("M-52-82c0 8-4 12-4 12M-10-82c0 8-4 12-4 12M32-82c0 8-4 12-4 12", s, {sw: 4}) +
  P("M-160-110C-90-92 40-92 160-108", INK, {sw: 4}) +
  P("M-160-86C-90-70 40-70 160-84", INK, {sw: 4}) +
  R(10, -66, 96, 108, m, {rx: 6}) +
  L(24, -52, 92, -52, CREAM, 4) + L(24, -40, 92, -40, CREAM, 4) + L(24, -28, 92, -28, CREAM, 4) +
  R(34, 4, 48, 24, CREAM, {rx: 3}) + T(58, 21, "kVA", 15, m) +
  P("M10-66L-10-78M106-66l16-14", INK, {sw: 5}) +
  P("M-90 40h60M-90 60h44M-90 80h52", INK, {sw: 6, cap: "round"}) +
  P("M-150 100l24-24M-138 100l24-24", s, {sw: 4, cap: "round"});

/* 6 محاكي الكنترول المجاني: مخطط سلم ladder */
case "control-circuit-simulator": return dots(0, 0, 11, 7, 34, m, .18) +
  L(-150, -100, -150, 110, INK, 8) + L(150, -100, 150, 110, INK, 8) +
  L(-150, -60, 150, -60, INK, 4) + L(-150, 10, 150, 10, INK, 4) + L(-150, 80, 150, 80, INK, 4) +
  P("M-96-74l14 28M-110-46l14-28", s, {sw: 6, cap: "round"}) +
  P("M-20-74l14 28M-34-46l14-28", m, {sw: 6, cap: "round"}) +
  P("M30-60h56", INK, {sw: 5}) + P("M86-74l14 28", INK, {sw: 6, cap: "round"}) +
  C(120, -60, 18, null, {stroke: s, sw: 6}) + T(120, -52, "S", 15, s) +
  P("M-96-4l14 28M-110 24l14-28", s, {sw: 6, cap: "round"}) +
  C(110, 10, 20, null, {stroke: m, sw: 6}) + T(110, 18, "K1", 15, m) +
  P("M-60 66h120", INK, {sw: 5}) +
  C(96, 80, 20, null, {stroke: INK, sw: 6}) + T(96, 88, "M", 18, INK) +
  T(-170, -60, "L", 18, s) + T(172, -60, "N", 18, m);

/* 7 جدول العادات: تقويم بعلامات صح + حلقة تقدم */
case "habit-tracker": return dots(0, -20, 11, 6, 32, m, .18) +
  R(-150, -95, 220, 190, null, {stroke: INK, sw: 7, rx: 8}) +
  R(-150, -95, 220, 34, m, {rx: 8}) +
  (function(){ var o = ""; for (var r = 0; r < 3; r++) for (var c = 0; c < 6; c++) {
    var x = -128 + c * 36, y = -38 + r * 42;
    o += R(x, y, 26, 30, null, {stroke: INK, sw: 4, rx: 4});
    if ((r * 6 + c) % 3 !== 1) o += P("M" + (x + 6) + " " + (y + 15) + "l5 6 9-12", s, {sw: 5, cap: "round", join: "round"});
  } return o; })() +
  C(118, 60, 44, null, {stroke: INK, sw: 7}) +
  P("M118 16a44 44 0 0 1 38 66", m, {sw: 9, cap: "round"}) +
  T(118, 70, "68%", 20, m);

/* 8 دليل AutoCAD و Revit: شاشة برسم هندسي */
case "software-guide": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-150, -100, 300, 180, null, {stroke: INK, sw: 7, rx: 8}) +
  R(-136, -86, 272, 148, null, {stroke: m, sw: 3}) +
  P("M-110-60h90v60h-60v40h-30z", null, {stroke: s, sw: 5, join: "round"}) +
  P("M-110-30h30M-50-60v30", s, {sw: 4}) +
  P("M30-60h70v50H30z", null, {stroke: INK, sw: 4}) +
  P("M30-35h70M65-60v50", INK, {sw: 3}) +
  P("M-110 52h210", m, {sw: 4, dash: "10 6"}) +
  P("M-110 46v12M100 46v12", m, {sw: 4}) +
  T(-5, 62, "3400", 13, m) +
  P("M-30 88h60M0 88v22", INK, {sw: 7, cap: "round"}) + L(-45, 112, 45, 112, INK, 7) +
  P("M108 52l14-14M108 38l14 14", INK, {sw: 4, cap: "round"});

/* 9 حاسبة الكابل والقاطع: بكرة كابل + قاطع */
case "cable-breaker": return dots(0, 0, 11, 7, 34, m, .18) +
  C(-70, 0, 62, null, {stroke: INK, sw: 7}) + C(-70, 0, 44, null, {stroke: m, sw: 6}) + C(-70, 0, 26, null, {stroke: s, sw: 6}) + C(-70, 0, 9, INK) +
  P("M-8 0h46", m, {sw: 9, cap: "round"}) +
  P("M38-12c30 0 30 24 60 24s30-24 60-24", s, {sw: 8, cap: "round"}) +
  R(88, -70, 62, 110, null, {stroke: INK, sw: 6, rx: 6}) +
  P("M119-52v30", m, {sw: 10, cap: "round"}) +
  P("M98 8h42M98 24h42", INK, {sw: 5, cap: "round"}) +
  T(-70, 100, "CABLE", 15, INK, {ls: ".12em"});

/* 10 محول الوحدات: عدادان وسهم تبادل */
case "unit-converter": return dots(0, 0, 11, 7, 34, m, .18) +
  C(-80, -6, 58, null, {stroke: INK, sw: 7}) +
  P("M-80-6l-22-22M-80-6l24-30", m, {sw: 6, cap: "round"}) + C(-80, -6, 6, INK) +
  P("M-80-52v-8M-124-38l8-6M-36-38l-8-6", INK, {sw: 4, cap: "round"}) +
  T(-80, 40, "mm", 17, m) +
  C(80, -6, 58, null, {stroke: INK, sw: 7}) +
  P("M80-6l-26-18M80-6l14-32", s, {sw: 6, cap: "round"}) + C(80, -6, 6, INK) +
  P("M80-52v-8M36-38l8-6M124-38l-8-6", INK, {sw: 4, cap: "round"}) +
  T(80, 40, "inch", 17, s) +
  P("M-26 78h52M16 66l14 12-14 12", m, {sw: 6, cap: "round", join: "round"}) +
  P("M26 100h-52M-16 88l-14 12 14 12", s, {sw: 6, cap: "round", join: "round"});

/* 11 دليل أكواد IP: علبة كهرباء ضد الماء والتراب */
case "ip-rating": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-70, -70, 140, 150, null, {stroke: INK, sw: 7, rx: 8}) +
  R(-52, -52, 104, 114, null, {stroke: m, sw: 4, rx: 4}) +
  C(0, 4, 26, null, {stroke: s, sw: 6}) + P("M-14 2l10 12 20-24", s, {sw: 6, cap: "round", join: "round"}) +
  P("M-96-84c-6 10-10 16-10 22a10 10 0 0 0 20 0c0-6-4-12-10-22z", m) +
  P("M-122-52c-6 10-10 16-10 22a10 10 0 0 0 20 0c0-6-4-12-10-22z", m) +
  P("M96-84c-6 10-10 16-10 22a10 10 0 0 0 20 0c0-6-4-12-10-22z", m) +
  P("M96-30h22M96-10h22M96 10h22", s, {sw: 4, dash: "4 6", cap: "round"}) +
  R(-52, 88, 104, 26, INK, {rx: 4}) + T(0, 106, "IP65", 16, CREAM, {ls: ".15em"});

/* 12 Checklist فحص الموقع: حافظة فحص + خوذة */
case "site-inspection": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M-20-40a52 40 0 0 1 104 0v12h-104z", m) +
  R(-32, -32, 120, 12, s, {rx: 4}) +
  R(-130, -96, 110, 190, null, {stroke: INK, sw: 6, rx: 8}) +
  R(-44, -108, 38, 22, INK, {rx: 6}) +
  P("M-112-58h66M-112-30h66M-112-2h66", INK, {sw: 5, cap: "round"}) +
  P("M-112-52l6 6 10-12M-112 4l6 6 10-12", s, {sw: 4, cap: "round", join: "round"}) +
  P("M-112 26h40", s, {sw: 5, cap: "round"}) +
  P("M-130 60h80", m, {sw: 6}) + T(-90, 82, "SITE", 14, INK, {ls: ".15em"});

/* 13 Checklist الاختبار: ملتيميتر بمجسات */
case "testing-checklist": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-110, -90, 130, 180, null, {stroke: INK, sw: 7, rx: 12}) +
  R(-92, -72, 94, 44, m, {rx: 5}) +
  T(-45, -42, "400V", 22, CREAM, {ls: ".05em"}) +
  C(-45, 10, 30, null, {stroke: s, sw: 6}) + P("M-45 10v-18", s, {sw: 6, cap: "round"}) +
  (function(){ var o=""; for (var i=0;i<8;i++){ var a=i*Math.PI/4; o+='<circle cx="'+(-45+40*Math.cos(a)).toFixed(0)+'" cy="'+(10+40*Math.sin(a)).toFixed(0)+'" r="3.5" fill="'+INK+'"/>';} return o; })() +
  C(-92, 56, 7, INK) + C(0, 56, 7, INK) +
  P("M-92 63C-92 96-60 96-40 110", INK, {sw: 5}) +
  P("M0 63C0 96 40 96 60 110", s, {sw: 5}) +
  P("M-40 110l-12 24M60 110l12 24", INK, {sw: 6, cap: "round"}) +
  P("M90-70l14 16 24-30", m, {sw: 8, cap: "round", join: "round"});

/* 14 Checklist السلامة: مثلث تحذير + صاعقة */
case "safety-checklist": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M0-95 120 80h-240z", null, {stroke: INK, sw: 8, join: "round"}) +
  P("M0-71 96 66h-192z", m) +
  P("M6-42l-24 40h18l-10 42 34-48h-18l14-34z", INK) +
  P("M-160 96c10-14 20-14 30 0M-160 112c10-14 20-14 30 0", s, {sw: 5, cap: "round"}) +
  P("M130 96c10-14 20-14 30 0M130 112c10-14 20-14 30 0", s, {sw: 5, cap: "round"}) +
  R(-38, 96, 76, 22, INK, {rx: 4}) + T(0, 112, "PPE", 14, CREAM, {ls: ".15em"});

/* 15 جدول الكابلات: جدول + وسام كابل */
case "cable-schedule": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-150, -90, 250, 180, null, {stroke: INK, sw: 6}) +
  R(-150, -90, 250, 30, m) +
  L(-150, -30, 100, -30, INK, 4) + L(-150, 24, 100, 24, INK, 4) +
  L(-88, -90, -88, 90, INK, 4) + L(-20, -90, -20, 90, INK, 4) +
  P("M-136-46h34M-136 8h34M-136 62h34", INK, {sw: 5, cap: "round"}) +
  P("M-74-46h40M-74 8h40M-74 62h40", s, {sw: 5, cap: "round"}) +
  P("M-6-46h60M-6 8h60M-6 62h60", INK, {sw: 5, cap: "round"}) +
  P("M118-40h44v52h-44z", null, {stroke: s, sw: 5, join: "round"}) +
  P("M132-40v-16h20v16", null, {stroke: s, sw: 4}) +
  P("M126-22h28M126-8h20", s, {sw: 4, cap: "round"}) +
  T(-25, 122, "3×240+120", 16, m);

/* 16 جدول اللوحة: لوحة توزيع بقواطع */
case "panel-schedule": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-100, -95, 200, 190, null, {stroke: INK, sw: 7, rx: 6}) +
  L(-100, -60, 100, -60, INK, 5) + T(0, -70, "MDP", 16, m, {ls: ".2em"}) +
  P("M-78-44v128M78-44v128", INK, {sw: 4}) +
  (function(){ var o=""; for (var i=0;i<4;i++){ var y=-30+i*32;
    o += R(-62, y, 34, 22, null, {stroke: m, sw: 4, rx: 3}) + P("M-45 "+(y+5)+"v12", m, {sw: 4, cap: "round"});
    o += R(28, y, 34, 22, null, {stroke: s, sw: 4, rx: 3}) + P("M45 "+(y+5)+"v12", s, {sw: 4, cap: "round"});
  } return o; })() +
  P("M-10-44v128", INK, {sw: 3, dash: "4 5"}) +
  R(-70, 100, 140, 20, INK, {rx: 3}) + T(0, 115, "BUS 400A", 13, CREAM, {ls: ".1em"});

/* 17 جدول الأحمال: جدول + أعمدة أحمال */
case "load-schedule": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M-150 90h300", INK, {sw: 6, cap: "round"}) +
  R(-140, 10, 36, 80, m) + R(-90, -30, 36, 120, s) + R(-40, 30, 36, 60, m) + R(10, -60, 36, 150, INK) + R(60, -10, 36, 100, m) +
  P("M-140-46h86M-140-66h86M-140-26h52", INK, {sw: 5, cap: "round"}) +
  P("M44-76h96M44-56h70", s, {sw: 5, cap: "round"}) +
  T(-122, 116, "kW", 15, INK) + T(78, 116, "Σ 245", 15, s);

/* 18 جدول الكميات BOQ: بند مقايسة + حاسبة */
case "boq-template": return dots(0, 0, 11, 7, 34, m, .18) +
  R(-150, -95, 190, 190, null, {stroke: INK, sw: 6}) +
  R(-150, -95, 190, 30, s) +
  L(-150, -35, 40, -35, INK, 4) + L(-150, 20, 40, 20, INK, 4) +
  L(-84, -95, -84, 95, INK, 4) + L(-22, -95, -22, 95, INK, 4) +
  P("M-136-52h38M-136 2h38M-136 58h38", INK, {sw: 5, cap: "round"}) +
  P("M-70-52h34M-70 2h34M-70 58h34", m, {sw: 5, cap: "round"}) +
  T(9, -45, "12", 15, INK) + T(9, 10, "34", 15, INK) + T(9, 66, "7", 15, INK) +
  R(66, -60, 76, 130, null, {stroke: INK, sw: 6, rx: 8}) +
  R(78, -48, 52, 24, m, {rx: 3}) +
  (function(){ var o=""; for (var r=0;r<3;r++) for (var c=0;c<3;c++) o += C(88+c*17, -8+r*20, 5.5, r===0&&c===2?s:INK); return o; })() +
  T(-55, 122, "QTY × PRICE", 14, s, {ls: ".1em"});

/* 19 طلب استفسار RFI: مستند بعلامة استفهام */
case "rfi-template": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M-80-95h100l50 50v140h-150z", null, {stroke: INK, sw: 7, join: "round"}) +
  P("M20-95v50h50", null, {stroke: s, sw: 6, join: "round"}) +
  P("M-60-30h110M-60-8h110M-60 14h70", INK, {sw: 6, cap: "round"}) +
  C(60, 44, 34, m) + T(60, 58, "؟", 34, CREAM, {fam: "Tajawal,sans-serif", w: 800}) +
  P("M-60 52h44M-60 74h30", s, {sw: 6, cap: "round"}) +
  R(-80, -130, 92, 28, INK, {rx: 4}) + T(-34, -111, "RFI", 16, CREAM, {ls: ".2em"});

/* 20 اعتماد المواد: صندوق بختم اعتماد */
case "submittal": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M-40-50 60-10v90L-40 118-140 40v-90z", null, {stroke: INK, sw: 7, join: "round"}) +
  P("M-140-50-40-10 60-50M-40-10v128", null, {stroke: m, sw: 5, join: "round"}) +
  P("M-90-72l50 20v34l-50-20z", s, {op: .85}) +
  C(84, 60, 42, null, {stroke: s, sw: 6}) +
  C(84, 60, 30, null, {stroke: s, sw: 3, dash: "5 5"}) +
  P("M70 54l10 12 20-24", s, {sw: 6, cap: "round", join: "round"}) +
  P("M-40 134h100", INK, {sw: 5, cap: "round"}) +
  T(10, -80, "MATERIAL", 15, INK, {ls: ".18em"});

/* 21 أمر التغيير: مستند بأسهم تغيير */
case "variation": return dots(0, 0, 11, 7, 34, m, .18) +
  P("M-110-95h130l40 40v150h-170z", null, {stroke: INK, sw: 7, join: "round"}) +
  P("M20-95v40h40", null, {stroke: m, sw: 6, join: "round"}) +
  P("M-88-58h84M-88-36h84", INK, {sw: 6, cap: "round"}) +
  P("M-88 2h60", s, {sw: 6, cap: "round"}) +
  P("M-88 34h60l-14-12M-28 34l-14 12", s, {sw: 5, cap: "round", join: "round"}) +
  P("M30 60H-30l14 12M-30 60l14-12", m, {sw: 5, cap: "round", join: "round"}) +
  P("M96-40l36 8-8-36", INK, {sw: 0}) + P("M96-40l36 8-8-36z", INK) +
  P("M96-40c26 6 30 26 22 44", INK, {sw: 5, cap: "round"}) +
  R(-110, 76, 100, 26, m, {rx: 4}) + T(-60, 94, "VO-01", 14, CREAM, {ls: ".12em"});

/* 22 جدول اللبنات الاسترشادي: دائرة مرجعية */
case "schedules-reference": return dots(0, 0, 11, 7, 34, m, .18) +
  L(-160, -40, 160, -40, INK, 5) +
  R(-150, -58, 44, 36, null, {stroke: m, sw: 5, rx: 4}) + P("M-128-49v18", m, {sw: 4, cap: "round"}) +
  P("M-80-40v30c0 14 12 20 24 20", null, {stroke: s, sw: 5}) +
  C(-40, 12, 16, null, {stroke: s, sw: 5}) + T(-40, 19, "M", 14, s) +
  R(0, -58, 44, 36, null, {stroke: m, sw: 5, rx: 4}) + P("M22-49v18", m, {sw: 4, cap: "round"}) +
  P("M70-40v30c0 14 12 20 24 20", null, {stroke: s, sw: 5}) +
  C(110, 12, 16, null, {stroke: s, sw: 5}) + P("M103 6l14 12M117 6l-14 12", INK, {sw: 4, cap: "round"}) +
  R(-150, 44, 300, 66, null, {stroke: INK, sw: 5}) +
  L(-150, 66, 150, 66, INK, 4) + L(-150, 88, 150, 88, INK, 4) +
  L(-50, 44, -50, 110, INK, 4) + L(50, 44, 50, 110, INK, 4) +
  P("M-136 56h70M-136 78h70M-136 100h70", INK, {sw: 4, cap: "round"}) +
  P("M-36 56h70M-36 78h70M-36 100h70", m, {sw: 4, cap: "round"}) +
  P("M64 56h70M64 78h70M64 100h70", s, {sw: 4, cap: "round"});
  }
  return "";
}

window.toolScene = function (id, main, sub) {
  var s = scenes(id, main, sub);
  if (s) return s;
  /* fallback: أيقونة عامة */
  return dots(0, 0, 9, 6, 34, main, .18) +
    P("M0-60 52 0 0 60-52 0Z", null, {stroke: INK, sw: 7}) + C(0, 0, 16, sub);
};
})();

/* photo covers: ids with a real photo in assets/covers/<id>.webp */
window.toolPhotos = {
  "mep-hub": "assets/covers/mep-hub.webp",
  "boq-fire": "assets/covers/boq-fire.webp",
  "calc-v2": "assets/covers/calc-v2.webp",
  "control-simulator": "assets/covers/control-simulator.webp",
  "distribution-tools": "assets/covers/distribution-tools.webp",
  "control-circuit-simulator": "assets/covers/control-circuit-simulator.webp",
  "software-guide": "assets/covers/software-guide.webp",
  "cable-breaker": "assets/covers/cable-breaker.webp",
  "unit-converter": "assets/covers/unit-converter.webp",
  "site-inspection": "assets/covers/site-inspection.webp",
  "testing-checklist": "assets/covers/testing-checklist.webp",
  "panel-schedule": "assets/covers/panel-schedule.webp",
  "schedules-reference": "assets/covers/schedules-reference.webp",
  "fire-pump": "assets/covers/fire-pump.webp",
  "fire-alarm": "assets/covers/fire-alarm.webp",
  "duct-sizing": "assets/covers/duct-sizing.webp",
  "plumbing": "assets/covers/plumbing.webp",
  "bim-lod": "assets/covers/bim-lod.webp",
  "cad-symbols": "assets/covers/cad-symbols.webp"
};
