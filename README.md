# Megatel SAS - Portal Web Corporativo

Este repositorio contiene el código fuente, activos y configuraciones del sitio web corporativo de **Megatel SAS** (https://www.megatelsas.com). El portal está diseñado bajo un enfoque modular, optimizado para SEO internacional, alta velocidad de carga y adaptabilidad en múltiples dispositivos.

## 🚀 Características Principales

- **Arquitectura Limpia:** Estructura basada en HTML5, Bootstrap 5.3.3 y CSS3 personalizado sin dependencias complejas de frameworks pesados de JS en el frontend.
- **Multilingüe Nativo (i18n):** Implementación de traducción dinámica (Español/Inglés) controlada mediante un diccionario centralizado (`js/data.js`) y un script de renderizado en tiempo real (`js/lang.js`).
- **URLs Amigables y Limpias:** Configuración avanzada en el servidor mediante `.htaccess` para eliminar extensiones `.html`, reduciendo la latencia de navegación y mejorando el rastreo.
- **SEO Técnico Avanzado:** Integración de etiquetas canónicas, marcado `hreflang` dinámico para consistencia de rutas, exclusión estratégica en `robots.txt` y mapa del sitio indexable en `sitemap.xml`.
- **UI/UX Interactiva:** Secciones colapsables optimizadas para venta consultiva, paneles de visualización de salas de videoconferencia y componentes completamente responsivos.

## 📂 Estructura del Proyecto

```bash
├── css/                  # Estilos personalizados de la aplicación
├── js/
│   └── data.js           # Diccionario centralizado de idiomas (Claves i18n)
│   └── lang.js           # Script de control de cambio de idioma y renderizado
├── images/               # Activos visuales, optimizados y comprimidos (WebP/PNG/JPG)
├── .htaccess             # Directivas del servidor Apache (Seguridad, Caché y URLs limpias)
├── robots.txt            # Instrucciones de rastreo para motores de búsqueda
├── sitemap.xml           # Mapa de sitio optimizado para indexación
├── index.html            # Página de inicio / Home
├── quienes-somos.html    # Sección dedicada a la visión, misión, valores e historia de Megatel
├── productos.html        # Sección dedicada al portafolio de productos de Megatel
│   └── telefonia-ip.html # Sección especializada en Soluciones de Telefonía
│   └── conectividad.html # Sección especializada en Soluciones de Conectividad
│   └── videoconferencia.html # Sección especializada en Soluciones Audiovisuales
├── servicios.html        # Sección dedicada al portafolio de servicios de Megatel
│   └── desarrollo.html   # Sección especializada en Desarrollo de Software
├── contacto.html         # Formulario de contacto y captación de leads
└── 404.html              # Página de error personalizada
