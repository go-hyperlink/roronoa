import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roronoa Zoro — The Swordsman | Interactive Watercolor Scroll",
  description:
    "A cinematic anime watercolor scroll exhibition celebrating Roronoa Zoro. Controlled frame-by-frame through interactive gestures.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#070b09] antialiased">
      <head>
        <meta name="theme-color" content="#070b09" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Cinzel:wght@400..800&family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Noto+Serif+JP:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#070b09] text-zinc-100 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
