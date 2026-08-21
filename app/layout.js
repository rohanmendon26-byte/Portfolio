import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://rohanmendon.dev"),
  title: {
    default: "Rohan Mendon — Creative Developer & WebGL Specialist",
    template: "%s | Rohan Mendon",
  },
  description:
    "Interactive 3D Anime HUD Portfolio of Rohan Mendon. Specializing in WebGL, Next.js, Three.js, GSAP, and Creative Web Engineering.",
  keywords: [
    "Rohan Mendon",
    "Creative Developer",
    "WebGL Developer",
    "Three.js",
    "Next.js",
    "Frontend Engineer",
    "Full Stack Developer",
    "Anime HUD Portfolio",
    "GSAP Animations",
  ],
  authors: [{ name: "Rohan Mendon" }],
  creator: "Rohan Mendon",
  publisher: "Rohan Mendon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohanmendon.dev",
    siteName: "Rohan Mendon Portfolio",
    title: "Rohan Mendon — Creative Developer & WebGL Specialist",
    description:
      "Explore the interactive 3D WebGL universe of Rohan Mendon. High-performance creative engineering, Three.js animations, and modern web applications.",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Rohan Mendon // Creative Developer Anime HUD Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Mendon — Creative Developer & WebGL Specialist",
    description:
      "Explore the interactive 3D WebGL universe of Rohan Mendon. High-performance creative engineering and WebGL experiences.",
    images: ["/images/og-card.png"],
    creator: "@rohanmendon",
  },
  icons: {
    icon: "/images/rohan.jpg",
    apple: "/images/rohan.jpg",
  },
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
