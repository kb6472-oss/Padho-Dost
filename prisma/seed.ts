import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { exams as examCatalogue } from "../src/lib/exams";
import { explainers as explainerContent } from "../src/content/explainers";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type Q = {
  text: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
};
type ChapterContent = {
  slug: string;
  name: string;
  marks: number;
  negative: number;
  test: { slug: string; title: string; description: string };
  questions: Q[];
};
type SubjectContent = { slug: string; name: string; chapters: ChapterContent[] };
type ExamContent = { examSlug: string; subjects: SubjectContent[] };

// Helper to keep option lists terse.
const opts = (correctIndex: number, ...texts: string[]) =>
  texts.map((text, i) => ({ text, isCorrect: i === correctIndex }));

const content: ExamContent[] = [
  {
    examSlug: "ssc-cgl",
    subjects: [
      {
        slug: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        chapters: [
          {
            slug: "profit-and-loss",
            name: "Profit & Loss",
            marks: 2,
            negative: 0.5,
            test: {
              slug: "profit-loss-practice-1",
              title: "Profit & Loss — Practice Test",
              description: "6 SSC-style Profit & Loss questions with full solutions. +2 correct, −0.5 wrong.",
            },
            questions: [
              {
                text: "A shopkeeper buys a watch for ₹800 and sells it at a profit of 25%. What is the selling price?",
                difficulty: "EASY",
                explanation:
                  "SP = CP × (100 + Profit%)/100 = 800 × 125/100 = ₹1000. Shortcut: 25% of 800 = 200, so SP = 800 + 200 = ₹1000.",
                options: opts(1, "₹950", "₹1000", "₹1025", "₹900"),
              },
              {
                text: "A book is bought for ₹500 and sold for ₹450. What is the loss percentage?",
                difficulty: "EASY",
                explanation: "Loss = 500 − 450 = ₹50. Loss% = (Loss/CP) × 100 = (50/500) × 100 = 10% (always on Cost Price).",
                options: opts(1, "9%", "10%", "11%", "12%"),
              },
              {
                text: "An article is sold for ₹575 at a profit of 15%. What is its cost price?",
                difficulty: "MEDIUM",
                explanation: "CP = SP × 100/(100 + Profit%) = 575 × 100/115 = ₹500. Check: 15% of 500 = 75, 500 + 75 = 575. ✓",
                options: opts(1, "₹490", "₹500", "₹510", "₹525"),
              },
              {
                text: "By selling 33 metres of cloth, a shopkeeper gains the selling price of 11 metres. Find the gain percent.",
                difficulty: "HARD",
                explanation: "Gain = SP of 11 m. So CP of 33 m = SP of (33 − 11) = 22 m. Gain% = (11/22) × 100 = 50%.",
                options: opts(2, "33⅓%", "40%", "50%", "60%"),
              },
              {
                text: "A man buys an article for ₹27.50 and sells it for ₹28.60. What is his gain percent?",
                difficulty: "MEDIUM",
                explanation: "Gain = 28.60 − 27.50 = ₹1.10. Gain% = (1.10/27.50) × 100 = 4%.",
                options: opts(1, "3%", "4%", "4.5%", "5%"),
              },
              {
                text: "If the selling price of an article is doubled, the profit triples. Find the profit percentage.",
                difficulty: "HARD",
                explanation: "Let CP = x, SP = s. Then 2s − x = 3(s − x) → 2x = s. Profit = s − x = x → Profit% = 100%.",
                options: opts(2, "50%", "75%", "100%", "150%"),
              },
            ],
          },
          {
            slug: "percentages",
            name: "Percentages",
            marks: 2,
            negative: 0.5,
            test: {
              slug: "percentages-practice-1",
              title: "Percentages — Practice Test",
              description: "6 SSC-style Percentage questions with shortcuts. +2 correct, −0.5 wrong.",
            },
            questions: [
              {
                text: "What is 25% of 240?",
                difficulty: "EASY",
                explanation: "25% = 1/4, so 240 ÷ 4 = 60.",
                options: opts(1, "50", "60", "65", "70"),
              },
              {
                text: "A number is first increased by 20% and then decreased by 20%. What is the net change?",
                difficulty: "MEDIUM",
                explanation: "Net factor = 1.2 × 0.8 = 0.96, i.e. 96% of original → a net decrease of 4%.",
                options: opts(1, "No change", "4% decrease", "4% increase", "2% decrease"),
              },
              {
                text: "A student scored 45 marks out of 60. What percentage did the student score?",
                difficulty: "EASY",
                explanation: "(45/60) × 100 = 75%.",
                options: opts(2, "70%", "72%", "75%", "80%"),
              },
              {
                text: "40% of a number is 80. What is the number?",
                difficulty: "EASY",
                explanation: "Number = 80 ÷ 0.40 = 200.",
                options: opts(1, "180", "200", "220", "240"),
              },
              {
                text: "The price of an item rose from ₹500 to ₹575. What is the percentage increase?",
                difficulty: "MEDIUM",
                explanation: "Increase = 75. % increase = (75/500) × 100 = 15%.",
                options: opts(1, "12%", "15%", "18%", "20%"),
              },
              {
                text: "In an election between two candidates, the winner got 60% of the votes and won by 1600 votes. What was the total number of votes?",
                difficulty: "HARD",
                explanation: "Margin = 60% − 40% = 20% of total = 1600 → total = 1600 × 100/20 = 8000.",
                options: opts(2, "6000", "7000", "8000", "9000"),
              },
            ],
          },
          {
            slug: "simple-interest",
            name: "Simple Interest",
            marks: 2,
            negative: 0.5,
            test: {
              slug: "simple-interest-practice-1",
              title: "Simple Interest — Practice Test",
              description: "6 SSC-style Simple Interest questions with full solutions. +2 correct, −0.5 wrong.",
            },
            questions: [
              {
                text: "Find the simple interest on ₹1000 at 5% per annum for 2 years.",
                difficulty: "EASY",
                explanation: "SI = P × R × T / 100 = 1000 × 5 × 2 / 100 = ₹100.",
                options: opts(1, "₹50", "₹100", "₹150", "₹200"),
              },
              {
                text: "At what rate per annum will ₹2000 give ₹400 as simple interest in 4 years?",
                difficulty: "MEDIUM",
                explanation: "400 = 2000 × R × 4 / 100 = 80R → R = 5%.",
                options: opts(1, "4%", "5%", "6%", "8%"),
              },
              {
                text: "In how many years will ₹1500 amount to ₹1800 at 5% per annum simple interest?",
                difficulty: "MEDIUM",
                explanation: "SI = 1800 − 1500 = 300. 300 = 1500 × 5 × T / 100 = 75T → T = 4 years.",
                options: opts(1, "3", "4", "5", "6"),
              },
              {
                text: "The simple interest on a sum for 3 years at 8% per annum is ₹600. Find the sum.",
                difficulty: "MEDIUM",
                explanation: "600 = P × 8 × 3 / 100 = 0.24P → P = 600 / 0.24 = ₹2500.",
                options: opts(2, "₹2000", "₹2200", "₹2500", "₹3000"),
              },
              {
                text: "A sum of money doubles itself in 10 years at simple interest. What is the rate of interest?",
                difficulty: "HARD",
                explanation: "Doubling means SI = P over 10 years. P = P × R × 10 / 100 → R = 10%.",
                options: opts(1, "8%", "10%", "12%", "15%"),
              },
              {
                text: "What is the amount on ₹800 at 10% per annum simple interest for 3 years?",
                difficulty: "EASY",
                explanation: "SI = 800 × 10 × 3 / 100 = ₹240. Amount = 800 + 240 = ₹1040.",
                options: opts(1, "₹1000", "₹1040", "₹1080", "₹1100"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "class-10",
    subjects: [
      {
        slug: "mathematics",
        name: "Mathematics",
        chapters: [
          {
            slug: "real-numbers",
            name: "Real Numbers",
            marks: 1,
            negative: 0,
            test: {
              slug: "real-numbers-practice-1",
              title: "Real Numbers — Practice Test",
              description: "6 CBSE Class 10 Real Numbers questions with solutions. +1 each, no negative marking.",
            },
            questions: [
              {
                text: "What is the HCF of 12 and 18?",
                difficulty: "EASY",
                explanation: "12 = 2²×3, 18 = 2×3². Common factors: 2×3 = 6. So HCF = 6.",
                options: opts(2, "2", "3", "6", "9"),
              },
              {
                text: "What is the LCM of 4 and 6?",
                difficulty: "EASY",
                explanation: "Multiples of 4: 4, 8, 12… Multiples of 6: 6, 12… The smallest common one is 12.",
                options: opts(1, "10", "12", "18", "24"),
              },
              {
                text: "For any two positive integers, HCF × LCM equals:",
                difficulty: "MEDIUM",
                explanation: "A key property: HCF(a,b) × LCM(a,b) = a × b (the product of the two numbers).",
                options: opts(1, "the sum of the numbers", "the product of the numbers", "the difference", "the quotient"),
              },
              {
                text: "Which of the following is an irrational number?",
                difficulty: "MEDIUM",
                explanation: "√2 cannot be written as p/q, so it is irrational. 0.5, 2/3 and 1.75 are all rational.",
                options: opts(2, "0.5", "2/3", "√2", "1.75"),
              },
              {
                text: "The decimal expansion of a rational number is either terminating or:",
                difficulty: "MEDIUM",
                explanation: "Every rational number has a decimal expansion that is terminating or non-terminating recurring (repeating).",
                options: opts(1, "non-terminating non-repeating", "non-terminating repeating", "always terminating", "undefined"),
              },
              {
                text: "If the HCF of two numbers is 1, the numbers are called:",
                difficulty: "EASY",
                explanation: "Two numbers with HCF = 1 share no common factor other than 1 — they are called co-prime.",
                options: opts(1, "equal", "co-prime", "composite", "even"),
              },
            ],
          },
          {
            slug: "linear-equations",
            name: "Pair of Linear Equations",
            marks: 1,
            negative: 0,
            test: {
              slug: "linear-equations-practice-1",
              title: "Pair of Linear Equations — Practice Test",
              description: "6 CBSE Class 10 questions on linear equations in two variables. +1 each, no negative marking.",
            },
            questions: [
              {
                text: "The graph of a linear equation in two variables is a:",
                difficulty: "EASY",
                explanation: "Any equation of the form ax + by + c = 0 graphs as a straight line.",
                options: opts(2, "circle", "parabola", "straight line", "curve"),
              },
              {
                text: "A pair of two intersecting lines has how many solutions?",
                difficulty: "EASY",
                explanation: "Intersecting lines meet at exactly one point, giving a unique solution.",
                options: opts(1, "no solution", "exactly one", "two", "infinitely many"),
              },
              {
                text: "The pair x + y = 5 and 2x + 2y = 10 has:",
                difficulty: "MEDIUM",
                explanation: "The second equation is just twice the first — they are the same line, so there are infinitely many solutions.",
                options: opts(2, "no solution", "exactly one solution", "infinitely many solutions", "two solutions"),
              },
              {
                text: "Solve x + y = 7 and x − y = 3. What is the value of x?",
                difficulty: "MEDIUM",
                explanation: "Add the equations: 2x = 10 → x = 5 (and y = 2).",
                options: opts(2, "3", "4", "5", "6"),
              },
              {
                text: "The pair x + y = 4 and x + y = 6 has:",
                difficulty: "MEDIUM",
                explanation: "Same left side but different right side → parallel lines that never meet → no solution.",
                options: opts(0, "no solution", "one solution", "infinitely many", "two solutions"),
              },
              {
                text: "If a pair of linear equations is consistent, the lines are:",
                difficulty: "HARD",
                explanation: "Consistent means at least one solution exists — the lines either intersect (one solution) or are coincident (infinitely many).",
                options: opts(1, "always parallel", "intersecting or coincident", "always perpendicular", "never meeting"),
              },
            ],
          },
        ],
      },
      {
        slug: "science",
        name: "Science",
        chapters: [
          {
            slug: "chemical-reactions",
            name: "Chemical Reactions & Equations",
            marks: 1,
            negative: 0,
            test: {
              slug: "chemical-reactions-practice-1",
              title: "Chemical Reactions & Equations — Practice Test",
              description: "6 CBSE Class 10 Science questions with solutions. +1 each, no negative marking.",
            },
            questions: [
              {
                text: "Rusting of iron is an example of which type of reaction?",
                difficulty: "EASY",
                explanation: "Iron combines slowly with oxygen (and moisture) — it gains oxygen, so rusting is an oxidation reaction.",
                options: opts(1, "Reduction", "Oxidation", "Displacement", "Decomposition"),
              },
              {
                text: "In a balanced chemical equation, the number of atoms of each element is:",
                difficulty: "EASY",
                explanation: "By the law of conservation of mass, atoms of each element must be equal on both sides of the equation.",
                options: opts(2, "more on the left", "more on the right", "equal on both sides", "zero"),
              },
              {
                text: "A reaction in which a single compound breaks down into two or more simpler substances is called:",
                difficulty: "MEDIUM",
                explanation: "Breaking one compound into simpler ones is a decomposition reaction (e.g. 2H₂O → 2H₂ + O₂).",
                options: opts(1, "Combination", "Decomposition", "Displacement", "Double displacement"),
              },
              {
                text: "When quicklime (CaO) reacts with water, the reaction is:",
                difficulty: "MEDIUM",
                explanation: "CaO + H₂O → Ca(OH)₂ releases a large amount of heat, so it is an exothermic reaction.",
                options: opts(1, "Endothermic", "Exothermic", "Displacement", "Reduction"),
              },
              {
                text: "Which gas is released when zinc reacts with dilute hydrochloric acid?",
                difficulty: "EASY",
                explanation: "Zn + 2HCl → ZnCl₂ + H₂↑. Hydrogen gas is released.",
                options: opts(1, "Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"),
              },
              {
                text: "In a reaction, the substance that gains oxygen is said to be:",
                difficulty: "MEDIUM",
                explanation: "Gaining oxygen (or losing hydrogen) is oxidation — so that substance is oxidised.",
                options: opts(1, "reduced", "oxidised", "neutralised", "evaporated"),
              },
            ],
          },
        ],
      },
    ],
  },
];

// Additional content wave — merged with `content` in the seed loop.
const moreContent: ExamContent[] = [
  {
    examSlug: "ssc-cgl",
    subjects: [
      {
        slug: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        chapters: [
          {
            slug: "average",
            name: "Average",
            marks: 2,
            negative: 0.5,
            test: { slug: "average-practice-1", title: "Average — Practice Test", description: "6 SSC-style Average questions with solutions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "What is the average of 10, 20 and 30?", difficulty: "EASY", explanation: "Average = sum ÷ count = (10 + 20 + 30) / 3 = 60/3 = 20.", options: opts(1, "15", "20", "25", "30") },
              { text: "What is the average of the first 5 natural numbers (1, 2, 3, 4, 5)?", difficulty: "EASY", explanation: "Sum = 15, count = 5, average = 15/5 = 3.", options: opts(1, "2.5", "3", "3.5", "4") },
              { text: "The average of 5 numbers is 20. What is their sum?", difficulty: "EASY", explanation: "Sum = average × count = 20 × 5 = 100.", options: opts(1, "80", "100", "120", "125") },
              { text: "The average age of 5 students is 12 years. When the teacher's age is included, the average becomes 15 years. Find the teacher's age.", difficulty: "HARD", explanation: "Students' total = 5 × 12 = 60. With teacher (6 people) total = 6 × 15 = 90. Teacher's age = 90 − 60 = 30.", options: opts(1, "25", "30", "35", "40") },
              { text: "What is the average of 2, 4, 6, 8 and 10?", difficulty: "EASY", explanation: "Sum = 30, count = 5, average = 30/5 = 6.", options: opts(1, "5", "6", "7", "8") },
              { text: "A batsman scores 60, 70 and 80 runs in three innings. What is his average score?", difficulty: "MEDIUM", explanation: "Average = (60 + 70 + 80)/3 = 210/3 = 70.", options: opts(1, "65", "70", "75", "80") },
            ],
          },
          {
            slug: "time-and-work",
            name: "Time & Work",
            marks: 2,
            negative: 0.5,
            test: { slug: "time-and-work-practice-1", title: "Time & Work — Practice Test", description: "6 SSC-style Time & Work questions with solutions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "A can complete a work in 10 days. What part of the work does he do in 1 day?", difficulty: "EASY", explanation: "1 day's work = 1 / (total days) = 1/10.", options: opts(1, "1/5", "1/10", "10", "1/20") },
              { text: "A can do a job in 6 days and B in 12 days. Working together, what part do they finish in 1 day?", difficulty: "MEDIUM", explanation: "1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4.", options: opts(0, "1/4", "1/8", "1/18", "1/3") },
              { text: "A can do a job in 6 days and B in 12 days. Working together, in how many days will they finish it?", difficulty: "MEDIUM", explanation: "Together's 1-day work = 1/4, so they finish in 4 days.", options: opts(1, "3", "4", "8", "18") },
              { text: "A is twice as efficient as B. If B alone finishes a work in 12 days, how long will A take?", difficulty: "MEDIUM", explanation: "Twice as efficient → half the time = 12/2 = 6 days.", options: opts(1, "12", "6", "24", "8") },
              { text: "4 men build a wall in 10 days. How long will 8 men take, working at the same rate?", difficulty: "MEDIUM", explanation: "Double the men → half the time = 10/2 = 5 days.", options: opts(1, "10", "5", "20", "2.5") },
              { text: "A can do a work in 15 days and B in 10 days. What part do they complete together in one day?", difficulty: "HARD", explanation: "1/15 + 1/10 = 2/30 + 3/30 = 5/30 = 1/6.", options: opts(0, "1/6", "1/5", "1/25", "1/3") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "class-10",
    subjects: [
      {
        slug: "mathematics",
        name: "Mathematics",
        chapters: [
          {
            slug: "polynomials",
            name: "Polynomials",
            marks: 1,
            negative: 0,
            test: { slug: "polynomials-practice-1", title: "Polynomials — Practice Test", description: "6 CBSE Class 10 Polynomials questions with solutions. +1 each, no negative marking." },
            questions: [
              { text: "What is the degree of the polynomial 3x² + 2x + 1?", difficulty: "EASY", explanation: "The degree is the highest power of x present, which is 2.", options: opts(1, "1", "2", "3", "0") },
              { text: "A polynomial of degree 2 is called a:", difficulty: "EASY", explanation: "Degree 1 = linear, degree 2 = quadratic, degree 3 = cubic.", options: opts(1, "linear polynomial", "quadratic polynomial", "cubic polynomial", "constant") },
              { text: "What are the zeroes of the polynomial x² − 4?", difficulty: "MEDIUM", explanation: "x² − 4 = 0 → x² = 4 → x = +2 or −2.", options: opts(0, "2 and −2", "4 and −4", "0 and 4", "2 and 4") },
              { text: "For a quadratic polynomial ax² + bx + c, the sum of the zeroes equals:", difficulty: "MEDIUM", explanation: "Sum of zeroes = −b/a.", options: opts(1, "b/a", "−b/a", "c/a", "−c/a") },
              { text: "For ax² + bx + c, the product of the zeroes equals:", difficulty: "MEDIUM", explanation: "Product of zeroes = c/a (constant term ÷ leading coefficient).", options: opts(2, "−b/a", "b/a", "c/a", "−c/a") },
              { text: "How many zeroes does a linear polynomial have?", difficulty: "EASY", explanation: "A linear polynomial (degree 1) has exactly one zero.", options: opts(1, "0", "1", "2", "infinitely many") },
            ],
          },
        ],
      },
      {
        slug: "science",
        name: "Science",
        chapters: [
          {
            slug: "acids-bases-salts",
            name: "Acids, Bases & Salts",
            marks: 1,
            negative: 0,
            test: { slug: "acids-bases-salts-practice-1", title: "Acids, Bases & Salts — Practice Test", description: "6 CBSE Class 10 Science questions with solutions. +1 each, no negative marking." },
            questions: [
              { text: "What is the pH of a neutral solution such as pure water?", difficulty: "EASY", explanation: "A neutral solution has pH = 7. Below 7 is acidic, above 7 is basic.", options: opts(1, "0", "7", "14", "1") },
              { text: "Acids turn blue litmus paper to which colour?", difficulty: "EASY", explanation: "Acids turn blue litmus RED. (Bases turn red litmus blue.)", options: opts(1, "blue", "red", "green", "no change") },
              { text: "A solution with a pH less than 7 is:", difficulty: "EASY", explanation: "pH < 7 → acidic, pH = 7 → neutral, pH > 7 → basic.", options: opts(0, "acidic", "basic", "neutral", "a salt") },
              { text: "Which gas is usually produced when a dilute acid reacts with a metal?", difficulty: "MEDIUM", explanation: "Acid + metal → salt + hydrogen gas. e.g. Zn + 2HCl → ZnCl₂ + H₂.", options: opts(1, "oxygen", "hydrogen", "carbon dioxide", "chlorine") },
              { text: "What is the chemical name of common salt (table salt)?", difficulty: "EASY", explanation: "Common salt is sodium chloride, NaCl.", options: opts(0, "sodium chloride", "calcium carbonate", "sodium hydroxide", "potassium nitrate") },
              { text: "Bases turn red litmus paper to which colour?", difficulty: "EASY", explanation: "Bases turn red litmus BLUE.", options: opts(1, "red", "blue", "green", "yellow") },
            ],
          },
        ],
      },
    ],
  },
];

// Wave 3 — start JEE & NEET, deepen SSC (Reasoning) & Class 10 (Science).
const wave3: ExamContent[] = [
  {
    examSlug: "jee",
    subjects: [
      {
        slug: "physics",
        name: "Physics",
        chapters: [
          {
            slug: "units-and-measurements",
            name: "Units & Measurements",
            marks: 4,
            negative: 1,
            test: { slug: "units-measurements-practice-1", title: "Units & Measurements — Practice Test", description: "6 JEE-style questions on units, dimensions & significant figures. +4 correct, −1 wrong." },
            questions: [
              { text: "What is the SI unit of force?", difficulty: "EASY", explanation: "Force is measured in newton (N), where 1 N = 1 kg·m/s².", options: opts(1, "joule", "newton", "watt", "pascal") },
              { text: "Which of the following is a fundamental (base) quantity?", difficulty: "MEDIUM", explanation: "Mass is a base quantity. Force, velocity and density are all derived from base quantities.", options: opts(2, "force", "velocity", "mass", "density") },
              { text: "The dimensional formula of velocity is:", difficulty: "MEDIUM", explanation: "Velocity = displacement/time = L/T = [LT⁻¹].", options: opts(0, "[LT⁻¹]", "[LT⁻²]", "[L²T⁻¹]", "[MLT⁻²]") },
              { text: "How many fundamental (base) units are there in the SI system?", difficulty: "EASY", explanation: "There are 7 SI base units: metre, kilogram, second, ampere, kelvin, mole, candela.", options: opts(2, "5", "6", "7", "9") },
              { text: "The number of significant figures in 0.00450 is:", difficulty: "HARD", explanation: "Leading zeros are not significant; 4, 5 and the trailing 0 are → 3 significant figures.", options: opts(1, "2", "3", "5", "6") },
              { text: "The dimensional formula of acceleration is:", difficulty: "MEDIUM", explanation: "Acceleration = velocity/time = (L/T)/T = [LT⁻²].", options: opts(1, "[LT⁻¹]", "[LT⁻²]", "[MLT⁻²]", "[L²T⁻²]") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "neet",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        chapters: [
          {
            slug: "cell-unit-of-life",
            name: "Cell: The Unit of Life",
            marks: 4,
            negative: 1,
            test: { slug: "cell-unit-of-life-practice-1", title: "Cell: The Unit of Life — Practice Test", description: "6 NEET-style Biology questions on the cell. +4 correct, −1 wrong." },
            questions: [
              { text: "Who first discovered the cell?", difficulty: "EASY", explanation: "Robert Hooke discovered the cell in 1665 while observing cork under a microscope.", options: opts(0, "Robert Hooke", "Charles Darwin", "Louis Pasteur", "Gregor Mendel") },
              { text: "Which organelle is called the 'powerhouse of the cell'?", difficulty: "EASY", explanation: "Mitochondria produce energy (ATP), so they are called the powerhouse of the cell.", options: opts(2, "nucleus", "ribosome", "mitochondria", "golgi apparatus") },
              { text: "Which structure is present in plant cells but absent in animal cells?", difficulty: "MEDIUM", explanation: "Plant cells have a rigid cell wall (and chloroplasts) which animal cells lack.", options: opts(1, "nucleus", "cell wall", "mitochondria", "ribosome") },
              { text: "The control centre of the cell, which contains the DNA, is the:", difficulty: "EASY", explanation: "The nucleus contains the genetic material (DNA) and controls cell activities.", options: opts(1, "cytoplasm", "nucleus", "vacuole", "lysosome") },
              { text: "Organisms whose cells lack a true (membrane-bound) nucleus are called:", difficulty: "MEDIUM", explanation: "Prokaryotes (e.g. bacteria) have no membrane-bound nucleus; eukaryotes do.", options: opts(1, "eukaryotes", "prokaryotes", "protists", "fungi") },
              { text: "Which organelle is the site of protein synthesis?", difficulty: "MEDIUM", explanation: "Ribosomes are the sites where proteins are synthesised.", options: opts(0, "ribosome", "lysosome", "vacuole", "chloroplast") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "ssc-cgl",
    subjects: [
      {
        slug: "general-intelligence-reasoning",
        name: "General Intelligence & Reasoning",
        chapters: [
          {
            slug: "coding-decoding",
            name: "Coding–Decoding",
            marks: 2,
            negative: 0.5,
            test: { slug: "coding-decoding-practice-1", title: "Coding–Decoding — Practice Test", description: "6 SSC-style Coding–Decoding questions with solutions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "If CAT is coded as DBU, how is DOG coded?", difficulty: "MEDIUM", explanation: "Each letter moves +1: D→E, O→P, G→H, so DOG → EPH.", options: opts(0, "EPH", "EPG", "FPH", "DPH") },
              { text: "If A = 1, B = 2, C = 3 …, what is the value of the letter E?", difficulty: "EASY", explanation: "E is the 5th letter, so E = 5.", options: opts(1, "4", "5", "6", "3") },
              { text: "If RED is coded by letter positions as 18-5-4, how is SUN coded?", difficulty: "MEDIUM", explanation: "S=19, U=21, N=14 → 19-21-14.", options: opts(0, "19-21-14", "18-20-13", "20-22-15", "19-20-14") },
              { text: "If MANGO is written as NBOHP, each letter has been shifted by:", difficulty: "EASY", explanation: "M→N, A→B, N→O, G→H, O→P — each letter is shifted by +1.", options: opts(0, "+1", "+2", "−1", "+3") },
              { text: "If FACE is coded as GBDF, then DEAF is coded as:", difficulty: "MEDIUM", explanation: "Each letter +1: D→E, E→F, A→B, F→G → EFBG.", options: opts(0, "EFBG", "EFCG", "EGBG", "DFBG") },
              { text: "If CAB = 3-1-2 by letter position, then BED equals:", difficulty: "MEDIUM", explanation: "B=2, E=5, D=4 → 2-5-4.", options: opts(0, "2-5-4", "2-4-5", "3-5-4", "2-5-3") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "class-10",
    subjects: [
      {
        slug: "science",
        name: "Science",
        chapters: [
          {
            slug: "life-processes",
            name: "Life Processes",
            marks: 1,
            negative: 0,
            test: { slug: "life-processes-practice-1", title: "Life Processes — Practice Test", description: "6 CBSE Class 10 Biology questions on life processes. +1 each, no negative marking." },
            questions: [
              { text: "The process by which green plants make their own food is called:", difficulty: "EASY", explanation: "Green plants make food from CO₂ and water using sunlight — this is photosynthesis.", options: opts(1, "respiration", "photosynthesis", "digestion", "transpiration") },
              { text: "Which gas do plants take in during photosynthesis?", difficulty: "EASY", explanation: "Plants absorb carbon dioxide and release oxygen during photosynthesis.", options: opts(1, "oxygen", "carbon dioxide", "nitrogen", "hydrogen") },
              { text: "In humans, gas exchange (oxygen in, carbon dioxide out) mainly occurs in the:", difficulty: "EASY", explanation: "Gas exchange happens in the alveoli of the lungs.", options: opts(1, "heart", "lungs", "liver", "kidney") },
              { text: "Which organ pumps blood throughout the human body?", difficulty: "EASY", explanation: "The heart pumps blood around the body.", options: opts(1, "lungs", "heart", "brain", "stomach") },
              { text: "Which organ removes nitrogenous waste (urea) from the blood in humans?", difficulty: "MEDIUM", explanation: "The kidneys filter the blood and remove urea, forming urine.", options: opts(1, "liver", "kidneys", "lungs", "heart") },
              { text: "The breakdown of glucose to release energy in cells is called:", difficulty: "MEDIUM", explanation: "Cellular respiration breaks down glucose to release energy (ATP).", options: opts(1, "photosynthesis", "respiration", "excretion", "transpiration") },
            ],
          },
        ],
      },
    ],
  },
];

// Wave 4 — more chapters across all four live exams.
const wave4: ExamContent[] = [
  {
    examSlug: "ssc-cgl",
    subjects: [
      {
        slug: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        chapters: [
          {
            slug: "ratio-and-proportion",
            name: "Ratio & Proportion",
            marks: 2,
            negative: 0.5,
            test: { slug: "ratio-proportion-practice-1", title: "Ratio & Proportion — Practice Test", description: "6 SSC-style Ratio & Proportion questions with solutions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The ratio 12 : 18 in its simplest form is:", difficulty: "EASY", explanation: "Divide both by their HCF (6): 12/6 : 18/6 = 2 : 3.", options: opts(0, "2 : 3", "3 : 2", "4 : 6", "6 : 9") },
              { text: "Divide ₹600 between A and B in the ratio 2 : 3. What is A's share?", difficulty: "MEDIUM", explanation: "Total parts = 2 + 3 = 5. A's share = (2/5) × 600 = ₹240.", options: opts(1, "₹200", "₹240", "₹300", "₹360") },
              { text: "If a : b = 2 : 3 and b : c = 4 : 5, then a : c is:", difficulty: "HARD", explanation: "Make b common: a:b = 8:12, b:c = 12:15, so a:c = 8:15.", options: opts(0, "8 : 15", "2 : 5", "6 : 5", "8 : 12") },
              { text: "If 4 pens cost ₹20, how much do 10 pens cost (at the same rate)?", difficulty: "EASY", explanation: "1 pen = 20/4 = ₹5. 10 pens = 10 × 5 = ₹50.", options: opts(1, "₹40", "₹50", "₹60", "₹45") },
              { text: "The fourth proportional to 3, 6 and 5 is:", difficulty: "MEDIUM", explanation: "3 : 6 = 5 : x → x = (6 × 5)/3 = 10.", options: opts(1, "8", "10", "12", "15") },
              { text: "If a : b = 5 : 7 and a = 25, then b equals:", difficulty: "EASY", explanation: "Multiply the ratio by 5: a = 25 → b = 7 × 5 = 35.", options: opts(1, "30", "35", "42", "49") },
            ],
          },
        ],
      },
      {
        slug: "general-intelligence-reasoning",
        name: "General Intelligence & Reasoning",
        chapters: [
          {
            slug: "number-series",
            name: "Number Series",
            marks: 2,
            negative: 0.5,
            test: { slug: "number-series-practice-1", title: "Number Series — Practice Test", description: "6 SSC-style Number Series questions with solutions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Find the next number: 2, 4, 6, 8, ?", difficulty: "EASY", explanation: "Add 2 each time → 8 + 2 = 10.", options: opts(1, "9", "10", "11", "12") },
              { text: "Find the next number: 1, 4, 9, 16, ?", difficulty: "MEDIUM", explanation: "These are perfect squares (1², 2², 3², 4²), so next is 5² = 25.", options: opts(2, "20", "24", "25", "30") },
              { text: "Find the next number: 3, 6, 12, 24, ?", difficulty: "EASY", explanation: "Each term is doubled → 24 × 2 = 48.", options: opts(1, "36", "48", "30", "40") },
              { text: "Find the next number: 1, 1, 2, 3, 5, ?", difficulty: "MEDIUM", explanation: "Fibonacci — each term is the sum of the two before it → 3 + 5 = 8.", options: opts(1, "7", "8", "9", "10") },
              { text: "Find the missing number: 5, 10, 15, ?, 25", difficulty: "EASY", explanation: "Add 5 each time → after 15 comes 20.", options: opts(1, "18", "20", "22", "24") },
              { text: "Find the next number: 2, 5, 10, 17, ?", difficulty: "HARD", explanation: "Differences are 3, 5, 7 (odd numbers); next difference is 9 → 17 + 9 = 26.", options: opts(1, "24", "26", "28", "25") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "class-10",
    subjects: [
      {
        slug: "mathematics",
        name: "Mathematics",
        chapters: [
          {
            slug: "trigonometry",
            name: "Introduction to Trigonometry",
            marks: 1,
            negative: 0,
            test: { slug: "trigonometry-practice-1", title: "Trigonometry — Practice Test", description: "6 CBSE Class 10 Trigonometry questions with solutions. +1 each, no negative marking." },
            questions: [
              { text: "In a right-angled triangle, sin θ is defined as:", difficulty: "EASY", explanation: "sin θ = opposite side / hypotenuse.", options: opts(0, "opposite / hypotenuse", "adjacent / hypotenuse", "opposite / adjacent", "hypotenuse / opposite") },
              { text: "In a right-angled triangle, cos θ is defined as:", difficulty: "EASY", explanation: "cos θ = adjacent side / hypotenuse.", options: opts(1, "opposite / hypotenuse", "adjacent / hypotenuse", "opposite / adjacent", "adjacent / opposite") },
              { text: "The value of sin 30° is:", difficulty: "MEDIUM", explanation: "sin 30° = 1/2 (a standard value to memorise).", options: opts(0, "1/2", "√3/2", "1", "0") },
              { text: "The value of cos 0° is:", difficulty: "EASY", explanation: "cos 0° = 1.", options: opts(1, "0", "1", "1/2", "√3/2") },
              { text: "The value of tan 45° is:", difficulty: "MEDIUM", explanation: "tan 45° = 1 (since sin 45° = cos 45°).", options: opts(1, "0", "1", "√3", "1/√3") },
              { text: "The identity sin²θ + cos²θ equals:", difficulty: "MEDIUM", explanation: "sin²θ + cos²θ = 1 — the fundamental trigonometric identity.", options: opts(1, "0", "1", "2", "tan²θ") },
            ],
          },
        ],
      },
      {
        slug: "science",
        name: "Science",
        chapters: [
          {
            slug: "electricity",
            name: "Electricity",
            marks: 1,
            negative: 0,
            test: { slug: "electricity-practice-1", title: "Electricity — Practice Test", description: "6 CBSE Class 10 Physics questions on electricity. +1 each, no negative marking." },
            questions: [
              { text: "The SI unit of electric current is the:", difficulty: "EASY", explanation: "Electric current is measured in amperes (A).", options: opts(1, "volt", "ampere", "ohm", "watt") },
              { text: "Ohm's law is expressed as:", difficulty: "MEDIUM", explanation: "Ohm's law: V = I × R (voltage = current × resistance).", options: opts(0, "V = IR", "V = I/R", "V = R/I", "V = I + R") },
              { text: "The SI unit of electrical resistance is the:", difficulty: "EASY", explanation: "Resistance is measured in ohms (Ω).", options: opts(2, "ampere", "volt", "ohm", "watt") },
              { text: "The SI unit of potential difference (voltage) is the:", difficulty: "EASY", explanation: "Potential difference is measured in volts (V).", options: opts(1, "ampere", "volt", "ohm", "coulomb") },
              { text: "Electric power is given by the formula:", difficulty: "MEDIUM", explanation: "Power P = V × I (voltage × current).", options: opts(0, "P = VI", "P = V/I", "P = I/V", "P = V + I") },
              { text: "In a series circuit, the current through each component is:", difficulty: "MEDIUM", explanation: "In a series circuit the same current flows through every component.", options: opts(0, "the same", "different", "zero", "doubled") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "jee",
    subjects: [
      {
        slug: "physics",
        name: "Physics",
        chapters: [
          {
            slug: "laws-of-motion",
            name: "Laws of Motion",
            marks: 4,
            negative: 1,
            test: { slug: "laws-of-motion-practice-1", title: "Laws of Motion — Practice Test", description: "6 JEE-style questions on Newton's laws. +4 correct, −1 wrong." },
            questions: [
              { text: "Newton's first law of motion is also known as the law of:", difficulty: "EASY", explanation: "The first law (a body stays at rest/uniform motion unless acted on by a force) is the law of inertia.", options: opts(0, "inertia", "acceleration", "action-reaction", "gravitation") },
              { text: "Newton's second law gives the relation:", difficulty: "EASY", explanation: "Force = mass × acceleration, i.e. F = ma.", options: opts(0, "F = ma", "F = mv", "F = m/a", "F = ma²") },
              { text: "'Every action has an equal and opposite reaction' is Newton's:", difficulty: "EASY", explanation: "This is Newton's third law of motion.", options: opts(2, "first law", "second law", "third law", "zeroth law") },
              { text: "The momentum of a body is given by:", difficulty: "MEDIUM", explanation: "Momentum p = mass × velocity = mv.", options: opts(0, "mv", "ma", "m/v", "v/m") },
              { text: "A body of mass 2 kg has an acceleration of 5 m/s². The force acting on it is:", difficulty: "MEDIUM", explanation: "F = ma = 2 × 5 = 10 N.", options: opts(1, "2.5 N", "10 N", "7 N", "3 N") },
              { text: "The rate of change of momentum of a body is equal to the:", difficulty: "HARD", explanation: "Newton's second law (in momentum form): the net applied force equals the rate of change of momentum.", options: opts(0, "applied force", "mass", "velocity", "acceleration") },
            ],
          },
        ],
      },
    ],
  },
  {
    examSlug: "neet",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        chapters: [
          {
            slug: "biomolecules",
            name: "Biomolecules",
            marks: 4,
            negative: 1,
            test: { slug: "biomolecules-practice-1", title: "Biomolecules — Practice Test", description: "6 NEET-style Biology questions on biomolecules. +4 correct, −1 wrong." },
            questions: [
              { text: "The building blocks (monomers) of proteins are:", difficulty: "EASY", explanation: "Proteins are made of amino acids joined by peptide bonds.", options: opts(1, "glucose units", "amino acids", "fatty acids", "nucleotides") },
              { text: "The monomers of nucleic acids (DNA and RNA) are:", difficulty: "MEDIUM", explanation: "Nucleic acids are polymers of nucleotides.", options: opts(1, "amino acids", "nucleotides", "glucose", "glycerol") },
              { text: "Which biomolecule is the body's main immediate source of energy?", difficulty: "EASY", explanation: "Carbohydrates (like glucose) are the main energy source.", options: opts(1, "proteins", "carbohydrates", "vitamins", "minerals") },
              { text: "Enzymes are chemically which type of biomolecule?", difficulty: "MEDIUM", explanation: "Almost all enzymes are proteins (a few are RNA).", options: opts(2, "carbohydrates", "lipids", "proteins", "nucleic acids") },
              { text: "Which element is present in proteins but generally absent in carbohydrates and fats?", difficulty: "HARD", explanation: "Proteins contain nitrogen (in the amino groups); carbohydrates and fats are mainly C, H and O.", options: opts(3, "carbon", "hydrogen", "oxygen", "nitrogen") },
              { text: "Starch and cellulose are examples of:", difficulty: "MEDIUM", explanation: "Both are polysaccharides — large carbohydrates made of many glucose units.", options: opts(1, "proteins", "carbohydrates", "lipids", "nucleic acids") },
            ],
          },
        ],
      },
    ],
  },
];

// Wave 5 — complete Class 10 Maths (10 chapters) + Science (9 chapters), 15 Q each.
const wave5: ExamContent[] = [
  {
    examSlug: "class-10",
    subjects: [
      {
        slug: "mathematics",
        name: "Mathematics",
        chapters: [
          // ── Quadratic Equations ───────────────────────────────────────────
          {
            slug: "quadratic-equations",
            name: "Quadratic Equations",
            marks: 1,
            negative: 0,
            test: { slug: "quadratic-equations-practice-1", title: "Quadratic Equations — Practice Test", description: "15 CBSE Class 10 Quadratic Equations questions. +1 each, no negative marking." },
            questions: [
              { text: "Which of the following is a quadratic equation?", difficulty: "EASY", explanation: "A quadratic equation has degree 2. x² + 5x + 6 = 0 is degree 2; the others are not.", options: opts(1, "x + 5 = 0", "x² + 5x + 6 = 0", "x³ + 1 = 0", "1/x = 2") },
              { text: "The standard form of a quadratic equation is:", difficulty: "EASY", explanation: "ax² + bx + c = 0 where a ≠ 0 is the standard form.", options: opts(0, "ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + c = 0", "a/x + b = 0") },
              { text: "What are the roots of x² − 5x + 6 = 0?", difficulty: "MEDIUM", explanation: "Factorise: (x − 2)(x − 3) = 0 → x = 2 or x = 3.", options: opts(1, "1 and 6", "2 and 3", "−2 and −3", "1 and 5") },
              { text: "The discriminant of ax² + bx + c = 0 is:", difficulty: "MEDIUM", explanation: "D = b² − 4ac. It determines the nature of roots.", options: opts(2, "b² + 4ac", "4ac − b²", "b² − 4ac", "b + 4ac") },
              { text: "If discriminant D > 0, the roots are:", difficulty: "MEDIUM", explanation: "D > 0 means two distinct real roots.", options: opts(0, "two distinct real roots", "two equal real roots", "no real roots", "complex roots") },
              { text: "If discriminant D = 0, the roots are:", difficulty: "MEDIUM", explanation: "D = 0 means two equal (repeated) real roots.", options: opts(1, "two distinct real roots", "two equal real roots", "no real roots", "irrational") },
              { text: "If discriminant D < 0, the roots are:", difficulty: "MEDIUM", explanation: "D < 0 means no real roots — the roots are imaginary.", options: opts(2, "equal", "distinct real", "no real roots", "rational") },
              { text: "Find the roots of x² − 4 = 0.", difficulty: "EASY", explanation: "x² = 4 → x = ±2.", options: opts(0, "2 and −2", "4 and −4", "2 and 4", "1 and −1") },
              { text: "Using the quadratic formula, the roots of ax² + bx + c = 0 are:", difficulty: "MEDIUM", explanation: "x = (−b ± √(b²−4ac)) / 2a.", options: opts(1, "(b ± √D)/2a", "(−b ± √D)/2a", "(b ± √D)/a", "(−b ± √D)/a") },
              { text: "The sum of roots of ax² + bx + c = 0 is:", difficulty: "MEDIUM", explanation: "Sum of roots = −b/a.", options: opts(2, "c/a", "b/a", "−b/a", "−c/a") },
              { text: "The product of roots of ax² + bx + c = 0 is:", difficulty: "MEDIUM", explanation: "Product of roots = c/a.", options: opts(0, "c/a", "−c/a", "b/a", "−b/a") },
              { text: "Solve 2x² − 5x + 3 = 0 by factorisation. What are the roots?", difficulty: "HARD", explanation: "2x² − 2x − 3x + 3 = 0 → 2x(x−1) − 3(x−1) = 0 → (2x−3)(x−1) = 0 → x = 3/2 or x = 1.", options: opts(0, "3/2 and 1", "3 and 1/2", "−3/2 and −1", "2 and 3") },
              { text: "The value of k for which x² + 4x + k = 0 has equal roots is:", difficulty: "HARD", explanation: "Equal roots → D = 0 → 16 − 4k = 0 → k = 4.", options: opts(1, "2", "4", "8", "16") },
              { text: "Which method cannot always be used to solve a quadratic equation?", difficulty: "EASY", explanation: "Factorisation works only when the equation is factorisable. The quadratic formula always works.", options: opts(1, "Quadratic formula", "Factorisation", "Completing the square", "None of these") },
              { text: "A number and its reciprocal sum to 10/3. What is the number?", difficulty: "HARD", explanation: "x + 1/x = 10/3 → 3x² − 10x + 3 = 0 → (3x−1)(x−3) = 0 → x = 3 or x = 1/3.", options: opts(0, "3 or 1/3", "2 or 1/2", "5 or 1/5", "4 or 1/4") },
            ],
          },
          // ── Arithmetic Progressions ───────────────────────────────────────
          {
            slug: "arithmetic-progressions",
            name: "Arithmetic Progressions",
            marks: 1,
            negative: 0,
            test: { slug: "arithmetic-progressions-practice-1", title: "Arithmetic Progressions — Practice Test", description: "15 CBSE Class 10 AP questions. +1 each, no negative marking." },
            questions: [
              { text: "In an AP, the difference between any two consecutive terms is called the:", difficulty: "EASY", explanation: "The fixed (constant) difference between consecutive terms is the common difference (d).", options: opts(1, "common ratio", "common difference", "first term", "last term") },
              { text: "Which of the following is an AP?", difficulty: "EASY", explanation: "2, 5, 8, 11 has a constant difference of 3, so it is an AP.", options: opts(0, "2, 5, 8, 11", "1, 2, 4, 8", "1, 4, 9, 16", "2, 6, 18, 54") },
              { text: "The common difference of the AP 3, 7, 11, 15, … is:", difficulty: "EASY", explanation: "d = 7 − 3 = 4.", options: opts(2, "3", "3.5", "4", "7") },
              { text: "The nth term of an AP with first term a and common difference d is:", difficulty: "MEDIUM", explanation: "aₙ = a + (n−1)d.", options: opts(0, "a + (n−1)d", "a + nd", "a − (n−1)d", "nd + a") },
              { text: "The 10th term of the AP 2, 5, 8, … is:", difficulty: "MEDIUM", explanation: "a = 2, d = 3. a₁₀ = 2 + 9×3 = 2 + 27 = 29.", options: opts(2, "26", "28", "29", "32") },
              { text: "The sum of first n terms of an AP is:", difficulty: "MEDIUM", explanation: "Sₙ = n/2 × [2a + (n−1)d].", options: opts(1, "n(a + l)", "n/2 × [2a + (n−1)d]", "n × a + d", "n/2 × (a + d)") },
              { text: "The sum of first 10 natural numbers is:", difficulty: "EASY", explanation: "S₁₀ = 10/2 × [2×1 + 9×1] = 5 × 11 = 55.", options: opts(1, "50", "55", "60", "45") },
              { text: "In an AP, if a = 5 and d = 3, what is the 5th term?", difficulty: "EASY", explanation: "a₅ = 5 + 4×3 = 5 + 12 = 17.", options: opts(2, "12", "15", "17", "20") },
              { text: "Which term of the AP 5, 8, 11, … is 32?", difficulty: "MEDIUM", explanation: "32 = 5 + (n−1)×3 → 27 = (n−1)×3 → n−1 = 9 → n = 10.", options: opts(1, "9th", "10th", "11th", "12th") },
              { text: "How many terms are in the AP 3, 6, 9, …, 99?", difficulty: "MEDIUM", explanation: "99 = 3 + (n−1)×3 → 96 = (n−1)×3 → n−1 = 32 → n = 33.", options: opts(2, "30", "32", "33", "34") },
              { text: "The sum of first 20 terms of the AP 1, 3, 5, 7, … (odd numbers) is:", difficulty: "MEDIUM", explanation: "a=1, d=2. S₂₀ = 20/2×[2+19×2] = 10×40 = 400.", options: opts(2, "361", "380", "400", "420") },
              { text: "If the 3rd term of an AP is 7 and the 7th term is 15, what is the common difference?", difficulty: "HARD", explanation: "a₇ − a₃ = 4d = 8 → d = 2.", options: opts(1, "1", "2", "3", "4") },
              { text: "The sum of first n terms of an AP is 3n² + 2n. What is the first term?", difficulty: "HARD", explanation: "a₁ = S₁ = 3(1)² + 2(1) = 5.", options: opts(1, "3", "5", "7", "10") },
              { text: "The formula Sₙ = n/2 × (a + l) uses 'l' for:", difficulty: "EASY", explanation: "l is the last (nth) term of the AP.", options: opts(2, "length", "log", "last term", "lower bound") },
              { text: "If the sum of first 5 terms of an AP is 25 and the 5th term is 7, what is the first term?", difficulty: "HARD", explanation: "S₅ = 5/2×(a+7) = 25 → a+7 = 10 → a = 3.", options: opts(0, "3", "5", "7", "1") },
            ],
          },
          // ── Triangles ─────────────────────────────────────────────────────
          {
            slug: "triangles",
            name: "Triangles",
            marks: 1,
            negative: 0,
            test: { slug: "triangles-practice-1", title: "Triangles — Practice Test", description: "15 CBSE Class 10 Triangle questions. +1 each, no negative marking." },
            questions: [
              { text: "Two figures having the same shape but not necessarily the same size are called:", difficulty: "EASY", explanation: "Similar figures have the same shape (equal angles, proportional sides) but may differ in size.", options: opts(1, "congruent", "similar", "equal", "proportional") },
              { text: "The Basic Proportionality Theorem (BPT) states that if a line is drawn parallel to one side of a triangle, it divides the other two sides:", difficulty: "MEDIUM", explanation: "BPT (Thales' theorem): DE ∥ BC in △ABC → AD/DB = AE/EC.", options: opts(0, "proportionally", "equally", "at right angles", "into equal halves") },
              { text: "Two triangles are similar if their corresponding angles are equal. This criterion is called:", difficulty: "EASY", explanation: "AA (Angle-Angle) similarity criterion — if two angles of one triangle equal two angles of another, they are similar.", options: opts(1, "SSS", "AA", "SAS", "RHS") },
              { text: "In △ABC and △DEF, if AB/DE = BC/EF = CA/FD, the triangles are similar by:", difficulty: "MEDIUM", explanation: "All three corresponding sides are proportional → SSS similarity criterion.", options: opts(2, "AA", "SAS", "SSS", "RHS") },
              { text: "In △ABC, if DE ∥ BC with D on AB and E on AC, and AD/DB = 2/3, then AE/EC = ?", difficulty: "MEDIUM", explanation: "By BPT, AE/EC = AD/DB = 2/3.", options: opts(0, "2/3", "3/2", "2/5", "3/5") },
              { text: "Pythagoras' theorem states that in a right-angled triangle:", difficulty: "EASY", explanation: "Hypotenuse² = Sum of squares of the other two sides: c² = a² + b².", options: opts(1, "a + b = c", "a² + b² = c²", "a² = b² + c²", "a + b = c²") },
              { text: "In a right-angled triangle, the sides are 3, 4 and 5 units. Which is the hypotenuse?", difficulty: "EASY", explanation: "3² + 4² = 9 + 16 = 25 = 5². So 5 is the hypotenuse (opposite the right angle).", options: opts(2, "3", "4", "5", "all equal") },
              { text: "If △ABC ~ △PQR, then the ratio of their areas equals:", difficulty: "HARD", explanation: "The ratio of areas of similar triangles = square of the ratio of corresponding sides.", options: opts(1, "AB/PQ", "(AB/PQ)²", "AB²/PQ", "√(AB/PQ)") },
              { text: "The converse of Pythagoras' theorem says: if a² + b² = c² in △ABC (c is the longest side), then the triangle is:", difficulty: "MEDIUM", explanation: "If a² + b² = c², the triangle is right-angled at the vertex opposite side c.", options: opts(0, "right-angled", "equilateral", "isosceles", "obtuse") },
              { text: "In △ABC ~ △DEF with AB = 4 cm and DE = 6 cm, the ratio of their areas is:", difficulty: "HARD", explanation: "(AB/DE)² = (4/6)² = 16/36 = 4/9.", options: opts(1, "2:3", "4:9", "16:9", "2:9") },
              { text: "A line drawn parallel to BC of △ABC, meeting AB at D and AC at E, with DE = 4 cm. If BC = 8 cm and AD = 3 cm, what is DB?", difficulty: "HARD", explanation: "DE/BC = AD/AB = 4/8 = 1/2. So AD/AB = 1/2 → AB = 6 cm → DB = AB − AD = 3 cm.", options: opts(2, "6", "4", "3", "5") },
              { text: "Which of the following is NOT a criterion for triangle similarity?", difficulty: "MEDIUM", explanation: "SSA (two sides and a non-included angle) is not a valid similarity criterion.", options: opts(3, "AA", "SAS", "SSS", "SSA") },
              { text: "In a right triangle with legs 5 and 12, the hypotenuse is:", difficulty: "MEDIUM", explanation: "√(5²+12²) = √(25+144) = √169 = 13.", options: opts(2, "11", "12", "13", "15") },
              { text: "If the perimeter of two similar triangles is 12 cm and 18 cm, the ratio of their corresponding sides is:", difficulty: "MEDIUM", explanation: "The ratio of perimeters = ratio of corresponding sides = 12:18 = 2:3.", options: opts(0, "2:3", "3:2", "4:9", "2:9") },
              { text: "In △ABC, angle B = 90°. If AB = 3 and BC = 4, then sin A =", difficulty: "MEDIUM", explanation: "sin A = opposite/hypotenuse = BC/AC = 4/5 (since AC = √(9+16) = 5).", options: opts(1, "3/5", "4/5", "3/4", "4/3") },
            ],
          },
          // ── Coordinate Geometry ───────────────────────────────────────────
          {
            slug: "coordinate-geometry",
            name: "Coordinate Geometry",
            marks: 1,
            negative: 0,
            test: { slug: "coordinate-geometry-practice-1", title: "Coordinate Geometry — Practice Test", description: "15 CBSE Class 10 Coordinate Geometry questions. +1 each, no negative marking." },
            questions: [
              { text: "The distance between two points (x₁,y₁) and (x₂,y₂) is:", difficulty: "MEDIUM", explanation: "Distance = √[(x₂−x₁)² + (y₂−y₁)²].", options: opts(0, "√[(x₂−x₁)²+(y₂−y₁)²]", "(x₂−x₁)+(y₂−y₁)", "√[(x₂+x₁)²+(y₂+y₁)²]", "|x₂−x₁|+|y₂−y₁|") },
              { text: "The distance of the point (3, 4) from the origin is:", difficulty: "EASY", explanation: "Distance = √(3²+4²) = √(9+16) = √25 = 5.", options: opts(2, "3", "4", "5", "7") },
              { text: "The midpoint of the line segment joining (2, 4) and (6, 8) is:", difficulty: "EASY", explanation: "Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).", options: opts(1, "(3, 5)", "(4, 6)", "(8, 12)", "(2, 4)") },
              { text: "The midpoint formula for a segment joining (x₁,y₁) and (x₂,y₂) is:", difficulty: "MEDIUM", explanation: "Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).", options: opts(0, "((x₁+x₂)/2, (y₁+y₂)/2)", "(x₁+x₂, y₁+y₂)", "((x₁−x₂)/2, (y₁−y₂)/2)", "(x₁x₂, y₁y₂)") },
              { text: "The section formula divides the join of (x₁,y₁) and (x₂,y₂) in ratio m:n internally as:", difficulty: "HARD", explanation: "Point = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).", options: opts(1, "((mx₁+nx₂)/(m+n), …)", "((mx₂+nx₁)/(m+n), …)", "((mx₂−nx₁)/(m−n), …)", "none of these") },
              { text: "The point that divides (1,2) and (5,6) in ratio 1:1 is:", difficulty: "EASY", explanation: "1:1 division is the midpoint = ((1+5)/2, (2+6)/2) = (3, 4).", options: opts(2, "(2, 3)", "(4, 5)", "(3, 4)", "(6, 8)") },
              { text: "What is the distance between (0, 0) and (5, 12)?", difficulty: "MEDIUM", explanation: "√(25+144) = √169 = 13.", options: opts(2, "11", "12", "13", "17") },
              { text: "The area of a triangle with vertices (0,0), (a,0) and (0,b) is:", difficulty: "MEDIUM", explanation: "Area = ½ |x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)| = ½|a×b| = ab/2.", options: opts(1, "ab", "ab/2", "2ab", "a+b") },
              { text: "The area of a triangle with vertices (1,2), (3,4) and (5,2) is:", difficulty: "HARD", explanation: "Area = ½|1(4−2)+3(2−2)+5(2−4)| = ½|2+0−10| = ½×8 = 4 sq units.", options: opts(0, "4", "5", "6", "8") },
              { text: "If the point (x, y) is equidistant from (2, 3) and (4, 1), which relation holds?", difficulty: "HARD", explanation: "Distance² to (2,3) = (x−2)²+(y−3)²; to (4,1) = (x−4)²+(y−1)². Setting equal: x − y = 1.", options: opts(1, "x + y = 1", "x − y = 1", "x + y = 4", "2x − 2y = 4") },
              { text: "The coordinates of the point dividing (−1, 3) and (4, −2) in ratio 2:3 are:", difficulty: "HARD", explanation: "x = (2×4+3×(−1))/(2+3) = (8−3)/5 = 1; y = (2×(−2)+3×3)/5 = (−4+9)/5 = 1. Point = (1, 1).", options: opts(0, "(1, 1)", "(2, 0)", "(0, 1)", "(1, 2)") },
              { text: "If three points are collinear (lie on the same line), the area of the triangle they form is:", difficulty: "MEDIUM", explanation: "Three collinear points form a degenerate triangle with zero area.", options: opts(2, "1", "negative", "0", "undefined") },
              { text: "The distance between (−3, 0) and (3, 0) is:", difficulty: "EASY", explanation: "Both points are on the x-axis. Distance = |3−(−3)| = 6.", options: opts(2, "3", "4", "6", "9") },
              { text: "The point P divides the join of A(1,2) and B(7,8) in ratio 1:2. Find P.", difficulty: "MEDIUM", explanation: "x = (1×7+2×1)/3 = 9/3 = 3; y = (1×8+2×2)/3 = 12/3 = 4. P = (3, 4).", options: opts(0, "(3, 4)", "(4, 3)", "(5, 6)", "(3, 6)") },
              { text: "What type of quadrilateral has vertices (1,1), (3,1), (3,4), (1,4)?", difficulty: "MEDIUM", explanation: "Width = 2, height = 3, all angles 90° → it is a rectangle.", options: opts(1, "square", "rectangle", "rhombus", "parallelogram") },
            ],
          },
          // ── Some Applications of Trigonometry ─────────────────────────────
          {
            slug: "trigonometry-applications",
            name: "Some Applications of Trigonometry",
            marks: 1,
            negative: 0,
            test: { slug: "trigonometry-applications-practice-1", title: "Applications of Trigonometry — Practice Test", description: "15 CBSE Class 10 questions on heights & distances. +1 each, no negative marking." },
            questions: [
              { text: "The angle of elevation is measured from:", difficulty: "EASY", explanation: "Angle of elevation is the angle measured upward from the horizontal line of sight.", options: opts(1, "vertical to the object", "horizontal upward to the object", "object down to horizontal", "top of object") },
              { text: "The angle of depression is measured from:", difficulty: "EASY", explanation: "Angle of depression is measured downward from the horizontal to the object below.", options: opts(0, "horizontal downward to the object", "object to ground", "vertical to the object", "ground to observer") },
              { text: "A person 1.8 m tall looks at the top of a tower at an angle of elevation of 45°. If the tower is 21.8 m tall, the horizontal distance from the person to the tower is:", difficulty: "MEDIUM", explanation: "Height above eye level = 21.8 − 1.8 = 20 m. tan 45° = 1 → distance = 20 m.", options: opts(1, "21.8 m", "20 m", "18 m", "22 m") },
              { text: "A ladder 10 m long makes an angle of 60° with the ground. The height of the wall it reaches is:", difficulty: "MEDIUM", explanation: "Height = 10 × sin 60° = 10 × √3/2 = 5√3 m.", options: opts(2, "5 m", "10 m", "5√3 m", "10√3 m") },
              { text: "From the top of a 15 m high building, the angle of depression to a car is 30°. The horizontal distance of the car from the building is:", difficulty: "HARD", explanation: "tan 30° = 15/d → d = 15/tan 30° = 15√3 m.", options: opts(1, "15 m", "15√3 m", "15/√3 m", "30 m") },
              { text: "The angle of elevation of the sun, when a tree of height 6 m casts a shadow of 6 m, is:", difficulty: "MEDIUM", explanation: "tan θ = 6/6 = 1 → θ = 45°.", options: opts(2, "30°", "60°", "45°", "90°") },
              { text: "A kite is flying at a height of 50 m. The string makes an angle of 30° with the horizontal. The length of the string is:", difficulty: "MEDIUM", explanation: "sin 30° = 50/l → l = 50/(1/2) = 100 m.", options: opts(2, "50 m", "75 m", "100 m", "25 m") },
              { text: "From the top of a cliff 60 m high, the angle of depression of a boat is 45°. The horizontal distance of the boat from the foot of the cliff is:", difficulty: "MEDIUM", explanation: "tan 45° = 1 → d = 60 m.", options: opts(1, "30 m", "60 m", "60√3 m", "120 m") },
              { text: "Two towers are 150 m apart. The angles of elevation of their tops from the midpoint between them are 30° and 60°. The ratio of their heights is:", difficulty: "HARD", explanation: "h₁ = 75 tan 30° = 75/√3; h₂ = 75 tan 60° = 75√3. Ratio = 1:3.", options: opts(0, "1:3", "1:√3", "√3:1", "3:1") },
              { text: "The angle of elevation of a cloud from a point 60 m above a lake is 30° and the angle of depression of its reflection in the lake is 60°. The height of the cloud above the lake is:", difficulty: "HARD", explanation: "Let cloud be h above lake. h−60 = d tan 30°; h+60 = d tan 60°. Dividing: (h+60)/(h−60) = √3/√(1/3) = 3. Solving h = 120 m.", options: opts(2, "60 m", "90 m", "120 m", "180 m") },
              { text: "A pole 6 m high casts a shadow of 6√3 m. The angle of elevation of the sun is:", difficulty: "MEDIUM", explanation: "tan θ = 6/(6√3) = 1/√3 → θ = 30°.", options: opts(0, "30°", "45°", "60°", "90°") },
              { text: "A man standing on the bank of a river observes that the angle of elevation of a tree on the opposite bank is 60°. If the river is 20 m wide, the height of the tree is:", difficulty: "MEDIUM", explanation: "tan 60° = h/20 → h = 20√3 m.", options: opts(1, "20 m", "20√3 m", "40 m", "40√3 m") },
              { text: "The angle of elevation of the top of a tower from a point on the ground 30 m from its base is 30°. The height of the tower is:", difficulty: "EASY", explanation: "tan 30° = h/30 → h = 30 × (1/√3) = 10√3 m.", options: opts(2, "30 m", "30√3 m", "10√3 m", "10 m") },
              { text: "If the angle of elevation of an object increases as you walk toward it, the object is:", difficulty: "EASY", explanation: "As you get closer to a tall object, you have to look more steeply up → angle of elevation increases.", options: opts(0, "taller than you", "at the same height", "moving away", "shorter than you") },
              { text: "tan 30° × tan 60° equals:", difficulty: "MEDIUM", explanation: "tan 30° = 1/√3, tan 60° = √3. Product = (1/√3)×√3 = 1.", options: opts(2, "√3", "1/√3", "1", "3") },
            ],
          },
          // ── Circles ───────────────────────────────────────────────────────
          {
            slug: "circles",
            name: "Circles",
            marks: 1,
            negative: 0,
            test: { slug: "circles-practice-1", title: "Circles — Practice Test", description: "15 CBSE Class 10 Circles questions. +1 each, no negative marking." },
            questions: [
              { text: "A tangent to a circle touches the circle at:", difficulty: "EASY", explanation: "A tangent touches the circle at exactly one point, called the point of tangency.", options: opts(1, "two points", "exactly one point", "three points", "no point") },
              { text: "The tangent to a circle at any point is _____ to the radius at that point.", difficulty: "EASY", explanation: "The tangent is always perpendicular to the radius drawn to the point of tangency.", options: opts(0, "perpendicular", "parallel", "equal", "bisecting") },
              { text: "How many tangents can be drawn from an external point to a circle?", difficulty: "EASY", explanation: "Exactly 2 tangents can be drawn from any external point to a circle.", options: opts(1, "1", "2", "3", "infinite") },
              { text: "If PA and PB are tangents from external point P to a circle, then:", difficulty: "MEDIUM", explanation: "Tangent segments from an external point are equal → PA = PB.", options: opts(0, "PA = PB", "PA > PB", "PA < PB", "PA + PB = diameter") },
              { text: "If PA and PB are two tangents from P with ∠APB = 80°, then ∠AOB (O = centre) is:", difficulty: "HARD", explanation: "∠APB + ∠AOB = 180° (since OA ⊥ PA and OB ⊥ PB in quadrilateral OAPB). ∠AOB = 100°.", options: opts(2, "80°", "90°", "100°", "120°") },
              { text: "A tangent drawn from an external point P touches the circle (radius 5 cm) at T. If PT = 12 cm, then OP (O = centre) is:", difficulty: "MEDIUM", explanation: "OT ⊥ PT → OP² = OT² + PT² = 25 + 144 = 169 → OP = 13 cm.", options: opts(2, "5 cm", "12 cm", "13 cm", "17 cm") },
              { text: "The number of tangents that can be drawn to a circle from a point ON the circle is:", difficulty: "EASY", explanation: "From a point on the circle exactly one tangent can be drawn.", options: opts(1, "0", "1", "2", "infinite") },
              { text: "Two concentric circles have radii 5 cm and 3 cm. The length of the chord of the outer circle that is tangent to the inner circle is:", difficulty: "HARD", explanation: "The chord is tangent to inner circle → distance from centre to chord = 3 cm. Half-length = √(5²−3²) = 4 → chord = 8 cm.", options: opts(2, "4 cm", "6 cm", "8 cm", "10 cm") },
              { text: "If a tangent and a chord meet at a point on a circle, the angle between them equals:", difficulty: "HARD", explanation: "Tangent-chord angle = inscribed angle in the alternate segment (Alternate Segment Theorem).", options: opts(1, "90°", "angle in the alternate segment", "half the central angle", "the central angle") },
              { text: "The length of the tangent from point P (at distance d from centre) to a circle of radius r is:", difficulty: "MEDIUM", explanation: "Length = √(d²−r²) (by Pythagoras, since radius ⊥ tangent).", options: opts(0, "√(d²−r²)", "√(d²+r²)", "d−r", "d+r") },
              { text: "Two tangents PA and PB from external point P meet the circle at A and B. If PA = 6 cm, then PB =", difficulty: "EASY", explanation: "Tangent segments from the same external point are equal, so PB = PA = 6 cm.", options: opts(1, "3 cm", "6 cm", "12 cm", "cannot tell") },
              { text: "A chord that passes through the centre of a circle is called:", difficulty: "EASY", explanation: "A chord through the centre is the diameter — the longest chord of the circle.", options: opts(1, "radius", "diameter", "tangent", "secant") },
              { text: "The angle subtended by a diameter at any point on the circle (other than the endpoints) is:", difficulty: "MEDIUM", explanation: "The angle in a semicircle is always 90° (Thales' theorem).", options: opts(2, "45°", "60°", "90°", "180°") },
              { text: "If from an external point, two tangents PA and PB are drawn and ∠APB = 60°, then ∠PAB is:", difficulty: "HARD", explanation: "△PAB is isosceles (PA = PB) with ∠APB = 60°. So ∠PAB = ∠PBA = (180−60)/2 = 60°. It is equilateral!", options: opts(2, "30°", "45°", "60°", "90°") },
              { text: "A tangent and a secant from an external point P. If PT = 6 cm (tangent) and the external part of the secant = 3 cm, the full secant length is:", difficulty: "HARD", explanation: "PT² = external × whole → 36 = 3 × whole → whole = 12 cm.", options: opts(2, "9 cm", "10 cm", "12 cm", "18 cm") },
            ],
          },
          // ── Areas Related to Circles ──────────────────────────────────────
          {
            slug: "areas-related-to-circles",
            name: "Areas Related to Circles",
            marks: 1,
            negative: 0,
            test: { slug: "areas-related-to-circles-practice-1", title: "Areas Related to Circles — Practice Test", description: "15 CBSE Class 10 questions on areas of circles & sectors. +1 each, no negative marking." },
            questions: [
              { text: "The area of a circle with radius r is:", difficulty: "EASY", explanation: "Area = πr².", options: opts(1, "2πr", "πr²", "πr", "2πr²") },
              { text: "The circumference of a circle with radius r is:", difficulty: "EASY", explanation: "Circumference = 2πr.", options: opts(0, "2πr", "πr²", "πd", "2πd") },
              { text: "The area of a sector with radius r and angle θ (in degrees) is:", difficulty: "MEDIUM", explanation: "Area of sector = (θ/360) × πr².", options: opts(2, "(θ/180)×πr²", "(θ/360)×πr", "(θ/360)×πr²", "(θ/180)×r²") },
              { text: "The length of an arc of a sector with radius r and angle θ° is:", difficulty: "MEDIUM", explanation: "Arc length = (θ/360) × 2πr.", options: opts(0, "(θ/360)×2πr", "(θ/180)×πr", "(θ/360)×πr²", "2πr/θ") },
              { text: "The area of a circle of diameter 14 cm is (use π = 22/7):", difficulty: "EASY", explanation: "r = 7. Area = (22/7)×49 = 154 cm².", options: opts(1, "44 cm²", "154 cm²", "196 cm²", "308 cm²") },
              { text: "A sector has radius 7 cm and angle 90°. Its area is (π = 22/7):", difficulty: "MEDIUM", explanation: "(90/360)×(22/7)×49 = ¼ × 154 = 38.5 cm².", options: opts(2, "154 cm²", "77 cm²", "38.5 cm²", "19.25 cm²") },
              { text: "The area of the minor segment is obtained by:", difficulty: "MEDIUM", explanation: "Area of minor segment = Area of sector − Area of triangle (formed by the two radii and chord).", options: opts(1, "Area of sector + triangle", "Area of sector − triangle", "Area of circle − sector", "Area of circle + triangle") },
              { text: "A horse is tied to a pole with a rope 7 m long. The area it can graze is (π = 22/7):", difficulty: "MEDIUM", explanation: "Area = πr² = (22/7)×49 = 154 m².", options: opts(2, "44 m²", "77 m²", "154 m²", "308 m²") },
              { text: "The radius of a circle whose circumference equals the sum of circumferences of two circles of radii 3 and 4 is:", difficulty: "HARD", explanation: "2πR = 2π×3 + 2π×4 = 2π×7 → R = 7.", options: opts(2, "5", "6", "7", "12") },
              { text: "A quadrant of a circle has area 38.5 cm². The radius is (π = 22/7):", difficulty: "MEDIUM", explanation: "Quadrant = πr²/4. 38.5 = (22/7)×r²/4 → r² = 49 → r = 7 cm.", options: opts(2, "5 cm", "6 cm", "7 cm", "8 cm") },
              { text: "A semicircular sheet of radius 7 cm is folded to form a cone. The circumference of the base of the cone is:", difficulty: "HARD", explanation: "The semicircle's arc length = πr = 22 cm becomes the base circumference.", options: opts(1, "2πr", "πr", "2r", "πr²") },
              { text: "Two circular lawns of diameter 6 m each are to be mown. The area to be mown is (π = 3.14):", difficulty: "MEDIUM", explanation: "Area = 2 × π × 3² = 2 × 3.14 × 9 = 56.52 m².", options: opts(2, "28.26 m²", "36 m²", "56.52 m²", "113 m²") },
              { text: "The area of the major sector if the minor sector has angle 60° and radius 6 cm (π = 3.14):", difficulty: "HARD", explanation: "Major sector angle = 300°. Area = (300/360)×π×36 = (5/6)×113.04 = 94.2 cm².", options: opts(1, "18.84 cm²", "94.2 cm²", "113.04 cm²", "56.52 cm²") },
              { text: "If the area of a sector is half the area of the full circle, the sector angle is:", difficulty: "MEDIUM", explanation: "Half the circle → angle = 180° (a semicircle).", options: opts(2, "90°", "120°", "180°", "270°") },
              { text: "The perimeter of a sector of radius 7 cm and angle 60° is (π = 22/7):", difficulty: "HARD", explanation: "Arc = (60/360)×2×(22/7)×7 = (1/6)×44 = 7.33 cm. Perimeter = arc + 2r = 7.33 + 14 = 21.33 cm ≈ 21⅓ cm.", options: opts(3, "14 cm", "22 cm", "44/3 cm", "21⅓ cm") },
            ],
          },
          // ── Surface Areas and Volumes ─────────────────────────────────────
          {
            slug: "surface-areas-and-volumes",
            name: "Surface Areas and Volumes",
            marks: 1,
            negative: 0,
            test: { slug: "surface-areas-volumes-practice-1", title: "Surface Areas & Volumes — Practice Test", description: "15 CBSE Class 10 questions on 3D mensuration. +1 each, no negative marking." },
            questions: [
              { text: "The total surface area of a cube with side a is:", difficulty: "EASY", explanation: "A cube has 6 equal square faces. TSA = 6a².", options: opts(1, "4a²", "6a²", "a³", "3a²") },
              { text: "The volume of a cuboid with length l, breadth b and height h is:", difficulty: "EASY", explanation: "Volume = l × b × h.", options: opts(0, "lbh", "2(lb+bh+lh)", "lb+bh+lh", "2lbh") },
              { text: "The curved surface area of a cylinder with radius r and height h is:", difficulty: "EASY", explanation: "CSA = 2πrh.", options: opts(1, "πrh", "2πrh", "πr²h", "2πr²+2πrh") },
              { text: "The total surface area of a cylinder is:", difficulty: "MEDIUM", explanation: "TSA = 2πrh + 2πr² = 2πr(h + r).", options: opts(2, "2πrh", "πr(r+h)", "2πr(r+h)", "πr²h") },
              { text: "The volume of a cylinder is:", difficulty: "EASY", explanation: "V = πr²h.", options: opts(1, "2πrh", "πr²h", "πrh²", "πr²+h") },
              { text: "The volume of a cone with radius r and height h is:", difficulty: "MEDIUM", explanation: "V = (1/3)πr²h.", options: opts(0, "(1/3)πr²h", "πr²h", "(2/3)πr²h", "(1/2)πr²h") },
              { text: "The slant height of a cone is:", difficulty: "MEDIUM", explanation: "l = √(r²+h²).", options: opts(1, "r+h", "√(r²+h²)", "√(r+h)", "h²+r²") },
              { text: "The total surface area of a cone is:", difficulty: "MEDIUM", explanation: "TSA = πrl + πr² = πr(l+r), where l is slant height.", options: opts(2, "πrl", "πr²+h", "πr(l+r)", "2πrl") },
              { text: "The volume of a sphere with radius r is:", difficulty: "EASY", explanation: "V = (4/3)πr³.", options: opts(1, "πr³", "(4/3)πr³", "4πr²", "(2/3)πr³") },
              { text: "The surface area of a sphere with radius r is:", difficulty: "EASY", explanation: "SA = 4πr².", options: opts(2, "2πr²", "πr²", "4πr²", "(4/3)πr³") },
              { text: "The volume of a hemisphere with radius r is:", difficulty: "MEDIUM", explanation: "V = (2/3)πr³ (half the sphere's volume).", options: opts(1, "(1/3)πr³", "(2/3)πr³", "(4/3)πr³", "πr³") },
              { text: "A solid sphere of radius 6 cm is melted and recast into 8 equal small spheres. The radius of each small sphere is:", difficulty: "HARD", explanation: "Volume is conserved: (4/3)π×6³ = 8 × (4/3)πr³ → r³ = 27 → r = 3 cm.", options: opts(2, "1 cm", "2 cm", "3 cm", "4 cm") },
              { text: "A cylinder (r = 7 cm, h = 10 cm) is melted into a cone of same radius. The height of the cone is:", difficulty: "HARD", explanation: "πr²h = (1/3)πr²H → H = 3h = 30 cm.", options: opts(2, "3.33 cm", "10 cm", "30 cm", "70 cm") },
              { text: "A hollow cylinder (outer radius R, inner radius r, height h) has volume:", difficulty: "HARD", explanation: "V = π(R²−r²)h.", options: opts(2, "π(R+r)h", "2π(R+r)h", "π(R²−r²)h", "π(R−r)²h") },
              { text: "A toy is in the shape of a cone on a hemisphere, both with radius 3 cm. If the cone height is 4 cm, the total volume is (π = 3.14):", difficulty: "HARD", explanation: "V = (1/3)π×9×4 + (2/3)π×27 = 12π + 18π = 30π ≈ 94.2 cm³.", options: opts(2, "56.52 cm³", "84.78 cm³", "94.2 cm³", "113 cm³") },
            ],
          },
          // ── Statistics ────────────────────────────────────────────────────
          {
            slug: "statistics",
            name: "Statistics",
            marks: 1,
            negative: 0,
            test: { slug: "statistics-practice-1", title: "Statistics — Practice Test", description: "15 CBSE Class 10 Statistics questions. +1 each, no negative marking." },
            questions: [
              { text: "The mean of a data set is:", difficulty: "EASY", explanation: "Mean = Sum of all observations ÷ Number of observations.", options: opts(0, "sum ÷ number of items", "middle value", "most frequent value", "highest − lowest") },
              { text: "The mode of a data set is:", difficulty: "EASY", explanation: "Mode is the value that occurs most frequently in the data.", options: opts(1, "mean value", "most frequent value", "middle value", "range") },
              { text: "The median is the value that:", difficulty: "EASY", explanation: "Median divides the data into two equal halves (50th percentile).", options: opts(2, "occurs most often", "is the average", "divides data into two equal halves", "is the largest") },
              { text: "For a class interval 30–40, the class mark (midpoint) is:", difficulty: "EASY", explanation: "Class mark = (30+40)/2 = 35.", options: opts(2, "30", "40", "35", "10") },
              { text: "The empirical relationship between mean, median and mode is:", difficulty: "MEDIUM", explanation: "Mode = 3 Median − 2 Mean (approximately, for moderately skewed distributions).", options: opts(0, "Mode = 3 Median − 2 Mean", "Mean = 3 Mode − 2 Median", "Median = 3 Mean − 2 Mode", "Mode = 2 Mean − Median") },
              { text: "In the assumed mean method, 'a' represents:", difficulty: "MEDIUM", explanation: "'a' is the assumed mean — a convenient value (usually the midpoint of a middle class) chosen to simplify calculation.", options: opts(1, "actual mean", "assumed mean", "class width", "frequency") },
              { text: "The cumulative frequency of a class is:", difficulty: "MEDIUM", explanation: "Cumulative frequency is the running total of all frequencies up to and including that class.", options: opts(2, "frequency of that class only", "frequency × class mark", "sum of all frequencies up to that class", "frequency ÷ total") },
              { text: "An ogive is a graph of:", difficulty: "MEDIUM", explanation: "An ogive (cumulative frequency curve) plots cumulative frequency against the upper class boundaries.", options: opts(1, "frequency vs class mark", "cumulative frequency vs class boundaries", "mode vs median", "mean vs class") },
              { text: "For a grouped data with n observations, the median class is the class containing the:", difficulty: "MEDIUM", explanation: "The median class contains the (n/2)th observation in the cumulative frequency.", options: opts(0, "(n/2)th observation", "(n+1)/2th observation always", "most frequent item", "class with highest frequency") },
              { text: "The median formula for grouped data is:", difficulty: "HARD", explanation: "Median = l + [(n/2 − cf)/f] × h, where l = lower limit, cf = cumulative freq before median class, f = freq of median class, h = class width.", options: opts(0, "l + [(n/2−cf)/f]×h", "l + [f/(n/2−cf)]×h", "a + (Σfd/Σf)", "3Median−2Mean") },
              { text: "The modal class is the class with:", difficulty: "EASY", explanation: "The modal class has the highest frequency.", options: opts(1, "highest cumulative frequency", "highest frequency", "lowest frequency", "the median") },
              { text: "The mode formula for grouped data uses:", difficulty: "HARD", explanation: "Mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)] × h, where f₁ = modal class freq, f₀ = preceding class freq, f₂ = succeeding class freq.", options: opts(2, "only the modal class frequency", "mean and median", "modal class and its neighbours", "cumulative frequencies") },
              { text: "In a frequency distribution, if all class intervals have equal width h, and Σfd/Σf = 2.4 with assumed mean a = 25, the actual mean is:", difficulty: "HARD", explanation: "Mean = a + (Σfd/Σf)×h. Without h given we cannot compute — but if h=5: 25 + 2.4×5 = 37. If the option uses h=5, answer = 37.", options: opts(1, "27.4", "37", "22.6", "25") },
              { text: "The range of a data set is:", difficulty: "EASY", explanation: "Range = Maximum value − Minimum value.", options: opts(0, "max − min", "max + min", "max ÷ min", "sum of all values") },
              { text: "If n = 20 and the (n/2)th = 10th observation falls in the class 30–40, then the median lies in:", difficulty: "MEDIUM", explanation: "The class containing the 10th value is the median class: 30–40.", options: opts(1, "20–30", "30–40", "40–50", "cannot determine") },
            ],
          },
          // ── Probability ───────────────────────────────────────────────────
          {
            slug: "probability",
            name: "Probability",
            marks: 1,
            negative: 0,
            test: { slug: "probability-practice-1", title: "Probability — Practice Test", description: "15 CBSE Class 10 Probability questions. +1 each, no negative marking." },
            questions: [
              { text: "Probability of an event E is defined as:", difficulty: "EASY", explanation: "P(E) = Number of favourable outcomes / Total number of equally likely outcomes.", options: opts(0, "favourable/total outcomes", "total/favourable outcomes", "favourable × total", "favourable − total") },
              { text: "The probability of a certain (sure) event is:", difficulty: "EASY", explanation: "P(certain event) = 1 (it always happens).", options: opts(2, "0", "0.5", "1", "greater than 1") },
              { text: "The probability of an impossible event is:", difficulty: "EASY", explanation: "P(impossible event) = 0 (it never happens).", options: opts(0, "0", "1", "0.5", "−1") },
              { text: "If P(E) = 0.35, then P(not E) is:", difficulty: "EASY", explanation: "P(not E) = 1 − P(E) = 1 − 0.35 = 0.65.", options: opts(2, "0.35", "0.50", "0.65", "1.35") },
              { text: "A coin is tossed. The probability of getting a head is:", difficulty: "EASY", explanation: "A fair coin has 2 equally likely outcomes. P(head) = 1/2.", options: opts(1, "1", "1/2", "1/4", "2") },
              { text: "A fair die is thrown. The probability of getting a 3 is:", difficulty: "EASY", explanation: "One favourable outcome (3) out of 6 equally likely outcomes. P(3) = 1/6.", options: opts(2, "1/3", "1/2", "1/6", "3/6") },
              { text: "A fair die is thrown. The probability of getting an even number is:", difficulty: "EASY", explanation: "Even numbers: 2, 4, 6 — three outcomes. P = 3/6 = 1/2.", options: opts(1, "1/3", "1/2", "2/3", "1/6") },
              { text: "A card is drawn from a well-shuffled deck of 52 cards. The probability of drawing an ace is:", difficulty: "MEDIUM", explanation: "There are 4 aces in 52 cards. P(ace) = 4/52 = 1/13.", options: opts(2, "1/52", "4/52", "1/13", "4/13") },
              { text: "A bag has 3 red and 5 blue balls. A ball is drawn at random. The probability it is red is:", difficulty: "EASY", explanation: "P(red) = 3/(3+5) = 3/8.", options: opts(0, "3/8", "5/8", "3/5", "1/2") },
              { text: "Two coins are tossed. The probability of getting at least one head is:", difficulty: "MEDIUM", explanation: "Sample space: HH, HT, TH, TT. At least one head: HH, HT, TH — 3 outcomes. P = 3/4.", options: opts(2, "1/4", "1/2", "3/4", "1") },
              { text: "A card is drawn from a deck of 52 cards. The probability that it is a face card (J, Q, K) is:", difficulty: "MEDIUM", explanation: "There are 12 face cards (4 each of J, Q, K). P = 12/52 = 3/13.", options: opts(3, "1/13", "4/52", "12/13", "3/13") },
              { text: "A fair die is rolled. Probability of getting a number greater than 4 is:", difficulty: "MEDIUM", explanation: "Numbers greater than 4: 5, 6 — two outcomes. P = 2/6 = 1/3.", options: opts(1, "1/2", "1/3", "2/3", "1/6") },
              { text: "The probability of getting a sum of 7 when two dice are rolled is:", difficulty: "HARD", explanation: "Pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 out of 36. P = 6/36 = 1/6.", options: opts(2, "1/12", "1/9", "1/6", "7/36") },
              { text: "Letters of the word MATHEMATICS are written on cards and one is picked at random. The probability of picking an M is:", difficulty: "HARD", explanation: "MATHEMATICS has 11 letters; M appears twice. P = 2/11.", options: opts(0, "2/11", "1/11", "2/10", "1/5") },
              { text: "If P(A) = 0.6 and A and B are mutually exclusive with P(A∪B) = 0.9, then P(B) is:", difficulty: "HARD", explanation: "P(A∪B) = P(A) + P(B) for mutually exclusive events. P(B) = 0.9 − 0.6 = 0.3.", options: opts(1, "0.6", "0.3", "0.4", "1.5") },
            ],
          },
        ],
      },
      // ── SCIENCE ──────────────────────────────────────────────────────────
      {
        slug: "science",
        name: "Science",
        chapters: [
          // ── Metals and Non-metals ─────────────────────────────────────────
          {
            slug: "metals-and-nonmetals",
            name: "Metals and Non-metals",
            marks: 1,
            negative: 0,
            test: { slug: "metals-nonmetals-practice-1", title: "Metals and Non-metals — Practice Test", description: "15 CBSE Class 10 questions on metals and non-metals. +1 each, no negative marking." },
            questions: [
              { text: "Which property allows metals to be beaten into thin sheets?", difficulty: "EASY", explanation: "Malleability — the ability to be beaten into sheets — is a characteristic property of metals.", options: opts(0, "malleability", "ductility", "conductivity", "lustre") },
              { text: "Which property allows metals to be drawn into thin wires?", difficulty: "EASY", explanation: "Ductility — metals can be drawn into thin wires.", options: opts(1, "malleability", "ductility", "brittleness", "sonority") },
              { text: "The most abundant metal in the Earth's crust is:", difficulty: "EASY", explanation: "Aluminium is the most abundant metal in the Earth's crust.", options: opts(0, "aluminium", "iron", "sodium", "calcium") },
              { text: "Metals generally react with oxygen to form:", difficulty: "EASY", explanation: "Metals react with oxygen to form metallic oxides, which are generally basic.", options: opts(0, "metallic oxides", "metallic hydroxides", "acids", "salts") },
              { text: "Iron reacts with dilute HCl to produce:", difficulty: "MEDIUM", explanation: "Fe + 2HCl → FeCl₂ + H₂↑. Iron displaces hydrogen from the acid, producing ferrous chloride and hydrogen gas.", options: opts(1, "FeCl₃ and O₂", "FeCl₂ and H₂", "Fe₂O₃ and HCl", "FeO and H₂O") },
              { text: "The process of depositing a thin layer of zinc on iron to prevent rusting is called:", difficulty: "MEDIUM", explanation: "Galvanisation protects iron from rusting by coating it with a layer of zinc.", options: opts(1, "electroplating", "galvanisation", "alloying", "tempering") },
              { text: "Thermite reaction uses aluminium powder reacting with:", difficulty: "HARD", explanation: "Thermite: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. Aluminium displaces iron from iron oxide, releasing enormous heat.", options: opts(1, "CuO", "Fe₂O₃", "ZnO", "MgO") },
              { text: "The most reactive metal among the following is:", difficulty: "MEDIUM", explanation: "In the reactivity series, potassium (K) is more reactive than sodium, calcium and magnesium.", options: opts(2, "Mg", "Ca", "K", "Na") },
              { text: "Non-metals generally react with oxygen to form:", difficulty: "EASY", explanation: "Non-metals react with oxygen to form non-metallic (acidic) oxides.", options: opts(1, "basic oxides", "acidic oxides", "neutral oxides", "amphoteric oxides") },
              { text: "Which of these is a non-metal that conducts electricity?", difficulty: "MEDIUM", explanation: "Graphite (a form of carbon) is an exception — it is a non-metal that conducts electricity.", options: opts(2, "sulphur", "phosphorus", "graphite", "iodine") },
              { text: "Ionic compounds are formed by:", difficulty: "MEDIUM", explanation: "Ionic bonds form between metals (which lose electrons) and non-metals (which gain electrons).", options: opts(0, "metals and non-metals", "two metals", "two non-metals", "noble gases") },
              { text: "The chemical formula of rust is:", difficulty: "MEDIUM", explanation: "Rust is hydrated iron(III) oxide: Fe₂O₃·xH₂O.", options: opts(1, "FeO", "Fe₂O₃·xH₂O", "FeCl₂", "Fe₃O₄") },
              { text: "Which metal is kept under kerosene oil to prevent it from reacting with air or water?", difficulty: "MEDIUM", explanation: "Sodium is so reactive it catches fire in air — it is stored under kerosene to prevent oxidation.", options: opts(1, "iron", "sodium", "gold", "copper") },
              { text: "The process of obtaining pure metal from its ore using electricity is called:", difficulty: "MEDIUM", explanation: "Electrolytic refining uses electricity to purify metals.", options: opts(0, "electrolytic refining", "roasting", "smelting", "reduction") },
              { text: "An alloy of copper and zinc is:", difficulty: "EASY", explanation: "Brass is an alloy of copper (70%) and zinc (30%).", options: opts(0, "brass", "bronze", "steel", "solder") },
            ],
          },
          // ── Carbon and Its Compounds ──────────────────────────────────────
          {
            slug: "carbon-and-its-compounds",
            name: "Carbon and Its Compounds",
            marks: 1,
            negative: 0,
            test: { slug: "carbon-compounds-practice-1", title: "Carbon and Its Compounds — Practice Test", description: "15 CBSE Class 10 questions on carbon chemistry. +1 each, no negative marking." },
            questions: [
              { text: "Carbon forms millions of compounds mainly because of:", difficulty: "EASY", explanation: "Carbon's ability to bond with itself and other atoms to form long chains (catenation) and its tetravalency are key.", options: opts(1, "its small size", "catenation and tetravalency", "being a metal", "having 6 neutrons") },
              { text: "The valency of carbon is:", difficulty: "EASY", explanation: "Carbon has 4 electrons in its outer shell → valency = 4 (tetravalent).", options: opts(1, "2", "4", "6", "3") },
              { text: "Hydrocarbons containing only single bonds are called:", difficulty: "EASY", explanation: "Saturated hydrocarbons (alkanes) contain only C–C single bonds.", options: opts(0, "saturated", "unsaturated", "aromatic", "aliphatic") },
              { text: "The first member of the alkane series is:", difficulty: "EASY", explanation: "Methane (CH₄) is the simplest alkane (one carbon atom).", options: opts(1, "ethane", "methane", "propane", "butane") },
              { text: "The functional group –OH is called:", difficulty: "MEDIUM", explanation: "–OH is the hydroxyl group, found in alcohols.", options: opts(1, "carboxyl group", "hydroxyl group", "aldehyde group", "amine group") },
              { text: "Ethanol (C₂H₅OH) is an example of an:", difficulty: "EASY", explanation: "Ethanol has the –OH (hydroxyl) group, making it an alcohol.", options: opts(0, "alcohol", "ester", "ketone", "aldehyde") },
              { text: "Ethanoic acid (CH₃COOH) is commonly called:", difficulty: "EASY", explanation: "CH₃COOH is acetic acid, the acid in vinegar.", options: opts(1, "formic acid", "acetic acid", "oxalic acid", "citric acid") },
              { text: "The process of burning hydrocarbons in excess oxygen is called:", difficulty: "EASY", explanation: "Complete combustion of hydrocarbons in excess O₂ produces CO₂ and H₂O.", options: opts(1, "substitution", "combustion", "addition", "esterification") },
              { text: "Unsaturated hydrocarbons decolourise bromine water. This is due to:", difficulty: "HARD", explanation: "The C=C double bond undergoes addition with Br₂, decolourising the orange bromine water.", options: opts(2, "combustion", "substitution reaction", "addition reaction", "elimination reaction") },
              { text: "The product of reaction between an alcohol and a carboxylic acid is called an:", difficulty: "MEDIUM", explanation: "Alcohol + carboxylic acid → ester + water (esterification).", options: opts(1, "alkane", "ester", "ketone", "aldehyde") },
              { text: "Saponification is the process of:", difficulty: "MEDIUM", explanation: "Saponification is the alkaline hydrolysis of fats/oils to produce soap (sodium or potassium salts of fatty acids) and glycerol.", options: opts(0, "making soap from fats", "making alcohol from sugar", "burning carbon", "refining oil") },
              { text: "Diamond and graphite are both forms of carbon. They are called:", difficulty: "MEDIUM", explanation: "Different structural forms of the same element are allotropes. Diamond and graphite are allotropes of carbon.", options: opts(1, "isotopes", "allotropes", "isobars", "isomers") },
              { text: "In graphite, each carbon is bonded to how many other carbons?", difficulty: "HARD", explanation: "In graphite, each carbon forms 3 covalent bonds in hexagonal layers; the fourth electron is free (hence conductivity).", options: opts(2, "4", "2", "3", "6") },
              { text: "Addition of hydrogen to an unsaturated hydrocarbon in the presence of a catalyst is called:", difficulty: "MEDIUM", explanation: "Hydrogenation is the addition of H₂ to a C=C or C≡C bond, typically using Ni/Pd as catalyst. Used to make vanaspati ghee.", options: opts(0, "hydrogenation", "combustion", "esterification", "saponification") },
              { text: "The IUPAC name of CH₃–CH₂–OH is:", difficulty: "MEDIUM", explanation: "Two-carbon chain with –OH group: ethanol (eth- = 2C, -an- = single bond, -ol = alcohol).", options: opts(1, "methanol", "ethanol", "propanol", "butanol") },
            ],
          },
          // ── Control and Coordination ──────────────────────────────────────
          {
            slug: "control-and-coordination",
            name: "Control and Coordination",
            marks: 1,
            negative: 0,
            test: { slug: "control-coordination-practice-1", title: "Control and Coordination — Practice Test", description: "15 CBSE Class 10 Biology questions. +1 each, no negative marking." },
            questions: [
              { text: "The functional and structural unit of the nervous system is the:", difficulty: "EASY", explanation: "The neuron (nerve cell) is the basic structural and functional unit of the nervous system.", options: opts(1, "nephron", "neuron", "axon", "dendrite") },
              { text: "The junction between two neurons is called a:", difficulty: "EASY", explanation: "A synapse is the tiny gap between the axon terminal of one neuron and the dendrite of the next.", options: opts(2, "axon", "dendrite", "synapse", "node") },
              { text: "Reflex actions are controlled by the:", difficulty: "MEDIUM", explanation: "Reflex arcs pass through the spinal cord, not the brain, allowing fast involuntary responses.", options: opts(1, "brain", "spinal cord", "cerebellum", "medulla") },
              { text: "The part of the brain that maintains balance and coordination of movement is the:", difficulty: "MEDIUM", explanation: "The cerebellum controls coordination, balance and fine motor movements.", options: opts(2, "cerebrum", "medulla", "cerebellum", "hypothalamus") },
              { text: "Which gland is called the 'master gland' of the body?", difficulty: "EASY", explanation: "The pituitary gland controls many other endocrine glands, earning it the title 'master gland'.", options: opts(1, "thyroid", "pituitary", "adrenal", "pancreas") },
              { text: "Insulin is secreted by the:", difficulty: "EASY", explanation: "Insulin is produced by the beta cells of the islets of Langerhans in the pancreas.", options: opts(2, "thyroid gland", "adrenal gland", "pancreas", "pituitary gland") },
              { text: "The hormone responsible for the 'fight or flight' response is:", difficulty: "MEDIUM", explanation: "Adrenaline (epinephrine), secreted by the adrenal glands, prepares the body for emergency situations.", options: opts(0, "adrenaline", "insulin", "thyroxin", "oestrogen") },
              { text: "Plants growing towards light is called:", difficulty: "EASY", explanation: "Phototropism — growth movement in plants in response to light (positive phototropism = toward light).", options: opts(1, "geotropism", "phototropism", "thigmotropism", "chemotropism") },
              { text: "The hormone responsible for the growth of plants is:", difficulty: "MEDIUM", explanation: "Auxins (especially IAA) promote cell elongation in plants and regulate phototropism.", options: opts(0, "auxin", "cytokinin", "abscisic acid", "ethylene") },
              { text: "Which part of the nerve cell receives information from other neurons?", difficulty: "MEDIUM", explanation: "Dendrites receive signals from other neurons and carry impulses toward the cell body.", options: opts(1, "axon", "dendrite", "myelin", "synapse") },
              { text: "Thyroxin controls the rate of:", difficulty: "MEDIUM", explanation: "Thyroxin (thyroid hormone) regulates the basal metabolic rate of the body.", options: opts(2, "digestion", "reproduction", "metabolism", "respiration") },
              { text: "Iodine deficiency leads to:", difficulty: "MEDIUM", explanation: "Iodine is needed to make thyroxin. Deficiency leads to goitre (swelling of the thyroid gland).", options: opts(1, "diabetes", "goitre", "dwarfism", "rickets") },
              { text: "The part of the human brain associated with intelligence, memory and voluntary actions is the:", difficulty: "MEDIUM", explanation: "The cerebrum (largest part of the brain) controls intelligence, memory, language and voluntary movements.", options: opts(0, "cerebrum", "cerebellum", "medulla", "pons") },
              { text: "Movements of plants in response to touch are called:", difficulty: "MEDIUM", explanation: "Thigmotropism — touch-induced movement (e.g. tendrils of pea plants coiling around a support).", options: opts(2, "phototropism", "geotropism", "thigmotropism", "chemotropism") },
              { text: "The medulla oblongata controls:", difficulty: "HARD", explanation: "The medulla controls involuntary vital functions like heartbeat, breathing and swallowing.", options: opts(0, "involuntary actions like breathing and heartbeat", "voluntary movement", "balance", "sight") },
            ],
          },
          // ── How do Organisms Reproduce? ───────────────────────────────────
          {
            slug: "reproduction",
            name: "How do Organisms Reproduce?",
            marks: 1,
            negative: 0,
            test: { slug: "reproduction-practice-1", title: "Reproduction — Practice Test", description: "15 CBSE Class 10 Biology questions on reproduction. +1 each, no negative marking." },
            questions: [
              { text: "The process by which organisms produce offspring similar to themselves is called:", difficulty: "EASY", explanation: "Reproduction is the biological process by which new individuals are produced, ensuring continuity of life.", options: opts(1, "growth", "reproduction", "nutrition", "excretion") },
              { text: "Reproduction that involves only one parent and produces genetically identical offspring is:", difficulty: "EASY", explanation: "Asexual reproduction involves a single parent; offspring are clones (genetically identical).", options: opts(0, "asexual reproduction", "sexual reproduction", "vegetative propagation", "pollination") },
              { text: "Which of the following is an example of binary fission?", difficulty: "EASY", explanation: "Amoeba divides into two equal halves — binary fission.", options: opts(0, "Amoeba", "Hydra", "Spirogyra", "fern") },
              { text: "Budding is a method of asexual reproduction seen in:", difficulty: "EASY", explanation: "Hydra reproduces by budding — small outgrowths (buds) develop and detach as new individuals.", options: opts(1, "Amoeba", "Hydra", "Paramecium", "Plasmodium") },
              { text: "Regeneration is the ability of:", difficulty: "MEDIUM", explanation: "Planaria (flatworm) can regenerate a whole organism from a small fragment — a unique ability.", options: opts(2, "Amoeba to divide", "Hydra to bud", "Planaria to grow from fragments", "yeast to bud") },
              { text: "The male reproductive organ in flowering plants is the:", difficulty: "EASY", explanation: "The stamen (comprising anther + filament) is the male organ; pollen is produced in the anther.", options: opts(1, "pistil", "stamen", "petal", "sepal") },
              { text: "In humans, the organ where the foetus develops is the:", difficulty: "EASY", explanation: "The uterus is where the fertilised egg implants and the foetus develops.", options: opts(2, "ovary", "fallopian tube", "uterus", "vagina") },
              { text: "Double fertilisation is a feature of:", difficulty: "HARD", explanation: "In flowering plants (angiosperms), one sperm fertilises the egg (→ zygote) and another fuses with the polar nuclei (→ endosperm): double fertilisation.", options: opts(1, "gymnosperms", "angiosperms", "bryophytes", "algae") },
              { text: "The process of transfer of pollen from anther to stigma is called:", difficulty: "EASY", explanation: "Pollination is the transfer of pollen grains from the anther to the stigma of a flower.", options: opts(0, "pollination", "fertilisation", "germination", "budding") },
              { text: "Vegetative propagation in potato occurs through:", difficulty: "MEDIUM", explanation: "Potato tubers have 'eyes' which are axillary buds — they sprout to form new plants (vegetative propagation).", options: opts(1, "seeds", "tubers", "leaves", "flowers") },
              { text: "In sexual reproduction, gametes (sex cells) are:", difficulty: "MEDIUM", explanation: "Gametes are haploid (n) — they have half the chromosome number of the parent cell.", options: opts(0, "haploid", "diploid", "triploid", "polyploid") },
              { text: "HIV attacks which type of human cells?", difficulty: "MEDIUM", explanation: "HIV attacks T-helper (CD4+) lymphocytes — white blood cells of the immune system.", options: opts(2, "red blood cells", "platelets", "T-helper lymphocytes", "nerve cells") },
              { text: "The method of contraception that prevents STIs as well as pregnancy is:", difficulty: "MEDIUM", explanation: "Condoms act as a physical barrier preventing both fertilisation and the transmission of sexually transmitted infections.", options: opts(0, "condom", "copper-T", "oral pills", "vasectomy") },
              { text: "Which part of the flower develops into the fruit after fertilisation?", difficulty: "MEDIUM", explanation: "After fertilisation, the ovary develops into the fruit and the ovules into seeds.", options: opts(1, "ovule", "ovary", "style", "anther") },
              { text: "Fragmentation as a mode of reproduction is seen in:", difficulty: "MEDIUM", explanation: "Spirogyra (a filamentous alga) reproduces by fragmentation — the filament breaks into pieces that grow into new organisms.", options: opts(1, "Hydra", "Spirogyra", "Amoeba", "yeast") },
            ],
          },
          // ── Heredity and Evolution ────────────────────────────────────────
          {
            slug: "heredity-and-evolution",
            name: "Heredity and Evolution",
            marks: 1,
            negative: 0,
            test: { slug: "heredity-evolution-practice-1", title: "Heredity and Evolution — Practice Test", description: "15 CBSE Class 10 questions on genetics and evolution. +1 each, no negative marking." },
            questions: [
              { text: "The transmission of characters from parents to offspring is called:", difficulty: "EASY", explanation: "Heredity is the biological inheritance of traits from parents to their offspring.", options: opts(1, "evolution", "heredity", "variation", "mutation") },
              { text: "'Father of Genetics' is:", difficulty: "EASY", explanation: "Gregor Johann Mendel is called the Father of Genetics for his work with pea plants in the 1860s.", options: opts(1, "Darwin", "Mendel", "Morgan", "Lamarck") },
              { text: "Mendel's Law of Segregation states that:", difficulty: "MEDIUM", explanation: "Alleles of a gene segregate (separate) during gamete formation so each gamete carries only one allele.", options: opts(0, "alleles separate during gamete formation", "traits blend in offspring", "acquired characters are inherited", "genes are on chromosomes") },
              { text: "A 'dominant' trait is one that:", difficulty: "EASY", explanation: "A dominant trait expresses itself even when only one copy (allele) is present.", options: opts(0, "expresses in one copy", "expresses only in two copies", "is always harmful", "appears in every generation") },
              { text: "A 'recessive' trait is expressed:", difficulty: "MEDIUM", explanation: "A recessive allele is expressed only when both copies are recessive (homozygous recessive).", options: opts(1, "always", "only in homozygous recessive", "when dominant is absent", "never") },
              { text: "Crossing TT (tall) × tt (dwarf) pea plants. All F₁ plants are:", difficulty: "MEDIUM", explanation: "TT × tt → all Tt (tall), since T is dominant over t.", options: opts(0, "tall (Tt)", "dwarf (tt)", "half tall and half dwarf", "none are tall") },
              { text: "The ratio of tall : dwarf in F₂ (from Tt × Tt) is:", difficulty: "MEDIUM", explanation: "Tt × Tt → TT : Tt : tt = 1:2:1. Tall (TT+Tt) : dwarf (tt) = 3:1.", options: opts(1, "1:1", "3:1", "1:2:1", "1:3") },
              { text: "Acquired characteristics are NOT inherited. This idea refutes:", difficulty: "HARD", explanation: "Lamarck's theory (inheritance of acquired characters) is rejected by modern genetics. Acquired changes in soma do not affect DNA in germline.", options: opts(1, "Darwinism", "Lamarck's theory", "Mendelism", "mutation theory") },
              { text: "Evolution by natural selection was proposed by:", difficulty: "EASY", explanation: "Charles Darwin proposed the theory of evolution by natural selection in 'On the Origin of Species' (1859).", options: opts(1, "Lamarck", "Darwin", "Mendel", "Wallace") },
              { text: "Natural selection means:", difficulty: "MEDIUM", explanation: "In nature, individuals best adapted to their environment survive and reproduce more (survival of the fittest).", options: opts(0, "fitter individuals survive and reproduce more", "random changes in DNA", "acquired traits are passed on", "all individuals reproduce equally") },
              { text: "Homologous organs are organs that have:", difficulty: "HARD", explanation: "Homologous organs share the same basic structure (common ancestry) but may have different functions — e.g. human arm, bat wing, whale flipper.", options: opts(2, "same function, different structure", "no similarity", "same structure, different function", "same structure and function") },
              { text: "Analogous organs have:", difficulty: "HARD", explanation: "Analogous organs perform the same function but have different structural origins — e.g. wings of birds and wings of insects.", options: opts(0, "similar function, different structure", "similar structure and function", "no function", "identical origin") },
              { text: "DNA is the carrier of genetic information. The changes in DNA are called:", difficulty: "EASY", explanation: "Mutations are changes in the DNA sequence that can alter the structure and function of proteins.", options: opts(1, "variation", "mutation", "heredity", "selection") },
              { text: "Fossils are evidence for evolution because they show:", difficulty: "MEDIUM", explanation: "Fossils show organisms that lived in the past; by comparing fossils with present-day organisms, we can trace evolutionary changes over time.", options: opts(0, "organisms that lived in the past", "random mutations", "how DNA replicates", "Mendelian ratios") },
              { text: "The sex of a human child is determined by:", difficulty: "MEDIUM", explanation: "The father provides either X or Y; if Y reaches the egg first, a boy (XY) is conceived; if X, a girl (XX). So the father determines sex.", options: opts(1, "the mother's chromosomes", "the father's chromosomes (X or Y)", "environmental temperature", "blood group") },
            ],
          },
          // ── Light – Reflection and Refraction ─────────────────────────────
          {
            slug: "light-reflection-refraction",
            name: "Light – Reflection and Refraction",
            marks: 1,
            negative: 0,
            test: { slug: "light-reflection-refraction-practice-1", title: "Light: Reflection & Refraction — Practice Test", description: "15 CBSE Class 10 Physics questions on light. +1 each, no negative marking." },
            questions: [
              { text: "The law of reflection states that the angle of incidence equals:", difficulty: "EASY", explanation: "The angle of incidence equals the angle of reflection (both measured from the normal).", options: opts(1, "angle of refraction", "angle of reflection", "90°", "twice the angle of reflection") },
              { text: "The image formed by a plane mirror is:", difficulty: "EASY", explanation: "A plane mirror forms a virtual, erect, laterally inverted image of the same size as the object.", options: opts(0, "virtual, erect, same size", "real, inverted, same size", "virtual, inverted, magnified", "real, erect, same size") },
              { text: "The focal length of a concave mirror is:", difficulty: "MEDIUM", explanation: "The focal length f = R/2, where R is the radius of curvature.", options: opts(1, "equal to radius of curvature", "half the radius of curvature", "twice the radius of curvature", "equal to the aperture") },
              { text: "Which mirror is used as a rear-view mirror in vehicles?", difficulty: "EASY", explanation: "Convex mirrors are used as rear-view mirrors because they give a wider field of view and always form erect, diminished images.", options: opts(2, "plane mirror", "concave mirror", "convex mirror", "cylindrical mirror") },
              { text: "The mirror formula is:", difficulty: "MEDIUM", explanation: "1/v + 1/u = 1/f, where u = object distance, v = image distance, f = focal length.", options: opts(0, "1/v + 1/u = 1/f", "v + u = f", "1/f = 1/u − 1/v", "uv = f") },
              { text: "The bending of light when it passes from one medium to another is called:", difficulty: "EASY", explanation: "Refraction is the change in direction of light when it travels from one transparent medium to another.", options: opts(1, "reflection", "refraction", "dispersion", "diffraction") },
              { text: "Snell's law states: n₁ sin i = n₂ sin r. Here 'i' is the angle of:", difficulty: "MEDIUM", explanation: "In Snell's law, i is the angle of incidence and r is the angle of refraction, both measured from the normal.", options: opts(0, "incidence", "reflection", "refraction", "deviation") },
              { text: "The refractive index of a medium is greater than 1. This means light travels:", difficulty: "MEDIUM", explanation: "n = c/v > 1 → v < c → light travels slower in that medium than in vacuum.", options: opts(1, "faster than in vacuum", "slower than in vacuum", "at the same speed", "at right angles") },
              { text: "The lens formula is:", difficulty: "MEDIUM", explanation: "1/v − 1/u = 1/f (sign convention: distances measured from optical centre).", options: opts(0, "1/v − 1/u = 1/f", "1/v + 1/u = 1/f", "u + v = f", "f = uv/(u+v)") },
              { text: "A convex lens converges (converging lens) is used to correct:", difficulty: "MEDIUM", explanation: "Hypermetropia (long-sightedness) — the eye cannot see near objects clearly — is corrected using a convex (converging) lens.", options: opts(1, "myopia", "hypermetropia", "astigmatism", "presbyopia") },
              { text: "The power of a lens in diopters is:", difficulty: "MEDIUM", explanation: "Power P = 1/f (in metres). A shorter focal length = higher power.", options: opts(2, "P = f", "P = 1/v", "P = 1/f (in m)", "P = n/f") },
              { text: "The power of a concave lens is:", difficulty: "EASY", explanation: "A concave lens has a negative focal length, so its power is negative.", options: opts(0, "negative", "positive", "zero", "infinite") },
              { text: "Which phenomenon causes a pencil to appear bent when placed in water?", difficulty: "EASY", explanation: "The pencil appears bent due to refraction — light bends when it moves from water to air.", options: opts(1, "reflection", "refraction", "dispersion", "absorption") },
              { text: "Total internal reflection requires:", difficulty: "HARD", explanation: "TIR occurs when (1) light travels from a denser to a rarer medium AND (2) the angle of incidence exceeds the critical angle.", options: opts(0, "light going from denser to rarer medium at > critical angle", "light going from rarer to denser medium", "angle of incidence = 45°", "low refractive index") },
              { text: "A concave mirror of focal length 15 cm has an object at 45 cm. The image distance is:", difficulty: "HARD", explanation: "1/v + 1/u = 1/f; u = −45, f = −15. 1/v = −1/15 + 1/45 = −3/45 + 1/45 = −2/45 → v = −22.5 cm (real, inverted).", options: opts(2, "−45 cm", "−30 cm", "−22.5 cm", "+22.5 cm") },
            ],
          },
          // ── Human Eye and Colourful World ─────────────────────────────────
          {
            slug: "human-eye-and-colourful-world",
            name: "Human Eye and Colourful World",
            marks: 1,
            negative: 0,
            test: { slug: "human-eye-practice-1", title: "Human Eye and Colourful World — Practice Test", description: "15 CBSE Class 10 Physics questions on the eye and light phenomena. +1 each, no negative marking." },
            questions: [
              { text: "The ability of the eye to adjust its focal length to see objects at different distances is called:", difficulty: "EASY", explanation: "Power of accommodation — the ciliary muscles change the curvature of the eye lens to focus on near and far objects.", options: opts(2, "persistence of vision", "dispersion", "accommodation", "refraction") },
              { text: "The defect of vision where a person cannot see distant objects clearly is:", difficulty: "EASY", explanation: "Myopia (near-sightedness) — the image forms in front of the retina; corrected by a concave lens.", options: opts(0, "myopia", "hypermetropia", "presbyopia", "astigmatism") },
              { text: "Myopia is corrected by using:", difficulty: "EASY", explanation: "A concave (diverging) lens diverges light so it forms the image on the retina.", options: opts(1, "convex lens", "concave lens", "cylindrical lens", "bifocal lens") },
              { text: "Hypermetropia (long-sightedness) is corrected by:", difficulty: "EASY", explanation: "A convex (converging) lens converges light to form the image on the retina.", options: opts(0, "convex lens", "concave lens", "plane glass", "mirror") },
              { text: "Splitting of white light into its component colours is called:", difficulty: "EASY", explanation: "Dispersion — a prism splits white light into the seven VIBGYOR colours.", options: opts(2, "reflection", "refraction", "dispersion", "scattering") },
              { text: "The colours of the rainbow appear in the order:", difficulty: "MEDIUM", explanation: "VIBGYOR — Violet, Indigo, Blue, Green, Yellow, Orange, Red — from inner to outer arc of the rainbow.", options: opts(0, "VIBGYOR", "ROYGBIV", "VBRGIO Y", "random") },
              { text: "Which colour of light is deviated (bent) the most by a prism?", difficulty: "MEDIUM", explanation: "Violet light has the smallest wavelength and highest refractive index, so it bends the most.", options: opts(2, "red", "green", "violet", "yellow") },
              { text: "The sky appears blue because of:", difficulty: "MEDIUM", explanation: "Rayleigh scattering — shorter-wavelength blue light scatters more off air molecules than red light.", options: opts(0, "scattering of blue light", "reflection of blue light", "refraction", "absorption of red light") },
              { text: "At sunrise and sunset the sun appears red because:", difficulty: "MEDIUM", explanation: "Light travels a longer path through the atmosphere; blue/short-wavelength light scatters away, leaving red light to reach our eyes.", options: opts(1, "the sun emits red light at sunrise", "blue light is scattered away, leaving red", "water vapour absorbs blue light", "the sun is cooler at those times") },
              { text: "The phenomenon responsible for the twinkling of stars is:", difficulty: "MEDIUM", explanation: "Atmospheric refraction — varying refractive indices in the atmosphere cause light from stars to bend, making them appear to twinkle.", options: opts(1, "dispersion", "atmospheric refraction", "scattering", "diffraction") },
              { text: "Why do planets not twinkle (but stars do)?", difficulty: "HARD", explanation: "Planets are much closer and appear as extended disks; averaging over many points reduces the apparent twinkling effect, unlike point-source stars.", options: opts(0, "planets are closer and appear as extended disks", "planets emit their own light", "planets are bigger than stars", "planets are stationary") },
              { text: "The near point of a normal human eye is approximately:", difficulty: "EASY", explanation: "The near point (least distance of distinct vision) for a normal adult eye is 25 cm.", options: opts(1, "10 cm", "25 cm", "50 cm", "infinity") },
              { text: "The far point of a normal eye is:", difficulty: "EASY", explanation: "A normal eye can see objects clearly up to infinity (far point = ∞).", options: opts(2, "25 cm", "50 cm", "infinity", "1 m") },
              { text: "Cataract is a defect in which:", difficulty: "MEDIUM", explanation: "In cataract, the eye lens becomes opaque (cloudy), reducing or blocking vision. It is corrected surgically.", options: opts(0, "eye lens becomes opaque", "retina detaches", "eye is too long", "cornea is curved") },
              { text: "The image on the retina is:", difficulty: "MEDIUM", explanation: "The eye lens forms a real, inverted, diminished image on the retina; the brain interprets it as erect.", options: opts(0, "real and inverted", "virtual and erect", "real and erect", "virtual and inverted") },
            ],
          },
          // ── Magnetic Effects of Electric Current ──────────────────────────
          {
            slug: "magnetic-effects-electric-current",
            name: "Magnetic Effects of Electric Current",
            marks: 1,
            negative: 0,
            test: { slug: "magnetic-effects-practice-1", title: "Magnetic Effects of Electric Current — Practice Test", description: "15 CBSE Class 10 Physics questions on magnetism. +1 each, no negative marking." },
            questions: [
              { text: "A magnetic field is created around a conductor whenever:", difficulty: "EASY", explanation: "An electric current flowing through a conductor creates a magnetic field around it (Oersted's discovery).", options: opts(1, "it is heated", "electric current flows through it", "it is magnetised", "it is placed near a magnet") },
              { text: "The rule used to find the direction of the magnetic field around a straight current-carrying conductor is:", difficulty: "MEDIUM", explanation: "The right-hand thumb rule: hold the conductor with the right hand, thumb pointing in the direction of current; fingers curl in the direction of field.", options: opts(0, "right-hand thumb rule", "Fleming's left-hand rule", "Fleming's right-hand rule", "Lenz's law") },
              { text: "A solenoid carrying current acts like a:", difficulty: "EASY", explanation: "A solenoid (coil of wire carrying current) behaves like a bar magnet, with north and south poles.", options: opts(1, "capacitor", "bar magnet", "electric motor", "generator") },
              { text: "Fleming's left-hand rule is used to find the direction of:", difficulty: "MEDIUM", explanation: "Fleming's left-hand rule gives the direction of the force on a current-carrying conductor in a magnetic field (used in motors).", options: opts(0, "force on a current-carrying conductor", "induced EMF", "magnetic field direction", "current direction") },
              { text: "An electric motor converts:", difficulty: "EASY", explanation: "An electric motor converts electrical energy into mechanical energy.", options: opts(0, "electrical energy to mechanical energy", "mechanical energy to electrical energy", "heat to electrical energy", "light to electrical energy") },
              { text: "An electric generator converts:", difficulty: "EASY", explanation: "A generator converts mechanical energy into electrical energy using electromagnetic induction.", options: opts(1, "electrical energy to mechanical energy", "mechanical energy to electrical energy", "heat to light", "chemical energy to electrical energy") },
              { text: "Electromagnetic induction is the phenomenon of:", difficulty: "MEDIUM", explanation: "Electromagnetic induction — a changing magnetic flux through a coil induces an EMF (Faraday's law).", options: opts(1, "creating magnetic field from current", "inducing current by changing magnetic flux", "storing charge in a capacitor", "converting AC to DC") },
              { text: "The direction of induced current is given by:", difficulty: "MEDIUM", explanation: "Lenz's law gives the direction: the induced current opposes the change in magnetic flux that causes it.", options: opts(2, "Ohm's law", "Fleming's left-hand rule", "Lenz's law / Fleming's right-hand rule", "right-hand thumb rule") },
              { text: "The device that converts AC to DC is called a:", difficulty: "MEDIUM", explanation: "A rectifier (or commutator in a DC motor/generator) converts alternating current to direct current.", options: opts(1, "transformer", "rectifier", "inductor", "capacitor") },
              { text: "In India, the frequency of AC mains supply is:", difficulty: "EASY", explanation: "The standard mains frequency in India is 50 Hz.", options: opts(1, "60 Hz", "50 Hz", "100 Hz", "25 Hz") },
              { text: "A fuse wire is made of a material with:", difficulty: "MEDIUM", explanation: "A fuse wire must have a low melting point so it melts and breaks the circuit when current is too high.", options: opts(0, "low melting point", "high melting point", "high conductivity", "high resistance") },
              { text: "The function of an earth wire (green wire) in household circuits is:", difficulty: "MEDIUM", explanation: "The earth wire provides a safe path for leakage current to the ground, preventing electric shock.", options: opts(1, "carry the main current", "protect against electric shock", "carry return current", "reduce voltage") },
              { text: "Overloading in electrical circuits is caused by:", difficulty: "EASY", explanation: "Overloading occurs when too many appliances drawing high current are connected, exceeding the safe current limit of the circuit.", options: opts(0, "connecting too many appliances", "using thick wires", "low voltage", "short circuit only") },
              { text: "A short circuit occurs when:", difficulty: "MEDIUM", explanation: "A short circuit is when live and neutral wires come in direct contact, causing very high current to flow.", options: opts(2, "too many appliances are used", "the fuse melts", "live and neutral wires touch directly", "the switch is off") },
              { text: "The SI unit of magnetic field strength (flux density) is the:", difficulty: "MEDIUM", explanation: "Magnetic flux density is measured in tesla (T) — named after Nikola Tesla.", options: opts(1, "henry", "tesla", "weber", "gauss") },
            ],
          },
          // ── Our Environment ───────────────────────────────────────────────
          {
            slug: "our-environment",
            name: "Our Environment",
            marks: 1,
            negative: 0,
            test: { slug: "our-environment-practice-1", title: "Our Environment — Practice Test", description: "15 CBSE Class 10 questions on ecosystems and environment. +1 each, no negative marking." },
            questions: [
              { text: "The community of organisms living together with their non-living environment is called an:", difficulty: "EASY", explanation: "An ecosystem consists of all living organisms (biotic) and non-living components (abiotic) in an area interacting together.", options: opts(1, "biome", "ecosystem", "habitat", "community") },
              { text: "Organisms that produce their own food using sunlight are called:", difficulty: "EASY", explanation: "Producers (autotrophs) — mainly green plants — make food via photosynthesis.", options: opts(0, "producers", "consumers", "decomposers", "parasites") },
              { text: "Animals that eat producers directly are called:", difficulty: "EASY", explanation: "Primary consumers (herbivores) feed directly on plants (the first trophic level).", options: opts(1, "decomposers", "primary consumers", "secondary consumers", "top predators") },
              { text: "Decomposers break down dead organic matter into:", difficulty: "EASY", explanation: "Decomposers (fungi, bacteria) break down dead organisms into simple inorganic substances, returning nutrients to the soil.", options: opts(2, "complex food", "carbon dioxide only", "simple inorganic nutrients", "organic compounds") },
              { text: "The transfer of energy from one trophic level to the next is approximately:", difficulty: "MEDIUM", explanation: "Only about 10% of energy is transferred to the next trophic level (10% law / Lindeman's rule).", options: opts(0, "10%", "50%", "90%", "100%") },
              { text: "Ozone (O₃) in the stratosphere protects us from:", difficulty: "EASY", explanation: "The ozone layer absorbs harmful ultraviolet (UV) radiation from the sun.", options: opts(1, "infrared radiation", "ultraviolet radiation", "radio waves", "microwaves") },
              { text: "CFCs (chlorofluorocarbons) cause damage to the:", difficulty: "EASY", explanation: "CFCs destroy ozone molecules in the stratosphere, leading to ozone layer depletion.", options: opts(1, "hydrosphere", "ozone layer", "soil", "groundwater") },
              { text: "The gradual warming of Earth's surface due to greenhouse gases is called:", difficulty: "EASY", explanation: "The greenhouse effect — CO₂, CH₄, N₂O and other gases trap heat in the atmosphere, warming the Earth.", options: opts(2, "acid rain", "ozone depletion", "global warming", "eutrophication") },
              { text: "Which of the following is a biodegradable waste?", difficulty: "EASY", explanation: "Biodegradable wastes are broken down by microorganisms. Vegetable peels decompose naturally; plastic, glass, and aluminium do not.", options: opts(0, "vegetable peel", "plastic bag", "glass bottle", "aluminium can") },
              { text: "The correct food chain is:", difficulty: "MEDIUM", explanation: "Energy flows from producers (plants) → herbivores → carnivores: Grass → Deer → Lion.", options: opts(0, "Grass → Deer → Lion", "Lion → Deer → Grass", "Deer → Grass → Lion", "Lion → Grass → Deer") },
              { text: "Accumulation of harmful chemicals at each successive trophic level is called:", difficulty: "MEDIUM", explanation: "Biomagnification — non-biodegradable chemicals (e.g. pesticides like DDT) accumulate and increase in concentration up the food chain.", options: opts(2, "eutrophication", "biodegradation", "biomagnification", "decomposition") },
              { text: "The harmful gas released by burning fossil fuels that causes acid rain is:", difficulty: "MEDIUM", explanation: "Sulphur dioxide (SO₂) and nitrogen oxides combine with water in the atmosphere to form sulphuric and nitric acids, causing acid rain.", options: opts(1, "CO₂", "SO₂", "O₃", "CH₄") },
              { text: "The 'Reduce, Reuse, Recycle' concept is used to:", difficulty: "EASY", explanation: "The 3Rs help manage waste and reduce pressure on natural resources and the environment.", options: opts(0, "manage waste and conserve resources", "increase production", "generate energy", "remove decomposers") },
              { text: "Which type of waste takes hundreds of years to decompose in a landfill?", difficulty: "EASY", explanation: "Plastics are non-biodegradable; they persist in the environment for hundreds to thousands of years.", options: opts(1, "paper", "plastic", "cotton cloth", "wood") },
              { text: "An aquatic food chain is: Phytoplankton → Zooplankton → Small fish → Large fish. Large fish have highest pesticide concentration because of:", difficulty: "HARD", explanation: "Biomagnification — each consumer eats many of the level below, so pesticides accumulate in higher concentrations at each trophic level.", options: opts(2, "they eat the most", "water carries pesticides to them", "biomagnification through the food chain", "they live longest") },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  // 1) Exam catalogue (single source of truth: src/lib/exams.ts).
  for (const [i, e] of examCatalogue.entries()) {
    const data = {
      name: e.name,
      shortName: e.short,
      emoji: e.emoji,
      description: e.blurb,
      status: (e.status === "live" ? "LIVE" : "SOON") as "LIVE" | "SOON",
      order: i,
    };
    await prisma.exam.upsert({ where: { slug: e.slug }, update: data, create: { slug: e.slug, ...data } });
  }

  // 2) Content — only seeds questions for a chapter that has none yet (preserves real attempts).
  let created = 0;
  let skipped = 0;
  for (const ec of [...content, ...moreContent, ...wave3, ...wave4, ...wave5]) {
    const exam = await prisma.exam.findUniqueOrThrow({ where: { slug: ec.examSlug } });
    for (const [si, sc] of ec.subjects.entries()) {
      const subject = await prisma.subject.upsert({
        where: { examId_slug: { examId: exam.id, slug: sc.slug } },
        update: { name: sc.name, order: si },
        create: { examId: exam.id, slug: sc.slug, name: sc.name, order: si },
      });

      for (const [ci, cc] of sc.chapters.entries()) {
        const chapter = await prisma.chapter.upsert({
          where: { subjectId_slug: { subjectId: subject.id, slug: cc.slug } },
          update: { name: cc.name, order: ci },
          create: { examId: exam.id, subjectId: subject.id, slug: cc.slug, name: cc.name, order: ci },
        });

        const existing = await prisma.question.count({ where: { chapterId: chapter.id } });
        const qCount = existing === 0 ? cc.questions.length : existing;
        const totalMarks = qCount * cc.marks;

        const test = await prisma.mockTest.upsert({
          where: { examId_slug: { examId: exam.id, slug: cc.test.slug } },
          update: { title: cc.test.title, description: cc.test.description, totalMarks, durationMinutes: Math.max(5, qCount * 2), negativeMarking: cc.negative > 0 },
          create: {
            examId: exam.id,
            slug: cc.test.slug,
            title: cc.test.title,
            description: cc.test.description,
            type: "CHAPTER",
            durationMinutes: Math.max(5, qCount * 2),
            totalMarks,
            negativeMarking: cc.negative > 0,
            isFree: true,
          },
        });

        if (existing > 0) {
          skipped++;
          continue; // already has questions — don't touch (keeps student attempts safe)
        }

        const qids: string[] = [];
        for (const q of cc.questions) {
          const question = await prisma.question.create({
            data: {
              examId: exam.id,
              subjectId: subject.id,
              chapterId: chapter.id,
              text: q.text,
              type: "MCQ",
              difficulty: q.difficulty,
              explanation: q.explanation,
              marks: cc.marks,
              negativeMarks: cc.negative,
              options: { create: q.options.map((o, i) => ({ text: o.text, isCorrect: o.isCorrect, order: i })) },
            },
          });
          qids.push(question.id);
        }
        await prisma.testQuestion.deleteMany({ where: { mockTestId: test.id } });
        await prisma.testQuestion.createMany({ data: qids.map((questionId, i) => ({ mockTestId: test.id, questionId, order: i })) });
        created++;
      }
    }
  }

  // 3) Explainers (metadata index; rich content lives in src/content/explainers.ts).
  for (const ex of explainerContent) {
    const exam = await prisma.exam.findUnique({ where: { slug: ex.examSlug } });
    if (!exam) continue;
    const subject = await prisma.subject.findUnique({
      where: { examId_slug: { examId: exam.id, slug: ex.subjectSlug } },
    });
    const chapter = subject
      ? await prisma.chapter.findUnique({ where: { subjectId_slug: { subjectId: subject.id, slug: ex.chapterSlug } } })
      : null;
    const data = {
      title: ex.title,
      summary: ex.summary,
      examId: exam.id,
      subjectId: subject?.id ?? null,
      chapterId: chapter?.id ?? null,
      readingMinutes: ex.readingMinutes,
      status: "PUBLISHED" as const,
    };
    await prisma.explainer.upsert({ where: { slug: ex.slug }, update: data, create: { slug: ex.slug, ...data } });
  }

  // 3.5) Sectional tests — one timed test per subject containing all its questions.
  const subjectsForSections = await prisma.subject.findMany({
    select: { id: true, slug: true, name: true, examId: true, questions: { select: { id: true, marks: true, negativeMarks: true } } },
  });
  for (const s of subjectsForSections) {
    if (s.questions.length < 4) continue;
    const slug = `${s.slug}-section`;
    const totalMarks = s.questions.reduce((a, q) => a + q.marks, 0);
    const neg = s.questions.some((q) => q.negativeMarks > 0);
    const section = await prisma.mockTest.upsert({
      where: { examId_slug: { examId: s.examId, slug } },
      update: { title: `${s.name} — Full Section Test`, totalMarks, durationMinutes: Math.max(10, Math.ceil(s.questions.length * 1.2)), negativeMarking: neg },
      create: {
        examId: s.examId,
        slug,
        title: `${s.name} — Full Section Test`,
        description: `All ${s.questions.length} ${s.name} questions in one timed section test.`,
        type: "FULL",
        durationMinutes: Math.max(10, Math.ceil(s.questions.length * 1.2)),
        totalMarks,
        negativeMarking: neg,
        isFree: true,
      },
    });
    await prisma.testQuestion.deleteMany({ where: { mockTestId: section.id } });
    await prisma.testQuestion.createMany({ data: s.questions.map((q, i) => ({ mockTestId: section.id, questionId: q.id, order: i })) });
  }

  // 4) Benchmark cohort — gives every LIVE test a realistic rank/percentile baseline
  //    at launch (anonymous, anonId="seed-benchmark"; remove once real volume exists).
  const liveTests = await prisma.mockTest.findMany({
    where: { exam: { status: "LIVE" } },
    select: { id: true, totalMarks: true },
  });
  for (const t of liveTests) {
    const existing = await prisma.attempt.count({ where: { mockTestId: t.id, anonId: "seed-benchmark" } });
    if (existing >= 20) continue;
    const rows = [];
    for (let i = 0; i < 20 - existing; i++) {
      const frac = 0.3 + Math.random() * 0.55; // 30%–85% of total marks
      rows.push({
        mockTestId: t.id,
        anonId: "seed-benchmark",
        status: "SUBMITTED" as const,
        score: Math.round(t.totalMarks * frac * 2) / 2,
        totalMarks: t.totalMarks,
        submittedAt: new Date(),
      });
    }
    await prisma.attempt.createMany({ data: rows });
  }

  // 5) Demo students — so the leaderboard has a realistic cohort at launch.
  //    (anonId-free named users with emails @padhodost.seed; remove once real students join.)
  const demoNames = [
    "Aarav Sharma", "Diya Patel", "Vivaan Reddy", "Ananya Iyer", "Aditya Kumar", "Ishita Singh",
    "Arjun Nair", "Saanvi Gupta", "Reyansh Das", "Myra Joshi", "Kabir Mehta", "Aadhya Rao",
  ];
  const existingDemo = await prisma.user.count({ where: { email: { endsWith: "@padhodost.seed" } } });
  if (existingDemo === 0) {
    const liveTestList = await prisma.mockTest.findMany({ where: { exam: { status: "LIVE" } }, select: { id: true, totalMarks: true } });
    for (let i = 0; i < demoNames.length; i++) {
      const u = await prisma.user.create({ data: { email: `demo-${i}@padhodost.seed`, name: demoNames[i], role: "STUDENT" } });
      const n = 3 + Math.floor(Math.random() * 4);
      for (let k = 0; k < n && liveTestList.length > 0; k++) {
        const t = liveTestList[Math.floor(Math.random() * liveTestList.length)];
        await prisma.attempt.create({
          data: {
            userId: u.id,
            mockTestId: t.id,
            status: "SUBMITTED",
            score: Math.round(t.totalMarks * (0.4 + Math.random() * 0.5) * 2) / 2,
            totalMarks: t.totalMarks,
            correctCount: 2 + Math.floor(Math.random() * 5),
            wrongCount: Math.floor(Math.random() * 3),
            unattemptedCount: 0,
            submittedAt: new Date(),
          },
        });
      }
    }
  }

  const counts = {
    exams: await prisma.exam.count(),
    subjects: await prisma.subject.count(),
    chapters: await prisma.chapter.count(),
    questions: await prisma.question.count(),
    tests: await prisma.mockTest.count(),
    explainers: await prisma.explainer.count(),
  };
  console.log(`✓ Seed complete — ${created} chapter(s) freshly seeded, ${skipped} already had questions (left intact).`);
  console.log("  Totals:", counts);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
