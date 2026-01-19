'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    LayoutGrid,
    Clapperboard,
    BarChart3,
    Settings,
    LogOut,
    Layers,
    FileText,
    Share2,
    Kanban
} from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Redes Sociales', icon: Share2, href: '/dashboard/social' },
    { name: 'Flujo de Contenido', icon: Kanban, href: '/dashboard/pipeline' },
    { name: 'Studio Map', icon: LayoutGrid, href: '/dashboard/studio' },
    { name: 'Proyectos', icon: Clapperboard, href: '/dashboard/projects' },
    { name: 'Métricas', icon: BarChart3, href: '/dashboard/metrics' },
    { name: 'Archivos', icon: FileText, href: '/dashboard/files' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-[#050510]/90 backdrop-blur-xl flex flex-col z-50">
            {/* Logo */}
            <div className="p-6">
                <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    DIIC ZONE
                    <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">BETA</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-primary/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                    />
                                )}
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </Link>
                    );
                })}

                <div className="pt-8 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Cuenta
                    </p>
                    <Link href="/dashboard/settings">
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 ${pathname === '/dashboard/settings' ? 'bg-white/5 text-white' : ''}`}>
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Configuración</span>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                        DZ
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Cliente Demo</p>
                        <p className="text-xs text-gray-400 truncate">Nivel 1: Creación</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
