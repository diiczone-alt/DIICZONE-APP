'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, LayoutGrid, Clapperboard, BarChart3, Settings, LogOut,
    Kanban, GraduationCap, CalendarDays, Share2, Images, Zap, Bot,
    CreditCard, Megaphone, Award, ChevronDown, ChevronRight, Command, ShoppingBag,
    Network, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Static Items (Always Visible)
const MAIN_ITEMS = [
    { name: 'Dashboard', icon: Home, href: '/dashboard', color: 'text-blue-400' },
    { name: 'Mi Progreso', icon: Zap, href: '/dashboard/profile', color: 'text-yellow-400' },
    { name: 'Zona Creativa', icon: LayoutGrid, href: '/dashboard/studio', color: 'text-fuchsia-400', glow: true },
    { name: 'Flujo de Contenido', icon: Kanban, href: '/dashboard/pipeline', color: 'text-emerald-400' },
    { name: 'Calendarios', icon: CalendarDays, href: '/dashboard/calendar', color: 'text-pink-400' },
    { name: 'Galería', icon: Images, href: '/dashboard/gallery', color: 'text-orange-400' },
    { name: 'Proyectos', icon: Clapperboard, href: '/dashboard/projects', color: 'text-indigo-400' },
];

// Accordion Groups
const ACCORDION_GROUPS = [
    {
        id: 'strategy',
        title: 'STRATEGIA',
        icon: Network,
        color: 'text-indigo-400',
        items: [
            { name: 'Pizarra de Estrategia', icon: Network, href: '/dashboard/strategy', color: 'text-indigo-400' },
            { name: 'Estudio Creativo 3D', icon: Box, href: '/dashboard/creative-3d', color: 'text-purple-400' },
        ]
    },
    {
        id: 'growth',
        title: 'Crecimiento Digital',
        icon: BarChart3,
        items: [
            { name: 'Conectividad & Auto.', icon: Share2, href: '/dashboard/connectivity' },
            { name: 'Ventas & IA', icon: Zap, href: '/dashboard/sales' },
            { name: 'Tienda Online', icon: ShoppingBag, href: '/dashboard/store' },
            { name: 'Analíticas', icon: BarChart3, href: '/dashboard/analytics' },
            { name: 'Finanzas', icon: CreditCard, href: '/dashboard/finance' },
            { name: 'Campañas', icon: Megaphone, href: '/dashboard/campaigns' },
        ]
    },
    {
        id: 'evolution',
        title: 'Aprendizaje y Evolución',
        icon: GraduationCap,
        items: [
            { name: 'Academia', icon: GraduationCap, href: '/dashboard/academy', color: 'text-amber-400', special: true },
            { name: 'IA & Auto', icon: Bot, href: '/dashboard/ai-automation' },
            { name: 'Recompensas', icon: Award, href: '/dashboard/rewards' },
        ]
    }
];

import { useSidebar } from './SidebarContext';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isClientCenterOpen, setIsClientCenterOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState(null); // 'growth' | 'evolution' | null
    const { setIsExpanded } = useSidebar();

    // Auto-expand group if active route is inside
    useEffect(() => {
        ACCORDION_GROUPS.forEach(group => {
            if (group.items.some(item => pathname.startsWith(item.href))) {
                setOpenGroup(group.id);
            }
        });
    }, [pathname]);

    const toggleGroup = (groupId) => {
        setOpenGroup(openGroup === groupId ? null : groupId);
    };

    const renderAccordionGroup = (group) => {
        const isOpen = openGroup === group.id;
        const isActiveGroup = group.items.some(item => pathname.startsWith(item.href));

        // Premium Styles based on ID
        const isGrowth = group.id === 'growth';
        const isEvolution = group.id === 'evolution';
        const isStrategy = group.id === 'strategy';

        let bgClass = "hover:bg-white/5";
        let borderClass = "border border-transparent";
        let textClass = isActiveGroup ? "text-white" : "text-gray-400 hover:text-white";

        if (isStrategy) {
            bgClass = isActiveGroup
                ? "bg-gradient-to-r from-indigo-900/40 to-purple-900/40 shadow-lg shadow-indigo-900/20"
                : "bg-gradient-to-r from-indigo-900/10 to-purple-900/10 hover:from-indigo-900/20 hover:to-purple-900/20";
            borderClass = "border border-indigo-500/30";
            textClass = isActiveGroup ? "text-indigo-100" : "text-indigo-200/70 hover:text-indigo-100";
        }

        if (isGrowth) {
            bgClass = isActiveGroup
                ? "bg-gradient-to-r from-blue-900/40 to-cyan-900/40 shadow-lg shadow-blue-900/20"
                : "bg-gradient-to-r from-blue-900/10 to-cyan-900/10 hover:from-blue-900/20 hover:to-cyan-900/20";
            borderClass = "border border-blue-500/30";
            textClass = isActiveGroup ? "text-blue-100" : "text-blue-200/70 hover:text-blue-100";
        }

        if (isEvolution) {
            bgClass = isActiveGroup
                ? "bg-gradient-to-r from-amber-900/40 to-orange-900/40 shadow-lg shadow-amber-900/20"
                : "bg-gradient-to-r from-amber-900/10 to-orange-900/10 hover:from-amber-900/20 hover:to-orange-900/20";
            borderClass = "border border-amber-500/30";
            textClass = isActiveGroup ? "text-amber-100" : "text-amber-200/70 hover:text-amber-100";
        }

        return (
            <div key={group.id} className="overflow-hidden mt-3">
                {/* Group Header Button */}
                <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group/header mb-1 ${bgClass} ${borderClass} ${textClass}`}
                >
                    <div className="flex items-center gap-4">
                        <group.icon className={`w-5 h-5 shrink-0 transition-colors ${isActiveGroup ? 'text-white' : 'text-current group-hover/header:text-white'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-left flex-1">
                            {group.title}
                        </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                {/* Group Content (Collapsible) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-black/20 rounded-xl my-1"
                        >
                            <div className="py-2 space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.href} href={item.href} className="block pl-12 pr-3">
                                            <div className={`flex items-center gap-3 py-2 rounded-lg transition-colors ${isActive ? (item.color || 'text-indigo-400') + ' font-medium' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'} ${item.special ? 'bg-amber-500/10 border border-amber-500/20 my-1' : ''}`}>
                                                {!isActive && !item.special && <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />}
                                                {isActive && <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] ${item.color?.replace('text-', 'bg-') || 'bg-indigo-500'}`} />}
                                                {item.special && !isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                                                <span className={`text-xs ${item.special ? 'text-amber-400 font-bold' : ''}`}>{item.name}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="group w-[72px] hover:w-[260px] h-full border-r border-white/5 bg-[#050510]/95 backdrop-blur-xl flex flex-col z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden shadow-2xl shadow-black/50 shrink-0 relative"
        >
            {/* Logo */}
            <div className="h-20 flex items-center justify-center group-hover:justify-start group-hover:px-6 transition-all duration-300 shrink-0 relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 z-10">
                    <Command className="w-6 h-6 text-white" />
                </div>
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                <h1 className="ml-3 text-lg font-bold font-display text-white tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    DIIC ZONE
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-2 overflow-y-auto custom-scrollbar py-2 space-y-1">

                {/* 1. Main Items (Flat List) */}
                {MAIN_ITEMS.map((item, index) => (
                    <div key={item.href}>
                        <Link href={item.href} className="block">
                            <div
                                className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group/item ${pathname === item.href
                                    ? 'bg-white/10 text-white'
                                    : item.glow
                                        ? 'bg-gradient-to-r from-fuchsia-900/20 to-purple-900/10 border border-fuchsia-500/20 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeTabStudio"
                                        className="absolute left-0 top-1 bottom-1 w-1 bg-indigo-500 rounded-r-full"
                                    />
                                )}
                                <item.icon className={`w-5 h-5 shrink-0 transition-colors ${pathname === item.href ? 'text-indigo-400' : (item.color || 'text-gray-500')} ${item.glow ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]' : ''}`} />
                                <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${item.glow ? 'text-fuchsia-100' : ''}`}>
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                        
                        {/* INYECCIÓN DE STRATEGIA DEBAJO DE ZONA CREATIVA (índice 2) */}
                        {index === 2 && ACCORDION_GROUPS.filter(g => g.id === 'strategy').map(renderAccordionGroup)}
                    </div>
                ))}

                <div className="my-2 border-t border-white/5" />

                {/* 2. Other Accordion Groups */}
                {ACCORDION_GROUPS.filter(g => g.id !== 'strategy').map(renderAccordionGroup)}

            </nav>

            {/* System Footer (Fixed) - Premium User Profile */}
            <div className="p-4 border-t border-white/5 bg-black/20 shrink-0">
                <div className="relative group/profile">

                    {/* Profile Card */}
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                CA
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#050510] rounded-full flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#050510]" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h4 className="text-sm font-bold text-white truncate">Carlos Arévalo</h4>
                            <p className="text-xs text-blue-400 font-medium">Plan Business</p>
                        </div>

                        {/* Settings Action */}
                        <Link href="/dashboard/settings" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 rounded-lg" title="Configuración">
                            <Settings className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Quick Actions (Expandable on hover or click - simplified here as direct actions) */}
                    <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-auto overflow-hidden">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                localStorage.clear();
                                router.push('/login');
                            }}
                            className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full text-left text-xs font-medium"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    );
}
