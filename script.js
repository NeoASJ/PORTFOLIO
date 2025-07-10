document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    updateActiveClass(targetId.substring(1));
                }
            }
        });
    });

    // --- Update active class on navigation links ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const updateActiveClass = (currentId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentId) {
                link.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let activeSectionId = '';
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSectionId = entry.target.id;
            }
        });
        updateActiveClass(activeSectionId);
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    

    

    // --- Skill Bar Animations ---
    const skillBars = document.querySelectorAll('.skill-bar span');
    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBarSpan = entry.target;
                const level = skillBarSpan.parentElement.dataset.level;
                skillBarSpan.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-buttons .button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            formMessages.classList.remove('hidden', 'text-red-600', 'text-green-600');
            formMessages.classList.add('text-gray-700');
            formMessages.textContent = 'Sending message...';
            formMessages.style.display = 'block';

            setTimeout(() => {
                const isSuccess = Math.random() > 0.5;
                if (isSuccess) {
                    formMessages.classList.remove('text-gray-700');
                    formMessages.classList.add('text-green-600');
                    formMessages.textContent = 'Message sent successfully! I will get back to you soon.';
                    contactForm.reset();
                } else {
                    formMessages.classList.remove('text-gray-700');
                    formMessages.classList.add('text-red-600');
                    formMessages.textContent = 'Failed to send message. Please try again later.';
                }
            }, 1500);
        });
    }

    // --- Scroll to Top Button ---
    const scrollToTopButton = document.getElementById('scroll-to-top');

    function toggleScrollToTopVisibility() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('hidden');
        } else {
            scrollToTopButton.classList.add('hidden');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);
    }
    window.addEventListener('scroll', toggleScrollToTopVisibility);

    // --- Update current year in footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    
    
});
 document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillItems = document.querySelectorAll('#skills-grid .skill-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('bg-neon-green', 'text-white', 'hover:bg-gray-800', 'bg-gray-200', 'text-gray-700'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300'));

                // Add active class to clicked button
                button.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
                button.classList.add('bg-neon-green', 'text-white', 'hover:bg-gray-800');

                skillItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'flex'; // Show item
                    } else {
                        item.style.display = 'none'; // Hide item
                    }
                });
            });
        });

        // Initialize with 'all' filter active
        document.querySelector('.filter-btn[data-filter="all"]').click();
    });
    
    

  
