'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Clock, AlertTriangle, CheckCircle2, MoreVertical,
    ArrowRight, FileVideo, Zap, Calendar, Inbox, DollarSign,
    Layers, Download
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EditorDashboard() {
    const router = useRouter();

    const tasks = [
        { id: 101, title: 'Reel Lanzamiento Q4', client: 'FitLife Global', status: 'editing', deadline: 'Hoy, 18:00', pay: '$45', phase: 1 },
        { id: 102, title: 'Testimonial Dr. Perez', client: 'Clinica Nova', status: 'review', deadline: 'Mañana', pay: '$80', phase: 3 },
        { id: 103, title: 'Promo Black Friday', client: 'Ecom Store', status: 'v1_ready', deadline: 'Jueves', pay: '$60', phase: 2 },
        { id: 104, title: 'Vlog Youtube #42', client: 'Marca Personal', status: 'final', deadline: 'Viernes', pay: '$120', phase: 4 },
    ];

    return (
        <div className="flex-1 p-8 space-y-8 overflow-y-auto bg-[#050511]">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Panel de Edición</h1>
                    <p className="text-sm text-gray-400">Gestiona tus cortes, revisiones y entregas.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0E0E18] px-4 py-2 rounded-lg border border-white/10 flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Pago Acumulado</span>
                        <span className="text-lg font-black text-emerald-400">$305.00</span>
                    </div>
                </div>
            </div>

            {/* Project List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileVideo className="w-5 h-5 text-purple-400" /> Proyectos Activos
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {tasks.map((task) => (
                        <EditorTaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            {/* Notifications Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-gray-400" /> Material Recibido
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center"><Download className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-xs font-bold text-white">Raw Footage - Campaña X</p>
                                    <p className="text-[10px] text-gray-400">24 GB • Hace 1h</p>
                                </div>
                            </div>
                            <button className="text-xs text-blue-400 hover:text-white font-bold underline">Descargar</button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" /> Correcciones Recientes
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">V1</div>
                                <div>
                                    <p className="text-xs font-bold text-white">Testimonial Dr. Perez</p>
                                    <p className="text-[10px] text-gray-400">Cliente solicitó cambio de música.</p>
                                </div>
                            </div>
                            <button className="text-xs text-amber-400 hover:text-white font-bold">Ver Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditorTaskCard({ task }) {
    // Phase Logic: 1: En Edición, 2: Primera Versión, 3: Correcciones (Review), 4: Final, 5: Entregado

    const getPhaseLabel = (p) => {
        if (p === 1) return { label: 'En Edición', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
        if (p === 2) return { label: 'V1 Lista', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
        if (p === 3) return { label: 'Revisión Cliente', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
        if (p === 4) return { label: 'Versión Final', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
        return { label: 'Pendiente', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' };
    }

    const style = getPhaseLabel(task.phase);

    return (
        <div className="bg-[#1A1A24] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-6">
                {/* Phase Indicator */}
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 font-black text-lg ${style.bg} ${style.border} ${style.color}`}>
                    {task.phase}
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">{task.title}</h3>
                    <p className="text-sm text-gray-400">{task.client}</p>
                </div>
            </div>

            <div className="flex items-center gap-8 text-right">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Pago Estimado</p>
                    <p className="text-sm font-bold text-emerald-400">{task.pay}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Deadline</p>
                    <p className="text-sm font-bold text-white">{task.deadline}</p>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${style.bg} ${style.color} ${style.border}`}>
                    {style.label}
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
