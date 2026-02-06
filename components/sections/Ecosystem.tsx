"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const products = [
    { name: "HEO Sentinel", desc: "Asistente de salud preventiva y bienestar personal.", status: "Activo", color: "bg-emerald-500" },
    { name: "AMON Delivery", desc: "Logística inteligente para entregas eficientes.", status: "En Desarrollo", color: "bg-blue-500" },
    { name: "AMON POS", desc: "Punto de venta integrado al ecosistema.", status: "Roadmap", color: "bg-purple-500" },
    { name: "AMON Radar", desc: "Herramientas de visibilidad para emprendedores.", status: "Roadmap", color: "bg-amber-500" },
];

export function Ecosystem() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="container max-w-6xl mx-auto space-y-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ecosistema AMON</h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto text-lg text-balance">
                        Una suite interconectada de herramientas diseñadas para potenciar la colaboración y el bienestar.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {products.map((product, idx) => (
                        <motion.div key={idx} variants={fadeUp} className="h-full">
                            <GlassCard className="h-full flex flex-col justify-between group hover:border-neutral-200">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-8 w-8 rounded-lg bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-500">
                                            {product.name.charAt(0)}
                                        </div>
                                        <span className={cn("px-2 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase bg-opacity-10 text-neutral-600 border border-neutral-100")}>
                                            {product.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black transition-colors">{product.name}</h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        {product.desc}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-neutral-100">
                                    <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full w-1/3 opacity-50", product.color)} />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
