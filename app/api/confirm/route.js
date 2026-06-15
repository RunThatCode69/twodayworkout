import { Resend } from "resend";
import { verifyToken } from "@/app/lib/token";
import { buildWorkoutEmailHtml } from "@/app/lib/email";
import { generateWorkoutPdf } from "@/app/lib/pdf";
import { workout } from "@/app/data/workout";

export async function GET(request) {
  const origin = request.nextUrl.origin;
  const token = request.nextUrl.searchParams.get("token");
  const email = verifyToken(token);

  if (!email) {
    return Response.redirect(`${origin}/confirmed?status=invalid`, 302);
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.redirect(`${origin}/confirmed?status=error`, 302);
  }

  try {
    // Generate the PDF server-side and attach it to the email.
    const doc = generateWorkoutPdf(workout);
    const pdfBase64 = doc.output("datauristring").split("base64,")[1];

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Two Day Workout <onboarding@resend.dev>",
      to: email,
      subject: "Your Two Day Workout",
      html: buildWorkoutEmailHtml(),
      attachments: [
        {
          filename: "two-day-workout.pdf",
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      return Response.redirect(`${origin}/confirmed?status=error`, 302);
    }

    return Response.redirect(`${origin}/confirmed?status=ok`, 302);
  } catch {
    return Response.redirect(`${origin}/confirmed?status=error`, 302);
  }
}
