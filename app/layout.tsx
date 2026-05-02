import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechInRent | LinkedIn Growth Services",
  description:
    "TechInRent helps brands and professionals grow LinkedIn reach with secure, fast, and reliable growth services.",
  keywords: "LinkedIn growth, LinkedIn account management, LinkedIn outreach, B2B lead generation, LinkedIn services, account recovery",
  authors: [{ name: "TechInRent" }],
  openGraph: {
    title: "TechInRent | LinkedIn Growth Services",
    description: "TechInRent helps brands and professionals grow LinkedIn reach with secure, fast, and reliable growth services.",
    type: "website",
    locale: "en_US",
    siteName: "TechInRent",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechInRent | LinkedIn Growth Services",
    description: "TechInRent helps brands and professionals grow LinkedIn reach with secure, fast, and reliable growth services.",
    creator: "@techinrent",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Arima:wght@100..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
