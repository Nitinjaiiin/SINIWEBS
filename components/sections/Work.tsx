"use client";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { useConsultation } from "@/components/consultation/ConsultationContext";
import { AtmosphericBackground } from "@/components/3d/AtmosphericBackground";

const projects = [
  {
    id: "01",
    name: "LUMINA",
    category: "Concept — Hospitality & Destination Brand",
    year: "2024",
    description:
      "A cinematic hospitality platform where booking feels like an editorial journey. Rich imagery, restrained typography, and a flow that mirrors the anticipation of travel.",
    tech: ["Next.js", "GSAP", "Sanity", "Vercel"],
    accent: "#c2410c",
    accentLight: "#fb923c",
    gradient: "from-orange-900/20 via-stone-900/10 to-transparent",
  },
  {
    id: "02",
    name: "KAIRO",
    category: "Concept — Fashion & Lifestyle Brand",
    year: "2024",
    description:
      "An editorial fashion experience with oversized typography, lookbook layouts, and a shopping flow that treats product as art direction.",
    tech: ["Next.js", "Shopify Hydrogen", "Framer Motion", "Contentful"],
    accent: "#9f1239",
    accentLight: "#fb7185",
    gradient: "from-rose-900/20 via-neutral-900/10 to-transparent",
  },
  {
    id: "03",
    name: "ORBITAL",
    category: "Concept — AI & Technology Platform",
    year: "2024",
    description:
      "A high-end AI product interface with real-time data visualizations, animated metrics, and a dark interface that makes complex systems feel approachable.",
    tech: ["React", "TypeScript", "D3.js", "WebGL"],
    accent: "#1e1b4b",
    accentLight: "#818cf8",
    gradient: "from-indigo-900/20 via-slate-900/10 to-transparent",
  },
  {
    id: "04",
    name: "NOIR HOUSE",
    category: "Concept — Architecture & Interiors",
    year: "2024",
    description:
      "A spatial design studio website with monumental typography, asymmetric galleries, and a warm stone palette where restraint reads as luxury.",
    tech: ["Next.js", "Framer Motion", "Prismic", "Vercel"],
    accent: "#78716c",
    accentLight: "#d6d3d1",
    gradient: "from-stone-800/20 via-stone-900/10 to-transparent",
  },
  {
    id: "05",
    name: "VANTA",
    category: "Concept — Automotive & Product",
    year: "2024",
    description:
      "A premium product showcase with cinematic reveals, 3D-like hover states, and a dark interface that puts the product at the center of the experience.",
    tech: ["Next.js", "Three.js", "GSAP", "Sanity"],
    accent: "#7f1d1d",
    accentLight: "#fca5a5",
    gradient: "from-red-950/20 via-neutral-900/10 to-transparent",
  },
];

const projectMeta: Record<
  string,
  { objective: string; direction: string; services: string[] }
> = {
  "01": {
    objective:
      "Make travel feel like an editorial experience rather than a booking flow.",
    direction:
      "Cinematic storytelling layout, immersive imagery, restrained typography. The website should feel like a destination, not a directory.",
    services: ["Next.js", "GSAP", "CMS Integration", "Booking UI"],
  },
  "02": {
    objective:
      "Build a fashion e-commerce experience that feels as considered as the product.",
    direction:
      "Editorial layout, oversized typography, restrained color. The website should feel like a lookbook, not a catalog.",
    services: ["Shopify Hydrogen", "Custom Theme", "CMS Integration", "Animations"],
  },
  "03": {
    objective:
      "Make complex data feel approachable. Dense information, breathable interface.",
    direction:
      "Dark UI with strategic color accents. Every metric has a purpose. Live chart feel.",
    services: ["React", "D3.js", "Dashboard Design", "Data Visualization"],
  },
  "04": {
    objective:
      "Translate physical architecture into digital space. The website should feel like a building.",
    direction:
      "Monumental typography, asymmetric gallery, warm stone palette. Restraint as luxury.",
    services: ["Next.js", "Framer Motion", "Image Gallery", "CMS"],
  },
  "05": {
    objective:
      "Make product presentation feel cinematic and immediate.",
    direction:
      "Dark charcoal base, strategic crimson accents, smooth transitions. The product is the hero.",
    services: ["Next.js", "Three.js", "Product Showcase", "Animations"],
  },
};

function AccentBar({ color }: { color: string }) {
  return <span className="block h-px w-8" style={{ backgroundColor: color }} />;
}

function OverlayGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function MockupLumina() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const destinations = [
    { name: "Santorini", country: "Greece", nights: "7 nights" },
    { name: "Kyoto", country: "Japan", nights: "5 nights" },
    { name: "Patagonia", country: "Argentina", nights: "10 nights" },
    { name: "Amalfi", country: "Italy", nights: "6 nights" },
  ];

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-off-white/10 bg-[#0c0a09] font-sans">
      <OverlayGrain />

      {/* Cinematic hero */}
      <div className="relative h-52 border-b border-off-white/10 bg-gradient-to-br from-orange-500/8 via-stone-500/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-5 md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/8 px-3 py-1 w-fit">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
            </span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-400/90">
              Featured Journey
            </p>
          </div>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-off-white leading-[0.95]">
            BEYOND THE MAP
          </h3>
          <p className="mt-2 max-w-md text-xs text-light-gray/80 leading-relaxed">
            Curated travel experiences for those who see the world as a canvas.
          </p>
        </div>
      </div>

      {/* Destination grid */}
      <div className="px-5 md:px-8 py-5">
        <div className="grid grid-cols-2 gap-2.5">
          {destinations.map((destination, idx) => (
            <div
              key={destination.name}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative cursor-pointer border border-off-white/10 bg-[#0c0a09] p-3 transition-all duration-500 hover:border-orange-500/25"
            >
              <div
                className="relative h-24 w-full overflow-hidden rounded-sm transition-all duration-700"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(234,88,12,0.08) 0%, rgba(28,25,23,0.15) 100%)",
                  transform:
                    hoveredCard === idx ? "scale(1.03)" : "scale(1)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-20 border border-off-white/10 bg-off-white/5 transition-all duration-500 group-hover:border-orange-500/25" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="text-[11px] uppercase tracking-[0.15em] text-off-white transition-colors duration-300 group-hover:text-orange-400">
                  {destination.name}
                </p>
                <p className="text-[10px] text-mist/80">
                  {destination.country} · {destination.nights}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-off-white/10 px-5 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-mist/70">
            Limited Editions — 001
          </p>
          <button
            type="button"
            onClick={() => {}}
            className="text-[11px] uppercase tracking-[0.15em] text-orange-500/80 transition-all duration-300 hover:tracking-[0.2em] hover:text-orange-400"
          >
            Explore Journeys →
          </button>
        </div>
      </div>
    </div>
  );
}

function MockupKairo() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const products = [
    { name: "OVERSIZED HOODIE", price: "₹4,200", tag: "New" },
    { name: "CARGO PANT", price: "₹3,800", tag: "Best" },
    { name: "GRAPHIC TEE", price: "₹2,400", tag: "" },
    { name: "DENIM JACKET", price: "₹6,800", tag: "Limited" },
  ];

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-off-white/10 bg-[#0c0a09] font-sans">
      <OverlayGrain />

      {/* Editorial hero */}
      <div className="relative h-40 border-b border-off-white/10 bg-gradient-to-br from-rose-500/10 via-neutral-500/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-5 md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/8 px-3 py-1 w-fit">
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400/90">
              New Drop — 001
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-off-white leading-[0.95]">
            STREET CULTURE
          </h3>
          <p className="mt-2 max-w-md text-xs text-light-gray/80 leading-relaxed">
            Premium essentials for the modern creative.
          </p>
        </div>
      </div>

      {/* Cart indicator */}
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-off-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-[10px] uppercase tracking-[0.15em] text-off-white">
          Cart (0)
        </span>
      </div>

      {/* Product grid */}
      <div className="px-5 md:px-8 py-5">
        <div className="grid grid-cols-4 gap-2.5">
          {products.map((product, idx) => (
            <div
              key={product.name}
              onMouseEnter={() => setHoveredProduct(idx)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group relative cursor-pointer border border-off-white/10 bg-[#0c0a09] p-2.5 transition-all duration-500 hover:border-rose-500/25"
            >
              <div
                className="relative h-28 w-full overflow-hidden rounded-sm transition-all duration-700"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(244,63,94,0.06) 0%, rgba(28,25,23,0.1) 100%)",
                  transform:
                    hoveredProduct === idx ? "scale(1.03)" : "scale(1)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-12 border border-off-white/10 bg-off-white/5 transition-all duration-500 group-hover:border-rose-500/25" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {product.tag && (
                  <span className="absolute left-2 top-2 text-[9px] uppercase tracking-[0.15em] text-rose-400/90 border border-rose-500/25 px-2 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="mt-2.5 space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-off-white transition-colors duration-300 group-hover:text-rose-400">
                  {product.name}
                </p>
                <p className="text-[10px] text-mist/80">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-off-white/10 px-5 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-mist/70">
            Limited Drop — 001
          </p>
          <button
            type="button"
            onClick={() => {}}
            className="text-[11px] uppercase tracking-[0.15em] text-rose-500/80 transition-all duration-300 hover:tracking-[0.2em] hover:text-rose-400"
          >
            Shop Drop →
          </button>
        </div>
      </div>
    </div>
  );
}

function MockupOrbital() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const kpis = [
    { label: "Revenue", value: "₹2.4L", change: "+12%", trend: [30, 45, 40, 60, 50, 70, 65, 80, 75, 90] },
    { label: "Orders", value: "384", change: "+8%", trend: [20, 35, 25, 45, 40, 55, 50, 60, 58, 70] },
    { label: "Users", value: "1,284", change: "+15%", trend: [40, 50, 55, 60, 65, 70, 75, 80, 85, 90] },
    { label: "Growth", value: "+12%", change: "+3%", trend: [10, 20, 15, 30, 25, 35, 30, 45, 40, 50] },
  ];

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-off-white/10 bg-[#0d0f12] font-sans">
      <OverlayGrain />

      {/* Sidebar + main */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="hidden md:flex w-14 flex-col items-center border-r border-off-white/10 py-4 gap-5">
          <div className="h-2 w-8 rounded bg-indigo-400/40" />
          <div className="h-2 w-6 rounded bg-off-white/10" />
          <div className="h-2 w-6 rounded bg-off-white/10" />
          <div className="h-2 w-6 rounded bg-off-white/10" />
          <div className="h-2 w-6 rounded bg-off-white/10" />
          <div className="mt-auto h-2 w-6 rounded bg-off-white/10" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400/70 mb-1">
                Dashboard
              </p>
              <h3 className="text-lg font-medium tracking-tight text-off-white">
                Performance Overview
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-mist uppercase tracking-[0.15em]">
                Last 30 days
              </span>
              <div className="h-6 w-14 rounded border border-off-white/10 bg-off-white/5" />
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3">
            {kpis.map((kpi, idx) => {
              const max = Math.max(...kpi.trend);
              return (
                <div
                  key={kpi.label}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="border border-indigo-500/15 p-3 transition-all duration-500 hover:border-indigo-500/30"
                  style={{
                    backgroundColor:
                      hoveredCard === idx
                        ? "rgba(99,102,241,0.04)"
                        : "transparent",
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.15em] text-mist mb-1">
                    {kpi.label}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-medium text-off-white">
                      {kpi.value}
                    </p>
                    <span className="text-[10px] text-indigo-400">
                      {kpi.change}
                    </span>
                  </div>
                  {/* Mini sparkline */}
                  <div className="mt-2 flex items-end gap-[2px] h-6">
                    {kpi.trend.map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-indigo-500/20 transition-all duration-300"
                        style={{ height: `${(val / max) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity feed */}
          <div className="border border-off-white/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-mist mb-3">
              Recent Activity
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { action: "New order placed", time: "2 min ago", amount: "₹4,200" },
                { action: "Payment received", time: "18 min ago", amount: "₹12,400" },
                { action: "User signup", time: "1 hr ago", amount: "" },
              ].map((activity) => (
                <div
                  key={activity.action}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <p className="text-[10px] text-off-white">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {activity.amount && (
                      <span className="text-[10px] text-indigo-400">
                        {activity.amount}
                      </span>
                    )}
                    <span className="text-[9px] text-mist">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupNoirHouse() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projects = [
    { name: "VOID HOUSE", location: "Mumbai, 2024", type: "Residential" },
    { name: "TERRACE 07", location: "Bangalore, 2023", type: "Commercial" },
    { name: "BRIDGE STUDIO", location: "Delhi, 2024", type: "Workspace" },
  ];

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-off-white/10 bg-[#0c0b0a] font-sans">
      <OverlayGrain />
      <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-stone-500/5 to-transparent" />

      {/* Decorative line elements */}
      <div className="absolute left-8 top-1/2 hidden md:block h-32 w-px bg-gradient-to-b from-transparent via-stone-500/20 to-transparent" />

      {/* Minimal nav */}
      <div className="flex items-center justify-between border-b border-off-white/10 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-off-white">
          NOIR HOUSE
        </span>
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.15em] text-mist">
          <span className="cursor-pointer transition-colors duration-300 hover:text-off-white">
            Projects
          </span>
          <span className="cursor-pointer transition-colors duration-300 hover:text-off-white">
            Studio
          </span>
          <span className="cursor-pointer transition-colors duration-300 hover:text-off-white">
            Contact
          </span>
        </div>
      </div>

      {/* Giant typography header */}
      <div className="relative px-5 pt-10 pb-6 md:px-8 md:pt-14">
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-3">
          Architecture & Spatial Design
        </p>
        <h3 className="text-5xl md:text-7xl font-medium tracking-tighter text-off-white leading-[0.9]">
          SPACES
          <br />
          <span className="text-stone-600">THAT</span>
          <br />
          <span className="text-stone-400">BREATHE.</span>
        </h3>
      </div>

      {/* Project gallery */}
      <div className="px-5 md:px-8 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative h-36 cursor-pointer border border-off-white/10 bg-[#141210] p-3 transition-all duration-700 hover:border-stone-500/25"
              style={{
                transform:
                  hoveredProject === idx
                    ? "translateY(-4px)"
                    : "translateY(0)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone-500/5 to-transparent" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div
                    className="h-16 w-full rounded-sm transition-all duration-700"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(168,162,158,0.08) 0%, rgba(41,37,36,0.1) 100%)",
                      transform:
                        hoveredProject === idx
                          ? "scale(1.03)"
                          : "scale(1)",
                    }}
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 transition-colors duration-300 group-hover:text-off-white">
                    {project.name}
                  </p>
                  <p className="text-[9px] text-stone-600 mt-0.5">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote / philosophy */}
      <div className="border-t border-off-white/10 px-5 py-4 md:px-8">
        <p className="text-[11px] text-stone-500 leading-relaxed max-w-lg italic">
          &ldquo;We believe in restraint. Every line, every material, every shadow
          serves the space.&rdquo;
        </p>
      </div>
    </div>
  );
}

function MockupVanta() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const features = [
    { title: "Performance", desc: "0.2s load time", icon: "⚡" },
    { title: "Design", desc: "Award winning", icon: "◆" },
    { title: "Support", desc: "24/7 available", icon: "●" },
  ];

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-off-white/10 bg-[#0c0a09] font-sans">
      <OverlayGrain />

      {/* Cinematic hero */}
      <div className="relative h-40 border-b border-off-white/10 bg-gradient-to-br from-red-500/10 via-neutral-500/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-5 md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/8 px-3 py-1 w-fit">
            <span className="text-[10px] uppercase tracking-[0.3em] text-red-400/90">
              New Model — 001
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-off-white leading-[0.95]">
            BEYOND LIMITS
          </h3>
          <p className="mt-2 max-w-md text-xs text-light-gray/80 leading-relaxed">
            Engineered for those who refuse to compromise.
          </p>
        </div>
      </div>

      {/* Product showcase */}
      <div className="px-5 md:px-8 py-5">
        <div className="flex gap-4">
          {/* Main product image area */}
          <div className="flex-1 h-48 border border-off-white/10 bg-gradient-to-br from-red-500/5 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-40 border border-off-white/10 bg-off-white/5 transition-all duration-700 hover:border-red-500/25" />
            </div>
            <div className="absolute bottom-3 left-3">
              <p className="text-[10px] uppercase tracking-[0.15em] text-off-white">
                Signature Edition
              </p>
              <p className="text-[11px] text-mist mt-0.5">From ₹12.5L</p>
            </div>
          </div>

          {/* Side features */}
          <div className="hidden md:flex w-32 flex-col gap-2.5">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="flex-1 border border-off-white/10 p-3 transition-all duration-500 hover:border-red-500/25 cursor-pointer"
                style={{
                  backgroundColor:
                    hoveredFeature === idx
                      ? "rgba(220,38,38,0.04)"
                      : "transparent",
                }}
              >
                <p className="text-[10px] text-mist mb-1">{feature.icon}</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-off-white transition-colors duration-300 group-hover:text-red-400">
                  {feature.title}
                </p>
                <p className="text-[10px] text-mist/80 mt-0.5">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs bar */}
      <div className="px-5 md:px-8 pb-5">
        <div className="grid grid-cols-3 gap-3">
          {["0-100 in 2.8s", "650 HP", "AWD"].map((spec) => (
            <div
              key={spec}
              className="border border-off-white/10 p-3 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-mist mb-1">
                Spec
              </p>
              <p className="text-xs text-off-white font-medium">{spec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-off-white/10 px-5 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-mist/70">
            Signature Series
          </p>
          <button
            type="button"
            onClick={() => {}}
            className="text-[11px] uppercase tracking-[0.15em] text-red-500/80 transition-all duration-300 hover:tracking-[0.2em] hover:text-red-400"
          >
            Configure →
          </button>
        </div>
      </div>
    </div>
  );
}

const mockups = [MockupLumina, MockupKairo, MockupOrbital, MockupNoirHouse, MockupVanta];

export function Work() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { setOpen, setInitialPackage } = useConsultation();

  const openProject = (id: string) => {
    setActiveProject(id);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section id="work" className="relative z-10 px-6 py-24 md:px-16 md:py-32">
      <AtmosphericBackground />
      <Reveal>
        <div className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl max-w-4xl">
            Concepts and digital experiences
            <br className="hidden md:block" />
            developed by SINIWEBS.
          </h2>
          <p className="text-base text-light-gray max-w-2xl mt-6 md:text-lg leading-relaxed">
            Each project is a unique direction — from hospitality platforms to
            AI dashboards, fashion commerce to architectural studios.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10 flex flex-col gap-20 md:gap-28">
        {projects.map((project, index) => {
          const Mockup = mockups[index];
          return (
            <Reveal key={project.id} delay={index * 0.06}>
              <article
                data-cursor="VIEW"
                className="group cursor-pointer"
              >
                {/* Project header */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-mist uppercase tracking-[0.2em]">
                      {project.id}
                    </span>
                    <AccentBar color={project.accent} />
                  </div>
                  <span className="text-xs text-mist uppercase tracking-[0.2em] pt-1 hidden md:block">
                    {project.category}
                  </span>
                </div>

                {/* Project name */}
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h3 className="text-3xl font-medium tracking-tight md:text-5xl transition-colors duration-500 group-hover:text-off-white">
                    {project.name}
                  </h3>
                  <span className="text-xs text-mist uppercase tracking-[0.2em] pb-1 hidden md:block">
                    {project.year}
                  </span>
                </div>

                {/* Premium mockup */}
                <div
                  className="relative mb-5"
                  onClick={() => openProject(project.id)}
                >
                  <div className="overflow-hidden rounded-sm transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                    <Mockup />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  {/* View indicator */}
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-off-white/20 bg-black/60 px-3 py-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-sm">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-off-white">
                      View Case
                    </span>
                    <span className="text-[10px] text-off-white">→</span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <p className="text-sm text-light-gray leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] uppercase tracking-[0.15em] text-mist/80 border border-off-white/10 px-3 py-1.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={closeProject}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-off-white/10 bg-charcoal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProject}
              className="absolute right-4 top-4 z-10 text-xs uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:text-off-white"
            >
              Close
            </button>

            {(() => {
              const project = projects.find((p) => p.id === activeProject);
              if (!project) return null;
              const meta = projectMeta[project.id];
              const Mockup = mockups[Number(project.id) - 1];
              return (
                <div>
                  {/* Header */}
                  <div className="border-b border-off-white/10 p-6 md:p-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-mist mb-3">
                      Concept Project
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-medium tracking-tight md:text-5xl mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-light-gray">
                          {project.category}
                        </p>
                      </div>
                      <span className="text-xs text-mist uppercase tracking-[0.2em]">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-4 md:p-6">
                    <div className="overflow-hidden rounded-sm border border-off-white/10">
                      <Mockup />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="border-t border-off-white/10 p-6 md:p-10">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-mist mb-3">
                          Objective
                        </p>
                        <p className="text-sm text-light-gray leading-relaxed">
                          {meta.objective}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-mist mb-3">
                          Creative Direction
                        </p>
                        <p className="text-sm text-light-gray leading-relaxed">
                          {meta.direction}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-mist mb-4">
                        Services Provided
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {meta.services.map((service) => (
                          <span
                            key={service}
                            className="text-[11px] uppercase tracking-[0.15em] text-off-white border border-off-white/15 px-4 py-2 rounded-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-off-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          closeProject();
                          setInitialPackage("custom");
                          setOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-off-white text-black text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:bg-muted-red hover:text-off-white hover:-translate-y-0.5"
                      >
                        Discuss a Similar Project
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
