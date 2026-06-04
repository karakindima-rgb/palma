import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Пальма — Пляжный волейбольный центр",
  description: "Тренируйся на песке. Играй на уровне профи.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
