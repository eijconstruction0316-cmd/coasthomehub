import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function esc(str: string | null | undefined): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobType, location, timeline, description, name, email, phone } = body;

    // Sanitise all user-supplied strings before embedding in HTML
    const sJobType = esc(jobType);
    const sLocation = esc(location);
    const sTimeline = esc(timeline || "Not specified");
    const sDescription = esc(description);
    const sName = esc(name);
    const sEmail = esc(email);
    const sPhone = esc(phone);

    // ── 1. Email to business (EIJ Construction) ──────────────────
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
      to: process.env.CONTACT_EMAIL || "info@coasthomehub.com.au",
      subject: `🔧 New Quote Request: ${sJobType} in ${sLocation}`,
      html: `
        <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1f7a72, #3d9990); padding: 24px 28px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 1.4rem;">🔧 New Quote Request</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 0.9rem;">Received via CoastHomeHub</p>
          </div>

          <div style="background: white; border-radius: 10px; padding: 24px; margin-bottom: 16px; border: 1px solid #e8dfd0;">
            <h2 style="font-size: 1rem; color: #1a2332; margin: 0 0 16px;">Job Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${[
                ["Job Type", sJobType],
                ["Location", sLocation],
                ["Timeline", sTimeline],
                ["Description", sDescription],
              ]
                .map(
                  ([k, v]) => `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #f5f0e8; font-weight: 600; color: #4a607a; font-size: 0.85rem; width: 130px;">${k}</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #f5f0e8; color: #1a2332; font-size: 0.9rem;">${v}</td>
                </tr>`
                )
                .join("")}
            </table>
          </div>

          <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e8dfd0;">
            <h2 style="font-size: 1rem; color: #1a2332; margin: 0 0 16px;">Customer Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${[
                ["Name", sName],
                ["Email", `<a href="mailto:${sEmail}">${sEmail}</a>`],
                ["Phone", sPhone ? `<a href="tel:${sPhone}">${sPhone}</a>` : "Not provided"],
              ]
                .map(
                  ([k, v]) => `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #f5f0e8; font-weight: 600; color: #4a607a; font-size: 0.85rem; width: 130px;">${k}</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #f5f0e8; color: #1a2332; font-size: 0.9rem;">${v}</td>
                </tr>`
                )
                .join("")}
            </table>
            <a href="mailto:${sEmail}" style="display: inline-block; margin-top: 16px; background: linear-gradient(135deg, #1f7a72, #3d9990); color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 0.9rem;">
              Reply to ${sName} →
            </a>
          </div>

          <p style="color: #9c7d55; font-size: 0.78rem; text-align: center; margin-top: 16px;">
            This request was submitted via CoastHomeHub · coasthomehub.com.au
          </p>
        </div>
      `,
    });

    // ── 2. Confirmation email to customer ─────────────────────────
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@coasthomehub.com.au",
      to: email,
      subject: `✅ Quote Request Received — CoastHomeHub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1f7a72, #3d9990); padding: 24px 28px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🏠</div>
            <h1 style="color: white; margin: 0; font-size: 1.3rem;">Quote Request Received!</h1>
          </div>

          <div style="background: white; border-radius: 10px; padding: 24px; margin-bottom: 16px;">
            <p style="color: #1a2332; font-size: 1rem; margin: 0 0 12px;">Hi <strong>${sName}</strong>,</p>
            <p style="color: #4a607a; line-height: 1.7; margin: 0 0 20px;">
              Thanks for your quote request! We've received your enquiry for <strong>${sJobType}</strong> in <strong>${sLocation}</strong>.
            </p>
            <p style="color: #4a607a; line-height: 1.7; margin: 0 0 20px;">
              We'll review your request and connect you with <strong>1–3 licensed local tradies</strong> within <strong>7 days</strong>.
            </p>
            <div style="background: #f0f9f8; border: 1px solid #a8d8d3; border-radius: 8px; padding: 16px 20px; margin-top: 16px;">
              <strong style="color: #155e58; font-size: 0.85rem;">Your Request Summary</strong>
              <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                ${[
                  ["Job Type", sJobType],
                  ["Location", sLocation],
                  ["Timeline", sTimeline],
                ]
                  .map(
                    ([k, v]) => `
                  <tr>
                    <td style="padding: 5px 0; color: #3d9990; font-size: 0.82rem; font-weight: 600; width: 100px;">${k}:</td>
                    <td style="padding: 5px 0; color: #1a2332; font-size: 0.85rem;">${v}</td>
                  </tr>`
                  )
                  .join("")}
              </table>
            </div>
          </div>

          <p style="color: #9c7d55; font-size: 0.78rem; text-align: center; margin-top: 8px;">
            Questions? Just reply to this email and our team will help.<br/>
            © 2026 CoastHomeHub & EIJ Construction · coasthomehub.com.au
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
