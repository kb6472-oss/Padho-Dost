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
  for (const ec of [...content, ...moreContent, ...wave3, ...wave4]) {
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
