'use client';

import { useState } from 'react';
import HQSidebar from '@/components/layout/HQSidebar';
import {
    Search, Plus, Filter, MoreHorizontal,
    TrendingUp, TrendingDown, DollarSign, Users
} from 'lucide-react';

export default function InternalClientsPage() {
    const [clients] = useState([
        { id: 1, name: 'Clínica Smith', plan: 'Médico Pro', fee: 1200, cost: 450, profit: 750, margin: 62, status: 'Active' },
        { id: 2, name: 'Power Gym', plan: 'Pyme Standard', fee: 800, cost: 600, profit: 200, margin: 25, status: 'Active', warning: true },
        { id: 3, name: 'Ecom Store', plan: 'Full Growth', fee: 2500, cost: 1100, profit: 1400, margin: 56, status: 'Active' },
        { id: 4, name: 'Dr. House', plan: 'Médico Starter', fee: 500, cost: 100, profit: 400, margin: 80, status: 'Onboarding' },
    ]);

    return (
        <div className="min-h-screen bg-[#050511] text-white">
            <HQSidebar />
            <div className="pl-64">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050511]/80 backdrop-blur-xl sticky top-0 z-40">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-400" /> Gestión de Clientes Interna
                    </h2>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> Nuevo Cliente
                    </button>
                </header>

                <main className="p-8 max-w-[1800px] mx-auto">
                    {/* Filters & Search */}
                    <div className="flex gap-4 mb-8">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar cliente..."
                                className="w-full bg-[#0E0E18] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button className="px-4 py-2 bg-[#0E0E18] border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filtros
                        </button>
                    </div>

                    {/* Clients Table */}
                    <div className="bg-[#0E0E18] border border-white/5 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-xs text-gray-400 uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Plan Actual</th>
                                    <th className="px-6 py-4 text-right">Fee Mensual</th>
                                    <th className="px-6 py-4 text-right">Costo Op.</th>
                                    <th className="px-6 py-4 text-right">Utilidad Real</th>
                                    <th className="px-6 py-4 text-center">Margen %</th>
                                    <th className="px-6 py-4 text-center">Estado</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-white">
                                            {client.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">
                                                {client.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-white font-mono">
                                            ${client.fee}
                                        </td>
                                        <td className="px-6 py-4 text-right text-red-300 font-mono">
                                            -${client.cost}
                                        </td>
                                        <td className="px-6 py-4 text-right text-green-400 font-bold font-mono">
                                            +${client.profit}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center gap-1 font-bold ${client.margin < 30 ? 'text-red-400' : 'text-emerald-400'
                                                }`}>
                                                {client.margin}%
                                                {client.margin < 30 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                            </div>
                                            {client.warning && (
                                                <div className="text-[10px] text-red-500 mt-1 uppercase tracking-wider font-bold">Riesgo</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${client.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
