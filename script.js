const menuBtn=document.querySelector('.menu-btn');const navLinks=document.querySelector('.nav-links');menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const galleryImages=[
  'assets/corporate.jpg',
  'assets/formal.jpg',
  'assets/private.jpg',
  'assets/gallery/corporate-01.jpg',
  'assets/gallery/formal-01.jpg',
  'assets/gallery/private-01.jpg',
  'assets/gallery/corporate-02.jpg',
  'assets/gallery/formal-02.jpg',
  'assets/gallery/private-03.jpg',
  'assets/gallery/corporate-03.jpg',
  'assets/gallery/formal-03.jpg',
  'assets/gallery/private-04.jpg',
  'assets/gallery/corporate-04.jpg',
  'assets/gallery/formal-04.jpg',
  'assets/gallery/private-05.jpg',
  'assets/gallery/corporate-05.jpg',
  'assets/gallery/formal-05.jpg',
  'assets/gallery/corporate-06.jpg',
  'assets/gallery/formal-06.jpg',
  'assets/gallery/corporate-07.jpg',
  'assets/gallery/gallery-new-01.jpg',
  'assets/gallery/gallery-new-02.jpg',
  'assets/gallery/gallery-new-03.jpg',
  'assets/gallery/gallery-new-04.jpg',
  'assets/gallery/gallery-new-05.jpg',
  'assets/gallery/gallery-new-06.jpg',
  'assets/gallery/gallery-new-07.jpg',
  'assets/gallery/gallery-new-08.jpg'
];
const mainGalleryImage=document.querySelector('#mainGalleryImage');
const mainGalleryCounter=document.querySelector('#mainGalleryCounter');
const mainGallery=document.querySelector('.main-gallery');
let galleryIndex=0,touchStartX=0;
function renderMainGallery(){
  mainGalleryImage.classList.add('is-changing');
  window.setTimeout(()=>{
    mainGalleryImage.src=galleryImages[galleryIndex];
    mainGalleryCounter.textContent=`${galleryIndex+1} / ${galleryImages.length}`;
    mainGalleryImage.classList.remove('is-changing');
  },120);
}
function moveMainGallery(step){galleryIndex=(galleryIndex+step+galleryImages.length)%galleryImages.length;renderMainGallery();}
document.querySelector('.main-gallery-prev').addEventListener('click',()=>moveMainGallery(-1));
document.querySelector('.main-gallery-next').addEventListener('click',()=>moveMainGallery(1));
mainGallery.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].clientX},{passive:true});
mainGallery.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>45)moveMainGallery(dx>0?-1:1)},{passive:true});
mainGallery.addEventListener('mouseenter',()=>mainGallery.focus({preventScroll:true}));
mainGallery.tabIndex=0;
mainGallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')moveMainGallery(-1);if(e.key==='ArrowRight')moveMainGallery(1)});
mainGalleryCounter.textContent=`1 / ${galleryImages.length}`;
const form=document.querySelector('#contactForm'),note=document.querySelector('#formNote');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const button=form.querySelector('button[type="submit"]');
  const data=Object.fromEntries(new FormData(form).entries());
  button.disabled=true; button.innerHTML='Sending…'; note.textContent='';
  try{
    const response=await fetch('https://formsubmit.co/ajax/saseventsandservices@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({...data,_subject:`New SAS Events enquiry — ${data.type}`,_template:'table',_url:window.location.href})
    });
    const result=await response.json();
    if(!response.ok||result.success===false) throw new Error('Submission failed');
    note.textContent='Thank you! Your enquiry has been sent successfully.';
    form.reset();
  }catch(err){
    note.textContent='Sorry, we could not send your enquiry. Please try again or email us directly.';
  }finally{
    button.disabled=false; button.innerHTML='Send enquiry <span>↗</span>';
  }
});
document.querySelector('#year').textContent=new Date().getFullYear();
