import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Submitted",
  description: "A place to release what you cannot control."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
