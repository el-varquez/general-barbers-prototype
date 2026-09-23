/* Builds the general-barbers/ folder (Meridian structure) from the two prototype files. */
const fs=require('fs'),path=require('path');
const P='C:/Users/varqu/OneDrive/Documents/project/general barbers prototype';
const OUT=P+'/general-barbers';
const MER='C:/Users/varqu/Downloads/Meridian';
const SCR=P+'/general-barbers/uploads'; /* the extracted badge lives in uploads/ as logo-badge.png */
const mk=d=>fs.mkdirSync(d,{recursive:true});
const w=(f,s)=>{mk(path.dirname(OUT+'/'+f));fs.writeFileSync(OUT+'/'+f,s)};
const cp=(a,b)=>{mk(path.dirname(OUT+'/'+b));fs.copyFileSync(a,OUT+'/'+b)};
const must=(s,a)=>{if(!s.includes(a))throw new Error('anchor missing: '+a.slice(0,60));return s};
const rep=(s,a,b)=>must(s,a).split(a).join(b);

const mob=fs.readFileSync(P+'/general-barbers-mobile.html','utf8');
const web=fs.readFileSync(P+'/general-barbers-web.html','utf8');
const css=h=>h.match(/<style>([\s\S]*?)<\/style>/)[1];
const js=h=>h.match(/<script>([\s\S]*?)<\/script>/)[1];
const LOGO_RE=/url\("data:image\/png;base64,[^"]+"\)/g;

/* ---------- uploads ---------- */
cp('C:/Users/varqu/.claude/image-cache/6a3a0d84-9761-43fa-ad5e-94572c8501e4/1.png','uploads/general-barbers-logo.png');
/* uploads/logo-badge.png is kept in place */
cp(P+'/general-barbers-booking-flow.png','uploads/booking-flow.png');

/* ---------- presentation runtime (same JavaScript as Meridian) ---------- */
for(const f of ['deck-stage.js','ds-base.js','image-slot.js','support.js'])cp(MER+'/presentation/'+f,'presentation/'+f);

/* ---------- components/gb-art.js ---------- */
const mjs=js(mob);
const artStart=mjs.indexOf('/* ===== General Barbers — vector art library');
const artEndMark='return {C,branch,hero,stage,avatar,style,qr,viewfinder,ticket,stars};\n})();';
const artEnd=mjs.indexOf(artEndMark)+artEndMark.length;
if(artStart<0||artEnd<artEndMark.length)throw new Error('art lib not found');
const art=mjs.slice(artStart,artEnd);
w('components/gb-art.js','/* General Barbers — vector art library. Storefronts, hero, avatars, portfolio silhouettes, pseudo-QR, viewfinder, ticket.\n   Loaded by every app card and the specimen cards; exposes window.GB_ART. */\n'+art+'\nwindow.GB_ART=GB_ART;\n');

/* The app palettes reuse a few names the design system owns (--text, --border, --surface). Rename them so the
   app surfaces and the semantic tokens never shadow each other on the same page. */
const detox=s=>s.replace(/--text(?![A-Za-z0-9-])/g,'--app-text').replace(/--border(?![A-Za-z0-9-])/g,'--app-border').replace(/--surface(?![A-Za-z0-9-])/g,'--app-bg');
const stripArt=s=>{const a=s.indexOf('/* ===== General Barbers — vector art library');const e=s.indexOf(artEndMark);if(a<0||e<0)throw new Error('art lib not found');return s.slice(0,a)+s.slice(e+artEndMark.length)};

/* ---------- ui_kits/mobile/_app.css + _app.js ---------- */
let mcss=detox(css(mob)).replace(LOGO_RE,'url("../../uploads/logo-badge.png")').split('url("general-barbers/uploads/').join('url("../../uploads/');
mcss=rep(mcss,':root{\n  --pri:#24522F;','/* App palette: aliases onto the brand tokens (tokens/brand-general-barbers.css). */\n:root{\n  --pri:#24522F;');
mcss+=`
/* ---------- card mode: demo.js supplies the phone bezel; the app fills it ---------- */
body{background:var(--surface-page);color:var(--text)}
.dmb-aside,.dmb-aside .wcard h2,.dmb-aside .pts li{color:var(--pgText)}
.phone{width:100%;height:100%;border:0;border-radius:0;box-shadow:none;background:var(--app-bg);color:var(--app-text)}
.statusbar,.homebar{display:none}
.push{top:12px}
.dmb-aside{width:520px;max-width:42vw;display:flex;flex-direction:column;gap:14px;max-height:calc(100vh - 112px);overflow-y:auto;padding-right:4px}
.dmb-aside .ctl{background:var(--pgCard);border:1px solid var(--pgBorder);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:10px;align-items:center}
.dmb-aside .ctl .modeseg{background:var(--pgBg)}
.dmb-aside .pfoot{margin-top:0}
@media(max-width:720px){.dmb-aside{display:none}}
`;
w('ui_kits/mobile/_app.css','/* Customer + barber app styles. Consumes the brand tokens; the phone is dark by design regardless of page theme. */\n'+mcss);

let ajs=detox(stripArt(mjs));
ajs=rep(ajs,'render();\n','');
ajs+=`
/* ---------- card boot: every mobile card opens on a preset state, then stays interactive ---------- */
const PRESETS={
  launch:()=>{render()},
  welcome:()=>go("splash"),
  signin:()=>go("login"),
  home:()=>go("home"),
  branch:()=>go("branch"),
  barbers:()=>{S.branch=BRANCHES[0];go("barbers")},
  profile:()=>{S.branch=BRANCHES[0];S.barber=BARBERS[0];go("profileBarber")},
  cuts:()=>{S.branch=BRANCHES[0];S.barber=BARBERS[0];go("cuts")},
  custom:()=>{S.branch=BRANCHES[0];S.barber=BARBERS[0];S.cut=CUTS[9];go("custom")},
  slot:()=>{S.branch=BRANCHES[0];S.barber=BARBERS[0];S.cut=CUTS[1];go("slotpick")},
  checkout:()=>autoFill(),
  qr:()=>{autoFill();go("qr")},
  qrqueue:()=>{autoFill();go("qr");fdCheckIn()},
  qrdone:()=>{autoFill();go("qr");fdCheckIn();setMode("barber");B.sel="GB-0047";bDone();bScanned();bStart();bDone();setMode("customer");go("qr")},
  review:()=>{PRESETS.qrdone();fdComplete();go("review")},
  thanks:()=>{PRESETS.review();setStars(5);toggleTag("Clean fade");toggleTag("On time");submitReview()},
  mybookings:()=>{autoFill();go("qr");go("mybookings")},
  me:()=>go("profile"),
  bhome:()=>{autoFill();go("qr");fdCheckIn();setMode("barber")},
  bscan:()=>{PRESETS.bhome();bgo("bscan")},
  bbooking:()=>{PRESETS.bhome();bScanned()},
  bdone:()=>{PRESETS.bhome();B.sel="GB-0047";bDone()},
  breviews:()=>{PRESETS.thanks();setMode("barber");bgo("bprofile")},
};
window.GB={boot:function(name){(PRESETS[name]||PRESETS.launch)()}};
GB.boot(document.body.dataset.preset||"launch");
`;
w('ui_kits/mobile/_app.js','/* Customer + barber app runtime. Data, screens, the live booking state machine and the walkthrough copy.\n   Cards load ../../components/gb-art.js first, then this file, then set data-preset on <body>. */\n'+ajs);

/* ---------- ui_kits/desktop/_dash.css + _dash.js + _nav.js ---------- */
let dcss=detox(css(web)).replace(LOGO_RE,'url("../../uploads/logo-badge.png")');
dcss=rep(dcss,'html,body{height:100%}','html,body{height:100%}\n.boot.skip{display:none}');
dcss+='\n/* ---------- card mode: the shell follows the body height demo.js reserves for the demo bar ---------- */\n.side,.main{height:100%}\n';
w('ui_kits/desktop/_dash.css','/* Shop dashboard styles. Dark by design; consumes the brand tokens. */\n'+dcss);

const shell=detox(web.match(/<body>\n([\s\S]*?)<script>/)[1]);
let djs=detox(stripArt(js(web)));
djs=rep(djs,'let page="dashboard", scanned=null, filter="All";','let page=document.body.dataset.page||"dashboard", scanned=null, filter="All";');
djs=rep(djs,'function nav(p){page=p;scanned=null;filter="All";render()}','function nav(p){if(p===page){scanned=null;filter="All";render();return}location.href=NAV_FILES[p]||NAV_FILES.dashboard}');
djs=rep(djs,'let ME=PERSONAS[0], UM=','let ME=PERSONAS.find(p=>p.role===localStorage.getItem("gb-persona"))||PERSONAS[0], UM=');
djs=rep(djs,'function switchMe(){ME=PERSONAS.find(p=>p!==ME);if(!can(page))page="dashboard";scanned=null;UM.open=false;render();toast(`Now viewing as ${ME.n} (${ROLES[ME.role].l})`)}',
  'function switchMe(){ME=PERSONAS.find(p=>p!==ME);localStorage.setItem("gb-persona",ME.role);if(!can(page)){location.href=NAV_FILES.dashboard;return}scanned=null;UM.open=false;render();toast(`Now viewing as ${ME.n} (${ROLES[ME.role].l})`)}');
djs=rep(djs,'function togglePerm(r,k){const s=GRANTS[r];if(s.has(k))s.delete(k);else s.add(k);if(!can(page))page="dashboard";render()}',
  'function togglePerm(r,k){const s=GRANTS[r];if(s.has(k))s.delete(k);else s.add(k);if(!can(page)){location.href=NAV_FILES.dashboard;return}render()}');
djs=rep(djs,'render();\nconst bootEl=document.getElementById("boot");\nsetTimeout(()=>{bootEl.classList.add("out");setTimeout(()=>bootEl.remove(),600)},2100);',
`/* ---------- card boot ---------- */
if(!can(page)){location.replace(NAV_FILES.dashboard)}
render();
const bootEl=document.getElementById("boot");
if(sessionStorage.getItem("gb-booted")){bootEl.remove()}
else{sessionStorage.setItem("gb-booted","1");setTimeout(()=>{bootEl.classList.add("out");setTimeout(()=>bootEl.remove(),600)},2100)}`);
const shellJs='/* Shop dashboard runtime. Every desktop card injects the same shell (sidebar, top bar, boot screen, toast), then renders its page.\n   Cards load ../../components/gb-art.js and _nav.js first, then this file, and set data-page on <body>. */\n'+
 'document.body.insertAdjacentHTML("afterbegin",'+JSON.stringify(shell)+');\n'+djs;
w('ui_kits/desktop/_dash.js',shellJs);

w('ui_kits/desktop/_nav.js',`// Shared nav model for the clickable mock. Every sidebar item resolves to a real screen file.
const NAV_FILES={
  dashboard:'dashboard.card.html', scanner:'front-desk-scan.card.html', queue:'live-queue.card.html',
  bookings:'bookings.card.html', barbers:'barbers.card.html', services:'services.card.html',
  customers:'customers.card.html', sales:'sales.card.html', reports:'reports.card.html', users:'users-roles.card.html',
};
if(typeof module!=='undefined')module.exports={NAV_FILES};
`);

/* ---------- cards ---------- */
const MOBILE=[
 ['launch','launch','Customer','Launch','Loading screen on the shop\'s own green; the badge is the real logo'],
 ['welcome','welcome','Customer','Welcome','One promise, one button, the three branch names'],
 ['sign-in','signin','Customer','Sign in','Google, Facebook or a phone code; a matching staff account opens the barber app instead'],
 ['home','home','Customer','Home','Built for repeat customers: last barber, branches, quick services, and the live booking card'],
 ['branch','branch','Customer','Select branch','JP Laurel, Polomolok and Calumpang with hours and distance'],
 ['barbers','barbers','Customer','Select barber','Live availability per chair, or the next available barber'],
 ['barber-profile','profile','Customer','Barber profile','Booking, portfolio and verified reviews'],
 ['cuts','cuts','Customer','Select cut','Menu with pesos and minutes; custom cut carries notes and a photo'],
 ['custom-cut','custom','Customer','Custom cut','Describe it before you sit: notes plus a reference photo'],
 ['time-slot','slot','Customer','Pick a time','Taken slots stay visible so the shop looks busy'],
 ['checkout','checkout','Customer','Checkout and downpayment','50% downpayment via GCash or Maya; the balance is settled at the shop'],
 ['qr-status','qr','Customer','QR code and live status','Booked: show the code at the front desk; live status underneath'],
 ['qr-in-queue','qrqueue','Customer','In the queue','Checked in: position and estimated wait from the chair ahead'],
 ['qr-cut-done','qrdone','Customer','Cut done','The barber finished; settle the balance at the front desk'],
 ['review','review','Customer','Rate the barber','Push after completion: stars, quick tags, a note'],
 ['thanks','thanks','Customer','Review posted','The review is live on the barber\'s profile immediately'],
 ['my-bookings','mybookings','Customer','My bookings','Upcoming with live status, past with one-tap rebook'],
 ['profile','me','Customer','Customer account','Visits, spend, top barber: the customer database in the making'],
 ['barber-my-chair','bhome','Barber','My chair','Now cutting, up next in booking order, done today'],
 ['barber-scan','bscan','Barber','Scan at the chair','The same QR, scanned before the first snip'],
 ['barber-booking','bbooking','Barber','Start the cut','Notes, reference photo, downpayment status, Start cut'],
 ['barber-done','bdone','Barber','Mark as done','Hand-off to the front desk; the next customer is notified automatically'],
 ['barber-reviews','breviews','Barber','My reviews','Verified ratings land on the barber\'s phone'],
];
for(const [file,preset,group,name,sub] of MOBILE){
  const html=`<!-- @dsCard group="Mobile — ${group}" viewport="390x800" subtitle="${sub.replace(/"/g,'&quot;')}" name="${name}" -->
<!doctype html><html data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${name} — General Barbers</title>
<meta name="theme-color" content="#0b140f">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="General Barbers">
<link rel="manifest" href="../../manifest.json">
<link rel="apple-touch-icon" href="../../uploads/apple-touch-icon.png">
<link rel="icon" type="image/png" href="../../uploads/icon-192.png">
<link rel="stylesheet" href="../../styles.css"><link rel="stylesheet" href="_app.css"></head>
<body data-preset="${preset}">
<div class="phone">
  <div class="screen" id="screen"></div>
  <div id="push"></div>
  <div id="navbar"></div>
  <button class="mfab" onclick="toggleSheet()" title="Prototype controls">|||</button>
  <div class="msheet" id="msheet"><div class="msheet-bg" onclick="toggleSheet(false)"></div><div class="msheet-body"><div class="handle"></div><div id="msheet-content"></div></div></div>
</div>
<aside class="dmb-aside">
  <div class="ctl"><div class="modeseg" id="modeseg"></div><div class="pfoot" id="foot"></div></div>
  <div class="walk" id="walk"></div>
</aside>
<script src="../../components/gb-art.js"></script>
<script src="_app.js"></script>
<script src="../../demo.js"></script>
</body></html>
`;
  w(`ui_kits/mobile/${file}.card.html`,html);
}
const DESK=[
 ['dashboard','dashboard','Dashboard','Today\'s bookings, revenue, live queue and barbers at a glance'],
 ['front-desk-scan','scanner','Front desk scan','Check customers in on arrival; collect the balance and complete after the cut'],
 ['live-queue','queue','Live queue','One queue per chair: call, check in, start, mark done, no-show; every action notifies the customer'],
 ['bookings','bookings','Visits','Online bookings and walk-ins across every status'],
 ['barbers','barbers','Barbers','Staff, availability and performance per chair'],
 ['services','services','Services','Menu and pricing shown in the customer app'],
 ['customers','customers','Customers','The customer database built from bookings'],
 ['sales','sales','Sales','Downpayments, balances and the payment split'],
 ['reports','reports','Reports','Peak hours, service popularity, no-show rate'],
 ['users-roles','users','Users and roles','Staff accounts, the permissions matrix, and view-as for another seat'],
];
for(const [file,page,name,sub] of DESK){
  const html=`<!-- @dsCard group="Desktop" viewport="1440x900" subtitle="${sub.replace(/"/g,'&quot;')}" name="${name}" -->
<!doctype html><html data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${name} — General Barbers dashboard</title>
<meta name="theme-color" content="#0b140f"><link rel="icon" type="image/png" href="../../uploads/icon-192.png">
<link rel="stylesheet" href="../../styles.css"><link rel="stylesheet" href="_dash.css"></head>
<body data-page="${page}">
<script src="../../components/gb-art.js"></script>
<script src="_nav.js"></script>
<script src="_dash.js"></script>
<script src="../../demo.js"></script>
</body></html>
`;
  w(`ui_kits/desktop/${file}.card.html`,html);
}
console.log('derived files written to',OUT);
