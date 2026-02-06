import { CallToAction } from "@/components/sections/CallToAction";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Privacy } from "@/components/sections/Privacy";
import { Roadmap } from "@/components/sections/Roadmap";
import { UseCases } from "@/components/sections/UseCases";
import { WhatHeoDoes } from "@/components/sections/WhatHeoDoes";
import { WhyAmon } from "@/components/sections/WhyAmon";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* 
        Hero Section: Introduction and main CTAs.
        Includes desktop-only mouse aura effect.
      */}
            <Hero />

            {/* Value Proposition */}
            <WhyAmon />

            {/* Product Features (HEO Focused) */}
            <WhatHeoDoes />

            {/* Full AMON Ecosystem */}
            <Ecosystem />

            {/* Use Cases / Stories */}
            <UseCases />

            {/* Privacy and Ethics */}
            <Privacy />

            {/* Future Roadmap */}
            <Roadmap />

            {/* Final CTA and Downloads */}
            <CallToAction />

            {/* Footer */}
            <Footer />
        </main>
    );
}
