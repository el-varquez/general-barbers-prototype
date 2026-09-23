/* General Barbers — the booking flow chart as vector graphics.
   GB_FLOW.render(svgElement, { logo: "path/to/logo-badge.png" }) draws the three-lane chart into a 1560×1690 <svg>.
   Used by index.html (the cover) and guidelines/booking-flow.card.html; scales crisply at any width. */
window.GB_FLOW=(function(){
const W=1560,H=1690;
const LANES=[
 {key:"c",x:262,label:"Customer",sub:"mobile app",tint:"#F1F7F2",fill:"#E2F0E6",stroke:"#8FC49F",text:"#1E4A2C"},
 {key:"b",x:702,label:"Barber",sub:"mobile app · staff account",tint:"#FDF8EF",fill:"#FBEBCB",stroke:"#E3B65C",text:"#6E4606"},
 {key:"f",x:1142,label:"Front desk",sub:"web dashboard · tablet",tint:"#F0F5FB",fill:"#DCE9F7",stroke:"#7FA9DA",text:"#1A4577"},
];
const SX=1435, R0=206, RH=92, NW=310, NH=62;
const ry=r=>R0+r*RH;
const FONT='"Oswald","Arial Narrow",Impact,sans-serif';
const UI='"Segoe UI",system-ui,-apple-system,Roboto,sans-serif';
const STATUS={
 booked:{l:"Booked",bg:"#EEF1EC",c:"#4F5C53",sub:"online booking confirmed"},
 queued:{l:"In queue",bg:"#D9EEDF",c:"#1E5A30",sub:"position + ETA shown"},
 chair:{l:"In the chair",bg:"#FBE8C4",c:"#8A5A08",sub:"start time recorded"},
 done:{l:"Cut done",bg:"#DCE9F7",c:"#1D4E89",sub:"balance to settle"},
 complete:{l:"Completed",bg:"#24522F",c:"#FFFFFF",sub:"visit closed, payment recorded"},
};
const nodes=[
 ["c1","c",0,"Open app","loading screen, welcome"],
 ["c2","c",1,"Sign in","Google, Facebook or phone number"],
 ["c3","c",2,"Select branch","JP Laurel, Polomolok, Calumpang"],
 ["c4","c",3,"Select barber","or next available"],
 ["c5","c",4,"Select cut","standard, or custom with notes + photo"],
 ["c6","c",5,"Pick a time slot",""],
 ["c7","c",6,"Checkout + 50% downpayment","GCash or Maya"],
 ["c8","c",7,"QR code generated","live status inside the app"],
 ["c9","c",8,"Arrive, show QR","at the front desk"],
 ["fw1","f",2,"Walk-in arrives","front desk starts a new visit"],
 ["fw2","f",3,"Add walk-in","customer name or Guest"],
 ["fw3","f",4,"Choose service + barber","preferred or next available"],
 ["fw4","f",5,"Create walk-in visit","no downpayment required"],
 ["f1","f",8,"Add to shared queue","scan online QR or confirm walk-in"],
 ["c10","c",9,"Wait in shared queue","app status or front desk call"],
 ["b1","b",9,"Open visit at the chair","scan booking QR or select walk-in"],
 ["b2","b",10,"Tap Start cut",""],
 ["b3","b",11,"Tap Mark as done",""],
 ["c11","c",11,"Settle remaining balance","at the front desk"],
 ["c12","c",12,"Go to the front desk","QR optional for walk-ins"],
 ["f2","f",12,"Collect remaining balance","cash, GCash or Maya"],
 ["f3","f",13,"Complete visit",""],
 ["c13","c",13,"Rating prompt","sent when contact details exist"],
 ["b4","b",14,"Review lands in My reviews","rating updates on the profile"],
];
const pills=[[6,"booked"],[8,"queued"],[10,"chair"],[11,"done"],[13,"complete"]];

function render(svg,opts){
  opts=opts||{}; const logo=opts.logo||"uploads/logo-badge.png"; const N={};
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`); svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
  let out=`<defs>
    <marker id="gbf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#6E7D73"/></marker>
    <marker id="gbf-ard" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#9AA79E"/></marker>
  </defs>
  <style>
    .gbf-t{font:600 16.5px ${UI}} .gbf-s{font:12.5px ${UI}} .gbf-lane{font:700 22px ${FONT};letter-spacing:1.5px;text-transform:uppercase}
    .gbf-lanesub{font:12.5px ${UI};fill:#67725F} .gbf-lbl{font:italic 12px ${UI};fill:#5F6E64} .gbf-pill{font:700 12.5px ${UI}} .gbf-pillsub{font:11px ${UI};fill:#67725F}
  </style>
  <rect width="${W}" height="${H}" fill="#fff"/>
  <rect x="0" y="0" width="${W}" height="96" fill="#24522F"/>
  <image href="${logo}" x="36" y="16" width="78" height="65"/>
  <text x="134" y="48" class="gbf-lane" fill="#fff" style="font-size:26px;letter-spacing:2px">Customer visit flow</text>
  <text x="134" y="74" fill="rgba(255,255,255,.72)" style="font:13.5px ${UI}">Online bookings and front-desk walk-ins merge into one live barber queue.</text>
  <text x="${W-36}" y="60" text-anchor="end" fill="rgba(255,255,255,.7)" style="font:12.5px ${UI}">General Barbers · General Santos City · prototype v3</text>`;
  LANES.forEach(L=>{
    out+=`<rect x="${L.x-215}" y="104" width="430" height="1566" rx="16" fill="${L.tint}"/>`;
    out+=`<text x="${L.x}" y="138" text-anchor="middle" class="gbf-lane" fill="${L.text}">${L.label}</text>`;
    out+=`<text x="${L.x}" y="156" text-anchor="middle" class="gbf-lanesub">${L.sub}</text>`;
  });
  out+=`<text x="${SX}" y="138" text-anchor="middle" class="gbf-lane" fill="#24522F">Status</text><text x="${SX}" y="156" text-anchor="middle" class="gbf-lanesub">what everyone sees</text>`;
  out+=`<line x1="${SX}" y1="${ry(6)}" x2="${SX}" y2="${ry(13)}" stroke="#CFDAD2" stroke-width="2" stroke-dasharray="3 5"/>`;
  nodes.forEach(([id,lane,row,t,s])=>{
    const L=LANES.find(l=>l.key===lane); const x=L.x-NW/2, y=ry(row)-NH/2;
    N[id]={x:L.x,y:ry(row),l:x,r:x+NW,t:y,b:y+NH};
    out+=`<rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="12" fill="${L.fill}" stroke="${L.stroke}" stroke-width="1.5"/>`;
    if(s) out+=`<text x="${L.x}" y="${ry(row)-3}" text-anchor="middle" class="gbf-t" fill="${L.text}">${t}</text><text x="${L.x}" y="${ry(row)+17}" text-anchor="middle" class="gbf-s" fill="${L.text}" opacity=".8">${s}</text>`;
    else out+=`<text x="${L.x}" y="${ry(row)+6}" text-anchor="middle" class="gbf-t" fill="${L.text}">${t}</text>`;
  });
  [["b","Signs in with a staff account","sees today's visits for their own chair"],["f","Opens the dashboard","bookings, walk-ins, live queue and sales"]].forEach(([lane,tt,ss])=>{
    const L=LANES.find(l=>l.key===lane);const y=ry(1);
    out+=`<rect x="${L.x-NW/2}" y="${y-NH/2}" width="${NW}" height="${NH}" rx="12" fill="#fff" fill-opacity=".6" stroke="${L.stroke}" stroke-width="1.5" stroke-dasharray="6 5"/><text x="${L.x}" y="${y-3}" text-anchor="middle" class="gbf-t" fill="${L.text}">${tt}</text><text x="${L.x}" y="${y+17}" text-anchor="middle" class="gbf-s" fill="${L.text}" opacity=".8">${ss}</text>`;
  });
  const stroke=d=>d?"#9AA79E":"#6E7D73", mk=d=>`url(#gbf-${d?"ard":"ar"})`, dash=d=>d?'stroke-dasharray="6 5"':"";
  const v=(a,b,d)=>`<line x1="${N[a].x}" y1="${N[a].b+2}" x2="${N[b].x}" y2="${N[b].t-3}" stroke="${stroke(d)}" stroke-width="2" ${dash(d)} marker-end="${mk(d)}"/>`;
  const lab=(x1,x2,y,label)=>label?`<rect x="${(x1+x2)/2-label.length*3.3-6}" y="${y-22}" width="${label.length*6.6+12}" height="18" rx="4" fill="#fff" opacity=".92"/><text x="${(x1+x2)/2}" y="${y-9}" text-anchor="middle" class="gbf-lbl">${label}</text>`:"";
  const hr=(a,b,label,d)=>{const y=N[a].y,x1=N[a].r+2,x2=N[b].l-3;return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${stroke(d)}" stroke-width="2" ${dash(d)} marker-end="${mk(d)}"/>`+lab(x1,x2,y,label)};
  const hl=(a,b,label,d)=>{const y=N[a].y,x1=N[a].l-2,x2=N[b].r+3;return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${stroke(d)}" stroke-width="2" ${dash(d)} marker-end="${mk(d)}"/>`+lab(x1,x2,y,label)};
  out+=v("c1","c2")+v("c2","c3")+v("c3","c4")+v("c4","c5")+v("c5","c6")+v("c6","c7")+v("c7","c8")+v("c8","c9");
  out+=v("fw1","fw2")+v("fw2","fw3")+v("fw3","fw4")+v("fw4","f1");
  out+=hr("c9","f1","scan online booking QR");
  out+=`<path d="M${N.f1.x} ${N.f1.b+2} V${N.f1.b+16} H${N.c10.x} V${N.c10.t-3}" fill="none" stroke="#6E7D73" stroke-width="2" marker-end="url(#gbf-ar)"/>`;
  out+=`<rect x="${(N.f1.x+N.c10.x)/2-104}" y="${N.f1.b+8}" width="208" height="18" rx="4" fill="#fff" opacity=".92"/><text x="${(N.f1.x+N.c10.x)/2}" y="${N.f1.b+21}" text-anchor="middle" class="gbf-lbl">waits, then is called to a chair</text>`;
  out+=hr("c10","b1","barber opens next visit");
  out+=v("b1","b2")+v("b2","b3");
  out+=hl("b3","c11","app updates");
  out+=v("c11","c12");
  out+=hr("c12","f2","settle at the counter");
  out+=v("f2","f3");
  out+=hl("f3","c13","push notification",true);
  out+=`<path d="M${N.c13.x} ${N.c13.b+2} V${N.b4.y} H${N.b4.l-3}" fill="none" stroke="#9AA79E" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#gbf-ard)"/>`;
  out+=`<rect x="${N.c13.x+40}" y="${N.b4.y-22}" width="112" height="18" rx="4" fill="#fff" opacity=".92"/><text x="${N.c13.x+96}" y="${N.b4.y-9}" text-anchor="middle" class="gbf-lbl">review posted</text>`;
  out+=`<path d="M${N.c8.l-2} ${N.c8.y} H${N.c8.l-30} V${N.c6.y} H${N.c6.l-3}" fill="none" stroke="#9AA79E" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#gbf-ard)"/>`;
  out+=`<text transform="translate(${N.c8.l-38} ${(N.c8.y+N.c6.y)/2}) rotate(-90)" text-anchor="middle" class="gbf-lbl">cancel / reschedule</text>`;
  pills.forEach(([row,k])=>{const m=STATUS[k],y=ry(row);const src=row===8?N.f1:row===6?N.c7:row===10?N.b2:row===11?N.b3:N.f3;
    out+=`<line x1="${src.r+2}" y1="${y}" x2="${SX-84}" y2="${y}" stroke="#CFDAD2" stroke-width="1.5" stroke-dasharray="2 5"/>`;
    out+=`<rect x="${SX-80}" y="${y-17}" width="160" height="34" rx="17" fill="${m.bg}" ${k==="booked"?'stroke="#CFD8D1" stroke-width="1"':""}/>`;
    out+=`<text x="${SX}" y="${y+5}" text-anchor="middle" class="gbf-pill" fill="${m.c}">${m.l}</text>`;
    out+=`<text x="${SX}" y="${y+33}" text-anchor="middle" class="gbf-pillsub">${m.sub}</text>`;
  });
  out+=`<text x="48" y="1660" class="gbf-s" fill="#67725F">Solid arrows: customer or staff action. Dashed arrows: automatic system action. Online bookings use a QR; walk-ins use the same visit record without requiring one.</text>`;
  svg.innerHTML=out;
}
return {render,W,H};
})();
