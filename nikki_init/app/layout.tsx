import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2 Girls & A Paintbrush",
  description: "Omaha's Premier Painters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
