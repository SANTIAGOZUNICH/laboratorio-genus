/* ============================================================
   GENUS MOCKUPS v3 — Arquitectura de capas estricta
   
   FILL_COLORS: define únicamente el color del CONTENIDO INTERNO.
   Vidrio, reflejos, etiqueta, tapa → siempre igual, nunca cambian.
   ============================================================ */

/* ── FILL COLORS: solo para el contenido interno ── */
const FILL_COLORS = {
  Incoloro: { base:'rgba(225,242,248,0.28)', mid:'rgba(210,235,245,0.18)', edge:'rgba(195,225,240,0.32)', drop:'rgba(210,235,245,0.45)', surface:'rgba(220,240,248,0.22)' },
  Blanco:   { base:'rgba(248,249,252,0.88)', mid:'rgba(238,242,248,0.80)', edge:'rgba(225,232,242,0.72)', drop:'rgba(250,252,255,0.92)', surface:'rgba(252,254,255,0.85)' },
  Rosa:     { base:'rgba(252,182,206,0.82)', mid:'rgba(248,145,185,0.70)', edge:'rgba(240,100,155,0.60)', drop:'rgba(255,200,220,0.90)', surface:'rgba(255,215,230,0.75)' },
  Rojo:     { base:'rgba(225, 72, 82,0.80)', mid:'rgba(200, 48, 58,0.70)', edge:'rgba(170, 25, 35,0.62)', drop:'rgba(240,110,118,0.88)', surface:'rgba(245,130,135,0.72)' },
  Azul:     { base:'rgba( 88,162,235,0.78)', mid:'rgba( 55,128,215,0.68)', edge:'rgba( 30, 95,188,0.60)', drop:'rgba(140,195,248,0.88)', surface:'rgba(158,205,250,0.72)' },
  Amarillo: { base:'rgba(248,215, 42,0.82)', mid:'rgba(232,188,  8,0.72)', edge:'rgba(200,155,  0,0.62)', drop:'rgba(255,235,120,0.90)', surface:'rgba(255,240,140,0.75)' },
  Verde:    { base:'rgba( 65,188, 98,0.78)', mid:'rgba( 38,158, 70,0.68)', edge:'rgba( 18,125, 45,0.60)', drop:'rgba(125,218,148,0.88)', surface:'rgba(148,225,165,0.72)' },
  Lila:     { base:'rgba(172,102,230,0.78)', mid:'rgba(142, 68,208,0.68)', edge:'rgba(108, 38,178,0.60)', drop:'rgba(205,158,242,0.88)', surface:'rgba(218,172,245,0.72)' },
};

/* ============================================================
   SERUM — frasco cuadrado con hombros redondeados y gotero
   Inspirado en el estilo de la imagen de referencia:
   frasco corto, ancho, hombros curvos, tapa plateada + bulbo grande
   ============================================================ */
<!-- SERUM MOCKUP -->
<div class="product-mockup serum-mockup" style="--fill-color: #d8f4ff;">
  <svg viewBox="0 0 260 420" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="130" cy="390" rx="70" ry="12" fill="rgba(0,0,0,.12)"/>

    <!-- Gotero -->
    <rect x="111" y="35" width="38" height="88" rx="20" fill="#fff"/>
    <rect x="100" y="115" width="60" height="52" rx="9" fill="#f7f9fb" stroke="#24465d" stroke-width="5"/>
    <rect x="116" y="165" width="28" height="132" rx="12" fill="rgba(255,255,255,.35)" stroke="#24465d" stroke-width="3"/>

    <!-- Envase vidrio -->
    <rect x="70" y="155" width="120" height="215" rx="35" fill="rgba(255,255,255,.22)" stroke="#24465d" stroke-width="6"/>

    <!-- Líquido editable -->
    <path class="product-fill" d="M75 235 Q130 222 185 235 L185 335 Q185 365 155 365 L105 365 Q75 365 75 335 Z" fill="var(--fill-color)" opacity=".75"/>

    <!-- Línea de líquido -->
    <path d="M75 235 Q130 222 185 235" fill="none" stroke="#24465d" stroke-width="3" opacity=".75"/>

    <!-- Reflejos -->
    <path d="M92 175 C82 215 82 300 92 350" stroke="white" stroke-width="8" opacity=".55" fill="none"/>
    <path d="M170 175 C180 220 180 300 170 350" stroke="white" stroke-width="5" opacity=".35" fill="none"/>

    <!-- Burbujas -->
    <circle cx="105" cy="270" r="4" fill="white" opacity=".75"/>
    <circle cx="150" cy="285" r="3" fill="white" opacity=".7"/>
    <circle cx="120" cy="320" r="3" fill="white" opacity=".65"/>
    <circle cx="162" cy="330" r="4" fill="white" opacity=".55"/>

    <!-- Etiqueta -->
    <rect x="83" y="255" width="94" height="66" rx="3" fill="rgba(255,255,255,.9)" stroke="#24465d" stroke-width="2"/>
    <text x="130" y="285" text-anchor="middle" font-size="24" font-weight="700" fill="#0c2338">SERUM</text>
    <line x1="105" y1="297" x2="155" y2="297" stroke="#24465d" stroke-width="1"/>
    <text x="130" y="315" text-anchor="middle" font-size="13" fill="#0c2338">laboratorio Genus</text>

    <!-- Contorno inferior -->
    <path d="M85 350 Q130 370 175 350" fill="none" stroke="#24465d" stroke-width="3" opacity=".55"/>
  </svg>
</div>
/* ============================================================
   CREMA — pote cilíndrico de vidrio con crema visible encima
   ============================================================ */
function svgCrema(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = size, h = Math.round(size * 0.82);

  return `<svg width="${w}" height="${h}" viewBox="0 0 260 214" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="cr-fill-clip-${size}">
    <rect x="20" y="94" width="220" height="96" rx="8"/>
  </clipPath>
  <clipPath id="cr-cream-clip-${size}">
    <ellipse cx="130" cy="86" rx="104" ry="38"/>
  </clipPath>
  <linearGradient id="cr-glass-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".20"/>
    <stop offset="9%"   stop-color="#2a3f50" stop-opacity=".08"/>
    <stop offset="40%"  stop-color="#ecf6fb" stop-opacity=".04"/>
    <stop offset="72%"  stop-color="#daeef6" stop-opacity=".07"/>
    <stop offset="91%"  stop-color="#1e3040" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#142030" stop-opacity=".22"/>
  </linearGradient>
  <linearGradient id="cr-lid-${size}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%"  stop-color="#f8fafb"/>
    <stop offset="40%" stop-color="#e4edf2"/>
    <stop offset="100%" stop-color="#ccd8e0"/>
  </linearGradient>
  <linearGradient id="cr-lid-rim-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#6a7a84"/>
    <stop offset="20%"  stop-color="#c2d0d8"/>
    <stop offset="48%"  stop-color="#eef4f8"/>
    <stop offset="74%"  stop-color="#b8c8d2"/>
    <stop offset="100%" stop-color="#60707a"/>
  </linearGradient>
  <radialGradient id="cr-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.24)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="130" cy="206" rx="94" ry="10" fill="url(#cr-shadow-${size})"/>

<!-- ══ GLASS LAYER — cuerpo trasero ══ -->
<rect x="20" y="94" width="220" height="96" rx="8"
      fill="rgba(230,248,255,0.05)" stroke="#1e2e3a" stroke-width="2"/>

<!-- ══ FILL LAYER — solo el contenido cambia ══ -->
<!-- CREMA dentro del pote (visible a través del vidrio) -->
<g clip-path="url(#cr-fill-clip-${size})">
  <rect x="20" y="94" width="220" height="96" fill="${c.base}"/>
  <!-- sombra lateral izq -->
  <rect x="20" y="94" width="28" height="96" fill="${c.edge}" opacity=".50"/>
  <!-- sombra lateral der -->
  <rect x="212" y="94" width="28" height="96" fill="${c.edge}" opacity=".32"/>
  <!-- tono base más oscuro en el fondo -->
  <rect x="20" y="165" width="220" height="25" fill="${c.edge}" opacity=".28"/>
</g>
<!-- CREMA ENCIMA del pote (copete, fuera de la clipPath del cuerpo) -->
<g clip-path="url(#cr-cream-clip-${size})">
  <!-- masa base de crema -->
  <ellipse cx="130" cy="92" rx="104" ry="36" fill="${c.base}"/>
  <!-- copete central -->
  <path d="M98,82 Q110,48 130,40 Q150,48 162,82 Q148,72 130,68 Q112,72 98,82 Z" fill="${c.surface}"/>
  <!-- sombra que da volumen al copete -->
  <path d="M72,88 Q98,62 130,56 Q162,62 188,88" fill="none" stroke="${c.edge}" stroke-width="10" stroke-opacity=".28" stroke-linecap="round"/>
  <path d="M88,94 Q112,74 130,68 Q148,74 172,94" fill="none" stroke="${c.edge}" stroke-width="6" stroke-opacity=".20" stroke-linecap="round"/>
  <!-- brillo superficie crema -->
  <ellipse cx="108" cy="54" rx="14" ry="6" fill="white" opacity=".42" transform="rotate(-18,108,54)"/>
  <ellipse cx="148" cy="50" rx="8"  ry="4" fill="white" opacity=".28" transform="rotate(10,148,50)"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<rect x="20" y="94" width="220" height="96" rx="8" fill="url(#cr-glass-${size})"/>
<!-- línea interna izq -->
<line x1="35" y1="96" x2="35" y2="188" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
<!-- línea interna der -->
<line x1="225" y1="96" x2="225" y2="188" stroke="rgba(0,20,40,.06)" stroke-width="2"/>
<!-- escalón vidrio inferior -->
<rect x="20" y="175" width="220" height="4" rx="2" fill="rgba(30,48,62,.10)"/>
<!-- base pote -->
<rect x="22" y="182" width="216" height="8" rx="4" fill="rgba(30,48,62,.20)"/>

<!-- aro superior del pote (platino) -->
<rect x="18" y="86" width="224" height="14" rx="7" fill="url(#cr-lid-rim-${size})"/>
<rect x="20" y="88" width="12"  height="10" rx="5" fill="white" opacity=".28"/>
<rect x="18" y="86" width="224" height="3"  rx="1.5" fill="white" opacity=".22"/>

<!-- ══ REFLECTION LAYER — fijo ══ -->
<rect x="24" y="96" width="12" height="88" rx="6" fill="white" opacity=".44"/>
<rect x="38" y="100" width="4" height="72" rx="2" fill="white" opacity=".18"/>
<rect x="222" y="100" width="8" height="78" rx="4" fill="white" opacity=".18"/>
<ellipse cx="84" cy="90" rx="36" ry="4" fill="white" opacity=".42"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="66" y="110" width="128" height="60" rx="3" fill="white" opacity=".90"/>
<rect x="68" y="112" width="124" height="56" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="130" y="133" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="15" font-weight="300" letter-spacing="4" fill="#1a1a2e">CREMA</text>
<line x1="78" y1="140" x2="182" y2="140" stroke="#aaa" stroke-width=".75"/>
<text x="130" y="152" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="130" y="162" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — tapa blanca, fija ══ -->
<ellipse cx="130" cy="74" rx="112" ry="22" fill="url(#cr-lid-${size})"/>
<ellipse cx="130" cy="70" rx="108" ry="17" fill="#f0f5f8"/>
<ellipse cx="130" cy="66" rx="102" ry="13" fill="white" opacity=".68"/>
<ellipse cx="106" cy="64" rx="24"  ry="7" fill="white" opacity=".52" transform="rotate(-16,106,64)"/>
<ellipse cx="152" cy="60" rx="15"  ry="4.5" fill="white" opacity=".36" transform="rotate(9,152,60)"/>
<rect x="18" y="86" width="224" height="3" rx="1.5" fill="rgba(80,100,112,.20)"/>
</svg>`;
}

/* ============================================================
   SHAMPOO — botella redondeada de vidrio con pump plateado
   ============================================================ */
<!-- SHAMPOO MOCKUP -->
<div class="product-mockup shampoo-mockup" style="--fill-color: #d8f4ff;">
  <svg viewBox="0 0 280 440" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="140" cy="405" rx="78" ry="13" fill="rgba(0,0,0,.12)"/>

    <!-- Pump -->
    <rect x="122" y="42" width="36" height="55" rx="8" fill="#f7f9fb" stroke="#24465d" stroke-width="4"/>
    <rect x="95" y="25" width="90" height="28" rx="8" fill="#f7f9fb" stroke="#24465d" stroke-width="4"/>
    <rect x="106" y="90" width="68" height="48" rx="8" fill="#f7f9fb" stroke="#24465d" stroke-width="5"/>
    <rect x="126" y="135" width="28" height="190" rx="12" fill="rgba(255,255,255,.35)" stroke="#24465d" stroke-width="3"/>

    <!-- Botella vidrio -->
    <rect x="65" y="120" width="150" height="260" rx="34" fill="rgba(255,255,255,.22)" stroke="#24465d" stroke-width="6"/>

    <!-- Líquido editable -->
    <path class="product-fill" d="M70 205 Q140 192 210 205 L210 345 Q210 375 180 375 L100 375 Q70 375 70 345 Z" fill="var(--fill-color)" opacity=".75"/>

    <!-- Línea del contenido -->
    <path d="M70 205 Q140 192 210 205" fill="none" stroke="#24465d" stroke-width="3" opacity=".75"/>

    <!-- Reflejos -->
    <path d="M88 145 C78 205 78 310 90 360" stroke="white" stroke-width="8" opacity=".55" fill="none"/>
    <path d="M195 145 C205 210 205 310 192 360" stroke="white" stroke-width="5" opacity=".35" fill="none"/>

    <!-- Burbujas -->
    <circle cx="105" cy="245" r="4" fill="white" opacity=".75"/>
    <circle cx="160" cy="260" r="3" fill="white" opacity=".7"/>
    <circle cx="125" cy="310" r="3" fill="white" opacity=".65"/>
    <circle cx="178" cy="335" r="4" fill="white" opacity=".55"/>
    <circle cx="145" cy="345" r="3" fill="white" opacity=".65"/>

    <!-- Etiqueta -->
    <rect x="83" y="235" width="114" height="75" rx="3" fill="rgba(255,255,255,.9)" stroke="#24465d" stroke-width="2"/>
    <text x="140" y="267" text-anchor="middle" font-size="24" font-weight="700" fill="#0c2338">SHAMPOO</text>
    <line x1="105" y1="280" x2="175" y2="280" stroke="#24465d" stroke-width="1"/>
    <text x="140" y="300" text-anchor="middle" font-size="13" fill="#0c2338">laboratorio Genus</text>

    <!-- Base -->
    <path d="M82 355 Q140 378 198 355" fill="none" stroke="#24465d" stroke-width="3" opacity=".55"/>
  </svg>
</div>

/* ============================================================
   GEL — pote grande ancho de vidrio transparente
   ============================================================ */
function svgGel(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = size, h = Math.round(size * 0.76);

  return `<svg width="${w}" height="${h}" viewBox="0 0 280 214" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="gl-fill-clip-${size}">
    <rect x="16" y="92" width="248" height="98" rx="10"/>
  </clipPath>
  <clipPath id="gl-gel-clip-${size}">
    <ellipse cx="140" cy="84" rx="120" ry="36"/>
  </clipPath>
  <linearGradient id="gl-glass-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".20"/>
    <stop offset="9%"   stop-color="#26404f" stop-opacity=".08"/>
    <stop offset="42%"  stop-color="#ecf7fb" stop-opacity=".04"/>
    <stop offset="74%"  stop-color="#d8edf5" stop-opacity=".07"/>
    <stop offset="91%"  stop-color="#1c2e3c" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#142030" stop-opacity=".22"/>
  </linearGradient>
  <linearGradient id="gl-lid-${size}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%"  stop-color="#f6f9fb"/>
    <stop offset="40%" stop-color="#e2ecf2"/>
    <stop offset="100%" stop-color="#c8d6e0"/>
  </linearGradient>
  <linearGradient id="gl-lid-rim-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#68787e"/>
    <stop offset="20%"  stop-color="#bcccd4"/>
    <stop offset="48%"  stop-color="#ecf3f7"/>
    <stop offset="74%"  stop-color="#b4c4cc"/>
    <stop offset="100%" stop-color="#5c6c74"/>
  </linearGradient>
  <radialGradient id="gl-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.22)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="140" cy="206" rx="108" ry="10" fill="url(#gl-shadow-${size})"/>

<!-- ══ GLASS LAYER — cuerpo trasero ══ -->
<rect x="16" y="92" width="248" height="98" rx="10"
      fill="rgba(230,248,255,0.05)" stroke="#1e2e3a" stroke-width="2.2"/>

<!-- ══ FILL LAYER — solo el contenido cambia ══ -->
<!-- GEL dentro del pote -->
<g clip-path="url(#gl-fill-clip-${size})">
  <rect x="16" y="92" width="248" height="98" fill="${c.base}"/>
  <rect x="16" y="92" width="32"  height="98" fill="${c.edge}" opacity=".50"/>
  <rect x="232" y="92" width="32" height="98" fill="${c.edge}" opacity=".32"/>
  <rect x="16" y="168" width="248" height="22" fill="${c.edge}" opacity=".24"/>
</g>
<!-- GEL EN LA SUPERFICIE (visible por encima del aro, ondulado) -->
<g clip-path="url(#gl-gel-clip-${size})">
  <ellipse cx="140" cy="90" rx="120" ry="34" fill="${c.base}"/>
  <!-- ondulaciones del gel -->
  <path d="M38,86 Q80,72 140,78 Q200,84 242,74" fill="none" stroke="${c.surface}" stroke-width="7" stroke-opacity=".60" stroke-linecap="round"/>
  <path d="M55,93 Q100,80 140,86 Q180,92 225,80" fill="none" stroke="${c.surface}" stroke-width="4" stroke-opacity=".44" stroke-linecap="round"/>
  <!-- burbujas en la superficie del gel -->
  <circle cx="88"  cy="80" r="4.5" fill="${c.surface}" opacity=".68"/>
  <circle cx="150" cy="76" r="3.2" fill="${c.surface}" opacity=".58"/>
  <circle cx="185" cy="82" r="2.8" fill="${c.surface}" opacity=".52"/>
  <circle cx="115" cy="88" r="2.2" fill="${c.surface}" opacity=".48"/>
  <circle cx="168" cy="88" r="4.0" fill="${c.surface}" opacity=".62"/>
  <!-- brillo gel -->
  <ellipse cx="106" cy="78" rx="24" ry="7" fill="white" opacity=".38" transform="rotate(-10,106,78)"/>
  <ellipse cx="162" cy="73" rx="15" ry="4.5" fill="white" opacity=".28" transform="rotate(7,162,73)"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<rect x="16" y="92" width="248" height="98" rx="10" fill="url(#gl-glass-${size})"/>
<!-- línea interna izq -->
<line x1="34" y1="94" x2="34" y2="188" stroke="rgba(255,255,255,.16)" stroke-width="2"/>
<!-- línea interna der -->
<line x1="246" y1="94" x2="246" y2="188" stroke="rgba(0,20,40,.06)" stroke-width="2"/>
<!-- escalones vidrio -->
<rect x="16" y="150" width="248" height="3" rx="1.5" fill="rgba(30,48,62,.08)"/>
<rect x="16" y="174" width="248" height="3" rx="1.5" fill="rgba(30,48,62,.10)"/>
<!-- base pote -->
<rect x="18" y="182" width="244" height="8" rx="4" fill="rgba(30,48,62,.22)"/>

<!-- aro superior platino -->
<rect x="14" y="82" width="252" height="16" rx="8" fill="url(#gl-lid-rim-${size})"/>
<rect x="16" y="84" width="14"  height="12" rx="6" fill="white" opacity=".28"/>
<rect x="14" y="82" width="252" height="3"  rx="1.5" fill="white" opacity=".20"/>

<!-- ══ REFLECTION LAYER — fijo ══ -->
<rect x="20" y="94" width="16" height="90" rx="8" fill="white" opacity=".42"/>
<rect x="38" y="98" width="5"  height="76" rx="2.5" fill="white" opacity=".18"/>
<rect x="240" y="98" width="10" height="78" rx="5" fill="white" opacity=".16"/>
<ellipse cx="92" cy="87" rx="44" ry="4" fill="white" opacity=".44"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="80" y="108" width="120" height="60" rx="3" fill="white" opacity=".90"/>
<rect x="82" y="110" width="116" height="56" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="140" y="131" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="14" font-weight="300" letter-spacing="4" fill="#1a1a2e">GEL</text>
<line x1="92" y1="138" x2="188" y2="138" stroke="#aaa" stroke-width=".75"/>
<text x="140" y="150" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="140" y="161" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — tapa blanca amplia, fija ══ -->
<ellipse cx="140" cy="68" rx="128" ry="24" fill="url(#gl-lid-${size})"/>
<ellipse cx="140" cy="63" rx="124" ry="19" fill="#eff5f8"/>
<ellipse cx="140" cy="59" rx="118" ry="14" fill="white" opacity=".68"/>
<ellipse cx="114" cy="57" rx="30"  ry="8"  fill="white" opacity=".52" transform="rotate(-15,114,57)"/>
<ellipse cx="162" cy="53" rx="18"  ry="5"  fill="white" opacity=".36" transform="rotate(9,162,53)"/>
<!-- aro inferior tapa -->
<rect x="14" y="82" width="252" height="3" rx="1.5" fill="rgba(75,95,108,.22)"/>
</svg>`;
}

/* ── API pública ── */
window.GENUS_MOCKUP = {
  getSVG(producto, color, size) {
    const s = size || 200;
    const col = color || 'Incoloro';
    switch(producto) {
      case 'Serum':   return svgSerum(col, s);
      case 'Crema':   return svgCrema(col, s);
      case 'Shampoo': return svgShampoo(col, s);
      case 'Gel':     return svgGel(col, s);
      default:        return svgCrema(col, s);
    }
  },
  FILL_COLORS,
};
