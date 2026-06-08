import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Pramith P Puthran | Developer Portfolio",
  description: "A polished developer portfolio with clean UI, smooth motion, projects, tools, education, and contact."
};

const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
    } catch (e) {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
