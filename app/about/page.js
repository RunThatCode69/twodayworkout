import styles from "./about.module.css";

export const metadata = {
  title: "About · Two Day Workout",
  description: "About the creator and liability disclaimer.",
};

export default function About() {
  return (
    <main className="wrap">
      <section className={styles.about}>
        <h1 className="section-title shiny">About</h1>

        <p className={styles.lead}>
          Hi, I&apos;m{" "}
          <strong className={styles.name}>Brandon Poulter</strong>. I have over{" "}
          <strong>10 years of experience in personal training and training
          athletes</strong>, and I built Two Day Workout to make consistent
          training simple, two focused sessions a week that anyone can stick
          to.
        </p>

        <h2 className={styles.h2}>Liability &amp; Disclaimer</h2>
        <div className={styles.legal}>
          <p>
            The information provided on Two Day Workout is for general
            informational and educational purposes only and is not a substitute
            for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always consult a qualified physician or healthcare provider before
            beginning any exercise program, especially if you have a
            pre-existing medical condition, are pregnant, or have any concerns
            about your ability to exercise safely.
          </p>
          <p>
            By using this website and performing any of the exercises described,
            you do so entirely at your own risk. You voluntarily assume all risk
            of injury, illness, or damage that may result. Brandon Poulter and
            Two Day Workout shall not be liable for any injury, loss, or damage
            of any kind arising from or related to your use of this website or
            the workouts contained herein.
          </p>
          <p>
            If you experience pain, dizziness, shortness of breath, or any other
            unusual symptoms while exercising, stop immediately and seek medical
            attention.
          </p>
        </div>
      </section>
    </main>
  );
}
