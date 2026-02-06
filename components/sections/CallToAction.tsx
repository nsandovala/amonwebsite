"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { fadeUp } from "@/lib/animations";
import { Download, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { InstallModal } from "../ui/InstallModal";

export function CallToAction() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-32 px-4 bg-neutral-50 relative overflow-hidden">
            <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                        El futuro del bienestar comienza con infraestructura inteligente.
                    </h2>

                    {/* Form placeholder */}
                    <div className="max-w-md mx-auto mt-8 flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-1 px-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white"
                        />
                        <MagneticButton className="whitespace-nowrap">
                            Solicitar Acceso
                        </MagneticButton>
                    </div>

                    <p className="text-xs text-neutral-400 mt-4">
                        Únete a la lista de espera para early access.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                >
                    <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm flex items-start gap-4 cursor-pointer hover:border-accent/50 transition-colors" onClick={() => setIsModalOpen(true)}>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Smartphone size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">PWA Móvil</h3>
                            <p className="text-sm text-emerald-600 font-medium">Disponible</p>
                            <p className="text-xs text-neutral-400 mt-1">iOS & Android</p>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm flex items-start gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Download size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">Android APK</h3>
                            <p className="text-sm text-neutral-500 font-medium">Pronto</p>
                            <p className="text-xs text-neutral-400 mt-1">Instalación nativa</p>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm flex items-start gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                        <div className="p-2 bg-neutral-100 text-neutral-600 rounded-lg">
                            <Monitor size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">Desktop App</h3>
                            <p className="text-sm text-neutral-500 font-medium">Pronto</p>
                            <p className="text-xs text-neutral-400 mt-1">macOS & Windows</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
