/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close'); // Updated to match the HTML

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
   });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
   });
}



/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu');
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu');
};

navLink.forEach(n => n.addEventListener('click', linkAction));


/*=============== SHADOW HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/
const shadowHeader = () => {
   const header = document.getElementById('header');
   // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
   window.scrollY >= 50
      ? header.classList.add('shadow-header')
      : header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);


/*=============== EMAIL JS ===============*/
// ===== EMAIL JS =====
const contactForm = document.getElementById('contact-form'),
   contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
   e.preventDefault();

   // serviceID - templateID - #form - publicKey
   emailjs.sendForm('service_5bna3x4','template_peiw0xf','#contact-form','7hMv-kLCFkpntLIb4')
      .then(() => {
         // Success message
         contactMessage.textContent = 'Message sent successfully ✅'
         contactMessage.style.color = '#51cf66';

         setTimeout(() => {
            contactMessage.textContent = ''
         }, 5000)

         contactForm.reset()

      }, () => {
         //show error message
         contactMessage.textContent = 'Message not sent (service error) ❌'
         contactMessage.style.color = '#ff6b6b';
      })
}

if (contactForm) contactForm.addEventListener('submit', sendEmail);



/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up');
   // When the scroll is higher than 350 viewport height, add the show-scroll class to the <a> tag with the scroll-up class
   window.scrollY >= 350
      ? scrollUp.classList.add('show-scroll')
      : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
   const scrollDown = window.scrollY

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
         sectionTop = current.offsetTop - 58,
         sectionId = current.getAttribute('id'),
         sectionsClass = document.querySelector(`.nav__menu a[href*="${sectionId}"]`)

      if (!sectionsClass) return
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
         sectionsClass.classList.add('active-link')
      } else {
         sectionsClass.classList.remove('active-link')
      }
   })
}



window.addEventListener('scroll', scrollActive);

/*============== DARK LIGHT THEME ==============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
   document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
   themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
   // Add or remove the dark / icon theme
   document.body.classList.toggle(darkTheme)
   themeButton.classList.toggle(iconTheme)

   // We save the theme and the current icon that the user chose
   localStorage.setItem('selected-theme', getCurrentTheme())
   localStorage.setItem('selected-icon', getCurrentIcon())
})


/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = window.ScrollReveal ? ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 400,
   // reset: true // Animations repeat
}) : { reveal() {} };

sr.reveal(`.home__perfil, .about__image, .contact__mail`, { origin: 'right' });
sr.reveal(`.home__name, .home__info, 
           .about__container .section__title-1, .about__info, 
           .contact__social, .contact__data`, { origin: 'left' });
sr.reveal(`.services__card, .projects__card`, { interval: 100 });




/*=============== NEW: BOOT LOADER ===============*/
(() => {
   const boot = document.getElementById('boot'), line = document.getElementById('boot-line'), fill = document.getElementById('boot-fill')
   if (!boot) return
   const steps = ['loading neurons...', 'calibrating curiosity...', 'compiling genius...', 'ready.']
   let i = 0
   const tick = () => {
      line.textContent = '> ' + steps[i]
      fill.style.width = ((i + 1) / steps.length * 100) + '%'
      i++
      i < steps.length ? setTimeout(tick, 450) : setTimeout(() => boot.classList.add('done'), 400)
   }
   tick()
})()

/*=============== SCROLL PROGRESS ===============*/
const progress = document.getElementById('progress')
window.addEventListener('scroll', () => {
   const max = document.documentElement.scrollHeight - innerHeight
   if (progress && max > 0) progress.style.width = (scrollY / max * 100) + '%'
})

/*=============== TYPING ROLES ===============*/
;(() => {
   const el = document.getElementById('typed')
   if (!el) return
   const words = ['training neural networks', 'exploring data', 'building with Python', 'chasing the next big idea']
   let w = 0, c = 0, del = false
   const loop = () => {
      const word = words[w]
      el.textContent = word.slice(0, c)
      if (!del && c === word.length) { del = true; return setTimeout(loop, 1400) }
      if (del && c === 0) { del = false; w = (w + 1) % words.length }
      c += del ? -1 : 1
      setTimeout(loop, del ? 35 : 70)
   }
   setTimeout(loop, 2200)
})()

/*=============== NEURAL NETWORK CANVAS ===============*/
;(() => {
   const cv = document.getElementById('net')
   if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return
   const ctx = cv.getContext('2d'), mouse = { x: -999, y: -999 }
   let W, H, pts = []
   const size = () => {
      W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight
      pts = Array.from({ length: Math.min(80, Math.floor(W * H / 14000)) }, () => ({
         x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5 }))
   }
   size(); addEventListener('resize', size)
   const home = cv.parentElement
   home.addEventListener('mousemove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top })
   home.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999 })
   home.addEventListener('click', e => { const r = cv.getBoundingClientRect()
      for (let k = 0; k < 6; k++) pts.push({ x: e.clientX - r.left, y: e.clientY - r.top, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3 })
      if (pts.length > 140) pts.splice(0, 6) })
   const col = () => getComputedStyle(document.body).getPropertyValue('--first-color').trim() || 'orange'
   const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const color = col()
      ctx.fillStyle = color; ctx.strokeStyle = color
      pts.forEach((p, i) => {
         p.x += p.vx; p.y += p.vy
         p.vx *= .995; p.vy *= .995
         if (Math.abs(p.vx) < .15) p.vx += (Math.random() - .5) * .05
         if (p.x < 0 || p.x > W) p.vx *= -1
         if (p.y < 0 || p.y > H) p.vy *= -1
         const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy)
         if (d < 120) { p.x += dx / d * 1.5; p.y += dy / d * 1.5 }
         ctx.globalAlpha = .6; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 6.28); ctx.fill()
         for (let k = i + 1; k < pts.length; k++) {
            const q = pts[k], dist = Math.hypot(p.x - q.x, p.y - q.y)
            if (dist < 110) { ctx.globalAlpha = (1 - dist / 110) * .35; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke() }
         }
      })
      requestAnimationFrame(draw)
   }
   draw()
})()

/*=============== CURSOR GLOW ===============*/
;(() => {
   const cur = document.getElementById('cursor')
   if (!cur || !matchMedia('(hover: hover)').matches) return
   addEventListener('mousemove', e => { cur.classList.add('on'); cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)` })
})()

/*=============== COUNTERS ===============*/
;(() => {
   const nums = document.querySelectorAll('[data-count]')
   if (!nums.length) return
   const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return
      const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now()
      const step = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step) }
      requestAnimationFrame(step); io.unobserve(el)
   }), { threshold: .6 })
   nums.forEach(n => io.observe(n))
})()

/*=============== 3D TILT + MAGNETIC BUTTONS ===============*/
if (matchMedia('(hover: hover)').matches) {
   document.querySelectorAll('.projects__card, .services__card, .home__image, .about__image').forEach(el => {
      el.classList.add('tilt')
      el.addEventListener('mousemove', e => {
         const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
         el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
      })
      el.addEventListener('mouseleave', () => { el.style.transform = '' })
   })
   document.querySelectorAll('.button').forEach(b => {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)` })
      b.addEventListener('mouseleave', () => { b.style.transform = '' })
   })
}

/*=============== LOGO EASTER EGG: CLICK TO SHIFT ACCENT COLOR ===============*/
;(() => {
   const logo = document.getElementById('logo-circle'); let hue = 14
   if (logo) logo.addEventListener('click', e => { e.preventDefault(); hue = (hue + 70) % 360
      document.documentElement.style.setProperty('--first-color', `hsl(${hue},90%,50%)`)
      document.body.style.setProperty('--first-color', `hsl(${hue},90%,50%)`) })
})()


/*=============== PROJECT CASE-STUDY MODAL ===============*/
// Edit the text below to change what each popup shows.
;(() => {
   const CASES = {
      smartscan: {
         tag: 'AI / Computer Vision · Smart India Hackathon 2025',
         title: 'SmartScan Attend',
         problem: 'Manual roll calls waste lecture time and are easy to fake: students mark attendance for absent friends (proxy attendance), and teachers get no useful picture of who is actually showing up.',
         approach: 'Use face recognition so a student has to be physically present to be marked. Attendance is recorded automatically, and teachers get a portal with analytics instead of paper registers.',
         stack: ['Face recognition', 'Web app', 'Teacher portal', 'Netlify'],
         result: 'Our team made it into the top 75 at Smart India Hackathon 2025.',
         team: 'I was the team leader. I am proud of this team: we planned, built and presented the project together, and every one of them made it possible.',
         photos: [
            ['./assets/img/sih-team.jpg', 'Our SIH team with our mentor', 'My great team'],
            ['./assets/img/sih-team-certificates.jpg', 'Team members and our mentor holding SIH participation certificates', 'Certificate day'],
            ['./assets/img/sih-certificates.jpg', 'Me and our mentor with our SIH certificates of participation', 'Proud moment']
         ],
         links: [['Live demo', 'https://smartscanbyvn.netlify.app', 'ri-external-link-line'], ['GitHub', 'https://github.com/vineshniburani', 'ri-github-line']]
      },
      pscanner: {
         tag: 'Browser Extension · JavaScript',
         title: 'PScanner',
         problem: 'Study material on the university e-learning portal opens in an embedded viewer with no download button, so students cannot keep PDFs for offline revision.',
         approach: 'A Chrome extension that watches the files the browser already receives on the portal and lists the PDFs it detects. You can download one file or everything at once. It never bypasses logins or protection.',
         stack: ['Chrome extension', 'JavaScript', 'HTML & CSS'],
         result: 'A tool I built for myself and my classmates, and use every week.',
         links: [['GitHub', 'https://github.com/vineshniburani/pscanner-site', 'ri-github-line']]
      },
      amazon: {
         tag: 'Web / Frontend',
         title: 'Amazon Clone Website',
         problem: 'I wanted to practise building a real, content-heavy page layout instead of small tutorial demos.',
         approach: 'Rebuilt the Amazon storefront as a responsive site, focusing on clean layout, spacing and UI/UX.',
         stack: ['HTML', 'CSS', 'JavaScript'],
         result: 'A solid frontend base that I can plug future AI features into.',
         links: [['GitHub', 'https://github.com/vineshniburani/amazonclone', 'ri-github-line']]
      },
      portfolio: {
         tag: 'Web / Where it began',
         title: 'First Basic Portfolio',
         problem: 'I needed a place online to show who I am, and I was just starting to learn web development.',
         approach: 'Built it with plain HTML and CSS, no frameworks, learning layout and styling step by step.',
         stack: ['HTML', 'CSS'],
         result: 'The first commit that started everything, and the base this site grew from.',
         links: [['GitHub', 'https://github.com/vineshniburani', 'ri-github-line']]
      }
   }

   const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

   const modal = document.createElement('div')
   modal.className = 'case'
   modal.id = 'case'
   modal.setAttribute('role', 'dialog')
   modal.setAttribute('aria-modal', 'true')
   modal.setAttribute('aria-labelledby', 'case-title')
   modal.innerHTML = '<div class="case__box"><button class="case__close" id="case-close" aria-label="Close"><i class="ri-close-line"></i></button><div id="case-body"></div></div>'
   document.body.appendChild(modal)
   const body = modal.querySelector('#case-body'), closeBtn = modal.querySelector('#case-close')
   let lastFocus = null

   const open = id => {
      const c = CASES[id]; if (!c) return
      lastFocus = document.activeElement
      body.innerHTML =
         `<span class="case__tag">${esc(c.tag)}</span>` +
         `<h2 class="case__title" id="case-title">${esc(c.title)}</h2>` +
         `<h4>Problem</h4><p>${esc(c.problem)}</p>` +
         `<h4>Approach</h4><p>${esc(c.approach)}</p>` +
         `<h4>Tech stack</h4><div class="chips">${c.stack.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>` +
         `<h4>Result</h4><p>${esc(c.result)}</p>` +
         (c.team ? `<h4>My role &amp; team</h4><p>${esc(c.team)}</p>` : '') +
         (c.photos ? `<div class="case__gallery">${c.photos.map((p, i) => `<figure class="polaroid ${['polaroid--tilt-l', 'polaroid--tilt-r', 'polaroid--tilt-l2'][i % 3]}"><img src="${esc(p[0])}" alt="${esc(p[1])}" loading="lazy"><figcaption>${esc(p[2] || '')}</figcaption></figure>`).join('')}</div>` : '') +
         `<div class="case__links">${c.links.map(l => `<a href="${esc(l[1])}" target="_blank" rel="noopener" class="button"><i class="${esc(l[2])}"></i>${esc(l[0])}</a>`).join('')}</div>`
      modal.classList.add('open')
      document.body.style.overflow = 'hidden'
      closeBtn.focus()
   }
   const close = () => {
      modal.classList.remove('open')
      document.body.style.overflow = ''
      if (lastFocus) lastFocus.focus()
   }

   document.querySelectorAll('.projects__card[data-project]').forEach(card => {
      const holder = card.querySelector('.projects__buttons'); if (!holder) return
      const b = document.createElement('button')
      b.type = 'button'; b.className = 'projects__link projects__case'
      b.innerHTML = '<i class="ri-article-line"></i>Case study'
      b.addEventListener('click', () => open(card.dataset.project))
      holder.appendChild(b)
   })

   document.querySelectorAll('[data-open-case]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); open(el.dataset.openCase) })
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.dataset.openCase) } })
   })

   closeBtn.addEventListener('click', close)
   modal.addEventListener('click', e => { if (e.target === modal) close() })
   addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close() })
})()
