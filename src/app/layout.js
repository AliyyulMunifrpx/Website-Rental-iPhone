import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "iRent.This — Sewa iPhone di Magelang",
    template: "%s | iRent.This",
  },
  description:
    "Sewa iPhone di Magelang mulai dari Rp50 ribu/hari. Pilih iPhone dan aksesoris untuk ngonten, bisnis, liburan, atau kebutuhan lainnya.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
