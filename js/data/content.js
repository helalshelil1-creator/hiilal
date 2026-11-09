/* ========================================
   DATA - المحتوى
======================================== */

const CONTENT = [
    { id: "c1", type: "document", title: "IEC 60364 — التركيبات الكهربائية", description: "المعيار الدولي الأهم في تصميم التركيبات الكهربائية.", url: "https://webstore.iec.ch/publication/1877" },
    { id: "c2", type: "video", title: "شرح قانون أوم بالعربي", description: "شرح مبسط لقانون أوم مع أمثلة عملية.", url: "https://www.youtube.com/watch?v=HsLLq6Rm5tU" },
    { id: "c3", type: "program", title: "AutoCAD Electrical", description: "برنامج Autodesk للرسم الكهربائي.", url: "https://www.autodesk.com/products/autocad-electrical" },
    { id: "c4", type: "program", title: "DIALux Evo", description: "برنامج مجاني لتصميم الإضاءة.", url: "https://www.dialux.com/" },
    { id: "c5", type: "program", title: "ETAP", description: "برنامج احترافي لتحليل الأنظمة الكهربائية.", url: "https://etap.com/" },
    { id: "c6", type: "link", title: "Electrical Engineering Portal", description: "أكبر موقع تعليمي للمهندسين الكهربائيين.", url: "https://electrical-engineering-portal.com/" },
    { id: "c7", type: "course", title: "AutoCAD — دبلومة التوزيع (المستوى 1)", description: "كورس AutoCAD للمهندس محمد إمام — دبلومة التوزيع. المستوى الأول: basis of AutoCAD, layers, blocks, dimensions.", author: "Eng. Muhammad Imam", url: "https://youtube.com/playlist?list=PLxNbro6QtRYv2_pSfuiQB1JNNNG4eK0Ok" },
    { id: "c8", type: "course", title: "AutoCAD — دبلومة التوزيع (المستوى 2)", description: "كورس AutoCAD للمهندس محمد إمام — دبلومة التوزيع. المستوى الثاني: متقدم — 3D, rendering, layouts.", author: "Eng. Muhammad Imam", url: "https://youtube.com/playlist?list=PLxNbro6QtRYsDmCwmC-1kJ5ci1dMqZVfE" },
    { id: "c9", type: "course", title: "AutoCAD Electrical — الرسم الكهربائي", description: "كورس AutoCAD Electrical للمهندس محمد إمام — رسم الدوائر، panel schedules، bill of materials.", author: "Eng. Muhammad Imam", url: "https://www.youtube.com/watch?v=a2HrX_ogjw8&list=PLQjw7ig_ZNi1tJMCBPqWhYsGJyycIQk_N" },
    { id: "c10", type: "course", title: "Classic Control — الكلاسيك كنترول من الصفر", description: "كورس الكلاسيك كنترول للمهندس رجب نصر — contactors, relays, timers, control circuits. 65+ درس.", author: "Eng. Rajab Nasr", url: "https://www.youtube.com/playlist?list=PLQw3tLmFowTTWEjA1aueEOt4z6AOTM4pX" },
    { id: "c11", type: "course", title: "Revit — كورسات كيان أكاديمي", description: "كورسات Revit من كيان أكاديمي (Kayan Academy) — Architecture, Structure, MEP, Electrical. مدربون معتمدون من Autodesk.", author: "Kayan Academy", url: "https://www.kayan-co.org/courses/" },
    { id: "c12", type: "course", title: "Revit for Electrical Engineers", description: "Revit MEP for Electrical Engineers — نمذجة كهربائية، load analysis، panel schedules، lighting.", author: "Kayan Academy", url: "https://www.kayan-co.org/courses/?page=4" },
];

window.CONTENT = CONTENT;
