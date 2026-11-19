'use strict';
const ic=n=>`<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const games=[{id:'tiger',name:'Fortune Tiger',image:'tigrinho 1.webp',category:'classics',color:'#83531e'},{id:'rabbit',name:'Fortune Rabbit',image:'coelho.png',category:'classics',color:'#63376d'},{id:'sweet',name:'Sweet Bonanza',image:'sweet bonanza.png',category:'adventure',color:'#543e86'},{id:'pizza',name:'Pizza! Pizza! Pizza!',image:'pizza.png',category:'adventure',color:'#8c3928'},{id:'bass',name:'Big Bass Bonanza',image:'pexe.png',category:'adventure',color:'#225e7e'},{id:'cash',name:'Cash Mania',image:'velho.png',category:'classics',color:'#796624'}];
/* Último jogo visitado — armazenado apenas no navegador. */
const gamePages={tiger:'tigrinho.html',rabbit:'coelho.html',cash:'cas.html',sweet:'sweet.html',pizza:'pizza.html',bass:'bigbass.html'};
function renderContinueGame(){
 const shortcut=document.getElementById('continue-game');if(!shortcut)return;
 let recent;try{recent=JSON.parse(localStorage.getItem('gustagol-last-game-v1')||'null')}catch{}
 const game=recent&&games.find(g=>g.id===recent.id);
 if(!game){shortcut.hidden=true;return}
 shortcut.hidden=false;shortcut.href=gamePages[game.id];shortcut.setAttribute('aria-label',`Continuar jogando ${game.name}`);
 document.getElementById('continue-title').textContent=game.name;
 document.getElementById('continue-fallback').textContent=game.name.split(' ').map(x=>x[0]).slice(0,2).join('');
 const image=document.getElementById('continue-image');image.style.display='block';image.onerror=()=>{image.style.display='none'};
 image.src='fotos/'+game.image;
}
window.addEventListener('pageshow',renderContinueGame);
renderContinueGame();
const $=s=>document.querySelector(s);let favorites=new Set();try{favorites=new Set(JSON.parse(localStorage.getItem('gustagol-favorites')||'[]'));if(localStorage.getItem('gustagol-theme')==='light')document.body.classList.add('light')}catch{}
let filter='all',selected=null,toastTimer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2400)}
function toggleFavorite(id){favorites.has(id)?favorites.delete(id):favorites.add(id);try{localStorage.setItem('gustagol-favorites',JSON.stringify([...favorites]))}catch{}render();updateModal();toast(favorites.has(id)?'Adicionado aos favoritos':'Removido dos favoritos')}
function render(){const query=$('#search').value.trim().toLocaleLowerCase('pt-BR');const filtered=games.filter(g=>(filter==='all'||(filter==='favorites'?favorites.has(g.id):g.category===filter))&&g.name.toLocaleLowerCase('pt-BR').includes(query));$('#game-grid').innerHTML=filtered.map(g=>`<article class="game-card"><div class="cover" style="--card-bg:${g.color}"><button class="cover-open" data-open="${g.id}" aria-label="Visualizar ${g.name}"><img src="fotos/${g.image}" alt="${g.name}"></button><button class="favorite" data-fav="${g.id}" aria-label="Favoritar ${g.name}" aria-pressed="${favorites.has(g.id)}">${ic('heart')}</button></div><h3>${g.name}</h3><p>${g.category==='classics'?'CLÁSSICOS':'AVENTURA'} · PRÉVIA VISUAL</p></article>`).join('');$('#empty').hidden=filtered.length!==0;$('#fav-count').textContent=favorites.size}
function setFilter(value){filter=value;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('chosen',b.dataset.filter===value);b.setAttribute('aria-pressed',String(b.dataset.filter===value))});render()}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));$('#search').addEventListener('input',render);$('#favoritesNav').addEventListener('click',()=>{setFilter('favorites');$('#catalogo').scrollIntoView({behavior:'smooth'})});
function updateModal(){if(!selected)return;$('#modal-fav').textContent=favorites.has(selected.id)?'Remover dos favoritos':'Adicionar aos favoritos'}

function showModalLogoFallback(){
 if(!selected)return;
 const img=$('#modal-image'),f=$('#modal-logo-fallback');
 img.style.visibility='hidden';
 f.querySelector('b').textContent=({tiger:'FT',rabbit:'FR',sweet:'SB',pizza:'PP',bass:'BB',cash:'CM'})[selected.id];
 f.querySelector('small').textContent=selected.name;
 f.classList.add('visible');
}
$('#modal-image').addEventListener('load',()=>{
 $('#modal-image').style.visibility='visible';
 $('#modal-logo-fallback').classList.remove('visible');
});
$('#modal-image').addEventListener('error',showModalLogoFallback);

$('#game-grid').addEventListener('click',e=>{const fav=e.target.closest('[data-fav]');if(fav){toggleFavorite(fav.dataset.fav);return}const open=e.target.closest('[data-open]');if(!open)return;selected=games.find(g=>g.id===open.dataset.open);$('#modal-title').textContent=selected.name;const modalImg=$('#modal-image');const fallback=$('#modal-logo-fallback');
modalImg.style.visibility='visible';modalImg.style.display='block';
modalImg.removeAttribute('data-gg-fallback');fallback.classList.remove('visible');
modalImg.alt=selected.name;modalImg.src='fotos/'+selected.image;
if(modalImg.complete && !modalImg.naturalWidth)showModalLogoFallback();$('#modal-play').href=({tiger:'tigrinho',rabbit:'coelho',cash:'cas',pizza:'pizza',sweet:'sweet',bass:'bigbass'})[selected.id]+'.html';updateModal();$('#game-modal').showModal()});$('#modal-fav').addEventListener('click',()=>toggleFavorite(selected.id));$('.close').addEventListener('click',()=>$('#game-modal').close());$('#game-modal').addEventListener('click',e=>{if(e.target===$('#game-modal')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
const slides=[{title:'Uma nova<br>forma de <em>brilhar.</em>',copy:'Seus personagens favoritos.<br>Uma experiência visual extraordinária.',game:0},{title:'Entre em um<br>universo <em>de cores.</em>',copy:'Um catálogo cheio de personalidade.<br>Descubra cada detalhe.',game:2},{title:'Seu próximo<br><em>favorito</em> está aqui.',copy:'Explore, descubra e personalize.<br>Deixe o lobby com a sua cara.',game:1}];document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.slide),s=slides[n];$('#hero-title').innerHTML=s.title;$('#hero-copy').innerHTML=s.copy;$('#slide-label').textContent=`0${n+1} / 03`;$('.hero-index').textContent=`GG / 0${n+1}`;document.querySelectorAll('[data-slide]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
$('#theme').addEventListener('click',()=>{document.body.classList.toggle('light');try{localStorage.setItem('gustagol-theme',document.body.classList.contains('light')?'light':'dark')}catch{}});
function clock(){const now=new Date();$('#clock').textContent=now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'})+' · BRASIL'}clock();setInterval(clock,30000);render();

/* Carteira (moedas virtuais) */
const fmt=n=>n.toLocaleString('pt-BR');
let wallet={coins:1000,xp:0,last:'',streak:0,wheelDay:''};
try{const w=JSON.parse(localStorage.getItem('gustagol-wallet')||'null');if(w)wallet={...wallet,...w}}catch{}
const todayKey=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});
function saveWallet(){try{localStorage.setItem('gustagol-wallet',JSON.stringify(wallet))}catch{}}
let shownCoins=null;
function countTo(el,from,to){const t0=performance.now(),d=700;(function step(t){const p=d?1:Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(from+(to-from)*e));if(p<1)requestAnimationFrame(step)})(t0)}
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
})();

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
/* Raspadinha: nove casas individuais, sorteadas uma vez por dia; prêmio ao revelar os seis diferentes. */
(function(){
 const grid=$('#scratch-grid'),box=$('#scratch-box'),title=$('#scratch-title');
 const KEY='gustagol-scratch-individual-v1',REWARD=600;
 const ids=new Set(games.map(g=>g.id));
 const byId=new Map(games.map(g=>[g.id,g]));
 let daily=null,activeDay='',drawing=null,lastSound=0;
 const random=()=>{try{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296}catch{return Math.random()}};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(daily))}catch{}};
 const valid=d=>d&&d.day===todayKey()&&Array.isArray(d.cells)&&d.cells.length===9&&d.cells.every(id=>ids.has(id))&&Array.isArray(d.revealed)&&d.revealed.length===9&&d.revealed.every(b=>typeof b==='boolean')&&typeof d.claimed==='boolean';
 function getDaily(){const day=todayKey();if(daily&&activeDay===day)return daily;
  activeDay=day;
  try{daily=JSON.parse(localStorage.getItem(KEY)||'null')}catch{daily=null}
  if(!valid(daily)){
   daily={day,cells:Array.from({length:9},()=>games[Math.floor(random()*games.length)].id),revealed:Array(9).fill(false),claimed:false};
   save();
  }
  return daily;
 }
 const found=()=>new Set(daily.cells.filter((_,i)=>daily.revealed[i]));
 const eligible=()=>found().size===games.length&&!daily.claimed;
 const count=()=>daily.revealed.filter(Boolean).length;
 function renderStatus(){
  const seen=found(),n=count(),all=n===9;
  $('#album').innerHTML=games.map(g=>{const yes=seen.has(g.id);
   return `<div class="album-slot${yes?' own':''}" style="--card-bg:${g.color}"><div class="album-art"><img src="fotos/${g.image}" alt="${yes?g.name:'Ainda não revelado'}" draggable="false"></div><span>${yes?g.name:'Não revelado'}</span></div>`;
  }).join('');
  $('#album-count').textContent=`${seen.size} / ${games.length} diferentes`;
  const btn=$('#scratch-claim');btn.hidden=!eligible();btn.disabled=!eligible();
  $('#scratch-bar').style.width=n/9*100+'%';
  $('#scratch-pct').textContent=`${n} de 9 casas reveladas`;
  title.textContent=all?'Cartela revelada':n?'Continue raspando':'Raspe uma casa por vez';
  const status=$('#scratch-status');
  if(daily.claimed)status.textContent='Bônus de 600 moedas já coletado. Nova cartela amanhã.';
  else if(eligible())status.textContent='Você encontrou os seis personagens! O bônus está disponível para coletar.';
  else if(all)status.textContent=`Cartela encerrada: ${seen.size} de 6 personagens. Amanhã haverá outra combinação.`;
  else status.textContent=`Uma cartela por dia · ${9-n} ${9-n===1?'casa restante':'casas restantes'} para raspar.`;
 }
 function drawFoil(canvas){
  const r=canvas.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height),ratio=Math.min(2,window.devicePixelRatio||1);
  canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);
  const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.setTransform(ratio,0,0,ratio,0,0);
  const g=ctx.createLinearGradient(0,0,w,h);
  [[0,'#94610d'],[.32,'#d8af4c'],[.57,'#f1d68b'],[1,'#a97415']].forEach(([p,c])=>g.addColorStop(p,c));
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(46,25,0,.12)';for(let i=0;i<20;i++)ctx.fillRect(random()*w,random()*h,2,2);
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#563b14';
  ctx.font=`800 ${Math.max(9,Math.min(14,w*.15))}px "DM Sans",sans-serif`;
  ctx.fillText('RASPE',w/2,h/2,Math.max(24,w-8));
  return ctx;
 }
 const point=(canvas,e)=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left),y:(e.clientY-r.top)}};
 function percent(canvas,ctx){const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;let gone=0,total=0;for(let i=3;i<d.length;i+=48){total++;if(d[i]<130)gone++}return total?gone/total:0;}
 function reveal(i){if(daily.revealed[i])return;
  daily.revealed[i]=true;save();
  const tile=grid.querySelector(`.scratch-tile[data-index="${i}"]`);
  if(tile){tile.classList.add('revealed');tile.setAttribute('aria-label',`Casa ${i+1}: ${byId.get(daily.cells[i]).name}`);
   const c=tile.querySelector('canvas');if(c){c.classList.add('fading');c.setAttribute('aria-hidden','true');setTimeout(()=>c.remove(),280)}
   tile.querySelector('small').setAttribute('aria-hidden','false');
  }
  renderStatus();sfx.match();
  if(eligible())toast('Você encontrou os seis personagens! Colete as 600 moedas virtuais.');
  else if(count()===9)toast('Cartela revelada. Uma nova combinação chega amanhã.');
 }
 function wireTile(tile,i){const canvas=tile.querySelector('canvas');if(!canvas)return;
  let ctx=drawFoil(canvas),down=false,last=null,checked=0;
  function stroke(p){ctx.globalCompositeOperation='destination-out';ctx.lineWidth=Math.max(16,canvas.clientWidth*.27);ctx.lineCap=ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x+.01,p.y);ctx.stroke();last=p;
   const now=performance.now();if(now-lastSound>120){lastSound=now;sfx.noise(.04,.013)}
  }
  function check(){if(!daily.revealed[i]&&percent(canvas,ctx)>=.52)reveal(i)}
  canvas.addEventListener('pointerdown',e=>{if(daily.revealed[i])return;e.preventDefault();down=true;drawing=i;
   canvas.setPointerCapture(e.pointerId);last=point(canvas,e);stroke(last);tile.classList.add('scratching');});
  canvas.addEventListener('pointermove',e=>{if(!down||daily.revealed[i])return;e.preventDefault();stroke(point(canvas,e));
   if(performance.now()-checked>100){checked=performance.now();check()}});
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>canvas.addEventListener(event,()=>{if(!down)return;down=false;drawing=null;tile.classList.remove('scratching');check()}));
  canvas.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal(i)}});
 }
 function renderBoard(){
  grid.innerHTML=daily.cells.map((id,i)=>{const g=byId.get(id),yes=daily.revealed[i];
   return `<div class="scratch-tile${yes?' revealed':''}" data-index="${i}" style="--card-bg:${g.color}" role="group" aria-label="Casa ${i+1}: ${yes?g.name:'não revelada'}"><img src="fotos/${g.image}" alt="" draggable="false"><small aria-hidden="${!yes}">${g.name}</small>${yes?'':`<canvas class="scratch-foil" role="button" tabindex="0" aria-label="Raspar casa ${i+1}"></canvas>`}</div>`;
  }).join('');
  grid.querySelectorAll('.scratch-tile').forEach((tile,i)=>wireTile(tile,i));
  renderStatus();
 }
 function scInit(force=false){if(!box.clientWidth)return;
  const oldDay=activeDay;getDaily();if(force||oldDay!==activeDay||!grid.querySelector('.scratch-tile'))renderBoard();
  else renderStatus();
 }
 window.scInit=()=>scInit();
 $('#scratch-claim').addEventListener('click',()=>{getDaily();if(!eligible())return;
  daily.claimed=true;save();wallet.coins+=REWARD;saveWallet();renderWallet();renderStatus();sfx.win();
  toast(`Bônus da raspadinha: +${REWARD} moedas virtuais!`);
 });
 let resizeTimer=0;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>scInit(true),180)});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)scInit()});
 setInterval(()=>{if(activeDay!==todayKey())scInit(true)},45000);
 addEventListener('load',()=>scInit(true));scInit(true);
})();
/* Memória: um prêmio por dia, após completar os seis pares. */
(function(){
 const grid=$('#mem-grid'),reset=$('#mem-reset'),status=$('#mem-status');
 const KEY='gustagol-memory-day-v1',REWARD=150;
 let first=null,lock=false,moves=0,pairs=0,best=null,finished=false,startedDay='';
 try{best=Number(localStorage.getItem('gustagol-memory-best'))||null}catch{}
 const completed=()=>{try{return localStorage.getItem(KEY)===todayKey()}catch{return false}};
 const showBest=()=>{$('#mem-best').textContent=best||'—'};
 const shuffle=arr=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr};
 function renderCompleted(){finished=true;first=null;lock=true;
  reset.disabled=true;reset.textContent='Volte amanhã';status.textContent=`Memória concluída hoje · +${REWARD} moedas coletadas. Volte amanhã para uma nova rodada.`;
  if(!grid.querySelector('.mem-card')){grid.innerHTML=`<div class="memory-complete">${ic('star')}<strong>Desafio concluído!</strong><span>${REWARD} moedas virtuais recebidas hoje</span></div>`;}
  grid.querySelectorAll('.mem-card').forEach(c=>c.disabled=true);
 }
 function start(){startedDay=todayKey();first=null;lock=false;moves=0;pairs=0;finished=false;$('#mem-moves').textContent='0';showBest();
  if(completed()){grid.innerHTML='';renderCompleted();return}
  reset.disabled=false;reset.innerHTML='Recomeçar '+ic('refresh');
  status.textContent=`Combine os seis pares para ganhar ${REWARD} moedas virtuais. Uma premiação por dia.`;
  const deck=shuffle([...games,...games].map((g,i)=>({g,k:i})));
  grid.innerHTML=deck.map(c=>`<button class="mem-card" data-id="${c.g.id}" aria-label="Carta virada"><span class="mem-inner"><span class="mem-front">${ic('sparkle')}</span><span class="mem-back" style="--card-bg:${c.g.color}"><img src="fotos/${c.g.image}" alt="${c.g.name}" draggable="false"></span></span></button>`).join('');
 }
 function finish(){if(finished||completed())return;finished=true;
  try{localStorage.setItem(KEY,todayKey())}catch{}
  wallet.coins+=REWARD;saveWallet();renderWallet();
  const isBest=!best||moves<best;if(isBest){best=moves;try{localStorage.setItem('gustagol-memory-best',String(best))}catch{}showBest()}
  sfx.win();toast(`Memória completa: +${REWARD} moedas virtuais!`);renderCompleted();
 }
 grid.addEventListener('click',e=>{if(startedDay!==todayKey()){start();return}if(finished||lock||completed())return;
  const c=e.target.closest('.mem-card');if(!c||c===first||c.classList.contains('matched'))return;
  c.classList.add('flipped');sfx.pop();if(!first){first=c;return}
  moves++;$('#mem-moves').textContent=moves;
  if(first.dataset.id===c.dataset.id){first.classList.add('matched');c.classList.add('matched');sfx.match();first=null;pairs++;if(pairs===games.length)finish()}
  else{lock=true;const a=first;first=null;setTimeout(()=>{a.classList.remove('flipped');c.classList.remove('flipped');lock=false},800)}
 });
 reset.addEventListener('click',()=>{if(!completed())start()});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&startedDay!==todayKey())start()});
 setInterval(()=>{if(startedDay!==todayKey())start()},60000);
 start();
})();

/* Garante que o vídeo do banner toque (tenta de novo no primeiro toque/clique e ao voltar para a aba) */
(function(){const v=document.querySelector('#hero-video');if(!v)return;const go=()=>{if(v.paused)v.play().catch(()=>{})};
['pointerdown','keydown','scroll'].forEach(e=>addEventListener(e,go,{once:true,passive:true}));document.addEventListener('visibilitychange',()=>{if(!document.hidden)go()});v.addEventListener('canplay',go)})();

/* Destaque da seção atual na navegação */
(function(){const map=[['inicio','.hero'],['catalogo','#catalogo'],['arcade','#arcade'],['carteira','#carteira'],['roleta','#roleta']].map(([id,s])=>[id,document.querySelector(s)]).filter(x=>x[1]);
const links=[...document.querySelectorAll('header nav a,.sidebar a.side-link,.tabbar a')];let t=0;
function mark(){t=0;let cur='inicio';for(const [id,el] of map){if(el.getBoundingClientRect().top<=180)cur=id}
if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=map[map.length-1][0];
links.forEach(a=>{const on=a.getAttribute('href')==='#'+cur;if(a.closest('header'))a.classList.toggle('active',on);if(a.classList.contains('side-link'))a.classList.toggle('selected',on);if(a.closest('.tabbar'))a.classList.toggle('on',on)})}
addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(mark)},{passive:true});mark()})();
/* Destaques do banner: troca automática (pausa com o mouse em cima) */
(function(){const dots=[...document.querySelectorAll('[data-slide]')],hero=document.querySelector('.hero');if(!dots.length||!hero)return;let i=0,paused=false;
dots.forEach((d,k)=>d.addEventListener('click',()=>{i=k;['#hero-title','#hero-copy'].forEach(s=>{const el=document.querySelector(s);el.classList.remove('swap');void el.offsetWidth;el.classList.add('swap')})}));

['pointerenter','focusin'].forEach(e=>hero.addEventListener(e,()=>paused=true));['pointerleave','focusout'].forEach(e=>hero.addEventListener(e,()=>paused=false));
setInterval(()=>{if(paused||document.hidden)return;dots[(i+1)%dots.length].click()},7000)})();

/* ===== Roleta de prêmios (1 giro grátis por dia, resultado sorteado) ===== */
(function(){const wheel=$('#wheel'),btn=$('#spin'),res=$('#wheel-result');if(!wheel)return;

const prizes=[
 {k:'coins',v:50,w:20,big:'50',unit:'moedas'},{k:'xp',v:80,w:20,big:'80',unit:'XP'},
 {k:'coins',v:120,w:14,big:'120',unit:'moedas'},{k:'coins',v:75,w:10,big:'75',unit:'moedas'},
 {k:'coins',v:30,w:16,big:'30',unit:'moedas'},{k:'xp',v:150,w:10,big:'150',unit:'XP'},
 {k:'coins',v:250,w:6,big:'250',unit:'moedas'},{k:'xp',v:300,w:4,big:'300',unit:'XP'}];
wheel.innerHTML=prizes.map((p,i)=>`<span style="--i:${i}"><b>${p.big}</b><small>${p.unit}</small></span>`).join('');
$('#prize-list').innerHTML=prizes.map(p=>`<li><span>${p.big} ${p.unit}</span><em>${p.w}%</em></li>`).join('');
const rnd=()=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296};
const pick=()=>{let r=rnd()*100,s=0;for(let i=0;i<prizes.length;i++){s+=prizes[i].w;if(r<s)return i}return 0};
let rotation=0,spinning=false;
function state(){const can=wallet.wheelDay!==todayKey();btn.disabled=spinning||!can;if(!spinning)btn.innerHTML=can?'Girar roleta '+ic('refresh'):'Volte amanhã '+ic('moon');if(!spinning&&!can&&res.dataset.done!=='1')res.textContent='Você já girou hoje. Volte amanhã para um novo giro.'}
function say(t){res.textContent=t;res.classList.remove('swap');void res.offsetWidth;res.classList.add('swap')}
function apply(p){if(p.k==='coins'){wallet.coins+=p.v;return `Você ganhou ${p.v} moedas!`}
 if(p.k==='xp'){wallet.xp+=p.v;return `Você ganhou ${p.v} XP!`}
 return 'Prêmio concluído.'}
btn.addEventListener('click',()=>{if(spinning||wallet.wheelDay===todayKey())return;spinning=true;res.dataset.done='1';wallet.wheelDay=todayKey();
 const k=pick(),msg=apply(prizes[k]);saveWallet();
 const base=k*45+22.5+(rnd()-.5)*30,delta=((-(base+rotation))%360+360)%360;rotation+=1800+delta;
 wheel.querySelectorAll('.win').forEach(s=>s.classList.remove('win'));wheel.style.transform=`rotate(${rotation}deg)`;btn.disabled=true;btn.textContent='Girando…';say('Girando…');
 setTimeout(()=>{spinning=false;wheel.children[k].classList.add('win');say(msg);toast(msg);sfx.win();renderWallet();state()},5300)});
state();
})();


/* Fotos externas opcionais: preserve os cards e ícones caso a pasta fotos não seja copiada. */
(function(){
 const art={tiger:'FT',rabbit:'FR',sweet:'SB',pizza:'PP',bass:'BB',cash:'CM'};
 function fallback(img){
  if(!img||img.dataset.ggFallback)return;
  img.dataset.ggFallback='1';
  const button=img.closest('.cover-open');
  if(button){
   const game=games.find(g=>g.id===button.dataset.open);
   if(!game)return;
   img.style.display='none';
   const el=document.createElement('span');el.className='cover-fallback';
   el.innerHTML=`<span class="cover-fallback-icon">${art[game.id]}</span><strong>${game.name}</strong><small>JOGAR AGORA</small>`;
   button.appendChild(el);return;
  }
  if(img.closest('.hero-art')){
   img.style.display='none';const badge=document.createElement('span');badge.className='hero-fallback';badge.textContent='GUSTAGOL';img.parentNode.appendChild(badge);return;
  }
  if(img.id==='modal-image'){showModalLogoFallback();return;}
  if(img.classList.contains('brand-logo'))return;
  if(img.closest('.album-art')||img.closest('.mem-back')){
   img.style.display='none';const el=document.createElement('span');el.className='micro-fallback';el.textContent='✦';img.parentNode.append(el);return;
  }
  img.style.visibility='hidden';
 }
 document.addEventListener('error',e=>{if(e.target?.tagName==='IMG')fallback(e.target)},true);
 const scan=()=>document.querySelectorAll('img').forEach(img=>{if(img.complete&&!img.naturalWidth)fallback(img)});
 new MutationObserver(scan).observe(document.body,{subtree:true,childList:true});
 setTimeout(scan,160);
})();
