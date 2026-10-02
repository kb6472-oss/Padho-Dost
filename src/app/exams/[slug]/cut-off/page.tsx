import { infoMetadata, infoPage } from "@/components/exam-info/ExamInfoPage";
import { examInfoSlugs } from "@/lib/exam-info";

// Exam-information page — content in src/content/exam-info/<slug>.json (official sources).
export const dynamicParams = false; // only exams with researched info get this page
export const generateStaticParams = () => examInfoSlugs().map((slug) => ({ slug }));
export const generateMetadata = infoMetadata("cut-off");
export default infoPage("cut-off");
