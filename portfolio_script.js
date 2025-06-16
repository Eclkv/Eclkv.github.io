// Configuration GSAP et animations
gsap.registerPlugin(ScrollTrigger);

// Variables globales
let isLoaded = false;
let mouseX = 0;
let mouseY = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Fonction principale d'initialisation
function initializePortfolio() {
    createCursor();
    initSmoothScrolling();
    initParallaxEffects();
    initTextAnimations();
    initScrollAnimations();
    initContactForm();
    initNavigation();
    initMagneticEffects();
    initPageTransitions();
}

// Curseur personnalisé comme Vanholtz
function createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');

    // Styles du curseur
    const cursorStyles = `
        .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: #00ff88;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        .cursor-outline {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }
        .cursor-hover .cursor-outline {
            width: 50px;
            height: 50px;
            border-color: #00ff88;
        }
        @media (max-width: 768px) {
            .custom-cursor { display: none; }
        }
    `;

    const style = document.createElement('style');
    style.textContent = cursorStyles;
    document.head.appendChild(style);

    // Mouvement du curseur
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorOutline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Effets hover
    document.querySelectorAll('a, button, .sae-card, .project-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Scroll fluide
function initSmoothScrolling() {
    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Effets parallaxe
function initParallaxEffects() {
    // Parallaxe pour le hero
    gsap.to('.hero-content', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '#accueil',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Parallaxe pour les éléments de background
    const createFloatingElements = () => {
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'floating-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(0, 255, 136, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                pointer-events: none;
                z-index: 1;
            `;
            document.body.appendChild(dot);

            gsap.to(dot, {
                y: -100,
                x: Math.random() * 100 - 50,
                rotation: 360,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                ease: "none"
            });
        }
    };
    createFloatingElements();
}

// Animations de texte
function initTextAnimations() {
    // Animation du titre principal
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split('').map(char => 
            `<span class="char" style="display: inline-block;">${char}</span>`
        ).join('');

        gsap.from('.char', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    }

    // Animation des sous-titres
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power2.out"
    });

    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.out"
    });

    gsap.from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: "power2.out"
    });
}

// Animations au scroll
function initScrollAnimations() {
    // Animation des sections
    gsap.utils.toArray('section').forEach((section, i) => {
        if (section.id !== 'accueil') {
            gsap.from(section, {
                y: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });

    // Animation des cartes SAE
    gsap.utils.toArray('.sae-card').forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            rotation: 5,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animation des projets
    gsap.utils.toArray('.project-item').forEach((item, i) => {
        gsap.from(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Navigation intelligente
function initNavigation() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    // Masquer/afficher la navigation au scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            gsap.to(nav, { y: -100, duration: 0.3 });
        } else {
            gsap.to(nav, { y: 0, duration: 0.3 });
        }
        
        lastScrollY = currentScrollY;
    });

    // Indicateur de section active
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Effets magnétiques pour les boutons
function initMagneticEffects() {
    document.querySelectorAll('.cta-button, .submit-btn').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// Transitions de page
function initPageTransitions() {
    // Loader personnalisé
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-text">EC</div>
            <div class="loader-progress"></div>
        </div>
    `;

    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        }
        .loader-content {
            text-align: center;
        }
        .loader-text {
            font-size: 4rem;
            font-weight: 800;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
        }
        .loader-progress {
            width: 200px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            margin: 0 auto;
            overflow: hidden;
        }
        .loader-progress::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            transform: translateX(-100%);
            animation: loading 2s ease-in-out forwards;
        }
        @keyframes loading {
            to { transform: translateX(0); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    document.body.appendChild(loader);

    // Masquer le loader après chargement
    window.addEventListener('load', () => {
        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.remove();
                    // Démarrer les animations principales
                    initTextAnimations();
                }
            });
        }, 2000);
    });
}

// Formulaire de contact amélioré
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('.submit-btn');

    // Animation des champs au focus
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Validation en temps réel
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // Validation des champs
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
        }

        // Feedback visuel
        if (isValid) {
            gsap.to(field, {
                borderColor: '#00ff88',
                duration: 0.3
            });
        } else {
            gsap.to(field, {
                borderColor: '#ff4444',
                duration: 0.3
            });
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validation complète
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Animation d'erreur
            gsap.to(form, {
                x: -10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(form, { x: 0 });
                }
            });
            return;
        }

        // Animation de chargement
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Créer les paramètres pour mailto
        const subject = encodeURIComponent(form.querySelector('input[name="subject"]').value);
        const body = encodeURIComponent(form.querySelector('textarea[name="body"]').value);
        const mailtoLink = `mailto:enis.celikovic@example.com?subject=${subject}&body=${body}`;

        // Simulation d'envoi (remplacer par vraie logique d'envoi)
        setTimeout(() => {
            // Ouvrir le client email
            window.location.href = mailtoLink;
            
            // Message de succès
            showSuccessMessage();
            
            // Reset du formulaire
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Message envoyé avec succès !';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #00ff88;
            color: #0a0a0a;
            padding: 20px 40px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            opacity: 0;
        `;
        
        document.body.appendChild(message);
        
        gsap.timeline()
            .to(message, { opacity: 1, duration: 0.3 })
            .to(message, { opacity: 0, duration: 0.3, delay: 2 })
            .call(() => message.remove());
    }
}

// Optimisations de performance
function optimizePerformance() {
    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Throttle du scroll
    let ticking = false;
    function updateOnScroll() {
        // Logique de scroll optimisée
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Initialiser les optimisations
optimizePerformance();