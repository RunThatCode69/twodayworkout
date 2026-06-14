// ─────────────────────────────────────────────────────────────
// Placeholder workout content. Swap these out for your real plan.
// `videoUrl` accepts a YouTube/Vimeo embed URL (or leave "" for an
// empty slot). The PDF + email use this same data, so edit once here.
// ─────────────────────────────────────────────────────────────

export const workout = {
  title: "Two Day Workout",
  tagline: "Two sessions a week. No fluff. Just show up.",
  days: [
    {
      name: "Day 1 — Push / Lower",
      videoUrl: "", // e.g. "https://www.youtube.com/embed/VIDEO_ID"
      videoLabel: "Day 1 walkthrough",
      exercises: [
        { move: "Goblet Squat", sets: "3", reps: "10" },
        { move: "Dumbbell Bench Press", sets: "3", reps: "8–10" },
        { move: "Walking Lunges", sets: "3", reps: "12 / leg" },
        { move: "Overhead Press", sets: "3", reps: "10" },
        { move: "Plank", sets: "3", reps: "45 sec" },
      ],
    },
    {
      name: "Day 2 — Pull / Core",
      videoUrl: "",
      videoLabel: "Day 2 walkthrough",
      exercises: [
        { move: "Romanian Deadlift", sets: "3", reps: "10" },
        { move: "One-Arm Dumbbell Row", sets: "3", reps: "10 / side" },
        { move: "Lat Pulldown (or Band)", sets: "3", reps: "12" },
        { move: "Hammer Curls", sets: "3", reps: "12" },
        { move: "Hanging Knee Raises", sets: "3", reps: "12" },
      ],
    },
  ],
};
