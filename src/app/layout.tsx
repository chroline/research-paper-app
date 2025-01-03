import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

// const funnelSans = localFont({
//   src: [
//     {
//       path: "../fonts/FunnelSans-VariableFont_wght.ttf",
//       style: "normal",
//     },
//     {
//       path: "../fonts/FunnelSans-Italic-VariableFont_wght.ttf",
//       style: "italic",
//     },
//   ],
//   variable: "--font-display",
// });

const funnelDisplay = localFont({
  src: [
    {
      path: "../fonts/FunnelDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnelDisplay.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
