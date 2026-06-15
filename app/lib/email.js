import { workout } from "@/app/data/workout";

const PRIVACY =
  "We will never sell your data, and your email will never be used for anything else.";

// The full workout, formatted as HTML (sent after the user confirms).
export function buildWorkoutEmailHtml() {
  const days = workout.days
    .map((day) => {
      const rows = day.exercises
        .map(
          (ex) => `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;">
                ${ex.move}
                ${
                  ex.note
                    ? `<br><span style="color:#6f86a8;font-size:13px;">${ex.note}</span>`
                    : ""
                }
              </td>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;text-align:center;vertical-align:top;">${ex.sets}</td>
              <td style="padding:8px 0;border-bottom:1px solid #e3edff;text-align:center;vertical-align:top;">${ex.reps}</td>
            </tr>`
        )
        .join("");
      return `
        <h2 style="color:#3d86f5;margin:28px 0 4px;">${day.name}</h2>
        ${
          day.rest
            ? `<p style="color:#6f86a8;font-style:italic;margin:0 0 8px;">${day.rest}</p>`
            : ""
        }
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
    <p style="color:#283042;margin:0 0 8px;">Your workout is below, and a printable PDF is attached.</p>
    ${days}
    <p style="color:#6f86a8;font-size:12px;margin-top:32px;">
      Consult a physician before starting any exercise program. Train at your own risk.
    </p>
    <p style="color:#9aa9c0;font-size:11px;margin-top:8px;">${PRIVACY}</p>
  </div>`;
}

// The confirmation email with the verification button (sent first).
export function buildConfirmEmailHtml(confirmUrl) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="color:#2f6fe0;margin:0 0 8px;">Confirm your email</h1>
    <p style="color:#283042;margin:0 0 20px;">
      Tap the button below to confirm it&apos;s you, and we&apos;ll send your
      ${workout.title} (with a downloadable PDF).
    </p>
    <p style="margin:0 0 24px;">
      <a href="${confirmUrl}"
         style="display:inline-block;background:#3d86f5;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">
        Confirm &amp; send my workout
      </a>
    </p>
    <p style="color:#6f86a8;font-size:13px;margin:0 0 4px;">
      If you didn&apos;t request this, you can safely ignore this email.
    </p>
    <p style="color:#9aa9c0;font-size:11px;margin-top:24px;">${PRIVACY}</p>
  </div>`;
}
