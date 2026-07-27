// Evergreen exam-overview copy for the /exams/[slug] landing pages (SEO + student trust).

export type ExamIntro = {
  examSlug: string;
  heading: string;
  paragraphs: string[];
  pattern: { label: string; value: string }[];
  topics: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
};

export const examIntros: ExamIntro[] = [
  {
    examSlug: "wb-police-constable",
    heading: "West Bengal Police Constable: Exam Pattern, Syllabus & Free Preparation",
    paragraphs: ["The West Bengal Police Constable recruitment is a mass-scale state government exam conducted by the West Bengal Police Recruitment Board (WBPRB), Kolkata, to fill Constable posts in the West Bengal Police force (Kolkata Police constables are recruited separately). It is one of West Bengal's largest and most competitive recruitment drives — the 2024 cycle alone carried 11,749 vacancies against several lakh applicants across the state.", "The exam is open to candidates aged 18–30 who have passed the Madhyamik (Class 10) examination from the West Bengal Board of Secondary Education or an equivalent board, and who can read, write and speak Bengali (permanent residents of the Darjeeling and Kalimpong hill sub-divisions are exempt from the Bengali requirement). Selection runs through several stages: a Preliminary Written Test (screening only), the Physical Measurement Test (PMT) and Physical Efficiency Test (PET), a Final Written Examination that counts toward merit, and finally an Interview/Personality Test. Both written stages are objective MCQ papers with negative marking.", "PadhoDost helps you prepare for every written stage completely free — no fees, no subscriptions. You get free full-length mock tests modelled on the real MCQ pattern, chapter-wise practice sets for General Knowledge, everyday science, elementary mathematics and reasoning, an All-India rank so you can see where you stand against other aspirants, and a dedicated West Bengal General Knowledge bank covering the state's history, geography, culture and current affairs that this exam tests heavily."],
    pattern: [
      {
        label: "Selection stages",
        value: "Preliminary Written Test → PMT → PET → Final Written Examination → Interview"
      },
      {
        label: "Preliminary Written Test",
        value: "100 MCQs, 100 marks, 60 minutes (qualifying/screening only)"
      },
      {
        label: "Final Written Examination",
        value: "85 MCQs, 85 marks, 60 minutes (counts toward final merit)"
      },
      {
        label: "Interview / Personality Test",
        value: "15 marks (final merit = Final Written 85 + Interview 15 = 100)"
      },
      {
        label: "Negative marking",
        value: "1/4 (0.25) mark deducted for each wrong answer in both written papers"
      }
    ],
    topics: ["General Awareness & General Knowledge", "Current Affairs (national and West Bengal state)", "Indian History & the National Movement", "Indian & West Bengal Geography", "Indian Polity & Constitution", "General Science & Everyday Science", "Elementary Mathematics (arithmetic, Madhyamik standard)", "Reasoning & Logical Analysis (analogies, series, coding-decoding)"],
    tips: ["Master the Preliminary and Final Written syllabus together — they share the same topics (GK, maths, reasoning, plus English in the Final), so consistent daily practice pays off in both stages.", "Since negative marking of 0.25 applies, avoid blind guessing; attempt only the questions where you can eliminate at least two options, and build accuracy through timed mock tests.", "West Bengal GK and state current affairs are frequently asked, so give special attention to the state's districts, rivers, festivals, personalities and recent state-level events alongside national affairs.", "Do not skip the physical standards — start running and endurance practice early (male 1600 m in 6 min 30 sec, female 800 m in 4 min) so the PMT/PET stage does not eliminate you after you clear the written test."],
    faqs: [
      {
        q: "Who is eligible for the West Bengal Police Constable exam?",
        a: "Candidates aged 18–30 years (with upper-age relaxation for reserved categories per WB rules) who have passed the Madhyamik (Class 10) examination from the West Bengal Board of Secondary Education or an equivalent board, and who can read, write and speak Bengali (residents of the Darjeeling and Kalimpong hill sub-divisions are exempt from the Bengali requirement)."
      },
      {
        q: "What is the exam pattern for WB Police Constable?",
        a: "There is a Preliminary Written Test (100 MCQs, 100 marks, 60 minutes) used only for screening, followed by the Physical Measurement Test and Physical Efficiency Test, then a Final Written Examination (85 MCQs, 85 marks, 60 minutes) that counts toward merit, and an Interview worth 15 marks. Final merit is out of 100 (85 written + 15 interview)."
      },
      {
        q: "Is there negative marking in the exam?",
        a: "Yes. Both the Preliminary and the Final Written papers deduct 1/4 (0.25) mark for every wrong answer. There is no penalty for questions you leave unanswered, so answer only when you are reasonably confident."
      },
      {
        q: "Is knowledge of Bengali required, and in what language is the exam?",
        a: "Candidates must be able to read, write and speak Bengali, except permanent residents of the hill sub-divisions of Darjeeling and Kalimpong who are exempt. The question papers are provided in the languages specified in the official notification, so always confirm the medium and any language-paper details on the WBPRB notice for your cycle."
      },
      {
        q: "How should I prepare for the WB Police Constable written exam?",
        a: "Cover General Knowledge, current affairs (national and West Bengal), general and everyday science, elementary mathematics at Madhyamik standard, and reasoning. Practise plenty of full-length MCQ mock tests under a 60-minute limit, revise West Bengal GK thoroughly, and prepare physically for the PMT/PET in parallel. PadhoDost's free mock tests and chapter practice cover this entire syllabus."
      },
      {
        q: "Is PadhoDost really free?",
        a: "Yes, PadhoDost is completely free. All mock tests, chapter-wise practice sets, All-India rank and West Bengal GK material for the WB Police Constable exam are available at no cost — there are no fees or subscriptions."
      }
    ]
  },
  {
    examSlug: "wbpsc-clerkship",
    heading: "WBPSC Clerkship: Exam Pattern, Syllabus & Free Preparation",
    paragraphs: ["The WBPSC Clerkship Examination is a state-level recruitment test conducted by the West Bengal Public Service Commission (WBPSC) to fill Lower Division Clerk and equivalent clerical posts across West Bengal government offices. It is one of the state's most-applied government exams, run in irregular cycles (roughly every one to three years rather than on a fixed annual calendar), so aspirants should always confirm the latest dates on the official site, psc.wb.gov.in.", "The Clerkship is open to a wide pool of candidates: the minimum qualification is a Madhyamik (Class 10) pass from WBBSE or an equivalent board, the age range is generally 18 to 40 years (with relaxations for reserved categories), and candidates must be able to read and write Bengali (with an exemption for Nepali-speaking hill candidates). Selection runs across three parts: Part I is an objective (OMR/MCQ) Preliminary test, Part II is a descriptive Final paper in English and a regional language, and Part III is a qualifying typing and basic computer test.", "PadhoDost helps you prepare for the Clerkship completely free. You get full-length mock tests modelled on the real 100-mark objective pattern, chapter-wise practice for Arithmetic and General Studies, an All-India rank so you can benchmark yourself against other aspirants, and dedicated West Bengal General Knowledge sets covering the state's geography, history, culture and current affairs that this exam loves to test."],
    pattern: [
      {
        label: "Selection stages",
        value: "Part I Preliminary (objective/MCQ), Part II Final (descriptive), Part III Typing & Computer test (qualifying)"
      },
      {
        label: "Part I questions",
        value: "100 MCQs — English, Arithmetic and General Studies/General Awareness"
      },
      {
        label: "Part I marks & duration",
        value: "100 marks in 90 minutes"
      },
      {
        label: "Negative marking",
        value: "0.25 mark deducted per wrong MCQ in Part I (verify the exact penalty on the official notification)"
      },
      {
        label: "Part II Final",
        value: "Descriptive — Group A English (50) + Group B regional language (50) = 100 marks in 60 minutes"
      }
    ],
    topics: ["English — grammar, vocabulary, synonyms/antonyms, error correction and comprehension", "Arithmetic — number system, HCF & LCM, percentage, ratio & proportion, average", "Arithmetic — simple & compound interest, profit & loss, time & work, time-speed-distance", "General Studies — current affairs (national and West Bengal)", "General Studies — Indian history and the national movement", "General Studies — Indian and world geography (with West Bengal focus)", "General Studies — Indian polity and the Constitution", "General Studies — general science and everyday science"],
    tips: ["Master Class-10 (Madhyamik) arithmetic first — the maths section is scoring and predictable, so drill percentage, ratio, interest, profit & loss and time-work until they are automatic.", "Because Part I has 0.25 negative marking, avoid blind guessing; attempt only where you can eliminate at least two options, and leave doubtful questions blank.", "Build a strong West Bengal GK base — rivers, districts, festivals, historical sites and famous personalities of the state appear regularly, alongside national current affairs.", "Do not neglect Part II: practise précis, letter-drafting and English-to-Bengali translation, and build typing speed early (around 20 wpm English / 10 wpm Bengali) for the qualifying Part III."],
    faqs: [
      {
        q: "What is the eligibility for the WBPSC Clerkship exam?",
        a: "You need to have passed Madhyamik (Class 10) from WBBSE or an equivalent board, be generally between 18 and 40 years of age (with relaxations for reserved categories such as OBC +3 and SC/ST +5 years), and be able to read and write Bengali."
      },
      {
        q: "What is the exam pattern?",
        a: "There are three parts: Part I is a 100-mark objective (MCQ/OMR) test of 90 minutes covering English, Arithmetic and General Studies; Part II is a 100-mark descriptive paper in English and a regional language; and Part III is a qualifying typing and basic-computer test."
      },
      {
        q: "Is there negative marking?",
        a: "Yes, in the Part I objective paper 0.25 mark is deducted for each wrong answer. The descriptive Part II has no negative marking. Always confirm the exact penalty on the official notification for your cycle."
      },
      {
        q: "Which languages can I choose and is there a language requirement?",
        a: "In Part II you write English (Group A) plus one regional language (Group B) chosen from Bengali, Hindi, Urdu, Nepali or Santali. The exam also requires the ability to read and write Bengali, except for Nepali-speaking candidates from the hill subdivisions."
      },
      {
        q: "How should I prepare for the Clerkship?",
        a: "Focus on Class-10 level Arithmetic and English grammar for quick, reliable scoring, build a solid base in West Bengal and national General Studies, and take regular full-length mock tests to improve speed and accuracy while managing negative marking. Also practise typing early for Part III."
      },
      {
        q: "Is PadhoDost free?",
        a: "Yes, PadhoDost is completely free. All mock tests, chapter-wise practice, West Bengal GK sets and All-India rank features are available at no cost."
      }
    ]
  },
  {
    examSlug: "wbpsc-misc",
    heading: "WBPSC Miscellaneous Services: Exam Pattern, Syllabus & Free Preparation",
    paragraphs: ["The WBPSC Miscellaneous Services Examination is a graduate-level recruitment test conducted by the West Bengal Public Service Commission (WBPSC) to fill Group B and Group C posts in various departments of the Government of West Bengal. It is not held on a strictly fixed annual calendar and is notified when vacancies arise; the most recent cycle (Advertisement 13/2024) advertised 19 posts. It is a state-focused exam that gives strong weight to West Bengal history, geography, economy and current affairs alongside general studies.", "The exam is open to Indian citizens who hold a Bachelor's degree from a recognised university and can read, write and speak Bengali (candidates whose mother tongue is Nepali are exempt from the Bengali requirement). For the 13/2024 cycle the age band was 20-39 years as on 01.01.2024, with statutory relaxations for SC/ST, OBC-NCL and PwBD candidates. Selection runs through three stages: a Preliminary screening test (MCQ, marks not counted in final merit), a descriptive Final/Mains examination of three papers, and a Personality Test / Interview.", "PadhoDost helps you prepare for every stage completely free. You get full-length mock tests that mirror the real 100-question Preliminary pattern, chapter-wise practice for General Studies, Arithmetic and West Bengal GK, an All-India rank so you can benchmark yourself against other aspirants, and a dedicated West Bengal knowledge bank covering the state's history, rivers, districts, festivals and personalities that this exam loves to test."],
    pattern: [
      {
        label: "Stages",
        value: "Preliminary (MCQ, screening) → Final/Mains (descriptive, 3 papers) → Personality Test/Interview"
      },
      {
        label: "Prelims questions",
        value: "100 MCQs — General Studies (75) + Arithmetic (25)"
      },
      {
        label: "Prelims marks & duration",
        value: "200 marks (2 marks per question), 90 minutes"
      },
      {
        label: "Negative marking",
        value: "Yes in Prelims — commonly reported as 1/3 of the marks for a wrong answer; confirm on the official question booklet"
      },
      {
        label: "Mains & Interview",
        value: "Mains 450 marks (3 papers × 150: English, Regional Language, GS & Arithmetic); Interview 100 marks"
      }
    ],
    topics: ["History and Culture of India and West Bengal", "Geography of India and West Bengal", "Indian Polity, Governance and the Constitution", "Indian Economy and economic development", "General Science and Science & Technology", "Environment, Ecology and general awareness", "Current Affairs (national and international)", "Arithmetic at Madhyamik (Class 10) standard"],
    tips: ["Build strong West Bengal general knowledge — history, geography, rivers, districts, festivals and famous personalities carry noticeable weight in this state-run exam.", "Master Madhyamik (Class 10) arithmetic thoroughly; 25 of the 100 Prelims questions come from topics like percentage, ratio, profit & loss, time-work-speed and simple/compound interest.", "Practise with negative marking on, since a wrong answer can cost you a fraction of the marks — learn to skip questions you are genuinely unsure about.", "Do not neglect the descriptive Mains and language paper: build daily reading and précis/composition practice in English and Bengali well before the Prelims result."],
    faqs: [
      {
        q: "Who is eligible for the WBPSC Miscellaneous Services Examination?",
        a: "You need a Bachelor's degree from a recognised university and the ability to read, write and speak Bengali (Nepali mother-tongue candidates are exempt). For the 13/2024 cycle the age band was 20-39 years as on 01.01.2024, with relaxations of +5 years for SC/ST, +3 years for OBC-NCL and up to 45 years for PwBD candidates. Always confirm the exact figures on the current official notification."
      },
      {
        q: "What is the exam pattern and how many stages are there?",
        a: "There are three stages. The Preliminary is a 100-question MCQ paper of 200 marks in 90 minutes (75 General Studies + 25 Arithmetic) and is only a screening test — its marks are not added to the final merit. The Final/Mains has three descriptive papers of 150 marks each (English; Regional Language; General Studies & Arithmetic). Finally there is a 100-mark Personality Test/Interview."
      },
      {
        q: "Is there negative marking?",
        a: "Yes, in the Preliminary examination each wrong answer carries a penalty — commonly reported as one-third of the marks allotted to that question. The exact penalty is printed on the question booklet, so confirm it on the official paper. The descriptive Mains papers do not have negative marking."
      },
      {
        q: "Is there a language requirement, and which languages can I use in Mains?",
        a: "Candidates must be able to read, write and speak Bengali, except those whose mother tongue is Nepali. In the Mains, Paper II is a regional-language paper for which you can choose Bengali, Hindi, Urdu, Nepali or Santali. The official notification does not fix a limit on the number of attempts; eligibility is governed mainly by the age and qualification criteria."
      },
      {
        q: "How should I prepare for this exam?",
        a: "Focus on General Studies with a strong West Bengal emphasis (history, geography, polity, economy, science, environment and current affairs), and drill Class 10-standard arithmetic. Take full-length timed mock tests with negative marking, revise regularly, and start descriptive English and Bengali writing practice early. PadhoDost's chapter practice, mock tests and West Bengal GK bank are built for exactly this pattern."
      },
      {
        q: "Is PadhoDost really free?",
        a: "Yes. PadhoDost is fully free. All mock tests, chapter-wise practice, explanations, All-India rank and the West Bengal general-knowledge material are available at no cost, so you can prepare for the WBPSC Miscellaneous Services Examination without paying anything."
      }
    ]
  },
  {
    examSlug: "wb-police-si",
    heading: "West Bengal Police Sub-Inspector (SI): Exam Pattern, Syllabus & Free Preparation",
    paragraphs: ["The West Bengal Police Sub-Inspector (SI) examination is a state-level recruitment conducted by the West Bengal Police Recruitment Board (WBPRB) to fill Sub-Inspector posts in the Armed and Unarmed Branches of the West Bengal Police. It is one of the most sought-after uniformed-service openings in the state, and the selection is spread across a Preliminary written test, physical tests, a Final Combined Competitive Examination (Mains) and a Personality Test. Because the board does not follow a fixed annual calendar and runs cycles only when vacancies arise, aspirants should always confirm notification and exam dates on the official site, prb.wb.gov.in.", "The exam is open to Indian graduates aged roughly 20 to 27 years (with statutory relaxations for reserved categories) who hold a Bachelor's degree in any discipline from a recognised university and can read, write and speak Bengali (candidates from the Nepali-speaking hill sub-divisions are exempted from the Bengali requirement). The journey begins with a 100-question objective Preliminary Examination covering General Studies, Arithmetic and Logical & Analytical Reasoning, followed by the Physical Measurement Test (PMT) and Physical Efficiency Test (PET), then a three-paper Final Combined Competitive Examination and finally an Interview or Personality Test that decides the merit list. Given the very large graduate applicant pool competing for a few hundred posts, consistent, well-targeted preparation is essential.", "PadhoDost helps you prepare for the WB Police SI exam completely free of cost. You get full-length mock tests modelled on the actual exam pattern, chapter-wise practice sets for Reasoning, Arithmetic and General Studies, and dedicated West Bengal General Knowledge drills covering the state's geography, history, culture and current affairs. Every attempt is scored with an All-India rank so you can benchmark yourself against thousands of other aspirants, review detailed explanations for each question, and track your improvement over time — all without paying a rupee."],
    pattern: [
      {
        label: "Selection stages",
        value: "Preliminary Exam -> PMT & PET -> Final Combined Competitive Exam (Mains) -> Personality Test/Interview"
      },
      {
        label: "Preliminary questions",
        value: "100 objective MCQs (General Studies, Arithmetic, Logical & Analytical Reasoning)"
      },
      {
        label: "Preliminary marks",
        value: "200 marks (2 marks per question)"
      },
      {
        label: "Preliminary duration",
        value: "90 minutes"
      },
      {
        label: "Negative marking",
        value: "1/4 penalty — 0.5 mark deducted for each wrong answer in the Preliminary Exam"
      }
    ],
    topics: ["General Studies — Indian history, geography, polity, economics and general science", "Current Affairs and current events (national and West Bengal)", "West Bengal geography, history and culture", "Arithmetic — ratio & proportion, percentage, profit & loss", "Arithmetic — time, speed & distance, and time & work", "Elementary mensuration and basic trigonometry", "Logical & Analytical Reasoning — coding-decoding, analogies, series and classification", "English grammar, vocabulary and comprehension (Final/Mains stage)"],
    tips: ["Master the Preliminary Arithmetic and Reasoning sections first — they are the most scoring and can be locked down with daily timed practice, unlike the vast General Studies syllabus.", "Build strong West Bengal General Knowledge: the state's rivers, districts, festivals, historical sites and famous personalities appear frequently, so keep a dedicated WB GK notebook.", "Because the Preliminary Exam carries a 1/4 negative marking (0.5 mark per wrong answer), practise smart guessing — only attempt questions where you can eliminate at least two options.", "Do not neglect the physical standards: start running and endurance training early alongside your studies so you clear the PMT and PET comfortably once you qualify the written stage."],
    faqs: [
      {
        q: "What is the eligibility for the WB Police SI exam?",
        a: "You need a Bachelor's degree in any discipline from a recognised university and must generally be 20 to 27 years old (with relaxations for reserved categories as per rules). You must also be able to read, write and speak Bengali, except for candidates from the Nepali-speaking hill sub-divisions. Confirm exact figures in the official notification on prb.wb.gov.in."
      },
      {
        q: "What is the exam pattern for the Preliminary stage?",
        a: "The Preliminary Examination has 100 objective MCQs worth 200 marks (2 marks each) to be answered in 90 minutes, covering General Studies, Arithmetic and Logical & Analytical Reasoning. It is a screening test; qualifiers move on to the Physical tests and then the Final Combined Competitive Examination."
      },
      {
        q: "Is there negative marking in the WB Police SI exam?",
        a: "Yes. In the Preliminary Examination, 1/4 of the marks (0.5 mark) is deducted for every wrong answer. Negative marking also commonly applies to objective components of the Final/Mains stage, so always verify the exact scheme in the cycle's notification."
      },
      {
        q: "Is there a language requirement or a limit on attempts?",
        a: "Candidates must be able to read, write and speak Bengali (Nepali-speaking hill sub-division residents are exempt), and the Mains includes a regional-language paper (Bengali/Hindi/Urdu/Nepali). The number of attempts is effectively governed by the age limit rather than a fixed cap; check the official notification for the current rule."
      },
      {
        q: "How should I prepare for the WB Police SI exam?",
        a: "Focus on the high-scoring Arithmetic and Reasoning sections with daily timed practice, build a strong base in West Bengal and national General Studies with current affairs, take regular full-length mock tests to manage negative marking, and train physically for the PMT and PET in parallel."
      },
      {
        q: "Is PadhoDost free to use?",
        a: "Yes, PadhoDost is completely free. All mock tests, chapter-wise practice, West Bengal GK drills, All-India rank and detailed explanations are available at no cost, so you can prepare fully for the WB Police SI exam without paying anything."
      }
    ]
  },
  {
    examSlug: "wb-primary-tet",
    heading: "West Bengal Primary TET: Exam Pattern, Syllabus & Free Preparation",
    paragraphs: ["The West Bengal Primary TET (Teacher Eligibility Test) is a single-stage written eligibility examination conducted by the West Bengal Board of Primary Education (WBBPE), an autonomous body under the School Education Department, Government of West Bengal. It tests whether a candidate is eligible to be appointed as a primary school teacher for Classes I to V in the state. Qualifying the TET earns an eligibility certificate; it is not itself a direct appointment, and actual teaching posts are filled through a separate recruitment process.", "The exam is taken by aspiring primary teachers across West Bengal and is highly competitive — TET-2022 saw over 6 lakh candidates appear. To be eligible, a candidate must have passed Senior Secondary (10+2) with at least 50% marks (45% for reserved categories) along with a 2-year D.El.Ed / D.Ed teacher-training certificate (or B.Ed as permitted), with a minimum age of 18. The test is a single written paper of 150 MCQs covering Child Development & Pedagogy, Language I, Language II (English), Mathematics and Environmental Studies, and the ability to read, write and speak Bengali is expected (exact figures should be confirmed on the official notification).", "PadhoDost helps you prepare for the West Bengal Primary TET completely free. Practise full-length free mock tests that mirror the 150-question, no-negative-marking pattern, drill chapter-by-chapter question banks in Child Development & Pedagogy and EVS, and benchmark yourself with an All-India rank so you know exactly where you stand. We also cover West Bengal general knowledge and state-focused content so you are ready for the regional emphasis of the exam."],
    pattern: [
      {
        label: "Stages",
        value: "Single-stage written eligibility test (Primary, Classes I–V)"
      },
      {
        label: "Number of Questions",
        value: "150 MCQs (30 each from 5 sections)"
      },
      {
        label: "Total Marks",
        value: "150 (1 mark per question)"
      },
      {
        label: "Duration",
        value: "150 minutes (2 hours 30 minutes)"
      },
      {
        label: "Negative Marking",
        value: "No negative marking"
      }
    ],
    topics: ["Child Development & Pedagogy (ages 6–11, learning and inclusive education)", "Language I – reading comprehension and pedagogy of language development (usually Bengali)", "Language II – English comprehension and language pedagogy", "Mathematics – content (numbers, geometry, measurement, data) and pedagogy", "Environmental Studies (EVS) – content and pedagogy", "Concept, significance and evaluation in EVS", "Understanding diversity, learners and the learning process", "Concepts of inclusive education and children with special needs"],
    tips: ["Give equal weight to all five sections — each carries 30 marks, so weakness in any one (often Child Development & Pedagogy or EVS) can cost you the qualifying cut-off.", "Because there is no negative marking, attempt every question — make an informed guess on items you are unsure about rather than leaving them blank.", "Master NCERT/D.El.Ed-level pedagogy theory (Piaget, Vygotsky, learning principles, assessment) as these concepts are repeatedly tested in the CDP section.", "Practise EVS with a West Bengal focus — revise state rivers, districts, festivals and environment topics, and solve previous-year papers against the official WBBPE answer keys."],
    faqs: [
      {
        q: "What is the eligibility to appear for the West Bengal Primary TET?",
        a: "You need Senior Secondary (10+2) with at least 50% marks (45% for reserved categories) plus a 2-year D.El.Ed/D.Ed teacher-training certificate (or B.Ed as permitted), with a minimum age of 18. Confirm exact figures on the official WBBPE notification."
      },
      {
        q: "What is the exam pattern of the WB Primary TET?",
        a: "It is a single written paper of 150 multiple-choice questions for 150 marks, to be completed in 2 hours 30 minutes. The paper has five sections — Child Development & Pedagogy, Language I, Language II (English), Mathematics and EVS — with 30 questions each."
      },
      {
        q: "Is there negative marking in the WB Primary TET?",
        a: "No. There is no negative marking, so a wrong answer costs you nothing beyond the mark for that question. It is always in your interest to attempt every question."
      },
      {
        q: "Is there a language requirement or limit on attempts?",
        a: "Candidates are expected to be able to read, write and speak Bengali, and Language I is typically the Bengali/regional first language while Language II is English. WBBPE has not fixed a strict cap on the number of attempts for the eligibility test — check the official notification for the current cycle's rules."
      },
      {
        q: "How should I prepare for the WB Primary TET?",
        a: "Cover all five sections evenly at D.El.Ed/Class 12 standard, build strong pedagogy fundamentals, revise West Bengal-focused EVS and GK, and take timed full-length mock tests. Solving previous-year questions and checking them against official WBBPE answer keys is one of the most effective strategies."
      },
      {
        q: "Is PadhoDost really free?",
        a: "Yes, PadhoDost is fully free. All mock tests, chapter-wise practice, explanations and your All-India rank are available at no cost."
      }
    ]
  },
  {
    examSlug: "ssc-cgl",
    heading: "SSC CGL & Banking: Your Gateway to a Government Job",
    paragraphs: ["The SSC Combined Graduate Level (CGL) exam is conducted by the Staff Selection Commission to recruit graduates into Group B and Group C posts across ministries, departments, and offices of the Government of India. Popular posts include Income Tax Inspector, Assistant Section Officer, and Auditor. Alongside SSC CGL, lakhs of aspirants prepare for banking exams like IBPS PO, IBPS Clerk, and SBI PO, which share a very similar aptitude-based syllabus.","Anyone who has completed a bachelor's degree can appear, and the exam draws millions of candidates every year, making it one of India's most competitive recruitment routes. The selection is staged: Tier-1 is a common objective screening test, followed by Tier-2, which is more specialised.","On PadhoDost you can take free full-length Tier-1 mock tests that mirror the real timing and marking, drill individual sections like Quant and Reasoning through chapter-wise practice, and see your All-India rank against other aspirants. Visual explainers break down tricky topics such as time-and-work, data interpretation, and syllogisms so concepts actually stick."],
    pattern: [{"label":"Total questions","value":"100 (Tier-1)"},{"label":"Total marks","value":"200"},{"label":"Duration","value":"60 minutes"},{"label":"Marking","value":"+2 correct, -0.5 wrong"},{"label":"Sections","value":"Reasoning, General Awareness, Quantitative Aptitude, English"}],
    topics: ["Quantitative Aptitude (arithmetic, algebra, geometry, data interpretation)","General Intelligence & Reasoning (analogies, series, syllogisms, coding-decoding)","English Comprehension (grammar, vocabulary, reading comprehension)","General Awareness (current affairs, history, geography, polity, economy, science)","Banking-specific: banking awareness, computer aptitude, and puzzles for IBPS/SBI"],
    tips: ["Master calculation speed early — learn tables, squares, cubes, and shortcut tricks so Quant and DI stop eating your time.","Read a daily current-affairs digest and revise weekly; General Awareness is scoring and needs no calculation.","Take full-length mocks under real 60-minute conditions, then analyse every mistake to fix weak areas.","Because of negative marking, only attempt questions you're reasonably sure about — accuracy beats blind guessing."],
    faqs: [
      { q: "Who is eligible for the SSC CGL exam?", a: "Any Indian citizen who holds a bachelor's degree in any discipline from a recognised university can apply. The age limit depends on the post, generally ranging from 18 to 32 years, with relaxations for OBC, SC/ST, PwD and other reserved categories." },
      { q: "What is the SSC CGL exam pattern?", a: "SSC CGL is conducted in two main stages. Tier-1 is a 100-question online test (200 marks, 60 minutes) covering Reasoning, General Awareness, Quantitative Aptitude and English, with +2 for each correct answer and -0.5 for each wrong one. Tier-2 is a deeper computer-based exam that decides the final merit." },
      { q: "Is there negative marking in SSC CGL?", a: "Yes. In Tier-1, 0.5 marks are deducted for every wrong answer. Because of this, it is smarter to attempt only the questions you are reasonably confident about rather than guessing blindly." },
      { q: "How many times can I attempt SSC CGL?", a: "There is no limit on the number of attempts. You can appear for SSC CGL as many times as you wish, as long as you satisfy the age criteria for the post you are applying to." },
      { q: "How should a beginner start preparing for SSC CGL?", a: "Begin by building calculation speed in Quantitative Aptitude, revise General Awareness and current affairs daily, and take full-length Tier-1 mocks under the real 60-minute timing. Reviewing every mistake after each mock is the fastest way to improve." },
      { q: "Are SSC CGL mock tests on PadhoDost free?", a: "Yes. Every SSC CGL mock test, chapter-wise practice set and visual explainer on PadhoDost is completely free, with no paywall and no sign-up wall." },
    ],
  },
  {
    examSlug: "class-10",
    heading: "CBSE Class 10 Board Exams: Building Your Academic Foundation",
    paragraphs: ["The CBSE Class 10 board examination is the first major national-level exam an Indian student faces, conducted by the Central Board of Secondary Education at the end of secondary school. Your Class 10 result influences stream selection for Class 11 (Science, Commerce, or Humanities) and stays on your academic record for years, so a strong score opens doors.","It is taken by students across CBSE-affiliated schools in India and abroad. The assessment blends an 80-mark year-end board paper with 20 marks of internal assessment (periodic tests, practicals, and activities) in most subjects, so consistent classroom performance matters alongside the final exam.","PadhoDost supports Class 10 preparation with free chapter-wise practice tests aligned to the latest CBSE syllabus, full-length subject mocks, and instant scoring so you know exactly where you stand. Visual explainers turn hard chapters — like trigonometry, chemical reactions, and civics concepts — into clear, memorable diagrams, and your progress is tracked chapter by chapter."],
    pattern: [{"label":"Board","value":"CBSE (Central Board of Secondary Education)"},{"label":"Assessment split","value":"80 marks board exam + 20 marks internal"},{"label":"Duration","value":"3 hours per subject paper"},{"label":"Core subjects","value":"5 (plus optional 6th)"},{"label":"Passing marks","value":"33% in each subject"}],
    topics: ["Mathematics (real numbers, polynomials, trigonometry, coordinate geometry, statistics)","Science (Physics, Chemistry, Biology combined)","Social Science (History, Geography, Civics, Economics)","English (Language & Literature)","Second/third language (Hindi, Sanskrit, or others) plus optional subjects"],
    tips: ["Stick closely to NCERT textbooks — CBSE board papers are built directly from them, so master every solved example and exercise.","Solve previous years' papers and sample papers within the 3-hour time limit to build exam stamina and speed.","Don't ignore internal assessment — the 20 internal marks are easy points that lift your overall percentage.","Revise regularly in short cycles rather than cramming; make formula sheets and diagram notes for quick last-week revision."],
    faqs: [
      { q: "What is the CBSE Class 10 exam pattern?", a: "Most subjects carry an 80-mark year-end board paper plus 20 marks of internal assessment. Each theory paper is three hours long, and a student needs 33% to pass in every subject." },
      { q: "How many subjects are there in CBSE Class 10?", a: "Students take five compulsory subjects — typically two languages, Mathematics, Science and Social Science — and may add an optional sixth subject, which is counted for the overall percentage as per CBSE rules." },
      { q: "How important is the Class 10 result?", a: "Your Class 10 marks influence the stream you can choose in Class 11 (Science, Commerce or Humanities) and remain part of your academic record. A strong score keeps more options open for the future." },
      { q: "Do internal assessment marks matter in Class 10?", a: "Yes. The 20 internal marks — from periodic tests, practicals and activities — are added to the 80-mark board paper. They are among the easiest marks to secure and can noticeably lift your final percentage." },
      { q: "What is the best way to prepare for CBSE Class 10 boards?", a: "Stick closely to NCERT textbooks, since board papers are drawn directly from them, and solve previous years' and sample papers within the three-hour limit. Short, regular revision cycles work far better than last-minute cramming." },
      { q: "Is Class 10 practice on PadhoDost free?", a: "Yes. All Class 10 chapter-wise tests, subject mocks and explainers on PadhoDost are free to use, with no paywall or sign-up wall." },
    ],
  },
  {
    examSlug: "jee",
    heading: "JEE Main & Advanced: The Path to IITs and NITs",
    paragraphs: ["The Joint Entrance Examination (JEE) is India's premier engineering entrance test. JEE Main, conducted by the National Testing Agency, is the gateway to NITs, IIITs, and other centrally funded technical institutes, and also serves as the qualifying exam for JEE Advanced. Only the top performers in JEE Main become eligible for JEE Advanced, which decides admission to the prestigious IITs.","Every year, well over a million students who have completed or are appearing in Class 12 with Physics, Chemistry, and Mathematics take JEE Main, making it one of the toughest and most competitive exams in the world. JEE Main is held in multiple sessions, and your best score counts.","PadhoDost helps you prepare with free full-length JEE mock tests that follow the real pattern and marking, topic-wise chapter practice across all three subjects, and an All-India rank so you can benchmark yourself against serious aspirants. Visual explainers make abstract ideas — rotational mechanics, organic reaction mechanisms, conic sections — intuitive, and detailed solutions help you learn from every attempt."],
    pattern: [{"label":"Subjects","value":"Physics, Chemistry, Mathematics"},{"label":"Total questions","value":"75 (25 per subject)"},{"label":"Total marks","value":"300"},{"label":"Duration","value":"3 hours"},{"label":"Marking","value":"+4 correct, -1 wrong (MCQs)"}],
    topics: ["Physics (mechanics, thermodynamics, electromagnetism, optics, modern physics)","Chemistry (physical, organic, and inorganic chemistry)","Mathematics (calculus, algebra, coordinate geometry, trigonometry, vectors)","Advanced problem-solving and multi-concept application for JEE Advanced","NCERT-based fundamentals across Class 11 and Class 12 syllabus"],
    tips: ["Build rock-solid concepts from NCERT first, then move to advanced problem practice — JEE rewards understanding, not rote learning.","Practise a large volume of varied problems and time yourself; speed and accuracy under pressure decide your rank.","Take full-length mocks regularly and analyse errors to separate silly mistakes from genuine concept gaps.","Balance all three subjects — neglecting even one drags your overall rank, since sectional performance matters."],
    faqs: [
      { q: "Who is eligible to appear for JEE Main?", a: "Students who have passed or are appearing in Class 12 (or an equivalent exam) with Physics, Chemistry and Mathematics are eligible. JEE Main is generally open to candidates who cleared Class 12 in the current or the previous two years." },
      { q: "What is the JEE Main exam pattern?", a: "JEE Main has 75 questions — 25 each in Physics, Chemistry and Mathematics — for 300 marks in three hours. The multiple-choice questions carry +4 for a correct answer and -1 for a wrong one; the numerical-answer questions have their own marking scheme." },
      { q: "What is the difference between JEE Main and JEE Advanced?", a: "JEE Main, conducted by the NTA, is the gateway to NITs, IIITs and other centrally funded institutes. Only the top performers in JEE Main qualify for JEE Advanced, which decides admission to the IITs and is a tougher, more concept-heavy exam." },
      { q: "How many attempts are allowed for JEE?", a: "JEE Main is held in two sessions each year and can be attempted across three consecutive years. JEE Advanced allows a maximum of two attempts in two consecutive years." },
      { q: "How should I prepare for JEE?", a: "Build strong fundamentals from NCERT first, then practise a large volume of varied problems under timed conditions. Take full-length mocks regularly, analyse errors to separate silly mistakes from genuine concept gaps, and never neglect any one of the three subjects." },
      { q: "Are JEE mock tests on PadhoDost free?", a: "Yes. All JEE mock tests, chapter-wise practice and explainers on PadhoDost are completely free, with detailed solutions and an All-India rank, and no paywall." },
    ],
  },
  {
    examSlug: "neet",
    heading: "NEET: The Single Gateway to Medical Colleges in India",
    paragraphs: ["NEET (National Eligibility cum Entrance Test), conducted by the National Testing Agency, is the single national entrance exam for admission to MBBS, BDS, AYUSH, and other medical and dental courses across India. It is the only route to nearly every medical seat in the country, from government colleges to private and deemed universities.","Taken by well over a million aspirants each year — students who have completed Class 12 with Physics, Chemistry, and Biology — NEET is fiercely competitive, with rank determining which college and course you can secure. Biology carries the largest weight, making it the decisive subject for most toppers.","On PadhoDost you can take free full-length NEET mock tests built to the exact 180-question, 720-mark pattern, practise chapter-wise across Physics, Chemistry, and Biology, and track your All-India rank as you improve. Visual explainers bring diagrams-heavy topics like human physiology, genetics, and organic chemistry to life, and full solutions turn every mock into a learning session."],
    pattern: [{"label":"Total questions","value":"180 (attempt 180)"},{"label":"Total marks","value":"720"},{"label":"Duration","value":"3 hours 20 minutes"},{"label":"Marking","value":"+4 correct, -1 wrong"},{"label":"Subjects","value":"Physics, Chemistry, Botany, Zoology"}],
    topics: ["Biology — Botany and Zoology (genetics, human physiology, ecology, cell biology, biotechnology)","Chemistry (physical, organic, and inorganic chemistry)","Physics (mechanics, thermodynamics, electrodynamics, optics, modern physics)","NCERT Class 11 and Class 12 syllabus across all subjects","Diagram-based and application questions, especially in Biology"],
    tips: ["Treat NCERT Biology as your bible — memorise it line by line, because most NEET Biology questions come straight from it.","Give Biology the most practice since it carries half the marks and is the highest-scoring section.","Strengthen Physics with numerical practice — it's the toughest section for many and often decides top ranks.","Take timed full-length mocks to build the stamina needed for 3 hours 20 minutes, and review every wrong answer carefully."],
    faqs: [
      { q: "Who is eligible for NEET?", a: "Candidates who have passed or are appearing in Class 12 with Physics, Chemistry, Biology or Biotechnology and English are eligible. A minimum age of 17 years, as of the year of admission, is required." },
      { q: "What is the NEET exam pattern?", a: "NEET has 180 questions for 720 marks, taken over three hours and twenty minutes. It covers Physics, Chemistry, Botany and Zoology, with +4 for each correct answer and -1 for each wrong one. Biology carries the largest share of questions." },
      { q: "Is there negative marking in NEET?", a: "Yes. Each wrong answer costs one mark, while each correct answer earns four. Because of this, accuracy is crucial and blind guessing can pull your score down." },
      { q: "How many attempts are allowed for NEET?", a: "There is currently no limit on the number of NEET attempts. You can appear as many times as you like, provided you meet the eligibility criteria." },
      { q: "Which subject should I focus on most for NEET?", a: "Biology is the highest-scoring section, carrying half the marks, so it deserves the most practice — and NCERT Biology should be studied line by line. Physics is often the toughest section and frequently decides top ranks, so give its numericals steady attention." },
      { q: "Are NEET mock tests on PadhoDost free?", a: "Yes. Every NEET mock test, chapter-wise practice set and explainer on PadhoDost is free, built to the exact 180-question, 720-mark pattern, with no paywall or sign-up wall." },
    ],
  },
  {
    examSlug: "banking",
    heading: "Banking Exams (IBPS & SBI): PO, Clerk and Beyond",
    paragraphs: ["Banking recruitment in India runs mainly through two bodies — the Institute of Banking Personnel Selection (IBPS), which hires for public-sector banks like Bank of Baroda, Canara Bank and PNB, and the State Bank of India (SBI), which recruits separately. The most sought-after posts are Probationary Officer (PO) and Clerk, along with Specialist Officer (SO) roles, and together they draw several million applicants every year.","Selection is staged: a Preliminary objective test screens candidates, a Mains exam tests them in more depth, and PO recruitment adds an interview. The aptitude core — Quantitative Aptitude, Reasoning and English — overlaps heavily with SSC CGL, so many aspirants prepare for both at once, while Banking Awareness and Computer Aptitude are the banking-specific additions that appear in Mains.","On PadhoDost you can take free Banking mock tests built to the real prelims pattern, drill each section — data interpretation, puzzles, seating arrangement, error spotting — through chapter-wise practice, and track your All-India rank. Full step-by-step solutions turn every attempt into a study session, and it's all free with no paywalls or sales calls."],
    pattern: [{"label":"Prelims questions","value":"100"},{"label":"Total marks","value":"100"},{"label":"Duration","value":"60 minutes (20 min per section)"},{"label":"Marking","value":"+1 correct, -0.25 wrong"},{"label":"Sections","value":"English, Reasoning Ability, Quantitative Aptitude"}],
    topics: ["Quantitative Aptitude (data interpretation, number series, arithmetic, quadratic equations, simplification)","Reasoning Ability (puzzles, seating arrangement, syllogism, inequality, coding-decoding, blood relations)","English Language (reading comprehension, cloze test, error spotting, para-jumbles, fillers)","Banking & Financial Awareness (RBI, banking terms, monetary policy — for Mains)","Computer Aptitude and current affairs (Mains stage)"],
    tips: ["Master data interpretation and puzzles — they carry the most marks and separate the qualifiers from the rest.","Practise with the 20-minute sectional timer that prelims now enforces, so you don't over-spend on one section.","Keep a running note of banking awareness and last-6-months current affairs for the Mains general-awareness section.","With 0.25 negative marking, attempt only what you're confident about — accuracy matters more than raw attempts."],
    faqs: [
      { q: "Who is eligible for banking exams like IBPS PO and SBI PO?", a: "A bachelor's degree in any discipline from a recognised university is required. The age limit for Probationary Officer roles is generally 20 to 30 years, with relaxations for reserved categories; Clerk roles usually allow up to 28 years." },
      { q: "What is the banking prelims exam pattern?", a: "The Preliminary exam has 100 questions for 100 marks in 60 minutes, split across English, Reasoning Ability and Quantitative Aptitude, with a separate 20-minute timer for each section. There is +1 for a correct answer and -0.25 for a wrong one." },
      { q: "What is the difference between IBPS and SBI exams?", a: "IBPS conducts recruitment for public-sector banks such as Bank of Baroda, Canara Bank and PNB, while the State Bank of India recruits separately for its own posts. The syllabus and pattern are very similar, so most aspirants prepare for both together." },
      { q: "How many attempts are allowed for banking exams?", a: "SBI PO limits general-category candidates to four attempts, with more for reserved categories. IBPS PO does not currently cap the number of attempts, so you can appear as long as you are within the age limit." },
      { q: "How do I prepare for the Prelims and Mains?", a: "Master data interpretation and puzzles, since they carry the most marks, and practise with the strict 20-minute sectional timer. For Mains, keep a running note of banking awareness and the last six months of current affairs, which the general-awareness section tests." },
      { q: "Are banking mock tests on PadhoDost free?", a: "Yes. All banking mock tests, sectional practice and explainers on PadhoDost are free, built to the real prelims pattern, with full solutions and no paywall or sales calls." },
    ],
  },
  {
    examSlug: "railways",
    heading: "RRB NTPC: Railway Jobs for Non-Technical Posts",
    paragraphs: ["The Railway Recruitment Boards (RRBs) conduct the NTPC (Non-Technical Popular Categories) exam to fill posts such as Station Master, Goods Guard, Junior Clerk, Accounts Clerk, Senior Time Keeper and Commercial Apprentice across Indian Railways — one of the world's largest employers. Vacancies run into the tens of thousands, and applications into the crores, making it a fiercely contested exam.","NTPC is offered at two levels — undergraduate (12th pass) and graduate — and the process moves through a first computer-based test (CBT-1) that screens candidates, a deeper CBT-2, a skill or typing test where applicable, and document verification. The syllabus is aptitude- and awareness-based, with General Awareness carrying the single biggest share of questions.","PadhoDost offers free RRB NTPC practice built to the CBT-1 pattern: chapter-wise drills in Mathematics, General Intelligence & Reasoning and General Awareness, full-length section tests, instant scoring and your All-India rank. Every question comes with a worked solution, and static-GK and science topics are broken down so they actually stick."],
    pattern: [{"label":"CBT-1 questions","value":"100"},{"label":"Total marks","value":"100"},{"label":"Duration","value":"90 minutes"},{"label":"Marking","value":"+1 correct, -1/3 wrong"},{"label":"Sections","value":"Mathematics, General Intelligence & Reasoning, General Awareness"}],
    topics: ["General Awareness (current affairs, history, geography, polity, economy, static GK, general science) — 40 questions","Mathematics (arithmetic, number system, percentage, ratio, time & work, mensuration, data interpretation) — 30 questions","General Intelligence & Reasoning (analogies, series, coding-decoding, puzzles, blood relations, syllogism) — 30 questions","General Science based largely on Class 10 level Physics, Chemistry and Biology","Static General Knowledge — books, awards, important days, organisations, national parks"],
    tips: ["General Awareness has the most questions (40) — build a strong static-GK base and revise current affairs daily; it's the highest-return section.","Speed up your arithmetic with shortcut methods so the 30 maths questions don't eat your time.","Cover Class 10 general science thoroughly — it's frequently tested and quick to answer.","Remember the 1/3 negative marking: skip questions you're genuinely unsure of rather than guessing blindly."],
    faqs: [
      { q: "Who is eligible for the RRB NTPC exam?", a: "NTPC has two levels: undergraduate posts require a Class 12 (10+2) pass, while graduate posts require a bachelor's degree. Age limits vary by post and notification, with relaxations for reserved categories." },
      { q: "What is the RRB NTPC exam pattern?", a: "The first stage, CBT-1, has 100 questions for 100 marks in 90 minutes, covering Mathematics (30), General Intelligence & Reasoning (30) and General Awareness (40), with +1 for a correct answer and -1/3 for a wrong one. Qualifiers move to CBT-2, followed by a skill or typing test where applicable and document verification." },
      { q: "Which section carries the most weight in RRB NTPC?", a: "General Awareness carries the single largest share — 40 of the 100 CBT-1 questions — covering current affairs, static GK and general science. It is the highest-return section to prepare well." },
      { q: "Is there negative marking in RRB NTPC?", a: "Yes. One-third of a mark is deducted for every wrong answer, so it is wiser to skip questions you are genuinely unsure of rather than guess blindly." },
      { q: "How should I prepare for RRB NTPC?", a: "Build a strong static-GK base and revise current affairs daily, speed up your arithmetic with shortcut methods, and cover Class 10-level general science thoroughly, since it is frequently tested and quick to answer." },
      { q: "Are RRB NTPC mock tests on PadhoDost free?", a: "Yes. All RRB NTPC practice — chapter-wise drills, section tests and explainers — is free on PadhoDost, built to the CBT-1 pattern, with worked solutions and no paywall." },
    ],
  },
  {
    examSlug: "upsc",
    heading: "UPSC Civil Services Prelims: The First Step to the IAS",
    paragraphs: ["The Union Public Service Commission (UPSC) conducts the Civil Services Examination to recruit officers for the IAS, IPS, IFS and other central services — the most prestigious and competitive recruitment in India, drawing around a million applicants for a few hundred seats. The journey has three stages: the Preliminary examination, the Mains, and a final Personality Test (interview).","The Prelims is a screening stage with two papers taken on the same day. General Studies Paper 1 decides who qualifies for Mains, while Paper 2 (CSAT) is only qualifying — you need 33% to clear it. Because Paper 1 spans polity, history, geography, economy, environment, science and current affairs, breadth of preparation and calm elimination under pressure matter as much as depth.","PadhoDost gives you free UPSC Prelims GS practice: chapter-wise question sets across Polity, History, Geography, Economy, Environment and Science, full-length mocks to the real 100-question pattern, and your All-India rank. Detailed solutions explain not just the answer but the concept behind it, so each mock strengthens your fundamentals."],
    pattern: [{"label":"GS Paper 1 questions","value":"100"},{"label":"Total marks","value":"200"},{"label":"Duration","value":"2 hours"},{"label":"Marking","value":"+2 correct, -1/3 (0.66) wrong"},{"label":"Paper 2 (CSAT)","value":"Qualifying — 33% needed"}],
    topics: ["Indian Polity & Governance (Constitution, Parliament, judiciary, panchayati raj, rights)","History (ancient, medieval, modern India, and art & culture) and the freedom struggle","Geography (Indian and world physical, social and economic geography)","Economy (basics, banking, budget, growth, government schemes)","Environment & Ecology, General Science, and national/international current affairs"],
    tips: ["Build your base on NCERTs first, then layer standard reference books — jumping to advanced material too early wastes time.","Follow current affairs daily and revise the last 12–18 months; a large share of Prelims questions are current-affairs linked.","Give Environment & Ecology serious attention — it carries heavy weight and is often under-prepared.","Use elimination smartly: with 1/3 negative marking, a well-reasoned educated guess between two options is usually worth taking, a blind one is not."],
    faqs: [
      { q: "Who is eligible for the UPSC Civil Services Examination?", a: "A candidate must hold a bachelor's degree in any discipline. For the general category the age limit is 21 to 32 years, with relaxations for OBC, SC/ST and other categories. Nationality requirements are stricter for the IAS, IPS and IFS." },
      { q: "What are the stages of the UPSC exam?", a: "There are three stages: the Preliminary examination (an objective screening test), the Main examination (a written descriptive test), and a final Personality Test or interview. The Mains and interview decide the final merit; Prelims marks are not counted in it." },
      { q: "What is the UPSC Prelims pattern?", a: "Prelims has two papers on the same day. General Studies Paper 1 has 100 questions for 200 marks in two hours (+2 correct, -1/3 wrong) and decides who qualifies for Mains. Paper 2 (CSAT) is only qualifying — you need 33% to clear it." },
      { q: "How many attempts are allowed for UPSC?", a: "General-category candidates get six attempts, up to the age of 32. OBC candidates get nine attempts, and SC/ST candidates may attempt any number of times up to their age limit." },
      { q: "How should a beginner start UPSC preparation?", a: "Build your base on NCERTs before moving to standard reference books, follow current affairs daily and revise the last 12 to 18 months, and give Environment & Ecology serious attention, as it carries heavy weight and is often under-prepared." },
      { q: "Are UPSC mock tests on PadhoDost free?", a: "Yes. All UPSC Prelims GS practice, full-length mocks and visual explainers on PadhoDost are free, with detailed solutions that explain the concept behind each answer, and no paywall." },
    ],
  },
  {
    examSlug: "class-11",
    heading: "CBSE Class 11: The Foundation for Boards and Entrances",
    paragraphs: ["Class 11 is the first year of senior secondary school, where a student chooses a stream — Science, Commerce or Humanities — and starts specialising. It is not a board exam; the year-end assessment is conducted by the school itself. But do not let that fool you: Class 11 builds the conceptual base that Class 12 boards, and entrance exams like JEE, NEET and CUET, are built directly on top of.","Roughly half of the JEE and NEET syllabus comes from Class 11, and the subjects introduced here — whether Physics and Chemistry, or Accountancy and Economics — carry forward into Class 12 with little repetition. Students who treat Class 11 as a relaxed year often struggle in Class 12; those who master the fundamentals now find both boards and entrances far more manageable.","On PadhoDost, Class 11 students get free chapter-wise practice aligned to the latest NCERT syllabus, full subject tests and instant scoring, so you can check your understanding chapter by chapter. Detailed solutions explain the reasoning behind each answer, turning practice into real learning rather than rote."],
    pattern: [{"label":"Assessment","value":"School-conducted annual exam (not a board exam)"},{"label":"Typical split","value":"80 marks theory + 20 internal/practical"},{"label":"Duration","value":"3 hours per subject paper"},{"label":"Syllabus","value":"Latest CBSE / NCERT"},{"label":"Streams","value":"Science, Commerce, Humanities"}],
    topics: ["Science stream — Physics, Chemistry, and Mathematics or Biology","Commerce stream — Accountancy, Business Studies, and Economics","Humanities stream — History, Political Science, Geography and more","English (Core) across all streams","NCERT-based fundamentals that feed directly into Class 12 and JEE/NEET/CUET"],
    tips: ["Treat Class 11 as the foundation year it is — nearly half of JEE and NEET is built on this syllabus, so master concepts now.","Stick to NCERT and solve every exercise; entrance exams and Class 12 both reward a strong NCERT base.","Practise numerical-heavy chapters (Physics, Accountancy, Maths) repeatedly rather than just reading them.","Don't wait for Class 12 to start entrance prep — the concepts you build here are exactly what those exams test."],
    faqs: [
      { q: "Is Class 11 a board exam?", a: "No. Class 11 is assessed by the school itself, not by the CBSE board. However, its syllabus is the foundation on which the Class 12 boards and entrance exams like JEE, NEET and CUET are directly built." },
      { q: "How is Class 11 assessed?", a: "Most subjects follow an 80-mark theory paper plus 20 marks of internal assessment or practicals, with a three-hour paper per subject, conducted as a school annual examination on the latest CBSE and NCERT syllabus." },
      { q: "How do I choose a stream in Class 11?", a: "Students pick Science, Commerce or Humanities based on their interests and career goals. Science opens engineering and medical paths, Commerce leads to business and finance, and Humanities suits law, civil services and the social sciences." },
      { q: "How important is Class 11 for JEE and NEET?", a: "Very important — roughly half of the JEE and NEET syllabus comes from Class 11. Students who master these fundamentals now find both the Class 12 boards and the entrance exams far more manageable." },
      { q: "How should I prepare in Class 11?", a: "Treat it as a foundation year: stick to NCERT and solve every exercise, practise numerical-heavy chapters like Physics, Maths and Accountancy repeatedly, and begin entrance preparation now rather than waiting for Class 12." },
      { q: "Is Class 11 practice on PadhoDost free?", a: "Yes. All Class 11 chapter-wise tests, subject mocks and explainers on PadhoDost are free, aligned to the latest NCERT syllabus, with no paywall or sign-up wall." },
    ],
  },
  {
    examSlug: "class-12",
    heading: "CBSE Class 12 Board Exams: The Score That Shapes Your Future",
    paragraphs: ["The CBSE Class 12 board examination is one of the most consequential exams an Indian student takes. Your Class 12 marks feed into university admissions — directly, and through CUET — and for many students they run alongside entrance exams like JEE and NEET, making this a demanding, high-stakes year. The exam is conducted by the Central Board of Secondary Education for students across Science, Commerce and Humanities streams.","Most subjects are assessed as an 80-mark year-end board paper plus 20 marks of internal assessment or practicals, with a three-hour paper per subject and a 33% pass requirement. Because the result shapes which college and course you can secure, consistency across the year — not just a final-month sprint — is what produces a strong percentage.","PadhoDost supports Class 12 preparation with free chapter-wise practice tests aligned to the latest CBSE syllabus, full-length subject mocks and instant scoring, so you always know where you stand. Step-by-step solutions make hard chapters clear, and your progress is tracked chapter by chapter across every subject."],
    pattern: [{"label":"Board","value":"CBSE (Central Board of Secondary Education)"},{"label":"Assessment split","value":"80 marks board exam + 20 internal/practical"},{"label":"Duration","value":"3 hours per subject paper"},{"label":"Passing marks","value":"33% in each subject"},{"label":"Streams","value":"Science, Commerce, Humanities"}],
    topics: ["Science stream — Physics, Chemistry, and Mathematics or Biology","Commerce stream — Accountancy, Business Studies, and Economics","Humanities stream — History, Political Science, Geography and others","English (Core) across all streams","NCERT-based syllabus that also underpins JEE, NEET and CUET preparation"],
    tips: ["Anchor your preparation in NCERT textbooks — CBSE board papers are drawn directly from them.","Solve previous years' papers and CBSE sample papers within the three-hour limit to build speed and exam temperament.","Secure the 20 internal/practical marks — they are the easiest points to lift your overall percentage.","If you're also preparing for JEE or NEET, plan a schedule that protects both — the board syllabus overlaps heavily with the entrance syllabus."],
    faqs: [
      { q: "What is the CBSE Class 12 exam pattern?", a: "Most subjects carry an 80-mark year-end board paper plus 20 marks of internal assessment or practicals, with a three-hour paper per subject and a 33% pass requirement in each subject." },
      { q: "How do Class 12 marks affect college admission?", a: "Class 12 marks feed into university admissions directly and through CUET, and many programmes set minimum-percentage cut-offs. For students also taking JEE or NEET, the board score runs alongside the entrance rank." },
      { q: "Which streams are offered in Class 12?", a: "Class 12 continues the stream chosen in Class 11 — Science (with Maths or Biology), Commerce, or Humanities — with little repetition of the Class 11 syllabus, so the two years build on each other." },
      { q: "Do internal and practical marks matter in Class 12?", a: "Yes. The 20 internal or practical marks are added to the 80-mark board paper and are among the easiest points to secure, so they can meaningfully raise your final percentage." },
      { q: "How should I prepare for Class 12 boards alongside JEE or NEET?", a: "Anchor your study in NCERT, since board papers come directly from it and its syllabus overlaps heavily with the entrances. Solve previous years' and sample papers within the time limit, and plan a schedule that protects both board and entrance preparation." },
      { q: "Is Class 12 practice on PadhoDost free?", a: "Yes. All Class 12 chapter-wise tests, subject mocks and explainers on PadhoDost are free, aligned to the latest CBSE syllabus, with step-by-step solutions and no paywall." },
    ],
  },
  {
    examSlug: "wbcs",
    heading: "WBCS: West Bengal's Gateway to a State Civil Service Career",
    paragraphs: [
      "The West Bengal Civil Service (WBCS) Examination, conducted by the West Bengal Public Service Commission (WBPSC), recruits officers for the state's Group A, B, C and D services — including WBCS (Executive), the West Bengal Police Service and other administrative posts. It is the most sought-after state-level exam in West Bengal, drawing lakhs of graduates every year.",
      "The examination has three stages: a Preliminary objective screening test, a descriptive Main examination, and a final Personality Test (interview). The Preliminary is a single 200-mark paper of 200 multiple-choice questions in two and a half hours, spanning English, general science, current events, Indian history and the national movement, geography with special reference to West Bengal, Indian polity and economy, and general mental ability — with one-third negative marking.",
      "On PadhoDost you can practise free WBCS Prelims questions chapter by chapter, with a strong West Bengal focus — the Bengal Renaissance and the freedom movement, the geography of West Bengal, and the state-specific static GK an examiner actually tests — alongside national polity, history, geography and science. Every question comes with a full solution, and it is all free with no paywall.",
    ],
    pattern: [
      { label: "Conducting body", value: "West Bengal PSC (WBPSC)" },
      { label: "Prelims", value: "200 questions · 200 marks · 2½ hours" },
      { label: "Marking", value: "+1 correct, −1/3 wrong" },
      { label: "Stages", value: "Prelims → Mains → Personality Test" },
      { label: "Language", value: "Must read & write Bengali (Nepali exempt)" },
    ],
    topics: [
      "West Bengal — history & culture (Bengal Renaissance, reformers, the freedom movement)",
      "Geography of West Bengal (rivers, districts, Sundarbans) and of India",
      "Indian History — ancient, medieval, modern and the national movement",
      "Indian Polity & Governance and the Indian Economy",
      "General Science, General Mental Ability (reasoning) and English composition",
    ],
    tips: [
      "Give the West Bengal-specific portions serious attention — WB history, geography and static GK are where WBCS differs from a national exam, and they are scoring.",
      "Build your base on NCERTs for history, geography, polity and science, then layer West Bengal material on top.",
      "Follow current affairs daily and revise the last 6–12 months — the Prelims has a dedicated current-events section.",
      "Practise under the one-third negative-marking rule: attempt only what you are reasonably sure of, because wrong answers cost you.",
    ],
    faqs: [
      { q: "Who conducts the WBCS exam and who is eligible?", a: "The West Bengal Public Service Commission (WBPSC) conducts it. A bachelor's degree in any discipline is required, and candidates must be able to read, write and speak Bengali (except those whose mother tongue is Nepali). The age limit is generally 21 to 36 years for the general category, varying by service group, with relaxations for reserved categories." },
      { q: "What are the stages of the WBCS exam?", a: "Three: the Preliminary examination (an objective screening test), the Main examination (written and descriptive), and a final Personality Test or interview. Preliminary marks are only for screening and are not added to the final merit." },
      { q: "What is the WBCS Preliminary exam pattern?", a: "One paper of 200 multiple-choice questions for 200 marks in two and a half hours, covering English composition, general science, current events, Indian history, the national movement, geography (with special reference to West Bengal), Indian polity and economy, and general mental ability. Each wrong answer deducts one-third of a mark." },
      { q: "Is knowledge of Bengali required for WBCS?", a: "Yes — candidates must be able to read, write and speak Bengali, with the only exception being those whose mother tongue is Nepali. Much of the preparation and the Prelims itself can still be done in English." },
      { q: "How is WBCS preparation different from UPSC or SSC?", a: "The syllabus overlaps heavily with national general studies, but WBCS adds a substantial West Bengal layer — the history, geography, culture and static GK of the state. That WB-specific portion is the main thing to prepare on top of standard GS." },
      { q: "Is WBCS practice on PadhoDost free?", a: "Yes. All WBCS Prelims practice on PadhoDost is completely free, chapter-wise with full solutions, and with no paywall or sign-up wall." },
    ],
  },
];

export const getExamIntro = (slug: string) => examIntros.find((e) => e.examSlug === slug);
