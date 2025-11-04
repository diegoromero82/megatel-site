/**
 * js/script.js
 *
 * Lógica principal de la SPA.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar el idioma guardado al cargar la página
    let currentLang = getCurrentLanguage();
    setLanguage(currentLang);

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    // 2. Manejar el clic del botón de cambio de idioma
    langToggleBtn.addEventListener('click', () => {
        // Determinar el nuevo idioma
        const newLang = (currentLang === 'es') ? 'en' : 'es';
        
        // Aplicar la traducción
        setLanguage(newLang);
        
        // Actualizar la variable local
        currentLang = newLang;
        
        // Opcional: Actualizar el texto del botón si no tiene data-i18n
        // (En nuestro caso, el botón tiene data-i18n="lang_switch_text", por lo que se traduce automáticamente)
    });
});