import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import { profile } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.roleLong}`,
  description: profile.heroIntro,
  openGraph: { title: `${profile.name} — Portfolio`, description: profile.heroIntro, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} ${mono.variable} font-sans`}>
        <SmoothScroll>{children}</SmoothScroll>
        <CursorGlow />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
