"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const milestones = [
    { time: "0-3 Meses", title: "Lanzamiento y Ajustes", items: ["Pagos Chile (Flow)", "Mejoras PWA", "Piloto Cerrado"] },
    { time: "3-6 Meses", title: "Expansión Móvil", items: ["Android Nativo (Capacitor)", "Notificaciones Push", "Módulos Ecosystem"] },
    { time: "6-12 Meses", title: "Consolidación", items: ["Versión iOS", "AMON POS Beta", "API Pública"] },
];

export function Roadmap() {
    return (
        <section className="py-24 px-4 bg-white border-t border-neutral-100">
            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-12"
                >
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center tracking-tight">Roadmap</motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="relative pl-6 md:pl-0 md:pt-6 border-l-2 md:border-l-0 md:border-t-2 border-neutral-100"
                            >
                                <div className="absolute top-0 left-0 -translate-x-[5px] -translate-y-[5px] w-2.5 h-2.5 rounded-full bg-accent md:hidden" />
                                <div className="absolute top-0 left-0 -translate-x-[5px] -translate-y-[5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent hidden md:block" />

                                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">{m.time}</h3>
                                <h4 className="text-lg font-semibold text-neutral-900 mb-3">{m.title}</h4>
                                <ul className="space-y-2">
                                    {m.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-neutral-500">• {item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
