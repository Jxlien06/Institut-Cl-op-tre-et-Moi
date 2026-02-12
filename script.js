// Institut Cléopâtre et Moi — Premium JS (vanilla)

(function () {
  // Remove no-js flag
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Sticky navbar (throttled via rAF)
  let navTick = false;
  const handleNavScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };

  window.addEventListener("scroll", () => {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(() => {
      handleNavScroll();
      navTick = false;
    });
  });
  handleNavScroll();

  // Mobile menu helpers
  const lockBody = (locked) => {
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const openMenu = () => {
    navMenu.classList.add("active");
    navOverlay.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
    lockBody(true);
  };

  const closeMenu = () => {
    navMenu.classList.remove("active");
    navOverlay.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    lockBody(false);
  };

  const isMenuOpen = () => navMenu.classList.contains("active");

  if (burger) {
    burger.addEventListener("click", () => {
      if (isMenuOpen()) closeMenu();
      else openMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen()) closeMenu();
  });

  // Close on link click (and keep smooth UX)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen()) closeMenu();
    });
  });

  // Smooth scroll (keeps behavior consistent, avoids “jump”)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerOffset = navbar ? navbar.offsetHeight + 14 : 90;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Tabs (keep compatibility with your original openTab function)
  // We now prefer data-tab handling. If you still call openTab() inline, it will also work.
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const tabPanels = Array.from(document.querySelectorAll(".price-list"));

  const setActiveTab = (tabId, btn) => {
    tabPanels.forEach((p) => p.classList.toggle("active", p.id === tabId));
    tabButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    // Focus panel for accessibility
    const panel = document.getElementById(tabId);
    if (panel) panel.focus({ preventScroll: true });
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = btn.getAttribute("data-tab");
      if (!tabId) return;
      setActiveTab(tabId, btn);
    });
  });

  // Backward compatible function (if you kept inline onclick somewhere)
  window.openTab = function (evt, tabName) {
    const btn = evt?.currentTarget;
    if (!btn) return;
    setActiveTab(tabName, btn);
  };

  // Reveal animations (IntersectionObserver > perf)
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback
    const revealOnScroll = () => {
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < vh - 100) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }
})();
