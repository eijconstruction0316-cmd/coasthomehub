import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CoastHomeHub — Gold Coast & Sunshine Coast Home Experts",
  description:
    "Australia's trusted home improvement platform. Find licensed tradies, browse 2025 home design trends, and get free quotes from Gold Coast to Sunshine Coast.",
  keywords:
    "home improvement Queensland, Gold Coast tradies, Sunshine Coast renovation, waterproofing QLD, home design Australia, DIY home tips, licensed builders QLD",
  openGraph: {
    title: "CoastHomeHub — Gold Coast & Sunshine Coast Home Experts",
    description:
      "Find licensed tradies, explore home design trends, and get free quotes across Gold Coast to Sunshine Coast.",
    type: "website",
    locale: "en_AU",
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
