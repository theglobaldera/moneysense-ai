import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const description =
  "MoneySense AI is an AI-powered financial literacy assistant that helps young people understand everyday financial concepts and explore financial decisions through simple explanations, realistic scenarios, and practical calculations.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "MoneySense AI — Make money make sense.",
    template: "%s",
  },
  description,
  openGraph: {
    title: "MoneySense AI — Make money make sense.",
    description,
    type: "website",
    siteName: "MoneySense AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneySense AI — Make money make sense.",
    description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#195035",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
