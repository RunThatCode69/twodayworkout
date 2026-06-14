import { Resend } from "resend";
import { workout } from "@/app/data/workout";

// Build a simple branded HTML email from the workout data.
function buildEmailHtml() {
  const days = workout.days
    .map((day) => {
      const rows = day.exercises
        .map(
          (ex) => `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;">${ex.move}</td>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;text-align:center;">${ex.sets}</td>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;text-align:center;">${ex.reps}</td>
            </tr>`
        )
        .join("");
      return `
        <h2 style="color:#3d86f5;margin:28px 0 8px;">${day.name}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#283042;">
          <tr style="color:#6f86a8;font-size:12px;text-transform:uppercase;">
            <th style="text-align:left;padding-bottom:6px;">Exercise</th>
            <th style="padding-bottom:6px;">Sets</th>
            <th style="padding-bottom:6px;">Reps</th>
          </tr>
          ${rows}
        </table>`;
    })
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="color:#2f6fe0;margin:0 0 4px;">${workout.title}</h1>
    <p style="color:#6f86a8;margin:0 0 8px;">${workout.tagline}</p>
    ${days}
    <p style="color:#6f86a8;font-size:12px;margin-top:32px;">
      Consult a physician before starting any exercise program. Train at your own risk.
    </p>
  </div>`;
}

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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Two Day Workout <onboarding@resend.dev>",
      to: email,
      subject: "Your Two Day Workout",
      html: buildEmailHtml(),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
