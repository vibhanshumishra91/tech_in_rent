import type { Metadata } from "next";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TechInRent | LinkedIn Growth Services",
    template: "%s | TechInRent",
  },
  description:
    "TechInRent helps brands and professionals scale outreach, recover accounts, and grow LinkedIn visibility with conversion-focused systems.",
  openGraph: {
    title: "TechInRent | LinkedIn Growth Services",
    description:
      "Scale outreach, recover accounts, and grow LinkedIn visibility with TechInRent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
