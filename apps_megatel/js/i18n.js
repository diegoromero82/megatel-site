/**
 * js/i18n.js
 *
 * Módulo para gestionar la internacionalización (i18n).
 * Requiere que el objeto 'translations' esté cargado desde data.js
 */

const LANG_KEY = 'megatel_lang'; // Clave para guardar el idioma en localStorage

/**
 * Obtiene el idioma actual del localStorage, del navegador, o usa 'es' por defecto.
 * @returns {string} El código de idioma ('es' o 'en').
 */
function getCurrentLanguage() {
    // 1. Primero verificar localStorage
    let lang = localStorage.getItem(LANG_KEY);
    
    // 2. Si no hay en localStorage, detectar del navegador
    if (!lang) {
        const browserLang = navigator.language || navigator.userLanguage;
        lang = browserLang.startsWith('en') ? 'en' : 'es';
    }
    
    // 3. Validar que sea un idioma soportado
    if (lang !== 'es' && lang !== 'en') {
        lang = 'es';
    }
    
    return lang;
}

/**
 * Aplica las traducciones al DOM.
 * @param {string} lang - El código de idioma a aplicar ('es' o 'en').
 */
function setLanguage(lang) {
    if (!translations) {
        console.error("Error: El objeto 'translations' no está cargado desde data.js");
        return;
    }

    // Validar que el idioma sea soportado
    if (lang !== 'es' && lang !== 'en') {
        console.warn(`Idioma '${lang}' no soportado. Usando 'es' por defecto.`);
        lang = 'es';
    }

    // 1. Recorre todos los elementos con el atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // 2. Busca la traducción y la aplica
        if (translations[key] && translations[key][lang]) {
            // Determinar si es un input con placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[key][lang]);
                } else {
                    element.value = translations[key][lang];
                }
            } else {
                element.innerHTML = translations[key][lang];
            }
        } else {
            // Log de warning si falta una traducción
            if (!translations[key]) {
                console.warn(`Traducción no encontrada para la clave: '${key}'`);
            } else if (!translations[key][lang]) {
                console.warn(`Traducción '${lang}' no encontrada para la clave: '${key}'`);
            }
        }
    });

    // 3. Actualizar atributos title y aria-label si tienen data-i18n-title
    const elementsWithTitle = document.querySelectorAll('[data-i18n-title]');
    elementsWithTitle.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[key] && translations[key][lang]) {
            element.setAttribute('title', translations[key][lang]);
            // También actualizar aria-label para accesibilidad
            element.setAttribute('aria-label', translations[key][lang]);
        }
    });

    // 4. Actualiza el atributo lang en el tag <html> para accesibilidad
    document.documentElement.lang = lang;
    
    // 5. Guarda el idioma en el localStorage
    localStorage.setItem(LANG_KEY, lang);
    
    // 6. Actualizar el botón de idioma
    updateLanguageButton(lang);
    
    // 7. Disparar evento personalizado para que otros scripts puedan reaccionar
    const event = new CustomEvent('languageChanged', { 
        detail: { language: lang }
    });
    document.dispatchEvent(event);
    
    // Log exitoso
    console.log(`✓ Idioma cambiado a: ${lang === 'es' ? 'Español' : 'English'}`);
}

/**
 * Actualiza el botón de cambio de idioma.
 * @param {string} currentLang - El idioma actual.
 */
function updateLanguageButton(currentLang) {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        // Actualizar el atributo data-current-lang
        langBtn.setAttribute('data-current-lang', currentLang);
        
        // Actualizar el texto del botón (muestra el idioma opuesto)
        const langText = langBtn.querySelector('[data-i18n="lang_switch_text"]');
        if (langText && translations['lang_switch_text']) {
            langText.textContent = translations['lang_switch_text'][currentLang];
        }
    }
}

/**
 * Cambia al idioma opuesto del actual.
 */
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
}

/**
 * Cambia al idioma especificado.
 * @param {string} lang - El código de idioma ('es' o 'en').
 */
function changeLanguage(lang) {
    setLanguage(lang);
}

/**
 * Obtiene una traducción específica sin aplicarla al DOM.
 * Útil para traducciones dinámicas en JavaScript.
 * @param {string} key - La clave de traducción.
 * @param {string} lang - El idioma (opcional, usa el actual si no se especifica).
 * @returns {string} El texto traducido o la clave si no se encuentra.
 */
function translate(key, lang = null) {
    if (!lang) {
        lang = getCurrentLanguage();
    }
    
    if (translations[key] && translations[key][lang]) {
        return translations[key][lang];
    }
    
    console.warn(`Traducción no encontrada: ${key} [${lang}]`);
    return key; // Devolver la clave como fallback
}

/**
 * Inicializa el sistema de internacionalización.
 * Debe llamarse cuando el DOM esté listo.
 */
function initI18n() {
    // 1. Obtener el idioma actual
    const currentLang = getCurrentLanguage();
    
    // 2. Aplicar las traducciones
    setLanguage(currentLang);
    
    // 3. Configurar el botón de cambio de idioma
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });
    }
    
    // Log de inicialización
    console.log('✓ Sistema i18n inicializado');
}

// Inicializar automáticamente cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    // El DOM ya está listo
    initI18n();
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.getCurrentLanguage = getCurrentLanguage;
    window.setLanguage = setLanguage;
    window.changeLanguage = changeLanguage;
    window.toggleLanguage = toggleLanguage;
    window.translate = translate;
    window.initI18n = initI18n;
}