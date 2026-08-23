/* ==========================================================================
   AYESHA FAROOQ - PORTFOLIO JAVASCRIPT
   Clean, Lightweight & Interactive Vanilla JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. DOM Elements
    // ----------------------------------------------------------------------
    const header = document.getElementById('header');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const sections = document.querySelectorAll('section[id]');

    // ----------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('open');
        });

        // Close mobile menu when clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Header Shadow & Scroll To Top Visibility on Scroll
    // ----------------------------------------------------------------------
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add shadow to header when scrolled down
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/Hide Scroll to Top button
        if (scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // ------------------------------------------------------------------
        // 4. ScrollSpy: Highlight Active Nav Link
        // ------------------------------------------------------------------
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 5. Smooth Scroll to Top
    // ----------------------------------------------------------------------
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------------------------
    // 6. Interactive Contact Form Submission Handler
    // ----------------------------------------------------------------------
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields before sending.';
                return;
            }

            // Simulate form dispatching
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = `Thank you, ${name}! Your message has been received.`;
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 800);
        });
    }
});
