"use client";

import { useState } from "react";
import { workout } from "@/app/data/workout";
import { downloadWorkoutPdf } from "@/app/lib/pdf";
import styles from "./page.module.css";

// Flip to true when the walkthrough videos are ready to publish.
const SHOW_VIDEOS = false;

const FAQ = [
  {
    q: "How often should I do this?",
    a: "Twice a week, with at least one rest day between sessions. Two quality days you actually show up for beats five you skip.",
  },
  {
    q: "Should I worry about how much weight to lift?",
    a: "No. Start lighter than you think and nail your form first. You can always add weight next week — you can't un-tweak a back.",
  },
  {
    q: "Do I need to warm up?",
    a: "Yes. Spend 5–10 minutes getting your heart rate up and your joints moving before the first set. It prevents injuries and makes the work feel better.",
  },
  {
    q: "How do I keep making progress?",
    a: "Over time you can add a little — one more rep, slightly more weight, or cleaner form. But there's no rush: staying at the same weight for several weeks is completely fine. Consistency and good form matter far more than constantly adding load.",
  },
  {
    q: "How fast should my reps be?",
    a: "Controlled. Lower the weight slowly, move through the full range of motion, and don't use momentum. Slow and clean beats fast and sloppy.",
  },
  {
    q: "What about rest between sets?",
    a: "One minute to 90 seconds, as the plan says. Enough to recover, not so long you cool off.",
  },
  {
    q: "Do I need to change how I eat?",
    a: "Generally, eating enough and including a source of protein with your meals supports recovery from training. This isn't nutrition advice — everyone's needs are different, so talk to a doctor or registered dietitian for a plan that fits you.",
  },
  {
    q: "How important is sleep?",
    a: "Huge. Aim for 7–9 hours. Muscle is repaired and built while you rest, not while you train.",
  },
  {
    q: "Should I be drinking more water?",
    a: "Yes — stay hydrated through the day, not just during the workout. Even mild dehydration saps strength and focus.",
  },
  {
    q: "What if something hurts?",
    a: "Know the difference between muscle soreness (normal) and sharp or joint pain (stop). When in doubt, back off and check with a doctor.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { ok: boolean, msg: string }
  const [sending, setSending] = useState(false);

  async function sendToEmail(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          ok: true,
          msg: "Almost there — check your inbox and tap the confirmation link to get your workout.",
        });
        setEmail("");
      } else {
        setStatus({ ok: false, msg: data.error || "Could not send." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error. Try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="wrap">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Train smart · 2x a week</div>
        <h1 className={`${styles.title} shiny`}>{workout.title}</h1>
        <p className={styles.tagline}>{workout.tagline}</p>

        <div className={styles.actions}>
          <button
            className="btn btn-primary"
            onClick={() => downloadWorkoutPdf(workout)}
          >
            ⬇ Download this workout
          </button>
          <a className="btn btn-ghost" href="#email">
            ✉ Send to my email
          </a>
        </div>
      </section>

      {/* Workout */}
      <section className={styles.workout}>
        {workout.days.map((day) => (
          <div key={day.name} className={styles.card}>
            <h2 className={styles.cardTitle}>{day.name}</h2>
            {day.rest && <p className={styles.rest}>{day.rest}</p>}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th className="num">Sets</th>
                  <th className="num">Reps</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((ex) => (
                  <tr key={ex.move}>
                    <td>
                      {ex.move}
                      {ex.note && <span className={styles.note}>{ex.note}</span>}
                    </td>
                    <td className={styles.num}>{ex.sets}</td>
                    <td className={styles.num}>{ex.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* Email capture */}
      <section id="email" className={styles.emailBox}>
        <strong>Want it in your inbox?</strong>
        <p className={styles.emailSub}>
          We&apos;ll send a quick confirmation link to make sure it&apos;s really
          you, then deliver the workout as a PDF.
        </p>
        <form className={styles.emailRow} onSubmit={sendToEmail}>
          <input
            className={styles.input}
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Confirm my email"}
          </button>
        </form>
        {status && (
          <p
            className={`${styles.status} ${
              status.ok ? styles.statusOk : styles.statusErr
            }`}
          >
            {status.msg}
          </p>
        )}
        <p className={styles.privacy}>
          🔒 Your privacy matters. We will <strong>never sell your data</strong>,
          and your email won&apos;t be used for anything else.
        </p>
      </section>

      {/* Videos — hidden until walkthroughs are ready (flip SHOW_VIDEOS) */}
      {SHOW_VIDEOS && (
        <section className={styles.videos}>
          <h2 className="section-title shiny">Follow along</h2>
          <div className={styles.videoGrid}>
            {workout.days.map((day) => (
              <div key={day.name} className={styles.videoCard}>
                <div className={styles.videoFrame}>
                  {day.videoUrl ? (
                    <iframe
                      src={day.videoUrl}
                      title={day.videoLabel}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className={styles.videoPlaceholder}>
                      🎥 Video coming soon
                    </div>
                  )}
                </div>
                <div className={styles.videoLabel}>{day.videoLabel}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — beginner basics (kept at the very bottom) */}
      <section className={styles.faq}>
        <h2 className="section-title shiny">New to working out? Start here</h2>
        <div className={styles.faqList}>
          {FAQ.map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom-right portrait placeholder — swap for your photo */}
      <div className={styles.portrait} aria-label="Your photo">
        {/* <img src="/me.jpg" alt="Your name" /> */}
        Your photo
      </div>
    </main>
  );
}
