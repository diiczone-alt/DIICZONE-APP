'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Download, FileVideo, Music, MessageSquare,
    UploadCloud, CheckCircle, ChevronLeft, Flag, Play
} from 'lucide-react';
import BlockerModal from '@/components/workstation/editor/BlockerModal';

export default function TaskDetailPage({ params }) {
    const { taskId } = params;
    const router = useRouter();
    const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);

    const task = {
        title: 'Reels Lanzamiento Dr. Smith',
        objective: 'Crear 3 reels dinámicos para promocionar el nuevo servicio de blanqueamiento.',
        format: '9:16 (Vertical) - 1080x1920',
        duration: '15-30s cada uno',
        structure: 'Hook (0-3s) -> Problema -> Solución (Servicio) -> CTA',
        notes: 'Usar la paleta de colores corporativa. Música energica pero profesional.',
        assets: [
            { name: 'Raw_Cam_A.mp4', size: '2.4 GB', type: 'video' },
            { name: 'Raw_Cam_B.mp4', size: '1.8 GB', type: 'video' },
            { name: 'Voiceover_Final.wav', size: '45 MB', type: 'audio' },
            { name: 'Logo_Animado.mov', size: '120 MB', type: 'video' }
        ],
        versions: [
            { id: 1, name: 'v1_Draft.mp4', status: 'Changes Requested', date: 'Yesterday' },
        ]
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-white">{task.title}</h1>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">ID: {taskId}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsBlockerModalOpen(true)}
                        className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Flag className="w-4 h-4" /> Reportar Bloqueo
                    </button>
                    <button
                        onClick={() => router.push(`/workstation/editor/deliver/${taskId}`)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-purple-600/20 flex items-center gap-2"
                    >
                        <UploadCloud className="w-4 h-4" /> Subir Entrega
                    </button>
                </div>
            </header>

            {/* 3-Column Layout */}
            <div className="flex-1 grid grid-cols-12 overflow-hidden">

                {/* Column A: Guide (Left) - 3 cols */}
                <aside className="col-span-3 border-r border-white/5 bg-[#0B0B10] p-6 overflow-y-auto">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-6 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Guía de Producción
                    </h3>

                    <div className="space-y-6">
                        <Section title="Objetivo" content={task.objective} />
                        <Section title="Formato & Specs" content={`${task.format} • ${task.duration}`} />
                        <Section title="Estructura Clave" content={task.structure} />

                        <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                            <h4 className="text-amber-400 text-xs font-bold mb-2">Notas del CM</h4>
                            <p className="text-amber-200/80 text-sm leading-relaxed">{task.notes}</p>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                    <div className="w-3 h-3 bg-purple-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Marcar guía como entendida</span>
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Column B: Player & Versions (Center) - 6 cols */}
                <main className="col-span-6 bg-[#080808] flex flex-col relative">
                    {/* Player Area */}
                    <div className="flex-1 flex items-center justify-center bg-black relative group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
                                <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2622&auto=format&fit=crop"
                            className="h-full w-full object-contain opacity-50"
                            alt="Preview"
                        />
                    </div>

                    {/* Comments Timeline */}
                    <div className="h-64 border-t border-white/5 bg-[#0E0E14] overflow-hidden flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-[#0A0A0A]">
                            <span className="text-xs font-bold text-gray-400 uppercase">Comentarios (v1_Draft)</span>
                            <button className="text-xs text-purple-400 hover:text-white font-bold">Generar Lista de Cambios</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <Comment user="Laura (CM)" time="00:03" text="El gancho es muy lento, corta antes." />
                            <Comment user="Laura (CM)" time="00:12" text="La música tapa la voz aquí." />
                            <Comment user="Tú (Editor)" time="00:15" text="Corregido en v2." self />
                        </div>
                        <div className="p-3 border-t border-white/5">
                            <input
                                type="text"
                                placeholder="Escribe un comentario..."
                                className="w-full bg-[#1A1A20] rounded-lg border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                            />
                        </div>
                    </div>
                </main>

                {/* Column C: Assets (Right) - 3 cols */}
                <aside className="col-span-3 border-l border-white/5 bg-[#0B0B10] p-6 overflow-y-auto">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-6 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Archivos
                    </h3>

                    <div className="space-y-2 mb-8">
                        {task.assets.map((asset, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group flex items-center gap-3">
                                <div className="text-gray-500 group-hover:text-purple-400">
                                    {asset.type === 'video' ? <FileVideo className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-gray-300 truncate group-hover:text-white">{asset.name}</p>
                                    <p className="text-[10px] text-gray-600">{asset.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 mb-4">
                        <Download className="w-4 h-4" /> Abrir Carpeta Drive
                    </button>
                    <button className="w-full py-3 text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2">
                        Solicitar Archivo Faltante
                    </button>

                </aside>

            </div>

            <BlockerModal
                isOpen={isBlockerModalOpen}
                onClose={() => setIsBlockerModalOpen(false)}
                onSubmit={(data) => console.log('Bloqueo reportado:', data)}
            />
        </div>
    );
}

function Section({ title, content }) {
    return (
        <div>
            <h4 className="text-gray-500 text-xs font-bold mb-2 uppercase">{title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
        </div>
    );
}

function Comment({ user, time, text, self }) {
    return (
        <div className={`flex gap-3 ${self ? 'flex-row-reverse' : ''}`}>
            <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                {user.charAt(0)}
            </div>
            <div className={`p-3 rounded-xl max-w-[80%] ${self ? 'bg-purple-600/10 text-purple-100' : 'bg-white/5 text-gray-300'}`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold opacity-70">{user}</span>
                    <span className="text-[10px] font-mono opacity-50 bg-black/20 px-1 rounded">{time}</span>
                </div>
                <p className="text-xs">{text}</p>
            </div>
        </div>
    );
}
