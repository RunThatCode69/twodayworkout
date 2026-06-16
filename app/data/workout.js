// ─────────────────────────────────────────────────────────────
// Workout content. This is the single source of truth — the front
// page, the downloadable PDF, and the emailed copy all read from here.
// `videoUrl` accepts a YouTube/Vimeo embed URL (or leave "" for an
// empty slot). `note` shows a smaller line beneath an exercise.
// `cues` are the form tips shown when you tap a lift (and in the PDF).
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
        {
          move: "Goblet Squats",
          sets: "3",
          reps: "12",
          cues: [
            "Hold one dumbbell vertically against your chest, elbows tucked down.",
            "Feet about shoulder-width, toes turned slightly out.",
            "Sit back and down, keeping your chest up and heels planted.",
            "Lower until thighs are roughly parallel, then drive up through your heels.",
          ],
        },
        {
          move: "Dumbbell RDLs",
          sets: "3",
          reps: "12",
          cues: [
            "Hold dumbbells in front of your thighs with soft (slightly bent) knees.",
            "Push your hips back to hinge — this is not a squat.",
            "Keep the dumbbells close to your legs and your back flat.",
            "Lower until you feel a hamstring stretch, then squeeze your glutes to stand tall.",
          ],
        },
        {
          move: "Dumbbell Lunges",
          sets: "3",
          reps: "12",
          cues: [
            "Hold a dumbbell in each hand at your sides.",
            "Step forward and lower until both knees are about 90 degrees.",
            "Keep your front knee stacked over your ankle and your torso upright.",
            "Push through the front heel to return; alternate legs each rep.",
          ],
        },
        {
          move: "Suitcase Deadlifts",
          sets: "3",
          reps: "12",
          cues: [
            "Stand with a dumbbell on the floor just outside one foot.",
            "Hinge and bend your knees to grip it like a suitcase.",
            "Brace your core and stand tall without leaning to the side.",
            "Keep your shoulders level the whole time; switch sides.",
          ],
        },
        {
          move: "Single Arm Farmers Carries",
          sets: "3",
          reps: "50 meters",
          note: "or Side Planks — 3 x 30 seconds each side",
          cues: [
            "Hold one heavy dumbbell at your side.",
            "Stand tall with shoulders back and core braced.",
            "Walk with controlled steps, resisting the urge to lean away from the weight.",
            "Switch hands and repeat the distance.",
          ],
        },
      ],
    },
    {
      name: "Day 2",
      rest: "One minute to 90 seconds rest each",
      videoUrl: "",
      videoLabel: "Day 2 walkthrough",
      exercises: [
        {
          move: "Bench Press",
          sets: "3",
          reps: "12",
          cues: [
            "Lie flat with feet planted and a slight natural arch in your lower back.",
            "Grip slightly wider than shoulder-width.",
            "Lower the weight to mid-chest under control.",
            "Press up and slightly back without slamming your elbows locked.",
          ],
        },
        {
          move: "Pulldown",
          sets: "3",
          reps: "12",
          cues: [
            "Grip the bar wider than your shoulders, chest up.",
            "Pull the bar to your upper chest, leading with your elbows.",
            "Squeeze your shoulder blades down and together.",
            "Let the bar rise back under control — don't let it yank you up.",
          ],
        },
        {
          move: "Single Arm Rows",
          sets: "3",
          reps: "12",
          cues: [
            "Brace one hand and knee on a bench with a flat back.",
            "Let the dumbbell hang, then row it up toward your hip.",
            "Drive your elbow back and squeeze the shoulder blade.",
            "Lower under control and keep your torso still; switch sides.",
          ],
        },
        {
          move: "Single Arm Press",
          sets: "3",
          reps: "12",
          cues: [
            "Hold a dumbbell at shoulder height, palm facing forward.",
            "Brace your core so you don't lean back.",
            "Press straight overhead until your arm is extended.",
            "Lower under control to the start; switch sides.",
          ],
        },
        {
          move: "Single Arm Standing Dumbbell Hold",
          sets: "3",
          reps: "30 sec / side",
          cues: [
            "Hold one dumbbell at your side, standing tall.",
            "Brace your core and keep your shoulders level.",
            "Resist the pull to one side for the full time.",
            "Switch hands and repeat.",
          ],
        },
      ],
    },
  ],
};
