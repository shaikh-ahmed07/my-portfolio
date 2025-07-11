/* ---------  MINI SELECTORS  --------- */
function $(q){return document.querySelector(q)}
function $$(q){return document.querySelectorAll(q)}

/* ---------  HAMBURGER MENU  --------- */
const hamburger = $('#hamburger');
function toggleMenu(){ $('#nav-links').classList.toggle('active'); }
hamburger.addEventListener('click', toggleMenu);

// close menu after clicking a link (mobile UX)
$$('#nav-links a').forEach(link => link.addEventListener('click', () =>
  $('#nav-links').classList.remove('active')));

/* ---------  THEME TOGGLE (light ⟷ dark)  --------- */
const themeBtn = $('#theme-btn');

// restore saved preference
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ---------  TYPEWRITER  --------- */
const words = ["CS Student","Frontend Dev","AI Enthusiast","Problem Solver"];
let wi=0,ci=0,del=false;
function type(){
  const el=$('.typewriter');
  const word=words[wi];
  if(!del){
    el.textContent=word.slice(0,++ci);
    if(ci===word.length){del=true;setTimeout(type,1500);return;}
  }else{
    el.textContent=word.slice(0,--ci);
    if(ci===0){del=false;wi=(wi+1)%words.length;}
  }
  setTimeout(type, del?60:120);
}

/* ---------  ON LOAD  --------- */
document.addEventListener('DOMContentLoaded',()=>{
  type();

  // fade‑in on scroll
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:.2});
  $$('.fade-in-up').forEach(el=>obs.observe(el));

  // skill bars
  $$('.skills .bar div').forEach(b=>{b.style.width=b.dataset.width+'%';});

  // contact form handler
  $('#contact-form').addEventListener('submit',async e=>{
    e.preventDefault();
    const data=new FormData(e.target);
    const status=$('#form-status');
    status.textContent='Sending…';
    try{
      const res=await fetch(e.target.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
      status.textContent=res.ok?'✔️ Message sent!':'❌ Error – please try again.';
      if(res.ok)e.target.reset();
    }catch{
      status.textContent='❌ Network error.';
    }
  });
});
