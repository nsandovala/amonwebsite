"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, Users } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { GlassCard } from "../ui/GlassCard";

const features = [
    {
        icon: Lightbulb,
        title: "Claridad",
        description: "Información simplificada para decisiones informadas, sin tecnicismos innecesarios."
    },
    {
        icon: ShieldCheck,
        title: "Prevención",
        description: "Anticipamos necesidades mediante monitoreo inteligente y alertas tempranas."
    },
    {
        icon: Users,
        title: "Guía Responsable",
        description: "Acompañamiento ético que prioriza el bienestar humano sobre la automatización."
    }
];

export function WhyAmon() {
    return (
        <section className="py-24 px-4 bg-white relative">
            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    <motion.div variants={fadeUp} className="text-center space-y-4">
                        <h2 className="text-3xl font-semibold tracking-tight">Por qué AMON</h2>
                        <p className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
                            Información clara. <br />
                            <span className="text-neutral-400">Decisiones tranquilas.</span>
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={fadeUp}>
                                <GlassCard className="h-full flex flex-col items-start gap-4 hover:border-accent/30 transition-colors">
                                    <div className="p-3 rounded-2xl bg-neutral-50 text-neutral-900 mb-2">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-neutral-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
