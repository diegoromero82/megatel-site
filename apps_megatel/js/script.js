/* ========================================
   MEGATEL SAS - JAVASCRIPT PRINCIPAL
   Optimizado para todas las páginas con i18n
   ======================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DETECTAR SI ES LA PÁGINA INDEX =====
    const isIndexPage = detectIndexPage();
    
    // ===== CONFIGURACIÓN INICIAL =====
    if (isIndexPage) {
        initIndexPageFeatures();
    }
    
    initScrollEffects();
    initFloatingButtons();
    initNavbarEffects();
    initSmoothScroll();
    
    // NOTA: El sistema i18n se inicializa automáticamente desde i18n.js
    // pero podemos escuchar el evento de cambio de idioma
    document.addEventListener('languageChanged', function(e) {
        console.log('Idioma cambiado a:', e.detail.language);
        // Aquí puedes agregar acciones adicionales cuando cambie el idioma
    });
    
    // ===== DETECTAR PÁGINA INDEX =====
    function detectIndexPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        // Detectar si es index.html o la raíz del sitio
        if (filename === 'index.html' || filename === '' || filename === '/') {
            document.documentElement.classList.add('index-page');
            return true;
        }
        return false;
    }
    
    // ===== CARACTERÍSTICAS ESPECÍFICAS PARA INDEX.HTML =====
    function initIndexPageFeatures() {
        preventPartialScroll();
        initScrollAnimations();
        
        // Mensaje de consola solo para index
        console.log('%c🚀 Megatel SAS - Index Page Loaded', 'color: #0274be; font-size: 16px; font-weight: bold;');
        console.log('%c📱 Scroll Snap Enabled', 'color: #28a745; font-size: 12px;');
    }
    
    // ===== EFECTOS DE SCROLL =====
    function initScrollEffects() {
        let scrollContainer;
        
        if (isIndexPage && document.querySelector('.page-container')) {
            scrollContainer = document.querySelector('.page-container');
        } else {
            scrollContainer = window;
        }
        
        const navbar = document.querySelector('#mainNavbar');
        
        function handleScroll() {
            const scrollTop = scrollContainer === window ? 
                window.pageYOffset || document.documentElement.scrollTop :
                scrollContainer.scrollTop;
            
            // Cambiar estilo del navbar según el scroll
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Mostrar/ocultar botón de subir
            toggleBackToTopButton(scrollTop);
        }
        
        if (scrollContainer === window) {
            window.addEventListener('scroll', handleScroll);
        } else {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
    }
    
    // ===== BOTONES FLOTANTES =====
    function initFloatingButtons() {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                scrollToTop();
            });
        }
    }
    
    function scrollToTop() {
        if (isIndexPage) {
            const pageContainer = document.querySelector('.page-container');
            if (pageContainer) {
                pageContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    function toggleBackToTopButton(scrollTop) {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        
        if (backToTopBtn) {
            if (!scrollTop) {
                if (isIndexPage) {
                    const pageContainer = document.querySelector('.page-container');
                    scrollTop = pageContainer ? pageContainer.scrollTop : 0;
                } else {
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                }
            }
            
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }
    
  // ===== EFECTOS DEL NAVBAR =====
    function initNavbarEffects() {
        const navbarCollapse = document.querySelector('#navbarNav'); //
        
        // 1. Cerrar menú al hacer clic en un enlace (móvil)
        if (navbarCollapse) { //
            const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 992) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                });
            });
        }

        // 2. Habilitar CLIC en el enlace principal de "Servicios" (Solo Desktop)
        // Esto permite que el hover muestre el menú pero el clic abra la página
        const servicesLink = document.querySelector('.custom-dropdown > .nav-link');
        if (servicesLink) {
            servicesLink.addEventListener('click', function(e) {
                if (window.innerWidth >= 992) {
                    window.location.href = this.getAttribute('href');
                }
            });
        }
        
        // 3. Marcar enlace activo según la página actual corregido
        markActiveNavLink();
    }
    
    function markActiveNavLink() {
        const path = window.location.pathname;
        // Obtenemos el nombre del archivo actual (ej: 'quienes-somos.html')
        let filename = path.substring(path.lastIndexOf('/') + 1);
        
        // Normalizamos la raíz o index a 'index.html'
        if (filename === '' || filename === '/') filename = 'index.html';

        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active'); // Limpieza preventiva
            link.removeAttribute('aria-current');
            
            let href = link.getAttribute('href');
            // Normalizamos el href del link para la comparación
            if (href === '/' || href === '') href = 'index.html';

            // Coincidencia exacta para evitar activaciones múltiples
            if (href === filename && href !== '#') {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // ===== SCROLL SUAVE PARA ANCLAS =====
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Solo aplicar scroll suave si es un ancla válido
                if (targetId !== '#' && targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        if (isIndexPage) {
                            const pageContainer = document.querySelector('.page-container');
                            if (pageContainer) {
                                const targetPosition = targetElement.offsetTop;
                                pageContainer.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        } else {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
            });
        });
    }
    
    // ===== PREVENIR SCROLL PARCIAL (SOLO INDEX) =====
    function preventPartialScroll() {
        const pageContainer = document.querySelector('.page-container');
        if (!pageContainer) return;
        
        let scrollTimeout;
        
        pageContainer.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                snapToNearestSection();
            }, 150);
        });
    }
    
    function snapToNearestSection() {
        const pageContainer = document.querySelector('.page-container');
        const sections = document.querySelectorAll('.full-screen-section');
        
        if (!pageContainer || sections.length === 0) return;
        
        const scrollTop = pageContainer.scrollTop;
        const viewportHeight = window.innerHeight;
        
        let nearestSection = null;
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(scrollTop - sectionTop);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestSection = section;
            }
        });
        
        // Si estamos muy cerca de una sección (menos de 10% de la altura), hacer snap
        if (nearestSection && minDistance < viewportHeight * 0.1) {
            pageContainer.scrollTo({
                top: nearestSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // ===== ANIMACIONES AL ENTRAR EN VISTA (SOLO INDEX) =====
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        
        const animatedElements = document.querySelectorAll('.bg-opacity-75');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out';
                }
            });
        }, {
            threshold: 0.2
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // ===== DETECTAR CAMBIOS DE ORIENTACIÓN EN MÓVIL =====
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (isIndexPage) {
                snapToNearestSection();
            }
        }, 300);
    });
    
    // ===== REDIMENSIONAMIENTO DE VENTANA =====
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (isIndexPage) {
                snapToNearestSection();
            }
        }, 250);
    });
    
    // ===== FORMULARIOS - VALIDACIÓN =====
    // Aplica a todas las páginas que tengan formularios
    const forms = document.querySelectorAll('form.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
    
    // ===== LAZY LOADING DE IMÁGENES =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading nativo
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ===== ANIMACIONES PARA CARDS EN LANDING PAGES =====
    const cards = document.querySelectorAll('.solution-card, .service-card, .contact-info-card');
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }
    
    // ===== MENSAJES DE CONSOLA =====
    console.log('%c💼 Megatel SAS - Website Loaded Successfully', 'color: #0274be; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 Transformación Digital desde 1994', 'color: #6c757d; font-size: 12px;');
    
});

// ===== FUNCIONES AUXILIARES EXPORTABLES =====

// Función para ir a una sección específica
function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isIndexPage = document.documentElement.classList.contains('index-page');
    
    if (section) {
        if (isIndexPage) {
            const pageContainer = document.querySelector('.page-container');
            if (pageContainer) {
                pageContainer.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        } else {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Función para obtener la sección actual (solo para index)
function getCurrentSection() {
    const isIndexPage = document.documentElement.classList.contains('index-page');
    if (!isIndexPage) return null;
    
    const pageContainer = document.querySelector('.page-container');
    const sections = document.querySelectorAll('.full-screen-section');
    
    if (!pageContainer || sections.length === 0) return null;
    
    const scrollTop = pageContainer.scrollTop;
    const viewportHeight = window.innerHeight;
    const midPoint = scrollTop + (viewportHeight / 2);
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (midPoint >= sectionTop && midPoint < sectionBottom) {
            return section.id;
        }
    }
    
    return null;
}

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Función para formatear número de teléfono
function formatPhone(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.goToSection = goToSection;
    window.getCurrentSection = getCurrentSection;
    window.validateEmail = validateEmail;
    window.formatPhone = formatPhone;
}

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
});

// ===== PERFORMANCE MONITORING (OPCIONAL) =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('%c⚡ Tiempo de carga: ' + pageLoadTime + 'ms', 'color: #28a745; font-size: 12px;');
        }, 0);
    });
}

// ===== FORMULARIO GOOGLE - MEGATEL SAS =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form-megatel');
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    const resDiv = document.getElementById('form-response');
    const submitBtn = document.getElementById('submit-btn');
    let captchaAnswer;

    // Generador de Captcha Matemático
    function generateCaptcha() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        captchaAnswer = a + b;
        const questionElement = document.getElementById('captcha-question');
        if (questionElement) questionElement.innerText = `${a} + ${b}`;
    }
    
    if (form) {
        generateCaptcha();

        form.addEventListener('submit', function(event) {
            // 1. Validar Captcha manualmente
            const userInput = parseInt(captchaInput.value);
            const isCaptchaValid = userInput === captchaAnswer;

            if (!isCaptchaValid) {
                captchaError.classList.remove('d-none');
                captchaInput.classList.add('is-invalid');
            } else {
                captchaError.classList.add('d-none');
                captchaInput.classList.remove('is-invalid');
            }

            // 2. Validación nativa de Bootstrap y Captcha
            if (!form.checkValidity() || !isCaptchaValid) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // 3. Preparar envío (AJAX)
            event.preventDefault();
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin ms-2"></i>';

            // Convertimos FormData a URLSearchParams para compatibilidad con e.parameter de Google
            const formData = new FormData(form);
            const urlEncodedData = new URLSearchParams(formData);

            fetch(form.action, { 
                method: 'POST', 
                body: urlEncodedData,
                mode: 'no-cors' // Evita errores de redirección de Google Apps Script
            })
            .then(() => {
                // Al usar 'no-cors', asumimos éxito si la promesa se resuelve
                resDiv.classList.remove('d-none', 'alert-danger');
                resDiv.classList.add('alert-success');
                
                // Usamos la traducción oficial del data.js si está disponible
                const successMsg = (typeof translations !== 'undefined' && translations["form_success"]) 
                    ? translations["form_success"][document.documentElement.lang || 'es'] 
                    : "¡Mensaje enviado con éxito!";
                
                resDiv.innerText = successMsg;
                
                // Reiniciar formulario y estado visual
                form.reset();
                form.classList.remove('was-validated');
                generateCaptcha();

                // Ocultar mensaje de éxito tras 6 segundos
                setTimeout(() => resDiv.classList.add('d-none'), 6000);
            })
            .catch(error => {
                console.error('Error de envío:', error);
                resDiv.classList.remove('d-none', 'alert-success');
                resDiv.classList.add('alert-danger');
                resDiv.innerText = "Error al conectar con el servidor. Inténtelo de nuevo.";
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            });
        });
    }
});