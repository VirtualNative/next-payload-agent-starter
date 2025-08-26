import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next + Payload Starter",
  description: "Starter for Next.js + Payload + Tailwind + shadcn",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
