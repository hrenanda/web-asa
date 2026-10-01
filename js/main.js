/* PAS ASA SEJAHTERA — interaksi halaman */
(function () {
  "use strict";

  /* ---------- Header: solid saat digulir ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    }
  });

  /* ---------- Hero slider ---------- */
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const dotsBox = document.getElementById("dots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i, true));
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  function render() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === current);
      d.setAttribute("aria-selected", String(i === current));
    });
  }

  function goTo(i, manual) {
    current = (i + slides.length) % slides.length;
    render();
    if (manual) restart();
  }

  function restart() {
    if (reduceMotion) return;
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6500);
  }

  document.getElementById("prevSlide").addEventListener("click", () => goTo(current - 1, true));
  document.getElementById("nextSlide").addEventListener("click", () => goTo(current + 1, true));

  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", restart);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else restart();
  });

  render();
  restart();

  /* ---------- Papan komoditas: gandakan isi agar loop mulus ---------- */
  const ticker = document.getElementById("tickerTrack");
  ticker.innerHTML += ticker.innerHTML;

  /* ---------- Reveal saat digulir ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Form kontak ---------- */
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    msg.hidden = false;
    form.reset();
    msg.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });

  /* ---------- Tahun footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
