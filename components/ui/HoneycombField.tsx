"use client";

import { useEffect, useRef, useState } from "react";

interface HoneycombFieldProps {
    mode?: "hero" | "footer";
    density?: number;
}

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
}

// Warm scientific energy color system
const GLOW_COLOR = "rgba(255,214,102,0.22)";
const PARTICLE_COLOR = "rgba(255,214,102,0.55)";
const LINE_COLOR = "rgba(255,214,102,0.15)";

// Enhanced interaction parameters
const INTERACTION_RADIUS = 140;
const FORCE_STRENGTH = 0.08;

export function HoneycombField({ mode = "hero", density }: HoneycombFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const isVisibleRef = useRef(true);

    // Detect mobile for particle reduction
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const mobileReduction = isMobile ? 0.6 : 1;

    // Configuration based on mode
    const config = {
        hero: {
            particleCount: Math.floor((density ?? 80) * mobileReduction),
            connectionDistance: 120,
            repelDistance: INTERACTION_RADIUS,
            repelStrength: FORCE_STRENGTH,
            lineOpacity: 0.15,
            dotOpacity: 0.55,
            sparkProbability: 0.02,
            forceMultiplier: 1.0,
        },
        footer: {
            particleCount: Math.floor((density ?? 40) * mobileReduction),
            connectionDistance: 100,
            repelDistance: INTERACTION_RADIUS,
            repelStrength: FORCE_STRENGTH * 0.6, // Softer for footer
            lineOpacity: 0.08,
            dotOpacity: 0.35,
            sparkProbability: 0.01,
            forceMultiplier: 0.6,
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
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;

            // Apply devicePixelRatio for sharp rendering
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

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

        // Pause animation when tab not visible
        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;
            if (isVisibleRef.current && !prefersReducedMotion) {
                animate();
            }
        };

        const animate = () => {
            if (!ctx || prefersReducedMotion || !isVisibleRef.current) return;

            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const time = Date.now() * 0.001;

            // Update particles
            particles.forEach((p) => {
                // Subtle jitter for organic feel
                const jitterX = Math.sin(time + p.baseX * 0.01) * 0.5;
                const jitterY = Math.cos(time + p.baseY * 0.01) * 0.5;

                // Mouse repulsion with enhanced parameters
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.repelDistance) {
                    const force = (1 - dist / config.repelDistance) * config.repelStrength;
                    p.vx += (dx / dist) * force * 3;
                    p.vy += (dy / dist) * force * 3;
                }

                // Spring back to base position (reconnect to grid)
                p.vx += (p.baseX - p.x) * 0.05;
                p.vy += (p.baseY - p.y) * 0.05;

                // Damping
                p.vx *= 0.9;
                p.vy *= 0.9;

                // Apply velocity
                p.x += p.vx + jitterX;
                p.y += p.vy + jitterY;
            });

            // Draw connections with warm yellow
            ctx.strokeStyle = LINE_COLOR;
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

            // Draw particles with warm yellow and glow
            particles.forEach((p) => {
                const isSpark = Math.random() < config.sparkProbability;
                const size = isSpark ? 2.5 : 1.2;

                // Glow effect for sparks
                if (isSpark) {
                    ctx.fillStyle = GLOW_COLOR;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Main particle
                ctx.fillStyle = PARTICLE_COLOR;
                ctx.globalAlpha = isSpark ? 0.8 : config.dotOpacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Setup
        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(container);

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerleave", handlePointerLeave);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        resizeCanvas();

        if (!prefersReducedMotion) {
            animate();
        }

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [config, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return null; // Disable effect entirely for reduced motion
    }

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
