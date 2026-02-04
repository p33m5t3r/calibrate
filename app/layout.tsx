import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calibrate",
  description: "quiz time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
