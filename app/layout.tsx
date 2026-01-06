import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Silver Startup | Retiree Business Blueprint",
    template: "%s | Silver Startup",
  },
  description: "Modern business education for retirees. Build your second act with confidence.",
};

import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AccessibilityProvider>
          {children}
          <AccessibilityToolbar />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
