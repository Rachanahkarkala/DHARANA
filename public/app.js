(() => {
const U='https://images.unsplash.com/';
const photo=(id,w=1400)=>U+id+'?auto=format&fit=crop&w='+w+'&q=85';
const slides=[
 ['photo-1497366754035-f200968a6e72','Premium workspace'],
 ['photo-1497366811353-6870744d04b2','Quiet study space'],
 ['photo-1497215728101-856f4ea42174','Private office'],
 ['photo-1497366216548-37526070297c','Meeting room'],
 ['photo-1524758631624-e2822e304c36','Lounge & community']
];
const spaces=[
 ['CO-WORKING','Flexible workspaces designed for focused work, collaboration and productivity.','photo-1497366754035-f200968a6e72'],
 ['STUDY SPACES','Quiet, comfortable spaces designed for deep focus and long study sessions.','photo-1497366811353-6870744d04b2'],
 ['PRIVATE OFFICES','Dedicated spaces for professionals, teams and growing businesses.','photo-1497215728101-856f4ea42174'],
 ['MEETING ROOMS','Elegant professional rooms for meetings, presentations and collaboration.','photo-1497366216548-37526070297c'],
 ['STARTUP COMMUNITY','A place to meet founders, creators, professionals and ambitious people.','photo-1524758631624-e2822e304c36'],
 ['TRAINING & LEARNING','Spaces for workshops, classes, training sessions and knowledge sharing.','photo-1521737711867-e3b97375f902']
];
const amenities=['High-speed Wi-Fi','Air conditioning','Ergonomic seating','Power outlets','Meeting rooms','Private offices','Study areas','Lounge areas','Printing','Scanning','Charging stations','Security','Reception','Natural lighting','Pantry / refreshments','Collaboration spaces'];
const gallery=['photo-1497366754035-f200968a6e72','photo-1524758631624-e2822e304c36','photo-1497366811353-6870744d04b2','photo-1497215728101-856f4ea42174','photo-1497366216548-37526070297c','photo-1504384308090-c894fdcc538d','photo-1521737711867-e3b97375f902','photo-1524751619925-3b7c0a3f3a3d','photo-1516321318423-f06f85e504b3','photo-1497366754035-f200968a6e72'];

document.getElementById('site').innerHTML =
 '<div class="intro" id="intro"><div class="intro-inner">'+
 '<div class="intro-logo">D</div><div class="eyebrow">Dharana Spaces</div>'+
 '<h1 class="intro-title serif">COME TO DHARANA.</h1><p class="intro-sub">A space to focus, create and grow.</p>'+
 '<button class="intro-enter" id="enter">ENTER DHARANA <span>→</span></button></div></div>'+
 '<header class="nav" id="nav"><div class="wrap nav-row">'+
 '<a href="#home" class="logo-lockup"><span class="mark">D</span><span>DHARANA SPACES</span></a>'+
 '<nav class="nav-links"><a href="#home">Home</a><a href="#about">About</a><a href="#spaces">Spaces</a><a href="#amenities">Amenities</a><a href="#community">Community</a><a href="#gallery">Gallery</a><a href="#location">Location</a><a href="#contact">Contact</a></nav>'+
 '<a class="btn btn-dark nav-cta" href="#contact">Enquire Now</a><button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button>'+
 '</div></header>'+
 '<main id="home">'+
 '<section class="hero"><div class="hero-media"><img src="'+photo('photo-1497366754035-f200968a6e72')+'" alt="Premium workspace interior"></div><div class="hero-overlay"></div>'+
 '<div class="wrap hero-content reveal"><div class="eyebrow">Bengaluru · Work / Study / Create</div><h1 class="serif">COME TO<br>DHARANA.</h1><p>Come with a purpose.<br>Find your space. Meet your people. Create what’s next.</p><div class="hero-actions"><a class="btn btn-light" href="#spaces">Explore Dharana</a><a class="btn btn-outline" href="#contact">Enquire Now</a></div><div class="scroll-cue">Scroll to explore ↓</div></div></section>'+
 '<section class="marquee" aria-label="Workspace photography"><div class="marquee-window">'+
 slides.map((s,i)=>'<div class="marquee-slide '+(i===0?'active':'')+'"><img src="'+photo(s[0])+'" alt="'+s[1]+'"><div class="marquee-caption">'+s[1]+'</div></div>').join('')+
 '<div class="progress">'+slides.map((_,i)=>'<i class="'+(i===0?'active':'')+'"></i>').join('')+'</div></div></section>'+
 '<section class="section section-soft" id="about"><div class="wrap statement reveal"><div><div class="eyebrow">A space with intention</div><h2 class="serif">More than a workspace.<br>A place to become.</h2><div class="gold-line"></div></div><p>Dharana Spaces is designed for people who want more from the place they work, study and build. Whether you are preparing for your next exam, growing a startup, meeting your team or simply looking for a space to focus, Dharana gives you the environment to do it.</p></div></section>'+
 '<section class="section" id="spaces"><div class="wrap"><div class="section-head reveal"><div class="eyebrow">Spaces / Services</div><h2 class="serif">FIND YOUR<br>SPACE.</h2></div><div class="spaces-grid">'+
 spaces.map(s=>'<article class="space-card reveal"><img class="image" src="'+photo(s[2])+'" alt="'+s[0]+'"><div class="space-copy"><div class="eyebrow">'+s[0]+'</div><h3 class="serif">'+s[0]+'</h3><p>'+s[1]+'</p><div class="space-arrow">↗</div></div></article>').join('')+
 '</div></div></section>'+
 '<section class="section section-soft" id="amenities"><div class="wrap amenities reveal"><div><div class="eyebrow">Designed for the day</div><h2 class="serif">EVERYTHING<br>YOU NEED.</h2><div class="gold-line"></div></div><div class="amenity-grid">'+amenities.map(a=>'<div class="amenity"><span class="dot"></span>'+a+'</div>').join('')+'</div></div></section>'+
 '<section class="section section-green"><div class="wrap reveal"><div class="eyebrow">Why Dharana</div><h2 class="serif" style="font-size:clamp(48px,7vw,92px);margin:15px 0">SPACE + PEOPLE +<br>KNOWLEDGE + OPPORTUNITY</h2><div class="four-wrap">'+
 [['SPACE','A thoughtfully designed environment built for focus.'],['PEOPLE','A community of ambitious and curious people.'],['KNOWLEDGE','A place to learn, exchange ideas and grow.'],['OPPORTUNITY','A space where conversations become collaborations.']].map(x=>'<div class="concept"><h3>'+x[0]+'</h3><p class="serif">'+x[1]+'</p></div>').join('')+
 '</div></div></section>'+
 '<section id="community" class="community"><div class="community-img"><img class="image" src="'+photo('photo-1524758631624-e2822e304c36')+'" alt="Dharana community space"></div><div class="community-copy reveal"><div class="eyebrow">Community</div><h2 class="serif">MEET YOUR<br>PEOPLE.</h2><p>Work doesn’t have to feel isolated. Dharana brings together students, professionals, founders, creators and teams under one roof.</p><div class="triad">'+[['FOCUS','Spaces designed for deep work.'],['CONNECT','Meet people building interesting things.'],['CREATE','Turn ideas into something real.']].map(x=>'<div><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join('')+'</div></div></section>'+
 '<section class="section" id="gallery"><div class="wrap"><div class="section-head reveal"><div class="eyebrow">A visual note</div><h2 class="serif">A GLIMPSE<br>INTO DHARANA</h2></div><div class="gallery-grid">'+gallery.map((g,i)=>'<div class="gallery-item reveal" data-gallery="'+i+'"><img loading="lazy" src="'+photo(g,1000)+'" alt="Dharana workspace interior"></div>').join('')+'</div></div></section>'+
 '<section class="section section-soft" id="location"><div class="wrap location"><div class="reveal"><div class="eyebrow">Location</div><h2 class="serif" style="font-size:clamp(50px,7vw,88px);margin:18px 0">FIND YOUR WAY<br>TO DHARANA.</h2><div class="location-card"><div class="eyebrow">Kadadi’s Haven</div><div class="location-address">No. 118 &amp; 119, Prakruthi Layout<br>Srikantapura, Anchepalya Main Road<br>Dasanapura, Bengaluru, Karnataka – 560073</div><div style="margin-top:18px"><strong>80883 55784</strong></div><a class="btn btn-dark map-btn" target="_blank" rel="noopener" href="https://maps.app.goo.gl/VK73dBjCTCYraZBD8?g_st=iw">Get Directions ↗</a></div></div><div class="reveal"><img class="image" style="min-height:520px" src="'+photo('photo-1497366216548-37526070297c')+'" alt="Dharana workspace interior"></div></div></section>'+
 '<section class="section" id="contact"><div class="wrap contact"><div class="reveal"><div class="eyebrow">Enquiries</div><h2 class="serif">LET’S CREATE<br>SOMETHING<br>HERE.</h2><p style="font-size:17px;line-height:1.7;max-width:420px;color:#49645f">Have a question about memberships, workspace availability, private offices, meetings or events? Send us a message.</p><a href="tel:+918088355784" style="display:inline-block;margin-top:22px;text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:700">Call Dharana · 80883 55784</a></div>'+
 '<form class="form reveal" id="enquiryForm"><div class="field"><label for="name">Full Name</label><input id="name" name="name" required maxlength="100"></div><div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required maxlength="200"></div><div class="field"><label for="phone">Phone Number</label><input id="phone" name="phone" required maxlength="30"></div><div class="field"><label for="looking">What are you looking for?</label><select id="looking" name="looking" required><option value="">Select one</option><option>Coworking</option><option>Study Space</option><option>Private Office</option><option>Meeting Room</option><option>Training / Event</option><option>Partnership</option><option>General Enquiry</option></select></div><div class="field"><label for="message">Message</label><textarea id="message" name="message" rows="6" required maxlength="2000"></textarea></div><div class="form-status" id="formStatus" aria-live="polite"></div><button class="btn btn-dark" id="submitBtn" type="submit">Send Enquiry <span>→</span></button></form></div></section></main>'+
 '<footer class="footer"><div class="wrap footer-grid"><div><div class="logo-lockup"><span class="mark">D</span><span>DHARANA SPACES</span></div><h3 class="serif">COME TO DHARANA.</h3><p style="line-height:1.7;max-width:430px;opacity:.78">A premium space to focus, connect and create what’s next.</p></div><div><div class="eyebrow">Explore</div><div class="footer-links" style="margin-top:18px"><a href="#about">About</a><a href="#spaces">Spaces</a><a href="#amenities">Amenities</a><a href="#gallery">Gallery</a><a href="#location">Location</a><a href="#contact">Contact</a></div></div><div><div class="eyebrow">Visit</div><div style="margin-top:18px;line-height:1.7;font-size:13px">80883 55784<br>Kadadi’s Haven, Prakruthi Layout,<br>Bengaluru</div><div style="margin-top:20px"><span>Instagram ↗</span></div></div></div><div class="wrap"><small>© 2026 Dharana Spaces. All rights reserved.</small></div></footer>'+
 '<a class="phone-cta" href="tel:+918088355784">Call Dharana</a>'+
 '<div class="lightbox" id="lightbox"><button id="lightboxClose" aria-label="Close image">×</button><img id="lightboxImg" alt="Dharana gallery image"></div><div class="toast" id="toast"></div><div class="cursor-dot" id="cursorDot"></div><div class="trail" id="trail"></div>';

const intro=document.getElementById('intro');
const dismissIntro=()=>{sessionStorage.setItem('dharana_intro_seen','1');intro.classList.add('hide');};
if(sessionStorage.getItem('dharana_intro_seen')) intro.classList.add('hide');
document.getElementById('enter').addEventListener('click',dismissIntro);
intro.addEventListener('click',e=>{if(e.target===intro)dismissIntro();});

const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
document.getElementById('menuBtn').addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

let slide=0;
setInterval(()=>{const ss=document.querySelectorAll('.marquee-slide'),ps=document.querySelectorAll('.progress i');if(!ss.length)return;ss[slide].classList.remove('active');ps[slide].classList.remove('active');slide=(slide+1)%ss.length;ss[slide].classList.add('active');ps[slide].classList.add('active');},1000);

const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImg');
document.querySelectorAll('[data-gallery]').forEach(el=>el.addEventListener('click',()=>{lbImg.src=photo(gallery[Number(el.dataset.gallery)],1400);lb.classList.add('show')}));
document.getElementById('lightboxClose').addEventListener('click',()=>lb.classList.remove('show'));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('show')});

const cursorOk=matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(cursorOk){
 const dot=document.getElementById('cursorDot'),trail=document.getElementById('trail');let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px';});
 (function tick(){tx+=(x-tx)*.16;ty+=(y-ty)*.16;trail.style.left=tx+'px';trail.style.top=ty+'px';requestAnimationFrame(tick)})();
 document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>trail.classList.add('cursor-hot'));el.addEventListener('mouseleave',()=>trail.classList.remove('cursor-hot'));});
}else{document.getElementById('cursorDot').remove();document.getElementById('trail').remove()}

const form=document.getElementById('enquiryForm'),status=document.getElementById('formStatus'),btn=document.getElementById('submitBtn');
form.addEventListener('submit',async e=>{
 e.preventDefault();status.textContent='';status.style.color='';btn.disabled=true;btn.textContent='Sending…';
 const data=Object.fromEntries(new FormData(form).entries());
 try{
  const r=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const j=await r.json();if(!r.ok)throw new Error(j.error||'Something went wrong.');
  status.textContent='Thank you. Your message has been received. We’ll get back to you soon.';form.reset();
 }catch(err){status.textContent=err.message;status.style.color='#9d3d3d';}
 finally{btn.disabled=false;btn.innerHTML='Send Enquiry <span>→</span>';}
});
})();