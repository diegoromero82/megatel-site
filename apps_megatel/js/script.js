/**
 * js/script.js
 *
 * Lógica principal de la SPA, incluyendo manejo de idioma y botones flotantes.
 */

// Función para ajustar 100vh real en móviles para evitar barras de navegación
function adjustViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Ajustar la altura de las secciones full-screen
    const navbarHeight = document.getElementById('mainNavbar').offsetHeight;
    document.querySelectorAll('.full-screen-section').forEach(section => {
        section.style.height = `calc(var(--vh, 1vh) * 100 - ${navbarHeight}px)`;
    });
}

// Función para inicializar y manejar el botón "Subir al Top"
function initScrollToTop() {
    const btn = document.getElementById('back-to-top-btn');

    // 1. Mostrar/Ocultar el botón al hacer scroll
    window.addEventListener('scroll', () => {
        // Muestra el botón cuando el scroll vertical es mayor a 300px
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // 2. Manejar el evento de clic: scroll suave
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll suave en lugar de salto instantáneo
        });
    });
}

// Lógica de Internacionalización (copiada del paso anterior)
// ... (Aquí debe estar la función setLanguage y getCurrentLanguage de i18n.js) ...

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Idioma
    // Nota: currentLang y setLanguage provienen de i18n.js
    let currentLang = getCurrentLanguage();
    setLanguage(currentLang);

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    // Manejar el clic del botón de cambio de idioma
    langToggleBtn.addEventListener('click', () => {
        const newLang = (currentLang === 'es') ? 'en' : 'es';
        setLanguage(newLang);
        currentLang = newLang;
    });

    // 2. Inicializar los Botones Flotantes
    initScrollToTop();
    
    // Opcional: Implementar scroll suave para los enlaces del Navbar
    document.querySelectorAll('#mainNavbar a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});