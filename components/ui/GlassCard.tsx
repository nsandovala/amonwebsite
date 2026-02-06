"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    noHover?: boolean;
}

export function GlassCard({ children, className, noHover = false }: GlassCardProps) {
    return (
        <motion.div
            whileHover={noHover ? {} : { y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden",
                "bg-white border-white/50 shadow-sm transition-all",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
