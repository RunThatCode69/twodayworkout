import { Resend } from "resend";
import { createToken } from "@/app/lib/token";
import { buildConfirmEmailHtml } from "@/app/lib/email";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email is not configured yet (missing RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    // Build the one-time confirmation link (double opt-in).
    const token = createToken(email);
    const confirmUrl = `${request.nextUrl.origin}/api/confirm?token=${encodeURIComponent(
      token
    )}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Two Day Workout <workout@twodayworkout.com>",
      to: email,
      subject: "Confirm your email to get your Two Day Workout",
      html: buildConfirmEmailHtml(confirmUrl),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
