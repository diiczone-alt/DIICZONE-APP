'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Clapperboard, Layers, Zap } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050510] text-white selection:bg-primary/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#050510]/80">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white">
                            DZ
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight">DIIC ZONE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Iniciar Sesión
                        </Link>
                        <Link href="/dashboard">
                            <button className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform">
                                Entrar al Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse pointer-events-none delay-1000"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-emerald-400 mb-6 backdrop-blur-sm">
                            ✨ La evolución del Marketing Digital
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            Tu Estudio Creativo <br /> en el Futuro
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Centraliza tu estrategia, producción y métricas en una plataforma inteligente.
                            DIIC ZONE combina IA, automatización y talento humano para escalar tu marca.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/onboarding">
                                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:scale-105 transition-transform flex items-center gap-2">
                                    Comenzar Ahora <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-lg backdrop-blur-sm transition-all">
                                Ver Demo
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Dashboard Preview / Faux 3D */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="container mx-auto px-6 mt-20"
                >
                    <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm">
                        <img
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
                            alt="Dashboard Preview"
                            className="rounded-xl w-full object-cover opacity-50 border border-white/5 shadow-2xl"
                        />
                        {/* Overlay UI Mockups */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center">
                            <p className="text-gray-500">Vista Previa de Plataforma</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-[#050510]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas para crecer</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Deja de usar 10 herramientas diferentes. DIIC ZONE lo tiene todo integrado.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Métricas Inteligentes</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Dashboards en tiempo real que traducen datos complejos en "Niveles de Salud" claros para tu marca.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <Bot className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Community Manager IA</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Un asistente 24/7 que responde, analiza sentimientos y sugiere contenido basado en tendencias.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                <Clapperboard className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Producción de Video</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Sube raw, recibe piezas finales. Un flujo de trabajo optimizado para Reels y contenido de alto impacto.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-[#020205]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-400 text-sm">
                        © 2026 DIIC ZONE. Todos los derechos reservados.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
