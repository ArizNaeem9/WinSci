import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Noto_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { AccessibilityProvider } from "@/a11y/AccessibilityProvider";
import { SpeechProvider } from "@/audio/SpeechProvider";

const display = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://winsci.org";
const TITLE = "WinSci: Future skills for every mind";
const DESCRIPTION =
  "A free, accessible learning platform for women and students with disabilities. Take free courses in AI, programming, design and communication, or submit your own course to teach. Based in Abbottabad and Lahore.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · WinSci",
  },
  description: DESCRIPTION,
  applicationName: "WinSci",
  keywords: [
    "WinSci",
    "free online courses",
    "accessible education",
    "women in tech",
    "students with disabilities",
    "AI",
    "programming",
    "design",
    "Abbottabad",
    "Lahore",
    "nonprofit learning platform",
  ],
  authors: [{ name: "WinSci" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "WinSci",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "WinSci — three diverse students learning together with laptops and a tablet.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  // Icons are provided by the src/app/ file convention:
  // favicon.ico, icon.svg, apple-icon.png — Next injects them automatically.
};

export const viewport: Viewport = {
  themeColor: "#0a0e1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${display.variable} ${notoSans.variable} ${notoUrdu.variable} h-full`}
    >
      <body className="min-h-full">
        <AccessibilityProvider>
          <LanguageProvider>
            <SpeechProvider>{children}</SpeechProvider>
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
