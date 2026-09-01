import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SINIWEBS — AI · WEB · DIGITAL",
  description:
    "Premium AI, web and digital experiences for ambitious businesses. Founded by Nitin Sipani.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full bg-black antialiased">
      <body className="min-h-full bg-black text-off-white">{children}</body>
    </html>
  );
}
