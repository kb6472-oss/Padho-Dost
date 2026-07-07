// Visual explainer content — rich, structured, stored in the repo (free to serve, SEO-friendly).
// The DB Explainer row holds metadata; the actual content lives here keyed by slug.

export type Block =
  | { type: "heading"; text: string }
  | { type: "para"; text: string }
  | { type: "analogy"; title?: string; text: string }
  | { type: "formula"; text: string }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "example"; title?: string; lines: string[] }
  | { type: "callout"; tone?: "tip" | "warn" | "info"; text: string }
  | { type: "keypoints"; title?: string; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quiz"; question: string; options: string[]; correct: number; explain: string };

export type ExplainerContent = {
  slug: string;
  title: string;
  summary: string;
  examSlug: string;
  subjectSlug: string;
  chapterSlug: string;
  readingMinutes: number;
  practiceTestSlug?: string; // link to the matching mock test
  blocks: Block[];
};

export const explainers: ExplainerContent[] = [
  {
    slug: "profit-and-loss-basics",
    title: "Profit & Loss — The Complete Basics",
    summary: "Cost price, selling price, and every profit/loss formula explained with a chai-shop analogy and shortcuts.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "profit-and-loss",
    readingMinutes: 7,
    practiceTestSlug: "profit-loss-practice-1",
    blocks: [
      { type: "analogy", title: "The chai-shop model", text: "Imagine you run a chai stall. You spend ₹10 to make one cup — that's your Cost Price (CP). You sell it for ₹13 — that's your Selling Price (SP). The extra ₹3 you keep is your Profit. If you'd sold it for ₹8 instead, you'd have a Loss of ₹2. Every profit-and-loss question is just a twist on this." },
      { type: "heading", text: "The two core formulas" },
      { type: "formula", text: "Profit = SP − CP        Loss = CP − SP" },
      { type: "callout", tone: "tip", text: "Profit % and Loss % are ALWAYS calculated on the Cost Price (CP) — never on SP. This single rule fixes most mistakes." },
      { type: "heading", text: "Every formula in one table" },
      {
        type: "table",
        headers: ["To find", "Formula"],
        rows: [
          ["Profit %", "(Profit / CP) × 100"],
          ["Loss %", "(Loss / CP) × 100"],
          ["SP (given Profit%)", "CP × (100 + P%) / 100"],
          ["SP (given Loss%)", "CP × (100 − L%) / 100"],
          ["CP (given SP & Profit%)", "SP × 100 / (100 + P%)"],
        ],
      },
      { type: "heading", text: "Worked example" },
      {
        type: "example",
        title: "A watch costs ₹800 and is sold at 25% profit. Find the SP.",
        lines: [
          "Formula: SP = CP × (100 + P%) / 100",
          "SP = 800 × 125 / 100 = ₹1000",
          "⚡ Shortcut: 25% of 800 = 200, so SP = 800 + 200 = ₹1000",
        ],
      },
      { type: "keypoints", title: "Remember", items: ["SP > CP → Profit", "SP < CP → Loss", "SP = CP → No profit, no loss", "% is on CP, always"] },
      {
        type: "quiz",
        question: "A book bought for ₹500 is sold for ₹450. What is the loss %?",
        options: ["9%", "10%", "11%", "12%"],
        correct: 1,
        explain: "Loss = 500 − 450 = ₹50. Loss% = (50/500) × 100 = 10%.",
      },
    ],
  },
  {
    slug: "percentages-basics",
    title: "Percentages — Master the Per-Hundred",
    summary: "What % really means, fraction shortcuts, and the successive-change trick that saves time in every exam.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "percentages",
    readingMinutes: 6,
    practiceTestSlug: "percentages-practice-1",
    blocks: [
      { type: "analogy", title: "Percent = per hundred", text: "The word 'percent' literally means 'per hundred'. So 25% just means 25 out of every 100, i.e. 25/100 = ¼. Once you see every percentage as a simple fraction, the maths becomes mental." },
      { type: "heading", text: "The one formula" },
      { type: "formula", text: "x% of N  =  (x / 100) × N" },
      { type: "heading", text: "Know these by heart" },
      {
        type: "table",
        headers: ["Percent", "Fraction", "Quick use"],
        rows: [
          ["50%", "1/2", "half"],
          ["25%", "1/4", "quarter"],
          ["20%", "1/5", "÷5"],
          ["12.5%", "1/8", "÷8"],
          ["33⅓%", "1/3", "÷3"],
        ],
      },
      { type: "callout", tone: "tip", text: "Converting a % to its fraction turns a 'calculation' into a 'division'. 20% of 240 = 240 ÷ 5 = 48 — done in your head." },
      { type: "heading", text: "The successive-change trick" },
      { type: "para", text: "When a value goes up by a% and then down by b%, don't subtract — multiply the factors. An increase of 20% then a decrease of 20% is 1.2 × 0.8 = 0.96, i.e. a net 4% DECREASE (not zero!)." },
      {
        type: "example",
        title: "A salary rises 10%, then falls 10%. Net change?",
        lines: ["Factor = 1.10 × 0.90 = 0.99", "0.99 means 99% of the original → a 1% net decrease."],
      },
      {
        type: "quiz",
        question: "40% of a number is 80. What is the number?",
        options: ["180", "200", "220", "240"],
        correct: 1,
        explain: "If 40% = 80, then 100% = 80 ÷ 0.40 = 200.",
      },
    ],
  },
  {
    slug: "real-numbers-basics",
    title: "Real Numbers — HCF, LCM & Rationality",
    summary: "The number family tree, the HCF×LCM rule, and how to tell rational from irrational — the Class 10 essentials.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "real-numbers",
    readingMinutes: 6,
    practiceTestSlug: "real-numbers-practice-1",
    blocks: [
      { type: "analogy", title: "The number family", text: "Real numbers are one big family. Natural numbers (1,2,3…) grow into whole numbers (add 0), then integers (add negatives), then rationals (any p/q fraction). Numbers that REFUSE to be written as p/q — like √2 and π — are the irrationals. Together, rationals + irrationals = all real numbers." },
      { type: "heading", text: "Rational vs Irrational" },
      { type: "keypoints", items: ["Rational: can be written as p/q (q ≠ 0). e.g. 0.5, 2/3, 7", "Its decimal either terminates (0.75) or repeats (0.333…)", "Irrational: cannot be written as p/q. e.g. √2, √3, π", "Its decimal is non-terminating AND non-repeating"] },
      { type: "heading", text: "HCF and LCM" },
      { type: "para", text: "HCF (Highest Common Factor) is the biggest number that divides two numbers. LCM (Lowest Common Multiple) is the smallest number both divide into. Find them using prime factorisation." },
      {
        type: "example",
        title: "HCF and LCM of 12 and 18",
        lines: ["12 = 2 × 2 × 3", "18 = 2 × 3 × 3", "HCF = common primes = 2 × 3 = 6", "LCM = all primes (highest powers) = 2² × 3² = 36"],
      },
      { type: "heading", text: "The golden rule" },
      { type: "formula", text: "HCF(a, b) × LCM(a, b)  =  a × b" },
      { type: "callout", tone: "tip", text: "Check it: HCF(12,18) × LCM(12,18) = 6 × 36 = 216, and 12 × 18 = 216. ✓ If you know three of the four values, you can always find the fourth." },
      {
        type: "quiz",
        question: "Which of these is an irrational number?",
        options: ["0.5", "2/3", "√2", "1.75"],
        correct: 2,
        explain: "√2 = 1.41421356… never terminates or repeats, so it can't be written as p/q — it is irrational. The others are all rational.",
      },
    ],
  },
  {
    slug: "averages-basics",
    title: "Averages — Sum ÷ Count, Made Simple",
    summary: "What an average really is, the one formula, and the 'work with the total' trick for tricky problems.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "average",
    readingMinutes: 5,
    practiceTestSlug: "average-practice-1",
    blocks: [
      { type: "analogy", title: "Sharing equally", text: "An average is what each person would get if everything were shared out equally. Three friends have ₹10, ₹20 and ₹30 — together ₹60. Shared equally that's ₹20 each. That's the average." },
      { type: "heading", text: "The only formula you need" },
      { type: "formula", text: "Average = (Sum of values) ÷ (Number of values)" },
      { type: "callout", tone: "tip", text: "Flip it: Sum = Average × Count. Most 'tricky' average questions are just switching between these two forms." },
      { type: "example", title: "Average age of 5 students is 12. Adding the teacher makes it 15. Teacher's age?", lines: ["Students' total = 12 × 5 = 60", "With teacher (6 people), total = 15 × 6 = 90", "Teacher's age = 90 − 60 = 30 years"] },
      { type: "keypoints", title: "Remember", items: ["The average always lies between the smallest and largest value", "Average of consecutive numbers = (first + last) ÷ 2", "For changes, work with the TOTAL, not the individual values"] },
      { type: "quiz", question: "The average of 5 numbers is 20. What is their sum?", options: ["80", "100", "120", "125"], correct: 1, explain: "Sum = Average × Count = 20 × 5 = 100." },
    ],
  },
  {
    slug: "time-and-work-basics",
    title: "Time & Work — Think in '1-Day Work'",
    summary: "The unitary trick: turn 'days' into 'work per day', add them up, and Time & Work becomes easy.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "time-and-work",
    readingMinutes: 6,
    practiceTestSlug: "time-and-work-practice-1",
    blocks: [
      { type: "analogy", title: "Eating a pizza", text: "If you finish a pizza in 4 days, you eat ¼ of it each day. Work is the same: if A finishes a job in 10 days, A does 1/10 of it per day. This '1-day work' idea unlocks everything." },
      { type: "heading", text: "The core idea" },
      { type: "formula", text: "1 day's work  =  1 ÷ (days to finish alone)" },
      { type: "para", text: "When people work together, just ADD their 1-day works. If A does 1/6 per day and B does 1/12 per day, together they do 1/6 + 1/12 = 1/4 per day — so they finish in 4 days." },
      { type: "example", title: "A finishes in 6 days, B in 12 days. Together?", lines: ["A's 1-day work = 1/6", "B's 1-day work = 1/12", "Together = 1/6 + 1/12 = 3/12 = 1/4 per day", "Time together = 4 days"] },
      { type: "callout", tone: "tip", text: "More workers → less time (inverse). Double the men and the same work takes half the time." },
      { type: "quiz", question: "A is twice as efficient as B. If B alone takes 12 days, how long does A take?", options: ["24 days", "6 days", "12 days", "8 days"], correct: 1, explain: "Twice as efficient means half the time: 12 ÷ 2 = 6 days." },
    ],
  },
  {
    slug: "polynomials-basics",
    title: "Polynomials — Degree, Zeroes & the Magic Relations",
    summary: "What degree means, what 'zeroes' are, and the sum/product-of-zeroes shortcuts for quadratics.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "polynomials",
    readingMinutes: 6,
    practiceTestSlug: "polynomials-practice-1",
    blocks: [
      { type: "para", text: "A polynomial is an expression like 3x² + 2x + 1 — terms with whole-number powers of x added together. The DEGREE is the highest power present." },
      { type: "table", headers: ["Degree", "Name", "Example"], rows: [["1", "Linear", "2x + 3"], ["2", "Quadratic", "x² − 5x + 6"], ["3", "Cubic", "x³ + 1"]] },
      { type: "heading", text: "What is a 'zero'?" },
      { type: "analogy", title: "Where it touches the ground", text: "A zero of a polynomial is a value of x that makes it equal to 0 — graphically, where the curve crosses the x-axis. For x² − 4, the zeroes are x = 2 and x = −2 (since 2² − 4 = 0)." },
      { type: "heading", text: "The magic relations (quadratics)" },
      { type: "para", text: "For a quadratic ax² + bx + c with zeroes α and β, you don't even need to solve it to know these:" },
      { type: "formula", text: "Sum of zeroes = −b/a        Product of zeroes = c/a" },
      { type: "example", title: "For x² − 5x + 6  (a = 1, b = −5, c = 6):", lines: ["Sum of zeroes = −(−5)/1 = 5", "Product of zeroes = 6/1 = 6", "Check: zeroes are 2 and 3 → 2 + 3 = 5 ✓ and 2 × 3 = 6 ✓"] },
      { type: "quiz", question: "For ax² + bx + c, the product of the zeroes is:", options: ["−b/a", "b/a", "c/a", "−c/a"], correct: 2, explain: "Product of zeroes = c/a (constant term ÷ leading coefficient)." },
    ],
  },
  {
    slug: "units-measurements-basics",
    title: "Units & Measurements — The Language of Physics",
    summary: "Fundamental vs derived quantities, the 7 SI base units, dimensional formulas, and significant figures.",
    examSlug: "jee",
    subjectSlug: "physics",
    chapterSlug: "units-and-measurements",
    readingMinutes: 6,
    practiceTestSlug: "units-measurements-practice-1",
    blocks: [
      { type: "analogy", title: "Measuring = comparing", text: "Every measurement is a comparison against a standard. Saying a table is '2 metres' means it's twice the agreed 'metre'. Physics just needs everyone to agree on the standards — that's what units are." },
      { type: "heading", text: "Fundamental vs derived" },
      { type: "para", text: "A few quantities are FUNDAMENTAL (base) — defined on their own. Everything else is DERIVED by combining them. e.g. speed = length ÷ time is derived from length and time." },
      { type: "keypoints", title: "The 7 SI base units", items: ["metre (m) — length", "kilogram (kg) — mass", "second (s) — time", "ampere (A) — electric current", "kelvin (K) — temperature", "mole (mol) — amount of substance", "candela (cd) — luminous intensity"] },
      { type: "heading", text: "Dimensional formulas" },
      { type: "para", text: "A dimensional formula shows which base quantities make up a derived one, using M (mass), L (length) and T (time)." },
      { type: "formula", text: "velocity = [LT⁻¹]    acceleration = [LT⁻²]    force = [MLT⁻²]" },
      { type: "callout", tone: "tip", text: "Significant figures: leading zeros never count, but trailing zeros after a decimal do. So 0.00450 has 3 significant figures (4, 5 and the last 0)." },
      { type: "quiz", question: "How many fundamental (base) units are there in the SI system?", options: ["5", "6", "7", "9"], correct: 2, explain: "There are exactly 7 SI base units." },
    ],
  },
  {
    slug: "cell-basics",
    title: "The Cell — Life's Tiny Factory",
    summary: "Prokaryotes vs eukaryotes, the key organelles and their jobs, and what makes plant cells different.",
    examSlug: "neet",
    subjectSlug: "biology",
    chapterSlug: "cell-unit-of-life",
    readingMinutes: 6,
    practiceTestSlug: "cell-unit-of-life-practice-1",
    blocks: [
      { type: "analogy", title: "A cell is a factory", text: "Think of a cell as a tiny factory. The nucleus is the manager's office (holds the instructions — DNA), the mitochondria are the power generators, the ribosomes are the assembly machines (make proteins), and the cell membrane is the security gate controlling what enters and leaves." },
      { type: "heading", text: "Two types of cells" },
      { type: "keypoints", items: ["Prokaryotic — NO true (membrane-bound) nucleus. e.g. bacteria.", "Eukaryotic — HAS a true nucleus + membrane-bound organelles. e.g. plant, animal & fungal cells."] },
      { type: "heading", text: "Key organelles & their jobs" },
      { type: "table", headers: ["Organelle", "Job"], rows: [["Nucleus", "Holds DNA; controls the cell"], ["Mitochondria", "Powerhouse — makes energy (ATP)"], ["Ribosome", "Makes proteins"], ["Cell wall", "Rigid support (plants only)"], ["Chloroplast", "Photosynthesis (plants only)"]] },
      { type: "callout", tone: "tip", text: "Plant cell = animal cell + cell wall + chloroplasts + a large central vacuole. That difference is a favourite exam question." },
      { type: "quiz", question: "Which organelle is called the 'powerhouse of the cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"], correct: 2, explain: "Mitochondria generate energy (ATP), so they're the powerhouse of the cell." },
    ],
  },
  {
    slug: "ratio-proportion-basics",
    title: "Ratio & Proportion — Compare and Scale",
    summary: "What a ratio really means, how to simplify it, and the cross-multiplication trick for proportions.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "ratio-and-proportion",
    readingMinutes: 5,
    practiceTestSlug: "ratio-proportion-practice-1",
    blocks: [
      { type: "analogy", title: "A recipe", text: "A ratio is a recipe for mixing. '2 : 3' means for every 2 parts of one thing, take 3 of another. Double the recipe and it's still 2 : 3 — the relationship stays the same, only the amounts grow." },
      { type: "heading", text: "Simplifying a ratio" },
      { type: "para", text: "Divide both sides by their HCF. 12 : 18 → divide by 6 → 2 : 3. A ratio in its lowest terms is easiest to work with." },
      { type: "heading", text: "Proportion" },
      { type: "para", text: "A proportion says two ratios are equal: a : b = c : d. When that's true, the cross-products are equal." },
      { type: "formula", text: "If  a : b = c : d   then   a × d = b × c" },
      { type: "example", title: "Find x if 3 : 6 = 5 : x", lines: ["Cross-multiply: 3 × x = 6 × 5", "3x = 30", "x = 10"] },
      { type: "callout", tone: "tip", text: "To split a quantity in a ratio, add the parts to get the total, then take each share as a fraction. Split ₹600 in 2 : 3 → 5 parts → A = 2/5 × 600 = ₹240." },
      { type: "quiz", question: "Divide ₹600 between A and B in the ratio 2 : 3. A's share is:", options: ["₹200", "₹240", "₹300", "₹360"], correct: 1, explain: "Total = 5 parts. A = (2/5) × 600 = ₹240." },
    ],
  },
  {
    slug: "trigonometry-basics",
    title: "Trigonometry — SOH-CAH-TOA & Standard Values",
    summary: "The three ratios, the SOH-CAH-TOA memory trick, the standard-angle table, and the key identity.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "trigonometry",
    readingMinutes: 6,
    practiceTestSlug: "trigonometry-practice-1",
    blocks: [
      { type: "analogy", title: "Three sides, three ratios", text: "In a right triangle, name the sides relative to an angle θ: the side across from θ is 'Opposite', the one beside it is 'Adjacent', and the longest (the slope) is the 'Hypotenuse'. Trigonometry is just ratios of these three sides." },
      { type: "heading", text: "The memory trick: SOH-CAH-TOA" },
      { type: "formula", text: "sin θ = O/H      cos θ = A/H      tan θ = O/A" },
      { type: "heading", text: "Standard values (memorise these)" },
      { type: "table", headers: ["θ", "sin", "cos", "tan"], rows: [["0°", "0", "1", "0"], ["30°", "1/2", "√3/2", "1/√3"], ["45°", "1/√2", "1/√2", "1"], ["60°", "√3/2", "1/2", "√3"], ["90°", "1", "0", "∞"]] },
      { type: "callout", tone: "tip", text: "Notice cos is just sin read backwards. Memorise the sin row and you get the cos row for free." },
      { type: "heading", text: "The identity you'll use everywhere" },
      { type: "formula", text: "sin²θ + cos²θ = 1" },
      { type: "quiz", question: "The value of tan 45° is:", options: ["0", "1", "√3", "1/√3"], correct: 1, explain: "tan 45° = sin 45° / cos 45° = (1/√2)/(1/√2) = 1." },
    ],
  },
  {
    slug: "laws-of-motion-basics",
    title: "Newton's Laws of Motion — The Big Three",
    summary: "Inertia, F = ma, and action–reaction — the three laws that explain all everyday motion.",
    examSlug: "jee",
    subjectSlug: "physics",
    chapterSlug: "laws-of-motion",
    readingMinutes: 6,
    practiceTestSlug: "laws-of-motion-practice-1",
    blocks: [
      { type: "analogy", title: "The seatbelt jolt", text: "When a car brakes suddenly, your body lurches forward — it 'wanted' to keep moving. That's inertia, Newton's first law in action. The three laws together explain every push, pull and collision." },
      { type: "heading", text: "First law — inertia" },
      { type: "para", text: "A body stays at rest, or keeps moving at constant velocity, unless a net external force acts on it. Motion doesn't change on its own." },
      { type: "heading", text: "Second law — F = ma" },
      { type: "formula", text: "Force = mass × acceleration   (F = ma)" },
      { type: "para", text: "The harder you push (more force) or the lighter the object (less mass), the greater the acceleration. This is the law you'll calculate with most." },
      { type: "heading", text: "Third law — action & reaction" },
      { type: "para", text: "Every action has an equal and opposite reaction. When you jump, you push the ground down and the ground pushes you up." },
      { type: "callout", tone: "tip", text: "Momentum p = mv. Newton's second law can also be stated as: force equals the rate of change of momentum." },
      { type: "quiz", question: "A body of mass 2 kg has an acceleration of 5 m/s². The force on it is:", options: ["2.5 N", "10 N", "7 N", "3 N"], correct: 1, explain: "F = ma = 2 × 5 = 10 N." },
    ],
  },
];

export const getExplainer = (slug: string) => explainers.find((e) => e.slug === slug);
