// Generates the demo product illustrations in public/images/products/ (run: npm run images).
// Replace any file with a real product photo (same name), or change the `image` path in src/data/products.js.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/images/products/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, Math.round(v + 255 * amt)));
  return "#" + [c(n >> 16), c((n >> 8) & 255), c(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("");
};

const frame = (body, extraDefs = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
<defs>
  <radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f1f1f3"/></radialGradient>
  <radialGradient id="floor" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#1f2937" stop-opacity=".18"/><stop offset="1" stop-color="#1f2937" stop-opacity="0"/></radialGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5e7eb"/><stop offset=".5" stop-color="#9ca3af"/><stop offset="1" stop-color="#d1d5db"/></linearGradient>
  <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eceef1"/></linearGradient>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#111827" flood-opacity=".18"/></filter>
  ${extraDefs}
</defs>
<rect width="600" height="600" fill="url(#bg)"/>
<circle cx="470" cy="120" r="140" fill="#f97316" opacity=".06"/>
<ellipse cx="300" cy="520" rx="210" ry="26" fill="url(#floor)"/>
${body}
</svg>`;

// ---------- Cable coil ----------
function cable(color, label = "90 m") {
  let rings = "";
  for (let i = 0; i < 9; i++) {
    const rx = 200 - i * 9, ry = rx * 0.42, cy = 330 - i * 4;
    rings += `<ellipse cx="300" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${shade(color, -0.12)}" stroke-width="16"/>
      <ellipse cx="300" cy="${cy - 2}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="10"/>
      <ellipse cx="300" cy="${cy - 5}" rx="${rx}" ry="${ry}" fill="none" stroke="${shade(color, 0.28)}" stroke-width="2.5" opacity=".7"/>`;
  }
  return frame(`<g filter="url(#sh)">
    ${rings}
    <ellipse cx="300" cy="300" rx="104" ry="42" fill="#d4d4d8"/><ellipse cx="300" cy="296" rx="96" ry="36" fill="#f4f4f5"/>
    <rect x="236" y="368" width="128" height="44" rx="8" fill="#fff" stroke="#e5e7eb"/>
    <rect x="236" y="368" width="10" height="44" rx="3" fill="#f97316"/>
    <text x="306" y="398" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937" text-anchor="middle">${label}</text>
    <path d="M488 318 C 540 300, 548 250, 520 214" fill="none" stroke="${shade(color, -0.12)}" stroke-width="16" stroke-linecap="round"/>
    <path d="M488 316 C 538 298, 546 250, 518 214" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
    <g stroke="#c2763a" stroke-width="3" stroke-linecap="round"><path d="M514 210 l-8 -26"/><path d="M520 208 l0 -28"/><path d="M526 210 l8 -25"/><path d="M517 209 l-3 -27"/><path d="M523 209 l4 -27"/></g>
  </g>`);
}

function twinCable() {
  return frame(`<g filter="url(#sh)">
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => { const rx = 190 - i * 10, ry = rx * 0.42, cy = 332 - i * 5; return `<ellipse cx="300" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#cbd5e1" stroke-width="22"/><ellipse cx="300" cy="${cy - 3}" rx="${rx}" ry="${ry}" fill="none" stroke="#f8fafc" stroke-width="14"/>`; }).join("")}
    <ellipse cx="300" cy="300" rx="100" ry="40" fill="#e4e4e7"/>
    <path d="M470 320 C 520 300, 530 250, 500 210" fill="none" stroke="#cbd5e1" stroke-width="24" stroke-linecap="round"/>
    <path d="M470 318 C 518 298, 528 250, 498 210" fill="none" stroke="#f8fafc" stroke-width="16" stroke-linecap="round"/>
    <path d="M492 206 l-14 -30" stroke="#dc2626" stroke-width="9" stroke-linecap="round"/><path d="M504 204 l10 -32" stroke="#111827" stroke-width="9" stroke-linecap="round"/>
    <g stroke="#c2763a" stroke-width="3"><path d="M476 174 l-5 -14"/><path d="M516 170 l4 -14"/></g>
  </g>`);
}

// ---------- Fans ----------
function blade(angle, color, len = 210, w = 46) {
  return `<g transform="rotate(${angle} 300 300)">
    <path d="M300 300 L ${300 - w / 2} ${300 - 50} Q ${300 - w * 0.75} ${300 - len} 300 ${300 - len - 12} Q ${300 + w * 0.75} ${300 - len} ${300 + w / 2} ${300 - 50} Z" fill="${color}" stroke="${shade(color, -0.22)}" stroke-width="3"/>
    <path d="M300 ${300 - 60} L 300 ${300 - len}" stroke="${shade(color, 0.18)}" stroke-width="3" opacity=".6"/>
    <rect x="${300 - 10}" y="${300 - 70}" width="20" height="40" rx="4" fill="#9ca3af"/>
  </g>`;
}
function ceilingFan(bladeColor, hub = "#f8fafc", trim = null) {
  return frame(`<g filter="url(#sh)">
    ${[0, 120, 240].map((a) => blade(a, bladeColor)).join("")}
    <circle cx="300" cy="300" r="70" fill="${hub}" stroke="#d4d4d8" stroke-width="3"/>
    ${trim ? `<circle cx="300" cy="300" r="70" fill="none" stroke="${trim}" stroke-width="8"/><circle cx="300" cy="300" r="44" fill="none" stroke="${trim}" stroke-width="4"/>` : ""}
    <circle cx="300" cy="300" r="34" fill="${shade(hub, -0.06)}"/>
    <circle cx="300" cy="300" r="12" fill="${trim || "#9ca3af"}"/>
  </g>`);
}
function bracketFan() {
  const spokes = Array.from({ length: 24 }, (_, i) => { const a = (i * Math.PI) / 12; return `<line x1="${300 + 40 * Math.cos(a)}" y1="${270 + 40 * Math.sin(a)}" x2="${300 + 170 * Math.cos(a)}" y2="${270 + 170 * Math.sin(a)}" stroke="#9ca3af" stroke-width="2.5"/>`; }).join("");
  return frame(`<g filter="url(#sh)">
    <path d="M300 440 L 300 500" stroke="#4b5563" stroke-width="22" stroke-linecap="round"/>
    <rect x="236" y="486" width="128" height="22" rx="8" fill="#374151"/>
    <rect x="270" y="416" width="60" height="40" rx="10" fill="#4b5563"/>
    <circle cx="300" cy="270" r="176" fill="#f8fafc" opacity=".55"/>
    <g transform="translate(0 -30)">${[0, 120, 240].map((a) => blade(a + 20, "#38bdf8", 150, 70)).join("")}</g>
    ${spokes}
    <circle cx="300" cy="270" r="176" fill="none" stroke="#6b7280" stroke-width="8"/>
    <circle cx="300" cy="270" r="120" fill="none" stroke="#9ca3af" stroke-width="2.5"/>
    <circle cx="300" cy="270" r="44" fill="#f97316"/><circle cx="300" cy="270" r="20" fill="#fff" opacity=".9"/>
  </g>`);
}
function exhaustFan() {
  const louvres = Array.from({ length: 7 }, (_, i) => `<line x1="152" y1="${170 + i * 44}" x2="448" y2="${170 + i * 44}" stroke="#d1d5db" stroke-width="3"/>`).join("");
  return frame(`<g filter="url(#sh)">
    <rect x="120" y="120" width="360" height="360" rx="36" fill="url(#plate)" stroke="#d4d4d8" stroke-width="3"/>
    <circle cx="300" cy="300" r="148" fill="#e5e7eb"/>
    ${[0, 72, 144, 216, 288].map((a) => `<g transform="rotate(${a} 300 300)"><path d="M300 300 C 260 240, 280 175, 320 165 C 340 210, 330 260, 300 300 Z" fill="#9ca3af"/></g>`).join("")}
    <circle cx="300" cy="300" r="30" fill="#6b7280"/>
    ${louvres}
    <circle cx="300" cy="300" r="148" fill="none" stroke="#9ca3af" stroke-width="6"/>
  </g>`);
}

// ---------- Lighting ----------
function bulb(warm) {
  const glow = warm ? "#fbbf24" : "#7dd3fc";
  return frame(`<g filter="url(#sh)">
    <circle cx="300" cy="230" r="200" fill="url(#glow)"/>
    <path d="M300 92 C 400 92 452 160 452 238 C 452 300 410 336 388 372 L 212 372 C 190 336 148 300 148 238 C 148 160 200 92 300 92 Z" fill="url(#glass)" stroke="#e5e7eb" stroke-width="3"/>
    <ellipse cx="248" cy="178" rx="34" ry="56" fill="#fff" opacity=".7" transform="rotate(-24 248 178)"/>
    <rect x="212" y="372" width="176" height="34" rx="8" fill="#f4f4f5" stroke="#d4d4d8" stroke-width="2"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${222 + i * 3}" y="${410 + i * 24}" width="${156 - i * 6}" height="18" rx="9" fill="url(#metal)"/>`).join("")}
    <path d="M262 506 Q 300 530 338 506 L 330 520 Q 300 538 270 520 Z" fill="#4b5563"/>
  </g>`, `<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${glow}" stop-opacity=".55"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
     <radialGradient id="glass" cx="50%" cy="40%" r="65%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="${warm ? "#fff7e0" : "#f0f9ff"}"/><stop offset="1" stop-color="${warm ? "#fde68a" : "#bae6fd"}"/></radialGradient>`);
}
function smd(shape, mode = "cool") {
  const glow = mode === "warm" ? "#fbbf24" : "#7dd3fc";
  const inner = shape === "round"
    ? `<ellipse cx="300" cy="312" rx="200" ry="200" fill="#d4d4d8"/><ellipse cx="300" cy="300" rx="200" ry="200" fill="#ffffff" stroke="#e5e7eb" stroke-width="4"/><ellipse cx="300" cy="300" rx="176" ry="176" fill="url(#panel)"/>`
    : shape === "surface"
      ? `<rect x="104" y="160" width="392" height="300" rx="60" fill="#d4d4d8"/><ellipse cx="300" cy="160" rx="196" ry="70" fill="#f4f4f5" stroke="#e5e7eb" stroke-width="4"/><ellipse cx="300" cy="160" rx="170" ry="56" fill="url(#panel)"/><rect x="104" y="160" width="392" height="230" fill="#f8fafc"/><ellipse cx="300" cy="390" rx="196" ry="70" fill="#e5e7eb"/>`
      : `<rect x="112" y="124" width="376" height="376" rx="26" fill="#d4d4d8"/><rect x="112" y="112" width="376" height="376" rx="26" fill="#ffffff" stroke="#e5e7eb" stroke-width="4"/><rect x="136" y="136" width="328" height="328" rx="14" fill="url(#panel)"/>`;
  const tri = mode === "3color"
    ? `<path d="M300 300 L 300 124 A 176 176 0 0 1 452 388 Z" fill="#7dd3fc" opacity=".55"/><path d="M300 300 L 452 388 A 176 176 0 0 1 148 388 Z" fill="#fef3c7" opacity=".75"/><path d="M300 300 L 148 388 A 176 176 0 0 1 300 124 Z" fill="#fbbf24" opacity=".45"/>`
    : "";
  return frame(`<circle cx="300" cy="300" r="250" fill="url(#halo)"/><g filter="url(#sh)">${inner}${tri}</g>`,
    `<radialGradient id="panel" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="${mode === "warm" ? "#fffbeb" : "#f0f9ff"}"/><stop offset="1" stop-color="${mode === "warm" ? "#fde68a" : "#bae6fd"}"/></radialGradient>
     <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${glow}" stop-opacity=".35"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>`);
}

// ---------- Switch boards ----------
function rocker(x, y, w = 62, h = 96) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="#d4d4d8" stroke-width="2.5"/>
    <rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h / 2 - 4}" rx="7" fill="#f4f4f5"/>
    <rect x="${x + w / 2 - 6}" y="${y + h - 20}" width="12" height="5" rx="2.5" fill="#f97316"/></g>`;
}
function socket(x, y) {
  return `<g><rect x="${x}" y="${y}" width="120" height="110" rx="14" fill="#ffffff" stroke="#d4d4d8" stroke-width="2.5"/>
    <rect x="${x + 52}" y="${y + 18}" width="16" height="30" rx="3" fill="#374151"/>
    <rect x="${x + 22}" y="${y + 62}" width="28" height="14" rx="3" fill="#374151"/><rect x="${x + 70}" y="${y + 62}" width="28" height="14" rx="3" fill="#374151"/></g>`;
}
function switchPlate(n, withSocket = false) {
  const gap = 18, w = 62;
  const switchesW = n * w + (n - 1) * gap;
  const innerW = switchesW + (withSocket ? 120 + 32 : 0);
  const plateW = Math.max(200, innerW + 76), plateH = 200;
  const x0 = 300 - plateW / 2, y0 = 300 - plateH / 2;
  let x = 300 - innerW / 2;
  let parts = "";
  for (let i = 0; i < n; i++) parts += rocker(x + i * (w + gap), y0 + 52);
  if (withSocket) parts += socket(x + switchesW + 32, y0 + 45);
  const scale = Math.min(1.45, 520 / plateW); // fill the picture, however many switches
  return frame(`<g filter="url(#sh)" transform="translate(300 300) scale(${scale.toFixed(3)}) translate(-300 -300)">
    <rect x="${x0}" y="${y0}" width="${plateW}" height="${plateH}" rx="26" fill="url(#plate)" stroke="#d4d4d8" stroke-width="3"/>
    <rect x="${x0 + 14}" y="${y0 + 14}" width="${plateW - 28}" height="${plateH - 28}" rx="16" fill="none" stroke="#e5e7eb" stroke-width="2"/>
    <circle cx="${x0 + 26}" cy="300" r="5" fill="#d4d4d8"/><circle cx="${x0 + plateW - 26}" cy="300" r="5" fill="#d4d4d8"/>
    ${parts}
  </g>`);
}

// ---------- Accessories ----------
function mcb() {
  return frame(`<g filter="url(#sh)">
    <rect x="200" y="110" width="200" height="380" rx="18" fill="url(#plate)" stroke="#d4d4d8" stroke-width="3"/>
    <rect x="200" y="250" width="200" height="100" fill="#e5e7eb"/>
    <rect x="262" y="214" width="76" height="120" rx="12" fill="#1f2937"/>
    <rect x="272" y="222" width="56" height="52" rx="8" fill="#f97316"/>
    <rect x="232" y="140" width="136" height="40" rx="6" fill="#f4f4f5" stroke="#e5e7eb"/>
    <text x="300" y="168" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937" text-anchor="middle">C 32</text>
    <rect x="232" y="380" width="136" height="12" rx="6" fill="#d4d4d8"/><rect x="232" y="404" width="96" height="12" rx="6" fill="#d4d4d8"/>
    <circle cx="300" cy="460" r="12" fill="#9ca3af"/>
  </g>`);
}
function extension() {
  return frame(`<g filter="url(#sh)">
    <path d="M110 380 C 60 400, 60 470, 130 480 S 230 500, 200 540" fill="none" stroke="#1f2937" stroke-width="12" stroke-linecap="round"/>
    <rect x="110" y="250" width="400" height="140" rx="30" fill="url(#plate)" stroke="#d4d4d8" stroke-width="3"/>
    ${[0, 1, 2].map((i) => `<g transform="translate(${150 + i * 96} 278)"><rect width="78" height="84" rx="14" fill="#f4f4f5" stroke="#e5e7eb" stroke-width="2"/><rect x="33" y="14" width="12" height="22" rx="2" fill="#374151"/><rect x="14" y="50" width="20" height="10" rx="2" fill="#374151"/><rect x="44" y="50" width="20" height="10" rx="2" fill="#374151"/></g>`).join("")}
    <rect x="446" y="292" width="44" height="58" rx="10" fill="#dc2626"/><rect x="452" y="298" width="32" height="22" rx="6" fill="#f87171"/>
  </g>`);
}
function tester() {
  return frame(`<g filter="url(#sh)" transform="rotate(-35 300 300)">
    <rect x="120" y="270" width="230" height="60" rx="26" fill="#f97316" opacity=".9"/>
    <rect x="150" y="284" width="150" height="32" rx="14" fill="#fed7aa"/>
    <rect x="200" y="290" width="40" height="20" rx="8" fill="#ef4444"/>
    <rect x="96" y="286" width="30" height="28" rx="8" fill="#1f2937"/>
    <rect x="350" y="290" width="170" height="20" rx="4" fill="url(#metal)"/>
    <path d="M520 290 L 548 300 L 520 310 Z" fill="#9ca3af"/>
  </g>`);
}
function tape() {
  const roll = (cx, cy, color) => `<g><ellipse cx="${cx}" cy="${cy + 26}" rx="92" ry="40" fill="${shade(color, -0.18)}"/><rect x="${cx - 92}" y="${cy}" width="184" height="26" fill="${shade(color, -0.1)}"/><ellipse cx="${cx}" cy="${cy}" rx="92" ry="40" fill="${color}"/><ellipse cx="${cx}" cy="${cy}" rx="44" ry="19" fill="#e5e7eb"/><ellipse cx="${cx}" cy="${cy - 2}" rx="36" ry="14" fill="#f8fafc"/></g>`;
  return frame(`<g filter="url(#sh)">${roll(300, 380, "#1f2937")}${roll(220, 300, "#dc2626")}${roll(380, 300, "#2563eb")}${roll(300, 220, "#facc15")}</g>`);
}
function holder() {
  return frame(`<g filter="url(#sh)">
    <ellipse cx="300" cy="440" rx="140" ry="40" fill="#e5e7eb"/><rect x="160" y="400" width="280" height="40" fill="#f4f4f5"/><ellipse cx="300" cy="400" rx="140" ry="40" fill="#ffffff" stroke="#e5e7eb" stroke-width="3"/>
    <rect x="220" y="200" width="160" height="200" rx="20" fill="url(#plate)" stroke="#d4d4d8" stroke-width="3"/>
    <ellipse cx="300" cy="200" rx="80" ry="26" fill="#f4f4f5" stroke="#d4d4d8" stroke-width="3"/><ellipse cx="300" cy="200" rx="54" ry="16" fill="#9ca3af"/>
    ${[0, 1, 2].map((i) => `<rect x="232" y="${240 + i * 34}" width="136" height="8" rx="4" fill="#e5e7eb"/>`).join("")}
  </g>`);
}
function dbBox() {
  return frame(`<g filter="url(#sh)">
    <rect x="110" y="130" width="380" height="340" rx="22" fill="#e5e7eb" stroke="#9ca3af" stroke-width="4"/>
    <rect x="140" y="160" width="320" height="280" rx="14" fill="#f8fafc" stroke="#d4d4d8" stroke-width="3"/>
    <rect x="164" y="240" width="272" height="120" rx="10" fill="#1f2937"/>
    ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${178 + i * 42} 254)"><rect width="34" height="92" rx="6" fill="#ffffff"/><rect x="9" y="30" width="16" height="26" rx="3" fill="${i === 0 ? "#dc2626" : "#f97316"}"/></g>`).join("")}
    <rect x="452" y="270" width="16" height="60" rx="6" fill="#9ca3af"/>
  </g>`);
}

const files = {
  "cable-red.svg": cable("#dc2626"),
  "cable-black.svg": cable("#27272a"),
  "cable-yellow.svg": cable("#eab308"),
  "cable-blue.svg": cable("#2563eb"),
  "cable-green.svg": cable("#16a34a"),
  "cable-twin.svg": twinCable(),
  "fan-ceiling-white.svg": ceilingFan("#e2e8f0"),
  "fan-ceiling-brown.svg": ceilingFan("#7c4a2d", "#f5efe6"),
  "fan-royal.svg": ceilingFan("#8b5e34", "#3f2a1d", "#d4a017"),
  "fan-bracket.svg": bracketFan(),
  "fan-exhaust.svg": exhaustFan(),
  "bulb-cool.svg": bulb(false),
  "bulb-warm.svg": bulb(true),
  "smd-round.svg": smd("round"),
  "smd-round-warm.svg": smd("round", "warm"),
  "smd-square.svg": smd("square"),
  "smd-surface.svg": smd("surface"),
  "smd-3color.svg": smd("round", "3color"),
  "switch-1.svg": switchPlate(1),
  "switch-2.svg": switchPlate(2),
  "switch-3.svg": switchPlate(3),
  "switch-4.svg": switchPlate(4),
  "switch-1-socket.svg": switchPlate(1, true),
  "switch-2-socket.svg": switchPlate(2, true),
  "switch-4-socket.svg": switchPlate(4, true),
  "acc-mcb.svg": mcb(),
  "acc-extension.svg": extension(),
  "acc-tester.svg": tester(),
  "acc-tape.svg": tape(),
  "acc-holder.svg": holder(),
  "acc-dbbox.svg": dbBox(),
};
for (const [name, svg] of Object.entries(files)) writeFileSync(new URL(name, OUT), svg);
console.log(`Wrote ${Object.keys(files).length} images to public/images/products/`);
