"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { fadeUp } from "@/lib/animations";
import { useState, useRef } from "react";
import { InstallModal } from "../ui/InstallModal";
import Link from "next/link";

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        x.set(clientX);
        y.set(clientY);
    };

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 py-20 bg-background"
        >
            {/* Mouse Aura (Desktop Only) */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="fixed top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:block z-0"
            />

            <div className="container relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="space-y-8"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-24 opacity-20 pointer-events-none">
                        {/* Abstract background element or logo glow could go here */}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-black pb-2">
                        Infraestructura digital para el bienestar humano
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto text-balance font-light leading-relaxed">
                        AMON integra orientación preventiva, asistencia inteligente y herramientas para emprendedores en una sola plataforma.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        {/* Primary CTA */}
                        <Link href="https://www.amonhealt.cl/home" target="_blank">
                            <MagneticButton className="h-12 px-8 text-base">
                                Probar HEO <ArrowRight className="ml-2 w-4 h-4" />
                            </MagneticButton>
                        </Link>

                        {/* Secondary CTA */}
                        <MagneticButton
                            variant="secondary"
                            onClick={() => setIsModalOpen(true)}
                            className="h-12 px-8 text-base"
                        >
                            <Smartphone className="mr-2 w-4 h-4" /> Instalar App
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
