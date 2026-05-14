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

const shaderCanvases = document.querySelectorAll("[data-shader]");

if (shaderCanvases.length > 0) {
  if (prefersReducedMotion) {
    shaderCanvases.forEach((canvas) => {
      canvas.style.display = "none";
    });
  } else {
    shaderCanvases.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      let width = 0;
      let height = 0;

      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };

      const render = (time) => {
        const t = time * 0.0002;
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "rgba(76, 201, 240, 0.28)");
        gradient.addColorStop(0.5, "rgba(123, 97, 255, 0.2)");
        gradient.addColorStop(1, "rgba(247, 37, 133, 0.22)");

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = "lighter";
        const pulseCount = 3;
        for (let i = 0; i < pulseCount; i += 1) {
          const offset = i * 0.6;
          const x = (0.2 + 0.6 * Math.sin(t + offset)) * width;
          const y = (0.3 + 0.5 * Math.cos(t * 0.8 + offset)) * height;
          const radius = Math.max(width, height) * (0.25 + 0.08 * Math.sin(t + offset));
          const glow = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
          glow.addColorStop(0, "rgba(255, 255, 255, 0.35)");
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.globalCompositeOperation = "source-over";

        window.requestAnimationFrame(render);
      };

      resize();
      render(0);
      window.addEventListener("resize", resize, { passive: true });
    });
  }
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
  let parallaxOffsets = [];

  const cacheOffsets = () => {
    parallaxOffsets = Array.from(parallaxTargets).map((section) => ({
      section,
      offset: section.offsetTop,
      speed: section.classList.contains("hero") ? PARALLAX_SPEED_HERO : PARALLAX_SPEED_PAGE,
    }));
  };

  const updateParallax = () => {
    parallaxOffsets.forEach(({ section, offset, speed }) => {
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

  const handleResize = () => {
    cacheOffsets();
    requestTick();
  };

  cacheOffsets();
  updateParallax();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
}

const scrollScenes = document.querySelectorAll("[data-scroll-scene]");

if (!prefersReducedMotion && scrollScenes.length > 0) {
  let sceneTicking = false;

  const updateScenes = () => {
    scrollScenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const progress = (window.innerHeight - rect.top) / total;
      const clamped = Math.min(Math.max(progress, 0), 1);
      scene.style.setProperty("--scroll-progress", clamped.toFixed(3));
      scene.style.setProperty("--scroll-progress-inverse", (1 - clamped).toFixed(3));
    });
    sceneTicking = false;
  };

  const requestSceneTick = () => {
    if (!sceneTicking) {
      window.requestAnimationFrame(updateScenes);
      sceneTicking = true;
    }
  };

  updateScenes();
  window.addEventListener("scroll", requestSceneTick, { passive: true });
  window.addEventListener("resize", requestSceneTick, { passive: true });
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
