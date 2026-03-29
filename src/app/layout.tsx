import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClickParticles from "@/components/effects/ClickParticles";
import SmoothScroller from "@/components/effects/SmoothScroller";
import CommandPalette from "@/components/effects/CommandPalette";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeseem | Developer & Creator",
  description:
    "Portfolio of Jeseem — A passionate developer crafting modern digital experiences with cutting-edge technologies.",
  keywords: [
    "Jeseem",
    "Developer",
    "Full Stack",
    "React",
    "Next.js",
    "Flutter",
    "IoT",
    "Portfolio",
  ],
  authors: [{ name: "Jeseem" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jeseem | Developer & Creator",
    description:
      "A passionate developer crafting modern digital experiences with cutting-edge technologies.",
    url: "https://jeseem.dev",
    siteName: "Jeseem Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeseem | Developer & Creator",
    description:
      "A passionate developer crafting modern digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("%c🚀 Hey there, fellow developer! Like what you see? Let's connect. — Jeseem", 
                "font-size: 16px; font-weight: bold; color: #0066FF; text-shadow: 0 0 10px #00D4FF;"
              );
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground custom-cursor-active`}
      >
        <SmoothScroller>
          <ClickParticles />
          <CommandPalette />
          {children}
          <Toaster />
        </SmoothScroller>
      </body>
    </html>
  );
}