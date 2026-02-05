/**
 * js/seo.js
 * 
 * Módulo de optimización SEO para Megatel SAS
 * Maneja meta tags dinámicos, hreflang, Schema.org y más
 */

// Configuración del sitio
const SITE_CONFIG = {
    domain: 'https://www.megatelsas.com',
    siteName: 'Megatel SAS',
    companyName: 'Megatel SAS',
    logo: '/images/megatel-logo.png',
    email: 'info@megatelco.com',
    phone: '+57 310 763 0363',
    address: {
        street: 'Calle 128C # 45A - 41',
        city: 'Bogotá',
        region: 'Bogotá D.C.',
        country: 'Colombia',
        postalCode: '111111'
    },
    social: {
        facebook: 'https://facebook.com/megatelcol',
        twitter: 'https://twitter.com/megatelcol',
        linkedin: 'https://linkedin.com/company/megatelcol',
        instagram: 'https://instagram.com/megatelcol'
    }
};

// Meta datos por página y idioma
const PAGE_META = {
    'index.html': {
        es: {
            title: 'Megatel SAS | Soluciones de Software Empresarial',
            description: 'Transformación digital desde 1994. Soluciones de telefonía IP, videoconferencia, desarrollo de software y consultoría tecnológica en Colombia.',
            keywords: 'software empresarial, transformación digital, telefonía IP, videoconferencia, desarrollo software, consultoría TI, Colombia, Bogotá',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        },
        en: {
            title: 'Megatel SAS | Enterprise Software Solutions',
            description: 'Digital transformation since 1994. IP telephony, video conferencing, software development and technology consulting solutions in Colombia.',
            keywords: 'enterprise software, digital transformation, IP telephony, video conferencing, software development, IT consulting, Colombia, Bogota',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        }
    },
    'quienes-somos.html': {
        es: {
            title: 'Quiénes Somos | Megatel SAS - 30 Años de Experiencia',
            description: 'Conoce nuestra historia, misión, visión y valores. Más de 30 años transformando empresas en Colombia con soluciones tecnológicas innovadoras.',
            keywords: 'historia Megatel, empresa tecnología Colombia, misión visión, equipo certificado',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        },
        en: {
            title: 'About Us | Megatel SAS - 30 Years of Experience',
            description: 'Learn about our history, mission, vision and values. Over 30 years transforming companies in Colombia with innovative technology solutions.',
            keywords: 'Megatel history, technology company Colombia, mission vision, certified team',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        }
    },
    'productos.html': {
        es: {
            title: 'Productos | Megatel SAS - Telefonía IP y Videoconferencia',
            description: 'Soluciones de comunicaciones empresariales: Telefonía IP, videoconferencia HD, seguridad electrónica y conectividad. Tecnología de vanguardia.',
            keywords: 'telefonía IP Colombia, videoconferencia empresarial, PBX IP, comunicaciones unificadas, seguridad electrónica',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        },
        en: {
            title: 'Products | Megatel SAS - IP Telephony & Video Conferencing',
            description: 'Enterprise communications solutions: IP telephony, HD video conferencing, electronic security and connectivity. Cutting-edge technology.',
            keywords: 'IP telephony Colombia, business video conferencing, IP PBX, unified communications, electronic security',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        }
    },
    'servicios.html': {
        es: {
            title: 'Servicios Tecnológicos Empresariales | Desarrollo, Soporte y Mantenimiento - Megatel SAS',
            description: 'Servicios tecnológicos integrales: desarrollo de aplicaciones empresariales, diseño web y e-commerce, contratos de soporte preventivo/correctivo, reparación y mantenimiento de equipos. Soluciones 360° en Bogotá.',
            keywords: 'desarrollo software empresarial, diseño web Bogotá, soporte técnico empresas, mantenimiento equipos, ERP, CRM, e-commerce, reparación computadores, soporte IT, servicios tecnológicos Colombia',
            ogType: 'website',
            ogImage: '/images/og-services-megatel.jpg'
        },
        en: {
            title: 'Enterprise Technology Services | Development, Support and Maintenance - Megatel SAS',
            description: 'Comprehensive technology services: enterprise application development, web design and e-commerce, preventive/corrective support contracts, equipment repair and maintenance. 360° solutions in Bogota.',
            keywords: 'enterprise software development, web design Bogota, business technical support, equipment maintenance, ERP, CRM, e-commerce, computer repair, IT support, technology services Colombia',
            ogType: 'website',
            ogImage: '/images/og-services-megatel.jpg'
        }
    },
    'contacto.html': {
        es: {
            title: 'Contacto | Megatel SAS - Consultoría Gratuita',
            description: 'Contáctenos para una consultoría gratuita. Bogotá, Colombia. Tel: +57 310 763 0363. Email: info@megatel.com.co. Horario: Lun-Vie 8AM-6PM.',
            keywords: 'contacto Megatel, consultoría TI Bogotá, contacto empresa tecnología Colombia',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        },
        en: {
            title: 'Contact | Megatel SAS - Free Consultation',
            description: 'Contact us for a free consultation. Bogota, Colombia. Tel: +57 310 763 0363. Email: info@megatel.com.co. Hours: Mon-Fri 8AM-6PM.',
            keywords: 'contact Megatel, IT consulting Bogota, technology company contact Colombia',
            ogType: 'website',
            ogImage: '/images/og-home-es.png'
        }
    }
};

/**
 * Obtiene la página actual
 */
function getCurrentPage() {
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1);
    
    // Si está en la raíz, es index.html
    if (page === '' || page === '/') {
        page = 'index.html';
    }
    
    return page;
}

/**
 * Actualiza todos los meta tags SEO según el idioma actual
 */
function updateSEOMetaTags(lang = null) {
    if (!lang) {
        lang = getCurrentLanguage ? getCurrentLanguage() : 'es';
    }
    
    const page = getCurrentPage();
    const meta = PAGE_META[page];
    
    if (!meta || !meta[lang]) {
        console.warn(`Meta datos no encontrados para ${page} en idioma ${lang}`);
        return;
    }
    
    const data = meta[lang];
    
    // 1. Title
    document.title = data.title;
    
    // 2. Meta Description
    updateOrCreateMeta('name', 'description', data.description);
    
    // 3. Meta Keywords
    updateOrCreateMeta('name', 'keywords', data.keywords);
    
    // 4. Open Graph Tags
    updateOrCreateMeta('property', 'og:title', data.title);
    updateOrCreateMeta('property', 'og:description', data.description);
    updateOrCreateMeta('property', 'og:type', data.ogType);
    updateOrCreateMeta('property', 'og:url', `${SITE_CONFIG.domain}/${page}`);
    updateOrCreateMeta('property', 'og:image', `${SITE_CONFIG.domain}${data.ogImage}`);
    updateOrCreateMeta('property', 'og:site_name', SITE_CONFIG.siteName);
    updateOrCreateMeta('property', 'og:locale', lang === 'es' ? 'es_CO' : 'en_US');
    
    // 5. Twitter Card Tags
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', data.title);
    updateOrCreateMeta('name', 'twitter:description', data.description);
    updateOrCreateMeta('name', 'twitter:image', `${SITE_CONFIG.domain}${data.ogImage}`);
    
    // 6. Canonical URL
    updateCanonicalURL(page, lang);
    
    // 7. Hreflang Tags
    updateHreflangTags(page);
    
    // 8. Schema.org JSON-LD
    updateSchemaOrg(page, lang, data);
    
    console.log(`✓ SEO Meta Tags actualizados para ${page} [${lang}]`);
}

/**
 * Actualiza o crea un meta tag
 */
function updateOrCreateMeta(attr, key, content) {
    let meta = document.querySelector(`meta[${attr}="${key}"]`);
    
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
}

/**
 * Actualiza la URL canónica
 */
function updateCanonicalURL(page, lang) {
    let canonical = document.querySelector('link[rel="canonical"]');
    
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    
    // URL canónica incluye el idioma como parámetro
    const url = `${SITE_CONFIG.domain}/${page}`;
    canonical.setAttribute('href', url);
}

/**
 * Actualiza los tags hreflang para SEO multilingüe
 */
function updateHreflangTags(page) {
    // Eliminar hreflang existentes
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    const baseURL = `${SITE_CONFIG.domain}/${page}`;
    
    // Hreflang para español
    const hreflangES = document.createElement('link');
    hreflangES.setAttribute('rel', 'alternate');
    hreflangES.setAttribute('hreflang', 'es');
    hreflangES.setAttribute('href', `${baseURL}?lang=es`);
    document.head.appendChild(hreflangES);
    
    // Hreflang para inglés
    const hreflangEN = document.createElement('link');
    hreflangEN.setAttribute('rel', 'alternate');
    hreflangEN.setAttribute('hreflang', 'en');
    hreflangEN.setAttribute('href', `${baseURL}?lang=en`);
    document.head.appendChild(hreflangEN);
    
    // X-default para cuando no se especifica idioma
    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', baseURL);
    document.head.appendChild(hreflangDefault);
}

/**
 * Actualiza el markup Schema.org (JSON-LD)
 */
function updateSchemaOrg(page, lang, meta) {
    // Eliminar schema existente
    const existingSchema = document.getElementById('schema-org-jsonld');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    let schema = {};
    
    // Schema Organization (para todas las páginas)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_CONFIG.companyName,
        "url": SITE_CONFIG.domain,
        "logo": `${SITE_CONFIG.domain}${SITE_CONFIG.logo}`,
        "description": meta.description,
        "email": SITE_CONFIG.email,
        "telephone": SITE_CONFIG.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": SITE_CONFIG.address.street,
            "addressLocality": SITE_CONFIG.address.city,
            "addressRegion": SITE_CONFIG.address.region,
            "postalCode": SITE_CONFIG.address.postalCode,
            "addressCountry": SITE_CONFIG.address.country
        },
        "sameAs": [
            SITE_CONFIG.social.facebook,
            SITE_CONFIG.social.twitter,
            SITE_CONFIG.social.linkedin,
            SITE_CONFIG.social.instagram
        ]
    };
    
    // Schema específico por página
    if (page === 'index.html') {
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                organizationSchema,
                {
                    "@type": "WebSite",
                    "url": SITE_CONFIG.domain,
                    "name": SITE_CONFIG.siteName,
                    "description": meta.description,
                    "inLanguage": lang === 'es' ? 'es-CO' : 'en-US'
                }
            ]
        };
    } else if (page === 'productos.html') {
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                organizationSchema,
                {
                    "@type": "Product",
                    "name": meta.title,
                    "description": meta.description,
                    "provider": {
                        "@type": "Organization",
                        "name": SITE_CONFIG.companyName
                    }
                }
            ]
        };
    } else if (page === 'servicios.html') {
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                organizationSchema,
                {
                    "@type": "Service",
                    "serviceType": "Servicios Tecnológicos Empresariales",
                    "name": meta.title,
                    "description": meta.description,
                    "provider": {
                        "@type": "Organization",
                        "name": SITE_CONFIG.companyName
                    },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Portafolio de Servicios Tecnológicos",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Desarrollo de Aplicaciones Empresariales",
                                    "description": "Desarrollo de software a la medida: ERP, CRM, Intranets"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Diseño de Páginas Web y E-commerce",
                                    "description": "Diseño web responsive y optimizado para SEO"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Contrato de Soporte Preventivo y Correctivo",
                                    "description": "Asistencia técnica remota y en sitio"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Reparación y Mantenimiento de Equipos",
                                    "description": "Diagnóstico y reparación profesional de equipos"
                                }
                            }
                        ]
                    },
                    "areaServed": {
                        "@type": "Country",
                        "name": "Colombia"
                    }
                }
            ]
        };
    } else if (page === 'contacto.html') {
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                organizationSchema,
                {
                    "@type": "ContactPage",
                    "url": `${SITE_CONFIG.domain}/${page}`,
                    "name": meta.title,
                    "description": meta.description
                }
            ]
        };
    } else {
        schema = organizationSchema;
    }
    
    // Insertar el schema en el head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-org-jsonld';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
}

/**
 * Agrega alt tags a imágenes que no los tienen
 */
function optimizeImages() {
    const images = document.querySelectorAll('img:not([alt])');
    
    images.forEach((img, index) => {
        // Intentar obtener alt del nombre del archivo
        const src = img.getAttribute('src') || '';
        const filename = src.split('/').pop().split('.')[0];
        const altText = filename.replace(/-/g, ' ').replace(/_/g, ' ');
        
        img.setAttribute('alt', altText || `Imagen ${index + 1}`);
        
        // Agregar loading lazy si no lo tiene
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

/**
 * Actualiza breadcrumbs Schema.org
 */
function updateBreadcrumbSchema() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);
    
    if (segments.length === 0) return; // No breadcrumbs en home
    
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": SITE_CONFIG.domain
            }
        ]
    };
    
    // Agregar segmentos del path
    segments.forEach((segment, index) => {
        const pageName = segment.replace('.html', '').replace(/-/g, ' ');
        breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": pageName.charAt(0).toUpperCase() + pageName.slice(1),
            "item": `${SITE_CONFIG.domain}/${segments.slice(0, index + 1).join('/')}`
        });
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbList, null, 2);
    document.head.appendChild(script);
}

/**
 * Inicializa el sistema SEO
 */
function initSEO() {
    // 1. Actualizar meta tags iniciales
    const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'es';
    updateSEOMetaTags(currentLang);
    
    // 2. Optimizar imágenes
    optimizeImages();
    
    // 3. Actualizar breadcrumbs si no es home
    if (getCurrentPage() !== 'index.html') {
        updateBreadcrumbSchema();
    }
    
    // 4. Escuchar cambios de idioma
    document.addEventListener('languageChanged', function(e) {
        updateSEOMetaTags(e.detail.language);
    });
    
    console.log('✓ Sistema SEO inicializado');
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSEO);
} else {
    initSEO();
}

// Exportar funciones
if (typeof window !== 'undefined') {
    window.updateSEOMetaTags = updateSEOMetaTags;
    window.initSEO = initSEO;
    window.SITE_CONFIG = SITE_CONFIG;
}