const { getLang } = require("./languages");
const { getLanguageIcon } = require("./icons");

/**
 * Generates an SVG card showing top language icons and percentages.
 *
 * @param {Array<{name:string, bytes:number, percentage:number}>} langs
 * @param {object} opts
 * @param {number}  opts.maxLangs   - max languages to show (default 10)
 * @param {string}  opts.theme      - "light" | "dark" (default "dark")
 * @param {string}  opts.title      - Custom card title
 * @returns {Promise<string>} SVG string (ahora es asíncrono)
 */
async function generateSVG(langs, opts = {}) {
  const {
    maxLangs = 10,
    theme = "dark",
    title = "Top Languages",
  } = opts;

  const displayed = langs.slice(0, maxLangs);

  // ── Layout constants optimizado para 10 lenguajes en vertical ─────────────
  const CARD_PADDING = 20;          // Reducido de 24 a 20
  const TITLE_HEIGHT = 36;          // Reducido de 40 a 36  
  const ICON_SIZE = 28;
  const ROW_HEIGHT = 38;            // Reducido de 42 a 38 para más compacto
  const SINGLE_COLUMN_WIDTH = 360;  // Ampliado de 340 a 360 para más espacio
  const CARD_WIDTH = SINGLE_COLUMN_WIDTH + CARD_PADDING * 2;  // 400px total

  // Altura optimizada para exactamente 10 lenguajes
  const CARD_HEIGHT = TITLE_HEIGHT + (displayed.length * ROW_HEIGHT) + CARD_PADDING * 2;

  // ── Colors ────────────────────────────────────────────────────────────────
  const isDark = theme === "dark";
  const BG = isDark ? "#161b22" : "#ffffff";
  const BORDER = isDark ? "#30363d" : "#d0d7de";
  const TEXT_PRIMARY = isDark ? "#e6edf3" : "#1f2328";
  const TEXT_SECONDARY = isDark ? "#8b949e" : "#57606a";
  const BAR_BG = isDark ? "#21262d" : "#f6f8fa";

  /**
   * Renders the icon for a language using authentic devicon SVG icons.
   * Always shows an icon - either specific or fallback with initials.
   */
  async function renderIcon(langInfo, x, y) {
    const iconContent = await getLanguageIcon(langInfo.label);
    // Wrap in a group with proper positioning
    return `
      <g transform="translate(${x}, ${y})">
        <svg width="28" height="28" viewBox="0 0 28 28">
          ${iconContent}
        </svg>
      </g>
    `;
  }

  // ── Bar width helper ──────────────────────────────────────────────────────
  const maxPct = displayed[0]?.percentage || 1;

  async function renderRow(lang, rowIndex) {
    const langInfo = getLang(lang.name);
    // Posición fija para una sola columna
    const x = CARD_PADDING;  // Siempre en la misma X
    const y = TITLE_HEIGHT + (rowIndex * ROW_HEIGHT) + CARD_PADDING;

    // Configuración optimizada para 10 lenguajes en una columna
    const barMaxWidth = SINGLE_COLUMN_WIDTH - ICON_SIZE - 90;  // Más espacio para texto 
    const barWidth = Math.max(4, (lang.percentage / maxPct) * barMaxWidth);
    const iconX = x;
    const iconY = y + (ROW_HEIGHT - ICON_SIZE) / 2 - 3;      // Ajustado para ROW_HEIGHT = 38
    const textX = iconX + ICON_SIZE + 10;                     // Más espacio después del ícono
    const textY = y + ROW_HEIGHT / 2 - 6;                    // Centrado para altura 38
    const percentX = x + SINGLE_COLUMN_WIDTH - 70;           // Más espacio desde el borde

    const iconSvg = await renderIcon(langInfo, iconX, iconY);

    return `
    <g>
      ${iconSvg}
      <text x="${textX}" y="${textY + 3}" font-size="12" font-weight="600" fill="${TEXT_PRIMARY}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">${escapeXml(langInfo.label)}</text>
      <text x="${percentX}" y="${textY + 18}" font-size="10" fill="${TEXT_SECONDARY}" text-anchor="end" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">${lang.percentage}%</text>
      <rect x="${textX}" y="${textY + 22}" width="${barWidth}" height="3" rx="1.5" fill="${langInfo.color}" opacity="0.85"/>
    </g>`;
  }

  // Generar todas las filas en una sola columna vertical
  const rows_svg_promises = displayed.map((lang, i) => 
    renderRow(lang, i) // Solo pasamos rowIndex (i)
  );
  const rows_svg = (await Promise.all(rows_svg_promises)).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">

  <defs>
    <style>
      * { box-sizing: border-box; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="10" ry="10" fill="${BG}" stroke="${BORDER}" stroke-width="1"/>

  <!-- Title -->
  <text x="${CARD_WIDTH / 2}" y="${CARD_PADDING + 12}" text-anchor="middle"
    font-size="16" font-weight="700" fill="${TEXT_PRIMARY}"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    ${escapeXml(title)}
  </text>

  <!-- Language rows -->
  ${rows_svg}
</svg>`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = { generateSVG };
