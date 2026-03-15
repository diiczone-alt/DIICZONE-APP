'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Users, Clapperboard, Activity,
    DollarSign, ShieldAlert, Sparkles, Settings, ShieldCheck,
    CalendarDays
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HQSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Centro de Operaciones', icon: LayoutDashboard, href: '/dashboard/hq' },
        { name: 'Gestión de Clientes', icon: Users, href: '/dashboard/hq/clients' },
        { name: 'Producción Global', icon: Clapperboard, href: '/dashboard/hq/production' },
        { name: 'Capacidad de Equipo', icon: Activity, href: '/dashboard/hq/capacity' },
        { name: 'Finanzas & Rentabilidad', icon: DollarSign, href: '/dashboard/hq/finance' },
        { name: 'Quality Hub (QH)', icon: ShieldCheck, href: '/dashboard/hq/quality' },
        { name: 'Gestión de Creativos', icon: Users, href: '/dashboard/hq/creatives' },
        { name: 'Calendario Global', icon: CalendarDays, href: '/dashboard/hq/calendar' },
        { name: 'Riesgos Operativos', icon: ShieldAlert, href: '/dashboard/hq/risks' },
        { name: 'DIIC AI Estratégica', icon: Sparkles, href: '/dashboard/hq/ai' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#050511] border-r border-white/5 flex flex-col z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
                    <span className="font-black text-white">HQ</span>
                </div>
                <div>
                    <h1 className="font-bold text-white leading-none">DIIC ZONE</h1>
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Internal OS</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-indigo-600/10 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}>
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-white'}`} />
                                <span className="font-medium text-sm">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-full"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile / Settings */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                    <div className="flex-1">
                        <div className="text-sm font-bold text-white">Admin</div>
                        <div className="text-xs text-gray-500">Director</div>
                    </div>
                    <Settings className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </button>
            </div>
        </aside>
    );
}
