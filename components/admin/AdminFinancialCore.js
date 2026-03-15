'use client';

import { useState } from 'react';
import {
    DollarSign, TrendingUp, PieChart, BarChart3,
    ArrowUpRight, ArrowDownRight, Wallet,
    CreditCard, Users, Briefcase, Cpu,
    ShieldCheck, Calendar, Filter, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function AdminFinancialCore() {
    const [activeTab, setActiveTab] = useState('revenue');

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* FINANCIAL HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl">
                <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <Wallet className="w-7 h-7 text-emerald-500" /> Núcleo Financiero Admin
                    </h2>
                    <p className="text-gray-400 text-sm">Control total de flujo, splits y rentabilidad de DIIC ZONE</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:bg-white/10 transition-all">
                        <Download className="w-4 h-4" /> Exportar Reporte
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-black hover:bg-emerald-400 transition-all">
                        <Filter className="w-4 h-4" /> Periodo: Enero 2026
                    </button>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FinCard label="Ingresos Totales" value="$18,450" trend="+15.2%" up={true} icon={DollarSign} color="emerald" />
                <FinCard label="Costos Operativos" value="$4,200" trend="-2.4%" up={false} icon={ArrowDownRight} color="red" />
                <FinCard label="Utilidad Neta" value="$14,250" trend="+18.1%" up={true} icon={TrendingUp} color="blue" />
                <FinCard label="Margen Promedio" value="77.2%" trend="+3.5%" up={true} icon={PieChart} color="purple" />
            </div>

            {/* MODULE NAVIGATION */}
            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
                <TabBtn id="revenue" label="Ingresos" active={activeTab} setter={setActiveTab} />
                <TabBtn id="distribution" label="Distribución" active={activeTab} setter={setActiveTab} />
                <TabBtn id="costs" label="Costos" active={activeTab} setter={setActiveTab} />
                <TabBtn id="profit" label="Rentabilidad" active={activeTab} setter={setActiveTab} />
                <TabBtn id="projection" label="Proyección" active={activeTab} setter={setActiveTab} />
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'revenue' && <RevenueModule key="revenue" />}
                    {activeTab === 'distribution' && <DistributionModule key="dist" />}
                    {activeTab === 'costs' && <CostsModule key="costs" />}
                    {activeTab === 'profit' && <ProfitModule key="profit" />}
                    {activeTab === 'projection' && <ProjectionModule key="proj" />}
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- SUB-MODULES ---

function RevenueModule() {
    const revenueData = [
        { type: "Suscripción", client: "Dr. Patiño", plan: "Scale Plan", amount: "$2,500", date: "24 Ene", status: "Pagado" },
        { type: "Servicio Único", client: "Nova Clínica", plan: "Full Branding", amount: "$4,200", date: "20 Ene", status: "Pagado" },
        { type: "Servicio Nodo", client: "AgroFértil", plan: "Grabación Campo", amount: "$1,800", date: "15 Ene", status: "Pendiente" },
        { type: "Suscripción", client: "Inmobiliaria Elite", plan: "Content Plan", amount: "$3,100", date: "12 Ene", status: "Pagado" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="bg-[#0A0A12] border border-white/10 rounded-3xl p-6 overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-400" /> Registro de Ingresos
                </h3>
                <div className="space-y-3">
                    <div className="grid grid-cols-5 text-[10px] font-bold text-gray-500 uppercase px-4 pb-2 border-b border-white/5">
                        <div>Tipo / Cliente</div>
                        <div>Plan / Servicio</div>
                        <div className="text-right">Monto</div>
                        <div className="text-center">Fecha</div>
                        <div className="text-right">Estado</div>
                    </div>
                    {revenueData.map((item, i) => (
                        <div key={i} className="grid grid-cols-5 items-center p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                            <div>
                                <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{item.client}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase">{item.type}</div>
                            </div>
                            <div className="text-sm text-gray-300">{item.plan}</div>
                            <div className="text-sm font-black text-white text-right">{item.amount}</div>
                            <div className="text-xs text-gray-500 text-center">{item.date}</div>
                            <div className="flex justify-end">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${item.status === 'Pagado' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                    {item.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function DistributionModule() {
    const splits = [
        { label: "Producción Creativa", value: "25%", amount: "$4,612", desc: "Edición, Diseño, Guiones", color: "blue", icon: Briefcase },
        { label: "Nodo Territorial", value: "15%", amount: "$2,767", desc: "Producción local, eventos", color: "indigo", icon: Users },
        { label: "Tecnología / IA", value: "20%", amount: "$3,690", desc: "Servidores, licencias, bots", color: "purple", icon: Cpu },
        { label: "Operación & Admin", value: "10%", amount: "$1,845", desc: "Soporte, impuestos, legal", color: "pink", icon: ShieldCheck },
        { label: "Utilidad DIIC ZONE", value: "30%", amount: "$5,535", desc: "Ganancia real acumulada", color: "emerald", icon: DollarSign },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {splits.map((s, i) => (
                    <div key={i} className={`p-6 rounded-3xl border border-white/10 bg-[#0A0A12] relative overflow-hidden group hover:border-${s.color}-500/30 transition-all`}>
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${s.color}-500/5 rounded-full blur-3xl`} />
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl bg-${s.color}-500/10 text-${s.color}-400`}>
                                <s.icon className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-white">{s.value}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{s.amount}</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm font-bold text-white">{s.label}</div>
                            <div className="text-xs text-gray-500">{s.desc}</div>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: s.value }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full bg-${s.color}-500`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
                <PieChart className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-bold text-white mb-2">Motor de Reparto Automático Activo</h4>
                <p className="text-sm text-gray-500 max-w-lg mx-auto">
                    Cada pago recibido se liquida internamente según el modelo DIIC ZONE PRO.
                    Las carteras de Nodos y Creativos se actualizan en tiempo real.
                </p>
            </div>
        </motion.div>
    );
}

function CostsModule() {
    const costs = [
        { item: "Pago Fausto (Senior Editor)", category: "Producción", amount: "$1,200", status: "Liquidado", type: "out" },
        { item: "Suscripción Supabase / AWS", category: "Tecnología", amount: "$350", status: "Deducido", type: "out" },
        { item: "Pago CM Agro (Community)", category: "Producción", amount: "$850", status: "Pendiente", type: "pending" },
        { item: "Licencia Adobe Teams", category: "Tecnología", amount: "$220", status: "Liquidado", type: "out" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0A0A12] border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-red-400" /> Salida de Capital
                </h3>
                <div className="space-y-3">
                    {costs.map((c, i) => (
                        <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-transparent hover:border-red-500/20 transition-all">
                            <div>
                                <div className="text-sm font-bold text-white">{c.item}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase">{c.category}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-red-400">-{c.amount}</div>
                                <div className="text-[10px] text-gray-500">{c.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center text-center">
                <div className="mb-6">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Costo de Operación vs Ingreso</div>
                    <div className="text-5xl font-black text-white">22.7%</div>
                </div>
                <p className="text-sm text-gray-400 px-6">
                    El sistema mantiene un ratio saludable de costos. Cada dólar invertido en tecnología genera $5.2 en ingresos por escalabilidad.
                </p>
                <button className="mt-8 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-all">
                    Generar Reporte de Gastos Detallado
                </button>
            </div>
        </motion.div>
    );
}

function ProfitModule() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="ROI de Nodo Promedio" value="12X" color="emerald" />
                <StatCard label="Churn Rate" value="1.2%" color="indigo" />
                <StatCard label="LTV Promedio" value="$12.4k" color="blue" />
                <StatCard label="CAC (Costo Adquisición)" value="$420" color="purple" />
            </div>

            <div className="bg-[#0A0A12] border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Servicios Más Rentables (Ranking)</h3>
                <div className="space-y-4">
                    <RankRow label="Automatizaciones IA / SaaS" value="92%" width="w-[92%]" color="emerald" />
                    <RankRow label="Websites & Landing Pages" value="85%" width="w-[85%]" color="blue" />
                    <RankRow label="Estrategia & Social Media" value="68%" width="w-[68%]" color="indigo" />
                    <RankRow label="Videos Corporativos" value="55%" width="w-[55%]" color="purple" />
                </div>
            </div>
        </motion.div>
    );
}

function ProjectionModule() {
    const goals = [
        {
            time: "1 AÑO",
            phase: "Fundación",
            status: "current",
            color: "emerald",
            objectives: ["App funcional & CRM", "Validar Nodos Piloto", "Breakeven Operativo"]
        },
        {
            time: "3 AÑOS",
            phase: "Expansión",
            status: "upcoming",
            color: "indigo",
            objectives: ["Escala de Red Nacional", "IA Administrativa Pro", "Utilidad de Reinversión"]
        },
        {
            time: "5 AÑOS",
            phase: "Sistema",
            status: "vision",
            color: "purple",
            objectives: ["Plataforma SaaS Líder", "Infraestructura Nacional", "Máximo Margen Neto"]
        }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <TrendingUp className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-white mb-4">Hoja de Ruta Estratégica</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                        Evolución de Productora a Sistema Global de Infraestructura Creativa.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {goals.map((goal, i) => (
                            <div key={i} className={`p-6 rounded-3xl border ${goal.status === 'current' ? `border-${goal.color}-500/40 bg-${goal.color}-500/5` : 'border-white/10 bg-white/5'} relative`}>
                                {goal.status === 'current' && (
                                    <span className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-black text-[10px] font-black rounded-full uppercase">Fase Actual</span>
                                )}
                                <div className="text-xs font-black text-gray-500 mb-1 uppercase tracking-widest">{goal.time}</div>
                                <div className={`text-xl font-black text-${goal.color}-400 mb-4`}>{goal.phase}</div>
                                <ul className="space-y-3">
                                    {goal.objectives.map((obj, j) => (
                                        <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 bg-${goal.color}-500`} />
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0A12] border border-white/10 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-4">Punto de Equilibrio (Breakeven)</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-gray-500">PROGRESO HACIA META Q1</span>
                            <span className="text-emerald-400">72%</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 2 }} className="h-full bg-emerald-500" />
                        </div>
                        <p className="text-xs text-gray-500 italic mt-2">
                            * Los ingresos por nodos piloto en Enero han acelerado el Roadmap en 45 días.
                        </p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Valuación Proyectada (5Y)</div>
                        <div className="text-4xl font-black text-white">$2.5M - $5M</div>
                    </div>
                    <div className="p-4 bg-indigo-500/10 rounded-2xl">
                        <BarChart3 className="w-10 h-10 text-indigo-400" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- HELPER UI ---

function FinCard({ label, value, trend, up, icon: Icon, color }) {
    const colors = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-400/20",
    };

    return (
        <div className="bg-[#0A0A12] border border-white/10 p-6 rounded-3xl hover:border-white/20 transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${colors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {trend}
                </div>
            </div>
            <div className="text-2xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</div>
        </div>
    );
}

function TabBtn({ id, label, active, setter }) {
    const isActive = active === id;
    return (
        <button
            onClick={() => setter(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
        >
            {label}
        </button>
    );
}

function StatCard({ label, value, color }) {
    const colors = {
        emerald: "text-emerald-400",
        indigo: "text-indigo-400",
        blue: "text-blue-400",
        purple: "text-purple-400",
    };
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
            <div className={`text-2xl font-black ${colors[color]} mb-1`}>{value}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function RankRow({ label, value, width, color }) {
    const colors = {
        emerald: "bg-emerald-500",
        indigo: "bg-indigo-500",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
    };
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-400">{label}</span>
                <span className="text-white">{value}</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: value }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full ${colors[color]}`}
                />
            </div>
        </div>
    );
}

function ProjMetric({ label, value }) {
    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-2xl font-black text-white mb-1">{value}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</div>
        </div>
    );
}
