'use client'

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { AcademiaProvider } from "./context/AcademiaContext";

import StoreProvider from "./redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { usuario } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if (usuario == null) {

      router.push("/login");
    }

  });

  if (usuario == null) return null;

  return children;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="pt-BR" className="h-full">

      <body className={`${geistSans.variable} ${geistMono.variable} h-full bg-neutral-950 text-neutral-100 antialiased`}>

        <StoreProvider>

          <AuthProvider>

            <AcademiaProvider>


                {children}


            </AcademiaProvider>

          </AuthProvider>

        </StoreProvider>

      </body>

    </html>
  );
}