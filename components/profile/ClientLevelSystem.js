'use client';

import { useState } from 'react';
import {
    Star, Target, Zap,
    ArrowUpRight, CheckCircle2,
    Circle, Rocket, Award,
    Trophy, Flag, ShieldCheck,
    Briefcase, Activity, Sparkles,
    ChevronRight, Info, TrendingUp,
    LayoutGrid, Video, Globe, Lock,
    Camera, Palette, Type, CheckCircle,
    Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GrowthAlertSystem from '../connectivity/GrowthAlertSystem';

export default function ClientLevelSystem({ initialLevel = 2 }) {
    const [level, setLevel] = useState(initialLevel);

    // Checkbox states for demo simulation
    const [completedMetas, setCompletedMetas] = useState({
        // L1
        'logo': true, 'colors': true, 'bio': true, 'photo': true, 'socials': true, 'posts6': true,
        // L2
        'calendar': true, 'posts12': true, 'reels2': false, 'profile': true, 'message': false,
    });

    const levels = [
        {
            id: 1,
            name: "Inicio Digital",
            color: "emerald",
            mainGoal: "Existir profesionalmente",
            indicator: "Presencia digital creada",
            status: "El cliente apenas comienza.",
            metas: [
                { id: 'logo', label: "Logo definido", service: "Diseño Base" },
                { id: 'colors', label: "Colores de marca", service: "Diseño Base" },
                { id: 'bio', label: "Bio profesional", service: "Configuración Redes" },
                { id: 'photo', label: "Foto profesional", service: "Fotografía" },
                { id: 'socials', label: "Redes abiertas", service: "Configuración Redes" },
                { id: 'posts6', label: "6 contenidos publicados", service: "Primeros Posts" }
            ],
            rewards: [
                { id: 'tips', label: "Tips IA Personalizados", icon: Sparkles },
                { id: 'templates', label: "Plantillas Básicas", icon: LayoutGrid },
                { id: 'support', label: "Soporte Base", icon: Info }
            ],
            icon: Circle
        },
        {
            id: 2,
            name: "Presencia",
            color: "yellow",
            mainGoal: "Ser visible",
            indicator: "Marca visible y constante",
            status: "Ya se ve, pero aún no vende bien.",
            metas: [
                { id: 'calendar', label: "Calendario de contenido activo", service: "Community Manager" },
                { id: 'posts12', label: "12 publicaciones al mes", service: "Community Manager" },
                { id: 'reels2', label: "2 videos profesionales", service: "Edición de Video / Reels" },
                { id: 'profile', label: "Perfil optimizado", service: "Community Manager" },
                { id: 'message', label: "Mensaje claro de servicios", service: "Estrategia" }
            ],
            rewards: [
                { id: 'priority', label: "Prioridad Media", icon: Activity },
                { id: 'review', label: "Revisión Mensual", icon: CheckCircle2 },
                { id: 'auto-suggest', label: "Sugerencias Auto", icon: Zap }
            ],
            icon: LayoutGrid
        },
        {
            id: 3,
            name: "Confianza",
            color: "orange",
            mainGoal: "Generar credibilidad",
            indicator: "Marca confiable",
            status: "La gente empieza a confiar.",
            metas: [
                { id: 'testimonio3', label: "3 testimonios reales", service: "Videos Testimoniales" },
                { id: 'corpvideo', label: "Video corporativo", service: "Edición Profesional" },
                { id: 'solidbrand', label: "Branding sólido", service: "Diseño Avanzado" },
                { id: 'educontent', label: "Contenido educativo", service: "Community Manager" },
                { id: 'digitalport', label: "Portafolio digital", service: "Fotografía Profesional" }
            ],
            rewards: [
                { id: 'audit', label: "Auditoría de Marca", icon: ShieldCheck },
                { id: 'bio-opt', label: "Optimización Bio", icon: Type },
                { id: 'early', label: "Acceso Anticipado", icon: Rocket }
            ],
            icon: Award
        },
        {
            id: 4,
            name: "Autoridad",
            color: "blue",
            mainGoal: "Ser referente",
            indicator: "Sistema de ventas funcionando",
            status: "Es referencia en su sector.",
            metas: [
                { id: 'proweb', label: "Web profesional", service: "Desarrollo Web" },
                { id: 'schedu', label: "Sistema de agendamiento", service: "SaaS / Chatbot" },
                { id: 'autobasic', label: "Automatización básica", service: "Automatizaciones" },
                { id: 'crmactive', label: "CRM activo", service: "CRM DIIC" },
                { id: 'ads', label: "Campañas publicitarias", service: "Pauta Publicitaria" }
            ],
            rewards: [
                { id: 'extra-strat', label: "Sesión Estratégica Extra", icon: Target },
                { id: 'competitors', label: "Análisis Competencia", icon: TrendingUp },
                { id: 'premium-rev', label: "Review Premium", icon: Video }
            ],
            icon: Star
        },
        {
            id: 5,
            name: "Escala",
            color: "purple",
            mainGoal: "Crecimiento constante",
            indicator: "Negocio en expansión",
            status: "Negocio estructurado.",
            metas: [
                { id: 'stableflow', label: "Flujo estable de clientes", service: "Marketing Escala" },
                { id: 'roipos', label: "ROI positivo", service: "Optimización Campañas" },
                { id: 'advauto', label: "Automatizaciones avanzadas", service: "IA / Custom Dev" },
                { id: 'funnels', label: "Embudos activos", service: "Estrategia de Ventas" },
                { id: 'contentpro', label: "Producción constante", service: "Full Production" }
            ],
            rewards: [
                { id: 'expansion', label: "Plan Expansión", icon: Globe },
                { id: 'vip-ia', label: "Automatización IA VIP", icon: Zap },
                { id: 'vip-support', label: "Soporte Prioritario", icon: ShieldCheck }
            ],
            icon: Rocket
        }
    ];

    const currentLevelData = levels[level - 1];

    // Progress calculation for current level
    const currentLevelMetas = currentLevelData.metas;
    const completedCount = currentLevelMetas.filter(m => completedMetas[m.id]).length;
    const progress = Math.round((completedCount / currentLevelMetas.length) * 100);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-left pb-16">
            {/* SMART ALERTS SECTION */}
            <GrowthAlertSystem />

            {/* LEVEL HEADER - COACH MODE */}
            <div className="bg-gradient-to-br from-[#0A0A12] to-[#11111E] border border-white/10 p-10 rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Trophy className={`w-64 h-64 text-${currentLevelData.color}-500`} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10 text-left">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-3xl bg-${currentLevelData.color}-500/10 text-${currentLevelData.color}-400 border border-${currentLevelData.color}-500/20`}>
                                <currentLevelData.icon className="w-10 h-10" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-${currentLevelData.color}-500`}>Nivel {level}</span>
                                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{currentLevelData.indicator}</span>
                                </div>
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mt-1">{currentLevelData.name}</h2>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-gray-300 font-bold text-lg flex items-center gap-2">
                                <Target className="w-5 h-5 text-red-500" /> Meta Principal: <span className="text-white">{currentLevelData.mainGoal}</span>
                            </h3>
                            <p className="text-gray-500 font-medium italic text-sm">"{currentLevelData.status}"</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center min-w-[200px] backdrop-blur-md">
                        <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <motion.circle
                                    cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={301.6}
                                    initial={{ strokeDashoffset: 301.6 }}
                                    animate={{ strokeDashoffset: 301.6 * (1 - progress / 100) }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className={`text-${currentLevelData.color}-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                                />
                            </svg>
                            <span className="absolute text-2xl font-black text-white">{progress}%</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight">Completado para siguiente nivel</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* METAS ACTUALES CHECKLIST */}
                <div className="lg:col-span-2 bg-[#0A0A12] border border-white/10 rounded-[40px] p-10 text-left relative overflow-hidden shadow-xl">
                    <div className="flex justify-between items-center mb-10">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                                <Flag className="w-6 h-6 text-indigo-400" /> Plan de Evolución Obligatorio
                            </h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-9">Metas para Nivel {level}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {currentLevelData.metas.map((meta, i) => (
                            <div
                                key={meta.id}
                                className={`flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 group ${completedMetas[meta.id] ? 'bg-emerald-500/5 border-emerald-500/20 shadow-emerald-500/5' : 'bg-white/5 border-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl transition-colors ${completedMetas[meta.id] ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-600'}`}>
                                        {completedMetas[meta.id] ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-black uppercase tracking-tight ${completedMetas[meta.id] ? 'text-white' : 'text-gray-400'}`}>
                                            {meta.label}
                                        </h4>
                                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">
                                            Requiere: <span className="text-indigo-400">{meta.service}</span>
                                        </p>
                                    </div>
                                </div>
                                {!completedMetas[meta.id] && (
                                    <button className="px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 hover:text-white transition-all active:scale-95">
                                        Activar Servicio
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* RECOMPENSAS DESBLOQUEADAS */}
                    <div className="mt-12 pt-10 border-t border-white/5">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                            <Gift className="w-6 h-6 text-pink-400" /> Beneficios Desbloqueados (Nivel {level})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentLevelData.rewards.map((reward, i) => (
                                <motion.div
                                    key={reward.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 border border-white/10 p-6 rounded-[32px] group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <reward.icon className="w-12 h-12 text-white" />
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl bg-${currentLevelData.color}-500/10 flex items-center justify-center mb-4 text-${currentLevelData.color}-400 border border-${currentLevelData.color}-500/20`}>
                                        <reward.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{reward.label}</h4>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase mt-2">Estado: <span className="text-emerald-400">Activo</span></p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COACH INSIGHTS & UPCOMING METAS */}
                <div className="space-y-8">
                    {/* ENTRENADOR EMPRESARIAL IA */}
                    <div className="bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 rounded-[40px] p-8 text-left relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full" />
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-4">
                            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" /> Coach Empresarial IA
                        </h4>
                        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 mb-8 backdrop-blur-sm relative z-10 shadow-inner">
                            <p className="text-xs text-gray-300 font-bold italic leading-relaxed">
                                "Mike, vas por buen camino con tu <span className="text-indigo-400 font-black">PRESENCIA (LVL 2)</span>, pero para escalar necesitamos que tus <span className="text-white">REELS PROFESSIONAL</span> y el <span className="text-white">MENSAJE CLARO</span> estén terminados. ¿Vemos el flujo de guiones?"
                            </p>
                        </div>
                        <button className="w-full py-4 bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group border border-white/10">
                            Lograr Siguiente Meta <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* METAS BLOQUEADAS (NEXT LEVELS) */}
                    <div className="bg-[#0A0A12] border border-white/5 rounded-[40px] p-8 text-left">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Roadmap de Crecimiento</h4>
                            <Lock className="w-3 h-3 text-gray-700" />
                        </div>
                        <div className="space-y-3">
                            {levels.filter(l => l.id > level).map(futureL => (
                                <div key={futureL.id} className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-3xl opacity-40 group cursor-not-allowed transition-all">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-gray-600 uppercase">Nivel {futureL.id}</span>
                                        <Lock className="w-3 h-3 text-gray-800" />
                                    </div>
                                    <h5 className="text-xs font-black text-gray-500 uppercase leading-none">{futureL.name}</h5>
                                    <div className="mt-3 flex gap-2">
                                        {futureL.rewards.slice(0, 3).map((reward, i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-700"
                                                title={reward.label}
                                            >
                                                <reward.icon className="w-3.5 h-3.5" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL EVOLUTION FOOT PRINT */}
            <div className="bg-[#0A0A12] border border-white/10 rounded-[40px] p-10 text-left shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <TrendingUp className="w-40 h-40 text-indigo-500" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-12 flex items-center gap-4">
                    <TrendingUp className="w-7 h-7 text-indigo-400" /> Tu Historial de Éxito
                </h3>
                <div className="flex gap-8 overflow-x-auto pb-6 relative no-scrollbar">
                    {levels.map(l => (
                        <div key={l.id} className={`flex-1 min-w-[300px] p-8 rounded-[40px] border transition-all duration-700 group ${l.id === level ? 'bg-white/5 border-indigo-500/50 scale-[1.02] shadow-[0_0_40px_rgba(0,0,0,0.6)]' : l.id < level ? 'bg-white/5 border-emerald-500/20 opacity-60' : 'bg-white/5 border-white/5 opacity-30 select-none'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${l.id <= level ? `bg-${l.color}-500/10 text-${l.color}-400 border-${l.color}-500/20` : 'bg-white/5 text-gray-700 border-white/5'}`}>
                                    L{l.id}
                                </span>
                                {l.id < level ? <Award className="w-6 h-6 text-emerald-400" /> : l.id > level ? <Lock className="w-4 h-4 text-gray-800" /> : <Target className="w-5 h-5 text-indigo-400 animate-pulse" />}
                            </div>
                            <h5 className="text-lg font-black text-white uppercase tracking-tighter mb-2">{l.name}</h5>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">{l.indicator}</p>
                            <div className={`w-full h-2 rounded-full mb-6 ${l.id < level ? 'bg-emerald-500' : l.id === level ? `bg-${l.color}-500` : 'bg-white/5'}`} />
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Metas Clave</span>
                                    {l.metas.slice(0, 2).map((m, idx) => (
                                        <div key={idx} className="flex items-center gap-2 opacity-60">
                                            {l.id <= level && completedMetas[m.id] ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <div className="w-3 h-3 rounded-full border border-gray-700" />}
                                            <span className="text-[9px] font-bold text-gray-400 uppercase truncate">{m.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Beneficios</span>
                                    <div className="flex gap-2">
                                        {l.rewards.map((r, idx) => (
                                            <div key={idx} className={`p-2 rounded-lg border border-white/5 ${l.id <= level ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-gray-800'}`} title={r.label}>
                                                <r.icon className="w-3 h-3" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
