import type { APIRoute } from "astro";
import { z } from "astro:content";
import { Resend } from "resend";

// On-demand server route. Marketing pages remain prerendered.
export const prerender = false;

const ContactInput = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(200),
  company: z.string().trim().max(160).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  interest: z.array(z.string().max(80)).max(10).default([]),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

const redirectTo = (origin: string, status: "success" | "error", anchor = "contact") =>
  new Response(null, {
    status: 303,
    headers: { Location: `${origin}/contact?contact_status=${status}#${anchor}` },
  });

export const POST: APIRoute = async ({ request, url }) => {
  const origin = url.origin;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirectTo(origin, "error");
  }

  // Honeypot — hidden field; bots fill everything, humans never see it.
  const honeypot = (form.get("website") as string | null) ?? "";
  if (honeypot.trim() !== "") {
    // Pretend success so bots don't learn anything.
    return redirectTo(origin, "success");
  }

  const raw = {
    name: (form.get("name") as string) ?? "",
    email: (form.get("email") as string) ?? "",
    company: (form.get("company") as string) ?? "",
    role: (form.get("role") as string) ?? "",
    interest: form.getAll("interest").map(String),
    message: (form.get("message") as string) ?? "",
  };

  const parsed = ContactInput.safeParse(raw);
  if (!parsed.success) {
    return redirectTo(origin, "error");
  }
  const input = parsed.data;

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toAddress = import.meta.env.CONTACT_TO_EMAIL ?? "team@northstriderconsulting.com";
  const fromAddress = import.meta.env.CONTACT_FROM_EMAIL ?? "Peregrine Systems Contact <onboarding@resend.dev>";

  // Dev mode without a key: log to console, still report success so the form is testable.
  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.log("[contact] no RESEND_API_KEY set — logging submission instead:");
      console.log(JSON.stringify(input, null, 2));
      return redirectTo(origin, "success");
    }
    console.error("[contact] RESEND_API_KEY missing in production");
    return redirectTo(origin, "error");
  }

  const subjectName = input.company ? `${input.name} (${input.company})` : input.name;
  const interestLine = input.interest.length ? input.interest.join(", ") : "—";

  const text = [
    `New inquiry from ${input.name} <${input.email}>`,
    input.company ? `Company: ${input.company}` : null,
    input.role ? `Role: ${input.role}` : null,
    `Interest: ${interestLine}`,
    "",
    "Message:",
    input.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0E1726; max-width: 560px;">
      <h2 style="font-family: Georgia, serif; color: #B8923A; margin: 0 0 16px;">New inquiry — Peregrine Systems</h2>
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p>
      ${input.company ? `<p style="margin: 0 0 8px;"><strong>Company:</strong> ${escapeHtml(input.company)}</p>` : ""}
      ${input.role ? `<p style="margin: 0 0 8px;"><strong>Role:</strong> ${escapeHtml(input.role)}</p>` : ""}
      <p style="margin: 0 0 16px;"><strong>Interest:</strong> ${escapeHtml(interestLine)}</p>
      <hr style="border: none; border-top: 1px solid #D9CDA9; margin: 16px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(input.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: input.email,
      subject: `New inquiry from ${subjectName}`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return redirectTo(origin, "error");
    }
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return redirectTo(origin, "error");
  }

  return redirectTo(origin, "success");
};

export const ALL: APIRoute = ({ url }) =>
  new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST", Location: `${url.origin}/contact` },
  });
