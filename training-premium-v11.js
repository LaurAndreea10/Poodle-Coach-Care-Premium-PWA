(() => {
  const basicMeta = {
    name:{stage:'foundation',tagRo:'Fundație',tagEn:'Foundation',goalRo:'Răspunde rapid la nume și caută contactul vizual.',goalEn:'Respond quickly to the name and offer eye contact.',stepsRo:['Spune numele o singură dată, pe ton vesel.','Când te privește, marchează cu „Da!” și recompensează.','Repetă de 5–8 ori, apoi schimbă ușor poziția.'],stepsEn:['Say the name once in a happy tone.','When your puppy looks at you, mark with “Yes!” and reward.','Repeat 5–8 times, then slightly change position.']},
    look:{stage:'foundation',tagRo:'Fundație',tagEn:'Foundation',goalRo:'Contact vizual la comandă pentru focus.',goalEn:'Eye contact on cue for focus.',stepsRo:['Ține recompensa lângă ochii tăi.','Spune „Uită-te” o singură dată.','Marchează imediat contactul vizual și recompensează.'],stepsEn:['Hold the reward near your eyes.','Say “Look” once.','Mark eye contact immediately and reward.']},
    sit:{stage:'foundation',tagRo:'Fundație',tagEn:'Foundation',goalRo:'Șezi calm, fără a împinge cățelul în poziție.',goalEn:'Sit calmly without physically pushing the puppy.',stepsRo:['Recompensă la nas.','Ridică lent mâna puțin în sus și înapoi.','Când fundulețul atinge podeaua: „Șezi” → „Da!” → recompensă.'],stepsEn:['Place a reward at the nose.','Move your hand slowly up and slightly back.','When the bottom touches the floor: “Sit” → “Yes!” → reward.']},
    down:{stage:'foundation',tagRo:'Fundație',tagEn:'Foundation',goalRo:'Culcat relaxat la semnal.',goalEn:'Relaxed down on cue.',stepsRo:['Pornește din Șezi.','Coboară recompensa spre podea și apoi înainte.','Când coatele ating podeaua: „Culcat” → marchează → recompensă.'],stepsEn:['Start from Sit.','Lower the reward to the floor, then move it forward.','When elbows touch the floor: “Down” → mark → reward.']},
    recall:{stage:'safety',tagRo:'Siguranță',tagEn:'Safety',goalRo:'Vino rapid și cu plăcere când este chemat.',goalEn:'Come quickly and happily when called.',stepsRo:['Începe în interior, la distanță mică.','Spune numele + „Vino!” o singură dată și îndepărtează-te ușor.','Recompensează generos sosirea și atinge blând zgarda înainte de eliberare.'],stepsEn:['Start indoors at a short distance.','Say the name + “Come!” once and move slightly away.','Reward arrival generously and gently touch the collar before release.']},
    stay:{stage:'safety',tagRo:'Siguranță',tagEn:'Safety',goalRo:'Menține poziția până la comanda de eliberare.',goalEn:'Hold position until the release cue.',stepsRo:['Cere Șezi.','Arată palma și spune „Stai”.','Așteaptă 1 secundă, recompensează în poziție, apoi spune „Liber”.'],stepsEn:['Ask for Sit.','Show your palm and say “Stay”.','Wait 1 second, reward in position, then say “Free”.']},
    wait:{stage:'safety',tagRo:'Siguranță',tagEn:'Safety',goalRo:'Pauză scurtă la uși, bol sau bordură.',goalEn:'Brief pause at doors, bowls, or curbs.',stepsRo:['Oprește accesul fără a brusca.','Spune „Așteaptă”.','După o clipă de calm, eliberează cu „OK/Liber”.'],stepsEn:['Block access gently.','Say “Wait”.','After a brief calm pause, release with “OK/Free”.']},
    leave:{stage:'safety',tagRo:'Siguranță',tagEn:'Safety',goalRo:'Ignoră obiectul înainte să îl ia.',goalEn:'Ignore an item before picking it up.',stepsRo:['Ține o recompensă în pumnul închis.','Spune „Nu lua/Lasă” o dată și așteaptă retragerea.','Marchează retragerea și oferă o altă recompensă din cealaltă mână.'],stepsEn:['Hold a reward in a closed fist.','Say “Leave it” once and wait for disengagement.','Mark disengagement and reward from the other hand.']},
    drop:{stage:'safety',tagRo:'Siguranță',tagEn:'Safety',goalRo:'Eliberează voluntar ce are deja în gură.',goalEn:'Voluntarily release an item already in the mouth.',stepsRo:['Folosește o jucărie cu valoare mică.','Prezintă recompensa la nas și spune „Dă/Drop”.','Când eliberează, marchează, recompensează și uneori dă jucăria înapoi.'],stepsEn:['Use a low-value toy.','Present a reward at the nose and say “Drop”.','When released, mark, reward, and sometimes return the toy.']},
    place:{stage:'everyday',tagRo:'Cotidian',tagEn:'Everyday',goalRo:'Merge voluntar pe păturică/pat și se liniștește.',goalEn:'Go voluntarily to a mat/bed and settle.',stepsRo:['Aruncă o recompensă pe păturică.','Când urcă, marchează și mai oferă una pe loc.','Adaugă „La loc” după ce mișcarea devine previzibilă.'],stepsEn:['Toss a reward onto the mat.','When the puppy steps on it, mark and reward again there.','Add “Place” once the movement becomes predictable.']},
    heel:{stage:'walking',tagRo:'Plimbare',tagEn:'Walking',goalRo:'Câțiva pași lângă picior cu lesa relaxată.',goalEn:'A few steps beside you with a loose leash.',stepsRo:['Recompensează poziția lângă picior.','Fă 2–3 pași și recompensează înainte ca lesa să se întindă.','Crește treptat numărul de pași și distragerile.'],stepsEn:['Reward position beside your leg.','Take 2–3 steps and reward before the leash tightens.','Gradually increase steps and distractions.']},
    release:{stage:'everyday',tagRo:'Cotidian',tagEn:'Everyday',goalRo:'Înțelege clar când exercițiul s-a terminat.',goalEn:'Clearly understand when an exercise is finished.',stepsRo:['După Șezi/Stai spune „Liber” sau „OK”.','Fă un pas înapoi și invită mișcarea.','Recompensează calm ieșirea din poziție.'],stepsEn:['After Sit/Stay say “Free” or “OK”.','Step back and invite movement.','Calmly reward leaving the position.']},
    no:{stage:'everyday',tagRo:'Cotidian',tagEn:'Everyday',goalRo:'Întrerupe scurt comportamentul și redirecționează spre alternativa corectă.',goalEn:'Briefly interrupt behavior and redirect to the correct alternative.',stepsRo:['Folosește un „Nu” calm, o singură dată.','Oprește accesul și oferă imediat alternativa potrivită.','Recompensează alegerea corectă; evită repetarea sau țipatul.'],stepsEn:['Use one calm “No”.','Prevent access and immediately offer the correct alternative.','Reward the correct choice; avoid repeating or shouting.']}
  };

  const ensureSkill = (id, icon, ro, en, cat, min, xp) => {
    if (!skills.some(s => s.id === id)) skills.push({id,icon,ro,en,cat,min,xp});
    if (data.skills[id] == null) data.skills[id] = 0;
  };
  ensureSkill('look','👀','Uită-te la mine','Look at me','essential',3,20);
  ensureSkill('release','✅','Liber / OK','Release / OK','daily',2,15);
  ensureSkill('no','🛑','Nu','No','daily',3,15);

  if (!data.trainingChallenge) data.trainingChallenge = {start:todayISO(),done:{}};
  save();

  const stageLabels = {
    all:['Toate','All'], foundation:['Fundație','Foundation'], safety:['Siguranță','Safety'], everyday:['Cotidian','Everyday'], walking:['Plimbare','Walking'], advanced:['Avansat','Advanced']
  };
  const challenge = [
    {day:1,skills:['name','look'],ro:'Nume + Uită-te la mine',en:'Name + Look at me'},
    {day:2,skills:['sit'],ro:'Șezi',en:'Sit'},
    {day:3,skills:['recall'],ro:'Vino',en:'Come'},
    {day:4,skills:['down'],ro:'Culcat',en:'Down'},
    {day:5,skills:['drop','leave'],ro:'Dă + Nu lua',en:'Drop it + Leave it'},
    {day:6,skills:['stay','wait'],ro:'Stai + Așteaptă',en:'Stay + Wait'},
    {day:7,skills:['sit','recall','down','drop','leave','stay','wait'],ro:'Mini test final',en:'Final mini test'}
  ];
  const skillStage = s => basicMeta[s.id]?.stage || (s.cat==='grooming'?'advanced':s.cat==='trick'?'advanced':s.cat==='daily'?'everyday':'foundation');
  const levelLabel = lv => (lang()==='ro'?['Nou','Învață','Cu ajutor','Independent','Distrageri','Stăpânit']:['New','Learning','Assisted','Independent','Distractions','Mastered'])[lv];

  function renderAcademyHeader(){
    const page = document.querySelector('#page-training');
    const filters = document.querySelector('#skillFilters');
    if(!page || !filters) return;
    let wrap = document.querySelector('#basicAcademy');
    if(!wrap){wrap=document.createElement('div');wrap.id='basicAcademy';filters.before(wrap)}
    const done = challenge.filter(x=>data.trainingChallenge.done[x.day]).length;
    wrap.innerHTML = `
      <div class="grid two" style="margin:18px 0">
        <article class="panel">
          <div class="panel-head"><div><span class="eyebrow">Basic Commands</span><h3>${lang()==='ro'?'Comenzile esențiale ale puiului':'Essential puppy commands'}</h3></div><span class="chip">${done}/7</span></div>
          <p>${lang()==='ro'?'Sesiuni de 2–5 minute, recompense mici și o singură comandă spusă clar.':'2–5 minute sessions, small rewards, and one clear cue.'}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">${['sit','recall','down','drop','leave','stay','wait','look','place','heel','release','no'].map(id=>{const s=skills.find(x=>x.id===id);return `<button class="tiny-btn" data-train="${id}">${s?.icon||'🐾'} ${esc(s?tSkill(s):id)}</button>`}).join('')}</div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><span class="eyebrow">7-Day Challenge</span><h3>${lang()==='ro'?'Basic Commands Challenge':'Basic Commands Challenge'}</h3></div><strong>${Math.round(done/7*100)}%</strong></div>
          <div class="progress-track"><span style="width:${done/7*100}%"></span></div>
          <div style="display:grid;gap:7px;margin-top:12px">${challenge.map(x=>`<div class="check-row ${data.trainingChallenge.done[x.day]?'done':''}"><button data-challenge-day="${x.day}">${data.trainingChallenge.done[x.day]?'✓':'○'}</button><div><strong>${lang()==='ro'?'Ziua':'Day'} ${x.day} · ${lang()==='ro'?x.ro:x.en}</strong><small>${x.skills.map(id=>tSkill(skills.find(s=>s.id===id))).join(' + ')}</small></div><span>+10 XP</span></div>`).join('')}</div>
        </article>
      </div>`;
    filters.innerHTML = Object.entries(stageLabels).map(([id,l],i)=>`<button class="${i===0?'active':''}" data-stage-filter="${id}">${lang()==='ro'?l[0]:l[1]}</button>`).join('');
  }

  renderSkills = function(filter='all'){
    renderAcademyHeader();
    const active=document.querySelector('#skillFilters [data-stage-filter].active')?.dataset.stageFilter || filter;
    const list=skills.filter(s=>active==='all'||skillStage(s)===active);
    $('#skillsGrid').innerHTML=list.map(s=>{const lv=data.skills[s.id]||0,m=basicMeta[s.id],stage=skillStage(s);return `<article class="skill-card"><div class="skill-icon">${s.icon}</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap"><span class="chip">${lang()==='ro'?stageLabels[stage]?.[0]||stage:stageLabels[stage]?.[1]||stage}</span></div><h3>${esc(tSkill(s))}</h3><p>${esc(m?(lang()==='ro'?m.goalRo:m.goalEn):(lang()==='ro'?'Progres separat, cu distrageri crescute gradual.':'Separate progress with gradually increased distractions.'))}</p><div class="skill-levels">${[1,2,3,4,5].map(i=>`<i class="${i<=lv?'on':''}"></i>`).join('')}</div><small>${levelLabel(lv)} · ${lang()==='ro'?'Nivel':'Level'} ${lv}/5 · ${s.min} min</small><button class="primary-btn" data-train="${s.id}">${lv>=5?'✓ Mastered':lang()==='ro'?'Start training':'Start training'}</button></article>`}).join('');
  };

  trainSkill = function(id){
    const s=skills.find(x=>x.id===id); if(!s)return;
    const lv=data.skills[id]||0,m=basicMeta[id];
    const steps=m?(lang()==='ro'?m.stepsRo:m.stepsEn):[lang()==='ro'?'Alege un criteriu simplu și recompensează imediat reușita.':'Choose one simple criterion and reward success immediately.',lang()==='ro'?'Fă 5–8 repetări și oprește sesiunea cât timp puiul este motivat.':'Do 5–8 repetitions and stop while the puppy is motivated.'];
    openModal(`<span class="eyebrow">${lang()==='ro'?'Skill Training':'Skill Training'} · ${lang()==='ro'?stageLabels[skillStage(s)][0]:stageLabels[skillStage(s)][1]}</span><h2>${s.icon} ${esc(tSkill(s))}</h2><p>${esc(m?(lang()==='ro'?m.goalRo:m.goalEn):(lang()==='ro'?'Sesiune scurtă cu recompense mici și criterii clare.':'Short session with small rewards and clear criteria.'))}</p><article class="panel"><strong>${lang()==='ro'?'Cum exersezi':'How to train'}</strong><ol style="padding-left:20px;margin:12px 0;display:grid;gap:8px">${steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><small>${lang()==='ro'?'Niveluri: Nou → Învață → Cu ajutor → Independent → Distrageri → Stăpânit':'Levels: New → Learning → Assisted → Independent → Distractions → Mastered'}</small></article>${id==='recall'?`<div class="ai-suggestion">⚠️ ${lang()==='ro'?'Nu folosi „Vino” pentru ceartă sau pentru a încheia mereu ceva plăcut. Păstrează comanda valoroasă.':'Do not use “Come” for punishment or to always end something fun. Keep the cue valuable.'}</div>`:''}<div class="modal-actions"><button class="secondary-btn" data-modal-cancel>${lang()==='ro'?'Închide':'Close'}</button><button class="primary-btn" id="completeSkill">✓ ${s.min} min · +${s.xp} XP</button></div>`);
    $('#completeSkill').onclick=()=>{data.skills[id]=Math.min(5,lv+1);addXP(s.xp);markDaily('training');closeModal();renderAll();toast(`+${s.xp} XP ⭐`)};
  };

  emergency = function(){
    const ids=['recall','drop','leave','wait','stay'];
    openModal(`<span class="eyebrow">Emergency Commands</span><h2>🚨 ${lang()==='ro'?'Comenzi de siguranță':'Safety commands'}</h2><p>${lang()==='ro'?'Exersează-le mai întâi în casă, apoi generalizează treptat. Într-o urgență reală, managementul și siguranța fizică au prioritate.':'Practice indoors first, then generalize gradually. In a real emergency, physical safety and management come first.'}</p>${ids.map(id=>{const s=skills.find(x=>x.id===id);return `<div class="check-row"><span>${s.icon}</span><div><strong>${tSkill(s)}</strong><small>${esc(lang()==='ro'?basicMeta[id]?.goalRo:basicMeta[id]?.goalEn)}</small></div><button data-train="${id}">▶</button></div>`}).join('')}`);
  };

  document.querySelector('#skillFilters')?.addEventListener('click',e=>{
    const b=e.target.closest('[data-stage-filter]'); if(!b)return;
    document.querySelectorAll('#skillFilters [data-stage-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderSkills(b.dataset.stageFilter);
  },true);
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-challenge-day]');if(!b)return;
    const day=Number(b.dataset.challengeDay);const was=!!data.trainingChallenge.done[day];data.trainingChallenge.done[day]=!was;if(!was){data.xp+=10;touchStreak();toast('+10 XP · Challenge ⭐')}save();renderSkills();renderHome();renderProgress();
  });

  renderSkills('all');
  renderProgress();
  renderHome();
})();