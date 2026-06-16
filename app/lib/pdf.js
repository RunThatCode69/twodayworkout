import { jsPDF } from "jspdf";

// Build a clean, branded PDF of the workout from the shared data object.
export function generateWorkoutPdf(workout) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 56;
  let y = margin;

  // Title
  doc.setTextColor(47, 111, 224); // --blue-600
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(workout.title, margin, y);
  y += 24;

  // Tagline
  doc.setTextColor(111, 134, 168); // --muted
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(workout.tagline, margin, y);
  y += 28;

  workout.days.forEach((day) => {
    // Day heading
    doc.setTextColor(61, 134, 245); // --blue-500
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(day.name, margin, y);
    y += 16;

    // Rest note
    if (day.rest) {
      doc.setTextColor(111, 134, 168);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(day.rest, margin, y);
      y += 6;
    }

    // Divider
    doc.setDrawColor(227, 237, 255); // --border
    doc.setLineWidth(1);
    doc.line(margin, y, pageW - margin, y);
    y += 20;

    // Column headers
    doc.setTextColor(111, 134, 168);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("EXERCISE", margin, y);
    doc.text("SETS", pageW - margin - 120, y);
    doc.text("REPS", pageW - margin - 60, y);
    y += 6;
    doc.line(margin, y, pageW - margin, y);
    y += 16;

    // Rows
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    day.exercises.forEach((ex) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(String(ex.move), margin, y);
      doc.text(String(ex.sets), pageW - margin - 120, y);
      doc.text(String(ex.reps), pageW - margin - 60, y);
      y += 16;

      if (ex.note) {
        doc.setTextColor(111, 134, 168);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(String(ex.note), margin, y);
        y += 16;
      } else {
        y += 4;
      }
    });

    y += 24;
  });

  // ── "How to do each lift" section ──────────────────────────────
  const pageH = doc.internal.pageSize.getHeight();
  const ensureSpace = (needed) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.addPage();
  y = margin;

  doc.setTextColor(47, 111, 224);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("How to do each lift", margin, y);
  y += 28;

  workout.days.forEach((day) => {
    ensureSpace(40);
    doc.setTextColor(61, 134, 245);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(day.name, margin, y);
    y += 20;

    day.exercises.forEach((ex) => {
      if (!ex.cues || ex.cues.length === 0) return;
      ensureSpace(28);

      // Exercise name
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12.5);
      doc.text(String(ex.move), margin, y);
      y += 16;

      // Bullet cues (wrapped)
      doc.setTextColor(68, 84, 110);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const bulletIndent = 14;
      const textWidth = pageW - margin * 2 - bulletIndent;
      ex.cues.forEach((cue) => {
        const lines = doc.splitTextToSize(String(cue), textWidth);
        ensureSpace(lines.length * 14 + 2);
        doc.text("•", margin, y);
        doc.text(lines, margin + bulletIndent, y);
        y += lines.length * 14 + 2;
      });
      y += 10;
    });

    y += 8;
  });

  // Footer on every page
  const pageCount = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setTextColor(111, 134, 168);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Consult a physician before starting any exercise program. Train at your own risk.",
      margin,
      pageH - 36
    );
  }

  return doc;
}

export function downloadWorkoutPdf(workout) {
  const doc = generateWorkoutPdf(workout);
  doc.save("two-day-workout.pdf");
}
