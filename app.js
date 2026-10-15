const q=(s,r=document)=>r.querySelector(s);
const esc=(s='')=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const br=(s='')=>esc(s).replace(/\n/g,'<br>');
async function load(p){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw Error(p);return r.json()}
function tallyId(url=''){const m=String(url).match(/tally\.so\/r\/([A-Za-z0-9_-]+)/);return m?m[1]:''}
async function init(){
 const [h,hero,s,b,c,f,foot,st]=await Promise.all([
  load('/01-header.json'),load('/02-hero.json'),load('/03-situations.json'),
  load('/04-benefits.json'),load('/05-consult.json'),load('/06-faq.json'),
  load('/07-footer.json'),load('/08-sticky.json')
 ]);
 q('#site-header').innerHTML=`<div class="topbar"><div class="wrap topbar-inner"><a class="brand" href="/"><b>${esc(h.brandAccent)}</b>${esc(h.brandRest)}</a><a class="top-cta" href="#consult">${esc(h.cta)}</a></div></div>`;
 let title=br(hero.title); if(hero.accent) title=title.replace(esc(hero.accent),`<span class="accent">${esc(hero.accent)}</span>`);
 q('#hero').innerHTML=`<div class="hero"><div class="wrap"><div class="hero-badge">${esc(hero.badge)}</div><h1>${title}</h1><p class="hero-copy">${br(hero.description)}</p><div class="hero-points">${hero.points.map(x=>`<div>${esc(x)}</div>`).join('')}</div>${hero.image?`<div class="hero-image"><img src="${esc(hero.image)}" alt="${esc(hero.imageAlt)}"></div>`:''}<a class="cta" href="#consult">${esc(hero.cta)} →</a><p class="micro">${esc(hero.microcopy)}</p></div></div>`;
 if(s.enabled!==false) q('#situations').innerHTML=`<div class="section soft"><div class="wrap"><p class="eyebrow">${esc(s.eyebrow)}</p><h2>${br(s.title)}</h2><p class="sub">${br(s.description)}</p><div class="situation-grid">${s.items.map(x=>`<a class="situation" href="#consult"><strong>${esc(x.title)}</strong><span>${esc(x.description)}</span></a>`).join('')}</div></div></div>`;
 if(b.enabled!==false) q('#benefits').innerHTML=`<div class="section"><div class="wrap"><p class="eyebrow">${esc(b.eyebrow)}</p><h2>${br(b.title)}</h2><ul class="check-list">${b.items.map((x,i)=>`<li><span class="check">${i+1}</span><div><strong>${esc(x.title)}</strong><small>${esc(x.description)}</small></div></li>`).join('')}</ul><div class="reason-card"><h3>${br(b.cardTitle)}</h3><p>${br(b.cardDescription)}</p></div><a class="cta" href="#consult">${esc(b.cta)} →</a></div></div>`;
 const tid=tallyId(c.tallyUrl);
 q('#consult').innerHTML=`<div class="form-section"><div class="wrap"><div class="form-card"><p class="eyebrow">${esc(c.eyebrow)}</p><h2>${br(c.title)}</h2><p class="sub">${br(c.description)}</p><div class="reassure">${c.tags.map(x=>`<span>${esc(x)}</span>`).join('')}</div>${tid?`<iframe class="tally-frame" src="https://tally.so/embed/${encodeURIComponent(tid)}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" title="상담 신청"></iframe>`:`<div class="tally-placeholder">Tally URL을 입력하면 상담폼이 여기에 표시됩니다.</div>`}</div></div></div>`;
 if(f.enabled!==false) q('#faq').innerHTML=`<div class="section"><div class="wrap"><p class="eyebrow">${esc(f.eyebrow)}</p><h2>${br(f.title)}</h2>${f.items.map(x=>`<details><summary>${esc(x.question)}</summary><p>${br(x.answer)}</p></details>`).join('')}</div></div>`;
 q('#site-footer').innerHTML=`<div class="wrap"><div class="footer-brand">${esc(foot.brand)}</div><div class="footer-info">상호명: ${esc(foot.businessName||'[입력 필요]')}<br>대표자: ${esc(foot.owner||'[입력 필요]')}<br>사업자등록번호: ${esc(foot.registration||'[입력 필요]')}<br>대표전화: ${esc(foot.phone||'[입력 필요]')}<br>주소: ${esc(foot.address||'[입력 필요]')}</div></div>`;
 q('#sticky-cta').innerHTML=`<div class="sticky-cta"><a href="#consult">${esc(st.text)}</a></div>`;
}
document.addEventListener('DOMContentLoaded',()=>init().catch(console.error));
