import Link from "next/link";
import styles from "./confirmed.module.css";

export const metadata = {
  title: "Confirmed · Two Day Workout",
};

const MESSAGES = {
  ok: {
    emoji: "✅",
    title: "You're all set!",
    body: "Your Two Day Workout is on its way — check your inbox for the email with the PDF attached.",
  },
  invalid: {
    emoji: "⏳",
    title: "That link expired",
    body: "Confirmation links are valid for 24 hours. Head back and request your workout again.",
  },
  error: {
    emoji: "⚠️",
    title: "Something went wrong",
    body: "We couldn't send your workout just now. Please head back and try again in a moment.",
  },
};

export default async function Confirmed({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || "ok";
  const m = MESSAGES[status] || MESSAGES.ok;

  return (
    <main className="wrap">
      <section className={styles.box}>
        <div className={styles.emoji}>{m.emoji}</div>
        <h1 className={`${styles.title} shiny`}>{m.title}</h1>
        <p className={styles.body}>{m.body}</p>
        <Link className="btn btn-primary" href="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}
