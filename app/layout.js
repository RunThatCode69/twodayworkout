import { Geist } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Two Day Workout",
  description: "A simple, effective two-day workout you can take anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <header className="site-header">
          <Link href="/" className="brand shiny">
            Two Day Workout
          </Link>
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Two Day Workout</span>
          <Link href="/about">Disclaimer</Link>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
