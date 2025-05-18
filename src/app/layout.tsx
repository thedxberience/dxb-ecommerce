import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const IvyPresto = localFont({
  src: "../../public/font/Ivy Presto/Ivy Presto 3.otf",
  display: "swap",
  variable: "--font-ivy-presto",
});

const noah = localFont({
  src: "../../public/font/Noah/Noah Regular.otf",
  display: "swap",
  variable: "--font-noah",
});

export const metadata: Metadata = {
  title: "Dxberience | Curated Luxury & Lifestyle Shopping",
  description:
    "Discover a premium shopping experience with Dxberience — featuring exclusive fashion, luxury essentials, and lifestyle collections handpicked for the modern trendsetter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IvyPresto.variable} ${noah.variable} font-noah antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
