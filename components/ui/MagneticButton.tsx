"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
}

export function MagneticButton({ children, className, onClick, variant = "primary" }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        // Calculate distance from center for magnetic effect
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.15);
        y.set(distanceY * 0.15);

        // Update mouse position for spotlight effect
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };

    const variants = {
        primary: "bg-black text-white hover:bg-neutral-900",
        secondary: "bg-white text-black border border-neutral-200 hover:border-neutral-300",
        outline: "bg-transparent text-black border border-black/10 hover:border-black/30"
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "magnetic-btn group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide overflow-hidden rounded-md transition-colors duration-300",
                variants[variant],
                className
            )}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`
                    ),
                }}
            />
            {/* Secondary Variant specific highlight (darker for contrast on white) */}
            {variant === 'secondary' && (
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,0.05), transparent 40%)`
                        ),
                    }}
                />
            )}

            <span className="relative z-10 flex items-center">{children}</span>
        </motion.button>
    );
}
