/**
 * js/i18n.js
 *
 * Módulo para gestionar la internacionalización (i18n).
 * Requiere que el objeto 'translations' esté cargado desde data.js
 */

const LANG_KEY = 'megatel_lang'; // Clave para guardar el idioma en localStorage

/**
 * Obtiene el idioma actual del localStorage o usa 'es' por defecto.
 * @returns {string} El código de idioma ('es' o 'en').
 */
function getCurrentLanguage() {
    return localStorage.getItem(LANG_KEY) || 'es';
}

/**
 * Aplica las traducciones al DOM.
 * @param {string} lang - El código de idioma a aplicar.
 */
function setLanguage(lang) {
    if (!translations) {
        console.error("Error: El objeto 'translations' no está cargado.");
        return;
    }

    // 1. Recorre todos los elementos con el atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // 2. Busca la traducción y la aplica
        if (translations[key] && translations[key][lang]) {
            element.textContent = translations[key][lang];
        }
    });

    // 3. Actualiza el atributo lang en el tag <html> para accesibilidad
    document.documentElement.lang = lang;
    
    // 4. Guarda el idioma en el localStorage
    localStorage.setItem(LANG_KEY, lang);
}