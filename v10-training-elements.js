/* v10 training elements: structured home exercises, clicker, games, behavior protocols */
(() => {
const V=window.PoodleV9,q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];if(!V)return;
const mk=()=>crypto.randomUUID?.()||`tr-${Date.now()}-${Math.random().toString(36).slice(2)}`;
if(!data.trainingElements)data.trainingElements={completed:{},clicks:0,games:[],protocols:[],focus:[],notes:[]};

const modules=[
 {id:'focus',icon:'👀',title:'Focus & attention',desc:'Nume, contact vizual, orientare către tine și revenire rapidă la focus.',items:[
  ['name-focus','Spune numele → privește','Spune numele o singură dată. Marchează și recompensează când te privește.','5 repetări','2–3 min'],
  ['eye-contact','Contact vizual','Ține recompensa lângă ochi, apoi elimină treptat ajutorul mâinii.','5–8 repetări','3 min'],
  ['check-in','Check-in spontan','La plimbare sau în casă, recompensează când se uită singur la tine.','10 check-in','3–5 min']
 ]},
 {id:'basics',icon:'🎓',title:'Comenzi de bază',desc:'Fundamente clare pentru viața de zi cu zi.',items:[
  ['sit-home','Șezi','Ghidează recompensa ușor în sus și în spate. Spune comanda când mișcarea este înțeleasă.','5 corecte','3 min'],
  ['down-home','Culcat','Din șezi, coboară recompensa spre podea și apoi ușor înainte.','5 corecte','3–4 min'],
  ['stay-home','Stai','Începe cu 1 secundă și un singur pas. Crește o singură variabilă o dată.','5 reușite','4 min'],
  ['wait-door','Așteaptă la ușă','Ușa se deschide doar când rămâne pe loc. Folosește semnal de eliberare.','5 ieșiri calme','4 min'],
  ['place-home','La loc','Trimite-l pe păturică/culcuș și recompensează calmul acolo.','3 x 20 sec','5 min']
 ]},
 {id:'recall',icon:'🎯',title:'Recall & siguranță',desc:'Vino, stop, lasă și schimb rapid de direcție.',items:[
  ['recall-room','Vino — cameră','Spune Vino o singură dată, mergi înapoi 1–2 pași și fă sosirea foarte valoroasă.','5/5','3 min'],
  ['recall-room2','Vino — altă cameră','Crește distanța. Nu repeta comanda dacă nu răspunde.','5/5','4 min'],
  ['emergency-turn','Întoarcere de urgență','Spune semnalul ales, întoarce-te 180° și recompensează când te urmează imediat.','5 repetări','3 min'],
  ['leave-it','Lasă','Recompensa din mâna închisă apare doar când renunță să insiste.','5 reușite','4 min'],
  ['drop-it','Dă','Schimbă obiectul cu o recompensă mai bună și oferă jucăria înapoi uneori.','5 schimburi','4 min']
 ]},
 {id:'impulse',icon:'🧘',title:'Autocontrol',desc:'Calm înainte de resurse, uși, mâncare și joacă.',items:[
  ['food-wait','Așteaptă bolul','Coboară bolul; dacă se ridică, bolul urcă. Pune jos când rămâne calm.','3 mese','2 min'],
  ['toy-control','Control cu jucăria','Joacă 5 secunde → Dă → pauză → reîncepe jocul.','5 cicluri','4 min'],
  ['settle','Relaxare pe păturică','Recompensează respirația calmă, șoldul pe o parte și capul jos.','2–5 min calm','5 min'],
  ['door-calm','Calm la sonerie','Sunet slab → recompensă pe păturică → crește gradual intensitatea.','5 repetări','4 min']
 ]},
 {id:'walking',icon:'🦮',title:'Mers în lesă',desc:'Lesă relaxată, schimbări de direcție și focus în exterior.',items:[
  ['leash-indoor','Lesă în casă','Fă 3–5 pași; recompensează lângă picior înainte ca lesa să se întindă.','10 pași buni','4 min'],
  ['leash-turns','Schimbări de direcție','Schimbă direcția înainte de tensiune; recompensează revenirea lângă tine.','8 întoarceri','5 min'],
  ['sniff-release','Miros ca recompensă','Câțiva pași cu lesa relaxată → semnal de eliberare → lasă-l să miroasă.','5 cicluri','5 min'],
  ['pass-distraction','Trecere pe lângă distragere','Păstrează distanța la care poate lua recompense și recompensa focusul.','5 treceri','5–7 min']
 ]},
 {id:'groom',icon:'✂️',title:'Cooperative care',desc:'Manipulare calmă pentru grooming, veterinar și igienă.',items:[
  ['paw-touch','Lăbuțe','Atinge 1 secundă → recompensă → eliberează. Crește gradual durata.','8 atingeri','3 min'],
  ['ear-touch','Urechi','Ridică ușor pavilionul → recompensă. Fără forțare.','6 repetări','3 min'],
  ['brush-touch','Perie','Arată peria → recompensă; o atingere → recompensă; apoi 1–2 mișcări.','8 cicluri','4 min'],
  ['dryer-sound','Uscător','Pornește foarte departe/scurt, recompensează calmul, oprește.','5 expuneri','3 min'],
  ['chin-rest','Chin rest','Învață să-și pună bărbia în palmă ca semnal voluntar pentru manipulare.','5 x 3 sec','4 min']
 ]},
 {id:'brain',icon:'🧠',title:'Brain Gym',desc:'Miros, rezolvare de probleme și control cognitiv.',items:[
  ['find-it','Find It','Aruncă o recompensă ușor vizibilă, spune Find It, apoi crește dificultatea.','8 găsiri','4 min'],
  ['which-hand','Which Hand?','Ascunde recompensa într-un pumn și recompensează alegerea corectă cu nasul.','6 runde','4 min'],
  ['toy-name','Numele jucăriei','Lucrează cu o singură jucărie până asociază numele, apoi adaugă a doua.','5 alegeri','5 min'],
  ['box-game','Box Game','Pune recompense într-o cutie sigură și lasă-l să găsească soluția.','1 joc','5 min'],
  ['touch-target','Target Touch','Atinge palma/ținta cu nasul și mută treptat ținta în poziții diferite.','10 touch','4 min']
 ]},
 {id:'social',icon:'🤝',title:'Socializare ghidată',desc:'Expuneri pozitive, scurte și la distanță confortabilă.',items:[
  ['people-watch','Privește oameni de la distanță','Observă persoana → recompensă → plecați înainte să devină copleșit.','5 observații','5 min'],
  ['dog-watch','Privește câini calmi','Lucrează de la distanța la care poate mânca și răspunde la nume.','5 observații','5 min'],
  ['sounds','Sunete casnice','Sunet slab → recompensă → pauză; aspirator, uscător, sonerie etc.','5 sunete','5 min'],
  ['surfaces','Suprafețe','Covor, gresie, iarbă, metal sigur — fără tragere sau forțare.','4 suprafețe','5 min']
 ]}
];

const protocols=[
 {id:'biting',icon:'🦷',title:'Mușcă mâinile',steps:['Oprește mișcarea mâinii.','Oferă imediat o jucărie potrivită pentru ros.','Laudă și recompensează alegerea jucăriei.','Dacă revine la mâini, încheie interacțiunea 10–20 secunde.','Reia calm și repetă.']},
 {id:'barking',icon:'🔊',title:'Lătrat',steps:['Identifică declanșatorul.','Mărește distanța/intensitatea până poate răspunde la tine.','Așteaptă o pauză scurtă.','Marchează liniștea și recompensează.','Crește durata de calm treptat.']},
 {id:'jumping',icon:'⬆️',title:'Sare pe oameni',steps:['Persoana oprește atenția când sare.','Nu împinge și nu ridica tonul.','Așteaptă 4 lăbuțe pe podea.','Recompensează imediat comportamentul calm.','Repetă cu mai multe persoane.']},
 {id:'leash-pull',icon:'🦮',title:'Trage în lesă',steps:['Începe într-un loc cu distrageri mici.','Recompensează frecvent lesa relaxată.','La tensiune, oprește sau schimbă direcția.','Repornește când revine către tine.','Folosește mirosul ca recompensă funcțională.']},
 {id:'alone',icon:'🏠',title:'Nu stă singur',steps:['Începe sub pragul de stres.','Pleacă pentru câteva secunde.','Revino cât încă este calm.','Repetă de mai multe ori fără ritual dramatic.','Crește timpul foarte gradual.']},
 {id:'handling',icon:'🐾',title:'Nu acceptă manipularea',steps:['Folosește sesiuni de 1–3 minute.','Atingere foarte scurtă → recompensă.','Oprește înainte să se retragă.','Crește durata în pași mici.','Folosește chin-rest ca semnal voluntar.']}
];

function ensureTrainingHub(){
 const page=q('#page-training');if(!page||q('#v10TrainingHub'))return;
 const hub=document.createElement('div');hub.id='v10TrainingHub';hub.innerHTML=`
 <article class="panel training-tools-v10">
   <div class="panel-head"><div><span class="eyebrow">Home Training Toolkit</span><h3>Instrumente rapide</h3></div></div>
   <div class="quick-grid">
     <button id="v10Clicker">🟢 Clicker <strong id="v10Clicks">${data.trainingElements.clicks||0}</strong></button>
     <button id="v10Random">🎲 Exercițiu rapid</button>
     <button id="v10Focus">👀 Focus 3 min</button>
     <button id="v10Protocol">🧩 Ce fac acum?</button>
     <button id="v10Brain">🧠 Brain Game</button>
     <button id="v10SessionNote">📝 Notă sesiune</button>
   </div>
 </article>
 <article class="panel"><div class="panel-head"><div><span class="eyebrow">Training Library</span><h3>Exerciții de dresaj acasă</h3></div><span class="chip">${modules.reduce((a,m)=>a+m.items.length,0)} exerciții</span></div><div id="v10ModuleGrid" class="cards-grid"></div></article>
 <article class="panel"><div class="panel-head"><div><span class="eyebrow">Behavior Help</span><h3>Protocoale rapide</h3></div></div><div id="v10Protocols" class="check-grid"></div></article>`;
 page.append(hub);
 q('#v10Clicker').onclick=clicker;
 q('#v10Random').onclick=()=>{const all=modules.flatMap(m=>m.items.map(i=>({m,i})));const x=all[Math.floor(Math.random()*all.length)];openExercise(x.m.id,x.i[0])};
 q('#v10Focus').onclick=()=>openExercise('focus','name-focus');
 q('#v10Protocol').onclick=()=>openProtocols();
 q('#v10Brain').onclick=()=>{const m=modules.find(x=>x.id==='brain');const i=m.items[Math.floor(Math.random()*m.items.length)];openExercise('brain',i[0])};
 q('#v10SessionNote').onclick=addNote;
 renderModules();renderProtocols();
}
function renderModules(){const root=q('#v10ModuleGrid');if(!root)return;root.innerHTML=modules.map(m=>`<article class="skill-card"><div class="skill-icon">${m.icon}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="skill-v9-meta"><span class="chip">${m.items.length} exerciții</span><span class="chip">2–7 min</span></div><button class="primary-btn" data-v10-module="${m.id}">Deschide</button></article>`).join('');qa('[data-v10-module]').forEach(b=>b.onclick=()=>openModule(b.dataset.v10Module))}
function renderProtocols(){const root=q('#v10Protocols');if(!root)return;root.innerHTML=protocols.map(p=>`<button class="training-mini-card" data-v10-protocol="${p.id}"><span>${p.icon}</span><span><strong>${p.title}</strong><small>${p.steps.length} pași</small></span></button>`).join('');qa('[data-v10-protocol]').forEach(b=>b.onclick=()=>openProtocol(b.dataset.v10Protocol))}
function openModule(id){const m=modules.find(x=>x.id===id);if(!m)return;openModal(`<span class="eyebrow">${m.icon} ${m.title}</span><h2>${m.title}</h2><p>${m.desc}</p><div class="check-list">${m.items.map(i=>{const done=data.trainingElements.completed[i[0]]||0;return`<div class="check-row"><span>${done?'✅':'○'}</span><div><strong>${i[1]}</strong><small>${i[3]} · ${i[4]} · finalizat ${done}x</small></div><button data-v10-ex="${i[0]}">▶</button></div>`}).join('')}</div>`);qa('[data-v10-ex]').forEach(b=>b.onclick=()=>openExercise(id,b.dataset.v10Ex))}
function openExercise(moduleId,itemId){const m=modules.find(x=>x.id===moduleId),i=m?.items.find(x=>x[0]===itemId);if(!i)return;openModal(`<span class="eyebrow">${m.icon} ${m.title}</span><h2>${i[1]}</h2><p>${i[2]}</p><div class="panel"><div class="metric-v9"><span>🎯</span><div><strong>Țintă</strong><span>${i[3]}</span></div></div><div class="metric-v9"><span>⏱️</span><div><strong>Durată</strong><span>${i[4]}</span></div></div><div class="metric-v9"><span>🍪</span><div><strong>Recompensă</strong><span>Bucățele foarte mici, oferite imediat după răspunsul corect.</span></div></div></div><div class="mini-alert">Regulă: dacă reușita scade sub ~80%, redu dificultatea sau distragerile.</div><div class="modal-actions"><button class="secondary-btn" id="v10Audio">🔊 Citește</button><button class="secondary-btn" id="v10ClickInside">🟢 Click</button><button class="primary-btn" id="v10Done">✓ Finalizează</button></div>`);
 q('#v10Audio').onclick=()=>speak(`${i[1]}. ${i[2]}`);q('#v10ClickInside').onclick=()=>clicker(false);q('#v10Done').onclick=()=>{data.trainingElements.completed[itemId]=(data.trainingElements.completed[itemId]||0)+1;data.trainingElements.focus.push({id:mk(),exercise:itemId,module:moduleId,date:todayISO(),time:nowTime()});data.xp+=10;data.sessions+=1;save();closeModal();renderAll();toast('+10 XP · exercițiu finalizat 🎓')};}
function clicker(open=true){data.trainingElements.clicks=(data.trainingElements.clicks||0)+1;save();const c=q('#v10Clicks');if(c)c.textContent=data.trainingElements.clicks;try{const A=window.AudioContext||window.webkitAudioContext,a=new A(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.type='square';o.frequency.value=1200;g.gain.setValueAtTime(.13,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.045);o.start();o.stop(a.currentTime+.045)}catch{}if(open)toast(`CLICK #${data.trainingElements.clicks} 🟢`)}
function speak(text){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang()==='ro'?'ro-RO':'en-US';u.rate=.95;speechSynthesis.speak(u)}
function openProtocols(){openModal(`<span class="eyebrow">Behavior Coach</span><h2>🧩 Ce se întâmplă?</h2><div class="check-grid">${protocols.map(p=>`<button class="training-mini-card" data-v10-protocol="${p.id}"><span>${p.icon}</span><span><strong>${p.title}</strong><small>Protocol pas cu pas</small></span></button>`).join('')}</div>`);qa('[data-v10-protocol]').forEach(b=>b.onclick=()=>openProtocol(b.dataset.v10Protocol))}
function openProtocol(id){const p=protocols.find(x=>x.id===id);if(!p)return;openModal(`<span class="eyebrow">Behavior Protocol</span><h2>${p.icon} ${p.title}</h2><div class="protocol-list">${p.steps.map((s,n)=>`<div class="protocol-step"><span class="protocol-number">${n+1}</span><span>${s}</span></div>`).join('')}</div><div class="mini-alert">Dacă apare frică intensă, panică, agresivitate sau comportamentul se agravează, oprește exercițiul și cere ajutorul unui profesionist calificat.</div><div class="modal-actions"><button class="secondary-btn" id="v10ProtocolAudio">🔊 Audio</button><button class="primary-btn" id="v10ProtocolDone">✓ Am exersat</button></div>`);q('#v10ProtocolAudio').onclick=()=>speak(`${p.title}. ${p.steps.join('. ')}`);q('#v10ProtocolDone').onclick=()=>{data.trainingElements.protocols.push({id:mk(),protocol:id,date:todayISO(),time:nowTime()});data.xp+=5;save();closeModal();renderAll();toast('+5 XP · protocol înregistrat')};}
function addNote(){const note=prompt('Notă despre sesiunea de dresaj:');if(!note?.trim())return;data.trainingElements.notes.push({id:mk(),date:todayISO(),time:nowTime(),text:note.trim()});save();toast('Notă salvată 📝')}
function addTrainingStats(){const page=q('#page-progress');if(!page||q('#v10TrainingStats'))return;const p=document.createElement('article');p.className='panel';p.id='v10TrainingStats';p.innerHTML='<div class="panel-head"><div><span class="eyebrow">Training Analytics</span><h3>Activitate de dresaj</h3></div></div><div id="v10TrainingStatsBody"></div>';page.append(p)}
function refreshStats(){addTrainingStats();const el=q('#v10TrainingStatsBody');if(!el)return;const completed=Object.values(data.trainingElements.completed||{}).reduce((a,b)=>a+b,0);el.innerHTML=`<div class="stats-grid four"><article class="stat"><span>🎓</span><small>Exerciții</small><strong>${completed}</strong></article><article class="stat"><span>🟢</span><small>Clicker</small><strong>${data.trainingElements.clicks||0}</strong></article><article class="stat"><span>🧩</span><small>Protocoale</small><strong>${data.trainingElements.protocols.length}</strong></article><article class="stat"><span>📝</span><small>Note</small><strong>${data.trainingElements.notes.length}</strong></article></div>`}
V.trainingElementsRefresh=()=>{ensureTrainingHub();refreshStats()};
const previous=V.trainingRefresh;V.trainingRefresh=()=>{previous?.();V.trainingElementsRefresh()};
V.trainingElementsRefresh();
})();