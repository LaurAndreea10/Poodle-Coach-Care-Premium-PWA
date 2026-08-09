/* v12 accessibility: persistent preferences, keyboard navigation, semantics and speech */
(() => {
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const defaults={font:'normal',contrast:'off',readable:false,links:false,targets:false,reduceMotion:false,noTransparency:false,spacing:false,hideImages:false};
const prefs=Object.assign({},defaults,data?.prefs?.accessibility||{});
if(data?.prefs){data.prefs.accessibility=prefs;save?.()}

const css=document.createElement('link');css.rel='stylesheet';css.href='v12-accessibility.css?v=12';document.head.append(css);

function apply(){
 const h=document.documentElement;
 ['a11y-font-large','a11y-font-xlarge','a11y-readable','a11y-links','a11y-targets','a11y-contrast','a11y-dark-contrast','a11y-reduce-motion','a11y-no-transparency','a11y-spacing','a11y-hide-images'].forEach(c=>h.classList.remove(c));
 if(prefs.font==='large')h.classList.add('a11y-font-large');if(prefs.font==='xlarge')h.classList.add('a11y-font-xlarge');
 if(prefs.readable)h.classList.add('a11y-readable');if(prefs.links)h.classList.add('a11y-links');if(prefs.targets)h.classList.add('a11y-targets');
 if(prefs.contrast==='light')h.classList.add('a11y-contrast');if(prefs.contrast==='dark')h.classList.add('a11y-dark-contrast');
 if(prefs.reduceMotion)h.classList.add('a11y-reduce-motion');if(prefs.noTransparency)h.classList.add('a11y-no-transparency');if(prefs.spacing)h.classList.add('a11y-spacing');if(prefs.hideImages)h.classList.add('a11y-hide-images');
 if(data?.prefs){data.prefs.accessibility={...prefs};save?.()}
 updateControls();
}
function set(key,val){prefs[key]=val;apply()}
function toggle(key){set(key,!prefs[key])}

function semanticPass(){
 document.documentElement.lang=(typeof lang==='function'&&lang()==='en')?'en':'ro';
 const main=q('main.main')||q('main');if(main){main.id='mainContent';main.tabIndex=-1;main.setAttribute('role','main')}
 const nav=q('#nav');if(nav)nav.setAttribute('aria-label',document.documentElement.lang==='ro'?'Navigație principală':'Main navigation');
 const sidebar=q('#sidebar');if(sidebar)sidebar.setAttribute('aria-label',document.documentElement.lang==='ro'?'Meniu aplicație':'Application menu');
 qa('button').forEach(b=>{if(!b.getAttribute('type'))b.setAttribute('type','button')});
 qa('.nav-btn').forEach(b=>{if(b.classList.contains('active'))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 const menu=q('#menuBtn');if(menu){menu.setAttribute('aria-label',document.documentElement.lang==='ro'?'Deschide sau închide meniul':'Open or close menu');menu.setAttribute('aria-controls','sidebar');menu.setAttribute('aria-expanded',q('#sidebar')?.classList.contains('open')?'true':'false')}
 const notify=q('#notifyBtn');if(notify)notify.setAttribute('aria-label',document.documentElement.lang==='ro'?'Activează notificările':'Enable notifications');
 const toast=q('#toast');if(toast){toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.setAttribute('aria-atomic','true')}
 qa('canvas').forEach(c=>{c.setAttribute('role','img');if(!c.getAttribute('aria-label'))c.setAttribute('aria-label',document.documentElement.lang==='ro'?'Grafic de progres':'Progress chart')});
 qa('img').forEach(img=>{if(!img.hasAttribute('alt'))img.alt=''});
 qa('.skill-levels').forEach(x=>x.setAttribute('aria-hidden','true'));
 qa('.skill-card').forEach(card=>{const title=card.querySelector('h3')?.textContent?.trim();const small=card.querySelector('small')?.textContent?.trim();if(title)card.setAttribute('aria-label',[title,small].filter(Boolean).join(', '))});
 qa('dialog,#modal,#aiModal').forEach(d=>{d.setAttribute('role','dialog');d.setAttribute('aria-modal','true')});
}

function ensureUI(){
 if(!q('.skip-link')){const a=document.createElement('a');a.className='skip-link';a.href='#mainContent';a.textContent=document.documentElement.lang==='ro'?'Sari la conținut':'Skip to content';a.onclick=()=>setTimeout(()=>q('#mainContent')?.focus(),0);document.body.prepend(a)}
 if(!q('#a11yFab')){const b=document.createElement('button');b.id='a11yFab';b.type='button';b.textContent='♿ Accesibilitate';b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls','a11yDialog');document.body.append(b)}
 if(!q('#a11yDialog')){const d=document.createElement('dialog');d.id='a11yDialog';d.innerHTML=`<div class="a11y-head"><div><span class="eyebrow">Accessibility</span><h2>♿ <span data-a11y-title>Accesibilitate</span></h2><p data-a11y-sub>Personalizează aplicația pentru vedere, mobilitate, concentrare și cititoare de ecran.</p></div><button class="a11y-close" aria-label="Închide">✕</button></div><div class="a11y-body"><section class="a11y-group"><h3 data-a11y-vision>Vedere și lizibilitate</h3><div class="a11y-font-controls"><button data-font="normal" aria-label="Text normal">A</button><button data-font="large" aria-label="Text mare">A+</button><button data-font="xlarge" aria-label="Text foarte mare">A++</button><output id="a11yFontOut">100%</output></div><div class="a11y-grid"><label class="a11y-toggle"><input type="checkbox" data-pref="readable"><span><strong>Font ușor de citit</strong><small>Forme simple, spațiere mai clară.</small></span></label><label class="a11y-toggle"><input type="checkbox" data-pref="spacing"><span><strong>Spațiere mărită</strong><small>Mai mult spațiu între rânduri și paragrafe.</small></span></label><label class="a11y-toggle"><input type="checkbox" data-pref="links"><span><strong>Subliniază linkurile</strong><small>Nu te baza doar pe culoare.</small></span></label><label class="a11y-toggle"><input type="checkbox" data-pref="hideImages"><span><strong>Ascunde imaginile decorative</strong><small>Reduce încărcarea vizuală.</small></span></label></div><div class="a11y-actions"><button data-contrast="off">Contrast normal</button><button data-contrast="light">Contrast ridicat luminos</button><button data-contrast="dark">Contrast ridicat întunecat</button></div></section><section class="a11y-group"><h3>Mobilitate și sensibilitate la mișcare</h3><div class="a11y-grid"><label class="a11y-toggle"><input type="checkbox" data-pref="targets"><span><strong>Butoane mai mari</strong><small>Zone de atingere de minimum 48 px.</small></span></label><label class="a11y-toggle"><input type="checkbox" data-pref="reduceMotion"><span><strong>Reduce animațiile</strong><small>Elimină mișcările și tranzițiile inutile.</small></span></label><label class="a11y-toggle"><input type="checkbox" data-pref="noTransparency"><span><strong>Fără transparențe</strong><small>Fundaluri mai stabile vizual.</small></span></label></div></section><section class="a11y-group"><h3>Asistență</h3><div class="a11y-actions"><button id="a11yReadPage">🔊 Citește pagina</button><button id="a11yStopSpeech">■ Oprește citirea</button><button id="a11yReset">↺ Reset accesibilitate</button></div><p class="fineprint">Scurtătură: Alt + A deschide acest panou. Navigarea se poate face cu Tab, Shift+Tab, Enter și Escape.</p></section></div>`;document.body.append(d)}
 bindUI();updateLanguage();updateControls();
}
let bound=false;
function bindUI(){if(bound)return;bound=true;const d=q('#a11yDialog');q('#a11yFab').onclick=()=>{d.showModal();setTimeout(()=>d.querySelector('button,input')?.focus(),0)};d.querySelector('.a11y-close').onclick=()=>d.close();d.addEventListener('cancel',()=>speechSynthesis?.cancel?.());qa('[data-pref]').forEach(i=>i.onchange=()=>toggle(i.dataset.pref));qa('[data-font]').forEach(b=>b.onclick=()=>set('font',b.dataset.font));qa('[data-contrast]').forEach(b=>b.onclick=()=>set('contrast',b.dataset.contrast));q('#a11yReset').onclick=()=>{Object.assign(prefs,defaults);apply()};q('#a11yReadPage').onclick=readPage;q('#a11yStopSpeech').onclick=()=>speechSynthesis?.cancel?.();document.addEventListener('keydown',e=>{if(e.altKey&&e.key.toLowerCase()==='a'){e.preventDefault();if(d.open)d.close();else{d.showModal();setTimeout(()=>d.querySelector('button,input')?.focus(),0)}}if(e.key==='Escape'&&q('#sidebar')?.classList.contains('open'))q('#sidebar').classList.remove('open')});q('#menuBtn')?.addEventListener('click',()=>setTimeout(()=>q('#menuBtn')?.setAttribute('aria-expanded',q('#sidebar')?.classList.contains('open')?'true':'false'),0));}
function updateControls(){qa('[data-pref]').forEach(i=>i.checked=!!prefs[i.dataset.pref]);q('#a11yFontOut')&&(q('#a11yFontOut').textContent=prefs.font==='xlarge'?'125%':prefs.font==='large'?'112%':'100%');qa('[data-font]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.font===prefs.font)));qa('[data-contrast]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.contrast===prefs.contrast)))}
function updateLanguage(){const ro=document.documentElement.lang!=='en',d=q('#a11yDialog');if(!d)return;q('[data-a11y-title]').textContent=ro?'Accesibilitate':'Accessibility';q('[data-a11y-sub]').textContent=ro?'Personalizează aplicația pentru vedere, mobilitate, concentrare și cititoare de ecran.':'Customize the app for vision, mobility, focus and screen readers.';q('.skip-link').textContent=ro?'Sari la conținut':'Skip to content';q('#a11yFab').textContent=ro?'♿ Accesibilitate':'♿ Accessibility'}
function readPage(){if(!('speechSynthesis'in window))return;const active=q('.page.active')||q('#mainContent');const text=(active?.innerText||'').replace(/\s+/g,' ').trim();if(!text)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.slice(0,12000));u.lang=document.documentElement.lang==='en'?'en-US':'ro-RO';u.rate=.95;speechSynthesis.speak(u)}

ensureUI();semanticPass();apply();
const observer=new MutationObserver(()=>{semanticPass();updateLanguage()});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
window.addEventListener('storage',apply);
})();
