'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Activity, BarChart3, AlertTriangle, ArrowUpRight, Star, Briefcase } from 'lucide-react';

const SERVICE_STATS = [
    { name: 'Reels Pack', income: 4200, cost: 1200, profit: 3000, trend: '+12%' },
    { name: 'Web Dev', income: 2800, cost: 1600, profit: 1200, trend: '-5%' },
    { name: 'IA Chatbots', income: 1900, cost: 300, profit: 1600, trend: '+45%' },
];

const CLIENT_STATS = [
    { name: 'Clínica Dental X', income: 1200, profit: 950, margin: 'High' },
    { name: 'Tech StartUp Y', income: 800, profit: 550, margin: 'Med' },
    { name: 'Restaurante Z', income: 1200, profit: 250, margin: 'Low', risk: true },
];

const TEAM_STATS = [
    { name: 'Fausto (Video)', projects: 14, delays: 0, rating: 5 },
    { name: 'Luis (Diseño)', projects: 9, delays: 3, rating: 3 },
    { name: 'Ana (Copy)', projects: 12, delays: 1, rating: 4 },
];

export default function BusinessIntelligenceDashboard() {
    return (
        <div className="space-y-6 text-white min-h-screen pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent flex items-center gap-3">
                        <Activity className="text-emerald-400" />
                        Centro de Inteligencia
                    </h1>
                    <p className="text-gray-400 mt-2 max-w-2xl">
                        Visión estratégica total. Rentabilidad, Operaciones y Crecimiento en tiempo real.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-[#0F0F1A] border border-white/10 px-4 py-2 rounded-xl text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Utilidad Neta (Mes)</p>
                        <p className="text-2xl font-bold text-emerald-400">+$8,450</p>
                    </div>
                </div>
            </div>

            {/* Top Grid: Financials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#13131F] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><DollarSign className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">+24% <ArrowUpRight className="w-3 h-3" /></span>
                    </div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Ingresos Totales</p>
                    <h3 className="text-2xl font-bold text-white mt-1">$14,500</h3>
                </div>

                <div className="bg-[#13131F] border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1">+3 New</span>
                    </div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Clientes Activos</p>
                    <h3 className="text-2xl font-bold text-white mt-1">18</h3>
                </div>

                <div className="bg-[#13131F] border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Briefcase className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-purple-400 flex items-center gap-1">85% Cap</span>
                    </div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Carga Operativa</p>
                    <h3 className="text-2xl font-bold text-white mt-1">Alta</h3>
                </div>

                <div className="bg-[#13131F] border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl -mr-5 -mt-5"></div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><AlertTriangle className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-orange-400 flex items-center gap-1">2 Alertas</span>
                    </div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Riesgo Empresarial</p>
                    <h3 className="text-2xl font-bold text-white mt-1">Bajo</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Rentabilidad por Servicio */}
                <div className="lg:col-span-2 bg-[#0F0F1A] border border-white/5 rounded-3xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        Rentabilidad por Servicio
                        <span className="text-xs font-normal text-gray-500 ml-auto bg-white/5 px-2 py-1 rounded">Top Performance</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-gray-500 border-b border-white/5">
                                    <th className="py-3 font-medium uppercase">Servicio</th>
                                    <th className="py-3 font-medium uppercase">Ingresos</th>
                                    <th className="py-3 font-medium uppercase">Costo Prod.</th>
                                    <th className="py-3 font-medium uppercase text-emerald-400">Utilidad</th>
                                    <th className="py-3 font-medium uppercase text-right">Tendencia</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {SERVICE_STATS.map((service, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-bold text-white">{service.name}</td>
                                        <td className="py-4 text-gray-300 font-mono">${service.income}</td>
                                        <td className="py-4 text-red-300 font-mono">${service.cost}</td>
                                        <td className="py-4 text-emerald-400 font-mono font-bold">${service.profit}</td>
                                        <td className="py-4 text-right">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${service.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {service.trend}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 2. Carga por Departamento */}
                <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                            Carga Operativa
                        </h3>
                        <div className="space-y-6">
                            {[
                                { dept: 'Video Edición', val: 80, color: 'bg-red-500' },
                                { dept: 'Diseño Gráfico', val: 45, color: 'bg-blue-500' },
                                { dept: 'Web Dev', val: 20, color: 'bg-emerald-500' }
                            ].map((dept, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300">{dept.dept}</span>
                                        <span className="font-bold text-white">{dept.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Riesgo Saturación</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            El departamento de <strong>Video</strong> está al 80%. Se recomienda contratar un editor junior si sube del 85%.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 3. Rentabilidad Cliente */}
                <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Análisis de Clientes
                    </h3>
                    <div className="space-y-3">
                        {CLIENT_STATS.map((client, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div>
                                    <p className="font-bold text-white text-sm">{client.name}</p>
                                    <p className="text-xs text-gray-500">Ingreso: ${client.income}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-emerald-400">Utilidad: ${client.profit}</div>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        {client.risk && <AlertTriangle className="w-3 h-3 text-orange-400" />}
                                        <span className={`text-[10px] uppercase font-bold ${client.risk ? 'text-orange-400' : 'text-gray-500'}`}>
                                            {client.risk ? 'RIESGO ROI' : 'ESTABLE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Rendimiento Creativos */}
                <div className="bg-[#0F0F1A] border border-white/5 rounded-3xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Performance Equipo
                    </h3>
                    <div className="space-y-4">
                        {TEAM_STATS.map((member, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-xs text-white border border-white/10">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-white text-sm">{member.name}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, starI) => (
                                                <Star key={starI} className={`w-3 h-3 ${starI < member.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span>Proy: {member.projects}</span>
                                        <span className={member.delays > 0 ? 'text-red-400' : 'text-emerald-400'}>
                                            Retrasos: {member.delays}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Boton acción */}
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <button className="text-xs text-indigo-400 font-bold hover:underline">VER REPORTE DE RRHH COMPLETO</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
