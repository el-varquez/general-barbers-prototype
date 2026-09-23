/* Customer + barber app runtime. Data, screens, the live booking state machine and the walkthrough copy.
   Cards load ../../components/gb-art.js first, then this file, then set data-preset on <body>. */



const BRANCHES=[
 {id:1,name:"JP Laurel",tag:"Main branch",addr:"Corner Abdawa St",hours:"9AM–9PM",barbers:4,dist:"0.8 km"},
 {id:2,name:"Polomolok",tag:"",addr:"National Highway",hours:"10AM–8PM",barbers:3,dist:"12.3 km"},
 {id:3,name:"Calumpang",tag:"New",addr:"Calumpang Road",hours:"10AM–8PM",barbers:2,dist:"4.1 km"},
];
const BARBERS=[
 {id:1,name:"Jay Reyes",role:"Senior barber",rating:4.9,reviews:114,emoji:"💈",pic:"jay",avail:"Available now",busy:false,cuts:847,years:6},
 {id:2,name:"Mark Santos",role:"Barber",rating:4.7,reviews:89,emoji:"✂️",pic:"mark",avail:"Available now",busy:false,cuts:612,years:4},
 {id:3,name:"Ken Flores",role:"Senior barber",rating:4.8,reviews:96,emoji:"💇",pic:"ken",avail:"10:30 AM",busy:true,cuts:723,years:5},
 {id:4,name:"Rico Cruz",role:"Junior barber",rating:4.6,reviews:41,emoji:"🧑",pic:"rico",avail:"11:00 AM",busy:true,cuts:298,years:2},
];
const CUTS=[
 {id:1,name:"Regular haircut",price:150,time:"30 min",cat:"Haircut",popular:true},
 {id:2,name:"Skin fade",price:200,time:"40 min",cat:"Haircut",popular:true},
 {id:3,name:"Low taper fade",price:200,time:"40 min",cat:"Haircut"},
 {id:4,name:"Undercut",price:180,time:"35 min",cat:"Haircut"},
 {id:5,name:"Buzz cut",price:100,time:"15 min",cat:"Haircut"},
 {id:6,name:"Beard trim",price:80,time:"15 min",cat:"Beard"},
 {id:7,name:"Beard sculpt",price:120,time:"20 min",cat:"Beard"},
 {id:8,name:"Haircut + beard",price:250,time:"50 min",cat:"Combo",popular:true},
 {id:9,name:"Hot towel shave",price:150,time:"25 min",cat:"Shave"},
 {id:10,name:"Custom cut",price:200,time:"45 min",cat:"Custom",custom:true},
];
const SLOTS=["9:00","9:30","10:00","10:30","11:00","11:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00"];
const TAKEN=["9:00","10:00","1:00","3:30"];
const DATES=[{d:1,w:"Mon"},{d:2,w:"Tue"},{d:3,w:"Wed"},{d:4,w:"Thu"},{d:5,w:"Fri"},{d:6,w:"Sat"},{d:7,w:"Sun"}];
const REVIEWS=[
 {n:"Carlo M.",t:"Best skin fade in GenSan. Jay never misses.",r:5,a:"2 days ago"},
 {n:"Miguel S.",t:"Always consistent, solid cuts every time.",r:5,a:"1 week ago"},
 {n:"Andrei L.",t:"Clean fade, friendly service. Balik ako next month.",r:4,a:"2 weeks ago"},
];

/* ---------- walkthrough copy ---------- */
const WALK={
 loading:{step:"Step 0 — Launch",title:"Loading screen",
  lede:"The first thing a customer sees is the General Barbers badge on the shop's own green, exactly as it appears on the signage and the Facebook page.",
  pts:["The badge is the real logo, not a placeholder icon, so the app feels like the shop's own from the first frame.","One progress bar covers the time the app needs to fetch branches, barbers and today's availability.","It runs for about two seconds, then moves to the welcome screen on its own. Tapping anywhere skips it."],
  pitch:"Customers recognise the badge before they read a single word. That recognition is what makes the app feel official rather than like a third-party booking tool.",
  tags:["Brand recognition","First impression"]},

 login:{step:"Step 2 — Sign in",title:"One-tap sign in",
  lede:"Google or Facebook sign-in, or a phone number with a code. No passwords to remember, no forms to fill.",
  pts:["Most GenSan customers already have a Facebook account, so sign-in is a single tap.","Everyone who signs in gets the Customer role. Staff never create their own accounts: the owner adds them under Users &amp; roles in the dashboard, and a matching sign-in opens the barber app instead.","Phone number sign-in covers customers who would rather not connect a social account."],
  pitch:"Every sign-in is a real customer record with a contact number. That is the beginning of the customer database the shop has never had.",
  tags:["OAuth","Low friction"]},

 splash:{step:"Step 1 — Welcome",title:"First open",
  lede:"The landing screen sets the tone before anything functional happens. Dark green canvas, big promise, one button.",
  pts:["A single call to action — no sign-up wall, no menu to parse.","The three branch names sit at the bottom so returning customers immediately recognise the shop.","Brand green is used as the accent on near-black, which is what gives it the premium feel rather than a plain white app."],
  pitch:"Most GenSan barbershops live inside a Facebook page. Opening a dedicated app already signals that General Barbers operates at a different level than the shop down the street.",
  tags:["Brand identity","One-tap entry"]},

 home:{step:"Step 3 — Home",title:"Everything one tap away",
  lede:"The home screen is built around repeat customers, not first-timers. The fastest path to a booking is always visible.",
  pts:["<b>Last visited barber</b> with an inline Book button — for a regular, this is the whole app.","<b>Branch carousel</b> scrolls horizontally with distance shown, so customers pick by proximity.","<b>Quick services</b> surfaces the two or three cuts that make up most of the shop's volume.","Bottom nav gives access to bookings, services and profile without going back."],
  pitch:"A returning customer can rebook their usual cut in two taps. That is the single biggest driver of repeat visits, and it's impossible with Messenger booking.",
  tags:["Repeat bookings","Branch discovery"]},

 branch:{step:"Step 4 — Branch",title:"Pick a location",
  lede:"Each branch gets a full card with its own hours, barber count and distance from the customer.",
  pts:["Distance is calculated from the phone's location, so the nearest shop naturally ranks first in the customer's mind.","Operating hours are per branch — Polomolok and Calumpang open later than the main shop.","Tagging the main branch and any new location helps steer traffic where the shop wants it."],
  pitch:"Once General Barbers opens a fourth branch, it appears here instantly. No new signage, no separate Facebook page, no retraining customers.",
  tags:["Multi-branch","Location aware"]},

 barbers:{step:"Step 5 — Barber",title:"Choose who cuts",
  lede:"Customers either have a barber they trust, or they just want the next free chair. Both paths are one tap.",
  pts:["<b>Next available</b> sits at the top for customers in a hurry — this is the walk-in equivalent.","Each barber shows a live status: green dot and 'Free now', or the time they open up.","Ratings and review counts are visible before the customer commits."],
  pitch:"Barbers with the strongest ratings naturally attract more bookings, which creates healthy internal competition and gives the owner real performance data.",
  tags:["Barber choice","Live availability"]},

 profileBarber:{step:"Step 6 — Barber profile",title:"Booking, portfolio, reviews",
  lede:"The barber's page carries three tabs. Booking is the default; portfolio and reviews are there to build confidence.",
  pts:["<b>Booking tab</b> — horizontal date strip, then time slots. Taken slots are visibly greyed out.","<b>Portfolio tab</b> — a grid of the barber's previous work, shown as style illustrations until the barber uploads real photos.","<b>Reviews tab</b> — customer feedback tied to that specific barber, not the shop as a whole.","Cuts-done and years-experience counters add credibility at a glance."],
  pitch:"Giving each barber a public portfolio turns them into a personal brand. Barbers will promote the app themselves because it directly builds their own following.",
  tags:["Portfolio","Social proof","Slot picking"]},

 cuts:{step:"Step 7 — Service",title:"Select the cut",
  lede:"The full service menu with category filters, prices in pesos, and duration on every row.",
  pts:["Category pills narrow the list — Haircut, Beard, Combo, Shave, Custom.","Duration drives the slot engine: a 50-minute combo blocks more of the barber's calendar than a 15-minute buzz cut.","Popular services are tagged so newcomers aren't paralysed by the full list."],
  pitch:"Transparent pricing removes the awkward 'magkano?' conversation and reduces price disputes at the counter.",
  tags:["Transparent pricing","Duration logic"]},

 custom:{step:"Step 7b — Custom cut",title:"Describe it before you sit",
  lede:"For anything outside the standard menu, the customer writes it down or uploads a reference photo.",
  pts:["The note travels with the booking and appears on the shop dashboard before the customer walks in.","A reference photo removes the guesswork that causes most bad haircuts.","Shy customers who struggle to describe what they want get a way to communicate without pressure."],
  pitch:"This is the feature that solves an actual, daily frustration for both sides of the chair. It's the one worth demoing first.",
  tags:["Reference photo","Fewer redo cuts"]},

 slotpick:{step:"Step 8 — Time",title:"Pick a slot",
  lede:"Date strip on top, available times below. Booked slots are disabled, not hidden.",
  pts:["Showing taken slots as struck-through creates useful urgency — the customer sees the shop is busy.","Availability is derived from the chosen barber's existing bookings plus the selected service duration.","Selecting a date and time is the last decision before payment."],
  pitch:"This is what turns a menu into a booking system. Without it there's no way to smooth out the dead hours between the morning and evening rush.",
  tags:["Real availability","Load balancing"]},

 checkout:{step:"Step 9 — Checkout",title:"Confirm and pay the downpayment",
  lede:"A complete summary, a 50% downpayment, and the two payment rails everyone in GenSan already uses.",
  pts:["Every choice is restated so mistakes are caught before money moves.","<b>50% downpayment</b> via GCash or Maya; the balance is settled at the shop.","Custom cut notes are carried into the summary."],
  pitch:"The downpayment is the anti-no-show mechanism. A customer who has paid ₱100 shows up. This is the number to lead with when pitching the owner.",
  tags:["GCash / Maya","No-show protection"]},

 qr:{step:"Step 10 — QR and live status",title:"One code, scanned three times",
  lede:"The booking becomes a QR code. The front desk scans it on arrival, the barber scans it at the chair, and the front desk scans it once more to settle the balance.",
  pts:["The live status list updates as each scan happens: booked, in queue, in the chair, cut done, completed.","In the queue, the app shows position and estimated wait, worked out from the customer in the chair and everyone ahead. When the chair frees up, the phone gets <b>Your chair is ready</b>. If they haven't checked in yet, it says to check in first.","The QR encodes only a booking reference — all validation happens server-side, so a screenshot can't be forged into a free cut.","Use the front desk buttons under the phone to simulate the dashboard scans, and switch to the barber app to mark the cut ahead as done and watch this phone get called."],
  pitch:"Every scan is a timestamp. The shop gets real wait times, real cut durations and a clean record of every peso collected, without anyone writing anything down.",
  tags:["Live status","Timestamped visits"]},

 review:{step:"Step 11 — Review",title:"Rate the barber, not the shop",
  lede:"When the front desk completes the booking, the customer's phone gets a push notification asking for a quick rating of that specific barber.",
  pts:["Stars and quick tags make a review a five-second job, so more customers actually leave one.","The review is tied to the barber and the exact cut, and it appears on their profile straight away.","The prompt is optional. Skipping it never blocks anything."],
  pitch:"Ratings collected right after a completed, paid visit are honest and verified. That is the social proof that fills each barber's calendar.",
  tags:["Verified reviews","Barber ranking"]},

 thanks:{step:"Step 11 — Review",title:"Review posted",
  lede:"The review is live immediately on the barber's profile and inside the barber's own app.",
  pts:["The customer sees the review they just posted, so the app feels responsive rather than like a black hole.","The barber's review count updates in real time.","Jump to the barber's profile to see it at the top of the reviews tab, or switch to the barber app and open My reviews."],
  pitch:"Barbers who see reviews land on their own phones will ask customers to rate them. The shop gets its marketing done by the people with the most to gain from it.",
  tags:["Instant feedback","Barber motivation"]},

 mybookings:{step:"Extra — My bookings",title:"Upcoming and past",
  lede:"Customers manage their own appointments instead of messaging the shop to change them.",
  pts:["Upcoming bookings can be rescheduled or the QR pulled back up.","Past visits carry a <b>Rebook</b> shortcut that refills barber, cut and branch in one tap.","Self-service rescheduling frees the slot automatically instead of leaving it dead."],
  pitch:"Every reschedule handled here is a Messenger conversation the staff never has to have.",
  tags:["Self-service","Rebooking"]},

 profile:{step:"Extra — Profile",title:"Customer account",
  lede:"Visit history, spend, and preferences — the beginning of a real customer database.",
  pts:["Total cuts and lifetime spend give the shop the basis for a loyalty programme.","Top barber is tracked automatically from booking history.","Payment methods and notification settings live here."],
  pitch:"After a few months this becomes the shop's most valuable asset: a list of real customers with contact details and spending history that no Facebook page can give them.",
  tags:["Customer data","Loyalty groundwork"]},

 /* ---- barber app ---- */
 bhome:{step:"Barber 1 — My chair",title:"The barber's day at a glance",
  lede:"Each barber signs into the same app with a staff account and sees only their own chair: who is next, what they booked, and how the day is going.",
  pts:["<b>Now cutting</b> shows who is in the chair with a one-tap Mark as done.","<b>Up next</b> is the barber's own queue in booking order. Green means checked in at the front desk; grey means they haven't arrived yet.","When a cut is marked done, the next customer's phone is notified automatically: come to the chair, or check in first if they haven't."],
  pitch:"Barbers stop asking the counter who is next, and customers stop hovering by the chair. The queue calls people itself.",
  tags:["Staff view","Own chair only"]},

 bscan:{step:"Barber 2 — Scan",title:"Scan at the chair",
  lede:"The barber scans the customer's QR before picking up the clippers. That one scan opens the booking and proves the right customer is in the right chair.",
  pts:["It is the same QR the front desk scanned, so the customer never needs a second code.","Scanning shows the name and service before any status changes, so a wrong customer is caught immediately.","Works with the phone camera. No extra hardware."],
  pitch:"This scan is what makes the start time of the cut real, and it stops a booking from being started by the wrong barber.",
  tags:["Chair-side scan","Right customer, right chair"]},

 bdetail:{step:"Barber 3 — Start the cut",title:"Notes, reference photo, start",
  lede:"Everything the barber needs before the first snip: the service, the customer's notes, and the reference photo they uploaded.",
  pts:["<b>Start cut</b> moves the status to In the chair, which the customer and the front desk see instantly.","Custom cut notes written during booking show up here, so nothing is lost between the app and the chair.","When the cut is finished, <b>Mark as done</b> tells the front desk the balance can be collected."],
  pitch:"The barber never has to ask 'what did you want again?'. Fewer redo cuts, and every cut has a real start and finish time.",
  tags:["Custom notes","Start and finish"]},

 bdone:{step:"Barber 4 — Mark done",title:"Hand off to the front desk",
  lede:"Marking the cut done closes the barber's part. The customer settles the balance at the counter and the barber is free for the next chair.",
  pts:["The status becomes Cut done and the customer's app tells them what to pay.","The next customer in this barber's queue is notified at the same moment: <b>Your chair is ready</b> if they're checked in, or <b>check in at the front desk first</b> if they're not.","The front desk's final scan collects the balance and completes the booking."],
  pitch:"Barbers never handle money and never shout names across the shop. Every peso goes through the front desk scan, and every customer is called by their phone.",
  tags:["Hand-off","No cash at the chair"]},

 bprofile:{step:"Barber 5 — Reviews",title:"Reviews land on the barber's phone",
  lede:"Ratings from completed bookings show up here the moment the customer posts them.",
  pts:["Only customers with a completed, paid booking can review, so every rating is verified.","The newest review is highlighted so the barber sees what changed.","The same rating drives the barber's position in the customer app."],
  pitch:"When barbers can see their own rating move, they start asking customers to review them. That is free marketing with the right incentive built in.",
  tags:["Verified ratings","Motivation"]},
};

const FLOW=[
 ["loading","Launch"],["splash","Welcome"],["login","Sign in"],["home","Home"],["branch","Select branch"],["barbers","Select barber"],
 ["profileBarber","Barber profile"],["cuts","Select cut"],["slotpick","Pick time"],
 ["checkout","Checkout + downpayment"],["qr","QR code + live status"],["review","Rate the barber"],
];
const BFLOW=[
 ["bhome","My chair"],["bscan","Scan customer QR"],["bdetail","Start the cut"],["bdone","Mark as done"],["bprofile","My reviews"],
];

const STATUS={
 pending:{l:"Booked",c:"rgba(255,255,255,.6)",bg:"rgba(255,255,255,.08)",lc:"#67725F",lbg:"#EEF1EC",who:"Customer pays the downpayment"},
 queued:{l:"In queue",c:"#4DB56A",bg:"rgba(77,181,106,.15)",lc:"#24522F",lbg:"rgba(36,82,47,.1)",who:"Front desk scans the QR on arrival"},
 "in-progress":{l:"In the chair",c:"#F59E0B",bg:"rgba(245,158,11,.15)",lc:"#9A6206",lbg:"rgba(245,158,11,.14)",who:"Barber scans the QR and starts the cut"},
 done:{l:"Cut done",c:"#60A5FA",bg:"rgba(96,165,250,.14)",lc:"#1D4ED8",lbg:"rgba(59,130,246,.12)",who:"Barber marks the cut done"},
 complete:{l:"Completed",c:"#9FD3AE",bg:"rgba(159,211,174,.12)",lc:"#3A6B47",lbg:"rgba(36,82,47,.08)",who:"Front desk scans again and collects the balance"},
};
const ORDER=Object.keys(STATUS);
const rank=s=>ORDER.indexOf(s);
const spill=s=>{const m=STATUS[s]||STATUS.pending;return `<span class="stpill" style="background:${m.bg};color:${m.c}">${m.l}</span>`};
const first=n=>String(n).split(" ")[0];
const addMin=(slot,mins)=>{let[h,m]=slot.split(":").map(Number);let t=((h<9?h+12:h)*60+m+mins)%1440;let hh=Math.floor(t/60),mm=t%60;const ap=hh>=12?"PM":"AM";hh=hh%12||12;return hh+":"+String(mm).padStart(2,"0")+" "+ap};
const ampm=s=>addMin(s,0);

let S={screen:"loading",branch:null,barber:null,cut:null,slot:null,date:1,cat:"All",btab:"booking",note:""};
let loadTimer=null;
let MODE="customer", BK=null, B={screen:"bhome",scanned:false,sel:null,lastNext:null}, RV={stars:0,tags:[],text:""};

/* ---- the barber's chair for today: canned bookings plus the customer's live one ---- */
let CHAIR=[], NOTIFS=[];
const mkB=(id,customer,phone,cutName,slot,status,extra)=>Object.assign({id,customer,phone,cut:CUTS.find(x=>x.name===cutName),slot,note:"",status,startedAt:null,doneAt:null,live:false,visits:3,off:4,notified:null,callout:null},extra||{});
function ensureBK(){
  if(BK)return BK;
  const barber=(S.barber&&S.barber.id)?S.barber:BARBERS[0];
  BK={id:"GB-0048",customer:"El Varquez",phone:"0917 ••• 4823",barber,cut:S.cut||CUTS[1],slot:S.slot||"2:00",date:S.date||3,
      branch:S.branch||BRANCHES[0],note:S.note||"",status:"pending",reviewed:false,startedAt:null,doneAt:null,live:true,visits:12,off:4,notified:null,callout:null,push:null};
  CHAIR=[mkB("GB-0041","Carlo Mendoza","0917 ••• 2201","Skin fade","9:00","complete",{visits:14}),
         mkB("GB-0043","James Robles","0999 ••• 1180","Low taper fade","10:00","complete",{visits:9}),
         mkB("GB-0047","Luis Cabrera","0917 ••• 4407","Regular haircut","1:00","in-progress",{visits:6,off:36}),
         mkB("GB-0049","Paolo Dizon","0927 ••• 8816","Buzz cut","3:30","pending",{visits:2}),
         BK];
  CHAIR.forEach(x=>{if(x.status==="in-progress"&&!x.startedAt)x.startedAt=addMin(x.slot,x.off)});
  return BK;
}
const smin=t=>{let[h,m]=t.split(":").map(Number);return (h<9?h+12:h)*60+m};
const dur=x=>parseInt(x.cut.time,10);
const chairSorted=()=>CHAIR.slice().sort((a,b)=>smin(a.slot)-smin(b.slot));
const inChair=()=>CHAIR.find(x=>x.status==="in-progress");
const waiting=()=>chairSorted().filter(x=>["pending","queued"].includes(x.status));
const nextUp=()=>waiting()[0];
const selB=()=>CHAIR.find(x=>x.id===B.sel)||ensureBK();
const initials=n=>n.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase();
const avatarFor=(x,r=28,sz=54)=>x.live?`<div class="av pic" style="width:${sz}px;height:${sz}px">${GB_ART.avatar('el',{round:r})}</div>`:`<div class="av" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.28)}px;font-weight:700">${initials(x.customer)}</div>`;
function queueInfo(x){const w=waiting(),pos=w.indexOf(x)+1,cur=inChair();let eta=cur?Math.max(5,Math.round(dur(cur)*.4)):0;for(let i=0;i<pos-1;i++)eta+=dur(w[i]);return {pos,eta,cur}}
function sendPush(x,title,body,kind,at){x.notified=at;x.callout=body;if(x===BK)BK.push={title,body,kind};NOTIFS.unshift({t:at,c:x.customer,msg:body})}
function notifyNext(at){
  const n=nextUp();if(!n)return null;
  const chair=`${first(BK.barber.name)}'s chair`, ready=n.status==="queued";
  sendPush(n,ready?"Your chair is ready":"You're up next",ready?`Your chair is ready. Go to ${chair} now.`:`You're up next. Check in at the front desk first, then go to ${chair}.`,"queue",at);
  return n;
}
function clearTimer(){if(loadTimer){clearTimeout(loadTimer);loadTimer=null}}
function go(s){clearTimer();if(s==="qr")ensureBK();S.screen=s;render();document.getElementById("screen").scrollTop=0}
function reset(){
  clearTimer();
  S={screen:"loading",branch:null,barber:null,cut:null,slot:null,date:1,cat:"All",btab:"booking",note:""};
  BK=null;CHAIR=[];NOTIFS=[];B={screen:"bhome",scanned:false,sel:null,lastNext:null};RV={stars:0,tags:[],text:""};MODE="customer";
  for(let i=REVIEWS.length-1;i>=0;i--)if(REVIEWS[i].fresh)REVIEWS.splice(i,1);
  BARBERS.forEach(b=>{if(b._rv!=null)b.reviews=b._rv});
  }
function setMode(m){if(m===MODE)return;MODE=m;if(m==="barber")ensureBK();render();document.getElementById("screen").scrollTop=0}
function bgo(s,id){B.screen=s;if(id)B.sel=id;if(s!=="bdetail"&&s!=="bdone")B.scanned=false;render();document.getElementById("screen").scrollTop=0}
function bScanned(){ensureBK();B.scanned=true;B.sel=BK.id;B.screen="bdetail";render()}
function openPush(){const p=BK.push;BK.push=null;go(p&&p.kind==="review"?"review":"qr")}
function bStart(){const x=selB(),cur=inChair();if(cur&&cur!==x)return;
  if(rank(x.status)<rank("in-progress")){x.status="in-progress";x.startedAt=addMin(x.slot,x.off);x.callout=null;if(x===BK&&BK.push&&BK.push.kind==="queue")BK.push=null}render()}
function bDone(){const x=selB();if(x.status==="in-progress"){x.status="done";x.doneAt=addMin(x.slot,x.off+dur(x));B.lastNext=notifyNext(x.doneAt)}else B.lastNext=null;bgo("bdone",x.id)}
function bCall(){const x=selB(),ready=x.status==="queued",chair=`${first(BK.barber.name)}'s chair`;
  sendPush(x,ready?"Your chair is ready":"You're up next",ready?`Your chair is ready. Go to ${chair} now.`:`You're up next. Check in at the front desk first, then go to ${chair}.`,"queue","just now");render()}
function fdCheckIn(){const bk=ensureBK();if(bk.status!=="pending")return;
  bk.status="queued";bk.callout=null;if(bk.push&&bk.push.kind==="queue")bk.push=null;
  if(!inChair()&&nextUp()===bk)sendPush(bk,"Your chair is ready",`Your chair is ready. Go to ${first(bk.barber.name)}'s chair now.`,"queue","on check-in");
  render()}
function fdComplete(){const bk=ensureBK();if(bk.status!=="done")return;bk.status="complete";bk.callout=null;
  sendPush(bk,`Your cut with ${first(bk.barber.name)} is complete`,"Thanks for visiting. Tap to rate your visit.","review",bk.doneAt||"now");render()}
function setStars(n){RV.stars=n;render()}
function toggleTag(t){const i=RV.tags.indexOf(t);if(i>-1)RV.tags.splice(i,1);else RV.tags.push(t);render()}
function submitReview(){
  const bk=ensureBK(), txt=RV.text.trim()||(RV.tags.length?RV.tags.join(", ")+".":"Great cut, will be back.");
  REVIEWS.unshift({n:"El V.",t:txt,r:RV.stars||5,a:"Just now",fresh:true});
  if(bk.barber._rv==null)bk.barber._rv=bk.barber.reviews;
  bk.barber.reviews++;bk.reviewed=true;go("thanks");
}
function pick(k,v){S[k]=v;render()}
function autoFill(){
  S.branch=BRANCHES[0];S.barber=BARBERS[0];S.cut=CUTS[1];S.slot="2:00";S.date=3;
  go("checkout");
}
function slotFromProfile(s){S.slot=s;render()}
function slotFromPick(s){S.slot=s;go("checkout")}
function chooseCut(id){
  const c=CUTS.find(x=>x.id===id);S.cut=c;
  if(c.custom)go("custom"); else if(!S.slot)go("slotpick"); else go("checkout");
}
function afterCustom(){if(!S.slot)go("slotpick");else go("checkout")}
function navTo(id){
  if(id==="home")go("home");
  else if(id==="cuts")go("branch");
  else if(id==="bookings")go("mybookings");
  else go("profile");
}

const header=(t,back,right)=>`<div class="hd"><div class="hd-l">
  ${back?`<button class="iconbtn" onclick="go('${back}')">←</button>`:""}<h2>${t}</h2></div>${right||""}</div>`;
const bheader=(t,back)=>`<div class="hd"><div class="hd-l">
  ${back?`<button class="iconbtn" onclick="bgo('${back}')">←</button>`:""}<h2>${t}</h2></div></div>`;
const reviewCard=r=>`<div class="card" style="padding:14px;margin-bottom:8px;${r.fresh?"border-color:var(--borderLt)":""}">
  <div style="display:flex;justify-content:space-between;margin-bottom:5px;align-items:center">
    <span style="font-weight:600;font-size:13px">${r.n}${r.fresh?' <span class="badge" style="font-size:9px;margin-left:4px">New</span>':""}</span><span class="muted">${r.a}</span></div>
  <div style="color:var(--warn);font-size:12px;margin-bottom:5px">${"★".repeat(r.r)}${"☆".repeat(5-r.r)}</div>
  <div style="font-size:13px;color:var(--textMd);line-height:1.5">${r.t}</div></div>`;
const bnav=a=>`<div class="bottomnav">${[["bhome","✂","My chair"],["bscan","▣","Scan"],["bprofile","★","Reviews"]]
  .map(([id,i,l])=>`<button class="${a===id?"on":""}" onclick="bgo('${id}')">${i}<span>${l}</span></button>`).join("")}</div>`;

const dateStrip=()=>`<div class="muted" style="margin-bottom:8px">September 2026</div>
  <div class="hrow" style="padding-bottom:10px">${DATES.map(d=>
  `<button class="datecell ${S.date===d.d?"on":""}" onclick="pick('date',${d.d})">
    <div class="dw">${d.w}</div><div class="dn">${d.d}</div></button>`).join("")}</div>`;

const slotGrid=fn=>`<div class="muted" style="margin-bottom:8px">Available times</div>
  <div style="display:flex;flex-wrap:wrap;gap:6px">${SLOTS.map(s=>{
  const tk=TAKEN.includes(s);
  return `<button class="slot ${S.slot===s?"on":""}" ${tk?"disabled":""} onclick="${fn}('${s}')">${s}</button>`;
  }).join("")}</div>`;

const navbar=a=>`<div class="bottomnav">${
  [["home","⌂","Home"],["bookings","📅","Bookings"],["cuts","✂","Services"],["profile","👤","Profile"]]
  .map(([id,i,l])=>`<button class="${a===id?"on":""}" onclick="navTo('${id}')">${i}<span>${l}</span></button>`).join("")}</div>`;

function render(){
  const el=document.getElementById("screen"), nb=document.getElementById("navbar");
  nb.innerHTML=""; let h="";
  if(MODE==="barber"){renderBarber();return}

  if(S.screen==="loading"){
    h=`<div class="loadscreen" onclick="go('splash')">
      <div class="ls-badge"><i class="gblogo"></i></div>
      <div class="ls-foot">
        <div class="ls-bar"><i></i></div>
        <div class="ls-cap">Opening the shop</div>
        <div class="ls-sub">JP Laurel, Polomolok and Calumpang</div>
      </div>
    </div>`;
    loadTimer=setTimeout(()=>{if(S.screen==="loading")go('splash')},2700);
  }

  else if(S.screen==="splash"){
    h=`<div class="splashroot hero-photo" style="flex:1;display:flex;flex-direction:column;padding:0 24px 26px">
      <div style="margin-bottom:auto"></div>
      <div style="margin-bottom:30px">
        <div class="splash-h">Your style,<br>your barber,<br><span style="color:var(--acc)">just one tap.</span></div>
        <p style="font-size:14px;color:var(--textMd);line-height:1.6">Book your next fresh cut at any General Barbers branch. Pick your barber, pick your time.</p>
      </div>
      <button class="btn" onclick="go('login')">Get started&nbsp; →</button>
      <div style="display:flex;justify-content:center;gap:20px;margin-top:18px">${BRANCHES.map(b=>`<span class="muted">📍 ${b.name}</span>`).join("")}</div>
    </div>`;
  }

  else if(S.screen==="login"){
    h=`<div class="splashroot hero-photo lower" style="flex:1;display:flex;flex-direction:column;padding:0 24px 26px">
      <div style="text-align:center;padding-top:30px"><i class="gblogo" style="width:136px;margin:0 auto;filter:drop-shadow(0 10px 24px rgba(0,0,0,.5))"></i></div>
      <div style="margin-top:auto">
        <div style="font-size:24px;font-weight:700;margin-bottom:6px">Sign in to book</div>
        <p style="font-size:13.5px;color:var(--textMd);line-height:1.55;margin-bottom:22px">One tap. Your account only keeps your bookings, receipts and favourite barber together.</p>
        <button class="oauth g" onclick="go('home')"><span class="lg" style="color:#4285F4;border:1px solid #e6e6e6">G</span>Continue with Google</button>
        <button class="oauth fb" onclick="go('home')"><span class="lg" style="color:#1877F2">f</span>Continue with Facebook</button>
        <div class="divider">or use your number</div>
        <div class="input"><span style="color:var(--app-text)">+63</span><span style="flex:1">917 000 0000</span></div>
        <button class="btn ghost" style="margin-top:10px" onclick="go('home')">Send code</button>
        <div class="muted" style="text-align:center;margin-top:14px;line-height:1.5">Staff sign in the same way. If the shop added your account, the barber app opens instead.</div>
        <div class="muted" style="text-align:center;margin-top:6px">By continuing you agree to the booking terms.</div>
      </div>
    </div>`;
  }

  else if(S.screen==="home"){
    h=`<div style="padding:6px 18px 0;flex-shrink:0">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:13px;color:var(--textMd)">Welcome back</div>
        <div style="font-size:22px;font-weight:700">Hey, Boss 👋</div></div>
        <div style="display:flex;gap:8px"><div class="iconbtn">🔔</div>
        <div class="iconbtn pic" style="border-radius:19px">${GB_ART.avatar('el')}</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);border-radius:13px;padding:11px 14px;margin-top:15px">
        <span style="color:var(--textDm)">🔍</span><span style="color:var(--textDm);font-size:14px">Search barber, service…</span></div>
    </div>
    <div class="body" style="padding-top:14px">
      <div class="thumb" style="height:152px;border-radius:17px;display:flex;align-items:flex-end;padding:15px">
        <div class="art">${GB_ART.hero()}</div>
        <div><div style="font-size:12px;color:var(--textMd);margin-bottom:3px">Featured service</div>
        <div style="font-size:19px;font-weight:700">Skin fade + beard</div>
        <div style="font-size:13px;color:var(--textMd);margin-top:2px">₱250 · 50 min</div></div>
      </div>
      ${BK?`<div class="sec-title">Your booking</div>
      <div class="rowitem" style="border-color:var(--borderLt)" onclick="go('qr')">
        <div class="av pic">${GB_ART.avatar(BK.barber.pic||'jay',{round:28})}</div>
        <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">${BK.cut.name} with ${first(BK.barber.name)}</div>
        <div class="muted" style="margin-top:2px">Sep ${BK.date} · ${ampm(BK.slot)} · ${BK.branch.name}</div></div>
        ${spill(BK.status)}
      </div>`:""}
      <div class="sec-title">Last visited barber</div>
      <div class="rowitem" style="margin-bottom:0" onclick="S.branch=BRANCHES[0];S.barber=BARBERS[0];go('profileBarber')">
        <div class="av pic">${GB_ART.avatar('jay',{round:28})}<i class="dot"></i></div>
        <div style="flex:1"><div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:600;font-size:15px">Jay Reyes</span><span class="badge">Pro</span></div>
          <div style="font-size:12px;color:var(--textMd);margin-top:2px"><span style="color:var(--warn)">★</span> 4.9 (114) · Senior barber</div></div>
        <button class="btn flat" style="width:auto;padding:9px 18px;font-size:13px">Book</button>
      </div>
      <div class="sec-title">Choose a branch <span class="link" onclick="go('branch')">See all →</span></div>
      <div class="hrow">${BRANCHES.map(b=>`
        <div class="card" style="min-width:210px;overflow:hidden;cursor:pointer" onclick="S.branch=BRANCHES.find(x=>x.id===${b.id});go('barbers')">
          <div class="thumb" style="height:92px;display:flex;align-items:flex-start;justify-content:flex-end;padding:9px"><div class="art">${GB_ART.branch(b.id)}</div>${b.tag?`<span class="badge">${b.tag}</span>`:""}</div>
          <div style="padding:11px 13px"><div style="font-weight:600;font-size:14px">${b.name}</div>
          <div class="muted" style="margin-top:3px">${b.hours} · ${b.barbers} barbers</div>
          <div class="muted" style="margin-top:2px">📍 ${b.dist}</div></div>
        </div>`).join("")}</div>
      <div class="sec-title">Quick services</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${CUTS.filter(c=>c.popular).map(c=>`
        <div class="card" style="padding:14px;cursor:pointer" onclick="S.cut=CUTS.find(x=>x.id===${c.id});go('branch')">
          <div style="font-weight:600;font-size:13px">${c.name}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:7px">
            <span style="font-size:17px;font-weight:700;color:var(--acc)">₱${c.price}</span><span class="muted">${c.time}</span></div>
        </div>`).join("")}</div>
    </div>`;
    nb.innerHTML=navbar("home");
  }

  else if(S.screen==="branch"){
    h=header("Choose a branch","home")+`<div class="body">${BRANCHES.map(b=>`
      <div class="card" style="overflow:hidden;margin-bottom:12px;cursor:pointer" onclick="S.branch=BRANCHES.find(x=>x.id===${b.id});go('barbers')">
        <div class="thumb" style="height:112px;display:flex;align-items:flex-start;justify-content:space-between;padding:12px"><div class="art">${GB_ART.branch(b.id)}</div>
          ${b.tag?`<span class="badge">${b.tag}</span>`:"<span></span>"}
          <span style="font-size:11px;color:var(--textMd);background:rgba(0,0,0,.35);padding:3px 9px;border-radius:9px">📍 ${b.dist}</span></div>
        <div style="padding:14px"><div style="font-weight:700;font-size:17px">${b.name}</div>
        <div style="font-size:12px;color:var(--textMd);margin-top:4px">${b.addr}, General Santos City</div>
        <div style="display:flex;gap:16px;margin-top:9px"><span class="muted">🕐 ${b.hours}</span><span class="muted">✂ ${b.barbers} barbers</span></div></div>
      </div>`).join("")}</div>`;
  }

  else if(S.screen==="barbers"){
    h=header(S.branch?S.branch.name:"Barbers","branch")+`<div class="body">
      <div class="rowitem" style="border:1.5px dashed var(--borderLt);background:rgba(77,181,106,.07)"
        onclick="S.barber={id:0,name:'Next available',emoji:'⚡',rating:'—',reviews:0,role:'Any barber'};go('cuts')">
        <div class="av" style="background:linear-gradient(135deg,rgba(77,181,106,.28),rgba(77,181,106,.1))">⚡</div>
        <div><div style="font-weight:600;font-size:14px;color:var(--acc)">Next available barber</div>
        <div class="muted">Get the first open chair</div></div>
      </div>
      <div class="muted" style="margin:14px 0 10px">Choose a barber</div>
      ${BARBERS.map(b=>`<div class="rowitem" onclick="S.barber=BARBERS.find(x=>x.id===${b.id});go('profileBarber')">
        <div class="av pic">${GB_ART.avatar(b.pic,{round:28})}${b.busy?"":'<i class="dot"></i>'}</div>
        <div style="flex:1"><div style="font-weight:600;font-size:15px">${b.name}</div>
        <div style="font-size:12px;color:var(--textMd)"><span style="color:var(--warn)">★</span> ${b.rating} (${b.reviews}) · ${b.role}</div></div>
        <div style="padding:5px 10px;border-radius:9px;font-size:11px;font-weight:600;
          background:${b.busy?"rgba(245,158,11,.12)":"rgba(77,181,106,.14)"};color:${b.busy?"var(--warn)":"var(--acc)"}">
          ${b.busy?b.avail:"Free now"}</div>
      </div>`).join("")}</div>`;
  }

  else if(S.screen==="profileBarber"){
    const b=S.barber||BARBERS[0];
    h=header("Details","barbers",`<button class="iconbtn">♡</button>`)+`<div class="body" style="padding-top:0">
      <div class="thumb bhero" style="height:170px;border-radius:19px;display:flex;align-items:center;justify-content:center">
        <div class="art">${GB_ART.stage()}</div>
        ${b.pic?`<div class="bhero-av">${GB_ART.avatar(b.pic)}</div>`:`<span style="font-size:68px">${b.emoji}</span>`}</div>
      <div style="text-align:center;padding-top:16px">
        <div style="font-size:22px;font-weight:700">${b.name}</div>
        <div style="display:flex;justify-content:center;gap:8px;margin-top:7px;align-items:center">
          <span style="font-size:13px;color:var(--warn)">★ ${b.rating}</span>
          <span class="muted">(${b.reviews})</span><span class="badge">${b.role}</span></div>
        <div style="display:flex;justify-content:center;gap:22px;margin-top:12px">
          <div><div style="font-size:16px;font-weight:700;color:var(--acc)">${b.cuts||"—"}</div><div class="muted">cuts done</div></div>
          <div><div style="font-size:16px;font-weight:700;color:var(--acc)">${b.years||"—"}y</div><div class="muted">experience</div></div></div>
      </div>
      <div style="display:flex;justify-content:center;gap:6px;padding:16px 0 4px">
        ${["Booking","Portfolio","Reviews"].map(t=>`<button class="pill ${S.btab===t.toLowerCase()?"on":""}" onclick="pick('btab','${t.toLowerCase()}')">${t}</button>`).join("")}</div>
      <div style="padding-top:12px">${
        S.btab==="booking"
        ? dateStrip()+slotGrid("slotFromProfile")+(S.slot?`
            <div class="card" style="margin-top:16px;padding:14px;border-color:var(--borderLt);display:flex;justify-content:space-between;align-items:center">
              <div><div style="font-size:12px;color:var(--textMd)">Selected</div>
              <div style="font-size:15px;font-weight:600">Sep ${S.date}, ${S.slot}</div></div>
              <button class="btn flat" style="width:auto;padding:10px 20px;font-size:14px" onclick="go('cuts')">Continue</button></div>`:"")
        : S.btab==="portfolio"
        ? `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${[0,1,2,3,4,5].map(i=>`<div class="pf">${GB_ART.style(i)}</div>`).join("")}</div>`
        : REVIEWS.map(reviewCard).join("")
      }</div></div>`;
  }

  else if(S.screen==="cuts"){
    const back=S.barber&&S.barber.id===0?"barbers":"profileBarber";
    h=header("Select service",back)+`<div style="padding:0 16px;flex-shrink:0">
      <div class="hrow" style="padding-bottom:10px">${["All","Haircut","Beard","Combo","Shave","Custom"]
        .map(c=>`<button class="pill ${S.cat===c?"on":""}" onclick="pick('cat','${c}')">${c}</button>`).join("")}</div></div>
      <div class="body" style="padding-top:4px">${CUTS.filter(c=>S.cat==="All"||c.cat===S.cat).map(c=>`
        <div class="rowitem" onclick="chooseCut(${c.id})">
          <div class="av" style="font-size:12px;color:var(--textMd);font-weight:600">${c.time}</div>
          <div style="flex:1"><div style="display:flex;align-items:center;gap:6px">
            <span style="font-weight:600;font-size:14px">${c.name}</span>
            ${c.popular?'<span class="badge" style="font-size:9px">Popular</span>':""}</div>
            <div class="muted" style="margin-top:2px">${c.cat} · ${c.time}</div></div>
          <div style="font-size:17px;font-weight:700;color:var(--acc)">₱${c.price}</div>
        </div>`).join("")}</div>`;
  }

  else if(S.screen==="custom"){
    h=header("Describe your cut","cuts")+`<div class="body">
      <p style="font-size:13px;color:var(--textMd);line-height:1.55;margin-bottom:12px">Tell your barber exactly what you want so they're ready when you sit down.</p>
      <textarea id="note" placeholder="e.g. Low taper fade, textured on top, keep the fringe long"
        style="width:100%;min-height:100px;padding:14px;border-radius:14px;background:var(--card);border:1px solid var(--app-border);color:var(--app-text);font-size:14px;resize:vertical;outline:none;font-family:inherit">${S.note}</textarea>
      <div style="margin-top:12px;padding:38px;border-radius:14px;text-align:center;border:1.5px dashed var(--app-border);background:rgba(255,255,255,.02);cursor:pointer">
        <div style="font-size:26px;margin-bottom:6px">📷</div><div class="muted">Upload a reference photo</div></div>
      <button class="btn flat" style="margin-top:16px" onclick="S.note=document.getElementById('note').value;afterCustom()">Continue</button>
    </div>`;
  }

  else if(S.screen==="slotpick"){
    h=header("Pick a time","cuts")+`<div class="body">${dateStrip()}${slotGrid("slotFromPick")}</div>`;
  }

  else if(S.screen==="checkout"){
    const c=S.cut||CUTS[0], dp=Math.ceil(c.price/2), bal=c.price-dp;
    h=header("Checkout","cuts")+`<div class="body">
      <div class="card" style="padding:16px;margin-bottom:14px">
        <div style="font-size:13px;font-weight:600;color:var(--acc);margin-bottom:13px">Booking summary</div>
        ${[["Branch",S.branch?S.branch.name:"—"],["Barber",S.barber?S.barber.name:"—"],["Service",c.name],
           ["Date","Sep "+S.date+", 2026"],["Time",S.slot||"—"],["Duration",c.time]]
          .map(([l,v])=>`<div class="summary-row"><span>${l}</span><span>${v}</span></div>`).join("")}
        ${S.note?`<div class="summary-row" style="align-items:flex-start"><span>Notes</span><span style="max-width:60%;text-align:right;font-size:12px">${S.note}</span></div>`:""}
        <div style="border-top:1px solid var(--app-border);margin-top:9px;padding-top:11px;display:flex;justify-content:space-between">
          <span style="font-weight:600">Total</span><span style="font-weight:700;font-size:20px;color:var(--acc)">₱${c.price}</span></div>
      </div>
      <div class="card" style="padding:16px;margin-bottom:14px">
        <div style="font-size:13px;font-weight:600;margin-bottom:10px">Downpayment (50%)</div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:11px 14px;background:rgba(77,181,106,.09);border-radius:12px">
          <span style="font-size:13px;color:var(--textMd)">Pay now</span>
          <span style="font-weight:700;font-size:20px;color:var(--acc)">₱${dp}</span></div>
        <div class="muted" style="margin-top:9px;text-align:center">Remaining ₱${bal} paid at the shop</div>
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:10px">Pay with</div>
      ${[["GCash","#0070E0",true],["Maya","#00B140",false]].map(([n,col,sel])=>`
        <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:13px;margin-bottom:8px;
          border:1.5px solid ${sel?"var(--acc)":"var(--app-border)"};background:${sel?"rgba(77,181,106,.06)":"transparent"};cursor:pointer">
          <div style="width:36px;height:36px;border-radius:10px;background:${col};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">${n[0]}</div>
          <span style="font-weight:500;font-size:14px">${n}</span>${sel?'<span style="margin-left:auto;color:var(--acc)">●</span>':""}
        </div>`).join("")}
      <button class="btn" style="margin-top:14px" onclick="go('qr')">Pay ₱${dp} and confirm</button>
    </div>`;
  }

  else if(S.screen==="qr"){
    const bk=ensureBK(), c=bk.cut, dp=Math.ceil(c.price/2), bal=c.price-dp, st=bk.status, nm=first(bk.barber.name), idx=rank(st);
    const qi=["pending","queued"].includes(st)?queueInfo(bk):null;
    const qtxt=qi?(qi.pos===1&&!qi.cur?"You're next, the chair is open":`Position ${qi.pos} · about ${qi.eta} min`):"";
    const steps=[["Booked","Downpayment of ₱"+dp+" received"],["Checked in",st==="queued"?qtxt:"Scan at the front desk when you arrive"],["In the chair",nm+" is cutting"],["Cut done","Settle ₱"+bal+" at the front desk"],["Completed","Thanks for visiting"]];
    const head={pending:[qi?`${qi.pos===1&&!qi.cur?"Chair is open":"Ahead of you: "+(qi.pos-1+(qi.cur?1:0))+" · about "+qi.eta+" min"}`:"Booking confirmed","Show this QR at the front desk"],queued:[qtxt,"You're in the queue"],
      "in-progress":["Started "+bk.startedAt,"You're in the chair"],done:["Finished "+bk.doneAt,"All done. Settle ₱"+bal+" at the front desk"],complete:["Balance settled","Booking complete"]}[st];
    h=`<div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:12px 18px 24px">
      <div style="font-size:12.5px;color:var(--acc);font-weight:600">${head[0]}</div>
      <div style="font-weight:700;font-size:18px;margin:4px 0 14px;text-align:center">${head[1]}</div>
      ${bk.callout&&st!=="complete"?`<div class="card" style="width:100%;padding:12px 14px;margin-bottom:10px;border-color:var(--acc);background:rgba(77,181,106,.1);display:flex;gap:10px;align-items:center">
        <span style="font-size:20px">🔔</span><div style="font-size:13px;line-height:1.45"><b>${bk.push?bk.push.title:"Heads up"}</b><br><span style="color:var(--textMd)">${bk.callout}</span></div></div>`:""}
      <div class="card" style="padding:18px;width:100%;text-align:center">
        <div style="width:150px;height:150px;margin:0 auto 12px;border-radius:12px;background:#fff;padding:8px;${st==="complete"?"opacity:.4":""}"><div class="qr">${GB_ART.qr(bk.id)}<b><i class="gblogo"></i></b></div></div>
        <div style="font-weight:700;font-size:17px;color:var(--acc);letter-spacing:1px">${bk.id}</div>
        <div style="font-size:12.5px;color:var(--textMd);margin-top:5px;line-height:1.6">${c.name} with ${bk.barber.name}<br>Sep ${bk.date}, ${ampm(bk.slot)} · ${bk.branch.name}</div>
        <div style="margin-top:10px;padding:7px 14px;border-radius:10px;background:rgba(77,181,106,.09);display:inline-block">
          <span style="font-size:12px;color:var(--acc);font-weight:600">Paid ₱${st==="complete"?c.price:dp}</span>
          <span class="muted" style="margin-left:8px">${st==="complete"?"Fully settled":"Balance ₱"+bal}</span></div>
      </div>
      <div class="card" style="padding:14px 16px 4px;width:100%;margin-top:10px">
        <div style="font-size:12px;font-weight:600;color:var(--textMd);margin-bottom:12px">Live status</div>
        <ul class="stepper">${steps.map(([l,d],i)=>`<li class="${i<idx?"past":i===idx?"now":""}"><span class="k">${i<idx?"✓":""}</span><div>${l}<small>${d}</small></div></li>`).join("")}</ul>
      </div>
      ${st==="complete"&&!bk.reviewed?`<button class="btn" style="margin-top:14px" onclick="go('review')">Rate your visit with ${nm}</button>`:""}
      <button class="btn ghost" style="margin-top:10px" onclick="go('home')">Back to home</button>
      ${st==="pending"?`<div class="muted" style="margin-top:12px">Screenshot this QR as backup</div>`:""}
    </div>`;
  }

  else if(S.screen==="review"){
    const bk=ensureBK(), b=bk.barber, nm=first(b.name);
    const TAGS=["Clean fade","On time","Friendly","Good advice","Worth the price"];
    h=header("Rate your visit","qr")+`<div class="body">
      <div style="text-align:center;padding:4px 0 16px">
        <div class="pic" style="width:84px;height:84px;margin:0 auto 10px">${GB_ART.avatar(b.pic||'jay')}</div>
        <div style="font-size:19px;font-weight:700;line-height:1.25">How was your ${bk.cut.name.toLowerCase()} with ${nm}?</div>
        <div class="muted" style="margin-top:5px">Sep ${bk.date} · ${ampm(bk.slot)} · ${bk.branch.name}</div>
      </div>
      <div class="stars">${[1,2,3,4,5].map(n=>`<button class="${RV.stars>=n?"on":""}" onclick="setStars(${n})">★</button>`).join("")}</div>
      <div class="muted" style="text-align:center;margin:8px 0 18px">${["Tap a star to rate","Not great","Could be better","Good","Very good","Excellent"][RV.stars]}</div>
      <div class="chips">${TAGS.map(t=>`<button class="chip ${RV.tags.includes(t)?"on":""}" onclick="toggleTag('${t}')">${t}</button>`).join("")}</div>
      <textarea id="rvtext" oninput="RV.text=this.value" placeholder="Anything ${nm} should know for next time?"
        style="width:100%;min-height:84px;margin-top:14px;padding:13px;border-radius:14px;background:var(--card);border:1px solid var(--app-border);color:var(--app-text);font-size:14px;resize:vertical;outline:none;font-family:inherit">${RV.text}</textarea>
      <button class="btn" style="margin-top:14px" ${RV.stars?"":"disabled"} onclick="submitReview()">Post review</button>
      <button class="btn ghost" style="margin-top:8px" onclick="go('home')">Maybe later</button>
    </div>`;
  }

  else if(S.screen==="thanks"){
    const bk=ensureBK(), b=bk.barber, nm=first(b.name);
    h=`<div class="splashroot" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 22px;text-align:center">
      <div style="width:64px;height:64px;border-radius:32px;background:rgba(245,158,11,.16);display:flex;align-items:center;justify-content:center;font-size:30px;margin-bottom:14px;color:var(--warn)">★</div>
      <div style="font-size:22px;font-weight:700">Thanks, El</div>
      <p style="font-size:13.5px;color:var(--textMd);line-height:1.6;margin-top:8px;max-width:270px">Your review is live on ${nm}'s profile and counts toward their rating.</p>
      <div style="width:100%;margin-top:20px;text-align:left">${reviewCard(REVIEWS[0])}</div>
      <button class="btn" style="margin-top:12px" onclick="S.branch=BK.branch;S.barber=BARBERS.find(x=>x.id===${b.id})||BARBERS[0];S.btab='reviews';go('profileBarber')">See it on ${nm}'s profile</button>
      <button class="btn ghost" style="margin-top:8px" onclick="go('home')">Back to home</button>
    </div>`;
  }

  else if(S.screen==="mybookings"){
    h=header("My bookings","home")+`<div class="body">
      <div class="muted" style="margin-bottom:10px">Upcoming</div>
      <div class="card" style="padding:16px;margin-bottom:10px;border-color:var(--borderLt)">
        <div style="display:flex;justify-content:space-between;align-items:start">
          <div><div style="font-weight:600;font-size:15px">Skin fade</div>
          <div class="muted" style="margin-top:3px">Jay Reyes · JP Laurel</div></div>
          ${BK?spill(BK.status):'<span class="badge">Booked</span>'}</div>
        <div style="display:flex;gap:16px;margin-top:12px"><span class="muted">📅 Sep ${BK?BK.date:3}, 2026</span><span class="muted">🕐 ${BK?ampm(BK.slot):"2:00 PM"}</span></div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="btn ghost" style="font-size:13px;padding:10px">Reschedule</button>
          <button class="btn flat" style="font-size:13px;padding:10px" onclick="go('qr')">View QR</button></div>
      </div>
      <div class="muted" style="margin:18px 0 10px">Past</div>
      ${[["Regular haircut","Mark Santos","Aug 18, 2026","₱150"],["Skin fade","Jay Reyes","Aug 2, 2026","₱200"]].map(([s,b,d,p])=>`
        <div class="card" style="padding:14px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-weight:600;font-size:14px">${s}</div><div class="muted" style="margin-top:2px">${b} · ${d}</div></div>
          <div style="text-align:right"><div style="font-weight:600;color:var(--acc)">${p}</div>
          <div class="link" style="margin-top:3px">Rebook</div></div>
        </div>`).join("")}
    </div>`;
    nb.innerHTML=navbar("bookings");
  }

  else if(S.screen==="profile"){
    h=header("Profile","home")+`<div class="body">
      <div style="text-align:center;padding:10px 0 20px">
        <div class="pic" style="width:80px;height:80px;margin:0 auto 12px">${GB_ART.avatar('el',{round:30})}</div>
        <div style="font-size:19px;font-weight:700">El Varquez</div>
        <div class="muted" style="margin-top:3px">+63 917 ••• 4823</div></div>
      <div style="display:flex;gap:8px;margin-bottom:18px">${[["12","Total cuts"],["₱1,980","Spent"],["Jay","Top barber"]].map(([v,l])=>`
        <div class="card" style="flex:1;padding:14px;text-align:center">
          <div style="font-size:17px;font-weight:700;color:var(--acc)">${v}</div><div class="muted" style="margin-top:2px">${l}</div></div>`).join("")}</div>
      ${["Payment methods","Notification settings","Favorite barbers","Help & support","Sign out"].map(i=>`
        <div class="rowitem" style="padding:15px 16px"><span style="flex:1;font-size:14px">${i}</span><span style="color:var(--textDm)">›</span></div>`).join("")}
    </div>`;
    nb.innerHTML=navbar("profile");
  }

  el.innerHTML=h;
  renderPush();
  renderChrome();
  renderWalk();
}

/* ---------- barber app ---------- */
function renderBarber(){
  const el=document.getElementById("screen"), nb=document.getElementById("navbar");
  const bk=ensureBK(), b=bk.barber, st=bk.status, dp=Math.ceil(bk.cut.price/2), bal=bk.cut.price-dp;
  let h="";

  if(B.screen==="bhome"){
    const cur=inChair(), w=waiting(), doneList=chairSorted().filter(x=>["done","complete"].includes(x.status));
    const earned=doneList.reduce((s,x)=>s+x.cut.price,0);
    h=`<div style="padding:6px 18px 0;flex-shrink:0">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="pic" style="width:46px;height:46px">${GB_ART.avatar(b.pic||'jay')}</div>
        <div style="flex:1;min-width:0"><div style="font-size:12.5px;color:var(--textMd)">Barber app · ${bk.branch.name}</div><div style="font-size:20px;font-weight:700">${b.name}</div></div>
        <div class="iconbtn">🔔</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px">${[[doneList.length,"done today"],["₱"+earned.toLocaleString(),"earned today"],[w.length,"waiting"]].map(([v,l])=>`
        <div class="card" style="flex:1;padding:11px 6px;text-align:center"><div style="font-size:16px;font-weight:700;color:var(--acc)">${v}</div><div class="muted" style="margin-top:2px">${l}</div></div>`).join("")}</div>
    </div>
    <div class="body" style="padding-top:14px">
      <button class="btn" onclick="bgo('bscan')">Scan customer QR</button>
      ${cur?`<div class="sec-title">Now cutting</div>
      <div class="card" style="padding:14px;border-color:rgba(245,158,11,.4);cursor:pointer" onclick="bgo('bdetail','${cur.id}')">
        <div style="display:flex;align-items:center;gap:12px">${avatarFor(cur)}
          <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:15px">${cur.customer}</div>
          <div class="muted" style="margin-top:2px">${cur.cut.name} · started ${cur.startedAt} · about ${Math.max(5,Math.round(dur(cur)*.4))} min left</div></div>${spill(cur.status)}</div>
        <button class="btn flat" style="margin-top:12px;padding:11px" onclick="event.stopPropagation();B.sel='${cur.id}';bDone()">Mark as done</button>
      </div>`
      :`<div class="card" style="padding:14px;margin-top:14px;border-style:dashed;text-align:center"><div style="font-weight:600;font-size:14px;color:var(--acc)">Chair open</div>
        <div class="muted" style="margin-top:3px">${w.length?`${first(w[0].customer)} is next${w[0].notified?" and has been notified":""}.`:"Nobody waiting."}</div></div>`}
      <div class="sec-title">Up next <span class="muted">${w.length} waiting</span></div>
      ${w.length?w.map((x,i)=>`<div class="brow2 live" onclick="bgo('bdetail','${x.id}')">
        <div class="tm"><div style="font-size:16px;font-weight:700;color:${x.status==="queued"?"var(--acc)":"var(--textDm)"}">${i+1}</div><div class="muted">${ampm(x.slot)}</div></div>
        <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">${x.customer}</div>
        <div class="muted">${x.cut.name}${x.status==="pending"?" · not checked in":""}${x.notified?" · notified":""}</div></div>
        ${spill(x.status)}</div>`).join(""):`<div class="muted" style="padding:4px 2px">Nobody waiting.</div>`}
      <div class="sec-title">Done today</div>
      ${doneList.map(x=>`<div class="brow2" style="opacity:.75">
        <div class="tm">${ampm(x.slot)}</div>
        <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">${x.customer}</div><div class="muted">${x.cut.name}</div></div>
        ${spill(x.status)}</div>`).join("")}
      <div class="muted" style="text-align:center;margin-top:8px">When you mark a cut done, the next customer's phone is told to come to your chair.</div>
    </div>`;
    nb.innerHTML=bnav("bhome");
  }

  else if(B.screen==="bscan"){
    h=bheader("Scan customer QR","bhome")+`<div class="body">
      <p style="font-size:13px;color:var(--textMd);line-height:1.55;margin-bottom:14px">Ask the customer for the QR in their app. Scanning it opens the booking and lets you start the cut.</p>
      <div class="scanwrap" onclick="bScanned()">${GB_ART.viewfinder()}</div>
      <button class="btn flat" style="margin-top:14px" onclick="bScanned()">Simulate scan</button>
      <div class="muted" style="text-align:center;margin-top:12px">The booking shows the customer's name before anything changes.</div>
    </div>`;
    nb.innerHTML=bnav("bscan");
  }

  else if(B.screen==="bdetail"){
    const x=selB(), xs=x.status, xdp=Math.ceil(x.cut.price/2), xbal=x.cut.price-xdp, cur=inChair(), busy=cur&&cur!==x;
    const refIdx={"Skin fade":0,"Low taper fade":1,"Undercut":2,"Buzz cut":3}[x.cut.name]??5;
    const qi=["pending","queued"].includes(xs)?queueInfo(x):null;
    const action=rank(xs)<rank("in-progress")?`<button class="btn" ${busy?"disabled":""} onclick="bStart()">Start cut</button>
        <button class="btn ghost" style="margin-top:8px" onclick="bCall()">${x.notified?"Notify again":xs==="queued"?"Call to the chair":"Ask them to check in"}</button>`
      :xs==="in-progress"?`<button class="btn" onclick="bDone()">Mark as done</button>`
      :xs==="done"?`<button class="btn ghost" disabled>Sent to front desk · waiting for payment</button>`
      :`<button class="btn ghost" disabled>Completed · balance settled</button>`;
    h=bheader("Booking",B.scanned?"bscan":"bhome")+`<div class="body">
      ${B.scanned?`<div style="display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:11px;background:rgba(77,181,106,.12);color:var(--acc);font-size:12.5px;font-weight:600;margin-bottom:12px">✓ QR verified · ${x.id} · downpayment paid</div>`:""}
      <div class="card" style="padding:16px;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:12px">
          ${avatarFor(x,28,50)}
          <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:16px">${x.customer}</div><div class="muted">${x.phone} · visit ${x.visits}</div></div>
          ${spill(xs)}
        </div>
        ${qi?`<div class="muted" style="margin-top:10px">${xs==="queued"?"Checked in":"Not checked in yet"} · position ${qi.pos} in your queue${x.notified?" · notified "+x.notified:""}</div>`:""}
        <div style="border-top:1px solid var(--app-border);margin-top:12px;padding-top:12px">
          ${[["Service",x.cut.name],["Duration",x.cut.time],["Booked for","Sep "+(x.date||bk.date)+", "+ampm(x.slot)],["Downpayment","₱"+xdp+" paid"],["Balance","₱"+xbal+" at the front desk"]]
            .map(([l,v])=>`<div class="summary-row"><span>${l}</span><span>${v}</span></div>`).join("")}
        </div>
      </div>
      <div class="card" style="padding:14px;margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;color:var(--textMd);margin-bottom:6px">Customer notes</div>
        <div style="font-size:13.5px;line-height:1.5">${x.note||(x.live?"Same as last time, keep a bit more length on top.":"No notes for this booking.")}</div>
        ${x.live?`<div style="display:flex;align-items:center;gap:12px;margin-top:12px;padding-top:12px;border-top:1px solid var(--app-border)">
          <div class="pf" style="width:56px;height:56px;border-radius:10px;flex-shrink:0">${GB_ART.style(refIdx)}</div>
          <div><div style="font-size:13px;font-weight:600">Reference photo</div><div class="muted">Uploaded with the booking</div></div>
        </div>`:""}
      </div>
      ${action}
      ${busy&&rank(xs)<rank("in-progress")?`<div class="muted" style="text-align:center;margin-top:10px">Finish ${first(cur.customer)} first. Marking that cut done will notify ${first(x.customer)} automatically.</div>`
        :xs==="in-progress"?`<div class="muted" style="text-align:center;margin-top:10px">Started ${x.startedAt}</div>`:xs==="done"?`<div class="muted" style="text-align:center;margin-top:10px">Finished ${x.doneAt}</div>`:""}
    </div>`;
    nb.innerHTML=bnav("bhome");
  }

  else if(B.screen==="bdone"){
    const x=selB(), xbal=x.cut.price-Math.ceil(x.cut.price/2), nx=B.lastNext;
    h=`<div class="splashroot" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 22px;text-align:center">
      <div style="width:64px;height:64px;border-radius:32px;background:rgba(77,181,106,.16);display:flex;align-items:center;justify-content:center;font-size:30px;margin-bottom:14px">✓</div>
      <div style="font-size:22px;font-weight:700">Cut done</div>
      <p style="font-size:13.5px;color:var(--textMd);line-height:1.6;margin-top:8px;max-width:270px">Send ${first(x.customer)} to the front desk to settle the ₱${xbal} balance. Their app already shows the cut is finished.</p>
      <div class="card" style="padding:14px 16px;width:100%;margin-top:18px;text-align:left">
        ${[["Customer",x.customer],["Service",x.cut.name],["Started",x.startedAt||"—"],["Finished",x.doneAt||"—"]].map(([l,v])=>`<div class="summary-row"><span>${l}</span><span>${v}</span></div>`).join("")}
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--app-border);margin-top:8px;padding-top:10px"><span class="muted">Status</span>${spill(x.status)}</div>
      </div>
      <div class="card" style="padding:14px 16px;width:100%;margin-top:10px;text-align:left;border-color:${nx?"var(--acc)":"var(--app-border)"};background:${nx?"rgba(77,181,106,.08)":"var(--card)"}">
        <div style="font-size:12px;font-weight:600;color:var(--acc);margin-bottom:6px">${nx?"Next customer notified":"Queue"}</div>
        ${nx?`<div style="display:flex;align-items:center;gap:10px">${avatarFor(nx)}<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:14px">${nx.customer}</div><div class="muted">${nx.cut.name} · ${ampm(nx.slot)}</div></div>${spill(nx.status)}</div>
          <div style="font-size:12.5px;color:var(--textMd);line-height:1.5;margin-top:10px">Sent to their phone: <i>"${nx.callout}"</i></div>`
        :`<div class="muted">Nobody else is waiting for you right now.</div>`}
      </div>
      <button class="btn" style="margin-top:16px" onclick="bgo('bhome')">Back to my chair</button>
    </div>`;
    nb.innerHTML=bnav("bhome");
  }

  else if(B.screen==="bprofile"){
    h=bheader("My reviews")+`<div class="body">
      <div style="text-align:center;padding:4px 0 16px">
        <div class="pic" style="width:72px;height:72px;margin:0 auto 10px">${GB_ART.avatar(b.pic||'jay')}</div>
        <div style="font-size:30px;font-weight:700;color:var(--warn)">★ ${b.rating}</div>
        <div class="muted" style="margin-top:2px">${b.reviews} reviews · ${b.cuts} cuts · ${b.years} years</div>
      </div>
      ${REVIEWS.map(reviewCard).join("")}
    </div>`;
    nb.innerHTML=bnav("bprofile");
  }

  el.innerHTML=h;
  document.getElementById("push").innerHTML="";
  renderChrome();
  renderWalk();
}

function renderPush(){
  const p=(MODE==="customer"&&BK&&BK.push&&!(BK.push.kind==="review"&&BK.reviewed)&&!["loading","splash","login","review","thanks"].includes(S.screen)&&!(S.screen==="qr"&&BK.push.kind==="queue"))?BK.push:null;
  document.getElementById("push").innerHTML=p?`<div class="push" onclick="openPush()"><div class="logotile"><i class="gblogo"></i></div>
    <div><b>${p.title}</b><span>${p.body}</span></div><i>now</i></div>`:"";
}

function renderChrome(){
  document.getElementById("modeseg").innerHTML=[["customer","Customer app"],["barber","Barber app"]]
    .map(([m,l])=>`<button class="${MODE===m?"on":""}" onclick="setMode('${m}')">${l}</button>`).join("");
  const st=BK?BK.status:null;
  document.getElementById("foot").innerHTML=`
    <div class="row"><button onclick="reset()">↺ Restart</button>${MODE==="customer"?`<button onclick="autoFill()">⚡ Skip to checkout</button>`:""}</div>
    <div class="fdbox">
      <div class="lbl">Front desk actions — these happen on the web dashboard</div>
      <div class="row">
        <button ${st==="pending"?"":"disabled"} onclick="fdCheckIn()">Scan on arrival: add to queue</button>
        <button ${st==="done"?"":"disabled"} onclick="fdComplete()">Scan after the cut: collect balance</button>
      </div>
      <div class="lbl">${st?`${BK.id} is <b>${STATUS[st].l}</b>`:"No booking yet. Finish checkout, or open the barber app."}</div>
    </div>`;
}

function renderWalk(){
  const barber=MODE==="barber", cur=barber?B.screen:S.screen;
  const w=barber?(WALK[cur]||WALK.bhome):(WALK[cur]||WALK.home);
  const flow=barber?BFLOW:FLOW, fn=barber?"bgo":"go";
  const idx=flow.findIndex(f=>f[0]===cur);
  const st=BK?BK.status:null;
  document.getElementById("walk").innerHTML=`
    <div class="wcard">
      <div class="stepnum">${w.step}</div>
      <h2>${w.title}</h2>
      <p class="lede">${w.lede}</p>
      <div style="margin-top:14px">${w.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    </div>

    <div class="wcard">
      <div class="wsub">What's happening on screen</div>
      <ul class="pts">${w.pts.map(p=>`<li><span class="mk">✓</span><span>${p}</span></li>`).join("")}</ul>
    </div>

    <div class="pitch">
      <div class="wsub">Why this matters to the shop</div>
      <p>${w.pitch}</p>
    </div>

    <div class="flowmap">
      <div class="wsub">${barber?"Barber flow":"Booking flow"}</div>
      <ul class="steps">${flow.map(([id,label],i)=>{
        const cls = id===cur ? "on" : (idx>-1 && i<idx ? "past" : "");
        return `<li class="${cls}" onclick="${fn}('${id}')"><span class="n">${i+1}</span>${label}</li>`;
      }).join("")}</ul>
    </div>

    <div class="flowmap">
      <div class="wsub">Who moves the booking status</div>
      <ul class="legend">${ORDER.map(k=>{const m=STATUS[k];
        return `<li class="${st===k?"on":""}"><span class="lpill" style="background:${m.lbg};color:${m.lc}">${m.l}</span><span>${m.who}</span>${st===k?"<i>now</i>":""}</li>`;}).join("")}</ul>
    </div>`;
}


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
