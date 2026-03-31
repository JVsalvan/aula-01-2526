import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { AcademiaProvider } from "./context/AcademiaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fit",
  description: "site para academias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full bg-neutral-950 text-neutral-100 antialiased`}>
        
        <AuthProvider>
          <AcademiaProvider>
            {children}
          </AcademiaProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
