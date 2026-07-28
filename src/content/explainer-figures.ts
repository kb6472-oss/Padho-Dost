// Hand-authored, build-time-validated SVG diagrams for explainers.
//
// The explainer corpus is rich text (analogy boxes, tables, worked examples) but
// had ZERO actual diagrams — students reported "the visual explainers don't have
// any visuals". These figures fill that gap for the highest-value topics where a
// picture genuinely teaches faster than prose (a right triangle, a parabola, a
// labelled cell, a DI bar+pie).
//
// Keyed by explainer slug. getExplainer() (in ./explainers) splices each figure
// in after the Nth heading block, so placement survives content edits.
//
// Rules for every SVG here:
//  • self-contained: no <script>, no external <image>/href, no remote fonts.
//  • responsive: viewBox only, NO fixed width/height (ExplainerReader scales it).
//  • legible on the white plate the reader renders them on (dark strokes/labels).

export type ExplainerFigure = {
  svg: string;
  caption?: string;
  // Insert after the Nth heading block (1-based). Defaults to 1 (the first heading).
  afterHeading?: number;
};

const S = "http://www.w3.org/2000/svg";

export const explainerFigures: Record<string, ExplainerFigure[]> = {
  "real-numbers-basics": [
    {
      afterHeading: 1,
      caption: "The number family — each set sits inside the next, and irrationals fill the rest of the real line.",
      svg: `<svg viewBox="0 0 420 300" xmlns="${S}" role="img" aria-label="Nested sets of the real number system">
        <rect x="8" y="8" width="404" height="284" rx="14" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/>
        <text x="20" y="30" font-family="sans-serif" font-size="14" font-weight="700" fill="#4338ca">Real numbers (ℝ)</text>
        <rect x="286" y="46" width="116" height="236" rx="10" fill="#fef2f2" stroke="#e11d48" stroke-width="1.5"/>
        <text x="344" y="66" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#be123c">Irrational</text>
        <text x="344" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9f1239">√2, π, e</text>
        <text x="344" y="170" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9f1239">0.1011…</text>
        <rect x="22" y="46" width="250" height="236" rx="10" fill="#ffffff" stroke="#0ea5e9" stroke-width="1.5"/>
        <text x="34" y="64" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1">Rational (ℚ) = p/q</text>
        <rect x="34" y="76" width="226" height="194" rx="9" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
        <text x="46" y="94" font-family="sans-serif" font-size="12" font-weight="700" fill="#0f766e">Integers (ℤ) …−2, −1</text>
        <rect x="46" y="106" width="202" height="152" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.5"/>
        <text x="58" y="124" font-family="sans-serif" font-size="12" font-weight="700" fill="#15803d">Whole (𝕎) 0, 1, 2…</text>
        <rect x="58" y="136" width="178" height="110" rx="7" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="70" y="154" font-family="sans-serif" font-size="12" font-weight="700" fill="#b45309">Natural (ℕ)</text>
        <text x="147" y="200" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#92400e">1, 2, 3, 4 …</text>
      </svg>`,
    },
  ],

  "cell-basics": [
    {
      afterHeading: 1,
      caption: "A typical animal cell with its main labelled parts.",
      svg: `<svg viewBox="0 0 420 300" xmlns="${S}" role="img" aria-label="Labelled animal cell">
        <ellipse cx="200" cy="155" rx="150" ry="105" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5"/>
        <circle cx="195" cy="155" r="48" fill="#c7d2fe" stroke="#4338ca" stroke-width="2"/>
        <circle cx="205" cy="150" r="14" fill="#4338ca"/>
        <ellipse cx="112" cy="112" rx="30" ry="15" fill="#fecaca" stroke="#dc2626" stroke-width="1.8" transform="rotate(-20 112 112)"/>
        <circle cx="298" cy="205" r="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
        <g font-family="sans-serif" font-size="12.5" fill="#1e293b">
          <line x1="330" y1="88" x2="300" y2="120" stroke="#64748b" stroke-width="1"/>
          <text x="332" y="84">Cell membrane</text>
          <line x1="243" y1="150" x2="284" y2="118" stroke="#64748b" stroke-width="1"/>
          <text x="288" y="116">Nucleus</text>
          <line x1="96" y1="106" x2="52" y2="78" stroke="#64748b" stroke-width="1"/>
          <text x="6" y="74">Mitochondria</text>
          <line x1="298" y1="205" x2="352" y2="212" stroke="#64748b" stroke-width="1"/>
          <text x="330" y="234">Vacuole</text>
          <line x1="150" y1="214" x2="96" y2="246" stroke="#64748b" stroke-width="1"/>
          <text x="34" y="262">Cytoplasm</text>
        </g>
      </svg>`,
    },
  ],

  "trigonometry-basics": [
    {
      afterHeading: 1,
      caption: "Name the sides relative to angle θ, then SOH-CAH-TOA gives every ratio.",
      svg: `<svg viewBox="0 0 420 285" xmlns="${S}" role="img" aria-label="Right triangle labelled opposite, adjacent, hypotenuse">
        <polygon points="50,215 330,215 330,55" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5"/>
        <path d="M330,215 L310,215 L310,195 L330,195 Z" fill="none" stroke="#4f46e5" stroke-width="2"/>
        <path d="M94,215 A44,44 0 0 0 84,190" fill="none" stroke="#e11d48" stroke-width="2"/>
        <text x="99" y="206" font-family="sans-serif" font-size="15" font-weight="700" fill="#be123c">θ</text>
        <text x="190" y="235" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#1e293b">Adjacent</text>
        <text x="340" y="140" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f766e">Opposite</text>
        <text x="188" y="128" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#b45309" transform="rotate(-30 188 128)">Hypotenuse</text>
        <g font-family="sans-serif" font-size="11.5" fill="#334155">
          <text x="26" y="262">sin θ = Opp/Hyp</text>
          <text x="164" y="262">cos θ = Adj/Hyp</text>
          <text x="302" y="262">tan θ = Opp/Adj</text>
        </g>
      </svg>`,
    },
  ],

  "quadratic-equations-explained": [
    {
      afterHeading: 1,
      caption: "The graph of a quadratic is a parabola; its roots α, β are where it meets the x-axis.",
      svg: `<svg viewBox="0 0 420 300" xmlns="${S}" role="img" aria-label="Parabola of a quadratic with two real roots">
        <line x1="30" y1="200" x2="400" y2="200" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="210" y1="30" x2="210" y2="270" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="390" y="216" font-family="sans-serif" font-size="12" fill="#64748b">x</text>
        <text x="218" y="42" font-family="sans-serif" font-size="12" fill="#64748b">y</text>
        <path d="M70,60 Q210,440 350,60" fill="none" stroke="#4f46e5" stroke-width="3"/>
        <circle cx="138" cy="200" r="4.5" fill="#e11d48"/>
        <circle cx="282" cy="200" r="4.5" fill="#e11d48"/>
        <text x="124" y="192" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">α</text>
        <text x="286" y="192" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">β</text>
        <circle cx="210" cy="250" r="4" fill="#0d9488"/>
        <text x="220" y="256" font-family="sans-serif" font-size="11.5" fill="#0f766e">vertex</text>
        <text x="116" y="42" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">y = ax² + bx + c</text>
        <text x="210" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#334155">D&gt;0: two roots · D=0: one root · D&lt;0: none</text>
      </svg>`,
    },
  ],

  "circles-explained": [
    {
      afterHeading: 1,
      caption: "A tangent touches the circle at exactly one point P and is perpendicular to the radius OP.",
      svg: `<svg viewBox="0 0 400 300" xmlns="${S}" role="img" aria-label="Circle with radius and tangent perpendicular at point P">
        <circle cx="170" cy="150" r="95" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5"/>
        <line x1="170" y1="150" x2="265" y2="150" stroke="#0d9488" stroke-width="2.5"/>
        <circle cx="170" cy="150" r="4" fill="#1e293b"/>
        <text x="150" y="145" font-family="sans-serif" font-size="14" font-weight="700" fill="#1e293b">O</text>
        <text x="200" y="142" font-family="sans-serif" font-size="12.5" fill="#0f766e">radius</text>
        <circle cx="265" cy="150" r="4.5" fill="#e11d48"/>
        <text x="272" y="146" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">P</text>
        <line x1="265" y1="55" x2="265" y2="245" stroke="#b45309" stroke-width="2.5"/>
        <text x="276" y="70" font-family="sans-serif" font-size="12.5" fill="#b45309">tangent</text>
        <path d="M265,170 L247,170 L247,150" fill="none" stroke="#334155" stroke-width="1.8"/>
      </svg>`,
    },
  ],

  "electricity-explained": [
    {
      afterHeading: 1,
      caption: "A simple series circuit: a cell drives current through a resistor R and a bulb.",
      svg: `<svg viewBox="0 0 400 260" xmlns="${S}" role="img" aria-label="Simple series circuit with cell, resistor and bulb">
        <path d="M70,60 L158,60 M242,60 L330,60 L330,200 L70,200 L70,158 M70,132 L70,60" fill="none" stroke="#334155" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M158,60 L167,48 L179,72 L191,48 L203,72 L215,48 L227,72 L235,60 L242,60" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="196" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#b45309">R</text>
        <line x1="52" y1="132" x2="88" y2="132" stroke="#4f46e5" stroke-width="3"/>
        <line x1="63" y1="158" x2="77" y2="158" stroke="#4f46e5" stroke-width="6"/>
        <text x="18" y="150" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#4f46e5">Cell</text>
        <circle cx="200" cy="200" r="18" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>
        <path d="M188,188 L212,212 M212,188 L188,212" stroke="#ca8a04" stroke-width="2"/>
        <text x="200" y="240" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#a16207">Bulb</text>
        <path d="M150,193 L164,200 L150,207 Z" fill="#4f46e5"/>
        <text x="118" y="190" font-family="sans-serif" font-size="12" fill="#4f46e5">I</text>
      </svg>`,
    },
  ],

  "mensuration-explained": [
    {
      afterHeading: 1,
      caption: "The three shapes behind most area questions — with their formulas.",
      svg: `<svg viewBox="0 0 440 205" xmlns="${S}" role="img" aria-label="Rectangle, triangle and circle with area formulas">
        <rect x="25" y="52" width="105" height="72" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/>
        <text x="77" y="140" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#1e293b">l</text>
        <text x="15" y="92" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#1e293b">b</text>
        <text x="77" y="172" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#4338ca">Area = l × b</text>
        <polygon points="175,124 285,124 240,55" fill="#ecfdf5" stroke="#16a34a" stroke-width="2.2"/>
        <line x1="240" y1="55" x2="240" y2="124" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="5 4"/>
        <text x="248" y="96" font-family="sans-serif" font-size="12" fill="#166534">h</text>
        <text x="230" y="140" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#1e293b">b</text>
        <text x="230" y="172" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#15803d">Area = ½ × b × h</text>
        <circle cx="375" cy="90" r="46" fill="#fffbeb" stroke="#d97706" stroke-width="2.2"/>
        <line x1="375" y1="90" x2="421" y2="90" stroke="#d97706" stroke-width="2"/>
        <circle cx="375" cy="90" r="3" fill="#78350f"/>
        <text x="398" y="83" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#92400e">r</text>
        <text x="375" y="172" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#b45309">Area = π r²</text>
      </svg>`,
    },
  ],

  "syllogism-explained": [
    {
      afterHeading: 1,
      caption: "Draw the statement as circles: 'All' nests one inside the other, 'Some' overlaps them.",
      svg: `<svg viewBox="0 0 420 240" xmlns="${S}" role="img" aria-label="Venn diagrams for All A are B and Some A are B">
        <text x="108" y="26" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">All A are B</text>
        <circle cx="108" cy="135" r="80" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/>
        <text x="108" y="72" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#4338ca">B</text>
        <circle cx="104" cy="155" r="40" fill="#c7d2fe" stroke="#4338ca" stroke-width="2"/>
        <text x="104" y="160" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#312e81">A</text>
        <line x1="212" y1="34" x2="212" y2="210" stroke="#e2e8f0" stroke-width="1.5"/>
        <text x="318" y="26" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">Some A are B</text>
        <circle cx="290" cy="140" r="58" fill="#ecfdf5" stroke="#16a34a" stroke-width="2.2" fill-opacity="0.6"/>
        <circle cx="352" cy="140" r="58" fill="#fef3c7" stroke="#d97706" stroke-width="2.2" fill-opacity="0.6"/>
        <text x="258" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#15803d">A</text>
        <text x="384" y="145" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#b45309">B</text>
        <text x="321" y="145" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#334155">both</text>
      </svg>`,
    },
  ],

  "laws-of-motion-basics": [
    {
      afterHeading: 1,
      caption: "A free-body diagram: every force on the block drawn as an arrow from its centre.",
      svg: `<svg viewBox="0 0 400 275" xmlns="${S}" role="img" aria-label="Free body diagram of a block on a surface">
        <line x1="40" y1="205" x2="360" y2="205" stroke="#334155" stroke-width="2.5"/>
        <g stroke="#334155" stroke-width="1.2">
          <line x1="60" y1="205" x2="48" y2="218"/><line x1="100" y1="205" x2="88" y2="218"/>
          <line x1="140" y1="205" x2="128" y2="218"/><line x1="180" y1="205" x2="168" y2="218"/>
          <line x1="220" y1="205" x2="208" y2="218"/><line x1="260" y1="205" x2="248" y2="218"/>
          <line x1="300" y1="205" x2="288" y2="218"/><line x1="340" y1="205" x2="328" y2="218"/>
        </g>
        <rect x="155" y="105" width="90" height="55" rx="4" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/>
        <line x1="200" y1="105" x2="200" y2="50" stroke="#0d9488" stroke-width="2.5"/>
        <path d="M200,42 L194,54 L206,54 Z" fill="#0d9488"/>
        <text x="207" y="52" font-family="sans-serif" font-size="13" font-weight="700" fill="#0f766e">N</text>
        <line x1="200" y1="160" x2="200" y2="188" stroke="#e11d48" stroke-width="2.5"/>
        <path d="M200,196 L194,184 L206,184 Z" fill="#e11d48"/>
        <text x="207" y="186" font-family="sans-serif" font-size="13" font-weight="700" fill="#be123c">mg</text>
        <line x1="245" y1="132" x2="326" y2="132" stroke="#4f46e5" stroke-width="2.5"/>
        <path d="M334,132 L322,126 L322,138 Z" fill="#4f46e5"/>
        <text x="300" y="122" font-family="sans-serif" font-size="13" font-weight="700" fill="#4338ca">F</text>
        <line x1="155" y1="145" x2="86" y2="145" stroke="#b45309" stroke-width="2.5"/>
        <path d="M78,145 L90,139 L90,151 Z" fill="#b45309"/>
        <text x="34" y="141" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#b45309">friction f</text>
      </svg>`,
    },
  ],

  "bank-data-interpretation": [
    {
      afterHeading: 1,
      caption: "DI questions give data as charts — read the bars and pie sectors before you calculate.",
      svg: `<svg viewBox="0 0 460 250" xmlns="${S}" role="img" aria-label="Sample bar chart and pie chart used in data interpretation">
        <text x="112" y="24" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">Monthly sales (bar)</text>
        <line x1="45" y1="45" x2="45" y2="185" stroke="#334155" stroke-width="1.6"/>
        <line x1="45" y1="185" x2="212" y2="185" stroke="#334155" stroke-width="1.6"/>
        <rect x="60" y="125" width="26" height="60" fill="#4f46e5"/>
        <rect x="98" y="95" width="26" height="90" fill="#6366f1"/>
        <rect x="136" y="70" width="26" height="115" fill="#818cf8"/>
        <rect x="174" y="105" width="26" height="80" fill="#a5b4fc"/>
        <g font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">
          <text x="73" y="200">Jan</text><text x="111" y="200">Feb</text><text x="149" y="200">Mar</text><text x="187" y="200">Apr</text>
        </g>
        <g font-family="sans-serif" font-size="10" fill="#94a3b8" text-anchor="end">
          <text x="40" y="189">0</text><text x="40" y="129">30</text><text x="40" y="69">60</text>
        </g>
        <text x="345" y="24" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">Market share (pie)</text>
        <path d="M345,120 L345,50 A70,70 0 0 1 386,177 Z" fill="#4f46e5"/>
        <path d="M345,120 L386,177 A70,70 0 0 1 275,120 Z" fill="#f59e0b"/>
        <path d="M345,120 L275,120 A70,70 0 0 1 345,50 Z" fill="#10b981"/>
        <g font-family="sans-serif" font-size="11" fill="#475569">
          <rect x="298" y="200" width="11" height="11" fill="#4f46e5"/><text x="314" y="210">A 40%</text>
          <rect x="360" y="200" width="11" height="11" fill="#f59e0b"/><text x="376" y="210">B 35%</text>
          <rect x="298" y="219" width="11" height="11" fill="#10b981"/><text x="314" y="229">C 25%</text>
        </g>
      </svg>`,
    },
  ],

  "coordinate-geometry-explained": [
    {
      afterHeading: 1,
      caption: "Every point is an (x, y) pair; the axes split the plane into four quadrants.",
      svg: `<svg viewBox="0 0 360 320" xmlns="${S}" role="img" aria-label="Cartesian plane with point P at 3, 2">
        <g stroke="#eef2ff" stroke-width="1">
          <line x1="60" y1="20" x2="60" y2="300"/><line x1="90" y1="20" x2="90" y2="300"/><line x1="120" y1="20" x2="120" y2="300"/><line x1="150" y1="20" x2="150" y2="300"/>
          <line x1="210" y1="20" x2="210" y2="300"/><line x1="240" y1="20" x2="240" y2="300"/><line x1="270" y1="20" x2="270" y2="300"/><line x1="300" y1="20" x2="300" y2="300"/>
          <line x1="30" y1="70" x2="330" y2="70"/><line x1="30" y1="100" x2="330" y2="100"/><line x1="30" y1="130" x2="330" y2="130"/>
          <line x1="30" y1="190" x2="330" y2="190"/><line x1="30" y1="220" x2="330" y2="220"/><line x1="30" y1="250" x2="330" y2="250"/>
        </g>
        <line x1="24" y1="160" x2="336" y2="160" stroke="#334155" stroke-width="1.6"/>
        <line x1="180" y1="16" x2="180" y2="304" stroke="#334155" stroke-width="1.6"/>
        <text x="330" y="176" font-family="sans-serif" font-size="12" fill="#64748b">x</text>
        <text x="188" y="26" font-family="sans-serif" font-size="12" fill="#64748b">y</text>
        <g font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">
          <text x="258" y="52">I (+,+)</text><text x="96" y="52">II (−,+)</text><text x="96" y="278">III (−,−)</text><text x="258" y="278">IV (+,−)</text>
        </g>
        <line x1="270" y1="100" x2="270" y2="160" stroke="#e11d48" stroke-width="1" stroke-dasharray="4 3"/>
        <line x1="180" y1="100" x2="270" y2="100" stroke="#e11d48" stroke-width="1" stroke-dasharray="4 3"/>
        <circle cx="270" cy="100" r="4.5" fill="#e11d48"/>
        <text x="278" y="96" font-family="sans-serif" font-size="13" font-weight="700" fill="#be123c">P (3, 2)</text>
        <g font-family="sans-serif" font-size="10.5" fill="#475569" text-anchor="middle">
          <text x="210" y="176">1</text><text x="240" y="176">2</text><text x="270" y="176">3</text>
          <text x="170" y="133">1</text><text x="170" y="103">2</text>
        </g>
      </svg>`,
    },
  ],

  "triangles-explained": [
    {
      afterHeading: 1,
      caption: "The three interior angles of any triangle always add up to 180°.",
      svg: `<svg viewBox="0 0 360 270" xmlns="${S}" role="img" aria-label="Triangle showing interior angles sum to 180 degrees">
        <polygon points="55,215 305,215 175,55" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5"/>
        <path d="M85,215 A30,30 0 0 0 78,192" fill="none" stroke="#e11d48" stroke-width="2"/>
        <path d="M275,215 A30,30 0 0 1 285,190" fill="none" stroke="#0d9488" stroke-width="2"/>
        <path d="M160,80 A26,26 0 0 0 192,82" fill="none" stroke="#b45309" stroke-width="2"/>
        <text x="92" y="205" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">A</text>
        <text x="262" y="205" font-family="sans-serif" font-size="14" font-weight="700" fill="#0f766e">B</text>
        <text x="169" y="100" font-family="sans-serif" font-size="14" font-weight="700" fill="#b45309">C</text>
        <text x="180" y="252" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">∠A + ∠B + ∠C = 180°</text>
      </svg>`,
    },
  ],

  "profit-and-loss-basics": [
    {
      afterHeading: 1,
      caption: "Selling above cost gives profit; the extra length is exactly SP − CP.",
      svg: `<svg viewBox="0 0 420 200" xmlns="${S}" role="img" aria-label="Bar comparison of cost price and selling price showing profit">
        <text x="18" y="55" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#334155">Cost Price</text>
        <rect x="110" y="42" width="200" height="30" rx="4" fill="#6366f1"/>
        <text x="210" y="62" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#fff">₹800</text>
        <text x="18" y="118" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#334155">Selling Price</text>
        <rect x="110" y="105" width="200" height="30" rx="4" fill="#6366f1"/>
        <rect x="310" y="105" width="50" height="30" rx="4" fill="#10b981"/>
        <text x="210" y="125" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#fff">₹800</text>
        <text x="335" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff">+200</text>
        <text x="335" y="152" text-anchor="middle" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#047857">Profit</text>
        <text x="110" y="185" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">Profit = SP − CP = ₹1000 − ₹800 = ₹200</text>
      </svg>`,
    },
  ],

  "percentages-basics": [
    {
      afterHeading: 1,
      caption: "'Per cent' means 'out of 100' — shade 45 of the 100 squares and you have 45%.",
      svg: `<svg viewBox="0 0 300 300" xmlns="${S}" role="img" aria-label="Hundred-square grid with 45 squares shaded to show 45 percent">
        <rect x="50" y="30" width="220" height="88" fill="#6366f1"/>
        <rect x="50" y="118" width="110" height="22" fill="#6366f1"/>
        <g stroke="#c7d2fe" stroke-width="1">
          <line x1="72" y1="30" x2="72" y2="250"/><line x1="94" y1="30" x2="94" y2="250"/><line x1="116" y1="30" x2="116" y2="250"/><line x1="138" y1="30" x2="138" y2="250"/><line x1="160" y1="30" x2="160" y2="250"/><line x1="182" y1="30" x2="182" y2="250"/><line x1="204" y1="30" x2="204" y2="250"/><line x1="226" y1="30" x2="226" y2="250"/><line x1="248" y1="30" x2="248" y2="250"/>
          <line x1="50" y1="52" x2="270" y2="52"/><line x1="50" y1="74" x2="270" y2="74"/><line x1="50" y1="96" x2="270" y2="96"/><line x1="50" y1="118" x2="270" y2="118"/><line x1="50" y1="140" x2="270" y2="140"/><line x1="50" y1="162" x2="270" y2="162"/><line x1="50" y1="184" x2="270" y2="184"/><line x1="50" y1="206" x2="270" y2="206"/><line x1="50" y1="228" x2="270" y2="228"/>
        </g>
        <rect x="50" y="30" width="220" height="220" fill="none" stroke="#4338ca" stroke-width="2"/>
        <text x="160" y="280" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">45 out of 100 = 45%</text>
      </svg>`,
    },
  ],

  "number-series-explained": [
    {
      afterHeading: 1,
      caption: "Find the rule between terms — here the gaps grow +3, +5, +7, +9, so next is +11 = 37.",
      svg: `<svg viewBox="0 0 470 170" xmlns="${S}" role="img" aria-label="Number series with growing differences">
        <g font-family="sans-serif">
          <path d="M60,90 Q97,55 134,90" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M138,90 Q175,55 212,90" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M216,90 Q253,55 290,90" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M294,90 Q331,55 368,90" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M372,90 Q409,55 446,90" fill="none" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="4 3"/>
          <g font-size="12" font-weight="700" fill="#475569" text-anchor="middle">
            <text x="97" y="52">+3</text><text x="175" y="52">+5</text><text x="253" y="52">+7</text><text x="331" y="52">+9</text><text x="409" y="52" fill="#be123c">+11</text>
          </g>
          <g>
            <circle cx="60" cy="103" r="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/><text x="60" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="#4338ca">2</text>
            <circle cx="138" cy="103" r="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/><text x="138" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="#4338ca">5</text>
            <circle cx="216" cy="103" r="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/><text x="216" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="#4338ca">10</text>
            <circle cx="294" cy="103" r="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/><text x="294" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="#4338ca">17</text>
            <circle cx="372" cy="103" r="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/><text x="372" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="#4338ca">26</text>
            <circle cx="446" cy="103" r="22" fill="#fef2f2" stroke="#e11d48" stroke-width="2"/><text x="446" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="#be123c">?</text>
          </g>
        </g>
      </svg>`,
    },
  ],

  "coding-decoding-explained": [
    {
      afterHeading: 1,
      caption: "Most codes rest on A=1 … Z=26 (or its reverse). Memorise the anchors A, E, J, O, T, Z.",
      svg: `<svg viewBox="0 0 460 170" xmlns="${S}" role="img" aria-label="Alphabet to number mapping strip">
        <g font-family="sans-serif" text-anchor="middle">
          <g font-size="14" font-weight="700">
            <rect x="24" y="45" width="40" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="44" y="71" fill="#4338ca">A</text>
            <rect x="70" y="45" width="40" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="90" y="71" fill="#4338ca">B</text>
            <rect x="116" y="45" width="40" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="136" y="71" fill="#4338ca">C</text>
            <rect x="162" y="45" width="40" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="182" y="71" fill="#4338ca">D</text>
            <rect x="208" y="45" width="40" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="228" y="71" fill="#4338ca">E</text>
            <text x="286" y="72" font-size="18" fill="#94a3b8">· · ·</text>
            <rect x="392" y="45" width="40" height="40" rx="6" fill="#fef2f2" stroke="#e11d48" stroke-width="1.6"/><text x="412" y="71" fill="#be123c">Z</text>
          </g>
          <g font-size="13" font-weight="700" fill="#0f766e">
            <text x="44" y="110">1</text><text x="90" y="110">2</text><text x="136" y="110">3</text><text x="182" y="110">4</text><text x="228" y="110">5</text><text x="412" y="110" fill="#be123c">26</text>
          </g>
          <text x="230" y="145" font-size="12" font-weight="700" fill="#334155">Reverse: A=26, Z=1 → position n ↔ (27 − n)</text>
        </g>
      </svg>`,
    },
  ],

  "blood-relations-explained": [
    {
      afterHeading: 1,
      caption: "Draw a family tree — □ male, ○ female, = marriage, | descent. Then read the link.",
      svg: `<svg viewBox="0 0 420 300" xmlns="${S}" role="img" aria-label="Three generation family tree">
        <g font-family="sans-serif" text-anchor="middle">
          <rect x="150" y="30" width="30" height="30" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/>
          <circle cx="245" cy="45" r="15" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
          <line x1="180" y1="45" x2="230" y2="45" stroke="#334155" stroke-width="2"/>
          <text x="165" y="80" font-size="11" fill="#475569">Grandfather</text>
          <text x="245" y="80" font-size="11" fill="#475569">Grandmother</text>
          <line x1="203" y1="60" x2="203" y2="98" stroke="#334155" stroke-width="1.6"/>
          <line x1="120" y1="98" x2="285" y2="98" stroke="#334155" stroke-width="1.6"/>
          <line x1="120" y1="98" x2="120" y2="112" stroke="#334155" stroke-width="1.6"/>
          <line x1="285" y1="98" x2="285" y2="112" stroke="#334155" stroke-width="1.6"/>
          <rect x="105" y="112" width="30" height="30" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/>
          <circle cx="200" cy="127" r="15" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
          <line x1="135" y1="127" x2="185" y2="127" stroke="#334155" stroke-width="2"/>
          <circle cx="285" cy="127" r="15" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
          <text x="120" y="162" font-size="11" fill="#475569">Father</text>
          <text x="200" y="162" font-size="11" fill="#475569">Mother</text>
          <text x="285" y="162" font-size="11" fill="#475569">Aunt</text>
          <line x1="160" y1="142" x2="160" y2="185" stroke="#334155" stroke-width="1.6"/>
          <line x1="120" y1="185" x2="210" y2="185" stroke="#334155" stroke-width="1.6"/>
          <line x1="120" y1="185" x2="120" y2="200" stroke="#334155" stroke-width="1.6"/>
          <line x1="210" y1="185" x2="210" y2="200" stroke="#334155" stroke-width="1.6"/>
          <circle cx="120" cy="215" r="15" fill="#fef2f2" stroke="#e11d48" stroke-width="2.2"/><text x="120" y="220" font-size="12" font-weight="700" fill="#be123c">You</text>
          <rect x="195" y="200" width="30" height="30" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/>
          <text x="210" y="250" font-size="11" fill="#475569">Brother</text>
          <g font-size="11.5" fill="#334155" text-anchor="start">
            <rect x="60" y="268" width="14" height="14" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="80" y="279" text-anchor="start">male</text>
            <circle cx="150" cy="275" r="7" fill="#fdf2f8" stroke="#db2777" stroke-width="1.6"/><text x="162" y="279" text-anchor="start">female</text>
            <text x="240" y="279" text-anchor="start">━ marriage · │ child</text>
          </g>
        </g>
      </svg>`,
    },
  ],

  "direction-distance-explained": [
    {
      afterHeading: 1,
      caption: "Sketch each move on a compass; the shortest distance back is the straight-line displacement.",
      svg: `<svg viewBox="0 0 360 300" xmlns="${S}" role="img" aria-label="Direction sense: walk north then east, displacement is the hypotenuse">
        <g font-family="sans-serif">
          <g stroke="#94a3b8" stroke-width="1.4">
            <line x1="55" y1="30" x2="55" y2="78"/><line x1="31" y1="54" x2="79" y2="54"/>
          </g>
          <g font-size="11" font-weight="700" fill="#64748b" text-anchor="middle">
            <text x="55" y="26">N</text><text x="55" y="92">S</text><text x="86" y="58">E</text><text x="24" y="58">W</text>
          </g>
          <line x1="100" y1="245" x2="100" y2="130" stroke="#4f46e5" stroke-width="2.5"/>
          <path d="M100,122 L94,136 L106,136 Z" fill="#4f46e5"/>
          <line x1="100" y1="130" x2="255" y2="130" stroke="#4f46e5" stroke-width="2.5"/>
          <path d="M263,130 L249,124 L249,136 Z" fill="#4f46e5"/>
          <path d="M100,130 L118,130 L118,148" fill="none" stroke="#334155" stroke-width="1.6"/>
          <line x1="100" y1="245" x2="255" y2="130" stroke="#e11d48" stroke-width="2" stroke-dasharray="6 4"/>
          <circle cx="100" cy="245" r="5" fill="#1e293b"/><text x="86" y="262" font-size="12" font-weight="700" fill="#1e293b">Start</text>
          <circle cx="255" cy="130" r="5" fill="#1e293b"/><text x="262" y="126" font-size="12" font-weight="700" fill="#1e293b">End</text>
          <text x="80" y="192" font-size="12" font-weight="700" fill="#4338ca" text-anchor="end">3 km N</text>
          <text x="178" y="122" font-size="12" font-weight="700" fill="#4338ca" text-anchor="middle">4 km E</text>
          <text x="200" y="205" font-size="12" font-weight="700" fill="#be123c" transform="rotate(-37 200 205)">5 km</text>
        </g>
      </svg>`,
    },
  ],

  "structure-of-atom-explained": [
    {
      afterHeading: 1,
      caption: "Bohr's model: a tiny dense nucleus with electrons in fixed shells (K, L, M …).",
      svg: `<svg viewBox="0 0 340 320" xmlns="${S}" role="img" aria-label="Bohr model of an atom with nucleus and two electron shells">
        <circle cx="170" cy="150" r="46" fill="none" stroke="#a5b4fc" stroke-width="1.6"/>
        <circle cx="170" cy="150" r="88" fill="none" stroke="#a5b4fc" stroke-width="1.6"/>
        <circle cx="170" cy="150" r="17" fill="#e11d48"/>
        <text x="170" y="155" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#fff">+</text>
        <g fill="#4338ca">
          <circle cx="170" cy="104" r="5.5"/><circle cx="170" cy="196" r="5.5"/>
          <circle cx="170" cy="62" r="5.5"/><circle cx="258" cy="150" r="5.5"/><circle cx="170" cy="238" r="5.5"/><circle cx="82" cy="150" r="5.5"/>
        </g>
        <text x="150" y="128" font-family="sans-serif" font-size="12" font-weight="700" fill="#6366f1">K</text>
        <text x="150" y="86" font-family="sans-serif" font-size="12" font-weight="700" fill="#6366f1">L</text>
        <line x1="176" y1="166" x2="188" y2="270" stroke="#64748b" stroke-width="1"/>
        <text x="192" y="290" text-anchor="middle" font-family="sans-serif" font-size="11.5" fill="#475569">nucleus (protons + neutrons)</text>
        <text x="18" y="306" font-family="sans-serif" font-size="11.5" fill="#4338ca">● electron</text>
      </svg>`,
    },
  ],

  "heredity-and-evolution-explained": [
    {
      afterHeading: 1,
      caption: "A Punnett square crosses the parents' gametes — Tt × Tt gives a 3 : 1 tall-to-short ratio.",
      svg: `<svg viewBox="0 0 320 300" xmlns="${S}" role="img" aria-label="Punnett square for a Tt by Tt monohybrid cross">
        <text x="178" y="34" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">Cross: Tt × Tt</text>
        <text x="144" y="76" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4338ca">T</text>
        <text x="212" y="76" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4338ca">t</text>
        <text x="92" y="128" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">T</text>
        <text x="92" y="196" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#be123c">t</text>
        <rect x="110" y="90" width="68" height="68" fill="#c7d2fe" stroke="#4338ca" stroke-width="1.5"/>
        <rect x="178" y="90" width="68" height="68" fill="#ddd6fe" stroke="#4338ca" stroke-width="1.5"/>
        <rect x="110" y="158" width="68" height="68" fill="#ddd6fe" stroke="#4338ca" stroke-width="1.5"/>
        <rect x="178" y="158" width="68" height="68" fill="#fde68a" stroke="#4338ca" stroke-width="1.5"/>
        <g font-family="sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          <text x="144" y="130">TT</text><text x="212" y="130">Tt</text><text x="144" y="198">Tt</text><text x="212" y="198">tt</text>
        </g>
        <text x="178" y="256" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#334155">3 Tall : 1 short</text>
      </svg>`,
    },
  ],

  "arithmetic-progressions-explained": [
    {
      afterHeading: 1,
      caption: "In an AP each term jumps by the same common difference d — here d = 4.",
      svg: `<svg viewBox="0 0 470 150" xmlns="${S}" role="img" aria-label="Arithmetic progression terms on a number line with common difference 4">
        <line x1="30" y1="95" x2="450" y2="95" stroke="#334155" stroke-width="1.6"/>
        <g font-family="sans-serif">
          <g fill="#4f46e5">
            <circle cx="60" cy="95" r="5"/><circle cx="150" cy="95" r="5"/><circle cx="240" cy="95" r="5"/><circle cx="330" cy="95" r="5"/><circle cx="420" cy="95" r="5"/>
          </g>
          <g font-size="14" font-weight="700" fill="#4338ca" text-anchor="middle">
            <text x="60" y="122">3</text><text x="150" y="122">7</text><text x="240" y="122">11</text><text x="330" y="122">15</text><text x="420" y="122">19</text>
          </g>
          <path d="M60,88 Q105,58 150,88" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M150,88 Q195,58 240,88" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M240,88 Q285,58 330,88" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <path d="M330,88 Q375,58 420,88" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
          <g font-size="12" font-weight="700" fill="#475569" text-anchor="middle">
            <text x="105" y="58">+4</text><text x="195" y="58">+4</text><text x="285" y="58">+4</text><text x="375" y="58">+4</text>
          </g>
          <text x="240" y="20" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1e293b">aₙ = a + (n − 1)d</text>
        </g>
      </svg>`,
    },
  ],

  "probability-explained": [
    {
      afterHeading: 1,
      caption: "Probability = favourable ÷ total. A die has 6 faces; 3 are even, so P(even) = 3/6 = ½.",
      svg: `<svg viewBox="0 0 460 170" xmlns="${S}" role="img" aria-label="Sample space of a die with even outcomes highlighted">
        <g font-family="sans-serif" text-anchor="middle" font-size="18" font-weight="700">
          <rect x="20" y="45" width="54" height="54" rx="9" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.6"/><text x="47" y="80" fill="#334155">1</text>
          <rect x="92" y="45" width="54" height="54" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/><text x="119" y="80" fill="#15803d">2</text>
          <rect x="164" y="45" width="54" height="54" rx="9" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.6"/><text x="191" y="80" fill="#334155">3</text>
          <rect x="236" y="45" width="54" height="54" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/><text x="263" y="80" fill="#15803d">4</text>
          <rect x="308" y="45" width="54" height="54" rx="9" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.6"/><text x="335" y="80" fill="#334155">5</text>
          <rect x="380" y="45" width="54" height="54" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/><text x="407" y="80" fill="#15803d">6</text>
        </g>
        <text x="230" y="140" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">P(even) = 3 favourable / 6 total = 1/2</text>
      </svg>`,
    },
  ],

  "linear-equations-explained": [
    {
      afterHeading: 1,
      caption: "Two equations = two lines; the point where they cross is the solution (x, y).",
      svg: `<svg viewBox="0 0 340 300" xmlns="${S}" role="img" aria-label="Two straight lines intersecting at the solution point">
        <line x1="40" y1="240" x2="320" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="70" y1="30" x2="70" y2="270" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="312" y="256" font-family="sans-serif" font-size="12" fill="#64748b">x</text>
        <text x="78" y="42" font-family="sans-serif" font-size="12" fill="#64748b">y</text>
        <line x1="55" y1="215" x2="300" y2="70" stroke="#4f46e5" stroke-width="2.5"/>
        <line x1="55" y1="60" x2="300" y2="210" stroke="#0d9488" stroke-width="2.5"/>
        <circle cx="182" cy="140" r="6" fill="#e11d48"/>
        <text x="192" y="132" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#be123c">solution (x, y)</text>
        <text x="284" y="66" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#4338ca">line 1</text>
        <text x="284" y="224" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#0f766e">line 2</text>
      </svg>`,
    },
  ],

  "gravitation-explained": [
    {
      afterHeading: 1,
      caption: "Every two masses pull on each other — stronger with more mass, weaker with distance².",
      svg: `<svg viewBox="0 0 420 210" xmlns="${S}" role="img" aria-label="Two masses attracting each other with gravitational force">
        <circle cx="105" cy="95" r="40" fill="#c7d2fe" stroke="#4338ca" stroke-width="2"/>
        <text x="105" y="101" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#312e81">m₁</text>
        <circle cx="320" cy="95" r="24" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
        <text x="320" y="101" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#92400e">m₂</text>
        <line x1="152" y1="95" x2="205" y2="95" stroke="#e11d48" stroke-width="2.5"/>
        <path d="M213,95 L199,89 L199,101 Z" fill="#e11d48"/>
        <line x1="273" y1="95" x2="220" y2="95" stroke="#e11d48" stroke-width="2.5"/>
        <path d="M212,95 L226,89 L226,101 Z" fill="#e11d48"/>
        <text x="163" y="83" font-family="sans-serif" font-size="12" font-weight="700" fill="#be123c">F</text>
        <text x="252" y="83" font-family="sans-serif" font-size="12" font-weight="700" fill="#be123c">F</text>
        <line x1="105" y1="150" x2="320" y2="150" stroke="#64748b" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="212" y="168" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#475569">r</text>
        <text x="210" y="196" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">F = G·m₁·m₂ / r²</text>
      </svg>`,
    },
  ],

  "statistics-explained": [
    {
      afterHeading: 1,
      caption: "The mean is the balancing height — the level the bars would settle to if levelled out.",
      svg: `<svg viewBox="0 0 400 230" xmlns="${S}" role="img" aria-label="Bar chart with a dashed mean line">
        <line x1="45" y1="30" x2="45" y2="185" stroke="#334155" stroke-width="1.6"/>
        <line x1="45" y1="185" x2="370" y2="185" stroke="#334155" stroke-width="1.6"/>
        <rect x="70" y="125" width="40" height="60" fill="#a5b4fc"/>
        <rect x="130" y="95" width="40" height="90" fill="#818cf8"/>
        <rect x="190" y="65" width="40" height="120" fill="#6366f1"/>
        <rect x="250" y="135" width="40" height="50" fill="#a5b4fc"/>
        <rect x="310" y="105" width="40" height="80" fill="#818cf8"/>
        <line x1="45" y1="105" x2="370" y2="105" stroke="#e11d48" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="360" y="100" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="700" fill="#be123c">mean</text>
        <g font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">
          <text x="90" y="202">A</text><text x="150" y="202">B</text><text x="210" y="202">C</text><text x="270" y="202">D</text><text x="330" y="202">E</text>
        </g>
        <text x="200" y="222" text-anchor="middle" font-family="sans-serif" font-size="11.5" fill="#334155">mean = sum of values ÷ how many</text>
      </svg>`,
    },
  ],

  "time-speed-distance-explained": [
    {
      afterHeading: 1,
      caption: "On a distance–time graph the slope IS the speed — steeper line, faster motion.",
      svg: `<svg viewBox="0 0 380 280" xmlns="${S}" role="img" aria-label="Distance-time graph where slope equals speed">
        <line x1="50" y1="40" x2="50" y2="230" stroke="#334155" stroke-width="1.6"/>
        <line x1="50" y1="230" x2="350" y2="230" stroke="#334155" stroke-width="1.6"/>
        <text x="50" y="28" text-anchor="middle" font-family="sans-serif" font-size="11.5" fill="#64748b">distance</text>
        <text x="350" y="252" text-anchor="end" font-family="sans-serif" font-size="11.5" fill="#64748b">time</text>
        <line x1="50" y1="230" x2="300" y2="70" stroke="#4f46e5" stroke-width="3"/>
        <line x1="150" y1="166" x2="260" y2="166" stroke="#0d9488" stroke-width="1.6" stroke-dasharray="5 3"/>
        <line x1="260" y1="166" x2="260" y2="96" stroke="#0d9488" stroke-width="1.6" stroke-dasharray="5 3"/>
        <text x="205" y="182" text-anchor="middle" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#0f766e">time</text>
        <text x="268" y="135" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#0f766e">distance</text>
        <text x="190" y="258" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">slope = distance ÷ time = speed</text>
      </svg>`,
    },
  ],

  "acids-bases-salts-explained": [
    {
      afterHeading: 1,
      caption: "The pH scale runs 0–14: below 7 is acidic, 7 is neutral, above 7 is basic (alkaline).",
      svg: `<svg viewBox="0 0 460 170" xmlns="${S}" role="img" aria-label="The pH scale from 0 to 14">
        <g>
          <rect x="30" y="55" width="57" height="40" fill="#dc2626"/>
          <rect x="87" y="55" width="57" height="40" fill="#f97316"/>
          <rect x="144" y="55" width="57" height="40" fill="#facc15"/>
          <rect x="201" y="55" width="57" height="40" fill="#22c55e"/>
          <rect x="258" y="55" width="57" height="40" fill="#14b8a6"/>
          <rect x="315" y="55" width="57" height="40" fill="#0ea5e9"/>
          <rect x="372" y="55" width="58" height="40" fill="#6d28d9"/>
        </g>
        <g font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle">
          <text x="30" y="112">0</text><text x="87" y="112">2</text><text x="144" y="112">4</text><text x="201" y="112">6</text><text x="230" y="112">7</text><text x="258" y="112">8</text><text x="315" y="112">10</text><text x="372" y="112">12</text><text x="430" y="112">14</text>
        </g>
        <path d="M230,50 L224,40 L236,40 Z" fill="#111827"/>
        <text x="230" y="34" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#111827">7 · Neutral</text>
        <text x="88" y="140" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#b91c1c">← Acidic</text>
        <text x="372" y="140" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#5b21b6">Basic →</text>
      </svg>`,
    },
  ],

  "mixture-alligation-explained": [
    {
      afterHeading: 1,
      caption: "The alligation cross: subtract diagonally around the mean to get the mixing ratio.",
      svg: `<svg viewBox="0 0 380 270" xmlns="${S}" role="img" aria-label="Alligation cross diagram">
        <line x1="110" y1="70" x2="270" y2="200" stroke="#94a3b8" stroke-width="1.4"/>
        <line x1="270" y1="70" x2="110" y2="200" stroke="#94a3b8" stroke-width="1.4"/>
        <g font-family="sans-serif" text-anchor="middle">
          <rect x="55" y="42" width="110" height="34" rx="7" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/><text x="110" y="64" font-size="12.5" font-weight="700" fill="#4338ca">Cheaper (c)</text>
          <rect x="215" y="42" width="110" height="34" rx="7" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/><text x="270" y="64" font-size="12.5" font-weight="700" fill="#b45309">Dearer (d)</text>
          <rect x="135" y="118" width="110" height="34" rx="7" fill="#f1f5f9" stroke="#475569" stroke-width="1.6"/><text x="190" y="140" font-size="12.5" font-weight="700" fill="#334155">Mean (m)</text>
          <rect x="55" y="194" width="110" height="34" rx="7" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="110" y="216" font-size="12.5" font-weight="700" fill="#15803d">d − m</text>
          <rect x="215" y="194" width="110" height="34" rx="7" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="270" y="216" font-size="12.5" font-weight="700" fill="#15803d">m − c</text>
          <text x="190" y="256" font-size="12.5" font-weight="700" fill="#1e293b">cheaper : dearer = (d − m) : (m − c)</text>
        </g>
      </svg>`,
    },
  ],

  "cell-cycle-and-cell-division-explained": [
    {
      afterHeading: 1,
      caption: "The cell cycle: a long interphase (G1 → S → G2) of growth and DNA copying, then M (division).",
      svg: `<svg viewBox="0 0 320 300" xmlns="${S}" role="img" aria-label="The cell cycle wheel with G1, S, G2 and M phases">
        <path d="M160,150 L160,60 A90,90 0 0 1 212.9,222.8 Z" fill="#a5b4fc"/>
        <path d="M160,150 L212.9,222.8 A90,90 0 0 1 74.4,177.8 Z" fill="#6366f1"/>
        <path d="M160,150 L74.4,177.8 A90,90 0 0 1 107.1,77.2 Z" fill="#818cf8"/>
        <path d="M160,150 L107.1,77.2 A90,90 0 0 1 160,60 Z" fill="#f59e0b"/>
        <circle cx="160" cy="150" r="42" fill="#fff"/>
        <text x="160" y="146" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">Cell</text>
        <text x="160" y="162" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">cycle</text>
        <g font-family="sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">
          <text x="205" y="120">G1</text><text x="150" y="215">S</text><text x="95" y="150">G2</text><text x="120" y="92">M</text>
        </g>
        <g font-family="sans-serif" font-size="10.5" fill="#475569" text-anchor="middle">
          <text x="270" y="118">growth</text><text x="150" y="285">DNA copied</text><text x="42" y="150">grow</text><text x="70" y="70">divide</text>
        </g>
      </svg>`,
    },
  ],

  "compound-interest-explained": [
    {
      afterHeading: 1,
      caption: "Simple interest grows in a straight line; compound interest curves upward as interest earns interest.",
      svg: `<svg viewBox="0 0 380 260" xmlns="${S}" role="img" aria-label="Simple vs compound interest growth curves">
        <line x1="50" y1="30" x2="50" y2="215" stroke="#334155" stroke-width="1.6"/>
        <line x1="50" y1="215" x2="350" y2="215" stroke="#334155" stroke-width="1.6"/>
        <text x="50" y="24" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">amount</text>
        <text x="350" y="235" text-anchor="end" font-family="sans-serif" font-size="11" fill="#64748b">years</text>
        <path d="M50,170 Q220,150 330,55" fill="none" stroke="#4f46e5" stroke-width="3"/>
        <line x1="50" y1="170" x2="330" y2="95" stroke="#0d9488" stroke-width="2.5"/>
        <circle cx="50" cy="170" r="4" fill="#334155"/>
        <text x="58" y="184" font-family="sans-serif" font-size="10.5" fill="#475569">principal</text>
        <text x="250" y="60" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#4338ca">compound</text>
        <text x="250" y="112" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#0f766e">simple</text>
      </svg>`,
    },
  ],

  "chemical-bonding-explained": [
    {
      afterHeading: 1,
      caption: "An ionic bond: sodium gives its single outer electron to chlorine; the opposite ions then attract.",
      svg: `<svg viewBox="0 0 420 220" xmlns="${S}" role="img" aria-label="Ionic bonding between sodium and chlorine">
        <circle cx="85" cy="95" r="40" fill="#eef2ff" stroke="#4f46e5" stroke-width="2"/>
        <text x="85" y="101" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#312e81">Na</text>
        <circle cx="125" cy="95" r="5" fill="#e11d48"/>
        <circle cx="320" cy="95" r="44" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
        <text x="320" y="101" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#166534">Cl</text>
        <line x1="140" y1="95" x2="255" y2="95" stroke="#e11d48" stroke-width="2.5"/>
        <path d="M263,95 L249,89 L249,101 Z" fill="#e11d48"/>
        <text x="200" y="84" text-anchor="middle" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#be123c">gives 1 e⁻</text>
        <text x="85" y="170" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4338ca">Na⁺</text>
        <text x="320" y="170" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#166534">Cl⁻</text>
        <text x="203" y="170" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#475569">↔</text>
        <text x="203" y="196" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#475569">opposite charges attract</text>
      </svg>`,
    },
  ],

  "carbon-compounds-explained": [
    {
      afterHeading: 1,
      caption: "Carbon forms four covalent bonds — as in methane (CH₄), one carbon sharing with four hydrogens.",
      svg: `<svg viewBox="0 0 300 270" xmlns="${S}" role="img" aria-label="Structural formula of methane CH4">
        <line x1="150" y1="135" x2="150" y2="70" stroke="#334155" stroke-width="2"/>
        <line x1="150" y1="135" x2="150" y2="200" stroke="#334155" stroke-width="2"/>
        <line x1="150" y1="135" x2="85" y2="135" stroke="#334155" stroke-width="2"/>
        <line x1="150" y1="135" x2="215" y2="135" stroke="#334155" stroke-width="2"/>
        <circle cx="150" cy="135" r="24" fill="#334155"/>
        <text x="150" y="141" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" fill="#fff">C</text>
        <g font-family="sans-serif" font-size="15" font-weight="700" fill="#0f766e" text-anchor="middle">
          <circle cx="150" cy="55" r="17" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="150" y="60">H</text>
          <circle cx="150" cy="215" r="17" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="150" y="220">H</text>
          <circle cx="68" cy="135" r="17" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="68" y="140">H</text>
          <circle cx="232" cy="135" r="17" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/><text x="232" y="140">H</text>
        </g>
        <text x="150" y="252" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">Methane · CH₄</text>
      </svg>`,
    },
  ],

  "ratio-proportion-basics": [
    {
      afterHeading: 1,
      caption: "A ratio splits a whole into equal parts — 3 : 2 means 5 parts, so 20 splits as 12 and 8.",
      svg: `<svg viewBox="0 0 420 170" xmlns="${S}" role="img" aria-label="A bar divided in the ratio 3 to 2">
        <rect x="40" y="55" width="204" height="45" fill="#6366f1"/>
        <rect x="244" y="55" width="136" height="45" fill="#f59e0b"/>
        <g stroke="#fff" stroke-width="2">
          <line x1="108" y1="55" x2="108" y2="100"/><line x1="176" y1="55" x2="176" y2="100"/><line x1="312" y1="55" x2="312" y2="100"/>
        </g>
        <text x="142" y="45" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#4338ca">3 parts</text>
        <text x="312" y="45" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#b45309">2 parts</text>
        <text x="142" y="122" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#4338ca">12</text>
        <text x="312" y="122" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#b45309">8</text>
        <text x="210" y="152" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="#1e293b">3 : 2 of 20  →  12 : 8</text>
      </svg>`,
    },
  ],

  "human-eye-and-colourful-world-explained": [
    {
      afterHeading: 1,
      caption: "A prism bends each colour by a different amount, splitting white light into the VIBGYOR spectrum.",
      svg: `<svg viewBox="0 0 420 240" xmlns="${S}" role="img" aria-label="A prism dispersing white light into a spectrum">
        <line x1="30" y1="110" x2="176" y2="128" stroke="#334155" stroke-width="3"/>
        <text x="30" y="98" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#334155">white light</text>
        <polygon points="205,45 150,180 260,180" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" fill-opacity="0.6"/>
        <g stroke-width="3">
          <line x1="228" y1="150" x2="405" y2="96" stroke="#ef4444"/>
          <line x1="228" y1="150" x2="405" y2="112" stroke="#f97316"/>
          <line x1="228" y1="150" x2="405" y2="128" stroke="#eab308"/>
          <line x1="228" y1="150" x2="405" y2="144" stroke="#22c55e"/>
          <line x1="228" y1="150" x2="405" y2="160" stroke="#3b82f6"/>
          <line x1="228" y1="150" x2="405" y2="176" stroke="#4f46e5"/>
          <line x1="228" y1="150" x2="405" y2="192" stroke="#8b5cf6"/>
        </g>
        <text x="356" y="220" text-anchor="middle" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#334155">spectrum (VIBGYOR)</text>
      </svg>`,
    },
  ],
  "magnetic-effects-electric-current-explained": [
    {
      afterHeading: 1,
      caption: "Outside a bar magnet the magnetic field lines curve out of the north (N) pole and loop back into the south (S) pole, in the direction the arrows show.",
      svg: "<svg viewBox=\"0 0 440 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"A horizontal bar magnet with the N pole on the left and the S pole on the right. Curved magnetic field lines loop outside the magnet, leaving the north pole and entering the south pole, each carrying a rightward arrowhead.\">\n  <title>Magnetic field lines around a bar magnet</title>\n\n  <!-- external field lines (teal): N (left) -> S (right) -->\n  <g fill=\"none\" stroke=\"#0d9488\" stroke-width=\"2\" stroke-linecap=\"round\">\n    <path d=\"M142 112 C184 7 256 7 298 112\"/>\n    <path d=\"M150 112 C190 44 250 44 290 112\"/>\n    <path d=\"M158 112 C196 83 244 83 282 112\"/>\n    <path d=\"M158 148 C196 177 244 177 282 148\"/>\n    <path d=\"M150 148 C190 216 250 216 290 148\"/>\n    <path d=\"M142 148 C184 253 256 253 298 148\"/>\n  </g>\n\n  <!-- arrowheads: all point left-to-right (field direction outside the magnet) -->\n  <g fill=\"#0d9488\">\n    <path d=\"M224 33 L216 29 L216 37 Z\"/>\n    <path d=\"M224 61 L216 57 L216 65 Z\"/>\n    <path d=\"M224 90 L216 86 L216 94 Z\"/>\n    <path d=\"M224 170 L216 166 L216 174 Z\"/>\n    <path d=\"M224 199 L216 195 L216 203 Z\"/>\n    <path d=\"M224 227 L216 223 L216 231 Z\"/>\n  </g>\n\n  <!-- bar magnet: N half rose (left), S half indigo (right) -->\n  <rect x=\"140\" y=\"112\" width=\"80\" height=\"36\" fill=\"#e11d48\"/>\n  <rect x=\"220\" y=\"112\" width=\"80\" height=\"36\" fill=\"#4f46e5\"/>\n  <rect x=\"140\" y=\"112\" width=\"160\" height=\"36\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"220\" y1=\"112\" x2=\"220\" y2=\"148\" stroke=\"#1e293b\" stroke-width=\"1.5\"/>\n  <text x=\"180\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">N</text>\n  <text x=\"260\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">S</text>\n\n  <!-- diagram label -->\n  <text x=\"312\" y=\"40\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#334155\">field lines</text>\n</svg>",
    },
  ],
  "c12-electric-charges-and-fields": [
    {
      afterHeading: 1,
      caption: "Field lines start on the positive charge +q, curve across the gap, and end on the negative charge −q, with the arrows showing the field always points from plus to minus.",
      svg: "<svg viewBox=\"0 0 440 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Electric field lines of a dipole starting on a positive charge plus q on the left and ending on a negative charge minus q on the right, with arrows pointing from plus to minus\"><g fill=\"none\" stroke=\"#475569\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"168\" y1=\"130\" x2=\"272\" y2=\"130\"/><path d=\"M164.74 119.67 C213.88 85.23 226.12 85.23 275.26 119.67\"/><path d=\"M156.16 113.08 C185.23 33.18 254.77 33.18 283.84 113.08\"/><path d=\"M164.74 140.33 C213.88 174.77 226.12 174.77 275.26 140.33\"/><path d=\"M156.16 146.92 C185.23 226.82 254.77 226.82 283.84 146.92\"/></g><g fill=\"#334155\"><path d=\"M216 125 L227 130 L216 135 Z\"/><path d=\"M216 88.84 L227 93.84 L216 98.84 Z\"/><path d=\"M216 48.16 L227 53.16 L216 58.16 Z\"/><path d=\"M216 161.16 L227 166.16 L216 171.16 Z\"/><path d=\"M216 201.84 L227 206.84 L216 211.84 Z\"/></g><circle cx=\"150\" cy=\"130\" r=\"18\" fill=\"#e11d48\" stroke=\"#be123c\" stroke-width=\"2\"/><rect x=\"141\" y=\"128.3\" width=\"18\" height=\"3.4\" rx=\"1.7\" fill=\"#ffffff\"/><rect x=\"148.3\" y=\"121\" width=\"3.4\" height=\"18\" rx=\"1.7\" fill=\"#ffffff\"/><circle cx=\"290\" cy=\"130\" r=\"18\" fill=\"#4f46e5\" stroke=\"#4338ca\" stroke-width=\"2\"/><rect x=\"281\" y=\"128.3\" width=\"18\" height=\"3.4\" rx=\"1.7\" fill=\"#ffffff\"/><text x=\"150\" y=\"177\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#be123c\" text-anchor=\"middle\">+q</text><text x=\"290\" y=\"177\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#4338ca\" text-anchor=\"middle\">&#8722;q</text></svg>",
    },
  ],
  "c11-kinematics": [
    {
      afterHeading: 1,
      caption: "On a velocity-time graph, the slope of the line gives the acceleration and the shaded area under the line gives the displacement.",
      svg: "<svg viewBox=\"0 0 400 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Velocity-time graph: a straight line rises from initial velocity u; the slope of the line equals acceleration a and the shaded trapezium beneath it equals displacement.\"><polygon points=\"70,240 70,175 340,75 340,240\" fill=\"#c7d2fe\" fill-opacity=\"0.55\"/><line x1=\"70\" y1=\"240\" x2=\"365\" y2=\"240\" stroke=\"#334155\" stroke-width=\"2\"/><line x1=\"70\" y1=\"240\" x2=\"70\" y2=\"45\" stroke=\"#334155\" stroke-width=\"2\"/><path d=\"M365,240 L356,235.5 L356,244.5 Z\" fill=\"#334155\"/><path d=\"M70,45 L65.5,54 L74.5,54 Z\" fill=\"#334155\"/><line x1=\"70\" y1=\"175\" x2=\"340\" y2=\"75\" stroke=\"#4338ca\" stroke-width=\"2.5\"/><line x1=\"66\" y1=\"175\" x2=\"74\" y2=\"175\" stroke=\"#334155\" stroke-width=\"2\"/><circle cx=\"70\" cy=\"175\" r=\"3\" fill=\"#4338ca\"/><text x=\"61\" y=\"180\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#1e293b\" text-anchor=\"end\" font-style=\"italic\">u</text><polygon points=\"210,123 270,123 270,101\" fill=\"#99f6e4\" fill-opacity=\"0.8\" stroke=\"#0f766e\" stroke-width=\"1.5\"/><text x=\"283\" y=\"113\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#0f766e\" font-weight=\"bold\">a = slope</text><text x=\"200\" y=\"208\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#3730a3\" text-anchor=\"middle\" font-weight=\"bold\">displacement = area</text><text x=\"22\" y=\"150\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#1e293b\" text-anchor=\"middle\" transform=\"rotate(-90 22 150)\">velocity</text><text x=\"345\" y=\"262\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#1e293b\" text-anchor=\"middle\">time</text></svg>",
    },
  ],
  "life-processes-explained": [
    {
      afterHeading: 1,
      caption: "Food moves one way through the alimentary canal: from the mouth down the oesophagus to the J-shaped stomach, then through the long coiled small intestine and the wider large intestine that frames it, before leaving at the anus.",
      svg: "<svg viewBox=\"0 0 320 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Schematic of the human alimentary canal in order from top to bottom: mouth, oesophagus, J-shaped stomach, long coiled small intestine framed by the wider large intestine, ending at the anus\">\n  <!-- LARGE INTESTINE (drawn first so it frames the small intestine) -->\n  <path d=\"M100 280 L100 200 Q100 192 108 192 L204 192 Q212 192 212 200 L212 276 C213 293 188 299 168 299 C158 299 156 302 156 309 L156 320\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"15\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <!-- SMALL INTESTINE (long, thin, coiled, inside the frame) -->\n  <path d=\"M168 156 C185 168 191 186 183 199 C174 212 126 208 120 221 C113 233 196 228 191 241 C187 253 126 249 121 260 C118 269 111 272 108 276\" fill=\"none\" stroke=\"#0d9488\" stroke-width=\"9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <!-- STOMACH (J-shaped) -->\n  <path d=\"M150 110 C130 105 102 110 99 140 C96 168 114 187 143 186 C159 185 170 172 170 154 C162 158 152 152 150 140 C148 127 152 118 150 110 Z\" fill=\"#fffbeb\" stroke=\"#b45309\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/>\n  <!-- OESOPHAGUS (vertical tube) -->\n  <rect x=\"143\" y=\"40\" width=\"14\" height=\"70\" rx=\"7\" fill=\"#eef2ff\" stroke=\"#4338ca\" stroke-width=\"2.5\"/>\n  <!-- MOUTH -->\n  <ellipse cx=\"150\" cy=\"28\" rx=\"22\" ry=\"12\" fill=\"#fef2f2\" stroke=\"#be123c\" stroke-width=\"2.5\"/>\n  <line x1=\"131\" y1=\"28\" x2=\"169\" y2=\"28\" stroke=\"#be123c\" stroke-width=\"1.5\"/>\n  <!-- ANUS opening -->\n  <ellipse cx=\"156\" cy=\"320\" rx=\"5.5\" ry=\"3.2\" fill=\"#15803d\"/>\n\n  <!-- LABELS + LEADER LINES WITH TRIANGLE ARROWHEADS -->\n  <g font-family=\"sans-serif\" fill=\"#1e293b\">\n    <!-- Mouth -->\n    <line x1=\"201\" y1=\"28\" x2=\"181\" y2=\"28\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M174 28 L181 25 L181 31 Z\" fill=\"#334155\"/>\n    <text x=\"206\" y=\"32\" font-size=\"13\">Mouth</text>\n    <!-- Oesophagus -->\n    <line x1=\"201\" y1=\"74\" x2=\"166\" y2=\"74\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M159 74 L166 71 L166 77 Z\" fill=\"#334155\"/>\n    <text x=\"206\" y=\"78\" font-size=\"13\">Oesophagus</text>\n    <!-- Stomach -->\n    <line x1=\"68\" y1=\"146\" x2=\"93\" y2=\"146\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M100 146 L93 143 L93 149 Z\" fill=\"#334155\"/>\n    <text x=\"12\" y=\"150\" font-size=\"13\">Stomach</text>\n    <!-- Small intestine -->\n    <line x1=\"222\" y1=\"240\" x2=\"200\" y2=\"240\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M193 240 L200 237 L200 243 Z\" fill=\"#334155\"/>\n    <text x=\"226\" y=\"236\" font-size=\"12\">Small<tspan x=\"226\" y=\"250\">intestine</tspan></text>\n    <!-- Large intestine -->\n    <line x1=\"68\" y1=\"250\" x2=\"91\" y2=\"250\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M98 250 L91 247 L91 253 Z\" fill=\"#334155\"/>\n    <text x=\"10\" y=\"246\" font-size=\"12\">Large<tspan x=\"10\" y=\"260\">intestine</tspan></text>\n    <!-- Anus -->\n    <line x1=\"191\" y1=\"320\" x2=\"175\" y2=\"320\" stroke=\"#334155\" stroke-width=\"1.3\"/>\n    <path d=\"M168 320 L175 317 L175 323 Z\" fill=\"#334155\"/>\n    <text x=\"196\" y=\"324\" font-size=\"12\">Anus</text>\n  </g>\n</svg>",
    },
  ],
  "chemical-reactions-explained": [
    {
      afterHeading: 1,
      caption: "Combination joins A and B into AB, decomposition splits AB back into A and B, and displacement lets A push B out to bond with C, so the same atoms appear on both sides of every arrow.",
      svg: "<svg viewBox=\"0 0 460 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Three types of chemical reactions shown with coloured atom circles where A is blue, B is green and C is amber. Combination: A plus B join into one AB molecule. Decomposition: AB splits into A plus B. Displacement: A plus BC react so A bonds with C to form AC and B is released. The same atoms appear on both sides of every arrow.\">\n  <text x=\"230\" y=\"26\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#1e293b\">Types of Chemical Reactions</text>\n  <line x1=\"14\" y1=\"127\" x2=\"446\" y2=\"127\" stroke=\"#e2e8f0\" stroke-width=\"1\"/>\n  <line x1=\"14\" y1=\"202\" x2=\"446\" y2=\"202\" stroke=\"#e2e8f0\" stroke-width=\"1\"/>\n\n  <text x=\"14\" y=\"86\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#1e293b\">Combination</text>\n  <text x=\"14\" y=\"102\" font-family=\"sans-serif\" font-size=\"11\" fill=\"#334155\">A + B &#8594; AB</text>\n  <circle cx=\"158\" cy=\"90\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"158\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <text x=\"185\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" fill=\"#334155\">+</text>\n  <circle cx=\"212\" cy=\"90\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"212\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n  <line x1=\"238\" y1=\"90\" x2=\"298\" y2=\"90\" stroke=\"#334155\" stroke-width=\"2\"/>\n  <path d=\"M 306 90 L 298 85 L 298 95 Z\" fill=\"#334155\"/>\n  <circle cx=\"335\" cy=\"90\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"335\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <circle cx=\"361\" cy=\"90\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"361\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n\n  <text x=\"14\" y=\"161\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#1e293b\">Decomposition</text>\n  <text x=\"14\" y=\"177\" font-family=\"sans-serif\" font-size=\"11\" fill=\"#334155\">AB &#8594; A + B</text>\n  <circle cx=\"150\" cy=\"165\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"150\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <circle cx=\"176\" cy=\"165\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"176\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n  <line x1=\"205\" y1=\"165\" x2=\"288\" y2=\"165\" stroke=\"#334155\" stroke-width=\"2\"/>\n  <path d=\"M 296 165 L 288 160 L 288 170 Z\" fill=\"#334155\"/>\n  <circle cx=\"322\" cy=\"165\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"322\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <text x=\"349\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" fill=\"#334155\">+</text>\n  <circle cx=\"376\" cy=\"165\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"376\" y=\"170\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n\n  <text x=\"14\" y=\"236\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#1e293b\">Displacement</text>\n  <text x=\"14\" y=\"252\" font-family=\"sans-serif\" font-size=\"11\" fill=\"#334155\">A + BC &#8594; AC + B</text>\n  <circle cx=\"145\" cy=\"240\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"145\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <text x=\"170\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" fill=\"#334155\">+</text>\n  <circle cx=\"195\" cy=\"240\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"195\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n  <circle cx=\"221\" cy=\"240\" r=\"15\" fill=\"#b45309\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <text x=\"221\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">C</text>\n  <line x1=\"250\" y1=\"240\" x2=\"306\" y2=\"240\" stroke=\"#334155\" stroke-width=\"2\"/>\n  <path d=\"M 314 240 L 306 235 L 306 245 Z\" fill=\"#334155\"/>\n  <circle cx=\"340\" cy=\"240\" r=\"15\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>\n  <text x=\"340\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">A</text>\n  <circle cx=\"366\" cy=\"240\" r=\"15\" fill=\"#b45309\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <text x=\"366\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">C</text>\n  <text x=\"393\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" fill=\"#334155\">+</text>\n  <circle cx=\"418\" cy=\"240\" r=\"15\" fill=\"#15803d\" stroke=\"#166534\" stroke-width=\"2\"/>\n  <text x=\"418\" y=\"245\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">B</text>\n</svg>",
    },
  ],
  "metals-nonmetals-explained": [
    {
      afterHeading: 1,
      caption: "Metals at the top like potassium react most easily and reactivity falls steadily down to gold at the bottom, with hydrogen placed between lead and copper as a comparison point.",
      svg: "<svg viewBox=\"0 0 320 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Reactivity series ladder from most reactive at the top to least reactive at the bottom, in the order potassium K, sodium Na, calcium Ca, magnesium Mg, aluminium Al, zinc Zn, iron Fe, lead Pb, hydrogen H, copper Cu, silver Ag, gold Au. Hydrogen sits between lead and copper. A downward arrow labelled reactivity decreases runs alongside.\" font-family=\"sans-serif\">\n  <rect x=\"20\" y=\"16\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#b91c1c\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"33\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">K</text>\n  <text x=\"66\" y=\"33\" font-size=\"12\" fill=\"#ffffff\">Potassium</text>\n\n  <rect x=\"20\" y=\"44\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#c2410c\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"61\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Na</text>\n  <text x=\"66\" y=\"61\" font-size=\"12\" fill=\"#ffffff\">Sodium</text>\n\n  <rect x=\"20\" y=\"72\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#b45309\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"89\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Ca</text>\n  <text x=\"66\" y=\"89\" font-size=\"12\" fill=\"#ffffff\">Calcium</text>\n\n  <rect x=\"20\" y=\"100\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#a16207\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"117\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Mg</text>\n  <text x=\"66\" y=\"117\" font-size=\"12\" fill=\"#ffffff\">Magnesium</text>\n\n  <rect x=\"20\" y=\"128\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#4d7c0f\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"145\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Al</text>\n  <text x=\"66\" y=\"145\" font-size=\"12\" fill=\"#ffffff\">Aluminium</text>\n\n  <rect x=\"20\" y=\"156\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#15803d\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"173\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Zn</text>\n  <text x=\"66\" y=\"173\" font-size=\"12\" fill=\"#ffffff\">Zinc</text>\n\n  <rect x=\"20\" y=\"184\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#0f766e\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"201\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Fe</text>\n  <text x=\"66\" y=\"201\" font-size=\"12\" fill=\"#ffffff\">Iron</text>\n\n  <rect x=\"20\" y=\"212\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#0e7490\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"229\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Pb</text>\n  <text x=\"66\" y=\"229\" font-size=\"12\" fill=\"#ffffff\">Lead</text>\n\n  <rect x=\"20\" y=\"240\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#0369a1\" stroke=\"#e2e8f0\" stroke-width=\"1.6\" stroke-dasharray=\"4 3\"/>\n  <text x=\"34\" y=\"257\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">H</text>\n  <text x=\"66\" y=\"257\" font-size=\"12\" fill=\"#ffffff\">Hydrogen</text>\n\n  <rect x=\"20\" y=\"268\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#1d4ed8\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"285\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Cu</text>\n  <text x=\"66\" y=\"285\" font-size=\"12\" fill=\"#ffffff\">Copper</text>\n\n  <rect x=\"20\" y=\"296\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#475569\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"313\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Ag</text>\n  <text x=\"66\" y=\"313\" font-size=\"12\" fill=\"#ffffff\">Silver</text>\n\n  <rect x=\"20\" y=\"324\" width=\"180\" height=\"26\" rx=\"4\" fill=\"#334155\" stroke=\"#1e293b\" stroke-opacity=\"0.15\"/>\n  <text x=\"34\" y=\"341\" font-size=\"14\" font-weight=\"700\" fill=\"#ffffff\">Au</text>\n  <text x=\"66\" y=\"341\" font-size=\"12\" fill=\"#ffffff\">Gold</text>\n\n  <line x1=\"240\" y1=\"24\" x2=\"240\" y2=\"326\" stroke=\"#334155\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n  <path d=\"M233,325 L247,325 L240,342 Z\" fill=\"#334155\"/>\n  <text x=\"285\" y=\"175\" font-size=\"12\" font-weight=\"600\" fill=\"#334155\" text-anchor=\"middle\" transform=\"rotate(90 285 175)\">reactivity decreases</text>\n</svg>",
    },
  ],
  "biological-classification-explained": [
    {
      afterHeading: 1,
      caption: "Biological classification narrows step by step from Kingdom, the broadest group with many organisms, down to Species, the most specific level naming a single kind of organism.",
      svg: "<svg viewBox=\"0 0 340 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Taxonomic hierarchy shown as a downward funnel of stacked bars that get narrower going down: Kingdom (widest) then Phylum, Class, Order, Family, Genus, and Species (narrowest). A side arrow notes a broad group with many organisms narrows to one specific organism.\">\n  <text x=\"150\" y=\"26\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#1e293b\">Taxonomic Hierarchy</text>\n  <g font-family=\"sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\" text-anchor=\"middle\">\n    <rect x=\"45\" y=\"50\" width=\"210\" height=\"28\" rx=\"5\" fill=\"#4338ca\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"68\">Kingdom</text>\n    <rect x=\"58\" y=\"83\" width=\"184\" height=\"28\" rx=\"5\" fill=\"#0f766e\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"101\">Phylum</text>\n    <rect x=\"71\" y=\"116\" width=\"158\" height=\"28\" rx=\"5\" fill=\"#be123c\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"134\">Class</text>\n    <rect x=\"84\" y=\"149\" width=\"132\" height=\"28\" rx=\"5\" fill=\"#b45309\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"167\">Order</text>\n    <rect x=\"97\" y=\"182\" width=\"106\" height=\"28\" rx=\"5\" fill=\"#15803d\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"200\">Family</text>\n    <rect x=\"110\" y=\"215\" width=\"80\" height=\"28\" rx=\"5\" fill=\"#4f46e5\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"233\">Genus</text>\n    <rect x=\"123\" y=\"248\" width=\"54\" height=\"28\" rx=\"5\" fill=\"#0d9488\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"150\" y=\"266\">Species</text>\n  </g>\n  <line x1=\"290\" y1=\"58\" x2=\"290\" y2=\"266\" stroke=\"#334155\" stroke-width=\"2\"/>\n  <path d=\"M290,276 L284,264 L296,264 Z\" fill=\"#334155\"/>\n  <text x=\"312\" y=\"163\" transform=\"rotate(90 312 163)\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"10\" fill=\"#334155\">broad group (many organisms) &#8594; specific (one)</text>\n</svg>",
    },
  ],
  "c12-current-electricity": [
    {
      afterHeading: 1,
      caption: "In a series circuit the current has only one path so the resistances add (R = R1 + R2), while in a parallel circuit the current splits between two branches so 1/R = 1/R1 + 1/R2.",
      svg: "<svg viewBox=\"0 0 460 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Two circuits. Left: a cell with resistors R1 and R2 in series on one single loop, so R equals R1 plus R2. Right: a cell with R1 and R2 on two separate parallel branches between the same two nodes, so 1 over R equals 1 over R1 plus 1 over R2.\" font-family=\"sans-serif\">\n  <rect x=\"18\" y=\"24\" width=\"190\" height=\"214\" rx=\"12\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1\"/>\n  <rect x=\"236\" y=\"24\" width=\"210\" height=\"214\" rx=\"12\" fill=\"#ecfdf5\" stroke=\"#a7f3d0\" stroke-width=\"1\"/>\n\n  <text x=\"117\" y=\"45\" font-size=\"14\" font-weight=\"bold\" fill=\"#4338ca\" text-anchor=\"middle\">SERIES</text>\n  <text x=\"330\" y=\"45\" font-size=\"14\" font-weight=\"bold\" fill=\"#15803d\" text-anchor=\"middle\">PARALLEL</text>\n\n  <!-- LEFT: SERIES (single loop) -->\n  <g stroke=\"#334155\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\">\n    <line x1=\"50\" y1=\"70\" x2=\"50\" y2=\"126\"/>\n    <line x1=\"50\" y1=\"136\" x2=\"50\" y2=\"190\"/>\n    <line x1=\"50\" y1=\"190\" x2=\"185\" y2=\"190\"/>\n    <line x1=\"185\" y1=\"70\" x2=\"185\" y2=\"106\"/>\n    <line x1=\"185\" y1=\"154\" x2=\"185\" y2=\"190\"/>\n    <line x1=\"50\" y1=\"70\" x2=\"93\" y2=\"70\"/>\n    <line x1=\"141\" y1=\"70\" x2=\"185\" y2=\"70\"/>\n  </g>\n  <line x1=\"38\" y1=\"126\" x2=\"62\" y2=\"126\" stroke=\"#1e293b\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"44\" y1=\"136\" x2=\"56\" y2=\"136\" stroke=\"#1e293b\" stroke-width=\"4.5\" stroke-linecap=\"round\"/>\n  <text x=\"68\" y=\"124\" font-size=\"12\" fill=\"#334155\">+</text>\n  <text x=\"68\" y=\"141\" font-size=\"13\" fill=\"#334155\">&#8722;</text>\n  <polyline points=\"93,70 97,63 105,77 113,63 121,77 129,63 137,77 141,70\" stroke=\"#0d9488\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <text x=\"117\" y=\"58\" font-size=\"13\" font-weight=\"bold\" fill=\"#0f766e\" text-anchor=\"middle\">R1</text>\n  <polyline points=\"185,106 178,110 192,118 178,126 192,134 178,142 192,150 185,154\" stroke=\"#e11d48\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <text x=\"174\" y=\"134\" font-size=\"13\" font-weight=\"bold\" fill=\"#be123c\" text-anchor=\"end\">R2</text>\n\n  <text x=\"117\" y=\"227\" font-size=\"12.5\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Series: R = R1 + R2</text>\n\n  <!-- RIGHT: PARALLEL (two branches) -->\n  <g stroke=\"#334155\" stroke-width=\"2.4\" stroke-linecap=\"round\" fill=\"none\">\n    <line x1=\"250\" y1=\"80\" x2=\"410\" y2=\"80\"/>\n    <line x1=\"250\" y1=\"180\" x2=\"410\" y2=\"180\"/>\n    <line x1=\"250\" y1=\"80\" x2=\"250\" y2=\"126\"/>\n    <line x1=\"250\" y1=\"136\" x2=\"250\" y2=\"180\"/>\n    <line x1=\"345\" y1=\"80\" x2=\"345\" y2=\"105\"/>\n    <line x1=\"345\" y1=\"153\" x2=\"345\" y2=\"180\"/>\n    <line x1=\"410\" y1=\"80\" x2=\"410\" y2=\"105\"/>\n    <line x1=\"410\" y1=\"153\" x2=\"410\" y2=\"180\"/>\n  </g>\n  <line x1=\"238\" y1=\"126\" x2=\"262\" y2=\"126\" stroke=\"#1e293b\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"244\" y1=\"136\" x2=\"256\" y2=\"136\" stroke=\"#1e293b\" stroke-width=\"4.5\" stroke-linecap=\"round\"/>\n  <text x=\"268\" y=\"124\" font-size=\"12\" fill=\"#334155\">+</text>\n  <text x=\"268\" y=\"141\" font-size=\"13\" fill=\"#334155\">&#8722;</text>\n  <circle cx=\"345\" cy=\"80\" r=\"3.2\" fill=\"#1e293b\"/>\n  <circle cx=\"345\" cy=\"180\" r=\"3.2\" fill=\"#1e293b\"/>\n  <circle cx=\"410\" cy=\"80\" r=\"3.2\" fill=\"#1e293b\"/>\n  <circle cx=\"410\" cy=\"180\" r=\"3.2\" fill=\"#1e293b\"/>\n  <polyline points=\"345,105 338,109 352,117 338,125 352,133 338,141 352,149 345,153\" stroke=\"#0d9488\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <text x=\"330\" y=\"133\" font-size=\"13\" font-weight=\"bold\" fill=\"#0f766e\" text-anchor=\"end\">R1</text>\n  <polyline points=\"410,105 403,109 417,117 403,125 417,133 403,141 417,149 410,153\" stroke=\"#e11d48\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <text x=\"424\" y=\"133\" font-size=\"13\" font-weight=\"bold\" fill=\"#be123c\" text-anchor=\"start\">R2</text>\n\n  <text x=\"330\" y=\"227\" font-size=\"12.5\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Parallel: 1/R = 1/R1 + 1/R2</text>\n</svg>",
    },
  ],
  "polynomials-basics": [
    {
      afterHeading: 1,
      caption: "As the degree grows the graph bends more: degree 1 is a straight line, degree 2 makes one U-shaped bend, and degree 3 makes an S with two bends.",
      svg: "<svg viewBox=\"0 0 470 200\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Three small graphs comparing polynomial shapes by degree: degree 1 linear is a straight slanted line, degree 2 quadratic is a U-shaped parabola, and degree 3 cubic is an S-shaped curve with two bends.\">\n  <rect x=\"24\" y=\"30\" width=\"102\" height=\"120\" rx=\"8\" fill=\"#eef2ff\"/>\n  <rect x=\"184\" y=\"30\" width=\"102\" height=\"120\" rx=\"8\" fill=\"#ecfdf5\"/>\n  <rect x=\"344\" y=\"30\" width=\"102\" height=\"120\" rx=\"8\" fill=\"#fef2f2\"/>\n  <g stroke=\"#334155\" stroke-width=\"1.3\" stroke-linecap=\"round\">\n    <line x1=\"75\" y1=\"142\" x2=\"75\" y2=\"42\"/>\n    <line x1=\"33\" y1=\"90\" x2=\"117\" y2=\"90\"/>\n    <line x1=\"235\" y1=\"142\" x2=\"235\" y2=\"42\"/>\n    <line x1=\"193\" y1=\"90\" x2=\"277\" y2=\"90\"/>\n    <line x1=\"395\" y1=\"142\" x2=\"395\" y2=\"42\"/>\n    <line x1=\"353\" y1=\"90\" x2=\"437\" y2=\"90\"/>\n  </g>\n  <g fill=\"#334155\">\n    <path d=\"M75,37 L71.5,44 L78.5,44 Z\"/>\n    <path d=\"M121,90 L114,86.5 L114,93.5 Z\"/>\n    <path d=\"M235,37 L231.5,44 L238.5,44 Z\"/>\n    <path d=\"M281,90 L274,86.5 L274,93.5 Z\"/>\n    <path d=\"M395,37 L391.5,44 L398.5,44 Z\"/>\n    <path d=\"M441,90 L434,86.5 L434,93.5 Z\"/>\n  </g>\n  <line x1=\"37\" y1=\"128\" x2=\"113\" y2=\"52\" fill=\"none\" stroke=\"#4f46e5\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M193,46 Q235,134 277,46\" fill=\"none\" stroke=\"#0d9488\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M352.45,107.2 C380.82,-90 409.18,270 437.55,72.8\" fill=\"none\" stroke=\"#e11d48\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <g font-family=\"sans-serif\" text-anchor=\"middle\" fill=\"#1e293b\" font-size=\"12.5\">\n    <text x=\"75\" y=\"174\"><tspan font-weight=\"700\">degree 1</tspan> &#183; linear</text>\n    <text x=\"235\" y=\"174\"><tspan font-weight=\"700\">degree 2</tspan> &#183; quadratic</text>\n    <text x=\"395\" y=\"174\"><tspan font-weight=\"700\">degree 3</tspan> &#183; cubic</text>\n  </g>\n</svg>",
    },
  ],
  "algebra-explained": [
    {
      afterHeading: 1,
      caption: "The scale balances x + 3 against 7, so taking away 3 blocks from each side keeps it level and leaves x = 4.",
      svg: "<svg viewBox=\"0 0 420 290\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"A level balance scale. The left pan holds a box labelled x plus three 1-blocks, showing x + 3. The right pan holds seven 1-blocks, showing 7. The beam is level, so both sides are equal. Taking three 1-blocks from each side leaves the x box balancing four blocks, so x = 4.\">\n  <g font-family=\"sans-serif\">\n    <text x=\"210\" y=\"24\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"bold\" fill=\"#1e293b\">x + 3 = 7</text>\n    <text x=\"210\" y=\"41\" text-anchor=\"middle\" font-size=\"11\" fill=\"#64748b\">Balanced — so do the same to both sides</text>\n    <line x1=\"170\" y1=\"172\" x2=\"250\" y2=\"172\" stroke=\"#94a3b8\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n    <polygon points=\"210,96 191,172 229,172\" fill=\"#d97706\" stroke=\"#b45309\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>\n    <rect x=\"86\" y=\"88\" width=\"248\" height=\"8\" rx=\"4\" fill=\"#4338ca\"/>\n    <circle cx=\"210\" cy=\"96\" r=\"3.5\" fill=\"#312e81\"/>\n    <g stroke=\"#475569\" stroke-width=\"1.5\">\n      <line x1=\"104\" y1=\"94\" x2=\"44\" y2=\"150\"/>\n      <line x1=\"104\" y1=\"94\" x2=\"164\" y2=\"150\"/>\n      <line x1=\"316\" y1=\"94\" x2=\"256\" y2=\"150\"/>\n      <line x1=\"316\" y1=\"94\" x2=\"376\" y2=\"150\"/>\n    </g>\n    <circle cx=\"104\" cy=\"93\" r=\"2.5\" fill=\"#334155\"/>\n    <circle cx=\"316\" cy=\"93\" r=\"2.5\" fill=\"#334155\"/>\n    <path d=\"M44 150 Q104 176 164 150 Z\" fill=\"#ecfdf5\" stroke=\"#0f766e\" stroke-width=\"1.5\"/>\n    <path d=\"M256 150 Q316 176 376 150 Z\" fill=\"#ecfdf5\" stroke=\"#0f766e\" stroke-width=\"1.5\"/>\n    <rect x=\"55\" y=\"124\" width=\"28\" height=\"26\" rx=\"3\" fill=\"#eef2ff\" stroke=\"#4338ca\" stroke-width=\"2\"/>\n    <text x=\"69\" y=\"144\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\" font-weight=\"bold\" fill=\"#4338ca\">x</text>\n    <text x=\"90\" y=\"147\" text-anchor=\"middle\" font-size=\"14\" fill=\"#334155\">+</text>\n    <g stroke=\"#e11d48\" stroke-width=\"1.5\">\n      <rect x=\"98\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n      <rect x=\"115\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n      <rect x=\"132\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n    </g>\n    <g font-size=\"11\" text-anchor=\"middle\" fill=\"#be123c\">\n      <text x=\"105\" y=\"147\">1</text>\n      <text x=\"122\" y=\"147\">1</text>\n      <text x=\"139\" y=\"147\">1</text>\n    </g>\n    <g stroke=\"#b45309\" stroke-width=\"1.5\">\n      <rect x=\"258\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fffbeb\"/>\n      <rect x=\"275\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fffbeb\"/>\n      <rect x=\"292\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fffbeb\"/>\n      <rect x=\"309\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fffbeb\"/>\n    </g>\n    <g font-size=\"11\" text-anchor=\"middle\" fill=\"#b45309\">\n      <text x=\"265\" y=\"147\">1</text>\n      <text x=\"282\" y=\"147\">1</text>\n      <text x=\"299\" y=\"147\">1</text>\n      <text x=\"316\" y=\"147\">1</text>\n    </g>\n    <g stroke=\"#e11d48\" stroke-width=\"1.5\">\n      <rect x=\"326\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n      <rect x=\"343\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n      <rect x=\"360\" y=\"136\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#fef2f2\"/>\n    </g>\n    <g font-size=\"11\" text-anchor=\"middle\" fill=\"#be123c\">\n      <text x=\"333\" y=\"147\">1</text>\n      <text x=\"350\" y=\"147\">1</text>\n      <text x=\"367\" y=\"147\">1</text>\n    </g>\n    <text x=\"104\" y=\"181\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#334155\">x + 3</text>\n    <text x=\"316\" y=\"181\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#334155\">7</text>\n    <rect x=\"112\" y=\"198\" width=\"196\" height=\"50\" rx=\"12\" fill=\"#eef2ff\" stroke=\"#c7d2fe\" stroke-width=\"1.5\"/>\n    <text x=\"210\" y=\"217\" text-anchor=\"middle\" font-size=\"12\" fill=\"#334155\">Take 3 from both sides</text>\n    <line x1=\"168\" y1=\"233\" x2=\"186\" y2=\"233\" stroke=\"#334155\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n    <path d=\"M186 229 L194 233 L186 237 Z\" fill=\"#334155\"/>\n    <text x=\"204\" y=\"239\" font-size=\"17\" font-weight=\"bold\"><tspan font-style=\"italic\" fill=\"#4338ca\">x</tspan><tspan fill=\"#334155\"> = </tspan><tspan fill=\"#b45309\">4</tspan></text>\n  </g>\n</svg>",
    },
  ],
};
