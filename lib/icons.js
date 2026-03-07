// Biblioteca de iconos auténticos SVG de lenguajes de programación
// Obtenidos del repositorio oficial devicons/devicon

const DEVICON_BASE_URL = 'https://raw.githubusercontent.com/devicons/devicon/master/icons';

// Cache para almacenar iconos ya descargados
const iconCache = new Map();

// Mapa de idiomas a nombres de devicon
const DEVICON_NAMES = {
  'JavaScript': 'javascript',
  'Python': 'python', 
  'TypeScript': 'typescript',
  'Java': 'java',
  'C': 'c',
  'C++': 'cplusplus',
  'HTML': 'html5',
  'CSS': 'css3',
  'Go': 'go',
  'Rust': 'rust',
  'PHP': 'php',
  'Ruby': 'ruby',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'Dart': 'dart',
  'Shell': 'bash',
  'Vue': 'vuejs',
  'React': 'react',
  'Node.js': 'nodejs',
  'Docker': 'docker',
  'C#': 'csharp'
};

// Función para obtener icono auténtico de devicon
async function fetchDeviconIcon(language) {
  const deviconName = DEVICON_NAMES[language];
  if (!deviconName) return null;
  
  // Verificar cache primero
  const cacheKey = `${deviconName}-original`;
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey);
  }
  
  try {
    const url = `${DEVICON_BASE_URL}/${deviconName}/${deviconName}-original.svg`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`No se pudo obtener icono de ${language} desde devicon:`, response.status);
      return null;
    }
    
    const svgContent = await response.text();
    
    // Extraer solo el contenido del <svg>, sin el wrapper
    const svgMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (!svgMatch) return null;
    
    // Extraer paths y elementos internos del SVG
    const innerSVG = svgMatch[1];
    
    // Adaptar el viewBox de 128x128 a 28x28 usando transform
    const scaledSVG = `<g transform="scale(0.21875)">${innerSVG}</g>`;
    
    // Guardar en cache
    iconCache.set(cacheKey, scaledSVG);
    
    return scaledSVG;
  } catch (error) {
    console.log(`Error obteniendo icono de devicon para ${language}:`, error.message);
    return null;
  }
}

// Iconos fallback para cuando devicon no esté disponible
const FALLBACK_ICONS = {
  JavaScript: `<rect width="28" height="28" rx="4" fill="#F7DF1E"/><path d="M18.83 22.65c.46.8 1.08 1.35 2.15 1.35.9 0 1.48-.45 1.48-1.08 0-.75-.59-1.02-1.59-1.45l-.54-.23c-1.57-.67-2.61-1.51-2.61-3.29 0-1.64 1.25-2.89 3.2-2.89 1.39 0 2.39.48 3.1 1.75l-1.7 1.09c-.37-.67-.78-.93-1.4-.93-.64 0-1.04.41-1.04.93 0 .65.4.92 1.34 1.32l.54.23c1.86.8 2.9 1.61 2.9 3.44 0 1.97-1.55 3.05-3.63 3.05-2.03 0-3.35-.97-3.99-2.24l1.8-1.03zm-10.4-.04c.34.6.64 1.11 1.38 1.11.7 0 1.15-.27 1.15-1.34V15.4h2.21v7.48c0 2.21-1.29 3.22-3.19 3.22s-2.93-1.25-3.47-2.76l1.93-1.22z" fill="#323330"/>`,
  
  Python: `<defs><linearGradient id="python-gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#3776ab;stop-opacity:1"/><stop offset="100%" style="stop-color:#ffd43b;stop-opacity:1"/></linearGradient></defs><path d="M14.31.58c-1.58-.007-2.78.414-2.78 1.25v.915h2.78v.35H8.77c-.944 0-1.77.568-2.03 1.65-.267 1.24-.267 2.017 0 3.312.198 1.02.647 1.77 1.58 1.77h.59v-.783c0-1.073.928-2.02 2.03-2.02h2.78c.903 0 1.626-.741 1.626-1.65V2.38c0-.834-.703-1.462-1.626-1.557-.583-.06-1.188-.059-1.777 0zm-1.485.853c.337 0 .612.278.612.623s-.275.622-.612.622-.612-.278-.612-.622.275-.623.612-.623zM20.54 6.22v.771c0 1.118-.949 2.06-2.03 2.06h-2.78c-.887 0-1.626.759-1.626 1.65v3.463c0 .834.726 1.323 1.626 1.65 1.08.393 2.12.465 2.78 0 .44-.31 1.626-.935 1.626-1.65v-.916h-2.78v-.35h4.407c.944 0 1.297-.658 1.626-1.65.34-1.021.326-2.004 0-3.312-.234-.945-.682-1.565-1.626-1.565h-1.123zm-1.513 6.18c.337 0 .612.278.612.623s-.275.623-.612.623-.612-.278-.612-.623.275-.623.612-.623z" fill="url(#python-gradient)"/>`,
  
  TypeScript: `<rect width="28" height="28" rx="4" fill="#3178C6"/><path d="M8.67 16h3.33v2.08h-1.33v3.44H8.67zm3.71 0h1.8v5.52h-1.8zm2.09 0h6.76v1.61H18.1v3.91h-1.8v-3.91h-1.83z" fill="white"/>`,
  
  Java: `<rect width="28" height="28" rx="4" fill="#f89820"/><path d="M12.617 23.12s-.767.447.547.596c1.588.181 2.393.155 4.135-.175 0 0.462.288 1.105.535-3.927 1.68-8.875-.098-5.803-.959zm-.479-2.186s-.858.636.442.77c1.694.175 3.028.189 5.339-.256 0 0 .32.324.823.501-4.735 1.384-9.991.109-6.63-1.015z" fill="#5382a1"/><path d="M16.802 14.271c.966 1.112-.253 2.107-.253 2.107s2.448-1.263 1.324-2.844c-1.05-1.476-1.856-2.209 2.505-4.732 0 0-6.837 1.708-3.576 5.469z" fill="#f89820"/>`,
  
  'C++': `<rect width="28" height="28" rx="4" fill="#00599C"/><path d="M14 20c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="white"/><path d="M5 14c0-4.97 4.03-9 9-9" stroke="white" stroke-width="2" fill="none"/><g stroke="white" stroke-width="1.5"><line x1="19.5" y1="10.5" x2="19.5" y2="17.5"/><line x1="16" y1="14" x2="23" y2="14"/><line x1="23.5" y1="10.5" x2="23.5" y2="17.5"/><line x1="20" y1="14" x2="27" y2="14"/></g>`,

  HTML5: `<rect width="28" height="28" rx="4" fill="#e34f26"/><polygon points="6,4 7.5,22 14,24 20.5,22 22,4" fill="#e34f26"/><polygon points="14,6 18,6 17.5,18 14,19 10.5,18 10,6" fill="#ef652a"/><polygon points="14,9 16,9 15.8,15 14,15.5 12.2,15 12,13.5 13,13.5 13.1,14 14,14 14.9,14 15,11 12,11 12,9.5 15.1,9.5 15.2,9 14,9" fill="#ffffff"/>`,

  CSS3: `<rect width="28" height="28" rx="4" fill="#1572b6"/><polygon points="6,4 7.5,22 14,24 20.5,22 22,4" fill="#1572b6"/><polygon points="14,6 18,6 17.5,18 14,19 10.5,18 10,6" fill="#33a9dc"/><polygon points="14,9 17,9 16.5,15 14,15.5 11.5,15 11,12.5 12.5,12.5 12.7,14 14,14 15.3,14 15.5,11 11,11 11.2,9 14,9" fill="#ffffff"/>`
};

// Función principal para obtener icono de un lenguaje
async function getLanguageIcon(language) {
  // Intentar obtener de devicon primero
  const deviconIcon = await fetchDeviconIcon(language);
  if (deviconIcon) {
    return deviconIcon;
  }
  
  // Usar fallback si devicon no está disponible
  return FALLBACK_ICONS[language] || createDefaultIcon(language);
}

function createDefaultIcon(language) {
  const colors = ['#007acc', '#f7df1e', '#306998', '#f89820', '#659ad2', '#e94e77'];
  const color = colors[language.length % colors.length];
  
  return `<rect width="28" height="28" rx="4" fill="${color}"/><text x="14" y="14" font-family="sans-serif" font-size="8" fill="white" text-anchor="middle" dominant-baseline="central">${language.slice(0,3).toUpperCase()}</text>`;
}

// Exportar función principal
module.exports = { getLanguageIcon };