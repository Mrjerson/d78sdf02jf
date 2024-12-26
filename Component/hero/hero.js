// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const ebookPreview = document.querySelector(".ebook-preview");
  const ebooks = document.querySelectorAll(".ebook");
  const mainEbook = document.querySelector(".main-ebook");
  const secondaryEbook1 = document.querySelector(".secondary-ebook-1");
  const secondaryEbook2 = document.querySelector(".secondary-ebook-2");
  const ctaButton = document.querySelector(".cta-button");
  const floatElements = document.querySelectorAll(".float-element");
  const shapes = document.querySelectorAll(".shape");

  // Parallax effect for ebooks
  document.addEventListener("mousemove", (e) => {
    const xPos = (window.innerWidth / 2 - e.clientX) / 25;
    const yPos = (window.innerHeight / 2 - e.clientY) / 25;

    // Main ebook movement
    mainEbook.style.transform = `translate(-50%, -50%) 
          rotateY(${xPos}deg) 
          rotateX(${-yPos}deg)`;

    // Secondary ebooks movement
    secondaryEbook1.style.transform = `translate(-50%, -50%) 
          rotate(-15deg) 
          rotateY(${xPos * 0.5}deg) 
          rotateX(${-yPos * 0.5}deg)`;

    secondaryEbook2.style.transform = `translate(-50%, -50%) 
          rotate(15deg) 
          rotateY(${xPos * 0.5}deg) 
          rotateX(${-yPos * 0.5}deg)`;

    // Animate floating elements
    floatElements.forEach((element) => {
      element.style.transform = `translate(
              ${xPos * 0.5}px, 
              ${yPos * 0.5}px
          )`;
    });

    // Animate background shapes
    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 0.2;
      shape.style.transform = `translate(
              ${xPos * factor}px, 
              ${yPos * factor}px
          )`;
    });
  });

  // Reset transforms when mouse leaves the container
  document.addEventListener("mouseleave", () => {
    mainEbook.style.transform = "translate(-50%, -50%)";
    secondaryEbook1.style.transform = "translate(-50%, -50%) rotate(-15deg)";
    secondaryEbook2.style.transform = "translate(-50%, -50%) rotate(15deg)";

    floatElements.forEach((element) => {
      element.style.transform = "translate(0, 0)";
    });

    shapes.forEach((shape) => {
      shape.style.transform = "translate(0, 0)";
    });
  });

  // CTA Button hover effects
  ctaButton.addEventListener("mouseenter", () => {
    ctaButton.style.transform = "translateY(-2px)";
    ebooks.forEach((ebook) => {
      ebook.style.transform = `${ebook.style.transform} scale(1.02)`;
    });
  });

  ctaButton.addEventListener("mouseleave", () => {
    ctaButton.style.transform = "translateY(0)";
    ebooks.forEach((ebook) => {
      ebook.style.transform = ebook.style.transform.replace(" scale(1.02)", "");
    });
  });

  // Add hover effect to ebooks
  ebooks.forEach((ebook) => {
    ebook.addEventListener("mouseenter", () => {
      ebook.style.transform = `${ebook.style.transform} scale(1.05)`;
      ebook.style.zIndex = "10";
    });

    ebook.addEventListener("mouseleave", () => {
      ebook.style.transform = ebook.style.transform.replace(" scale(1.05)", "");
      ebook.style.zIndex = "";
    });
  });

  // Smooth scroll for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add intersection observer for animation triggers
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe elements with animations
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Initialize floating animation for elements
  const startFloatingAnimation = () => {
    floatElements.forEach((element, index) => {
      element.style.animation = `float ${3 + index * 0.5}s infinite`;
    });
  };

  startFloatingAnimation();
});
