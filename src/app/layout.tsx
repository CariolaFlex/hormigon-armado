import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Hormigón Armado — Universidad de La Serena",
  description: "Plataforma interactiva de estudio — Ingeniería Civil ULS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-bg-base text-text-primary min-h-screen flex">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
