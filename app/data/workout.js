// ─────────────────────────────────────────────────────────────
// Workout content. This is the single source of truth — the front
// page, the downloadable PDF, and the emailed copy all read from here.
// `videoUrl` accepts a YouTube/Vimeo embed URL (or leave "" for an
// empty slot). `note` on an exercise shows a smaller line beneath it.
// ─────────────────────────────────────────────────────────────

export const workout = {
  title: "Two Day Workout",
  tagline: "Two sessions a week. No fluff. Just show up.",
  days: [
    {
      name: "Day 1",
      rest: "One minute to 90 seconds rest each",
      videoUrl: "", // e.g. "https://www.youtube.com/embed/VIDEO_ID"
      videoLabel: "Day 1 walkthrough",
      exercises: [
        { move: "Goblet Squats", sets: "3", reps: "12" },
        { move: "Dumbbell RDLs", sets: "3", reps: "12" },
        { move: "Dumbbell Lunges", sets: "3", reps: "12" },
        { move: "Suitcase Deadlifts", sets: "3", reps: "12" },
        {
          move: "Single Arm Farmers Carries",
          sets: "3",
          reps: "50 meters",
          note: "or Side Planks — 3 x 30 seconds each side",
        },
      ],
    },
    {
      name: "Day 2",
      rest: "One minute to 90 seconds rest each",
      videoUrl: "",
      videoLabel: "Day 2 walkthrough",
      exercises: [
        { move: "Bench Press", sets: "3", reps: "12" },
        { move: "Pulldown", sets: "3", reps: "12" },
        { move: "Single Arm Rows", sets: "3", reps: "12" },
        { move: "Single Arm Press", sets: "3", reps: "12" },
        {
          move: "Single Arm Standing Dumbbell Hold",
          sets: "3",
          reps: "30 sec / side",
        },
      ],
    },
  ],
};
