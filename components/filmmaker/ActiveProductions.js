'use client';

import { useState } from 'react';
import {
    Calendar, Video, Clock, CheckCircle2,
    MoreHorizontal, PlayCircle, FileEdit, LayoutGrid, List, Kanban
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActiveProductions({ onNewProject }) {
    const [viewMode, setViewMode] = useState('grid'); // grid, list, kanban

    // Mock Data for Active Productions
    const PRODUCTIONS = [
        {
            id: 1,
            title: 'Campaña Lanzamiento Q1',
            type: 'Video Corporativo',
            status: 'rodaje', // rodaje, edicion, revision, aprobado, agenda
            date: '12 Ene 2026',
            progress: 35
        },
        {
            id: 2,
            title: 'Reels Educativos (Pack 5)',
            type: 'Contenido Redes',
            status: 'edicion',
            date: '10 Ene 2026',
            progress: 60
        },
        {
            id: 3,
            title: 'Testimonio Cliente Principal',
            type: 'Entrevista',
            status: 'revision',
            date: '08 Ene 2026',
            progress: 90
        }
    ];

    const getStatusConfig = (status) => {
        switch (status) {
            case 'agenda': return { label: 'Por Confirmar', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Calendar };
            case 'rodaje': return { label: 'En Rodaje', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: Video };
            case 'edicion': return { label: 'En Edición', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: FileEdit };
            case 'revision': return { label: 'En Revisión (Cliente)', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Clock };
            case 'aprobado': return { label: 'Aprobado', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle2 };
            default: return { label: 'Pendiente', color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Calendar };
        }
    };

    const StatusCard = ({ count, label, active }) => (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${active ? 'bg-white/5 border-white/20' : 'border-transparent'} transition-all`}>
            <span className="text-2xl font-bold text-white mb-1">{count}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Top Stats Bar & Actions */}
            <div className="bg-[#0A0A12] border border-white/5 rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-center gap-6">

                {/* Stats */}
                <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
                    <StatusCard count={1} label="Pendientes" />
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <StatusCard count={1} label="Por Confirmar" />
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <StatusCard count={1} label="En Edición" active />
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <StatusCard count={1} label="Por Revisar" />
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <StatusCard count={24} label="Aprobados" />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Kanban className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={onNewProject}
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
                    >
                        <PlayCircle className="w-4 h-4 fill-white text-orange-500" />
                        Nueva Producción
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'kanban' ? (
                <KanbanView productions={PRODUCTIONS} getStatusConfig={getStatusConfig} />
            ) : viewMode === 'list' ? (
                <ListView productions={PRODUCTIONS} getStatusConfig={getStatusConfig} />
            ) : (
                <GridView productions={PRODUCTIONS} getStatusConfig={getStatusConfig} />
            )}
        </div>
    );
}

function GridView({ productions, getStatusConfig }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productions.map(project => {
                const status = getStatusConfig(project.status);
                const StatusIcon = status.icon;
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={project.id}
                        className="group p-5 rounded-2xl bg-[#0F0F1A] border border-white/5 hover:border-orange-500/30 transition-all hover:bg-white/5 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-5 h-5" />
                        </div>

                        <h3 className="text-lg font-bold text-white pr-10 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-400 mb-6">{project.type}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Progreso</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${status.bg.replace('/10', '')}`}
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-xs text-gray-500">{project.date}</span>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${status.color} bg-black/30 border ${status.border}`}>
                                {status.label}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

function ListView({ productions, getStatusConfig }) {
    return (
        <div className="flex flex-col gap-2">
            {productions.map(project => {
                const status = getStatusConfig(project.status);
                const StatusIcon = status.icon;
                return (
                    <div key={project.id} className="p-4 rounded-xl bg-[#0F0F1A] border border-white/5 hover:bg-white/5 flex items-center gap-4 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold truncate">{project.title}</h3>
                            <p className="text-xs text-gray-500">{project.type}</p>
                        </div>
                        <div className="hidden md:block w-32">
                            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${status.bg.replace('/10', '')}`} style={{ width: `${project.progress}%` }}></div>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-xs font-bold ${status.color} bg-black/30 border ${status.border} whitespace-nowrap`}>
                            {status.label}
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

function KanbanView({ productions, getStatusConfig }) {
    const COLUMNS = [
        { id: 'rodaje', label: 'Rodaje' },
        { id: 'edicion', label: 'Edición' },
        { id: 'revision', label: 'Revisión' },
        { id: 'aprobado', label: 'Aprobado' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {COLUMNS.map(col => (
                <div key={col.id} className="min-w-[250px] space-y-3">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">{col.label}</div>
                    <div className="bg-black/20 rounded-xl p-2 min-h-[200px] border border-white/5 space-y-2">
                        {productions.filter(p => p.status === col.id).map(project => {
                            const status = getStatusConfig(project.status);
                            return (
                                <div key={project.id} className="bg-[#0F0F1A] p-3 rounded-lg border border-white/5 shadow-sm hover:border-orange-500/30 cursor-pointer transition-colors">
                                    <h4 className="text-white text-sm font-bold mb-1">{project.title}</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-gray-500">{project.type}</span>
                                        <div className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')}`}></div>
                                    </div>
                                </div>
                            );
                        })}
                        {productions.filter(p => p.status === col.id).length === 0 && (
                            <div className="text-center text-xs text-gray-600 py-10 dashed-border">Vacío</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
