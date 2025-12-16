document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');
  const bgElements = document.querySelectorAll('.fixed > div');

  // Mobile Menu Toggle
  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    } else {
      mobileMenu.classList.add('open');
      mobileMenu.style.height = `${mobileMenu.scrollHeight}px`;
    }
  });

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuButton.classList.remove('active');
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    highlightCurrentSection();
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 1; // Adjust for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Highlight the section briefly
        targetSection.classList.add('section-highlight');
        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 1000);
      }
    });
  });

  // Highlight active section in navbar
  function highlightCurrentSection() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Parallax effect for background elements
  /*
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      bgElements.forEach(element => {
        const speed = 20; // Adjust for more or less movement
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }
  */

  // Scroll animations for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
  });

  // Initialize active section on page load
  highlightCurrentSection();
  
  // Make header text visible with animation
  setTimeout(() => {
    const headerText = document.querySelector('.text-6xl');
    if (headerText) {
      headerText.style.opacity = 1;
      headerText.style.transform = 'translateY(0)';
    }
  }, 300);
});


// Form
document.addEventListener('DOMContentLoaded', function () {
            const aboutServiceSelect = document.getElementById('aboutService');
            const freelancerFields = document.getElementById('freelancerFields');
            const mandatoryFields = document.getElementById('mandatoryFields');
            const queryField = document.getElementById('queryField');
            const contactForm = document.getElementById('contactForm');
            const messageArea = document.getElementById('messageArea');

            // Function to toggle visibility of form sections
            const toggleSections = () => {
                const selectedService = aboutServiceSelect.value;

                if (selectedService === 'Freelancers') {
                    freelancerFields.classList.add('visible');
                    mandatoryFields.classList.add('visible');
                    queryField.classList.add('visible');
                    // Add required attributes for validation
                    document.getElementById('service').required = true;
                    document.getElementById('experience').required = true;
                } else if (selectedService === 'ERP Project') {
                    freelancerFields.classList.remove('visible');
                    mandatoryFields.classList.add('visible');
                    queryField.classList.add('visible');
                    // Remove required attributes
                    document.getElementById('service').required = false;
                    document.getElementById('experience').required = false;
                } else {
                    freelancerFields.classList.remove('visible');
                    mandatoryFields.classList.remove('visible');
                    queryField.classList.remove('visible');
                    document.getElementById('service').required = false;
                    document.getElementById('experience').required = false;
                }
            };

            aboutServiceSelect.addEventListener('change', toggleSections);

            contactForm.addEventListener('submit', function (event) {
                event.preventDefault();
                messageArea.classList.add('hidden');

                let isValid = true;
                // Reset custom validity messages
                this.querySelectorAll('[required]').forEach(input => {
                    input.setCustomValidity('');
                    input.classList.remove('border-red-500');
                });


                if (!this.checkValidity()) {
                    isValid = false;
                    // Find first invalid field and show message
                     this.querySelectorAll(':invalid').forEach((field, index) => {
                        if (index === 0) { // Only focus the first one
                             field.focus();
                        }
                        field.classList.add('border-red-500');
                        field.setCustomValidity('This field is required.');
                     });

                    showMessage('Please fill out all required fields marked with *', 'error');
                }

                if (isValid) {
                    console.log('Form submitted successfully!');
                    // Here you would typically send the data to a server
                    // For this example, we'll just show a success message
                    showMessage('Thank you for your submission! We will get back to you soon.', 'success');
                    contactForm.reset();
                    // Hide conditional fields after reset
                    toggleSections();
                }
            });

            function showMessage(message, type) {
                messageArea.textContent = message;
                messageArea.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
                if (type === 'success') {
                    messageArea.classList.add('bg-green-100', 'text-green-800');
                } else {
                    messageArea.classList.add('bg-red-100', 'text-red-800');
                }
            }
        });
