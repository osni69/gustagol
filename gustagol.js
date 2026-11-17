'use strict';
const ic=n=>`<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const games=[{id:'tiger',name:'Fortune Tiger',image:'tigrinho 1.webp',category:'classics',color:'#83531e'},{id:'rabbit',name:'Fortune Rabbit',image:'coelho.png',category:'classics',color:'#63376d'},{id:'sweet',name:'Sweet Bonanza',image:'sweet bonanza.png',category:'adventure',color:'#543e86'},{id:'pizza',name:'Pizza! Pizza! Pizza!',image:'pizza.png',category:'adventure',color:'#8c3928'},{id:'bass',name:'Big Bass Bonanza',image:'pexe.png',category:'adventure',color:'#225e7e'},{id:'cash',name:'Cash Mania',image:'velho.png',category:'classics',color:'#796624'}];
const $=s=>document.querySelector(s);let favorites=new Set();try{favorites=new Set(JSON.parse(localStorage.getItem('gustagol-favorites')||'[]'));if(localStorage.getItem('gustagol-theme')==='light')document.body.classList.add('light')}catch{}
let filter='all',selected=null,toastTimer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2400)}
function toggleFavorite(id){favorites.has(id)?favorites.delete(id):favorites.add(id);try{localStorage.setItem('gustagol-favorites',JSON.stringify([...favorites]))}catch{}render();updateModal();toast(favorites.has(id)?'Adicionado aos favoritos':'Removido dos favoritos')}
function render(){const query=$('#search').value.trim().toLocaleLowerCase('pt-BR');const filtered=games.filter(g=>(filter==='all'||(filter==='favorites'?favorites.has(g.id):g.category===filter))&&g.name.toLocaleLowerCase('pt-BR').includes(query));$('#game-grid').innerHTML=filtered.map(g=>`<article class="game-card"><div class="cover" style="--card-bg:${g.color}"><button class="cover-open" data-open="${g.id}" aria-label="Visualizar ${g.name}"><img src="fotos/${g.image}" alt="${g.name}"></button><button class="favorite" data-fav="${g.id}" aria-label="Favoritar ${g.name}" aria-pressed="${favorites.has(g.id)}">${ic('heart')}</button></div><h3>${g.name}</h3><p>${g.category==='classics'?'CLÁSSICOS':'AVENTURA'} · PRÉVIA VISUAL</p></article>`).join('');$('#empty').hidden=filtered.length!==0;$('#fav-count').textContent=favorites.size}
function setFilter(value){filter=value;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('chosen',b.dataset.filter===value);b.setAttribute('aria-pressed',String(b.dataset.filter===value))});render()}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));$('#search').addEventListener('input',render);$('#favoritesNav').addEventListener('click',()=>{setFilter('favorites');$('#catalogo').scrollIntoView({behavior:'smooth'})});
function updateModal(){if(!selected)return;$('#modal-fav').textContent=favorites.has(selected.id)?'Remover dos favoritos':'Adicionar aos favoritos'}
$('#game-grid').addEventListener('click',e=>{const fav=e.target.closest('[data-fav]');if(fav){toggleFavorite(fav.dataset.fav);return}const open=e.target.closest('[data-open]');if(!open)return;selected=games.find(g=>g.id===open.dataset.open);$('#modal-title').textContent=selected.name;$('#modal-image').src='fotos/'+selected.image;$('#modal-image').alt=selected.name;updateModal();$('#game-modal').showModal()});$('#modal-fav').addEventListener('click',()=>toggleFavorite(selected.id));$('.close').addEventListener('click',()=>$('#game-modal').close());$('#game-modal').addEventListener('click',e=>{if(e.target===$('#game-modal')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
const slides=[{title:'Uma nova<br>forma de <em>brilhar.</em>',copy:'Seus personagens favoritos.<br>Uma experiência visual extraordinária.',game:0},{title:'Entre em um<br>universo <em>de cores.</em>',copy:'Um catálogo cheio de personalidade.<br>Descubra cada detalhe.',game:2},{title:'Seu próximo<br><em>favorito</em> está aqui.',copy:'Explore, descubra e personalize.<br>Deixe o lobby com a sua cara.',game:1}];document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.slide),s=slides[n];$('#hero-title').innerHTML=s.title;$('#hero-copy').innerHTML=s.copy;$('#slide-label').textContent=`0${n+1} / 03`;$('.hero-index').textContent=`GG / 0${n+1}`;document.querySelectorAll('[data-slide]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
let rotation=0;$('#spin').addEventListener('click',()=>{const button=$('#spin');button.disabled=true;button.textContent='Animação em andamento…';rotation+=1080;$('#wheel').style.transform=`rotate(${rotation}deg)`;setTimeout(()=>{button.disabled=false;button.innerHTML='Animar novamente '+ic('refresh')},matchMedia('(prefers-reduced-motion: reduce)').matches?100:3000)});
$('#theme').addEventListener('click',()=>{document.body.classList.toggle('light');try{localStorage.setItem('gustagol-theme',document.body.classList.contains('light')?'light':'dark')}catch{}});
$('#presentation').addEventListener('click',async()=>{try{if(document.fullscreenElement){await document.exitFullscreen()}else if(document.documentElement.requestFullscreen){await document.documentElement.requestFullscreen()}else{toast('Use a opção de tela cheia do navegador.')}}catch{toast('Use a opção de tela cheia do navegador.')}});document.addEventListener('fullscreenchange',()=>{$('#presentation b').textContent=document.fullscreenElement?'Sair da tela cheia':'Modo apresentação'});
function clock(){const now=new Date();$('#clock').textContent=now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'})+' · BRASIL'}clock();setInterval(clock,30000);render();

/* Carteira (moedas virtuais) */
const fmt=n=>n.toLocaleString('pt-BR');
let wallet={coins:1000,xp:0,last:'',streak:0};
try{const w=JSON.parse(localStorage.getItem('gustagol-wallet')||'null');if(w)wallet={...wallet,...w}}catch{}
const todayKey=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});
function saveWallet(){try{localStorage.setItem('gustagol-wallet',JSON.stringify(wallet))}catch{}}
let shownCoins=null;
function countTo(el,from,to){const t0=performance.now(),d=matchMedia('(prefers-reduced-motion: reduce)').matches?0:700;(function step(t){const p=d?1:Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(from+(to-from)*e));if(p<1)requestAnimationFrame(step)})(t0)}
function renderWallet(){const level=Math.floor(wallet.xp/500)+1,xp=wallet.xp%500;
 const to=wallet.coins;if(shownCoins===null){$('#balance').textContent=fmt(to);$('#balance-chip').textContent=fmt(to)}else if(shownCoins!==to){countTo($('#balance'),shownCoins,to);countTo($('#balance-chip'),shownCoins,to)}shownCoins=to;
 $('#level').textContent='NÍVEL '+level;$('#xp-bar').style.width=(xp/500*100)+'%';$('#xp-text').textContent=xp+' / 500 XP';
 const can=wallet.last!==todayKey();$('#bonus-status').textContent=can?'Disponível':'Coletado ✓';$('#claim').disabled=!can;$('#claim').innerHTML=can?'Coletar bônus diário '+ic('sparkle'):'Volte amanhã '+ic('moon');
 $('#streak').textContent=wallet.streak+(wallet.streak===1?' dia':' dias');$('#wallet-favs').textContent=favorites.size}
$('#claim').addEventListener('click',()=>{if(wallet.last===todayKey())return;const y=new Date(Date.now()-864e5).toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});wallet.streak=wallet.last===y?wallet.streak+1:1;const bonus=250+Math.min(wallet.streak-1,6)*50;wallet.coins+=bonus;wallet.xp+=120;wallet.last=todayKey();saveWallet();renderWallet();toast('+'+fmt(bonus)+' moedas coletadas!')});
const _render=render;render=function(){_render();if(document.getElementById('wallet-favs'))$('#wallet-favs').textContent=favorites.size};
renderWallet();

/* Logo circular: recorta automaticamente as margens vazias da imagem (se o navegador permitir) */
(function(){const img=document.querySelector('#wheel-logo img');if(!img)return;const src=img.getAttribute('src'),im=new Image();
im.onload=()=>{try{const w=im.naturalWidth,h=im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,w,h).data;
const px=(i)=>[d[i],d[i+1],d[i+2],d[i+3]];let hasAlpha=false;for(let i=3;i<d.length;i+=4*97){if(d[i]<250){hasAlpha=true;break}}
const bg=px(0);const isBg=i=>hasAlpha?d[i+3]<24:(Math.abs(d[i]-bg[0])+Math.abs(d[i+1]-bg[1])+Math.abs(d[i+2]-bg[2])<40);
let x0=w,y0=h,x1=0,y1=0;for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){if(!isBg((yy*w+xx)*4)){if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy}}
if(x1<=x0||y1<=y0)return;const s=Math.max(x1-x0,y1-y0)+1,cx=(x0+x1)/2,cy=(y0+y1)/2,o=document.createElement('canvas');o.width=o.height=Math.min(s,600);
o.getContext('2d').drawImage(im,cx-s/2,cy-s/2,s,s,0,0,o.width,o.height);img.src=o.toDataURL('image/png')}catch(e){}};im.src=src})();

/* Vídeo do banner */
(function(){const v=document.querySelector('#hero-video'),b=document.querySelector('#sound');if(!v||!b)return;
b.addEventListener('click',()=>{v.muted=!v.muted;if(!v.muted)v.play().catch(()=>{});b.innerHTML=ic(v.muted?'vol-off':'vol-on');b.setAttribute('aria-pressed',String(!v.muted));b.setAttribute('aria-label',v.muted?'Ativar som':'Desativar som')});
v.play&&v.play().catch(()=>{});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause()}})();

/* ===== Arcade ===== */
function addXp(n){wallet.xp+=n;saveWallet();renderWallet()}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>{const on=x===b;x.classList.toggle('chosen',on);x.setAttribute('aria-selected',String(on))});$('#tab-scratch').hidden=b.dataset.tab!=='scratch';$('#tab-memory').hidden=b.dataset.tab!=='memory';if(b.dataset.tab==='scratch')scInit()}));
/* Efeitos sonoros (opcionais) */
const sfx={on:false,ctx:null,
 init(){if(!this.ctx){const A=window.AudioContext||window.webkitAudioContext;if(A)this.ctx=new A()}if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume()},
 tone(f,t=0,d=.25,type='sine',v=.07){if(!this.on||!this.ctx)return;const c=this.ctx,o=c.createOscillator(),g=c.createGain(),s=c.currentTime+t;o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(v,s+.012);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+d+.03)},
 noise(d=.07,v=.025){if(!this.on||!this.ctx)return;const c=this.ctx,n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();f.type='highpass';f.frequency.value=2600;g.gain.value=v;s.buffer=b;s.connect(f);f.connect(g);g.connect(c.destination);s.start()},
 pop(){this.tone(660,0,.12,'sine',.05)},
 match(){this.tone(784,0,.16,'triangle',.06);this.tone(1047,.1,.26,'triangle',.06)},
 win(){[523,659,784,1047].forEach((f,i)=>this.tone(f,i*.09,.5,'triangle',.07))}};
try{sfx.on=localStorage.getItem('gustagol-sfx')==='on'}catch{}
document.addEventListener('pointerdown',()=>{if(sfx.on)sfx.init()},{passive:true});
(function(){const b=$('#sfx');if(!b)return;const paint=()=>{b.innerHTML=ic(sfx.on?'vol-on':'vol-off');b.setAttribute('aria-pressed',String(sfx.on));b.setAttribute('aria-label',sfx.on?'Desativar efeitos sonoros':'Ativar efeitos sonoros');b.title=sfx.on?'Som ligado':'Som desligado'};paint();
b.addEventListener('click',()=>{sfx.on=!sfx.on;if(sfx.on){sfx.init();sfx.pop()}try{localStorage.setItem('gustagol-sfx',sfx.on?'on':'off')}catch{}paint()})})();
/* Raspadinha visual (sem prêmios) */
(function(){const cv=$('#scratch-canvas'),fx=$('#scratch-fx'),box=$('#scratch-box'),img=$('#scratch-img'),title=$('#scratch-title'),ctx=cv.getContext('2d',{willReadFrequently:true}),fctx=fx.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let done=false,drawing=false,last=null,cur=null,lastCheck=0,lastNoise=0,prev=-1,parts=[],raf=0,W=0,H=0,dpr=1;
let album=new Set();try{album=new Set(JSON.parse(localStorage.getItem('gustagol-album')||'[]'))}catch{}
function renderAlbum(fresh){$('#album').innerHTML=games.map(g=>{const own=album.has(g.id);return `<div class="album-slot${own?' own':''}${fresh===g.id?' fresh':''}" style="--card-bg:${g.color}" title="${own?g.name:'Ainda não revelada'}"><div class="album-art"><img src="fotos/${g.image}" alt="${own?g.name:'Carta ainda não revelada'}" draggable="false"></div><span>${own?g.name:'?'}</span></div>`}).join('');$('#album-count').textContent=album.size+' / '+games.length+' reveladas'}
const GOLD=['#ffe38a','#f4c400','#ffb247','#fff6c8','#ffffff'];
function size(){dpr=Math.min(2,devicePixelRatio||1);W=box.clientWidth;H=box.clientHeight;[cv,fx].forEach(c=>{c.width=Math.round(W*dpr);c.height=Math.round(H*dpr)});ctx.setTransform(dpr,0,0,dpr,0,0);fctx.setTransform(dpr,0,0,dpr,0,0)}
function foil(){ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(0,0,W,H);[[0,'#b8860b'],[.2,'#f6d56a'],[.45,'#c99a1d'],[.7,'#ffe9a6'],[1,'#b07a08']].forEach(s=>g.addColorStop(s[0],s[1]));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(110,65,0,.10)';for(let y=14;y<H;y+=26)for(let x=(y/26%2?13:0)+13;x<W;x+=26){ctx.beginPath();ctx.moveTo(x,y-5);ctx.lineTo(x+5,y);ctx.lineTo(x,y+5);ctx.lineTo(x-5,y);ctx.fill()}
for(let i=0;i<1600;i++){ctx.fillStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(70,40,0,.06)';ctx.fillRect(Math.random()*W,Math.random()*H,1.4,1.4)}
const s=ctx.createLinearGradient(0,H,W,0);s.addColorStop(.35,'rgba(255,255,255,0)');s.addColorStop(.5,'rgba(255,255,255,.38)');s.addColorStop(.65,'rgba(255,255,255,0)');ctx.fillStyle=s;ctx.fillRect(0,0,W,H);
ctx.strokeStyle='rgba(90,50,0,.45)';ctx.lineWidth=2;ctx.strokeRect(10,10,W-20,H-20);ctx.strokeStyle='rgba(255,246,200,.6)';ctx.lineWidth=1;ctx.strokeRect(14,14,W-28,H-28);
ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 '+Math.round(W/9)+'px "Bricolage Grotesque",Arial,sans-serif';ctx.fillStyle='rgba(255,246,200,.7)';ctx.fillText('RASPE AQUI',W/2+1.5,H/2+1.5);ctx.fillStyle='rgba(95,55,0,.85)';ctx.fillText('RASPE AQUI',W/2,H/2);
ctx.font='600 '+Math.round(W/30)+'px "DM Sans",Arial,sans-serif';ctx.fillStyle='rgba(95,55,0,.7)';ctx.fillText('G U S T A G O L . B E T',W/2,H/2+W/10)}
/* partículas */
function emit(x,y,n,power,up){if(reduce)return;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=(.4+Math.random())*power;parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(up||0),l:0,m:34+Math.random()*34,s:1.6+Math.random()*3,c:GOLD[Math.floor(Math.random()*GOLD.length)],r:Math.random()*6,vr:(Math.random()-.5)*.35})}if(parts.length>260)parts.splice(0,parts.length-260);if(!raf)raf=requestAnimationFrame(tick)}
function tick(){raf=0;fctx.clearRect(0,0,W,H);parts=parts.filter(p=>p.l<p.m);for(const p of parts){p.l++;p.vy+=.14;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;fctx.globalAlpha=Math.max(0,1-p.l/p.m);fctx.fillStyle=p.c;fctx.save();fctx.translate(p.x,p.y);fctx.rotate(p.r);fctx.fillRect(-p.s,-p.s/2,p.s*2,p.s);fctx.restore()}fctx.globalAlpha=1;if(parts.length)raf=requestAnimationFrame(tick)}
function replay(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)}
window.scInit=function(){if(!box.clientWidth)return;busy=false;const missing=games.map((g,i)=>i).filter(i=>!album.has(games[i].id));let n=prev;for(let t=0;t<12&&n===prev;t++)n=(missing.length&&Math.random()<.7)?missing[Math.floor(Math.random()*missing.length)]:Math.floor(Math.random()*games.length);prev=n;cur=games[n];done=false;parts=[];box.classList.remove('done','scratching','leaving');cv.style.transition='none';cv.classList.remove('revealed');size();foil();void cv.offsetWidth;cv.style.transition='';img.src='fotos/'+cur.image;img.alt='Personagem escondido';box.style.setProperty('--card-bg',cur.color);replay(box,'enter');title.textContent='Raspe para revelar';replay(title,'swap');$('#scratch-bar').style.width='0%';$('#scratch-pct').textContent='0% revelado'};
function pos(e){const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}}
function pct(){const d=ctx.getImageData(0,0,cv.width,cv.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=64){t++;if(d[i]<128)c++}return Math.round(c/t*100)}
function check(){const p=Math.min(100,pct());$('#scratch-bar').style.width=p+'%';$('#scratch-pct').textContent=p+'% revelado';if(p>=55&&!done)finish()}
function finish(){done=true;drawing=false;box.classList.remove('scratching');cv.classList.add('revealed');box.classList.add('done');title.textContent=cur.name;replay(title,'swap');$('#scratch-bar').style.width='100%';$('#scratch-pct').textContent='100% revelado';emit(W/2,H/2,90,6.5,3);setTimeout(()=>emit(W/2,H/2,50,4.5,2),180);sfx.win();const fresh=!album.has(cur.id);album.add(cur.id);try{localStorage.setItem('gustagol-album',JSON.stringify([...album]))}catch{}renderAlbum(fresh?cur.id:null);toast((fresh?'Nova no álbum: ':'Personagem revelado: ')+cur.name+' · +15 XP');addXp(15);if(fresh&&album.size===games.length)setTimeout(()=>{toast('Álbum completo! · +60 XP');addXp(60)},2600)}
function scratch(a,b){ctx.globalCompositeOperation='destination-out';ctx.lineCap=ctx.lineJoin='round';ctx.lineWidth=Math.max(30,W/9);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x+.01,b.y);ctx.stroke();const d=Math.hypot(b.x-a.x,b.y-a.y);const nt=performance.now();if(nt-lastNoise>75){lastNoise=nt;sfx.noise(.07,.025)}emit(b.x,b.y,Math.min(4,1+Math.floor(d/6)),2.2,1.6)}
cv.addEventListener('pointerdown',e=>{if(done)return;drawing=true;box.classList.add('scratching');cv.setPointerCapture(e.pointerId);last=pos(e);scratch(last,last)});
cv.addEventListener('pointermove',e=>{if(!drawing||done)return;const p=pos(e);scratch(last,p);last=p;const n=performance.now();if(n-lastCheck>160){lastCheck=n;check()}});
['pointerup','pointercancel'].forEach(ev=>cv.addEventListener(ev,()=>{if(!drawing)return;drawing=false;box.classList.remove('scratching');check()}));
let busy=false;$('#scratch-new').addEventListener('click',()=>{if(busy)return;busy=true;if(reduce||!cur){scInit();return}drawing=false;box.classList.remove('enter','done','scratching');replay(box,'leaving');setTimeout(scInit,340)});
let rw=0,rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(box.clientWidth&&box.clientWidth!==rw&&!done){rw=box.clientWidth;scInit()}},250)});
addEventListener('load',()=>{rw=box.clientWidth;scInit()});rw=box.clientWidth;renderAlbum();scInit();
})();
/* Jogo da memória */
(function(){const grid=$('#mem-grid');let first=null,lock=false,moves=0,pairs=0,best=null;try{best=Number(localStorage.getItem('gustagol-memory-best'))||null}catch{}
const showBest=()=>{$('#mem-best').textContent=best||'—'};
function start(){first=null;lock=false;moves=0;pairs=0;$('#mem-moves').textContent=0;showBest();const deck=[...games,...games].map((g,i)=>({g,k:i})).sort(()=>Math.random()-.5);
grid.innerHTML=deck.map(c=>`<button class="mem-card" data-id="${c.g.id}" aria-label="Carta virada"><span class="mem-inner"><span class="mem-front">${ic('sparkle')}</span><span class="mem-back" style="--card-bg:${c.g.color}"><img src="fotos/${c.g.image}" alt="${c.g.name}" draggable="false"></span></span></button>`).join('')}
grid.addEventListener('click',e=>{const c=e.target.closest('.mem-card');if(!c||lock||c===first||c.classList.contains('matched'))return;c.classList.add('flipped');sfx.pop();if(!first){first=c;return}
moves++;$('#mem-moves').textContent=moves;if(first.dataset.id===c.dataset.id){first.classList.add('matched');c.classList.add('matched');sfx.match();first=null;pairs++;if(pairs===games.length){const isBest=!best||moves<best;if(isBest){best=moves;try{localStorage.setItem('gustagol-memory-best',String(best))}catch{}showBest()}sfx.win();toast('Você completou em '+moves+' jogadas'+(isBest?' · novo recorde!':'')+' · +40 XP');addXp(40)}}
else{lock=true;const a=first;first=null;setTimeout(()=>{a.classList.remove('flipped');c.classList.remove('flipped');lock=false},800)}});
$('#mem-reset').addEventListener('click',start);start()})();

/* Garante que o vídeo do banner toque (tenta de novo no primeiro toque/clique e ao voltar para a aba) */
(function(){const v=document.querySelector('#hero-video');if(!v||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const go=()=>{if(v.paused)v.play().catch(()=>{})};
['pointerdown','keydown','scroll'].forEach(e=>addEventListener(e,go,{once:true,passive:true}));document.addEventListener('visibilitychange',()=>{if(!document.hidden)go()});v.addEventListener('canplay',go)})();

/* Destaque da seção atual na navegação */
(function(){const map=[['inicio','.hero'],['catalogo','#catalogo'],['arcade','#arcade'],['carteira','#carteira'],['roleta','#roleta'],['ajuda','#ajuda']].map(([id,s])=>[id,document.querySelector(s)]).filter(x=>x[1]);
const links=[...document.querySelectorAll('header nav a,.sidebar a.side-link,.tabbar a')];let t=0;
function mark(){t=0;let cur='inicio';for(const [id,el] of map){if(el.getBoundingClientRect().top<=180)cur=id}
if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=map[map.length-1][0];
links.forEach(a=>{const on=a.getAttribute('href')==='#'+cur;if(a.closest('header'))a.classList.toggle('active',on);if(a.classList.contains('side-link'))a.classList.toggle('selected',on);if(a.closest('.tabbar'))a.classList.toggle('on',on)})}
addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(mark)},{passive:true});mark()})();
/* Destaques do banner: troca automática (pausa com o mouse em cima) */
(function(){const dots=[...document.querySelectorAll('[data-slide]')],hero=document.querySelector('.hero');if(!dots.length||!hero)return;let i=0,paused=false;
dots.forEach((d,k)=>d.addEventListener('click',()=>{i=k;['#hero-title','#hero-copy'].forEach(s=>{const el=document.querySelector(s);el.classList.remove('swap');void el.offsetWidth;el.classList.add('swap')})}));
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
['pointerenter','focusin'].forEach(e=>hero.addEventListener(e,()=>paused=true));['pointerleave','focusout'].forEach(e=>hero.addEventListener(e,()=>paused=false));
setInterval(()=>{if(paused||document.hidden)return;dots[(i+1)%dots.length].click()},7000)})();