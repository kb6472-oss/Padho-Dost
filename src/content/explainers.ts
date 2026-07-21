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
  {
    slug: "simple-interest-explained",
    title: "Simple Interest — The Complete Basics",
    summary: "Understand Simple Interest with an everyday analogy, the core SI formula and all its rearrangements, a fully worked example, exam shortcuts, and a self-check quiz for SSC-CGL.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "simple-interest",
    readingMinutes: 6,
    practiceTestSlug: "simple-interest-practice-1",
    blocks: [
        { type: "analogy", title: "Renting your money", text: "Imagine you lend your friend ₹1,000 and, like renting out a bicycle, you charge a small fixed fee for every year he keeps it. That yearly rent on money is called interest. In Simple Interest, the rent is calculated only on the original ₹1,000 every single year — it never changes. That fixed, unchanging rent is the whole idea." },
        { type: "para", text: "The money you lend or borrow is the Principal (P). The percentage charged per year is the Rate (R), usually 'per annum' meaning per year. The duration is the Time (T). In Simple Interest, the interest for each year stays the same because it is always figured on the original principal, not on the growing total." },
        { type: "heading", text: "The Core Formula" },
        { type: "formula", text: "SI = (P x R x T) / 100" },
        { type: "formula", text: "Amount (A) = P + SI = P x (1 + (R x T)/100)" },
        { type: "table", headers: ["To find","Formula"], rows: [["Simple Interest","SI = P x R x T / 100"],["Principal","P = 100 x SI / (R x T)"],["Rate","R = 100 x SI / (P x T)"],["Time","T = 100 x SI / (P x R)"],["Amount","A = P + SI"]] },
        { type: "steps", title: "How to solve any SI problem", items: ["Write down what you know: P, R, T, or SI/Amount.","Make sure R and T use the same time unit (both in years).","Put the values into SI = P x R x T / 100.","If the question asks for the Amount, add SI to P at the end."] },
        { type: "example", title: "Worked example", lines: ["Q: Find the Simple Interest and final Amount on ₹8,000 at 5% per annum for 3 years.","Given: P = ₹8,000, R = 5, T = 3.","SI = (8000 x 5 x 3) / 100","SI = 120000 / 100 = ₹1,200","Amount = P + SI = 8000 + 1200 = ₹9,200","Answer: SI = ₹1,200 and Amount = ₹9,200."] },
        { type: "callout", tone: "warn", text: "Watch the units. If the rate is per annum but the time is given in months, convert months to years first (for example, 9 months = 9/12 = 3/4 year). Mixing units is the most common mistake in the exam." },
        { type: "callout", tone: "tip", text: "Handy shortcut: at simple interest a sum doubles when SI equals P, so 100 = R x T. For example, money doubles in 8 years means R = 100/8 = 12.5% per annum. To triple, SI must equal 2P, so 200 = R x T." },
        { type: "keypoints", title: "Remember these", items: ["Interest is always calculated on the original principal only — it never compounds.","SI = P x R x T / 100 is the one formula everything else comes from.","The same interest is earned every year, so SI grows in a straight line with time.","Amount = Principal + Simple Interest.","Keep rate and time in matching units before you calculate."] },
        { type: "quiz", question: "At what rate of simple interest per annum will ₹2,000 grow to ₹2,500 in 5 years?", options: ["5%","4%","6%","2.5%"], correct: 0, explain: "First find the interest: SI = Amount - Principal = 2500 - 2000 = ₹500. Now use R = 100 x SI / (P x T) = 100 x 500 / (2000 x 5) = 50000 / 10000 = 5% per annum." },
    ],
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest — Interest That Grows on Itself",
    summary: "Learn Compound Interest through a simple snowball analogy, master the amount formula for annual, half-yearly and quarterly compounding, see a worked example, use the CI-minus-SI shortcuts, and test yourself with a quiz for SSC-CGL.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "compound-interest",
    readingMinutes: 7,
    practiceTestSlug: "compound-interest-practice-1",
    blocks: [
        { type: "analogy", title: "A rolling snowball", text: "Push a small snowball down a hill. As it rolls it picks up snow, gets bigger, and because it is bigger it picks up even more snow next. Compound Interest works the same way: each year's interest is added to your money, and the next year you earn interest on that bigger total too. Interest starts earning interest — that is 'compounding'." },
        { type: "para", text: "The difference from Simple Interest is exactly this: in SI the interest is always on the original principal, but in CI the interest is added back so the principal keeps growing. That is why savings, loans, and EMIs in real life almost always use compound interest." },
        { type: "heading", text: "The Main Formulas" },
        { type: "formula", text: "Amount A = P x (1 + R/100)^n   (compounded yearly, n = number of years)" },
        { type: "formula", text: "Compound Interest CI = A - P = P x [ (1 + R/100)^n - 1 ]" },
        { type: "table", headers: ["Compounding","Rate used","Number of times (power)"], rows: [["Yearly (annual)","R/100","n = years"],["Half-yearly","R/200 (half the rate)","2 x years"],["Quarterly","R/400 (quarter the rate)","4 x years"]] },
        { type: "callout", tone: "info", text: "When compounding is more frequent, divide the rate and multiply the power to match the number of periods. Example: 10% per annum for 1 year compounded half-yearly means 5% applied twice." },
        { type: "steps", title: "How to solve a CI problem", items: ["Identify P, R, and the time.","Check how often it compounds — yearly, half-yearly, or quarterly.","Adjust the rate and the power to match that frequency.","Compute the Amount with A = P x (1 + rate)^power.","For CI alone, subtract: CI = A - P."] },
        { type: "example", title: "Worked example", lines: ["Q: Find the Compound Interest on ₹10,000 at 10% per annum for 2 years, compounded annually.","Given: P = ₹10,000, R = 10, n = 2.","A = 10000 x (1 + 10/100)^2 = 10000 x (1.1)^2","(1.1)^2 = 1.21, so A = 10000 x 1.21 = ₹12,100","CI = A - P = 12100 - 10000 = ₹2,100","Compare: Simple Interest would be 10000 x 10 x 2 / 100 = ₹2,000.","CI is ₹100 more than SI — that extra ₹100 is the interest earned on the first year's interest."] },
        { type: "heading", text: "The CI minus SI Shortcut" },
        { type: "formula", text: "CI - SI for 2 years = P x (R/100)^2" },
        { type: "formula", text: "CI - SI for 3 years = P x (R/100)^2 x (3 + R/100)" },
        { type: "callout", tone: "tip", text: "Check the worked example with the 2-year shortcut: P x (R/100)^2 = 10000 x (10/100)^2 = 10000 x 0.01 = ₹100. It matches exactly. If a problem gives you the 2-year difference, you can instantly find R or P from this formula." },
        { type: "keypoints", title: "Remember these", items: ["CI adds each period's interest back, so you earn interest on interest.","Amount A = P x (1 + R/100)^n; CI = A - P.","Half-yearly: use R/2 and double the power. Quarterly: use R/4 and quadruple it.","CI is always greater than SI for the same P, R, and time (beyond 1 year).","2-year gap: CI - SI = P x (R/100)^2."] },
        { type: "quiz", question: "What is the difference between the Compound Interest and Simple Interest on ₹5,000 for 2 years at 10% per annum?", options: ["₹50","₹100","₹25","₹55"], correct: 0, explain: "For 2 years, CI - SI = P x (R/100)^2 = 5000 x (10/100)^2 = 5000 x 0.01 = ₹50. (Check: CI = 5000 x 1.21 - 5000 = ₹1,050 and SI = ₹1,000, so the difference is indeed ₹50.)" },
    ],
  },
  {
    slug: "number-system-explained",
    title: "Number System — The Foundation of All Quant",
    summary: "A concept-first guide to the Number System for SSC-CGL: how numbers are classified, must-know divisibility rules, key sum formulas, the unit-digit (cyclicity) trick with a worked example, and a quiz to test yourself.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "number-system",
    readingMinutes: 7,
    practiceTestSlug: "number-system-practice-1",
    blocks: [
        { type: "analogy", title: "A family tree of numbers", text: "Think of numbers like a family. The counting numbers 1, 2, 3... are the youngest children (natural numbers). Add zero and they become whole numbers. Bring in the negatives and you have integers. Add all the fractions and you get rational numbers, and finally the odd cousins like the square root of 2 and pi that never settle into a neat fraction — the irrationals. Together the whole family makes up the real numbers." },
        { type: "para", text: "The Number System is the base of every Quant topic, so knowing exactly which family a number belongs to, and a few quick rules, lets you solve questions in seconds instead of doing long calculations." },
        { type: "table", headers: ["Type","Meaning","Examples"], rows: [["Natural (N)","Counting numbers from 1","1, 2, 3, 4, ..."],["Whole (W)","Naturals together with 0","0, 1, 2, 3, ..."],["Integers (Z)","Positives, negatives and zero","..., -2, -1, 0, 1, 2, ..."],["Rational (Q)","Can be written as p/q, q not 0","1/2, -3, 0.75, 4"],["Irrational","Non-terminating, non-repeating decimals","sqrt(2), pi, sqrt(3)"],["Prime","Exactly two factors: 1 and itself","2, 3, 5, 7, 11 (2 is the only even prime)"]] },
        { type: "heading", text: "Divisibility Rules You Must Know" },
        { type: "table", headers: ["Divisible by","Quick test"], rows: [["2","Last digit is even (0,2,4,6,8)"],["3","Sum of all digits is divisible by 3"],["4","Number formed by the last two digits is divisible by 4"],["5","Last digit is 0 or 5"],["6","Divisible by both 2 and 3"],["8","Number formed by the last three digits is divisible by 8"],["9","Sum of all digits is divisible by 9"],["10","Ends in 0"],["11","Difference between the sums of alternate digits is 0 or a multiple of 11"]] },
        { type: "heading", text: "Key Sum Formulas" },
        { type: "formula", text: "1 + 2 + 3 + ... + n = n(n+1)/2" },
        { type: "formula", text: "1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6" },
        { type: "formula", text: "1^3 + 2^3 + ... + n^3 = [ n(n+1)/2 ]^2" },
        { type: "formula", text: "Sum of first n odd numbers = n^2 ; Sum of first n even numbers = n(n+1)" },
        { type: "heading", text: "Finding the Unit (Last) Digit" },
        { type: "para", text: "The last digit of a power repeats in a short cycle called its cyclicity. For most digits the cycle length is 4, so you just divide the power by 4 and use the remainder to pick the answer. Digits 0, 1, 5 and 6 always keep the same last digit, so they need no cycle." },
        { type: "example", title: "Worked example — unit digit of 3^47", lines: ["Powers of 3 end in a repeating cycle: 3, 9, 7, 1 (then it repeats every 4).","Divide the power by 4: 47 divided by 4 = 11 remainder 3.","A remainder of 3 points to the 3rd number in the cycle 3, 9, 7, 1.","The 3rd term is 7.","Answer: the unit digit of 3^47 is 7."] },
        { type: "callout", tone: "tip", text: "Cyclicity shortcut: when the power is an exact multiple of 4 (remainder 0), take the LAST digit of the cycle. For 3, that last digit is 1, so 3^48, 3^100, and so on all end in 1." },
        { type: "callout", tone: "warn", text: "Do not confuse factors with multiples. Factors of a number divide it exactly (factors of 12 are 1, 2, 3, 4, 6, 12), while multiples are the times-table of that number (12, 24, 36, ...). And remember 1 is neither prime nor composite." },
        { type: "keypoints", title: "Remember these", items: ["Know the number families: natural, whole, integer, rational, irrational, real.","2 is the only even prime number; 1 is neither prime nor composite.","Master the divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10 and 11.","Sum of first n natural numbers = n(n+1)/2, and sum of first n odd numbers = n^2.","Use cyclicity (usually a cycle of 4) to find the last digit of large powers."] },
        { type: "quiz", question: "Which of these numbers is divisible by 9?", options: ["12345","56789","123453","11111"], correct: 2, explain: "A number is divisible by 9 when the sum of its digits is divisible by 9. For 123453 the digit sum is 1+2+3+4+5+3 = 18, which is divisible by 9. The others give digit sums of 15, 35 and 5, none of which are multiples of 9." },
    ],
  },
  {
    slug: "time-speed-distance-explained",
    title: "Time, Speed & Distance — The Complete Basics",
    summary: "Master the core Speed = Distance / Time formula, the 5/18 unit-conversion trick, average speed, and proportionality for SSC-CGL quantitative aptitude.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "time-speed-distance",
    readingMinutes: 6,
    practiceTestSlug: "time-speed-distance-practice-1",
    blocks: [
        { type: "analogy", title: "The Auto-Rickshaw Meter", text: "Think of an auto meter. The faster the driver goes (speed) and the longer he drives (time), the higher the fare that ticks up (distance). These three are locked together: fix any two and the third is decided. That single relationship is the whole chapter." },
        { type: "para", text: "Speed tells you how much distance is covered in one unit of time. If a bus covers 60 km in 1 hour, its speed is 60 km/hr. Every question in this chapter is just this idea rearranged, so if you truly own the one formula below, you can solve almost anything." },
        { type: "formula", text: "Speed = Distance / Time   |   Distance = Speed x Time   |   Time = Distance / Speed" },
        { type: "callout", tone: "tip", text: "Unit conversion is the most common trap. To change km/hr into m/s, multiply by 5/18. To change m/s into km/hr, multiply by 18/5. Memorise: km/hr -> m/s means x 5/18." },
        { type: "table", headers: ["Situation","Rule","Meaning"], rows: [["Time is same","Distance is proportional to Speed","Go twice as fast, cover twice the distance"],["Distance is same","Speed is inversely proportional to Time","Go twice as fast, take half the time"],["Speed is same","Distance is proportional to Time","Drive twice as long, cover twice the distance"]] },
        { type: "heading", text: "Average Speed — Where Everyone Slips" },
        { type: "formula", text: "Average Speed = Total Distance / Total Time.  For equal distances at speeds x and y: Average = 2xy / (x + y)" },
        { type: "example", title: "Going and coming back", lines: ["A man goes to a town at 40 km/hr and returns along the same road at 60 km/hr.","Wrong instinct: (40 + 60) / 2 = 50 km/hr. This is NOT correct because he spends more time at the slower speed.","Correct method (equal distance): Average = 2xy / (x + y) = (2 x 40 x 60) / (40 + 60).","= 4800 / 100 = 48 km/hr.","So the true average speed is 48 km/hr, not 50."] },
        { type: "steps", title: "How to attack any TSD problem", items: ["Write down which quantities are given and which is asked.","Convert everything to one consistent unit system (all km/hr, or all m/s).","Pick the right form of Speed = Distance / Time, or use proportionality if one quantity is constant.","For to-and-fro or equal-distance legs, use the 2xy/(x+y) shortcut.","Recheck the unit of your final answer matches what the question asked for."] },
        { type: "keypoints", title: "Remember these", items: ["Speed = Distance / Time is the parent of every formula here.","km/hr to m/s: multiply by 5/18; m/s to km/hr: multiply by 18/5.","Average speed = total distance / total time — never a plain average of speeds.","For equal distances at two speeds, average = 2xy/(x+y) (the harmonic mean).","When distance is fixed, faster speed means proportionally less time."] },
        { type: "quiz", question: "A train 150 m long crosses a pole in 15 seconds. What is its speed in km/hr?", options: ["30 km/hr","36 km/hr","40 km/hr","45 km/hr"], correct: 1, explain: "To cross a pole, the train travels a distance equal to its own length, 150 m, in 15 s. Speed = 150 / 15 = 10 m/s. Convert to km/hr by multiplying by 18/5: 10 x 18/5 = 36 km/hr." },
    ],
  },
  {
    slug: "mensuration-explained",
    title: "Mensuration — Areas, Volumes & Surface Areas Made Simple",
    summary: "A clear guide to 2D area and perimeter and 3D volume and surface-area formulas — squares, circles, cuboids, cylinders, cones and spheres — for SSC-CGL.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "mensuration",
    readingMinutes: 7,
    practiceTestSlug: "mensuration-practice-1",
    blocks: [
        { type: "analogy", title: "Painting vs Filling a Water Tank", text: "Imagine a closed water tank. How much paint you need to coat its outside is surface area. How much water it can hold inside is volume. Mensuration is just measuring these two things — the skin and the stuffing — for every shape you meet." },
        { type: "para", text: "Shapes come in two families. Flat 2D shapes (square, rectangle, triangle, circle) have area (space inside) and perimeter (boundary length). Solid 3D shapes (cube, cuboid, cylinder, cone, sphere) have volume (space they occupy) and surface area (total outer covering). Learn the formulas family-by-family and the topic becomes pure substitution." },
        { type: "heading", text: "2D Shapes — Area & Perimeter" },
        { type: "table", headers: ["Shape","Area","Perimeter / Boundary"], rows: [["Square (side a)","a^2","4a"],["Rectangle (l, b)","l x b","2(l + b)"],["Triangle (base b, height h)","1/2 x b x h","sum of three sides"],["Circle (radius r)","pi x r^2","2 x pi x r"]] },
        { type: "heading", text: "3D Solids — Volume & Surface Area" },
        { type: "table", headers: ["Solid","Volume","Surface Area"], rows: [["Cube (side a)","a^3","TSA = 6a^2"],["Cuboid (l, b, h)","l x b x h","TSA = 2(lb + bh + hl)"],["Cylinder (r, h)","pi x r^2 x h","CSA = 2 pi r h;  TSA = 2 pi r (r + h)"],["Cone (r, h)","1/3 x pi x r^2 x h","CSA = pi r l;  TSA = pi r (r + l)"],["Sphere (r)","4/3 x pi x r^3","4 x pi x r^2"]] },
        { type: "callout", tone: "tip", text: "Use pi = 22/7 whenever the radius is a multiple of 7 — the sevens cancel and the sum stays clean. For a cone, first find the slant height with l = square root of (r^2 + h^2) before using any CSA formula." },
        { type: "example", title: "A cylinder, fully solved", lines: ["Find the volume, curved surface area (CSA) and total surface area (TSA) of a cylinder with radius r = 7 cm and height h = 10 cm. Take pi = 22/7.","Volume = pi x r^2 x h = (22/7) x 7 x 7 x 10 = 22 x 7 x 10 = 1540 cubic cm.","CSA = 2 x pi x r x h = 2 x (22/7) x 7 x 10 = 2 x 22 x 10 = 440 square cm.","TSA = 2 x pi x r x (r + h) = 2 x (22/7) x 7 x (7 + 10) = 2 x 22 x 17 = 748 square cm.","Notice the 7 in the radius cancels the 7 in 22/7 every time — that is why pi = 22/7 was chosen."] },
        { type: "steps", title: "How to solve any mensuration sum", items: ["Identify the shape and whether the question asks for area/perimeter (2D) or volume/surface area (3D).","List the given values and make sure all are in the same unit.","Pick the exact formula from the table and substitute carefully.","For circles and rounded solids, choose pi = 22/7 or 3.14 based on the numbers given.","Attach the correct unit: square units for area/surface, cubic units for volume."] },
        { type: "keypoints", title: "Lock these in", items: ["Area and surface area are in square units; volume is in cubic units.","Circle area = pi r^2, circumference = 2 pi r — do not mix them up.","Cylinder: Volume = pi r^2 h, CSA = 2 pi r h, TSA = 2 pi r (r + h).","Sphere: Volume = 4/3 pi r^3, Surface = 4 pi r^2.","Cone needs slant height l = root of (r^2 + h^2) for its CSA = pi r l."] },
        { type: "quiz", question: "What is the area of a circle whose radius is 7 cm? (Take pi = 22/7)", options: ["144 sq cm","154 sq cm","148 sq cm","164 sq cm"], correct: 1, explain: "Area of a circle = pi x r^2 = (22/7) x 7 x 7 = 22 x 7 = 154 square cm. The 7 in the radius cancels one 7 from 22/7, leaving 22 x 7." },
    ],
  },
  {
    slug: "problems-on-ages-explained",
    title: "Problems on Ages — The Complete Basics",
    summary: "Learn the one-variable method for age problems: handling past and future ages, the constant-difference rule, and ratio-based questions for SSC-CGL.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "problems-on-ages",
    readingMinutes: 6,
    practiceTestSlug: "problems-on-ages-practice-1",
    blocks: [
        { type: "analogy", title: "Two Runners on Parallel Tracks", text: "Picture two people born a few years apart, walking side by side through life. The gap between their ages never changes — if A is 5 years older today, A stays 5 years older forever. That single truth, the constant difference, quietly solves a huge share of age problems." },
        { type: "para", text: "The winning habit is to fix everything to the present. Let a person's present age be a variable like x. Then 'n years ago' means x - n and 'n years hence' means x + n. Translate each sentence of the problem into an equation using these, and solve. No memorised tricks needed — just careful translation." },
        { type: "heading", text: "The Golden Rules" },
        { type: "formula", text: "Present age = x.  n years ago = x - n.  n years later = x + n.  Difference of two ages stays constant over time." },
        { type: "table", headers: ["Time frame","Person A (now = a)","Person B (now = b)"], rows: [["n years ago","a - n","b - n"],["Present","a","b"],["n years hence","a + n","b + n"]] },
        { type: "callout", tone: "warn", text: "A ratio of ages changes with time, but the difference does not. Never apply a present-day ratio directly to a future or past year — first add or subtract the years, then form the new equation." },
        { type: "example", title: "A ratio problem, step by step", lines: ["The present ages of A and B are in the ratio 4 : 5. After 5 years, the ratio becomes 5 : 6. Find their present ages.","Let the present ages be 4x and 5x (this keeps the ratio 4 : 5 automatically).","After 5 years: A = 4x + 5, B = 5x + 5, and their ratio is 5 : 6.","So (4x + 5) / (5x + 5) = 5 / 6. Cross-multiply: 6(4x + 5) = 5(5x + 5).","24x + 30 = 25x + 25  ->  30 - 25 = 25x - 24x  ->  x = 5.","Present ages: A = 4x = 20 years, B = 5x = 25 years. Check: after 5 years, 25 : 30 = 5 : 6. Correct."] },
        { type: "steps", title: "A reliable method for any age sum", items: ["Assign a variable to the present age (use x, or 4x and 5x if a ratio is given).","Express every other age as present age plus or minus the stated years.","Turn each condition in the problem into one equation.","Solve the equation(s) for the variable.","Substitute back to get actual ages, then verify against the original statement."] },
        { type: "keypoints", title: "Keep these handy", items: ["Always anchor to present age and build past/future from it.","The difference between two people's ages is constant for all time.","For ratio questions, write ages as 4x and 5x so the ratio holds by itself.","Add the years first, then form the new-ratio equation — order matters.","Always plug your answer back in to confirm it fits every condition."] },
        { type: "quiz", question: "A father is 3 times as old as his son. After 12 years, the father will be twice as old as his son. What is the son's present age?", options: ["10 years","12 years","14 years","16 years"], correct: 1, explain: "Let the son's age be x, so the father is 3x. After 12 years: 3x + 12 = 2(x + 12). This gives 3x + 12 = 2x + 24, so x = 12. Check: son 12, father 36; after 12 years, 48 = 2 x 24. Correct." },
    ],
  },
  {
    slug: "coding-decoding-explained",
    title: "Coding-Decoding - The Complete Basics",
    summary: "Learn how letter-shift, position, reverse, and word-substitution codes work in SSC-CGL Coding-Decoding, with a step-by-step method, the EJOTY trick, fully worked examples, and a practice quiz.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "coding-decoding",
    readingMinutes: 6,
    practiceTestSlug: "coding-decoding-practice-1",
    blocks: [
        { type: "analogy", title: "Think of a secret WhatsApp code", text: "Remember passing secret notes in school where 'A' meant 'B', or you wrote words backwards so the teacher could not read them? Coding-Decoding is exactly that game. Someone hides a real word behind a rule, and your only job is to catch the rule. Once you know the trick used to lock the message, you can lock or unlock any new word instantly." },
        { type: "heading", text: "What Coding-Decoding Really Is" },
        { type: "para", text: "In these questions you are shown a word and its 'code' (a disguised version). The code is made by applying one fixed rule to every letter - shifting letters, replacing them with their alphabet numbers, reversing the order, or swapping whole words. You must discover that rule from the example given, then apply the very same rule to a new word. You are never asked to memorise the code; you are asked to spot the pattern." },
        { type: "heading", text: "The Main Types of Coding" },
        { type: "table", headers: ["Type","How it works","Quick example"], rows: [["Letter shift","Move each letter forward/back by a fixed number","CAT -> DBU (each +1)"],["Reverse / opposite","Replace each letter by its mirror (A<->Z)","ACE -> ZXV"],["Number / position","Replace each letter by its alphabet position","CAB -> 3-1-2"],["Word substitution","Whole words are swapped for code words","'sun is hot' -> 'pa la ki'"],["Symbol coding","Letters are mapped to signs/symbols","A -> @, B -> #"]] },
        { type: "formula", text: "Positions: A=1, B=2, ... Z=26  |  Mnemonic EJOTY -> E=5, J=10, O=15, T=20, Y=25  |  Opposite letter rule: position + opposite = 27, so A<->Z, B<->Y, M<->N" },
        { type: "steps", title: "How to crack any coding question", items: ["Write the code word directly under the original word, letter below letter.","Compare each pair: is there a fixed forward/backward jump? Are they position numbers? Is the order reversed?","Confirm the rule works for EVERY letter, not just the first one or two.","Apply that exact same rule to the target word to build (or break) its code.","Match your answer with the options and eliminate the close traps."] },
        { type: "example", title: "Worked Example - Letter Shift", lines: ["Q: If DELHI is coded as EFMIJ, how is MUMBAI coded?","Line them up: D->E, E->F, L->M, H->I, I->J. Every letter moves forward by 1.","Rule found: shift each letter +1.","Apply to MUMBAI: M->N, U->V, M->N, B->C, A->B, I->J.","Answer: NVNCBJ."] },
        { type: "example", title: "Worked Example - Word Substitution", lines: ["'pen is blue' = 'ka na sa' and 'blue is good' = 'sa na ta'. Find the code for 'good'.","The words 'is' and 'blue' appear in both sentences; the common codes are 'na' and 'sa'.","So 'is'/'blue' use na/sa - which means in sentence 1 the leftover word 'pen' = 'ka'.","In sentence 2 the only leftover word is 'good', and the only leftover code is 'ta'.","Answer: 'good' = ta."] },
        { type: "callout", tone: "warn", text: "Biggest trap: direction and order. Always check whether letters shift forward or backward, and whether the letters are ALSO written in reverse order. Many codes shift and reverse at the same time - test the full word before you commit." },
        { type: "keypoints", title: "Remember these", items: ["Memorise A=1 to Z=26; the EJOTY milestones (5-10-15-20-25) let you find any position fast.","Opposite letters always add up to 27 (opposite = 27 minus position).","Place the code under the word and hunt for ONE consistent rule.","For word-code puzzles, match the common word with the common code.","The rule must fit every single letter - verify, then apply."] },
        { type: "quiz", question: "If CAT is written as 3-1-20, how is DOG written in the same code?", options: ["4-15-7","4-14-7","3-15-7","4-15-8"], correct: 0, explain: "Each letter is replaced by its alphabet position. D=4, O=15, G=7, so DOG = 4-15-7. (C=3, A=1, T=20 confirms the rule.)" },
    ],
  },
  {
    slug: "blood-relations-explained",
    title: "Blood Relations - The Complete Basics",
    summary: "Master SSC-CGL Blood Relations with a simple family-tree method, a full relationship cheat-sheet, photograph and coded-relation worked examples, key shortcuts, and a self-check quiz.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "blood-relations",
    readingMinutes: 6,
    practiceTestSlug: "blood-relations-practice-1",
    blocks: [
        { type: "analogy", title: "Draw your family group photo", text: "Picture a big family photo at a wedding: grandparents seated in the middle, their sons and daughters standing around them, and the little grandchildren in front. If someone points at a person and says 'that is my mother's brother's son', you instantly find him in the photo. Blood Relations is just that photo drawn as a small tree - once it is on paper, the answer jumps out." },
        { type: "heading", text: "What Blood Relation Questions Ask" },
        { type: "para", text: "You are given a chain of family statements ('A is the father of B', 'B is the sister of C') or a 'pointing to a photograph' riddle, and you must name the final relationship between two people. The danger is doing it in your head - one wrong turn and the whole answer flips. The safe method is always to draw a quick family tree and read the relation off it." },
        { type: "heading", text: "The Relationship Cheat-Sheet" },
        { type: "table", headers: ["Clue phrase","Actual relation"], rows: [["Father's / Mother's father","Grandfather"],["Father's / Mother's mother","Grandmother"],["Father's brother / Mother's brother","Uncle"],["Father's sister / Mother's sister","Aunt"],["Brother's / Sister's son","Nephew"],["Brother's / Sister's daughter","Niece"],["Son's / Daughter's son","Grandson"],["Sister's husband / Wife's brother","Brother-in-law"],["Brother's wife / Wife's sister","Sister-in-law"],["Son's wife","Daughter-in-law"]] },
        { type: "steps", title: "Draw the family tree", items: ["Read one statement at a time and note each person's gender from the exact word used (son, daughter, he, she).","Place the older generation on top and the younger generation below - like steps of a ladder.","Put married couples side by side, and hang their children directly below them.","Never guess gender from a name (Kiran, Suman, etc. can be anyone) - use only stated words.","Finally, trace the path from the two people in the question and name the relation."] },
        { type: "callout", tone: "warn", text: "'In-law' words are traps. A brother-in-law can be your wife's brother OR your sister's husband; a sister-in-law can be your brother's wife OR your wife's sister. Read the exact wording, do not assume." },
        { type: "example", title: "Worked Example - The Photograph Puzzle", lines: ["Q: Pointing to a photo, a man says, 'I have no brother or sister, but that man's father is my father's son.' Whose photo is it?","Start inside-out: 'my father's son'. The man has no brothers, so his father's only son must be himself.","So 'that man's father' = the speaker himself.","If the speaker is that man's father, then the man in the photo is the speaker's son.","Answer: his son."] },
        { type: "example", title: "Worked Example - Coded Relations", lines: ["Code: A + B means A is the father of B; A - B means A is the mother of B; A x B means A is the brother of B.","Question: what does 'P - Q x R' tell us about P and R?","Break it left to right. P - Q: P is the mother of Q. Q x R: Q is the brother of R.","Q and R share the same parents, and P is Q's mother, so P is also R's mother.","Answer: P is the mother of R."] },
        { type: "keypoints", title: "Remember these", items: ["Always draw a tree: elders on top, children below, couples side by side.","Decide gender only from explicit words, never from a person's name.","'Only son/daughter of...' usually points back to the speaker's own parent - a handy shortcut.","In coded relations, decode one symbol at a time, strictly left to right.","Same-generation links mean sibling or spouse; across generations means parent-child."] },
        { type: "quiz", question: "Pointing to a woman, Rahul said, 'She is the daughter of my grandfather's only son.' How is the woman related to Rahul?", options: ["Sister","Aunt","Mother","Niece"], correct: 0, explain: "Rahul's grandfather's only son is Rahul's own father. The daughter of Rahul's father is Rahul's sister." },
    ],
  },
  {
    slug: "syllogism-explained",
    title: "Syllogism - The Complete Basics",
    summary: "Understand SSC-CGL Syllogism using the Venn-diagram method, the four statement types, combination rules, the Either-Or trick, a fully worked example, and a practice quiz.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "syllogism",
    readingMinutes: 7,
    practiceTestSlug: "syllogism-practice-1",
    blocks: [
        { type: "analogy", title: "Circles inside circles", text: "Imagine three buckets: one for all 'roses', a bigger one for all 'flowers', and a huge one for all 'red things'. If you drop every rose into the flower bucket, and every flower into the red bucket, then without checking each rose you already know every rose is red. Syllogism is just this bucket game drawn as overlapping circles - you decide what MUST be true only from where the circles sit." },
        { type: "heading", text: "What Syllogism Tests" },
        { type: "para", text: "You are given two or more statements (premises) and some conclusions. You must decide which conclusions definitely follow from the statements - not what is true in real life, only what the statements force to be true. Even if a conclusion sounds obviously true from general knowledge, it counts only if the statements guarantee it. The cleanest tool is the Venn diagram." },
        { type: "heading", text: "The Four Statement Types" },
        { type: "table", headers: ["Statement form","What it means","Valid conversion (also true)"], rows: [["All A are B","Every A sits inside B","Some B are A"],["No A is B","A and B are completely separate","No B is A"],["Some A are B","At least one A is also B","Some B are A"],["Some A are not B","At least one A lies outside B","(no valid conversion)"]] },
        { type: "steps", title: "The Venn-diagram method", items: ["Draw a circle for each term exactly as the statements demand.","'All A are B' -> circle A drawn fully inside circle B.","'No A is B' -> two separate, non-touching circles.","'Some A are B' -> two circles overlapping, and mark the shared middle part.","Test each conclusion: it follows ONLY if it stays true in every possible way you could draw the diagram."] },
        { type: "table", headers: ["Premise 1 + Premise 2 (shared middle term)","Valid conclusion"], rows: [["All + All","All"],["All + No","No"],["Some + All","Some"],["Some + No","Some are not"],["Some + Some","No definite conclusion"],["No + No","No definite conclusion"]] },
        { type: "callout", tone: "info", text: "The golden rule: a conclusion is valid only if it holds in EVERY possible diagram you can draw. If you can sketch even one diagram where it fails, it does NOT follow. Also remember 'All A are B' never means 'All B are A'." },
        { type: "example", title: "Worked Example", lines: ["Statements: All pens are books. All books are red.","Draw it: the pens circle sits inside the books circle, which sits inside the red circle - so pens end up inside red too.","Conclusion I - 'All pens are red': in the diagram every pen is inside red, so it MUST be true. Follows.","Conclusion II - 'Some red are pens': since all pens are red, those items are both red and pens, so at least some red things are pens. Follows.","Result: both conclusions follow."] },
        { type: "callout", tone: "tip", text: "Either-Or trick (complementary pair): if neither conclusion follows on its own, but the two conclusions have the SAME subject and predicate with one positive and one negative - like 'Some A are C' and 'Some A are not C' - then the answer is 'Either I or II follows'." },
        { type: "keypoints", title: "Remember these", items: ["Know the picture of all four forms: All, No, Some, Some-not.","Solve with Venn diagrams; a conclusion must survive in every possible drawing.","'Some A are B' also gives 'Some B are A'; 'No A is B' also gives 'No B is A'.","'All A are B' does NOT give 'All B are A' - only 'Some B are A'.","Watch for complementary pairs to grab easy 'Either-Or' marks."] },
        { type: "quiz", question: "Statements: All roses are flowers. Some flowers are red. Conclusions: I. Some roses are red. II. All flowers are roses. Which follows?", options: ["Only I follows","Only II follows","Both follow","Neither follows"], correct: 3, explain: "The red flowers need not include any rose, so 'Some roses are red' is only possible, not certain - I fails. 'All flowers are roses' wrongly reverses 'All roses are flowers' - II is invalid. Hence neither conclusion follows." },
    ],
  },
  {
    slug: "synonyms-antonyms-explained",
    title: "Synonyms & Antonyms — The Complete Vocabulary Guide",
    summary: "A concept-first guide to synonyms and antonyms for SSC-CGL English, covering what they mean, high-frequency word pairs, a step-by-step method to crack questions, and common traps to avoid.",
    examSlug: "ssc-cgl",
    subjectSlug: "english-language",
    chapterSlug: "synonyms-antonyms",
    readingMinutes: 6,
    practiceTestSlug: "synonyms-antonyms-practice-1",
    blocks: [
        { type: "analogy", title: "The 'same team, opposite team' idea", text: "Think of words as players in a cricket match. Some players wear the same jersey and play for the same side — those are like SYNONYMS, words that mean nearly the same thing. Players on the opposing side wear the rival jersey — those are like ANTONYMS, words that mean the opposite. Once you know which 'team' a word plays for, matching or opposing it becomes easy." },
        { type: "heading", text: "What Synonyms and Antonyms Really Mean" },
        { type: "para", text: "A synonym is a word that has the same or almost the same meaning as another word — for example, 'happy' and 'joyful'. An antonym is a word with the opposite meaning — 'happy' and 'sad'. In SSC-CGL and similar exams, you are usually given one word (often in capitals) and asked to pick the option closest in meaning (synonym) or most opposite (antonym). The key skill is knowing the exact shade of the word, not just a rough idea." },
        { type: "table", headers: ["Word","Synonym (same team)","Antonym (opposite team)"], rows: [["Benevolent","Kind, generous","Cruel, miserly"],["Abundant","Plentiful, ample","Scarce, meagre"],["Candid","Frank, honest","Deceptive, evasive"],["Diligent","Hardworking, careful","Lazy, negligent"],["Transient","Temporary, fleeting","Permanent, lasting"]] },
        { type: "heading", text: "Cracking the Exam Question" },
        { type: "steps", title: "A reliable 4-step method", items: ["Read the question word and recall its exact meaning in a short phrase (e.g., benevolent = 'wanting to do good').","Decide whether you need a SAME-meaning word (synonym) or an OPPOSITE word (antonym) — underline the instruction so you don't flip it.","Test each option against your phrase; eliminate clearly wrong ones first.","If unsure, use word roots or how the word is used in a sentence to guess the tone (positive or negative), then match or oppose that tone."] },
        { type: "example", title: "Worked example — find the SYNONYM of 'FRUGAL'", lines: ["Step 1: 'Frugal' means careful with money, not wasteful — a positive, thrifty tone.","Step 2: The instruction asks for a synonym, so we need a same-meaning word.","Step 3: Options — (a) Extravagant (b) Economical (c) Wealthy (d) Careless.","Step 4: Extravagant and careless are opposite; wealthy is unrelated. 'Economical' matches 'careful with money'.","Answer: (b) Economical."] },
        { type: "callout", tone: "warn", text: "Biggest trap: near-synonyms and words that only 'look' related. 'Frugal' does not mean 'poor' or 'wealthy' — it is about being careful with money. Always match the precise meaning, and re-check whether the question asked for the synonym or the antonym before you mark." },
        { type: "keypoints", title: "Remember these", items: ["Synonym = same/near meaning; Antonym = opposite meaning.","First fix the exact meaning of the given word in one short phrase.","Judge the tone (positive/negative) to eliminate options fast.","Watch the instruction word — synonym vs antonym — it is the most common silly mistake.","Build a daily list of word + synonym + antonym; revision beats cramming."] },
        { type: "quiz", question: "Choose the word that is most nearly the SYNONYM of 'BENEVOLENT'.", options: ["Cruel","Kind","Selfish","Angry"], correct: 1, explain: "'Benevolent' means well-meaning and kindly — wanting to do good for others. 'Kind' matches this meaning. 'Cruel' and 'selfish' are antonyms, and 'angry' is unrelated." },
    ],
  },
  {
    slug: "idioms-phrases-explained",
    title: "Idioms & Phrases — Meaning Beyond the Words",
    summary: "Learn how English idioms and phrases work for SSC-CGL: why their meaning is figurative, high-frequency idioms with meanings, a method to guess unknown ones from context, and a self-check quiz.",
    examSlug: "ssc-cgl",
    subjectSlug: "english-language",
    chapterSlug: "idioms-phrases",
    readingMinutes: 6,
    practiceTestSlug: "idioms-phrases-practice-1",
    blocks: [
        { type: "analogy", title: "The 'secret code' of language", text: "Imagine a friend says 'it's raining cats and dogs'. No cats or dogs are actually falling — it simply means it is raining very heavily. Idioms are like a secret code shared by fluent speakers: the group of words together carries a meaning that is different from the individual words. Once you learn the code, the sentence makes perfect sense." },
        { type: "heading", text: "What Idioms and Phrases Are" },
        { type: "para", text: "An idiom is a fixed group of words whose overall meaning cannot be worked out from the literal meaning of each word. 'To spill the beans' has nothing to do with beans — it means to reveal a secret. In SSC-CGL, you are given an idiom (often underlined in a sentence) and asked to choose its correct meaning. Because the meaning is figurative, memorising common idioms plus understanding the context is the winning strategy." },
        { type: "callout", tone: "info", text: "Golden rule: never translate an idiom word-by-word, and never translate it literally into your mother tongue. 'To pull someone's leg' means to tease or joke with them, not to physically pull a leg." },
        { type: "table", headers: ["Idiom / Phrase","Meaning"], rows: [["To bite the bullet","To face a difficult situation bravely"],["Once in a blue moon","Very rarely"],["To let the cat out of the bag","To reveal a secret, often by mistake"],["A blessing in disguise","Something that seems bad but turns out good"],["To burn the midnight oil","To work or study late into the night"]] },
        { type: "heading", text: "How to Handle an Unknown Idiom" },
        { type: "steps", title: "Guessing smartly when you are not sure", items: ["Read the full sentence — context often hints whether the meaning is positive or negative.","Ignore the literal picture; ask 'what feeling or action is the speaker describing?'","Eliminate options that are too literal — exams often add a literal-looking wrong choice as a trap.","Pick the option that fits the tone and situation of the whole sentence."] },
        { type: "example", title: "Worked example — meaning of 'to bite the bullet'", lines: ["Sentence: 'The fees were high, but Riya decided to bite the bullet and pay for the coaching.'","Step 1: The context shows Riya doing something hard but necessary.","Step 2: Literally biting a bullet makes no sense here, so the meaning is figurative.","Step 3: A trap option might be 'to get injured' — too literal, reject it.","Step 4: The best fit is 'to face a difficult situation bravely'.","Answer: To face a difficult situation bravely."] },
        { type: "callout", tone: "tip", text: "Group idioms by theme when you revise — animals (a fish out of water), body parts (cost an arm and a leg), colours (green with envy). Themed lists are far easier to recall in the exam hall." },
        { type: "keypoints", title: "Remember these", items: ["An idiom's meaning is figurative, not literal.","Never translate an idiom word-for-word.","Use the sentence's context to judge positive or negative tone.","Reject options that look too literal — they are usually traps.","Revise idioms in themed groups for faster recall."] },
        { type: "quiz", question: "What does the idiom 'to bite the bullet' mean?", options: ["To eat something very quickly","To face a difficult situation bravely","To get seriously injured","To waste one's time"], correct: 1, explain: "'To bite the bullet' means to force yourself to do something unpleasant or difficult with courage. The other options rely on the literal image of a bullet, which is a common trap." },
    ],
  },
  {
    slug: "indian-polity-explained",
    title: "Indian Polity & Constitution — The Complete Basics",
    summary: "A beginner-friendly overview of Indian Polity for SSC-CGL: the Constitution's making, the Preamble, Fundamental Rights and Duties, DPSP, key Parts and Articles, borrowed features, and a quick self-check quiz.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-awareness",
    chapterSlug: "indian-polity",
    readingMinutes: 8,
    practiceTestSlug: "indian-polity-practice-1",
    blocks: [
        { type: "analogy", title: "The Constitution as a rulebook", text: "Every board game comes with a rulebook that says who can do what, whose turn it is, and what counts as a foul. The Constitution of India is the country's rulebook. It decides the powers of the government, the rights of citizens, and the limits everyone must respect — so that the huge 'game' of running a democracy is fair for all its players." },
        { type: "heading", text: "How the Constitution Came to Be" },
        { type: "para", text: "The Constitution was framed by the Constituent Assembly. Dr. B. R. Ambedkar chaired the Drafting Committee and is known as the 'Father of the Indian Constitution'. The Assembly adopted the Constitution on 26 November 1949 (celebrated as Constitution Day), and it came into force on 26 January 1950 (Republic Day). It originally had 395 Articles, 22 Parts and 8 Schedules — since grown to around 470 Articles, 25 Parts and 12 Schedules through amendments." },
        { type: "formula", text: "Memory rule: Adopted 26 Nov 1949 -> Enforced 26 Jan 1950. Fundamental Rights = Part III (Articles 12-35). DPSP = Part IV (Articles 36-51)." },
        { type: "table", headers: ["Feature","Part","Articles"], rows: [["Fundamental Rights","Part III","12 - 35"],["Directive Principles (DPSP)","Part IV","36 - 51"],["Fundamental Duties","Part IV-A","51A"],["The Union (President, Parliament)","Part V","52 onwards"],["Amendment of the Constitution","Part XX","368"]] },
        { type: "heading", text: "Fundamental Rights — The Citizen's Shield" },
        { type: "keypoints", title: "The six Fundamental Rights", items: ["Right to Equality (Articles 14-18).","Right to Freedom (Articles 19-22).","Right against Exploitation (Articles 23-24).","Right to Freedom of Religion (Articles 25-28).","Cultural and Educational Rights (Articles 29-30).","Right to Constitutional Remedies (Article 32) — called the 'heart and soul' of the Constitution by Dr. Ambedkar."] },
        { type: "para", text: "Note that the Right to Property was removed as a Fundamental Right by the 44th Amendment (1978); it is now only a legal right under Article 300A. Alongside rights, the Constitution lists Fundamental Duties in Article 51A — originally 10, added by the 42nd Amendment (1976), and now 11 after the 86th Amendment (2002)." },
        { type: "example", title: "Borrowed features — which idea came from where", lines: ["Fundamental Rights -> borrowed from the USA (Bill of Rights).","Directive Principles of State Policy -> borrowed from Ireland.","Parliamentary form of government and rule of law -> from the United Kingdom.","Federation with a strong Centre and residuary powers -> from Canada.","So a common exam question 'Fundamental Rights are inspired by which country?' -> answer: USA."] },
        { type: "callout", tone: "tip", text: "Do not confuse the two big dates: adoption is 26 November 1949, but the Constitution came into FORCE on 26 January 1950. Exam questions love to swap these dates." },
        { type: "keypoints", title: "Quick facts to lock in", items: ["Preamble words 'Socialist', 'Secular' and 'Integrity' were added by the 42nd Amendment (1976).","Dr. B. R. Ambedkar chaired the Drafting Committee.","Fundamental Rights are justiciable (enforceable in court); DPSP are not directly enforceable.","Right to Constitutional Remedies is Article 32.","The power to amend the Constitution lies in Article 368."] },
        { type: "quiz", question: "The Fundamental Rights in the Indian Constitution are primarily inspired by the Constitution of which country?", options: ["United States of America","United Kingdom","Ireland","France"], correct: 0, explain: "The Fundamental Rights were borrowed from the Bill of Rights of the United States of America. The Directive Principles came from Ireland, while the parliamentary system was drawn from the United Kingdom." },
    ],
  },
  {
    slug: "quadratic-equations-explained",
    title: "Quadratic Equations — Roots, Formula and Discriminant",
    summary: "Learn what quadratic equations are and how to solve them by factorisation, completing the square and the quadratic formula, plus using the discriminant to judge the nature of roots — with a worked example and a self-check quiz.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "quadratic-equations",
    readingMinutes: 7,
    practiceTestSlug: "quadratic-equations-practice-1",
    blocks: [
        { type: "analogy", title: "Think of a Cricket Ball's Path", text: "When a batsman lifts the ball for a six, its path through the air rises and then falls in a smooth curve called a parabola. The height of that ball at any moment can be written as a quadratic equation. Any time a quantity depends on the square of something — the area of a plot, the height of a thrown object — you are looking at a quadratic. Solving the equation tells you exactly where that curve meets the ground." },
        { type: "heading", text: "What Is a Quadratic Equation?" },
        { type: "para", text: "A quadratic equation is a polynomial equation in one variable where the highest power of the variable is 2, so it always has an x^2 term. The values of x that make the equation true are called its roots or solutions. A quadratic equation has at most two roots." },
        { type: "formula", text: "Standard form: ax^2 + bx + c = 0, where a, b, c are real numbers and a is not equal to 0" },
        { type: "heading", text: "Three Ways to Find the Roots" },
        { type: "steps", title: "The main methods", items: ["Factorisation: split the middle term so the equation becomes a product of two brackets, then set each bracket equal to zero.","Completing the square: rearrange the equation into a perfect square plus a constant, then take square roots on both sides.","Quadratic formula: put the values of a, b and c straight into a formula — this always works, even when factorisation is hard."] },
        { type: "formula", text: "Quadratic formula: x = ( -b plus or minus square root of (b^2 - 4ac) ) / 2a" },
        { type: "callout", tone: "info", text: "The part under the root sign, b^2 - 4ac, is called the discriminant, written as D. Its sign alone tells you how many real roots the equation has — without solving it fully." },
        { type: "table", headers: ["Discriminant D = b^2 - 4ac","Nature of the roots"], rows: [["D > 0","Two distinct real roots"],["D = 0","Two equal (coincident) real roots"],["D < 0","No real roots"]] },
        { type: "example", title: "Worked example: a rectangular plot", lines: ["A rectangular plot's length is 3 m more than its width, and its area is 54 m^2. Find the width.","Let the width be x metres, so the length is (x + 3) metres.","Area = length x width, so x(x + 3) = 54","Bring to standard form: x^2 + 3x - 54 = 0","Split the middle term (two numbers with product -54 and sum +3): +9 and -6","Factorise: (x + 9)(x - 6) = 0","So x = -9 or x = 6. A width cannot be negative, so x = 6.","Width = 6 m and length = 9 m. Check: 6 x 9 = 54 m^2. Correct."] },
        { type: "keypoints", title: "Remember these", items: ["Standard form is ax^2 + bx + c = 0 with a not equal to 0.","A quadratic equation has at most two real roots.","The quadratic formula x = (-b plus or minus square root of (b^2 - 4ac))/2a works for every quadratic.","Discriminant D = b^2 - 4ac decides the nature of roots: D>0 two roots, D=0 equal roots, D<0 no real roots.","Sum of roots = -b/a and product of roots = c/a."] },
        { type: "quiz", question: "For the equation 2x^2 - 4x + 5 = 0, what is the nature of its roots?", options: ["Two distinct real roots","Two equal real roots","No real roots","Exactly one real root"], correct: 2, explain: "Here a = 2, b = -4, c = 5, so D = b^2 - 4ac = (-4)^2 - 4(2)(5) = 16 - 40 = -24. Since D is less than 0, the equation has no real roots." },
    ],
  },
  {
    slug: "arithmetic-progressions-explained",
    title: "Arithmetic Progressions — nth Term and Sum Made Simple",
    summary: "Understand Arithmetic Progressions, the common difference, and the formulas for the nth term and the sum of n terms, explained with a staircase analogy, a fully worked example and a quick self-check quiz.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "arithmetic-progressions",
    readingMinutes: 7,
    practiceTestSlug: "arithmetic-progressions-practice-1",
    blocks: [
        { type: "analogy", title: "Climbing an Even Staircase", text: "Picture a staircase where every step rises by exactly the same height, say 15 cm. The 1st step is 15 cm above the floor, the 2nd is 30 cm, the 3rd is 45 cm, and so on. Each number is simply the one before it plus a fixed jump. That steady, equal jump is the whole idea behind an Arithmetic Progression — a list of numbers that grows or shrinks by the same amount every single time." },
        { type: "heading", text: "What Makes a Sequence an AP?" },
        { type: "para", text: "An Arithmetic Progression (AP) is a list of numbers in which the difference between any term and the term just before it is always the same. This fixed difference is called the common difference, written as d, and the first term is called a. To test whether a sequence is an AP, subtract each term from the next — if you always get the same number, it is an AP." },
        { type: "formula", text: "General form: a, a + d, a + 2d, a + 3d, ...   where a = first term and d = common difference" },
        { type: "formula", text: "nth term:  a_n = a + (n - 1)d" },
        { type: "callout", tone: "tip", text: "Find the common difference by subtracting any term from the one right after it: d = a_2 - a_1 = a_3 - a_2. If these differences are not all equal, the sequence is NOT an AP." },
        { type: "heading", text: "Adding Up the Terms" },
        { type: "formula", text: "Sum of first n terms:  S_n = (n/2) x [ 2a + (n - 1)d ]   or   S_n = (n/2) x (a + l), where l is the last term" },
        { type: "example", title: "Worked example: the 15th term and a sum", lines: ["Consider the AP: 3, 7, 11, 15, ...","First term a = 3. Common difference d = 7 - 3 = 4.","Find the 15th term using a_n = a + (n - 1)d:","a_15 = 3 + (15 - 1) x 4 = 3 + 14 x 4 = 3 + 56 = 59","Now find the sum of the first 20 terms using S_n = (n/2)[2a + (n - 1)d]:","S_20 = (20/2) x [2 x 3 + (20 - 1) x 4] = 10 x [6 + 76] = 10 x 82 = 820","So the 15th term is 59 and the sum of the first 20 terms is 820."] },
        { type: "table", headers: ["Quantity","Formula"], rows: [["Common difference","d = a_2 - a_1"],["nth term","a_n = a + (n - 1)d"],["Sum of n terms","S_n = (n/2)[2a + (n - 1)d]"],["Sum using last term l","S_n = (n/2)(a + l)"]] },
        { type: "keypoints", title: "Remember these", items: ["An AP has a constant common difference d between consecutive terms.","nth term: a_n = a + (n - 1)d — use it to jump straight to any term.","Sum of n terms: S_n = (n/2)[2a + (n - 1)d].","If the last term l is known, S_n = (n/2)(a + l).","d can be positive (increasing AP), negative (decreasing AP), or zero (all terms equal)."] },
        { type: "quiz", question: "Which term of the AP 5, 8, 11, 14, ... is equal to 50?", options: ["15th term","16th term","17th term","18th term"], correct: 1, explain: "Here a = 5 and d = 3. Using a_n = a + (n - 1)d = 50: 5 + (n - 1) x 3 = 50, so (n - 1) x 3 = 45, giving n - 1 = 15 and n = 16. So 50 is the 16th term." },
    ],
  },
  {
    slug: "circles-explained",
    title: "Circles — Tangents and Their Properties",
    summary: "A clear guide to tangents to a circle — the point of contact, the two key theorems, and the tangent-length formula — with a real-life analogy, a worked Pythagoras example and a self-check quiz.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "circles",
    readingMinutes: 6,
    practiceTestSlug: "circles-practice-1",
    blocks: [
        { type: "analogy", title: "A Cycle Wheel on the Road", text: "Watch a bicycle wheel rolling along a flat road. At any instant the wheel touches the road at just one single point — the road is a tangent to the wheel. And if you draw the spoke from the centre of the wheel to that touching point, it stands perfectly upright, at a right angle to the road. That everyday picture captures the two big ideas of this chapter: a tangent touches a circle at exactly one point, and the radius to that point is perpendicular to the tangent." },
        { type: "heading", text: "Tangent, Secant and Point of Contact" },
        { type: "para", text: "A tangent to a circle is a straight line that touches the circle at exactly one point, called the point of contact. Compare this with a secant, which is a line that cuts the circle at two points. How many tangents you can draw depends on where your point sits relative to the circle." },
        { type: "table", headers: ["Position of the point","Number of tangents"], rows: [["Inside the circle","0 (no tangent possible)"],["On the circle","1 (exactly one tangent)"],["Outside the circle","2 (exactly two tangents)"]] },
        { type: "heading", text: "The Two Key Theorems" },
        { type: "callout", tone: "info", text: "Theorem 1: The tangent at any point of a circle is perpendicular to the radius drawn to the point of contact. So the angle between the radius and the tangent at the point of contact is always 90 degrees." },
        { type: "callout", tone: "info", text: "Theorem 2: The lengths of the two tangents drawn from an external point to a circle are equal. If PA and PB are tangents from an outside point P, then PA = PB." },
        { type: "formula", text: "Length of a tangent from an external point:  tangent = square root of (d^2 - r^2),  where d = distance of the point from the centre and r = radius" },
        { type: "example", title: "Worked example: length of a tangent", lines: ["A tangent is drawn from a point P to a circle with centre O and radius 5 cm. The distance OP = 13 cm. Find the length of the tangent PT, where T is the point of contact.","By Theorem 1, the radius OT is perpendicular to the tangent PT, so triangle OTP is right-angled at T.","Apply Pythagoras' theorem: OP^2 = OT^2 + PT^2","13^2 = 5^2 + PT^2","169 = 25 + PT^2, so PT^2 = 169 - 25 = 144","PT = square root of 144 = 12 cm","So the length of the tangent from P is 12 cm."] },
        { type: "keypoints", title: "Remember these", items: ["A tangent touches a circle at exactly one point; a secant cuts it at two points.","From an external point you can draw exactly two tangents; from a point on the circle, one; from inside, none.","The radius at the point of contact is perpendicular (90 degrees) to the tangent.","Tangents drawn from the same external point are equal in length.","Tangent length = square root of (d^2 - r^2), from Pythagoras' theorem."] },
        { type: "quiz", question: "From a point P at a distance of 13 cm from the centre of a circle of radius 12 cm, a tangent PQ is drawn. What is the length of PQ?", options: ["5 cm","1 cm","square root of 313 cm","25 cm"], correct: 0, explain: "The radius to the point of contact is perpendicular to the tangent, so PQ = square root of (OP^2 - r^2) = square root of (13^2 - 12^2) = square root of (169 - 144) = square root of 25 = 5 cm." },
    ],
  },
  {
    slug: "probability-explained",
    title: "Probability — The Complete Basics",
    summary: "A concept-first guide to Class 10 probability: the classical definition, the P(E) formula, sample spaces, the complement rule, and solved dice, coin, and card problems.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "probability",
    readingMinutes: 7,
    practiceTestSlug: "probability-practice-1",
    blocks: [
        { type: "analogy", title: "The cricket toss", text: "Before every match, the captains gather for the toss. Nobody knows if it will be heads or tails, yet everyone agrees each side has an equal chance. That simple feeling of 'equal chance' is the whole idea of probability: a number between 0 and 1 that measures how likely something is to happen." },
        { type: "para", text: "Probability is the branch of maths that puts a number on uncertainty. An event that is impossible gets 0, an event that is certain gets 1, and everything in between (like a coin showing heads) sits somewhere between those two. In Class 10 we study the theoretical (classical) approach, where all outcomes are assumed equally likely." },
        { type: "heading", text: "The key words: experiment, outcome, event" },
        { type: "para", text: "An experiment is an action with an uncertain result (tossing a coin, rolling a die). Each possible result is an outcome. The set of all possible outcomes is the sample space. An event is a collection of one or more favourable outcomes we care about, such as 'getting an even number' when rolling a die." },
        { type: "formula", text: "P(E) = (Number of outcomes favourable to E) / (Total number of possible outcomes)" },
        { type: "callout", tone: "info", text: "This formula only works when every outcome is equally likely — a fair coin, a fair die, a well-shuffled deck. If a die is loaded, the classical formula does not apply." },
        { type: "table", headers: ["Rule","Statement","Meaning"], rows: [["Range","0 ≤ P(E) ≤ 1","Probability is never negative or above 1"],["Certain event","P(E) = 1","Sure to happen"],["Impossible event","P(E) = 0","Cannot happen"],["Complement","P(not E) = 1 − P(E)","Sum of an event and its complement is 1"]] },
        { type: "steps", title: "How to solve any probability question", items: ["Identify the experiment and list the full sample space (count total outcomes).","Circle the outcomes that are favourable to the event asked.","Divide favourable by total to get P(E).","Simplify the fraction to its lowest terms.","If 'not E' is asked, use 1 − P(E) as a shortcut."] },
        { type: "example", title: "Rolling a die and drawing a card", lines: ["Q1: A fair die is rolled once. Find P(getting an even number).","Sample space = {1, 2, 3, 4, 5, 6}, so total outcomes = 6.","Even numbers = {2, 4, 6}, so favourable = 3.","P(even) = 3/6 = 1/2.","Q2: One card is drawn from a well-shuffled deck of 52. Find P(a king).","There are 4 kings, total = 52.","P(king) = 4/52 = 1/13.","Q3: Using the complement rule, P(not a king) = 1 − 1/13 = 12/13."] },
        { type: "callout", tone: "warn", text: "A very common mistake: forgetting outcomes. A deck has 52 cards (not 54 — the jokers are removed), 13 of each suit, and face cards are only the Jack, Queen and King (the Ace is not a face card in CBSE)." },
        { type: "keypoints", title: "Remember these", items: ["P(E) = favourable outcomes / total outcomes, only for equally likely outcomes.","Probability always lies between 0 and 1.","P(E) + P(not E) = 1, so P(not E) = 1 − P(E).","Sum of probabilities of all elementary outcomes of an experiment = 1.","A standard deck = 52 cards, 4 suits, 12 face cards, 13 cards per suit."] },
        { type: "quiz", question: "A bag contains 5 red and 3 black balls. One ball is drawn at random. What is the probability that it is NOT red?", options: ["5/8","3/8","1/2","3/5"], correct: 1, explain: "Total balls = 5 + 3 = 8. Balls that are not red = 3 black. So P(not red) = 3/8. You could also use the complement: P(red) = 5/8, so P(not red) = 1 − 5/8 = 3/8." },
    ],
  },
  {
    slug: "life-processes-explained",
    title: "Life Processes — Nutrition, Respiration, Transport and Excretion",
    summary: "A friendly Class 10 walkthrough of the four life processes: how organisms get nutrition, release energy through respiration, transport materials in humans and plants, and remove wastes by excretion.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "life-processes",
    readingMinutes: 8,
    practiceTestSlug: "life-processes-practice-1",
    blocks: [
        { type: "analogy", title: "A living city", text: "Think of your body as a busy city. Food trucks bring in supplies (nutrition), power stations burn fuel for energy (respiration), a road-and-pipe network delivers goods everywhere (transportation), and garbage vans carry away the waste (excretion). A city stops working if any one service fails — and so does a living body. These four services are the life processes." },
        { type: "para", text: "Life processes are the basic functions that every living organism must carry out to stay alive and maintain itself, even while resting. The main ones in the Class 10 syllabus are nutrition, respiration, transportation and excretion. Together they keep the body's cells fed, energised, connected and clean." },
        { type: "heading", text: "1. Nutrition — getting food" },
        { type: "para", text: "Nutrition is how organisms obtain and use food for energy and growth. Autotrophs (green plants) make their own food by photosynthesis; heterotrophs (animals, fungi) take food from outside. In humans, digestion breaks large food molecules into small absorbable ones with the help of enzymes." },
        { type: "formula", text: "Photosynthesis: 6CO2 + 6H2O --(sunlight, chlorophyll)--> C6H12O6 + 6O2" },
        { type: "heading", text: "2. Respiration — releasing energy" },
        { type: "para", text: "Respiration breaks down glucose to release energy stored as ATP. Aerobic respiration (with oxygen, in the mitochondria) releases a lot of energy; anaerobic respiration (without oxygen) releases much less. In our muscles during heavy exercise, glucose turns into lactic acid, which causes cramps." },
        { type: "table", headers: ["Feature","Aerobic respiration","Anaerobic respiration"], rows: [["Oxygen","Required","Not required"],["End products","CO2 + water","Lactic acid (muscles) or ethanol + CO2 (yeast)"],["Energy released","Large amount","Small amount"],["Site","Cytoplasm + mitochondria","Cytoplasm only"]] },
        { type: "heading", text: "3. Transportation — the delivery network" },
        { type: "para", text: "In humans, blood carries oxygen, food and wastes, pumped by a four-chambered heart. Our circulation is a double circulation: blood passes through the heart twice in one full cycle, keeping oxygenated and deoxygenated blood separate. In plants, xylem carries water and minerals upward, while phloem transports food (translocation) in both directions." },
        { type: "callout", tone: "tip", text: "Memory hook: xyLem carries water up (think 'L' for Lift from roots), phLoem carries Food (think 'F' in phloem's 'ph...f' sound). Arteries carry blood Away from the heart." },
        { type: "heading", text: "4. Excretion — removing waste" },
        { type: "para", text: "Excretion removes harmful nitrogenous wastes like urea. In humans the kidneys filter blood; their functional unit is the nephron, where useful substances are reabsorbed and urine is formed. Plants excrete more simply — through stomata, by shedding leaves, or storing wastes as resins and gums." },
        { type: "example", title: "Follow one glucose molecule", lines: ["You eat a chapati; starch is digested to glucose in the small intestine.","Glucose is absorbed into the blood and carried to body cells.","Inside a cell's mitochondria, glucose combines with oxygen (aerobic respiration).","Energy is released as ATP; the cell uses it to work.","Waste CO2 leaves via blood to the lungs and is breathed out; nitrogenous waste (urea) is filtered by kidneys."] },
        { type: "keypoints", title: "Quick revision", items: ["Autotrophic nutrition = self-made food (photosynthesis); heterotrophic = food from outside.","Aerobic respiration needs oxygen and gives more energy than anaerobic.","Humans have a four-chambered heart and double circulation.","Xylem transports water/minerals upward; phloem transports food both ways.","The nephron is the functional unit of the kidney; urea is the main nitrogenous waste."] },
        { type: "quiz", question: "During vigorous exercise, why do our leg muscles sometimes cramp?", options: ["Glucose is converted to ethanol and carbon dioxide","Lack of oxygen causes anaerobic respiration, forming lactic acid","The heart stops supplying blood to the legs","Excess oxygen builds up in the muscle cells"], correct: 1, explain: "During heavy exercise, oxygen supply to the muscles falls short. The muscle cells then respire anaerobically, breaking glucose into lactic acid. The build-up of lactic acid causes the pain and cramps. (Ethanol + CO2 is the anaerobic product in yeast, not in human muscles.)" },
    ],
  },
  {
    slug: "electricity-explained",
    title: "Electricity — Current, Ohm's Law and Circuits",
    summary: "A concept-first Class 10 guide to electricity: electric current and potential difference, Ohm's law, resistance, series and parallel combinations, and the heating and power formulas with worked examples.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "electricity",
    readingMinutes: 8,
    practiceTestSlug: "electricity-practice-1",
    blocks: [
        { type: "analogy", title: "Water in a pipe", text: "Imagine water flowing through a pipe. The amount of water flowing per second is like electric current. The pressure that pushes it is like potential difference (voltage). A narrow, rough pipe that slows the flow is like resistance. Once you can picture the water, the whole chapter of electricity becomes intuitive." },
        { type: "para", text: "Electric current is the flow of electric charge (electrons) through a conductor. Its SI unit is the ampere (A). Potential difference is the work done to move a unit charge between two points, measured in volts (V). A cell or battery provides this 'push' that keeps charges flowing in a closed circuit." },
        { type: "formula", text: "Current: I = Q / t   (charge in coulombs ÷ time in seconds)" },
        { type: "heading", text: "Ohm's Law — the heart of the chapter" },
        { type: "para", text: "Ohm's law states that, at constant temperature, the current through a conductor is directly proportional to the potential difference across it. The constant of proportionality is the resistance R, measured in ohms (Ω). This one relationship is used in almost every numerical of the chapter." },
        { type: "formula", text: "V = I x R   (so I = V / R  and  R = V / I)" },
        { type: "callout", tone: "info", text: "Resistance depends on the conductor: R = ρL/A. A longer wire (more L) has more resistance; a thicker wire (more area A) has less. ρ (rho) is the resistivity, a property of the material — copper has low resistivity, so it makes good wires." },
        { type: "heading", text: "Combining resistors: series vs parallel" },
        { type: "table", headers: ["Property","Series combination","Parallel combination"], rows: [["Current","Same through each resistor","Divides among branches"],["Voltage","Divides across resistors","Same across each resistor"],["Equivalent R","Rs = R1 + R2 + R3","1/Rp = 1/R1 + 1/R2 + 1/R3"],["Effect","Total R increases","Total R decreases"]] },
        { type: "callout", tone: "tip", text: "Home appliances are wired in parallel, not series. This way each device gets the full 220 V, runs independently, and switching one off does not stop the others." },
        { type: "heading", text: "Heating effect and electric power" },
        { type: "para", text: "When current flows through a resistance, electrical energy turns into heat — this is Joule's heating, used in heaters, geysers and bulbs. Electric power is the rate at which electrical energy is used, measured in watts (W)." },
        { type: "formula", text: "Heat: H = I^2 x R x t     Power: P = V x I = I^2 x R = V^2 / R" },
        { type: "example", title: "A bulb on the mains", lines: ["Q: An electric bulb is rated 220 V and 100 W. Find its resistance and the current it draws.","Use P = V^2 / R, so R = V^2 / P.","R = (220 x 220) / 100 = 48400 / 100 = 484 Ω.","Now find current using P = V x I, so I = P / V.","I = 100 / 220 = 0.45 A (approx).","So the bulb has 484 Ω resistance and draws about 0.45 A."] },
        { type: "keypoints", title: "Formulas to memorise", items: ["I = Q/t; current is measured in amperes with an ammeter (connected in series).","Ohm's law: V = IR; voltmeter measures V and is connected in parallel.","Series: Rs = R1 + R2 + ...; Parallel: 1/Rp = 1/R1 + 1/R2 + ...","Resistance R = ρL/A — increases with length, decreases with area.","Power P = VI = I^2R = V^2/R; energy is often billed in kilowatt-hours (1 kWh = 1 unit)."] },
        { type: "quiz", question: "Three resistors of 2 Ω, 3 Ω and 5 Ω are connected in series. What is their equivalent resistance?", options: ["10 Ω","0.97 Ω","1.03 Ω","30 Ω"], correct: 0, explain: "In a series combination, resistances simply add up: Rs = 2 + 3 + 5 = 10 Ω. (The value 0.97 Ω would be the answer if they were connected in parallel, where 1/Rp = 1/2 + 1/3 + 1/5.)" },
    ],
  },
  {
    slug: "acids-bases-salts-explained",
    title: "Acids, Bases & Salts — The Complete Class 10 Guide",
    summary: "Understand acids, bases and salts with indicators, the pH scale, neutralisation reactions and everyday salts like baking soda, washing soda and plaster of Paris — explained simply for Class 10.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "acids-bases-salts",
    readingMinutes: 7,
    practiceTestSlug: "acids-bases-salts-practice-1",
    blocks: [
        { type: "analogy", title: "Lemon vs Soap", text: "Bite into a lemon and your face scrunches up — that sour tang is an acid at work. Rub a bar of soap between wet fingers and it feels slippery and slightly bitter — that is a base. Almost every acid tastes sour and every base feels soapy. Chemistry just gives us a safe way to tell them apart without tasting anything, because in the lab many acids and bases are dangerous." },
        { type: "heading", text: "The Core Idea: It's All About Ions" },
        { type: "para", text: "When an acid dissolves in water it releases hydrogen ions (H+), which actually join water to form hydronium ions (H3O+). When a base dissolves in water it releases hydroxide ions (OH-). A base that dissolves in water is called an alkali (like NaOH and KOH). These invisible ions are what make acids and bases behave the way they do. We detect them using indicators — substances that change colour or smell in acids and bases." },
        { type: "table", headers: ["Indicator","In Acid","In Base"], rows: [["Blue litmus","Turns red","No change"],["Red litmus","No change","Turns blue"],["Phenolphthalein","Colourless","Pink"],["Methyl orange","Red / pink","Yellow"],["Onion / vanilla (smell)","Smell remains","Smell fades"]] },
        { type: "heading", text: "Reactions You Must Know" },
        { type: "formula", text: "Acid + Metal -> Salt + Hydrogen gas   |   Acid + Metal carbonate/bicarbonate -> Salt + Water + CO2   |   Acid + Base -> Salt + Water (neutralisation)   |   Metal oxide (basic) + Acid -> Salt + Water" },
        { type: "callout", tone: "warn", text: "Always add acid TO water slowly, never water to acid. Mixing acid with water releases a lot of heat; adding water to concentrated acid can make it splash and burn you." },
        { type: "heading", text: "The pH Scale in Daily Life" },
        { type: "para", text: "The pH scale runs from 0 to 14 and measures how acidic or basic a solution is. pH 7 is neutral (pure water). Below 7 is acidic — the lower the number, the stronger the acid. Above 7 is basic — the higher the number, the stronger the base. pH matters everywhere: our stomach uses HCl (about pH 1-2) to digest food, an antacid (a mild base) cools acidity, plants grow best in soil of the right pH, and tooth decay starts when mouth pH falls below 5.5. Strong acids and bases ionise fully in water; weak ones ionise only partly." },
        { type: "table", headers: ["Salt (common name)","Formula","Everyday Use"], rows: [["Common salt","NaCl","Cooking; raw material for NaOH, baking soda"],["Baking soda","NaHCO3","Antacid, baking, fire extinguishers"],["Washing soda","Na2CO3.10H2O","Cleaning, softening hard water"],["Bleaching powder","CaOCl2","Bleaching cloth/paper, disinfecting water"],["Plaster of Paris","CaSO4.(1/2)H2O","Casts for fractures, making chalk, plastering"]] },
        { type: "example", title: "Worked Example: Making a Salt", lines: ["Question: What is formed when hydrochloric acid reacts with sodium hydroxide?","Acid HCl supplies H+ ions; base NaOH supplies OH- ions.","H+ and OH- combine: H+ + OH- -> H2O (water).","The leftover ions Na+ and Cl- combine: Na+ + Cl- -> NaCl (a salt).","Full equation: NaOH + HCl -> NaCl + H2O.","This is a neutralisation reaction — heat is released and the pH moves toward 7."] },
        { type: "keypoints", title: "Remember These", items: ["Acids give H+ (as H3O+) in water; bases give OH- in water.","Acids turn blue litmus red; bases turn red litmus blue; phenolphthalein turns pink in base.","Acid + Base -> Salt + Water is neutralisation.","pH 7 is neutral, below 7 acidic, above 7 basic; tooth decay starts below pH 5.5.","Water of crystallisation is the fixed water in a crystal, e.g. CuSO4.5H2O (blue), Na2CO3.10H2O."] },
        { type: "quiz", question: "Tooth decay begins when the pH of the mouth falls below 5.5. Brushing with toothpaste (which is basic) helps because it:", options: ["Increases the acidity further","Neutralises the excess acid","Always keeps the mouth at exactly pH 7","Coats the teeth with sugar"], correct: 1, explain: "Bacteria in the mouth produce acids that lower the pH and attack enamel. A basic toothpaste neutralises this excess acid, raising the pH back above 5.5 and protecting the teeth." },
    ],
  },
  {
    slug: "carbon-compounds-explained",
    title: "Carbon and Its Compounds — Made Simple",
    summary: "Master Class 10 Carbon and Its Compounds: covalent bonding, catenation, homologous series, functional groups, IUPAC naming, and key reactions like combustion, addition and esterification.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "carbon-and-its-compounds",
    readingMinutes: 8,
    practiceTestSlug: "carbon-compounds-practice-1",
    blocks: [
        { type: "analogy", title: "Carbon, the Ultimate Lego Block", text: "Imagine a Lego brick with exactly four studs that can click onto four other bricks — and those bricks can click onto more, endlessly, in straight lines, branches or rings. That is carbon. Because each carbon atom can bond to four others (including other carbons), it builds millions of different structures. This is why almost everything living — food, fuel, plastic, medicine — is built around carbon." },
        { type: "heading", text: "Why Carbon Forms So Many Compounds" },
        { type: "para", text: "Carbon has atomic number 6, so its electron arrangement is 2,4 — four electrons in the outer shell. To become stable it would need to gain or lose four electrons, which takes too much energy. Instead, carbon shares its four electrons, forming covalent bonds. Two special abilities follow: tetravalency (it always forms four bonds) and catenation (carbon atoms link to one another to form long chains, branched chains and rings). Together these give carbon an enormous family of compounds." },
        { type: "table", headers: ["Series","General Formula","Bond Type","Example"], rows: [["Alkanes","CnH2n+2","Single bonds (saturated)","Methane CH4, Ethane C2H6"],["Alkenes","CnH2n","One C=C double bond","Ethene C2H4"],["Alkynes","CnH2n-2","One C triple-bond C","Ethyne C2H2"]] },
        { type: "formula", text: "Alkane: CnH2n+2   |   Alkene: CnH2n   |   Alkyne: CnH2n-2   |   Any two neighbours in a homologous series differ by one CH2 unit (a mass difference of 14 u)" },
        { type: "heading", text: "Functional Groups & Naming" },
        { type: "para", text: "A functional group is an atom or group of atoms that gives a compound its special properties. The carbon chain is named with a root (meth = 1 carbon, eth = 2, prop = 3, but = 4) plus a suffix. Saturated compounds end in -ane. A functional group is shown by a prefix or suffix — for example -ol for alcohols (ethanol) and -oic acid for carboxylic acids (ethanoic acid)." },
        { type: "table", headers: ["Functional Group","Formula","Family","Example"], rows: [["Halo","-Cl, -Br","Haloalkane","Chloroethane C2H5Cl"],["Alcohol","-OH","Alcohol","Ethanol C2H5OH"],["Aldehyde","-CHO","Aldehyde","Ethanal CH3CHO"],["Ketone","-CO-","Ketone","Propanone CH3COCH3"],["Carboxylic acid","-COOH","Carboxylic acid","Ethanoic acid CH3COOH"]] },
        { type: "heading", text: "The Reactions That Matter" },
        { type: "para", text: "Combustion: carbon compounds burn in air to give CO2, water, heat and light, e.g. CH4 + 2O2 -> CO2 + 2H2O. Oxidation: alcohols can be oxidised to carboxylic acids by alkaline KMnO4 or acidified K2Cr2O7. Addition: unsaturated hydrocarbons add hydrogen across the double/triple bond using a nickel catalyst — this hydrogenation converts liquid vegetable oils into solid vanaspati. Substitution: in sunlight, alkanes like methane react with chlorine, where Cl replaces H one at a time (CH4 + Cl2 -> CH3Cl + HCl). Esterification: a carboxylic acid + an alcohol, with a little concentrated H2SO4, give a sweet-smelling ester used in perfumes and flavours." },
        { type: "example", title: "Worked Example: Name and Formula", lines: ["Question: Find the molecular formula and name of the alkane with 3 carbon atoms.","Alkanes follow the general formula CnH2n+2.","Put n = 3: hydrogen atoms = 2(3) + 2 = 8.","So the molecular formula is C3H8.","Root for 3 carbons = 'prop'; saturated (single bonds) suffix = '-ane'.","Name = Propane (the gas used in LPG cylinders)."] },
        { type: "keypoints", title: "Remember These", items: ["Carbon is tetravalent and shows catenation, so it forms covalent compounds in huge numbers.","Saturated = only single bonds (alkanes); unsaturated = a double or triple bond (alkenes, alkynes).","Members of a homologous series differ by CH2 (14 u) and share the same functional group.","Addition reactions need unsaturation + a catalyst (Ni); substitution reactions are typical of saturated alkanes.","Acid + alcohol -> ester + water is esterification (sweet smell); ester + NaOH -> soap is saponification."] },
        { type: "quiz", question: "Which of the following is an unsaturated hydrocarbon?", options: ["Methane (CH4)","Ethane (C2H6)","Ethene (C2H4)","Propane (C3H8)"], correct: 2, explain: "Ethene (C2H4) fits the alkene formula CnH2n and contains a carbon-carbon double bond, so it is unsaturated. Methane, ethane and propane are all alkanes (CnH2n+2) with only single bonds, so they are saturated." },
    ],
  },
  {
    slug: "metals-nonmetals-explained",
    title: "Metals and Non-metals — The Complete Class 10 Guide",
    summary: "A clear Class 10 guide to metals and non-metals covering physical and chemical properties, the reactivity series, displacement, ionic bonding, extraction of metals and corrosion.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "metals-and-nonmetals",
    readingMinutes: 7,
    practiceTestSlug: "metals-nonmetals-practice-1",
    blocks: [
        { type: "analogy", title: "Givers and Takers", text: "Think of a group project. Some people happily give away their ideas to whoever needs them — that is a metal, always ready to give away electrons. Others prefer to hold on and take a little extra — that is a non-metal, which pulls electrons in. When a giver meets a taker, electrons change hands and a strong bond forms. Almost all of the chemistry of metals and non-metals comes from this simple habit of giving versus taking electrons." },
        { type: "heading", text: "Metals vs Non-metals: Spot the Difference" },
        { type: "table", headers: ["Property","Metals","Non-metals"], rows: [["Appearance","Shiny (lustrous)","Dull (exception: iodine is shiny)"],["State at room temp","Solid (exception: mercury is liquid)","Solid, liquid or gas"],["Malleable & ductile","Yes","No — usually brittle"],["Conductivity","Good conductors of heat/electricity","Poor (exception: graphite conducts)"],["Sonorous (ring when struck)","Yes","No"]] },
        { type: "para", text: "Chemically, metals react with oxygen to form basic oxides (some, like Al2O3 and ZnO, are amphoteric — they react with both acids and bases). Reactive metals like sodium and potassium react vigorously even with cold water, releasing hydrogen; less reactive ones react slowly or not at all. Metals above hydrogen in reactivity react with dilute acids to give a salt and hydrogen gas, while copper, silver and gold do not. Non-metals generally form acidic oxides (e.g. CO2, SO2)." },
        { type: "heading", text: "The Reactivity Series — The Master Key" },
        { type: "formula", text: "K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au    (most reactive on the left, least reactive on the right)" },
        { type: "para", text: "This single list explains a lot. A more reactive metal displaces a less reactive metal from its salt solution — for example iron displaces copper: Fe + CuSO4 -> FeSO4 + Cu. Metals placed above hydrogen can push hydrogen out of dilute acids; those below (Cu, Ag, Au) cannot. The most reactive metals at the top are the hardest to extract from their ores, while the least reactive at the bottom (like gold) are often found free in nature." },
        { type: "heading", text: "Bonding, Extraction & Rusting" },
        { type: "para", text: "When a metal meets a non-metal, electrons transfer: the metal loses electrons to form a positive ion and the non-metal gains them to form a negative ion, giving an ionic (electrovalent) bond, as in Na+ Cl-. Ionic compounds have high melting and boiling points, and conduct electricity when molten or dissolved in water because their ions become free to move. Extraction (metallurgy) depends on reactivity: ores of moderately reactive metals are roasted or calcined to oxides and then reduced with carbon, while highly reactive metals (Na, K, Ca, Mg, Al) are obtained by electrolytic reduction. Finally, corrosion eats away metals — iron rusts (hydrated iron(III) oxide) only when both air and moisture are present. Rusting is prevented by painting, oiling/greasing, galvanising (a zinc coat), chrome plating, or alloying (e.g. stainless steel)." },
        { type: "example", title: "Worked Example: Displacement Reaction", lines: ["Question: An iron nail is dipped in blue copper sulphate solution. What happens?","Check the reactivity series: iron (Fe) lies above copper (Cu).","So iron is more reactive and displaces copper from the solution.","Reaction: Fe + CuSO4 -> FeSO4 + Cu.","Observation: the blue colour fades to pale green, and a brownish copper layer coats the nail.","Conclusion: a more reactive metal displaces a less reactive metal from its salt solution."] },
        { type: "keypoints", title: "Remember These", items: ["Metals are lustrous, malleable, ductile, sonorous and good conductors; non-metals are mostly the opposite.","Key exceptions: mercury is a liquid metal; graphite (a non-metal) conducts electricity; iodine is lustrous.","Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au.","A more reactive metal displaces a less reactive one from its salt solution.","Ionic bonds form by electron transfer between metals and non-metals; ionic compounds conduct when molten or dissolved.","Rusting of iron needs both air and moisture; prevent it by galvanising, painting, oiling or alloying."] },
        { type: "quiz", question: "Which metal can displace copper from copper sulphate solution?", options: ["Silver (Ag)","Gold (Au)","Zinc (Zn)","Mercury (Hg)"], correct: 2, explain: "Zinc lies above copper in the reactivity series, so it is more reactive and displaces copper: Zn + CuSO4 -> ZnSO4 + Cu. Silver, gold and mercury are all less reactive than copper, so they cannot displace it." },
    ],
  },
  {
    slug: "nationalism-in-india-explained",
    title: "Nationalism in India — How a Nation Was Forged",
    summary: "Understand how India's freedom struggle built a nation — the Rowlatt Act, Jallianwala Bagh, Non-Cooperation and Khilafat, the Salt March, and the symbols of Indian nationalism, explained for CBSE Class 10.",
    examSlug: "class-10",
    subjectSlug: "history",
    chapterSlug: "nationalism-in-india",
    readingMinutes: 6,
    practiceTestSlug: "nationalism-india-practice-1",
    blocks: [
        { type: "analogy", title: "Many threads, one rope", text: "Imagine a cricket stadium in a World Cup final. In daily life a Tamil farmer, a Punjabi student and a Bengali clerk lead separate lives — but the moment India is on the field, they cheer as one people. Indian nationalism grew the same way: colonial rule hurt everyone differently, yet the shared experience of that struggle wove many separate 'threads' into one strong national rope." },
        { type: "para", text: "Nationalism means a feeling of belonging to one nation. In India this feeling was forged during the anti-colonial movement against the British. As people fought a common oppressor, they began to imagine themselves as one people — Indians — sharing symbols, songs, and a dream of Swaraj (self-rule). This chapter traces how Mahatma Gandhi turned scattered protests into a united mass movement." },
        { type: "heading", text: "The spark: War, Rowlatt Act and Jallianwala Bagh" },
        { type: "para", text: "The First World War (1914-18) brought heavy taxes, forced recruitment and soaring prices, spreading anger across India. In 1919 the British passed the Rowlatt Act, which allowed detention without trial. When Indians protested peacefully, the massacre at Jallianwala Bagh in Amritsar (13 April 1919) — where General Dyer's troops fired on an unarmed crowd — shocked the whole country and pushed millions toward the freedom movement." },
        { type: "heading", text: "Non-Cooperation and Khilafat" },
        { type: "steps", title: "How Non-Cooperation was meant to work", items: ["Surrender titles and honours awarded by the British government.","Boycott government schools, courts, and legislative councils.","Boycott foreign cloth and promote khadi and the charkha (spinning wheel).","Refuse to cooperate, so that British rule — which ran on Indian help — would slowly grind to a halt."] },
        { type: "para", text: "Gandhi joined hands with the Khilafat Movement (led by the Ali brothers, Mohammad Ali and Shaukat Ali) to unite Hindus and Muslims. Together they launched the Non-Cooperation Movement in 1921. It was India's first true mass movement — but Gandhi called it off in February 1922 after the violent Chauri Chaura incident, insisting the struggle must stay non-violent." },
        { type: "table", headers: ["Year","Event","Significance"], rows: [["1919","Rowlatt Act & Jallianwala Bagh","Repression united Indians in shared anger"],["1921-22","Non-Cooperation + Khilafat","First mass movement; boycott of goods, titles, schools"],["1922","Chauri Chaura","Mob violence led Gandhi to withdraw the movement"],["1928","Simon Commission arrives","All-white commission met with 'Go back Simon' protests"],["1930","Dandi March / Civil Disobedience","Salt law broken; open defiance of British authority"],["1931","Gandhi-Irwin Pact","Movement paused; Gandhi agreed to attend the Round Table Conference"]] },
        { type: "heading", text: "Civil Disobedience and the Salt March" },
        { type: "example", title: "The Salt March — satyagraha in action (1930)", lines: ["Problem: The British held a monopoly on salt and taxed it — a daily essential every Indian needed.","12 March 1930: Gandhi set out from the Sabarmati Ashram with 78 chosen followers.","The march covered about 240 miles (385 km) to the coastal village of Dandi in Gujarat.","6 April 1930: Gandhi reached Dandi and broke the salt law by boiling seawater to make salt.","Result: A single symbolic, non-violent act sparked the nationwide Civil Disobedience Movement."] },
        { type: "callout", tone: "info", text: "Nationalism also grew through culture and symbols: the image of 'Bharat Mata' (first painted by Abanindranath Tagore), the song 'Vande Mataram' from Bankim Chandra Chattopadhyay's novel Anandamath, the Swaraj tricolour flag with a spinning wheel, folklore, and a reinterpreted glorious past." },
        { type: "keypoints", title: "Remember these", items: ["Rowlatt Act (1919) allowed arrest without trial; Jallianwala Bagh massacre followed.","Non-Cooperation (1921-22) united Khilafat and Congress; withdrawn after Chauri Chaura.","Civil Disobedience Movement began with the Dandi/Salt March (1930).","Purna Swaraj (complete independence) was declared at the Lahore Congress, 1929; 26 January 1930 was the first Independence Day.","Symbols like Bharat Mata, Vande Mataram and the tricolour built a shared sense of nationhood."] },
        { type: "quiz", question: "Why did Mahatma Gandhi call off the Non-Cooperation Movement in February 1922?", options: ["The Jallianwala Bagh massacre","The violent Chauri Chaura incident","The failure of the Salt March","The signing of the Poona Pact"], correct: 1, explain: "At Chauri Chaura, a peaceful procession turned violent and a police station was set on fire, killing policemen. Gandhi, committed to non-violence, immediately withdrew the Non-Cooperation Movement. Jallianwala Bagh (1919) came before the movement, while the Salt March and Poona Pact came later." },
    ],
  },
  {
    slug: "structure-of-atom-explained",
    title: "Structure of Atom — The Complete Basics",
    summary: "A clear, exam-ready guide to atomic structure for JEE — subatomic particles, Thomson to Bohr models, the hydrogen spectrum formulas, quantum numbers, and the Aufbau, Pauli and Hund rules.",
    examSlug: "jee",
    subjectSlug: "chemistry",
    chapterSlug: "structure-of-atom",
    readingMinutes: 8,
    practiceTestSlug: "jee-structure-of-atom-practice-1",
    blocks: [
        { type: "analogy", title: "A stadium with a marble at its centre", text: "If an atom were blown up to the size of a huge cricket stadium, the nucleus would be a tiny marble at the very centre, and the electrons would be like specks buzzing around the outer stands. Almost the entire atom is empty space, yet nearly all its mass sits in that central marble — the nucleus." },
        { type: "para", text: "The atom is the basic unit of matter, made of a dense positive nucleus (protons + neutrons) surrounded by negatively charged electrons. Our picture of it evolved in stages: Thomson's 'plum pudding' model, Rutherford's nuclear model (from the gold-foil experiment), Bohr's orbits, and finally the modern quantum-mechanical model of orbitals." },
        { type: "heading", text: "Meet the subatomic particles" },
        { type: "table", headers: ["Particle","Charge","Relative mass","Discovered by"], rows: [["Electron","-1","~1/1836 u","J. J. Thomson"],["Proton","+1","1 u","E. Goldstein (canal rays)"],["Neutron","0","1 u","James Chadwick"]] },
        { type: "heading", text: "Bohr's model of the atom" },
        { type: "para", text: "Niels Bohr proposed that electrons revolve only in certain fixed circular orbits (energy levels) without radiating energy. Each orbit has a definite energy, so these are called stationary states. An electron absorbs energy to jump to a higher orbit and releases a photon of light when it falls back — this is why atoms give sharp line spectra rather than a continuous rainbow." },
        { type: "formula", text: "Radius: rn = 0.529 x n^2 / Z angstrom   |   Energy: En = -13.6 x Z^2 / n^2 eV   |   Spectrum: 1/lambda = R (1/n1^2 - 1/n2^2), with R = 1.097 x 10^7 per metre" },
        { type: "formula", text: "Dual nature: de Broglie wavelength lambda = h / mv   |   Heisenberg uncertainty: (delta x)(delta p) >= h / 4(pi)" },
        { type: "example", title: "Wavelength of the first Balmer line of hydrogen (n=3 to n=2)", lines: ["For hydrogen Z = 1. The electron falls from n2 = 3 to n1 = 2.","1/lambda = R (1/n1^2 - 1/n2^2) = 1.097 x 10^7 (1/2^2 - 1/3^2)","1/2^2 - 1/3^2 = 1/4 - 1/9 = (9 - 4)/36 = 5/36 = 0.1389","1/lambda = 1.097 x 10^7 x 0.1389 = 1.524 x 10^6 per metre","lambda = 1 / (1.524 x 10^6) = 6.56 x 10^-7 m = 656 nm","This is red light — the famous H-alpha line of the Balmer series."] },
        { type: "heading", text: "Filling electrons: quantum numbers and rules" },
        { type: "keypoints", title: "The four quantum numbers and three filling rules", items: ["n (principal): shell size and energy; n = 1, 2, 3... Maximum electrons in a shell = 2n^2.","l (azimuthal): subshell shape; l = 0 to (n-1), giving s, p, d, f.","m (magnetic): orientation of the orbital; m ranges from -l to +l.","s (spin): direction of electron spin; +1/2 or -1/2.","Aufbau principle: electrons fill the lowest-energy orbitals first (order set by the n + l rule).","Pauli exclusion principle: no two electrons in an atom can have all four quantum numbers identical (so an orbital holds at most 2 electrons, with opposite spins).","Hund's rule: electrons singly occupy each orbital of a subshell before any pairing begins."] },
        { type: "callout", tone: "warn", text: "Common mistake: Bohr's model works only for single-electron (hydrogen-like) species such as H, He+ and Li2+. It cannot explain multi-electron atoms, the fine splitting of spectral lines, or the Heisenberg uncertainty principle — which is why the quantum-mechanical orbital model replaced it." },
        { type: "quiz", question: "What is the maximum number of electrons that the third shell (n = 3) can hold?", options: ["6","8","18","32"], correct: 2, explain: "The maximum number of electrons in a shell is given by 2n^2. For n = 3, this is 2 x 3^2 = 2 x 9 = 18. (For n = 1 it is 2, for n = 2 it is 8, and for n = 4 it is 32.)" },
    ],
  },
  {
    slug: "human-health-disease-explained",
    title: "Human Health and Disease — Immunity Made Simple",
    summary: "Master NEET's Human Health and Disease — common pathogens and their vectors, innate vs acquired immunity, active vs passive immunity, antibodies, allergies and vaccination, with worked examples.",
    examSlug: "neet",
    subjectSlug: "biology",
    chapterSlug: "human-health-and-disease",
    readingMinutes: 7,
    practiceTestSlug: "neet-human-health-disease-practice-1",
    blocks: [
        { type: "analogy", title: "A fortress with layered defences", text: "Think of your body as a walled fortress. The outer wall and moat — your skin, mucus and stomach acid — stop most invaders without asking who they are. But if an enemy slips inside, a trained intelligence unit steps in: it identifies that specific enemy, defeats it, and keeps a 'wanted poster' so it can crush the same enemy instantly next time. That two-layer defence is exactly how your immune system works." },
        { type: "para", text: "Health is not merely the absence of disease but a state of complete physical, mental and social well-being. Diseases are often caused by pathogens — disease-causing organisms like bacteria, viruses, fungi, protozoans and worms (helminths). Your immune system fights them using two arms: innate (inborn, general) immunity and acquired (specific, memory-based) immunity." },
        { type: "heading", text: "Common human diseases you must know" },
        { type: "table", headers: ["Disease","Pathogen (type)","How it spreads / organ affected"], rows: [["Typhoid","Salmonella typhi (bacterium)","Contaminated food/water; small intestine (Widal test)"],["Pneumonia","Streptococcus pneumoniae (bacterium)","Droplets; alveoli of the lungs"],["Common cold","Rhinoviruses","Droplets; nose and respiratory passage"],["Malaria","Plasmodium (protozoan)","Female Anopheles mosquito; liver and RBCs"],["Amoebiasis","Entamoeba histolytica (protozoan)","Houseflies carry it; large intestine"],["Filariasis","Wuchereria (helminth)","Female Culex mosquito; lymphatic vessels"],["Ringworm","Microsporum / Trichophyton (fungi)","Contact; skin, nails and scalp"]] },
        { type: "heading", text: "Two lines of defence: innate vs acquired immunity" },
        { type: "para", text: "Innate immunity is present from birth and is non-specific — physical barriers (skin), physiological barriers (acid, saliva), cellular barriers (phagocytes) and inflammation attack anything foreign. Acquired immunity is specific and develops after exposure. It is run by lymphocytes: B-cells produce antibodies (humoral / antibody-mediated immunity), while T-cells drive cell-mediated immunity. Its superpower is memory — it responds faster and stronger on a second exposure." },
        { type: "table", headers: ["Feature","Active immunity","Passive immunity"], rows: [["Source","Body makes its own antibodies","Ready-made antibodies given from outside"],["Trigger","Infection or vaccine (antigen)","Injected serum or mother's antibodies"],["Speed","Slow to appear","Acts immediately"],["Duration","Long-lasting (has memory)","Short-lived (no memory)"],["Example","Chickenpox recovery, vaccines","Colostrum, anti-tetanus serum (ATS), anti-venom"]] },
        { type: "example", title: "Spot the immunity type", lines: ["A newborn receives antibodies through mother's first milk (colostrum) -> ready-made antibodies -> Passive immunity.","A child recovers from measles and is protected for life -> body made its own memory cells -> Active (natural).","A student is given a tetanus vaccine and slowly builds antibodies -> Active (artificial).","A dog-bite victim is injected with pre-formed anti-tetanus serum -> Passive (artificial)."] },
        { type: "callout", tone: "tip", text: "Every antibody has the same basic H2L2 structure — two heavy (H) and two light (L) polypeptide chains joined into a 'Y'. Primary lymphoid organs, where lymphocytes are made and mature, are the bone marrow and thymus; the spleen, lymph nodes and tonsils are secondary lymphoid organs." },
        { type: "keypoints", title: "Remember these", items: ["Pathogens include bacteria, viruses, fungi, protozoans and helminths.","Innate immunity is non-specific and present from birth; acquired immunity is specific and remembers.","B-lymphocytes give humoral (antibody-mediated) immunity; T-lymphocytes give cell-mediated immunity.","Active immunity is slow but long-lasting; passive immunity is fast but temporary.","Vaccination creates memory cells (primary response) so a later infection triggers a fast, strong secondary response.","Immune disorders include allergies (IgE), autoimmunity (body attacks self, e.g. rheumatoid arthritis) and AIDS (HIV destroys helper T-cells)."] },
        { type: "quiz", question: "Which class of antibodies is responsible for allergic reactions such as hay fever and asthma?", options: ["IgA","IgE","IgG","IgM"], correct: 1, explain: "Allergens trigger the production of IgE antibodies, which bind to mast cells and basophils. On re-exposure they cause these cells to release histamine and other chemicals, producing sneezing, watery eyes, wheezing and other allergy symptoms." },
    ],
  },
  {
    slug: "mixture-alligation-explained",
    title: "Mixture & Alligation: The Cross Method That Saves You Minutes",
    summary: "Master mixtures and the rule of alligation for SSC-CGL with a simple cross-method shortcut, ratio formulas, and the classic repeated-replacement trick.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "mixture-alligation",
    readingMinutes: 7,
    practiceTestSlug: "mixture-alligation-practice-1",
    blocks: [
        { type: "analogy", title: "The chai stall test", text: "Imagine a chaiwala mixing cheap tea leaves at ₹200/kg with premium leaves at ₹300/kg to sell a blend at ₹260/kg. He is not doing hard maths in his head. He simply feels out 'how far each price is from the target' and pours accordingly. That instinct is exactly what Alligation formalises. Once you see mixtures as a tug-of-war between two prices pulling toward a middle value, the whole chapter becomes one clean shortcut." },
        { type: "para", text: "A 'mixture' problem gives you two (or more) ingredients of different values (price, purity, concentration, or speed) combined into one blend. Your job is usually to find the ratio in which they were mixed, or the resulting average value. Alligation is the fast tool that connects the two." },
        { type: "heading", text: "The Rule of Alligation" },
        { type: "para", text: "When two ingredients at prices (or purities) 'Cheaper' and 'Dearer' are mixed to give a 'Mean' value, the quantities are inversely proportional to their distances from the mean. Cheaper stuff sits farther, so you use less of the dearer and more of the cheaper depending on where the mean lands." },
        { type: "formula", text: "Quantity of Cheaper : Quantity of Dearer = (Dearer price - Mean price) : (Mean price - Cheaper price)" },
        { type: "steps", title: "The cross method (do this in 10 seconds)", items: ["Write Cheaper value on the top-left, Dearer value on the top-right.","Write the Mean (target) value in the middle.","Bottom-left = Dearer - Mean. Bottom-right = Mean - Cheaper.","Read the two bottom numbers: that is the ratio Cheaper : Dearer.","Always take positive (absolute) differences so the ratio makes sense."] },
        { type: "example", title: "Worked example: the chai blend", lines: ["Cheaper tea = ₹200/kg, Dearer tea = ₹300/kg, Mean = ₹260/kg.","Dearer - Mean = 300 - 260 = 40.","Mean - Cheaper = 260 - 200 = 60.","Ratio Cheaper : Dearer = 40 : 60 = 2 : 3.","So for every 5 kg of blend, use 2 kg cheap and 3 kg premium.","Check: (2 x 200 + 3 x 300) / 5 = (400 + 900) / 5 = 1300 / 5 = ₹260. Correct."] },
        { type: "callout", tone: "tip", text: "The ingredient whose price is FARTHER from the mean is used in a SMALLER quantity. Here the mean (260) is closer to 300, so we naturally need more of the ₹300 tea, matching the 2:3 result (3 parts on the dearer side)." },
        { type: "heading", text: "The repeated-replacement (removal) formula" },
        { type: "para", text: "A favourite SSC trap: a vessel has pure milk; you remove some, replace it with water, and repeat this a few times. After each cycle the milk gets diluted. There is a neat formula for the milk left." },
        { type: "formula", text: "Milk left after n operations = Initial quantity x (1 - amount removed each time / total volume)^n" },
        { type: "example", title: "Removal example", lines: ["A 40-litre vessel is full of milk. 8 litres is removed and replaced by water, done twice.","Fraction retained each time = 1 - 8/40 = 1 - 1/5 = 4/5.","Milk left = 40 x (4/5)^2 = 40 x 16/25 = 25.6 litres.","So water present = 40 - 25.6 = 14.4 litres."] },
        { type: "keypoints", title: "Remember these", items: ["Alligation ratio = distances from the mean, taken inversely (Dearer-Mean : Mean-Cheaper).","The bottom-left of the cross belongs to the Cheaper quantity, bottom-right to the Dearer.","Alligation also works for purity %, concentration %, and even average speed - anything that averages.","Removal-and-replace uses (1 - r/V)^n; the fraction, not the litres, is raised to the power.","Always sanity-check by computing the weighted average back to the mean."] },
        { type: "quiz", question: "In what ratio must rice at ₹30/kg be mixed with rice at ₹40/kg so the mixture is worth ₹36/kg?", options: ["3 : 4","2 : 3","4 : 3","3 : 2"], correct: 1, explain: "By alligation: (40 - 36) : (36 - 30) = 4 : 6 = 2 : 3 (cheaper ₹30 : dearer ₹40). Since 36 is closer to 40, we need more of the ₹40 rice, so the dearer share is larger - the ratio 2:3 puts 3 parts on the dearer side. Answer: 2 : 3." },
    ],
  },
  {
    slug: "algebra-explained",
    title: "Algebra Decoded: Identities and Shortcuts for SSC-CGL",
    summary: "Build algebra intuition for SSC-CGL with must-know identities, the a+1/a family of tricks, and a step-by-step method to crack value-finding questions fast.",
    examSlug: "ssc-cgl",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "algebra",
    readingMinutes: 8,
    practiceTestSlug: "algebra-practice-1",
    blocks: [
        { type: "analogy", title: "Algebra is a balance scale", text: "Think of an equation as an old-style weighing balance in a sabzi mandi. Whatever you do to one pan, you must do to the other, or it tips. Add 5 grams to the left? Add 5 to the right. That single rule - keep both sides equal - is the entire soul of algebra. Everything else is just clever ways to rearrange the weights so the unknown x sits alone on one pan." },
        { type: "para", text: "In SSC-CGL, algebra is rarely about solving for x the slow way. It is about recognising a pattern - an identity - and jumping straight to the answer. Master a handful of identities and most questions collapse into one or two lines." },
        { type: "heading", text: "The identities you must know cold" },
        { type: "table", headers: ["Identity","Expansion"], rows: [["(a + b)^2","a^2 + 2ab + b^2"],["(a - b)^2","a^2 - 2ab + b^2"],["a^2 - b^2","(a + b)(a - b)"],["(a + b)^3","a^3 + b^3 + 3ab(a + b)"],["(a - b)^3","a^3 - b^3 - 3ab(a - b)"],["a^3 + b^3","(a + b)(a^2 - ab + b^2)"],["a^3 - b^3","(a - b)(a^2 + ab + b^2)"],["a^3 + b^3 + c^3 - 3abc","(a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)"]] },
        { type: "callout", tone: "info", text: "Special case worth memorising: if a + b + c = 0, then a^3 + b^3 + c^3 = 3abc. This one line solves a huge fraction of SSC cubic questions instantly." },
        { type: "heading", text: "The a + 1/a family (SSC's favourite)" },
        { type: "para", text: "A whole cluster of questions gives you a + 1/a and asks for a^2 + 1/a^2 or a^3 + 1/a^3. These are built from the square and cube identities, because the cross-term neatly becomes 2 or 3." },
        { type: "formula", text: "a^2 + 1/a^2 = (a + 1/a)^2 - 2" },
        { type: "formula", text: "a^3 + 1/a^3 = (a + 1/a)^3 - 3(a + 1/a)" },
        { type: "steps", title: "How to attack an 'a + 1/a' question", items: ["Read what you are given: is it a + 1/a or a - 1/a? The sign changes the -2 to +2.","To climb from power 1 to power 2, square the given value and subtract 2 (for the plus version).","To climb to power 3, cube the given value and subtract 3 times the given value.","Never solve for a itself - stay inside the identity and just plug numbers.","Double-check the sign of the constant: (a - 1/a)^2 = a^2 + 1/a^2 - 2, so a^2 + 1/a^2 = (a - 1/a)^2 + 2."] },
        { type: "example", title: "Worked example", lines: ["Given: a + 1/a = 4. Find a^3 + 1/a^3.","Use a^3 + 1/a^3 = (a + 1/a)^3 - 3(a + 1/a).","= 4^3 - 3 x 4","= 64 - 12","= 52.","Quick cross-check via a^2 + 1/a^2 = 4^2 - 2 = 14, all consistent."] },
        { type: "callout", tone: "warn", text: "The most common exam mistake is mixing signs. For a - 1/a = k, you get a^2 + 1/a^2 = k^2 + 2 (note the PLUS 2), because squaring (a - 1/a) already produces the -2 that you must cancel. Slow down for one second on the sign and you gain a guaranteed mark." },
        { type: "keypoints", title: "Exam-day essentials", items: ["Learn the 8 core identities in the table so you recognise them at a glance.","a + b + c = 0 implies a^3 + b^3 + c^3 = 3abc - a huge time-saver.","For a + 1/a: square-minus-2 for the square, cube-minus-3-times for the cube.","For a - 1/a: square-PLUS-2 for the square; the sign flips only on the even step.","Substitute values into identities; almost never solve the underlying quadratic."] },
        { type: "quiz", question: "If a - 1/a = 3, what is the value of a^2 + 1/a^2?", options: ["7","9","11","6"], correct: 2, explain: "Square both sides: (a - 1/a)^2 = a^2 - 2 + 1/a^2 = 9. So a^2 + 1/a^2 = 9 + 2 = 11. Note the +2, because the -1/a already contributed the -2 when squared. Answer: 11." },
    ],
  },
  {
    slug: "number-series-explained",
    title: "Number Series: Spot the Hidden Rule in Seconds",
    summary: "Crack SSC-CGL number series questions by learning the common patterns - differences, ratios, squares, and mixed rules - with a reliable step-by-step detective method.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "number-series",
    readingMinutes: 6,
    practiceTestSlug: "number-series-practice-1",
    blocks: [
        { type: "analogy", title: "Be a code-breaker, not a calculator", text: "A number series is like a secret handshake between the numbers. Each term whispers to the next using a fixed rule - add this, multiply that, jump by squares. Your job is not to compute wildly but to eavesdrop: watch how one number turns into the next, catch the pattern, then predict the missing member. Once you find the rule, the answer is almost automatic." },
        { type: "para", text: "In the General Intelligence & Reasoning section, number series questions test whether you can detect the logic linking a row of numbers and extend it. There is no formula to memorise - just a small family of common patterns and a disciplined way to hunt for them." },
        { type: "heading", text: "The common patterns to check" },
        { type: "table", headers: ["Pattern type","How to spot it","Example"], rows: [["Constant difference","Same number added each time","3, 7, 11, 15 (+4)"],["Growing difference","Gaps themselves form a pattern","2, 4, 7, 11 (+2,+3,+4)"],["Constant ratio","Each term multiplied by a fixed number","3, 6, 12, 24 (x2)"],["Squares / cubes","Terms near n^2 or n^3","1, 4, 9, 16 (1^2,2^2,3^2,4^2)"],["Mixed (x then +)","Two operations alternate","2, 5, 11, 23 (x2 +1)"],["Alternating series","Two series interleaved","1, 10, 2, 20, 3, 30"]] },
        { type: "steps", title: "The detective method", items: ["First, find the difference between consecutive terms - is it constant?","If differences grow, check whether THEY form a series (second-level differences).","If differences swing wildly, try ratios instead - divide each term by the previous.","Compare terms to nearby squares and cubes (1,4,9,16,25 and 1,8,27,64).","If nothing fits, suspect two interleaved series - read alternate terms separately.","Confirm your rule works for EVERY gap, not just the first one, before answering."] },
        { type: "example", title: "Worked example: the growing-gap series", lines: ["Series: 2, 6, 12, 20, 30, ?","Differences: 6-2=4, 12-6=6, 20-12=8, 30-20=10.","The gaps are 4, 6, 8, 10 - increasing by 2 each time.","So the next gap must be 12.","Next term = 30 + 12 = 42.","Bonus insight: these are n(n+1) values - 1x2, 2x3, 3x4, 4x5, 5x6 = 30, then 6x7 = 42."] },
        { type: "example", title: "Worked example: the mixed-operation series", lines: ["Series: 3, 7, 15, 31, ?","Try x2 then +1: 3x2+1 = 7, 7x2+1 = 15, 15x2+1 = 31. It fits.","So next = 31x2+1 = 63.","Whenever numbers roughly double but not exactly, test 'multiply then add a small constant'."] },
        { type: "callout", tone: "tip", text: "Order of checks matters. Always try differences first (cheapest), then ratios, then squares/cubes, then interleaving. Jumping straight to fancy rules wastes time when a simple +constant was hiding in plain sight." },
        { type: "callout", tone: "warn", text: "Do not lock onto the first rule that fits only the first two terms. Many wrong options are traps that work once. A valid rule must hold across the whole series, so verify every step before you commit." },
        { type: "keypoints", title: "Quick recall", items: ["Check in order: differences, then ratios, then squares/cubes, then interleaved.","Second-level differences reveal 'gap-growing' series like 2, 6, 12, 20.","Memorise squares to 15^2 and cubes to 10^3 - they show up constantly.","Mixed 'multiply then add' patterns explain near-doubling series like 3, 7, 15, 31.","A correct rule works for every consecutive pair, not just one."] },
        { type: "quiz", question: "Find the next term: 4, 9, 19, 39, ?", options: ["79","78","69","80"], correct: 0, explain: "Test 'multiply by 2 then add 1': 4x2+1 = 9, 9x2+1 = 19, 19x2+1 = 39, 39x2+1 = 79. The rule holds across every step, so the next term is 79." },
    ],
  },
  {
    slug: "analogy-explained",
    title: "Analogy — Crack the Hidden Relationship",
    summary: "Learn how word, letter and number analogies work using a simple matchmaker rule, with a step-by-step method and worked examples for SSC-CGL reasoning.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "analogy",
    readingMinutes: 6,
    practiceTestSlug: "analogy-practice-1",
    blocks: [
        { type: "analogy", title: "The matchmaker's logic", text: "Think of an analogy like a matchmaker studying one happy couple to find the perfect match for someone else. You first figure out exactly HOW the first pair is connected, then hunt for a second pair joined in the very same way. 'Doctor is to Hospital' as 'Teacher is to ___?' Once you name the bond, the answer almost picks itself." },
        { type: "heading", text: "What an analogy really is" },
        { type: "para", text: "An analogy gives you a pair of items linked by a hidden relationship and asks you to complete a second pair using the SAME relationship. It is written as A : B :: C : D, read as 'A is to B as C is to D'. Your only job is to discover the rule joining A and B, then apply that identical rule to C to get D." },
        { type: "heading", text: "Common relationship types" },
        { type: "table", headers: ["Relationship","Example pair"], rows: [["Synonym (same meaning)","Happy : Glad"],["Antonym (opposite)","Hot : Cold"],["Worker : Tool","Carpenter : Saw"],["Thing : Function","Pen : Write"],["Cause : Effect","Rain : Flood"],["Part : Whole","Petal : Flower"]] },
        { type: "heading", text: "Letter & number analogies" },
        { type: "steps", title: "How to crack any analogy", items: ["Name the exact relationship in the first pair — be specific, not just 'they are related'.","Frame it as a short sentence, e.g. 'A carpenter uses a saw'.","Apply that same sentence to the third term to predict the fourth.","For letters check the position gap (+1, −1, reverse); for numbers test square, cube, ×, or +."] },
        { type: "example", title: "Letter analogy: CAT : DBU :: DOG : ?", lines: ["Compare CAT to DBU letter by letter: C+1=D, A+1=B, T+1=U.","So the rule is 'add 1 to each letter'.","Apply it to DOG: D+1=E, O+1=P, G+1=H.","Answer = EPH."] },
        { type: "example", title: "Number analogy: 7 : 49 :: 9 : ?", lines: ["Spot the link: 7 × 7 = 49, so the second number is the square of the first.","Apply the same rule to 9: 9 × 9 = 81.","Answer = 81."] },
        { type: "callout", tone: "warn", text: "Order matters! 'Tailor : Cloth' is NOT the same as 'Cloth : Tailor'. Always keep the direction of the relationship identical on both sides of the :: sign." },
        { type: "keypoints", title: "Quick revision", items: ["Analogy = the same relationship applied to a new pair.","Define the bond in a full sentence before choosing.","Keep the direction: A→B must match C→D.","Letters: think position shifts; Numbers: think square, cube, multiples.","If two options seem right, pick the more specific relationship."] },
        { type: "quiz", question: "Doctor : Hospital :: Teacher : ?", options: ["Student","School","Books","Chalk"], correct: 1, explain: "The relationship is 'a professional and their workplace' — a doctor works in a hospital, so a teacher works in a school. 'Student' and 'Books' are linked to a teacher, but not as a workplace." },
    ],
  },
  {
    slug: "direction-distance-explained",
    title: "Direction & Distance — Navigate Like a Pro",
    summary: "Master the compass, left/right turns and the shortest-distance rule for SSC-CGL direction sense, with turn tables, the Pythagoras trick and worked examples.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-intelligence-reasoning",
    chapterSlug: "direction-distance",
    readingMinutes: 7,
    practiceTestSlug: "direction-distance-practice-1",
    blocks: [
        { type: "analogy", title: "The treasure-hunt map", text: "Direction sense is just a treasure hunt. You start at a spot, follow arrows — 3 steps North, turn right, 4 steps East — and you must say where you land and how far it is 'as the crow flies' from where you began. Master one compass and one right-angle-triangle rule, and every clue falls into place." },
        { type: "heading", text: "The compass: 8 directions" },
        { type: "para", text: "There are 4 main directions — North (top), South (bottom), East (right), West (left) — and 4 in-between ones: North-East (NE), South-East (SE), South-West (SW) and North-West (NW). Always draw a small '+' with N pointing up before you start; a quick picture prevents most mistakes." },
        { type: "heading", text: "Turning rules" },
        { type: "formula", text: "Right turn = clockwise (N → E → S → W → N).   Left turn = anti-clockwise (N → W → S → E → N)." },
        { type: "table", headers: ["You are facing","Turn LEFT → face","Turn RIGHT → face"], rows: [["North","West","East"],["East","North","South"],["South","East","West"],["West","South","North"]] },
        { type: "heading", text: "Shortest (straight-line) distance" },
        { type: "formula", text: "When the path forms an L-shape with two perpendicular legs a and b, shortest distance = √(a^2 + b^2)." },
        { type: "example", title: "Walk 3 km North, then 4 km East — how far from start?", lines: ["The two legs are at right angles: 3 km up, then 4 km right.","Shortest distance = √(3^2 + 4^2) = √(9 + 16) = √25.","Distance = 5 km, and the finishing point lies to the North-East of the start."] },
        { type: "callout", tone: "tip", text: "Shadow trick: the sun rises in the East, so early-morning shadows fall towards the West; at sunset the sun is in the West, so shadows fall towards the East. At noon shadows are shortest. This instantly solves 'shadow fell to his left/right' questions." },
        { type: "keypoints", title: "Remember", items: ["Always draw the compass (N up) and mark each move.","Right = clockwise, Left = anti-clockwise.","Opposite legs (e.g. North then South) partly or fully cancel.","L-shaped path → √(a^2 + b^2) for the straight-line gap.","'Distance from start' means net displacement, not total distance walked."] },
        { type: "quiz", question: "A man walks 10 m South, turns left and walks 5 m, then turns left again and walks 10 m. How far is he from the starting point?", options: ["5 m","10 m","15 m","25 m"], correct: 0, explain: "Facing South, a left turn points him East (5 m). Facing East, another left turn points him North (10 m). The 10 m South and 10 m North cancel out, leaving only the 5 m East leg — so he is 5 m from the start." },
    ],
  },
  {
    slug: "error-spotting-explained",
    title: "Error Spotting — Catch the Grammar Slip",
    summary: "Learn to find the one faulty part in SSC-CGL error-spotting sentences using a proofreader's method, a table of common error zones and worked examples.",
    examSlug: "ssc-cgl",
    subjectSlug: "english-language",
    chapterSlug: "error-spotting",
    readingMinutes: 6,
    practiceTestSlug: "error-spotting-practice-1",
    blocks: [
        { type: "analogy", title: "The proofreader's eye", text: "Error spotting is like being the final proofreader before a book goes to print. The sentence is split into pieces and handed to you; somewhere one piece has a grammar slip. You don't rewrite anything — you simply point to the faulty piece, exactly like circling a typo with a red pen." },
        { type: "heading", text: "How the question looks" },
        { type: "para", text: "A sentence is divided into parts labelled (a), (b), (c), with a final option 'No error'. Usually exactly one part contains a grammatical mistake and you must select it. If everything is correct, the answer is 'No error' — a genuine option, so never rule it out." },
        { type: "heading", text: "Common error zones" },
        { type: "table", headers: ["Error type","Wrong → Right"], rows: [["Subject–verb agreement","He don't know → He doesn't know"],["Tense","I have seen him yesterday → I saw him yesterday"],["Preposition","Good in maths → Good at maths"],["Article","A honest man → An honest man"],["Pronoun","Each girl did their work → her work"],["Adjective/Adverb","She sings very good → She sings very well"]] },
        { type: "callout", tone: "tip", text: "Read the WHOLE sentence first, not part by part. Many errors — like a subject in part (a) clashing with a verb in part (b) — only become visible when you connect the pieces together." },
        { type: "steps", title: "A reliable method", items: ["Read the full sentence once for overall sense.","Locate the subject and its main verb — check they agree in number.","Scan prepositions, articles and pronouns against the nouns they belong to.","Confirm the tense matches any time words (yesterday, since, already).","If nothing is wrong after all checks, confidently choose 'No error'."] },
        { type: "example", title: "Spot the error", lines: ["One of the boys (a) / have broken (b) / the window (c) / No error (d)","The real subject is 'One' (singular); 'of the boys' merely describes it.","A singular subject needs a singular verb: 'has broken', not 'have broken'.","The error lies in part (b)."] },
        { type: "example", title: "A preposition slip", lines: ["Rohan is very good (a) / in mathematics (b) / and science (c) / No error (d)","We are always 'good AT' a subject or skill, never 'good in'.","The correct phrase is 'good at mathematics'.","The error lies in part (b)."] },
        { type: "keypoints", title: "Golden rules", items: ["'One of / Each of / Every' → singular verb.","'The number of' → singular; 'A number of' → plural.","Learn fixed prepositions: good at, married to, angry with, differ from.","Use 'an' before vowel SOUNDS (an hour, an MP); 'a' before consonant sounds (a university).","'No error' is a real answer — pick it when every check passes."] },
        { type: "quiz", question: "Find the error: 'The number of students (a) / in the class are (b) / increasing every year (c) / No error (d)'", options: ["The number of students","in the class are","increasing every year","No error"], correct: 1, explain: "'The number of' is treated as singular, so it must take 'is', not 'are'. (Only 'A number of' takes a plural verb.) The error is therefore in part (b)." },
    ],
  },
  {
    slug: "one-word-substitution-explained",
    title: "One Word Substitution: The Smart Shortcut to Vocabulary Marks",
    summary: "Learn One Word Substitution for SSC-CGL the smart way - decode words using roots and prefixes, master the high-frequency list, and dodge tricky look-alike traps.",
    examSlug: "ssc-cgl",
    subjectSlug: "english-language",
    chapterSlug: "one-word-substitution",
    readingMinutes: 6,
    practiceTestSlug: "one-word-substitution-practice-1",
    blocks: [
        { type: "analogy", title: "Like giving a nickname", text: "In your friend group, 'the guy who always cracks jokes' simply becomes 'Comedian'. English does the same thing - instead of saying 'an animal that eats both plants and meat', it hands you one neat word: 'Omnivorous'. One Word Substitution is just this habit of replacing a whole descriptive phrase with a single precise word." },
        { type: "heading", text: "What is One Word Substitution?" },
        { type: "para", text: "One Word Substitution (OWS) asks you to pick the single word that means the same as a given phrase or definition. The phrase describes an idea; your job is to name it. The skill is half vocabulary and half detective work - because even when you have never seen the word, its parts (prefix, root, suffix) usually leak the meaning." },
        { type: "callout", tone: "info", text: "In SSC-CGL, One Word Substitution along with Idioms and Synonyms/Antonyms fetches a big, reliable chunk of the English section. These are 'sure-shot' marks because the answer is fixed, not opinion-based - and a strong word bank also speeds up your Reading Comprehension." },
        { type: "formula", text: "Prefix (who / how many) + Root (the subject) + Suffix (the action / quality) = the whole meaning packed into one word" },
        { type: "table", headers: ["Root / Affix","Meaning","Example word","Meaning of the word"], rows: [["-cide","killing","Homicide","The killing of a human being"],["-phile","lover of","Bibliophile","A lover of books"],["-phobia","fear of","Claustrophobia","Fear of closed / enclosed spaces"],["Omni-","all","Omnipotent","One who is all-powerful"],["Miso-","hater of","Misogynist","One who hates women"],["-cracy","rule / government","Democracy","Government by the people"]] },
        { type: "steps", title: "How to crack a word you have never seen", items: ["Split the word into parts - prefix, root and suffix.","Decode each part: who or what does the prefix point to, and what is the root about?","Combine the clues into a rough meaning in your own words.","Match your rough meaning to the closest option, then eliminate the look-alike traps."] },
        { type: "table", headers: ["One word","Substitution (the phrase it replaces)"], rows: [["Autobiography","The life story of a person written by that person"],["Omniscient","One who knows everything"],["Herbivorous","An animal that feeds only on plants"],["Insomnia","Inability to sleep"],["Posthumous","A child born after the father's death, or a work published after the author's death"],["Philanthropist","One who loves mankind and works for its welfare"],["Aquatic","Plants or animals that live in water"],["Contemporary","One belonging to or living at the same time"]] },
        { type: "example", title: "Decoding an unseen word", lines: ["Unknown word: Misogamist","Break it up: 'miso-' = hater + '-gam-' = marriage","Combine the clues: a hater of marriage","Compare: Misogynist = a hater of women ('gyn' = woman)","Compare: Bigamist = one who marries again while already married ('bi' = two)"] },
        { type: "callout", tone: "warn", text: "Watch the look-alikes. Misogynist (hates women) vs Misogamist (hates marriage) vs Misanthrope (hates all humankind). One tiny syllable flips the whole answer - read every option fully before locking one in." },
        { type: "keypoints", title: "Quick revision", items: ["OWS = replace a full phrase with one exact word.","Learn roots and prefixes: -cide (kill), -phile (lover), -phobia (fear), omni- (all), -cracy (rule), miso- (hater).","When stuck, split the word and rebuild the meaning from its parts.","Revise a fixed daily list - repetition is what makes these marks automatic.","Beware confusing pairs that differ by a single syllable."] },
        { type: "quiz", question: "'A person who does not believe in the existence of God' is called:", options: ["Atheist","Theist","Agnostic","Heretic"], correct: 0, explain: "An atheist denies or does not believe that God exists. A theist believes in God; an agnostic holds that God's existence is unknown or unknowable; a heretic holds beliefs that go against accepted religious doctrine." },
    ],
  },
  {
    slug: "indian-history-explained",
    title: "Indian History Made Simple: From the Indus Valley to 1947",
    summary: "A clear, exam-focused walk through Indian History for SSC-CGL - from the Indus Valley to Independence - with a timeline, decisive battles, and the freedom struggle in order.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-awareness",
    chapterSlug: "indian-history",
    readingMinutes: 8,
    practiceTestSlug: "indian-history-practice-1",
    blocks: [
        { type: "analogy", title: "Like a web series with three seasons", text: "Think of Indian history as a gripping web series with three big seasons - Ancient, Medieval and Modern. Each season has its own heroes, empires and plot twists, and characters from an earlier season set up what happens later. Once you know the seasons in order, remembering who came when stops feeling random and starts feeling like a story." },
        { type: "heading", text: "Three Acts: Ancient, Medieval, Modern" },
        { type: "table", headers: ["Period","Approx. time","Remember it for"], rows: [["Indus Valley Civilization","around 2500 BCE","Planned cities, brick drains, the Great Bath"],["Vedic Age","c. 1500-600 BCE","The Vedas, Sanskrit, early social order"],["Mauryan Empire","322-185 BCE","Chandragupta, Ashoka, the Kalinga War"],["Gupta Empire","c. 320-550 CE","The 'Golden Age' of science and art"],["Delhi Sultanate","1206-1526 CE","Five dynasties, the Qutub Minar"],["Mughal Empire","1526-1857 CE","Akbar, the Taj Mahal, then slow decline"],["British Rule","1757-1947 CE","Company then Crown; the freedom struggle"]] },
        { type: "keypoints", title: "Ancient India - the highlights", items: ["Indus Valley Civilization: a Bronze Age culture with well-planned cities like Harappa and Mohenjo-daro; famous for its drainage system and the Great Bath; its script is still undeciphered.","Mauryan Empire: founded by Chandragupta Maurya (322 BCE) with the guidance of Chanakya (Kautilya), author of the Arthashastra.","Ashoka fought the Kalinga War (c. 261 BCE); shaken by the bloodshed, he embraced Buddhism and spread its message through rock and pillar edicts.","Gupta Empire: the 'Golden Age' - Aryabhata advanced mathematics and astronomy, and Kalidasa enriched Sanskrit literature."] },
        { type: "keypoints", title: "Medieval India - the highlights", items: ["Delhi Sultanate (1206-1526): begun by Qutb-ud-din Aibak of the Slave (Mamluk) dynasty, who started building the Qutub Minar.","Its five dynasties in order: Slave, Khilji, Tughlaq, Sayyid and Lodi.","Mughal Empire: founded by Babur in 1526; Akbar (1556-1605) is remembered for religious tolerance and strong administration.","Shah Jahan built the Taj Mahal; under Aurangzeb the empire reached its largest extent and then began to decline."] },
        { type: "table", headers: ["Year","Battle","Winner","Why it mattered"], rows: [["1526","First Battle of Panipat","Babur beat Ibrahim Lodi","Founded the Mughal Empire in India"],["1556","Second Battle of Panipat","Akbar's forces beat Hemu","Secured Mughal rule"],["1757","Battle of Plassey","British (Clive) beat Siraj-ud-Daulah","British gained a foothold in Bengal"],["1764","Battle of Buxar","British beat Mir Qasim and allies","British became the real power in Bengal"]] },
        { type: "heading", text: "Modern India and the Freedom Struggle" },
        { type: "keypoints", items: ["Revolt of 1857 (also called the First War of Independence) began at Meerut; afterwards, power passed from the East India Company to the British Crown in 1858.","The Indian National Congress was founded in 1885 (A.O. Hume played a key role).","Mahatma Gandhi led three landmark movements: Non-Cooperation (1920), Civil Disobedience with the Dandi Salt March (1930), and Quit India (1942).","India became independent on 15 August 1947."] },
        { type: "callout", tone: "tip", text: "Memory aid for the Delhi Sultanate dynasties in order - Slave, Khilji, Tughlaq, Sayyid, Lodi. Try the sentence 'Some Kings Try Setting Laws' to lock the sequence." },
        { type: "example", title: "How SSC tests chronology", lines: ["Q: Arrange in correct order - Gupta Empire, Mauryan Empire, Mughal Empire, Delhi Sultanate.","Step 1 (Ancient first): Mauryan (322 BCE), then Gupta (from c. 320 CE).","Step 2 (Medieval next): Delhi Sultanate (from 1206), then Mughal (from 1526).","Answer: Mauryan -> Gupta -> Delhi Sultanate -> Mughal."] },
        { type: "keypoints", title: "Quick revision", items: ["Order the three acts: Ancient -> Medieval -> Modern.","IVC = planned cities and drainage; Mauryas = Ashoka and Kalinga; Guptas = Golden Age.","Delhi Sultanate had five dynasties; Mughals ran 1526 to a slow end by 1857.","1757 Plassey and 1764 Buxar handed Bengal to the British.","Freedom milestones: 1857 revolt, 1885 Congress, 1920/1930/1942 movements, 1947 Independence."] },
        { type: "quiz", question: "The Kalinga War, after which the emperor gave up warfare and embraced Buddhism, was fought by:", options: ["Chandragupta Maurya","Ashoka","Samudragupta","Harshavardhana"], correct: 1, explain: "Ashoka fought the Kalinga War around 261 BCE. The huge loss of life filled him with remorse, and he adopted Buddhism, later spreading its message of peace through his rock and pillar edicts." },
    ],
  },
  {
    slug: "indian-geography-explained",
    title: "Indian Geography Decoded: Location, Landforms, Rivers and Monsoon",
    summary: "Master Indian Geography for SSC-CGL - India's location, physical divisions, rivers, monsoon and soils - explained simply with maps-in-words and quick-revision tables.",
    examSlug: "ssc-cgl",
    subjectSlug: "general-awareness",
    chapterSlug: "indian-geography",
    readingMinutes: 7,
    practiceTestSlug: "indian-geography-practice-1",
    blocks: [
        { type: "analogy", title: "India is like a well-planned house", text: "Picture India as a big house. The Himalayas are the tall protective roof in the north, the fertile Northern Plains are the busy living room where most people gather, the old Deccan Plateau is the solid stone floor in the south, and the oceans are the boundary walls on three sides. Once you can mentally 'walk through the house', the map stops being a blur of names." },
        { type: "keypoints", title: "India at a glance", items: ["Area is about 3.28 million sq km - the 7th-largest country in the world and the most populous.","Latitudinal extent: 8 degrees 4' N to 37 degrees 6' N; longitudinal extent: 68 degrees 7' E to 97 degrees 25' E.","The Tropic of Cancer (about 23.5 degrees N) cuts India almost in half and passes through 8 states.","Land neighbours: Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar and Bangladesh; maritime neighbours include Sri Lanka and Maldives."] },
        { type: "table", headers: ["Reference line","Value","Why it matters"], rows: [["Tropic of Cancer","about 23 degrees 30' N","Passes through 8 Indian states"],["Standard Meridian","82 degrees 30' E","Fixes Indian Standard Time (IST)"],["Latitudinal extent","8 degrees 4' N to 37 degrees 6' N","The north-south spread of the mainland"]] },
        { type: "formula", text: "Indian Standard Time = UTC + 5 hours 30 minutes, based on the 82 degrees 30' E meridian (82.5 x 4 minutes = 330 minutes = 5 h 30 m)" },
        { type: "heading", text: "The Physical Divisions" },
        { type: "table", headers: ["Division","Key features"], rows: [["The Himalayas","Young fold mountains in the north, in three ranges - Himadri (Greater), Himachal (Lesser) and the Shiwaliks (Outer)"],["Northern Plains","Fertile plains built by the Indus, Ganga and Brahmaputra; India's food bowl"],["Peninsular Plateau","The old, stable Deccan Plateau; rich in minerals; edged by the Western and Eastern Ghats"],["Indian Desert","The Thar in the west (Rajasthan); hot, sandy and dry"],["Coastal Plains","Western coast (Konkan, Malabar) and Eastern coast (Coromandel)"],["Islands","Andaman & Nicobar in the Bay of Bengal; Lakshadweep in the Arabian Sea"]] },
        { type: "keypoints", title: "Rivers - the two families", items: ["Himalayan rivers (Indus, Ganga, Brahmaputra) are perennial - fed by both rain and melting snow - and build the great plains.","The Ganga is the longest river flowing within India (about 2,525 km).","Peninsular rivers (Godavari, Krishna, Kaveri, Mahanadi) are mostly rain-fed and seasonal; the Godavari is the largest, nicknamed 'Dakshin Ganga'.","Most peninsular rivers flow east into the Bay of Bengal; the Narmada and Tapi are exceptions - they flow west into the Arabian Sea through rift valleys."] },
        { type: "callout", tone: "info", text: "India has a monsoon climate. The South-West monsoon (June to September) brings most of the year's rainfall. The retreating or North-East monsoon (October to December) then rains mainly over the south-east coast, especially Tamil Nadu." },
        { type: "table", headers: ["Soil type","Where it is found / best for"], rows: [["Alluvial soil","Northern plains and river deltas; the most widespread and fertile; wheat and rice"],["Black (Regur) soil","The Deccan lava region; ideal for cotton"],["Red soil","Eastern and southern Deccan; needs fertilizers"],["Laterite soil","High-rainfall hilly areas; good for tea, coffee and cashew"]] },
        { type: "keypoints", title: "Quick revision", items: ["India: 7th-largest country; Tropic of Cancer passes through 8 states.","Standard Meridian 82 degrees 30' E sets IST at UTC + 5:30.","Six physical divisions - remember roof, living room, floor, desert, coasts and islands.","Rivers: Himalayan = perennial; Peninsular = seasonal; Narmada and Tapi flow west.","South-West monsoon (June-September) delivers most of India's rain."] },
        { type: "quiz", question: "The Standard Meridian of India (82 degrees 30' E), which decides Indian Standard Time, passes through which town?", options: ["Mirzapur","Mumbai","Kanyakumari","Kolkata"], correct: 0, explain: "The 82 degrees 30' E Standard Meridian passes through Mirzapur in Uttar Pradesh. Because it lies 82.5 degrees east of the Prime Meridian, IST is set 5 hours 30 minutes ahead of UTC (82.5 x 4 minutes = 330 minutes)." },
    ],
  },
  {
    slug: "triangles-explained",
    title: "Triangles: The Magic of Similarity",
    summary: "Master similar triangles, the Basic Proportionality Theorem, and the criteria (AA, SSS, SAS) that power Class 10 geometry proofs and problems.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "triangles",
    readingMinutes: 7,
    practiceTestSlug: "triangles-practice-1",
    blocks: [
        { type: "analogy", title: "The photocopy machine", text: "Imagine you put a triangular sticker on a photocopier and press 'enlarge to 150%'. The copy is bigger, but it is the exact same shape - every angle is unchanged and every side has grown by the same factor. That is the whole idea of similar triangles: same shape, different size. Two triangles are similar when one is just a scaled-up or scaled-down photocopy of the other." },
        { type: "para", text: "In this chapter we move from 'congruent' triangles (same shape AND same size) to 'similar' triangles (same shape, possibly different size). Similarity unlocks a huge range of real problems - finding the height of a tree from its shadow, the width of a river you cannot cross, or a distance on a map." },
        { type: "heading", text: "When are two triangles similar?" },
        { type: "para", text: "Two triangles are similar if their corresponding angles are equal AND their corresponding sides are in the same ratio (proportion). If triangle ABC is similar to triangle PQR, we write it as triangle ABC ~ triangle PQR, and the order of letters tells you which vertices match." },
        { type: "formula", text: "If ABC ~ PQR then: angle A = angle P, angle B = angle Q, angle C = angle R, and AB/PQ = BC/QR = CA/RP." },
        { type: "callout", tone: "tip", text: "Always write similar triangles in matching order. In ABC ~ PQR, A pairs with P, B with Q, C with R. Writing the order correctly makes the side ratios line up automatically and saves you from silly mistakes." },
        { type: "heading", text: "The Basic Proportionality Theorem (Thales' Theorem)" },
        { type: "para", text: "This is the star result of the chapter. If a line is drawn parallel to one side of a triangle and it cuts the other two sides, then it divides those two sides in the same ratio." },
        { type: "formula", text: "In triangle ABC, if DE is parallel to BC (D on AB, E on AC), then AD/DB = AE/EC." },
        { type: "table", headers: ["Criterion","What you need to prove similarity"], rows: [["AA (or AAA)","Two angles of one triangle equal two angles of the other"],["SSS","All three pairs of corresponding sides in the same ratio"],["SAS","One pair of angles equal AND the two sides around that angle in the same ratio"]] },
        { type: "example", title: "Finding a length using BPT", lines: ["In triangle ABC, DE is parallel to BC. D lies on AB with AD = 3 cm and DB = 5 cm. E lies on AC with AE = 4.5 cm. Find EC.","By the Basic Proportionality Theorem: AD/DB = AE/EC.","Substitute the values: 3/5 = 4.5/EC.","Cross-multiply: 3 x EC = 5 x 4.5 = 22.5.","So EC = 22.5 / 3 = 7.5 cm."] },
        { type: "callout", tone: "warn", text: "Note for the 2020+ syllabus: the Pythagoras theorem and the area-ratio theorem are no longer part of the Class 10 'Triangles' proof list in NCERT. Focus your exam prep on similarity criteria and the Basic Proportionality Theorem." },
        { type: "keypoints", title: "Quick revision", items: ["Similar = same shape, sides in equal ratio, angles equal. Congruent = similar AND same size.","Write similarity in matching vertex order, e.g. ABC ~ PQR.","Basic Proportionality Theorem: a line parallel to one side divides the other two sides proportionally.","Three similarity criteria: AA, SSS, SAS.","The ratio of corresponding sides of similar triangles is called the scale factor."] },
        { type: "quiz", question: "In triangle ABC, DE is parallel to BC. If AD = 2 cm, DB = 3 cm and AE = 4 cm, what is EC?", options: ["6 cm","5 cm","2.7 cm","8 cm"], correct: 0, explain: "By the Basic Proportionality Theorem, AD/DB = AE/EC, so 2/3 = 4/EC. Cross-multiplying gives 2 x EC = 12, hence EC = 6 cm." },
    ],
  },
  {
    slug: "coordinate-geometry-explained",
    title: "Coordinate Geometry: Where Algebra Meets the Map",
    summary: "Learn the distance formula, section formula, and midpoint formula to solve Class 10 Coordinate Geometry problems on the x-y plane with confidence.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "coordinate-geometry",
    readingMinutes: 7,
    practiceTestSlug: "coordinate-geometry-practice-1",
    blocks: [
        { type: "analogy", title: "A city with street numbers", text: "Think of a planned city like Chandigarh, where every location is given by a sector number across and a number up. Tell an autorickshaw driver '3 blocks east, 4 blocks north' and they find you exactly. Coordinate geometry does the same thing for points on a graph: every point gets an address (x, y), and once points have addresses, we can measure distances and find meeting spots using simple formulas." },
        { type: "para", text: "The plane is split by two number lines: the horizontal x-axis and the vertical y-axis, meeting at the origin (0, 0). A point's position is written as (x, y), where x is how far right or left it sits and y is how far up or down. With this system, geometry problems turn into algebra you can compute." },
        { type: "heading", text: "The three formulas you must know" },
        { type: "formula", text: "Distance between P(x1, y1) and Q(x2, y2): PQ = square root of [(x2 - x1)^2 + (y2 - y1)^2]." },
        { type: "formula", text: "Section formula - point dividing the join of (x1, y1) and (x2, y2) in ratio m:n is ( (m x2 + n x1)/(m + n), (m y2 + n y1)/(m + n) )." },
        { type: "formula", text: "Midpoint of (x1, y1) and (x2, y2): ( (x1 + x2)/2, (y1 + y2)/2 ). This is the section formula with ratio 1:1." },
        { type: "callout", tone: "tip", text: "The distance from the origin (0, 0) to any point (x, y) is simply the square root of (x^2 + y^2). It is just the distance formula with one point set to the origin - a handy shortcut in exams." },
        { type: "example", title: "Distance between two points", lines: ["Find the distance between A(2, 3) and B(5, 7).","Distance formula: AB = square root of [(x2 - x1)^2 + (y2 - y1)^2].","Substitute: AB = square root of [(5 - 2)^2 + (7 - 3)^2].","= square root of [3^2 + 4^2] = square root of [9 + 16] = square root of 25.","So AB = 5 units."] },
        { type: "example", title: "Using the section formula", lines: ["Find the point that divides the line joining A(-1, 2) and B(4, 7) in the ratio 2:3.","Here (x1, y1) = (-1, 2), (x2, y2) = (4, 7), m = 2, n = 3.","x-coordinate = (m x2 + n x1)/(m + n) = (2 x 4 + 3 x (-1))/(2 + 3) = (8 - 3)/5 = 5/5 = 1.","y-coordinate = (m y2 + n y1)/(m + n) = (2 x 7 + 3 x 2)/(2 + 3) = (14 + 6)/5 = 20/5 = 4.","So the required point is (1, 4)."] },
        { type: "callout", tone: "warn", text: "Order matters in the section formula. The ratio m:n means the point is m parts from the first point and n parts from the second. Mixing up which point is (x1, y1) and which is (x2, y2) is the most common exam error - label them before you substitute." },
        { type: "table", headers: ["Task","Formula to use"], rows: [["Length of a segment","Distance formula"],["Point dividing a segment in ratio m:n","Section formula"],["Exact middle of a segment","Midpoint formula"],["Check if 3 points are collinear","Distance formula (sum of two = third) or section formula"]] },
        { type: "keypoints", title: "Quick revision", items: ["Every point has an address (x, y): x is horizontal, y is vertical.","Distance formula comes straight from the Pythagoras theorem on the plane.","Midpoint is the section formula with ratio 1:1.","Distance from origin to (x, y) is square root of (x^2 + y^2).","Note: the area-of-triangle formula was moved out of the current NCERT Class 10 chapter, so focus on distance, section, and midpoint."] },
        { type: "quiz", question: "What is the midpoint of the line segment joining the points A(-2, 4) and B(6, -2)?", options: ["(2, 1)","(4, 2)","(2, 3)","(-4, 6)"], correct: 0, explain: "Midpoint = ((x1 + x2)/2, (y1 + y2)/2) = ((-2 + 6)/2, (4 + (-2))/2) = (4/2, 2/2) = (2, 1)." },
    ],
  },
  {
    slug: "statistics-explained",
    title: "Statistics: Making Sense of Grouped Data",
    summary: "Understand mean, median, and mode for grouped data with clear formulas and worked examples tailored to the Class 10 Statistics syllabus.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "statistics",
    readingMinutes: 7,
    practiceTestSlug: "statistics-practice-1",
    blocks: [
        { type: "analogy", title: "The cricket scorecard", text: "When a commentator says a batsman 'averages 52', they have squeezed an entire career of scores into one number that captures typical performance. Statistics is exactly this skill: taking a big, messy pile of numbers - marks, heights, incomes - and summarising them with a single representative value so we can compare and decide. Mean, median, and mode are three different ways to find that 'typical' value." },
        { type: "para", text: "In Class 10, data is usually 'grouped' - arranged in class intervals like 10-20, 20-30, and so on, each with a frequency (how many items fall in it). We learn to find the three measures of central tendency for such grouped data." },
        { type: "heading", text: "The three measures of central tendency" },
        { type: "table", headers: ["Measure","What it tells you"], rows: [["Mean","The arithmetic average - total shared equally"],["Median","The middle value when data is arranged in order"],["Mode","The value (or class) that occurs most often"]] },
        { type: "formula", text: "Mean (direct method): Mean = (sum of fi xi) / (sum of fi), where xi is the class mark (midpoint) and fi is the frequency of each class." },
        { type: "formula", text: "Median = L + [ ((n/2) - cf) / f ] x h, where L = lower limit of median class, n = total frequency, cf = cumulative frequency before the median class, f = frequency of median class, h = class size." },
        { type: "formula", text: "Mode = L + [ (f1 - f0) / (2 f1 - f0 - f2) ] x h, where L = lower limit of modal class, f1 = frequency of modal class, f0 = frequency of the class before it, f2 = frequency of the class after it, h = class size." },
        { type: "callout", tone: "info", text: "There is a neat empirical relationship linking all three: Mode = 3 Median - 2 Mean. If a question gives you any two of them, you can estimate the third with this formula." },
        { type: "example", title: "Finding the mean of grouped data", lines: ["Marks 0-10 have 4 students, 10-20 have 6, 20-30 have 10.","Class marks (midpoints) xi are 5, 15, 25 respectively.","fi xi products: 4 x 5 = 20, 6 x 15 = 90, 10 x 25 = 250.","Sum of fi xi = 20 + 90 + 250 = 360.","Sum of fi = 4 + 6 + 10 = 20.","Mean = 360 / 20 = 18 marks."] },
        { type: "steps", title: "How to find the median class", items: ["Make a cumulative frequency (cf) column, adding frequencies down the list.","Compute n/2, where n is the total frequency.","The median class is the first class whose cumulative frequency is greater than or equal to n/2.","Read off L, cf (of the class before), f and h, then apply the median formula."] },
        { type: "callout", tone: "warn", text: "For the median you use n/2 (not (n+1)/2) because grouped data is treated as continuous. Also make sure your classes are continuous - if they are like 0-9, 10-19, first convert them to boundaries like -0.5 to 9.5, 9.5 to 19.5 (subtract 0.5 from each lower limit and add 0.5 to each upper limit) before using the formulas." },
        { type: "keypoints", title: "Quick revision", items: ["Class mark = (lower limit + upper limit) / 2.","Mean uses class marks weighted by frequency (direct, assumed-mean, or step-deviation methods).","Median needs a cumulative frequency table and the n/2 position.","Mode uses the modal class - the one with the highest frequency.","Empirical relation: Mode = 3 Median - 2 Mean."] },
        { type: "quiz", question: "If the mean of a distribution is 24 and the median is 26, what is the mode using the empirical relationship?", options: ["30","22","25","28"], correct: 0, explain: "Using Mode = 3 Median - 2 Mean = 3(26) - 2(24) = 78 - 48 = 30. So the mode is 30." },
    ],
  },
  {
    slug: "linear-equations-explained",
    title: "Pair of Linear Equations: Two Clues, One Answer",
    summary: "Learn how a pair of linear equations in two variables works, the three types of solutions, and how to solve them by elimination with a step-by-step worked example.",
    examSlug: "class-10",
    subjectSlug: "mathematics",
    chapterSlug: "linear-equations",
    readingMinutes: 6,
    practiceTestSlug: "linear-equations-practice-1",
    blocks: [
        { type: "analogy", title: "Two clues, one answer", text: "Imagine a detective with two clues about a suspect: 'the two numbers add up to 10' and 'their difference is 4'. Neither clue alone pins down the numbers, but together they lock in exactly one pair (7 and 3). A pair of linear equations works the same way - two conditions that must both be true at the same time, meeting at a single answer." },
        { type: "heading", text: "What a pair of linear equations means" },
        { type: "para", text: "A linear equation in two variables looks like 2x + 3y = 13. On its own it has infinitely many solutions. The general form is a1x + b1y + c1 = 0, where a and b are not both zero. A 'pair' means two such equations taken together, and solving them means finding the one value of x and one value of y that satisfy BOTH equations at once. Graphically, each equation is a straight line, and the solution is the point where the two lines cross." },
        { type: "heading", text: "Three types of solutions" },
        { type: "para", text: "When you draw the two lines, only three things can happen: they cross at one point, they lie exactly on top of each other, or they stay parallel and never meet. You can predict which case you have just by comparing the ratios of the coefficients - no graph needed." },
        { type: "table", headers: ["Compare the ratios","The lines are","Number of solutions","Consistency"], rows: [["a1/a2 is not equal to b1/b2","Intersecting","Exactly one (unique)","Consistent"],["a1/a2 = b1/b2, not equal to c1/c2","Parallel","No solution","Inconsistent"],["a1/a2 = b1/b2 = c1/c2","Coincident (same line)","Infinitely many","Consistent (dependent)"]] },
        { type: "heading", text: "Solving by elimination" },
        { type: "steps", title: "Elimination method", items: ["Multiply one or both equations so the coefficient of one variable becomes equal in size (matching or opposite signs).","Add or subtract the equations to eliminate that variable.","Solve the resulting single-variable equation.","Substitute that value back into any original equation to find the other variable.","Verify by putting both values into both equations."] },
        { type: "example", title: "Solve 3x + 2y = 12 and 5x - 2y = 4", lines: ["Step 1: The y-terms are +2y and -2y - already opposite, so add the two equations.","Step 2: (3x + 5x) + (2y - 2y) = 12 + 4, which gives 8x = 16.","Step 3: x = 16 / 8 = 2.","Step 4: Put x = 2 into 3x + 2y = 12: 6 + 2y = 12, so 2y = 6 and y = 3.","Step 5: Check in 5x - 2y = 4: 10 - 6 = 4. Correct. Solution: x = 2, y = 3."] },
        { type: "callout", tone: "tip", text: "Always substitute your final x and y back into the OTHER equation to confirm both are satisfied. This single habit catches almost every arithmetic slip in the exam." },
        { type: "keypoints", title: "Quick revision", items: ["A pair of linear equations = two straight lines; the solution is their meeting point.","Unique solution when a1/a2 is not equal to b1/b2 (lines intersect).","No solution when a1/a2 = b1/b2 but not equal to c1/c2 (parallel lines).","Infinitely many solutions when a1/a2 = b1/b2 = c1/c2 (same line).","Main algebraic methods: substitution, elimination, and cross-multiplication."] },
        { type: "quiz", question: "For what value of k do the equations 2x + 3y = 5 and 4x + 6y = k have infinitely many solutions?", options: ["5","10","15","20"], correct: 1, explain: "Infinitely many solutions need a1/a2 = b1/b2 = c1/c2. Here 2/4 = 3/6 = 1/2, so we need 5/k = 1/2, giving k = 10. At k = 10 the second equation is just double the first - the same line." },
    ],
  },
  {
    slug: "chemical-reactions-explained",
    title: "Chemical Reactions and Equations: When Matter Rearranges",
    summary: "Understand what a chemical reaction is, how to balance equations using the law of conservation of mass, and the five main reaction types with everyday examples.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "chemical-reactions",
    readingMinutes: 7,
    practiceTestSlug: "chemical-reactions-practice-1",
    blocks: [
        { type: "analogy", title: "Cooking is chemistry", text: "When your mother makes chapatis, flour and water (reactants) turn into soft dough and then cooked rotis (products). Nothing vanishes - the ingredients simply rearrange into something new. A chemical reaction is exactly this: existing substances rearrange their atoms to form new substances, with the total amount of matter always staying the same." },
        { type: "heading", text: "What counts as a chemical reaction?" },
        { type: "para", text: "A chemical reaction produces one or more NEW substances with new properties. You can usually spot one by watching for tell-tale signs: a change in colour (a shiny iron gate turning reddish-brown), evolution of a gas (bubbles when antacid meets acid in your stomach), formation of a precipitate (a solid appearing in a clear liquid), a change in temperature (slaked lime warming up), or a change in state or smell." },
        { type: "heading", text: "Balancing chemical equations" },
        { type: "para", text: "We write a reaction as an equation: reactants on the left, an arrow, products on the right. Because of the law of conservation of mass, atoms are never created or destroyed - so the number of atoms of each element must be equal on both sides. An equation with equal atoms on both sides is called a balanced equation. We balance it by adjusting the coefficients (the big numbers in front), never by changing the small formula subscripts." },
        { type: "example", title: "Balance: Fe + H2O gives Fe3O4 + H2", lines: ["Skeletal equation: Fe + H2O -> Fe3O4 + H2 (atoms not yet balanced).","Balance Fe: there are 3 Fe atoms on the right, so write 3Fe on the left.","Balance O: the right has 4 oxygen atoms (in Fe3O4), so write 4H2O on the left.","Now balance H: the left now has 4 x 2 = 8 hydrogen atoms, so write 4H2 on the right.","Balanced equation: 3Fe + 4H2O -> Fe3O4 + 4H2. Check: Fe 3 = 3, O 4 = 4, H 8 = 8."] },
        { type: "heading", text: "The five main types of reactions" },
        { type: "table", headers: ["Type","What happens","Example"], rows: [["Combination","Two or more reactants join to form a single product","CaO + H2O -> Ca(OH)2"],["Decomposition","A single reactant splits into two or more products","2FeSO4 -> Fe2O3 + SO2 + SO3"],["Displacement","A more reactive element displaces a less reactive one","Fe + CuSO4 -> FeSO4 + Cu"],["Double displacement","Two compounds exchange ions, often forming a precipitate","Na2SO4 + BaCl2 -> BaSO4 + 2NaCl"],["Oxidation-Reduction (redox)","One substance gains oxygen while another loses it","CuO + H2 -> Cu + H2O"]] },
        { type: "para", text: "In a redox reaction, gaining oxygen (or losing hydrogen) is called oxidation, while losing oxygen (or gaining hydrogen) is called reduction - and the two always happen together. In CuO + H2 -> Cu + H2O, copper oxide loses oxygen (it is reduced to copper) while hydrogen gains oxygen (it is oxidised to water). Reactions that release heat are exothermic (like burning natural gas), and those that absorb heat are endothermic." },
        { type: "callout", tone: "info", text: "Oxidation is not just a textbook idea. When an iron gate slowly turns reddish-brown, that is corrosion (rusting). When fried snacks or oils smell and taste 'off' after a few days, that is rancidity - the fats have been oxidised. That is why chip packets are flushed with nitrogen gas to keep them fresh." },
        { type: "keypoints", title: "Quick revision", items: ["A chemical reaction forms new substances; signs include colour change, gas, precipitate, and temperature change.","Balance equations by conserving atoms (law of conservation of mass) using coefficients, not subscripts.","Five key types: combination, decomposition, displacement, double displacement, and redox.","Oxidation = gain of oxygen / loss of hydrogen; reduction = loss of oxygen / gain of hydrogen.","Corrosion (rusting) and rancidity are everyday oxidation reactions."] },
        { type: "quiz", question: "In sunlight, silver chloride breaks down as 2AgCl -> 2Ag + Cl2. Which type of reaction is this?", options: ["Combination","Decomposition","Displacement","Double displacement"], correct: 1, explain: "A single compound (AgCl) splits into simpler substances (Ag and Cl2), so it is a decomposition reaction. Because sunlight supplies the energy, it is specifically a photolytic decomposition - the reaction behind old black-and-white photography." },
    ],
  },
  {
    slug: "heredity-and-evolution-explained",
    title: "Heredity and Evolution: Passing Down the Recipe of Life",
    summary: "Explore how traits pass from parents to offspring through genes, Mendel's dominant and recessive rules with a monohybrid cross, human sex determination, and the basics of evolution.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "heredity-and-evolution",
    readingMinutes: 7,
    practiceTestSlug: "heredity-evolution-practice-1",
    blocks: [
        { type: "analogy", title: "Why you have your grandmother's eyes", text: "Ever noticed how a dimple, a certain nose shape, or curly hair shows up again and again across a family - sometimes even skipping a generation? It is as if parents hand down a recipe book to their children. Heredity is that recipe book, and genes are the individual recipes that decide many of your features." },
        { type: "heading", text: "What is heredity?" },
        { type: "para", text: "Heredity is the passing of characters, or traits, from parents to their offspring. The instructions travel inside genes, which sit on chromosomes in every cell. Because a child receives one set of genes from each parent, they resemble both - yet are never identical to either. Small differences, called variations, make each individual unique and provide the raw material for evolution." },
        { type: "heading", text: "Mendel's rules of inheritance" },
        { type: "para", text: "Gregor Mendel, working with pea plants, discovered how traits pass on. Each trait is controlled by a pair of alleles (versions of a gene). Some alleles are dominant - written with a capital letter, e.g. T for tall - and mask the recessive ones, written with a small letter, e.g. t for short. A dominant trait appears even if only one dominant allele is present, while a recessive trait shows only when both alleles are recessive (tt)." },
        { type: "example", title: "Monohybrid cross: tall x short pea plants", lines: ["Parents: a pure tall plant (TT) is crossed with a pure short plant (tt).","F1 generation: every plant gets one T and one t, so all are Tt - and all look TALL, because T is dominant.","Now cross two F1 plants (Tt x Tt). The Punnett square gives TT, Tt, Tt, and tt.","Phenotype (appearance): 3 tall : 1 short - the famous 3:1 ratio.","Genotype (gene make-up): 1 TT : 2 Tt : 1 tt, that is a 1:2:1 ratio."] },
        { type: "table", headers: ["Term","Meaning"], rows: [["Gene","Unit of heredity that controls a trait"],["Allele","One of the alternative forms of a gene (e.g. T or t)"],["Dominant","Allele that shows its effect even when single (T)"],["Recessive","Allele that shows only when present as a pair (tt)"],["Genotype","The actual gene combination (TT, Tt, or tt)"],["Phenotype","The visible trait (tall or short)"]] },
        { type: "heading", text: "Sex determination and a glimpse of evolution" },
        { type: "para", text: "In humans, sex is decided by the sex chromosomes. Females have two X chromosomes (XX); males have one X and one Y (XY). The mother always contributes an X. The father's sperm decides the child's sex: an X-carrying sperm gives a girl (XX), while a Y-carrying sperm gives a boy (XY). So, scientifically, it is the father - not the mother - who determines the baby's sex." },
        { type: "para", text: "Over many generations, useful variations that help organisms survive and reproduce become more common. This is natural selection, the engine of evolution first explained by Charles Darwin. Evidence includes homologous organs (same basic structure, different functions - like the forelimbs of a human, a cat, and a bird), analogous organs (different structure, same function - like the wings of a bird and an insect), and fossils, which reveal life forms of the past. Importantly, only variations in the germ cells (inherited traits) pass on; traits you acquire in your lifetime, such as a muscular body from exercise, are not inherited." },
        { type: "keypoints", title: "Quick revision", items: ["Heredity passes traits from parents to offspring through genes located on chromosomes.","Dominant alleles mask recessive ones; a recessive trait needs a pair (tt) to appear.","Mendel's monohybrid cross gives a 3:1 phenotypic and a 1:2:1 genotypic ratio in F2.","In humans XX = female and XY = male; the father determines the child's sex.","Evolution works through variation and natural selection; homologous and analogous organs and fossils are key evidence."] },
        { type: "quiz", question: "In a monohybrid cross between pure tall (TT) and pure short (tt) pea plants, what is the phenotypic ratio of the F2 generation?", options: ["1:1","3:1","1:2:1","9:3:3:1"], correct: 1, explain: "Crossing the F1 plants (Tt x Tt) gives TT, Tt, Tt, and tt - that is three tall plants to one short plant, a 3:1 phenotypic ratio. (1:2:1 is the genotypic ratio, and 9:3:3:1 belongs to a dihybrid cross.)" },
    ],
  },
  {
    slug: "human-eye-and-colourful-world-explained",
    title: "Human Eye and the Colourful World: How We See and Why the Sky is Blue",
    summary: "A concept-first Class 10 guide to the human eye, power of accommodation, vision defects and their lens corrections, plus dispersion and scattering that explain rainbows, blue skies and red sunsets.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "human-eye-and-colourful-world",
    readingMinutes: 7,
    practiceTestSlug: "human-eye-practice-1",
    blocks: [
        { type: "analogy", title: "Your eye is a self-adjusting camera", text: "Think of a camera: light passes through a lens, an aperture controls how much gets in, and the image lands on a sensor. Your eye works the same way, but with one superpower a camera does not have. Instead of moving the lens forward and back to focus, your eye changes the very shape of its lens automatically, thousands of times a day, so that both your phone screen and a far-off mountain stay sharp. Understanding this one trick unlocks the whole chapter." },
        { type: "heading", text: "How your eye forms an image" },
        { type: "para", text: "Light from an object enters through the cornea (the transparent front bulge, where most bending happens), passes through the pupil, and is finally focused by the eye lens onto the retina at the back. The iris is the coloured ring that widens or narrows the pupil to control how much light enters. The retina has light-sensitive cells that convert the image into electrical signals, which the optic nerve carries to the brain. The image formed on the retina is real and inverted, and the brain flips it upright for us." },
        { type: "keypoints", title: "Parts of the eye and their jobs", items: ["Cornea: transparent front layer; does most of the bending of incoming light.","Iris and pupil: iris controls the pupil size, adjusting the amount of light entering.","Eye lens (with ciliary muscles): fine-tunes focus by changing its own curvature.","Retina: light-sensitive screen where a real, inverted image forms.","Optic nerve: carries the signal from the retina to the brain."] },
        { type: "para", text: "Power of accommodation is the eye's ability to adjust its focal length. When ciliary muscles relax, the lens becomes thin (long focal length) to see distant objects; when they contract, the lens becomes thick (short focal length) to see nearby objects. But the lens cannot become infinitely thick, so there is a closest point at which we can see clearly. For a normal eye the near point (least distance of distinct vision) is about 25 cm, and the far point is infinity." },
        { type: "formula", text: "Power of a lens: P = 1/f, where f is the focal length in metres. Unit = dioptre (D). A concave (diverging) lens has negative power; a convex (converging) lens has positive power. Normal eye: near point = 25 cm, far point = infinity." },
        { type: "table", headers: ["Defect","You can see","You cannot see","Cause","Correcting lens"], rows: [["Myopia (near-sightedness)","Nearby objects","Distant objects","Image forms in front of the retina; eyeball too long or lens too curved","Concave (diverging) lens"],["Hypermetropia (far-sightedness)","Distant objects","Nearby objects","Image forms behind the retina; eyeball too short or lens too flat","Convex (converging) lens"],["Presbyopia (old-age)","Varies","Both near and far become hard","Ciliary muscles weaken and lens stiffens with age","Bifocal lens (concave + convex)"]] },
        { type: "example", title: "Correcting a myopic eye", lines: ["Problem: A short-sighted person's far point is only 1.5 m; distant objects focus in front of the retina.","Goal: Use a lens that makes objects at infinity appear to come from 1.5 m (the person's far point).","Choose a concave lens with focal length f = -1.5 m.","Power P = 1/f = 1/(-1.5) = -0.67 D (approximately).","Answer: A concave lens of power about -0.67 dioptre restores clear distant vision. (Concave = negative power = corrects myopia.)"] },
        { type: "heading", text: "The colourful world: dispersion and scattering" },
        { type: "para", text: "When white light passes through a glass prism it splits into seven colours (VIBGYOR) because each colour bends by a different amount: violet bends the most, red the least. This splitting is called dispersion, and the band of colours is a spectrum. A rainbow is nature's prism show: sunlight enters tiny water droplets, gets refracted and dispersed, reflects inside the droplet, and refracts again on the way out. Scattering of light explains everyday colours: the sky looks blue because tiny air molecules scatter shorter (blue) wavelengths much more than longer (red) ones. At sunrise and sunset, light travels a longer path through the atmosphere, so most blue is scattered away and the Sun appears red. Red is also chosen for danger signals because it is scattered the least and travels farthest through fog and dust. Finally, atmospheric refraction makes stars twinkle (their tiny point of light keeps shifting), while planets, being closer and larger, do not twinkle noticeably." },
        { type: "keypoints", title: "Quick revision", items: ["Accommodation = eye lens changing focal length via ciliary muscles; normal near point = 25 cm.","Myopia -> concave lens; Hypermetropia -> convex lens; Presbyopia -> bifocal lens.","Dispersion: violet bends most, red least; rainbow = refraction + internal reflection + dispersion in water droplets.","Blue sky and red sunset = scattering; shorter wavelengths scatter more.","Stars twinkle due to atmospheric refraction; planets appear steady."] },
        { type: "quiz", question: "A person can see nearby objects clearly but distant objects appear blurred. Which lens corrects this defect?", options: ["Convex (converging) lens","Concave (diverging) lens","Bifocal lens","Plane glass"], correct: 1, explain: "The defect is myopia (near-sightedness), where the image of distant objects forms in front of the retina. A concave (diverging) lens spreads the rays slightly so the image moves back onto the retina. Convex lenses correct hypermetropia, and bifocals correct presbyopia." },
    ],
  },
  {
    slug: "magnetic-effects-electric-current-explained",
    title: "Magnetic Effects of Electric Current: From Compass Needles to Electric Motors",
    summary: "A Class 10 explainer on how current creates magnetism, magnetic field lines, the right-hand thumb rule, Fleming's rules, electric motors, electromagnetic induction, generators and safe domestic wiring.",
    examSlug: "class-10",
    subjectSlug: "science",
    chapterSlug: "magnetic-effects-electric-current",
    readingMinutes: 7,
    practiceTestSlug: "magnetic-effects-practice-1",
    blocks: [
        { type: "analogy", title: "An invisible force field around a wire", text: "Bring a compass near an ordinary wire and nothing happens. Now switch on a current in that wire, and the compass needle suddenly swings. It is as if the wire quietly grew an invisible force field the moment electricity flowed. That single observation, made by Hans Christian Oersted, is the seed of everything from your ceiling fan to power-station generators. This chapter is really one big idea explored both ways: moving charges make magnetism, and moving magnets make electricity." },
        { type: "heading", text: "Oersted's discovery: current makes magnetism" },
        { type: "para", text: "In 1820 Oersted noticed that a current-carrying wire deflects a nearby compass needle, proving that an electric current produces a magnetic field around it. We picture this field using magnetic field lines. A magnetic field is a quantity with both magnitude and direction; field lines are simply a neat way of drawing it. The direction of the field at any point is the direction the north pole of a small compass points there." },
        { type: "keypoints", title: "Properties of magnetic field lines", items: ["They emerge from the north pole and merge into the south pole outside a magnet (forming closed loops).","They never intersect one another; if they did, a compass would show two directions at one point, which is impossible.","Where lines are crowded, the field is strong; where they are far apart, the field is weak.","Around a straight current-carrying wire, the field lines are concentric circles."] },
        { type: "para", text: "To find the field direction around a straight wire, use the right-hand thumb rule: point your right thumb along the current, and your curled fingers show the circular direction of the magnetic field. The field is stronger when the current is larger and weaker as you move farther from the wire. A circular loop concentrates the field, and many loops wound into a cylinder form a solenoid. Inside a solenoid the field is uniform and strong, and the whole solenoid behaves like a bar magnet with a north and a south end. Placing a soft iron core inside a current-carrying solenoid makes a powerful electromagnet." },
        { type: "heading", text: "Force, motors and Fleming's left-hand rule" },
        { type: "para", text: "Just as a magnet exerts a force on a current, a current-carrying conductor placed in a magnetic field experiences a force. The force is largest when the current is perpendicular to the field, and zero when the current is parallel to it. This force is the engine of the electric motor, which converts electrical energy into mechanical (rotational) energy. In a motor, a current-carrying coil sits in a magnetic field; the two sides of the coil feel forces in opposite directions, so the coil spins. A device called a split-ring commutator reverses the current in the coil every half rotation, so the coil keeps turning in the same direction instead of stopping." },
        { type: "example", title: "Applying Fleming's left-hand rule", lines: ["Rule: Stretch the thumb, forefinger and middle finger of your LEFT hand mutually perpendicular. Forefinger = magnetic Field, Middle finger = Current, thumB = force/motion.","Setup: A vertical wire carries current flowing downward; the magnetic field points from your left to your right.","Point the forefinger to the right (field) and the middle finger downward (current).","The thumb now points towards you.","Conclusion: The wire is pushed out towards you. This same push, acting on the two sides of a coil, is what makes an electric motor rotate."] },
        { type: "table", headers: ["Rule","What it finds","Finger assignment","Used in"], rows: [["Right-hand thumb rule","Direction of magnetic field around a straight wire","Thumb = current; curled fingers = field","Field of a current-carrying conductor"],["Fleming's left-hand rule","Direction of force on a conductor","Forefinger = field, Middle = current, Thumb = force","Electric motor"],["Fleming's right-hand rule","Direction of induced current","Forefinger = field, Thumb = motion, Middle = induced current","Electric generator"]] },
        { type: "para", text: "The reverse effect is electromagnetic induction, discovered by Michael Faraday: when the magnetic field through a coil changes (by moving a magnet or the coil), an electric current is induced in the coil, and its direction is given by Fleming's right-hand rule. This is the principle of the electric generator, which converts mechanical energy into electrical energy. An AC generator uses slip rings and produces alternating current, whose direction reverses periodically; in India, AC has a frequency of 50 Hz, so it changes direction every 1/100 second. A DC generator uses a split ring to give current in one direction. In domestic circuits, the live wire (positive) and neutral wire supply about 220 V, while the earth wire is a safety line connected to the metal case of appliances. A fuse (placed in the live wire) melts and breaks the circuit during overloading or a short circuit, preventing fires." },
        { type: "keypoints", title: "Quick revision", items: ["Current produces a magnetic field (Oersted); use the right-hand thumb rule for its direction.","A solenoid acts like a bar magnet; with an iron core it becomes an electromagnet.","Motor = electrical to mechanical energy; force direction by Fleming's left-hand rule; uses a split-ring commutator.","Generator = mechanical to electrical energy; induced current direction by Fleming's right-hand rule.","Home wiring: 220 V, earth wire for safety, fuse guards against overloading and short circuits."] },
        { type: "quiz", question: "Which rule is used to find the direction of the force on a current-carrying conductor placed in a magnetic field?", options: ["Right-hand thumb rule","Fleming's left-hand rule","Fleming's right-hand rule","Maxwell's corkscrew rule"], correct: 1, explain: "Fleming's left-hand rule gives the direction of force (motion) on a current-carrying conductor in a magnetic field, and is the basis of the electric motor. The right-hand thumb rule gives the field around a wire, while Fleming's right-hand rule gives the direction of induced current in a generator." },
    ],
  },
  {
    slug: "agriculture-explained",
    title: "Agriculture in India: Farming Types, Cropping Seasons and Major Crops",
    summary: "A Class 10 Geography explainer covering primitive, intensive and commercial farming, the rabi-kharif-zaid cropping seasons, major crops and their conditions, and the reforms that shaped Indian agriculture.",
    examSlug: "class-10",
    subjectSlug: "geography",
    chapterSlug: "agriculture",
    readingMinutes: 7,
    practiceTestSlug: "agriculture-practice-1",
    blocks: [
        { type: "analogy", title: "One country, a whole thali of farming", text: "Look at a full Indian thali: rice from a Bengal delta, wheat rotis from Punjab, dal from Madhya Pradesh, a spoon of sugar from Uttar Pradesh, and a cup of tea from Assam. Each of those items grew under a different climate, in a different soil, in a different season, and often using a completely different style of farming. Agriculture in India is not one activity but many, tuned to local land and rainfall. Once you can sort crops by their season and their needs, this whole chapter falls neatly into place." },
        { type: "heading", text: "Types of farming in India" },
        { type: "keypoints", title: "Three broad styles", items: ["Primitive subsistence farming: 'slash-and-burn', done on small patches with primitive tools (hoe, digging stick) and family labour; depends on monsoon and natural fertility. Called jhumming in north-east India.","Intensive subsistence farming: practised where population pressure on land is high; labour-intensive, uses high-yielding-variety (HYV) seeds, chemical fertilisers and irrigation to raise output from small plots.","Commercial farming: uses higher doses of modern inputs (HYV seeds, fertilisers, pesticides, insecticides) to grow for the market. Plantation is a type of commercial farming where a single crop (tea, coffee, rubber, sugarcane) is grown on a large area.","The same crop can be commercial in one region and subsistence in another; for example, rice is a commercial crop in Punjab and Haryana but a subsistence crop in Odisha."] },
        { type: "heading", text: "Cropping seasons" },
        { type: "table", headers: ["Season","Sown","Harvested","Main crops"], rows: [["Rabi","Winter (October to December)","Summer (April to June)","Wheat, barley, peas, gram, mustard"],["Kharif","With the onset of monsoon (June to July)","September to October","Rice, maize, jowar, bajra, tur (arhar), cotton, jute, groundnut, soyabean"],["Zaid","Short summer season between rabi and kharif","Summer","Watermelon, muskmelon, cucumber, vegetables, fodder crops"]] },
        { type: "example", title: "Sort these crops by season", lines: ["Given crops: Wheat, Rice, Mustard, Cotton, Gram, Bajra.","Ask: Is it sown in winter (rabi) or with the monsoon (kharif)?","Rabi (winter-sown): Wheat, Mustard, Gram.","Kharif (monsoon-sown): Rice, Cotton, Bajra.","Tip: Staple grains of the cool, dry north-west (wheat, gram, mustard) are usually rabi; moisture-loving crops (rice, cotton, millets like bajra) are usually kharif."] },
        { type: "heading", text: "Major crops and the conditions they need" },
        { type: "table", headers: ["Crop","Season / type","Climate and soil","Key growing areas"], rows: [["Rice","Kharif; staple food","High temperature (above 25 C), high humidity, rainfall above 100 cm","Northern plains, north-east, coastal and deltaic regions (India is the 2nd largest producer after China)"],["Wheat","Rabi; main food crop of north/north-west","Cool growing season, bright sunshine while ripening; 50-75 cm rainfall","Ganga-Satluj plains of the north-west and black-soil region of the Deccan"],["Sugarcane","Long-duration; tropical/sub-tropical","Hot and humid, 21-27 C, 75-100 cm rainfall","Uttar Pradesh, Maharashtra and others (India is 2nd largest producer after Brazil)"],["Tea","Plantation; beverage crop","Warm, moist, frost-free climate; deep fertile well-drained soil rich in humus; frequent showers","Assam, hills of Darjeeling (West Bengal), Nilgiris; needs abundant cheap labour"],["Cotton","Kharif; fibre crop","High temperature, light rainfall, 210 frost-free days, bright sunshine; black soil","Deccan plateau (Maharashtra, Gujarat, Telangana and others)"]] },
        { type: "para", text: "Beyond these, millets like jowar, bajra and ragi are nutritious coarse grains; ragi in particular is very rich in iron, calcium and roughage. Pulses (tur, urad, moong, masur, peas, gram) are India's main source of vegetable protein, and India is the largest producer and consumer of pulses in the world. Because most pulses are leguminous crops, they restore soil fertility by fixing nitrogen from the air (arhar is an exception), which is why they are often grown in rotation with other crops. Together, these food crops underpin India's food security, supported by the buffer stock and public distribution system (PDS)." },
        { type: "keypoints", title: "Technological and institutional reforms", items: ["Green Revolution (higher food-grain output through HYV seeds, fertilisers and irrigation) and White Revolution / Operation Flood (dairy).","Land reforms: abolition of zamindari, consolidation of holdings, and the Bhoodan-Gramdan movement led by Vinoba Bhave.","Credit and insurance support: Kissan Credit Card (KCC) and Personal Accident Insurance Scheme (PAIS) for farmers.","Government support prices: Minimum Support Price (MSP), along with subsidies on inputs, to protect farmers from price falls.","Growing focus on crop diversification and reducing farmers' dependence on the monsoon."] },
        { type: "callout", tone: "tip", text: "Exam mnemonic: 'RaWi comes in Winter' -- Rabi is winter-sown (wheat, gram, mustard), while Kharif rides in with the monsoon (rice, cotton, millets). This single line answers a very common one-mark question." },
        { type: "quiz", question: "Which of the following is a rabi crop?", options: ["Rice","Cotton","Wheat","Jute"], correct: 2, explain: "Wheat is a rabi crop, sown in winter (October to December) and harvested in summer (April to June). Rice, cotton and jute are kharif crops, sown with the onset of the monsoon and harvested by September to October." },
    ],
  },
  {
    slug: "power-sharing-explained",
    title: "Power Sharing: Why Democracies Refuse to Put All the Power in One Hand",
    summary: "Learn what power sharing means, why democracies need it, and its four key forms, explained with the Belgium and Sri Lanka case studies for Class 10.",
    examSlug: "class-10",
    subjectSlug: "political-science",
    chapterSlug: "power-sharing",
    readingMinutes: 6,
    practiceTestSlug: "power-sharing-practice-1",
    blocks: [
        { type: "analogy", title: "The one-remote household", text: "Picture a joint family with a single TV and one remote. If only the eldest ever decides what plays, the others feel ignored and fights break out. But if the family agrees on a fair timetable, everyone gets a turn and the house stays peaceful. Power sharing in a country works the same way: when many groups feel heard, everyone stays loyal to the system instead of tearing it apart." },
        { type: "heading", text: "What is power sharing?" },
        { type: "para", text: "Power sharing means distributing political power among different organs of government, different levels of government, and different social groups, so that no single person or community controls everything. It is the very spirit of a democracy: power comes from the people, so it should be spread among the people rather than concentrated in one hand." },
        { type: "heading", text: "Two stories: Belgium and Sri Lanka" },
        { type: "table", headers: ["Feature","Belgium (accommodation)","Sri Lanka (majoritarianism)"], rows: [["Main communities","Dutch-speaking Flemish (59%), French-speaking Walloon (40%), German 1%","Sinhala-speakers (74%), Tamil-speakers (18%)"],["Approach chosen","Shared power carefully among communities","Majority Sinhala community dominated"],["Key step","Equal ministers in central govt; special 'community government'","1956 Act made Sinhala the only official language"],["Result","Peaceful coexistence, no civil war","Tamil alienation, demand for autonomy, civil war"]] },
        { type: "para", text: "In Sri Lanka the Sinhala majority used its numbers to impose Sinhala as the sole official language and favour Buddhism, while ignoring Tamil demands. This majoritarianism deepened the divide and led to a long and destructive civil war. Belgium, facing an even more complex mix, instead amended its constitution to guarantee each community a real share of power, and stayed united." },
        { type: "callout", tone: "info", text: "Two reasons power sharing is good: the PRUDENTIAL reason (it reduces conflict between groups and keeps the country stable) and the MORAL reason (people who must live with a decision have a right to be consulted, which is the essence of democracy)." },
        { type: "heading", text: "The four forms of power sharing" },
        { type: "keypoints", title: "How power gets distributed", items: ["Horizontal: among organs at the same level, the legislature, executive and judiciary, so each checks and balances the others.","Vertical: among governments at different levels, central (union), state and local, also called federal division of power.","Among social groups: among religious and linguistic communities, for example community government or reserved constituencies.","Among political parties, pressure groups and movements: through competition, coalitions and alliances that keep power circulating."] },
        { type: "example", title: "Belgium's clever fix", lines: ["Problem: the tiny German-speaking minority and the Dutch-French tension could have split the country.","Fix 1: The central government must have equal numbers of Dutch- and French-speaking ministers.","Fix 2: Many powers were given to the state governments of the two regions, so neither community rules the other.","Fix 3: A third 'community government' is elected by people of one language group (Dutch, French or German) and controls cultural and educational matters.","Outcome: All communities feel secure, so Belgium avoided the civil war that Sri Lanka suffered."] },
        { type: "keypoints", title: "Quick revision", items: ["Power sharing spreads power so no single group dominates.","Belgium accommodated its communities; Sri Lanka's majoritarianism triggered civil war.","It is desirable for both prudential (stability) and moral (democratic spirit) reasons.","Four forms: horizontal, vertical, among social groups, and among parties/pressure groups."] },
        { type: "quiz", question: "Sri Lanka's 1956 decision to make Sinhala the only official language is an example of what?", options: ["Power sharing among communities","Majoritarianism","Federal (vertical) division of power","A coalition government"], correct: 1, explain: "Majoritarianism is when the majority community uses its numbers to run the country its own way, ignoring the wishes of minorities. Making Sinhala the sole official language did exactly that, alienating Tamils and eventually leading to civil war." },
    ],
  },
  {
    slug: "development-explained",
    title: "Development: Why 'More Money' Is Only Half the Story",
    summary: "Understand how development means different things to different people, why average income can mislead, and how the HDI measures real progress, Class 10 Economics made simple.",
    examSlug: "class-10",
    subjectSlug: "economics",
    chapterSlug: "development",
    readingMinutes: 6,
    practiceTestSlug: "economics-development-practice-1",
    blocks: [
        { type: "analogy", title: "Same road, different destinations", text: "Ask four people what a 'better life' means and you get four answers. A landless farmer wants more days of work and a fair wage; a rich farmer wants better crop prices; a student wants good colleges nearby; a girl wants the same freedom her brother has. They share one road called development, but their destinations differ. That is the first big idea of this chapter: different people can have different, even conflicting, notions of development." },
        { type: "heading", text: "What do people really want?" },
        { type: "para", text: "People want more than just income. Along with a decent income they seek things money alone cannot always buy: equal treatment, freedom, security, respect from others, and a clean environment. So development has two sides: material goals (income, goods) and non-material goals (dignity, equality, safety). For a country, 'national development' means choosing goals that benefit society as a whole, not just a few." },
        { type: "heading", text: "Comparing countries: per capita income" },
        { type: "formula", text: "Average income (per capita income) = Total income of the country / Total population. The World Bank uses this figure to classify countries as rich or low-income." },
        { type: "example", title: "Why the average can fool you", lines: ["Country A: monthly incomes of 5 citizens are ₹9,500, ₹10,500, ₹9,800, ₹10,000 and ₹10,200.","Country B: monthly incomes of 5 citizens are ₹500, ₹500, ₹500, ₹500 and ₹48,000.","Average income of A = 50,000 / 5 = ₹10,000.","Average income of B = 50,000 / 5 = ₹10,000.","Same average! Yet in A everyone is comfortable, while in B four people are very poor and one is very rich.","Lesson: averages hide inequality, so per capita income alone is not enough to judge development."] },
        { type: "callout", tone: "tip", text: "Money in your pocket cannot buy a pollution-free environment, protection from an infectious disease, or peace. Public facilities like clean water, healthcare, schools and safety are shared goods that raise everyone's quality of life, so they matter as much as income." },
        { type: "heading", text: "A fuller measure: the Human Development Index" },
        { type: "table", headers: ["Component of HDI","What it measures","Why it matters"], rows: [["Life expectancy at birth","Average years a newborn is expected to live","Reflects health and nutrition"],["Education","Years of schooling / literacy of people","Reflects knowledge and opportunity"],["Per capita income","Income per person (in PPP terms)","Reflects command over resources"]] },
        { type: "para", text: "The United Nations Development Programme (UNDP) combines these three into the Human Development Index and ranks countries in its Human Development Report. Because it counts health and education alongside income, HDI captures development far better than income alone. Indicators like the Body Mass Index (to check for under- or over-nourishment) and infant mortality rate are also used to judge real well-being." },
        { type: "keypoints", title: "Quick revision", items: ["Development means different things to different people; income is only one goal among many.","Average (per capita) income = total income / total population, used by the World Bank to rank countries.","Averages hide inequality, so they cannot fully measure development.","HDI uses health (life expectancy), education and income together for a truer picture.","Development must also be sustainable, we cannot exhaust groundwater or crude oil and still call it progress."] },
        { type: "quiz", question: "Countries A and B have the same average income, but in A incomes are spread evenly while in B one person earns almost everything. What does this best show?", options: ["Average income is completely useless and should never be used","Average income hides how income is distributed among people","Country B is more developed because it has a rich person","Both countries are equally developed in every possible way"], correct: 1, explain: "Average income is a useful starting point, but it treats everyone as if they earn the mean. When distribution is very unequal (as in B), the same average can hide widespread poverty, which is why we also look at HDI, public facilities and inequality." },
    ],
  },
  {
    slug: "gravitation-explained",
    title: "Gravitation: The Force That Ties Apples, Planets and Satellites Together",
    summary: "Master Newton's law of gravitation, variation of g, escape and orbital velocity, and Kepler's laws with clear formulas and a worked example for JEE.",
    examSlug: "jee",
    subjectSlug: "physics",
    chapterSlug: "gravitation",
    readingMinutes: 8,
    practiceTestSlug: "jee-gravitation-practice-1",
    blocks: [
        { type: "analogy", title: "The Moon is always falling", text: "Throw a ball horizontally and it curves down and lands. Throw it faster and it lands farther. Newton's leap of imagination: throw it so fast that as it falls, the Earth curves away beneath it by the same amount, and it never lands, it orbits. The Moon is doing exactly this. It is perpetually 'falling' toward Earth but moving sideways fast enough to keep missing. The same force that pulls the apple down holds the Moon in its path: gravitation." },
        { type: "heading", text: "Newton's law of universal gravitation" },
        { type: "para", text: "Every particle of matter in the universe attracts every other particle. The force is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres. It acts along the line joining the two masses and is always attractive." },
        { type: "formula", text: "F = G m1 m2 / r^2, where G = 6.674 x 10^-11 N m^2 kg^-2 is the universal gravitational constant. G is the same everywhere in the universe; g (acceleration due to gravity) is not." },
        { type: "table", headers: ["Quantity","Formula","Note"], rows: [["Force of gravitation","F = G m1 m2 / r^2","Always attractive"],["Acceleration due to gravity","g = GM / R^2","About 9.8 m/s^2 at Earth's surface"],["g at height h","g_h = g R^2/(R+h)^2 ~ g(1 - 2h/R)","Decreases as you go up"],["g at depth d","g_d = g(1 - d/R)","Becomes zero at the centre"],["Gravitational potential energy","U = -G M m / r","Zero at infinity, negative elsewhere"],["Escape velocity","v_e = sqrt(2GM/R) = sqrt(2gR)","About 11.2 km/s for Earth"],["Orbital velocity","v_o = sqrt(GM/r)","About 7.9 km/s near Earth"],["Time period of orbit","T = 2*pi*sqrt(r^3/GM)","Gives Kepler's third law"],["Total energy in orbit","E = -G M m / 2r","KE = +GMm/2r, PE = -GMm/r"]] },
        { type: "keypoints", title: "How g changes", items: ["With height: g decreases; for small h, fractional drop is about 2h/R.","With depth: g decreases linearly and is zero at Earth's centre.","With latitude/rotation: g' = g - R*omega^2*cos^2(lambda), so g is maximum at the poles and minimum at the equator.","Shape of Earth: since Earth bulges at the equator, g is slightly larger at the poles for this reason too."] },
        { type: "heading", text: "Escape velocity and orbital velocity" },
        { type: "example", title: "Worked example: escape velocity from Earth", lines: ["Given: g = 9.8 m/s^2 and Earth's radius R = 6.4 x 10^6 m.","Formula: v_e = sqrt(2gR).","Substitute: v_e = sqrt(2 x 9.8 x 6.4 x 10^6).","Inside the root: 2 x 9.8 = 19.6; 19.6 x 6.4 x 10^6 = 1.2544 x 10^8.","Take the square root: v_e = sqrt(1.2544 x 10^8) = 1.12 x 10^4 m/s.","Answer: v_e = 11.2 km/s, and notice it does NOT depend on the mass of the escaping object."] },
        { type: "heading", text: "Kepler's laws and orbital energy" },
        { type: "keypoints", title: "Three laws + one energy rule", items: ["Law of Orbits: every planet moves in an ellipse with the Sun at one focus.","Law of Areas: the line from Sun to planet sweeps equal areas in equal times (this is conservation of angular momentum; planets move faster when nearer the Sun).","Law of Periods: T^2 is proportional to a^3, where a is the semi-major axis.","Bound orbit energy: total energy E = -GMm/2r is negative; a more negative energy means a smaller, tighter orbit."] },
        { type: "callout", tone: "warn", text: "Common JEE traps: (1) escape velocity is independent of the object's mass and its direction of projection. (2) A geostationary satellite must have a period of 24 hours, orbit over the equator, and move west-to-east, giving a height of about 36,000 km. (3) Remember v_e = sqrt(2) x v_o for the same radius." },
        { type: "quiz", question: "The escape velocity from Earth's surface is about 11.2 km/s. What is the orbital velocity of a satellite in a circular orbit just above Earth's surface?", options: ["7.9 km/s","11.2 km/s","15.8 km/s","22.4 km/s"], correct: 0, explain: "For the same radius, escape velocity and orbital velocity are related by v_e = sqrt(2) x v_o. So v_o = v_e / sqrt(2) = 11.2 / 1.414 = about 7.9 km/s, which is the well-known first cosmic velocity for a low Earth orbit." },
    ],
  },
  {
    slug: "chemical-bonding-explained",
    title: "Chemical Bonding Made Simple: Why Atoms Stick Together",
    summary: "A concept-first guide to ionic, covalent and coordinate bonds, VSEPR shapes, hybridisation and molecular orbital theory for JEE Chemistry.",
    examSlug: "jee",
    subjectSlug: "chemistry",
    chapterSlug: "chemical-bonding",
    readingMinutes: 8,
    practiceTestSlug: "jee-chemical-bonding-practice-1",
    blocks: [
        { type: "analogy", title: "Atoms are like people at a party", text: "Some atoms are 'givers' who happily hand over spare electrons, some are 'sharers' who hold hands over a shared pair, and a few are 'generous hosts' who supply both electrons of a shared pair. Just as people team up to feel comfortable, atoms bond to reach the stable, contented electron arrangement of a noble gas." },
        { type: "para", text: "Noble gases like neon and argon almost never react because their outermost shell already holds eight electrons (a full octet), which is extremely stable. Every other atom 'wants' that same stability. It can get there by losing, gaining, or sharing electrons. This drive to complete the octet is the single idea behind almost all chemical bonding." },
        { type: "heading", text: "Three ways to bond" },
        { type: "table", headers: ["Feature","Ionic bond","Covalent bond","Coordinate bond"], rows: [["How it forms","Transfer of electrons (metal to non-metal)","Sharing of electrons between atoms","One atom donates both shared electrons"],["Typical between","Metal + non-metal","Two non-metals","Lewis base to Lewis acid"],["Example","NaCl","H2, Cl2, CH4","NH4+, H3O+"],["General nature","Solids, high melting point","Gases or liquids, lower melting point","Behaves like a normal covalent bond once formed"]] },
        { type: "heading", text: "VSEPR: predicting molecular shapes" },
        { type: "para", text: "VSEPR (Valence Shell Electron Pair Repulsion) theory says the electron pairs around a central atom - both bonding pairs and lone pairs - repel each other and spread out as far apart as possible. Count the total number of pairs (the steric number) and the geometry follows automatically. Lone pairs are 'fatter' and repel more strongly than bonding pairs, so they slightly squeeze the bond angles." },
        { type: "table", headers: ["Electron pairs (steric no.)","Hybridisation","Shape","Bond angle","Example"], rows: [["2","sp","Linear","180 degrees","BeCl2, CO2"],["3","sp2","Trigonal planar","120 degrees","BF3"],["4","sp3","Tetrahedral","109.5 degrees","CH4"],["5","sp3d","Trigonal bipyramidal","120 and 90 degrees","PCl5"],["6","sp3d2","Octahedral","90 degrees","SF6"]] },
        { type: "formula", text: "Formal charge = V - L - (B/2), where V = valence electrons, L = lone-pair electrons, B = bonding (shared) electrons.  |  Bond order = (Nb - Na)/2, where Nb and Na are electrons in bonding and antibonding molecular orbitals." },
        { type: "example", title: "Worked example: shape of H2O and bond order of O2", lines: ["Q: Find the shape of a water molecule (H2O) and the bond order of O2.","H2O: Oxygen has 6 valence electrons - 2 are used to bond the two H atoms, leaving 2 lone pairs.","Steric number = 2 bond pairs + 2 lone pairs = 4, so oxygen is sp3 hybridised (tetrahedral electron geometry).","The 2 lone pairs repel more strongly and squeeze the H-O-H angle from 109.5 degrees down to about 104.5 degrees - giving a bent (angular) shape.","O2 by MOT: bonding electrons Nb = 10 and antibonding electrons Na = 6, so bond order = (10 - 6)/2 = 2 (a double bond).","Two electrons sit unpaired in the pi-star (antibonding) orbitals, so O2 is paramagnetic - it is attracted by a magnet."] },
        { type: "callout", tone: "warn", text: "Common trap: lone pairs are invisible in the final shape name. H2O is sp3 just like methane, but we call it 'bent', not 'tetrahedral', because a molecule's shape is described using only the positions of its atoms, not its lone pairs." },
        { type: "keypoints", title: "Quick recap", items: ["Atoms bond to reach a stable noble-gas electron arrangement (the octet rule).","Ionic bonds transfer electrons, covalent bonds share them, coordinate bonds share a pair donated entirely by one atom.","VSEPR: count bond pairs + lone pairs (steric number) to predict shape; lone pairs shrink bond angles.","Hybridisation (sp, sp2, sp3, sp3d, sp3d2) matches the steric number and fixes the geometry.","Bond order = (Nb - Na)/2; a higher bond order means a shorter, stronger bond.","A molecule is polar only if its bond dipoles do not cancel: H2O is polar, but CO2 is non-polar because its two dipoles cancel."] },
        { type: "quiz", question: "In molecular orbital theory, why is O2 paramagnetic?", options: ["It has a bond order of 3","It has two unpaired electrons in its antibonding pi-star orbitals","All of its electrons are paired in bonding orbitals","It has no antibonding electrons at all"], correct: 1, explain: "O2's molecular orbital arrangement places one electron each in its two degenerate pi-star (antibonding) orbitals, leaving two unpaired electrons. Unpaired electrons make the molecule attracted to a magnetic field, i.e. paramagnetic. Its bond order is 2, not 3." },
    ],
  },
  {
    slug: "cell-cycle-and-cell-division-explained",
    title: "Cell Cycle and Cell Division: How One Cell Becomes Two",
    summary: "An easy walkthrough of interphase, mitosis and meiosis - the phases, DNA changes and why each matters - for NEET Biology.",
    examSlug: "neet",
    subjectSlug: "biology",
    chapterSlug: "cell-cycle-and-cell-division",
    readingMinutes: 7,
    practiceTestSlug: "neet-cell-cycle-practice-1",
    blocks: [
        { type: "analogy", title: "A cell is like a photocopy shop", text: "Before a busy photocopy shop can split into two branches, it must first stock up on paper, copy every important document exactly, and double-check the copies. Only then does it neatly divide everything into two identical new shops. A cell does the same: it grows and copies its DNA during interphase, then physically splits during the M phase." },
        { type: "para", text: "The cell cycle has two main parts. Interphase is the long 'preparation' stage (about 95% of the cycle) with three sub-phases: G1 (the cell grows and is metabolically active but does not copy DNA), S (DNA replication - the DNA amount doubles, though the chromosome number stays the same), and G2 (the cell makes proteins and prepares to divide). The M phase (mitosis) is the short actual division. A typical human cell completes one cycle in about 24 hours, with mitosis taking only about an hour." },
        { type: "table", headers: ["Phase","What happens","DNA / chromosome status"], rows: [["G1","Cell grows, makes RNA and proteins, is metabolically active","2C DNA, 2n chromosomes (no copying yet)"],["S","DNA replication; each chromosome gains a sister chromatid","DNA doubles to 4C; chromosome number still 2n"],["G2","More proteins made; cell prepares for mitosis","4C DNA, 2n chromosomes"],["M (mitosis)","Nucleus and then cytoplasm divide into two","Each daughter cell returns to 2C, 2n"]] },
        { type: "heading", text: "Mitosis: the equational division" },
        { type: "steps", title: "The four stages of mitosis (P-M-A-T)", items: ["Prophase: chromosomes condense and become visible as two sister chromatids; the spindle starts forming and centrosomes move to opposite poles; the nuclear envelope and nucleolus begin to disappear.","Metaphase: the nuclear envelope is gone; chromosomes line up at the equator (the metaphase plate) with spindle fibres attached to their kinetochores.","Anaphase: centromeres split; sister chromatids separate and are pulled to opposite poles as daughter chromosomes.","Telophase: chromosomes reach the poles and decondense; the nuclear envelope and nucleolus reappear, forming two nuclei. Cytokinesis (a cleavage furrow in animals, a cell plate in plants) then divides the cytoplasm."] },
        { type: "heading", text: "Meiosis: the reductional division" },
        { type: "para", text: "Meiosis makes gametes (eggs, and sperm or pollen). It is called reductional because it halves the chromosome number - one diploid cell (2n) produces four haploid cells (n). This needs two rounds of division, Meiosis I and Meiosis II, but DNA is copied only once, before Meiosis I. The star event happens in Prophase I: homologous chromosomes pair up (synapsis) and swap segments in a process called crossing over during the pachytene stage, which shuffles genes and creates variation. In Anaphase I the homologous chromosomes separate; in Meiosis II the sister chromatids separate, just like in mitosis." },
        { type: "table", headers: ["Feature","Mitosis","Meiosis"], rows: [["Number of divisions","One","Two (Meiosis I and II)"],["Daughter cells","2","4"],["Chromosome number","Stays the same (2n to 2n)","Halved (2n to n)"],["Genetic result","Identical to the parent","Genetically varied"],["Where it occurs","Body (somatic) cells - growth and repair","Germ cells - gamete formation"],["Crossing over","Absent","Present (in Prophase I)"]] },
        { type: "example", title: "Tracking a human cell (2n = 46)", lines: ["Start (G1): 46 chromosomes, DNA = 2C.","After S phase: still 46 chromosomes, but each now has 2 sister chromatids, DNA = 4C.","After mitosis: two cells, each with 46 chromosomes and DNA = 2C - identical to the parent.","After Meiosis I: chromosome number halves to 23 (each still with 2 chromatids), DNA = 2C.","After Meiosis II: four cells, each with 23 chromosomes and DNA = 1C - these become the gametes.","At fertilisation, two gametes (23 + 23) fuse to restore 46, keeping the species' number constant."] },
        { type: "callout", tone: "tip", text: "Exam favourite: the centromere splits in ANAPHASE (of mitosis and of meiosis II), never in metaphase. Also, Meiosis I is the reductional step (homologues separate) while Meiosis II is equational (sister chromatids separate). Non-dividing, resting cells sit in a stage called G0." },
        { type: "keypoints", title: "Quick recap", items: ["Cell cycle = Interphase (G1, S, G2) + M phase; interphase is by far the longest part.","DNA is replicated only in the S phase; the chromosome number does not change during S.","Mitosis (PMAT) keeps the chromosome number the same and is used for growth and repair.","Meiosis halves the chromosome number and produces four genetically varied haploid gametes.","Crossing over happens in Prophase I (pachytene); homologues separate in Anaphase I; sister chromatids separate in Anaphase II.","Cytokinesis differs: a cleavage furrow in animal cells, a cell plate in plant cells."] },
        { type: "quiz", question: "During which stage of mitosis do the centromeres split so that sister chromatids move to opposite poles?", options: ["Prophase","Metaphase","Anaphase","Telophase"], correct: 2, explain: "In anaphase the centromeres split, turning each sister chromatid into an independent daughter chromosome that is then pulled to an opposite pole by the spindle fibres. In metaphase the chromosomes only line up at the equator - they have not yet separated." },
    ],
  },
  {
    slug: "biological-classification-explained",
    title: "Biological Classification: The Five Kingdoms Explained",
    summary: "A friendly tour of Whittaker's five kingdoms - Monera, Protista, Fungi, Plantae and Animalia - plus viruses and lichens, for NEET Biology.",
    examSlug: "neet",
    subjectSlug: "biology",
    chapterSlug: "biological-classification",
    readingMinutes: 7,
    practiceTestSlug: "neet-biological-classification-practice-1",
    blocks: [
        { type: "analogy", title: "Sorting a giant kitchen", text: "Imagine millions of ingredients dumped into one huge kitchen. To cook anything, you first sort them onto shelves - grains, spices, vegetables, dairy. Biologists face the same problem with millions of living things. Classification is simply putting organisms onto the right 'shelves' so we can study, compare and name them sensibly." },
        { type: "para", text: "Early scientists used just two kingdoms - Plantae and Animalia - but that forced bacteria, fungi and single-celled organisms into groups where they did not fit. In 1969, R.H. Whittaker proposed the Five Kingdom Classification: Monera, Protista, Fungi, Plantae and Animalia. He sorted organisms using five sensible criteria: cell structure (prokaryotic or eukaryotic), body organisation, mode of nutrition (autotrophic or heterotrophic), reproduction, and evolutionary (phylogenetic) relationships." },
        { type: "table", headers: ["Kingdom","Cell type","Cell wall","Nutrition","Examples"], rows: [["Monera","Prokaryotic","Present (non-cellulosic)","Autotrophic and heterotrophic","Bacteria, cyanobacteria"],["Protista","Eukaryotic (single-celled)","Present in some","Autotrophic and heterotrophic","Amoeba, Euglena, diatoms"],["Fungi","Eukaryotic (mostly multicellular)","Present (chitin)","Heterotrophic (saprophytic/parasitic)","Mushroom, yeast, Penicillium"],["Plantae","Eukaryotic (multicellular)","Present (cellulose)","Autotrophic (photosynthesis)","Mosses, ferns, trees"],["Animalia","Eukaryotic (multicellular)","Absent","Heterotrophic (holozoic)","Insects, fish, humans"]] },
        { type: "heading", text: "Monera and Protista - the microscopic kingdoms" },
        { type: "para", text: "Monera contains all the prokaryotes - organisms whose cells have no true (membrane-bound) nucleus. These are the bacteria, the most abundant micro-organisms on Earth. They fall into two groups: archaebacteria, which survive extreme habitats like salty lakes (halophiles), hot acidic springs (thermoacidophiles) and marshes (methanogens) thanks to a special cell-wall structure; and eubacteria or 'true bacteria', which include the photosynthetic cyanobacteria (blue-green algae such as Nostoc). Bacterial nutrition covers everything - some are autotrophic (photosynthetic or chemosynthetic) while many are heterotrophic decomposers or pathogens." },
        { type: "para", text: "Protista is the kingdom of single-celled eukaryotes - a bridge between the simple Monera and the complex plants, animals and fungi. Key groups include: chrysophytes (diatoms, whose glassy silica walls fit together like a soap-box and pile up as 'diatomaceous earth'); dinoflagellates (marine cells whose sudden blooms cause toxic red tides); euglenoids like Euglena (no cell wall, photosynthetic in light but heterotrophic in the dark); slime moulds (saprophytic, forming spore-bearing bodies); and protozoans (heterotrophic hunters or parasites such as Amoeba, Paramoecium and the malaria-causing Plasmodium)." },
        { type: "heading", text: "Fungi, Plantae and Animalia" },
        { type: "para", text: "Fungi are heterotrophs with cell walls made of chitin; most are multicellular threads (hyphae) living as saprophytes (on dead matter), parasites, or symbiotic partners - examples include mushrooms, moulds like Penicillium, and yeast. Plantae are the multicellular, cellulose-walled autotrophs that make their own food by photosynthesis (a few, like the insect-trapping Venus flytrap and the parasite Cuscuta, are exceptions). Animalia are multicellular eukaryotes with no cell wall that feed by holozoic nutrition (ingesting food) and usually move and respond quickly using nerves and muscles." },
        { type: "callout", tone: "info", text: "Not everything fits the five kingdoms. Viruses (non-cellular; a protein coat around DNA or RNA - never both - reproducing only inside a host), viroids (free infectious RNA with no protein coat, cause potato spindle tuber disease), prions (infectious mis-folded proteins, cause mad-cow disease) and lichens (a partnership of an alga and a fungus, and excellent air-pollution indicators) are all left out of Whittaker's scheme." },
        { type: "example", title: "Which kingdom does each belong to?", lines: ["E. coli, a gut bacterium with no true nucleus - Monera (prokaryote).","Amoeba, a single-celled eukaryote that engulfs food - Protista.","A button mushroom feeding on dead organic matter - Fungi.","A mango tree making food by photosynthesis - Plantae.","A housefly, multicellular with no cell wall and holozoic feeding - Animalia.","Tobacco mosaic virus - none of the five; it is an acellular virus."] },
        { type: "keypoints", title: "Quick recap", items: ["Whittaker's 1969 five kingdoms are Monera, Protista, Fungi, Plantae and Animalia.","The most basic split is prokaryotic (Monera) versus eukaryotic (all the rest).","Monera = bacteria (archaebacteria + eubacteria); Protista = single-celled eukaryotes.","Fungi have chitin cell walls and are heterotrophic; Plantae have cellulose walls and photosynthesise; Animalia have no cell wall and ingest their food.","Nutrition ranges from autotrophic (make own food) to heterotrophic (depend on others).","Viruses, viroids, prions and lichens are not placed in any of the five kingdoms."] },
        { type: "quiz", question: "What single feature best explains why an organism is placed in Kingdom Monera rather than Kingdom Protista?", options: ["It is multicellular","Its cell is prokaryotic (it has no true nucleus)","It performs photosynthesis","Its cell wall is made of cellulose"], correct: 1, explain: "Monera contains only prokaryotes - cells without a membrane-bound nucleus - while all Protista are eukaryotes with a true nucleus. Photosynthesis and cell walls occur in both kingdoms, so they cannot be the deciding factor." },
    ],
  },
  {
    slug: "upsc-constitution-fundamental-rights",
    title: "Fundamental Rights — Articles 12 to 35, Made Simple for UPSC Prelims",
    summary: "Learn the six Fundamental Rights, their key articles, the five writs, and the facts UPSC Prelims tests most.",
    examSlug: "upsc",
    subjectSlug: "indian-polity-governance",
    chapterSlug: "constitution-fundamental-rights",
    readingMinutes: 7,
    practiceTestSlug: "upsc-constitution-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of the Constitution as the rulebook of India, and Fundamental Rights as the promises the State makes to every person: some things the government can never take away from you. If the State breaks these promises, you can go straight to the Supreme Court or a High Court and ask a judge to stop it. That power to knock on the court's door is itself one of the rights."
      },
      {
        type: "analogy",
        title: "Rights as a warranty card",
        text: "When you buy a phone, the warranty card says the seller must fix certain problems, no matter what. Fundamental Rights are the citizen's warranty card against the State. And Article 32 is the toll-free number you call to claim that warranty in court."
      },
      {
        type: "heading",
        text: "Where they live in the Constitution"
      },
      {
        type: "para",
        text: "Fundamental Rights are placed in Part III of the Constitution, from Article 12 to Article 35. This part is often called the 'Magna Carta' of India. Article 12 defines what 'State' means, and Article 13 says any law that violates these rights is void. There are six Fundamental Rights today."
      },
      {
        type: "keypoints",
        title: "The six Fundamental Rights (remember the articles)",
        items: ["Right to Equality — Articles 14 to 18", "Right to Freedom — Articles 19 to 22", "Right against Exploitation — Articles 23 to 24", "Right to Freedom of Religion — Articles 25 to 28", "Cultural and Educational Rights — Articles 29 to 30", "Right to Constitutional Remedies — Article 32"]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Right to Property was once a Fundamental Right (old Articles 19(1)(f) and 31). The 44th Amendment Act, 1978 removed it. It is now only a legal (constitutional) right under Article 300A. UPSC loves testing this."
      },
      {
        type: "table",
        headers: ["Article", "What it protects", "Key point"],
        rows: [
          ["14", "Equality before law and equal protection of laws", "Available to all persons, not just citizens"],
          ["15", "No discrimination on religion, race, caste, sex, place of birth", "Only for citizens"],
          ["16", "Equal opportunity in public employment", "Only for citizens"],
          ["17", "Abolition of untouchability", "Its practice is an offence"],
          ["18", "Abolition of titles", "Military and academic titles are allowed"],
          ["19", "Six freedoms (speech, assembly, association, movement, residence, profession)", "Only for citizens"],
          ["20", "Protection in conviction for offences", "Cannot be suspended even in Emergency"],
          ["21", "Protection of life and personal liberty", "Available to all persons; cannot be suspended in Emergency"],
          ["21A", "Right to education, ages 6 to 14", "Added by 86th Amendment, 2002"],
          ["22", "Protection against arrest and detention", "Has rules on preventive detention"]
        ]
      },
      {
        type: "para",
        text: "Two articles need special care. Article 21 has been read very widely by courts to include the right to live with dignity, privacy, a clean environment, and more. Article 20 protects you in three ways: no punishment under a law made after the act (no ex-post-facto law), no punishment twice for the same offence (no double jeopardy), and no forcing a person to be a witness against himself (self-incrimination)."
      },
      {
        type: "heading",
        text: "Article 32 — the heart of the Constitution"
      },
      {
        type: "para",
        text: "Article 32 lets you go directly to the Supreme Court if a Fundamental Right is violated. Dr. B. R. Ambedkar called it 'the heart and soul' of the Constitution. To enforce rights, courts issue five special orders called writs. High Courts have a wider power to issue writs under Article 226."
      },
      {
        type: "table",
        headers: ["Writ", "Meaning", "Used for"],
        rows: [
          ["Habeas Corpus", "To have the body", "Release a person from illegal detention"],
          ["Mandamus", "We command", "Order a public official to do a legal duty"],
          ["Prohibition", "To forbid", "Stop a lower court from exceeding its powers (before)"],
          ["Certiorari", "To be certified", "Quash or transfer a lower court's order (after)"],
          ["Quo Warranto", "By what authority", "Question a person's claim to a public office"]
        ]
      },
      {
        type: "steps",
        title: "How a Fundamental Right is enforced",
        items: ["A person's Fundamental Right is violated by the State or its bodies.", "The person files a petition in the Supreme Court (Article 32) or a High Court (Article 226).", "The court checks if the right is genuinely breached.", "The court issues a suitable writ to protect the right.", "Any law that clashes with the right is declared void under Article 13."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Memory hook: rights available ONLY to citizens are Articles 15, 16, 19, 29 and 30. All other rights are for every person, including foreigners, on Indian soil."
      },
      {
        type: "example",
        title: "A quick real-world case",
        lines: ["A worker is forced to work without pay to repay a loan (bonded labour).", "This violates Article 23, which bans traffic in humans and forced labour.", "He can approach the court under Article 32.", "The court can order his release and rehabilitation."]
      },
      {
        type: "keypoints",
        title: "Must-remember facts",
        items: ["Fundamental Rights are in Part III, Articles 12 to 35.", "There are six Fundamental Rights; Right to Property was removed by the 44th Amendment (1978).", "Articles 20 and 21 cannot be suspended even during a National Emergency.", "Article 24 bans employing children below 14 years in factories, mines, and hazardous work.", "Articles 33, 34 and 35 let Parliament modify or make laws about these rights (armed forces, martial law, enforcement)."]
      },
      {
        type: "quiz",
        question: "Which pair of Fundamental Rights cannot be suspended even during a National Emergency?",
        options: ["Articles 19 and 21", "Articles 20 and 21", "Articles 14 and 19", "Articles 21 and 22"],
        correct: 1,
        explain: "After the 44th Amendment Act (1978), Articles 20 (protection in conviction for offences) and 21 (protection of life and personal liberty) can never be suspended, even during a National Emergency. Article 19 freedoms, by contrast, can be suspended during an Emergency declared on grounds of war or external aggression."
      }
    ]
  },
  {
    slug: "upsc-parliament-executive-judiciary",
    title: "Parliament, Executive and Judiciary — India's Three Organs Made Simple",
    summary: "Learn how India's Parliament, Executive and Judiciary are formed, what powers each holds, and how they check each other — the core Polity facts UPSC Prelims tests.",
    examSlug: "upsc",
    subjectSlug: "indian-polity-governance",
    chapterSlug: "parliament-judiciary",
    readingMinutes: 8,
    practiceTestSlug: "upsc-parliament-judiciary-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of the Indian government as a house with three workers who share the chores. One worker makes the rules, one runs the day-to-day home, and one settles fights about the rules. These three are the Parliament (makes laws), the Executive (runs the country), and the Judiciary (interprets and guards the law). This is called the separation of powers. None of them is fully the boss. Each keeps a check on the other two so no single person can grab all the power."
      },
      {
        type: "analogy",
        title: "The cricket-match way to remember it",
        text: "Parliament is like the group that writes the rules of the game. The Executive is the team captain and players who actually play and run the match. The Judiciary is the umpire who decides if a rule was broken. The umpire did not make the rule and does not bat, but everyone must accept the umpire's decision. That is exactly how these three organs stay separate but connected."
      },
      {
        type: "heading",
        text: "1. Parliament — the law-making organ"
      },
      {
        type: "para",
        text: "Article 79 says the Parliament of India has three parts: the President, the Lok Sabha (House of the People), and the Rajya Sabha (Council of States). Yes, the President is part of Parliament even though the President is in the Executive too. A bill becomes a law only after the President signs it. The Lok Sabha is directly elected by the people. The Rajya Sabha represents the states."
      },
      {
        type: "table",
        headers: ["Feature", "Lok Sabha", "Rajya Sabha"],
        rows: [
          ["Also called", "House of the People", "Council of States"],
          ["Maximum strength", "550", "250"],
          ["How members come", "Directly elected by people", "Mostly elected by state MLAs; 12 nominated by President"],
          ["Term", "5 years (can be dissolved early)", "Permanent house, never dissolved"],
          ["Member's tenure", "5 years", "6 years; one-third retire every 2 years"],
          ["Presiding officer", "Speaker", "Chairman (the Vice-President)"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Memory hook: Lok Sabha = 'Lower but Larger and Louder' — it is the more powerful house for money and for deciding who runs the government. The Rajya Sabha is permanent, so it is never fully dissolved, even when the Lok Sabha ends."
      },
      {
        type: "keypoints",
        title: "Powers only the Lok Sabha has",
        items: ["A Money Bill (Article 110) can start ONLY in the Lok Sabha. The Speaker decides if a bill is a Money Bill.", "The Rajya Sabha can only suggest changes to a Money Bill and must return it within 14 days. The Lok Sabha can accept or reject those suggestions.", "A No-Confidence Motion, which can remove the government, can be moved ONLY in the Lok Sabha.", "The Rajya Sabha has one special power under Article 249: it can allow Parliament to make a law on a State List subject."]
      },
      {
        type: "heading",
        text: "2. Executive — the organ that runs the country"
      },
      {
        type: "para",
        text: "The Executive means the President, the Prime Minister, and the Council of Ministers. The President (Articles 52 to 62) is the head of the state and the first citizen, but the President is a nominal head — like a respected elder who signs off but does not run daily affairs. The real power lies with the Prime Minister and the Council of Ministers. India follows the parliamentary system, where the real executive is answerable to Parliament."
      },
      {
        type: "steps",
        title: "How the real Executive is formed",
        items: ["The people elect members of the Lok Sabha in a general election.", "The party or group with a majority in the Lok Sabha is invited to form the government.", "The President appoints the leader of that majority group as the Prime Minister.", "On the PM's advice, the President appoints the other ministers, who together form the Council of Ministers.", "This Council is collectively responsible to the Lok Sabha (Article 75). If the Lok Sabha passes a no-confidence motion, the whole Council must resign."]
      },
      {
        type: "callout",
        tone: "info",
        text: "Article 74 says there shall be a Council of Ministers to aid and advise the President, and the President must normally act on that advice. The 44th Amendment added that the President can send the advice back for reconsideration once, but if the Council sends the same advice again, the President must accept it."
      },
      {
        type: "example",
        title: "President is elected, not by direct vote",
        lines: ["The President is chosen by an electoral college (Article 54).", "This college has the elected members of both houses of Parliament AND the elected members of the state legislative assemblies.", "Nominated members do NOT vote in the presidential election.", "So citizens do not vote directly for the President — their elected representatives do."]
      },
      {
        type: "heading",
        text: "3. Judiciary — the organ that guards the law"
      },
      {
        type: "para",
        text: "India has an integrated, single system of courts. At the top is the Supreme Court (Article 124), then the High Courts (Article 214) in the states, and below them the district and lower courts. 'Integrated' means the same set of courts handles both central laws and state laws — there is no separate system for each. The Judiciary is independent so that judges can decide fairly, even against the government."
      },
      {
        type: "keypoints",
        title: "Judiciary must-remember points",
        items: ["Supreme Court and High Court judges are appointed by the President. In practice, names are recommended by the Collegium, a group of senior judges.", "A Supreme Court judge retires at 65 years; a High Court judge retires at 62 years.", "Judicial Review: courts can strike down a law or an executive action if it violates the Constitution.", "Article 32 lets a citizen go directly to the Supreme Court to protect Fundamental Rights. Dr. Ambedkar called it the 'heart and soul' of the Constitution.", "The Supreme Court can review its own judgment under Article 137."]
      },
      {
        type: "table",
        headers: ["Organ", "Main job", "Key check on others"],
        rows: [
          ["Parliament", "Makes laws", "Can impeach the President and remove judges; passes the budget"],
          ["Executive", "Runs the country, carries out laws", "President appoints judges; can issue ordinances when Parliament is not in session"],
          ["Judiciary", "Interprets laws, settles disputes", "Judicial review can cancel unconstitutional laws and actions"]
        ]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common trap: Do not confuse the two houses' presiding officers. The Speaker heads the Lok Sabha. The Vice-President is the ex-officio Chairman of the Rajya Sabha. Also, only the Speaker certifies a Money Bill — the Chairman does not."
      },
      {
        type: "para",
        text: "Together, these three organs create a system of checks and balances. Parliament can remove ministers and even the President through set procedures. The Executive appoints judges. The Judiciary can cancel laws that break the Constitution. This balance is why no single organ can become all-powerful, and it is a favourite area for Prelims questions."
      },
      {
        type: "quiz",
        question: "Under the Constitution, which of the following is TRUE about a Money Bill?",
        options: ["It can be introduced in either the Lok Sabha or the Rajya Sabha", "It can be introduced only in the Rajya Sabha", "It can be introduced only in the Lok Sabha, and the Rajya Sabha must return it within 14 days", "The President certifies whether a bill is a Money Bill"],
        correct: 2,
        explain: "A Money Bill (Article 110) can be introduced only in the Lok Sabha. The Rajya Sabha can merely recommend changes and must return it within 14 days; the Lok Sabha may accept or reject those recommendations. It is the Speaker of the Lok Sabha, not the President, who certifies a bill as a Money Bill."
      }
    ]
  },
  {
    slug: "upsc-indian-freedom-struggle",
    title: "The Indian Freedom Struggle — Key Movements, Dates and Leaders Made Simple",
    summary: "Learn the three phases of India's freedom struggle and the key movements, dates, and leaders most tested in UPSC Prelims.",
    examSlug: "upsc",
    subjectSlug: "modern-indian-history",
    chapterSlug: "freedom-struggle",
    readingMinutes: 8,
    practiceTestSlug: "upsc-freedom-struggle-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "A relay race, not a single sprint",
        text: "Think of India's freedom struggle as a long relay race. No single runner won it. One group carried the baton for a while, then passed it to the next, each running faster than the one before. The early runners (the Moderates) asked politely for reform. The next runners (the Extremists) demanded rights. Then came the mass runners under Gandhi, who pulled millions of ordinary people onto the track. For UPSC Prelims, your job is to remember who ran which leg, and when."
      },
      {
        type: "para",
        text: "The modern freedom struggle is usually studied in three phases. The Moderate phase (1885 to 1905) worked through petitions and prayers. The Extremist or Assertive phase (1905 to 1919) demanded Swaraj and used boycott. The Gandhian or Mass phase (1919 to 1947) turned the movement into a nationwide people's struggle. Prelims loves asking which event or leader belongs to which phase, so keep the phases clear in your mind."
      },
      {
        type: "heading",
        text: "The beginning: 1857 and the birth of the Congress"
      },
      {
        type: "para",
        text: "The Revolt of 1857 (called the First War of Independence by some and a sepoy mutiny by the British) was the first big armed challenge to Company rule. It failed, but it ended the East India Company's rule. After it, India came under the direct rule of the British Crown through the Government of India Act, 1858. In 1885, A.O. Hume, a retired British civil servant, helped found the Indian National Congress. Its first session was held in Bombay and W.C. Bonnerjee was its first president."
      },
      {
        type: "heading",
        text: "Swadeshi and the Extremist turn (1905 onward)"
      },
      {
        type: "para",
        text: "In 1905, Viceroy Lord Curzon partitioned Bengal. Indians saw this as a 'divide and rule' trick, and it triggered the Swadeshi Movement, a boycott of British goods and use of Indian-made goods. This phase produced the famous trio of leaders known as Lal-Bal-Pal: Lala Lajpat Rai, Bal Gangadhar Tilak, and Bipin Chandra Pal. Tilak's slogan, 'Swaraj is my birthright and I shall have it,' captured the new mood. In 1906, the All-India Muslim League was founded. In 1907, the Congress split into Moderates and Extremists at the Surat Session."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Memory hook: 'Lal-Bal-Pal' = Lala Lajpat Rai, Bal Gangadhar Tilak, Bipin Chandra Pal. All three were Extremists (Assertive nationalists) of the Swadeshi era."
      },
      {
        type: "heading",
        text: "The Gandhian era: the mass movements"
      },
      {
        type: "para",
        text: "Mahatma Gandhi returned to India from South Africa in 1915. His method was Satyagraha, meaning non-violent insistence on truth. He first tested it in local struggles at Champaran (indigo farmers, Bihar) and Kheda (peasants, Gujarat) and among Ahmedabad mill workers. Then came the Rowlatt Act of 1919, which allowed detention without trial. Protests against it led to the Jallianwala Bagh massacre in Amritsar on 13 April 1919, where General Dyer ordered troops to fire on an unarmed crowd. This turned millions against British rule."
      },
      {
        type: "table",
        headers: ["Movement", "Year(s)", "Key trigger / feature", "Why it ended / note"],
        rows: [
          ["Non-Cooperation Movement", "1920–1922", "Boycott of schools, courts, titles; linked with Khilafat", "Withdrawn after Chauri Chaura violence (Feb 1922)"],
          ["Civil Disobedience Movement", "1930–1934", "Began with Dandi Salt March; breaking the salt law", "Paused by Gandhi–Irwin Pact (1931)"],
          ["Quit India Movement", "1942", "'Do or Die' call; demand for immediate British exit", "Leaders jailed; largely spontaneous, suppressed"]
        ]
      },
      {
        type: "steps",
        title: "The Salt Satyagraha (Dandi March), 1930",
        items: ["Gandhi began the march on 12 March 1930 from Sabarmati Ashram near Ahmedabad.", "He walked about 240 miles (around 385 km) to the coastal village of Dandi.", "On 6 April 1930, he broke the salt law by making salt from seawater.", "This launched the nationwide Civil Disobedience Movement."]
      },
      {
        type: "example",
        title: "Key sessions and declarations",
        lines: ["1916 – Lucknow Pact: Congress and Muslim League agreed to work together.", "1928 – Nehru Report: proposed dominion status, drafted by a committee under Motilal Nehru.", "1929 – Lahore Session: Congress adopted the goal of Purna Swaraj (complete independence); Jawaharlal Nehru presided.", "26 January 1930 – observed as the first Independence Day (later chosen as Republic Day in 1950)."]
      },
      {
        type: "keypoints",
        title: "Must-remember facts for Prelims",
        items: ["INC founded 1885; A.O. Hume its founder, W.C. Bonnerjee first president.", "Partition of Bengal (1905) sparked the Swadeshi Movement; annulled in 1911.", "Jallianwala Bagh massacre: 13 April 1919, Amritsar.", "Non-Cooperation (1920) withdrawn after Chauri Chaura incident (1922).", "Simon Commission (1927) had no Indian member, so it was boycotted ('Simon Go Back').", "Purna Swaraj resolution passed at Lahore, 1929.", "Quit India Movement launched on 8 August 1942 in Bombay.", "India became independent on 15 August 1947."]
      },
      {
        type: "para",
        text: "Two more threads complete the picture. The revolutionary nationalists, such as Bhagat Singh, Chandra Shekhar Azad, and later Subhas Chandra Bose (who led the Indian National Army, INA), chose a more militant path. And the constitutional track moved through the Government of India Act, 1935, the Cabinet Mission of 1946, and finally the Indian Independence Act, 1947, which partitioned British India into India and Pakistan."
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common trap: Do not confuse the movements. Non-Cooperation (1920) was withdrawn after Chauri Chaura. Civil Disobedience (1930) started with the Salt March. Quit India (1942) used the slogan 'Do or Die'. Mixing up these years and slogans is the single most common Prelims mistake."
      },
      {
        type: "quiz",
        question: "The Non-Cooperation Movement was withdrawn by Mahatma Gandhi mainly because of which event?",
        options: ["The Jallianwala Bagh massacre", "The Chauri Chaura incident", "The arrest of Bhagat Singh", "The Simon Commission's visit"],
        correct: 1,
        explain: "Gandhi called off the Non-Cooperation Movement in February 1922 after a mob at Chauri Chaura (in present-day Uttar Pradesh) set fire to a police station, killing policemen. Gandhi believed the movement had turned violent, which went against his principle of non-violence. The Jallianwala Bagh massacre (1919) came before the movement, not after."
      }
    ]
  },
  {
    slug: "upsc-governor-generals-colonial-reforms",
    title: "Governor-Generals & Colonial Reforms — From Warren Hastings to Canning, Made Simple",
    summary: "Learn the key Governor-Generals, their reforms, and the Charter Acts that turned Company rule into Crown rule in colonial India.",
    examSlug: "upsc",
    subjectSlug: "modern-indian-history",
    chapterSlug: "governor-generals-reforms",
    readingMinutes: 7,
    practiceTestSlug: "upsc-governor-generals-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of British rule in India like a company slowly turning into a government. At the top sat one powerful officer whose title kept changing: first \"Governor-General of Bengal\", then \"Governor-General of India\", and finally \"Viceroy\". Each name change was actually a law passed in London that gave this officer more power over all of India. If you learn the men and the reforms together, this whole chapter becomes one clear story instead of a list to cram."
      },
      {
        type: "heading",
        text: "The three job titles (and the laws behind them)"
      },
      {
        type: "para",
        text: "The same top chair got a bigger name each time a new British law was passed. The Regulating Act of 1773 created the \"Governor-General of Bengal\". The Charter Act of 1833 upgraded the post to \"Governor-General of India\" — now he controlled the whole country. After the Revolt of 1857, the Government of India Act of 1858 ended Company rule; the Crown took over and the officer was also called \"Viceroy\", the direct representative of the British monarch."
      },
      {
        type: "table",
        headers: ["Title", "Created by", "First to hold it"],
        rows: [
          ["Governor-General of Bengal", "Regulating Act, 1773", "Warren Hastings"],
          ["Governor-General of India", "Charter Act, 1833", "Lord William Bentinck"],
          ["Viceroy (+ Governor-General)", "Government of India Act, 1858", "Lord Canning"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Warren Hastings was the FIRST Governor-General of Bengal. Bentinck was the FIRST Governor-General of India. Canning was the LAST Governor-General and the FIRST Viceroy. Examiners love these three \"firsts\"."
      },
      {
        type: "heading",
        text: "Key Governor-Generals and what each is famous for"
      },
      {
        type: "table",
        headers: ["Governor-General", "Tenure", "Remember for"],
        rows: [
          ["Warren Hastings", "1774-1785", "First GG of Bengal; the Asiatic Society of Bengal was founded (1784) under his patronage"],
          ["Lord Cornwallis", "1786-1793", "Permanent Settlement (1793); reformed Civil Service — 'Father of Civil Service in India'"],
          ["Lord Wellesley", "1798-1805", "Introduced the Subsidiary Alliance system"],
          ["Lord William Bentinck", "1828-1835", "First GG of India; abolished Sati (1829); English education"],
          ["Lord Dalhousie", "1848-1856", "Doctrine of Lapse; first railway (1853); telegraph"],
          ["Lord Canning", "1856-1862", "Revolt of 1857; last GG and first Viceroy"]
        ]
      },
      {
        type: "keypoints",
        title: "Must-remember reforms by each ruler",
        items: ["Cornwallis (1793): Permanent Settlement fixed land revenue with zamindars forever; he also separated revenue and judicial work and started a professional Civil Service.", "Wellesley (1798): Subsidiary Alliance — Indian rulers kept British troops, paid for them, and lost their foreign policy. The Nizam of Hyderabad was the first to accept it, in 1798.", "Bentinck (1829): Abolished Sati (the burning of widows), supported by Raja Ram Mohan Roy; he also acted against Thuggee.", "Dalhousie (1848-56): Doctrine of Lapse annexed states like Satara, Jhansi and Nagpur; he opened India's first passenger railway (Bombay to Thane, 1853)."]
      },
      {
        type: "analogy",
        title: "Subsidiary Alliance = a protection deal",
        text: "Imagine a shopkeeper who is told: 'Keep our security guards inside your shop, pay their full salary, and never talk to any other security company.' The shop looks independent, but the guards really control it. That is the Subsidiary Alliance — the Indian ruler paid for British troops and slowly lost real power without a single battle."
      },
      {
        type: "heading",
        text: "The Charter Acts — how power shifted step by step"
      },
      {
        type: "steps",
        title: "Follow the money and the power",
        items: ["Charter Act 1813: Ended the East India Company's trade monopoly in India (but it kept the monopoly on tea and trade with China); also set aside money for education.", "Charter Act 1833: Made the Governor-General of Bengal the Governor-General of India; the Company stopped trading and became a purely administrative body.", "Charter Act 1853: Introduced open competition for the Civil Services, so Indians could, in principle, appear for the exam.", "Government of India Act 1858: Abolished the Company; power passed to the British Crown, and a Secretary of State for India was created in London."]
      },
      {
        type: "example",
        title: "One state, one policy: Dalhousie and Awadh",
        lines: ["Doctrine of Lapse: if a ruler died without a natural male heir, the British refused to accept an adopted heir and annexed the state.", "Using this, Dalhousie annexed Satara (1848), then Jhansi and Nagpur.", "Awadh (Oudh) was different — it was annexed in 1856 on the excuse of 'misgovernance', not lapse.", "These annexations spread anger that helped spark the Revolt of 1857."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Do not mix up the two land systems. Permanent Settlement (Cornwallis, 1793) used zamindars in Bengal, Bihar and Odisha. The Ryotwari system (linked to Thomas Munro in Madras) collected revenue directly from the farmer (ryot). They are different systems."
      },
      {
        type: "keypoints",
        title: "Quick revision anchors",
        items: ["1773 Regulating Act -> Warren Hastings, first GG of Bengal.", "1793 Permanent Settlement -> Cornwallis.", "1798 Subsidiary Alliance -> Wellesley (Hyderabad first).", "1829 Sati abolished -> Bentinck.", "1833 Charter Act -> Bentinck becomes first GG of India.", "1853 first railway + Doctrine of Lapse -> Dalhousie.", "1858 Crown rule begins -> Canning, first Viceroy."]
      },
      {
        type: "quiz",
        question: "Who became the first Governor-General of India after the Charter Act of 1833?",
        options: ["Warren Hastings", "Lord Cornwallis", "Lord William Bentinck", "Lord Canning"],
        correct: 2,
        explain: "The Charter Act of 1833 upgraded the post from 'Governor-General of Bengal' to 'Governor-General of India', and Lord William Bentinck was the first to hold this new title. Warren Hastings was the first Governor-General of Bengal (1774), and Lord Canning was the last Governor-General and the first Viceroy (1858)."
      }
    ]
  },
  {
    slug: "upsc-physical-geography-india",
    title: "Physical Geography of India — Location, Landforms and Rivers Made Simple",
    summary: "Learn India's location, its six physical divisions, the Himalayas, plateaus and river systems with the exact facts UPSC Prelims tests.",
    examSlug: "upsc",
    subjectSlug: "geography",
    chapterSlug: "physical-geography-india",
    readingMinutes: 8,
    practiceTestSlug: "upsc-physical-geography-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "India as a three-storey house",
        text: "Picture India as a house with three floors built at different times. The oldest floor is the hard Peninsular Plateau in the south. On top of it, nature spread a flat carpet of soil, the Northern Plains. And standing guard at the north is a tall young wall, the Himalayas. If you remember these three parts and how each was formed, most of Physical Geography of India starts to make sense."
      },
      {
        type: "para",
        text: "Physical Geography of India is about the land itself: where India sits on the globe, how it is shaped, its mountains, plains, plateaus, rivers, coasts and islands. For UPSC Prelims you must know names, directions and a few key numbers. This explainer teaches the durable facts you can rely on in the exam."
      },
      {
        type: "heading",
        text: "1. Location and Extent"
      },
      {
        type: "keypoints",
        title: "Fix these numbers in your memory",
        items: ["India lies between latitudes 8°4'N and 37°6'N, and longitudes 68°7'E and 97°25'E.", "The Tropic of Cancer (about 23.5°N) divides India almost into two halves and passes through 8 states.", "India's Standard Meridian is 82°30'E, passing through Mirzapur near Prayagraj in Uttar Pradesh. Indian Standard Time (IST) is 5 hours 30 minutes ahead of GMT.", "India is the 7th largest country in the world by area, covering about 3.28 million sq km (about 2.4% of world land area)."]
      },
      {
        type: "example",
        title: "The 8 states the Tropic of Cancer passes through",
        lines: ["From west to east: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.", "A common memory hook: 'Ganga Ram Made Chennai Journey West To Mizoram' (first letters).", "Note: it does NOT pass through Maharashtra or Odisha, a favourite trap in exams."]
      },
      {
        type: "heading",
        text: "2. The Physiographic Divisions"
      },
      {
        type: "para",
        text: "Geographers divide India into six major physical (physiographic) divisions. Learn them as a list, because Prelims often asks you to match a feature to its division."
      },
      {
        type: "steps",
        title: "The six physiographic divisions of India",
        items: ["The Northern and North-Eastern Mountains (the Himalayas).", "The Northern Plains (Indo-Gangetic-Brahmaputra plains).", "The Peninsular Plateau (the oldest landmass).", "The Indian Desert (the Thar, in the west).", "The Coastal Plains (western and eastern coasts).", "The Islands (Andaman & Nicobar in the Bay of Bengal, Lakshadweep in the Arabian Sea)."]
      },
      {
        type: "heading",
        text: "3. The Himalayas — a young fold wall"
      },
      {
        type: "para",
        text: "The Himalayas are young fold mountains, formed when the Indian plate pushed into the Eurasian plate. They are still rising slowly. Learn them in two ways: from south to north (by height) and from west to east (by region)."
      },
      {
        type: "table",
        headers: ["Range (south to north)", "Also called", "Key point"],
        rows: [
          ["Shiwaliks", "Outer Himalayas", "Lowest; longitudinal valleys called 'Duns' (e.g. Dehra Dun)"],
          ["Lesser Himalayas", "Himachal", "Famous hill stations: Shimla, Mussoorie, Nainital"],
          ["Greater Himalayas", "Himadri", "Highest and continuous; holds the tallest peaks and glaciers"],
          ["Trans-Himalayas", "Tibetan/Karakoram side", "North of Himadri; includes the Karakoram range"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Kanchenjunga (about 8,586 m, in Sikkim) is the highest peak located within India. Mount Everest is the world's highest but lies in Nepal; K2 (Godwin-Austen) is in the Karakoram in the Pakistan-administered region. Do not confuse 'highest in the world' with 'highest in India'."
      },
      {
        type: "para",
        text: "From west to east, the Himalayas are divided by rivers into: Punjab (Kashmir) Himalayas, Kumaon Himalayas, Nepal Himalayas, and Assam Himalayas. The Eastern hills and mountains (Purvachal) — such as the Patkai, Naga, Manipur and Mizo hills — curve southward along India's eastern border."
      },
      {
        type: "heading",
        text: "4. Northern Plains and the Peninsular Plateau"
      },
      {
        type: "keypoints",
        title: "Northern Plains — a young carpet of soil",
        items: ["Formed by alluvium (river-deposited soil) from the Indus, Ganga and Brahmaputra systems. Very fertile, densely populated.", "Bhabar: a narrow belt of pebbles at the foot of the hills where streams disappear underground.", "Terai: the marshy, re-emerged water belt just south of the Bhabar.", "Bhangar: older alluvium, slightly raised, less fertile. Khadar: newer alluvium of flood plains, most fertile."]
      },
      {
        type: "para",
        text: "The Peninsular Plateau is the oldest and most stable part of India, made of hard igneous and metamorphic rock, and was once part of the ancient landmass Gondwana. Its two broad parts are the Central Highlands (north of the Narmada) and the Deccan Plateau (south of the Narmada). It is bordered by the Western Ghats and the Eastern Ghats."
      },
      {
        type: "table",
        headers: ["Feature", "Western Ghats (Sahyadri)", "Eastern Ghats"],
        rows: [
          ["Continuity", "Continuous, can be crossed only through passes", "Broken and discontinuous, cut by rivers"],
          ["Height", "Higher (average about 900-1600 m)", "Lower (average about 600 m)"],
          ["Highest peak", "Anamudi (about 2,695 m), in Kerala", "Jindhagada Peak / Arma Konda (about 1,690 m), Andhra Pradesh; much lower"],
          ["Rainfall", "Cause heavy rain on the windward (west) side", "Drier"]
        ]
      },
      {
        type: "heading",
        text: "5. The River Systems"
      },
      {
        type: "para",
        text: "India's rivers fall into two families. Himalayan rivers are perennial (they flow all year) because they are fed by both rain and melting snow, and they often make large deltas. Peninsular rivers are mostly rain-fed and seasonal, and flow in fixed, older valleys."
      },
      {
        type: "callout",
        tone: "info",
        text: "Direction rule for peninsular rivers: MOST flow east into the Bay of Bengal and form deltas — Mahanadi, Godavari, Krishna, Kaveri. The exceptions are the Narmada and Tapi, which flow WEST through rift valleys into the Arabian Sea and form estuaries, not deltas."
      },
      {
        type: "keypoints",
        title: "River facts worth memorising",
        items: ["The three great Himalayan systems are the Indus, the Ganga and the Brahmaputra.", "The Godavari is the largest peninsular river and is nicknamed the 'Dakshin Ganga' (Ganga of the South).", "The Brahmaputra is called the Tsangpo in Tibet and the Jamuna in Bangladesh (do not confuse this with the Yamuna).", "The Narmada and Tapi flow west in rift valleys (down-dropped land between faults) — a classic Prelims point."]
      },
      {
        type: "analogy",
        title: "Why peninsular rivers don't wander",
        text: "Think of the old Peninsular Plateau as dried, hardened clay and the Northern Plains as fresh soft mud. A stick dragged through hard clay stays in its groove — that is why peninsular rivers keep to fixed valleys and don't change course much. A stick in soft mud slides around easily — that is why Himalayan rivers on the young plains keep shifting, flooding and building big deltas."
      },
      {
        type: "callout",
        tone: "warn",
        text: "Exam trap: do not mix up 'oldest' and 'highest'. The Peninsular Plateau is the OLDEST landmass but is low and worn down. The Himalayas are the YOUNGEST but the tallest. Age and height are opposite here."
      },
      {
        type: "quiz",
        question: "Which pair of Indian rivers flows westward through rift valleys into the Arabian Sea?",
        options: ["Godavari and Krishna", "Narmada and Tapi", "Mahanadi and Kaveri", "Ganga and Yamuna"],
        correct: 1,
        explain: "The Narmada and the Tapi are the two major peninsular rivers that flow WEST through rift valleys and drain into the Arabian Sea, forming estuaries. Almost all other major peninsular rivers (Mahanadi, Godavari, Krishna, Kaveri) flow east into the Bay of Bengal and form deltas."
      }
    ]
  },
  {
    slug: "upsc-indian-climate-rivers-monsoon",
    title: "Indian Climate, Rivers & Monsoon — UPSC Geography Made Simple",
    summary: "Learn how India's monsoon works, why the summer winds reverse and split into two branches, what El Niño and IOD do to the rain, and how the Himalayan and Peninsular river families differ.",
    examSlug: "upsc",
    subjectSlug: "geography",
    chapterSlug: "climate-rivers",
    readingMinutes: 8,
    practiceTestSlug: "upsc-climate-rivers-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of India as a house with a giant air conditioner that switches on only for a few months each year. For most of the year the land is dry. Then, around June, moist ocean winds rush in and it rains almost everywhere. This seasonal switch is the monsoon, and it shapes India's farming, rivers, and daily life. In this lesson you will learn how India's climate works, what drives the monsoon, and how the two great river families flow."
      },
      {
        type: "heading",
        text: "India's Climate: One Word — Monsoon"
      },
      {
        type: "para",
        text: "India has a tropical monsoon climate. The word \"monsoon\" comes from the Arabic word \"mausim\", meaning season. The key idea is a seasonal reversal of winds: in summer, winds blow from sea to land bringing rain; in winter, winds blow from land to sea and are dry. This reversal happens because land heats and cools faster than the ocean."
      },
      {
        type: "analogy",
        title: "Why the wind reverses",
        text: "Sand at a beach gets hot fast in the day and cools fast at night, but the sea stays steady. In summer, India's land heats up and the hot air rises, leaving low pressure. Cooler, wetter air from the ocean rushes in to fill the gap — that is the rain-bringing summer monsoon. In winter the land is colder than the sea, so the wind blows the other way, out to sea, staying dry."
      },
      {
        type: "heading",
        text: "The Four Seasons of India"
      },
      {
        type: "table",
        headers: ["Season", "Months", "What happens"],
        rows: [
          ["Winter (Cold weather)", "December–February", "Clear dry skies; western disturbances bring rain/snow to NW India"],
          ["Summer (Hot weather)", "March–May", "Very hot; dry winds called 'Loo' in the north; local storms"],
          ["Southwest Monsoon (Rainy)", "June–September", "Main rainy season; brings about 75% of India's yearly rain"],
          ["Retreating Monsoon (Post-monsoon)", "October–November", "Monsoon withdraws; rain to Tamil Nadu and the Coromandel coast"]
        ]
      },
      {
        type: "heading",
        text: "The Southwest Monsoon: Two Branches"
      },
      {
        type: "para",
        text: "When the summer monsoon arrives (\"onset\") over Kerala around the 1st of June, it splits into two arms because of India's shape. Understanding these two branches explains why some places get flooded and others stay dry."
      },
      {
        type: "steps",
        title: "How the two branches work",
        items: ["The Arabian Sea branch hits the Western Ghats, rises, and dumps heavy rain on the west coast (Kerala, Konkan). The dry side (rain shadow) east of the Ghats gets little rain.", "The Bay of Bengal branch moves up the bay and is turned by the Himalayas towards the northwest, watering the Ganga plains.", "Mawsynram and Cherrapunji in Meghalaya get the heaviest rain because hills funnel and lift the moist Bay branch.", "Both branches meet over the northwest, and the monsoon slowly covers the whole country by mid-July."]
      },
      {
        type: "callout",
        tone: "info",
        text: "Rain shadow: when air rises over a mountain it loses its moisture on the windward side. The far (leeward) side stays dry. This is why places just east of the Western Ghats, like parts of interior Karnataka, are dry."
      },
      {
        type: "heading",
        text: "Global Controls: El Niño, La Niña and IOD"
      },
      {
        type: "para",
        text: "The monsoon is not the same strength every year. Some faraway ocean patterns can weaken or strengthen it. These are favourite Prelims topics, so learn the direction of the effect."
      },
      {
        type: "keypoints",
        title: "Factors that affect monsoon strength",
        items: ["El Niño (warm central/eastern Pacific Ocean) is usually linked to a weaker Indian monsoon and drought risk.", "La Niña (cooler Pacific) is usually linked to a stronger, wetter monsoon.", "Indian Ocean Dipole (IOD): a positive IOD (warm western Indian Ocean) generally helps the monsoon; a negative IOD can weaken it.", "Jet streams matter: the subtropical westerly jet retreats and the tropical easterly jet sets up to help monsoon onset.", "The ITCZ (a low-pressure rain belt near the equator) shifting north over India helps pull in the monsoon winds."]
      },
      {
        type: "heading",
        text: "Local Winds and Special Rains"
      },
      {
        type: "table",
        headers: ["Name", "Where", "What it is"],
        rows: [
          ["Loo", "North India plains", "Hot, dry, strong daytime wind in May–June"],
          ["Mango showers", "Kerala & Karnataka", "Pre-monsoon rain that helps ripen mangoes"],
          ["Kalbaisakhi / Nor'westers", "West Bengal, Assam", "Violent evening thunderstorms before the monsoon"],
          ["Western disturbances", "NW India (Punjab, J&K)", "Winter rain/snow from storms coming from the Mediterranean"]
        ]
      },
      {
        type: "heading",
        text: "The Rivers: Two Families"
      },
      {
        type: "para",
        text: "India's rivers fall into two big groups. Himalayan rivers are fed by both rain and melting snow, so they flow all year (perennial). Peninsular rivers depend mostly on the monsoon rain, so they shrink a lot in the dry season (seasonal). Knowing this split, and each river's source, is heavily tested."
      },
      {
        type: "table",
        headers: ["Feature", "Himalayan rivers", "Peninsular rivers"],
        rows: [
          ["Water source", "Rain + snowmelt (perennial)", "Mostly rain (seasonal)"],
          ["Examples", "Indus, Ganga, Brahmaputra", "Godavari, Krishna, Cauvery, Mahanadi, Narmada, Tapi"],
          ["River course", "Long, with big meanders and deltas", "Shorter, fixed valleys"],
          ["Age of valley", "Young, still cutting deep gorges", "Old, mature, shallow valleys"]
        ]
      },
      {
        type: "keypoints",
        title: "Must-remember river facts",
        items: ["The Indus, Ganga and Brahmaputra all rise in the Himalayan region near Tibet; the Brahmaputra is called the Tsangpo in Tibet.", "The Ganga is formed at Devprayag where the Bhagirathi (from Gangotri) meets the Alaknanda; the Yamuna is its longest tributary.", "The Godavari is the largest peninsular river and is called the 'Dakshina Ganga' (Ganga of the South); it rises near Trimbak in Nashik, Maharashtra.", "Most peninsular rivers flow east into the Bay of Bengal and form deltas.", "The Narmada and the Tapi are the main exceptions: they flow west into the Arabian Sea through rift valleys and form estuaries, not deltas."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Exam memory hook: 'West-flowing rivers make estuaries, east-flowing rivers make deltas.' The two big west-flowing peninsular rivers are Narmada and Tapi — remember them as the odd pair."
      },
      {
        type: "quiz",
        question: "Which single statement is correct for UPSC Prelims?",
        options: ["The Narmada and Tapi flow east and form large deltas", "El Niño years are usually linked to a stronger Indian monsoon", "The Godavari is the largest peninsular river and flows east into the Bay of Bengal", "The southwest monsoon withdraws from India in June"],
        correct: 2,
        explain: "The Godavari is the largest peninsular river, flows east, and is called the Dakshina Ganga. Narmada and Tapi flow WEST and form estuaries (not deltas). El Niño usually WEAKENS the monsoon. The southwest monsoon ARRIVES (not withdraws) around June; it retreats in October–November."
      }
    ]
  },
  {
    slug: "upsc-basic-economic-concepts",
    title: "Basic Economic Concepts for UPSC Prelims — Scarcity, Factors, Sectors and GDP Made Simple",
    summary: "Learn the core ideas of economics tested in UPSC Prelims: scarcity, opportunity cost, factors of production, economic sectors, GDP/GNP, and economic systems.",
    examSlug: "upsc",
    subjectSlug: "indian-economy",
    chapterSlug: "economic-concepts",
    readingMinutes: 7,
    practiceTestSlug: "upsc-economic-concepts-practice-1",
    blocks: [
      {
        type: "para",
        text: "Every day you make choices with limited money, time, and energy. You cannot buy everything, so you pick what matters most. Economics is simply the study of how people and countries make these choices when they cannot have it all. This chapter builds the base vocabulary that UPSC uses in almost every economy question."
      },
      {
        type: "analogy",
        title: "The tiffin box",
        text: "Think of your resources like a small tiffin box. It can hold only so much food. If you fill it with rice, there is less room for vegetables. Choosing more of one thing always means giving up some of another. This 'giving up' is the heart of economics."
      },
      {
        type: "heading",
        text: "Scarcity and Opportunity Cost"
      },
      {
        type: "para",
        text: "Scarcity means our wants are unlimited but resources are limited. Because of scarcity, we must choose. Opportunity cost is the value of the next best option you give up when you make a choice. If a farmer uses land to grow wheat instead of sugarcane, the sugarcane he could have grown is his opportunity cost."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Opportunity cost is not money spent. It is the best alternative you sacrificed. Every choice has one, even 'free' things like your study time."
      },
      {
        type: "heading",
        text: "The Four Factors of Production"
      },
      {
        type: "para",
        text: "To produce any good or service, a country uses four resources called factors of production. Each factor earns a reward when it is used."
      },
      {
        type: "table",
        headers: ["Factor", "Simple meaning", "Its reward"],
        rows: [
          ["Land", "Natural resources: soil, water, minerals", "Rent"],
          ["Labour", "Human physical and mental effort", "Wages"],
          ["Capital", "Machines, tools, money used to produce", "Interest"],
          ["Entrepreneurship", "The person who organises and takes risk", "Profit"]
        ]
      },
      {
        type: "heading",
        text: "The Three (and Fourth) Sectors of the Economy"
      },
      {
        type: "para",
        text: "Economists group all economic activity into sectors based on what kind of work is done. UPSC often asks which sector an activity belongs to."
      },
      {
        type: "keypoints",
        title: "Know the sectors",
        items: ["Primary sector: gets products directly from nature - farming, fishing, mining, forestry.", "Secondary sector: turns raw materials into finished goods - manufacturing, construction, factories.", "Tertiary sector: provides services, not goods - banking, transport, teaching, trade.", "Quaternary sector: knowledge-based services like IT, research and education (a modern addition some economists use)."]
      },
      {
        type: "heading",
        text: "Micro vs Macro Economics"
      },
      {
        type: "para",
        text: "Microeconomics studies small, individual units - a single consumer, one firm, or the price of one good. Macroeconomics studies the whole economy together - total output, national income, inflation, and unemployment. A useful memory hook: 'micro' looks at a tree, 'macro' looks at the whole forest."
      },
      {
        type: "heading",
        text: "Measuring the Economy: GDP and Its Family"
      },
      {
        type: "para",
        text: "To measure how much an economy produces, we use national income terms. Learn them as one connected family, not as separate items. 'Domestic' means inside the country's borders; 'National' means by the country's residents, including their income earned abroad."
      },
      {
        type: "steps",
        title: "Build the terms step by step",
        items: ["GDP = value of all final goods and services produced inside the country in a year.", "GNP = GDP + Net Factor Income from Abroad (income residents earn abroad minus income foreigners earn in India).", "NNP = GNP - Depreciation (the wear and tear of machines).", "National Income = NNP at factor cost, the standard measure of a nation's income."]
      },
      {
        type: "example",
        title: "Market price vs factor cost",
        lines: ["Market price is what you pay in the shop.", "Factor cost is what the producer actually receives.", "Factor cost = Market price - Indirect taxes + Subsidies.", "Example: a good sells for Rs 100 including Rs 18 tax and no subsidy; the factor cost the producer gets is Rs 82."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Do not mix them up: NDP = GDP - Depreciation, while NNP = GNP - Depreciation. The only difference is Domestic vs National (whether net foreign income is included)."
      },
      {
        type: "heading",
        text: "Types of Economic Systems"
      },
      {
        type: "para",
        text: "How a country decides what to produce and for whom defines its economic system. A market economy lets prices and private choice decide (like the USA). A planned or command economy lets the government decide (like the former USSR). A mixed economy blends both - India follows a mixed economy where private business and government both play a role."
      },
      {
        type: "keypoints",
        title: "Must-remember basics",
        items: ["Scarcity forces choice; every choice carries an opportunity cost.", "Four factors: Land-Rent, Labour-Wages, Capital-Interest, Entrepreneur-Profit.", "Primary = nature, Secondary = making goods, Tertiary = services.", "GDP is domestic output; add net foreign income to get GNP.", "Subtract depreciation to move from 'Gross' to 'Net'.", "India is a mixed economy."]
      },
      {
        type: "quiz",
        question: "In national income accounting, how is Gross National Product (GNP) obtained from Gross Domestic Product (GDP)?",
        options: ["GNP = GDP - Depreciation", "GNP = GDP + Net Factor Income from Abroad", "GNP = GDP + Indirect Taxes", "GNP = GDP - Subsidies"],
        correct: 1,
        explain: "GNP adds Net Factor Income from Abroad (income residents earn abroad minus income foreigners earn domestically) to GDP. Subtracting depreciation from GDP gives NDP, and from GNP gives NNP - so option A is wrong."
      }
    ]
  },
  {
    slug: "upsc-banking-money-fiscal-policy",
    title: "Banking, Money & Fiscal Policy — RBI Tools, MPC & Deficits Made Simple",
    summary: "Learn how RBI's monetary policy (repo rate, CRR, SLR, MPC) and the government's fiscal policy (deficits, FRBM) steer India's economy, as tested in UPSC Prelims.",
    examSlug: "upsc",
    subjectSlug: "indian-economy",
    chapterSlug: "banking-fiscal-policy",
    readingMinutes: 8,
    practiceTestSlug: "upsc-banking-fiscal-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of the Indian economy like a car on a highway. Money is the fuel, and someone has to control the speed. Press too hard and it overheats (high inflation). Go too slow and it stalls (recession, no jobs). Two different drivers share the controls: the Reserve Bank of India (RBI) handles monetary policy, and the Government handles fiscal policy. This chapter teaches you how each one steers, and the exact tools they use."
      },
      {
        type: "heading",
        text: "Two drivers, two toolkits"
      },
      {
        type: "para",
        text: "First, get this basic split clear, because UPSC loves to test it. Monetary policy is about the supply and cost of money in the economy. It is run by the RBI. Fiscal policy is about the government's taxes and spending. It is run by the Ministry of Finance (the Union Budget). Do not mix them up."
      },
      {
        type: "table",
        headers: ["Point", "Monetary Policy", "Fiscal Policy"],
        rows: [
          ["Who runs it", "RBI (central bank)", "Government (Ministry of Finance)"],
          ["Main tools", "Repo rate, CRR, SLR, OMO", "Taxes and public spending"],
          ["Shown in", "RBI policy statements", "Union Budget"],
          ["Main goal", "Control inflation, ensure growth", "Growth, jobs, redistribution"]
        ]
      },
      {
        type: "heading",
        text: "The RBI: India's central bank"
      },
      {
        type: "para",
        text: "The RBI was established in 1935 on the recommendation of the Hilton Young Commission (the Royal Commission on Indian Currency and Finance). It was nationalised in 1949, so it is now owned by the government. The RBI is the banker to the government, the banker to other banks, the issuer of currency notes (except the one-rupee note and coins, which the Ministry of Finance issues), and the manager of monetary policy."
      },
      {
        type: "heading",
        text: "How RBI controls money: the key rates"
      },
      {
        type: "keypoints",
        title: "The tools every aspirant must know",
        items: ["Repo rate: the rate at which RBI lends short-term money to banks against government securities. Raise it and loans become costlier, slowing the economy.", "Reverse repo rate: the rate at which RBI borrows from banks (absorbs extra money).", "CRR (Cash Reserve Ratio): the share of a bank's deposits it must keep with the RBI as cash. RBI pays no interest on it.", "SLR (Statutory Liquidity Ratio): the share of deposits a bank must keep in safe liquid assets like cash, gold, or government securities, held by the bank itself.", "MSF (Marginal Standing Facility): an emergency window where banks borrow overnight from RBI, at a rate slightly above the repo rate.", "OMO (Open Market Operations): RBI buys or sells government securities in the market to add or remove money."]
      },
      {
        type: "analogy",
        title: "CRR vs SLR made simple",
        text: "Imagine a bank must keep some savings aside for safety. CRR is the part it must park with the RBI as pure cash (like money locked in the RBI's vault). SLR is the part it keeps with itself but only in safe forms like cash, gold, or government bonds. CRR earns no interest; SLR assets can. Both reduce how much the bank can lend out."
      },
      {
        type: "heading",
        text: "Easy money vs tight money"
      },
      {
        type: "para",
        text: "When RBI wants to boost growth, it makes borrowing cheaper: it cuts the repo rate, CRR, and SLR. More money flows out, loans get cheaper. This is expansionary or easy monetary policy. When inflation is high, RBI does the opposite: it raises the repo rate, CRR, and SLR to pull money back. This is contractionary or tight monetary policy."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Simple memory rule: Rates UP = money tighter = fights inflation. Rates DOWN = money cheaper = boosts growth. If a question mentions RBI cutting the repo rate, it is trying to encourage borrowing and spending."
      },
      {
        type: "heading",
        text: "Who decides the repo rate? The MPC"
      },
      {
        type: "para",
        text: "Since 2016, the repo rate is set by the Monetary Policy Committee (MPC), created by an amendment to the RBI Act. The MPC has six members: three from the RBI (including the Governor, who chairs it and has a casting vote in a tie) and three experts appointed by the central government. Its job is to keep retail inflation, measured by the Consumer Price Index (CPI), at a target of 4 percent, with a tolerance band of plus or minus 2 percent (that is, 2 to 6 percent)."
      },
      {
        type: "callout",
        tone: "info",
        text: "Note the difference: CPI (Consumer Price Index) measures retail prices paid by consumers and is the target for monetary policy. WPI (Wholesale Price Index) measures wholesale prices. The MPC targets CPI inflation, not WPI."
      },
      {
        type: "heading",
        text: "Measuring money: M1 and M3"
      },
      {
        type: "para",
        text: "The RBI measures the total money in the economy using money-supply measures. The two most tested are M1 (narrow money) and M3 (broad money). M1 is the most liquid: currency held by the public, plus demand deposits (money you can withdraw anytime), plus other deposits with the RBI. M3 is broader: it is M1 plus time deposits (like fixed deposits). M3 is the figure most watched for policy."
      },
      {
        type: "heading",
        text: "Fiscal policy: the government's side"
      },
      {
        type: "para",
        text: "Fiscal policy is how the government uses taxes and spending to steer the economy, laid out every year in the Union Budget. When it spends more or cuts taxes to boost demand, that is expansionary fiscal policy. When it spends less or taxes more to cool the economy, that is contractionary. The gap between what the government earns and what it spends creates different types of deficits."
      },
      {
        type: "table",
        headers: ["Type of Deficit", "Simple meaning"],
        rows: [
          ["Fiscal Deficit", "Total expenditure minus total receipts (excluding borrowings). Shows how much the government must borrow."],
          ["Revenue Deficit", "Revenue expenditure minus revenue receipts. Means the government borrows even for daily running costs."],
          ["Primary Deficit", "Fiscal deficit minus interest payments. Shows this year's borrowing need excluding interest on past debt."]
        ]
      },
      {
        type: "callout",
        tone: "warn",
        text: "To keep borrowing in check, Parliament passed the FRBM Act (Fiscal Responsibility and Budget Management Act) in 2003. It sets targets to limit the fiscal deficit and bring discipline to government finances."
      },
      {
        type: "keypoints",
        title: "Rapid revision must-knows",
        items: ["Monetary policy = RBI. Fiscal policy = Government (Budget).", "RBI set up 1935 (Hilton Young Commission), nationalised 1949.", "Repo up, CRR up, SLR up = tighter money, fights inflation.", "MPC has 6 members, Governor chairs with a casting vote; targets CPI inflation at 4% (+/- 2%).", "CRR is parked with RBI as cash (no interest); SLR is held by the bank in liquid assets.", "Fiscal deficit shows government borrowing; FRBM Act (2003) limits it."]
      },
      {
        type: "quiz",
        question: "To fight rising inflation, which combination of actions would the RBI most likely take?",
        options: ["Cut the repo rate and reduce the CRR", "Raise the repo rate and raise the CRR", "Raise the repo rate and reduce the SLR", "Cut the repo rate and raise government spending"],
        correct: 1,
        explain: "To fight inflation, the RBI tightens money by making borrowing costlier and pulling cash out of the system, so it raises the repo rate and raises the CRR. Cutting rates (option A) would boost money and worsen inflation. Government spending (option D) is fiscal policy, not the RBI's tool."
      }
    ]
  },
  {
    slug: "upsc-ecosystems-biodiversity",
    title: "Ecosystems & Biodiversity for UPSC Prelims — Energy Flow, Pyramids & Hotspots Made Simple",
    summary: "Learn how ecosystems work — producers to decomposers, the 10% energy law, ecological pyramids, and biodiversity levels, hotspots, and conservation for UPSC Prelims.",
    examSlug: "upsc",
    subjectSlug: "environment-ecology",
    chapterSlug: "ecosystems-biodiversity",
    readingMinutes: 8,
    practiceTestSlug: "upsc-ecosystems-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of a pond near your village. The sunlight, water, and mud are non-living. The algae, fish, frogs, and tiny microbes are living. None of them survives alone. The algae make food from sunlight, the fish eat the algae, and when things die, microbes break them down and return the nutrients to the mud. This whole working unit of living things plus their non-living surroundings is an ecosystem. This chapter shows you how energy and life move through it, and why saving variety of life matters."
      },
      {
        type: "heading",
        text: "What an ecosystem is made of"
      },
      {
        type: "para",
        text: "An ecosystem has two kinds of parts. Abiotic (non-living) parts are things like sunlight, temperature, water, air, and soil minerals. Biotic (living) parts are all the organisms. The living parts are grouped by the job they do, not by their size. Getting these jobs clear is the base for everything else in this chapter."
      },
      {
        type: "table",
        headers: ["Group", "Job (function)", "Examples"],
        rows: [
          ["Producers (autotrophs)", "Make their own food using sunlight (photosynthesis)", "Green plants, algae"],
          ["Consumers (heterotrophs)", "Eat other organisms for food", "Herbivores, carnivores"],
          ["Decomposers", "Break down dead matter, return nutrients to soil", "Bacteria, fungi"]
        ]
      },
      {
        type: "keypoints",
        title: "Consumers by rank",
        items: ["Primary consumers = herbivores (eat plants), e.g. deer, grasshopper.", "Secondary consumers = eat herbivores, e.g. frog, small snake.", "Tertiary / top consumers = eat other carnivores, e.g. eagle, tiger.", "Detritivores (like earthworms) feed directly on dead matter, while decomposers (bacteria, fungi) break it down chemically; both recycle nutrients and keep the cycle running."]
      },
      {
        type: "heading",
        text: "Energy flow and the 10% rule"
      },
      {
        type: "para",
        text: "A food chain shows who eats whom, step by step: grass to grasshopper to frog to snake to eagle. Each feeding step is called a trophic level. Producers are the first trophic level. Energy enters as sunlight, gets fixed by producers, and passes upward. But this flow leaks a lot at every step."
      },
      {
        type: "analogy",
        title: "A leaking bucket line",
        text: "Imagine people passing water up a hill in buckets, but each person spills 90% and hands only 10% to the next. By the top, almost nothing is left. Energy in an ecosystem works the same way. This is why food chains are usually short (4 to 5 links) and why top predators are few."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Lindeman's 10% law: only about 10% of the energy at one trophic level is passed to the next. The other 90% is lost mostly as heat and used for the organism's own life processes."
      },
      {
        type: "keypoints",
        title: "Two must-remember rules",
        items: ["Energy flow is one-way (unidirectional): sun to producers to consumers. It does not cycle back.", "Nutrients (like carbon, nitrogen) DO cycle: decomposers return them to the soil to be used again.", "A food web is many food chains linked together, which makes an ecosystem more stable."]
      },
      {
        type: "heading",
        text: "Ecological pyramids"
      },
      {
        type: "para",
        text: "An ecological pyramid is a simple bar-diagram of trophic levels stacked up, showing number, biomass (living weight), or energy at each level. The key exam point is which pyramids can flip upside down and which cannot."
      },
      {
        type: "table",
        headers: ["Pyramid type", "Shape", "Note"],
        rows: [
          ["Energy", "Always upright", "Because of the 10% loss at each step"],
          ["Numbers", "Usually upright, can be inverted", "One big tree feeds many insects = inverted"],
          ["Biomass", "Usually upright, can be inverted", "In oceans, tiny fast-growing plankton support larger fish = inverted"]
        ]
      },
      {
        type: "heading",
        text: "Biodiversity: the variety of life"
      },
      {
        type: "para",
        text: "Biodiversity means the variety of living things. It is measured at three levels. Genetic diversity is variety within one species (like many varieties of rice). Species diversity is the number of different species in an area. Ecosystem diversity is the variety of habitats, such as forests, wetlands, deserts, and grasslands in a region."
      },
      {
        type: "keypoints",
        title: "Terms UPSC loves to test",
        items: ["Endemic species: found only in one place and nowhere else on Earth (e.g. Nilgiri tahr).", "Keystone species: has a very large effect on its ecosystem relative to its numbers; removing it can collapse the system.", "Ecotone: the transition zone where two ecosystems meet (like where a forest meets a grassland); often rich in species (edge effect).", "Ecological niche: the exact role and position of a species in its ecosystem."]
      },
      {
        type: "heading",
        text: "Biodiversity hotspots and India"
      },
      {
        type: "para",
        text: "A biodiversity hotspot is a region that is extremely rich in species yet badly threatened. To qualify, a region must have at least 1,500 endemic species of vascular plants and must have already lost 70% or more of its original natural habitat. India has four hotspots: the Himalaya, the Western Ghats and Sri Lanka, the Indo-Burma region, and Sundaland (which includes the Nicobar Islands)."
      },
      {
        type: "heading",
        text: "How we conserve biodiversity"
      },
      {
        type: "para",
        text: "Conservation is done in two broad ways. In-situ means protecting species in their natural home. Ex-situ means protecting them outside their natural home. Both are needed together."
      },
      {
        type: "table",
        headers: ["Approach", "Meaning", "Examples"],
        rows: [
          ["In-situ", "Protect in the natural habitat", "National Parks, Wildlife Sanctuaries, Biosphere Reserves"],
          ["Ex-situ", "Protect away from the natural habitat", "Zoos, Botanical Gardens, Seed / Gene Banks"]
        ]
      },
      {
        type: "callout",
        tone: "info",
        text: "India's first Biosphere Reserve was Nilgiri, set up in 1986. Biosphere Reserves have a strictly protected core zone, a buffer zone around it, and an outer transition zone where limited human activity is allowed."
      },
      {
        type: "quiz",
        question: "According to Lindeman's 10% law, roughly how much energy passes from one trophic level to the next, and why is the energy pyramid always upright?",
        options: ["About 90% passes up; the pyramid is upright because energy is created at each level", "About 10% passes up; the pyramid is upright because energy is lost at each step", "About 50% passes up; the pyramid can be inverted like the biomass pyramid", "About 10% passes up; the pyramid is upright because nutrients cycle back"],
        correct: 1,
        explain: "Only about 10% of energy moves to the next trophic level; the rest (about 90%) is lost mainly as heat and in life processes. Because energy shrinks at every step, the pyramid of energy is ALWAYS upright. Nutrients do cycle, but that is a separate fact and not the reason the energy pyramid stays upright."
      }
    ]
  },
  {
    slug: "upsc-climate-change-conservation",
    title: "Climate Change & Conservation — Treaties, Gases & India's Action, Made Simple",
    summary: "Understand the greenhouse effect, the main greenhouse gases, the global climate treaties from UNFCCC to Paris, ozone agreements, and India's climate actions.",
    examSlug: "upsc",
    subjectSlug: "environment-ecology",
    chapterSlug: "climate-change-conservation",
    readingMinutes: 8,
    practiceTestSlug: "upsc-climate-change-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "A blanket around the Earth",
        text: "Imagine sleeping under a thin blanket. It keeps you warm by trapping your body heat. The Earth has a natural 'blanket' too, made of gases in the air. This blanket is good and keeps our planet warm enough to live. But when we add extra gases, the blanket gets thicker. Now too much heat is trapped, and the planet slowly overheats. That extra heating is climate change."
      },
      {
        type: "para",
        text: "The natural warming is called the greenhouse effect. Sunlight reaches the Earth and warms it. The Earth sends some heat back towards space. Certain gases in the air catch this heat instead of letting it escape. Without them, Earth would be far too cold. The problem today is that humans have added too many of these gases, mainly by burning coal, oil, and gas."
      },
      {
        type: "heading",
        text: "The main greenhouse gases"
      },
      {
        type: "para",
        text: "Not every gas traps heat equally. Some are present in large amounts; others are far more powerful per molecule. The strength of a gas is measured by its Global Warming Potential (GWP), compared to carbon dioxide, which is set at 1."
      },
      {
        type: "table",
        headers: ["Gas", "Main human source", "Note"],
        rows: [
          ["Carbon dioxide (CO2)", "Burning coal, oil, gas; deforestation", "Largest total contributor"],
          ["Methane (CH4)", "Paddy fields, livestock, landfills", "Much stronger than CO2, but shorter-lived"],
          ["Nitrous oxide (N2O)", "Chemical fertilisers", "Very high warming potential"],
          ["Fluorinated gases (HFCs etc.)", "Refrigerants, cooling, industry", "Extremely powerful; human-made"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Water vapour is also a greenhouse gas, but humans do not directly control it. The gases we act on through treaties are CO2, CH4, N2O, and the fluorinated gases."
      },
      {
        type: "heading",
        text: "The global agreements — in order"
      },
      {
        type: "para",
        text: "The world has built a set of treaties, one after another, to control these gases. UPSC loves the sequence and the years. Learn them as a timeline so you never mix them up."
      },
      {
        type: "steps",
        title: "Climate treaty timeline",
        items: ["IPCC (1988): The Intergovernmental Panel on Climate Change was set up by WMO and UNEP. It does not make laws; it reviews science and publishes reports.", "UNFCCC (1992): Signed at the Rio Earth Summit; it is the parent framework for all climate talks. Its members meet every year at a 'COP' (Conference of the Parties).", "Kyoto Protocol (1997): The first treaty with binding emission-cut targets, but only for developed (Annex-I) countries.", "Paris Agreement (2015, at COP21): All countries — rich and poor — pledge action through their own voluntary targets called NDCs."]
      },
      {
        type: "para",
        text: "The Paris Agreement's goal is to keep the global temperature rise well below 2 degrees Celsius above pre-industrial levels, and to try to limit it to 1.5 degrees. Each country submits a Nationally Determined Contribution (NDC) — its own promise of climate action — and updates it over time."
      },
      {
        type: "callout",
        tone: "info",
        text: "CBDR-RC means 'Common But Differentiated Responsibilities and Respective Capabilities'. It says all nations must act, but developed countries — who polluted more historically — must do more. This principle runs through the whole UNFCCC process."
      },
      {
        type: "heading",
        text: "Ozone treaties — related but different"
      },
      {
        type: "para",
        text: "Do not confuse the ozone layer with climate change. The ozone layer blocks harmful ultraviolet rays. It was being destroyed by chemicals called CFCs. The Montreal Protocol (1987) phased out these ozone-destroying chemicals and is considered very successful. Later, its Kigali Amendment (2016) added a plan to phase down HFCs — gases that do not harm ozone but cause strong warming. So the Kigali Amendment links the ozone treaty to the climate fight."
      },
      {
        type: "heading",
        text: "India's response"
      },
      {
        type: "keypoints",
        title: "India's key climate actions",
        items: ["National Action Plan on Climate Change (NAPCC), 2008 — runs through 8 'National Missions', including the National Solar Mission and the National Mission for Enhanced Energy Efficiency.", "International Solar Alliance (ISA) — launched by India and France in 2015 to promote solar energy, headquartered in India.", "Mission LiFE (Lifestyle for Environment) — India's idea of fighting climate change through mindful, low-waste daily habits.", "Panchamrit — India's five climate commitments announced at COP26 (Glasgow, 2021)."]
      },
      {
        type: "example",
        title: "India's 'Panchamrit' targets from COP26",
        lines: ["1. Reach net-zero emissions by the year 2070.", "2. Reach 500 GW of non-fossil (clean) energy capacity by 2030.", "3. Meet 50% of energy needs from renewable sources by 2030.", "4. Cut total projected carbon emissions by 1 billion tonnes by 2030.", "5. Reduce the emissions intensity of GDP by 45% by 2030 (from the 2005 level)."]
      },
      {
        type: "para",
        text: "Conservation is the other side of the coin. Forests, oceans, and soil absorb CO2 from the air — they act as 'carbon sinks'. When we cut forests, we lose these sinks and release stored carbon. So protecting forests and growing new ones (afforestation) is a direct climate tool. The idea of paying countries to protect forests is known internationally as REDD+."
      },
      {
        type: "callout",
        tone: "warn",
        text: "Exam trap: The IPCC does NOT set emission targets or enforce anything. It only assesses science. Targets come from the Kyoto Protocol and the Paris Agreement. Mixing these up is a common mistake."
      },
      {
        type: "quiz",
        question: "Which statement about the global climate agreements is correct?",
        options: ["The Kyoto Protocol was the first treaty to set binding emission-cut targets for developed countries.", "The Paris Agreement was signed at the 1992 Rio Earth Summit.", "The IPCC sets and enforces emission targets for all nations.", "The Montreal Protocol was created to control carbon dioxide emissions."],
        correct: 0,
        explain: "The Kyoto Protocol (1997) was the first to place binding emission cuts on developed (Annex-I) countries. The Paris Agreement came in 2015, not 1992 (that was the UNFCCC). The IPCC only reviews science; it sets no targets. The Montreal Protocol dealt with ozone-depleting substances like CFCs, not CO2."
      }
    ]
  },
  {
    slug: "upsc-general-science",
    title: "General Science for UPSC Prelims — Physics, Chemistry, Biology Made Simple",
    summary: "Learn the core everyday-science ideas UPSC Prelims tests most: light, sound, heat, atoms, acids and bases, vitamins, and the human body.",
    examSlug: "upsc",
    subjectSlug: "science-technology",
    chapterSlug: "general-science-upsc",
    readingMinutes: 8,
    practiceTestSlug: "upsc-general-science-practice-1",
    blocks: [
      {
        type: "para",
        text: "UPSC does not ask you to solve hard physics numericals. It asks whether you understand how the everyday world works. Why does a straw look bent in water? Why do we get vitamin D from the sun? What gas makes soda fizzy? This chapter builds the small, solid base of Physics, Chemistry, and Biology that Prelims tests again and again."
      },
      {
        type: "analogy",
        title: "Science is a toolbox, not a textbook",
        text: "Think of General Science like the tools in a home. You do not need to know how a screwdriver is made. You just need to know which tool fixes which problem. UPSC works the same way: it tests not deep theory, but knowing which simple idea explains a real event. Learn the tool, not the whole factory."
      },
      {
        type: "heading",
        text: "Physics: light, sound, and heat"
      },
      {
        type: "para",
        text: "Physics in Prelims stays close to daily life. Light travels in straight lines and bends (refracts) when it moves from air into water, which is why a straw looks broken in a glass. Sound needs a medium such as air, water, or a solid to travel, so it cannot pass through the vacuum of space. Heat moves in three ways: conduction through solids, convection through liquids and gases, and radiation through empty space, like the Sun's heat reaching Earth."
      },
      {
        type: "keypoints",
        title: "Physics facts worth memorising",
        items: ["Light travels far faster than sound. That is why you see lightning before you hear thunder.", "A convex lens converges light and is used in a magnifying glass; a concave lens spreads light out.", "Red light scatters the least and passes through fog well, so it is used for danger and stop signals.", "The sky looks blue because air scatters shorter blue wavelengths more than red (scattering of light).", "Sound cannot travel in a vacuum, but light can."]
      },
      {
        type: "heading",
        text: "Chemistry: atoms, acids, and bases"
      },
      {
        type: "para",
        text: "Everything around you is made of atoms, and atoms join to form molecules. Substances are grouped as acids, bases, or salts. An acid tastes sour (like lemon or vinegar) and a base tastes bitter and feels soapy. We measure how acidic or basic something is on the pH scale, which runs from 0 to 14. Below 7 is acidic, exactly 7 is neutral (like pure water), and above 7 is basic (also called alkaline)."
      },
      {
        type: "table",
        headers: ["Substance", "Nature", "Everyday example"],
        rows: [
          ["Lemon juice, vinegar", "Acidic (pH below 7)", "Sour taste, used in food"],
          ["Pure water", "Neutral (pH 7)", "Neither sour nor bitter"],
          ["Baking soda, soap", "Basic / alkaline (pH above 7)", "Bitter, slippery feel"],
          ["Common salt (NaCl)", "Neutral salt", "Made from acid + base reaction"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "An easy memory hook: Acids are Angry and sour; Bases are Bitter and soapy. When an acid and a base react, they neutralise each other and form a salt plus water."
      },
      {
        type: "heading",
        text: "Biology: the body and nutrition"
      },
      {
        type: "para",
        text: "Biology questions often focus on the human body and food. Your body needs vitamins in small amounts to stay healthy, and a shortage of any one causes a specific disease. Blood carries oxygen using haemoglobin, which needs iron. A lack of iron causes anaemia, leaving a person tired and weak."
      },
      {
        type: "table",
        headers: ["Vitamin", "Main source", "Deficiency disease"],
        rows: [
          ["Vitamin A", "Carrots, green vegetables", "Night blindness"],
          ["Vitamin C", "Citrus fruits, amla", "Scurvy (bleeding gums)"],
          ["Vitamin D", "Sunlight, milk", "Rickets in children"],
          ["Vitamin B1", "Whole grains, pulses", "Beriberi"]
        ]
      },
      {
        type: "steps",
        title: "How your body handles the air you breathe",
        items: ["You breathe in air, which is about 78% nitrogen and 21% oxygen.", "In the lungs, oxygen passes into the blood and binds to haemoglobin.", "Blood carries oxygen to every cell, where it helps release energy from food.", "Cells produce carbon dioxide as waste, which the blood carries back to the lungs.", "You breathe out the carbon dioxide, and the cycle repeats."]
      },
      {
        type: "example",
        title: "Applying the ideas to a real question",
        lines: ["Question idea: Why does a person feel breathless at high mountains?", "At high altitude, the air is thinner, so there is less oxygen in each breath.", "The blood carries less oxygen to the cells, causing tiredness and breathlessness.", "This is why climbers often carry oxygen cylinders on very high peaks."]
      },
      {
        type: "keypoints",
        title: "Must-remember science bullets",
        items: ["The pH scale runs 0 to 14: below 7 acidic, 7 neutral, above 7 basic.", "Iron deficiency causes anaemia; vitamin C deficiency causes scurvy.", "Photosynthesis in plants takes in carbon dioxide and releases oxygen.", "Water is made of hydrogen and oxygen (H2O); table salt is sodium chloride (NaCl).", "Sound needs a medium to travel; light does not."]
      },
      {
        type: "callout",
        tone: "info",
        text: "For Prelims, focus on cause-and-effect: which deficiency causes which disease, which gas does what, and why a common event happens. You rarely need exact numbers beyond a few durable ones like pH 7 for neutral water."
      },
      {
        type: "quiz",
        question: "A student measures a liquid and finds its pH is 3. What does this tell us?",
        options: ["The liquid is neutral, like pure water", "The liquid is basic (alkaline), like soap", "The liquid is acidic, like lemon juice", "The liquid has no measurable pH"],
        correct: 2,
        explain: "The pH scale runs from 0 to 14. A value of 7 is neutral, above 7 is basic, and below 7 is acidic. Since 3 is well below 7, the liquid is acidic, similar to lemon juice or vinegar."
      }
    ]
  },
  {
    slug: "upsc-space-defence-technology",
    title: "Space & Defence Technology for UPSC Prelims — ISRO, DRDO, Missions & Missiles Made Simple",
    summary: "Learn the core space and defence facts UPSC tests: ISRO vs DRDO, PSLV/GSLV rockets, key missions like Chandrayaan-3 and Mangalyaan, and India's missiles.",
    examSlug: "upsc",
    subjectSlug: "science-technology",
    chapterSlug: "space-defence-tech",
    readingMinutes: 8,
    practiceTestSlug: "upsc-space-defence-practice-1",
    blocks: [
      {
        type: "para",
        text: "Think of India's science and technology story like a family with two ambitious siblings. One sibling (ISRO) looks up at the sky and dreams of reaching the Moon, Mars, and the Sun. The other sibling (DRDO) looks at the borders and builds the shields and swords that keep the country safe. For UPSC Prelims, you do not need to be an engineer. You need to know WHO built WHAT, and the simple idea behind each machine. This explainer teaches exactly that."
      },
      {
        type: "heading",
        text: "Part 1: The Two Big Organisations"
      },
      {
        type: "para",
        text: "Almost every fact in this chapter connects to one of two agencies. ISRO (Indian Space Research Organisation) handles space. It was set up in 1969 and its headquarters is in Bengaluru. Its founding father was Dr. Vikram Sarabhai. DRDO (Defence Research and Development Organisation) handles weapons and defence technology. It was set up in 1958 and its headquarters is in New Delhi."
      },
      {
        type: "heading",
        text: "Part 2: How Rockets Reach Space"
      },
      {
        type: "analogy",
        title: "A rocket is a stack of throwaway water bottles",
        text: "Imagine climbing a hill carrying heavy water bottles. As each bottle empties, you throw it away so you become lighter and climb faster. A rocket works the same way. It is built in 'stages'. When one stage burns all its fuel, it drops off, making the rocket lighter for the next push. This is why rockets are called multi-stage launch vehicles."
      },
      {
        type: "para",
        text: "India has two main workhorse rockets. Their names tell you their job. PSLV (Polar Satellite Launch Vehicle) places satellites into low, polar orbits close to Earth. It is called ISRO's 'workhorse' because it is very reliable and has launched hundreds of satellites, including foreign ones. GSLV (Geosynchronous Satellite Launch Vehicle) is more powerful and places heavier satellites far away, about 36,000 km up, where they stay fixed over one spot. The most powerful Indian rocket is the LVM3 (earlier called GSLV Mark III)."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Cryogenic engine: a special rocket engine that uses super-cold liquid fuels (liquid hydrogen as fuel, liquid oxygen as oxidiser). 'Cryo' means very cold. Mastering this technology is hard, and India is among the few countries that has done it. GSLV uses a cryogenic upper stage."
      },
      {
        type: "table",
        headers: ["Orbit type", "Height (roughly)", "Used for"],
        rows: [
          ["Low Earth Orbit (LEO)", "A few hundred km", "Spy/imaging satellites, space stations"],
          ["Sun-synchronous (polar)", "~600–800 km", "Remote sensing, weather, mapping"],
          ["Geostationary (GEO)", "~36,000 km", "TV, communication, weather (stays over one spot)"]
        ]
      },
      {
        type: "heading",
        text: "Part 3: India's Famous Space Missions"
      },
      {
        type: "keypoints",
        title: "Must-remember missions (durable facts)",
        items: ["Chandrayaan-1 (2008): India's first Moon mission. It helped confirm the presence of water molecules on the Moon.", "Chandrayaan-3 (2023): India made a soft landing near the Moon's SOUTH POLE. India became the FIRST country to land near the south pole, and the 4th country ever to soft-land on the Moon (after USSR, USA, China). Its lander was 'Vikram' and rover was 'Pragyan'.", "Mars Orbiter Mission / Mangalyaan (launched 2013, reached Mars orbit 2014): India became the first country to reach Mars orbit on its very first attempt.", "Aditya-L1: India's first mission to study the Sun, placed at the Lagrange point L1.", "Gaganyaan: India's planned first human spaceflight mission (to send Indians to space)."]
      },
      {
        type: "para",
        text: "Also know India's satellite families by their job. Communication satellites are the INSAT and GSAT series. Earth-watching (remote sensing) satellites are the IRS series. For navigation, India built its own GPS-like system called NavIC (based on the IRNSS satellites), which gives position information over India and the nearby region."
      },
      {
        type: "heading",
        text: "Part 4: Defence and Missiles"
      },
      {
        type: "para",
        text: "India's missile story began with the IGMDP (Integrated Guided Missile Development Programme), started in 1983. Dr. A.P.J. Abdul Kalam led it, which is why he is called the 'Missile Man of India'. The easiest way to remember the missiles is by what they hit."
      },
      {
        type: "table",
        headers: ["Missile", "Type / Role"],
        rows: [
          ["Prithvi", "Surface-to-surface, short range"],
          ["Agni", "Ballistic missile family, long range (Agni-V is over 5,000 km)"],
          ["Akash", "Surface-to-air (shoots down enemy aircraft)"],
          ["Nag", "Anti-tank guided missile"],
          ["BrahMos", "Supersonic cruise missile (India–Russia joint venture)"]
        ]
      },
      {
        type: "analogy",
        title: "Ballistic vs Cruise missile",
        text: "A ballistic missile is like throwing a stone: you give it a big powered push at the start, then it flies in a high curved (parabolic) path and falls on the target using gravity. A cruise missile is like a self-driven aeroplane: it keeps its engine running the whole flight, cruises low to avoid radar, and steers itself to the target. BrahMos is a cruise missile; Agni is ballistic."
      },
      {
        type: "callout",
        tone: "info",
        text: "Mission Shakti (2019) was India's Anti-Satellite (ASAT) test, where India destroyed one of its own satellites in low orbit. This made India the 4th country to have this capability (after USA, Russia, China). Other indigenous defence achievements to know: Tejas (Light Combat Aircraft) and INS Vikrant (India's first indigenously built aircraft carrier)."
      },
      {
        type: "keypoints",
        title: "Quick revision anchors",
        items: ["ISRO = space, 1969, Bengaluru, Vikram Sarabhai.", "DRDO = defence, 1958, New Delhi.", "PSLV = polar/low orbits (workhorse); GSLV/LVM3 = heavy, far orbits, cryogenic engine.", "Chandrayaan-3 = near Moon's south pole; Mangalyaan = Mars in first attempt.", "Missile Man = Dr. A.P.J. Abdul Kalam (IGMDP, 1983).", "Agni = ballistic (thrown stone); BrahMos = cruise (self-driven plane)."]
      },
      {
        type: "quiz",
        question: "Which statement is correct about India's space and defence technology?",
        options: ["The PSLV uses a cryogenic engine to place heavy satellites into geostationary orbit.", "Chandrayaan-3 made India the first country to soft-land near the Moon's south pole.", "BrahMos is a ballistic missile developed entirely by DRDO alone.", "The IGMDP was headed by Dr. Vikram Sarabhai."],
        correct: 1,
        explain: "Chandrayaan-3 (2023) achieved a soft landing near the Moon's south pole, a first for any nation, and made India the 4th country to soft-land on the Moon. The others are wrong: the GSLV (not PSLV) uses the cryogenic engine for heavy geostationary satellites; BrahMos is a supersonic CRUISE missile and a joint venture with Russia; and the IGMDP was led by Dr. A.P.J. Abdul Kalam, while Vikram Sarabhai is linked to ISRO."
      }
    ]
  },
  {
    slug: "bank-simplification-approximation",
    title: "Simplification & Approximation: Your Fastest Marks in Bank Prelims",
    summary: "A friendly, exam-ready guide to Simplification and Approximation for IBPS and SBI bank prelims. Master the BODMAS order, smart rounding, and the fraction tricks that turn tricky-looking sums into 30-second free marks — with worked examples throughout.",
    examSlug: "banking",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "simplification-approximation",
    readingMinutes: 7,
    practiceTestSlug: "bank-simplification-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The billing counter rule",
        text: "Picture a busy Big Bazaar checkout. The cashier does not add prices in random order — she first scans the items inside your basket, then multiplies each by its quantity, and only at the very end adds and subtracts to give you the final bill. Maths follows the exact same discipline. Do the steps out of order and, just like a wrong bill, your answer goes wrong. That fixed order has a name: BODMAS."
      },
      {
        type: "heading",
        text: "What these questions really test"
      },
      {
        type: "para",
        text: "In bank prelims (IBPS & SBI, PO & Clerk), Simplification asks for the exact value, while Approximation asks for the nearest value — you round the messy decimals first, then solve. Both are pure speed-and-accuracy questions. Around 5 to 10 marks sit here, and a strong aspirant clears each one in 20 to 30 seconds. With roughly 20 minutes for the whole Quant section and 0.25 negative marking, these are your must-get, must-get-fast marks — the ones that free up time for Data Interpretation later."
      },
      {
        type: "heading",
        text: "BODMAS: the order that never changes"
      },
      {
        type: "formula",
        text: "BODMAS = Brackets → Orders (powers & roots) → Division → Multiplication → Addition → Subtraction.  Key point: Division and Multiplication are EQUAL in rank — do them left to right. Addition and Subtraction are also equal — again, left to right. Inside brackets, open ( ) first, then { }, then [ ]."
      },
      {
        type: "example",
        title: "Worked example — exact simplification",
        lines: ["Solve: 8 × (12 − 4) ÷ 4 + 3² − 5", "Step 1 — Brackets: (12 − 4) = 8, giving 8 × 8 ÷ 4 + 3² − 5", "Step 2 — Orders: 3² = 9, giving 8 × 8 ÷ 4 + 9 − 5", "Step 3 — Multiply/Divide, left to right: 8 × 8 = 64, then 64 ÷ 4 = 16, giving 16 + 9 − 5", "Step 4 — Add/Subtract, left to right: 16 + 9 = 25, then 25 − 5 = 20", "Answer = 20"]
      },
      {
        type: "callout",
        tone: "warn",
        text: "The classic trap is doing addition before multiplication. 2 + 3 × 4 is NOT 20 — multiplication comes first, so 3 × 4 = 12, then 2 + 12 = 14. In the exam, one out-of-order step turns a sure mark into −0.25. Lock the BODMAS sequence in your head before you touch the numbers."
      },
      {
        type: "heading",
        text: "Approximation: round smart, save seconds"
      },
      {
        type: "steps",
        title: "How to approximate in under 30 seconds",
        items: ["Round each messy number to the nearest easy one: 649.8 → 650, 24.03 → 24, 8.97% → 9%.", "Turn awkward percentages into friendly fractions: 33.33% = 1/3, 12.5% = 1/8, 16.67% = 1/6.", "For square roots, find the two whole numbers it sits between: √150 lies between 12 (144) and 13 (169), so ≈ 12.2.", "Apply BODMAS on the rounded numbers — the order rule still holds even in approximation.", "Pick the closest option. Answer choices are spaced far apart, so a tiny rounding gap never changes your choice."]
      },
      {
        type: "example",
        title: "Worked example — approximation",
        lines: ["Approximate: 1249.96 ÷ 24.98 + 15.02% of 799.9 = ?", "Round: 1249.96 → 1250, 24.98 → 25, 15.02% → 15%, 799.9 → 800", "Division first (BODMAS): 1250 ÷ 25 = 50", "Percentage: 15% of 800 = (15/100) × 800 = 120", "Add: 50 + 120 = 170", "Answer ≈ 170"]
      },
      {
        type: "table",
        headers: ["Fraction", "%", "Fraction", "%"],
        rows: [
          ["1/2", "50", "1/8", "12.5"],
          ["1/3", "33.33", "1/9", "11.11"],
          ["1/4", "25", "1/10", "10"],
          ["1/5", "20", "1/11", "9.09"],
          ["1/6", "16.67", "1/12", "8.33"],
          ["1/7", "14.29", "1/15", "6.67"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Memorise the fraction–percentage table above, plus squares up to 30 and cubes up to 15. When you instantly 'see' 37.5% as 3/8, or recognise 576 as 24², approximation stops being calculation and becomes recognition — and that is exactly how toppers clear 35 questions while others are still multiplying."
      },
      {
        type: "keypoints",
        title: "Quick revision",
        items: ["BODMAS order is fixed: Brackets, Orders, Division/Multiplication (left to right), Addition/Subtraction (left to right).", "Simplification = exact value; Approximation = nearest value after rounding.", "Round first, then apply BODMAS — never the other way round.", "Convert tough percentages into fractions to multiply faster.", "Aim for 20–30 seconds per question; with −0.25 marking, skip the odd tricky one instead of guessing blindly."]
      },
      {
        type: "quiz",
        question: "Approximate the value: 24.97% of 480.12 + 18.03 × 4.96 = ?",
        options: ["180", "210", "240", "260"],
        correct: 1,
        explain: "Round the numbers: 24.97% ≈ 25% = 1/4, and 480.12 ≈ 480, so 480 ÷ 4 = 120. Next, 18.03 ≈ 18 and 4.96 ≈ 5, so 18 × 5 = 90. Add them: 120 + 90 = 210. So the answer is 210."
      }
    ]
  },
  {
    slug: "bank-data-interpretation",
    title: "Data Interpretation for Bank Exams: Read Any Table, Graph or Caselet Fast",
    summary: "Learn to read tables, bar, line and pie graphs and caselets quickly, and crack percentage-, ratio- and average-based DI using exam shortcuts built for the tight timing and 0.25 negative marking of IBPS and SBI prelims.",
    examSlug: "banking",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "data-interpretation",
    readingMinutes: 7,
    practiceTestSlug: "bank-data-interpretation-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The scoreboard you already read",
        text: "Picture yourself watching an India match. In one glance at the scoreboard you know the score, the run rate, who is batting and how many overs are left. Nobody taught you a formula for it; you just read what matters and ignore the rest. Data Interpretation is that exact skill, dressed up as an exam question. A table or graph is only a scoreboard of numbers, and the question simply tells you which number to read. Padho, dost, once you stop fearing the numbers, DI becomes some of the easiest marks in your whole paper."
      },
      {
        type: "para",
        text: "In IBPS and SBI prelims, Data Interpretation is the heart of the Quantitative Aptitude section. Typically 15 to 20 of the section's marks come from just 3 to 4 DI sets. The good news is that DI needs no heavy theory, only quick arithmetic and calm reading. The catch is time: you get roughly 20 minutes for the whole quant section, so every DI question must be cracked in about a minute, with accuracy high enough to survive the negative marking of 0.25 mark per wrong answer."
      },
      {
        type: "heading",
        text: "The 5 shapes your data will come in"
      },
      {
        type: "table",
        headers: ["Format", "What you see", "Watch out for"],
        rows: [
          ["Table", "Rows and columns of exact numbers", "Values are given, so just read the correct row and column"],
          ["Bar graph", "Vertical or horizontal bars", "Compare heights, but always check the axis scale"],
          ["Line graph", "Points joined by lines", "Trends over time; note each rise and fall"],
          ["Pie chart", "A circle split into sectors", "Convert degrees or percentages into simple fractions"],
          ["Caselet", "A paragraph full of numbers", "Build your own table before you solve"]
        ]
      },
      {
        type: "heading",
        text: "Your 3-tool toolkit: percentage, ratio, average"
      },
      {
        type: "formula",
        text: "Percentage of a part = (Part / Whole) x 100.   Percentage change = ((New - Old) / Old) x 100.   Average = Sum of values / Number of values.   Ratio A : B compares sizes; A's share of the total = A / (A + B)."
      },
      {
        type: "callout",
        tone: "tip",
        text: "Speed hack: students who clear prelims do not do long division under pressure, they memorise fraction values. If you know 1/8 = 12.5% instantly, then '12.5% of 480' becomes 480 / 8 = 60 in your head. Burn the table below into memory."
      },
      {
        type: "table",
        headers: ["Fraction", "Equals"],
        rows: [
          ["1/2", "50%"],
          ["1/3", "33.33%"],
          ["1/4", "25%"],
          ["1/5", "20%"],
          ["1/6", "16.67%"],
          ["1/7", "14.29%"],
          ["1/8", "12.5%"],
          ["1/9", "11.11%"],
          ["1/11", "9.09%"]
        ]
      },
      {
        type: "heading",
        text: "Worked example: a table DI question"
      },
      {
        type: "example",
        title: "Which month grew the most?",
        lines: ["Data: Brand A laptops sold - Jan 120, Feb 150, Mar 200, Apr 180.", "Question: In which month was the growth over the previous month the highest?", "Feb over Jan: (150 - 120) / 120 = 30/120 = 25%.", "Mar over Feb: (200 - 150) / 150 = 50/150 = 33.33%.", "Apr over Mar: (180 - 200) / 200 = -20/200 = -10%, which is a fall, so skip it.", "Compare 25% vs 33.33% vs a fall: March clearly wins.", "Answer: March, with about 33.33% growth. Notice you never needed exact decimals; 50/150 is obviously bigger than 30/120."]
      },
      {
        type: "steps",
        title: "The 4-step DI attack",
        items: ["Read the title, axis labels and units first. Is the data in lakhs, in percentages, or in actual numbers? One misread here ruins every answer.", "Scan the question before doing any maths, and note exactly which rows, bars or sectors it asks about.", "Pull out only the numbers you need. Never calculate the whole table.", "Approximate boldly: round 197 to 200, compare fractions, and eliminate options instead of hunting for exact values."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Trap alert: with 0.25 negative marking, a wild guess on a nasty DI question can cost you. If a set has one ugly, calculation-heavy question, leave it and grab the two easy ones. DI rewards selection, not stubbornness. And always recheck the unit, because mixing 'lakhs' with plain numbers is the number one silly mistake in bank prelims."
      },
      {
        type: "para",
        text: "Caselets are just DI hiding inside a paragraph. There is no table or graph, only sentences packed with numbers, and your job is to build the table yourself. Read slowly, jot each value into a small grid on your rough sheet, and the caselet instantly turns into an ordinary table DI that you already know how to solve."
      },
      {
        type: "keypoints",
        title: "Quick revision before you close this",
        items: ["DI is 15 to 20 approachable marks in prelims: pure speed and accuracy, no theory.", "Master three tools only: percentage, percentage change, and average.", "Learn the fraction-to-percentage values by heart to skip long division.", "Always check the unit (lakhs, crores, percent) before you calculate.", "When a question asks 'which is highest or lowest', compare fractions instead of finding exact decimals.", "Selection over ego: skip the one nasty question and bank the easy marks."]
      },
      {
        type: "quiz",
        question: "A pie chart shows a family's monthly budget. The 'Food' sector takes up 90 degrees of the 360-degree pie, and total spending is Rs 36,000. How much is spent on food?",
        options: ["Rs 9,000", "Rs 12,000", "Rs 18,000", "Rs 6,000"],
        correct: 0,
        explain: "A full pie is 360 degrees. Food's 90 degrees is 90/360 = 1/4 = 25% of the budget. 25% of Rs 36,000 = Rs 36,000 / 4 = Rs 9,000. Converting the angle straight to the simple fraction 1/4 is the fastest route, no long calculation needed."
      }
    ]
  },
  {
    slug: "bank-number-series-quadratic",
    title: "Number Series & Quadratic Equations: Spot the Pattern, Compare the Roots",
    summary: "A from-scratch guide to two of the fastest-scoring topics in IBPS and SBI Prelims — the fixed order for testing number-series patterns (difference, product, square, cube, mixed) and the sign shortcut for comparing the roots of two quadratics (x vs y), with fully worked examples and the common \"greater-than-or-equal vs strictly-greater\" and \"no relation\" traps.",
    examSlug: "banking",
    subjectSlug: "quantitative-aptitude",
    chapterSlug: "number-series-quadratic",
    readingMinutes: 7,
    practiceTestSlug: "bank-number-series-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "You already predict the next station",
        text: "Think of your daily local train. After a few days you know the order of stations by heart, so the moment the train leaves Dadar you already know Bandra is next, without reading any board. A Number Series works exactly the same way. The examiner gives you a few 'stations' (numbers) and hides one, and your job is to feel the rhythm of how each number leads to the next, then name the missing one. Once you learn the common rhythms, your brain predicts the answer almost automatically. Padho, dost, let's learn those rhythms."
      },
      {
        type: "para",
        text: "In IBPS and SBI Prelims (both PO and Clerk) the Quant section gives you about 35 questions in just 20 minutes, roughly 34 seconds per question. Number Series and Quadratic Equations are gold here: each set is usually 5 questions, and once you spot the trick a question takes 20 to 30 seconds. But respect the 0.25 negative marking, because one wild guess quietly eats away the marks of a correct answer. So the goal is simple: learn the patterns, solve fast, and skip cleanly when you are not sure."
      },
      {
        type: "heading",
        text: "Part 1: Number Series"
      },
      {
        type: "para",
        text: "A Number Series question shows a row of numbers following one hidden rule, with either a missing term (marked ?) or one wrong term you must catch. There is no single formula here, so you become a pattern detective. The good news is that almost all exam series use just a handful of rhythms, and you test them in a fixed order so you never waste time."
      },
      {
        type: "steps",
        title: "How to find the pattern (test in this order)",
        items: ["Write the differences between consecutive terms. Is the gap constant, or is it growing by a fixed amount each time?", "If differences don't settle it, check the ratio. Is each term roughly double, triple, or half of the previous one? That points to a product series.", "If the numbers jump fast, test squares and cubes by comparing each term to the nearest perfect square (1, 4, 9, 16...) or cube (1, 8, 27, 64...).", "Still stuck? Look for a mixed rule like x2+1 or 'multiply by n, add n', or an alternating pattern where odd and even positions follow different rules.", "Lock a rule only after it fits at least 3 gaps, then apply it to find the missing or wrong term."]
      },
      {
        type: "table",
        headers: ["Pattern", "How to spot it", "Example"],
        rows: [
          ["Difference", "A constant or steadily growing gap", "4, 7, 10, 13 (+3 each)"],
          ["Product / Ratio", "Each term multiplied by a number", "3, 6, 12, 24 (x2 each)"],
          ["Squares", "Terms sit near 1, 4, 9, 16, 25", "2, 5, 10, 17 (n squared + 1)"],
          ["Cubes", "Terms sit near 1, 8, 27, 64", "0, 7, 26, 63 (n cubed - 1)"],
          ["Mixed (xn + n)", "Grows fast with a changing multiplier", "5, 6, 14, 45 (x1+1, x2+2...)"]
        ]
      },
      {
        type: "example",
        title: "Find the missing number: 5, 6, 14, 45, 184, ?",
        lines: ["The jump from 45 to 184 is huge, so plain addition won't fit. Suspect multiplication.", "Try 'multiply by 1, add 1': 5 x 1 + 1 = 6. It matches.", "Then 'multiply by 2, add 2': 6 x 2 + 2 = 14. It matches.", "Then x 3 + 3: 14 x 3 + 3 = 45. It matches.", "Then x 4 + 4: 45 x 4 + 4 = 184. It matches.", "The rule is 'multiply by n, add n', so the next step is x 5 + 5: 184 x 5 + 5 = 925.", "Missing number = 925."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Memorise squares up to 30 and cubes up to 15 before exam day. When a series suddenly leaps, like 6 to 45 to 184, stop checking differences and immediately suspect multiplication, squares, or cubes. That one instinct saves you 30 seconds per question."
      },
      {
        type: "heading",
        text: "Part 2: Quadratic Equations (x vs y)"
      },
      {
        type: "para",
        text: "In a Quadratic Equations question you get two equations, one in x and one in y. You solve each to get two roots, then compare the x-values with the y-values and pick the correct relationship. The five options are almost always: x > y, x < y, x is greater than or equal to y, x is less than or equal to y, and 'x = y or no relation can be established'. The whole game is to factorise quickly and then compare the roots without slipping on signs."
      },
      {
        type: "formula",
        text: "For x squared + bx + c = 0 (leading coefficient 1): sum of the two roots = -b, and product of the two roots = c. Shortcut: split the constant c into two numbers whose product is c and whose sum is -b. Those two numbers, each with its sign flipped, are your roots."
      },
      {
        type: "table",
        headers: ["Middle term (b)", "Constant (c)", "The two roots"],
        rows: [
          ["+ (positive)", "+ (positive)", "Both negative"],
          ["- (negative)", "+ (positive)", "Both positive"],
          ["+ (positive)", "- (negative)", "Opposite signs (one +, one -)"],
          ["- (negative)", "- (negative)", "Opposite signs (one +, one -)"]
        ]
      },
      {
        type: "example",
        title: "Compare the roots step by step",
        lines: ["Given: I) x squared - 5x + 6 = 0     II) y squared - 12y + 35 = 0", "Solve I: find two numbers with product 6 and sum 5, which are 2 and 3.", "So (x - 2)(x - 3) = 0, giving x = 2 or x = 3.", "Solve II: two numbers with product 35 and sum 12, which are 5 and 7.", "So (y - 5)(y - 7) = 0, giving y = 5 or y = 7.", "Put them on a number line: x-values {2, 3}, y-values {5, 7}.", "Largest x = 3, smallest y = 5. Since 3 < 5, every x is smaller than every y.", "Answer: x < y."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Biggest trap: if the x-values and y-values overlap, say x = {2, 6} and y = {4, 5}, then one x is smaller and one x is bigger than the y-values, so no fixed relation holds. The answer is 'cannot be established', NOT x = y. Use x = y only when both equations give the exact same pair of roots. And when the two groups just touch at one point (largest x equals smallest y, or largest y equals smallest x), use 'greater than or equal to' / 'less than or equal to', never the strict > or <."
      },
      {
        type: "keypoints",
        title: "Exam-day quick recall",
        items: ["Number Series order: difference, then ratio, then squares/cubes, then mixed rule.", "A sudden big jump means think multiplication or powers, not addition.", "Quadratics: sum of roots = -b, product = c; split the constant to factorise in seconds.", "Sign rule: a + constant means the two roots share a sign (the sign opposite to the middle term); a - constant means the roots have opposite signs.", "Compare largest-x with smallest-y and smallest-x with largest-y to fix the relation.", "Groups touch at exactly one value: use 'greater/less than or equal to'. Groups overlap: 'cannot be established'.", "With 0.25 negative marking, skip anything you can't crack in about 40 seconds instead of guessing."]
      },
      {
        type: "quiz",
        question: "Given I) x squared - 9x + 20 = 0 and II) y squared - 7y + 12 = 0, what is the relationship between x and y?",
        options: ["x > y", "x < y", "x is greater than or equal to y", "No relation can be established"],
        correct: 2,
        explain: "Solve I: product 20, sum 9, so 4 and 5, giving x = 4 or 5. Solve II: product 12, sum 7, so 3 and 4, giving y = 3 or 4. The smallest x (4) equals the largest y (4), and every other x is bigger. Because x is never less than y but they can be equal at 4, the correct relation is 'x is greater than or equal to y', not the strict x > y, which is the trap here."
      }
    ]
  },
  {
    slug: "bank-puzzles-seating",
    title: "Puzzles & Seating Arrangement: Build a Grid, Eliminate Cases",
    summary: "The one repeatable method to crack every IBPS and SBI seating and puzzle set: draw a grid, anchor the fixed clues, split into cases, and let the clues eliminate the wrong ones. Includes a fully worked 7-person linear puzzle, a puzzle-type cheat sheet, and the circular-direction trap that quietly costs students five marks.",
    examSlug: "banking",
    subjectSlug: "reasoning-ability",
    chapterSlug: "puzzles-seating",
    readingMinutes: 8,
    practiceTestSlug: "bank-puzzles-seating-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The wedding-hall seating chart",
        text: "Picture a big Indian wedding. The planner has no final seating list, only hints from the family: 'Dadaji must sit at the head of the table', 'the bride's college friends want to sit together', 'Uncle Sharma will NOT sit next to Uncle Verma'. One hint at a time, guests get locked into chairs until only one arrangement survives. A seating puzzle is exactly this. You are the wedding planner, the clues are the family's demands, and your job is to find the single seating that keeps everyone happy."
      },
      {
        type: "heading",
        text: "Why these puzzles decide your prelims fate"
      },
      {
        type: "para",
        text: "In IBPS and SBI prelims, Puzzles and Seating Arrangement are the biggest chunk of the reasoning section. Often 15 to 20 of the 35 questions arrive as 3-4 puzzle 'sets', each set carrying 5 linked questions. Crack one grid and you pocket all 5 marks together. But the section is tight (roughly 20-25 minutes) and every wrong tick costs 0.25 due to negative marking. So the skill is two-fold: solve accurately, and choose the right set to attempt. Guessing on a half-built grid is how good students quietly lose 2-3 marks."
      },
      {
        type: "heading",
        text: "The master method: build a grid, eliminate cases"
      },
      {
        type: "steps",
        title: "Grid + elimination in 6 steps",
        items: ["Read the whole puzzle once. Note the frame (row, circle, floors, boxes, or a day/month schedule), how many people or items there are, and every extra variable (age, city, colour).", "Draw an empty grid or diagram with numbered seats, floors, or slots. Leave space to pencil in options.", "Pick up the MOST definite clue (a fixed seat, an extreme end, a specific floor) and place it first. This becomes your anchor.", "Add clues that connect to what is already placed, building outward from the anchor step by step.", "When a clue allows two or more positions, open parallel cases (Case 1, Case 2...) and carry each one forward instead of guessing.", "Test every remaining clue against each case. A clue that contradicts a case kills it. Keep the case where all clues fit — that is your answer."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Pro tip: Sort clues into 'fixed' (D is at an end; A faces north) and 'floating' (P sits somewhere to the left of Q). Place all fixed clues FIRST because they anchor the grid. Handle floating clues later by opening cases. Starting with a floating clue is the single biggest time-waster."
      },
      {
        type: "heading",
        text: "Know the main puzzle types"
      },
      {
        type: "table",
        headers: ["Puzzle type", "How to draw it", "Watch-for clue words"],
        rows: [
          ["Linear (single row)", "A line of numbered seats; note the facing (north or south)", "'left of', 'right of', 'extreme end', 'exactly between'"],
          ["Linear (two rows)", "Two parallel rows facing each other; opposite pairs line up", "'faces', 'opposite to', 'diagonally opposite'"],
          ["Circular / rectangular", "A circle or table; mark whether people face the centre or outside", "'clockwise', 'immediate left', 'faces the centre'"],
          ["Floor / box puzzle", "A vertical stack (top = highest floor / box)", "'above', 'below', 'lowest floor', 'gap of two floors'"],
          ["Scheduling (day / month)", "A column of days or months in fixed order", "'earlier than', 'immediately after', 'same week'"]
        ]
      },
      {
        type: "formula",
        text: "Circular table, facing the CENTRE: left = clockwise, right = anti-clockwise. Facing OUTSIDE: left = anti-clockwise, right = clockwise (always the opposite of centre-facing). Counting rule: 'n persons sit between X and Y' means their seat numbers differ by (n + 1)."
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common mistake: applying row logic to a circular table. When everyone faces the centre, a person's RIGHT hand points anti-clockwise, not clockwise. Get this one direction wrong and the entire circle flips — all 5 answers in the set go wrong together. Always fix the facing before you read any 'left' or 'right'."
      },
      {
        type: "example",
        title: "Worked example — a 7-person linear puzzle",
        lines: ["Setup: A, B, C, D, E, F, G sit in a row, all facing north. Number the seats 1 (far left / west) to 7 (far right / east). Since they face north, west is each person's left and east is each person's right, so 'right' means a higher seat number.", "Clues: (1) D sits at an extreme end. (2) Three persons sit between D and B. (3) A is second to the right of B. (4) C is third to the left of G. (5) E is an immediate neighbour of A.", "Start with the most fixed clue. Clue 1 fixes D at seat 1 OR seat 7 — two cases.", "Case 1 (D = seat 1): Clue 2 puts B at seat 5 (three people between = gap of 4). Clue 3 puts A at seat 7; Clue 5 puts E at seat 6. Now C = G − 3 must fit into leftover seats 2, 3, 4 — but the widest gap there is only 2, so a gap of 3 cannot fit. Case 1 dies on its own.", "Case 2 (D = seat 7): Clue 2 puts B at seat 3. Clue 3 puts A at seat 5. The leftover seats are 1, 2, 4, 6. Clue 4 needs C three seats left of G; only G = 4, C = 1 fits.", "Clue 5: E next to A(5) must be seat 6, since seat 4 is taken by G. The last leftover seat 2 = F.", "Final row (west to east): C(1)  F(2)  B(3)  G(4)  A(5)  E(6)  D(7). Every clue checks out.", "Now any question is instant. 'Who is 4th from the left?' → G. 'Who sits exactly between B and A?' → G. One grid, five marks."]
      },
      {
        type: "para",
        text: "Notice what did the heavy lifting: we never guessed. Clue 1 handed us two cases, and Case 1 simply could not satisfy Clue 4, so it collapsed by itself. That is the whole game — set up honest cases, then let the clues eliminate the wrong ones for you. The moment a case breaks, you delete it and move on without regret."
      },
      {
        type: "keypoints",
        title: "Quick revision",
        items: ["Always draw the diagram. Never try to hold a puzzle in your head.", "Rank the clues: lock in definite (fixed) clues first, keep floating clues aside.", "When a clue gives two options, split into cases and test each — wrong cases collapse fast.", "In circular puzzles, decide the facing (centre or outside) BEFORE reading any left / right.", "Count 'persons between' as gaps: n persons between X and Y means their seats differ by n + 1.", "One completed grid usually answers all 5 questions — five marks from a single solve."]
      },
      {
        type: "callout",
        tone: "info",
        text: "Exam-day selection: In the first 30 seconds, skim the puzzle's data. If it has many fixed clues (definite seats, exact floors, 'sits at the end'), grab it — it will solve quickly. If it is vague with mostly floating clues and lots of variables, skip it and return later. Choosing the easy set first is worth more marks than raw speed."
      },
      {
        type: "quiz",
        question: "Eight people sit around a circular table, all facing the centre. If you move in the clockwise direction, you move towards each person's —",
        options: ["Right hand side", "Left hand side", "Front", "Back"],
        correct: 1,
        explain: "When you face the centre, your left hand points clockwise and your right hand points anti-clockwise, so clockwise motion goes towards each person's LEFT. (If everyone faced outward instead, it would be the reverse — clockwise would go towards their right.)"
      }
    ]
  },
  {
    slug: "bank-syllogism-inequality",
    title: "Syllogism & Inequality: Your Easiest Guaranteed Marks in Bank Prelims",
    summary: "Learn to crack bank-exam Syllogism and Inequality with two simple mental pictures — circles inside circles and weights on a scale. This explainer teaches the four statement types, the free conversion shortcuts, the 3-step Venn method, and the sign-combining rules for direct and coded inequalities, including the exam-favourite 'either-or' trick, with fully worked examples aimed at fast, negative-marking-safe marks.",
    examSlug: "banking",
    subjectSlug: "reasoning-ability",
    chapterSlug: "syllogism-inequality",
    readingMinutes: 7,
    practiceTestSlug: "bank-syllogism-inequality-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "Circles within circles, weights on a scale",
        text: "Picture the big joint-family photo at a cousin's wedding. Everyone standing in the 'cousins' group is also inside the larger 'family' circle. Draw that as a small circle sitting fully inside a big circle, and you have just solved a syllogism. Inequality is the same idea with a weighing scale: who is heavier, who is lighter, who is exactly equal. Learn to draw the circles and read the scale, dost, and you pocket 8-10 almost-guaranteed marks in the reasoning section."
      },
      {
        type: "para",
        text: "Here is the bank-prelims reality: you get roughly 35 reasoning questions in about 20 minutes, and every wrong answer costs you 0.25 marks. So you want topics where a trained student is 100% sure, not 70% guessing. Syllogism (usually 3-5 questions) and Inequality (usually 3-5 questions) are exactly that — pure logic, no long calculation, no ambiguity once you know the rules. These are your bankable, negative-marking-safe marks. Let us lock them in."
      },
      {
        type: "heading",
        text: "Part 1: Syllogism — statements and conclusions"
      },
      {
        type: "para",
        text: "In syllogism you are given 2 (sometimes 3) statements that you MUST assume are true, even if they sound absurd. If it says 'All chairs are dogs', you simply accept it and move on — never use your real-world knowledge. Then you decide which of the given conclusions definitely follows. Every statement is built from just four sentence types, so once you know these four, you know the whole topic."
      },
      {
        type: "table",
        headers: ["Statement type", "Example", "What the circles look like"],
        rows: [
          ["All A are B", "All apples are fruits", "Small A circle sits fully inside B"],
          ["No A is B", "No apple is a stone", "A and B circles never touch"],
          ["Some A are B", "Some apples are red", "The two circles overlap a little"],
          ["Some A are not B", "Some apples are not sweet", "Part of A lies outside B"]
        ]
      },
      {
        type: "callout",
        tone: "info",
        text: "Memorise these free conversions — half of all conclusions are just these flipped: 'All A are B' also gives 'Some B are A'. 'No A is B' also gives 'No B is A'. 'Some A are B' also gives 'Some B are A'. But 'Some A are not B' gives NOTHING in reverse. That single exception traps thousands of students every year."
      },
      {
        type: "steps",
        title: "The 3-step Venn method",
        items: ["Draw the statements exactly as given, using the picture with the LEAST overlap first (circles touching only as much as the statements force).", "Check each conclusion against your picture: is it true in EVERY valid arrangement you can draw? If yes, it definitely follows.", "If a conclusion fails in even one valid picture, it does NOT follow. For a 'possibility' or 'can be' conclusion, flip the test: it follows if it can be true in at least one valid picture."]
      },
      {
        type: "example",
        title: "Worked example — spot the trap",
        lines: ["Statements: All roses are flowers. Some flowers are red.", "Conclusion I: Some roses are red.", "Conclusion II: Some flowers are roses.", "Draw it: a small 'roses' circle fully inside 'flowers'. The 'red' circle overlaps 'flowers' — but you are free to slide that red patch so it touches only the non-rose part of flowers.", "Check I: the red part need NOT touch roses, so 'Some roses are red' is not certain. Conclusion I does not follow.", "Check II: 'All roses are flowers' converts to 'Some flowers are roses' — always true. Conclusion II follows.", "Answer: Only Conclusion II follows."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common mistake: 'Some flowers are red' tempts you to link red to roses — never assume an overlap the statements do not force. Two more traps: (1) never use outside knowledge, accept even 'All stones are flowers'; (2) a 'possibility' conclusion follows if even ONE valid arrangement makes it true, so do not reject it too fast."
      },
      {
        type: "para",
        text: "The 'either-or' rule (examiners love it): sometimes neither conclusion follows on its own, yet the two conclusions are about the SAME pair and are complementary — for example 'Some A are B' and 'No A is B', or 'All A are B' and 'Some A are not B'. Each such pair covers every possible case between them, so exactly one must be true. When you see that pattern and neither is individually certain, mark 'Either I or II follows'."
      },
      {
        type: "heading",
        text: "Part 2: Inequality — reading the signs"
      },
      {
        type: "para",
        text: "Direct inequality hands you a chain like A > B >= C and asks about A versus C. The whole game is joining the signs correctly. Coded inequality is the same thing wearing a disguise: symbols like @, %, $ stand for >, <, =, and so on, so you first decode them into real signs and then apply the exact same combining rules."
      },
      {
        type: "table",
        headers: ["Chain", "Valid conclusion", "Why"],
        rows: [
          ["A > B > C", "A > C", "same direction, both strict"],
          ["A > B >= C", "A > C", "one strict > wins the chain"],
          ["A >= B >= C", "A >= C", "no strict sign, so it stays >="],
          ["A = B >= C", "A >= C", "equal, then >="],
          ["A > B < C", "No relation", "signs oppose, the chain breaks"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "The master rule: you may join a chain only when the signs face the same way with no break. The answer is a strict > (or <) only if at least one strict sign sits inside a clean, same-direction chain; otherwise it stays >= (or <=). The moment a > meets a < in the middle, there is NO relation between the two end elements — do not waste a second guessing."
      },
      {
        type: "example",
        title: "Worked example — coded inequality",
        lines: ["Codes: 'P % Q' means P > Q; 'P $ Q' means P = Q; 'P @ Q' means P >= Q; 'P (c) Q' means P <= Q.", "Statements: A @ B, B $ C. Find A versus C.", "Decode: A @ B is A >= B, and B $ C is B = C.", "Combine: A >= B = C, so A >= C.", "So 'A >= C' definitely follows — but 'A > C' alone would NOT follow, because A and C could be equal."]
      },
      {
        type: "example",
        title: "The either-or trick in inequality (very common)",
        lines: ["Statement: P >= Q = R.", "Conclusion I: P > R. Conclusion II: P = R.", "Combine: P >= Q = R gives P >= R, which means P > R OR P = R.", "Neither I nor II is certain on its own, both are about the same pair (P and R), and together they cover every case.", "Answer: Either I or II follows."]
      },
      {
        type: "keypoints",
        title: "60-second revision before the exam",
        items: ["Syllogism: accept every statement as true, draw the least-overlap circles, and a conclusion follows only if it is true in every possible picture.", "Learn conversions: All flips to Some, No flips to No, Some flips to Some — but 'Some-not' never flips.", "Inequality: join signs only in the same direction; one strict sign in a clean chain makes the whole answer strict.", "A > that meets a < in the middle = No relation. Move on instantly.", "Either-or: two conclusions on the same pair that are complementary (e.g. > and =) with neither individually true — mark 'either-or'.", "Target 30-40 seconds per question. These are safe marks; do not overthink and do not gamble against the 0.25 penalty."]
      },
      {
        type: "quiz",
        question: "Statements: P < Q >= R > S. Which conclusion is definitely true?",
        options: ["P > S", "Q > S", "R >= Q", "P < R"],
        correct: 1,
        explain: "Take the clean part of the chain: Q >= R and R > S face the same direction, and there is a strict > inside, so Q >= R > S gives Q > S — definitely true. 'P > S' and 'P < R' fail because P sits behind a '<' facing Q, which breaks the chain (no relation from P to R or S). 'R >= Q' just reverses the given Q >= R, which is not guaranteed. So only 'Q > S' follows."
      }
    ]
  },
  {
    slug: "bank-coding-blood-relations",
    title: "Coding-Decoding & Blood Relations: Crack the Code, Draw the Tree",
    summary: "A from-scratch, exam-focused guide to bank-prelims Coding-Decoding (letter, number and new-pattern sentence coding) and Blood Relations. Learn the EJOTY and opposite-letter shortcuts, a clean method for sentence coding, and the draw-the-family-tree technique — with fully worked, verified examples tuned to tight sectional timing and 0.25 negative marking.",
    examSlug: "banking",
    subjectSlug: "reasoning-ability",
    chapterSlug: "coding-blood-relations",
    readingMinutes: 8,
    practiceTestSlug: "bank-coding-blood-relations-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The secret chit-language of school",
        text: "Remember passing chits in class where 'library' secretly meant 'the boring lecture' and 'chai' meant 'let's bunk'? You and your friend agreed on a rule, and suddenly one ordinary word carried a hidden meaning. Coding-Decoding is exactly that game — the examiner fixes a secret rule, and your only job is to spot the rule and reverse it. Blood Relations is the same idea with people: a tangled sentence is really a simple family tree wearing a disguise. Padho, dost — once you learn to decode and to draw, these become your fastest, surest marks."
      },
      {
        type: "para",
        text: "In IBPS and SBI Prelims, the Reasoning section is short and brutal: roughly 35 questions in 20 minutes, with 0.25 negative marking for every wrong answer. Coding-Decoding and Blood Relations are gold here because a well-practised student cracks them in under a minute with near-perfect accuracy — no lengthy calculation, just a rule and a diagram. Skip the guesswork; a blind attempt here costs you a quarter mark AND precious seconds."
      },
      {
        type: "heading",
        text: "Part 1: Coding-Decoding Basics"
      },
      {
        type: "para",
        text: "Most coding rests on one skill: knowing the position of a letter in the alphabet (A=1 ... Z=26) and its reverse position counted from the back (Z=1 ... A=26). The common rules you will see are: shift a letter forward or backward by a fixed number, replace a letter with its opposite (A with Z, B with Y), or use position-number tricks. Memorise the anchor letters and these jumps become instant."
      },
      {
        type: "table",
        headers: ["Letter", "Position", "Reverse (27 − pos)", "Opposite letter"],
        rows: [
          ["A", "1", "26", "Z"],
          ["E", "5", "22", "V"],
          ["J", "10", "17", "Q"],
          ["O", "15", "12", "L"],
          ["T", "20", "7", "G"],
          ["Y", "25", "2", "B"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Learn the 'EJOTY' anchors — E=5, J=10, O=15, T=20, Y=25. To find any letter's number, jump to the nearest anchor and count a step or two. For opposite letters, use the rule Opposite = 27 − Position (so P=16 pairs with K=11, since 27 − 16 = 11). These two shortcuts alone cover the bulk of coding questions."
      },
      {
        type: "example",
        title: "Worked example: letter-shift coding",
        lines: ["Question: In a code, TIGER is written as UJHFS. How is LION written?", "Step 1 — Compare TIGER with UJHFS letter by letter: T→U, I→J, G→H, E→F, R→S.", "Step 2 — Spot the rule: every letter moves +1 (one step forward).", "Step 3 — Apply the same rule to LION: L→M, I→J, O→P, N→O.", "Answer: LION is written as MJPO."]
      },
      {
        type: "heading",
        text: "New-Pattern (Sentence) Coding"
      },
      {
        type: "para",
        text: "Modern bank exams love 'sentence coding', where whole phrases are coded and you must find the code for one word. There is no letter-shift here — you match words across sentences. It looks scary but follows one clean idea: whatever word is common to two sentences must share the code that is common to those same two sentences."
      },
      {
        type: "steps",
        title: "Method for new-pattern coding",
        items: ["Write each sentence and its code neatly, one below the other.", "Find a word that appears in two sentences; the code common to those two sentences stands for that word.", "Find a code that repeats across ALL sentences — it belongs to the word that repeats across all.", "Cancel the pairs you have confirmed to squeeze out the remaining words.", "Cross-check that every sentence maps fully before you tick the answer."]
      },
      {
        type: "example",
        title: "Worked example: sentence coding",
        lines: ["'pen is blue' = 'ta na sa'", "'blue is sky' = 'na ra ta'", "'sky is high' = 'ra na pa'", "Step 1 — 'na' appears in all three codes, and 'is' is the only word common to all three sentences, so is = na.", "Step 2 — Sentences 1 and 2 share the words 'is' and 'blue' and the codes 'na' and 'ta'. Since is = na, the leftover gives blue = ta.", "Step 3 — Sentences 2 and 3 share 'is' and 'sky' and the codes 'na' and 'ra'. Since is = na, sky = ra.", "Answer: the code for 'blue' is ta. (Check: pen = sa, high = pa — every sentence now maps cleanly.)"]
      },
      {
        type: "heading",
        text: "Part 2: Blood Relations"
      },
      {
        type: "para",
        text: "A blood-relation question is a story that hides a family tree. Your winning move is to STOP reading it as English and start drawing it as a diagram. Once the tree is on paper, the answer simply reads off it."
      },
      {
        type: "keypoints",
        title: "Family-tree drawing rules",
        items: ["Show a male as a square and a female as a circle — fix a person's gender only when the sentence actually tells you.", "Use a vertical line to link different generations (parent above, child below).", "Use a horizontal line for the same generation (brother — sister, husband — wife).", "Replace tricky phrases like 'the only daughter of my mother' with the actual person before moving on.", "Always read the final relation FROM the tree, never from memory."]
      },
      {
        type: "example",
        title: "Worked example: pointing-type relation",
        lines: ["Question: Pointing to a photograph, Rekha said, 'She is the daughter of my grandfather's only son.'", "Step 1 — Rekha's grandfather has only one son, and Rekha is his descendant, so that only son is Rekha's own father.", "Step 2 — 'Daughter of Rekha's father' is therefore Rekha herself OR her sister.", "Step 3 — Rekha is pointing at someone else in the photo ('She'), so it cannot be Rekha.", "Answer: The girl in the photo is Rekha's sister."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "The biggest trap is assuming gender from a name or a role. 'The engineer', 'the doctor', 'my friend' — none of these tells you male or female, so never draw the symbol until the sentence confirms it. A single wrong gender collapses the whole tree and gifts the examiner your 0.25 negative mark."
      },
      {
        type: "keypoints",
        title: "Exam-day quick revision",
        items: ["Memorise EJOTY (5, 10, 15, 20, 25) and the Opposite = 27 − position rule for opposite letters.", "For sentence coding, hunt for the word and the code that are common to the same two lines.", "In blood relations, always draw — squares, circles, vertical and horizontal lines.", "If a question feels tangled after 60–75 seconds, mark it for review and move on; accuracy beats ego.", "Attempt only when the tree or code is fully clear — a confident 5 beats a shaky 8 under negative marking."]
      },
      {
        type: "quiz",
        question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
        options: ["Grandmother", "Mother", "Sister", "Aunt"],
        correct: 1,
        explain: "'The only daughter of my mother' must be the woman herself, since she is her mother's single daughter. So the man's mother IS the woman — therefore the woman is the man's mother."
      }
    ]
  },
  {
    slug: "bank-reading-comprehension-cloze",
    title: "Reading Comprehension & Cloze Test: Read Smart, Score High",
    summary: "A practical, exam-focused guide to conquering RC and Cloze in IBPS and SBI Prelims - a 4-step RC attack plan, a question-type cheat sheet, and the connector trick that cracks Cloze fast, all tuned for tight timing and 0.25 negative marking.",
    examSlug: "banking",
    subjectSlug: "english-language",
    chapterSlug: "reading-comprehension-cloze",
    readingMinutes: 6,
    practiceTestSlug: "bank-rc-cloze-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The Reservation Chart Trick",
        text: "Remember how you find your name on a train's reservation chart at the platform? You don't read all 72 names top to bottom. You jump straight to your coach, run your finger down, and spot your berth in seconds. A Reading Comprehension passage works exactly the same way. You are not there to enjoy the story, dost - you are there to locate specific answers. Skim for the keyword, land on the right line, done. That mindset alone can turn RC from your slowest section into your fastest."
      },
      {
        type: "para",
        text: "In the IBPS and SBI Prelims, the English section gives you roughly 30 marks in just 20-30 minutes. Reading Comprehension is the biggest chunk (usually 7-10 questions), and Cloze Test adds another 5-10. That means over half your English score hides in these two topics. But here is the trap: there is 0.25 negative marking, and RC tempts you to over-read and waste 4-5 minutes on one passage. The winner is not the person who reads the most - it is the one who reads smart and picks moderate, safe answers."
      },
      {
        type: "heading",
        text: "The 4-Step RC Attack Plan"
      },
      {
        type: "steps",
        title: "How to attack any passage under time pressure",
        items: ["Read the QUESTIONS first (not the options). Circle the keyword in each - a name, a year, a term like 'inflation' or 'MSME'. Now you know what to hunt for.", "Skim the passage, don't study it. The first and last line of each paragraph usually carry the main idea; the middle carries examples you can skip until needed.", "Attack fact/detail questions first - the answer is literally sitting in the passage. Find your keyword, then read that line plus one line above and below.", "Do tone, inference and main-idea questions later - they need judgement, not just location. Vocabulary (synonym/antonym) questions are quick wins; grab them whenever you spot them.", "If two options both look correct and you are just guessing, leave it. One skipped question is safer than one wrong answer (-0.25)."]
      },
      {
        type: "heading",
        text: "Know Your Question Types"
      },
      {
        type: "table",
        headers: ["Question type", "What it actually asks", "How to crack it fast"],
        rows: [
          ["Fact / Detail", "Information stated directly in the passage", "Match the keyword, read that exact line - the answer is there word-for-word or paraphrased"],
          ["Inference", "What is implied but NOT stated", "Pick the 'safe' option; reject anything extreme or that adds new information"],
          ["Tone / Attitude", "How the author feels about the topic", "Scan the adjectives and adverbs - are they positive, critical, or neutral?"],
          ["Main Idea / Title", "The central theme of the whole passage", "Look at the first and last paragraph; choose the broad option, not one narrow detail"],
          ["Vocabulary", "Meaning of a word in THIS context", "Read the full sentence; judge by context, not the first dictionary meaning you recall"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "For inference and tone questions, options with extreme words - 'always', 'never', 'completely', 'only', 'totally' - are usually wrong. Exam-setters love moderate answers. When you are stuck between a strong, sweeping claim and a mild, measured one, the mild one is the safer bet far more often than not."
      },
      {
        type: "heading",
        text: "Worked Example: Tone & Inference"
      },
      {
        type: "example",
        title: "A mini passage, solved the exam way",
        lines: ["Passage: 'Despite the government's tall claims, the new digital-banking rollout has reached only a fraction of rural households. Officials celebrate the numbers, but for a farmer in a village without stable electricity, an app on a phone means very little.'", "Question: What is the author's tone towards the rollout?", "Clue 1: 'tall claims' - this phrase signals the author doubts the official version.", "Clue 2: 'means very little' - the author shows the reality falls short of the claims.", "Eliminate 'enthusiastic' and 'neutral' - the loaded words prove the author is judging, not just reporting.", "Reject 'hostile / angry' - too extreme; the author states facts calmly, not with rage.", "Answer: Critical / Sceptical - the safe, moderate choice that matches both clues."]
      },
      {
        type: "heading",
        text: "Cracking the Cloze Test"
      },
      {
        type: "para",
        text: "A Cloze Test is a short paragraph with blanks, and you pick the word that fits three things at once: grammar, meaning, and tone. The golden rule is to read the WHOLE sentence - and often the next one too - before choosing, because blanks depend on the flow. The secret weapon is connector words. Words like 'but', 'although', 'however', 'despite' signal a contrast (the idea flips), while 'so', 'hence', 'therefore', 'because' signal cause and effect (the idea continues). Spot the connector and half the options collapse instantly."
      },
      {
        type: "example",
        title: "Worked Cloze: let the connector decide",
        lines: ["Sentence: 'The startup grew rapidly, but it soon _____ a shortage of skilled staff.'", "Options: (a) enjoyed  (b) faced  (c) celebrated  (d) welcomed", "Spot the connector: 'but' means the second half must contrast the happy 'grew rapidly' - so we need something negative.", "A shortage is a problem, and you 'face' a problem - that fits both grammar and meaning.", "Reject 'enjoyed', 'celebrated', 'welcomed' - all positive, so they clash with 'but'.", "Answer: (b) faced - the only word that respects the contrast signalled by 'but'."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "The most common Cloze mistake is picking a word that 'sounds nice' but breaks the sentence - wrong verb tense, singular/plural mismatch, or ignoring the connector. A word can have the right meaning and still be wrong if the grammar or the 'but/so' logic does not fit. Always check meaning AND grammar AND connector together."
      },
      {
        type: "keypoints",
        title: "Your 60-second revision before the exam",
        items: ["Read the questions before the passage; hunt keywords, don't read line-by-line.", "Fact questions first, tone and inference last, vocabulary whenever - it's quick.", "Moderate options beat extreme ones ('always/never/only' is usually a trap).", "In Cloze, connectors decide everything: 'but/although' flips the idea, 'so/because' continues it.", "Check grammar + meaning + tone as one combined test for every blank.", "With 0.25 negative marking, skip the one blank you genuinely cannot decide - accuracy over attempts."]
      },
      {
        type: "quiz",
        question: "Choose the best word for the blank: 'Although the scheme was well-designed on paper, poor execution badly _____ its benefits.'",
        options: ["enhanced", "doubled", "undermined", "celebrated"],
        correct: 2,
        explain: "The connector 'Although' sets up a contrast: a good design on paper, but a bad outcome in reality. So the blank needs a negative word. 'Enhanced', 'doubled' and 'celebrated' are all positive and clash with 'poor execution'. Only 'undermined' (meaning weakened or reduced) fits the contrast and the meaning - poor execution weakened the benefits."
      }
    ]
  },
  {
    slug: "bank-error-sentence-improvement",
    title: "Error Detection & Sentence Improvement: The 5 Rules That Crack Every Bank Exam",
    summary: "A fast, exam-focused guide to the five grammar rules — subject-verb agreement, tense, prepositions, articles and parallelism — that power almost every Error Detection and Sentence Improvement question in IBPS and SBI PO/Clerk exams, with a 4-step attack method and two fully worked examples.",
    examSlug: "banking",
    subjectSlug: "english-language",
    chapterSlug: "error-sentence-improvement",
    readingMinutes: 6,
    practiceTestSlug: "bank-error-detection-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "Spot the odd one out",
        text: "Picture a big family wedding photo. Everyone is dressed in bright ethnic wear, and then one cousin turns up in a T-shirt and shorts. Your eye catches him instantly, right? Error Detection works exactly like that. The sentence is the photo; your job is to spot the one word that is 'wearing the wrong clothes'. Once you train your eye on a few fixed rules, wrong grammar starts jumping out at you just as fast."
      },
      {
        type: "para",
        text: "Padho, dost! Error Detection and Sentence Improvement are twins. In both, the examiner shows you a sentence and asks: is the grammar clean, and if not, what fixes it? Together these topics quietly hand you 5-10 easy marks in almost every IBPS and SBI Prelims and Mains paper. The best part? You don't need a huge vocabulary. You need about five grammar rules, applied fast and calmly. Let's make them yours."
      },
      {
        type: "heading",
        text: "The two question types you will see"
      },
      {
        type: "para",
        text: "Error Detection: a sentence is broken into 4-5 parts — (a), (b), (c), (d) and (e). You choose the part that has the mistake. If everything is correct, the answer is 'No error'. Sentence Improvement: one part of the sentence is in bold or underlined, and you pick the option that replaces it best. If the bold part is already fine, you choose 'No improvement'. Different wrapping, same skill inside: knowing which grammar rule is being tested."
      },
      {
        type: "heading",
        text: "The 5 rules that crack ~80% of questions"
      },
      {
        type: "table",
        headers: ["Rule", "What to check", "Wrong ✗", "Right ✓"],
        rows: [
          ["Subject–Verb Agreement", "A singular subject takes a singular verb", "The list of items are ready", "The list of items is ready"],
          ["Tense", "Keep tenses consistent; no illegal jumps", "He said he will come", "He said he would come"],
          ["Prepositions", "Fixed word-pairs (in / on / at / to / for)", "She is married with a doctor", "She is married to a doctor"],
          ["Articles", "a / an / the — sound, first mention, uniqueness", "He is honest man", "He is an honest man"],
          ["Parallelism", "Items in a list share the same form", "Reading, writing and to sing", "Reading, writing and singing"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "The #1 exam trap: the verb agrees with the SUBJECT, never with the noun sitting closest to it. In 'The quality of the answers (was/were) poor', the subject is 'quality' (singular), not 'answers'. Answer: was. Mentally delete the phrase between the subject and the verb, and the correct choice becomes obvious."
      },
      {
        type: "para",
        text: "A few high-frequency sub-rules the examiners love: collective nouns (team, committee, jury, family) usually take a singular verb. 'Each, every, one of, either, neither' (used alone) take a singular verb. 'A number of students' is plural, but 'The number of students' is singular. With 'either...or / neither...nor', the verb follows the NEARER subject (the proximity rule). And for tense: 'since' pulls the present perfect ('I have known him since 2010'), while 'ago' pulls the simple past ('I met him two years ago')."
      },
      {
        type: "steps",
        title: "Your 4-step attack method (under 30 seconds per question)",
        items: ["Read the whole sentence once, fully, before staring at the parts — meaning comes first, grammar second.", "Find the real subject and its main verb, and mentally cross out any phrase sitting between them.", "Run the 5-rule scan in order: Agreement, Tense, Preposition, Article, Parallelism. Stop at the first rule that breaks.", "If nothing breaks a rule, be brave — choose 'No error' / 'No improvement'. Do not invent a mistake that isn't there."]
      },
      {
        type: "example",
        title: "Worked example — Error Detection",
        lines: ["Sentence: One of the students (a) / who scored well (b) / in the exam (c) / have been selected for the interview (d). No error (e)", "Step 1 – Find the subject: it is 'One', not 'students'. The words 'of the students' are just a phrase describing 'One'.", "Step 2 – 'One' is singular, so it needs a singular verb.", "Step 3 – The verb 'have been selected' is plural. That is the mismatch.", "Correction: 'has been selected'.", "Answer: Part (d) has the error."]
      },
      {
        type: "example",
        title: "Worked example — Sentence Improvement",
        lines: ["Sentence: She is good at singing, dancing and TO PAINT.", "The bold part to test: 'and to paint'.", "Step 1 – Look at the list: singing, dancing, ___ . The first two are -ing forms (gerunds).", "Step 2 – Parallelism rule: every item in a list must wear the same grammatical form.", "Step 3 – 'to paint' (an infinitive) breaks the pattern.", "Options: (a) and painting  (b) and paints  (c) and to painting  (d) No improvement.", "Answer: (a) 'and painting' — it matches singing and dancing."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Remember the 0.25 negative marking (one-fourth of a mark). Two silent killers cost aspirants marks here: (1) over-correcting a sentence that is already perfect, and (2) skipping 'No error' out of fear because it 'feels too easy'. Both are traps. Attempt only what you can justify with a rule, aim for 90%+ accuracy, and never guess blindly when two options look identical."
      },
      {
        type: "keypoints",
        title: "60-second revision before the exam",
        items: ["Verb agrees with the subject, not the nearest noun — delete the middle phrase.", "Collective nouns and 'one of / each / every / either / neither' → singular verb.", "'Neither...nor / either...or' → verb follows the nearer subject (proximity rule).", "'Since' → present perfect; 'ago' → simple past; don't shift tenses without reason.", "Learn preposition pairs by heart (married to, superior to, capable of, comply with).", "'A' before consonant sounds, 'an' before vowel sounds — go by SOUND (an hour, a university).", "Lists must be parallel — all gerunds, all infinitives, or all nouns.", "No rule broken? Confidently pick 'No error' / 'No improvement'."]
      },
      {
        type: "quiz",
        question: "Find the part that contains an error: 'Neither the captain (a) / nor the players (b) / were aware of (c) / the new rule (d).' No error (e)",
        options: ["Neither the captain", "nor the players", "were aware of", "the new rule", "No error"],
        correct: 4,
        explain: "With 'neither...nor', the verb follows the proximity rule — it agrees with the nearer subject, which is 'the players' (plural). So 'were' is correct. Every part is grammatically clean, so the right answer is 'No error'. This is exactly why you must never avoid the 'No error' option out of fear."
      }
    ]
  },
  {
    slug: "bank-para-jumbles-fillers",
    title: "Para Jumbles & Sentence Fillers: Crack the Order, Fill the Blank",
    summary: "A from-scratch guide to two easy-scoring English topics in IBPS and SBI PO/Clerk exams. Learn how connectors and pronouns reveal the correct sentence order, how to solve single and double fillers, and the elimination shortcuts that save precious prelims seconds.",
    examSlug: "banking",
    subjectSlug: "english-language",
    chapterSlug: "para-jumbles-fillers",
    readingMinutes: 7,
    practiceTestSlug: "bank-para-jumbles-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The shuffled photo album",
        text: "Imagine your cousin sends you 5 photos from a wedding, but WhatsApp delivers them in a jumbled order. You still work out the real sequence in seconds - the 'guests arriving' photo comes before the 'everyone eating' one, and the big group selfie is obviously last. You do this using clues inside each photo. Para jumbles are exactly the same game: the exam shuffles 4 to 6 sentences, and your job is to spot the clue words that reveal the original order. Padho, dost - once you know the clues, these questions become quick, sure marks."
      },
      {
        type: "para",
        text: "Para Jumbles and Sentence Fillers are two of the most scoring topics in the English section of bank exams. They test one simple skill: do you understand how sentences connect to each other? Unlike Reading Comprehension, you do not need to read a long passage - you just need to catch small signals like 'however', 'this', 'he', or 'the'. In prelims you get roughly 30 to 40 seconds per question, so speed matters. The good news: with a clear method, most students can attempt these in well under a minute with high accuracy."
      },
      {
        type: "heading",
        text: "Para Jumbles: putting the story back in order"
      },
      {
        type: "para",
        text: "In a para jumble, 4 to 6 jumbled sentences (usually labelled A-E or P-T) form a small paragraph when arranged correctly. The exam then asks for the full order, or just one thing like 'Which sentence comes first?' or 'Which sentence is third?'. You do not need to guess randomly - every correct paragraph has a natural flow of ideas, and the sentences leave 'fingerprints' that tell you what comes before what."
      },
      {
        type: "steps",
        title: "The 4-step method for para jumbles",
        items: ["Read all sentences once, fast, just to catch the topic or the story being told.", "Find the OPENING sentence - it introduces a full name, a place, or a general idea, and has NO connector or pronoun pointing backwards (no 'however', 'this', 'they', 'so').", "Find MANDATORY PAIRS - two sentences that must sit together: a noun and the pronoun that refers to it, a cause and its effect, or a question and its answer.", "Fix the CLOSING sentence (often has 'finally', 'today', 'thus', 'as a result'), then match your order against the four options and eliminate - do not re-read everything from scratch."]
      },
      {
        type: "table",
        headers: ["Clue in a sentence", "What it signals", "How to use it"],
        rows: [
          ["Pronouns: he, she, it, they, this, these", "Refers to a noun mentioned earlier", "This sentence cannot be first; place it right after the noun it points to"],
          ["Connectors: however, but, therefore, so", "Link back to a previous idea", "Cannot be the opening sentence"],
          ["Articles: 'a/an' vs 'the'", "'A/an' introduces a thing; 'the' points back to it", "The 'a/an' sentence usually comes before the 'the' sentence"],
          ["Time words: earlier, then, today, finally", "Show the order of events", "Arrange from past to present or future"],
          ["Full name vs pronoun", "A full name introduces a person; a pronoun follows", "The full-name sentence comes before the pronoun sentence"]
        ]
      },
      {
        type: "example",
        title: "Worked example: arrange A-E",
        lines: ["A. However, this changed when smartphones became affordable.", "B. Earlier, only a few people in India had access to the internet.", "C. They could now browse, shop and learn online.", "D. Millions of new users came online within a few years.", "E. Today, India has one of the largest internet user bases in the world.", "Step 1 - Opening: B has no back-connector and sets the scene with 'Earlier', so B is first.", "Step 2 - 'However, this changed' in A refers back to B's situation, so A follows B (pair B-A).", "Step 3 - Cheaper phones caused the surge, so D ('Millions... came online') follows A (pair A-D).", "Step 4 - 'They' in C = those millions of users, so C follows D (pair D-C); E ('Today...') is the conclusion.", "Final order: B A D C E."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Speed shortcut: do NOT solve the whole jumble from scratch. Nail just ONE strong mandatory pair - like a name followed by 'he/she', or 'a scheme' followed by 'the scheme'. Then glance at the four options; usually only one option keeps that pair together in the right order. Mark it and move on. This alone can turn a 90-second question into a 30-second one."
      },
      {
        type: "heading",
        text: "Sentence Fillers: single and double blanks"
      },
      {
        type: "para",
        text: "In fillers, a sentence has one blank (single filler) or two blanks (double filler), and you pick the word or word-pair that fits both the meaning and the grammar. The secret is TONE: is the sentence positive or negative? Is there a contrast word like 'although', 'but', 'despite' (which flips the idea) or a support word like 'and', 'because', 'therefore' (which continues it)? In double fillers, the trap is that one word may fit but its partner does not - so always test the pair together, never just one blank."
      },
      {
        type: "example",
        title: "Worked example: double filler",
        lines: ["Sentence: 'Although the scheme was launched with good ____, poor planning meant very few people actually ____ from it.'", "Blank 1 needs a noun (it follows 'good'); Blank 2 needs a verb (it follows 'actually ____ from it').", "Read the tone: 'Although... poor planning' signals a contrast - a good start but a bad result.", "Blank 1: 'intentions' fits perfectly as 'good intentions'.", "Blank 2: 'benefited' fits as 'benefited from it'.", "Test the pair together: 'good intentions... few people benefited' - the contrast holds. Answer: intentions, benefited."]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Mind the 0.25 negative marking. A blind guess on a 5-sentence jumble is a bad bet. But if you are sure of even one mandatory pair, you can often eliminate 2-3 options and then guess between the last two - that is a smart, calculated risk. The rule: eliminate first, then decide. Never mark an answer with zero clues in hand."
      },
      {
        type: "keypoints",
        title: "Quick revision before the exam",
        items: ["Opening sentence = no pronoun, no connector pointing back; it introduces the topic or a full name.", "Pronouns (he/she/it/they/this) and connectors (however/so/therefore) always follow something - never first.", "Solve one strong mandatory pair, then use the options to eliminate instead of re-reading.", "For fillers, first decide the tone (positive/negative) and spot contrast words like although, but, despite.", "In double fillers, always test BOTH words together before marking.", "Practice daily - aim for 30 to 40 seconds per question so these become your fast, high-accuracy marks."]
      },
      {
        type: "quiz",
        question: "Pick the pair that best fills both blanks: 'The new policy will ____ the burden on small farmers and ____ them to invest in better seeds.'",
        options: ["increase ... allow", "reduce ... enable", "reduce ... prevent", "raise ... force"],
        correct: 1,
        explain: "The policy is meant to help small farmers, so the tone is positive and the two ideas support each other. 'reduce the burden' and 'enable them to invest' both fit that helpful, cause-and-effect flow. 'prevent them to invest' is negative and grammatically wrong (it would need 'prevent... from'), while 'increase/raise the burden' contradicts a policy designed to help. So 'reduce... enable' is correct."
      }
    ]
  },
  {
    slug: "bank-banking-regulators-rbi",
    title: "Banking Regulators and the RBI: The Referees of India's Money",
    summary: "A clear, exam-ready guide to India's financial regulators — what the RBI is and does, how its monetary-policy tools (repo, reverse repo, CRR, SLR) work, and the distinct roles of SEBI, IRDAI and PFRDA.",
    examSlug: "banking",
    subjectSlug: "banking-financial-awareness",
    chapterSlug: "banking-regulators-rbi",
    readingMinutes: 7,
    practiceTestSlug: "bank-rbi-regulators-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "The referee of India's money game",
        text: "Imagine India's economy as a giant cricket match, with thousands of banks as the players. Someone has to make the rules, keep score of how money flows, and blow the whistle when things get out of hand. That head referee is the Reserve Bank of India (RBI). And just as different sports need different referees, India has separate regulators for the share market, insurance and pensions too. Let's meet them all, dost, and see exactly how each one keeps the game fair."
      },
      {
        type: "heading",
        text: "Meet the RBI: India's Central Bank"
      },
      {
        type: "para",
        text: "The RBI is India's central bank — the bank that stands above all other banks. It was set up under the RBI Act, 1934, began operations on 1 April 1935, and was nationalised (fully taken over by the government) on 1 January 1949. Its central office is in Mumbai. Think of it as the guardian of the rupee: it decides how much money flows through the economy, keeps prices stable, and makes sure banks stay safe and honest so that your deposits are protected."
      },
      {
        type: "keypoints",
        title: "What the RBI actually does",
        items: ["Monetary authority — frames and runs monetary policy to control inflation and support growth", "Sole issuer of currency notes (except the one-rupee note and coins, which come from the Government of India)", "Banker to the government — manages the government's accounts and public debt", "Banker's bank — other banks keep accounts with it and can borrow from it", "Regulator and supervisor of the banking and financial system", "Manager of India's foreign exchange reserves under FEMA (Foreign Exchange Management Act)", "Regulator of payment and settlement systems — such as NEFT and RTGS (which the RBI itself operates) and UPI (built by NPCI under RBI's regulation)"]
      },
      {
        type: "callout",
        tone: "info",
        text: "Favourite exam point: the RBI issues all currency notes EXCEPT the one-rupee note and coins — those are issued by the Government of India. The one-rupee note carries the Finance Secretary's signature, while every higher denomination note carries the RBI Governor's signature."
      },
      {
        type: "heading",
        text: "How the RBI Controls Money: Monetary Policy Tools"
      },
      {
        type: "para",
        text: "Monetary policy is simply the RBI's plan for managing the supply and cost of money. The big decisions are taken by the Monetary Policy Committee (MPC), a six-member team in which the RBI Governor has a casting (deciding) vote if there is a tie. Its job is to hit a medium-term inflation target that the government sets in consultation with the RBI. To do this, the RBI uses four main tools. The first two change the PRICE of money; the last two change HOW MUCH money banks can lend."
      },
      {
        type: "table",
        headers: ["Tool", "What it is", "Effect when it is raised"],
        rows: [
          ["Repo Rate", "Rate at which the RBI lends short-term money to banks against government securities", "Borrowing turns costlier; liquidity in the system tightens"],
          ["Reverse Repo Rate", "Rate at which banks park their surplus funds with the RBI", "Banks park more with the RBI; extra money is absorbed"],
          ["CRR (Cash Reserve Ratio)", "Share of a bank's deposits (NDTL) that must be kept as cash with the RBI; earns no interest", "Less money is left with banks to lend out"],
          ["SLR (Statutory Liquidity Ratio)", "Share of deposits a bank must hold in liquid assets — cash, gold, approved government securities — with itself", "Less money is free for lending"]
        ]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common mix-up: CRR must be kept as CASH with the RBI and earns NO interest. SLR is kept by the BANK ITSELF in liquid assets like cash, gold and approved government securities (and those securities can earn a return). Both are calculated on the bank's NDTL — Net Demand and Time Liabilities."
      },
      {
        type: "example",
        title: "Illustration: how a repo-rate hike cools inflation",
        lines: ["Prices are rising too fast, so the MPC decides to raise the repo rate (an illustrative move).", "Borrowing from the RBI now costs banks more, so banks raise their own lending rates.", "Home, car and business loans become costlier — EMIs go up.", "People and companies borrow and spend less, so demand in the economy cools.", "With demand easing, the rise in prices (inflation) slowly comes under control."]
      },
      {
        type: "formula",
        text: "Rule of thumb: Repo rate UP -> loans costlier -> spending DOWN -> inflation DOWN. When the repo rate falls, the chain reverses and borrowing is encouraged."
      },
      {
        type: "heading",
        text: "The Other Big Regulators: SEBI, IRDAI, PFRDA"
      },
      {
        type: "para",
        text: "The RBI looks after banks, but your money also travels into shares, insurance policies and pension funds — and each of those needs its own expert referee. That is why India has three more key financial regulators. Knowing who guards what is a guaranteed mark in your exam."
      },
      {
        type: "table",
        headers: ["Regulator", "Full form", "What it regulates", "HQ"],
        rows: [
          ["RBI", "Reserve Bank of India", "Banks, monetary policy, currency", "Mumbai"],
          ["SEBI", "Securities and Exchange Board of India", "Securities and stock markets, investor protection, mutual funds", "Mumbai"],
          ["IRDAI", "Insurance Regulatory and Development Authority of India", "The insurance sector (life and general insurance)", "Hyderabad"],
          ["PFRDA", "Pension Fund Regulatory and Development Authority", "Pensions, including the National Pension System (NPS)", "New Delhi"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Easy memory hook: SEBI = Shares, IRDAI = Insurance, PFRDA = Pensions. Three regulators, three simple words — repeat them once and they stick, dost!"
      },
      {
        type: "keypoints",
        title: "Quick revision before you close",
        items: ["RBI Act 1934; RBI began operations on 1 April 1935; nationalised on 1 January 1949; central office in Mumbai", "The six-member MPC decides the policy repo rate, with the Governor holding the casting vote", "Repo and reverse repo change the COST of money; CRR and SLR change how much banks CAN LEND", "CRR is cash kept with the RBI (no interest); SLR is liquid assets held by the bank itself", "Regulators to remember: SEBI - securities, IRDAI - insurance, PFRDA - pensions"]
      },
      {
        type: "quiz",
        question: "Which reserve requirement must banks keep as cash with the RBI, on which they earn no interest?",
        options: ["Statutory Liquidity Ratio (SLR)", "Cash Reserve Ratio (CRR)", "Repo Rate", "Reverse Repo Rate"],
        correct: 1,
        explain: "CRR (Cash Reserve Ratio) is the share of a bank's deposits (NDTL) that must be held as cash with the RBI, and it earns no interest. SLR, by contrast, is maintained by the bank itself in liquid assets like cash, gold and approved government securities, while repo and reverse repo are interest rates, not reserve requirements."
      }
    ]
  },
  {
    slug: "bank-banks-accounts-types",
    title: "Banks & Types of Accounts: Your Simple Map to India's Banking System",
    summary: "A clear, exam-ready guide to India's bank types (public, private, RRB, Small Finance and Payments), every deposit account (savings, current, RD, FD, NRE/NRO), and KYC basics, all taught from scratch with simple Indian analogies.",
    examSlug: "banking",
    subjectSlug: "banking-financial-awareness",
    chapterSlug: "banks-accounts-types",
    readingMinutes: 7,
    practiceTestSlug: "bank-accounts-types-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "One market, many kinds of shops",
        text: "Walk through any Indian bazaar and you will spot a giant department store, a specialised electronics shop, a tiny kirana serving just one lane, and a recharge counter that only takes payments. India's banks work exactly like that: different types built for different jobs, all watched over by one market-in-charge, the Reserve Bank of India (RBI). Once you see the 'shops', this whole chapter becomes easy. Chalo, let's map it out."
      },
      {
        type: "para",
        text: "Every bank in India, big or small, works under the watch of the Reserve Bank of India (RBI), the country's central bank and banking regulator. The RBI issues licences, sets the rules, and decides what each type of bank is allowed to do. We can sort banks in two simple ways: by who owns them (public or private), and by the special job they were created for (rural, small-borrower, or payments-focused)."
      },
      {
        type: "heading",
        text: "Types of Banks in India"
      },
      {
        type: "table",
        headers: ["Type of Bank", "Ownership / How it is set up", "What it mainly does"],
        rows: [
          ["Public Sector Bank (PSB)", "Government holds the majority stake", "Full-service banking with wide branch reach (e.g. SBI, PNB)"],
          ["Private Sector Bank", "Private shareholders hold the majority stake", "Full-service, often tech-focused banking (e.g. HDFC Bank, ICICI Bank)"],
          ["Regional Rural Bank (RRB)", "Jointly owned by the Central Govt, a sponsor bank and the State Govt", "Rural and agricultural banking for small farmers and artisans"],
          ["Small Finance Bank (SFB)", "Licensed by the RBI under the Banking Regulation Act", "Serves the underserved: small loans, micro-enterprises, small farmers"],
          ["Payments Bank", "Licensed by the RBI; often set up by telecom or fintech firms", "Deposits, payments and remittances only; cannot give loans"]
        ]
      },
      {
        type: "callout",
        tone: "warn",
        text: "A favourite exam trap: Payments Banks and Small Finance Banks are NOT the same. A Payments Bank can accept deposits and handle payments but cannot lend money or issue credit cards. A Small Finance Bank can do both: take deposits AND give loans. Mix these up and you lose an easy mark."
      },
      {
        type: "keypoints",
        title: "Special-purpose banks at a glance",
        items: ["RRBs were created to take banking to rural India, focusing on farmers, agricultural labourers and small artisans.", "Each RRB is jointly owned by the Central Government, a sponsor commercial bank, and the State Government.", "Small Finance Banks must lend a large share of their money to priority sectors like agriculture and small businesses, as set by the RBI.", "Payments Banks can offer savings/deposit accounts, debit cards and remittances, but cannot offer loans, credit cards, or NRI deposits.", "A Payments Bank can accept deposits only up to a per-customer limit set by the RBI."]
      },
      {
        type: "heading",
        text: "Types of Deposit Accounts"
      },
      {
        type: "table",
        headers: ["Account Type", "Best for", "Interest", "Key feature"],
        rows: [
          ["Savings Account", "Individuals saving money", "Yes, a modest rate", "Encourages saving; some limits on free transactions"],
          ["Current Account", "Businesses and heavy transactors", "Usually none", "Unlimited transactions; overdraft facility available"],
          ["Recurring Deposit (RD)", "Regular monthly savers", "Higher than a savings account", "A fixed amount deposited every month for a set tenure"],
          ["Fixed Deposit (FD)", "Parking a lump sum", "Usually the highest of these", "One-time deposit locked for a fixed tenure; penalty on early withdrawal"]
        ]
      },
      {
        type: "analogy",
        title: "Gullak vs. one big jar",
        text: "A Recurring Deposit is like dropping a fixed amount into your gullak every single month, where the saving habit does the hard work. A Fixed Deposit is like taking one big jar of money you already have and locking it in the cupboard for a year so it grows quietly, undisturbed. Same goal, different style."
      },
      {
        type: "example",
        title: "Worked example: FD vs RD for the same year",
        lines: ["Riya has Rs 50,000 saved from her internship and won't need it for a year.", "She opens a 1-year Fixed Deposit. Assume, only for the maths, an illustrative rate of 7% a year (real rates change over time and differ by bank).", "Interest for 1 year = 50,000 x 7% = Rs 3,500.", "On maturity she gets 50,000 + 3,500 = Rs 53,500.", "Her friend Aman instead saves Rs 5,000 every month in a Recurring Deposit for the same year.", "Aman deposits 5,000 x 12 = Rs 60,000 in total, and earns interest on each monthly deposit.", "Lesson: an FD suits a lump sum you already have; an RD suits building savings from monthly income."]
      },
      {
        type: "heading",
        text: "NRE vs NRO Accounts (for NRIs)"
      },
      {
        type: "para",
        text: "A Non-Resident Indian (NRI) cannot run an ordinary resident savings account, so banks offer two special rupee accounts. The trick is simply to remember where the money comes from: money earned abroad, or money earned in India."
      },
      {
        type: "table",
        headers: ["Feature", "NRE Account", "NRO Account"],
        rows: [
          ["Full form", "Non-Resident External", "Non-Resident Ordinary"],
          ["Money you deposit", "Foreign income earned abroad", "Income earned in India (rent, pension, dividends)"],
          ["Repatriation (sending money abroad)", "Freely repatriable", "Allowed within limits set by the RBI"],
          ["Tax on interest in India", "Interest is tax-free in India", "Interest is taxable in India"]
        ]
      },
      {
        type: "heading",
        text: "KYC: Know Your Customer"
      },
      {
        type: "para",
        text: "KYC stands for Know Your Customer. It is the process a bank uses to confirm you really are who you say you are, by verifying your identity and your address. The RBI makes KYC compulsory under the Prevention of Money Laundering Act (PMLA), 2002, to stop fraud, money laundering and fake accounts. No KYC, no account: it is the very first gate you pass through before any account opens."
      },
      {
        type: "steps",
        title: "How KYC works when you open an account",
        items: ["Fill the account opening form and give one Officially Valid Document (OVD) as Proof of Identity, such as Aadhaar, Passport, Voter ID or Driving Licence.", "Provide Proof of Address; many OVDs conveniently prove both identity and address at once.", "Submit your PAN (or Form 60 if you do not have a PAN).", "The bank verifies your documents, often instantly through Aadhaar-based e-KYC.", "Later, the bank may ask you to refresh your details from time to time, known as periodic re-KYC."]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Quick memory hook. Sort banks two ways: by OWNERSHIP (Public vs Private) and by SPECIAL PURPOSE (RRB for rural, SFB for small borrowers, Payments for payments only). For accounts, remember CASA, Current Account and Savings Account, the low-cost deposits every bank loves to chase."
      },
      {
        type: "quiz",
        question: "Which of these is a Payments Bank allowed to do?",
        options: ["Give home loans to its customers", "Issue credit cards", "Accept deposits and offer remittance services", "Open NRE/NRO accounts for NRIs"],
        correct: 2,
        explain: "A Payments Bank can accept deposits (up to a limit set by the RBI) and offer payments and remittances. It cannot lend, issue credit cards, or accept NRI deposits, which is exactly what separates it from a full-service or Small Finance Bank."
      }
    ]
  },
  {
    slug: "bank-financial-terms-abbreviations",
    title: "Financial Terms & Abbreviations: Payment Systems and Banking Jargon Made Simple",
    summary: "A beginner-friendly guide to India's digital payment systems (NEFT, RTGS, IMPS, UPI) and the must-know banking abbreviations (NPA, CASA, MCLR, EMI, KYC, CIBIL) for IBPS and SBI bank exams, with a comparison table, a worked EMI example, and exam-trap warnings.",
    examSlug: "banking",
    subjectSlug: "banking-financial-awareness",
    chapterSlug: "financial-terms-abbreviations",
    readingMinutes: 7,
    practiceTestSlug: "bank-financial-terms-practice-1",
    blocks: [
      {
        type: "analogy",
        title: "Sending money is like sending a parcel",
        text: "Imagine you want to send something to a friend. If it is small and you want it there this second, you use a quick courier. If it is a heavy, valuable package, you pick a premium service built for big loads. If you can wait a little, a regular batch delivery is cheaper and perfectly fine. India's payment systems work exactly this way: NEFT, RTGS, IMPS and UPI are simply different 'delivery services' for money, and the smart aspirant knows which one fits which need. Padho, dost, and these abbreviations will feel like old friends by the end."
      },
      {
        type: "heading",
        text: "How Money Moves: India's Digital Payment Systems"
      },
      {
        type: "para",
        text: "Every rupee that moves electronically in India runs on rails regulated by the RBI (Reserve Bank of India). Two of the systems, NEFT and RTGS, are operated directly by the RBI itself. The other two, IMPS and UPI, are operated by the NPCI (National Payments Corporation of India), an umbrella body for retail payments that the RBI helped set up. Keep this 'who runs what' clear in your head, because it is one of the most repeated questions in bank exams."
      },
      {
        type: "table",
        headers: ["System", "Full Form", "Run By", "Speed", "Good For"],
        rows: [
          ["NEFT", "National Electronic Funds Transfer", "RBI", "Settles in batches, available 24x7", "Any amount, no minimum limit"],
          ["RTGS", "Real Time Gross Settlement", "RBI", "Real-time, one transaction at a time, 24x7", "Large-value transfers (a minimum threshold applies, traditionally 2 lakh)"],
          ["IMPS", "Immediate Payment Service", "NPCI", "Instant, 24x7", "Quick small and medium transfers"],
          ["UPI", "Unified Payments Interface", "NPCI", "Instant, 24x7", "App-based payments using a VPA (UPI ID)"]
        ]
      },
      {
        type: "callout",
        tone: "tip",
        text: "Easy memory hook: the 'R' in RTGS stands for Real-time AND reminds you it is for Rich (large-value) transfers, which carry a minimum threshold. NEFT has NO minimum, so it is your everyday, any-amount option. Both are RBI-run; anything you tap on a phone app (IMPS/UPI) is NPCI-run."
      },
      {
        type: "heading",
        text: "Must-Know Banking Terms & Abbreviations"
      },
      {
        type: "keypoints",
        title: "Five terms in one glance",
        items: ["NPA (Non-Performing Asset): a loan on which interest or principal stays overdue for 90 days or more. It stops earning income for the bank.", "CASA (Current Account Savings Account): the share of low-cost current and savings deposits in a bank's total deposits. A higher CASA ratio means cheaper funds for the bank.", "MCLR (Marginal Cost of Funds based Lending Rate): the internal benchmark below which a bank generally cannot lend. Each bank calculates its own MCLR under RBI guidelines.", "KYC (Know Your Customer): the identity and address verification a bank carries out (using documents like Aadhaar and PAN) before and during a customer relationship, to prevent fraud and money laundering.", "CIBIL (Credit Information Bureau (India) Limited): a credit information company. A CIBIL score ranges from 300 to 900, and a higher score signals a stronger loan-repayment record."]
      },
      {
        type: "para",
        text: "Two of these deserve extra attention because examiners love them. For NPA, remember the magic number is 90 days overdue, which is why NPAs are also called 'bad loans' or 'stressed assets'. For CASA, the logic is simple: savings and current accounts pay little or no interest to the customer, so the more of them a bank has, the cheaper its money is and the more it can earn when it lends. That is why banks proudly announce a rising CASA ratio."
      },
      {
        type: "heading",
        text: "EMI: The One With a Formula"
      },
      {
        type: "formula",
        text: "EMI = [ P x r x (1 + r)^n ] / [ (1 + r)^n - 1 ]  |  where P = loan amount, r = monthly interest rate (annual rate / 12 / 100), and n = number of monthly installments."
      },
      {
        type: "example",
        title: "Worked example: EMI on a 1,00,000 loan",
        lines: ["Loan amount P = 1,00,000, annual interest = 12%, tenure = 12 months", "Step 1 - Monthly rate r = 12 / 12 / 100 = 0.01", "Step 2 - (1 + r)^n = (1.01)^12 = about 1.1268", "Step 3 - Numerator = 100000 x 0.01 x 1.1268 = 1126.8", "Step 4 - Denominator = 1.1268 - 1 = 0.1268", "Step 5 - EMI = 1126.8 / 0.1268 = about 8,885 per month", "Check - Total repaid = 8885 x 12 = 1,06,620, so interest paid = about 6,620"]
      },
      {
        type: "callout",
        tone: "warn",
        text: "Common exam traps to avoid: (1) NEFT and RTGS are run by the RBI, while IMPS, UPI and RuPay are run by the NPCI, do not mix them up. (2) A loan becomes an NPA only after 90 days overdue, not 30 or 60. (3) A HIGHER CIBIL score (closer to 900) is better, not lower. (4) RTGS is for large-value transfers with a minimum threshold, whereas NEFT has no minimum at all."
      },
      {
        type: "keypoints",
        title: "Quick revision before you close the book",
        items: ["RBI regulates all payment systems; RBI operates NEFT and RTGS; NPCI operates IMPS and UPI.", "RTGS = real-time + large value (minimum threshold applies); NEFT = any amount, batch settlement; IMPS and UPI = instant, 24x7.", "NPA = overdue 90 days or more; CASA = low-cost deposits, higher is better for the bank.", "MCLR = a bank's internal lending benchmark; KYC = customer identity verification; CIBIL score runs 300 to 900.", "EMI spreads a loan into equal monthly payments; more months usually means more total interest paid."]
      },
      {
        type: "quiz",
        question: "A borrower has not paid the interest or principal on a bank loan for the last three months. As per the standard classification norm, this loan should now be treated as a:",
        options: ["Standard asset", "Non-Performing Asset (NPA)", "CASA deposit", "Priority-sector loan"],
        correct: 1,
        explain: "A loan on which interest or principal remains overdue for 90 days (about three months) or more is classified as a Non-Performing Asset (NPA). A 'standard asset' is a performing loan, CASA refers to low-cost deposits (not loans), and priority-sector lending is a category of where loans are directed, not a measure of repayment status."
      }
    ]
  },
];

export const getExplainer = (slug: string) => explainers.find((e) => e.slug === slug);
