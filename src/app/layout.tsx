import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google"; // Grouped imports
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide', // This creates the CSS variable
});

export const metadata: Metadata = {
  title: "CourtSight Analytics",
  description: "Advanced Basketball Scouting & AI Summarization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} antialiased bg-black`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}