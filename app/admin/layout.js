'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, Settings,
    Shield, Activity, DollarSign, LogOut
} from 'lucide-react';

import NotificationCenter from '@/components/ui/NotificationCenter';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'CRM Clientes', path: '/workstation/crm' },
        { icon: Users, label: 'Usuarios', path: '/admin/users' },
        { icon: DollarSign, label: 'Finanzas Globales', path: '/admin/finance' },
        { icon: Activity, label: 'Logs Sistema', path: '/admin/logs' },
        { icon: Settings, label: 'Configuración', path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-[#050511] text-white font-sans overflow-hidden">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-[#0A0A12] border-r border-amber-500/10 flex flex-col z-20 shadow-2xl shadow-amber-900/10">
                <div className="h-20 flex items-center px-6 border-b border-white/5 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-black text-lg tracking-tight text-white">DIIC ADMIN</h1>
                            <p className="text-[10px] text-amber-500 font-bold tracking-widest uppercase">God Mode</p>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <NotificationCenter />
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-900/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-gray-500 group-hover:text-white'}`} />
                                <span className="text-sm font-bold">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="bg-[#050511] rounded-xl p-4 border border-white/5 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-gray-500 uppercase font-bold">Server Load</span>
                            <span className="text-[10px] text-emerald-400 font-bold">Good</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[12%] bg-emerald-500 rounded-full" />
                        </div>
                    </div>

                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-bold">Salir de God Mode</span>
                    </Link>
                </div>
            </aside>

            {/* Main Admin Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                {children}
            </div>
        </div>
    );
}
