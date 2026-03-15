'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Calendar as CalendarIcon, Users, Bot } from 'lucide-react';

export default function ClientCMSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Panel General', path: '/dashboard/community' },
        { icon: Bot, label: 'Agente IA', path: '/dashboard/community/agent' },
        { icon: FileText, label: 'Reportes', path: '/dashboard/community/reports' },
        { icon: CalendarIcon, label: 'Calendario', path: '/dashboard/community/calendar' },
        { icon: Users, label: 'Equipo', path: '/dashboard/community/team' },
    ];

    return (
        <div className="hidden lg:flex flex-col w-64 bg-[#0E0E18] rounded-3xl p-6 border border-white/5 h-[calc(100vh-4rem)] sticky top-8">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-white leading-none">Community</h2>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Manager</span>
                </div>
            </div>

            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${isActive ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500"></div>
                    <div>
                        <div className="text-sm font-bold text-white">Mi Marca</div>
                        <div className="text-xs text-gray-500">Plan Pro</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
