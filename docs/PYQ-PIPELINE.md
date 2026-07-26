# PYQ Pipeline — sourcing & building real Previous-Year Questions

This is the repeatable runbook for adding **real** previous-year questions (PYQ) to PadhoDost.
It was proven end-to-end on **UPSC Prelims 2024 GS Paper-I** (2026-07-27).

## Non-negotiable rules

1. **Official government PDFs only.** UPSC → `upsc.gov.in`; WBCS → `psc.wb.gov.in`; JEE/NEET → `nta.ac.in`; CBSE → `cbse.gov.in`.
2. **Never scrape coaching sites** (Testbook, Adda247, Oliveboard, ClearIAS, etc.). Their "memory-based" papers are the coaching site's *own copyrighted reconstruction*. Republishing them = copyright infringement **and** an AdSense "scaled/copied content" violation.
3. **Where no official paper exists** (SSC CGL, IBPS, SBI, RRB — all CBT, no released papers), ship clearly-labelled **"exam-pattern practice"**, never fake "PYQ".
4. **Every question is verified against the official answer key.** The key is ground truth; we never guess answers.
5. **We add our own explanations** (the transformative value + fair-dealing basis). Attribute the source paper.

## Verified official source URLs

All under `https://www.upsc.gov.in/sites/default/files/`:

| Year | Question paper (GS Paper-I) | Answer key | Notes |
|---|---|---|---|
| 2024 | `QP-CSP-24-GENERAL-STUDIES-PAPER-I-180624.pdf` | `AnsKey-CivilServicesPExam-2024-GeneralStudies-I-210525.pdf` | Series A · dropped Q20, Q52, Q57 |
| 2023 | `QP_CS_Pre_Exam_2023_280523.pdf` | `AnsKey-CSP-2023-Paper-I-090524.pdf` | Series A · dropped Q34 |
| 2022 | **URL not yet found** (see below) | `AnsKey-CSP-2022-Paper-I-040723.pdf` | Series A · dropped Q61 |

**2022 paper URL is unresolved.** Filename guesses 404; `General-Studies-Paper-I.pdf` is a *specimen QCAB*, not the paper. Resolve by reading the JS-rendered listing (`/examinations/previous-question-papers`) in a browser and copying the real link, or ask the user to grab it.

WBCS (next): `https://psc.wb.gov.in` → Previous Year Question Papers → Prelims, years 2012/2018/2019/2021/2023 (English + Bengali).

## Fetch gotchas

- `upsc.gov.in` (non-www) **307-redirects to the www homepage and drops the path**. Always request the `www.` host with a referer:
  ```bash
  curl -sL -A "Mozilla/5.0" -e "https://www.upsc.gov.in/" -o paper.pdf \
    "https://www.upsc.gov.in/sites/default/files/QP-CSP-24-GENERAL-STUDIES-PAPER-I-180624.pdf"
  ```
- A wrong/missing path returns a ~23 KB **HTML** page, not a 404. Verify with `file paper.pdf` (expect "PDF document").

## The papers are SCANNED IMAGES

`Fonts: 0`, one `/Image` per page → **no text layer**. `pdftotext` yields nothing. Extraction is OCR-by-vision. But the scans render to clean printed text, so vision transcription is highly accurate. Rasterize with **PyMuPDF** (installed):

```python
import fitz
d = fitz.open("paper.pdf")
d.load_page(p-1).get_pixmap(dpi=165).save(f"p{p:02d}.png")
```

Layout: the paper is **bilingual, interleaved page-by-page**. English questions are on the **odd rendered pages** (p03, p05, p07 … ~p43), ~4–6 questions each. Only render/read the odd pages.

## Build steps (proven on 2024)

1. **Download** paper + key (www host + referer). Confirm both are real PDFs.
2. **Render** the odd (English) pages and both key pages to PNG (PyMuPDF, dpi 165).
3. **Read the key grid** → capture the full `{qno: A/B/C/D}` map. `X` = dropped by UPSC (omit those questions).
4. **Transcribe**: fan out parallel `general-purpose` subagents, ~5 pages each, to read the PNGs and return **strict JSON** `[{qno, text, options:{a,b,c,d}}]` — verbatim, no answers, no commentary. Fold sub-lists/tables into `text`.
5. **Verify**: personally read the first ~20 questions and diff against the agents' output (they matched exactly on 2024). Escalate to a second transcription pass only if they diverge.
6. **Attach answers** from the official key; **omit dropped** (`X`) questions.
7. **Explanations**: fan out subagents to write a 2–4 sentence factual justification of each *official* answer (+ EASY/MEDIUM/HARD). Subagents `Write` their output to files (avoids re-emission drift). Spot-check ~10.
8. **Merge & validate** (Python): qnos contiguous, exactly one correct option each, no empty fields, every scorable question has an explanation.
9. **Seed transform** → a new wave in `prisma/seed.ts` (see below).
10. `npx tsc --noEmit` → `npm run build` → commit → push → deploy → `prisma db seed` on the VPS.

## Seed data model

`ChapterContent.test` is upserted as `type: "CHAPTER"` (see `prisma/seed.ts` ~line 9389). For PYQ, thread an optional `testType?: "CHAPTER" | "PYQ"` through the `ChapterContent` type and the `mockTest.upsert` `create.type`. `MockTest.type` already supports `"PYQ"`.

Model PYQ as a **subject "Previous Year Papers"** under the relevant exam, **one chapter/test per year** (slug e.g. `upsc-prelims-2024`), `type: "PYQ"`. UPSC prelims scoring: `marks: 2`, `negative: 0.66` (−1/3). Questions carry the official source in the test description, e.g. *"Real UPSC Prelims 2024 GS Paper-I. Source: UPSC official paper. 97 scorable questions (3 dropped by UPSC)."*

## Status

- **UPSC 2024** — 97 scorable Q transcribed, key-verified, explained. Ready to seed.
- **Next**: seed+deploy 2024 → 2023 → 2022 (need paper URL) → WBCS.
