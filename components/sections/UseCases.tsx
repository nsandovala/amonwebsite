"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { User, Users, Baby, Briefcase } from "lucide-react";

const cases = [
    { title: "Adultos Mayores", icon: User, desc: "Acompañamiento sencillo y recordatorios de salud." },
    { title: "Familias", icon: Users, desc: "Coordinación y tranquilidad para el cuidado del hogar." },
    { title: "Niños (HEO Kids)", icon: Baby, desc: "Aprendizaje lúdico y contención emocional adaptada." },
    { title: "Emprendedores", icon: Briefcase, desc: "Herramientas de gestión y visibilidad con Radar." },
];

export function UseCases() {
    return (
        <section className="py-24 px-4 bg-background overflow-hidden relative">
            {/* Decorative background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="container max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight">
                            Para cada etapa.<br />Para cada necesidad.
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-neutral-500 leading-relaxed max-w-md">
                            Desde el aprendizaje temprano hasta el cuidado de nuestros mayores, AMON adapta su interfaz y tono para ser útil y accesible.
                        </motion.p>

                        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cases.map((c, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/50 border border-white/60 shadow-sm">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-neutral-900">
                                        <c.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{c.title}</h4>
                                        <p className="text-xs text-neutral-500 mt-1">{c.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Highlighted Case Study */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <GlassCard className="relative bg-gradient-to-br from-white to-neutral-50 !p-8 border-neutral-100">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Baby size={120} />
                            </div>

                            <div className="relative space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-content text-xs font-semibold uppercase tracking-wider">
                                    Caso Real
                                </div>

                                <h3 className="text-2xl font-bold text-neutral-900">
                                    "Aprender a su propio ritmo"
                                </h3>

                                <p className="text-neutral-600 leading-relaxed">
                                    Un niño de 7 años con hiperactividad utiliza <strong>HEO Kids</strong> para explorar temas de ciencias.
                                    La plataforma adapta las explicaciones a micro-lecciones interactivas, manteniendo su interés sin sobreestimularlo,
                                    y ofreciendo contención positiva cuando se frustra.
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                                    <div className="bg-neutral-200 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-neutral-500">
                                        A
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-neutral-900">Anonimizado</p>
                                        <p className="text-xs text-neutral-500">Usuario de HEO Kids</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
