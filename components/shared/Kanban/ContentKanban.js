'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, MoreHorizontal, User, Calendar,
    MessageSquare, CheckCircle, Share2,
    Megaphone, Eye, ArrowRight, Clock,
    LayoutGrid, Filter, Search
} from 'lucide-react';

const STAGES = [
    { id: 'idea', label: 'Idea', color: 'border-blue-500/20 text-blue-400', icon: LayoutGrid },
    { id: 'produccion', label: 'Producción', color: 'border-purple-500/20 text-purple-400', icon: ArrowRight },
    { id: 'revision', label: 'Revisión CM', color: 'border-orange-500/20 text-orange-400', icon: Eye },
    { id: 'aprobado', label: 'Aprobado', color: 'border-emerald-500/20 text-emerald-400', icon: CheckCircle },
    { id: 'programado', label: 'Programado', color: 'border-indigo-500/20 text-indigo-400', icon: Calendar },
    { id: 'publicado', label: 'Publicado', color: 'border-white/10 text-gray-400', icon: Share2 },
    { id: 'ads', label: 'Ads Activo', color: 'border-pink-500/20 text-pink-400', icon: Megaphone },
];

const MOCK_DATA = [
    {
        id: '1',
        title: 'Reel: Un día en la clínica',
        type: 'Reel',
        platform: 'IG',
        mode: 'Pauta',
        stage: 'produccion',
        responsible: 'Andrés V.',
        deadline: '25 Feb',
        priority: 'Alta'
    },
    {
        id: '2',
        title: 'Post: Beneficios del blanqueamiento',
        type: 'Imagen',
        platform: 'FB',
        mode: 'Orgánico',
        stage: 'revision',
        responsible: 'Mateo G.',
        deadline: 'Hoy',
        priority: 'Media'
    },
    {
        id: '3',
        title: 'Video: Tutorial de cepillado',
        type: 'Video',
        platform: 'YT',
        mode: 'Orgánico',
        stage: 'aprobado',
        responsible: 'Kevin R.',
        deadline: 'Mañana',
        priority: 'Baja'
    }
];

export default function ContentKanban({ role = 'cm', clientName = 'Cliente Demo' }) {
    const [contents, setContents] = useState(MOCK_DATA);
    const [selectedItem, setSelectedItem] = useState(null);

    const isCM = role === 'cm';
    const isClient = role === 'client';
    const isCreative = role === 'creative';

    const handleMoveStage = (id, newStage) => {
        if (isClient && newStage !== 'aprobado') return; // Client can only approve
        setContents(prev => prev.map(c => c.id === id ? { ...c, stage: newStage } : c));
    };

    return (
        <div className="h-full flex flex-col space-y-6 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h3 className="text-2xl font-black text-white">Producción de Contenidos</h3>
                    <p className="text-sm text-gray-500">{clientName} • Flujo Unificado</p>
                </div>
                <div className="flex items-center gap-3">
                    {isCM && (
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Nuevo Contenido
                        </button>
                    )}
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {STAGES.map(stage => (
                    <div key={stage.id} className="w-80 shrink-0 flex flex-col gap-4">
                        {/* Column Header */}
                        <div className={`p-4 rounded-2xl border ${stage.color} bg-white/[0.02] flex items-center justify-between backdrop-blur-sm sticky top-0 z-10`}>
                            <div className="flex items-center gap-2">
                                <stage.icon className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{stage.label}</span>
                            </div>
                            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-400 font-mono">
                                {contents.filter(c => c.stage === stage.id).length}
                            </span>
                        </div>

                        {/* Cards Container */}
                        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 min-h-[100px]">
                            {contents.filter(c => c.stage === stage.id).map(content => (
                                <motion.div
                                    key={content.id}
                                    layoutId={content.id}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="bg-[#0E0E18] border border-white/10 rounded-[2rem] p-5 cursor-pointer hover:border-indigo-500/50 transition-all group shadow-xl relative overflow-hidden"
                                    onClick={() => setSelectedItem(content)}
                                >
                                    {/* Priority Indicator */}
                                    <div className={`absolute top-0 right-0 w-20 h-10 -mr-10 -mt-5 rotate-45 ${content.priority === 'Alta' ? 'bg-red-500/20' :
                                            content.priority === 'Media' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                                        }`} />

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{content.type} • {content.platform}</span>
                                            <h4 className="text-sm font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">{content.title}</h4>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                                        <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[8px] text-gray-500 uppercase font-black tracking-tighter mb-1">Responsable</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] font-bold">{content.responsible.charAt(0)}</div>
                                                <span className="text-[10px] text-gray-300 font-bold truncate">{content.responsible}</span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[8px] text-gray-500 uppercase font-black tracking-tighter mb-1">Entrega</p>
                                            <div className="flex items-center gap-1.5 text-gray-300">
                                                <Clock className="w-3 h-3 text-indigo-400" />
                                                <span className="text-[10px] font-bold">{content.deadline}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                                        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${content.mode === 'Pauta' ? 'bg-pink-500/10 text-pink-400' : 'bg-white/5 text-gray-500'}`}>
                                            {content.mode}
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 bg-white/5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                            </button>
                                            {isClient && stage.id === 'revision' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMoveStage(content.id, 'aprobado');
                                                    }}
                                                    className="p-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Simulado para Detalles (Opcional) */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                        <motion.div
                            initial={{ x: 500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 500, opacity: 0 }}
                            className="bg-[#0E0E18] border-l border-white/10 w-full max-w-xl h-full shadow-2xl p-8"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Simple Detail View */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-2">{selectedItem.title}</h2>
                                    <span className="px-3 py-1 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400">
                                        ID: {selectedItem.id}
                                    </span>
                                </div>
                                <button onClick={() => setSelectedItem(null)} className="p-2 bg-white/5 rounded-full text-gray-500 hover:text-white">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            {/* ... more details could be added here ... */}
                            <p className="text-gray-400 italic text-sm">Próximamente: Integración con Briefing y Feedback en tiempo real.</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
