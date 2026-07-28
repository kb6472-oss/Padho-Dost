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
};
