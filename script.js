/**
 * Angel Ruiz — Portfolio Scripts
 * Enhanced with:
 * - Theme toggle (dark/light) with localStorage persistence
 * - Typing effect for hero tagline
 * - Custom cursor (desktop only)
 * - 3D tilt effect on project cards
 * - Animated timeline reveal
 * - Contact form with mailto fallback
 * - Mobile bottom navigation
 * - Magnetic button hover effect
 * - Scroll progress bar
 * - Navbar hide/show on scroll
 * - Active nav link highlighting
 * - Smooth scroll with offset
 * - Scroll reveal animations (IntersectionObserver)
 * - Counter animation for hero stats
 * - Mobile nav toggle with auto-close
 * - Back-to-top button
 * - Toast notifications
 * - Omni project search & filter
 */

(function () {
    'use strict';

    // ==================== DOM READY ====================
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initNavbar();
        initMobileNav();
        initSmoothScroll();
        initScrollReveal();
        initCounterAnimation();
        initBackToTop();
        initScrollProgress();
        initResumePdfFallback();
        initTypingEffect();
        initCustomCursor();
        init3DTilt();
        initSkillBars();
        initContactForm();
        initBottomNav();
        initMagneticButtons();
        initThreeHero();
        initOmniSearch();
    });

    // ==================== THEME TOGGLE ====================
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const icon = document.getElementById('themeIcon');
        const body = document.body;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            body.setAttribute('data-theme', 'light');
        }

        updateIcon();

        toggle.addEventListener('click', () => {
            const current = body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon();
            window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
        });

        function updateIcon() {
            const theme = body.getAttribute('data-theme');
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // ==================== TYPING EFFECT ====================
    function initTypingEffect() {
        const textEl = document.getElementById('typingText');
        if (!textEl) return;

        const phrases = [
            'Systems & Computing Engineering Student',
            'Software & AI Engineer',
            'Full-Stack Developer',
            'AI Integrations & LLM Applications',
            'Workflow Automation & Data Pipelines'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                textEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                textEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        // Start after a short delay
        setTimeout(type, 800);
    }

    // ==================== CUSTOM CURSOR ====================
    function initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursorFollower');

        if (!cursor || !follower) return;

        // Only on non-touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        document.body.classList.add('has-custom-cursor');

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';

            if (!cursor.classList.contains('visible')) {
                cursor.classList.add('visible');
                follower.classList.add('visible');
            }
        });

        // Smooth follower
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-chip, .cert-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('visible');
            follower.classList.remove('visible');
        });

        document.addEventListener('mouseenter', () => {
            cursor.classList.add('visible');
            follower.classList.add('visible');
        });
    }

    // ==================== 3D TILT ON PROJECT CARDS ====================
    function init3DTilt() {
        const cards = document.querySelectorAll('[data-tilt]');

        cards.forEach(card => {
            const glowEl = card.querySelector('.project-card__glow');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

                // Update glow position
                if (glowEl) {
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    card.style.setProperty('--mouse-x', percentX + '%');
                    card.style.setProperty('--mouse-y', percentY + '%');
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ==================== SKILL BAR ANIMATIONS ====================
    function initSkillBars() {
        const skillItems = document.querySelectorAll('.skill-bar-item');

        if (!skillItems.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        const level = item.getAttribute('data-level');
                        const fill = item.querySelector('.skill-bar__fill');
                        if (fill && level) {
                            setTimeout(() => {
                                fill.style.width = level + '%';
                                fill.classList.add('animated');
                            }, 200);
                        }
                        observer.unobserve(item);
                    }
                });
            },
            { threshold: 0.3 }
        );

        skillItems.forEach(item => observer.observe(item));
    }

    // ==================== CONTACT FORM ====================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = form.querySelector('#formName');
            const emailInput = form.querySelector('#formEmail');
            const messageInput = form.querySelector('#formMessage');
            const subjectInput = form.querySelector('#formSubject');
            const submitBtn = form.querySelector('#formSubmit');

            // Clear previous errors
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            // Validation
            let hasError = false;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                hasError = true;
            }

            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                hasError = true;
            }

            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                hasError = true;
            }

            if (hasError) {
                showToast('Please fill in all required fields correctly.', 3000, 'error');
                return;
            }

            // Build mailto link as fallback
            const subject = subjectInput && subjectInput.value.trim()
                ? subjectInput.value.trim()
                : `Portfolio Contact from ${nameInput.value.trim()}`;
            const body = `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`;
            const mailtoLink = `mailto:angeldavidruiz2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Attempt to send via Formspree (if configured)
            const formspreeEndpoint = form.getAttribute('action');

            if (formspreeEndpoint && !formspreeEndpoint.includes('placeholder')) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                try {
                    const response = await fetch(formspreeEndpoint, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        showToast('Message sent successfully! I\'ll get back to you soon.', 4000, 'success');
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (err) {
                    showToast('Opening your email client...', 3000);
                    window.location.href = mailtoLink;
                }

                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            } else {
                showToast('Opening your email client...', 2000);
                window.location.href = mailtoLink;
            }
        });

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }

    // ==================== MOBILE BOTTOM NAV ====================
    function initBottomNav() {
        const bottomNav = document.getElementById('bottomNav');
        if (!bottomNav) return;

        const navItems = bottomNav.querySelectorAll('.bottom-nav__item');
        const sections = [];

        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) sections.push({ item, section, id: sectionId });
            }
        });

        function updateActiveBottomNav() {
            const scrollY = window.scrollY + window.innerHeight / 2;

            let activeId = 'hero';

            sections.forEach(({ section, id }) => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollY >= top && scrollY < top + height) {
                    activeId = id;
                }
            });

            navItems.forEach(item => {
                const itemSection = item.getAttribute('data-section');
                if (itemSection === activeId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveBottomNav, { passive: true });
        updateActiveBottomNav();

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // ==================== MAGNETIC BUTTONS ====================
    function initMagneticButtons() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==================== NAVBAR ====================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > 50) {
                        navbar.classList.add('nav--scrolled');
                    } else {
                        navbar.classList.remove('nav--scrolled');
                    }

                    if (currentScrollY > lastScrollY && currentScrollY > 300) {
                        navbar.classList.add('nav--hidden');
                    } else {
                        navbar.classList.remove('nav--hidden');
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;

                    updateActiveLink();
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        const scrollY = window.scrollY + 120;

        let currentId = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }

    // ==================== MOBILE NAV ====================
    function initMobileNav() {
        const toggleBtn = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
        let backdrop = null;

        function openNav() {
            backdrop = document.createElement('div');
            backdrop.className = 'mobile-nav-backdrop';
            document.body.appendChild(backdrop);
            requestAnimationFrame(() => backdrop.classList.add('visible'));

            mobileNav.classList.add('open');
            mobileNav.setAttribute('aria-hidden', 'false');
            toggleBtn.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';

            backdrop.addEventListener('click', closeNav);
        }

        function closeNav() {
            mobileNav.classList.remove('open');
            mobileNav.setAttribute('aria-hidden', 'true');
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';

            if (backdrop) {
                backdrop.classList.remove('visible');
                setTimeout(() => {
                    if (backdrop && backdrop.parentNode) {
                        backdrop.parentNode.removeChild(backdrop);
                    }
                    backdrop = null;
                }, 300);
            }
        }

        toggleBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            isOpen ? closeNav() : openNav();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeNav();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                closeNav();
            }
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        const allNavLinks = document.querySelectorAll('a[href^="#"]');

        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // ==================== SCROLL REVEAL ====================
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal-up');

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elements.forEach(el => observer.observe(el));
    }

    // ==================== COUNTER ANIMATION ====================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.hero__stat-number[data-target]');

        if (!counters.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target >= 100 ? `${target}+` : target;
            }
        }

        requestAnimationFrame(update);
    }

    // ==================== BACK TO TOP ====================
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        function toggleButton() {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleButton, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== SCROLL PROGRESS ====================
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    // ==================== RESUME PDF FALLBACK ====================
    function initResumePdfFallback() {
        const iframe = document.querySelector('.resume__embed');
        if (!iframe) return;

        iframe.addEventListener('error', () => {
            iframe.closest('.resume__embed-wrapper').classList.add('no-pdf');
        });

        iframe.addEventListener('load', () => {
            try {
                if (iframe.contentDocument && iframe.contentDocument.body.childElementCount === 0) {
                    iframe.closest('.resume__embed-wrapper').classList.add('no-pdf');
                }
            } catch (e) {
                // Cross-origin PDF load
            }
        });
    }

    // ==================== THREE.JS 3D HERO VISUALS ====================
    function initThreeHero() {
        const container = document.getElementById('hero3dCanvas');
        if (!container) return;

        if (typeof THREE === 'undefined') {
            window.addEventListener('load', initThreeHero, { once: true });
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let scene, camera, renderer, particleSystem, linesMesh;
        let positions, velocities = [];
        let animationFrameId = null;
        let isVisible = true;
        const particleCount = window.innerWidth < 768 ? 35 : 65;
        const maxDistance = 110;

        function getThemeColors() {
            const isDark = document.body.getAttribute('data-theme') !== 'light';
            return {
                primary: isDark ? 0x64ffda : 0x0e7490,
                secondary: isDark ? 0x7b61ff : 0x6d28d9,
                lineAlpha: isDark ? 0.35 : 0.25
            };
        }

        let themeColors = getThemeColors();
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

        function initScene() {
            scene = new THREE.Scene();
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;

            camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
            camera.position.z = 260;

            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: window.devicePixelRatio <= 1,
                powerPreference: 'high-performance'
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.domElement.classList.add('hero-webgl-canvas');
            container.appendChild(renderer.domElement);

            buildParticles();

            window.addEventListener('mousemove', onMouseMove, { passive: true });
            window.addEventListener('resize', onResize, { passive: true });
            window.addEventListener('themechange', onThemeChange);

            const heroEl = document.getElementById('hero');
            if (heroEl && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    isVisible = entries[0].isIntersecting;
                    if (isVisible && !animationFrameId && !prefersReducedMotion) {
                        animate();
                    }
                }, { threshold: 0.05 });
                observer.observe(heroEl);
            }

            if (prefersReducedMotion) {
                renderer.render(scene, camera);
            } else {
                animate();
            }
        }

        function buildParticles() {
            const geometry = new THREE.BufferGeometry();
            positions = new Float32Array(particleCount * 3);
            velocities = [];

            const bounds = { x: 300, y: 170, z: 120 };

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * bounds.x;
                positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y;
                positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z;

                velocities.push({
                    x: (Math.random() - 0.5) * 0.35,
                    y: (Math.random() - 0.5) * 0.35,
                    z: (Math.random() - 0.5) * 0.2
                });
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const particleMaterial = new THREE.PointsMaterial({
                color: themeColors.primary,
                size: window.innerWidth < 768 ? 3 : 4,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending
            });

            particleSystem = new THREE.Points(geometry, particleMaterial);
            scene.add(particleSystem);

            const maxLines = particleCount * particleCount;
            const linePositions = new Float32Array(maxLines * 6);
            const lineColors = new Float32Array(maxLines * 6);

            const linesGeometry = new THREE.BufferGeometry();
            linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

            const lineMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: themeColors.lineAlpha,
                blending: THREE.AdditiveBlending
            });

            linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
            scene.add(linesMesh);
        }

        function onMouseMove(e) {
            mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        }

        function onResize() {
            if (!renderer || !camera || !container) return;
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            if (prefersReducedMotion) {
                renderer.render(scene, camera);
            }
        }

        function onThemeChange() {
            themeColors = getThemeColors();
            if (particleSystem && particleSystem.material) {
                particleSystem.material.color.setHex(themeColors.primary);
            }
            if (linesMesh && linesMesh.material) {
                linesMesh.material.opacity = themeColors.lineAlpha;
            }
        }

        function animate() {
            if (!isVisible) {
                animationFrameId = null;
                return;
            }

            mouse.x += (mouse.targetX - mouse.x) * 0.04;
            mouse.y += (mouse.targetY - mouse.y) * 0.04;
            camera.position.x = mouse.x * 20;
            camera.position.y = mouse.y * 20;
            camera.lookAt(scene.position);

            const posAttr = particleSystem.geometry.attributes.position;
            const linePosAttr = linesMesh.geometry.attributes.position;
            const lineColAttr = linesMesh.geometry.attributes.color;

            let lineIdx = 0;
            let colorIdx = 0;

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                if (Math.abs(positions[i * 3]) > 150) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 85) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 60) velocities[i].z *= -1;

                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        const alpha = (1.0 - dist / maxDistance) * themeColors.lineAlpha;

                        linePosAttr.array[lineIdx++] = positions[i * 3];
                        linePosAttr.array[lineIdx++] = positions[i * 3 + 1];
                        linePosAttr.array[lineIdx++] = positions[i * 3 + 2];

                        linePosAttr.array[lineIdx++] = positions[j * 3];
                        linePosAttr.array[lineIdx++] = positions[j * 3 + 1];
                        linePosAttr.array[lineIdx++] = positions[j * 3 + 2];

                        lineColAttr.array[colorIdx++] = 0.39 * alpha;
                        lineColAttr.array[colorIdx++] = 1.00 * alpha;
                        lineColAttr.array[colorIdx++] = 0.85 * alpha;

                        lineColAttr.array[colorIdx++] = 0.48 * alpha;
                        lineColAttr.array[colorIdx++] = 0.38 * alpha;
                        lineColAttr.array[colorIdx++] = 1.00 * alpha;
                    }
                }
            }

            posAttr.needsUpdate = true;
            linePosAttr.needsUpdate = true;
            lineColAttr.needsUpdate = true;
            linesMesh.geometry.setDrawRange(0, lineIdx / 3);

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        }

        try {
            initScene();
        } catch (err) {
            console.warn('Three.js WebGL initialization skipped or unsupported:', err);
        }
    }

    // ==================== OMNI SMART PROJECT SEARCH & FILTER ====================
    function initOmniSearch() {
        const searchInput = document.getElementById('omniSearchInput');
        const filterChips = document.querySelectorAll('#filterChips .chip');
        const cards = document.querySelectorAll('.project-card');

        if (!cards.length) return;

        let currentCategory = 'all';

        function filterProjects() {
            const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

            cards.forEach((card) => {
                const title = (card.querySelector('.project-card__title') || {}).textContent || '';
                const desc = (card.querySelector('.project-card__description') || {}).textContent || '';
                const tags = (card.querySelector('.project-card__tags') || {}).textContent || '';
                const category = card.getAttribute('data-category') || '';
                const fullText = (title + ' ' + desc + ' ' + tags + ' ' + category).toLowerCase();

                const matchesQuery = !query || fullText.includes(query);
                const matchesCategory = currentCategory === 'all' || category.includes(currentCategory);

                if (matchesQuery && matchesCategory) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                } else {
                    card.classList.add('filtered-out');
                    card.classList.remove('filtered-in');
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterProjects);
        }

        filterChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                filterChips.forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
                currentCategory = chip.getAttribute('data-filter') || 'all';
                filterProjects();
            });
        });
    }

    // ==================== TOAST NOTIFICATION ====================
    window.showToast = function (message, duration = 3000, type = '') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.className = 'toast';
        toast.textContent = message;
        if (type) toast.classList.add('toast--' + type);
        toast.classList.add('show');

        clearTimeout(window._toastTimeout);
        window._toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

})();
