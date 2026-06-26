import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import ClickSpark from "@/components/ui/ClickSpark";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Step To Success | International School",
  description: "Building Future Leaders. Inspiring young minds through quality education, innovation, and excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <ClickSpark sparkColor="#38bdf8" sparkSize={10} sparkRadius={20} sparkCount={12} duration={500}>
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
