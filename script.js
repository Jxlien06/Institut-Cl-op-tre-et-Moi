document.addEventListener("DOMContentLoaded", () => {
  
  // --- MENU BURGER FULLSCREEN ---
  const burger = document.getElementById("burger");
  const closeMenuBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openMenu() {
    mobileMenu.classList.add("active"); 
    document.body.style.overflow = "hidden"; // Empêche le scroll derrière
  }

  function closeMenu() {
    mobileMenu.classList.remove("active"); 
    document.body.style.overflow = "";
  }

  // Ouvrir avec le Burger
  if (burger) {
    burger.addEventListener("click", openMenu);
  }

  // Fermer avec la Croix (X)
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  // Fermer quand on clique sur un lien du menu
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  // --- NAVBAR SCROLL (FOND BLANC AU DEFILEMENT) ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  // --- GESTION DES ONGLETS (TARIFS) ---
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".price-list");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // 1. Désactiver tous les boutons
      tabBtns.forEach(b => b.classList.remove("active"));
      
      // 2. Cacher tous les contenus
      tabContents.forEach(c => {
        c.classList.remove("active");
        c.hidden = true;
      });

      // 3. Activer le bouton cliqué
      btn.classList.add("active");
      
      // 4. Afficher le contenu lié
      const targetId = btn.getAttribute("data-tab");
      const targetContent = document.getElementById(targetId);
      
      if (targetContent) {
        targetContent.hidden = false;
        setTimeout(() => {
            targetContent.classList.add("active");
        }, 10);
      }
    });
  });


  // --- ANIMATIONS AU SCROLL (REVEAL) ---
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        reveal.classList.add("active");
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); 


  // --- MISE À JOUR AUTOMATIQUE DE L'ANNÉE DANS LE FOOTER ---
  const yearEl = document.getElementById("year");
  if(yearEl) {
      yearEl.textContent = new Date().getFullYear();
  }
});
