/* Shop dashboard runtime. Every desktop card injects the same shell (sidebar, top bar, boot screen, toast), then renders its page.
   Cards load ../../components/gb-art.js and _nav.js first, then this file, and set data-page on <body>. */
document.body.insertAdjacentHTML("afterbegin","\n<div class=\"boot\" id=\"boot\">\n  <i class=\"gblogo\"></i>\n  <div class=\"boot-bar\"><i></i></div>\n  <div class=\"boot-cap\">Opening the shop dashboard</div>\n  <div class=\"boot-sub\">JP Laurel (Main)</div>\n</div>\n\n<aside class=\"side\">\n  <div class=\"side-brand\">\n    <div class=\"logotile\" style=\"width:40px;height:40px\"><i class=\"gblogo\"></i></div>\n    <div><h1>GENERAL BARBERS</h1><p>Shop dashboard</p></div>\n  </div>\n\n  <div class=\"branchsel\">\n    <div class=\"lbl\">Viewing branch</div>\n    <div class=\"val\">JP Laurel (Main) <span class=\"dm\">⌄</span></div>\n  </div>\n\n  <nav id=\"nav\"></nav>\n\n  <div class=\"side-foot\" id=\"sidefoot\"></div>\n</aside>\n<div class=\"toast\" id=\"toast\"></div>\n\n<div class=\"main\">\n  <div class=\"topbar\">\n    <div><h2 id=\"pgTitle\">Dashboard</h2><div class=\"sub\" id=\"pgSub\">Tuesday, September 1, 2026</div></div>\n    <div class=\"topact\">\n      <div class=\"search\"><span class=\"dm\">🔍</span><input placeholder=\"Search booking, customer…\"></div>\n      <button class=\"tbtn\">🔔<i class=\"pip\"></i></button>\n      <button class=\"tbtn\">⚙</button>\n    </div>\n  </div>\n  <div class=\"content\" id=\"content\"></div>\n</div>\n\n");



const BARBERS=[
 {id:1,name:"Jay Reyes",role:"Senior barber",rating:4.9,reviews:114,emoji:"💈",pic:"jay",avail:"Available now",busy:false,cuts:847,years:6,today:5,rev:890},
 {id:2,name:"Mark Santos",role:"Barber",rating:4.7,reviews:89,emoji:"✂️",pic:"mark",avail:"Available now",busy:false,cuts:612,years:4,today:4,rev:560},
 {id:3,name:"Ken Flores",role:"Senior barber",rating:4.8,reviews:96,emoji:"💇",pic:"ken",avail:"10:30 AM",busy:true,cuts:723,years:5,today:3,rev:480},
 {id:4,name:"Rico Cruz",role:"Junior barber",rating:4.6,reviews:41,emoji:"🧑",pic:"rico",avail:"11:00 AM",busy:true,cuts:298,years:2,today:2,rev:310},
];
const BOOKINGS=[
 {id:"GB-0041",c:"Carlo Mendoza",ph:"0917 ••• 2201",b:"Jay",cut:"Skin fade",t:"9:00 AM",s:"complete",p:200,total:200,completedAt:"9:46 AM"},
 {id:"GB-0042",c:"Miguel Sarmiento",ph:"0918 ••• 7734",b:"Mark",cut:"Regular haircut",t:"9:30 AM",s:"complete",p:150,total:150,completedAt:"10:08 AM"},
 {id:"GB-0043",c:"James Robles",ph:"0999 ••• 1180",b:"Jay",cut:"Low taper fade",t:"10:00 AM",s:"in-progress",p:100,total:200,startedAt:"10:41 AM"},
 {id:"GB-0044",c:"Andrei Lim",ph:"0917 ••• 5522",b:"Ken",cut:"Undercut",t:"10:30 AM",s:"done",p:90,total:180,startedAt:"10:32 AM",doneAt:"11:05 AM"},
 {id:"GB-0045",c:"Ryan Pascual",ph:"0995 ••• 3049",b:"Rico",cut:"Haircut + beard",t:"11:00 AM",s:"queued",p:125,total:250},
 {id:"GB-0046",c:"Paolo Dizon",ph:"0927 ••• 8816",b:"Mark",cut:"Buzz cut",t:"11:30 AM",s:"pending",p:50,total:100},
 {id:"GB-0047",c:"Luis Cabrera",ph:"0917 ••• 4407",b:"Jay",cut:"Skin fade",t:"1:00 PM",s:"pending",p:100,total:200},
 {id:"GB-0048",c:"Elmer Varquez",ph:"0917 ••• 4823",b:"Jay",cut:"Skin fade",t:"2:00 PM",s:"pending",p:100,total:200},
];
const SERVICES=[
 {n:"Regular haircut",p:150,d:"30 min",c:"Haircut",bk:38},
 {n:"Skin fade",p:200,d:"40 min",c:"Haircut",bk:52},
 {n:"Low taper fade",p:200,d:"40 min",c:"Haircut",bk:29},
 {n:"Undercut",p:180,d:"35 min",c:"Haircut",bk:18},
 {n:"Buzz cut",p:100,d:"15 min",c:"Haircut",bk:14},
 {n:"Beard trim",p:80,d:"15 min",c:"Beard",bk:22},
 {n:"Beard sculpt",p:120,d:"20 min",c:"Beard",bk:9},
 {n:"Haircut + beard",p:250,d:"50 min",c:"Combo",bk:41},
 {n:"Hot towel shave",p:150,d:"25 min",c:"Shave",bk:7},
];
const CUSTOMERS=[
 {n:"Carlo Mendoza",ph:"0917 ••• 2201",v:14,sp:2680,last:"Sep 1, 2026",fav:"Jay"},
 {n:"Miguel Sarmiento",ph:"0918 ••• 7734",v:11,sp:1810,last:"Sep 1, 2026",fav:"Mark"},
 {n:"James Robles",ph:"0999 ••• 1180",v:9,sp:1720,last:"Sep 1, 2026",fav:"Jay"},
 {n:"Andrei Lim",ph:"0917 ••• 5522",v:7,sp:1190,last:"Sep 1, 2026",fav:"Ken"},
 {n:"Elmer Varquez",ph:"0917 ••• 4823",v:12,sp:1980,last:"Aug 18, 2026",fav:"Jay"},
 {n:"Ryan Pascual",ph:"0995 ••• 3049",v:5,sp:960,last:"Sep 1, 2026",fav:"Rico"},
];
const WEEK=[["Mon",1815],["Tue",2140],["Wed",1690],["Thu",2380],["Fri",3120],["Sat",4260],["Sun",2890]];
const HOURS=[["9AM",4],["10AM",6],["11AM",5],["12PM",2],["1PM",5],["2PM",7],["3PM",8],["4PM",9],["5PM",7],["6PM",5]];

const NAV=[
 ["Daily",[["dashboard","📊","Dashboard",null],["scanner","📷","Front desk scan",null],["queue","⏳","Live queue","3"]]],
 ["Manage",[["bookings","📅","Visits","8"],["barbers","✂","Barbers",null],["services","🏷","Services",null],["customers","👥","Customers",null]]],
 ["Business",[["sales","💰","Sales",null],["reports","📈","Reports",null]]],
 ["Admin",[["users","🔐","Users & roles",null]]],
];

/* ---------- roles, permissions, staff accounts ---------- */
const ROLES={
 owner:{l:"Owner",d:"Everything, across all branches",c:"#F5C86B",bg:"rgba(245,200,107,.14)"},
 manager:{l:"Manager",d:"Runs one branch day to day",c:"#60A5FA",bg:"rgba(96,165,250,.14)"},
 frontdesk:{l:"Front desk",d:"Scans, queue and bookings at the counter",c:"#4DB56A",bg:"rgba(77,181,106,.15)"},
 barber:{l:"Barber",d:"Barber app only: own chair, scan, start and done",c:"#F59E0B",bg:"rgba(245,158,11,.15)"},
 customer:{l:"Customer",d:"Customer app only. Given automatically at sign-up",c:"rgba(255,255,255,.6)",bg:"rgba(255,255,255,.07)"},
};
const PERMS=[
 ["dashboard","Dashboard overview"],["scanner","Front desk scan: check in and collect balance"],["queue","Live queue: call next, mark done, flag no-show"],
 ["bookings","Bookings: view and reschedule"],["barbers","Barbers: schedules and performance"],["services","Services and pricing"],
 ["customers","Customer database"],["export","Export customer list"],["sales","Sales and payments"],["reports","Reports"],["users","Users and roles"],
 ["barberapp","Barber app: own chair, scan, start and done"],["customerapp","Customer app: book, pay, review"],
];
const GRANTS={
 owner:new Set(["dashboard","scanner","queue","bookings","barbers","services","customers","export","sales","reports","users"]),
 manager:new Set(["dashboard","scanner","queue","bookings","barbers","services","customers","export","sales","reports"]),
 frontdesk:new Set(["dashboard","scanner","queue","bookings","customers"]),
 barber:new Set(["barberapp"]),
 customer:new Set(["customerapp"]),
};
const USERS=[
 {id:"u1",n:"Dan Villanueva",title:"Owner",c:"dan@generalbarbers.ph",method:"Google",role:"owner",br:"All branches",st:"active",last:"Now",init:"DV"},
 {id:"u2",n:"Lea Bautista",title:"Branch manager",c:"lea.bautista@gmail.com",method:"Google",role:"manager",br:"Polomolok",st:"active",last:"Today, 9:12 AM",init:"LB"},
 {id:"u3",n:"Rhea Dalisay",title:"Receptionist",c:"0917 ••• 3301",method:"Phone",role:"frontdesk",br:"JP Laurel",st:"active",last:"Now",pic:"rhea"},
 {id:"u4",n:"Jay Reyes",title:"Senior barber · chair 1",c:"jayreyes.cuts@gmail.com",method:"Google",role:"barber",br:"JP Laurel",st:"active",last:"Today, 10:41 AM",pic:"jay"},
 {id:"u5",n:"Mark Santos",title:"Barber · chair 2",c:"mark.santos@gmail.com",method:"Google",role:"barber",br:"JP Laurel",st:"active",last:"Today, 10:08 AM",pic:"mark"},
 {id:"u6",n:"Ken Flores",title:"Senior barber · chair 3",c:"0918 ••• 7702",method:"Phone",role:"barber",br:"JP Laurel",st:"active",last:"Today, 11:05 AM",pic:"ken"},
 {id:"u7",n:"Rico Cruz",title:"Junior barber · chair 4",c:"fb.com/ricocruz",method:"Facebook",role:"barber",br:"JP Laurel",st:"active",last:"Yesterday",pic:"rico"},
 {id:"u8",n:"Jomar Tan",title:"Barber · chair 1",c:"0995 ••• 4410",method:"Phone",role:"barber",br:"Polomolok",st:"invited",last:"Never",init:"JT"},
 {id:"u9",n:"Aira Lim",title:"Receptionist",c:"aira.lim@gmail.com",method:"Google",role:"frontdesk",br:"Calumpang",st:"invited",last:"Never",init:"AL"},
 {id:"u10",n:"Paolo Reyes",title:"Barber",c:"0927 ••• 1188",method:"Phone",role:"barber",br:"Calumpang",st:"disabled",last:"Aug 12, 2026",init:"PR"},
];
const PERSONAS=[{n:"Dan Villanueva",role:"owner",init:"DV"},{n:"Rhea Dalisay",role:"frontdesk",pic:"rhea"}];
let ME=PERSONAS.find(p=>p.role===localStorage.getItem("gb-persona"))||PERSONAS[0], UM={open:false,id:null,draft:null}, ufilter="All";
const can=p=>GRANTS[ME.role].has(p);
const uav=(u,r=30)=>u.pic?`<div class="bav pic">${GB_ART.avatar(u.pic,{round:r})}</div>`:`<div class="bav init">${u.init}</div>`;
const rpill=r=>`<span class="st" style="background:${ROLES[r].bg};color:${ROLES[r].c}">${ROLES[r].l}</span>`;
const upill=s=>{const[bg,c,l]={active:["rgba(77,181,106,.15)","#4DB56A","Active"],invited:["rgba(245,158,11,.15)","#F59E0B","Invited"],disabled:["rgba(255,255,255,.07)","rgba(255,255,255,.5)","Disabled"]}[s];return `<span class="st" style="background:${bg};color:${c}">${l}</span>`};

const TITLES={dashboard:["Dashboard","Tuesday, September 1, 2026"],scanner:["Front desk scan","Check customers in on arrival, then settle and complete after the cut"],
 queue:["Live queue","Who's waiting and who's in the chair"],bookings:["Visits","Online bookings and walk-ins across every status"],
 barbers:["Barbers","Staff, schedules and performance"],services:["Services","Menu and pricing"],
 customers:["Customers","Visit history and spend"],sales:["Sales","Revenue and payment records"],reports:["Reports","Trends and peak hours"],
 users:["Users & roles","Who can sign in to the dashboard and the barber app, and what each role can open"]};

let page=document.body.dataset.page||"dashboard", scanned=null, filter="All";
/* Walk-in prototype: state stays in memory and joins the same visit/queue model as online bookings. */
let WM={open:false}, walkInSeq=0;

const STATUS={
  pending:["rgba(255,255,255,.07)","rgba(255,255,255,.55)","Booked"],
  queued:["rgba(77,181,106,.15)","#4DB56A","In queue"],
  "in-progress":["rgba(245,158,11,.15)","#F59E0B","In the chair"],
  done:["rgba(96,165,250,.14)","#60A5FA","Cut done"],
  complete:["rgba(159,211,174,.12)","#9FD3AE","Completed"],
  noshow:["rgba(241,106,117,.14)","#F16A75","No-show"],
};
const ORDER=["pending","queued","in-progress","done","complete"];
const st=s=>{const[bg,c,l]=STATUS[s]||STATUS.pending;return `<span class="st" style="background:${bg};color:${c}">${l}</span>`};
const sourceTag=b=>b.source==="walk-in"?`<span class="st" style="display:block;width:max-content;margin-top:5px;padding:3px 7px;background:rgba(96,165,250,.14);color:#60A5FA">Walk-in</span>`:"";
const FILTERS={All:null,Booked:"pending","In queue":"queued","In the chair":"in-progress","Cut done":"done",Completed:"complete","No-show":"noshow"};
const queueList=()=>BOOKINGS.filter(b=>["in-progress","queued"].includes(b.s)).sort((a,b)=>(a.s==="in-progress"?0:1)-(b.s==="in-progress"?0:1));

function nav(p){if(p===page){scanned=null;filter="All";render();return}location.href=NAV_FILES[p]||NAV_FILES.dashboard}
function simScan(id){scanned=BOOKINGS.find(b=>b.id===id);render()}
function clearScan(){scanned=null;render()}
function setFilter(f){filter=f;render()}
/* ---- shop clock, per-chair queue and customer notifications ---- */
let CLOCK=11*60+16;
const fmtT=m=>{let h=Math.floor(m/60),mm=m%60;const ap=h>=12?"PM":"AM";h=h%12||12;return h+":"+String(mm).padStart(2,"0")+" "+ap};
const tmin=t=>{const[hm,ap]=t.split(" ");let[h,m]=hm.split(":").map(Number);if(ap==="PM"&&h!==12)h+=12;if(ap==="AM"&&h===12)h=0;return h*60+m};
const tick=(n=1)=>{CLOCK+=n;return fmtT(CLOCK)};
const byTime=(a,b)=>tmin(a.t)-tmin(b.t);
const durOf=n=>parseInt((SERVICES.find(s=>s.n===n)||{d:"30"}).d,10);
const chairOf=short=>{const b=BARBERS.find(x=>x.name.split(" ")[0]===short);return b?b.id:1};
const curFor=short=>BOOKINGS.find(x=>x.b===short&&x.s==="in-progress");
const waitingFor=short=>BOOKINGS.filter(x=>x.b===short&&["queued","pending"].includes(x.s)).sort(byTime);
const NOTIFS=[{t:"10:41 AM",c:"James Robles",msg:"Your chair is ready. Go to Jay's chair 1."},{t:"10:32 AM",c:"Andrei Lim",msg:"Your chair is ready. Go to Ken's chair 3."},{t:"10:26 AM",c:"Andrei Lim",msg:"You're up next. Check in at the front desk first, then go to Ken's chair 3."}];
const canNotify=x=>x.ph&&x.ph!=="No contact";
function notifyBooking(x,kind){
  const chair=`${x.b}'s chair ${chairOf(x.b)}`;
  const msg=kind==="chair"?`Your chair is ready. Go to ${chair}.`:kind==="checkin"?`You're up next. Check in at the front desk first, then go to ${chair}.`:kind;
  x.notified=tick();if(canNotify(x))NOTIFS.unshift({t:x.notified,c:x.c,msg});return msg;
}
function autoNext(short){const nxt=waitingFor(short)[0];if(!nxt)return null;notifyBooking(nxt,nxt.s==="queued"?"chair":"checkin");return nxt}
function qCall(id){const x=BOOKINGS.find(b=>b.id===id);const msg=notifyBooking(x,x.s==="queued"?"chair":"checkin");toast(canNotify(x)?`Sent to ${x.c}: "${msg}"`:`Front desk call: ${x.c} is ready for ${x.b}.`);render()}
function qCheckIn(id){const x=BOOKINGS.find(b=>b.id===id);if(x.s!=="pending")return;x.s="queued";x.arrivedAt=tick();
  if(!curFor(x.b)&&waitingFor(x.b)[0]===x){notifyBooking(x,"chair");toast(`${x.c} checked in. ${x.b}'s chair is open, so they were sent straight to it.`)}
  else toast(`${x.c} checked in. Position ${waitingFor(x.b).indexOf(x)+1} for ${x.b}.`);render()}
function qStartFor(id){const x=BOOKINGS.find(b=>b.id===id);const cur=curFor(x.b);if(cur){toast(`${x.b} is still cutting ${cur.c}. Mark that one done first.`);return}
  x.s="in-progress";x.startedAt=tick();toast(`${x.c} is in ${x.b}'s chair.`);render()}
function qDoneFor(id){const x=BOOKINGS.find(b=>b.id===id);if(x.s!=="in-progress")return;x.s="done";x.doneAt=tick();const nxt=autoNext(x.b);
  toast(nxt?`${x.c} done. ${nxt.c} is next for ${x.b}.`:`${x.c} done. Nobody else is waiting for ${x.b}.`);render()}
function qCompleteFor(id){const x=BOOKINGS.find(b=>b.id===id);if(x.s!=="done")return;x.s="complete";x.completedAt=tick();
  if(canNotify(x)){NOTIFS.unshift({t:x.completedAt,c:x.c,msg:`Thanks for visiting. Rate your cut with ${x.b}?`});toast(`${x.c} completed. ₱${x.total-x.p} collected, rating prompt sent.`)}
  else toast(`${x.c} completed. ₱${x.total-x.p} collected.`);render()}
function qNoShow(id){const x=BOOKINGS.find(b=>b.id===id);x.s="noshow";toast(x.source==="walk-in"?`${x.c} removed from the walk-in queue.`:`${x.c} flagged as no-show. The ₱${x.p} downpayment stays with the shop.`);render()}
function fdQueue(){if(scanned)qCheckIn(scanned.id)}
function fdComplete(){if(scanned)qCompleteFor(scanned.id)}

let toastT=null;
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),3600)}
function openWalkIn(){WM.open=true;render()}
function closeWalkIn(){WM.open=false;render()}
function saveWalkIn(){
  const g=id=>document.getElementById(id), service=SERVICES.find(s=>s.n===g("wi-service").value), barber=g("wi-barber").value;
  const name=g("wi-name").value.trim()||"Walk-in guest", contact=g("wi-contact").value.trim()||"No contact";
  const visit={id:"WI-"+String(++walkInSeq).padStart(3,"0"),source:"walk-in",c:name,ph:contact,b:barber,cut:service.n,t:fmtT(CLOCK),s:"queued",p:0,total:service.p,arrivedAt:fmtT(CLOCK)};
  BOOKINGS.push(visit);WM.open=false;filter="All";render();toast(`${name} added to ${barber}'s queue as a walk-in.`)
}
function umCapture(){if(!UM.open)return;const g=i=>document.getElementById(i),d=UM.draft;if(g("um-n"))d.n=g("um-n").value;if(g("um-c"))d.c=g("um-c").value;if(g("um-br"))d.br=g("um-br").value;if(g("um-t"))d.title=g("um-t").value}
function openUser(id){const u=id&&USERS.find(x=>x.id===id);UM={open:true,id:id||null,draft:u?{...u}:{n:"",c:"",role:"barber",br:"JP Laurel",title:""}};render()}
function closeUser(){UM.open=false;render()}
function umRole(r){umCapture();UM.draft.role=r;render()}
function saveUser(){
  umCapture();const d=UM.draft;
  if(!d.n.trim()||!d.c.trim()){toast("Add a name and the email or number they sign in with.");return}
  d.n=d.n.trim();d.c=d.c.trim();
  d.method=d.c.includes("@")?"Google":/^[0+]\d/.test(d.c)?"Phone":"Facebook";
  if(!d.title)d.title=ROLES[d.role].l;
  if(UM.id){Object.assign(USERS.find(u=>u.id===UM.id),d);toast("Saved. Applies on their next sign-in.")}
  else{d.id="u"+Date.now();d.st="invited";d.last="Never";d.init=d.n.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase();USERS.push(d);
    toast(`Invite sent. ${d.n.split(" ")[0]} gets the ${ROLES[d.role].l} role the moment they sign in with ${d.c}.`)}
  UM.open=false;render();
}
function toggleUser(id){const u=USERS.find(x=>x.id===id);u.st=u.st==="disabled"?"active":"disabled";toast(u.st==="disabled"?`${u.n} can no longer sign in.`:`${u.n} can sign in again.`);render()}
function togglePerm(r,k){const s=GRANTS[r];if(s.has(k))s.delete(k);else s.add(k);if(!can(page)){location.href=NAV_FILES.dashboard;return}render()}
function setUfilter(f){ufilter=f;render()}
function switchMe(){ME=PERSONAS.find(p=>p!==ME);localStorage.setItem("gb-persona",ME.role);if(!can(page)){location.href=NAV_FILES.dashboard;return}scanned=null;UM.open=false;render();toast(`Now viewing as ${ME.n} (${ROLES[ME.role].l})`)}
function renderMe(){
  document.getElementById("sidefoot").innerHTML=`${ME.pic?`<div class="av pic">${GB_ART.avatar(ME.pic,{round:30})}</div>`:`<div class="av init">${ME.init}</div>`}
    <div style="flex:1;min-width:0"><div class="nm">${ME.n}</div><div class="rl">${ROLES[ME.role].l}</div></div>
    <button class="tbtn" title="Switch signed-in user (prototype)" onclick="switchMe()" style="width:30px;height:30px;font-size:13px;flex-shrink:0">⇄</button>`;
}

function renderNav(){
  document.getElementById("nav").innerHTML=NAV.map(([g,items])=>[g,items.filter(([id])=>can(id))]).filter(([,items])=>items.length).map(([g,items])=>`
    <div class="navgroup"><div class="gl">${g}</div>
    ${items.map(([id,ic,l])=>{const ct={queue:queueList().length,bookings:BOOKINGS.length}[id];return `
      <button class="navitem ${page===id?"on":""}" onclick="nav('${id}')">
        <span class="ic">${ic}</span><span>${l}</span>${ct?`<span class="ct">${ct}</span>`:""}
      </button>`}).join("")}</div>`).join("");
}

function render(){
  renderNav();renderMe();
  const[t,s]=TITLES[page];
  document.getElementById("pgTitle").textContent=t;
  document.getElementById("pgSub").textContent=s;
  let h="";

  if(page==="dashboard"){
    const waiting=BOOKINGS.filter(b=>b.s==="queued").length;
    const walkins=BOOKINGS.filter(b=>b.source==="walk-in").length, expected=BOOKINGS.reduce((n,b)=>n+b.total,0);
    const stats=[["Today's visits",String(BOOKINGS.length),walkins?`${walkins} walk-in added`:"8 online bookings","📅"],["Revenue today","₱1,815","₱915 collected","💰"],
      ["In queue",String(waiting),"~"+Math.max(10,waiting*15)+" min est. wait","⏳"],["Show-up rate","96%","1 no-show this week","✓"]];
    h=`<div class="statgrid">${stats.map(([l,v,d,i])=>`
      <div class="stat"><span class="ic">${i}</span><div class="lbl">${l}</div><div class="val">${v}</div><div class="dlt">${d}</div></div>`).join("")}</div>
    <div class="cols">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Today's visits</h3><div class="sub">${BOOKINGS.length} total · ₱${expected.toLocaleString()} expected</div></div>
            <div style="display:flex;gap:7px"><button class="btn" onclick="openWalkIn()">+ Add walk-in</button><button class="btn ghost" onclick="nav('bookings')">View all</button></div></div>
          <table><thead><tr><th>Booking</th><th>Customer</th><th>Barber</th><th>Service</th><th>Time</th><th>Status</th><th style="text-align:right">Paid / Total</th></tr></thead>
          <tbody>${BOOKINGS.map(b=>`<tr>
            <td class="mono">${b.id}${sourceTag(b)}</td><td>${b.c}</td><td class="md">${b.b}</td><td class="md">${b.cut}</td>
            <td style="font-weight:600">${b.t}</td><td>${st(b.s)}</td>
            <td style="text-align:right"><span style="color:var(--acc);font-weight:600">₱${b.p}</span><span class="dm"> / ₱${b.total}</span></td>
          </tr>`).join("")}</tbody></table>
        </div>
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Revenue this week</h3><div class="sub">Total ₱18,295 · Saturday is the peak</div></div></div>
          <div class="chart">${WEEK.map(([d,v])=>`
            <div class="col"><div class="bx" style="height:${(v/4260*100)}%" title="₱${v.toLocaleString()}"></div><div class="lb">${d}</div></div>`).join("")}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><h3>Live queue</h3><button class="btn sm" onclick="openWalkIn()">+ Walk-in</button></div>
          ${queueList().map((b,i)=>`
            <div class="qitem" style="background:${b.s==="in-progress"?"rgba(245,158,11,.08)":"rgba(77,181,106,.06)"}">
              <div class="qnum" style="background:${b.s==="in-progress"?"var(--warn)":"var(--acc)"}">${b.s==="in-progress"?"✂":i}</div>
              <div style="flex:1"><div style="font-size:13px;font-weight:600">${b.c}</div>
              <div style="font-size:11.5px;color:var(--textDm)">${b.cut} · ${b.b}</div></div>
              <span style="font-size:11.5px;font-weight:600;color:${b.s==="in-progress"?"var(--warn)":"var(--acc)"}">${b.t}</span>
            </div>`).join("")}
          <button class="btn ghost" style="width:100%;margin-top:8px" onclick="nav('scanner')">Open QR scanner</button>
        </div>
        <div class="card cardpad">
          <div class="cardhead"><h3>Barbers today</h3></div>
          ${BARBERS.map(b=>`<div class="brow">
            <div class="bav pic">${GB_ART.avatar(b.pic,{round:30})}</div>
            <div style="flex:1"><div style="font-size:13px;font-weight:600">${b.name}</div>
            <div style="font-size:11.5px;color:var(--textDm)">${b.today} bookings · ₱${b.rev}</div></div>
            <div style="width:9px;height:9px;border-radius:5px;background:${b.busy?"var(--warn)":"var(--acc)"}"></div>
          </div>`).join("")}
        </div>
        <div class="card cardpad">
          <div class="cardhead"><h3>Top services</h3></div>
          ${SERVICES.slice().sort((a,b)=>b.bk-a.bk).slice(0,4).map(s=>`
            <div style="margin-bottom:13px"><div style="display:flex;justify-content:space-between;font-size:12.5px">
              <span>${s.n}</span><span class="dm">${s.bk} this month</span></div>
              <div class="bar"><i style="width:${s.bk/52*100}%"></i></div></div>`).join("")}
        </div>
      </div>
    </div>`;
  }

  else if(page==="scanner"){
    const s=scanned, queued=BOOKINGS.filter(b=>b.s==="queued");
    const hstep=cur=>{const r=ORDER.indexOf(cur);return `<div class="hstep">${ORDER.map((k,i)=>`<div class="${i<r?"past":i===r?"now":""}"><i></i><span>${STATUS[k][2]}</span></div>`).join("")}</div>`};
    let panel;
    if(!s){
      panel=`<div style="text-align:center;padding:52px 10px;color:var(--textDm)">
        <div class="empty-art">${GB_ART.ticket()}</div>
        <div style="font-size:14px;font-weight:600;color:var(--textMd);margin-bottom:5px">No booking scanned yet</div>
        <div style="font-size:12.5px;line-height:1.6">Scan a customer's code when they arrive to add them to the queue, and again after the cut to collect the balance.</div>
      </div>`;
    } else {
      const bal=s.total-s.p;
      const v={
        pending:{h:"Customer arrived",hc:"var(--acc)",sub:"Booking verified · downpayment paid",note:`Will be position ${queued.length+1} in the queue · about ${(queued.length+1)*15} min`,
          act:`<button class="btn ghost" style="flex:1" onclick="clearScan()">Cancel</button><button class="btn" style="flex:1.4" onclick="fdQueue()">Add to queue</button>`},
        queued:{h:"In the queue",hc:"var(--acc)",sub:`Position ${queued.indexOf(s)+1} · waiting for ${s.b}${s.arrivedAt?" · arrived "+s.arrivedAt:""}`,note:"Nothing to collect yet. The barber scans this code next, at the chair.",
          act:`<button class="btn ghost" style="flex:1" onclick="clearScan()">Close</button>`},
        "in-progress":{h:"In the chair",hc:"var(--warn)",sub:`${s.b} started at ${s.startedAt||"—"}`,note:"Scan this code again once the barber marks the cut done.",
          act:`<button class="btn ghost" style="flex:1" onclick="clearScan()">Close</button>`},
        done:{h:"Cut finished",hc:"#60A5FA",sub:`${s.b} marked it done at ${s.doneAt||"—"}`,note:`Balance due now: ₱${bal} · cash, GCash or Maya`,
          act:`<button class="btn ghost" style="flex:1" onclick="clearScan()">Cancel</button><button class="btn" style="flex:1.6" onclick="fdComplete()">Collect ₱${bal} &amp; complete</button>`},
        complete:{h:"Booking complete",hc:"var(--acc)",sub:`Settled ${s.completedAt||"earlier"} · ₱${s.total} collected in total`,note:`Push notification sent to ${s.c} asking for a rating of ${s.b}. It lands on ${s.b}'s profile when posted.`,
          act:`<button class="btn" style="flex:1" onclick="clearScan()">Next customer</button>`},
      }[s.s];
      panel=`<div style="text-align:center;margin-bottom:16px">
          <div style="width:52px;height:52px;border-radius:26px;background:${s.s==="complete"?"rgba(245,158,11,.16)":"rgba(77,181,106,.16)"};display:flex;align-items:center;justify-content:center;font-size:25px;margin:0 auto 10px">${s.s==="complete"?"★":"✓"}</div>
          <h3 style="color:${v.hc}">${v.h}</h3><div class="sub">${v.sub}</div>
        </div>
        ${hstep(s.s)}
        <div style="background:rgba(255,255,255,.025);border-radius:12px;padding:14px 16px;margin:18px 0 14px">
          ${[["Booking",s.id],["Customer",s.c],["Contact",s.ph],["Barber",s.b],["Service",s.cut],["Scheduled",s.t],
             ["Downpayment","₱"+s.p+" paid"],["Balance",s.s==="complete"?"Settled":"₱"+bal]]
            .map(([k,val])=>`<div class="kv"><span>${k}</span><span>${val}</span></div>`).join("")}
        </div>
        <div class="dm" style="font-size:12px;line-height:1.55;margin-bottom:12px;text-align:center">${v.note}</div>
        <div style="display:flex;gap:9px">${v.act}</div>`;
    }
    h=`<div class="cols" style="grid-template-columns:1fr 400px">
      <div class="card cardpad" style="text-align:center;padding:34px">
        <h3 style="margin-bottom:6px">Scan customer QR</h3>
        <div class="sub" style="margin-bottom:22px">Scan on arrival to add the customer to the queue. Scan again after the cut to collect the balance.</div>
        <div class="scanbox">${GB_ART.viewfinder()}</div>
        <div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap">
          <button class="btn" onclick="simScan('GB-0046')">Simulate: customer arriving</button>
          <button class="btn ghost" onclick="simScan('GB-0044')">Simulate: cut finished</button>
        </div>
        <div class="dm" style="font-size:12px;margin-top:14px">Works with the tablet camera, or any QR scanner app on a phone</div>
      </div>
      <div class="card cardpad">${panel}</div>
    </div>`;
  }

  else if(page==="queue"){
    const chairs=BARBERS.map(b=>{const short=b.name.split(" ")[0];return {b,short,cur:curFor(short),done:BOOKINGS.find(x=>x.b===short&&x.s==="done"),up:waitingFor(short)}});
    const waitingAll=BOOKINGS.filter(x=>x.s==="queued").length;
    h=`<div class="cols" style="grid-template-columns:1fr 330px">
      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 2px"><div class="dm" style="font-size:12.5px;line-height:1.55">Online bookings and walk-ins share each barber's queue. Add a walk-in here, or scan an online customer's QR when they arrive.</div><button class="btn" style="flex-shrink:0" onclick="openWalkIn()">+ Add walk-in</button></div>
        ${chairs.map(({b,short,cur,done,up})=>{
          const left=cur?Math.max(3,durOf(cur.cut)-(CLOCK-tmin(cur.startedAt))):0;
          return `<div class="card cardpad">
          <div class="cardhead" style="margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:11px"><div class="bav pic">${GB_ART.avatar(b.pic,{round:30})}</div>
              <div><h3>${b.name} <span class="dm" style="font-weight:400;font-size:12px">· chair ${b.id}</span></h3>
              <div class="sub" style="color:${cur?"var(--warn)":"var(--acc)"}">${cur?`Cutting ${cur.c} since ${cur.startedAt} · about ${left} min left`:done?`Chair open · ${done.c} is settling at the front desk`:"Chair open"}</div></div></div>
            <div style="display:flex;gap:7px;flex-wrap:wrap">
              ${cur?`<button class="btn" onclick="qDoneFor('${cur.id}')">Mark ${cur.c.split(" ")[0]} as done</button>`:""}
              ${done?`<button class="btn ghost" onclick="qCompleteFor('${done.id}')">Collect ₱${done.total-done.p} &amp; complete ${done.c.split(" ")[0]}</button>`:""}
            </div>
          </div>
          ${cur?`<div class="qitem" style="background:rgba(245,158,11,.08);margin-bottom:10px">
            <div class="qnum" style="background:var(--warn)">✂</div>
            <div style="flex:1;min-width:0"><div style="font-size:13.5px;font-weight:600">${cur.c}</div><div style="font-size:11.5px;color:var(--textDm)">${cur.cut} · booked ${cur.t} · started ${cur.startedAt}</div></div>${st(cur.s)}</div>`:""}
          ${up.length?up.map((x,i)=>`<div class="qitem" style="background:${x.s==="queued"?"rgba(77,181,106,.06)":"rgba(255,255,255,.025)"}">
            <div class="qnum" style="background:${x.s==="queued"?"var(--acc)":"rgba(255,255,255,.14)"}">${i+1}</div>
            <div style="flex:1;min-width:0"><div style="font-size:13.5px;font-weight:600">${x.c}${x.source==="walk-in"?` <span style="font-size:10px;color:#60A5FA;font-weight:700;text-transform:uppercase;letter-spacing:.4px">Walk-in</span>`:""}${x.notified?` <span class="dm" style="font-weight:400;font-size:11px">· ${canNotify(x)?"notified":"called"} ${x.notified}</span>`:""}</div>
              <div style="font-size:11.5px;color:var(--textDm)">${x.cut} · ${x.t}${x.s==="pending"?" · not checked in yet":x.arrivedAt?" · arrived "+x.arrivedAt:""}</div></div>
            ${st(x.s)}
            <div style="display:flex;gap:6px;margin-left:8px;flex-shrink:0">
              <button class="btn sm ${x.s==="queued"&&!cur&&i===0?"":"ghost"}" onclick="qCall('${x.id}')">${x.s==="queued"?"Call to chair":"Call"}</button>
              ${x.s==="pending"?`<button class="btn ghost sm" onclick="qCheckIn('${x.id}')">Check in</button>`:`<button class="btn ghost sm" onclick="qStartFor('${x.id}')">Start cut</button>`}
              <button class="btn ghost sm" onclick="qNoShow('${x.id}')">No-show</button>
            </div></div>`).join("")
          :`<div class="dm" style="font-size:12.5px;padding:4px 2px">Nobody waiting for ${short}.</div>`}
        </div>`}).join("")}
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><h3>Sent to customers' phones</h3><span class="dm" style="font-size:12px">${NOTIFS.length} today</span></div>
          ${NOTIFS.slice(0,8).map(n=>`<div style="padding:9px 0;border-bottom:1px solid var(--app-border)">
            <div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="font-weight:600">${n.c}</span><span class="dm">${n.t}</span></div>
            <div style="font-size:12px;color:var(--textMd);margin-top:2px;line-height:1.45">${n.msg}</div></div>`).join("")}
        </div>
        <div class="card cardpad">
          <div class="cardhead"><h3>Right now</h3></div>
          ${[["Waiting in the shop",waitingAll],["In a chair",BOOKINGS.filter(x=>x.s==="in-progress").length],["Booked, not arrived",BOOKINGS.filter(x=>x.s==="pending").length],["Shop clock",fmtT(CLOCK)]].map(([k,v])=>`<div class="kv"><span>${k}</span><span>${v}</span></div>`).join("")}
          <div style="margin-top:14px;padding:13px;border-radius:12px;background:rgba(77,181,106,.07);border:1px solid var(--borderHi);font-size:12px;color:var(--textMd);line-height:1.55">
            "Call" sends the message for that customer's situation: <b style="color:var(--app-text)">go to the chair</b> if they're checked in, <b style="color:var(--app-text)">check in first</b> if they're not. Marking a cut done sends it to the next person automatically.
          </div>
        </div>
      </div>
    </div>`;
  }

  else if(page==="bookings"){
    const list=FILTERS[filter]?BOOKINGS.filter(b=>b.s===FILTERS[filter]):BOOKINGS;
    h=`<div class="card cardpad">
      <div class="cardhead">
        <div><h3>All visits</h3><div class="sub">${list.length} shown · online bookings and walk-ins</div></div>
        <div style="display:flex;gap:7px;flex-wrap:wrap">
          ${Object.keys(FILTERS).map(f=>`<button class="pill ${filter===f?"on":""}" onclick="setFilter('${f}')">${f}</button>`).join("")}
        </div>
      </div>
      <table><thead><tr><th>Booking</th><th>Customer</th><th>Contact</th><th>Barber</th><th>Service</th><th>Time</th><th>Status</th><th style="text-align:right">Paid / Total</th></tr></thead>
      <tbody>${list.map(b=>`<tr>
        <td class="mono">${b.id}${sourceTag(b)}</td><td>${b.c}</td><td class="dm">${b.ph}</td><td class="md">${b.b}</td>
        <td class="md">${b.cut}</td><td style="font-weight:600">${b.t}</td><td>${st(b.s)}</td>
        <td style="text-align:right"><span style="color:var(--acc);font-weight:600">₱${b.p}</span><span class="dm"> / ₱${b.total}</span></td>
      </tr>`).join("")}</tbody></table>
      ${list.length===0?`<div style="text-align:center;padding:40px;color:var(--textDm);font-size:13px">No bookings with this status today.</div>`:""}
    </div>`;
  }

  else if(page==="barbers"){
    h=`<div class="bgrid" style="margin-bottom:16px">${BARBERS.map(b=>`
      <div class="bcard">
        <div class="av pic">${GB_ART.avatar(b.pic,{round:29})}</div>
        <div style="font-size:15px;font-weight:600">${b.name}</div>
        <div class="dm" style="font-size:12px;margin-bottom:8px">${b.role}</div>
        <div style="font-size:13px;color:var(--warn);font-weight:600">★ ${b.rating} <span class="dm" style="font-weight:400">(${b.reviews})</span></div>
        <div style="display:inline-block;margin-top:11px;padding:4px 12px;border-radius:8px;font-size:11px;font-weight:600;
          background:${b.busy?"rgba(245,158,11,.11)":"rgba(77,181,106,.14)"};color:${b.busy?"var(--warn)":"var(--acc)"}">
          ${b.busy?"Next free "+b.avail:"Available"}</div>
        <div style="display:flex;justify-content:center;gap:18px;margin-top:14px;padding-top:14px;border-top:1px solid var(--app-border)">
          <div><div style="font-size:15px;font-weight:700;color:var(--acc)">${b.today}</div><div class="dm" style="font-size:11px">today</div></div>
          <div><div style="font-size:15px;font-weight:700;color:var(--acc)">${b.cuts}</div><div class="dm" style="font-size:11px">all time</div></div>
          <div><div style="font-size:15px;font-weight:700;color:var(--acc)">${b.years}y</div><div class="dm" style="font-size:11px">exp</div></div>
        </div>
      </div>`).join("")}</div>
    <div class="card cardpad">
      <div class="cardhead"><div><h3>Performance this month</h3><div class="sub">Revenue generated per barber</div></div></div>
      ${BARBERS.map(b=>{const max=Math.max(...BARBERS.map(x=>x.cuts));return `
        <div style="margin-bottom:15px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px">
          <span style="font-weight:500">${b.name}</span><span class="dm">${b.cuts} cuts · ₱${(b.cuts*195).toLocaleString()}</span></div>
          <div class="bar"><i style="width:${b.cuts/max*100}%"></i></div></div>`;}).join("")}
    </div>`;
  }

  else if(page==="services"){
    h=`<div class="card cardpad">
      <div class="cardhead"><div><h3>Service menu</h3><div class="sub">9 services · prices shown in the customer app</div></div>
        <button class="btn">+ Add service</button></div>
      <table><thead><tr><th>Service</th><th>Category</th><th>Duration</th><th>Bookings this month</th><th style="text-align:right">Price</th></tr></thead>
      <tbody>${SERVICES.map(s=>`<tr>
        <td style="font-weight:500">${s.n}</td><td class="md">${s.c}</td><td class="md">${s.d}</td>
        <td><div style="display:flex;align-items:center;gap:10px"><span class="md" style="min-width:26px">${s.bk}</span>
        <div class="bar" style="flex:1;max-width:120px;margin:0"><i style="width:${s.bk/52*100}%"></i></div></div></td>
        <td style="text-align:right;font-weight:600;color:var(--acc)">₱${s.p}</td>
      </tr>`).join("")}</tbody></table>
    </div>`;
  }

  else if(page==="customers"){
    h=`<div class="statgrid" style="grid-template-columns:repeat(3,1fr)">
      ${[["Total customers","284","+18 this month","👥"],["Repeat rate","67%","up from 61%","🔁"],["Avg spend per visit","₱193","+₱12 vs last month","💵"]]
        .map(([l,v,d,i])=>`<div class="stat"><span class="ic">${i}</span><div class="lbl">${l}</div><div class="val">${v}</div><div class="dlt">${d}</div></div>`).join("")}</div>
    <div class="card cardpad">
      <div class="cardhead"><div><h3>Customer database</h3><div class="sub">Built automatically from every booking</div></div>
        ${can("export")?`<button class="btn ghost">Export CSV</button>`:`<span class="dm" style="font-size:12px">Export is limited to managers and the owner</span>`}</div>
      <table><thead><tr><th>Customer</th><th>Contact</th><th>Visits</th><th>Preferred barber</th><th>Last visit</th><th style="text-align:right">Lifetime spend</th></tr></thead>
      <tbody>${CUSTOMERS.map(c=>`<tr>
        <td style="font-weight:500">${c.n}</td><td class="dm">${c.ph}</td><td class="md">${c.v}</td>
        <td class="md">${c.fav}</td><td class="md">${c.last}</td>
        <td style="text-align:right;font-weight:600;color:var(--acc)">₱${c.sp.toLocaleString()}</td>
      </tr>`).join("")}</tbody></table>
    </div>`;
  }

  else if(page==="sales"){
    h=`<div class="statgrid">
      ${[["Today","₱1,815","8 bookings","📅"],["This week","₱18,295","94 bookings","📆"],
         ["This month","₱72,140","376 bookings","🗓"],["Downpayments held","₱915","across 6 open bookings","🔒"]]
        .map(([l,v,d,i])=>`<div class="stat"><span class="ic">${i}</span><div class="lbl">${l}</div><div class="val">${v}</div><div class="dlt">${d}</div></div>`).join("")}</div>
    <div class="cols">
      <div class="card cardpad">
        <div class="cardhead"><div><h3>Revenue this week</h3><div class="sub">Weekend carries roughly 40% of the week's total</div></div></div>
        <div class="chart">${WEEK.map(([d,v])=>`
          <div class="col"><div class="bx" style="height:${v/4260*100}%" title="₱${v}"></div><div class="lb">${d}</div></div>`).join("")}</div>
      </div>
      <div class="card cardpad">
        <div class="cardhead"><h3>Payment split</h3></div>
        ${[["GCash",62,"₱44,727"],["Maya",23,"₱16,592"],["Cash at shop",15,"₱10,821"]].map(([n,pct,amt])=>`
          <div style="margin-bottom:15px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px">
            <span style="font-weight:500">${n}</span><span class="dm">${pct}% · ${amt}</span></div>
            <div class="bar"><i style="width:${pct}%"></i></div></div>`).join("")}
        <div style="margin-top:18px;padding:14px;border-radius:12px;background:rgba(77,181,106,.07);border:1px solid var(--borderHi)">
          <div style="font-size:12px;color:var(--textDm)">Digital payments</div>
          <div style="font-size:22px;font-weight:700;color:var(--acc);margin-top:3px">85%</div>
          <div style="font-size:11.5px;color:var(--textDm);margin-top:3px">Less cash handling, cleaner daily reconciliation</div>
        </div>
      </div>
    </div>`;
  }

  else if(page==="reports"){
    const mx=Math.max(...HOURS.map(h=>h[1]));
    h=`<div class="cols" style="grid-template-columns:1fr 340px">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Peak hours</h3><div class="sub">Bookings by time of day — use this to schedule staff</div></div></div>
          <div class="chart">${HOURS.map(([t,v])=>`
            <div class="col"><div class="bx" style="height:${v/mx*100}%" title="${v} bookings"></div><div class="lb">${t}</div></div>`).join("")}</div>
          <div style="margin-top:16px;padding:13px 15px;border-radius:11px;background:rgba(77,181,106,.07);border:1px solid var(--borderHi);font-size:13px;line-height:1.6">
            <b style="color:var(--acc)">Insight:</b> 4PM is the busiest hour and noon is the quietest.
            Staggering one barber's lunch break to cover the 4–6PM window would absorb the evening rush.
          </div>
        </div>
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Service popularity</h3><div class="sub">Bookings this month</div></div></div>
          ${SERVICES.slice().sort((a,b)=>b.bk-a.bk).map(s=>`
            <div style="margin-bottom:13px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:2px">
              <span>${s.n}</span><span class="dm">${s.bk} · ₱${(s.bk*s.p).toLocaleString()}</span></div>
              <div class="bar"><i style="width:${s.bk/52*100}%"></i></div></div>`).join("")}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><h3>No-show rate</h3></div>
          <div style="text-align:center;padding:10px 0 4px">
            <div style="font-size:38px;font-weight:700;color:var(--acc)">4%</div>
            <div class="dm" style="font-size:12.5px;margin-top:4px">down from 23% before downpayments</div>
          </div>
          <div style="margin-top:14px;font-size:12.5px;color:var(--textMd);line-height:1.6">
            Requiring 50% upfront is what moved this number. Each recovered slot is roughly ₱195 in revenue.
          </div>
        </div>
        <div class="card cardpad">
          <div class="cardhead"><h3>Busiest days</h3></div>
          ${WEEK.slice().sort((a,b)=>b[1]-a[1]).map(([d,v])=>`
            <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:2px">
              <span>${d}</span><span class="dm">₱${v.toLocaleString()}</span></div>
              <div class="bar"><i style="width:${v/4260*100}%"></i></div></div>`).join("")}
        </div>
      </div>
    </div>`;
  }

  else if(page==="users"){
    const list=ufilter==="All"?USERS:USERS.filter(u=>u.role===ufilter);
    const nB=USERS.filter(u=>u.role==="barber").length, nI=USERS.filter(u=>u.st==="invited").length, other=PERSONAS.find(p=>p!==ME);
    const stats=[["Staff accounts",String(USERS.length),"across 3 branches","🔐"],["Barbers",String(nB),"barber app access","✂"],
      ["Awaiting first sign-in",String(nI),"role is applied when they sign in","✉"],["Customers","284","sign up on their own · not managed here","👥"]];
    h=`<div class="statgrid">${stats.map(([l,v,d,i])=>`<div class="stat"><span class="ic">${i}</span><div class="lbl">${l}</div><div class="val">${v}</div><div class="dlt">${d}</div></div>`).join("")}</div>
    <div class="cols" style="grid-template-columns:1fr 290px">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Staff accounts</h3><div class="sub">Only accounts added here get a staff role. Anyone else who signs in becomes a customer.</div></div>
            <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
              ${[["All","All"],["owner","Owner"],["manager","Manager"],["frontdesk","Front desk"],["barber","Barber"]].map(([k,l])=>`<button class="pill ${ufilter===k?"on":""}" onclick="setUfilter('${k}')">${l}</button>`).join("")}
              <button class="btn" onclick="openUser()">+ Add staff</button></div></div>
          <table><thead><tr><th>User</th><th>Signs in with</th><th>Role</th><th>Branch</th><th>Status</th><th>Last active</th><th style="text-align:right"></th></tr></thead>
          <tbody>${list.map(u=>`<tr onclick="openUser('${u.id}')">
            <td><div style="display:flex;align-items:center;gap:10px">${uav(u)}<div><div style="font-weight:600;white-space:nowrap">${u.n}</div><div class="dm" style="font-size:11.5px;white-space:nowrap">${u.title}</div></div></div></td>
            <td><div class="md">${u.method}</div><div class="dm" style="font-size:11.5px">${u.c}</div></td>
            <td>${rpill(u.role)}</td><td class="md">${u.br}</td><td>${upill(u.st)}</td><td class="dm">${u.last}</td>
            <td style="text-align:right;white-space:nowrap">${u.st==="invited"?`<button class="btn ghost sm" onclick="event.stopPropagation();toast('Invite sent again to ${u.c}')">Resend invite</button>`
              :u.role==="owner"?"":`<button class="btn ghost sm" onclick="event.stopPropagation();toggleUser('${u.id}')">${u.st==="disabled"?"Enable":"Disable"}</button>`}</td>
          </tr>`).join("")}</tbody></table>
          ${list.length===0?`<div style="text-align:center;padding:30px;color:var(--textDm);font-size:13px">No accounts with this role yet.</div>`:""}
        </div>
        <div class="card cardpad">
          <div class="cardhead"><div><h3>Roles and permissions</h3><div class="sub">Tap a box to change what a role can open. Owner is locked, and the two app roles are fixed.</div></div></div>
          <div style="overflow-x:auto"><table class="matrix"><thead><tr><th>Permission</th>${Object.keys(ROLES).map(r=>`<th style="text-align:center;color:${ROLES[r].c}">${ROLES[r].l}</th>`).join("")}</tr></thead>
          <tbody>${PERMS.map(([k,l])=>`<tr><td>${l}</td>${Object.keys(ROLES).map(r=>{const on=GRANTS[r].has(k),lock=["owner","barber","customer"].includes(r);
            return `<td class="c"><span class="tick ${on?"on":""} ${lock?"lock":""}" ${lock?"":`onclick="togglePerm('${r}','${k}')"`}>✓</span></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card cardpad">
          <div class="cardhead"><h3>How staff sign-in works</h3></div>
          ${[["1","The owner adds the account here","Name, the email or number they sign in with, role and branch."],["2","Staff sign in like everyone else","Google, Facebook or a phone code, on their own phone. Nothing extra to install."],["3","The app matches and applies the role","A matching account opens the barber app or this dashboard. Any other sign-in becomes a customer."]].map(([n,t,d])=>`
            <div style="display:flex;gap:11px;margin-bottom:13px"><div class="qnum" style="background:var(--acc)">${n}</div><div><div style="font-size:13px;font-weight:600">${t}</div><div style="font-size:12px;color:var(--textDm);line-height:1.5;margin-top:2px">${d}</div></div></div>`).join("")}
        </div>
        <div class="card cardpad" style="border-color:var(--borderHi)">
          <div class="cardhead"><h3>See it from another seat</h3></div>
          <div style="font-size:12.5px;color:var(--textMd);line-height:1.6">You're signed in as <b style="color:var(--app-text)">${ME.n}</b>, ${ROLES[ME.role].l}. Switch to ${other.n}, ${ROLES[other.role].l}, and the menu shrinks to what that role is allowed to open.</div>
          <button class="btn ghost" style="width:100%;margin-top:12px" onclick="switchMe()">View as ${other.n.split(" ")[0]}</button>
        </div>
      </div>
    </div>`;
  }

  if(WM.open){
    h+=`<div class="modal-bg" onclick="closeWalkIn()"><div class="modal" onclick="event.stopPropagation()">
      <div class="cardhead"><div><h3>Add walk-in</h3><div class="sub">Create a visit and place it directly in the selected barber's queue.</div></div><button class="tbtn" onclick="closeWalkIn()">✕</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="field"><label>Customer name <span class="dm">· optional</span></label><input id="wi-name" placeholder="Walk-in guest"></div>
        <div class="field"><label>Mobile number <span class="dm">· optional</span></label><input id="wi-contact" placeholder="For queue notifications"></div>
      </div>
      <div class="field"><label>Service</label><select id="wi-service">${SERVICES.map(s=>`<option value="${s.n}">${s.n} · ₱${s.p} · ${s.d}</option>`).join("")}</select></div>
      <div class="field"><label>Barber</label><select id="wi-barber">${BARBERS.map(b=>`<option value="${b.name.split(" ")[0]}">${b.name} · chair ${b.id} · ${b.busy?"busy":"available"}</option>`).join("")}</select></div>
      <div style="padding:11px 13px;border-radius:11px;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.22);font-size:12px;color:var(--textMd);line-height:1.5;margin-bottom:16px">The visit is marked <b style="color:#60A5FA">Walk-in</b>, added as <b>In queue</b>, and starts with ₱0 paid.</div>
      <div style="display:flex;gap:9px;justify-content:flex-end"><button class="btn ghost" onclick="closeWalkIn()">Cancel</button><button class="btn" onclick="saveWalkIn()">Add to queue</button></div>
    </div></div>`;
  }

  if(UM.open){
    const d=UM.draft, isNew=!UM.id;
    h+=`<div class="modal-bg" onclick="closeUser()"><div class="modal" onclick="event.stopPropagation()">
      <div class="cardhead"><div><h3>${isNew?"Add staff account":"Edit "+d.n}</h3><div class="sub">${isNew?"They get this role the moment they sign in with the account below.":"Changes apply on their next sign-in."}</div></div><button class="tbtn" onclick="closeUser()">✕</button></div>
      <div class="field"><label>Full name</label><input id="um-n" value="${d.n}" placeholder="e.g. Jomar Tan"></div>
      <div class="field"><label>Signs in with (email or mobile number)</label><input id="um-c" value="${d.c}" placeholder="name@gmail.com or 0917 000 0000"></div>
      <div class="field"><label>Role</label><div class="rolecards">${["barber","frontdesk","manager","owner"].map(r=>`<div class="rolecard ${d.role===r?"on":""}" onclick="umRole('${r}')"><b style="color:${ROLES[r].c}">${ROLES[r].l}</b><span>${ROLES[r].d}</span></div>`).join("")}</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="field"><label>Branch</label><select id="um-br">${["JP Laurel","Polomolok","Calumpang","All branches"].map(b=>`<option ${d.br===b?"selected":""}>${b}</option>`).join("")}</select></div>
        <div class="field"><label>${d.role==="barber"?"Title and chair":"Title"}</label><input id="um-t" value="${d.title||""}" placeholder="${d.role==="barber"?"e.g. Senior barber · chair 2":"e.g. Receptionist"}"></div>
      </div>
      <div style="display:flex;gap:9px;justify-content:flex-end;margin-top:4px"><button class="btn ghost" onclick="closeUser()">Cancel</button><button class="btn" onclick="saveUser()">${isNew?"Send invite":"Save changes"}</button></div>
    </div></div>`;
  }

  document.getElementById("content").innerHTML=h;
  if(!UM.open&&!WM.open)document.getElementById("content").scrollTop=0;
}

/* ---------- card boot ---------- */
if(!can(page)){location.replace(NAV_FILES.dashboard)}
render();
const bootEl=document.getElementById("boot");
if(sessionStorage.getItem("gb-booted")){bootEl.remove()}
else{sessionStorage.setItem("gb-booted","1");setTimeout(()=>{bootEl.classList.add("out");setTimeout(()=>bootEl.remove(),600)},2100)}
