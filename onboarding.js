/* Poodle Coach onboarding + custom branding */
(() => {
  const root = document.getElementById('onboarding');
  if (!root) return;

  const style = document.createElement('style');
  style.textContent = `
    .brand-mark,.big-poodle,.ob-mark{overflow:hidden;padding:0}
    .brand-mark img,.big-poodle img,.ob-mark img{width:100%;height:100%;object-fit:cover;display:block}
  `;
  document.head.appendChild(style);

  if (!data.prefs) data.prefs = {};
  if (typeof data.prefs.onboarded === 'undefined') data.prefs.onboarded = false;

  const copy = {
    ro: {
      nameTitle:'Cum îl cheamă pe cățel?',
      nameSub:'Numele apare în aplicație și în comenzile de dresaj.',
      nameLabel:'Numele cățelului',
      detailTitle:'Câteva detalii (opțional)',
      detailSub:'Le poți schimba oricând din Profil.',
      breedLabel:'Rasă', sexLabel:'Sex', ageLabel:'Vârstă (luni)', weightLabel:'Greutate (kg)',
      next:'Continuă →', finish:'Începe 🐾', skip:'Sari peste', ready:'Totul e gata!',
      readySub:'Planul zilnic va fi adaptat vârstei și profilului.', needName:'Scrie un nume mai întâi 🙂'
    },
    en: {
      nameTitle:"What's your dog's name?",
      nameSub:'The name appears across the app and in training cues.',
      nameLabel:"Dog's name", detailTitle:'A few details (optional)',
      detailSub:'You can change these anytime in Profile.', breedLabel:'Breed', sexLabel:'Sex',
      ageLabel:'Age (months)', weightLabel:'Weight (kg)', next:'Continue →', finish:'Start 🐾',
      skip:'Skip', ready:'All set!', readySub:'The daily plan will adapt to age and profile.', needName:'Please enter a name first 🙂'
    }
  };

  let step = 0;
  let obLang = data.prefs.lang || 'ro';
  const steps = [...root.querySelectorAll('[data-ob-step]')];
  const dots = [...root.querySelectorAll('#obProgress i')];
  const next = document.getElementById('obNext');
  const back = document.getElementById('obBack');
  const skip = document.getElementById('obSkip');
  const name = document.getElementById('obName');
  const breed = document.getElementById('obBreed');
  const sex = document.getElementById('obSex');
  const age = document.getElementById('obAge');
  const weight = document.getElementById('obWeight');

  function localise() {
    const c = copy[obLang];
    const map = {
      'ob.nameTitle':c.nameTitle,'ob.nameSub':c.nameSub,'ob.nameLabel':c.nameLabel,
      'ob.detailTitle':c.detailTitle,'ob.detailSub':c.detailSub,'ob.breedLabel':c.breedLabel,
      'ob.sexLabel':c.sexLabel,'ob.ageLabel':c.ageLabel,'ob.weightLabel':c.weightLabel,'ob.skip':c.skip
    };
    root.querySelectorAll('[data-i18n]').forEach(el => { if (map[el.dataset.i18n]) el.textContent = map[el.dataset.i18n]; });
    const rt = document.getElementById('obReadyTitle'); if (rt) rt.textContent = c.ready;
    const rs = document.getElementById('obReadySub'); if (rs) rs.textContent = c.readySub;
    root.querySelectorAll('[data-ob-lang]').forEach(b => b.classList.toggle('sel', b.dataset.obLang === obLang));
    if (step === steps.length - 1) next.textContent = c.finish; else next.textContent = c.next;
    skip.textContent = c.skip;
  }

  function fill() {
    name.value = data.profile.name || 'Kygo';
    breed.value = data.profile.breed || 'Poodle Toy';
    sex.value = data.profile.sex || 'Mascul';
    age.value = data.profile.age || 3;
    weight.value = data.profile.weight || 2.5;
  }

  function show(n) {
    step = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach((el,i) => el.classList.toggle('active', i === step));
    dots.forEach((d,i) => d.classList.toggle('on', i <= step));
    back.style.visibility = step === 0 ? 'hidden' : 'visible';
    skip.style.display = step === steps.length - 1 ? 'none' : '';
    const summaryName = document.getElementById('obSummaryName');
    const summaryMeta = document.getElementById('obSummaryMeta');
    if (summaryName) summaryName.textContent = name.value.trim() || data.profile.name || 'Kygo';
    if (summaryMeta) summaryMeta.textContent = `${breed.value || 'Poodle Toy'} · ${age.value || 3} ${obLang === 'ro' ? 'luni' : 'months'}`;
    localise();
    if (step === 1) setTimeout(() => name.focus(), 100);
  }

  function open() {
    fill();
    step = 0;
    root.classList.add('open');
    root.setAttribute('aria-hidden','false');
    show(0);
  }

  function finish() {
    const dogName = name.value.trim();
    if (!dogName) { toast(copy[obLang].needName); show(1); return; }
    data.profile.name = dogName;
    data.profile.breed = breed.value || 'Poodle Toy';
    data.profile.sex = sex.value || 'Mascul';
    data.profile.age = Number(age.value) || 3;
    const w = Number(weight.value);
    if (w > 0) {
      data.profile.weight = w;
      if (data.weights && data.weights.length === 1) data.weights[0].weight = w;
    }
    data.prefs.lang = obLang;
    data.prefs.onboarded = true;
    save();
    root.classList.remove('open');
    root.setAttribute('aria-hidden','true');
    applyLang();
    renderAll();
    toast(obLang === 'ro' ? `Bun venit, ${dogName}! 🐩` : `Welcome, ${dogName}! 🐩`);
  }

  root.querySelectorAll('[data-ob-lang]').forEach(btn => btn.addEventListener('click', () => {
    obLang = btn.dataset.obLang;
    localise();
  }));
  root.querySelectorAll('[data-name-suggest]').forEach(btn => btn.addEventListener('click', () => { name.value = btn.dataset.nameSuggest; }));
  back.addEventListener('click', () => show(step - 1));
  next.addEventListener('click', () => {
    if (step === 1 && !name.value.trim()) { toast(copy[obLang].needName); return; }
    if (step >= steps.length - 1) finish(); else show(step + 1);
  });
  skip.addEventListener('click', () => {
    data.prefs.lang = obLang;
    data.prefs.onboarded = true;
    save();
    root.classList.remove('open');
    root.setAttribute('aria-hidden','true');
    applyLang(); renderAll();
  });

  if (!data.prefs.onboarded) open();
})();