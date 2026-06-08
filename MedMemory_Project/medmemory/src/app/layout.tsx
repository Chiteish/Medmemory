import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedMemory • Secure Health Ledger",
  description:
    "Your personal health memory. Securely upload, organize, and understand your medical history with clinical-grade AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#F8F9FE]">
        {children}
      </body>
    </html>
  );
}
