/* welcome nya dulu */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 300);
});

/* efek blur manja di navbar nya */
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});

document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  });
});

/* =========================================================
   3. ACTIVE LINK — tandai menu sesuai section yang sedang dilihat
========================================================= */
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.menu-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      menuLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(sec => navObserver.observe(sec));

/* =========================================================
   4. SCROLL REVEAL — animasi muncul saat elemen masuk viewport
========================================================= */
const revealItems = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => revealObserver.observe(item));

/* =========================================================
   5. COUNTER — angka statistik naik otomatis saat terlihat
========================================================= */
const counters = document.querySelectorAll('[data-count]');

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1000;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + '+';
    }
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

/* =========================================================
   6. FORM KONTAK — validasi ringan + pesan sukses (tanpa backend)
========================================================= */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = contactForm.nama.value.trim();
  const email = contactForm.email.value.trim();
  const pesan = contactForm.pesan.value.trim();

  if (!nama || !email || !pesan) {
    formNote.textContent = 'Mohon lengkapi semua kolom terlebih dahulu.';
    formNote.style.color = '#F2A93B';
    return;
  }

  // Catatan: di sini belum terhubung ke server/email sungguhan.
  // Hubungkan endpoint kamu sendiri (mis. Formspree, EmailJS, atau API backend) di bagian ini.
  formNote.textContent = `Terima kasih, ${nama}! Pesanmu sudah tercatat. Saya akan segera membalas ke ${email}.`;
  formNote.style.color = '#2FBF8F';
  contactForm.reset();
});

/* =========================================================
   7. TOMBOL KEMBALI KE ATAS
========================================================= */
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   8. TAHUN OTOMATIS DI FOOTER
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();