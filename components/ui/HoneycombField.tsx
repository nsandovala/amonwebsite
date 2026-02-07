"use client";

import { useEffect, useRef, useState } from "react";

interface HoneycombFieldProps {
    mode?: "hero" | "footer";
    density?: number;
    accentColor?: string;
}

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
}

export function HoneycombField({ mode = "hero", density, accentColor = "#000000" }: HoneycombFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Configuration based on mode
    const config = {
        hero: {
            particleCount: density ?? 80,
            connectionDistance: 120,
            repelDistance: 150,
            repelStrength: 0.8,
            lineOpacity: 0.15,
            dotOpacity: 0.3,
            sparkProbability: 0.02,
        },
        footer: {
            particleCount: density ?? 40,
            connectionDistance: 100,
            repelDistance: 120,
            repelStrength: 0.5,
            lineOpacity: 0.08,
            dotOpacity: 0.2,
            sparkProbability: 0.01,
        }
    }[mode];

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particlesRef.current = [];

            // Honeycomb grid setup
            const hexRadius = Math.min(width, height) / 15;
            const hexWidth = hexRadius * Math.sqrt(3);
            const hexHeight = hexRadius * 1.5;

            const cols = Math.ceil(width / hexWidth) + 2;
            const rows = Math.ceil(height / hexHeight) + 2;

            const totalCells = cols * rows;
            const targetCount = config.particleCount;
            const skipFactor = Math.max(1, Math.floor(totalCells / targetCount));

            let particleIndex = 0;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    if (particleIndex % skipFactor !== 0) {
                        particleIndex++;
                        continue;
                    }

                    const offsetX = (row % 2) * (hexWidth / 2);
                    const x = col * hexWidth + offsetX;
                    const y = row * hexHeight;

                    particlesRef.current.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        vx: 0,
                        vy: 0,
                    });

                    particleIndex++;
                }
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handlePointerLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        };

        const animate = () => {
            if (!ctx || prefersReducedMotion) return;

            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const time = Date.now() * 0.001;

            // Update particles
            particles.forEach((p) => {
                // Subtle jitter
                const jitterX = Math.sin(time + p.baseX * 0.01) * 0.5;
                const jitterY = Math.cos(time + p.baseY * 0.01) * 0.5;

                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.repelDistance) {
                    const force = (1 - dist / config.repelDistance) * config.repelStrength;
                    p.vx += (dx / dist) * force * 2;
                    p.vy += (dy / dist) * force * 2;
                }

                // Spring back to base position
                p.vx += (p.baseX - p.x) * 0.05;
                p.vy += (p.baseY - p.y) * 0.05;

                // Damping
                p.vx *= 0.9;
                p.vy *= 0.9;

                // Apply velocity
                p.x += p.vx + jitterX;
                p.y += p.vy + jitterY;
            });

            // Draw connections
            ctx.strokeStyle = accentColor;
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectionDistance) {
                        const opacity = (1 - dist / config.connectionDistance) * config.lineOpacity;
                        ctx.globalAlpha = opacity;
                        ctx.lineWidth = 0.5;

                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw particles
            ctx.fillStyle = accentColor;
            particles.forEach((p) => {
                const isSpark = Math.random() < config.sparkProbability;
                const size = isSpark ? 2 : 1;
                const opacity = isSpark ? config.dotOpacity * 1.5 : config.dotOpacity;

                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;

            // Draw Mouse Glow (Desktop Only)
            if (window.matchMedia("(hover: hover)").matches && mouse.x > 0) {
                const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
                glowGradient.addColorStop(0, "rgba(255, 230, 100, 0.06)"); // Matte yellow center
                glowGradient.addColorStop(1, "rgba(255, 230, 100, 0)"); // Fade out

                ctx.save();
                ctx.fillStyle = glowGradient;
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Setup
        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(container);

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerleave", handlePointerLeave);

        resizeCanvas();

        if (!prefersReducedMotion) {
            animate();
        }

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [config, accentColor, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return null; // Disable effect entirely for reduced motion
    }

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
