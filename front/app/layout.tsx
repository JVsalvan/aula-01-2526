'use client'

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "./redux/StoreProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="pt-BR" className="h-full">

      <body className={`${geistSans.variable} ${geistMono.variable} h-full bg-neutral-950 text-neutral-100 antialiased`}>

        <StoreProvider>
            {children}
        </StoreProvider>

      </body>

    </html>
  );
}