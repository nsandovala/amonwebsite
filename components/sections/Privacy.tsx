"use client";

import { motion } from "framer-motion";
import { Lock, FileKey, ShieldAlert, UserCheck, EyeOff } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const principles = [
    { icon: FileKey, title: "Separación de Datos", desc: "Los debates sensibles se almacenan separados de la identidad del usuario." },
    { icon: EyeOff, title: "Minimización", desc: "Solo recolectamos lo estrictamente necesario para el funcionamiento." },
    { icon: UserCheck, title: "Control Total", desc: "Tú decides qué compartir. Puedes exportar o borrar tus datos cuando quieras." },
    { icon: Lock, title: "Seguridad por Diseño", desc: "Cifrado de extremo a extremo en todas las comunicaciones críticas." },
];

export function Privacy() {
    return (
        <section className="py-24 px-4 bg-neutral-900 text-white">
            <div className="container max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    <motion.div variants={fadeUp} className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold tracking-wide uppercase">
                            <ShieldAlert size={14} /> Ética Primero
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Privacidad sin letra chica.</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {principles.map((p, i) => (
                            <motion.div key={i} variants={fadeUp} className="flex gap-4">
                                <div className="shrink-0 p-3 rounded-xl bg-neutral-800 text-accent">
                                    <p.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-neutral-100">{p.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                        {p.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={fadeUp} className="text-center pt-8 border-t border-neutral-800">
                        <p className="text-neutral-500 text-sm">
                            No vendemos datos. No hacemos diagnósticos médicos.
                            <br className="hidden sm:block" />
                            Nuestro compromiso es con tu tranquilidad.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
