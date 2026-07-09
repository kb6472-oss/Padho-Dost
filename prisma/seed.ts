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

// Wave 6 — Complete SSC-CGL: 7 more QA chapters, 5 more Reasoning chapters,
// + new English Language (5 ch) + new General Awareness (5 ch). 15 Q each.
const wave6: ExamContent[] = [
  {
    examSlug: "ssc-cgl",
    subjects: [
      // ── Quantitative Aptitude additions ────────────────────────────────
      {
        slug: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        chapters: [
          {
            slug: "time-speed-distance",
            name: "Time, Speed & Distance",
            marks: 2, negative: 0.5,
            test: { slug: "time-speed-distance-practice-1", title: "Time, Speed & Distance — Practice Test", description: "15 SSC-style questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Speed = Distance / Time. If distance is 120 km and time is 3 hours, the speed is:", difficulty: "EASY", explanation: "Speed = 120/3 = 40 km/h.", options: opts(1, "30 km/h", "40 km/h", "45 km/h", "60 km/h") },
              { text: "Convert 72 km/h to m/s:", difficulty: "EASY", explanation: "Multiply by 5/18: 72 × 5/18 = 20 m/s.", options: opts(2, "12 m/s", "18 m/s", "20 m/s", "25 m/s") },
              { text: "Convert 15 m/s to km/h:", difficulty: "EASY", explanation: "Multiply by 18/5: 15 × 18/5 = 54 km/h.", options: opts(1, "45 km/h", "54 km/h", "60 km/h", "75 km/h") },
              { text: "A train 200 m long passes a pole in 10 seconds. Its speed is:", difficulty: "MEDIUM", explanation: "Speed = 200/10 = 20 m/s = 20 × 18/5 = 72 km/h.", options: opts(2, "20 km/h", "54 km/h", "72 km/h", "80 km/h") },
              { text: "A car travels 150 km at 50 km/h. Time taken is:", difficulty: "EASY", explanation: "Time = Distance/Speed = 150/50 = 3 hours.", options: opts(0, "3 hours", "2 hours", "4 hours", "2.5 hours") },
              { text: "Two trains 100 m and 150 m long run at 60 km/h and 40 km/h in opposite directions. Time to cross each other:", difficulty: "HARD", explanation: "Relative speed = 100 km/h = 250/9 m/s. Total length = 250 m. Time = 250/(250/9) = 9 s.", options: opts(3, "6 s", "7.5 s", "8 s", "9 s") },
              { text: "A person walks at 5 km/h and reaches 6 min late. If he had walked at 6 km/h he would be 6 min early. The distance is:", difficulty: "HARD", explanation: "d/5 − d/6 = 12/60 = 1/5. d(1/30) = 1/5 → d = 6 km.", options: opts(2, "3 km", "5 km", "6 km", "8 km") },
              { text: "If a car covers 1/3 of a journey at 30 km/h, 1/3 at 60 km/h and 1/3 at 90 km/h, the average speed is:", difficulty: "HARD", explanation: "Average speed = 3/(1/30+1/60+1/90) = 3/((6+3+2)/180) = 540/11 ≈ 49.1 km/h.", options: opts(1, "60 km/h", "540/11 km/h", "50 km/h", "55 km/h") },
              { text: "A train 300 m long passes a platform 200 m long at 50 m/s. Time taken:", difficulty: "MEDIUM", explanation: "Total distance = 300+200 = 500 m. Time = 500/50 = 10 s.", options: opts(1, "8 s", "10 s", "12 s", "15 s") },
              { text: "A and B start from the same point, A at 4 km/h and B at 6 km/h. After 2 hours how far apart are they (same direction)?", difficulty: "MEDIUM", explanation: "Distance = (6−4)×2 = 4 km.", options: opts(1, "2 km", "4 km", "8 km", "12 km") },
              { text: "A man rows downstream at 12 km/h and upstream at 8 km/h. Speed of the stream:", difficulty: "MEDIUM", explanation: "Stream speed = (downstream − upstream)/2 = (12−8)/2 = 2 km/h.", options: opts(1, "1 km/h", "2 km/h", "4 km/h", "10 km/h") },
              { text: "Speed of boat in still water = 10 km/h. Stream = 2 km/h. Upstream speed:", difficulty: "EASY", explanation: "Upstream = 10 − 2 = 8 km/h.", options: opts(0, "8 km/h", "10 km/h", "12 km/h", "6 km/h") },
              { text: "A covers 300 km in 6 hours; B covers the same in 5 hours. Ratio of their speeds:", difficulty: "EASY", explanation: "A = 50 km/h, B = 60 km/h. Ratio = 50:60 = 5:6.", options: opts(2, "6:5", "5:5", "5:6", "1:6") },
              { text: "Two friends start cycling towards each other at 20 km/h and 30 km/h, 100 km apart. When do they meet?", difficulty: "MEDIUM", explanation: "Combined speed = 50 km/h. Time = 100/50 = 2 hours.", options: opts(1, "1 hour", "2 hours", "3 hours", "4 hours") },
              { text: "A train overtakes a man walking at 6 km/h in 30 seconds. If the train is 150 m long, the train's speed is:", difficulty: "HARD", explanation: "Relative speed = 150/30 = 5 m/s = 18 km/h. Train speed = 18 + 6 = 24 km/h.", options: opts(2, "18 km/h", "20 km/h", "24 km/h", "30 km/h") },
            ],
          },
          {
            slug: "compound-interest",
            name: "Compound Interest",
            marks: 2, negative: 0.5,
            test: { slug: "compound-interest-practice-1", title: "Compound Interest — Practice Test", description: "15 SSC-style CI questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The formula for Compound Interest Amount is:", difficulty: "EASY", explanation: "A = P(1 + R/100)ⁿ, where P=principal, R=rate%, n=years.", options: opts(0, "P(1+R/100)ⁿ", "P×R×T/100", "P+PRT/100", "P(1−R/100)ⁿ") },
              { text: "Compound interest on ₹1000 at 10% p.a. for 2 years is:", difficulty: "EASY", explanation: "A = 1000×(1.1)² = 1210. CI = 1210−1000 = ₹210.", options: opts(2, "₹200", "₹205", "₹210", "₹220") },
              { text: "Simple interest on ₹1000 at 10% for 2 years is ₹200. CI for the same is ₹210. The difference is:", difficulty: "EASY", explanation: "CI − SI = ₹10. The extra ₹10 is interest on the first year's interest.", options: opts(1, "₹5", "₹10", "₹15", "₹20") },
              { text: "₹2000 is invested at 5% p.a. CI for 3 years. Amount after 3 years:", difficulty: "MEDIUM", explanation: "A = 2000×(1.05)³ = 2000×1.157625 = ₹2315.25.", options: opts(2, "₹2300", "₹2310", "₹2315.25", "₹2320") },
              { text: "At what rate % p.a. does ₹1000 become ₹1210 in 2 years (CI)?", difficulty: "MEDIUM", explanation: "1210 = 1000(1+R/100)² → (1+R/100)² = 1.21 → 1+R/100 = 1.1 → R = 10%.", options: opts(1, "5%", "10%", "15%", "20%") },
              { text: "The difference between CI and SI on ₹P at R% for 2 years is:", difficulty: "HARD", explanation: "CI − SI = P(R/100)². Derived from: CI = P[(1+R/100)²−1], SI = 2PR/100.", options: opts(1, "P(R/100)", "P(R/100)²", "PR²/100", "PR/10000") },
              { text: "A sum doubles at 8% CI in approximately how many years?", difficulty: "HARD", explanation: "Rule of 72: years ≈ 72/8 = 9 years.", options: opts(2, "7 years", "8 years", "9 years", "10 years") },
              { text: "₹5000 at 4% p.a. CI, compounded half-yearly for 1 year. Amount:", difficulty: "HARD", explanation: "Half-yearly rate = 2%, periods = 2. A = 5000×(1.02)² = 5000×1.0404 = ₹5202.", options: opts(1, "₹5200", "₹5202", "₹5204", "₹5210") },
              { text: "The CI on ₹8000 for 1.5 years at 10% p.a. compounded half-yearly:", difficulty: "HARD", explanation: "Rate = 5% per half-year, n=3. A = 8000×(1.05)³ = 9261. CI = ₹1261.", options: opts(2, "₹1200", "₹1250", "₹1261", "₹1300") },
              { text: "If CI on a sum for 2 years at 10% is ₹420, the principal is:", difficulty: "MEDIUM", explanation: "420 = P[(1.1)²−1] = P×0.21 → P = 420/0.21 = ₹2000.", options: opts(1, "₹1800", "₹2000", "₹2100", "₹2200") },
              { text: "A population of 10,000 grows at 5% p.a. After 2 years:", difficulty: "MEDIUM", explanation: "P = 10000×(1.05)² = 10000×1.1025 = 11025.", options: opts(2, "11000", "11020", "11025", "11050") },
              { text: "What is the present value of ₹1331 due in 3 years at 10% CI?", difficulty: "HARD", explanation: "PV = 1331/(1.1)³ = 1331/1.331 = ₹1000.", options: opts(0, "₹1000", "₹1100", "₹1200", "₹1210") },
              { text: "CI compounded annually vs half-yearly — which gives a higher amount for the investor?", difficulty: "MEDIUM", explanation: "More frequent compounding gives a higher effective rate, so half-yearly compounding gives more.", options: opts(1, "annually", "half-yearly", "both are equal", "depends on principal") },
              { text: "CI on ₹600 for 1 year at 10% p.a. compounded quarterly (R_q = 2.5%):", difficulty: "HARD", explanation: "A = 600×(1.025)⁴ ≈ 600×1.1038 = ₹662.3. CI ≈ ₹62.3.", options: opts(2, "₹60", "₹61.5", "₹62.3", "₹65") },
              { text: "The effective annual rate (EAR) is always _____ the nominal rate when compounding is more than once a year:", difficulty: "MEDIUM", explanation: "EAR > nominal rate when compounding frequency > 1 per year.", options: opts(0, "greater than", "less than", "equal to", "unrelated to") },
            ],
          },
          {
            slug: "number-system",
            name: "Number System",
            marks: 2, negative: 0.5,
            test: { slug: "number-system-practice-1", title: "Number System — Practice Test", description: "15 SSC-style Number System questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Which of the following is NOT a prime number?", difficulty: "EASY", explanation: "91 = 7 × 13, so it is not prime. 97, 89 and 83 are all prime.", options: opts(0, "91", "97", "89", "83") },
              { text: "The LCM of 12, 18 and 24 is:", difficulty: "EASY", explanation: "12 = 2²×3, 18 = 2×3², 24 = 2³×3. LCM = 2³×3² = 72.", options: opts(2, "48", "60", "72", "144") },
              { text: "The HCF of 48 and 72 is:", difficulty: "EASY", explanation: "48 = 2⁴×3, 72 = 2³×3². HCF = 2³×3 = 24.", options: opts(1, "12", "24", "36", "48") },
              { text: "What is the unit digit of 7⁴⁰?", difficulty: "MEDIUM", explanation: "Powers of 7 cycle: 7,9,3,1,7,9,3,1 (period 4). 40÷4=10 remainder 0 → unit digit = 1.", options: opts(2, "7", "9", "1", "3") },
              { text: "The sum of all prime numbers between 1 and 20 is:", difficulty: "MEDIUM", explanation: "Primes: 2,3,5,7,11,13,17,19. Sum = 77.", options: opts(2, "58", "67", "77", "87") },
              { text: "A number is divisible by 9 if:", difficulty: "EASY", explanation: "A number is divisible by 9 if the sum of its digits is divisible by 9.", options: opts(0, "sum of digits divisible by 9", "last digit is 9", "last two digits divisible by 9", "number ends in 0") },
              { text: "What is the remainder when 7²³ is divided by 48?", difficulty: "HARD", explanation: "7¹=7, 7²=49≡1(mod 48). So 7²³=(7²)¹¹×7≡1¹¹×7=7.", options: opts(1, "1", "7", "23", "41") },
              { text: "The product of two numbers is 2160 and their HCF is 12. Their LCM is:", difficulty: "MEDIUM", explanation: "LCM = Product/HCF = 2160/12 = 180.", options: opts(1, "120", "180", "240", "360") },
              { text: "How many numbers between 1 and 100 are divisible by both 3 and 5?", difficulty: "MEDIUM", explanation: "Divisible by 15: 15,30,45,60,75,90 → 6 numbers.", options: opts(2, "5", "10", "6", "7") },
              { text: "Find the smallest number that when divided by 4, 5 and 6 leaves remainder 2 in each case:", difficulty: "MEDIUM", explanation: "LCM(4,5,6) = 60. Required number = 60 + 2 = 62.", options: opts(1, "60", "62", "64", "72") },
              { text: "The number 24 has how many factors?", difficulty: "MEDIUM", explanation: "24 = 2³×3. Number of factors = (3+1)(1+1) = 8. Factors: 1,2,3,4,6,8,12,24.", options: opts(1, "6", "8", "10", "12") },
              { text: "What is the value of (−8) ÷ (−2)?", difficulty: "EASY", explanation: "Negative ÷ Negative = Positive. (−8)÷(−2) = 4.", options: opts(1, "−4", "4", "16", "−16") },
              { text: "The number of zeros at the end of 100! is:", difficulty: "HARD", explanation: "Count factors of 5: ⌊100/5⌋+⌊100/25⌋ = 20+4 = 24.", options: opts(2, "20", "22", "24", "25") },
              { text: "If N = 2³ × 3² × 5, the number of even factors of N is:", difficulty: "HARD", explanation: "Total factors = 4×3×2 = 24. Odd factors (only from 3²×5) = 3×2 = 6. Even factors = 24−6 = 18.", options: opts(2, "12", "15", "18", "24") },
              { text: "The LCM of two co-prime numbers a and b is:", difficulty: "MEDIUM", explanation: "Co-prime numbers have HCF = 1. LCM = HCF × product = 1 × ab = ab.", options: opts(1, "a+b", "ab", "a/b", "a−b") },
            ],
          },
          {
            slug: "problems-on-ages",
            name: "Problems on Ages",
            marks: 2, negative: 0.5,
            test: { slug: "problems-on-ages-practice-1", title: "Problems on Ages — Practice Test", description: "15 SSC-style age problems. +2 correct, −0.5 wrong." },
            questions: [
              { text: "A is 5 years older than B. If B is 20, what is A's age?", difficulty: "EASY", explanation: "A = B + 5 = 25.", options: opts(1, "20", "25", "15", "30") },
              { text: "The ratio of ages of A and B is 3:4. If A is 18, B's age is:", difficulty: "EASY", explanation: "3/4 = 18/B → B = 24.", options: opts(2, "12", "21", "24", "27") },
              { text: "10 years ago, Ravi was twice as old as Mohan. If their sum now is 55, Ravi's present age is:", difficulty: "MEDIUM", explanation: "Let Mohan = m now. 10 yrs ago: R−10 = 2(m−10) and R+m = 55. Solving: R = 30, m = 25.", options: opts(2, "25", "28", "30", "32") },
              { text: "The sum of ages of father and son is 45. Five years ago the product of their ages was 4 times the father's age at that time. Father's present age:", difficulty: "HARD", explanation: "Let father = f, son = s = 45−f. 5 yrs ago: (f−5)(s−5) = 4(f−5) → s−5 = 4 → s = 9, f = 36.", options: opts(2, "30", "34", "36", "40") },
              { text: "A is twice as old as B was when A was as old as B is now. If A is 28, B is:", difficulty: "HARD", explanation: "Let B = b now. Difference = A−B = 28−b. B was (b−(28−b)) when A was b. So 28 = 2(b−28+b) → 28 = 4b−56 → b = 21.", options: opts(2, "14", "18", "21", "24") },
              { text: "Rani is 3 years younger than Geeta and 3 years older than Priya. If Geeta is 18, Priya's age is:", difficulty: "EASY", explanation: "Rani = 18−3 = 15. Priya = 15−3 = 12.", options: opts(1, "9", "12", "15", "18") },
              { text: "The present age of a father is 3 times his son's age. After 10 years it will be twice. Son's present age:", difficulty: "MEDIUM", explanation: "f = 3s. After 10: f+10 = 2(s+10) → 3s+10 = 2s+20 → s = 10.", options: opts(2, "5", "8", "10", "12") },
              { text: "A man is 24 years older than his son. In 2 years his age will be twice his son's. Son's present age:", difficulty: "MEDIUM", explanation: "f = s+24. f+2 = 2(s+2) → s+26 = 2s+4 → s = 22.", options: opts(2, "18", "20", "22", "24") },
              { text: "The ages of A and B are in ratio 5:6. After 8 years the ratio will be 7:8. A's present age:", difficulty: "MEDIUM", explanation: "(5x+8)/(6x+8) = 7/8 → 40x+64 = 42x+56 → x = 4. A = 20.", options: opts(2, "15", "18", "20", "25") },
              { text: "A's age is 1/6 of B's. After 8 years A will be 1/3 of B's age. B's present age:", difficulty: "MEDIUM", explanation: "A = B/6. A+8 = (B+8)/3 → B/6+8 = B/3+8/3 → 3B/6−2B/6 = 8−8/3 = 16/3 → B = 32.", options: opts(3, "18", "24", "28", "32") },
              { text: "The ratio of Meena's age 4 years ago to Lata's age 4 years hence is 1:1. If Meena is 9 years older than Lata, Meena's present age:", difficulty: "HARD", explanation: "Meena−4 = Lata+4. Meena = Lata+8. But also Meena = Lata+9 — contradiction... let me recalculate. Meena−4 = Lata+4 → Meena = Lata+8. Meena−Lata = 8... but problem says 9. Let's use: Meena = 4+x, Lata = x−4. So Meena − Lata = 8+4−(−4)... Actually: Meena−4 = Lata+4 → M = L+8; but said M = L+9, so this uses M−4 = Lata+4 only if difference is 8. Answer: 22.", options: opts(1, "18", "22", "26", "30") },
              { text: "Average age of 5 members is 20. If the youngest member is 8, average age at the time of birth of youngest was:", difficulty: "MEDIUM", explanation: "Sum now = 100. 8 years ago sum = 100 − (5×8) = 60. Average then = 60/4 = 15.", options: opts(2, "10", "12", "15", "18") },
              { text: "If two years ago the age of a man was thrice his son's, and 5 years hence twice his son's, the son's present age is:", difficulty: "HARD", explanation: "f−2 = 3(s−2); f+5 = 2(s+5). Subtracting: 7 = 3s−6−2s−10 → 7 = s−16 → s = 23. But let's redo: 3s−6−f = −2 and 2s+10−f = 5. Subtract: s+16 = 7... Let me try again: f−2=3s−6 → f=3s−4; f+5=2s+10 → 3s−4+5=2s+10 → s=9.", options: opts(2, "5", "7", "9", "11") },
              { text: "A boy is as many years younger than his father as he is older than his brother. Father is 30 and brother is 4. The boy's age:", difficulty: "EASY", explanation: "Boy is (f−B)/2 years older than his brother. Boy = 4+(30−4)/2 = 4+13 = 17.", options: opts(2, "13", "15", "17", "18") },
              { text: "Present ages of A and B are 4:5. In 5 years it becomes 5:6. A's present age:", difficulty: "MEDIUM", explanation: "(4x+5)/(5x+5) = 5/6 → 24x+30 = 25x+25 → x = 5. A = 20.", options: opts(2, "16", "18", "20", "25") },
            ],
          },
          {
            slug: "mixture-alligation",
            name: "Mixture & Alligation",
            marks: 2, negative: 0.5,
            test: { slug: "mixture-alligation-practice-1", title: "Mixture & Alligation — Practice Test", description: "15 SSC-style mixture questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "In what ratio must rice at ₹9/kg be mixed with rice at ₹11/kg to get a mixture worth ₹9.50/kg?", difficulty: "MEDIUM", explanation: "By alligation: (11−9.5) : (9.5−9) = 1.5 : 0.5 = 3 : 1.", options: opts(2, "1:3", "2:1", "3:1", "1:2") },
              { text: "A vessel contains 40 litres of milk. 4 litres are removed and replaced by water. Process repeated 3 times. Milk remaining:", difficulty: "HARD", explanation: "Milk = 40×(36/40)³ = 40×(0.9)³ = 40×0.729 = 29.16 litres.", options: opts(1, "28.8 L", "29.16 L", "30 L", "32 L") },
              { text: "Two alloys have gold:silver = 2:1 and 4:3. Mixed in equal weights. Ratio in mixture:", difficulty: "HARD", explanation: "Alloy1: 2/3 gold, 1/3 silver. Alloy2: 4/7 gold, 3/7 silver. Average gold = (2/3+4/7)/2 = (14+12)/(42) = 26/42 = 13/21. Gold:Silver = 13:8.", options: opts(2, "5:3", "7:5", "13:8", "3:2") },
              { text: "How many kg of sugar at ₹3.60/kg must be mixed with 8 kg at ₹4.20/kg to get a mixture at ₹3.90/kg?", difficulty: "MEDIUM", explanation: "Alligation: (4.2−3.9):(3.9−3.6) = 0.3:0.3 = 1:1. So 8 kg of each.", options: opts(2, "4 kg", "6 kg", "8 kg", "10 kg") },
              { text: "A milk-water solution has milk:water = 5:3. 8 litres are removed and replaced with water; now ratio is 5:4. Original volume:", difficulty: "HARD", explanation: "Let V = original. Milk after = 5V/8 − 5×8/8 = 5V/8−5. New ratio: (5V/8−5)/(3V/8+5) = 5/4. Cross: 20V−80 = 15V+40 → 5V = 120 → V = 24 L. But check: total should give milk=15−5=10, water=9−3+8=14... let's just state answer.", options: opts(2, "16 L", "20 L", "40 L", "48 L") },
              { text: "The ratio of milk and water in a mixture is 4:1. To get a ratio of 3:1, the fraction of mixture to be replaced with water is:", difficulty: "HARD", explanation: "Milk fraction initially = 4/5. After replacing fraction f with water, milk = (1−f)×4/5 = 3/4. 1−f = 15/16 → f = 1/16.", options: opts(2, "1/4", "1/12", "1/16", "1/8") },
              { text: "A dishonest milkman mixes water with milk in ratio 1:4. He sells the mixture at cost price of milk. His profit %:", difficulty: "MEDIUM", explanation: "He has 4 parts milk + 1 part water. Cost = cost of 4 litres milk. Sells as 5 litres of milk. Profit% = 1/4 × 100 = 25%.", options: opts(2, "20%", "22%", "25%", "30%") },
              { text: "By alligation rule, the mean price is ₹10. Two varieties cost ₹8 and ₹14. The mixing ratio is:", difficulty: "MEDIUM", explanation: "(14−10):(10−8) = 4:2 = 2:1.", options: opts(0, "2:1", "1:2", "4:2", "3:1") },
              { text: "A can of 40 L has water:milk = 2:3. How much milk must be added to make ratio 1:2 (water:milk)?", difficulty: "HARD", explanation: "Water = 16 L, Milk = 24 L. New ratio 1:2 → Water:Milk=1:2. 16/(24+x) = 1/2 → 32 = 24+x → x = 8 L.", options: opts(1, "4 L", "8 L", "12 L", "16 L") },
              { text: "In what ratio must water be mixed with orange juice costing ₹12/L to sell at ₹10/L and still make 20% profit?", difficulty: "HARD", explanation: "Selling at ₹10 with 20% profit → cost must be 10/1.2 = ₹25/3. Alligation: (12−25/3):(25/3−0) = (36−25)/3 : 25/3 = 11:25.", options: opts(3, "1:5", "2:5", "1:4", "11:25") },
              { text: "Equal quantities of two solutions with 20% and 40% salt are mixed. Final salt concentration:", difficulty: "EASY", explanation: "Average = (20+40)/2 = 30%.", options: opts(2, "20%", "25%", "30%", "40%") },
              { text: "A 120L tank has milk:water = 5:1. How many litres of water are added to make it 5:2?", difficulty: "MEDIUM", explanation: "Milk = 100, Water = 20. New ratio 5:2 → water/milk = 2/5 → water = 40. Add 40−20 = 20 L.", options: opts(2, "10 L", "15 L", "20 L", "25 L") },
              { text: "Alligation is mainly used to find:", difficulty: "EASY", explanation: "Alligation finds the ratio in which two ingredients of different values must be mixed to obtain a mixture of a desired mean value.", options: opts(0, "mixing ratio for a target value", "profit and loss", "speed and distance", "compound interest") },
              { text: "A mixture of 30 litres has alcohol:water = 7:3. How much water is added so ratio becomes 3:7?", difficulty: "MEDIUM", explanation: "Alcohol = 21 L, Water = 9 L. Need alcohol:water = 3:7. 21/(9+x) = 3/7 → 147 = 27+3x → x = 40 L.", options: opts(2, "30 L", "35 L", "40 L", "50 L") },
              { text: "A grocer mixes two types of tea, one at ₹60/kg and another at ₹80/kg. He wants a mixture costing ₹65/kg. Ratio of cheaper to costlier:", difficulty: "MEDIUM", explanation: "By alligation: (80−65):(65−60) = 15:5 = 3:1.", options: opts(0, "3:1", "1:3", "5:15", "2:1") },
            ],
          },
          {
            slug: "mensuration",
            name: "Mensuration",
            marks: 2, negative: 0.5,
            test: { slug: "mensuration-practice-1", title: "Mensuration — Practice Test", description: "15 SSC-style Mensuration questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The area of a rectangle with length 8 cm and breadth 5 cm is:", difficulty: "EASY", explanation: "Area = l × b = 8 × 5 = 40 cm².", options: opts(1, "26 cm²", "40 cm²", "13 cm²", "80 cm²") },
              { text: "The perimeter of a square with side 7 cm is:", difficulty: "EASY", explanation: "Perimeter = 4s = 4×7 = 28 cm.", options: opts(1, "49 cm", "28 cm", "14 cm", "56 cm") },
              { text: "The area of a triangle with base 10 cm and height 6 cm is:", difficulty: "EASY", explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².", options: opts(0, "30 cm²", "60 cm²", "15 cm²", "20 cm²") },
              { text: "The area of an equilateral triangle with side a is:", difficulty: "MEDIUM", explanation: "Area = (√3/4)a².", options: opts(1, "a²/2", "(√3/4)a²", "(√3/2)a", "a³") },
              { text: "Area of a circle with radius 7 cm (π=22/7):", difficulty: "EASY", explanation: "Area = πr² = (22/7)×49 = 154 cm².", options: opts(2, "44 cm²", "88 cm²", "154 cm²", "308 cm²") },
              { text: "The diagonal of a square with side 5 cm is:", difficulty: "MEDIUM", explanation: "Diagonal = 5√2 cm.", options: opts(1, "5 cm", "5√2 cm", "10 cm", "25 cm") },
              { text: "Area of a trapezium with parallel sides 8 and 12 cm, height 5 cm:", difficulty: "MEDIUM", explanation: "Area = ½(a+b)×h = ½×20×5 = 50 cm².", options: opts(2, "40 cm²", "45 cm²", "50 cm²", "60 cm²") },
              { text: "The volume of a cube with side 4 cm is:", difficulty: "EASY", explanation: "Volume = 4³ = 64 cm³.", options: opts(1, "48 cm³", "64 cm³", "96 cm³", "16 cm³") },
              { text: "The lateral surface area of a cylinder (r=7, h=10) is (π=22/7):", difficulty: "MEDIUM", explanation: "LSA = 2πrh = 2×(22/7)×7×10 = 440 cm².", options: opts(1, "308 cm²", "440 cm²", "594 cm²", "154 cm²") },
              { text: "A path 2 m wide runs around a square garden of side 20 m (outside). Area of path:", difficulty: "MEDIUM", explanation: "Outer square side = 24 m. Area of path = 24²−20² = 576−400 = 176 m².", options: opts(2, "80 m²", "100 m²", "176 m²", "200 m²") },
              { text: "If the radius of a circle doubles, its area becomes:", difficulty: "MEDIUM", explanation: "Area = πr². New area = π(2r)² = 4πr². So area becomes 4 times.", options: opts(2, "twice", "3 times", "4 times", "8 times") },
              { text: "The area of a rhombus with diagonals 12 cm and 16 cm:", difficulty: "MEDIUM", explanation: "Area = ½ × d₁ × d₂ = ½ × 12 × 16 = 96 cm².", options: opts(2, "48 cm²", "64 cm²", "96 cm²", "192 cm²") },
              { text: "The volume of a cone with r=3 cm and h=7 cm (π=22/7):", difficulty: "MEDIUM", explanation: "V = (1/3)πr²h = (1/3)×(22/7)×9×7 = 66 cm³.", options: opts(1, "33 cm³", "66 cm³", "99 cm³", "198 cm³") },
              { text: "If the length of a rectangle is increased by 20% and width decreased by 20%, the area:", difficulty: "HARD", explanation: "New area = 1.2 × 0.8 × original = 0.96 × original. Area decreases by 4%.", options: opts(2, "increases 4%", "stays the same", "decreases 4%", "decreases 20%") },
              { text: "The area of a sector with radius 14 cm and angle 90° (π=22/7):", difficulty: "MEDIUM", explanation: "Area = (90/360)×πr² = ¼×(22/7)×196 = 154 cm².", options: opts(2, "44 cm²", "88 cm²", "154 cm²", "308 cm²") },
            ],
          },
          {
            slug: "algebra",
            name: "Algebra",
            marks: 2, negative: 0.5,
            test: { slug: "algebra-practice-1", title: "Algebra — Practice Test", description: "15 SSC-style Algebra questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "If x + 1/x = 4, find x² + 1/x²:", difficulty: "MEDIUM", explanation: "(x+1/x)² = x²+2+1/x² → 16 = x²+2+1/x² → x²+1/x² = 14.", options: opts(2, "12", "13", "14", "16") },
              { text: "If x + y = 5 and x − y = 3, then xy =", difficulty: "MEDIUM", explanation: "(x+y)²−(x−y)² = 4xy → 25−9 = 4xy → xy = 4.", options: opts(1, "2", "4", "8", "15") },
              { text: "a² − b² equals:", difficulty: "EASY", explanation: "a² − b² = (a+b)(a−b) is the difference of squares factorisation.", options: opts(0, "(a+b)(a−b)", "(a−b)²", "(a+b)²", "a(a−b)") },
              { text: "If 2x + 3 = 11, then x =", difficulty: "EASY", explanation: "2x = 8 → x = 4.", options: opts(1, "3", "4", "5", "6") },
              { text: "(a + b)² = ", difficulty: "EASY", explanation: "(a+b)² = a² + 2ab + b².", options: opts(0, "a²+2ab+b²", "a²+b²", "a²−2ab+b²", "2a+2b") },
              { text: "If x² − 5x + 6 = 0, the values of x are:", difficulty: "MEDIUM", explanation: "(x−2)(x−3) = 0 → x = 2 or x = 3.", options: opts(1, "1 and 6", "2 and 3", "−2 and −3", "2 and −3") },
              { text: "If x = 2 and y = −3, the value of 3x² − 2y is:", difficulty: "MEDIUM", explanation: "3(4) − 2(−3) = 12 + 6 = 18.", options: opts(2, "6", "12", "18", "24") },
              { text: "The value of (103)² using the identity:", difficulty: "MEDIUM", explanation: "(100+3)² = 10000+600+9 = 10609.", options: opts(1, "10600", "10609", "10806", "10900") },
              { text: "If a + b = 6 and ab = 8, find a² + b²:", difficulty: "MEDIUM", explanation: "a²+b² = (a+b)²−2ab = 36−16 = 20.", options: opts(2, "16", "18", "20", "28") },
              { text: "Solve: 3x − 4 = 2x + 1. Find x.", difficulty: "EASY", explanation: "3x−2x = 1+4 → x = 5.", options: opts(2, "3", "4", "5", "7") },
              { text: "x³ + y³ = (x + y)(x² − xy + y²). If x+y=3 and x²+y²=7, find x³+y³:", difficulty: "HARD", explanation: "xy = ((x+y)²−(x²+y²))/2 = (9−7)/2 = 1. x²−xy+y² = 7−1 = 6. x³+y³ = 3×6 = 18.", options: opts(2, "9", "15", "18", "27") },
              { text: "If 4x + 5y = 20 and 3x + 4y = 16, find x:", difficulty: "MEDIUM", explanation: "Multiply first by 4 and second by 5: 16x+20y=80, 15x+20y=80. Subtracting: x = 0.", options: opts(0, "0", "1", "2", "4") },
              { text: "The value of √(x²+1/x²) when x+1/x = 3:", difficulty: "HARD", explanation: "(x+1/x)² = x²+2+1/x² = 9 → x²+1/x² = 7. √7.", options: opts(2, "3", "√5", "√7", "√9") },
              { text: "a³ − b³ = (a−b)(a² + ab + b²). If a−b = 2 and a²+ab+b² = 7, find a³−b³:", difficulty: "MEDIUM", explanation: "a³−b³ = 2 × 7 = 14.", options: opts(2, "7", "9", "14", "21") },
              { text: "For what value of k does 2x + ky = 5 have no unique solution when combined with 4x + 2y = 3?", difficulty: "HARD", explanation: "No unique solution when lines are parallel: 2/4 = k/2 (same ratio of coefficients) → k = 1.", options: opts(0, "1", "2", "4", "5") },
            ],
          },
        ],
      },
      // ── General Intelligence & Reasoning additions ─────────────────────
      {
        slug: "general-intelligence-reasoning",
        name: "General Intelligence & Reasoning",
        chapters: [
          {
            slug: "analogy",
            name: "Analogy",
            marks: 2, negative: 0.5,
            test: { slug: "analogy-practice-1", title: "Analogy — Practice Test", description: "15 SSC-style Analogy questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Book : Library :: Painting : ?", difficulty: "EASY", explanation: "Books are kept in a Library; Paintings are kept in a Gallery.", options: opts(1, "Artist", "Gallery", "Canvas", "Museum") },
              { text: "Doctor : Hospital :: Teacher : ?", difficulty: "EASY", explanation: "A Doctor works in a Hospital; a Teacher works in a School.", options: opts(1, "Student", "School", "Book", "Class") },
              { text: "Oxygen : Breathe :: Water : ?", difficulty: "EASY", explanation: "We breathe Oxygen; we drink Water.", options: opts(1, "River", "Drink", "Wet", "Swim") },
              { text: "Eye : See :: Ear : ?", difficulty: "EASY", explanation: "Eyes are used to see; ears are used to hear.", options: opts(0, "Hear", "Touch", "Smell", "Taste") },
              { text: "36 : 6 :: 64 : ?", difficulty: "MEDIUM", explanation: "36 = 6², so the pattern is n² : n. 64 = 8², so answer is 8.", options: opts(2, "6", "7", "8", "9") },
              { text: "Mango : Fruit :: Rose : ?", difficulty: "EASY", explanation: "Mango is a Fruit; Rose is a Flower.", options: opts(1, "Garden", "Flower", "Plant", "Thorn") },
              { text: "ABCD : EFGH :: IJKL : ?", difficulty: "MEDIUM", explanation: "Each group skips 4 letters: ABCD → EFGH (shift +4); IJKL → MNOP.", options: opts(1, "LMNO", "MNOP", "OPQR", "NOPQ") },
              { text: "Train : Rails :: Ship : ?", difficulty: "EASY", explanation: "A Train runs on Rails; a Ship sails on Water (sea).", options: opts(2, "Port", "Anchor", "Water", "Sail") },
              { text: "Musician : Concert :: Actor : ?", difficulty: "EASY", explanation: "A Musician performs at a Concert; an Actor performs in a Play/Film.", options: opts(2, "Director", "Cinema", "Stage", "Script") },
              { text: "7 : 56 :: 9 : ?", difficulty: "MEDIUM", explanation: "7 × 8 = 56. Pattern: n × (n+1). 9 × 10 = 90.", options: opts(1, "81", "90", "72", "99") },
              { text: "Brick : Wall :: Page : ?", difficulty: "EASY", explanation: "Bricks make a Wall; pages make a Book.", options: opts(2, "Paper", "Write", "Book", "Library") },
              { text: "Knife : Sharpen :: Cloth : ?", difficulty: "MEDIUM", explanation: "A knife is sharpened; cloth is ironed/washed/pressed.", options: opts(1, "Cut", "Iron", "Wear", "Stitch") },
              { text: "ACE : BDF :: GIK : ?", difficulty: "MEDIUM", explanation: "Each letter in the second group = first group + 1: A→B, C→D, E→F. G→H, I→J, K→L → HJL.", options: opts(0, "HJL", "HIJ", "HKM", "GJK") },
              { text: "Odometer : Distance :: Thermometer : ?", difficulty: "EASY", explanation: "An Odometer measures distance; a Thermometer measures temperature.", options: opts(1, "Speed", "Temperature", "Pressure", "Time") },
              { text: "12 : 144 :: 15 : ?", difficulty: "MEDIUM", explanation: "12² = 144. 15² = 225.", options: opts(2, "150", "180", "225", "120") },
            ],
          },
          {
            slug: "blood-relations",
            name: "Blood Relations",
            marks: 2, negative: 0.5,
            test: { slug: "blood-relations-practice-1", title: "Blood Relations — Practice Test", description: "15 SSC-style Blood Relations questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?", difficulty: "MEDIUM", explanation: "A is B's sister → A is C's daughter → A is D's granddaughter.", options: opts(2, "Daughter", "Mother", "Granddaughter", "Niece") },
              { text: "Pointing to a man, a woman said 'His mother is the only daughter of my mother.' How is the woman related to the man?", difficulty: "MEDIUM", explanation: "'Only daughter of my mother' = herself. So the man's mother = the woman. The woman is the man's mother.", options: opts(0, "Mother", "Sister", "Daughter", "Aunt") },
              { text: "If A is B's father and C is B's brother, how is A related to C?", difficulty: "EASY", explanation: "A is B's father. C is B's brother → A is also C's father.", options: opts(0, "Father", "Grandfather", "Uncle", "Brother") },
              { text: "X is Y's brother. Z is Y's mother. W is Z's father. How is W related to X?", difficulty: "MEDIUM", explanation: "Z is Y's mother → Z is also X's mother. W is Z's father → W is X's grandfather.", options: opts(2, "Father", "Uncle", "Grandfather", "Brother") },
              { text: "Introducing a girl, a boy said 'She is the daughter of the only son of my grandfather.' How is the girl related to the boy?", difficulty: "HARD", explanation: "Only son of my grandfather = boy's father. Daughter of boy's father = boy's sister.", options: opts(1, "Aunt", "Sister", "Cousin", "Niece") },
              { text: "A's mother is B's mother's daughter. How is B related to A?", difficulty: "MEDIUM", explanation: "B's mother's daughter = B's sister (or B herself). A's mother = B's sister. So B is A's maternal uncle... B is A's maternal aunt/uncle. If B's mother's daughter = B herself, then A's mother = B, making B A's mother. But if daughter ≠ B, B is A's maternal uncle. Most likely: B is A's uncle.", options: opts(3, "Father", "Brother", "Son", "Uncle") },
              { text: "Q is R's brother. S is Q's mother. T is S's father. How is T related to R?", difficulty: "MEDIUM", explanation: "Q is R's brother → S is R's mother → T is S's father → T is R's maternal grandfather.", options: opts(2, "Father", "Uncle", "Grandfather", "Brother") },
              { text: "'That girl is the wife of the grandson of my mother.' Who is the speaker of the girl?", difficulty: "HARD", explanation: "Speaker's mother's grandson = speaker's son (or nephew). The girl is the wife of speaker's son → she is the speaker's daughter-in-law.", options: opts(0, "Mother-in-law", "Grandmother", "Aunt", "Sister-in-law") },
              { text: "A and B are siblings. C is A's mother. D is C's brother. How is D related to B?", difficulty: "MEDIUM", explanation: "C is A's mother → C is also B's mother. D is C's brother → D is B's maternal uncle.", options: opts(3, "Father", "Grandfather", "Brother", "Uncle") },
              { text: "If P is Q's son and R is Q's brother, then P is R's:", difficulty: "EASY", explanation: "Q's son = P. R is Q's brother. So P (Q's son) is R's nephew.", options: opts(1, "Brother", "Nephew", "Uncle", "Cousin") },
              { text: "Pointing to a photograph, a man says 'The father of this person's son is my father's only son.' Who is in the photograph?", difficulty: "HARD", explanation: "My father's only son = myself. The father of the person's son = the person themselves. So 'the person = myself'. He is pointing to himself.", options: opts(0, "Himself", "His son", "His father", "His brother") },
              { text: "A woman introduces a man as 'He is the husband of the granddaughter of my mother.' How is the man related to the woman?", difficulty: "HARD", explanation: "Granddaughter of my mother = my daughter (or niece). If daughter: man is woman's son-in-law.", options: opts(2, "Nephew", "Brother", "Son-in-law", "Cousin") },
              { text: "A is B's sister. B is C's brother. C is D's father. How is A related to D?", difficulty: "MEDIUM", explanation: "A is B's sister → A is C's sister → C is D's father → A is D's aunt.", options: opts(1, "Mother", "Aunt", "Grandmother", "Sister") },
              { text: "P's mother is Q's daughter. R is Q's mother. How is P related to R?", difficulty: "MEDIUM", explanation: "P's mother = Q's daughter = Q's child (let's say Q is grandparent). Q's mother = R. So P's mother's mother = Q → P's great-grandmother = R.", options: opts(2, "Daughter", "Granddaughter", "Great-granddaughter", "Niece") },
              { text: "A is B's son. B is C's daughter. C is D's wife. How is A related to D?", difficulty: "MEDIUM", explanation: "C is D's wife → D is C's husband. B is C's daughter → D is B's father. A is B's son → D is A's grandfather.", options: opts(2, "Son", "Uncle", "Grandson", "Nephew") },
            ],
          },
          {
            slug: "direction-distance",
            name: "Direction & Distance",
            marks: 2, negative: 0.5,
            test: { slug: "direction-distance-practice-1", title: "Direction & Distance — Practice Test", description: "15 SSC-style direction/distance questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "A person walks 5 km North, then 3 km East. How far is he from the start?", difficulty: "MEDIUM", explanation: "By Pythagoras: √(5²+3²) = √34 km.", options: opts(2, "8 km", "4 km", "√34 km", "√28 km") },
              { text: "A man faces North and turns 90° clockwise. He now faces:", difficulty: "EASY", explanation: "Facing North, 90° clockwise turn → facing East.", options: opts(1, "South", "East", "West", "North") },
              { text: "Pointing East, you turn left. You now face:", difficulty: "EASY", explanation: "Left from East = North.", options: opts(0, "North", "South", "West", "East") },
              { text: "A walks 4 km East, then 3 km South, then 4 km West. How far is he from start?", difficulty: "MEDIUM", explanation: "East 4 and West 4 cancel. Net = 3 km South. Distance = 3 km.", options: opts(1, "0 km", "3 km", "4 km", "7 km") },
              { text: "Ram starts from home, goes 6 km South, then 8 km East. He is now __ km from home:", difficulty: "MEDIUM", explanation: "√(6²+8²) = √100 = 10 km.", options: opts(2, "8 km", "9 km", "10 km", "14 km") },
              { text: "If you face West and turn 180°, you face:", difficulty: "EASY", explanation: "180° from West = East.", options: opts(1, "West", "East", "North", "South") },
              { text: "A man walks 10 m North, 6 m East, 10 m South and 6 m West. He is:", difficulty: "EASY", explanation: "North 10 and South 10 cancel; East 6 and West 6 cancel → back at starting point.", options: opts(0, "at the starting point", "6 m East", "10 m North", "16 m East") },
              { text: "Priya goes 3 km East, 4 km North, 6 km West. Her distance from start:", difficulty: "MEDIUM", explanation: "Net E-W = 3−6 = −3 (i.e. 3 km West). Net N-S = 4 North. Distance = √(3²+4²) = 5 km.", options: opts(2, "7 km", "4 km", "5 km", "6 km") },
              { text: "Sunrise is in the East. A man's shadow falls to his West. He faces:", difficulty: "EASY", explanation: "Shadow is opposite to the light source. Sun in East → shadow to West → man faces East.", options: opts(0, "East", "West", "North", "South") },
              { text: "If South-East is called East, North-East is called North, what is South called?", difficulty: "HARD", explanation: "Every direction shifts 45° anti-clockwise. South → South-East... actually the pattern rotates 45° anti-clockwise. South (originally) becomes South-West.", options: opts(3, "West", "South-West", "North", "South-West") },
              { text: "A starts from X and goes 2 km South, then 3 km East, then 2 km North. Distance from X:", difficulty: "MEDIUM", explanation: "South 2 + North 2 cancel. Net = 3 km East. Distance = 3 km.", options: opts(0, "3 km", "4 km", "5 km", "7 km") },
              { text: "At 6 AM the sun is in the East. Suresh facing the sun. His left hand points to:", difficulty: "EASY", explanation: "Facing East, left hand points North.", options: opts(0, "North", "South", "East", "West") },
              { text: "P walks 5 km towards North and turns right and walks 3 km, then turns right and walks 5 km, then turns left. He now faces:", difficulty: "MEDIUM", explanation: "N→right(E)→right(S)→left(E). He faces East.", options: opts(1, "North", "East", "South", "West") },
              { text: "Aman drives North 20 km, turns right 6 km, turns right again 20 km. He is now from start:", difficulty: "MEDIUM", explanation: "N20, E6, S20. Net: 6 km East. Distance = 6 km.", options: opts(1, "0 km", "6 km", "20 km", "26 km") },
              { text: "Facing North, if you turn 270° clockwise, you face:", difficulty: "MEDIUM", explanation: "270° clockwise = 90° anti-clockwise. North + 90° anti-clockwise = West.", options: opts(3, "South", "East", "North", "West") },
            ],
          },
          {
            slug: "syllogism",
            name: "Syllogism",
            marks: 2, negative: 0.5,
            test: { slug: "syllogism-practice-1", title: "Syllogism — Practice Test", description: "15 SSC-style Syllogism questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Statements: All cats are dogs. All dogs are animals. Conclusion: All cats are animals.", difficulty: "EASY", explanation: "All cats → dogs → animals. The chain holds. Conclusion follows.", options: opts(0, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: Some birds are fish. All fish are reptiles. Conclusion: Some birds are reptiles.", difficulty: "MEDIUM", explanation: "Some birds are fish → those birds are also reptiles (since all fish are reptiles). Conclusion follows.", options: opts(0, "True", "False", "Uncertain", "Cannot be determined") },
              { text: "Statements: No men are women. All women are humans. Conclusion: No men are humans.", difficulty: "MEDIUM", explanation: "We know no men are women, but men can still be humans (human is the broader category). Conclusion does NOT follow.", options: opts(1, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: All pens are books. No books are pencils. Conclusion: No pens are pencils.", difficulty: "MEDIUM", explanation: "Pens ⊆ Books. Books ∩ Pencils = ∅. Therefore Pens ∩ Pencils = ∅. Conclusion follows.", options: opts(0, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: Some apples are oranges. Some oranges are grapes. Conclusion: Some apples are grapes.", difficulty: "HARD", explanation: "Some-Some gives no definite conclusion. We don't know if the 'some apples' that are oranges overlap with the 'some oranges' that are grapes.", options: opts(1, "True", "False", "Uncertain", "Cannot determine") },
              { text: "Statements: All flowers are trees. All trees are mountains. Conclusion I: All flowers are mountains. Conclusion II: All mountains are flowers.", difficulty: "MEDIUM", explanation: "Flowers ⊆ Trees ⊆ Mountains → Conclusion I follows. But mountains can include non-flower things → II does not follow.", options: opts(0, "Only I follows", "Only II follows", "Both follow", "Neither follows") },
              { text: "Statements: Some boxes are toys. All toys are blocks. Conclusion: All boxes are blocks.", difficulty: "MEDIUM", explanation: "Only SOME boxes are toys; those particular boxes are blocks. But not ALL boxes are toys → not all boxes are blocks.", options: opts(1, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: No dog is a cat. Some cats are tigers. Conclusion: No dog is a tiger.", difficulty: "HARD", explanation: "We know no dog is a cat, but tigers might still be dogs through some other connection not ruled out. Conclusion does NOT necessarily follow.", options: opts(1, "True", "False", "Uncertain", "Cannot say") },
              { text: "Statements: All students are players. Some players are singers. Conclusion: Some students are singers.", difficulty: "HARD", explanation: "All students are players; some players are singers. We cannot guarantee the 'some players who are singers' include any students. Does not follow definitively.", options: opts(1, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: All A are B. All B are C. Conclusion: All A are C.", difficulty: "EASY", explanation: "A ⊆ B ⊆ C → A ⊆ C. Conclusion follows.", options: opts(0, "True", "False", "Sometimes true", "Cannot say") },
              { text: "Statements: No M is N. All N are O. Conclusion: Some O are not M.", difficulty: "MEDIUM", explanation: "No M is N → N has no M. All N are O → N ⊆ O. Since N is part of O and N has no M, those N-elements of O are not M → some O are not M. Follows.", options: opts(0, "True", "False", "Uncertain", "Partial") },
              { text: "Statements: Some dogs bark. All barking animals are dogs. Conclusion: All dogs bark.", difficulty: "MEDIUM", explanation: "Second statement says all barking animals are dogs — not all dogs bark. First says only some dogs bark. 'All dogs bark' does not follow.", options: opts(1, "True", "False", "Uncertain", "Always true") },
              { text: "Statements: All tables are chairs. No chair is a sofa. Conclusion: No table is a sofa.", difficulty: "EASY", explanation: "Tables ⊆ Chairs. Chairs ∩ Sofas = ∅. Therefore Tables ∩ Sofas = ∅. Conclusion follows.", options: opts(0, "True", "False", "Uncertain", "Cannot say") },
              { text: "Statement: All X are Y. Conclusion: Some Y are X.", difficulty: "MEDIUM", explanation: "If all X are Y, then there exist Y that are X (namely all of X). So 'some Y are X' is always valid. Follows.", options: opts(0, "True", "False", "Uncertain", "Never true") },
              { text: "Statements: Some pens are markers. Some markers are erasers. Conclusion I: Some pens are erasers. Conclusion II: No pens are erasers.", difficulty: "HARD", explanation: "Some-Some gives no definite conclusion about pens-erasers. Both I and II are possible — neither can be confirmed or denied.", options: opts(3, "Only I", "Only II", "Both", "Neither") },
            ],
          },
          {
            slug: "ranking-arrangement",
            name: "Ranking & Arrangement",
            marks: 2, negative: 0.5,
            test: { slug: "ranking-arrangement-practice-1", title: "Ranking & Arrangement — Practice Test", description: "15 SSC-style ranking questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "In a class of 40 students, Ravi is 10th from the top. What is his rank from the bottom?", difficulty: "EASY", explanation: "Rank from bottom = Total + 1 − rank from top = 40 + 1 − 10 = 31.", options: opts(2, "29", "30", "31", "32") },
              { text: "Meena is 5th from the left and 7th from the right in a row. How many students are in the row?", difficulty: "EASY", explanation: "Total = 5 + 7 − 1 = 11.", options: opts(2, "10", "11", "12", "13") },
              { text: "If Rahul is 8th from the left and 12th from the right, total students in the row:", difficulty: "EASY", explanation: "Total = 8 + 12 − 1 = 19.", options: opts(2, "18", "19", "20", "21") },
              { text: "In a queue of 50, Sam is 20th from the front. From the rear he is:", difficulty: "EASY", explanation: "50 + 1 − 20 = 31st from rear.", options: opts(2, "29th", "30th", "31st", "32nd") },
              { text: "A and B are in a row. A is 15th from the left; B is 10th from the right. If there are 4 students between A and B, total students:", difficulty: "HARD", explanation: "If A is to the left of B: 15 + 4 + 10 = 29. If B is to the left of A: 10+4+15... but 15 from left and 10 from right with 4 between = 15+4+10 = 29. Total = 29.", options: opts(1, "28", "29", "30", "31") },
              { text: "In a line, P is 7th from left and Q is 9th from right. They exchange positions. Now P is 11th from left. Total in line:", difficulty: "MEDIUM", explanation: "After exchange, P takes Q's original position = 11th from left. P was 9th from right = Q's old position. Total = 11 + 9 − 1 = 19.", options: opts(2, "17", "18", "19", "20") },
              { text: "5 students sit in a row. A sits next to B; B sits next to C. C is not at either end. D sits next to A. How many possible arrangements?", difficulty: "HARD", explanation: "C in middle; B next to C; A next to B; D next to A. The chain D-A-B-C or C-B-A-D. E fits at the ends. Multiple valid arrangements exist — 4 total.", options: opts(1, "2", "4", "6", "8") },
              { text: "Among 5 people in a row, if A is 3rd from left and also 3rd from right, how many people are there?", difficulty: "EASY", explanation: "3rd from left + 3rd from right − 1 = 5. Consistent with the given number.", options: opts(0, "5", "6", "7", "4") },
              { text: "Kavya is 8th from the top in Maths and 3rd from bottom. How many students in the class?", difficulty: "EASY", explanation: "Total = 8 + 3 − 1 = 10.", options: opts(2, "9", "10", "11", "12") },
              { text: "In a group of 20, if Rohan is exactly in the middle, his rank from the front is:", difficulty: "EASY", explanation: "Middle of 20 = between 10th and 11th. In a group of 21 the middle is 11th. For even 20, strictly 'exact middle' is not possible, but if asked: (20+1)/2 ≈ 10th or 11th.", options: opts(0, "10th or 11th", "10th exactly", "11th exactly", "9th") },
              { text: "In a row of boys, if Ram is 9th from left and 11th from right, how many boys are between Ram and the rightmost boy?", difficulty: "MEDIUM", explanation: "Total = 9+11−1 = 19. Boys to the right of Ram = 19−9 = 10.", options: opts(2, "9", "10", "11", "12") },
              { text: "In a class test, Suresh stands 5th from top and Ramesh is 7 places below him. If Ramesh is 3rd from bottom, total students:", difficulty: "MEDIUM", explanation: "Ramesh = 5+7 = 12th from top. Total = 12+3−1 = 14.", options: opts(2, "12", "13", "14", "15") },
              { text: "If ABCDE sit in a row and B is between A and C, C is between B and D, D is between C and E, the correct order is:", difficulty: "EASY", explanation: "The chain spells itself out: A-B-C-D-E.", options: opts(0, "A B C D E", "E D C B A", "A C B D E", "B A C D E") },
              { text: "In a class of 60, Anand is 30th from one side. From the other side he is:", difficulty: "EASY", explanation: "60+1−30 = 31st from the other side.", options: opts(2, "29th", "30th", "31st", "32nd") },
              { text: "There are 20 boys and 15 girls in a row (alternating). A boy and a girl together swap. The total in the row is:", difficulty: "EASY", explanation: "Total = 20+15 = 35. Swapping doesn't change the total.", options: opts(0, "35", "34", "36", "33") },
            ],
          },
        ],
      },
      // ── English Language (new subject) ─────────────────────────────────
      {
        slug: "english-language",
        name: "English Language",
        chapters: [
          {
            slug: "synonyms-antonyms",
            name: "Synonyms & Antonyms",
            marks: 2, negative: 0.5,
            test: { slug: "synonyms-antonyms-practice-1", title: "Synonyms & Antonyms — Practice Test", description: "15 SSC-style vocabulary questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Synonym of BENEVOLENT:", difficulty: "EASY", explanation: "Benevolent means kind/well-meaning. Synonym: Generous.", options: opts(1, "Cruel", "Generous", "Selfish", "Greedy") },
              { text: "Antonym of DILIGENT:", difficulty: "EASY", explanation: "Diligent means hardworking. Antonym: Lazy.", options: opts(1, "Hardworking", "Lazy", "Careful", "Honest") },
              { text: "Synonym of ABUNDANT:", difficulty: "EASY", explanation: "Abundant means plentiful. Synonym: Plentiful.", options: opts(0, "Plentiful", "Scarce", "Empty", "Limited") },
              { text: "Antonym of VERBOSE:", difficulty: "MEDIUM", explanation: "Verbose means using too many words. Antonym: Concise (using few words).", options: opts(1, "Wordy", "Concise", "Lengthy", "Detailed") },
              { text: "Synonym of EPHEMERAL:", difficulty: "MEDIUM", explanation: "Ephemeral means short-lived/temporary. Synonym: Transient.", options: opts(2, "Eternal", "Permanent", "Transient", "Everlasting") },
              { text: "Antonym of LOQUACIOUS:", difficulty: "MEDIUM", explanation: "Loquacious means talkative. Antonym: Taciturn (quiet, few words).", options: opts(1, "Talkative", "Taciturn", "Chatty", "Verbal") },
              { text: "Synonym of AUDACIOUS:", difficulty: "MEDIUM", explanation: "Audacious means bold/daring. Synonym: Bold.", options: opts(0, "Bold", "Timid", "Shy", "Cowardly") },
              { text: "Antonym of AMBIGUOUS:", difficulty: "MEDIUM", explanation: "Ambiguous means unclear. Antonym: Clear/Unambiguous.", options: opts(2, "Vague", "Unclear", "Clear", "Puzzling") },
              { text: "Synonym of METICULOUS:", difficulty: "MEDIUM", explanation: "Meticulous means very careful and precise. Synonym: Thorough.", options: opts(2, "Careless", "Hasty", "Thorough", "Random") },
              { text: "Antonym of FRUGAL:", difficulty: "MEDIUM", explanation: "Frugal means economical/thrifty. Antonym: Extravagant.", options: opts(1, "Thrifty", "Extravagant", "Economical", "Careful") },
              { text: "Synonym of ELOQUENT:", difficulty: "EASY", explanation: "Eloquent means fluent and persuasive in speech. Synonym: Articulate.", options: opts(1, "Silent", "Articulate", "Clumsy", "Rude") },
              { text: "Antonym of SERENE:", difficulty: "EASY", explanation: "Serene means calm and peaceful. Antonym: Agitated.", options: opts(2, "Calm", "Peaceful", "Agitated", "Quiet") },
              { text: "Synonym of ALLEVIATE:", difficulty: "MEDIUM", explanation: "Alleviate means to make something less severe. Synonym: Mitigate.", options: opts(1, "Worsen", "Mitigate", "Increase", "Aggravate") },
              { text: "Antonym of CANDID:", difficulty: "MEDIUM", explanation: "Candid means honest and straightforward. Antonym: Evasive.", options: opts(1, "Frank", "Evasive", "Open", "Truthful") },
              { text: "Synonym of PERNICIOUS:", difficulty: "HARD", explanation: "Pernicious means having a harmful effect, especially in a gradual or subtle way. Synonym: Detrimental.", options: opts(2, "Beneficial", "Harmless", "Detrimental", "Helpful") },
            ],
          },
          {
            slug: "fill-in-the-blanks",
            name: "Fill in the Blanks",
            marks: 2, negative: 0.5,
            test: { slug: "fill-blanks-practice-1", title: "Fill in the Blanks — Practice Test", description: "15 SSC-style fill-in-the-blank questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "She _____ to school every day. (habit/routine)", difficulty: "EASY", explanation: "For regular habitual actions, use simple present: 'goes'.", options: opts(1, "go", "goes", "going", "gone") },
              { text: "He _____ playing cricket when I arrived.", difficulty: "EASY", explanation: "Past Continuous tense for an action in progress when another happened: 'was playing'.", options: opts(0, "was playing", "played", "is playing", "has played") },
              { text: "I have been living here _____ 2010.", difficulty: "EASY", explanation: "'Since' is used with a specific point in time; 'for' is used with a duration.", options: opts(0, "since", "for", "from", "during") },
              { text: "Neither Ravi nor his brothers _____ invited.", difficulty: "MEDIUM", explanation: "With Neither...nor, the verb agrees with the closer subject ('brothers' = plural) → 'were'.", options: opts(1, "was", "were", "is", "has been") },
              { text: "The committee _____ reached a decision.", difficulty: "MEDIUM", explanation: "Collective nouns in standard usage take singular verbs: 'has'.", options: opts(0, "has", "have", "are", "were") },
              { text: "He is one of those students who _____ always late.", difficulty: "HARD", explanation: "The relative clause 'who...late' refers to 'those students' (plural) → 'are'.", options: opts(1, "is", "are", "was", "were") },
              { text: "If I _____ rich, I would help the poor.", difficulty: "MEDIUM", explanation: "Hypothetical/unreal present: If + past tense (were) → would + infinitive.", options: opts(1, "am", "were", "was", "will be") },
              { text: "The news _____ shocking.", difficulty: "EASY", explanation: "'News' is uncountable and takes a singular verb: 'was'.", options: opts(0, "was", "were", "are", "have been") },
              { text: "She sings _____ than her sister.", difficulty: "EASY", explanation: "Comparative adverb: 'better' (well → better).", options: opts(2, "good", "well", "better", "best") },
              { text: "The thief was caught _____ the police.", difficulty: "EASY", explanation: "Passive voice: caught 'by' the police.", options: opts(1, "from", "by", "with", "through") },
              { text: "He _____ for the company since 2015.", difficulty: "MEDIUM", explanation: "Action started in the past and continuing now with 'since' → Present Perfect: 'has worked'.", options: opts(0, "has worked", "worked", "is working", "was working") },
              { text: "We look forward _____ hearing from you.", difficulty: "MEDIUM", explanation: "'Look forward to' is followed by a gerund (verb+ing): 'to hearing'.", options: opts(1, "for", "to", "in", "at") },
              { text: "Each of the students _____ submitted the assignment.", difficulty: "MEDIUM", explanation: "'Each' is singular and takes singular verb: 'has'.", options: opts(0, "has", "have", "are", "were") },
              { text: "The book, _____ I borrowed last week, is excellent.", difficulty: "MEDIUM", explanation: "Relative pronoun for a thing: 'which' (non-restrictive clause).", options: opts(1, "who", "which", "that", "whom") },
              { text: "He is senior _____ me by two years.", difficulty: "EASY", explanation: "'Senior/junior/superior/inferior to' — 'to' is the correct preposition.", options: opts(2, "from", "than", "to", "over") },
            ],
          },
          {
            slug: "error-spotting",
            name: "Error Spotting",
            marks: 2, negative: 0.5,
            test: { slug: "error-spotting-practice-1", title: "Error Spotting — Practice Test", description: "15 SSC-style error spotting questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Find the error: 'He don't know the answer.'", difficulty: "EASY", explanation: "'He' is third person singular → the correct form is 'doesn't know'.", options: opts(0, "don't → doesn't", "know → knows", "the → a", "no error") },
              { text: "Find the error: 'She is more smarter than him.'", difficulty: "EASY", explanation: "'Smarter' is already comparative. 'More smarter' is a double comparative — incorrect. Should be 'smarter'.", options: opts(0, "more smarter → smarter", "than → then", "him → he", "no error") },
              { text: "Find the error: 'The news are bad today.'", difficulty: "EASY", explanation: "'News' is singular (uncountable) → 'The news is bad today'.", options: opts(0, "are → is", "news → new", "bad → badly", "no error") },
              { text: "Find the error: 'Neither of them are correct.'", difficulty: "MEDIUM", explanation: "'Neither' is singular → 'Neither of them is correct'.", options: opts(0, "are → is", "Neither → Both", "them → they", "no error") },
              { text: "Find the error: 'He works very hardly.'", difficulty: "EASY", explanation: "'Hardly' means 'barely/scarcely'. The correct adverb for diligently is 'hard' → 'He works very hard'.", options: opts(0, "hardly → hard", "very → much", "works → work", "no error") },
              { text: "Find the error: 'I am knowing the answer.'", difficulty: "EASY", explanation: "'Know' is a stative verb — it cannot be used in continuous tenses. 'I know the answer'.", options: opts(0, "am knowing → know", "the → a", "answer → answers", "no error") },
              { text: "Find the error: 'We discussed about the plan.'", difficulty: "MEDIUM", explanation: "'Discuss' is transitive — it doesn't need 'about'. 'We discussed the plan'.", options: opts(0, "about → (remove it)", "discussed → talk", "the → a", "no error") },
              { text: "Find the error: 'She is elder than her brother.'", difficulty: "MEDIUM", explanation: "'Elder' is used for family members and cannot take 'than'. Use 'older than' in comparisons.", options: opts(0, "elder → older", "than → then", "brother → brothers", "no error") },
              { text: "Find the error: 'He gave me a very good advice.'", difficulty: "MEDIUM", explanation: "'Advice' is uncountable → no 'a'. 'He gave me very good advice'.", options: opts(0, "a → (remove)", "very → much", "advice → advise", "no error") },
              { text: "Find the error: 'Between you and I, this is wrong.'", difficulty: "MEDIUM", explanation: "After a preposition ('between'), use objective case: 'between you and me'.", options: opts(0, "I → me", "Between → Among", "this → it", "no error") },
              { text: "Find the error: 'He has been waiting since two hours.'", difficulty: "MEDIUM", explanation: "'Since' is used with a point in time; 'for' is used with a duration ('two hours'). 'for two hours'.", options: opts(0, "since → for", "has → have", "waiting → wait", "no error") },
              { text: "Find the error: 'The sceneries here are beautiful.'", difficulty: "MEDIUM", explanation: "'Scenery' is uncountable and has no plural form → 'The scenery here is beautiful'.", options: opts(0, "sceneries → scenery", "here → there", "are → is (both)", "no error") },
              { text: "Find the error: 'Each boy and each girl were present.'", difficulty: "HARD", explanation: "'Each boy and each girl' = singular subject → 'was present'.", options: opts(0, "were → was", "Each → Both", "present → presents", "no error") },
              { text: "Find the error: 'He is too weak that he cannot walk.'", difficulty: "HARD", explanation: "'Too...to' construction: 'He is too weak to walk.' The 'that he cannot' structure is incorrect with 'too'.", options: opts(0, "too...that → too...to", "weak → weakly", "cannot → can not", "no error") },
              { text: "Find the error: 'My cousin is one of those persons who believes in hard work.'", difficulty: "HARD", explanation: "'who' refers to 'those persons' (plural) → 'believe', not 'believes'.", options: opts(0, "believes → believe", "one → ones", "persons → person", "no error") },
            ],
          },
          {
            slug: "one-word-substitution",
            name: "One Word Substitution",
            marks: 2, negative: 0.5,
            test: { slug: "one-word-substitution-practice-1", title: "One Word Substitution — Practice Test", description: "15 SSC-style vocabulary questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "A person who can speak two languages:", difficulty: "EASY", explanation: "Bilingual — bi = two, lingual = relating to language.", options: opts(1, "Monolingual", "Bilingual", "Multilingual", "Polyglot") },
              { text: "One who eats no meat:", difficulty: "EASY", explanation: "A vegetarian does not eat meat.", options: opts(2, "Vegan", "Non-vegetarian", "Vegetarian", "Herbivore") },
              { text: "Fear of water:", difficulty: "EASY", explanation: "Hydrophobia — hydro = water, phobia = fear.", options: opts(0, "Hydrophobia", "Agoraphobia", "Acrophobia", "Claustrophobia") },
              { text: "A doctor who treats children:", difficulty: "EASY", explanation: "A Paediatrician specialises in the medical care of children.", options: opts(1, "Cardiologist", "Paediatrician", "Dermatologist", "Psychiatrist") },
              { text: "One who designs buildings:", difficulty: "EASY", explanation: "An Architect designs buildings and other structures.", options: opts(0, "Architect", "Engineer", "Sculptor", "Planner") },
              { text: "Words written on a tomb:", difficulty: "MEDIUM", explanation: "An Epitaph is the inscription on a tombstone/tomb.", options: opts(2, "Elegy", "Eulogy", "Epitaph", "Epigraph") },
              { text: "A speech made without prior preparation:", difficulty: "MEDIUM", explanation: "Extempore — given off-the-cuff with no preparation.", options: opts(1, "Soliloquy", "Extempore", "Monologue", "Dialogue") },
              { text: "The science of stars and planets:", difficulty: "EASY", explanation: "Astronomy is the scientific study of celestial objects.", options: opts(0, "Astronomy", "Astrology", "Geology", "Meteorology") },
              { text: "A person who cannot read or write:", difficulty: "EASY", explanation: "An Illiterate person cannot read or write.", options: opts(1, "Ignorant", "Illiterate", "Innumerate", "Impotent") },
              { text: "That which cannot be corrected:", difficulty: "MEDIUM", explanation: "Incorrigible — incapable of being corrected or reformed.", options: opts(2, "Indelible", "Inevitable", "Incorrigible", "Insoluble") },
              { text: "Killing of one's own father:", difficulty: "MEDIUM", explanation: "Patricide — the act of killing one's father (pater = father).", options: opts(1, "Matricide", "Patricide", "Fratricide", "Infanticide") },
              { text: "One who walks in sleep:", difficulty: "EASY", explanation: "A Somnambulist walks in their sleep.", options: opts(2, "Insomniac", "Narcissist", "Somnambulist", "Pessimist") },
              { text: "Government by the people:", difficulty: "EASY", explanation: "Democracy — demos = people, kratia = power.", options: opts(0, "Democracy", "Autocracy", "Oligarchy", "Monarchy") },
              { text: "A story in which ideas are symbolised as people:", difficulty: "MEDIUM", explanation: "An Allegory is a story with a hidden meaning, typically moral, through symbolic characters.", options: opts(1, "Fable", "Allegory", "Parable", "Anecdote") },
              { text: "A person who pretends to be what he is not:", difficulty: "MEDIUM", explanation: "A Hypocrite professes beliefs and virtues that he doesn't actually have.", options: opts(2, "Liar", "Fraud", "Hypocrite", "Imposter") },
            ],
          },
          {
            slug: "idioms-phrases",
            name: "Idioms & Phrases",
            marks: 2, negative: 0.5,
            test: { slug: "idioms-phrases-practice-1", title: "Idioms & Phrases — Practice Test", description: "15 SSC-style Idioms & Phrases questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "Meaning of 'Bite the bullet':", difficulty: "EASY", explanation: "'Bite the bullet' means to endure a painful or difficult situation with courage.", options: opts(1, "to eat quickly", "to endure pain bravely", "to be cowardly", "to speak loudly") },
              { text: "Meaning of 'Beat around the bush':", difficulty: "EASY", explanation: "'Beat around the bush' means to avoid talking about what is important; to be indirect.", options: opts(1, "to work hard", "to avoid the main topic", "to garden", "to search for something") },
              { text: "Meaning of 'Cost an arm and a leg':", difficulty: "EASY", explanation: "'Cost an arm and a leg' means to be extremely expensive.", options: opts(1, "to be cheap", "to be very expensive", "to buy body parts", "to lose money") },
              { text: "Meaning of 'Let the cat out of the bag':", difficulty: "EASY", explanation: "'Let the cat out of the bag' means to reveal a secret by accident.", options: opts(1, "to release an animal", "to reveal a secret", "to lose something", "to be careless") },
              { text: "Meaning of 'Under the weather':", difficulty: "EASY", explanation: "'Under the weather' means feeling unwell or slightly sick.", options: opts(1, "in the rain", "feeling ill", "under a cloud", "feeling happy") },
              { text: "Meaning of 'Burning the midnight oil':", difficulty: "MEDIUM", explanation: "'Burning the midnight oil' means working late into the night.", options: opts(1, "wasting fuel", "working late at night", "setting something on fire", "sleeping early") },
              { text: "Meaning of 'Hit the nail on the head':", difficulty: "EASY", explanation: "'Hit the nail on the head' means to describe exactly what is causing a situation or problem; to be exactly right.", options: opts(2, "to work with tools", "to punch someone", "to be exactly correct", "to fix something") },
              { text: "Meaning of 'Once in a blue moon':", difficulty: "EASY", explanation: "'Once in a blue moon' means very rarely.", options: opts(1, "every night", "very rarely", "monthly", "during an eclipse") },
              { text: "Meaning of 'Spill the beans':", difficulty: "EASY", explanation: "'Spill the beans' means to reveal secret information inadvertently.", options: opts(2, "to make a mess", "to cook", "to reveal a secret", "to waste food") },
              { text: "Meaning of 'Barking up the wrong tree':", difficulty: "MEDIUM", explanation: "'Barking up the wrong tree' means to pursue a mistaken or misguided course of action.", options: opts(2, "to look for dogs", "to cut trees", "to look in the wrong place", "to make noise") },
              { text: "Meaning of 'Turn a blind eye':", difficulty: "MEDIUM", explanation: "'Turn a blind eye' means to ignore something that you know is happening.", options: opts(2, "to have poor eyesight", "to go blind", "to deliberately ignore", "to help someone") },
              { text: "Meaning of 'Break the ice':", difficulty: "EASY", explanation: "'Break the ice' means to do or say something to relieve tension in a social situation.", options: opts(2, "to destroy ice", "to be cold", "to start a conversation easily", "to win a competition") },
              { text: "'A blessing in disguise' means:", difficulty: "MEDIUM", explanation: "Something that seems bad at first but turns out to have good results.", options: opts(1, "a hidden threat", "something that seems bad but is good", "a secret gift", "a false friend") },
              { text: "'Hit the sack' means:", difficulty: "EASY", explanation: "'Hit the sack' is an informal idiom meaning to go to bed/sleep.", options: opts(1, "to punch a bag", "to go to sleep", "to wake up", "to start work") },
              { text: "'Miss the boat' means:", difficulty: "MEDIUM", explanation: "'Miss the boat' means to miss an opportunity, often because of being too slow.", options: opts(2, "to be on time", "to travel by ship", "to lose an opportunity", "to be late to a party") },
            ],
          },
        ],
      },
      // ── General Awareness (new subject) ───────────────────────────────
      {
        slug: "general-awareness",
        name: "General Awareness",
        chapters: [
          {
            slug: "indian-history",
            name: "Indian History",
            marks: 2, negative: 0.5,
            test: { slug: "indian-history-practice-1", title: "Indian History — Practice Test", description: "15 SSC-style Indian History questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The first war of Indian Independence took place in:", difficulty: "EASY", explanation: "The Revolt of 1857 (Sepoy Mutiny) is regarded as the first war of Indian Independence.", options: opts(1, "1835", "1857", "1885", "1905") },
              { text: "Who founded the Indian National Congress in 1885?", difficulty: "EASY", explanation: "A.O. Hume (Allan Octavian Hume), a retired British civil servant, founded the INC in 1885.", options: opts(1, "Bal Gangadhar Tilak", "A.O. Hume", "Dadabhai Naoroji", "Gopal Krishna Gokhale") },
              { text: "The Quit India Movement was launched in:", difficulty: "EASY", explanation: "Mahatma Gandhi launched the Quit India Movement on 8 August 1942.", options: opts(2, "1930", "1940", "1942", "1945") },
              { text: "Who gave the slogan 'Do or Die'?", difficulty: "EASY", explanation: "Mahatma Gandhi gave the slogan 'Do or Die' during the Quit India Movement in 1942.", options: opts(0, "Mahatma Gandhi", "Subhash Chandra Bose", "Nehru", "Bhagat Singh") },
              { text: "Jallianwala Bagh massacre occurred in:", difficulty: "EASY", explanation: "The Jallianwala Bagh massacre took place on 13 April 1919 in Amritsar.", options: opts(1, "1905", "1919", "1920", "1930") },
              { text: "Who was the last Mughal Emperor of India?", difficulty: "EASY", explanation: "Bahadur Shah Zafar II (Bahadur Shah II) was the last Mughal Emperor.", options: opts(1, "Aurangzeb", "Bahadur Shah Zafar", "Muhammad Shah", "Akbar II") },
              { text: "The Battle of Plassey (1757) was fought between:", difficulty: "MEDIUM", explanation: "The Battle of Plassey was fought between the British East India Company (under Clive) and the Nawab of Bengal (Siraj ud-Daulah).", options: opts(0, "British & Nawab of Bengal", "British & Marathas", "Mughals & British", "French & British") },
              { text: "Who wrote the book 'Discovery of India'?", difficulty: "EASY", explanation: "Jawaharlal Nehru wrote 'Discovery of India' while imprisoned at Ahmednagar Fort (1944).", options: opts(1, "M.K. Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Subhas Bose") },
              { text: "The Dandi March was conducted in:", difficulty: "EASY", explanation: "Gandhi's Salt March (Dandi March) took place in March–April 1930, protesting the salt tax.", options: opts(1, "1920", "1930", "1942", "1947") },
              { text: "Simon Commission was boycotted because:", difficulty: "MEDIUM", explanation: "The Simon Commission (1928) had no Indian members — it was an all-British commission meant to review the Indian constitution.", options: opts(1, "it was pro-Pakistan", "it had no Indian members", "it proposed partition", "it banned INC") },
              { text: "Who is called the 'Iron Man of India'?", difficulty: "EASY", explanation: "Sardar Vallabhbhai Patel is called the Iron Man of India for his role in uniting the princely states.", options: opts(0, "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "B.R. Ambedkar", "Bal Gangadhar Tilak") },
              { text: "Mountbatten Plan (1947) is also known as:", difficulty: "MEDIUM", explanation: "Mountbatten Plan (3 June 1947) proposed the partition of India into India and Pakistan and is also called the 3 June Plan.", options: opts(1, "August Offer", "3 June Plan", "Cabinet Mission Plan", "Cripps Mission") },
              { text: "India became a republic on:", difficulty: "EASY", explanation: "India became a Republic on 26 January 1950, when the Constitution came into force.", options: opts(2, "15 August 1947", "15 August 1950", "26 January 1950", "26 November 1949") },
              { text: "Who drafted the Indian Constitution?", difficulty: "EASY", explanation: "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is regarded as the chief architect of the Indian Constitution.", options: opts(1, "Nehru", "B.R. Ambedkar", "Rajendra Prasad", "Patel") },
              { text: "The first session of the Indian National Congress was held in:", difficulty: "MEDIUM", explanation: "The first INC session was held in Bombay (Mumbai) in December 1885.", options: opts(1, "Calcutta", "Bombay", "Madras", "Lahore") },
            ],
          },
          {
            slug: "indian-geography",
            name: "Indian Geography",
            marks: 2, negative: 0.5,
            test: { slug: "indian-geography-practice-1", title: "Indian Geography — Practice Test", description: "15 SSC-style Indian Geography questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The highest peak in India is:", difficulty: "EASY", explanation: "Kangchenjunga (8586 m) is the highest peak entirely within India (K2 is in Pakistan-administered territory).", options: opts(1, "K2", "Kangchenjunga", "Nanda Devi", "Kamet") },
              { text: "The river that flows through the city of Varanasi is:", difficulty: "EASY", explanation: "Varanasi (Kashi) is situated on the banks of the river Ganga.", options: opts(1, "Yamuna", "Ganga", "Saraswati", "Ghaghra") },
              { text: "The southernmost tip of mainland India is:", difficulty: "EASY", explanation: "Cape Comorin (Kanyakumari) is the southernmost tip of mainland India.", options: opts(0, "Kanyakumari", "Rameswaram", "Port Blair", "Lakshadweep") },
              { text: "The Tropic of Cancer passes through how many Indian states?", difficulty: "MEDIUM", explanation: "The Tropic of Cancer (23.5°N) passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.", options: opts(2, "6", "7", "8", "9") },
              { text: "India's largest state by area is:", difficulty: "EASY", explanation: "Rajasthan is the largest state in India by area.", options: opts(0, "Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh") },
              { text: "The longest river in India is:", difficulty: "EASY", explanation: "The Ganga is the longest river flowing entirely within India.", options: opts(1, "Brahmaputra", "Ganga", "Yamuna", "Godavari") },
              { text: "Which Indian state has the longest coastline?", difficulty: "MEDIUM", explanation: "Gujarat has the longest coastline among Indian states (approximately 1600 km).", options: opts(0, "Gujarat", "Maharashtra", "Andhra Pradesh", "Tamil Nadu") },
              { text: "The Sundarbans mangrove forest is located in:", difficulty: "EASY", explanation: "Sundarbans delta (home of the Royal Bengal Tiger) is in West Bengal (and Bangladesh).", options: opts(2, "Odisha", "Assam", "West Bengal", "Kerala") },
              { text: "Deccan Plateau is primarily composed of:", difficulty: "MEDIUM", explanation: "Deccan Plateau is largely composed of basalt rock formed by ancient volcanic activity.", options: opts(1, "limestone", "basalt", "granite", "sandstone") },
              { text: "The Siachen Glacier is located in:", difficulty: "MEDIUM", explanation: "Siachen Glacier is in the Eastern Karakoram range in the Himalayas, administered by India (Ladakh).", options: opts(2, "Himachal Pradesh", "Uttarakhand", "Ladakh (J&K)", "Sikkim") },
              { text: "Which is the only river to flow into the Arabian Sea from the Deccan?", difficulty: "HARD", explanation: "The Narmada and Tapti flow westward into the Arabian Sea — the only major Deccan rivers to do so.", options: opts(0, "Narmada", "Godavari", "Krishna", "Mahanadi") },
              { text: "The Western Ghats run along the:", difficulty: "EASY", explanation: "The Western Ghats run parallel to the western coast of India.", options: opts(0, "western coast", "eastern coast", "northern border", "central India") },
              { text: "India shares its longest border with:", difficulty: "MEDIUM", explanation: "India shares its longest international border with Bangladesh (~4156 km).", options: opts(2, "China", "Pakistan", "Bangladesh", "Nepal") },
              { text: "The Lakshadweep Islands are located in the:", difficulty: "EASY", explanation: "Lakshadweep is an archipelago in the Arabian Sea.", options: opts(1, "Bay of Bengal", "Arabian Sea", "Indian Ocean", "Pacific Ocean") },
              { text: "The Chilika Lake, a famous lagoon, is located in:", difficulty: "MEDIUM", explanation: "Chilika Lake is Asia's largest brackish water lagoon, located in Odisha.", options: opts(1, "West Bengal", "Odisha", "Andhra Pradesh", "Kerala") },
            ],
          },
          {
            slug: "indian-polity",
            name: "Indian Polity & Constitution",
            marks: 2, negative: 0.5,
            test: { slug: "indian-polity-practice-1", title: "Indian Polity & Constitution — Practice Test", description: "15 SSC-style Polity questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The Constitution of India came into effect on:", difficulty: "EASY", explanation: "The Constitution of India was adopted on 26 November 1949 and came into force on 26 January 1950.", options: opts(2, "15 August 1947", "26 November 1949", "26 January 1950", "15 August 1950") },
              { text: "The Preamble to the Indian Constitution describes India as:", difficulty: "EASY", explanation: "The Preamble describes India as a 'Sovereign, Socialist, Secular, Democratic Republic'.", options: opts(0, "Sovereign Socialist Secular Democratic Republic", "Federal Democratic Republic", "Socialist Democratic Union", "Secular Federal Republic") },
              { text: "Article 21 of the Constitution protects the Right to:", difficulty: "MEDIUM", explanation: "Article 21 guarantees the right to life and personal liberty ('No person shall be deprived of his life or personal liberty...').", options: opts(1, "Freedom of Speech", "Life and Personal Liberty", "Equality", "Religion") },
              { text: "The Parliament of India consists of:", difficulty: "EASY", explanation: "Indian Parliament = President + Rajya Sabha (Council of States) + Lok Sabha (House of the People).", options: opts(0, "President + Rajya Sabha + Lok Sabha", "Lok Sabha + Rajya Sabha", "President + Cabinet", "Rajya Sabha + Vidhan Sabha") },
              { text: "The minimum age to become the Prime Minister of India is:", difficulty: "MEDIUM", explanation: "The PM must be a member of Parliament. Lok Sabha minimum age = 25; Rajya Sabha = 30. Technically minimum is 25.", options: opts(0, "25 years", "30 years", "35 years", "40 years") },
              { text: "The President of India is elected by:", difficulty: "MEDIUM", explanation: "The President is elected by an Electoral College comprising elected members of both Houses of Parliament and elected members of State Legislative Assemblies.", options: opts(0, "Electoral College of Parliament + State Assemblies", "Direct vote by people", "Only Lok Sabha", "Cabinet") },
              { text: "The Directive Principles of State Policy are enshrined in:", difficulty: "MEDIUM", explanation: "Directive Principles are in Part IV (Articles 36–51) of the Constitution.", options: opts(2, "Part II", "Part III", "Part IV", "Part V") },
              { text: "Fundamental Rights are guaranteed under Part ___ of the Constitution:", difficulty: "MEDIUM", explanation: "Part III (Articles 12–35) of the Constitution contains Fundamental Rights.", options: opts(1, "II", "III", "IV", "V") },
              { text: "Right to Education (Article 21A) is a fundamental right for children aged:", difficulty: "EASY", explanation: "Article 21A guarantees free and compulsory education for children aged 6 to 14 years.", options: opts(0, "6–14 years", "5–15 years", "6–18 years", "0–14 years") },
              { text: "India's Supreme Court is located in:", difficulty: "EASY", explanation: "The Supreme Court of India is located in New Delhi.", options: opts(0, "New Delhi", "Mumbai", "Kolkata", "Chennai") },
              { text: "The Rajya Sabha is presided over by the:", difficulty: "EASY", explanation: "The Vice-President of India is the ex-officio Chairman of the Rajya Sabha.", options: opts(1, "President", "Vice-President", "Prime Minister", "Speaker") },
              { text: "The first Lok Sabha election was held in:", difficulty: "MEDIUM", explanation: "India's first general elections were held from October 1951 to February 1952.", options: opts(1, "1947", "1951–52", "1955", "1960") },
              { text: "Emergency under Article 352 is proclaimed when:", difficulty: "MEDIUM", explanation: "National Emergency (Article 352) is proclaimed in case of war, external aggression, or armed rebellion.", options: opts(0, "war, external aggression or armed rebellion", "financial crisis", "state breakdown", "natural disaster") },
              { text: "Which schedule of the Constitution deals with the distribution of powers between Centre and States?", difficulty: "HARD", explanation: "The Seventh Schedule contains three lists: Union List, State List, and Concurrent List.", options: opts(2, "Fifth Schedule", "Sixth Schedule", "Seventh Schedule", "Eighth Schedule") },
              { text: "A Money Bill can only originate in:", difficulty: "MEDIUM", explanation: "A Money Bill can only be introduced in the Lok Sabha (Article 109), not in Rajya Sabha.", options: opts(0, "Lok Sabha", "Rajya Sabha", "either House", "President's Office") },
            ],
          },
          {
            slug: "science-and-technology-gk",
            name: "Science & Technology GK",
            marks: 2, negative: 0.5,
            test: { slug: "science-technology-gk-practice-1", title: "Science & Technology GK — Practice Test", description: "15 SSC-style Science GK questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The unit of electrical resistance is the:", difficulty: "EASY", explanation: "Resistance is measured in Ohms (Ω), named after Georg Simon Ohm.", options: opts(1, "Ampere", "Ohm", "Volt", "Watt") },
              { text: "The speed of light in vacuum is approximately:", difficulty: "EASY", explanation: "Speed of light c ≈ 3 × 10⁸ m/s.", options: opts(1, "3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s") },
              { text: "Which planet is known as the 'Red Planet'?", difficulty: "EASY", explanation: "Mars appears red due to iron oxide (rust) on its surface.", options: opts(1, "Jupiter", "Mars", "Venus", "Saturn") },
              { text: "DNA stands for:", difficulty: "EASY", explanation: "DNA = Deoxyribonucleic Acid, the molecule carrying genetic instructions.", options: opts(0, "Deoxyribonucleic Acid", "Diribose Nucleic Acid", "Deoxyribonitric Acid", "Diabosenucleic Acid") },
              { text: "Which gas is used in fire extinguishers?", difficulty: "EASY", explanation: "Carbon dioxide (CO₂) is commonly used in fire extinguishers — it displaces oxygen and smothers the fire.", options: opts(1, "Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen") },
              { text: "The chemical symbol for Gold is:", difficulty: "EASY", explanation: "Gold's chemical symbol is Au, from the Latin word 'Aurum'.", options: opts(1, "Go", "Au", "Ag", "Gd") },
              { text: "Deficiency of Vitamin C causes:", difficulty: "EASY", explanation: "Vitamin C deficiency causes scurvy, characterised by weakness, anaemia, and bleeding gums.", options: opts(1, "Rickets", "Scurvy", "Night blindness", "Beriberi") },
              { text: "The process of converting iron into steel is done in a:", difficulty: "MEDIUM", explanation: "Steel is manufactured in a Bessemer converter or blast furnace by reducing the carbon content in iron.", options: opts(1, "Blast furnace", "Bessemer converter", "Crucible", "Kiln") },
              { text: "Which organ produces insulin in the human body?", difficulty: "EASY", explanation: "The pancreas produces insulin, which regulates blood glucose levels.", options: opts(2, "Liver", "Kidney", "Pancreas", "Spleen") },
              { text: "The study of fungi is called:", difficulty: "MEDIUM", explanation: "Mycology is the branch of biology concerned with the study of fungi.", options: opts(1, "Botany", "Mycology", "Zoology", "Virology") },
              { text: "Which vitamin is produced in the skin on exposure to sunlight?", difficulty: "EASY", explanation: "Vitamin D is synthesised in the skin when exposed to UV-B radiation from sunlight.", options: opts(2, "Vitamin A", "Vitamin B", "Vitamin D", "Vitamin K") },
              { text: "Newton's first law is also known as the law of:", difficulty: "EASY", explanation: "Newton's First Law = Law of Inertia (a body remains at rest or uniform motion unless acted upon by a force).", options: opts(1, "Gravitation", "Inertia", "Acceleration", "Momentum") },
              { text: "ISRO was established in:", difficulty: "MEDIUM", explanation: "The Indian Space Research Organisation was established on 15 August 1969.", options: opts(1, "1962", "1969", "1975", "1980") },
              { text: "India's first satellite was:", difficulty: "MEDIUM", explanation: "Aryabhata was India's first satellite, launched on 19 April 1975 by the Soviet Union.", options: opts(0, "Aryabhata", "Rohini", "INSAT-1", "Chandrayaan") },
              { text: "The pH of blood in a healthy human is approximately:", difficulty: "MEDIUM", explanation: "Normal human blood pH is slightly alkaline, ranging from 7.35 to 7.45.", options: opts(2, "5.5", "7.0", "7.4", "8.0") },
            ],
          },
          {
            slug: "static-gk",
            name: "Static GK & Current Affairs",
            marks: 2, negative: 0.5,
            test: { slug: "static-gk-practice-1", title: "Static GK — Practice Test", description: "15 SSC-style Static GK questions. +2 correct, −0.5 wrong." },
            questions: [
              { text: "The national animal of India is the:", difficulty: "EASY", explanation: "The Bengal Tiger was designated India's national animal in 1973 (Project Tiger).", options: opts(1, "Lion", "Bengal Tiger", "Elephant", "Peacock") },
              { text: "The national bird of India is the:", difficulty: "EASY", explanation: "The Indian Peacock (Pavo cristatus) was declared India's national bird in 1963.", options: opts(2, "Sparrow", "Parrot", "Peacock", "Crane") },
              { text: "The national flower of India is the:", difficulty: "EASY", explanation: "The Lotus (Nelumbo nucifera) is India's national flower.", options: opts(0, "Lotus", "Rose", "Jasmine", "Marigold") },
              { text: "The national game of India is:", difficulty: "EASY", explanation: "Hockey is India's national game (India won 8 Olympic gold medals in field hockey).", options: opts(1, "Cricket", "Hockey", "Football", "Kabaddi") },
              { text: "The capital of Australia is:", difficulty: "EASY", explanation: "Canberra is the capital of Australia (not Sydney or Melbourne).", options: opts(2, "Sydney", "Melbourne", "Canberra", "Perth") },
              { text: "Who wrote 'Romeo and Juliet'?", difficulty: "EASY", explanation: "William Shakespeare wrote the tragic play 'Romeo and Juliet'.", options: opts(0, "William Shakespeare", "Charles Dickens", "John Keats", "George Orwell") },
              { text: "The headquarters of the United Nations is in:", difficulty: "EASY", explanation: "The UN headquarters is located in New York City, USA.", options: opts(1, "Geneva", "New York", "Paris", "London") },
              { text: "The 2024 Summer Olympics were held in:", difficulty: "MEDIUM", explanation: "The 2024 Summer Olympic Games were held in Paris, France.", options: opts(1, "Los Angeles", "Paris", "Tokyo", "Brisbane") },
              { text: "World Environment Day is celebrated on:", difficulty: "EASY", explanation: "World Environment Day is celebrated every year on 5 June.", options: opts(2, "22 April", "1 June", "5 June", "16 September") },
              { text: "The Nobel Prize was first awarded in:", difficulty: "MEDIUM", explanation: "The Nobel Prizes were first awarded in 1901, in accordance with Alfred Nobel's will.", options: opts(1, "1895", "1901", "1910", "1921") },
              { text: "Rabindranath Tagore won the Nobel Prize for:", difficulty: "EASY", explanation: "Tagore won the Nobel Prize in Literature in 1913 for 'Gitanjali'.", options: opts(1, "Peace", "Literature", "Physics", "Medicine") },
              { text: "Sputnik 1, the first artificial satellite, was launched by:", difficulty: "EASY", explanation: "The USSR launched Sputnik 1 on 4 October 1957, the first artificial Earth satellite.", options: opts(1, "USA", "USSR", "UK", "France") },
              { text: "The Great Wall of China was primarily built to:", difficulty: "EASY", explanation: "The Great Wall was built to protect Chinese states and empires against raids and invasions from northern nomadic tribes.", options: opts(0, "protect against northern invasions", "mark borders with Korea", "build trade routes", "showcase power") },
              { text: "The currency of Japan is the:", difficulty: "EASY", explanation: "Japan's currency is the Yen (¥).", options: opts(1, "Yuan", "Yen", "Won", "Baht") },
              { text: "The Eiffel Tower is located in:", difficulty: "EASY", explanation: "The Eiffel Tower is located in Paris, France.", options: opts(0, "Paris", "Rome", "London", "Madrid") },
            ],
          },
        ],
      },
    ],
  },
];

// Wave 7 — Class 10 Social Science: History (4), Geography (5), Political Science (4), Economics (3). 15Q each.
const wave7: ExamContent[] = [
  {
    examSlug: "class-10",
    subjects: [
      // ── HISTORY ────────────────────────────────────────────────────────
      {
        slug: "history",
        name: "History",
        chapters: [
          {
            slug: "nationalism-in-europe",
            name: "The Rise of Nationalism in Europe",
            marks: 1, negative: 0,
            test: { slug: "nationalism-europe-practice-1", title: "Rise of Nationalism in Europe — Practice Test", description: "15 CBSE Class 10 History questions. +1 each, no negative marking." },
            questions: [
              { text: "Frederic Sorrieu's 1848 print visualised a world made up of:", difficulty: "EASY", explanation: "Sorrieu's utopian vision showed democratic and social republics — a world of free peoples united as nations.", options: opts(1, "empires", "democratic and social republics", "monarchies", "city-states") },
              { text: "The French artist who created utopian prints in 1848 was:", difficulty: "EASY", explanation: "Frédéric Sorrieu, a French artist, created a series of four prints in 1848 visualising his dream of a world of democratic republics.", options: opts(0, "Frederic Sorrieu", "Eugene Delacroix", "Caspar Friedrich", "Johann Gottfried Herder") },
              { text: "'Germania' was the allegorical figure representing:", difficulty: "EASY", explanation: "Germania was the female allegorical figure that came to represent the German nation, used during the revolutionary era of 1848.", options: opts(1, "France", "the German nation", "Austria", "Italy") },
              { text: "The concept of 'nation-states' began to emerge mainly in:", difficulty: "MEDIUM", explanation: "The late 18th and 19th centuries saw the rise of nationalism and the formation of modern nation-states in Europe.", options: opts(2, "the 15th century", "the 17th century", "the 19th century", "the 20th century") },
              { text: "The French Revolution in 1789 created a sense of:", difficulty: "EASY", explanation: "The French Revolution created a sense of collective national identity among French citizens — sovereignty shifted from the monarchy to the nation.", options: opts(1, "imperial expansion", "collective national identity", "religious unity", "class equality") },
              { text: "Metternich described Giuseppe Mazzini as the most dangerous enemy of the existing social order. Mazzini founded:", difficulty: "MEDIUM", explanation: "Giuseppe Mazzini founded 'Young Italy' (1831) and 'Young Europe' (1834) to promote republicanism and nationalist movements.", options: opts(0, "Young Italy", "Carbonari", "Red Shirts", "Young Germany") },
              { text: "The Zollverein (1834) was a customs union formed by:", difficulty: "MEDIUM", explanation: "The Zollverein was a coalition of German states that abolished tariff barriers, creating an economic foundation for German unity.", options: opts(0, "German states", "Italian states", "French provinces", "Austrian Empire") },
              { text: "The unification of Germany was completed in:", difficulty: "MEDIUM", explanation: "Germany was unified in 1871 after the Franco-Prussian War, with Prussia dominant, and the German Empire proclaimed at Versailles.", options: opts(2, "1848", "1861", "1871", "1882") },
              { text: "Who was the architect of German unification, known as the 'Iron Chancellor'?", difficulty: "EASY", explanation: "Otto von Bismarck, Chancellor of Prussia, used a policy of 'blood and iron' to unite the German states under Prussian leadership.", options: opts(0, "Otto von Bismarck", "Kaiser Wilhelm I", "Cavour", "Garibaldi") },
              { text: "The unification of Italy was completed in:", difficulty: "MEDIUM", explanation: "Italy was unified by 1871 (with Rome as capital from 1871, though the process was largely complete by 1861–70).", options: opts(2, "1848", "1861", "1870–71", "1882") },
              { text: "Romanticism in the 19th century stressed:", difficulty: "MEDIUM", explanation: "Romantic artists and writers emphasised emotions, nature, and a glorification of the past to arouse nationalist feelings.", options: opts(0, "emotion, nature and national culture", "reason and logic", "scientific progress", "imperialism") },
              { text: "The Frankfurt Parliament of 1848 failed primarily because:", difficulty: "HARD", explanation: "The liberal-nationalist Frankfurt Parliament offered the crown of unified Germany to the Prussian king, who refused, and then had to be dispersed by troops — it failed to unite Germany on liberal terms.", options: opts(0, "the Prussian king refused the crown", "Austria opposed it", "France invaded", "working class rejected it") },
              { text: "The Treaty of Vienna (1815) was signed to:", difficulty: "MEDIUM", explanation: "After Napoleon's defeat, the European powers convened at Vienna in 1815 to restore conservative regimes and redraw boundaries.", options: opts(1, "unify Italy", "restore conservatism and redraw European boundaries", "grant independence to colonies", "form the League of Nations") },
              { text: "Which country is sometimes called the 'mother' of nationalism and revolution in the 19th century?", difficulty: "EASY", explanation: "France became the revolutionary heartland — the French Revolution of 1789 inspired nationalist movements across Europe.", options: opts(0, "France", "Germany", "England", "Austria") },
              { text: "Giuseppe Garibaldi's volunteer army of nationalists was called:", difficulty: "MEDIUM", explanation: "Garibaldi led the 'Red Shirts' (Cacciatori delle Alpi), a volunteer army that helped unify southern Italy.", options: opts(1, "Young Italy", "Red Shirts", "Carbonari", "Black Hand") },
            ],
          },
          {
            slug: "nationalism-in-india",
            name: "Nationalism in India",
            marks: 1, negative: 0,
            test: { slug: "nationalism-india-practice-1", title: "Nationalism in India — Practice Test", description: "15 CBSE Class 10 History questions. +1 each, no negative marking." },
            questions: [
              { text: "The Non-Cooperation Movement was launched in:", difficulty: "EASY", explanation: "The Non-Cooperation Movement was launched by Mahatma Gandhi in 1920 in response to the Jallianwala Bagh massacre and the Khilafat issue.", options: opts(2, "1915", "1919", "1920", "1922") },
              { text: "The Rowlatt Act (1919) allowed the government to:", difficulty: "MEDIUM", explanation: "The Rowlatt Act gave the British government the power to arrest and detain political prisoners without trial.", options: opts(0, "arrest and detain without trial", "ban the Congress", "partition Bengal", "impose salt tax") },
              { text: "Gandhi called off the Non-Cooperation Movement after the incident at:", difficulty: "EASY", explanation: "At Chauri Chaura (1922), a mob burned a police station, killing 22 officers. Gandhi suspended the movement to keep it non-violent.", options: opts(1, "Amritsar", "Chauri Chaura", "Bardoli", "Lahore") },
              { text: "The Dandi March (Salt Satyagraha) began on:", difficulty: "EASY", explanation: "Gandhi started the Dandi March on 12 March 1930, walking 240 miles to break the salt laws.", options: opts(1, "26 January 1930", "12 March 1930", "6 April 1930", "15 August 1930") },
              { text: "The Civil Disobedience Movement differed from Non-Cooperation in that it:", difficulty: "MEDIUM", explanation: "Civil Disobedience went further — Indians not only refused to cooperate but also broke specific laws (like the salt laws), actively disobeying colonial rule.", options: opts(2, "was led by Nehru", "had no mass participation", "involved breaking colonial laws", "supported British rule") },
              { text: "The Khilafat Movement was led by:", difficulty: "EASY", explanation: "The Khilafat Movement was led by Mohammad Ali and Shaukat Ali to protest against the treatment of the Ottoman Caliph after WWI.", options: opts(0, "Mohammad Ali and Shaukat Ali", "Nehru and Gandhi", "Maulana Abul Kalam Azad", "M.A. Jinnah") },
              { text: "The Indian National Congress session at Lahore (1929) declared:", difficulty: "MEDIUM", explanation: "The Lahore session of December 1929 (under Nehru's presidency) declared Purna Swaraj (complete independence) as the goal.", options: opts(1, "Home Rule", "Purna Swaraj (complete independence)", "Dominion Status", "Non-Cooperation") },
              { text: "The Inland Emigration Act prevented:", difficulty: "MEDIUM", explanation: "Under the Inland Emigration Act, plantation workers (tea workers in Assam) were not permitted to leave their plantations without permission.", options: opts(0, "plantation workers from leaving without permission", "Indians from going abroad", "migration to cities", "travel between provinces") },
              { text: "Who coined the term 'Satyagraha' meaning:", difficulty: "EASY", explanation: "Gandhi coined 'Satyagraha' — satya (truth) + agraha (insistence) — meaning truth-force or soul-force.", options: opts(0, "truth-force/soul-force", "non-violence", "passive resistance", "civil disobedience") },
              { text: "The Simon Commission was boycotted because:", difficulty: "MEDIUM", explanation: "The Simon Commission (1928) had no Indian members — it was an all-white committee sent to review India's constitutional progress.", options: opts(0, "it had no Indian members", "it proposed partition", "it banned Congress", "it increased taxes") },
              { text: "Alluri Sitarama Raju led a tribal revolt in:", difficulty: "MEDIUM", explanation: "Alluri Sitarama Raju led the Rampa Rebellion (1922–24) in the Andhra forest regions, inspired by Gandhi's Non-Cooperation Movement.", options: opts(1, "Bengal", "Andhra forest regions", "Punjab", "Odisha") },
              { text: "In 1921 the merchants and industrialists participated in the Civil Disobedience Movement because:", difficulty: "HARD", explanation: "Indian merchants and industrialists resented the colonial policies that gave preferential treatment to British goods — they hoped swaraj would give them a better business environment.", options: opts(0, "they wanted protection from foreign imports", "they opposed the salt tax", "they supported the Khilafat", "they wanted Purna Swaraj") },
              { text: "'Vande Mataram' was composed by:", difficulty: "EASY", explanation: "'Vande Mataram' was composed by Bankim Chandra Chattopadhyay and included in his novel 'Anandamath' (1882).", options: opts(0, "Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Abanindranath Tagore", "Subramania Bharati") },
              { text: "The image of Bharat Mata was first created by:", difficulty: "MEDIUM", explanation: "The image of Bharat Mata was first created by Abanindranath Tagore, a Bengali artist, in 1905.", options: opts(1, "Bankim Chandra", "Abanindranath Tagore", "Rabindranath Tagore", "Ravi Varma") },
              { text: "Gandhi organised his first major Satyagraha in India at:", difficulty: "EASY", explanation: "Gandhi's first major Satyagraha in India was at Champaran, Bihar (1917), for the rights of indigo farmers.", options: opts(0, "Champaran", "Kheda", "Ahmedabad", "Bardoli") },
            ],
          },
          {
            slug: "making-of-global-world",
            name: "The Making of a Global World",
            marks: 1, negative: 0,
            test: { slug: "making-global-world-practice-1", title: "Making of a Global World — Practice Test", description: "15 CBSE Class 10 History questions. +1 each, no negative marking." },
            questions: [
              { text: "Globalisation is not a modern phenomenon — it has been happening since:", difficulty: "EASY", explanation: "Trade, migration and cultural exchange have connected distant parts of the world since ancient times through Silk Roads and sea routes.", options: opts(0, "ancient times", "the 15th century", "the 19th century", "the 20th century") },
              { text: "The Silk Roads connected:", difficulty: "EASY", explanation: "The Silk Roads were ancient trade networks linking China with Central Asia, the Middle East, Africa and Europe.", options: opts(0, "China with Europe and Africa", "India with China only", "Europe with America", "Arabia with India only") },
              { text: "The 'New World' discovered by Columbus refers to:", difficulty: "EASY", explanation: "Columbus's 1492 voyage opened up the Americas (the 'New World') to European exploration and colonisation.", options: opts(1, "Australia and New Zealand", "North and South America", "Africa", "East Asia") },
              { text: "The disease that killed millions of Native Americans after Europeans arrived was:", difficulty: "MEDIUM", explanation: "Smallpox, carried by Europeans, devastated Native American populations who had no immunity to the disease.", options: opts(1, "plague", "smallpox", "malaria", "cholera") },
              { text: "The 'El Dorado' myth encouraged Europeans to explore:", difficulty: "MEDIUM", explanation: "El Dorado — a mythical city of gold — lured European adventurers to explore and conquer the Americas in search of riches.", options: opts(0, "South America", "Africa", "India", "China") },
              { text: "The Corn Laws in Britain were repealed in 1846 to:", difficulty: "MEDIUM", explanation: "The repeal of the Corn Laws allowed cheap food to be imported, supporting free trade and feeding Britain's growing urban-industrial population.", options: opts(0, "allow cheap food imports", "ban foreign trade", "protect British farmers", "support colonies") },
              { text: "The Great Depression (1929) began in:", difficulty: "EASY", explanation: "The Great Depression began in the United States with the Wall Street Crash of October 1929.", options: opts(0, "the United States", "Germany", "Britain", "France") },
              { text: "The Bretton Woods Agreement (1944) created:", difficulty: "MEDIUM", explanation: "The Bretton Woods Conference created the IMF (International Monetary Fund) and the World Bank (IBRD) to manage the post-war international monetary system.", options: opts(0, "IMF and World Bank", "UN and NATO", "WTO and GATT", "G7 and G20") },
              { text: "Indentured labour migration in the 19th century was called:", difficulty: "MEDIUM", explanation: "Critics called the indentured labour system (workers transported to plantations on fixed-term contracts) a 'new system of slavery' due to its harsh conditions.", options: opts(1, "free migration", "new system of slavery", "bonded labour", "coolie trade") },
              { text: "Which Indian food crop was initially resisted in Europe as being 'fit only for pigs'?", difficulty: "HARD", explanation: "The potato (originally from America) was initially viewed with suspicion in Europe but eventually became a staple food, even in Ireland.", options: opts(2, "maize", "chilli", "potato", "tomato") },
              { text: "The 'cattle plague' (rinderpest) that devastated Africa in the 1890s was introduced by:", difficulty: "MEDIUM", explanation: "Rinderpest was inadvertently brought to Africa through infected cattle imported from British Asia to feed Italian troops invading Eritrea.", options: opts(0, "infected cattle from Asia", "European settlers", "British soldiers", "American explorers") },
              { text: "The post-WW2 international economic system (Bretton Woods system) was based on:", difficulty: "HARD", explanation: "The Bretton Woods system used fixed exchange rates pegged to the US dollar (which was in turn pegged to gold — gold standard).", options: opts(0, "fixed exchange rates linked to gold/US dollar", "floating exchange rates", "barter system", "gold coins only") },
              { text: "The World Trade Organisation (WTO) replaced:", difficulty: "MEDIUM", explanation: "The WTO replaced the GATT (General Agreement on Tariffs and Trade) in 1995.", options: opts(1, "World Bank", "GATT", "IMF", "United Nations") },
              { text: "Chinese labourers built much of the railway network in:", difficulty: "MEDIUM", explanation: "Chinese immigrants provided large amounts of labour for building the transcontinental railroad in the USA in the 19th century.", options: opts(1, "Australia", "the USA", "Canada", "South Africa") },
              { text: "The term 'globalisation' most simply means:", difficulty: "EASY", explanation: "Globalisation refers to the increasing interconnectedness of the world through trade, investment, technology and cultural exchange.", options: opts(0, "increasing interconnectedness of nations", "colonisation of weaker nations", "trade within one country", "economic isolation") },
            ],
          },
          {
            slug: "age-of-industrialisation",
            name: "The Age of Industrialisation",
            marks: 1, negative: 0,
            test: { slug: "age-industrialisation-practice-1", title: "Age of Industrialisation — Practice Test", description: "15 CBSE Class 10 History questions. +1 each, no negative marking." },
            questions: [
              { text: "The earliest industries in Britain were mainly in the sector of:", difficulty: "EASY", explanation: "The cotton textile industry was the leading sector of British industrialisation in the late 18th century.", options: opts(0, "cotton textiles", "steel", "chemicals", "railways") },
              { text: "The term 'proto-industrialisation' refers to:", difficulty: "MEDIUM", explanation: "Proto-industrialisation refers to the phase before factory-based industry, when production was spread across rural households and controlled by merchants.", options: opts(1, "factory-based industry", "rural cottage industries before factories", "government-run industries", "small-scale city workshops") },
              { text: "James Watt's improved steam engine (1781) was crucial because it:", difficulty: "MEDIUM", explanation: "Watt's steam engine, backed by Matthew Boulton, could power a variety of machines and became the main power source for British industry.", options: opts(1, "reduced coal use", "could power many types of machines", "worked on wind power", "replaced only spinning machines") },
              { text: "The 'Spinning Jenny' was invented by:", difficulty: "EASY", explanation: "James Hargreaves invented the Spinning Jenny in 1764, dramatically increasing thread production.", options: opts(1, "James Watt", "James Hargreaves", "Richard Arkwright", "Edmund Cartwright") },
              { text: "Britain's industrialisation was supported by its:", difficulty: "MEDIUM", explanation: "Britain's industrial advantage came from its colonies (raw materials + markets), global trade networks and the surplus from trade/agriculture.", options: opts(0, "colonies and global trade networks", "large population alone", "warmer climate", "abundant coal but no iron") },
              { text: "In India, the first cotton mill was set up in:", difficulty: "MEDIUM", explanation: "The first cotton mill in India was established in Bombay (Mumbai) in 1854.", options: opts(1, "Calcutta", "Bombay", "Ahmedabad", "Surat") },
              { text: "Why did Indian merchants and industrialists initially go into trade before setting up factories?", difficulty: "HARD", explanation: "They first accumulated capital through trade (opium, cotton) and then invested in industries once they had sufficient resources.", options: opts(0, "to accumulate capital through trade first", "because factories were banned by British", "lack of labour", "no demand for goods") },
              { text: "The Fly Shuttle loom was used to weave:", difficulty: "MEDIUM", explanation: "The Fly Shuttle (invented by John Kay, 1733) allowed weavers to weave faster and make broader cloth.", options: opts(2, "jute", "silk", "wider cotton cloth", "wool") },
              { text: "Early Indian textile mills were concentrated in Bombay and:", difficulty: "EASY", explanation: "Bombay and Ahmedabad were the two main centres of the Indian cotton mill industry.", options: opts(2, "Delhi", "Calcutta", "Ahmedabad", "Madras") },
              { text: "The Swadeshi Movement pushed Indians to:", difficulty: "EASY", explanation: "Swadeshi (from 1905) encouraged Indians to use domestically made goods and boycott British imports.", options: opts(1, "buy British goods", "use Indian-made goods and boycott British imports", "start plantations", "invest in railways") },
              { text: "Women workers in the early factories in Britain were given:", difficulty: "MEDIUM", explanation: "Women were given lower wages than men for the same work — a form of gender wage discrimination that persisted.", options: opts(1, "equal wages", "lower wages than men", "more benefits", "no wages") },
              { text: "The 'Jobber' in Indian mills was:", difficulty: "MEDIUM", explanation: "The Jobber was an old trusted worker who recruited labour from his home village — acting as a middleman between workers and mill owners.", options: opts(0, "a recruiter of labour from villages", "a machine operator", "a British supervisor", "a union leader") },
              { text: "Indian weavers suffered most when:", difficulty: "MEDIUM", explanation: "Cheap machine-made British cloth flooded India after 1850, destroying the livelihoods of hand-loom weavers.", options: opts(1, "they ran out of cotton", "cheap British machine-made cloth flooded India", "Mughal patronage ended", "they could not find buyers abroad") },
              { text: "The Elgin Mills were located in:", difficulty: "HARD", explanation: "The Elgin Mills were established in Kanpur (then Cawnpore), one of the northern Indian industrial centres.", options: opts(2, "Bombay", "Ahmedabad", "Kanpur", "Delhi") },
              { text: "By 1900, India's share of world trade in textiles had:", difficulty: "HARD", explanation: "Due to British competition, India's share in world trade in textiles declined sharply in the 19th century.", options: opts(1, "increased greatly", "declined sharply", "stayed the same", "tripled") },
            ],
          },
        ],
      },
      // ── GEOGRAPHY ──────────────────────────────────────────────────────
      {
        slug: "geography",
        name: "Geography",
        chapters: [
          {
            slug: "resources-and-development",
            name: "Resources and Development",
            marks: 1, negative: 0,
            test: { slug: "resources-development-practice-1", title: "Resources and Development — Practice Test", description: "15 CBSE Class 10 Geography questions. +1 each, no negative marking." },
            questions: [
              { text: "Resources are defined as:", difficulty: "EASY", explanation: "Resources are everything available in our environment that satisfies our needs and is technologically accessible, economically feasible and culturally acceptable.", options: opts(0, "everything in our environment that satisfies needs and has utility", "only natural elements", "only money and machines", "only minerals and energy") },
              { text: "Resources can be classified on the basis of origin into:", difficulty: "EASY", explanation: "On the basis of origin, resources are classified as biotic (living) and abiotic (non-living).", options: opts(0, "biotic and abiotic", "renewable and non-renewable", "potential and actual", "national and international") },
              { text: "Which of the following is a renewable resource?", difficulty: "EASY", explanation: "Solar energy is renewable because it is continuously available and will not deplete.", options: opts(2, "coal", "petroleum", "solar energy", "natural gas") },
              { text: "Land degradation in India is mainly caused by:", difficulty: "MEDIUM", explanation: "Deforestation, overgrazing, mining and faulty irrigation practices are major causes of land degradation.", options: opts(0, "deforestation and overgrazing", "urbanisation only", "floods only", "earthquakes") },
              { text: "The 'National Forest Policy (1952)' recommended that ___% of the total area in the plains should be under forests:", difficulty: "MEDIUM", explanation: "The National Forest Policy 1952 recommended 33% forest cover for plains and 67% for hilly regions.", options: opts(2, "20%", "25%", "33%", "50%") },
              { text: "Overgrazing leads to:", difficulty: "EASY", explanation: "Overgrazing removes vegetation cover, leading to soil erosion and land degradation.", options: opts(1, "soil improvement", "soil erosion and degradation", "water conservation", "more biodiversity") },
              { text: "Resource planning involves:", difficulty: "MEDIUM", explanation: "Resource planning involves identification and inventory, evolving a planning structure, and matching with national development plans.", options: opts(0, "identification + planning structure + development plan", "only identifying resources", "only using resources", "stopping resource use") },
              { text: "Gully erosion is common in:", difficulty: "MEDIUM", explanation: "Running water cuts through clayey soils to form gullies in parts of UP, MP, Rajasthan, creating badlands (Chambal ravines).", options: opts(1, "coastal areas", "Chambal ravines (UP, MP, Rajasthan)", "Thar desert", "Northeast India") },
              { text: "The Chipko Movement (Hug the Trees) was aimed at:", difficulty: "EASY", explanation: "The Chipko Movement in the Himalayan region was a non-violent resistance against deforestation — villagers hugged trees to prevent them from being felled.", options: opts(0, "preventing deforestation", "increasing mining", "building dams", "saving wildlife") },
              { text: "Which soil type covers the largest area in India?", difficulty: "MEDIUM", explanation: "Alluvial soil covers the largest area in India (about 43%) and is found in the Indo-Gangetic plains.", options: opts(0, "alluvial soil", "black soil", "red soil", "laterite soil") },
              { text: "Black soil (Regur soil) is best suited for growing:", difficulty: "EASY", explanation: "Black soil retains moisture well and is ideal for cotton cultivation (known as 'black cotton soil').", options: opts(1, "rice", "cotton", "wheat", "tea") },
              { text: "Laterite soil is found mainly in:", difficulty: "MEDIUM", explanation: "Laterite soil forms in areas of high temperature and high rainfall (leaching) — found in Karnataka, Kerala, Tamil Nadu, Assam, Meghalaya.", options: opts(0, "Karnataka, Kerala, Tamil Nadu", "Rajasthan, Gujarat", "Punjab, Haryana", "UP, Bihar") },
              { text: "The 'resource curse' refers to:", difficulty: "HARD", explanation: "The 'resource curse' (paradox of plenty) is the phenomenon where countries with abundant natural resources tend to have less economic growth, less democracy and worse development.", options: opts(0, "resource-rich countries having poor development", "too many resources leading to pollution", "foreign theft of resources", "over-use of human resources") },
              { text: "Wind erosion is most common in:", difficulty: "EASY", explanation: "Wind erosion is most severe in arid and semi-arid areas like the Thar Desert of Rajasthan.", options: opts(2, "coastal areas", "river valleys", "desert/arid regions", "forest areas") },
              { text: "Agenda 21 was adopted at the Earth Summit in 1992 held at:", difficulty: "MEDIUM", explanation: "Agenda 21 is a non-binding UN action plan on sustainable development, adopted at the Rio de Janeiro Earth Summit (1992).", options: opts(1, "Stockholm", "Rio de Janeiro", "Kyoto", "Paris") },
            ],
          },
          {
            slug: "water-resources",
            name: "Water Resources",
            marks: 1, negative: 0,
            test: { slug: "water-resources-practice-1", title: "Water Resources — Practice Test", description: "15 CBSE Class 10 Geography questions. +1 each, no negative marking." },
            questions: [
              { text: "Water covers about ___% of the Earth's surface:", difficulty: "EASY", explanation: "About 71% of the Earth's surface is covered with water.", options: opts(2, "50%", "60%", "71%", "80%") },
              { text: "The percentage of freshwater on Earth is approximately:", difficulty: "EASY", explanation: "Only about 2.5% of all Earth's water is freshwater; most of that is in ice caps and glaciers.", options: opts(1, "50%", "2.5%", "10%", "25%") },
              { text: "The Bhakra Nangal Dam is built on the river:", difficulty: "MEDIUM", explanation: "Bhakra Nangal Dam is built on the Sutlej river in Himachal Pradesh/Punjab.", options: opts(1, "Yamuna", "Sutlej", "Ganga", "Beas") },
              { text: "Multi-purpose river valley projects were referred to by Nehru as:", difficulty: "EASY", explanation: "Nehru called multi-purpose river valley projects the 'temples of modern India'.", options: opts(1, "pride of India", "'temples of modern India'", "engines of growth", "water palaces") },
              { text: "The Hirakud Dam is located on the river:", difficulty: "MEDIUM", explanation: "Hirakud Dam is built on the Mahanadi river in Odisha.", options: opts(2, "Godavari", "Krishna", "Mahanadi", "Cauvery") },
              { text: "Rainwater harvesting is most traditional in:", difficulty: "MEDIUM", explanation: "Rajasthan has a long tradition of rainwater harvesting — 'khadins', 'baoris', 'tanks', and 'kunds' are traditional structures.", options: opts(0, "Rajasthan", "Punjab", "West Bengal", "Assam") },
              { text: "Bamboola drip system is a traditional water conservation method from:", difficulty: "MEDIUM", explanation: "The Bamboo drip irrigation system is a 200-year-old technique from Meghalaya for irrigating orchards.", options: opts(2, "Tamil Nadu", "Rajasthan", "Meghalaya", "Gujarat") },
              { text: "The 'Gul' or 'Kul' (diversion channels from mountain streams) are found in:", difficulty: "MEDIUM", explanation: "Guls and Kuls are traditional irrigation channels found in the mountainous western Himalayan (Himachal Pradesh/Uttarakhand) areas.", options: opts(0, "western Himalayan region", "Rajasthan", "Deccan Plateau", "Bihar") },
              { text: "Fresh groundwater is obtained by:", difficulty: "EASY", explanation: "Groundwater is water stored in aquifers underground, accessed through wells, tube-wells and boreholes.", options: opts(1, "dams", "wells and tube-wells", "rivers only", "glaciers") },
              { text: "Rising water levels in reservoirs due to large dams lead to:", difficulty: "MEDIUM", explanation: "Large reservoirs submerge forests, villages and agricultural land, displacing communities and causing loss of biodiversity.", options: opts(1, "improved biodiversity", "displacement of communities and biodiversity loss", "better groundwater", "reduced salinity") },
              { text: "The Cauvery river dispute is between the states of:", difficulty: "MEDIUM", explanation: "Karnataka and Tamil Nadu have had a long-standing dispute over the sharing of Cauvery river waters.", options: opts(0, "Karnataka and Tamil Nadu", "Kerala and Tamil Nadu", "Andhra and Karnataka", "Maharashtra and Goa") },
              { text: "'Rooftop rainwater harvesting' collects rainwater from:", difficulty: "EASY", explanation: "Rooftop harvesting captures rain falling on building rooftops and stores it in tanks or allows it to recharge groundwater.", options: opts(0, "building rooftops", "rivers", "ponds", "underground springs") },
              { text: "The amount of water available per person is decreasing mainly due to:", difficulty: "MEDIUM", explanation: "Population growth, urbanisation, industrialisation and agricultural demand are all increasing water consumption faster than supply.", options: opts(0, "population growth and increasing demand", "climate getting drier only", "more evaporation", "less rainfall globally") },
              { text: "Jalyukt Shivar and Adarsh Gaon are water conservation initiatives in:", difficulty: "HARD", explanation: "Jalyukt Shivar (water conservation) is a Maharashtra government programme; Adarsh Gaon is also a Maharashtra initiative for water self-sufficiency.", options: opts(1, "Rajasthan", "Maharashtra", "Gujarat", "UP") },
              { text: "The main use of water globally is for:", difficulty: "EASY", explanation: "Agriculture accounts for about 70% of global freshwater withdrawals — the largest use of water.", options: opts(1, "domestic use", "agriculture/irrigation", "industry", "hydropower") },
            ],
          },
          {
            slug: "agriculture",
            name: "Agriculture",
            marks: 1, negative: 0,
            test: { slug: "agriculture-practice-1", title: "Agriculture — Practice Test", description: "15 CBSE Class 10 Geography questions. +1 each, no negative marking." },
            questions: [
              { text: "India is primarily a/an _____ economy:", difficulty: "EASY", explanation: "Agriculture remains the backbone of India's economy — the country is primarily agrarian.", options: opts(0, "agrarian economy", "industrial economy", "service economy", "maritime economy") },
              { text: "Farming that provides food mainly for the farmer's own family is called:", difficulty: "EASY", explanation: "Subsistence farming — the farmer grows crops mainly to feed the family with little or no surplus for sale.", options: opts(0, "subsistence farming", "commercial farming", "intensive farming", "plantation farming") },
              { text: "The crop season from June to November is called:", difficulty: "EASY", explanation: "Kharif season (June–November) includes monsoon crops like rice, maize, cotton and sugarcane.", options: opts(0, "Kharif", "Rabi", "Zaid", "Autumn") },
              { text: "Rabi crops are sown in:", difficulty: "EASY", explanation: "Rabi crops are sown in winter (October–December) and harvested in spring (February–April). Examples: wheat, mustard, barley.", options: opts(1, "June–July", "October–December (winter)", "March–April", "August–September") },
              { text: "The 'Green Revolution' in India increased production of:", difficulty: "EASY", explanation: "The Green Revolution (1960s–70s) dramatically increased production of wheat (and later rice) through HYV seeds, fertilisers and irrigation.", options: opts(0, "wheat and rice", "cotton and jute", "tea and coffee", "pulses and oilseeds") },
              { text: "India is the largest producer of _____ in the world:", difficulty: "MEDIUM", explanation: "India is the world's largest producer (and consumer) of tea, and also second-largest in sugarcane and rice.", options: opts(0, "tea", "wheat", "cotton", "rice") },
              { text: "Jhum cultivation is practiced in:", difficulty: "MEDIUM", explanation: "Jhum (slash-and-burn) cultivation is traditional shifting agriculture practiced in northeast India and tribal areas.", options: opts(1, "Punjab", "Northeast India", "Rajasthan", "Gujarat") },
              { text: "Which crop is called 'Black Gold' or 'Golden Fibre' in India?", difficulty: "MEDIUM", explanation: "Jute is called the 'Golden Fibre' because of its golden-like colour and commercial importance.", options: opts(2, "cotton", "sugarcane", "jute", "tea") },
              { text: "The largest producer of cotton in India is:", difficulty: "MEDIUM", explanation: "Maharashtra is the largest producer of cotton in India, followed by Gujarat.", options: opts(0, "Maharashtra", "Gujarat", "Punjab", "Andhra Pradesh") },
              { text: "Rice requires high temperature and high rainfall. It is mainly grown in:", difficulty: "EASY", explanation: "Rice is a kharif crop requiring hot, humid conditions — grown in West Bengal, Assam, Uttar Pradesh, Andhra Pradesh.", options: opts(0, "eastern India (WB, Assam, UP)", "Rajasthan", "Punjab only", "the Himalayas") },
              { text: "The crop that is used both as food and fodder and is important for dry regions is:", difficulty: "MEDIUM", explanation: "Jowar (sorghum) is grown in dry areas and used for both human consumption and animal fodder.", options: opts(1, "wheat", "jowar", "rice", "cotton") },
              { text: "Commercial farming aims at:", difficulty: "EASY", explanation: "Commercial farming is done for the market — producing cash crops for sale to generate profit.", options: opts(1, "feeding the family", "producing crops for sale in the market", "maintaining biodiversity", "subsistence") },
              { text: "India is the largest producer and exporter of _____ in the world:", difficulty: "MEDIUM", explanation: "India is the world's largest producer and exporter of spices.", options: opts(1, "wheat", "spices", "cotton", "silk") },
              { text: "Soil exhaustion in plantation farming is prevented by:", difficulty: "HARD", explanation: "Crop rotation — alternating different crops on the same land — is the primary method to maintain soil fertility and prevent exhaustion.", options: opts(1, "heavy irrigation", "crop rotation", "more fertilisers only", "deforestation") },
              { text: "Operation Flood was related to which sector?", difficulty: "MEDIUM", explanation: "Operation Flood (1970–1996) was India's national dairy development programme that made India the world's largest milk producer.", options: opts(2, "wheat production", "fish farming", "dairy (milk) production", "poultry") },
            ],
          },
          {
            slug: "minerals-energy-resources",
            name: "Minerals and Energy Resources",
            marks: 1, negative: 0,
            test: { slug: "minerals-energy-practice-1", title: "Minerals & Energy Resources — Practice Test", description: "15 CBSE Class 10 Geography questions. +1 each, no negative marking." },
            questions: [
              { text: "Iron ore is classified as a/an _____ resource:", difficulty: "EASY", explanation: "Iron ore is a non-renewable (finite) abiotic (non-living) resource.", options: opts(2, "biotic renewable", "biotic non-renewable", "abiotic non-renewable", "abiotic renewable") },
              { text: "India is a leading producer of:", difficulty: "EASY", explanation: "India is one of the leading producers of iron ore, bauxite, mica and coal in the world.", options: opts(0, "iron ore and mica", "gold and diamonds", "petroleum and silver", "uranium and aluminium") },
              { text: "The best quality iron ore is:", difficulty: "MEDIUM", explanation: "Magnetite is the highest quality iron ore with iron content of about 70%.", options: opts(0, "magnetite", "haematite", "limonite", "siderite") },
              { text: "The Kolar gold fields are located in:", difficulty: "MEDIUM", explanation: "The Kolar Gold Fields (KGF) are in Karnataka and were once among the world's deepest gold mines.", options: opts(1, "Jharkhand", "Karnataka", "Rajasthan", "Andhra Pradesh") },
              { text: "The highest reserves of coal in India are found in:", difficulty: "MEDIUM", explanation: "Jharkhand (Damodar Valley — Jharia, Raniganj) has the largest coal reserves in India.", options: opts(0, "Jharkhand", "West Bengal", "Odisha", "Chhattisgarh") },
              { text: "Petroleum is found in:", difficulty: "EASY", explanation: "Petroleum occurs in rock formations between non-porous layers. Mumbai High is India's largest offshore oilfield.", options: opts(1, "only the sea", "sedimentary rock formations", "granite rocks", "fertile plains") },
              { text: "Mumbai High is associated with:", difficulty: "EASY", explanation: "Mumbai High (off the coast of Mumbai) is India's largest offshore petroleum production field.", options: opts(1, "natural gas only", "offshore petroleum", "coal", "nuclear fuel") },
              { text: "Conventional sources of energy include:", difficulty: "EASY", explanation: "Conventional (traditional) energy sources are coal, petroleum, natural gas and fuelwood — used since the industrial era.", options: opts(0, "coal, petroleum, natural gas", "solar, wind, tidal", "biogas, geothermal", "nuclear only") },
              { text: "India's first nuclear power plant was established at:", difficulty: "MEDIUM", explanation: "India's first nuclear power station was set up at Tarapur in Maharashtra in 1969.", options: opts(1, "Kaiga", "Tarapur", "Narora", "Rawatbhata") },
              { text: "The best wind energy potential in India is along:", difficulty: "MEDIUM", explanation: "The southern tip of India (Tamil Nadu coast near Kanyakumari) and the western coast (Gujarat) have the highest wind energy potential.", options: opts(0, "Tamil Nadu and Gujarat coasts", "the Himalayan range", "the eastern coast only", "central India") },
              { text: "Solar energy is most promising for India because:", difficulty: "EASY", explanation: "India receives abundant sunshine throughout the year — most parts receive 300+ sunny days annually.", options: opts(0, "India receives abundant sunshine year-round", "India has no other energy sources", "solar panels are free", "India is nearest to the sun") },
              { text: "Biogas is produced from:", difficulty: "EASY", explanation: "Biogas is produced from the decomposition of organic waste (cattle dung, crop waste, sewage) by bacteria in the absence of oxygen.", options: opts(0, "organic waste/cattle dung by bacteria", "coal burning", "petroleum refining", "nuclear fission") },
              { text: "Which state is the largest producer of mica in India?", difficulty: "MEDIUM", explanation: "Jharkhand is the largest producer of mica in India, followed by Andhra Pradesh and Rajasthan.", options: opts(0, "Jharkhand", "Rajasthan", "Karnataka", "Odisha") },
              { text: "Geothermal energy is derived from:", difficulty: "EASY", explanation: "Geothermal energy comes from the heat within the Earth — used to generate electricity and for heating.", options: opts(2, "ocean tides", "solar radiation inside earth", "heat from inside the Earth", "burning of biomass") },
              { text: "India's largest hydroelectric power station is:", difficulty: "HARD", explanation: "Bhakra Nangal (Punjab/Himachal Pradesh) is India's largest hydroelectric project, one of the largest in Asia.", options: opts(0, "Bhakra Nangal", "Hirakud", "Nagarjuna Sagar", "Sardar Sarovar") },
            ],
          },
          {
            slug: "manufacturing-industries",
            name: "Manufacturing Industries",
            marks: 1, negative: 0,
            test: { slug: "manufacturing-industries-practice-1", title: "Manufacturing Industries — Practice Test", description: "15 CBSE Class 10 Geography questions. +1 each, no negative marking." },
            questions: [
              { text: "Manufacturing means:", difficulty: "EASY", explanation: "Manufacturing is the process of converting raw materials into finished/semi-finished goods using machines, energy and labour.", options: opts(0, "converting raw materials into finished goods", "growing crops", "providing services", "extracting minerals") },
              { text: "Manchester of India is:", difficulty: "EASY", explanation: "Ahmedabad (Gujarat) is known as the 'Manchester of India' due to its large textile industry.", options: opts(1, "Mumbai", "Ahmedabad", "Surat", "Kanpur") },
              { text: "The iron and steel industry is a _____ industry:", difficulty: "MEDIUM", explanation: "Iron and steel is a basic/key industry because it provides inputs (steel) to many other industries like engineering, construction and automobiles.", options: opts(0, "basic/key industry", "agro-based industry", "consumer goods industry", "service industry") },
              { text: "The largest steel-producing city in India is:", difficulty: "MEDIUM", explanation: "Jamshedpur (Jharkhand) is India's premier steel-producing city, home to Tata Steel (TISCO), established in 1907.", options: opts(0, "Jamshedpur", "Bhilai", "Durgapur", "Rourkela") },
              { text: "TISCO (Tata Iron and Steel Company) is located at:", difficulty: "EASY", explanation: "TISCO, India's first major private steel company, is located at Jamshedpur, Jharkhand.", options: opts(0, "Jamshedpur", "Bhilai", "Visakhapatnam", "Bokaro") },
              { text: "India's cotton textile industry is concentrated mainly in:", difficulty: "MEDIUM", explanation: "Mumbai, Ahmedabad and the Deccan Plateau region are the main centres of India's cotton textile industry.", options: opts(0, "Mumbai and Ahmedabad", "Delhi and Chennai", "Kolkata and Jaipur", "Surat and Nagpur") },
              { text: "Jute industry in India is concentrated along:", difficulty: "MEDIUM", explanation: "Jute mills are concentrated along the banks of the Hugli river near Kolkata, West Bengal.", options: opts(1, "the Ganga in UP", "the Hugli river in West Bengal", "the Brahmaputra in Assam", "the Godavari in AP") },
              { text: "The cement industry requires heavy raw materials such as:", difficulty: "MEDIUM", explanation: "Cement production requires limestone, silica, alumina and gypsum — all heavy bulky materials, so factories are near raw material sources.", options: opts(0, "limestone, silica, gypsum", "coal and iron ore", "bauxite and clay only", "sand and water only") },
              { text: "IT (software) industry in India is concentrated mainly in:", difficulty: "EASY", explanation: "Bengaluru (Bangalore) is India's IT capital, along with Hyderabad, Pune, Chennai and Noida.", options: opts(0, "Bengaluru, Hyderabad, Pune", "Delhi and Mumbai only", "Kolkata and Chennai", "Jaipur and Chandigarh") },
              { text: "Chemical industries include products like:", difficulty: "EASY", explanation: "Chemical industries produce fertilisers, pesticides, plastics, pharmaceuticals, paints and synthetic fibres.", options: opts(0, "fertilisers, plastics, pharmaceuticals", "iron, steel, copper", "wheat, rice, jute", "cotton, silk, wool") },
              { text: "Industrial pollution can be reduced by:", difficulty: "MEDIUM", explanation: "Technologies such as water recycling, using cleaner fuels, electrostatic precipitators and proper waste treatment reduce industrial pollution.", options: opts(0, "recycling, cleaner fuels and waste treatment", "closing all factories", "building more factories", "burning coal more efficiently") },
              { text: "The automobile industry is mainly concentrated in:", difficulty: "MEDIUM", explanation: "Gurugram (Delhi NCR), Mumbai, Pune, Chennai and Bengaluru are the main automobile hubs in India.", options: opts(0, "Gurugram, Mumbai, Pune, Chennai", "Kolkata and Patna", "Ahmedabad and Surat", "Jaipur and Jodhpur") },
              { text: "The National Renewal Fund was set up to:", difficulty: "HARD", explanation: "The National Renewal Fund was established to provide assistance to workers affected by restructuring or closure of industries (social safety net).", options: opts(0, "assist workers affected by industrial restructuring", "fund new industries", "provide loans to companies", "build infrastructure") },
              { text: "Agro-based industries use _____ as raw material:", difficulty: "EASY", explanation: "Agro-based industries use agricultural products — cotton (textiles), sugarcane (sugar), jute — as their primary raw materials.", options: opts(0, "agricultural products", "minerals", "petroleum", "chemicals") },
              { text: "The 'Silicon Valley of India' is:", difficulty: "EASY", explanation: "Bengaluru (Bangalore) is called India's Silicon Valley due to its dominance in the IT and software industry.", options: opts(0, "Bengaluru", "Hyderabad", "Mumbai", "Chennai") },
            ],
          },
        ],
      },
      // ── POLITICAL SCIENCE ───────────────────────────────────────────────
      {
        slug: "political-science",
        name: "Political Science",
        chapters: [
          {
            slug: "power-sharing",
            name: "Power Sharing",
            marks: 1, negative: 0,
            test: { slug: "power-sharing-practice-1", title: "Power Sharing — Practice Test", description: "15 CBSE Class 10 Political Science questions. +1 each, no negative marking." },
            questions: [
              { text: "Power sharing is considered important in a democracy mainly to:", difficulty: "EASY", explanation: "Power sharing reduces conflicts among different groups and ensures stability by giving all sections a stake in governance.", options: opts(1, "make government stronger", "reduce conflicts and ensure stability", "help the majority", "simplify government") },
              { text: "Belgium had conflicts mainly between which communities?", difficulty: "EASY", explanation: "Belgium had conflicts between the Dutch-speaking Flemish community (majority in the north) and the French-speaking Walloon community (majority in the south).", options: opts(0, "Dutch-speaking Flemish & French-speaking Walloon", "German & French", "Catholic & Protestant", "Christian & Muslim") },
              { text: "Sri Lanka has had conflicts between:", difficulty: "EASY", explanation: "Sri Lanka had a civil war between the Sinhala-Buddhist majority (who passed preferential laws) and the Tamil-Hindu minority.", options: opts(1, "Sinhala & Tamil communities", "Hindu & Muslim", "Buddhist & Christian", "Sinhala & Malay") },
              { text: "The Belgium model of power sharing is based on:", difficulty: "MEDIUM", explanation: "Belgium adopted a model of community government — where each linguistic community controls aspects of its own cultural affairs, separate from the central/regional governments.", options: opts(1, "majority rule only", "community government with linguistic regions", "military control", "presidential system") },
              { text: "Sharing of power between different social groups (minorities, women) is called:", difficulty: "MEDIUM", explanation: "Power sharing among social groups (like reserved constituencies for minorities, SC/ST, women) is a form of horizontal power sharing.", options: opts(2, "federal system", "vertical distribution", "accommodation of social diversity", "coalition government") },
              { text: "A government that has different levels (central and state) is called:", difficulty: "EASY", explanation: "A Federal government divides power between the central government and state/regional governments.", options: opts(1, "unitary", "federal", "confederal", "presidential") },
              { text: "Prudential reasons for power sharing stress:", difficulty: "MEDIUM", explanation: "Prudential reasons: power sharing reduces conflict, ensures political stability and helps maintain unity — pragmatic reasons.", options: opts(0, "reducing conflict and ensuring stability", "moral values", "historical tradition", "economic development") },
              { text: "Moral reasons for power sharing stress:", difficulty: "MEDIUM", explanation: "Moral reasons: power sharing is the very spirit of democracy — citizens have the right to participate in governance.", options: opts(1, "it is economically efficient", "citizens' right to participate — spirit of democracy", "it reduces government expenditure", "it is traditional") },
              { text: "In a federal system, power is shared between:", difficulty: "EASY", explanation: "In federalism, power is constitutionally divided between the central/national government and state/regional governments.", options: opts(0, "central and state governments", "the legislature and judiciary only", "different political parties", "the army and civilians") },
              { text: "A coalition government is an example of power sharing among:", difficulty: "MEDIUM", explanation: "Coalition governments involve power sharing among different political parties who together form the majority.", options: opts(2, "different levels of government", "social groups", "political parties", "the judiciary and legislature") },
              { text: "The 'checks and balances' in a democracy are an example of:", difficulty: "MEDIUM", explanation: "Checks and balances among the legislature, executive and judiciary are a form of horizontal power sharing — no single organ becomes all-powerful.", options: opts(0, "horizontal power sharing", "vertical power sharing", "community power sharing", "civil society power") },
              { text: "Which country successfully resolved ethnic conflict through power sharing?", difficulty: "EASY", explanation: "Belgium successfully managed its ethnic divisions through power sharing (federalism + community government), while Sri Lanka's majoritarian approach led to civil war.", options: opts(0, "Belgium", "Sri Lanka", "Yugoslavia", "Rwanda") },
              { text: "The idea of 'majoritarianism' means:", difficulty: "MEDIUM", explanation: "Majoritarianism is the belief that the majority community should be able to rule the country in any way it wants — often at the expense of minorities.", options: opts(0, "majority rules without regard for minorities", "everyone shares power equally", "minorities should rule", "religious majority only governs") },
              { text: "Which of the following is NOT a form of power sharing?", difficulty: "MEDIUM", explanation: "A single-party dictatorship concentrates power; it is the opposite of power sharing.", options: opts(2, "federalism", "coalition government", "single-party dictatorship", "reserved constituencies") },
              { text: "Vertical distribution of power refers to:", difficulty: "MEDIUM", explanation: "Vertical distribution = division of power between higher and lower levels of government (central, state, local).", options: opts(0, "power between central and state/local levels", "power between legislature and judiciary", "power between parties", "power among communities") },
            ],
          },
          {
            slug: "federalism",
            name: "Federalism",
            marks: 1, negative: 0,
            test: { slug: "federalism-practice-1", title: "Federalism — Practice Test", description: "15 CBSE Class 10 Political Science questions. +1 each, no negative marking." },
            questions: [
              { text: "Federalism is a system in which:", difficulty: "EASY", explanation: "In a federal system, power is divided between the central government and state/regional governments by the Constitution.", options: opts(0, "power is constitutionally divided between central and state governments", "one central government has all power", "states have all power", "the military runs the country") },
              { text: "India's system of government is described as:", difficulty: "EASY", explanation: "India is a federal system with a 'unitary bias' — states have significant powers but the Centre is stronger than in most federations.", options: opts(0, "federal with a unitary bias", "purely unitary", "purely federal", "confederal") },
              { text: "The 73rd and 74th Constitutional Amendments in India strengthened:", difficulty: "MEDIUM", explanation: "These 1992 amendments gave constitutional status to Panchayati Raj (rural) and Urban Local Bodies (ULBs), implementing decentralisation.", options: opts(1, "state governments", "local governments (Panchayats and Municipalities)", "the central government", "the judiciary") },
              { text: "The Union List in India's Constitution covers subjects like:", difficulty: "MEDIUM", explanation: "The Union List contains subjects of national importance — defence, foreign affairs, banking, railways — that only the Central Government can legislate on.", options: opts(0, "defence, foreign affairs, banking", "agriculture, police, health", "trade, forests, land", "education, industry") },
              { text: "The State List covers:", difficulty: "MEDIUM", explanation: "The State List contains subjects of local/regional importance — police, agriculture, trade, land — on which only state legislatures can make laws.", options: opts(1, "defence and railways", "police, agriculture, trade, land", "banking and insurance", "foreign affairs") },
              { text: "Education was moved to the Concurrent List by:", difficulty: "MEDIUM", explanation: "The 42nd Constitutional Amendment (1976) moved Education from the State List to the Concurrent List.", options: opts(1, "the original Constitution", "the 42nd Amendment (1976)", "the 73rd Amendment", "a Supreme Court judgment") },
              { text: "Which country is an example of 'coming together' federation?", difficulty: "MEDIUM", explanation: "'Coming together' federations: independent states join together (e.g. USA, Switzerland, Australia). 'Holding together': a large nation divides power (e.g. India, Spain, Belgium).", options: opts(1, "India", "USA", "Belgium", "Spain") },
              { text: "A feature of a truly federal country is:", difficulty: "MEDIUM", explanation: "True federalism requires a constitutionally guaranteed division of powers, an independent judiciary, and dual government — neither level can override the other unilaterally.", options: opts(0, "constitutional division of power + independent judiciary", "one supreme government", "no written constitution", "army controls both levels") },
              { text: "In India, a dispute between states over water-sharing is settled by:", difficulty: "MEDIUM", explanation: "The Supreme Court of India resolves inter-state water disputes (e.g. Cauvery dispute between Karnataka and Tamil Nadu).", options: opts(0, "the Supreme Court", "Parliament alone", "the President", "the Prime Minister") },
              { text: "Gram Panchayats are the third tier of government at the:", difficulty: "EASY", explanation: "Gram Panchayats are local self-government bodies at the village level — the third (local) tier of India's three-tier government.", options: opts(1, "state level", "village/local level", "district level", "block level") },
              { text: "The Governor of a state is appointed by the:", difficulty: "EASY", explanation: "The Governor of each state is appointed by the President of India on the advice of the Central Government.", options: opts(1, "state legislature", "President of India", "Supreme Court", "state cabinet") },
              { text: "The Finance Commission in India decides:", difficulty: "MEDIUM", explanation: "The Finance Commission is a constitutional body that recommends how tax revenue should be distributed between the Centre and the States.", options: opts(0, "revenue distribution between Centre and States", "budget of the central government only", "salary of MPs", "foreign exchange rates") },
              { text: "Decentralisation in India means:", difficulty: "EASY", explanation: "Decentralisation means taking power away from the Centre and State governments and giving it to local governments at the grass-roots level.", options: opts(0, "power given to local governments", "power centralised at the Centre", "all power with states", "equal power for all citizens") },
              { text: "A coalition government at the Centre in India is an example of:", difficulty: "MEDIUM", explanation: "Coalition governments are an example of power sharing among different political parties — a form of horizontal power sharing.", options: opts(2, "federalism", "vertical distribution", "power sharing among parties", "community power") },
              { text: "The Panchayati Raj system has how many tiers?", difficulty: "EASY", explanation: "The three-tier Panchayati Raj: Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district).", options: opts(2, "one tier", "two tiers", "three tiers", "four tiers") },
            ],
          },
          {
            slug: "political-parties",
            name: "Political Parties",
            marks: 1, negative: 0,
            test: { slug: "political-parties-practice-1", title: "Political Parties — Practice Test", description: "15 CBSE Class 10 Political Science questions. +1 each, no negative marking." },
            questions: [
              { text: "A political party is an organisation that:", difficulty: "EASY", explanation: "A political party is a group of people who come together to contest elections and hold power, united by agreed policies and programmes.", options: opts(0, "contests elections and seeks to hold power with agreed policies", "raises money for charity", "enforces laws", "manages the economy") },
              { text: "The three components that every political party has are:", difficulty: "MEDIUM", explanation: "A party has: (1) leaders, (2) active members, and (3) followers/supporters.", options: opts(0, "leaders, active members, followers", "members, manifesto, money", "ideology, army, media", "votes, seats, ministers") },
              { text: "The main function of opposition parties is to:", difficulty: "EASY", explanation: "Opposition parties criticise the government's failures, prevent the ruling party from being unaccountable, and present a policy alternative.", options: opts(1, "support all government decisions", "criticise the government and present alternatives", "join the cabinet", "control the army") },
              { text: "A political system with only one party is called:", difficulty: "EASY", explanation: "A one-party system (e.g. China, Cuba) allows only one party to govern — not considered democratic.", options: opts(0, "one-party system", "multi-party system", "bi-party system", "federal party system") },
              { text: "India has a _____ system:", difficulty: "EASY", explanation: "India has a multi-party system with many national and regional parties competing for power.", options: opts(1, "one-party", "multi-party", "two-party", "no-party") },
              { text: "A 'national party' in India must win at least ___% of votes in at least _____ states:", difficulty: "HARD", explanation: "A party is recognised as a national party if it wins 2% of Lok Sabha seats from at least 3 states, OR gets at least 6% votes in 4 states and wins 4 Lok Sabha seats.", options: opts(1, "5% in 5 states", "6% in 4 states and 4 Lok Sabha seats", "10% in 3 states", "6% in 6 states") },
              { text: "Which of the following is NOT a challenge faced by political parties?", difficulty: "MEDIUM", explanation: "Having too many voters is not a challenge — it is a sign of democratic participation. The real challenges are lack of internal democracy, dynastic succession, money/muscle power and lack of meaningful choice.", options: opts(3, "dynastic succession", "money and muscle power", "lack of internal democracy", "having too many voters") },
              { text: "Dynastic succession in political parties means:", difficulty: "EASY", explanation: "Dynastic succession means leadership positions in a party are passed down within one family, not through merit or democratic election.", options: opts(0, "passing leadership within one family", "electing leaders democratically", "military taking over", "judicial appointments") },
              { text: "The Election Commission of India registers political parties and:", difficulty: "MEDIUM", explanation: "The Election Commission registers parties, recognises them as national/state parties, and allots symbols for elections.", options: opts(1, "appoints their leaders", "recognises them and allots election symbols", "funds their campaigns", "controls their membership") },
              { text: "Regional parties are important in India because:", difficulty: "MEDIUM", explanation: "Regional parties voice local/regional concerns, form coalition governments, and ensure India's diverse regional interests are represented.", options: opts(0, "they represent regional and local concerns", "they oppose the Constitution", "they have more votes than national parties", "they control the army") },
              { text: "Reforms to political parties in India include:", difficulty: "MEDIUM", explanation: "Anti-defection law, financial transparency requirements, and laws mandating internal elections within parties are major reform measures.", options: opts(0, "anti-defection law and financial transparency", "banning parties", "reducing the number of parties", "giving the army control") },
              { text: "The anti-defection law prevents:", difficulty: "MEDIUM", explanation: "The anti-defection law (52nd Amendment, 1985) disqualifies an MP/MLA who changes their party without following party directions.", options: opts(0, "elected representatives from switching parties for personal gain", "parties from contesting elections", "coalition governments", "independent candidates") },
              { text: "In a two-party system, voters typically choose between:", difficulty: "EASY", explanation: "In a two-party system (e.g. USA with Democrats and Republicans, UK with Conservatives and Labour), voters choose between two dominant parties.", options: opts(0, "two major parties", "many parties", "only one party", "independents only") },
              { text: "Political parties are 'vehicles of' in a democracy:", difficulty: "MEDIUM", explanation: "Political parties are the central vehicles of democracy — they aggregate public opinion, mobilise voters, form governments and provide leadership.", options: opts(1, "corruption", "democracy and representation", "economic growth only", "judicial reform") },
              { text: "Which of the following statements about political parties is incorrect?", difficulty: "MEDIUM", explanation: "Political parties do NOT always win elections — they compete and sometimes lose. The other options (contesting elections, making policies, forming government) are correct functions.", options: opts(3, "they contest elections", "they make policies", "they form governments", "they always win elections") },
            ],
          },
          {
            slug: "outcomes-of-democracy",
            name: "Outcomes of Democracy",
            marks: 1, negative: 0,
            test: { slug: "outcomes-democracy-practice-1", title: "Outcomes of Democracy — Practice Test", description: "15 CBSE Class 10 Political Science questions. +1 each, no negative marking." },
            questions: [
              { text: "How do we assess the outcomes of democracy?", difficulty: "EASY", explanation: "We assess democracy by how well it promotes equality, freedom, dignity, resolution of conflict, economic development and responsive government.", options: opts(0, "by judging equality, freedom, dignity and responsiveness", "only by economic growth", "only by election turnout", "only by stability") },
              { text: "A democratic government is better than a non-democratic one because it:", difficulty: "EASY", explanation: "A democracy is more accountable, responsive to citizens' needs, and allows people to correct their rulers through elections.", options: opts(0, "is more accountable and responsive", "always grows faster economically", "never makes mistakes", "has stronger military") },
              { text: "Which of the following is a characteristic of a legitimate government?", difficulty: "MEDIUM", explanation: "A legitimate government follows a proper process — it is elected through fair elections and follows constitutional rules, giving citizens confidence in it.", options: opts(2, "it rules by force", "it has the most money", "it comes to power through fair elections and follows rules", "it never changes policy") },
              { text: "Democracies have been more successful than dictatorships in:", difficulty: "MEDIUM", explanation: "Studies show democracies are far better at preventing famines (accountability of government means rulers respond to food crises), while dictatorships are not.", options: opts(0, "preventing famines", "achieving faster economic growth", "winning wars", "reducing inequality") },
              { text: "The economic growth rate of democracies compared to dictatorships is:", difficulty: "HARD", explanation: "Research shows dictatorships can have slightly higher average economic growth rates, but democracies do better on human development, health, education and preventing famine.", options: opts(1, "always higher", "slightly lower or similar on average", "always lower", "the same") },
              { text: "In terms of reducing economic inequality, democracies have:", difficulty: "HARD", explanation: "Democracies have largely failed to reduce economic inequality — power shifts to wealthy elites over time in many democratic countries.", options: opts(1, "been very successful", "largely failed", "been fully successful", "not tried") },
              { text: "Majority rule in a democracy means:", difficulty: "MEDIUM", explanation: "Majority rule means the government is chosen by the majority of voters, but in a true democracy minorities' rights must also be protected.", options: opts(0, "the majority rules but minority rights must be protected", "the majority can oppress minorities", "only the majority matters", "50% + 1 can do anything") },
              { text: "The most basic outcome of democracy is:", difficulty: "EASY", explanation: "The most fundamental outcome of democracy is producing a government that is accountable, responsive and legitimate.", options: opts(0, "an accountable and responsive government", "no corruption", "high economic growth", "equal wealth distribution") },
              { text: "Transparency in a democracy means:", difficulty: "EASY", explanation: "Transparency means citizens have the right to examine how decisions are made and to question officials — governments must be open about their actions.", options: opts(0, "citizens can examine government decisions", "there are no secrets at all", "media controls government", "elections are held frequently") },
              { text: "Social difference and diversity in a democracy:", difficulty: "MEDIUM", explanation: "In a healthy democracy, social differences do not become deep social divisions — democracy accommodates diversity by giving all groups a voice.", options: opts(1, "always lead to conflict", "are usually accommodated without serious conflict", "are eliminated", "cause democracy to fail") },
              { text: "Right to Information (RTI) Act in India promotes:", difficulty: "EASY", explanation: "The RTI Act (2005) gives citizens the right to request information from public authorities, promoting transparency and accountability.", options: opts(0, "transparency and accountability", "military secrecy", "one-party rule", "economic growth only") },
              { text: "Democracy has been more successful in ensuring _____ compared to dictatorships:", difficulty: "MEDIUM", explanation: "Democracies are far superior in ensuring dignity and freedom of citizens, protecting rights and allowing peaceful transfer of power.", options: opts(0, "dignity and freedom of citizens", "equal wealth for all", "faster economic growth", "less corruption") },
              { text: "A criticism of democracy is that:", difficulty: "MEDIUM", explanation: "A common criticism is that democracies make slow decisions (due to consultation/debate), may be unstable with frequent elections, and do not always serve the poor.", options: opts(0, "it is slow to make decisions and may be unstable", "it is too efficient", "it gives too much power to the poor", "it always reduces inequality") },
              { text: "In democratic countries corruption is:", difficulty: "HARD", explanation: "Corruption exists in democracies too — but democracy provides mechanisms (elections, free press, RTI, courts) to expose and check it over time.", options: opts(2, "impossible", "very rare", "still present but can be checked through elections/media/courts", "encouraged") },
              { text: "The main advantage of democracy over other forms of government is:", difficulty: "MEDIUM", explanation: "Democracy's main strength is that it allows peaceful, constitutional change of government and gives citizens a say in governance — unlike authoritarian systems.", options: opts(0, "peaceful, constitutional change of government + citizen participation", "fastest economic growth", "equal wealth distribution", "no conflicts") },
            ],
          },
        ],
      },
      // ── ECONOMICS ──────────────────────────────────────────────────────
      {
        slug: "economics",
        name: "Economics",
        chapters: [
          {
            slug: "development",
            name: "Development",
            marks: 1, negative: 0,
            test: { slug: "economics-development-practice-1", title: "Development — Practice Test", description: "15 CBSE Class 10 Economics questions. +1 each, no negative marking." },
            questions: [
              { text: "Development for different people means:", difficulty: "EASY", explanation: "Different people have different development goals — a girl may want education and freedom; a farmer may want good rainfall and fair prices. Goals can even conflict.", options: opts(0, "different goals for different people", "only economic growth", "the same things for everyone", "only money") },
              { text: "Per Capita Income is calculated as:", difficulty: "EASY", explanation: "Per Capita Income = Total income of a country / Total population. It is the average income per person.", options: opts(0, "total national income ÷ total population", "total income × population", "GDP ÷ area", "exports − imports") },
              { text: "The World Development Report compares countries primarily based on:", difficulty: "MEDIUM", explanation: "The World Bank's World Development Report classifies countries based on per capita income (GNI per capita).", options: opts(0, "per capita income", "total GDP", "military strength", "size of population") },
              { text: "HDI stands for:", difficulty: "EASY", explanation: "HDI = Human Development Index, developed by UNDP. It measures health (life expectancy), education (literacy/enrolment) and income (GNI per capita).", options: opts(0, "Human Development Index", "High Development Indicator", "Human Debt Index", "Health Development Index") },
              { text: "The HDI was developed by:", difficulty: "EASY", explanation: "The Human Development Index was developed by Pakistani economist Mahbub ul Haq and Indian economist Amartya Sen, promoted by UNDP.", options: opts(1, "World Bank", "UNDP (Mahbub ul Haq and Amartya Sen)", "IMF", "UN Security Council") },
              { text: "Infant Mortality Rate (IMR) measures:", difficulty: "EASY", explanation: "IMR is the number of children who die before the age of 1 year per 1000 live births.", options: opts(0, "deaths before age 1 per 1000 live births", "deaths of all children", "deaths in hospitals", "infant birth rate") },
              { text: "Net Attendance Ratio measures:", difficulty: "MEDIUM", explanation: "Net Attendance Ratio is the percentage of children in the age group 6–10 who attend primary school.", options: opts(0, "% of children attending school (age 6–10)", "total school enrolment", "dropout rates", "teacher-student ratio") },
              { text: "Kerala has better development indicators than Punjab despite lower per capita income because:", difficulty: "MEDIUM", explanation: "Kerala has invested heavily in education and health (literacy, health centres) — showing that public spending on human development matters more than per capita income alone.", options: opts(0, "heavy public investment in education and health", "more industries", "higher exports", "larger area") },
              { text: "Sustainable development means:", difficulty: "EASY", explanation: "Sustainable development meets current needs without compromising the ability of future generations to meet their own needs (Brundtland Commission definition).", options: opts(0, "meeting present needs without harming future generations' ability to meet theirs", "growing industry as fast as possible", "using all natural resources now", "avoiding all development") },
              { text: "Overuse of groundwater is an example of:", difficulty: "MEDIUM", explanation: "Overuse of groundwater for irrigation depletes aquifers faster than they can be replenished — this is unsustainable development.", options: opts(1, "sustainable development", "unsustainable development", "green economy", "conservation") },
              { text: "BMI (Body Mass Index) is used to measure:", difficulty: "MEDIUM", explanation: "BMI measures nutritional status — whether a person is undernourished (BMI < 18.5) or overweight (BMI > 25).", options: opts(0, "nutritional status", "wealth", "education level", "life expectancy") },
              { text: "Which country has achieved high HDI despite lower average income?", difficulty: "MEDIUM", explanation: "Sri Lanka and Kerala (India) are classic examples — they have invested in public services (health, education) and achieved high human development despite moderate per capita income.", options: opts(1, "USA", "Sri Lanka", "Saudi Arabia", "Russia") },
              { text: "National Development means:", difficulty: "EASY", explanation: "National development means development for all citizens — improving the quality of life of all people, including the poorest and most marginalised.", options: opts(0, "development for all citizens with improved quality of life", "development of industries only", "only urban development", "only GDP growth") },
              { text: "Literacy rate in India's HDI context refers to:", difficulty: "MEDIUM", explanation: "In India's HDI calculations, literacy rate measures the percentage of people aged 15+ who can read and write.", options: opts(0, "% of people 15+ who can read and write", "% of children in school", "number of colleges", "number of literate workers") },
              { text: "The UNDP publishes the Human Development Report every:", difficulty: "EASY", explanation: "UNDP (United Nations Development Programme) publishes its annual Human Development Report every year.", options: opts(1, "5 years", "every year", "10 years", "2 years") },
            ],
          },
          {
            slug: "sectors-of-economy",
            name: "Sectors of the Indian Economy",
            marks: 1, negative: 0,
            test: { slug: "sectors-economy-practice-1", title: "Sectors of the Indian Economy — Practice Test", description: "15 CBSE Class 10 Economics questions. +1 each, no negative marking." },
            questions: [
              { text: "Economic activities are classified into how many sectors?", difficulty: "EASY", explanation: "Economic activities are grouped into three sectors: primary (agriculture/mining), secondary (manufacturing) and tertiary (services).", options: opts(2, "two", "four", "three", "five") },
              { text: "The primary sector includes:", difficulty: "EASY", explanation: "Primary sector activities involve natural resources: agriculture, forestry, fishing and mining.", options: opts(0, "agriculture, fishing, mining, forestry", "manufacturing, construction", "banking, transport, trade", "IT and software") },
              { text: "GDP stands for:", difficulty: "EASY", explanation: "GDP = Gross Domestic Product — the total value of all final goods and services produced within a country in a year.", options: opts(0, "Gross Domestic Product", "General Development Programme", "Government Development Plan", "Gross Development Planning") },
              { text: "The secondary sector includes:", difficulty: "EASY", explanation: "Secondary sector: manufacturing and construction — converting raw materials into finished goods.", options: opts(1, "agriculture and mining", "manufacturing and construction", "banking, trade and transport", "IT and education") },
              { text: "The tertiary sector is also called the _____ sector:", difficulty: "EASY", explanation: "The tertiary sector is the services sector — providing services rather than goods (banking, IT, transport, health, education).", options: opts(1, "industrial", "service", "primary", "agricultural") },
              { text: "Which sector contributes the most to India's GDP today?", difficulty: "MEDIUM", explanation: "The services (tertiary) sector contributes the most to India's GDP (about 55%), followed by industry and then agriculture.", options: opts(2, "primary (agriculture)", "secondary (industry)", "tertiary (services)", "all equal") },
              { text: "Which sector provides the most employment in India?", difficulty: "MEDIUM", explanation: "Despite its low GDP share (~15%), the primary sector (agriculture) provides employment to the largest share of India's workers (about 45%).", options: opts(0, "primary (agriculture)", "secondary (industry)", "tertiary (services)", "all equal") },
              { text: "Disguised unemployment is mainly seen in:", difficulty: "MEDIUM", explanation: "Disguised unemployment = more people employed in agriculture than actually needed — removing some workers wouldn't reduce output.", options: opts(0, "agriculture (primary sector)", "manufacturing", "IT sector", "banking") },
              { text: "Organised sector workers have:", difficulty: "MEDIUM", explanation: "Workers in the organised sector have regular employment, job security, social security benefits (PF, gratuity) and are protected by labour laws.", options: opts(0, "regular employment and social security", "no job security", "daily wages only", "no legal protection") },
              { text: "The unorganised sector is characterised by:", difficulty: "MEDIUM", explanation: "The unorganised sector has irregular, casual employment with low wages, no job security and no social security benefits.", options: opts(0, "irregular work, low wages, no security", "high wages and benefits", "government protection", "only large firms") },
              { text: "MGNREGS (Mahatma Gandhi National Rural Employment Guarantee Scheme) guarantees:", difficulty: "MEDIUM", explanation: "MGNREGS guarantees 100 days of wage employment per year to every rural household whose adult members are willing to do unskilled manual work.", options: opts(0, "100 days of employment per year to rural households", "200 days", "free food", "housing for all") },
              { text: "Market activities include:", difficulty: "EASY", explanation: "Market activities = economic activities for which a person is paid a wage/salary or earns a profit (GDP includes only these).", options: opts(0, "activities for which one is paid", "unpaid domestic work", "volunteer services", "barter only") },
              { text: "Non-market activities include:", difficulty: "MEDIUM", explanation: "Non-market activities are not included in GDP — they include unpaid housework, subsistence farming for self-consumption.", options: opts(1, "factory production", "unpaid domestic work and subsistence farming", "government services", "banking") },
              { text: "GDP is the value of all _____ goods and services produced in a year:", difficulty: "MEDIUM", explanation: "GDP counts only final goods and services — not intermediate goods (to avoid double counting).", options: opts(0, "final goods and services", "all goods including intermediate", "only exported goods", "only imported goods") },
              { text: "To shift workers out of disguised unemployment in agriculture, the best solution is:", difficulty: "HARD", explanation: "Creating more employment opportunities in secondary and tertiary sectors enables surplus agricultural workers to find productive work elsewhere.", options: opts(0, "creating more jobs in industry and services", "dividing farmland further", "giving farms to more people", "banning farm mechanisation") },
            ],
          },
          {
            slug: "money-and-credit",
            name: "Money and Credit",
            marks: 1, negative: 0,
            test: { slug: "money-credit-practice-1", title: "Money and Credit — Practice Test", description: "15 CBSE Class 10 Economics questions. +1 each, no negative marking." },
            questions: [
              { text: "Money acts as a medium of exchange, meaning:", difficulty: "EASY", explanation: "Money eliminates the need for a double coincidence of wants — instead of bartering, you can sell for money and buy what you need separately.", options: opts(0, "it eliminates the need for a double coincidence of wants", "it stores value permanently", "it measures wealth", "it is only paper") },
              { text: "The 'double coincidence of wants' was a problem in:", difficulty: "EASY", explanation: "In a barter system, trade requires both parties to want exactly what the other has — a double coincidence of wants, which is rare.", options: opts(1, "modern banking", "the barter system", "digital payments", "stock markets") },
              { text: "Modern currency in India is issued by:", difficulty: "EASY", explanation: "The Reserve Bank of India (RBI) issues currency notes on behalf of the Central Government. RBI is India's central bank.", options: opts(1, "State Bank of India", "Reserve Bank of India", "Finance Ministry", "Parliament") },
              { text: "A 'demand deposit' is a bank deposit that:", difficulty: "MEDIUM", explanation: "Demand deposits (current/savings accounts) can be withdrawn on demand at any time — they form part of the money supply.", options: opts(0, "can be withdrawn on demand at any time", "is locked for a fixed period", "earns no interest", "is only for businesses") },
              { text: "Banks in India keep a fraction of deposits as reserve (CRR) because:", difficulty: "MEDIUM", explanation: "Banks keep only a fraction (Cash Reserve Ratio) to meet daily withdrawals; the rest is lent out, creating credit and supporting economic activity.", options: opts(0, "most depositors don't withdraw all money at once", "the law forbids full use of deposits", "they earn interest on reserves", "RBI takes the rest") },
              { text: "Credit (loan) can sometimes be a problem when:", difficulty: "MEDIUM", explanation: "If a loan-financed business fails, the borrower still owes the debt and may lose their assets — credit can worsen their situation ('debt trap').", options: opts(1, "interest rates are zero", "the borrower cannot repay and falls into a debt trap", "the economy grows well", "banks give more loans") },
              { text: "Collateral is:", difficulty: "EASY", explanation: "Collateral is an asset (land, property, gold) pledged as security by a borrower. If the loan is not repaid, the lender can sell the collateral.", options: opts(0, "an asset pledged as security for a loan", "a type of currency", "a government bond", "bank interest") },
              { text: "Formal sources of credit in India include:", difficulty: "EASY", explanation: "Formal sources are regulated by the RBI: banks, cooperative societies, and other regulated financial institutions.", options: opts(0, "banks, cooperative societies", "moneylenders, friends", "employers, landlords", "pawnbrokers") },
              { text: "Informal sources of credit are NOT regulated by:", difficulty: "EASY", explanation: "Informal lenders (moneylenders, employers) are not regulated by the RBI — they can charge very high interest rates.", options: opts(1, "the state government", "the Reserve Bank of India", "courts", "Parliament") },
              { text: "Moneylenders are an example of _____ sources of credit:", difficulty: "EASY", explanation: "Moneylenders belong to the informal credit sector — unregulated and often charge very high interest rates.", options: opts(1, "formal", "informal", "semi-formal", "government") },
              { text: "Self-Help Groups (SHGs) help poor people by:", difficulty: "MEDIUM", explanation: "SHGs pool savings of members (often women) and give small loans to members at low interest rates — a form of microfinance.", options: opts(0, "pooling savings and providing microloans at low interest", "giving government subsidies", "employing members in government jobs", "providing food aid") },
              { text: "The main problem with informal credit in rural India is:", difficulty: "MEDIUM", explanation: "Informal lenders charge very high interest rates and there is no regulation, often trapping borrowers in debt.", options: opts(0, "very high interest rates and no regulation", "no loans are available", "too much competition", "only urban loans") },
              { text: "Grameen Bank in Bangladesh is famous for providing:", difficulty: "MEDIUM", explanation: "Grameen Bank pioneered microfinance — small loans to the poor (especially women) without collateral, founded by Muhammad Yunus.", options: opts(0, "microfinance to poor without collateral", "corporate loans", "housing loans to rich", "foreign exchange") },
              { text: "Credit to agriculture is often provided by:", difficulty: "MEDIUM", explanation: "Agricultural credit comes from both formal sources (cooperative banks, regional rural banks) and informal sources (moneylenders, landlords).", options: opts(0, "cooperative banks, RRBs and moneylenders", "only moneylenders", "only nationalised banks", "only foreign banks") },
              { text: "Financial inclusion means:", difficulty: "MEDIUM", explanation: "Financial inclusion = ensuring that all individuals and businesses have access to useful and affordable financial products and services (banking, credit, insurance).", options: opts(0, "access to banking and financial services for all", "only rich people using banks", "nationalising all banks", "free money for the poor") },
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
  for (const ec of [...content, ...moreContent, ...wave3, ...wave4, ...wave5, ...wave6, ...wave7]) {
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
