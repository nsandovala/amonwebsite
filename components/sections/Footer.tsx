"use client";

import { HoneycombField } from "../ui/HoneycombField";

export function Footer() {
    return (
        <footer className="relative bg-white border-t border-neutral-100 py-12 px-4 overflow-hidden">
            {/* Honeycomb Nebula Effect (subtle) */}
            <HoneycombField mode="footer" />

            <div className="container relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} AMON. Todos los derechos reservados.
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <p className="font-serif italic text-neutral-400 text-sm">"Stay humble, stay faithful"</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-600">
                    <a href="#" className="hover:text-black transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-black transition-colors">Ética IA</a>
                    <a href="#" className="hover:text-black transition-colors">Contacto</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
