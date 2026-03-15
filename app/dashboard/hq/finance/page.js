'use client';

import { useState } from 'react';
import HQSidebar from '@/components/layout/HQSidebar';
import {
    DollarSign, TrendingUp, TrendingDown,
    PieChart, ArrowUpRight, ArrowDownRight, wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HQFinancePage() {
    // Mock Financial Data
    const metrics = {
        income: 14200,
        costs: 8400,
        profit: 5800,
        margin: 40.8
    };

    const recentTransactions = [
        { id: 1, client: 'Clínica Smith', desc: 'Fee Mensual - Plan Médico Pro', amount: 1200, type: 'income', date: 'Hoy, 10:30' },
        { id: 2, client: 'Freelancer', desc: 'Pago Editor Video (Carlos R.)', amount: -450, type: 'expense', date: 'Ayer, 18:00' },
        { id: 3, client: 'Power Gym', desc: 'Fee Mensual - Pyme Standard', amount: 800, type: 'income', date: 'Ayer, 14:20' },
        { id: 4, client: 'Software', desc: 'Suscripción Adobe CC', amount: -120, type: 'expense', date: '10 Feb' },
    ];

    return (
        <div className="min-h-screen bg-[#050511] text-white">
            <HQSidebar />
            <div className="pl-64">
                <header className="h-20 border-b border-white/5 flex items-center px-8 bg-[#050511]/80 backdrop-blur-xl sticky top-0 z-40">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" /> Finanzas & Rentabilidad
                    </h2>
                </header>

                <main className="p-8 max-w-[1800px] mx-auto space-y-8">

                    {/* Top Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <FinanceCard
                            title="Ingreso Mensual"
                            value={`$${metrics.income.toLocaleString()}`}
                            trend="+12%"
                            icon={ArrowUpRight}
                            color="blue"
                        />
                        <FinanceCard
                            title="Costos Operativos"
                            value={`$${metrics.costs.toLocaleString()}`}
                            trend="+5%"
                            icon={ArrowDownRight}
                            color="red"
                        />
                        <FinanceCard
                            title="Utilidad Neta"
                            value={`$${metrics.profit.toLocaleString()}`}
                            trend="+8.4%"
                            icon={TrendingUp}
                            color="green"
                            highlight
                        />
                        <FinanceCard
                            title="Margen Global"
                            value={`${metrics.margin}%`}
                            trend="Saludable"
                            icon={PieChart}
                            color="purple"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cash Flow Feed */}
                        <div className="lg:col-span-2 bg-[#0E0E18] border border-white/5 rounded-3xl p-6">
                            <h3 className="font-bold text-white mb-6">Flujo de Caja en Vivo</h3>
                            <div className="space-y-4">
                                {recentTransactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                                }`}>
                                                {tx.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{tx.desc}</p>
                                                <p className="text-xs text-gray-500">{tx.client} • {tx.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-mono font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {tx.type === 'income' ? '+' : ''}${Math.abs(tx.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Profitability Breakdown */}
                        <div className="bg-[#0E0E18] border border-white/5 rounded-3xl p-6">
                            <h3 className="font-bold text-white mb-6">Distribución de Costos</h3>
                            <div className="space-y-6">
                                <CostBar label="Equipo Creativo" percent={45} color="bg-indigo-500" />
                                <CostBar label="Software & Herramientas" percent={15} color="bg-blue-500" />
                                <CostBar label="Publicidad (Ads)" percent={20} color="bg-purple-500" />
                                <CostBar label="Administración" percent={10} color="bg-gray-500" />
                                <CostBar label="Margen de Utilidad" percent={10} color="bg-green-500" striped />
                            </div>

                            <div className="mt-8 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                                <p className="text-sm text-indigo-300 mb-1">Proyección Anual</p>
                                <p className="text-2xl font-black text-white">$69,600</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function FinanceCard({ title, value, trend, icon: Icon, color, highlight }) {
    const colors = {
        blue: 'text-blue-400 bg-blue-500/10',
        red: 'text-red-400 bg-red-500/10',
        green: 'text-green-400 bg-green-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
    };

    return (
        <div className={`p-6 rounded-2xl border ${highlight ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30' : 'bg-[#0E0E18] border-white/5'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${color === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
            <p className="text-sm text-gray-400">{title}</p>
        </div>
    );
}

function CostBar({ label, percent, color, striped }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{label}</span>
                <span className="font-bold text-white">{percent}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className={`h-full rounded-full ${color} ${striped ? 'bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]' : ''}`}
                />
            </div>
        </div>
    );
}
