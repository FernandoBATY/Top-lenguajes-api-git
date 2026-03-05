const { getLang } = require("./languages");

/**
 * Generates an SVG card showing top language icons and percentages.
 *
 * @param {Array<{name:string, bytes:number, percentage:number}>} langs
 * @param {object} opts
 * @param {number}  opts.maxLangs   - max languages to show (default 10)
 * @param {string}  opts.theme      - "light" | "dark" (default "dark")
 * @param {string}  opts.title      - Custom card title
 * @returns {string} SVG string
 */
function generateSVG(langs, opts = {}) {
  const {
    maxLangs = 10,
    theme = "dark",
    title = "Top Languages",
  } = opts;

  const displayed = langs.slice(0, maxLangs);

  // ── Layout constants ──────────────────────────────────────────────────────
  const CARD_PADDING = 24;
  const TITLE_HEIGHT = 40;
  const ICON_SIZE = 28; // circle diameter
  const ROW_HEIGHT = 42;
  const COLS = 2;
  const COL_WIDTH = 240;
  const CARD_WIDTH = COLS * COL_WIDTH + CARD_PADDING * 2;

  const rows = Math.ceil(displayed.length / COLS);
  const CARD_HEIGHT = TITLE_HEIGHT + rows * ROW_HEIGHT + CARD_PADDING * 2;

  // ── Colors ────────────────────────────────────────────────────────────────
  const isDark = theme === "dark";
  const BG = isDark ? "#0d1117" : "#ffffff";
  const BORDER = isDark ? "#30363d" : "#d0d7de";
  const TEXT_PRIMARY = isDark ? "#e6edf3" : "#1f2328";
  const TEXT_SECONDARY = isDark ? "#8b949e" : "#57606a";

  // ── Devicon CDN URL for language icons ────────────────────────────────────
  const DEVICON_BASE =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

  /**
   * Renders the icon for a language.
   * Falls back to a colored circle with the first letter if no devicon exists.
   */
  function renderIcon(langInfo, x, y) {
    if (langInfo.icon && langInfo.icon !== "assembly") {
      // Try "plain" variant first, some only have "original"
      return `<image href="${DEVICON_BASE}/${langInfo.icon}/${langInfo.icon}-plain.svg" x="${x}" y="${y}" width="${ICON_SIZE}" height="${ICON_SIZE}" onerror="this.style.display='none'"/>`;
    }
    // Fallback: colored circle + letter
    const initials = langInfo.label.slice(0, 2).toUpperCase();
    return `
      <circle cx="${x + ICON_SIZE / 2}" cy="${y + ICON_SIZE / 2}" r="${ICON_SIZE / 2}" fill="${langInfo.color}"/>
      <text x="${x + ICON_SIZE / 2}" y="${y + ICON_SIZE / 2 + 5}" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">${initials}</text>`;
  }

  // ── Bar width helper ──────────────────────────────────────────────────────
  const maxPct = displayed[0]?.percentage || 1;

  function renderRow(lang, colIndex, rowIndex) {
    const langInfo = getLang(lang.name);
    const x = CARD_PADDING + colIndex * COL_WIDTH;
    const y = TITLE_HEIGHT + rowIndex * ROW_HEIGHT + CARD_PADDING;

    const barMaxWidth = COL_WIDTH - ICON_SIZE - 20;
    const barWidth = Math.max(4, (lang.percentage / maxPct) * barMaxWidth);
    const iconX = x;
    const iconY = y + (ROW_HEIGHT - ICON_SIZE) / 2 - 4;
    const textX = iconX + ICON_SIZE + 8;
    const textY = y + ROW_HEIGHT / 2 - 8;

    return `
    <g>
      ${renderIcon(langInfo, iconX, iconY)}
      <text x="${textX}" y="${textY + 4}" font-size="13" font-weight="600" fill="${TEXT_PRIMARY}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">${escapeXml(langInfo.label)}</text>
      <text x="${textX + barWidth + 6}" y="${textY + 20}" font-size="11" fill="${TEXT_SECONDARY}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">${lang.percentage}%</text>
      <rect x="${textX}" y="${textY + 24}" width="${barWidth}" height="4" rx="2" fill="${langInfo.color}" opacity="0.85"/>
    </g>`;
  }

  const rows_svg = displayed
    .map((lang, i) => renderRow(lang, i % COLS, Math.floor(i / COLS)))
    .join("\n");

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
