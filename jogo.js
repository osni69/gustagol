const CFG={"tiger": {"name": "Fortune Tiger", "img": "tigrinho 1.webp", "color": "#83531e", "pal": ["#e8433a", "#f4c400", "#3cc47c", "#4aa8ff", "#c77dff"], "shapes": ["diamond", "star", "clover", "coin", "crown"], "tag": "O tigre da sorte promete multiplicar tudo. Será?", "cat": "Clássicos", "w": [2, 4, 7, 11, 16, 20], "m": [680, 204, 90, 37, 15, 5], "rtp": 0.9262, "engine": "A"}, "rabbit": {"name": "Fortune Rabbit", "img": "coelho.png", "color": "#63376d", "pal": ["#ff7ab8", "#c77dff", "#ffd166", "#6ee7f2", "#ff9f6e"], "shapes": ["star", "diamond", "crown", "clover", "coin"], "tag": "Um coelho simpático, uma matemática nada simpática.", "cat": "Clássicos", "w": [1, 3, 6, 10, 16, 24], "m": [1391, 309, 88, 40, 14, 5], "rtp": 0.9037, "engine": "A"}, "cash": {"name": "Cash Mania", "img": "velho.png", "color": "#796624", "pal": ["#3cc47c", "#f4c400", "#ff8c42", "#5ab0ff", "#e8433a"], "shapes": ["coin", "crown", "diamond", "star", "clover"], "tag": "Muito dinheiro na tela. E na sua conta?", "cat": "Clássicos", "w": [3, 6, 9, 13, 16, 18], "m": [514, 154, 71, 31, 15, 5], "rtp": 0.938, "engine": "A"}, "sweet": {"name": "Sweet Bonanza", "img": "sweet bonanza.png", "color": "#543e86", "pal": ["#ff5fa2", "#ffb347", "#7ee081", "#6ec6ff", "#b388ff", "#ffe066"], "shapes": ["hex", "star", "coin", "diamond", "clover", "crown"], "tag": "Doces coloridos escondendo contas amargas.", "cat": "Aventura", "w": [1, 2, 4, 6, 8, 10, 12], "g": [12, 6, 3.5, 2, 1.3, 0.9, 0.6], "scale": 2.827, "rtp": 0.9107, "engine": "B"}, "pizza": {"name": "Pizza! Pizza! Pizza!", "img": "pizza.png", "color": "#8c3928", "pal": ["#e8433a", "#ffd166", "#7ee081", "#ff9f6e", "#c77dff", "#6ec6ff"], "shapes": ["coin", "hex", "clover", "star", "diamond", "crown"], "tag": "Quanto custa uma fatia de sorte?", "cat": "Aventura", "w": [2, 3, 5, 7, 9, 11, 12], "g": [10, 5, 3, 2, 1.3, 0.9, 0.6], "scale": 3.942, "rtp": 0.8999, "engine": "B"}, "bass": {"name": "Big Bass Bonanza", "img": "pexe.png", "color": "#225e7e", "pal": ["#4aa8ff", "#7ee0ff", "#ffd166", "#7ee081", "#ff7a7a", "#c9b8ff"], "shapes": ["diamond", "coin", "star", "hex", "crown", "clover"], "tag": "Você pesca o prêmio ou é o peixe?", "cat": "Aventura", "w": [1, 2, 3, 6, 9, 12, 14], "g": [16, 8, 4, 2, 1.3, 0.9, 0.6], "scale": 2.02, "rtp": 0.8901, "engine": "B"}};

const BETS=[1,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,200,300,400,500];
const AUTO_COUNTS=[10,20,30,40,50,60,70,80,90,100];
const $=s=>document.querySelector(s);
const fmt=n=>Math.round(n).toLocaleString('pt-BR');
const money=n=>'R$ '+Math.round(Math.abs(n)).toLocaleString('pt-BR');
const rnd=()=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296};
const id=document.body.dataset.game,G=CFG[id];
(function(){
if(!G){location.href='index.html';return}
try{localStorage.setItem('gustagol-last-game-v1',JSON.stringify({id,visitedAt:Date.now()}))}catch{}

document.documentElement.style.setProperty('--gc',G.color);
/* ---------- símbolos (cada jogo tem os seus) ---------- */
const SYMS={"tiger": ["<path d=\"M5 26c0-5 8-8 19-8s19 3 19 8c0 7-7 13-19 13S5 33 5 26z\" fill=\"#f4c400\"/><ellipse cx=\"24\" cy=\"24\" rx=\"13\" ry=\"4.5\" fill=\"#ffe27a\"/><path d=\"M12 31c3 3 7 4 12 4s9-1 12-4\" fill=\"none\" style=\"stroke:#b97a00;stroke-width:2;stroke-linecap:round\"/>", "<rect x=\"19\" y=\"5\" width=\"10\" height=\"5\" rx=\"1.5\" fill=\"#f4c400\"/><ellipse cx=\"24\" cy=\"25\" rx=\"15\" ry=\"14\" fill=\"#e8433a\"/><path d=\"M24 11c-7 5-7 23 0 28M24 11c7 5 7 23 0 28\" fill=\"none\" style=\"stroke:#ff9a8a;stroke-width:1.6\"/><rect x=\"19\" y=\"38\" width=\"10\" height=\"4\" rx=\"1.5\" fill=\"#f4c400\"/><path d=\"M24 42v5\" style=\"stroke:#f4c400;stroke-width:2.4;stroke-linecap:round\"/>", "<rect x=\"16\" y=\"14\" width=\"16\" height=\"30\" rx=\"3\" fill=\"#e8433a\"/><rect x=\"16\" y=\"20\" width=\"16\" height=\"4\" fill=\"#f4c400\"/><rect x=\"16\" y=\"34\" width=\"16\" height=\"4\" fill=\"#f4c400\"/><path d=\"M24 14c0-5 3-6 7-7\" fill=\"none\" style=\"stroke:#c9923f;stroke-width:2.2;stroke-linecap:round\"/><path d=\"M34 2l1.6 3.4 3.6.5-2.6 2.5.6 3.6L34 10.300l-3.200 1.700.6-3.600L28.800 5.900l3.600-.5z\" fill=\"#ffe27a\"/>", "<path d=\"M24 5l15 10-6 24H15L9 15z\" fill=\"#3cc47c\"/><path d=\"M24 5l-6 10 6 24 6-24z\" fill=\"#7ee0a8\"/><path d=\"M9 15h30\" fill=\"none\"/>", "<circle cx=\"24\" cy=\"24\" r=\"18\" fill=\"#f4c400\"/><circle cx=\"24\" cy=\"24\" r=\"13.500\" fill=\"none\" style=\"stroke:#b97a00;stroke-width:1.6\"/><rect x=\"18\" y=\"18\" width=\"12\" height=\"12\" rx=\"1\" fill=\"#3a2a10\"/>"], "rabbit": ["<path d=\"M13 15c7-5 15-5 22 0L26 44c-1 2-4 2-5 0z\" fill=\"#ff8c42\"/><path d=\"M17 23h6M25 29h6M20 35h5\" fill=\"none\" style=\"stroke:#c25a14;stroke-width:2;stroke-linecap:round\"/><path d=\"M24 15c-3-6-2-10 0-12 2 2 3 6 0 12zM24 15c-6-1-10-5-9-9 4 0 8 3 9 9zM24 15c6-1 10-5 9-9-4 0-8 3-9 9z\" fill=\"#3cc47c\"/>", "<rect x=\"8\" y=\"21\" width=\"32\" height=\"22\" rx=\"2\" fill=\"#c77dff\"/><rect x=\"6\" y=\"14\" width=\"36\" height=\"8\" rx=\"2\" fill=\"#a855f7\"/><rect x=\"21\" y=\"14\" width=\"6\" height=\"29\" fill=\"#ffd166\"/><path d=\"M24 14c-5-9-12-6-9-1 2 3 7 2 9 1zM24 14c5-9 12-6 9-1-2 3-7 2-9 1z\" fill=\"#ffd166\"/>", "<g fill=\"#ff7ab8\"><circle cx=\"24\" cy=\"12\" r=\"7.500\"/><circle cx=\"35\" cy=\"20\" r=\"7.500\"/><circle cx=\"31\" cy=\"33\" r=\"7.500\"/><circle cx=\"17\" cy=\"33\" r=\"7.500\"/><circle cx=\"13\" cy=\"20\" r=\"7.500\"/></g><circle cx=\"24\" cy=\"24\" r=\"6\" fill=\"#ffd166\"/>", "<g fill=\"#3cc47c\"><circle cx=\"24\" cy=\"14\" r=\"8\"/><circle cx=\"14\" cy=\"24\" r=\"8\"/><circle cx=\"34\" cy=\"24\" r=\"8\"/><circle cx=\"24\" cy=\"34\" r=\"8\"/></g><path d=\"M24 31c0 6-2 10-6 14\" fill=\"none\" style=\"stroke:#2a9d5f;stroke-width:3;stroke-linecap:round\"/>", "<path d=\"M24 42S6 31 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 13-18 24-18 24z\" fill=\"#ff5fa2\"/><path d=\"M13 16c1-3 4-4 6-3\" fill=\"none\" style=\"stroke:#fff;stroke-opacity:.7;stroke-width:2.5;stroke-linecap:round\"/>"], "cash": ["<rect x=\"18\" y=\"9\" width=\"12\" height=\"5\" rx=\"1.5\" fill=\"#f4c400\"/><path d=\"M19 14c-12 8-14 18-10 26 3 4 9 5 15 5s12-1 15-5c4-8 2-18-10-26z\" fill=\"#3cc47c\"/><text x=\"24\" y=\"38\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"800\" fill=\"#f4c400\" style=\"stroke:none\" font-family=\"Arial,sans-serif\">$</text>", "<path d=\"M5 41l4-10h30l4 10z\" fill=\"#f4c400\"/><path d=\"M12 30l3-9h18l3 9z\" fill=\"#ffe27a\"/><path d=\"M17 20l2.500-8h10l2.500 8z\" fill=\"#f4c400\"/>", "<path d=\"M9 18l6-9h18l6 9-15 23z\" fill=\"#6ec6ff\"/><path d=\"M9 18h30M15 9l9 32M33 9l-9 32\" fill=\"none\" style=\"stroke:#fff;stroke-opacity:.65;stroke-width:1.4\"/>", "<rect x=\"4\" y=\"12\" width=\"40\" height=\"24\" rx=\"3\" fill=\"#7ee081\"/><circle cx=\"24\" cy=\"24\" r=\"7\" fill=\"#3cc47c\"/><circle cx=\"11\" cy=\"24\" r=\"2.200\" fill=\"#3cc47c\"/><circle cx=\"37\" cy=\"24\" r=\"2.200\" fill=\"#3cc47c\"/>", "<circle cx=\"24\" cy=\"24\" r=\"18\" fill=\"#f4c400\"/><circle cx=\"24\" cy=\"24\" r=\"13.500\" fill=\"none\" style=\"stroke:#b97a00;stroke-width:1.6\"/><text x=\"24\" y=\"31\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"800\" fill=\"#8a5a0a\" style=\"stroke:none\" font-family=\"Arial,sans-serif\">$</text>"], "sweet": ["<path d=\"M24 42S6 31 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 13-18 24-18 24z\" fill=\"#e8334a\"/><path d=\"M13 16c1-3 4-4 6-3\" fill=\"none\" style=\"stroke:#fff;stroke-opacity:.75;stroke-width:2.5;stroke-linecap:round\"/>", "<path d=\"M24 30v15\" style=\"stroke:#fff;stroke-width:4;stroke-linecap:round\"/><circle cx=\"24\" cy=\"20\" r=\"15\" fill=\"#ff5fa2\"/><path d=\"M24 20a3 3 0 0 1 6 0 6 6 0 0 1-12 0 9 9 0 0 1 18 0\" fill=\"none\" style=\"stroke:#fff;stroke-width:3;stroke-linecap:round\"/>", "<path d=\"M3 14l11 10L3 34z\" fill=\"#6ec6ff\"/><path d=\"M45 14L34 24l11 10z\" fill=\"#6ec6ff\"/><ellipse cx=\"24\" cy=\"24\" rx=\"13\" ry=\"11\" fill=\"#4aa8ff\"/><path d=\"M15 21c4-3 14-3 18 0\" fill=\"none\" style=\"stroke:#fff;stroke-opacity:.65;stroke-width:2;stroke-linecap:round\"/>", "<g fill=\"#b388ff\"><circle cx=\"15\" cy=\"19\" r=\"6.500\"/><circle cx=\"24\" cy=\"19\" r=\"6.500\"/><circle cx=\"33\" cy=\"19\" r=\"6.500\"/><circle cx=\"19.500\" cy=\"28\" r=\"6.500\"/><circle cx=\"28.500\" cy=\"28\" r=\"6.500\"/><circle cx=\"24\" cy=\"37\" r=\"6.500\"/></g><path d=\"M24 12c0-4 2-6 5-7\" fill=\"none\" style=\"stroke:#7a4a1f;stroke-width:2.500;stroke-linecap:round\"/><path d=\"M27 9c4-4 10-3 11 1-3 3-8 3-11-1z\" fill=\"#3cc47c\"/>", "<path d=\"M9 9c1 16 9 28 31 30-2 5-9 7-16 5C13 41 5 27 6 12z\" fill=\"#ffe066\"/><path d=\"M6 13c0-4 3-6 5-5\" fill=\"none\" style=\"stroke:#7a4a1f;stroke-width:3;stroke-linecap:round\"/>", "<circle cx=\"15\" cy=\"34\" r=\"9\" fill=\"#e8334a\"/><circle cx=\"33\" cy=\"32\" r=\"9\" fill=\"#ff4d63\"/><path d=\"M15 25c2-10 8-16 16-18M33 23c0-6-1-11-2-16\" fill=\"none\" style=\"stroke:#3a7a2a;stroke-width:2.200;stroke-linecap:round\"/><path d=\"M31 7c4-3 10-2 12 2-4 3-9 2-12-2z\" fill=\"#3cc47c\"/>"], "pizza": ["<path d=\"M24 45L5 13c11-7 27-7 38 0z\" fill=\"#ffd166\"/><path d=\"M5 13c11-7 27-7 38 0\" fill=\"none\" style=\"stroke:#c97a2a;stroke-width:5;stroke-linecap:round\"/><circle cx=\"18\" cy=\"21\" r=\"4\" fill=\"#e8433a\"/><circle cx=\"30\" cy=\"22\" r=\"4\" fill=\"#e8433a\"/><circle cx=\"24\" cy=\"32\" r=\"3.500\" fill=\"#e8433a\"/>", "<circle cx=\"24\" cy=\"24\" r=\"17\" fill=\"#e8433a\"/><circle cx=\"17\" cy=\"19\" r=\"2.400\" fill=\"#b8231c\"/><circle cx=\"29\" cy=\"17\" r=\"2\" fill=\"#b8231c\"/><circle cx=\"31\" cy=\"28\" r=\"2.600\" fill=\"#b8231c\"/><circle cx=\"20\" cy=\"31\" r=\"2.200\" fill=\"#b8231c\"/>", "<circle cx=\"24\" cy=\"28\" r=\"16\" fill=\"#ff5a3d\"/><path d=\"M24 15c-4-5-10-4-12 0 3 2 9 3 12 0zM24 15c4-5 10-4 12 0-3 2-9 3-12 0z\" fill=\"#3cc47c\"/><rect x=\"22.500\" y=\"8\" width=\"3\" height=\"8\" rx=\"1.500\" fill=\"#3cc47c\"/>", "<path d=\"M5 25c0-11 8-18 19-18s19 7 19 18z\" fill=\"#d9a066\"/><circle cx=\"16\" cy=\"18\" r=\"3\" fill=\"#f4e0c0\"/><circle cx=\"29\" cy=\"14\" r=\"2.500\" fill=\"#f4e0c0\"/><circle cx=\"32\" cy=\"22\" r=\"2.400\" fill=\"#f4e0c0\"/><path d=\"M17 25h14l-2 18H19z\" fill=\"#f4e0c0\"/>", "<circle cx=\"24\" cy=\"24\" r=\"17\" fill=\"#2b2b2b\"/><circle cx=\"24\" cy=\"24\" r=\"7\" fill=\"#7a5a2a\"/><path d=\"M12 17c2-4 6-6 9-6\" fill=\"none\" style=\"stroke:#fff;stroke-opacity:.4;stroke-width:3;stroke-linecap:round\"/>", "<path d=\"M14 16c-4 8-3 20 4 26 3 2 9 2 12 0 7-6 8-18 4-26-4-3-16-3-20 0z\" fill=\"#3cc47c\"/><rect x=\"21\" y=\"6\" width=\"6\" height=\"10\" rx=\"2\" fill=\"#2a9d5f\"/><path d=\"M19 19c-1 6 0 12 3 16\" fill=\"none\" style=\"stroke:#8ff0b5;stroke-opacity:.75;stroke-width:2.500;stroke-linecap:round\"/>"], "bass": ["<path d=\"M4 24C10 12 24 10 32 20L44 10v28L32 28C24 38 10 36 4 24z\" fill=\"#3cc47c\"/><path d=\"M8 27c8 6 18 6 24 0\" fill=\"none\" style=\"stroke:#ffe27a;stroke-width:3;stroke-linecap:round\"/><circle cx=\"13\" cy=\"21\" r=\"2.600\" fill=\"#fff\"/><circle cx=\"13\" cy=\"21\" r=\"1.100\" fill=\"#1a1a1a\" style=\"stroke:none\"/>", "<rect x=\"6\" y=\"17\" width=\"36\" height=\"26\" rx=\"3\" fill=\"#8a5a2a\"/><rect x=\"6\" y=\"17\" width=\"36\" height=\"9\" rx=\"3\" fill=\"#a8702f\"/><path d=\"M17 17v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4\" fill=\"none\" style=\"stroke:#d6a14b;stroke-width:3\"/><rect x=\"20\" y=\"25\" width=\"8\" height=\"7\" rx=\"1.500\" fill=\"#f4c400\"/>", "<path d=\"M24 3v7\" style=\"stroke:#666;stroke-width:3;stroke-linecap:round\"/><path d=\"M10 26a14 14 0 0 1 28 0z\" fill=\"#e8433a\"/><path d=\"M10 26a14 14 0 0 0 28 0z\" fill=\"#f5f0e6\"/><path d=\"M24 40v6\" style=\"stroke:#666;stroke-width:3;stroke-linecap:round\"/>", "<path d=\"M27 6v25a8 8 0 1 1-16 0\" fill=\"none\" style=\"stroke:#cfd8e3;stroke-width:5;stroke-linecap:round\"/><path d=\"M11 31l-4-5\" style=\"stroke:#cfd8e3;stroke-width:4;stroke-linecap:round\"/><circle cx=\"27\" cy=\"7\" r=\"3\" fill=\"none\" style=\"stroke:#cfd8e3;stroke-width:2.500\"/>", "<path d=\"M24 4l5.500 13 14 1-10.600 9.200 3.300 13.800L24 33l-12.200 8 3.300-13.800L4.500 18l14-1z\" fill=\"#ff9f6e\"/><circle cx=\"24\" cy=\"21\" r=\"2\" fill=\"#ffd0b0\" style=\"stroke:none\"/><circle cx=\"19\" cy=\"26\" r=\"1.500\" fill=\"#ffd0b0\" style=\"stroke:none\"/><circle cx=\"29\" cy=\"26\" r=\"1.500\" fill=\"#ffd0b0\" style=\"stroke:none\"/>", "<path d=\"M14 5h13v20l15 6v11H8V30c0-3 2-5 6-6z\" fill=\"#8a5a2a\"/><rect x=\"14\" y=\"5\" width=\"13\" height=\"5\" fill=\"#c58a4a\"/><rect x=\"8\" y=\"40\" width=\"34\" height=\"4\" rx=\"1\" fill=\"#4a2f12\"/>"]};
const MARKS={tiger:'FT',rabbit:'FR',cash:'CM',sweet:'SB',pizza:'PP',bass:'BB'};
// Os arquivos de identidade visual são os mesmos usados nos cards do lobby.
// Se a pasta fotos estiver ausente, mostra uma marca tipográfica, nunca emojis.
const logoArt=(cls='')=>`<span class="logo-art ${cls}"><img src="fotos/${G.img}" alt="" draggable="false" onload="this.nextElementSibling.hidden=true" onerror="this.style.display='none'"><span class="logo-lettermark" aria-hidden="true">${MARKS[id]}</span></span>`;
const symHTML=i=>i===0?logoArt('sym-portrait'):`<svg class="sym" viewBox="0 0 48 48" aria-hidden="true">${SYMS[id][i-1]}</svg>`;
const coinArt=()=>`<svg class="gold-coin" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="#cf8e21" stroke="#fce49b" stroke-width="2.5"/><circle cx="24" cy="24" r="14.5" fill="#ffda68" stroke="#a96d15" stroke-width="2"/><path d="M24 14v20m-7-14c2-5 14-5 14 0 0 6-14 3-14 9 0 5 12 6 14 0" fill="none" stroke="#805016" stroke-width="2.6" stroke-linecap="round"/></svg>`;
const lockArt=()=>`<svg class="feature-glyph" viewBox="0 0 48 48" aria-hidden="true"><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#fce5a5" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="22" rx="5" fill="#d59c33" stroke="#fff2be" stroke-width="2"/><circle cx="24" cy="31" r="3" fill="#74501c"/></svg>`;
// O oitavo doce tem desenho vetorial próprio: preserva as oito probabilidades.
const bonusSym=v=>(id==='sweet'&&v===7)?`<svg class="sym" viewBox="0 0 48 48" aria-hidden="true"><path d="M9 13L4 8l2 16-2 16 12-7" fill="#e48af4"/><path d="M39 13l5-5-2 16 2 16-12-7" fill="#e48af4"/><rect x="10" y="14" width="28" height="20" rx="10" fill="#f4bd5a" stroke="#fff2be" stroke-width="2"/><path d="M17 16c-2 8 4 12 11 16M25 15c-2 8 4 12 11 15" fill="none" stroke="#ea6d62" stroke-width="3" stroke-linecap="round"/></svg>`:symHTML(v);
/* ---------- carteira e histórico (compartilhados com o lobby) ---------- */
const loadW=()=>{try{return{coins:1000,xp:0,...JSON.parse(localStorage.getItem('gustagol-wallet')||'{}')}}catch{return{coins:1000,xp:0}}};
function addCoins(d){const w=loadW();w.coins+=d;try{localStorage.setItem('gustagol-wallet',JSON.stringify(w))}catch{}return w.coins}
let S={};try{S=JSON.parse(localStorage.getItem('gustagol-stats')||'{}')}catch{}
S.per=S.per||{};const P=S.per[id]=Object.assign({spins:0,wagered:0,won:0,wins:0,ldw:0,near:0,cur:0,max:0,hist:[]},S.per[id]);
const saveS=()=>{try{localStorage.setItem('gustagol-stats',JSON.stringify(S))}catch{}};
let bal=loadW().coins,betIdx=0;
/* Histórico dos últimos 50 giros, separado por jogo e salvo neste navegador. */
const roundKey='gustagol-round-history-v1-'+id;
let roundHistory=[];
try{const saved=JSON.parse(localStorage.getItem(roundKey)||'[]');if(Array.isArray(saved))roundHistory=saved.slice(0,50)}catch{}
function renderRoundHistory(){
 const host=$('#p-history');if(!host)return;
 if(!roundHistory.length){host.innerHTML='<h3>Últimas rodadas</h3><p class="rounds-empty">Seu histórico começa depois do primeiro giro.</p>';return}
 const last=roundHistory.slice(0,50);
 host.innerHTML=`<div class="rounds-head"><h3>Últimas rodadas</h3></div><div class="rounds-list">${last.map(r=>{
  const stake=Number(r.stake)||0,win=Number(r.win)||0,net=Number(r.net)||0;
  const date=new Date(Number(r.at)||0);
  const dateText=Number.isFinite(date.getTime())?date.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';
  const isBonus=r.type==='bonus',isBuy=r.type==='buy';
  return `<div class="round-item"><div class="round-left"><strong>${isBuy?'Compra de bônus':isBonus?(r.purchased?'Bônus comprado':'Rodada bônus'):win>0?'Giro premiado':'Giro sem prêmio'}</strong><small>${dateText}${!isBonus&&r.bonus?' · Bônus ativado':''}</small></div><div class="round-figures"><span><small>Aposta</small><b>${fmt(stake)}</b></span><span><small>Prêmio</small><b>${fmt(win)}</b></span><span class="round-net ${net>=0?'positive':'negative'}"><small>Resultado</small><b>${net>0?'+':''}${fmt(net)}</b></span></div></div>`
 }).join('')}</div>`;
}
function saveRound(entry){
 roundHistory.unshift({at:Date.now(),type:entry.type==='bonus'?'bonus':entry.type==='buy'?'buy':'spin',stake:Number(entry.stake)||0,win:Number(entry.win)||0,net:Number(entry.net)||0,bonus:Boolean(entry.bonus),purchased:Boolean(entry.purchased)});
 if(roundHistory.length>50)roundHistory.length=50;
 try{localStorage.setItem(roundKey,JSON.stringify(roundHistory))}catch{}
 renderRoundHistory();
}

/* ---------- motor do jogo ---------- */
const E=G.engine==='A'?{cols:3}:{cols:5};
const wsum=G.w.reduce((a,b)=>a+b,0);
const draw=()=>{let r=rnd()*wsum;for(let i=0;i<G.w.length;i++){r-=G.w[i];if(r<0)return i}return G.w.length-1};
const LINES=[[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]]];
const FB={6:.5,7:1,8:2.5,9:6,10:15,11:40},fB=c=>FB[c]||(c>=12?100:0);
function play(bet,light){const grid=[];for(let c=0;c<E.cols;c++){grid.push([draw(),draw(),draw()])}
 let win=0,near=false;const hit=new Set();
 if(G.engine==='A'){for(const L of LINES){const s=L.map(([r,c])=>grid[c][r]);
  if(s[0]===s[1]&&s[1]===s[2]){win+=G.m[s[0]]*bet/5;if(!light)L.forEach(([r,c])=>hit.add(c+','+r))}
  else if((s[0]===s[1]&&s[0]<=2)||(s[1]===s[2]&&s[1]<=2))near=true}}
 else{const cnt=Array(G.w.length).fill(0);grid.forEach(col=>col.forEach(v=>cnt[v]++));
  cnt.forEach((n,i)=>{const f=fB(n);if(f){win+=G.g[i]*G.scale*f*bet;if(!light)grid.forEach((col,c)=>col.forEach((v,r)=>{if(v===i)hit.add(c+','+r)}))}else if(i<=2&&n===5)near=true})}
 win=Math.round(win);return{grid,win,hit,near:near&&win===0}}
/* ---------- interface ---------- */
$('#app').innerHTML=`
<section class="stage" style="--cols:${E.cols}">
 <div class="machine" id="machine"><div class="machine-top"><button id="machine-sound" class="machine-sound" type="button" aria-pressed="false" aria-label="Ativar som do jogo">◖ SOM OFF</button></div><div class="reels" id="reels"></div><div class="win-banner" id="win" aria-live="polite"></div><div class="game-particles" id="game-particles" aria-hidden="true"></div><div class="machine-bottom"><span>✦</span><i></i><span>✦</span></div></div>
 <div class="controls">
  <div class="bet wager"><label for="bval">APOSTA</label><div class="bet-ctl"><button type="button" id="bminus" aria-label="Diminuir aposta">−</button><select id="bval" class="bet-select" aria-label="Valor da aposta em moedas">${BETS.map(v=>`<option value="${v}">${v}</option>`).join('')}</select><button type="button" id="bplus" aria-label="Aumentar aposta">+</button></div></div>
  <div class="spin-stack"><button class="spin" id="spin" type="button">GIRAR</button><div class="auto-controls"><label class="auto-count-wrap" for="auto-count"><span>GIROS</span><select id="auto-count" class="auto-count" aria-label="Quantidade de giros automáticos">${AUTO_COUNTS.map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label><button class="auto-spin" id="auto-spin" type="button" aria-label="Iniciar giros automáticos">AUTO GIRAR</button></div></div>
  <div class="bet"><span>SALDO</span><b class="big" id="bal2">0</b></div>
  <button class="buy-bonus" id="buy-bonus" type="button"><span>COMPRAR BÔNUS</span><b id="buy-bonus-price">10 MOEDAS</b></button>
 </div>
 <p class="truth" id="truth" aria-live="polite"></p>
</section>
<section class="learn">
 <div class="tabs" role="tablist" aria-label="Informações dos jogos"><button class="on" data-t="how" role="tab" aria-selected="true">Como funciona</button><button data-t="pay" role="tab" aria-selected="false">Tabela de prêmios</button><button data-t="bonus" role="tab" aria-selected="false">Bônus</button><button data-t="history" role="tab" aria-selected="false">Histórico</button></div>
 <div class="panel" id="p-how" role="tabpanel"></div><div class="panel" id="p-pay" role="tabpanel" hidden></div><div class="panel" id="p-bonus" role="tabpanel" hidden><div id="bonus-details"></div><div class="bonus-feature" id="bonus-feature" aria-live="polite"></div></div><div class="panel" id="p-history" role="tabpanel" hidden></div>
</section>`;
const reels=$('#reels');
reels.innerHTML=Array.from({length:E.cols},(_,c)=>`<div class="reel" style="--reel-index:${c}">${[0,1,2].map(()=>'<div class="cell"></div>').join('')}</div>`).join('');
const colEls=[...reels.children],cells=colEls.map(c=>[...c.children]);
const setCell=(c,r,v)=>{cells[c][r].innerHTML=symHTML(v)};
for(let c=0;c<E.cols;c++)for(let r=0;r<3;r++)setCell(c,r,draw());
const bet=()=>BETS[betIdx];
function renderBal(){
 $('#bal').textContent=fmt(bal);$('#bal2').textContent=fmt(bal);$('#bval').value=String(bet());
 $('#bminus').disabled=spinning||autoLeft>0||betIdx===0;
 $('#bplus').disabled=spinning||autoLeft>0||betIdx===BETS.length-1;
}
function selectBet(index){
 if(spinning||autoLeft>0)return;
 betIdx=Math.max(0,Math.min(BETS.length-1,index));renderBal();renderAction();
}
$('#bminus').onclick=()=>selectBet(betIdx-1);
$('#bplus').onclick=()=>selectBet(betIdx+1);
$('#bval').onchange=e=>selectBet(BETS.indexOf(Number(e.target.value)));
/* RODADAS ESPECIAIS: todas as recompensas em moedas fictícias.
   As regras são originais e inspiradas em elementos visuais de cada slot. */
const BONUS={
 tiger:{title:'Fortune Tiger Feature',chance:.055,action:'INICIAR RESPINS',hint:'O tigre pode liberar respins com símbolos de ouro.',type:'tiger'},
 rabbit:{title:'Salto da Fortuna',chance:.065,action:'COMEÇAR GIROS GRÁTIS',hint:'Saltos especiais com coelhos WILD e multiplicadores.',type:'rabbit'},
 cash:{title:'Cofres Dourados',chance:.048,action:'ABRIR COFRES',hint:'Escolha cofres e revele valores em moedas.',type:'cash'},
 sweet:{title:'Sweet Free Spins',chance:.075,action:'JOGAR 10 GIROS',hint:'Dez giros grátis, doces e bombas multiplicadoras.',type:'sweet'},
 pizza:{title:'Forno da Fortuna',chance:.06,action:'GIRAR A PIZZA',hint:'Seis giros na roda das fatias premiadas.',type:'pizza'},
 bass:{title:'Big Bass Free Spins',chance:.052,action:'PESCAR 10 VEZES',hint:'Peixes com valores e pescador que coleta prêmios.',type:'bass'}
};
const bonus=BONUS[id];
const bonusIcon=logoArt('stamp-art');
const bonusKey='gustagol-coin-feature-v3-'+id;
let bonusState={pending:false,active:false,purchased:false,claimed:0,stake:1,remaining:0,steps:0,total:0,extra:0,details:'',board:[],locks:[],picks:0,fishers:0,mult:1,angle:0,settled:false};
try{const saved=JSON.parse(localStorage.getItem(bonusKey)||'{}');if(saved&&typeof saved==='object')bonusState={...bonusState,...saved,claimed:Number(saved.claimed)||0}}catch{}
const saveBonus=()=>{try{localStorage.setItem(bonusKey,JSON.stringify(bonusState))}catch{}};
const randint=n=>Math.floor(rnd()*n),choose=a=>a[randint(a.length)];
function renderBonus(){
 const ready=bonusState.pending||bonusState.active,host=$('#bonus-feature');host.classList.toggle('is-ready',ready);
 host.innerHTML=`<div class="bonus-icon">${logoArt()}</div><div class="bonus-info"><strong>${bonus.title}</strong><p>${ready?'Disponível para jogar.':'Pode aparecer em qualquer giro.'}</p></div>${ready?`<button class="bonus-action" id="bonus-action" type="button">${bonusState.active?'CONTINUAR BÔNUS':bonus.action} <span aria-hidden="true">✦</span></button>`:'<span class="bonus-star" aria-hidden="true">✦</span>'}`;
 const btn=$('#bonus-action');if(btn)btn.onclick=openBonus;
}
function addBonusStamps(){
 const available=[...Array(E.cols).keys()];
 const indices=available.sort(()=>rnd()-.5).slice(0,id==='sweet'?4:3);
 for(const c of indices){const r=randint(3),el=cells[c][r];el.classList.add('bonus-cell');el.insertAdjacentHTML('beforeend',`<span class="bonus-stamp" aria-label="Símbolo especial">${bonusIcon}</span>`)}
}
function unlockBonus(stake,purchased=false){
 bonusState={pending:true,active:false,purchased,claimed:bonusState.claimed,stake,remaining:0,steps:0,total:0,extra:0,details:'',board:[],locks:[],picks:0,fishers:0,mult:1,angle:0,settled:false};
 saveBonus();renderBonus();$('#bonus-feature').classList.add('bonus-celebrate');stopAuto();
}
function bonusShell(){
 let backdrop=$('#bonus-overlay');
 if(!backdrop){
  document.body.insertAdjacentHTML('beforeend','<div class="bonus-overlay" id="bonus-overlay" role="dialog" aria-modal="true" aria-labelledby="feature-title"><div class="bonus-modal" id="bonus-modal"></div></div>');
  backdrop=$('#bonus-overlay');
 }
 document.body.classList.add('bonus-open');backdrop.classList.add('visible');
 return $('#bonus-modal');
}
function bonusHead(){
 const n=bonusState;
 return `<div class="feature-top"><div class="feature-crest">${logoArt()}</div><div class="feature-title-wrap"><h2 id="feature-title">${bonus.title}</h2></div></div>
 <div class="feature-totals"><div><small>APOSTA DA RODADA</small><strong>${fmt(n.stake)} <span>MOEDAS</span></strong></div><div><small>PRÊMIO ACUMULADO</small><strong class="feature-payout">${fmt(n.total)} <span>MOEDAS</span></strong></div></div>`;
}
function featureBoard(){
 const n=bonusState;
 if(id==='tiger'){
  const slots=(n.locks.length?n.locks:Array(9).fill(0));
  return `<div class="feature-board tiger-board">${slots.map((v,i)=>`<div class="feature-tile ${v?'landed':''}" style="--i:${i}">${v?`<b>${v}×</b><span class="small-coin">${coinArt()}</span>`:'<span class="tile-shadow">✦</span>'}</div>`).join('')}</div><p class="feature-hint">Cada novo símbolo de ouro reinicia 3 respins. Ao terminar, os valores travados são somados.</p>`;
 }
 if(id==='rabbit'){
  const arr=(n.board.length?n.board:[1,3,0,2,4,1,3,0,5]);
  return `<div class="feature-board rabbit-board">${arr.map((v,i)=>`<div class="feature-tile" style="--i:${i}">${bonusSym(v)}</div>`).join('')}</div><p class="feature-hint">Coelhos especiais podem multiplicar os prêmios de cada salto.</p>`;
 }
 if(id==='cash'){
  const arr=(n.board.length?n.board:Array(9).fill(null));
  return `<div class="feature-board cash-board">${arr.map((v,i)=>v===null?`<button class="feature-vault" data-vault="${i}" aria-label="Abrir cofre ${i+1}"><span>${lockArt()}</span><small>COFRE ${i+1}</small></button>`:`<div class="feature-vault opened"><span>${coinArt()}</span><b>${v}×</b></div>`).join('')}</div><p class="feature-hint">Escolha ${Math.max(0,5-n.picks)} dos 9 cofres. Cada um pode esconder um prêmio diferente.</p>`;
 }
 if(id==='sweet'){
  const arr=(n.board.length?n.board:[4,1,2,3,5,1,6,4,0,7,1,2]);
  return `<div class="feature-board sweet-board">${arr.map((v,i)=>`<div class="feature-tile" style="--i:${i}">${bonusSym(v)}</div>`).join('')}</div><p class="feature-hint">Doces iguais rendem moedas. Bombas especiais multiplicam os ganhos desse giro.</p>`;
 }
 if(id==='pizza'){
  return `<div class="pizza-wheel-wrap"><div class="wheel-pointer">▼</div><div class="feature-pizza" style="--wheel-angle:${n.angle}deg"><div class="pizza-inner">${logoArt()}</div></div></div><p class="feature-hint">Cada fatia revela um multiplicador. O forno pode liberar uma rodada extra.</p>`;
 }
 const arr=(n.board.length?n.board:[1,3,2,3,4,1,3,2,3]);
 return `<div class="feature-board bass-board">${arr.map((v,i)=>`<div class="feature-tile" style="--i:${i}">${bonusSym(v)}</div>`).join('')}</div><p class="feature-hint">O pescador recolhe os valores dos peixes. A cada 4 pescadores, +3 giros e multiplicador maior.</p>`;
}
function renderBonusOverlay(){
 const n=bonusState,el=bonusShell();
 if(!n.active){
  el.innerHTML=`${bonusHead()}<div class="feature-intro"><div class="feature-hero">${logoArt()}<span>✦</span></div><p>${bonus.hint}</p></div><button class="feature-primary" id="feature-start" type="button">${bonus.action} <span>→</span></button>`;
  $('#feature-start').onclick=startBonus;return;
 }
 let remaining=id==='cash'?`${Math.max(0,5-n.picks)} CHAVES RESTANTES`:id==='tiger'?`${n.remaining} RESPINS RESTANTES`:`${n.remaining} GIROS RESTANTES`;
 if(n.settled){
  el.innerHTML=`${bonusHead()}<div class="feature-complete"><span class="complete-spark">✦</span><h3>BÔNUS CONCLUÍDO</h3><div class="feature-coin">${coinArt()}</div><strong>+${fmt(n.total)}</strong><p>moedas virtuais recebidas</p><small>${n.details||'Rodada especial finalizada.'}</small></div><button class="feature-primary" id="feature-close" type="button">VOLTAR AO JOGO <span>→</span></button>`;
  $('#feature-close').onclick=closeBonus;return;
 }
 el.innerHTML=`${bonusHead()}<div class="feature-progress"><span>${remaining}</span><span>${id==='bass'?`${n.fishers}/4 PESCADORES · ${n.mult}×`:id==='tiger'?'SÍMBOLOS TRAVADOS':id==='cash'?`${n.picks} / 5 COFRES ABERTOS`:`RODADA ${n.steps+1}`}</span></div>${featureBoard()}<div class="feature-message" aria-live="polite">${n.details||'Pronto para a rodada especial.'}</div>${id==='cash'?'':`<button class="feature-primary" id="feature-next" type="button">${id==='tiger'?'GIRAR RESPIN':id==='pizza'?'GIRAR FORNO':'GIRAR GRÁTIS'} <span>↻</span></button>`}`;
 if(id==='cash')el.querySelectorAll('[data-vault]').forEach(b=>b.onclick=()=>stepBonus(Number(b.dataset.vault)));
 else $('#feature-next').onclick=()=>stepBonus();
}
function openBonus(){if(!bonusState.pending&&!bonusState.active)return;renderBonusOverlay()}
function startBonus(){
 const n=bonusState;n.pending=false;n.active=true;n.settled=false;n.total=0;n.steps=0;n.details='Boa sorte!';
 n.remaining=({tiger:3,rabbit:6,cash:5,sweet:10,pizza:6,bass:10})[id];
 n.locks=Array(9).fill(0);n.board=[];n.picks=0;n.fishers=0;n.mult=1;
 if(id==='tiger'){const first=randint(9);n.locks[first]=choose([1,1,2,3]);let second=(first+1+randint(8))%9;n.locks[second]=choose([1,2]);}
 if(id==='cash')n.board=Array(9).fill(null);
 saveBonus();renderBonusOverlay();
}
let featureBusy=false;
function stepBonus(index){
 const n=bonusState;if(!n.active||n.settled||featureBusy)return;
 if(id==='cash'&&(index<0||index>8||n.board[index]!==null))return;
 featureBusy=true;
 const btn=$('#feature-next');if(btn)btn.disabled=true;
 let gained=0,note='';n.steps++;
 if(id==='tiger'){
  let found=0;
  n.locks.forEach((v,i)=>{if(!v&&rnd()<.22){n.locks[i]=choose([.5,1,1,1.5,2,3,5]);found++}});
  n.remaining=found?3:n.remaining-1;
  note=found?`${found} símbolo(s) de ouro! +3 respins.`:'Sem símbolos novos nesta rodada.';
  if(n.locks.every(v=>v>0))n.remaining=0;
  if(n.remaining===0){n.total=Math.round(n.locks.reduce((a,v)=>a+v,0)*n.stake);note=`${n.locks.filter(Boolean).length} símbolos: total de ${fmt(n.total)} moedas.`}
 }else if(id==='rabbit'){
  n.remaining--;const symbols=[0,3,1,4,2,5,0,2,3];
  n.board=Array.from({length:9},()=>choose(symbols));const wild=n.board.filter(x=>x===0).length;
  const mult=wild>=3?5:wild>=2?3:wild?2:1;
  const base=choose([0,0,.5,1,1.5,2,3,5]);gained=Math.round(base*mult*n.stake);
  note=`${wild?'Coelhos WILD: '+mult+'×. ':'Nenhum WILD. '}${gained?`+${fmt(gained)} moedas!`:'Nenhum prêmio neste salto.'}`;
 }else if(id==='cash'){
  n.remaining--;n.picks++;const val=choose([0,.5,1,1,1.5,2,3,5,8]);n.board[index]=val;
  gained=Math.round(val*n.stake);note=val?`Cofre aberto: ${val}× a aposta = +${fmt(gained)} moedas.`:'Cofre vazio!';
 }else if(id==='sweet'){
  n.remaining--;const symbols=[0,1,2,3,4,5,6,7];n.board=Array.from({length:12},()=>choose(symbols));
  const counts={};for(const s of n.board)counts[s]=(counts[s]||0)+1;
  const combos=Object.values(counts).filter(q=>q>=3);
  const bombs=rnd()<.38?choose([2,2,3,5,10]):1;
  const base=combos.length?combos.reduce((a,c)=>a+(c-2)*.5,0):rnd()<.2?.5:0;
  gained=Math.round(base*bombs*n.stake);
  note=`${combos.length?combos.length+' grupo(s) de doces. ':'Sem combinação. '}${bombs>1?'BOMBA '+bombs+'×! ':''}${gained?'+'+fmt(gained)+' moedas!':'Nenhum prêmio.'}`;
 }else if(id==='pizza'){
  n.remaining--;const val=choose([0,0,.5,1,1.5,2,3,5,8]);gained=Math.round(val*n.stake);
  n.angle+=1080+randint(8)*45;
  if(rnd()<.11&&n.extra<2){n.remaining++;n.extra++;note='FATIA EXTRA! +1 giro. '}else note='';
  note+=val?`Fatia ${val}×: +${fmt(gained)} moedas!`:'Fatia sem prêmio.';
 }else{
  n.remaining--;n.board=Array.from({length:9},()=>choose([1,2,1,3,3,4,3,1]));
  const fisherman=n.board.filter(x=>x===4).length,fish=n.board.filter(x=>x===1||x===2).length;
  if(fisherman){
   gained=Math.round(fish*choose([.5,1,1.5,2,3])*n.mult*n.stake);
   n.fishers+=fisherman;
   if(n.fishers>=4){n.fishers-=4;n.mult=Math.min(5,n.mult+1);n.remaining+=3;note=`PESCADOR ESPECIAL: +3 GIROS E ${n.mult}×! `}
   else note='Pescador recolheu os peixes! ';
  }else note='Os peixes escaparam. ';
  note+=gained?`+${fmt(gained)} moedas.`:'Sem coleta.';
 }
 if(id!=='tiger')n.total+=gained;
 n.details=note;
 saveBonus();renderBonusOverlay();
 const board=$('#bonus-modal .feature-board');if(board){board.classList.remove('feature-enter');void board.offsetWidth;board.classList.add('feature-enter')}
 if(gained)playSound('win');else playSound('stop');
 featureBusy=false;
 if(n.remaining<=0){setTimeout(()=>{if(n.active&&!n.settled){completeBonus()}},id==='pizza'?650:420)}
}
function completeBonus(){
 const n=bonusState;if(n.settled)return;
 n.settled=true; // salva antes do crédito; liquidação apenas uma vez.
 const amt=Math.max(0,Math.round(n.total));bal=addCoins(amt);
 P.won+=amt;if(amt>0)P.wins++;saveS();saveBonus();
 saveRound({type:'bonus',stake:n.stake,win:amt,net:amt,purchased:n.purchased});
 renderBal();renderAction();playSound('bonus');burst('bonus');renderBonusOverlay();
 $('#truth').textContent=`Bônus +${fmt(amt)} moedas`;
}
function closeBonus(){
 const n=bonusState;if(!n.settled)return;
 n.active=false;n.pending=false;n.purchased=false;n.claimed++;n.settled=false;n.board=[];n.locks=[];n.details='';saveBonus();
 const el=$('#bonus-overlay');if(el)el.classList.remove('visible');document.body.classList.remove('bonus-open');
 renderBonus();renderAction();
}
let spinning=false,autoLeft=0,autoTimer=null;
const audio={on:false,ctx:null};
function playSound(type){
 if(!audio.on)return;
 try{
  const A=window.AudioContext||window.webkitAudioContext;if(!A)return;
  if(!audio.ctx)audio.ctx=new A();if(audio.ctx.state==='suspended')audio.ctx.resume();
  const notes=type==='bonus'?[659,880,988,1318]:type==='win'?[523,659,784]:type==='stop'?[310]:[270,380];
  notes.forEach((freq,i)=>{const a=audio.ctx,t=a.currentTime+i*(type==='bonus'?.09:.07),o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(type==='stop'?.035:.055,t+.014);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.18)});
 }catch{}
}
$('#machine-sound').onclick=()=>{audio.on=!audio.on;const b=$('#machine-sound');b.classList.toggle('enabled',audio.on);b.textContent=audio.on?'◖ SOM ON':'◖ SOM OFF';b.setAttribute('aria-pressed',String(audio.on));b.setAttribute('aria-label',audio.on?'Desativar som do jogo':'Ativar som do jogo');if(audio.on)playSound('spin')};
const fxSymbol={tiger:'✦',rabbit:'✿',cash:'◆',sweet:'✳',pizza:'✦',bass:'✧'}[id];
function burst(kind){
 const host=$('#game-particles');host.replaceChildren();
 const total=kind==='bonus'?22:16;
 const frag=document.createDocumentFragment();
 for(let i=0;i<total;i++){
  const particle=document.createElement('span');particle.className='fx-particle';
  particle.textContent=i%4===0?'✦':fxSymbol;
  const deg=rnd()*Math.PI*2,dist=55+rnd()*170;
  particle.style.cssText=`--dx:${Math.cos(deg)*dist}px;--dy:${Math.sin(deg)*dist}px;--rot:${-120+rnd()*240}deg;--delay:${Math.floor(rnd()*140)}ms`;
  frag.append(particle);
 }
 host.append(frag);setTimeout(()=>host.replaceChildren(),1450);
}

function renderAction(){
 const spinBtn=$('#spin'),autoBtn=$('#auto-spin');if(!spinBtn||!autoBtn)return;
 spinBtn.disabled=spinning||autoLeft>0||bonusState.pending||bonusState.active||bal<bet();
 spinBtn.textContent=spinning?'GIRANDO…':'GIRAR';
 const active=autoLeft>0;
 const purchasePrice=bet()*10,buyBtn=$('#buy-bonus');
 buyBtn.disabled=spinning||active||bonusState.pending||bonusState.active||bal<purchasePrice;
 $('#buy-bonus-price').textContent=`${fmt(purchasePrice)} MOEDAS`;
 buyBtn.setAttribute('aria-label',`Comprar bônus por ${fmt(purchasePrice)} moedas virtuais, dez vezes a aposta`);
 buyBtn.title=bal<purchasePrice?'Saldo insuficiente para comprar o bônus':'Comprar bônus com moedas virtuais';
 autoBtn.disabled=!active&&(spinning||bonusState.pending||bonusState.active||bal<bet());
 autoBtn.textContent=active?`PARAR · ${autoLeft}`:'AUTO GIRAR';
 autoBtn.classList.toggle('active',active);
 autoBtn.setAttribute('aria-label',active?`Parar giro automático, faltam ${autoLeft} giros`:`Iniciar ${$('#auto-count').value} giros automáticos`);
 $('#bminus').disabled=spinning||active||betIdx===0;$('#bplus').disabled=spinning||active||betIdx===BETS.length-1;
 $('#bval').disabled=spinning||active;$('#auto-count').disabled=spinning||active;
}
function stopAuto(){autoLeft=0;clearTimeout(autoTimer);autoTimer=null;renderAction()}
function count(el,to){const t0=performance.now(),d=650;(function f(t){const p=Math.min(1,(t-t0)/d);el.textContent=fmt(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
function clearHit(){cells.flat().forEach(c=>c.classList.remove('hit','dim','bonus-cell'));$('#win').className='win-banner';$('#win').textContent=''}
async function spin(){
 if(spinning||bonusState.pending||bonusState.active||bal<bet()){renderAction();return}
 spinning=true;clearHit();renderAction();$('#machine').classList.add('is-spinning');playSound('spin');
 const b=bet(),res=play(b,false),bonusRolled=rnd()<bonus.chance;
 bal=addCoins(-b);renderBal();$('#truth').textContent='';
 const active=new Set(colEls.map((_,i)=>i));colEls.forEach(el=>el.classList.add('spinning'));
 const interval=setInterval(()=>{if(document.hidden)return;active.forEach(c=>{for(let r=0;r<3;r++)setCell(c,r,draw())})},100);
 const stopAt=c=>510+c*(E.cols===5?158:220);
 colEls.forEach((el,c)=>setTimeout(()=>{
  active.delete(c);el.classList.remove('spinning');for(let r=0;r<3;r++)setCell(c,r,res.grid[c][r]);
  el.classList.add('land');playSound('stop');setTimeout(()=>el.classList.remove('land'),420);
 },stopAt(c)));
 await new Promise(resolve=>setTimeout(resolve,stopAt(E.cols-1)+280));clearInterval(interval);$('#machine').classList.remove('is-spinning');
 finish(res,b,bonusRolled);
}
function finish(res,b,bonusRolled){
 const net=res.win-b;if(res.win>0)bal=addCoins(res.win);
 P.spins++;P.wagered+=b;P.won+=res.win;
 if(res.win>0){P.wins++;P.cur=0;if(res.win<b)P.ldw++}else{P.cur++;if(P.cur>P.max)P.max=P.cur}
 if(res.near)P.near++;
 P.hist.push((P.hist.length?P.hist[P.hist.length-1]:0)+net);if(P.hist.length>80)P.hist.shift();saveS();
 saveRound({type:'spin',stake:b,win:res.win,net,bonus:bonusRolled});
 const tr=$('#truth'),wn=$('#win');
 if(res.win>0){cells.forEach((col,c)=>col.forEach((el,r)=>{el.classList.add(res.hit.has(c+','+r)?'hit':'dim')}));
  wn.className='win-banner show';wn.innerHTML='PRÊMIO <b>+<span id="wn">0</span></b>';count($('#wn'),res.win);playSound('win');burst('win');$('#machine').classList.remove('win-flash');void $('#machine').offsetWidth;$('#machine').classList.add('win-flash')}
 tr.innerHTML=res.win?`Prêmio <b class="pos">+${fmt(res.win)}</b> · Saldo ${fmt(bal)}`:`Sem prêmio · Saldo ${fmt(bal)}`;
 if(bonusRolled){addBonusStamps();unlockBonus(b);burst('bonus');playSound('bonus');tr.textContent='Bônus liberado';setTimeout(openBonus,420)}
 spinning=false;renderBal();
 if(bal<bet()||bonusState.pending||bonusState.active){stopAuto();if(bal<bet()&&!bonusState.pending)tr.textContent='Saldo insuficiente para esse valor de aposta.';return}
 if(autoLeft>0){autoLeft--;if(autoLeft>0){renderAction();autoTimer=setTimeout(()=>spin(),480)}else stopAuto()}
 else renderAction();
}
function buyBonus(){
 const stake=bet(),price=stake*10;
 if(spinning||autoLeft>0||bonusState.pending||bonusState.active||bal<price){renderAction();return}
 // Compra com moedas virtuais: uma cobrança por acionamento, antes de iniciar o bônus.
 bal=addCoins(-price);
 P.wagered+=price;
 P.hist.push((P.hist.length?P.hist[P.hist.length-1]:0)-price);
 if(P.hist.length>80)P.hist.shift();saveS();
 saveRound({type:'buy',stake:price,win:0,net:-price});
 unlockBonus(stake,true);
 renderBal();
 $('#truth').textContent=`Bônus comprado · ${fmt(price)} moedas`;
 startBonus();
 renderAction();
}
$('#buy-bonus').onclick=buyBonus;
$('#spin').onclick=spin;
$('#auto-count').onchange=()=>renderAction();
$('#auto-spin').onclick=()=>{
 if(autoLeft>0){stopAuto();return}
 if(spinning||bonusState.pending||bonusState.active||bal<bet())return;
 autoLeft=Number($('#auto-count').value);renderAction();spin();
};
renderBonus();renderAction();if(bonusState.active||bonusState.pending)setTimeout(openBonus,250);
/* ---------- abas ---------- */
const isA=G.engine==='A';const sym=i=>`<span class="pi">${symHTML(i)}</span>`;
const maxX=isA?G.m[0]/5:G.g[0]*G.scale*15;
$('#p-how').innerHTML=isA?
`<p>3 colunas, 3 linhas e 5 linhas de pagamento. Três símbolos iguais em uma linha dão prêmio. O personagem é o símbolo mais raro e pode pagar até <b>${fmt(maxX)}×</b> a aposta.</p>`:
`<p>5 colunas e 3 linhas. Símbolos iguais contam em qualquer posição; a partir de 6, há prêmio. O personagem é o símbolo mais raro e pode pagar até <b>${fmt(maxX)}×</b> a aposta.</p>`;
$('#p-pay').innerHTML=isA?
`<p>3 símbolos iguais em uma linha, em múltiplos da aposta:</p><div class="pay">${G.m.map((m,i)=>`<div class="pr">${sym(i)}<b>${(m/5).toLocaleString('pt-BR',{maximumFractionDigits:1})}×</b><small>${(G.w[i]/wsum*100).toFixed(1).replace('.',',')}% de aparecer em cada posição</small></div>`).join('')}</div>`:
`<p>Multiplicadores por quantidade de símbolos iguais:</p><div class="pay B"><div class="pr head"><span></span><b>6</b><b>7</b><b>8</b><b>10</b><b>12+</b></div>${G.g.map((g,i)=>`<div class="pr">${sym(i)}${[6,7,8,10,12].map(c=>`<b>${(g*G.scale*fB(c)).toLocaleString('pt-BR',{maximumFractionDigits:1})}×</b>`).join('')}</div>`).join('')}</div>`;
const BONUS_EXPLANATIONS={
 tiger:'O bônus começa com símbolos dourados já travados na grade. Você recebe 3 respins; quando surge um símbolo novo, a contagem volta para 3. Quando os respins acabam ou a grade é completada, os multiplicadores dos símbolos são somados e aplicados à aposta.',
 rabbit:'São 6 giros especiais. Em cada giro, os coelhos WILD podem aumentar o multiplicador para 2×, 3× ou 5×. Os prêmios acumulados ao longo dos giros são pagos ao final.',
 cash:'Você abre até 5 cofres de um painel com 9 opções. Cada cofre pode estar vazio ou guardar um multiplicador de moedas, calculado sobre a aposta do bônus.',
 sweet:'Você joga 10 giros grátis com doces em uma grade especial. Combinações de três ou mais doces podem render moedas; bombas podem multiplicar o ganho de um giro.',
 pizza:'Você gira a roda de pizza por 6 rodadas iniciais. Cada fatia sorteia um multiplicador, e algumas rodadas podem acrescentar até 2 giros extras ao total.',
 bass:'Você recebe 10 giros de pesca. Quando aparecem pescadores, eles recolhem os valores dos peixes. Ao juntar 4 pescadores, você ganha 3 giros extras e um multiplicador maior.'
};
$('#bonus-details').innerHTML=`<p>${BONUS_EXPLANATIONS[id]}</p><p>Disponível por sorteio ou compra por <strong>10× a aposta</strong>. Os ganhos em moedas virtuais entram no saldo ao terminar.</p>`;
document.querySelectorAll('.tabs [data-t]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs [data-t]').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',String(x===b))});document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!=='p-'+b.dataset.t);if(b.dataset.t==='history')renderRoundHistory()});
renderRoundHistory();
/* início */
// Aposta inicial de 1 moeda; valores maiores ficam no seletor.
renderBal();renderAction();if(bal<BETS[0])$('#truth').textContent='Saldo insuficiente para girar.';
})();