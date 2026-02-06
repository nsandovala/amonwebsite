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

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        // Calculate distance from center
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Move element slightly towards cursor (magnetic effect)
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.15);
        y.set(distanceY * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const variants = {
        primary: "bg-black text-white hover:bg-neutral-800",
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
                "magnetic-btn inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide",
                variants[variant],
                className
            )}
        >
            {children}
        </motion.button>
    );
}
