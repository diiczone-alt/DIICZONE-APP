'use client';

import { BarChart2, TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';

export default function CRMAnalytics() {
    return (
        <div className="flex-1 h-full bg-[#050511] overflow-y-auto custom-scrollbar p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Analítica Comercial</h2>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <MetricCard label="Tasa Conversión" value="12.5%" trend="+1.2%" />
                <MetricCard label="Costo por Lead" value="$8.50" trend="-5%" positive={true} />
                <MetricCard label="Ciclo de Cierre" value="5 días" trend="-1 día" positive={true} />
                <MetricCard label="ROI WhatsApp" value="450%" trend="+20%" positive={true} />
            </div>

            {/* Chart Placeholders */}
            <div className="grid grid-cols-2 gap-6 h-80">
                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500">
                    <BarChart2 className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm">Gráfico de Ventas Mensuales</p>
                </div>
                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500">
                    <PieChart className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm">Distribución por Origen</p>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ label, value, trend, positive }) {
    return (
        <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">{label}</p>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white leading-none">{value}</span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center ${positive || positive === undefined ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                    <ArrowUpRight className="w-3 h-3" /> {trend}
                </span>
            </div>
        </div>
    )
}
