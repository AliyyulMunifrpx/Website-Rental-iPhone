import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "../data/store.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  metadataBase: new URL("https://irent-beta.vercel.app"),

  title: {
    default: `${store.name} — Sewa iPhone di ${store.city}`,
    template: `%s | ${store.name}`,
  },

  description: `Sewa iPhone di ${store.name} mulai dari Rp50 ribu. Pilih iPhone dan aksesoris untuk ngonten, bisnis, liburan, atau kebutuhan lainnya.`,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: `Sewa iPhone di ${store.city} | ${store.name}`,
    description: `Sewa iPhone di ${store.city} untuk kebutuhan konten, bisnis, liburan, dan lainnya.`,
    url: "/",
    siteName: store.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: `${store.name} - Sewa iPhone di ${store.city}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Sewa iPhone di ${store.city} | ${store.name}`,
    description: `Sewa iPhone di ${store.city} untuk kebutuhan konten, bisnis, liburan, dan lainnya.`,
    images: ["/assets/og.webp"],
  },
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
