import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { sendReportSchema } from "@/lib/apiSchemas";
import { logError } from "@/lib/logger";
import {
  escapeHtml,
  escapeHtmlArray,
  jsonError,
  mailtoHref,
  parseJson,
  rateLimit,
  requireReportSigningSecret,
  telHref,
  verifySameOrigin,
  verifySignedPayload,
} from "@/lib/security";

export const runtime = "nodejs";

type Report = {
  jobType: string;
  location: string | null;
  budget: string | null;
  estimatedCost: string | null;
  timeline: string | null;
  scope: string[];
  materials: string[];
  designConcept: string | null;
  aiSummary: string;
  urgency: string | null;
  hasPhoto: boolean;
  photoCount?: number;
};

function escapeReport(report: Report): Report {
  return {
    jobType: escapeHtml(report.jobType),
    location: report.location ? escapeHtml(report.location) : null,
    budget: report.budget ? escapeHtml(report.budget) : null,
    estimatedCost: report.estimatedCost ? escapeHtml(report.estimatedCost) : null,
    timeline: report.timeline ? escapeHtml(report.timeline) : null,
    scope: escapeHtmlArray(report.scope),
    materials: escapeHtmlArray(report.materials),
    designConcept: report.designConcept ? escapeHtml(report.designConcept) : null,
    aiSummary: escapeHtml(report.aiSummary),
    urgency: report.urgency ? escapeHtml(report.urgency) : null,
    hasPhoto: report.hasPhoto,
    photoCount: report.photoCount,
  };
}

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #f0ede8;font-weight:600;color:#4a607a;font-size:13px;width:140px;vertical-align:top">${label}</td>
    <td style="padding:9px 0;border-bottom:1px solid #f0ede8;color:#1a2332;font-size:14px">${value}</td>
  </tr>`;
}

function chips(items: string[]) {
  if (!items?.length) return "";
  return items
    .map((i) => `<span style="display:inline-block;background:#f0f9f8;color:#155e58;border:1px solid #d8f0ed;border-radius:50px;padding:4px 12px;font-size:12px;font-weight:600;margin:3px 4px 3px 0">${i}</span>`)
    .join("");
}

function customerEmail(report: Report, name: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Outfit',Arial,sans-serif">
<div style="max-width:600px;margin:32px auto;background:#f5f0e8;padding:24px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0a1f1e,#0e4440);border-radius:16px;padding:32px 36px;margin-bottom:20px;text-align:center">
    <div style="font-size:2.4rem;margin-bottom:10px">🏠</div>
    <h1 style="color:white;margin:0 0 8px;font-size:1.5rem;font-weight:800">Your Renovation Brief is Ready!</h1>
    <p style="color:rgba(255,255,255,0.75);margin:0;font-size:0.95rem">Hi ${name}, CoastAI has put together your project brief below.</p>
  </div>

  <!-- AI Summary -->
  <div style="background:white;border-radius:14px;padding:24px 28px;margin-bottom:16px;border-left:4px solid #1f7a72">
    <p style="font-size:13px;font-weight:700;color:#1f7a72;letter-spacing:.05em;text-transform:uppercase;margin:0 0 10px">AI Design Summary</p>
    <p style="font-size:14px;color:#2d3f54;line-height:1.7;margin:0">${report.aiSummary}</p>
    ${report.designConcept ? `<p style="font-size:13px;color:#4a607a;margin:10px 0 0;font-style:italic">Design concept: ${report.designConcept}</p>` : ""}
  </div>

  <!-- Job Details -->
  <div style="background:white;border-radius:14px;padding:24px 28px;margin-bottom:16px">
    <h2 style="font-size:0.95rem;color:#1a2332;margin:0 0 16px;font-weight:700">Your Project Details</h2>
    <table style="width:100%;border-collapse:collapse">
      ${row("Job Type", report.jobType)}
      ${row("Location", report.location)}
      ${row("Your Budget", report.budget)}
      ${row("AI Cost Estimate", report.estimatedCost ? `<strong style="color:#1f7a72">${report.estimatedCost}</strong> <span style="font-size:12px;color:#4a607a">(QLD estimate)</span>` : null)}
      ${row("Timeline", report.timeline)}
      ${row("Photo Provided", report.hasPhoto ? "✅ Yes" : "Not provided")}
    </table>
  </div>

  <!-- Scope of work -->
  ${report.scope?.length ? `<div style="background:white;border-radius:14px;padding:24px 28px;margin-bottom:16px">
    <h2 style="font-size:0.95rem;color:#1a2332;margin:0 0 14px;font-weight:700">Scope of Work</h2>
    ${chips(report.scope)}
  </div>` : ""}

  <!-- Materials -->
  ${report.materials?.length ? `<div style="background:white;border-radius:14px;padding:24px 28px;margin-bottom:16px">
    <h2 style="font-size:0.95rem;color:#1a2332;margin:0 0 14px;font-weight:700">Materials & Finishes</h2>
    ${chips(report.materials)}
  </div>` : ""}

  <!-- What happens next -->
  <div style="background:linear-gradient(135deg,rgba(31,122,114,0.08),rgba(61,153,144,0.04));border:1px solid #d8f0ed;border-radius:14px;padding:24px 28px;margin-bottom:20px">
    <h2 style="font-size:0.95rem;color:#0e4440;margin:0 0 12px;font-weight:700">What Happens Next</h2>
    ${[
      ["🔍", "We review your brief and find up to 3 QBCC-licensed tradies in your area"],
      ["📬", "Each tradie receives your scoped brief and will reach out to quote"],
      ["✅", "You choose — no pressure, no obligation"],
    ].map(([icon, text]) => `<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
      <span style="font-size:1.2rem;flex-shrink:0">${icon}</span>
      <span style="font-size:13px;color:#2d3f54;line-height:1.6">${text}</span>
    </div>`).join("")}
  </div>

  <!-- Trust -->
  <div style="text-align:center;padding:20px 0;border-top:1px solid #e8dfd0">
    <p style="font-size:12px;color:#4a607a;margin:0 0 6px">✅ QBCC-licensed tradies only &nbsp;·&nbsp; 🔒 Max 3 quotes, never sold to 10 &nbsp;·&nbsp; 🏠 Home Warranty protected</p>
    <p style="font-size:11px;color:#9c7d55;margin:0">© 2026 CoastHomeHub & EIJ Construction · ABN 79 674 743 545 · <a href="https://coasthomehub.com.au" style="color:#1f7a72">coasthomehub.com.au</a></p>
  </div>
</div>
</body></html>`;
}

function businessEmail(
  report: Report,
  customer: {
    name: string;
    email: string;
    phone: string;
    suburb: string;
    emailHref: string;
    phoneHref: string;
    replyHref: string;
  },
  conversation: string
) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Arial,sans-serif">
<div style="max-width:640px;margin:32px auto;background:#f5f0e8;padding:24px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0a1f1e,#155e58);border-radius:16px;padding:28px 32px;margin-bottom:20px">
    <div style="display:flex;align-items:center;gap:14px">
      <span style="font-size:2rem">🔧</span>
      <div>
        <h1 style="color:white;margin:0;font-size:1.25rem;font-weight:800">New Quote Request</h1>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:0.85rem">CoastAI → ${report.jobType}${report.location ? ` in ${report.location}` : ""}</p>
      </div>
      ${report.urgency === "high" ? `<span style="margin-left:auto;background:#ef4444;color:white;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:700">URGENT</span>` : ""}
    </div>
  </div>

  <!-- Customer -->
  <div style="background:white;border-radius:14px;padding:22px 26px;margin-bottom:14px;border-left:4px solid #c9972a">
    <h2 style="font-size:0.9rem;color:#1a2332;margin:0 0 14px;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Customer</h2>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", customer.name)}
      ${row("Email", `<a href="${customer.emailHref}" style="color:#1f7a72">${customer.email}</a>`)}
      ${row("Phone", customer.phoneHref ? `<a href="${customer.phoneHref}" style="color:#1f7a72">${customer.phone}</a>` : "Not provided")}
      ${row("Suburb", customer.suburb || report.location || "Not specified")}
    </table>
    <a href="${customer.replyHref}" style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,#c9972a,#e8b84b);color:white;padding:10px 24px;border-radius:50px;text-decoration:none;font-weight:700;font-size:13px">Reply to Customer →</a>
  </div>

  <!-- Job Brief -->
  <div style="background:white;border-radius:14px;padding:22px 26px;margin-bottom:14px">
    <h2 style="font-size:0.9rem;color:#1a2332;margin:0 0 14px;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Job Brief</h2>
    <table style="width:100%;border-collapse:collapse">
      ${row("Job Type", `<strong>${report.jobType}</strong>`)}
      ${row("Location", report.location)}
      ${row("Budget", report.budget)}
      ${row("AI Estimate", report.estimatedCost)}
      ${row("Timeline", report.timeline)}
      ${row("Urgency", report.urgency)}
      ${row("Photo", report.hasPhoto ? "✅ Provided via CoastAI" : "❌ No photo")}
    </table>
  </div>

  <!-- AI Summary -->
  <div style="background:#f0f9f8;border-radius:14px;padding:22px 26px;margin-bottom:14px;border:1px solid #d8f0ed">
    <h2 style="font-size:0.9rem;color:#0e4440;margin:0 0 10px;font-weight:700">AI Analysis</h2>
    <p style="font-size:13px;color:#2d3f54;line-height:1.7;margin:0 0 10px">${report.aiSummary}</p>
    ${report.designConcept ? `<p style="font-size:12px;color:#4a607a;margin:0;font-style:italic">Concept: ${report.designConcept}</p>` : ""}
  </div>

  <!-- Scope + Materials -->
  ${report.scope?.length ? `<div style="background:white;border-radius:14px;padding:20px 26px;margin-bottom:14px">
    <h2 style="font-size:0.9rem;color:#1a2332;margin:0 0 12px;font-weight:700">Scope</h2>${chips(report.scope)}
  </div>` : ""}
  ${report.materials?.length ? `<div style="background:white;border-radius:14px;padding:20px 26px;margin-bottom:14px">
    <h2 style="font-size:0.9rem;color:#1a2332;margin:0 0 12px;font-weight:700">Materials</h2>${chips(report.materials)}
  </div>` : ""}

  <!-- Full conversation -->
  <div style="background:white;border-radius:14px;padding:22px 26px;margin-bottom:14px">
    <h2 style="font-size:0.9rem;color:#1a2332;margin:0 0 14px;font-weight:700">Full AI Conversation</h2>
    <div style="background:#faf9f7;border-radius:8px;padding:16px;font-size:12px;color:#4a607a;line-height:1.8;white-space:pre-wrap;border:1px solid #e8dfd0;max-height:400px;overflow-y:auto">${conversation}</div>
  </div>

  <div style="text-align:center;padding:16px 0;border-top:1px solid #e8dfd0">
    <p style="font-size:11px;color:#9c7d55;margin:0">CoastHomeHub · EIJ Construction · ABN 79 674 743 545</p>
  </div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, {
    key: "send-report",
    limit: 6,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  const originError = verifySameOrigin(req);
  if (originError) return originError;

  const parsed = await parseJson(req, sendReportSchema);
  if (parsed.error) return parsed.error;

  const { report, reportToken, customer, messages } = parsed.data;
  try {
    requireReportSigningSecret();
  } catch (err) {
    logError("send-report:signing", err);
    return jsonError("Report signing is not configured", 503);
  }

  if (!verifySignedPayload(reportToken, report)) {
    return jsonError("Invalid report token", 403);
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey || resendKey === "re_placeholder") {
    return jsonError("Email service is not configured", 503);
  }

  const resend = new Resend(resendKey);

  try {
    const safeReport = escapeReport(report);
    const safeName = escapeHtml(customer.name);
    const safeEmail = escapeHtml(customer.email);
    const safePhone = escapeHtml(customer.phone);
    const safeSuburb = escapeHtml(customer.suburb);
    const customerEmailHref = mailtoHref(customer.email);
    const customerPhoneHref = customer.phone ? telHref(customer.phone) : "";
    const replyHref = mailtoHref(customer.email, {
      subject: `Re: Your ${report.jobType} quote request`,
      body: `Hi ${customer.name},`,
    });

    const conversation = messages
      .map((m) => `${m.role === "user" ? safeName : "CoastAI"}: ${escapeHtml(m.text)}`)
      .join("\n\n");

    const from = process.env.FROM_EMAIL || "CoastHomeHub <info@coasthomehub.com.au>";
    const contactEmail = process.env.CONTACT_EMAIL || "info@coasthomehub.com.au";

    const [customerResult, businessResult] = await Promise.all([
      resend.emails.send({
        from,
        to: customer.email,
        subject: `✅ Your renovation brief is ready — ${report.jobType}`,
        html: customerEmail(safeReport, safeName),
      }),
      resend.emails.send({
        from,
        to: contactEmail,
        subject: `🔧 New Quote: ${report.jobType}${report.location ? ` · ${report.location}` : ""} — ${customer.name}`,
        html: businessEmail(
          safeReport,
          {
            name: safeName,
            email: safeEmail,
            phone: safePhone,
            suburb: safeSuburb,
            emailHref: customerEmailHref,
            phoneHref: customerPhoneHref,
            replyHref,
          },
          conversation
        ),
        replyTo: customer.email,
      }),
    ]);

    return NextResponse.json({
      success: true,
      customerEmailId: customerResult.data?.id,
      businessEmailId: businessResult.data?.id,
    });
  } catch (err) {
    logError("send-report", err);
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }
}
