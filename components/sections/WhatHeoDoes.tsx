"use client";

import { motion } from "framer-motion";
import { HeartHandshake, AlertCircle, MapPin, Baby, Palette, History, AlertTriangle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const features = [
    { icon: HeartHandshake, label: "Orientación y Contención" },
    { icon: AlertCircle, label: "SOS Contextual" },
    { icon: MapPin, label: "Farmacias y Centros Cercanos" },
    { icon: Baby, label: "HEO Kids" },
    { icon: Palette, label: "Radar Creativo" },
    { icon: History, label: "Historial Privado" },
];

export function WhatHeoDoes() {
    return (
        <section className="py-24 px-4 bg-neutral-50/50">
            <div className="container max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="space-y-12"
                >
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center tracking-tight">
                        Capacidades de HEO
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-neutral-100 text-center gap-3 hover:shadow-md transition-shadow"
                            >
                                <div className="p-3 bg-neutral-50 rounded-full text-neutral-900">
                                    <item.icon size={24} />
                                </div>
                                <span className="font-medium text-neutral-700">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp}
                        className="flex items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100 max-w-2xl mx-auto"
                    >
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                        <p className="text-sm text-amber-900/80 leading-relaxed">
                            <strong>Importante:</strong> HEO no diagnostica ni reemplaza a médicos profesionales.
                            Su función es orientar, contener y facilitar la derivación a especialistas cuando corresponde.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
