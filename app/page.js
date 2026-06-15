"use client";

import { useState } from "react";
import { workout } from "@/app/data/workout";
import { downloadWorkoutPdf } from "@/app/lib/pdf";
import styles from "./page.module.css";

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
        setStatus({ ok: true, msg: "Sent! Check your inbox." });
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
            {sending ? "Sending…" : "Send it"}
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
      </section>

      {/* Videos */}
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

      {/* Bottom-right portrait placeholder — swap for your photo */}
      <div className={styles.portrait} aria-label="Your photo">
        {/* <img src="/me.jpg" alt="Your name" /> */}
        Your photo
      </div>
    </main>
  );
}
