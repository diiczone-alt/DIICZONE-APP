'use client';

import { Suspense } from 'react';
// Components
import HQSidebar from '@/components/layout/HQSidebar';
import GlobalStatusBlock from '@/components/hq/GlobalStatusBlock';
import CriticalAlerts from '@/components/hq/CriticalAlerts';
import DailyPriority from '@/components/hq/DailyPriority';
import CapacityPulse from '@/components/hq/CapacityPulse';

export default function HQDashboardPage() {
    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans selection:bg-indigo-500/30">
            <HQSidebar />

            <div className="pl-20 lg:pl-64 transition-all duration-300">
                <main className="p-8 max-w-[1600px] mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Centro de Operaciones</h1>
                            <p className="text-gray-400 mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Sistema Operativo Activo • v2.4 (Internal)
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono text-gray-500">{new Date().toLocaleDateString()}</span>
                            <div className="h-8 w-[1px] bg-white/10" />
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-sm font-bold rounded-lg transition-colors border border-white/5">
                                Reportes
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-600/20 transition-all">
                                + Nuevo Proyecto
                            </button>
                        </div>
                    </div>

                    {/* 1. Global Status Bar */}
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <GlobalStatusBlock />
                    </section>

                    {/* 2. CONTROL CENTER GRID (New) */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <CriticalAlerts />
                        <DailyPriority />
                        <CapacityPulse />
                    </section>
                </main>
            </div>
        </div>
    );
}
