history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

// scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// active nav link on scroll
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((sec) => {
    if (scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
  });
  links.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

const progressBar = document.getElementById('progress-bar');
const topBtn = document.getElementById('topBtn');
const cursor = document.querySelector('.cursor-glow');
const resumeModal = document.getElementById('resumeModal');
const resumeLinks = document.querySelectorAll('.resume-open-link');
const resumeCloseBtn = document.getElementById('resumeModalClose');
const resumeCloseLinks = document.querySelectorAll('.resume-close-link');
const resumeSheet = document.getElementById('resumeSheet');

function openResumeModal(event) {
  if (event) event.preventDefault();
  if (!resumeModal) return;
    if (resumeSheet) {
        const scale = Math.min(1, (window.innerWidth - 32) / 760, (window.innerHeight - 140) / 980);
        resumeSheet.style.setProperty('--resume-scale', scale);
        resumeSheet.style.setProperty('--resume-left', `${Math.max(0, (window.innerWidth - 24 - 760 * scale) / 2)}px`);
    }
  document.body.classList.add('resume-modal-open');
  resumeModal.setAttribute('aria-hidden', 'false');
}

function closeResumeModal() {
  if (!resumeModal) return;
  document.body.classList.remove('resume-modal-open');
  resumeModal.setAttribute('aria-hidden', 'true');
}

resumeLinks.forEach((link) => {
  link.addEventListener('click', openResumeModal);
});

if (resumeCloseBtn) {
  resumeCloseBtn.addEventListener('click', closeResumeModal);
}

resumeCloseLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    closeResumeModal();
  });
});

if (resumeModal) {
  resumeModal.addEventListener('click', (event) => {
    if (event.target === resumeModal) {
      closeResumeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeResumeModal();
  }
});
/* ===========================
      Typing Animation
=========================== */

const words = [
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Frontend Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    if(!typing) return;

    let current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0, charIndex++);
        
        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typing.textContent = current.substring(0, charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();

/* ===========================
    Scroll Progress Bar
=========================== */

window.addEventListener("scroll", function(){

    let scrollTop = document.documentElement.scrollTop;

    let scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    let progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

}); 
/* ===========================
      Back To Top Button
=========================== */

if (topBtn) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

if (cursor) {
    document.addEventListener("mousemove", function(e){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}
/*====================================
      ABOUT COUNTER ANIMATION
====================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 60;

            const update = () => {

                if(count < target){

                    count += speed;

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(update);

                }else{

                    if(target === 100){
                        counter.innerText = target + "%";
                    }else{
                        counter.innerText = target + "+";
                    }

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{
    counterObserver.observe(counter);
});
/*====================================
      CONTACT SECTION ANIMATION
====================================*/

// Contact Cards Animation
const contactCards = document.querySelectorAll(".contact-box");

const contactObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show-contact");

        }

    });

},{
    threshold:0.2
});

contactCards.forEach(card=>{

    card.classList.add("hide-contact");

    contactObserver.observe(card);

});


/*====================================
      BUTTON RIPPLE EFFECT
====================================*/

document.querySelectorAll(".contact-btn").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(this.clientWidth,this.clientHeight);

        circle.style.width=diameter+"px";
        circle.style.height=diameter+"px";

        circle.style.left=e.offsetX-diameter/2+"px";
        circle.style.top=e.offsetY-diameter/2+"px";

        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(()=>{
            circle.remove();
        },600);

    });

});


/*====================================
      SOCIAL ICON HOVER
====================================*/

document.querySelectorAll(".social-btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-8px) scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translateY(0) scale(1)";

    });

});

/* Contact form handler - compose an email using mailto: */
const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const message = document.getElementById('cf-message').value.trim();

        const subject = encodeURIComponent('Portfolio contact from ' + name);
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);

        // Open user's email client with prefilled fields
        window.location.href = `mailto:mithuna@gmail.com?subject=${subject}&body=${body}`;
    });
}

/* Project modal logic */
const projectModal = document.getElementById('projectModal');
if(projectModal){
    const modalImg = projectModal.querySelector('.modal-img');
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalDesc = projectModal.querySelector('.modal-desc');
    const modalDemo = projectModal.querySelector('.modal-demo');
    const modalSource = projectModal.querySelector('.modal-source');
    const modalClose = projectModal.querySelector('.modal-close');

    document.querySelectorAll('.project-card').forEach(card => {
        const media = card.querySelector('.project-media img');
        if(!media) return;
        media.style.cursor = 'pointer';
        media.addEventListener('click', () => {
            const title = card.dataset.title || '';
            const desc = card.dataset.desc || '';
            const demo = card.dataset.demo || '#';
            const source = card.dataset.source || '#';
            const src = media.getAttribute('src');

            modalImg.src = src;
            modalImg.alt = title;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalDemo.href = demo;
            modalSource.href = source;

            projectModal.classList.add('in');
            projectModal.setAttribute('aria-hidden','false');
        });
    });

    const closeModal = () => {
        projectModal.classList.remove('in');
        projectModal.setAttribute('aria-hidden','true');
    };

    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if(e.target === projectModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && projectModal.classList.contains('in')) closeModal();
    });
}