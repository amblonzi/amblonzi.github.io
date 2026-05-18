/**
* MODERN MINIMALIST WEB APPLICATION INTERACTION ENGINE
* Portfolio: Amblonzi Evans - IT Consultant & Specialist
* Logic: Clean vanilla JS, Intersection Observers, Custom typist, Mouse tracking glow, and premium EmailJS feedback
*/

(function() {
  "use strict";

  /**
   * Helper utility for selecting elements
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Helper utility for adding event listeners
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * 1. Header scroll visual transition
   */
  const header = select('#header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('load', handleHeaderScroll);
    document.addEventListener('scroll', handleHeaderScroll);
  }

  /**
   * 2. Mobile nav toggle menu drawer
   */
  const mobileToggleBtn = select('.mobile-nav-toggle');
  const navbarMenu = select('#navbar');
  
  if (mobileToggleBtn && navbarMenu) {
    on('click', '.mobile-nav-toggle', function(e) {
      navbarMenu.classList.toggle('navbar-mobile');
      navbarMenu.classList.toggle('active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Close mobile nav when clicking a nav link
  on('click', '#navbar .nav-link', function(e) {
    if (navbarMenu.classList.contains('navbar-mobile')) {
      navbarMenu.classList.remove('navbar-mobile');
      navbarMenu.classList.remove('active');
      if (mobileToggleBtn) {
        mobileToggleBtn.classList.add('bi-list');
        mobileToggleBtn.classList.remove('bi-x');
      }
    }
  }, true);

  /**
   * 3. Typing text effect for the Hero Subtitle
   */
  const typedTextSpan = select(".typed-text");
  const textArray = [
    "IT Consultant",
    "ICT Systems Specialist", 
    "Cybersecurity Solutions Specialist",
    "Cloud Architect"
  ];
  const typingSpeed = 80;
  const erasingSpeed = 40;
  const newTextDelay = 2000; // Delay between full words
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (typedTextSpan) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (typedTextSpan) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      }
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Initializing the typing sequence
  window.addEventListener('DOMContentLoaded', () => {
    if (typedTextSpan) {
      setTimeout(type, 1000);
    }
  });

  /**
   * 4. Modern Intersection Observers
   */
  // A. Scroll Reveal Entry Animations
  const revealElements = select('.reveal', true);
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once element is shown, stop observing it for smooth permanent load
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // B. Animated Skills Meter Progression Fill
  const skillBars = select('.skill-bar-fill', true);
  const skillsContainer = select('.skills');
  if (skillsContainer && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const val = bar.getAttribute('aria-valuenow');
            bar.style.width = val + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    skillsObserver.observe(skillsContainer);
  }

  /**
   * 5. Smooth Scroll active link spy (ScrollSpy)
   */
  const navLinks = select('#navbar .nav-link', true);
  const sections = select('section', true);
  const heroSection = select('#hero');

  const scrollSpy = () => {
    let scrollPos = window.scrollY + 150; // offset

    // Handle home/hero case
    if (heroSection && scrollPos < heroSection.offsetHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#hero') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

    sections.forEach(section => {
      const id = section.getAttribute('id');
      const offset = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= offset && scrollPos < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('load', scrollSpy);
  document.addEventListener('scroll', scrollSpy);

  /**
   * 6. Dynamic light position glow tracking for service cards
   */
  const serviceCards = select('.service-card', true);
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /**
   * 7. Back to Top Button Scrolling Behavior
   */
  const backToTopBtn = select('.back-to-top');
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBackToTop);
    document.addEventListener('scroll', toggleBackToTop);

    on('click', '.back-to-top', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * 8. Premium Contact Form with EmailJS integration & Interactive States
   */
  const contactForm = select('#contact-form');
  const submitBtn = select('.btn-submit');
  const submitText = select('.btn-submit .btn-text');
  const submitIcon = select('.btn-submit i');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Enter Sending Loading State
      submitBtn.className = "btn-submit loading";
      if (submitText) submitText.textContent = "Sending Message...";
      if (submitIcon) {
        submitIcon.className = "bi bi-arrow-repeat";
      }

      // Trigger EmailJS Email Dispatch using exact credentials from previous version
      emailjs.sendForm('service_bgpt4be', 'template_csn91pm', this)
        .then(function() {
          // Success State
          submitBtn.className = "btn-submit success";
          if (submitText) submitText.textContent = "Message Sent Successfully!";
          if (submitIcon) submitIcon.className = "bi bi-check-circle-fill";
          
          contactForm.reset();

          // Reset back to base form state after 5 seconds
          setTimeout(() => {
            submitBtn.className = "btn-submit";
            if (submitText) submitText.textContent = "Send Message";
            if (submitIcon) submitIcon.className = "bi bi-send-fill";
          }, 5000);

        }, function(error) {
          // Error State
          submitBtn.className = "btn-submit error";
          if (submitText) submitText.textContent = "Failed to Send Message";
          if (submitIcon) submitIcon.className = "bi bi-exclamation-triangle-fill";
          
          console.error('EmailJS Error: ', error);

          // Reset back to base form state after 5 seconds
          setTimeout(() => {
            submitBtn.className = "btn-submit";
            if (submitText) submitText.textContent = "Send Message";
            if (submitIcon) submitIcon.className = "bi bi-send-fill";
          }, 5000);
        });
    });
  }

  /**
   * 9. PureCounter Numbers Animation trigger on load
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter({
      selector: '.purecounter',
      delay: 10,
      time: 1200,
      once: true,
      repeat: false
    });
  }

})();