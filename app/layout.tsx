import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a safe, premium-looking default
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AMON | Infraestructura digital para el bienestar humano",
    description: "AMON integra orientación preventiva, asistencia inteligente y herramientas para emprendedores en una sola plataforma.",
    openGraph: {
        title: "AMON | Infraestructura digital para el bienestar humano",
        description: "Infraestructura social para decisiones tranquilas. Conoce AMON y HEO Sentinel.",
        type: "website",
        locale: "es_CL",
        url: "https://amonhealt.cl",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
