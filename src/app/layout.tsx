import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "CoastHomeHub — Gold Coast & Sunshine Coast Home Experts",
    template: "%s | CoastHomeHub",
  },
  description:
    "Australia's trusted home improvement platform. Find QBCC-licensed tradies, browse 2025 home design trends, and get free quotes from Gold Coast to Sunshine Coast.",
  keywords:
    "home improvement Queensland, Gold Coast tradies, Sunshine Coast renovation, waterproofing QLD, home design Australia, DIY home tips, QBCC licensed builders, bathroom renovation Gold Coast",
  metadataBase: new URL("https://coasthomehub.com.au"),
  alternates: { canonical: "https://coasthomehub.com.au" },
  openGraph: {
    title: "CoastHomeHub — Gold Coast & Sunshine Coast Home Experts",
    description:
      "Find QBCC-licensed tradies, use our free AI renovation designer, and get up to 3 quotes across Gold Coast and Sunshine Coast.",
    url: "https://coasthomehub.com.au",
    siteName: "CoastHomeHub",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoastHomeHub — Gold Coast & Sunshine Coast Home Experts",
    description:
      "Free AI renovation designer + QBCC-licensed tradie quotes. Gold Coast to Sunshine Coast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
