(()=>{
"use strict";
const KEY="poodlePremiumSuiteV13";
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}};
let db=Object.assign({growth:[],symptoms:[],behavior:[],memories:[],inventory:[],trips:[],family:[],safety:[],settings:{largeText:false,contrast:false,reduceMotion:false}},load());
const save=()=>{localStorage.setItem(KEY,JSON.stringify(db));toast("Salvat ✓")};
const toast=m=>{const t=document.getElementById("toast");if(t){t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const today=()=>new Date().toISOString().slice(0,10);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const nav=document.getElementById("nav"), content=document.querySelector(".content");
if(!nav||!content)return;
const button=document.createElement("button");
button.className="nav-btn premium-nav";button.dataset.page="premium";button.innerHTML='✨ <span>Premium Hub</span>';
nav.appendChild(button);
const page=document.createElement("section");page.className="page";page.id="page-premium";
page.innerHTML=`
<div class="section-head"><div><span class="eyebrow">V13 COMPLETE CARE SUITE</span><h2>Premium Hub</h2><p>Dezvoltare, comportament, siguranță, familie și organizare — salvate local și disponibile offline.</p></div><button class="primary-btn" id="v13Quick">＋ Adaugă rapid</button></div>
<div class="panel v13-identity" aria-label="Personalizare profil">
<label><span>🐩 Numele cățelului</span><input id="v13DogName" maxlength="30" autocomplete="off" aria-label="Numele cățelului"></label>
<label><span>🌐 Limba aplicației</span><select id="v13Language" aria-label="Limba aplicației"><option value="ro">🇷🇴 Română</option><option value="en">🇬🇧 English</option></select></label>
<button class="primary-btn" id="v13SaveIdentity">Salvează preferințele</button>
</div>
<div class="v13-tabs" role="tablist" aria-label="Module Premium">
<button class="active" data-v13="overview">Panou</button><button data-v13="growth">Dezvoltare</button><button data-v13="symptoms">Simptome</button><button data-v13="behavior">Comportament</button><button data-v13="memories">Amintiri</button><button data-v13="inventory">Inventar</button><button data-v13="travel">Călătorii</button><button data-v13="family">Familie</button><button data-v13="safety">Urgențe</button><button data-v13="data">Date</button><button data-v13="settings">Setări</button>
</div><div id="v13View" aria-live="polite"></div>`;
content.appendChild(page);
const V=document.getElementById("v13View");
const field=(label,id,type="text",extra="")=>`<label>${label}<input id="${id}" type="${type}" ${extra}></label>`;
const empty=t=>`<div class="v13-empty">Încă nu ai înregistrări pentru ${t}.</div>`;
const list=(arr,render)=>arr.length?`<div class="v13-list">${arr.slice().reverse().map(render).join("")}</div>`:empty("acest modul");
const remove=(key,id)=>{db[key]=db[key].filter(x=>x.id!==id);save();render(current)};
const cards=[
["growth","⚖️","Dezvoltare","Greutate, înălțime și Body Condition Score"],
["symptoms","🩺","Monitor simptome","Energie, apetit, digestie și observații"],
["behavior","🧠","Comportament","Declanșator, reacție și plan gradual"],
["memories","📸","Amintiri","Momente importante din viața cățelului"],
["inventory","🛍️","Inventar","Hrană, produse și alerte de reaprovizionare"],
["travel","🧳","Călătorii","Checklist, documente și destinații"],
["family","👥","Familie","Îngrijitori și responsabilități"],
["safety","🚨","Urgențe","Fișă medicală și contacte disponibile offline"],
["data","💾","Date & backup","Export, import și portabilitate"],
["settings","♿","Accesibilitate","Text mare, contrast și mișcare redusă"]
];
let current="overview";
function overview(){
const total=["growth","symptoms","behavior","memories","inventory","trips","family","safety"].reduce((n,k)=>n+(db[k]?.length||0),0);
V.innerHTML=`<div class="stats-grid four"><article class="stat"><span>✨</span><small>Module</small><strong>10</strong></article><article class="stat"><span>💾</span><small>Înregistrări</small><strong>${total}</strong></article><article class="stat"><span>🔒</span><small>Stocare</small><strong>Local</strong></article><article class="stat"><span>📴</span><small>Offline</small><strong>Activ</strong></article></div><div class="v13-module-grid">${cards.map(c=>`<button data-open="${c[0]}" class="v13-module"><span>${c[1]}</span><strong>${c[2]}</strong><small>${c[3]}</small></button>`).join("")}</div>
<article class="panel v13-disclaimer"><strong>Notă medicală</strong><p>Monitorizarea ajută la observarea schimbărilor, dar nu oferă diagnostic. Pentru simptome persistente, severe sau urgente contactează medicul veterinar.</p></article>`;
V.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>go(b.dataset.open));
}
function growth(){
V.innerHTML=`<article class="panel"><div class="panel-head"><h3>Adaugă măsurătoare</h3></div><div class="form-grid">${field("Data","gDate","date",`value="${today()}"`)}${field("Greutate (kg)","gWeight","number",'step=".1" min=".1"')}${field("Înălțime la greabăn (cm)","gHeight","number",'step=".1" min="1"')}${field("Body Condition Score 1–9","gBcs","number",'min="1" max="9"')}</div><label class="block-label">Observații<textarea id="gNote" rows="2"></textarea></label><button class="primary-btn" id="gSave">Salvează măsurătoarea</button></article><article class="panel"><h3>Istoric dezvoltare</h3>${list(db.growth,x=>`<div class="v13-row"><span>⚖️</span><div><strong>${esc(x.weight)} kg · ${esc(x.height||"—")} cm</strong><small>${esc(x.date)} · BCS ${esc(x.bcs||"—")} · ${esc(x.note)}</small></div><button data-del="${x.id}" aria-label="Șterge">×</button></div>`)}</article>`;
document.getElementById("gSave").onclick=()=>{const w=document.getElementById("gWeight").value;if(!w)return toast("Introdu greutatea");db.growth.push({id:uid(),date:gDate.value,weight:w,height:gHeight.value,bcs:gBcs.value,note:gNote.value});save();growth()};
bindDelete("growth");
}
function symptoms(){
V.innerHTML=`<article class="panel"><h3>Check-in zilnic</h3><div class="form-grid">${field("Data","sDate","date",`value="${today()}"`)}<label>Energie<select id="sEnergy"><option>Normală</option><option>Scăzută</option><option>Ridicată</option></select></label><label>Apetit<select id="sAppetite"><option>Bun</option><option>Mediu</option><option>Scăzut</option><option>Refuză hrana</option></select></label><label>Digestie<select id="sDigest"><option>Normală</option><option>Scaun moale</option><option>Diaree</option><option>Constipație</option><option>Vărsături</option></select></label></div><label class="block-label">Simptome / observații<textarea id="sNote" rows="3"></textarea></label><label class="v13-check"><input id="sUrgent" type="checkbox"> Marchează pentru discuție urgentă cu veterinarul</label><button class="primary-btn" id="sSave">Salvează check-in</button></article><article class="panel"><h3>Istoric</h3>${list(db.symptoms,x=>`<div class="v13-row ${x.urgent?"urgent":""}"><span>${x.urgent?"🚨":"🩺"}</span><div><strong>${esc(x.energy)} · apetit ${esc(x.appetite)}</strong><small>${esc(x.date)} · ${esc(x.digest)} · ${esc(x.note)}</small></div><button data-del="${x.id}">×</button></div>`)}</article>`;
sSave.onclick=()=>{db.symptoms.push({id:uid(),date:sDate.value,energy:sEnergy.value,appetite:sAppetite.value,digest:sDigest.value,note:sNote.value,urgent:sUrgent.checked});save();symptoms()};bindDelete("symptoms");
}
function behavior(){
V.innerHTML=`<article class="panel"><h3>Jurnal ABC</h3><p class="muted">Context → comportament → consecință și următorul pas.</p><div class="form-grid">${field("Data","bDate","date",`value="${today()}"`)}${field("Context / declanșator","bTrigger")}${field("Comportament observat","bAction")}${field("Ce s-a întâmplat după","bResult")}</div><label class="block-label">Plan gradual<textarea id="bPlan" rows="3" placeholder="Distanță mai mare, recompense, sesiuni scurte…"></textarea></label><button class="primary-btn" id="bSave">Salvează observația</button></article><article class="panel"><h3>Tipare observate</h3>${list(db.behavior,x=>`<div class="v13-row"><span>🧠</span><div><strong>${esc(x.trigger)} → ${esc(x.action)}</strong><small>${esc(x.date)} · ${esc(x.result)} · Plan: ${esc(x.plan)}</small></div><button data-del="${x.id}">×</button></div>`)}</article>`;
bSave.onclick=()=>{if(!bTrigger.value||!bAction.value)return toast("Completează contextul și comportamentul");db.behavior.push({id:uid(),date:bDate.value,trigger:bTrigger.value,action:bAction.value,result:bResult.value,plan:bPlan.value});save();behavior()};bindDelete("behavior");
}
function memories(){
V.innerHTML=`<article class="panel"><h3>Adaugă moment important</h3><div class="form-grid">${field("Data","mDate","date",`value="${today()}"`)}${field("Titlu","mTitle")}${field("Fotografie (URL opțional)","mPhoto","url")}</div><label class="block-label">Poveste<textarea id="mNote" rows="3"></textarea></label><button class="primary-btn" id="mSave">Adaugă în cronologie</button></article><div class="v13-memory-grid">${db.memories.length?db.memories.slice().reverse().map(x=>`<article class="panel v13-memory">${x.photo?`<img src="${esc(x.photo)}" alt="" loading="lazy">`:"<div class='memory-placeholder'>🐩</div>"}<small>${esc(x.date)}</small><h3>${esc(x.title)}</h3><p>${esc(x.note)}</p><button class="tiny-btn" data-del="${x.id}">Șterge</button></article>`).join(""):empty("amintiri")}</div>`;
mSave.onclick=()=>{if(!mTitle.value)return toast("Adaugă un titlu");db.memories.push({id:uid(),date:mDate.value,title:mTitle.value,photo:mPhoto.value,note:mNote.value});save();memories()};bindDelete("memories");
}
function inventory(){
V.innerHTML=`<article class="panel"><h3>Hrană, produse și medicamente</h3><div class="form-grid">${field("Produs","iName")}${field("Cantitate","iQty","number",'min="0" step=".1"')}<label>Categorie<select id="iCat"><option>Hrană</option><option>Recompense</option><option>Grooming</option><option>Medicamente</option><option>Accesorii</option></select></label>${field("Expiră la","iExpiry","date")}</div><label class="v13-check"><input id="iLow" type="checkbox"> Stoc redus</label><button class="primary-btn" id="iSave">Adaugă produs</button></article><article class="panel"><h3>Inventar</h3>${list(db.inventory,x=>`<div class="v13-row ${x.low?"warn":""}"><span>${x.low?"⚠️":"📦"}</span><div><strong>${esc(x.name)} · ${esc(x.qty)}</strong><small>${esc(x.cat)} · expiră: ${esc(x.expiry||"—")}</small></div><button data-del="${x.id}">×</button></div>`)}</article>`;
iSave.onclick=()=>{if(!iName.value)return toast("Introdu produsul");db.inventory.push({id:uid(),name:iName.value,qty:iQty.value,cat:iCat.value,expiry:iExpiry.value,low:iLow.checked});save();inventory()};bindDelete("inventory");
}
function travel(){
const checks=["Pașaport","Vaccin antirabic","Microcip verificat","Hrană","Apă și bol","Medicamente","Lesă și ham","Păturică","Contact veterinar","Pungi igienice"];
V.innerHTML=`<article class="panel"><h3>Planifică o călătorie</h3><div class="form-grid">${field("Destinație","tDest")}${field("Plecare","tStart","date")}${field("Întoarcere","tEnd","date")}</div><div class="v13-check-grid">${checks.map((x,i)=>`<label class="v13-check"><input type="checkbox" data-trip-check="${i}"> ${x}</label>`).join("")}</div><button class="primary-btn" id="tSave">Salvează călătoria</button></article><article class="panel"><h3>Călătorii</h3>${list(db.trips,x=>`<div class="v13-row"><span>🧳</span><div><strong>${esc(x.dest)}</strong><small>${esc(x.start)} – ${esc(x.end||"—")} · ${x.done}/${checks.length} pregătite</small></div><button data-del="${x.id}">×</button></div>`)}</article>`;
tSave.onclick=()=>{if(!tDest.value)return toast("Introdu destinația");db.trips.push({id:uid(),dest:tDest.value,start:tStart.value,end:tEnd.value,done:[...document.querySelectorAll("[data-trip-check]")].filter(x=>x.checked).length});save();travel()};bindDelete("trips");
}
function family(){
V.innerHTML=`<article class="panel"><h3>Îngrijitori și responsabilități</h3><div class="form-grid">${field("Nume","fName")}${field("Rol","fRole")}${field("Telefon","fPhone","tel")}${field("Responsabilitate","fTask")}</div><button class="primary-btn" id="fSave">Adaugă persoană</button></article><article class="panel"><h3>Echipa cățelului</h3>${list(db.family,x=>`<div class="v13-row"><span>👤</span><div><strong>${esc(x.name)} · ${esc(x.role)}</strong><small>${esc(x.task)} · ${esc(x.phone)}</small></div><button data-del="${x.id}">×</button></div>`)}</article>`;
fSave.onclick=()=>{if(!fName.value)return toast("Introdu numele");db.family.push({id:uid(),name:fName.value,role:fRole.value,phone:fPhone.value,task:fTask.value});save();family()};bindDelete("family");
}
function safety(){
const card=db.safety[0]||{};
V.innerHTML=`<div class="grid two"><article class="panel"><h3>Fișă medicală de urgență</h3><div class="form-grid">${field("Microcip","eChip","text",`value="${esc(card.chip||"")}"`)}${field("Veterinar","eVet","text",`value="${esc(card.vet||"")}"`)}${field("Telefon veterinar","ePhone","tel",`value="${esc(card.phone||"")}"`)}${field("Alergii","eAllergy","text",`value="${esc(card.allergy||"")}"`)}</div><label class="block-label">Medicamente / afecțiuni<textarea id="eNotes" rows="3">${esc(card.notes||"")}</textarea></label><button class="primary-btn" id="eSave">Salvează fișa offline</button></article><article class="panel emergency-card"><span class="emergency-icon">🚨</span><h3>Acțiune rapidă</h3><p>Dacă există dificultăți de respirație, convulsii, colaps, sângerare severă sau posibilă intoxicație, contactează imediat un serviciu veterinar de urgență.</p>${card.phone?`<a class="primary-btn call-btn" href="tel:${esc(card.phone)}">📞 Sună veterinarul</a>`:""}<button class="secondary-btn" id="ePrint">Tipărește fișa</button></article></div>`;
eSave.onclick=()=>{db.safety=[{id:"card",chip:eChip.value,vet:eVet.value,phone:ePhone.value,allergy:eAllergy.value,notes:eNotes.value}];save();safety()};document.getElementById("ePrint").onclick=()=>window.print();
}
function data(){
V.innerHTML=`<div class="grid two"><article class="panel"><h3>Backup complet</h3><p>Descarcă toate datele Premium Hub într-un fișier JSON.</p><button class="primary-btn" id="exportAll">⬇ Exportă backup</button></article><article class="panel"><h3>Restaurare</h3><p>Importul înlocuiește datele Premium Hub existente.</p><input type="file" id="importAll" accept="application/json"><button class="secondary-btn" id="clearAll">Șterge datele Premium Hub</button></article></div><article class="panel"><h3>Confidențialitate</h3><p>Datele acestui modul sunt salvate local în browser. Nu sunt trimise automat către un server.</p></article>`;
exportAll.onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:"application/json"}));a.download=`poodle-premium-backup-${today()}.json`;a.click();URL.revokeObjectURL(a.href)};
importAll.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{db=JSON.parse(r.result);save();overview();toast("Backup restaurat")}catch{toast("Fișier invalid")}};r.readAsText(f)};
clearAll.onclick=()=>{if(confirm("Ștergi toate datele Premium Hub?")){localStorage.removeItem(KEY);location.reload()}};
}
function settings(){
V.innerHTML=`<article class="panel"><h3>Preferințe de accesibilitate</h3><div class="v13-settings"><label class="v13-toggle"><span><strong>Text mare</strong><small>Mărește dimensiunea textului și controalele</small></span><input id="setLarge" type="checkbox" ${db.settings.largeText?"checked":""}></label><label class="v13-toggle"><span><strong>Contrast ridicat</strong><small>Contururi și culori mai puternice</small></span><input id="setContrast" type="checkbox" ${db.settings.contrast?"checked":""}></label><label class="v13-toggle"><span><strong>Mișcare redusă</strong><small>Dezactivează animațiile decorative</small></span><input id="setMotion" type="checkbox" ${db.settings.reduceMotion?"checked":""}></label></div></article><article class="panel"><h3>Scurtături</h3><p><kbd>Alt</kbd> + <kbd>P</kbd> deschide Premium Hub. Toate controalele sunt accesibile din tastatură și au focus vizibil.</p></article>`;
["Large","Contrast","Motion"].forEach(n=>document.getElementById("set"+n).onchange=applySettings);
}
function applySettings(){if(document.getElementById("setLarge")){db.settings={largeText:setLarge.checked,contrast:setContrast.checked,reduceMotion:setMotion.checked};save()}document.documentElement.classList.toggle("v13-large",db.settings.largeText);document.documentElement.classList.toggle("v13-contrast",db.settings.contrast);document.documentElement.classList.toggle("v13-motion",db.settings.reduceMotion)}
function bindDelete(key){V.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>remove(key,b.dataset.del))}
const routes={overview,growth,symptoms,behavior,memories,inventory,travel,family,safety,data,settings};
function render(name){(routes[name]||overview)()}
function go(name){current=name;document.querySelectorAll("[data-v13]").forEach(b=>{b.classList.toggle("active",b.dataset.v13===name);b.setAttribute("aria-selected",b.dataset.v13===name)});render(name)}
document.querySelectorAll("[data-v13]").forEach(b=>b.onclick=()=>go(b.dataset.v13));
document.getElementById("v13Quick").onclick=()=>go("symptoms");
const nameControl=document.getElementById("v13DogName");
const languageControl=document.getElementById("v13Language");
const syncIdentity=()=>{
  const profileInput=document.getElementById("profileNameInput");
  const visibleName=document.getElementById("heroName")?.textContent?.trim();
  nameControl.value=profileInput?.value||visibleName||"";
  languageControl.value=(document.getElementById("langBtn")?.textContent||"").includes("EN")?"en":"ro";
};
document.getElementById("v13SaveIdentity").onclick=()=>{
  const profileInput=document.getElementById("profileNameInput");
  const profileSave=document.getElementById("saveProfileBtn");
  const nextName=nameControl.value.trim();
  if(!nextName)return toast("Introdu numele cățelului");
  if(profileInput&&profileSave){profileInput.value=nextName;profileSave.click()}
  const langButton=document.getElementById("langBtn");
  const currentLang=(langButton?.textContent||"").includes("EN")?"en":"ro";
  if(langButton&&currentLang!==languageControl.value)langButton.click();
  setTimeout(syncIdentity,0);
  toast(languageControl.value==="ro"?"Preferințe salvate ✓":"Preferences saved ✓");
};
document.getElementById("langBtn")?.addEventListener("click",()=>setTimeout(syncIdentity,0));
document.getElementById("saveProfileBtn")?.addEventListener("click",()=>setTimeout(syncIdentity,0));
syncIdentity();
document.addEventListener("keydown",e=>{if(e.altKey&&e.key.toLowerCase()==="p"){e.preventDefault();button.click()}});
applySettings();overview();
})();