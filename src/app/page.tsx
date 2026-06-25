"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Header } from "@/components/Header";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { ScrollHero } from "@/components/sections/ScrollHero";
import { Modules } from "@/components/sections/Modules";
import { Approach } from "@/components/sections/Approach";
import { Impact } from "@/components/sections/Impact";
import { Gallery } from "@/components/sections/Gallery";
import { Stories } from "@/components/sections/Stories";
import { Locations } from "@/components/sections/Locations";
import { Teach } from "@/components/sections/Teach";
import { Donate } from "@/components/sections/Donate";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skip}
      </a>

      <Header />

      <main id="main">
        <ScrollHero />
        <Modules />
        <Approach />
        <Impact />
        <Gallery />
        <Stories />
        <Locations />
        <Teach />
        <Donate />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <AccessibilityToolbar />
      <MobileCtaBar />
    </>
  );
}
