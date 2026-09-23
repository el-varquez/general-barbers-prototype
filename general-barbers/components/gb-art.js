/* General Barbers — vector art library. Storefronts, hero, avatars, portfolio silhouettes, pseudo-QR, viewfinder, ticket.
   Loaded by every app card and the specimen cards; exposes window.GB_ART. */
/* ===== General Barbers — vector art library (shared by both prototypes) ===== */
const GB_ART=(()=>{
const C={g0:'#0F2417',g1:'#1B3A25',g2:'#24522F',g3:'#2F6A3E',g4:'#3E8A52',g5:'#5FA874',
  mint:'#CFE8D5',white:'#FFFFFF',wall:'#F4F7F2',cream:'#F3E9D2',gold:'#E9C46A',red:'#C94141',
  hair:'#1E1B19',ink:'#10251A'};
let uid=0; const id=p=>p+'_'+(++uid);
const FONT='"Oswald","Arial Narrow",Impact,sans-serif';
const svg=(vb,body,extra='')=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${extra}>${body}</svg>`;

/* ---------- primitives ---------- */
const STAR='M0-10 2.35-3.24 9.51-3.09 3.8 1.24 5.88 8.09 0 4-5.88 8.09-3.8 1.24-9.51-3.09-2.35-3.24Z';
const stars=(pts,fill,op=1)=>pts.map(([x,y,r])=>`<path transform="translate(${x} ${y}) scale(${(r||4)/10})" d="${STAR}" fill="${fill}" opacity="${op}"/>`).join('');

function pole(x,y,h){
  let s='';
  for(let yy=-2;yy<h+4;yy+=7){
    const col=((yy/7)|0)%2?C.g2:C.red;
    s+=`<path d="M-4 ${yy} L4 ${yy-4.6} L4 ${yy-1.6} L-4 ${yy+3}Z" fill="${col}"/>`;
  }
  const cp=id('pole');
  return `<g transform="translate(${x} ${y})">
    <defs><clipPath id="${cp}"><rect x="-4" y="0" width="8" height="${h}" rx="4"/></clipPath></defs>
    <rect x="-4" y="0" width="8" height="${h}" rx="4" fill="#fff"/>
    <g clip-path="url(#${cp})">${s}</g>
    <rect x="-5.5" y="-3.5" width="11" height="4" rx="1.5" fill="${C.gold}"/>
    <rect x="-5.5" y="${h-.5}" width="11" height="4" rx="1.5" fill="${C.gold}"/>
    <rect x="-1.5" y="${h+3}" width="3" height="6" fill="${C.gold}"/>
  </g>`;
}
function awning(x,y,w,h,n){
  const sw=w/n; let s='';
  for(let i=0;i<n;i++){
    const col=i%2?'#fff':C.g2;
    s+=`<rect x="${x+i*sw}" y="${y}" width="${sw+.3}" height="${h}" fill="${col}"/>`;
    s+=`<circle cx="${x+i*sw+sw/2}" cy="${y+h}" r="${sw/2}" fill="${col}"/>`;
  }
  return `<g>${s}</g><rect x="${x-2}" y="${y-2}" width="${w+4}" height="3" fill="${C.g1}"/>`;
}
const win=(x,y,w,h,lit)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.2" fill="${lit?C.gold:C.g3}"/>
  <path d="M${x+2} ${y+h-2} L${x+w*.45} ${y+2}" stroke="#fff" stroke-width="1.6" opacity=".35"/>
  <path d="M${x+w*.55} ${y+h-2} L${x+w-2} ${y+2}" stroke="#fff" stroke-width="1" opacity=".25"/>`;
const sign=(x,y,w,h,txt='GENERAL BARBERS',fs=8.5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.g2}"/>
  <rect x="${x}" y="${y+h-1.5}" width="${w}" height="1.5" fill="${C.g1}"/>
  <text x="${x+w/2}" y="${y+h/2+fs*.36}" text-anchor="middle" font-family='${FONT}' font-weight="700" font-size="${fs}" letter-spacing="2" fill="#fff">${txt}</text>`;
const sky=(w,h,gid)=>`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.g3}"/><stop offset="1" stop-color="${C.g2}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#${gid})"/>`;
const ground=(w,h)=>`<rect x="0" y="${h-20}" width="${w}" height="20" fill="${C.g0}"/><rect x="0" y="${h-20}" width="${w}" height="2.5" fill="${C.g1}"/>`;

/* ---------- storefronts (one per branch) ---------- */
function branch(n){
  const W=300,H=130, g=id('sky');
  let b='';
  if(n===1){ /* JP Laurel — corner shop, two storeys */
    b=`${stars([[40,26,3.5],[262,20,3],[290,48,2.5]],'#fff',.7)}
      <rect x="0" y="46" width="70" height="64" fill="${C.g1}" opacity=".75"/>
      ${win(14,56,14,14)}${win(40,56,14,14)}${win(14,80,14,14,true)}
      <rect x="236" y="38" width="64" height="72" fill="${C.g1}" opacity=".75"/>
      ${win(250,48,16,14)}${win(276,48,16,14,true)}${win(250,74,16,14)}${win(276,74,16,14)}
      <rect x="66" y="24" width="168" height="88" fill="${C.wall}"/>
      <rect x="62" y="22" width="176" height="5" fill="${C.mint}"/><rect x="62" y="27" width="176" height="1.5" fill="${C.g1}" opacity=".5"/>
      ${win(84,38,26,19)}${win(137,38,26,19,true)}${win(190,38,26,19)}
      ${sign(66,62,168,15)}
      ${awning(70,80,160,8,8)}
      ${win(78,93,48,15)}${win(174,93,48,15)}
      <rect x="136" y="89" width="28" height="23" fill="${C.g2}"/><rect x="139" y="92" width="10" height="13" fill="${C.g3}"/><rect x="151" y="92" width="10" height="13" fill="${C.g3}"/>
      <circle cx="149" cy="102" r="1" fill="${C.gold}"/>
      ${pole(240,79,22)}`;
  } else if(n===2){ /* Polomolok — roadside, single storey, palm */
    b=`${stars([[30,22,3],[120,14,2.5],[280,30,3.5]],'#fff',.7)}
      <g fill="${C.g1}">
        <path d="M44 110 C46 90 44 70 40 50 L46 50 C50 70 52 90 52 110Z"/>
        <ellipse cx="34" cy="46" rx="20" ry="6" transform="rotate(-30 34 46)"/>
        <ellipse cx="56" cy="46" rx="20" ry="6" transform="rotate(30 56 46)"/>
        <ellipse cx="42" cy="38" rx="18" ry="5.5" transform="rotate(-72 42 38)"/>
        <ellipse cx="50" cy="38" rx="18" ry="5.5" transform="rotate(72 50 38)"/>
        <ellipse cx="45" cy="34" rx="14" ry="5" transform="rotate(-100 45 34)"/>
      </g>
      <rect x="92" y="44" width="150" height="68" fill="${C.wall}"/>
      <rect x="86" y="40" width="162" height="6" fill="${C.g2}"/><rect x="86" y="46" width="162" height="1.5" fill="${C.g1}" opacity=".5"/>
      ${sign(102,52,130,14)}
      <rect x="102" y="72" width="86" height="30" rx="1.5" fill="${C.g3}"/>
      <rect x="130" y="72" width="1.5" height="30" fill="#fff" opacity=".6"/><rect x="159" y="72" width="1.5" height="30" fill="#fff" opacity=".6"/>
      <path d="M106 100 L124 74" stroke="#fff" stroke-width="2" opacity=".3"/><path d="M164 100 L182 74" stroke="#fff" stroke-width="2" opacity=".3"/>
      <rect x="108" y="78" width="20" height="8" rx="1" fill="${C.gold}"/>
      <rect x="198" y="72" width="30" height="40" fill="${C.g2}"/><rect x="201" y="75" width="11" height="22" fill="${C.g3}"/><rect x="214" y="75" width="11" height="22" fill="${C.g3}"/>
      ${pole(238,68,26)}
      <rect x="262" y="66" width="2.5" height="46" fill="${C.mint}"/><rect x="252" y="60" width="22" height="11" rx="1.5" fill="${C.mint}"/>
      <rect x="255" y="63" width="16" height="2" fill="${C.g2}"/><rect x="255" y="66.5" width="10" height="2" fill="${C.g2}"/>
      <g fill="${C.gold}" opacity=".7">${[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>`<rect x="${i*24+4}" y="119" width="12" height="2"/>`).join('')}</g>`;
  } else { /* Calumpang — new, tent awning, bunting */
    const P0=[52,26],P1=[150,58],P2=[248,26]; let flags='';
    for(let t=.08;t<.97;t+=.083){
      const x=(1-t)**2*P0[0]+2*(1-t)*t*P1[0]+t*t*P2[0], y=(1-t)**2*P0[1]+2*(1-t)*t*P1[1]+t*t*P2[1];
      const col=[C.gold,'#fff',C.mint][Math.round(t/.083)%3];
      flags+=`<path d="M${x-4} ${y} L${x+4} ${y} L${x} ${y+8}Z" fill="${col}"/>`;
    }
    b=`${stars([[24,44,3],[276,50,3],[150,16,2.5]],'#fff',.7)}
      <path d="M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>${flags}
      <rect x="98" y="50" width="134" height="62" fill="${C.wall}"/>
      <rect x="94" y="48" width="142" height="4" fill="${C.mint}"/>
      ${sign(108,56,114,14)}
      <path d="M92 84 L238 84 L228 72 L102 72Z" fill="${C.g2}"/>
      ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<circle cx="${98+i*12.3}" cy="84" r="3" fill="${i%2?'#fff':C.g2}"/>`).join('')}
      ${[0,1,2,3,4,5].map(i=>`<rect x="${106+i*21}" y="72" width="10" height="12" fill="#fff"/>`).join('')}
      <path d="M92 84 L238 84 L228 72 L102 72Z" fill="none" stroke="${C.g1}" stroke-width="1"/>
      ${win(108,90,54,16)}
      <rect x="120" y="93" width="20" height="8" rx="1" fill="${C.gold}"/>
      <rect x="178" y="88" width="30" height="24" fill="${C.g2}"/><rect x="181" y="91" width="11" height="14" fill="${C.g3}"/><rect x="194" y="91" width="11" height="14" fill="${C.g3}"/>
      ${pole(236,76,20)}`;
  }
  return svg(`0 0 ${W} ${H}`, sky(W,H,g)+b+ground(W,H), 'preserveAspectRatio="xMidYMax slice"');
}

/* ---------- featured-service hero (barber chair) ---------- */
function hero(){
  const W=360,H=160, g=id('hero');
  return svg(`0 0 ${W} ${H}`,`
    <defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.g3}"/><stop offset="1" stop-color="${C.g1}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#${g})"/>
    <g opacity=".22" fill="#fff">
      <path d="M180 -40 L260 -40 L120 200 L40 200Z"/><path d="M290 -40 L330 -40 L190 200 L150 200Z"/>
    </g>
    <rect x="0" y="16" width="${W}" height="3" fill="#fff" opacity=".55"/><rect x="0" y="23" width="${W}" height="3" fill="#fff" opacity=".55"/>
    ${stars([[150,46,4],[334,54,3.5],[300,140,3]],'#fff',.8)}
    <g transform="translate(272 34)">
      <ellipse cx="0" cy="118" rx="34" ry="6" fill="${C.g0}"/>
      <rect x="-7" y="84" width="14" height="34" rx="2" fill="${C.g1}"/>
      <rect x="-12" y="80" width="24" height="7" rx="3" fill="${C.g0}"/>
      <rect x="-56" y="86" width="30" height="7" rx="3" fill="${C.g5}" transform="rotate(-22 -41 89)"/>
      <rect x="-34" y="60" width="68" height="18" rx="6" fill="${C.ink}"/>
      <rect x="-22" y="8" width="44" height="58" rx="10" fill="${C.ink}"/>
      <rect x="-15" y="-6" width="30" height="16" rx="7" fill="${C.ink}"/>
      <rect x="-42" y="50" width="12" height="22" rx="4" fill="${C.g5}"/>
      <rect x="30" y="50" width="12" height="22" rx="4" fill="${C.g5}"/>
      <path d="M-14 16 Q0 12 14 16" stroke="#fff" stroke-width="2" fill="none" opacity=".25"/>
      <path d="M-26 66 Q0 62 26 66" stroke="#fff" stroke-width="2" fill="none" opacity=".2"/>
    </g>
    <g transform="translate(200 64) rotate(-28)" opacity=".92">
      <path d="M-2 4 L-14 -34 L-8 -36 L3 2Z" fill="#fff"/><path d="M2 4 L14 -34 L8 -36 L-3 2Z" fill="#fff"/>
      <g stroke="#fff" stroke-width="3" fill="none"><circle cx="-11" cy="16" r="6.5"/><circle cx="11" cy="16" r="6.5"/><path d="M-1 3 L-7 10 M1 3 L7 10"/></g>
      <circle cx="0" cy="3" r="2.2" fill="${C.g2}"/>
    </g>`,'preserveAspectRatio="xMidYMid slice"');
}

/* ---------- barber profile stage (background behind the avatar) ---------- */
function stage(){
  const W=360,H=180, g=id('stage');
  return svg(`0 0 ${W} ${H}`,`
    <defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.g3}"/><stop offset="1" stop-color="${C.g1}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#${g})"/>
    <g opacity=".16" fill="#fff"><path d="M60 -40 L140 -40 L0 220 L-80 220Z"/><path d="M320 -40 L360 -40 L220 220 L180 220Z"/></g>
    <rect x="0" y="16" width="${W}" height="3" fill="#fff" opacity=".5"/><rect x="0" y="23" width="${W}" height="3" fill="#fff" opacity=".5"/>
    ${stars([[70,96,5],[290,96,5],[110,140,3],[250,140,3]],'#fff',.75)}`,'preserveAspectRatio="xMidYMid slice"');
}

/* ---------- people ---------- */
function person(o){
  const cp=id('cp');
  const shape=o.round?`<rect width="100" height="100" rx="${o.round}"/>`:`<circle cx="50" cy="50" r="50"/>`;
  const skinDk=o.skinDk, hair=o.hair||C.hair;
  return svg('0 0 100 100',`
    <defs><clipPath id="${cp}">${shape}</clipPath></defs>
    <g clip-path="url(#${cp})">
      <rect width="100" height="100" fill="${o.bg}"/>${o.decor||''}
      <path d="M6 104 C6 82 24 72 40 70 L60 70 C76 72 94 82 94 104Z" fill="${o.shirt}"/>${o.collar||''}
      <path d="M41 56 h18 v16 q-9 8 -18 0Z" fill="${skinDk}"/>
      <circle cx="30.5" cy="46" r="4.6" fill="${o.skin}"/><circle cx="69.5" cy="46" r="4.6" fill="${o.skin}"/>
      <ellipse cx="50" cy="44" rx="19.5" ry="22.5" fill="${o.skin}"/>
      ${o.sides||''}
      ${o.beard||''}
      <path d="M39.5 38.5 q4.5-2.2 9 0 M51.5 38.5 q4.5-2.2 9 0" stroke="${hair}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      ${o.eyes||`<circle cx="43.5" cy="43.5" r="1.8" fill="${C.ink}"/><circle cx="56.5" cy="43.5" r="1.8" fill="${C.ink}"/>`}
      <path d="M50 44.5 l-2.2 6.5 h4.4" stroke="${skinDk}" stroke-width="1.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      ${o.mouth||`<path d="M45.5 55 q4.5 3.2 9 0" stroke="${C.ink}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".75"/>`}
      ${o.hairTop||''}${o.extras||''}
    </g>`);
}
const mirror=d=>`<g transform="translate(100 0) scale(-1 1)">${d}</g>`;
const fadeSide=(col,op)=>{const p=`<path d="M31 44 C31 33 33.5 27.5 37 25 L37 45 C34.5 46.5 32 46 31 44Z" fill="${col}" opacity="${op}"/>`;return p+mirror(p);};

const PEOPLE={
  jay:()=>person({bg:C.g3,skin:'#C98B5C',skinDk:'#A9704A',shirt:'#1B1B1B',
    collar:`<path d="M40 70 L50 84 L60 70 L57 70 L50 78 L43 70Z" fill="#fff"/>`,
    sides:fadeSide(C.hair,.35),
    beard:`<path d="M33.5 48 C33.5 58 40 68 50 68.5 C60 68 66.5 58 66.5 48 C64.5 53 61 59 50 60 C39 59 35.5 53 33.5 48Z" fill="${C.hair}"/>`,
    mouth:`<path d="M45.5 54.5 q4.5 2.5 9 0" stroke="#C98B5C" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".9"/>`,
    hairTop:`<path d="M33 36 C33 24 38 18 42 17 L44 13 L47 17 L50 12 L53 17 L56 13 L58 17 C63 19 67 24 67 36 C62 33.5 56 32.5 50 32.5 C44 32.5 38 33.5 33 36Z" fill="${C.hair}"/>`}),
  mark:()=>person({bg:C.g4,skin:'#D9A275',skinDk:'#B9865D',shirt:'#F4F7F2',
    collar:`<path d="M40 70 Q50 78 60 70" stroke="${C.g2}" stroke-width="3" fill="none"/>`,
    sides:fadeSide(C.hair,.55),
    hairTop:`<path d="M32 38 C32 24 40 15 52 15 C63 15 73 17 70 27 C67 22 62 23 58 26 C55 30 51 33 46 33.5 C41 34 36 36 32 38Z" fill="${C.hair}"/>`}),
  ken:()=>person({bg:C.g5,skin:'#B87A4B',skinDk:'#96613A',shirt:'#1B1B1B',
    sides:fadeSide(C.hair,.8),
    beard:`<path d="M43.5 50 q6.5-3.5 13 0 q-3 3 -6.5 2.6 q-3.5 .4 -6.5 -2.6Z" fill="${C.hair}"/><path d="M44 59 q6 5 12 0 L55 66.5 q-5 3 -10 0Z" fill="${C.hair}"/>`,
    mouth:`<path d="M46 55.5 q4 2 8 0" stroke="#B87A4B" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    hairTop:`<path d="M31 40 C31 22 38 14 50 14 C62 14 69 22 69 40 C64 35 58 32.5 50 32.5 C42 32.5 36 35 31 40Z" fill="${C.hair}"/>
      <g stroke="#fff" stroke-width="1" opacity=".22" fill="none"><path d="M40 21 Q50 17 60 21"/><path d="M36 27 Q50 22 64 27"/></g>`,
    extras:`<g stroke="#fff" stroke-width="1.8" fill="none" opacity=".95"><circle cx="43.5" cy="43.5" r="6.5"/><circle cx="56.5" cy="43.5" r="6.5"/><path d="M50 43.5 h0 M37 42 L31 41 M63 42 L69 41"/></g>`}),
  rico:()=>person({bg:C.g3,skin:'#E3B48A',skinDk:'#C3966C',shirt:C.g2,
    collar:`<path d="M40 70 Q50 77 60 70" stroke="#fff" stroke-width="2.5" fill="none" opacity=".9"/>`,
    hairTop:`<g fill="${C.hair}">${[[33,34],[38,29],[45,26],[52,25],[59,27],[65,32],[36,38],[64,38]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6"/>`).join('')}</g>
      <path d="M30 34 C30 17 40 11 50 11 C60 11 70 17 70 34 C64 29 58 27 50 27 C42 27 36 29 30 34Z" fill="${C.g4}"/>
      <path d="M62 30 L84 34 L83 39 L62 36Z" fill="${C.g4}"/><path d="M66 32 L82 35" stroke="${C.g2}" stroke-width="1.2" opacity=".6"/>
      <circle cx="50" cy="20" r="3.2" fill="#fff" opacity=".9"/>`}),
  rhea:()=>person({bg:C.g4,skin:'#D9A275',skinDk:'#B9865D',shirt:C.g2,
    collar:`<path d="M42 70 L50 80 L58 70" stroke="#fff" stroke-width="2.5" fill="none"/>`,
    eyes:`<ellipse cx="43.5" cy="43.5" rx="2" ry="2.3" fill="${C.ink}"/><ellipse cx="56.5" cy="43.5" rx="2" ry="2.3" fill="${C.ink}"/><path d="M40 41 q3.5-2 7 0 M53 41 q3.5-2 7 0" stroke="${C.ink}" stroke-width="1" fill="none"/>`,
    mouth:`<path d="M45.5 55 q4.5 3.4 9 0" stroke="#B5473F" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    hairTop:`<circle cx="50" cy="15" r="8.5" fill="${C.hair}"/>
      <path d="M30 44 C30 24 38 16 50 16 C62 16 70 24 70 44 C67 36 62 31 50 31 C38 31 33 36 30 44Z" fill="${C.hair}"/>
      <path d="M30 44 C30 36 31 30 34 27 L35 50Z" fill="${C.hair}"/><path d="M70 44 C70 36 69 30 66 27 L65 50Z" fill="${C.hair}"/>`,
    extras:`<circle cx="30.5" cy="52" r="1.8" fill="${C.gold}"/><circle cx="69.5" cy="52" r="1.8" fill="${C.gold}"/>`}),
  el:()=>person({bg:C.g3,skin:'#CE9466',skinDk:'#AA7750',shirt:'#1B1B1B',
    collar:`<path d="M42 70 Q50 76 58 70" stroke="#3A3A3A" stroke-width="2.5" fill="none"/>`,
    sides:fadeSide(C.hair,.55),
    beard:`<path d="M31.5 46 C32 58 39 67 50 68 C61 67 68 58 68.5 46 C66 52 62 58 50 60 C38 58 34 52 31.5 46Z" fill="${C.hair}" opacity=".28"/>`,
    hairTop:`<path d="M32 38 C32 24 39 16 50 16 C61 16 68 24 68 38 C63 34 57 32.5 50 32.5 C43 32.5 37 34 32 38Z" fill="${C.hair}"/>`}),
};
const avatar=(who,opts={})=>{const f=PEOPLE[who]||PEOPLE.el;const s=f();return opts.round?s.replace('<circle cx="50" cy="50" r="50"/>',`<rect width="100" height="100" rx="${opts.round}"/>`):s;};

/* ---------- portfolio: haircut silhouettes ---------- */
const STYLES=[
  ['Skin fade',`<path d="M35 40 C35 28 39 21 43 20 L46 16 L49 20 L52 15 L55 20 L58 17 C63 20 65 28 65 40 C60 37.5 55 36.5 50 36.5 C45 36.5 40 37.5 35 40Z" fill="#fff"/>
     <path d="M32 46 C32 36 33 31 36 27 L36 46Z" fill="#fff" opacity=".28"/><path d="M68 46 C68 36 67 31 64 27 L64 46Z" fill="#fff" opacity=".28"/>`],
  ['Low taper',`<path d="M31 48 C31 26 38 18 50 18 C62 18 69 26 69 48 L66 46 C65 40 60 37 50 37 C40 37 35 40 34 46Z" fill="#fff"/>
     <path d="M31 48 C31 52 32 55 34 57 L36 46Z" fill="#fff" opacity=".35"/><path d="M69 48 C69 52 68 55 66 57 L64 46Z" fill="#fff" opacity=".35"/>`],
  ['Undercut',`<path d="M35 34 C35 19 45 13 57 13 C67 13 75 18 73 27 C69 22 63 24 59 30 C55 34 47 35.5 41 35 C38.5 34.8 36.5 34.5 35 34Z" fill="#fff"/>`],
  ['Buzz cut',`<path d="M31 44 C31 24 38 18 50 18 C62 18 69 24 69 44 C64 36.5 58 33.5 50 33.5 C42 33.5 36 36.5 31 44Z" fill="#fff" opacity=".6"/>`],
  ['Pompadour',`<path d="M32 38 C32 22 38 7 52 7 C65 7 71 15 68 26 C66 20 60 21 58 25 C52 30 44 34 32 38Z" fill="#fff"/>
     <path d="M32 46 C32 37 33 32 36 28 L36 46Z" fill="#fff" opacity=".3"/><path d="M68 46 C68 37 67 32 64 28 L64 46Z" fill="#fff" opacity=".3"/>`],
  ['Textured crop',`<path d="M32 40 C32 24 40 16 50 16 C60 16 68 24 68 36 L65 34 L62 37.5 L59 33 L56 37.5 L53 33 L50 37.5 L47 33 L44 37.5 L41 33 L38 37.5 L35 34 L32 40Z" fill="#fff"/>`],
];
function style(i){
  const [label,hair]=STYLES[i%STYLES.length];
  return svg('0 0 100 100',`
    <rect width="100" height="100" fill="${i%2?C.g2:C.g3}"/>
    <path d="M14 104 C14 86 28 80 40 78 L60 78 C72 80 86 86 86 104Z" fill="${C.ink}"/>
    <path d="M41 60 h18 v18 q-9 7 -18 0Z" fill="${C.ink}"/>
    <ellipse cx="50" cy="46" rx="19.5" ry="22.5" fill="${C.ink}"/>
    ${hair}
    <text x="50" y="94" text-anchor="middle" font-family='${FONT}' font-weight="500" font-size="8.5" letter-spacing="1.6" fill="#fff" opacity=".9">${label.toUpperCase()}</text>`);
}

/* ---------- pseudo QR code ---------- */
function qr(seed,attrs=''){
  let h=2166136261; for(const ch of String(seed)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0;}
  let s=h||1; const rnd=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s>>>0)/4294967296;};
  const n=25, m=Array.from({length:n},()=>Array(n).fill(0));
  for(let y=0;y<n;y++)for(let x=0;x<n;x++)m[y][x]=rnd()<.47?1:0;
  const finder=(ox,oy)=>{for(let y=-1;y<8;y++)for(let x=-1;x<8;x++){const X=ox+x,Y=oy+y;if(X<0||Y<0||X>=n||Y>=n)continue;
    const ring=(x===0||x===6||y===0||y===6),core=(x>=2&&x<=4&&y>=2&&y<=4);m[Y][X]=(x<0||y<0||x>6||y>6)?0:(ring||core)?1:0;}};
  finder(0,0);finder(n-7,0);finder(0,n-7);
  for(let i=8;i<n-8;i++){m[6][i]=i%2===0?1:0;m[i][6]=i%2===0?1:0;}
  const ax=n-9,ay=n-9;for(let y=0;y<5;y++)for(let x=0;x<5;x++){const ring=(x===0||x===4||y===0||y===4);m[ay+y][ax+x]=(ring||(x===2&&y===2))?1:0;}
  let r='';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(m[y][x])r+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;
  return svg(`-1 -1 ${n+2} ${n+2}`,`<rect x="-1" y="-1" width="${n+2}" height="${n+2}" fill="#fff"/><g fill="${C.ink}" shape-rendering="crispEdges">${r}</g>`,attrs);
}

/* ---------- dashboard: camera viewfinder + empty ticket ---------- */
function viewfinder(){
  const g=id('vf');
  return svg('0 0 300 300',`
    <defs><radialGradient id="${g}" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="${C.g2}"/><stop offset="1" stop-color="#06110A"/></radialGradient></defs>
    <rect width="300" height="300" rx="18" fill="url(#${g})"/>
    <g opacity=".07" stroke="#fff" stroke-width="1">${[60,120,180,240].map(v=>`<path d="M${v} 0 V300 M0 ${v} H300"/>`).join('')}</g>
    <g transform="translate(150 150)" opacity=".55">
      <rect x="-46" y="-78" width="92" height="156" rx="12" fill="#0B1A10" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>
      <rect x="-14" y="-70" width="28" height="4" rx="2" fill="#fff" opacity=".35"/>
      ${qr('GB-0044','x="-34" y="-34" width="68" height="68"')}
    </g>
    <g stroke="${C.g5}" stroke-width="4" fill="none" stroke-linecap="round">
      <path d="M40 74 V50 a10 10 0 0 1 10 -10 H74"/><path d="M226 40 H250 a10 10 0 0 1 10 10 V74"/>
      <path d="M260 226 V250 a10 10 0 0 1 -10 10 H226"/><path d="M74 260 H50 a10 10 0 0 1 -10 -10 V226"/>
    </g>
    <rect class="gb-scanline" x="44" y="60" width="212" height="2.5" rx="1" fill="${C.g5}"/>`);
}
function ticket(){
  return svg('0 0 140 90',`
    <g fill="none" stroke="#fff" stroke-width="2" stroke-opacity=".45" stroke-linejoin="round">
      <path d="M12 12 h44 a8 8 0 0 0 16 0 h56 a6 6 0 0 1 6 6 v54 a6 6 0 0 1 -6 6 h-56 a8 8 0 0 0 -16 0 h-44 a6 6 0 0 1 -6 -6 v-54 a6 6 0 0 1 6 -6Z"/>
      <path d="M64 26 v38" stroke-dasharray="3 4"/>
      <path d="M82 30 h36 M82 42 h26 M82 54 h32"/>
    </g>
    <g fill="#fff" fill-opacity=".45">${[[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[1,3],[3,1],[3,3]].map(([x,y])=>`<rect x="${22+x*7}" y="${30+y*7}" width="5" height="5" rx="1"/>`).join('')}</g>`);
}

return {C,branch,hero,stage,avatar,style,qr,viewfinder,ticket,stars};
})();
window.GB_ART=GB_ART;
