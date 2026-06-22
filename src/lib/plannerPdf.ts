import type { PlannerBriefRecord } from "./plannerDatabase";

function cleanText(value: unknown) {
  return String(value ?? "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pdfEscape(value: string) {
  return cleanText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value: string, maxChars = 88) {
  const words = cleanText(value).split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if (`${current} ${word}`.length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`;
    }
  }

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export function generatePlannerPdf(record: PlannerBriefRecord) {
  const pageContents: string[] = [];
  let content = "";
  let y = 750;

  function newPage() {
    if (content) pageContents.push(content);
    content = "";
    y = 750;
  }

  function line(text: string, size = 10, indent = 0) {
    if (y < 60) newPage();
    content += `BT /F1 ${size} Tf ${50 + indent} ${y} Td (${pdfEscape(text)}) Tj ET\n`;
    y -= size + 6;
  }

  function paragraph(text: string, size = 10, indent = 0) {
    for (const wrapped of wrapText(text, indent ? 76 : 88)) {
      line(wrapped, size, indent);
    }
  }

  function section(title: string) {
    y -= 6;
    line(title, 13);
  }

  function list(items: string[]) {
    if (items.length === 0) {
      line("- Not specified", 10, 10);
      return;
    }
    for (const item of items) {
      paragraph(`- ${item}`, 10, 10);
    }
  }

  line("CoastHomeHub AI Project Brief", 18);
  line(`Brief ID: ${record.id}`, 9);
  line(`Created: ${new Date(record.createdAt).toLocaleDateString("en-AU")}`, 9);
  line(`Project type: ${record.projectType}`, 11);

  section("Location");
  paragraph(record.brief.location || "Not specified");

  section("Scope");
  list(record.brief.scope);

  section("Budget Range");
  paragraph(record.brief.budgetRange);

  section("Timeline");
  paragraph(record.brief.timeline);

  section("Materials");
  list(record.brief.materials);

  section("Photos");
  paragraph(`${record.brief.photos.count} photo(s) referenced.`);
  list(record.brief.photos.notes);

  section("Assumptions");
  list(record.brief.assumptions);

  section("Risks");
  list(record.brief.risks);

  section("Next Steps");
  list(record.brief.nextSteps);

  section("Original Answers");
  for (const answer of record.answers) {
    paragraph(`${answer.question}: ${answer.answer}`, 9);
  }

  if (content) pageContents.push(content);

  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  const kids: string[] = [];
  pageContents.forEach((pageContent, index) => {
    const pageObjectId = 4 + index * 2;
    const contentObjectId = pageObjectId + 1;
    kids.push(`${pageObjectId} 0 R`);
    objects[pageObjectId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
    objects[contentObjectId] = `<< /Length ${Buffer.byteLength(pageContent, "utf8")} >>\nstream\n${pageContent}endstream`;
  });

  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${kids.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    if (!objects[i]) continue;
    offsets[i] = Buffer.byteLength(pdf, "utf8");
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i] ?? 0).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
}
