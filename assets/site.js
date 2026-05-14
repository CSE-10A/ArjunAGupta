const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TILT_INTENSITY = 10;
const SCROLL_THRESHOLD = 12;
const PARALLAX_SPEED_HERO = 0.2;
const PARALLAX_SPEED_PAGE = 0.12;
const revealTargets = document.querySelectorAll(".reveal, .reveal-group");

if (revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const parallaxTargets = document.querySelectorAll(".hero, .page-hero");

if (!prefersReducedMotion && parallaxTargets.length > 0) {
  let ticking = false;

  const updateParallax = () => {
    parallaxTargets.forEach((section) => {
      const speed = section.classList.contains("hero") ? PARALLAX_SPEED_HERO : PARALLAX_SPEED_PAGE;
      const offset = section.offsetTop;
      const yPos = (window.scrollY - offset) * speed;
      section.style.setProperty("--parallax-offset", `${yPos}px`);
    });
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
}

const tiltTargets = document.querySelectorAll(".card, .hero-stats div, .callout");

if (!prefersReducedMotion && tiltTargets.length > 0) {
  tiltTargets.forEach((target) => {
    const handleMove = (event) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = -y * TILT_INTENSITY;
      const rotateY = x * TILT_INTENSITY;

      target.style.setProperty("--tilt-x", `${rotateX}deg`);
      target.style.setProperty("--tilt-y", `${rotateY}deg`);
    };

    const resetTilt = () => {
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    };

    target.addEventListener("mousemove", handleMove);
    target.addEventListener("mouseleave", resetTilt);
    target.addEventListener("focusout", resetTilt);
  });
}
