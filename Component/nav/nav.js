// navbar.js

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const searchInput = document.querySelector(".search-input");
  const mobileSearchInput = document.querySelector(".mobile-search-input");
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");

  let lastScroll = 0;
  let isMenuOpen = false;

  // Scroll behavior
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (!mobileMenu.classList.contains("active")) {
      navbar.style.transform =
        currentScroll > lastScroll && currentScroll > 500
          ? "translateY(-100%)"
          : "translateY(0)";
    }

    lastScroll = currentScroll;
  };

  const throttledScrollHandler = (() => {
    let scrollTimeout;
    return () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    };
  })();

  window.addEventListener("scroll", throttledScrollHandler);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle("active", isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  };

  mobileMenuBtn?.addEventListener("click", toggleMobileMenu);

  // Close mobile menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && isMenuOpen) {
      mobileMenu.classList.remove("active");
      isMenuOpen = false;
      document.body.style.overflow = "";
    }
  });

  // Handle dropdowns
  const setupDropdowns = (dropdowns, isMobile = false) => {
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(
        isMobile ? ".mobile-link" : ".dropdown-toggle"
      );
      const content = dropdown.querySelector(
        isMobile ? ".mobile-dropdown-content" : ".dropdown-content"
      );

      if (!link || !content) return;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = content.classList.contains("active");
        content.style.height = isOpen ? "0" : `${content.scrollHeight}px`;
        content.classList.toggle("active", !isOpen);
        link.classList.toggle("active", !isOpen);
      });
    });
  };

  setupDropdowns(dropdowns);
  setupDropdowns(mobileDropdowns, true);

  // Search animations
  const handleSearchFocus = (input, isDesktop = false) => {
    input.addEventListener("focus", () => {
      if (isDesktop) input.style.width = "300px";
      input.parentElement?.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (isDesktop && input.value === "") input.style.width = "240px";
      input.parentElement?.classList.remove("focused");
    });
  };

  searchInput && handleSearchFocus(searchInput, true);
  mobileSearchInput && handleSearchFocus(mobileSearchInput);

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        const content = dropdown.querySelector(".dropdown-content");
        if (content) {
          content.style.height = "0";
          content.classList.remove("active");
        }
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        if (isMenuOpen) toggleMobileMenu();
      }
    });
  });

  // Observe hero section for navbar background
  const hero = document.querySelector(".hero");
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        navbar.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);
  }

  // Add hover animations for nav links
  document
    .querySelectorAll(".nav-link:not(.dropdown-toggle)")
    .forEach((link) => {
      link.addEventListener(
        "mouseenter",
        () => (link.style.transform = "translateY(-2px)")
      );
      link.addEventListener(
        "mouseleave",
        () => (link.style.transform = "translateY(0)")
      );
    });
});
// script.js
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  let isMenuOpen = false;

  // Scroll behavior
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  };

  hamburger?.addEventListener("click", toggleMenu);

  // Handle resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && isMenuOpen) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    }
  });
});
