export type Lang = "en" | "ur" | "es";

export const LANGS: { code: Lang; label: string; native: string; dir: "ltr" | "rtl"; speech: string }[] = [
  { code: "en", label: "English", native: "English", dir: "ltr", speech: "en-US" },
  { code: "ur", label: "Urdu", native: "اردو", dir: "rtl", speech: "ur-PK" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr", speech: "es-ES" },
];

type Module = { title: string; desc: string };
type Step = { title: string; desc: string };
type Stat = { value: string; label: string };
type Project = { title: string; tag: string; desc: string; author: string };
type Story = { quote: string; name: string; role: string };
type Loc = { city: string; country: string; desc: string; focus: string; badge: string; status: "original" | "active" | "soon" };
type Tier = { amount: string; title: string; desc: string };
type FAQ = { q: string; a: string };

export type Dict = {
  meta: { title: string; description: string };
  a11y: {
    skip: string; toolbar: string; listen: string; stop: string; contrast: string;
    textSize: string; motion: string; language: string; sizeNormal: string;
    sizeLarge: string; sizeXL: string; on: string; off: string; prev: string; next: string; close: string; menu: string;
  };
  nav: { home: string; modules: string; results: string; reviews: string; teach: string; donate: string; contact: string };
  hero: {
    eyebrow: string; titleA: string; titleHighlight: string; titleB: string;
    subtitle: string; ctaPrimary: string; ctaSecondary: string; listenIntro: string; mascotHi: string;
  };
  trust: string;
  modulesSection: {
    eyebrow: string; title: string; subtitle: string; enroll: string;
    items: Module[]; moreTitle: string; moreDesc: string; moreCta: string;
  };
  approach: { eyebrow: string; title: string; subtitle: string; steps: Step[] };
  impact: {
    eyebrow: string; title: string; subtitle: string; stats: Stat[];
    partnersTitle: string; partners: string[];
  };
  gallery: { eyebrow: string; title: string; subtitle: string; items: Project[]; by: string };
  stories: {
    eyebrow: string; title: string; items: Story[];
    writeCta: string; formTitle: string; rName: string; rNamePh: string; rRole: string;
    rRolePh: string; rRating: string; rQuote: string; rQuotePh: string; submit: string;
    sending: string; success: string;
  };
  locations: { eyebrow: string; title: string; subtitle: string; items: Loc[] };
  teach: {
    eyebrow: string; title: string; subtitle: string; points: string[];
    creator: string; creatorPh: string; contact: string; contactPh: string;
    courseTitle: string; courseTitlePh: string; category: string; categories: string[];
    level: string; levels: string[]; description: string; descriptionPh: string;
    links: string; linksPh: string; submit: string; sending: string; success: string; note: string;
  };
  enroll: {
    title: string; subtitle: string; courseLabel: string; name: string; namePh: string;
    contact: string; contactPh: string; city: string; cityPh: string; needs: string; needsPh: string;
    message: string; messagePh: string; submit: string; sending: string; success: string;
  };
  donate: {
    eyebrow: string; title: string; subtitle: string; raisedLabel: string; goalLabel: string;
    raised: string; goal: string; percent: number; tiers: Tier[]; custom: string;
    customPh: string; cta: string; monthly: string; oneTime: string; note: string;
  };
  faq: { title: string; items: FAQ[] };
  contact: {
    title: string; subtitle: string; name: string; email: string; message: string;
    send: string; sent: string; namePh: string; emailPh: string; messagePh: string;
  };
  footer: { tagline: string; rights: string; built: string; explore: string; org: string; connect: string };
  errors: { generic: string };
};

export const translations: Record<Lang, Dict> = {
  en: {
    meta: {
      title: "WinSci: Future skills for every mind",
      description:
        "WinSci is a nonprofit learning platform for women and students with disabilities. Take free courses in AI, programming, design and communication, or submit your own course to teach.",
    },
    a11y: {
      skip: "Skip to main content", toolbar: "Accessibility options", listen: "Listen", stop: "Stop",
      contrast: "High contrast", textSize: "Text size", motion: "Reduce motion", language: "Language",
      sizeNormal: "Normal", sizeLarge: "Large", sizeXL: "Extra large", on: "On", off: "Off",
      prev: "Previous", next: "Next", close: "Close", menu: "Menu",
    },
    nav: {
      home: "Home", modules: "Courses", results: "Results", reviews: "Reviews",
      teach: "Teach", donate: "Donate", contact: "Contact",
    },
    hero: {
      eyebrow: "Free • Accessible • Learn or teach",
      titleA: "WinSci,",
      titleHighlight: "every mind",
      titleB: "wins with skills",
      subtitle:
        "A learning platform for women and students with disabilities. Take free courses in AI, programming, design and communication, or become a creator and teach what you know.",
      ctaPrimary: "Explore courses",
      ctaSecondary: "Donate",
      listenIntro:
        "Welcome to WinSci. We are a free, accessible learning platform for women and students with disabilities, based in Abbottabad and Lahore. Anyone can take a course, and any creator can submit one to teach. Press any listen button to hear the page read aloud.",
      mascotHi: "Hi! I'm Sci. Tap me and I'll read this page for you.",
    },
    trust: "A local nonprofit working with inclusive schools across Abbottabad and Lahore",
    modulesSection: {
      eyebrow: "What you can learn",
      title: "Courses that open real doors",
      subtitle: "Every course is free, taught in your language, and designed for every kind of learner.",
      enroll: "Enroll",
      items: [
        { title: "Communication", desc: "Confident speaking, writing and storytelling for the real world." },
        { title: "AI & Machine Learning", desc: "Understand and build with AI, from smart prompts to your first model." },
        { title: "Programming", desc: "Code from zero: web, Python and joyful problem-solving." },
        { title: "Design", desc: "UI/UX and digital creativity that anyone can pick up." },
      ],
      moreTitle: "Have something to teach?",
      moreDesc: "Any creator can submit a course on any topic. We review every one before it goes live.",
      moreCta: "Become a creator",
    },
    approach: {
      eyebrow: "How it works",
      title: "From curious to capable in four steps",
      subtitle: "No cost, no jargon, no judgement. Just a path that fits you.",
      steps: [
        { title: "Enroll free", desc: "Pick a course and tell us a little about you. We speak English, Urdu and Spanish." },
        { title: "Learn your way", desc: "Audio, captions, and hands-on projects adapt to how you learn best." },
        { title: "Build something", desc: "Every course ends with a real project you can show and be proud of." },
        { title: "Win & go further", desc: "Earn a certificate, join the community, and step toward study or work." },
      ],
    },
    impact: {
      eyebrow: "Our results",
      title: "Proof, counted carefully",
      subtitle: "Numbers from our 2025 community report.",
      stats: [
        { value: "30+", label: "Learners taught for free" },
        { value: "12", label: "Real projects shipped" },
        { value: "94%", label: "Feel more confident" },
        { value: "5", label: "Partner schools" },
      ],
      partnersTitle: "Proudly working with",
      partners: [
        "Beaconhouse School System",
        "Kingston School, Abbottabad",
        "School for Blind Girls, Abbottabad",
        "PSRD Inclusive School",
        "Special Education Centre, Abbottabad",
      ],
    },
    gallery: {
      eyebrow: "Showcase",
      title: "Built by our students",
      subtitle: "Real projects from learners across our campuses. Swipe to explore.",
      by: "by",
      items: [
        { title: "Talking Hands", tag: "AI", desc: "An app that turns sign language into text in real time.", author: "Hamza, 17" },
        { title: "My City, Step-Free", tag: "Design", desc: "A map of wheelchair-friendly routes across the neighborhood.", author: "Muhammad, 16" },
        { title: "Voice Notes", tag: "Programming", desc: "A note app made for dyslexic learners, by a dyslexic learner.", author: "Anasha, 17" },
        { title: "Solar Sorter", tag: "Robotics", desc: "A small robot that sorts recycling using a solar panel.", author: "Saad, 18" },
        { title: "Our Story", tag: "Communication", desc: "A podcast where students tell the stories no one asked them for.", author: "Muhib, 15" },
        { title: "Budget Buddy", tag: "Data", desc: "A simple dashboard that helps families plan their week.", author: "Zainab, 19" },
      ],
    },
    stories: {
      eyebrow: "Reviews",
      title: "What winning feels like",
      items: [
        { quote: "I never thought code was for someone like me. Now I've built an app my whole class uses.", name: "Anasha", role: "Programming learner, Lahore" },
        { quote: "The audio lessons meant my dyslexia stopped being a wall. I finally kept up, then got ahead.", name: "Muhib", role: "Design learner, Abbottabad" },
        { quote: "WinSci gave my daughter a place where her wheelchair was never the conversation. Her ideas were.", name: "Rabia", role: "Parent, Abbottabad" },
      ],
      writeCta: "Write a review",
      formTitle: "Share your experience",
      rName: "Your name",
      rNamePh: "e.g. Hamza",
      rRole: "You are a…",
      rRolePh: "e.g. Programming learner, Lahore",
      rRating: "Your rating",
      rQuote: "Your review",
      rQuotePh: "What did WinSci change for you?",
      submit: "Post review",
      sending: "Sending…",
      success: "Thank you! Your review is in and will appear after a quick check.",
    },
    locations: {
      eyebrow: "Where we work",
      title: "Three cities, one mission",
      subtitle: "Rooted in community, growing carefully.",
      items: [
        { city: "Abbottabad", country: "Pakistan", desc: "Where WinSci began, with neighborhood tech hubs and inclusive schools for women and students.", focus: "Home base", badge: "Where it started", status: "original" },
        { city: "Lahore", country: "Pakistan", desc: "Our second campus, bringing free, accessible courses to more learners across the city.", focus: "In-person & online", badge: "Now active", status: "active" },
        { city: "Houston", country: "United States", desc: "Our first international campus, launching with partner schools and community centers.", focus: "Launching 2026", badge: "Coming soon", status: "soon" },
      ],
    },
    teach: {
      eyebrow: "Become a creator",
      title: "Teach what you know on WinSci",
      subtitle: "Anyone online can submit a course on any topic. Our team reviews every submission, then we publish it free for learners who need it most.",
      points: [
        "Any subject: tech, art, life skills, languages, anything you can teach",
        "We review every course for quality and accessibility before it goes live",
        "Your course reaches women and students with disabilities, completely free",
      ],
      creator: "Your name",
      creatorPh: "e.g. Hamza Khan",
      contact: "Email",
      contactPh: "you@example.com",
      courseTitle: "Course title",
      courseTitlePh: "e.g. Intro to Python for beginners",
      category: "Category",
      categories: ["Communication", "AI & Machine Learning", "Programming", "Design", "Life skills", "Languages", "Other"],
      level: "Level",
      levels: ["Beginner", "Intermediate", "Advanced", "All levels"],
      description: "What will learners learn?",
      descriptionPh: "Describe your course in a few sentences…",
      links: "Sample or portfolio link (optional)",
      linksPh: "https://…",
      submit: "Submit for review",
      sending: "Sending…",
      success: "Thank you! Your course is submitted. Our team will review it and get back to you.",
      note: "We review every submission before it goes live, usually within a week.",
    },
    enroll: {
      title: "Enroll for free",
      subtitle: "Tell us a little about you and we'll get you started. There are no wrong answers.",
      courseLabel: "Course",
      name: "Your name",
      namePh: "e.g. Anasha",
      contact: "Email or phone",
      contactPh: "How should we reach you?",
      city: "Your city",
      cityPh: "e.g. Abbottabad",
      needs: "Any access needs? (optional)",
      needsPh: "e.g. screen reader, captions, wheelchair access",
      message: "Anything else? (optional)",
      messagePh: "Tell us what you're hoping to learn…",
      submit: "Enroll now",
      sending: "Sending…",
      success: "You're enrolled! We'll be in touch with the next steps soon.",
    },
    donate: {
      eyebrow: "Power the next mind",
      title: "Your gift becomes a skill",
      subtitle: "Every rupee and dollar goes straight to free courses, devices, and accessible tools.",
      raisedLabel: "Raised so far",
      goalLabel: "2025 goal",
      raised: "$3,840",
      goal: "$5,000",
      percent: 77,
      tiers: [
        { amount: "$25", title: "Spark", desc: "Gives one learner a full course." },
        { amount: "$60", title: "Toolkit", desc: "Provides accessible software and learning materials." },
        { amount: "$120", title: "Builder", desc: "Funds a device for a student who has none." },
      ],
      custom: "Other amount",
      customPh: "Enter amount",
      cta: "Donate now",
      monthly: "Monthly",
      oneTime: "One time",
      note: "WinSci is a registered nonprofit. Donations are tax-deductible where eligible.",
    },
    faq: {
      title: "Common questions",
      items: [
        { q: "Is it really free?", a: "Yes. Every course, mentor and certificate is completely free for learners and families." },
        { q: "I have a disability. Will the courses work for me?", a: "Yes. Audio narration, captions, keyboard navigation and adjustable text and contrast are built into everything." },
        { q: "Who can teach on WinSci?", a: "Anyone with knowledge to share. Submit your course through the 'Become a creator' form and our team will review it." },
        { q: "How do you review submitted courses?", a: "Our team checks every submission for accuracy, quality and accessibility before publishing it free on the platform." },
        { q: "Do I need a laptop?", a: "It helps, but we lend devices and offer home kits. Many courses work on a phone too." },
        { q: "Do I get a certificate?", a: "Yes. Finish a course with its project and you earn a WinSci certificate you can share." },
        { q: "Which languages do you teach in?", a: "English, Urdu and Spanish, with more added as our community grows." },
      ],
    },
    contact: {
      title: "Let's talk",
      subtitle: "Questions, partnerships, or signing up. We reply in your language.",
      name: "Your name",
      email: "Email or phone",
      message: "How can we help?",
      send: "Send message",
      sent: "Thank you. We'll be in touch soon.",
      namePh: "e.g. Hamza",
      emailPh: "How should we reach you?",
      messagePh: "Tell us what you're looking for…",
    },
    footer: {
      tagline: "Where every mind wins.",
      rights: "WinSci. A registered nonprofit.",
      built: "Built to be used by everyone.",
      explore: "Explore", org: "Organization", connect: "Connect",
    },
    errors: { generic: "Something went wrong. Please try again." },
  },

  ur: {
    meta: {
      title: "ون سائی: ہر ذہن کے لیے مستقبل کی مہارتیں",
      description:
        "ون سائی خواتین اور معذور طلبہ کے لیے ایک غیر منافع بخش تعلیمی پلیٹ فارم ہے۔ اے آئی، پروگرامنگ، ڈیزائن اور ابلاغ کے مفت کورسز کریں، یا اپنا کورس جمع کروا کر سکھائیں۔",
    },
    a11y: {
      skip: "مرکزی مواد پر جائیں", toolbar: "قابلِ رسائی اختیارات", listen: "سنیں", stop: "روکیں",
      contrast: "زیادہ تضاد", textSize: "متن کا حجم", motion: "حرکت کم کریں", language: "زبان",
      sizeNormal: "عام", sizeLarge: "بڑا", sizeXL: "بہت بڑا", on: "آن", off: "آف",
      prev: "پچھلا", next: "اگلا", close: "بند کریں", menu: "مینو",
    },
    nav: {
      home: "ہوم", modules: "کورسز", results: "نتائج", reviews: "آراء",
      teach: "سکھائیں", donate: "عطیہ", contact: "رابطہ",
    },
    hero: {
      eyebrow: "مفت • قابلِ رسائی • سیکھیں یا سکھائیں",
      titleA: "ون سائی،",
      titleHighlight: "ہر ذہن",
      titleB: "مہارت سے جیتتا ہے",
      subtitle:
        "خواتین اور معذور طلبہ کے لیے ایک تعلیمی پلیٹ فارم۔ اے آئی، پروگرامنگ، ڈیزائن اور ابلاغ کے مفت کورسز کریں، یا تخلیق کار بن کر جو آپ جانتے ہیں وہ سکھائیں۔",
      ctaPrimary: "کورسز دیکھیں",
      ctaSecondary: "عطیہ دیں",
      listenIntro:
        "ون سائی میں خوش آمدید۔ ہم ایبٹ آباد اور لاہور میں خواتین اور معذور طلبہ کے لیے ایک مفت، قابلِ رسائی تعلیمی پلیٹ فارم ہیں۔ کوئی بھی کورس کر سکتا ہے، اور کوئی بھی تخلیق کار کورس جمع کروا کر سکھا سکتا ہے۔ صفحہ سننے کے لیے کسی بھی سننے کے بٹن کو دبائیں۔",
      mascotHi: "ہیلو! میں سائی ہوں۔ مجھے دبائیں، میں یہ صفحہ آپ کے لیے پڑھوں گا۔",
    },
    trust: "ایبٹ آباد اور لاہور کے شمولیتی اسکولوں کے ساتھ کام کرنے والی مقامی غیر منافع بخش تنظیم",
    modulesSection: {
      eyebrow: "آپ کیا سیکھ سکتے ہیں",
      title: "ایسے کورسز جو حقیقی دروازے کھولیں",
      subtitle: "ہر کورس مفت ہے، آپ کی زبان میں پڑھایا جاتا ہے، اور ہر طرح کے سیکھنے والے کے لیے بنایا گیا ہے۔",
      enroll: "داخلہ لیں",
      items: [
        { title: "ابلاغ", desc: "حقیقی دنیا کے لیے پراعتماد بولنا، لکھنا اور کہانی بیان کرنا۔" },
        { title: "اے آئی اور مشین لرننگ", desc: "اے آئی کو سمجھیں اور بنائیں، اسمارٹ پرامپٹس سے اپنے پہلے ماڈل تک۔" },
        { title: "پروگرامنگ", desc: "صفر سے کوڈنگ: ویب، پائتھن اور خوشگوار مسئلہ حل کرنا۔" },
        { title: "ڈیزائن", desc: "یو آئی/یو ایکس اور ڈیجیٹل تخلیق جو کوئی بھی سیکھ سکتا ہے۔" },
      ],
      moreTitle: "کچھ سکھانا چاہتے ہیں؟",
      moreDesc: "کوئی بھی تخلیق کار کسی بھی موضوع پر کورس جمع کروا سکتا ہے۔ ہم ہر ایک کا جائزہ لیتے ہیں پھر شائع کرتے ہیں۔",
      moreCta: "تخلیق کار بنیں",
    },
    approach: {
      eyebrow: "یہ کیسے کام کرتا ہے",
      title: "چار مرحلوں میں متجسس سے ماہر تک",
      subtitle: "کوئی خرچ نہیں، کوئی پیچیدہ اصطلاح نہیں، کوئی فیصلہ نہیں۔ بس آپ کے مطابق راستہ۔",
      steps: [
        { title: "مفت داخلہ", desc: "ایک کورس چنیں اور اپنے بارے میں تھوڑا بتائیں۔ ہم انگریزی، اردو اور ہسپانوی بولتے ہیں۔" },
        { title: "اپنے انداز میں سیکھیں", desc: "آڈیو، کیپشن اور عملی پروجیکٹس آپ کے سیکھنے کے انداز کے مطابق ڈھل جاتے ہیں۔" },
        { title: "کچھ بنائیں", desc: "ہر کورس ایک حقیقی پروجیکٹ پر ختم ہوتا ہے جس پر آپ فخر کر سکیں۔" },
        { title: "جیتیں اور آگے بڑھیں", desc: "سرٹیفکیٹ حاصل کریں، کمیونٹی میں شامل ہوں، اور تعلیم یا کام کی طرف قدم بڑھائیں۔" },
      ],
    },
    impact: {
      eyebrow: "ہمارے نتائج",
      title: "احتیاط سے گنا گیا ثبوت",
      subtitle: "ہماری 2025 کمیونٹی رپورٹ سے اعداد۔",
      stats: [
        { value: "+30", label: "مفت پڑھائے گئے سیکھنے والے" },
        { value: "12", label: "حقیقی پروجیکٹس مکمل" },
        { value: "94%", label: "زیادہ پراعتماد محسوس کرتے ہیں" },
        { value: "5", label: "شراکت دار اسکول" },
      ],
      partnersTitle: "ہم فخر سے ان کے ساتھ کام کرتے ہیں",
      partners: [
        "بیکن ہاؤس اسکول سسٹم",
        "کنگسٹن اسکول، ایبٹ آباد",
        "نابینا بچیوں کا اسکول، ایبٹ آباد",
        "پی ایس آر ڈی انکلوسیو اسکول",
        "اسپیشل ایجوکیشن سینٹر، ایبٹ آباد",
      ],
    },
    gallery: {
      eyebrow: "نمائش",
      title: "ہمارے طلبہ کے بنائے ہوئے",
      subtitle: "ہمارے کیمپسز کے سیکھنے والوں کے حقیقی پروجیکٹس۔ دیکھنے کے لیے سوائپ کریں۔",
      by: "از",
      items: [
        { title: "ٹاکنگ ہینڈز", tag: "اے آئی", desc: "ایک ایپ جو اشاروں کی زبان کو فوری متن میں بدلتی ہے۔", author: "حمزہ، 17" },
        { title: "میرا شہر، بلا رکاوٹ", tag: "ڈیزائن", desc: "محلے میں وہیل چیئر کے لیے موزوں راستوں کا نقشہ۔", author: "محمد، 16" },
        { title: "وائس نوٹس", tag: "پروگرامنگ", desc: "ڈسلیکسیا والے سیکھنے والوں کے لیے بنائی گئی نوٹ ایپ۔", author: "عنشا، 17" },
        { title: "سولر سورٹر", tag: "روبوٹکس", desc: "ایک چھوٹا روبوٹ جو سولر پینل سے ری سائیکلنگ چھانٹتا ہے۔", author: "سعد، 18" },
        { title: "ہماری کہانی", tag: "ابلاغ", desc: "ایک پوڈکاسٹ جہاں طلبہ اپنی کہانیاں سناتے ہیں۔", author: "محب، 15" },
        { title: "بجٹ بڈی", tag: "ڈیٹا", desc: "ایک سادہ ڈیش بورڈ جو خاندانوں کو ہفتہ منصوبہ بندی میں مدد دیتا ہے۔", author: "زینب، 19" },
      ],
    },
    stories: {
      eyebrow: "آراء",
      title: "جیتنے کا احساس کیسا ہوتا ہے",
      items: [
        { quote: "میں نے کبھی نہیں سوچا تھا کہ کوڈنگ مجھ جیسے کسی کے لیے ہے۔ اب میں نے ایک ایپ بنائی ہے جو پوری کلاس استعمال کرتی ہے۔", name: "عنشا", role: "پروگرامنگ کی طالبہ، لاہور" },
        { quote: "آڈیو اسباق کا مطلب تھا کہ میرا ڈسلیکسیا دیوار نہیں رہا۔ میں نے بالآخر ساتھ نبھایا، پھر آگے نکل گیا۔", name: "محب", role: "ڈیزائن کا طالبعلم، ایبٹ آباد" },
        { quote: "ون سائی نے میری بیٹی کو وہ جگہ دی جہاں اس کی وہیل چیئر کبھی موضوع نہ بنی۔ اس کے خیالات بنے۔", name: "رابعہ", role: "والدہ، ایبٹ آباد" },
      ],
      writeCta: "اپنی رائے لکھیں",
      formTitle: "اپنا تجربہ بتائیں",
      rName: "آپ کا نام",
      rNamePh: "مثلاً حمزہ",
      rRole: "آپ ہیں…",
      rRolePh: "مثلاً پروگرامنگ کی طالبہ، لاہور",
      rRating: "آپ کی درجہ بندی",
      rQuote: "آپ کی رائے",
      rQuotePh: "ون سائی نے آپ کے لیے کیا بدلا؟",
      submit: "رائے شائع کریں",
      sending: "بھیجا جا رہا ہے…",
      success: "شکریہ! آپ کی رائے موصول ہو گئی اور جائزے کے بعد ظاہر ہوگی۔",
    },
    locations: {
      eyebrow: "ہم کہاں کام کرتے ہیں",
      title: "تین شہر، ایک مقصد",
      subtitle: "کمیونٹی میں جڑیں، احتیاط سے بڑھتے ہوئے۔",
      items: [
        { city: "ایبٹ آباد", country: "پاکستان", desc: "جہاں سے ون سائی شروع ہوا، خواتین اور طلبہ کے لیے محلے کے ٹیک مراکز اور شمولیتی اسکول۔", focus: "مرکزی مقام", badge: "یہیں سے شروع ہوا", status: "original" },
        { city: "لاہور", country: "پاکستان", desc: "ہمارا دوسرا کیمپس، شہر بھر کے مزید سیکھنے والوں کے لیے مفت، قابلِ رسائی کورسز۔", focus: "روبرو اور آن لائن", badge: "اب فعال", status: "active" },
        { city: "ہیوسٹن", country: "امریکہ", desc: "ہمارا پہلا بین الاقوامی کیمپس، شراکت دار اسکولوں کے ساتھ آغاز۔", focus: "2026 میں آغاز", badge: "جلد آ رہا ہے", status: "soon" },
      ],
    },
    teach: {
      eyebrow: "تخلیق کار بنیں",
      title: "ون سائی پر جو آپ جانتے ہیں وہ سکھائیں",
      subtitle: "آن لائن کوئی بھی کسی بھی موضوع پر کورس جمع کروا سکتا ہے۔ ہماری ٹیم ہر جمع کرائے گئے کورس کا جائزہ لیتی ہے، پھر ہم اسے مفت شائع کرتے ہیں۔",
      points: [
        "کوئی بھی موضوع: ٹیکنالوجی، فن، زندگی کی مہارتیں، زبانیں، جو بھی آپ سکھا سکیں",
        "ہم ہر کورس کا معیار اور رسائی کے لیے جائزہ لیتے ہیں اس سے پہلے کہ وہ شائع ہو",
        "آپ کا کورس خواتین اور معذور طلبہ تک بالکل مفت پہنچتا ہے",
      ],
      creator: "آپ کا نام",
      creatorPh: "مثلاً حمزہ خان",
      contact: "ای میل",
      contactPh: "you@example.com",
      courseTitle: "کورس کا عنوان",
      courseTitlePh: "مثلاً مبتدیوں کے لیے پائتھن کا تعارف",
      category: "زمرہ",
      categories: ["ابلاغ", "اے آئی اور مشین لرننگ", "پروگرامنگ", "ڈیزائن", "زندگی کی مہارتیں", "زبانیں", "دیگر"],
      level: "سطح",
      levels: ["مبتدی", "درمیانہ", "اعلیٰ", "تمام سطحیں"],
      description: "سیکھنے والے کیا سیکھیں گے؟",
      descriptionPh: "اپنے کورس کو چند جملوں میں بیان کریں…",
      links: "نمونہ یا پورٹ فولیو لنک (اختیاری)",
      linksPh: "https://…",
      submit: "جائزے کے لیے جمع کریں",
      sending: "بھیجا جا رہا ہے…",
      success: "شکریہ! آپ کا کورس جمع ہو گیا۔ ہماری ٹیم جائزہ لے کر آپ سے رابطہ کرے گی۔",
      note: "ہم ہر جمع کرائے گئے کورس کا شائع ہونے سے پہلے جائزہ لیتے ہیں، عموماً ایک ہفتے میں۔",
    },
    enroll: {
      title: "مفت داخلہ لیں",
      subtitle: "اپنے بارے میں تھوڑا بتائیں اور ہم آپ کو شروع کروا دیں گے۔ کوئی جواب غلط نہیں ہوتا۔",
      courseLabel: "کورس",
      name: "آپ کا نام",
      namePh: "مثلاً عنشا",
      contact: "ای میل یا فون",
      contactPh: "ہم آپ تک کیسے پہنچیں؟",
      city: "آپ کا شہر",
      cityPh: "مثلاً ایبٹ آباد",
      needs: "کوئی رسائی کی ضرورت؟ (اختیاری)",
      needsPh: "مثلاً اسکرین ریڈر، کیپشن، وہیل چیئر رسائی",
      message: "کچھ اور؟ (اختیاری)",
      messagePh: "ہمیں بتائیں آپ کیا سیکھنا چاہتے ہیں…",
      submit: "ابھی داخلہ لیں",
      sending: "بھیجا جا رہا ہے…",
      success: "آپ کا داخلہ ہو گیا! ہم جلد اگلے مراحل کے ساتھ رابطہ کریں گے۔",
    },
    donate: {
      eyebrow: "اگلے ذہن کو طاقت دیں",
      title: "آپ کا عطیہ مہارت بن جاتا ہے",
      subtitle: "ہر روپیہ اور ڈالر براہِ راست مفت کورسز، آلات اور قابلِ رسائی وسائل پر جاتا ہے۔",
      raisedLabel: "اب تک جمع",
      goalLabel: "2025 کا ہدف",
      raised: "$3,840",
      goal: "$5,000",
      percent: 77,
      tiers: [
        { amount: "$25", title: "چنگاری", desc: "ایک سیکھنے والے کو ایک مکمل کورس دیتا ہے۔" },
        { amount: "$60", title: "ٹول کٹ", desc: "قابلِ رسائی سافٹ ویئر اور تعلیمی مواد فراہم کرتا ہے۔" },
        { amount: "$120", title: "بلڈر", desc: "ایسے طالبعلم کے لیے ڈیوائس جس کے پاس کوئی نہیں۔" },
      ],
      custom: "دوسری رقم",
      customPh: "رقم درج کریں",
      cta: "ابھی عطیہ دیں",
      monthly: "ماہانہ",
      oneTime: "ایک بار",
      note: "ون سائی ایک رجسٹرڈ غیر منافع بخش تنظیم ہے۔ عطیات جہاں اہل ہوں ٹیکس میں چھوٹ کے قابل ہیں۔",
    },
    faq: {
      title: "عام سوالات",
      items: [
        { q: "کیا یہ واقعی مفت ہے؟", a: "جی ہاں۔ ہر کورس، رہنما اور سرٹیفکیٹ سیکھنے والوں اور خاندانوں کے لیے مکمل مفت ہے۔" },
        { q: "میں معذور ہوں۔ کیا کورسز میرے لیے کام کریں گے؟", a: "جی ہاں۔ آڈیو بیان، کیپشن، کی بورڈ نیویگیشن اور حجم و تضاد کی ایڈجسٹمنٹ ہر چیز میں شامل ہیں۔" },
        { q: "ون سائی پر کون پڑھا سکتا ہے؟", a: "ہر وہ شخص جس کے پاس علم ہو۔ 'تخلیق کار بنیں' فارم سے اپنا کورس جمع کروائیں اور ہماری ٹیم جائزہ لے گی۔" },
        { q: "آپ جمع کرائے گئے کورسز کا جائزہ کیسے لیتے ہیں؟", a: "ہماری ٹیم ہر کورس کی درستگی، معیار اور رسائی کو شائع کرنے سے پہلے جانچتی ہے۔" },
        { q: "کیا مجھے لیپ ٹاپ چاہیے؟", a: "مددگار ہے، لیکن ہم ڈیوائسز ادھار دیتے ہیں اور گھریلو کٹس پیش کرتے ہیں۔ کئی کورس فون پر بھی چلتے ہیں۔" },
        { q: "کیا مجھے سرٹیفکیٹ ملے گا؟", a: "جی ہاں۔ کورس کو اس کے پروجیکٹ کے ساتھ مکمل کریں اور ون سائی سرٹیفکیٹ حاصل کریں جسے آپ شیئر کر سکیں۔" },
        { q: "آپ کن زبانوں میں پڑھاتے ہیں؟", a: "انگریزی، اردو اور ہسپانوی، اور کمیونٹی بڑھنے کے ساتھ مزید شامل ہوتی ہیں۔" },
      ],
    },
    contact: {
      title: "بات کرتے ہیں",
      subtitle: "سوالات، شراکت داری، یا رجسٹریشن۔ ہم آپ کی زبان میں جواب دیتے ہیں۔",
      name: "آپ کا نام",
      email: "ای میل یا فون",
      message: "ہم کیسے مدد کر سکتے ہیں؟",
      send: "پیغام بھیجیں",
      sent: "شکریہ۔ ہم جلد رابطہ کریں گے۔",
      namePh: "مثلاً حمزہ",
      emailPh: "ہم آپ تک کیسے پہنچیں؟",
      messagePh: "ہمیں بتائیں آپ کیا تلاش کر رہے ہیں…",
    },
    footer: {
      tagline: "جہاں ہر ذہن جیتتا ہے۔",
      rights: "ون سائی۔ ایک رجسٹرڈ غیر منافع بخش تنظیم۔",
      built: "سب کے استعمال کے لیے بنایا گیا۔",
      explore: "دریافت کریں", org: "تنظیم", connect: "رابطہ",
    },
    errors: { generic: "کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔" },
  },

  es: {
    meta: {
      title: "WinSci: Habilidades del futuro para cada mente",
      description:
        "WinSci es una plataforma educativa sin fines de lucro para mujeres y estudiantes con discapacidad. Toma cursos gratuitos de IA, programación, diseño y comunicación, o envía tu propio curso para enseñar.",
    },
    a11y: {
      skip: "Saltar al contenido principal", toolbar: "Opciones de accesibilidad", listen: "Escuchar", stop: "Detener",
      contrast: "Alto contraste", textSize: "Tamaño del texto", motion: "Reducir movimiento", language: "Idioma",
      sizeNormal: "Normal", sizeLarge: "Grande", sizeXL: "Muy grande", on: "Activado", off: "Desactivado",
      prev: "Anterior", next: "Siguiente", close: "Cerrar", menu: "Menú",
    },
    nav: {
      home: "Inicio", modules: "Cursos", results: "Resultados", reviews: "Reseñas",
      teach: "Enseña", donate: "Donar", contact: "Contacto",
    },
    hero: {
      eyebrow: "Gratis • Accesible • Aprende o enseña",
      titleA: "WinSci,",
      titleHighlight: "cada mente",
      titleB: "gana con habilidades",
      subtitle:
        "Una plataforma educativa para mujeres y estudiantes con discapacidad. Toma cursos gratuitos de IA, programación, diseño y comunicación, o conviértete en creador y enseña lo que sabes.",
      ctaPrimary: "Ver cursos",
      ctaSecondary: "Donar",
      listenIntro:
        "Bienvenido a WinSci. Somos una plataforma educativa gratuita y accesible para mujeres y estudiantes con discapacidad, con sede en Abbottabad y Lahore. Cualquiera puede tomar un curso, y cualquier creador puede enviar uno para enseñar. Pulsa cualquier botón de escuchar para oír la página en voz alta.",
      mascotHi: "¡Hola! Soy Sci. Tócame y leeré esta página para ti.",
    },
    trust: "Una organización local sin fines de lucro que colabora con escuelas inclusivas en Abbottabad y Lahore",
    modulesSection: {
      eyebrow: "Lo que puedes aprender",
      title: "Cursos que abren puertas reales",
      subtitle: "Cada curso es gratuito, se enseña en tu idioma y está hecho para todo tipo de estudiante.",
      enroll: "Inscribirme",
      items: [
        { title: "Comunicación", desc: "Hablar, escribir y contar historias con confianza para el mundo real." },
        { title: "IA y Machine Learning", desc: "Entiende y crea con IA, desde buenos prompts hasta tu primer modelo." },
        { title: "Programación", desc: "Programa desde cero: web, Python y resolución de problemas." },
        { title: "Diseño", desc: "UI/UX y creatividad digital que cualquiera puede aprender." },
      ],
      moreTitle: "¿Tienes algo que enseñar?",
      moreDesc: "Cualquier creador puede enviar un curso sobre cualquier tema. Revisamos cada uno antes de publicarlo.",
      moreCta: "Conviértete en creador",
    },
    approach: {
      eyebrow: "Cómo funciona",
      title: "De curioso a capaz en cuatro pasos",
      subtitle: "Sin costo, sin jerga, sin juicios. Solo un camino que se adapta a ti.",
      steps: [
        { title: "Inscríbete gratis", desc: "Elige un curso y cuéntanos un poco sobre ti. Hablamos inglés, urdu y español." },
        { title: "Aprende a tu manera", desc: "Audio, subtítulos y proyectos prácticos se adaptan a cómo aprendes mejor." },
        { title: "Crea algo", desc: "Cada curso termina con un proyecto real del que estar orgulloso." },
        { title: "Gana y avanza", desc: "Obtén un certificado, únete a la comunidad y avanza hacia estudiar o trabajar." },
      ],
    },
    impact: {
      eyebrow: "Nuestros resultados",
      title: "Pruebas, contadas con cuidado",
      subtitle: "Cifras de nuestro informe comunitario de 2025.",
      stats: [
        { value: "+30", label: "Estudiantes enseñados gratis" },
        { value: "12", label: "Proyectos reales realizados" },
        { value: "94%", label: "Se sienten más seguros" },
        { value: "5", label: "Escuelas aliadas" },
      ],
      partnersTitle: "Orgullosos de trabajar con",
      partners: [
        "Beaconhouse School System",
        "Kingston School, Abbottabad",
        "School for Blind Girls, Abbottabad",
        "PSRD Inclusive School",
        "Special Education Centre, Abbottabad",
      ],
    },
    gallery: {
      eyebrow: "Galería",
      title: "Hecho por nuestros estudiantes",
      subtitle: "Proyectos reales de estudiantes en nuestros campus. Desliza para explorar.",
      by: "por",
      items: [
        { title: "Manos que Hablan", tag: "IA", desc: "Una app que convierte la lengua de señas en texto en tiempo real.", author: "Hamza, 17" },
        { title: "Mi Ciudad, Sin Barreras", tag: "Diseño", desc: "Un mapa de rutas accesibles para sillas de ruedas en el barrio.", author: "Muhammad, 16" },
        { title: "Notas de Voz", tag: "Programación", desc: "Una app de notas para estudiantes con dislexia, hecha por uno.", author: "Anasha, 17" },
        { title: "Clasificador Solar", tag: "Robótica", desc: "Un robot que separa el reciclaje con un panel solar.", author: "Saad, 18" },
        { title: "Nuestra Historia", tag: "Comunicación", desc: "Un pódcast donde los estudiantes cuentan sus propias historias.", author: "Muhib, 15" },
        { title: "Compa Presupuesto", tag: "Datos", desc: "Un panel simple que ayuda a las familias a planear la semana.", author: "Zainab, 19" },
      ],
    },
    stories: {
      eyebrow: "Reseñas",
      title: "Cómo se siente ganar",
      items: [
        { quote: "Nunca pensé que programar fuera para alguien como yo. Hice una app que usa toda mi clase.", name: "Anasha", role: "Estudiante de programación, Lahore" },
        { quote: "Las lecciones en audio hicieron que mi dislexia dejara de ser un muro. Por fin avancé, y me adelanté.", name: "Muhib", role: "Estudiante de diseño, Abbottabad" },
        { quote: "WinSci le dio a mi hija un lugar donde su silla de ruedas nunca fue el tema. Sus ideas sí.", name: "Rabia", role: "Madre, Abbottabad" },
      ],
      writeCta: "Escribir una reseña",
      formTitle: "Comparte tu experiencia",
      rName: "Tu nombre",
      rNamePh: "p. ej. Hamza",
      rRole: "Eres…",
      rRolePh: "p. ej. Estudiante de programación, Lahore",
      rRating: "Tu calificación",
      rQuote: "Tu reseña",
      rQuotePh: "¿Qué cambió WinSci para ti?",
      submit: "Publicar reseña",
      sending: "Enviando…",
      success: "¡Gracias! Tu reseña se recibió y aparecerá tras una revisión rápida.",
    },
    locations: {
      eyebrow: "Dónde trabajamos",
      title: "Tres ciudades, una misión",
      subtitle: "Arraigados en la comunidad, creciendo con cuidado.",
      items: [
        { city: "Abbottabad", country: "Pakistán", desc: "Donde nació WinSci, con centros tecnológicos de barrio y escuelas inclusivas para mujeres y estudiantes.", focus: "Sede principal", badge: "Donde empezó", status: "original" },
        { city: "Lahore", country: "Pakistán", desc: "Nuestro segundo campus, llevando cursos gratuitos y accesibles a más estudiantes de la ciudad.", focus: "Presencial y en línea", badge: "Ya activo", status: "active" },
        { city: "Houston", country: "Estados Unidos", desc: "Nuestro primer campus internacional, lanzándose con escuelas aliadas y centros comunitarios.", focus: "Lanzamiento 2026", badge: "Próximamente", status: "soon" },
      ],
    },
    teach: {
      eyebrow: "Conviértete en creador",
      title: "Enseña lo que sabes en WinSci",
      subtitle: "Cualquier persona en línea puede enviar un curso sobre cualquier tema. Nuestro equipo revisa cada envío y luego lo publicamos gratis para quienes más lo necesitan.",
      points: [
        "Cualquier tema: tecnología, arte, habilidades para la vida, idiomas, lo que sepas enseñar",
        "Revisamos cada curso por calidad y accesibilidad antes de publicarlo",
        "Tu curso llega a mujeres y estudiantes con discapacidad, totalmente gratis",
      ],
      creator: "Tu nombre",
      creatorPh: "p. ej. Hamza Khan",
      contact: "Correo",
      contactPh: "tu@ejemplo.com",
      courseTitle: "Título del curso",
      courseTitlePh: "p. ej. Introducción a Python para principiantes",
      category: "Categoría",
      categories: ["Comunicación", "IA y Machine Learning", "Programación", "Diseño", "Habilidades para la vida", "Idiomas", "Otro"],
      level: "Nivel",
      levels: ["Principiante", "Intermedio", "Avanzado", "Todos los niveles"],
      description: "¿Qué aprenderán los estudiantes?",
      descriptionPh: "Describe tu curso en unas frases…",
      links: "Enlace de muestra o portafolio (opcional)",
      linksPh: "https://…",
      submit: "Enviar para revisión",
      sending: "Enviando…",
      success: "¡Gracias! Tu curso fue enviado. Nuestro equipo lo revisará y te contactará.",
      note: "Revisamos cada envío antes de publicarlo, normalmente en una semana.",
    },
    enroll: {
      title: "Inscríbete gratis",
      subtitle: "Cuéntanos un poco sobre ti y te ayudamos a empezar. No hay respuestas equivocadas.",
      courseLabel: "Curso",
      name: "Tu nombre",
      namePh: "p. ej. Anasha",
      contact: "Correo o teléfono",
      contactPh: "¿Cómo te contactamos?",
      city: "Tu ciudad",
      cityPh: "p. ej. Abbottabad",
      needs: "¿Alguna necesidad de acceso? (opcional)",
      needsPh: "p. ej. lector de pantalla, subtítulos, acceso para silla de ruedas",
      message: "¿Algo más? (opcional)",
      messagePh: "Cuéntanos qué esperas aprender…",
      submit: "Inscribirme ahora",
      sending: "Enviando…",
      success: "¡Estás inscrito! Te contactaremos pronto con los siguientes pasos.",
    },
    donate: {
      eyebrow: "Impulsa la próxima mente",
      title: "Tu donación se vuelve una habilidad",
      subtitle: "Cada dólar y cada rupia va directo a cursos gratuitos, dispositivos y herramientas accesibles.",
      raisedLabel: "Recaudado hasta ahora",
      goalLabel: "Meta 2025",
      raised: "$3,840",
      goal: "$5,000",
      percent: 77,
      tiers: [
        { amount: "$25", title: "Chispa", desc: "Da a un estudiante un curso completo." },
        { amount: "$60", title: "Kit", desc: "Aporta software accesible y materiales de aprendizaje." },
        { amount: "$120", title: "Constructor", desc: "Financia un dispositivo para un estudiante que no tiene." },
      ],
      custom: "Otra cantidad",
      customPh: "Ingresa la cantidad",
      cta: "Donar ahora",
      monthly: "Mensual",
      oneTime: "Una vez",
      note: "WinSci es una organización sin fines de lucro registrada. Las donaciones son deducibles de impuestos cuando aplica.",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿De verdad es gratis?", a: "Sí. Cada curso, mentor y certificado es completamente gratuito para estudiantes y familias." },
        { q: "Tengo una discapacidad. ¿Me servirán los cursos?", a: "Sí. Narración en audio, subtítulos, navegación por teclado y texto y contraste ajustables están integrados en todo." },
        { q: "¿Quién puede enseñar en WinSci?", a: "Cualquiera con conocimiento que compartir. Envía tu curso con el formulario 'Conviértete en creador' y nuestro equipo lo revisará." },
        { q: "¿Cómo revisan los cursos enviados?", a: "Nuestro equipo revisa cada envío por precisión, calidad y accesibilidad antes de publicarlo gratis en la plataforma." },
        { q: "¿Necesito una laptop?", a: "Ayuda, pero prestamos dispositivos y ofrecemos kits para el hogar. Muchos cursos funcionan también en el teléfono." },
        { q: "¿Obtengo un certificado?", a: "Sí. Termina un curso con su proyecto y obtienes un certificado WinSci que puedes compartir." },
        { q: "¿En qué idiomas enseñan?", a: "Inglés, urdu y español, y añadimos más a medida que crece nuestra comunidad." },
      ],
    },
    contact: {
      title: "Hablemos",
      subtitle: "Preguntas, alianzas o inscripción. Respondemos en tu idioma.",
      name: "Tu nombre",
      email: "Correo o teléfono",
      message: "¿Cómo podemos ayudar?",
      send: "Enviar mensaje",
      sent: "Gracias. Nos pondremos en contacto pronto.",
      namePh: "p. ej. Hamza",
      emailPh: "¿Cómo te contactamos?",
      messagePh: "Cuéntanos qué buscas…",
    },
    footer: {
      tagline: "Donde cada mente gana.",
      rights: "WinSci. Organización sin fines de lucro registrada.",
      built: "Hecho para que todos lo usen.",
      explore: "Explorar", org: "Organización", connect: "Conecta",
    },
    errors: { generic: "Algo salió mal. Inténtalo de nuevo." },
  },
};
