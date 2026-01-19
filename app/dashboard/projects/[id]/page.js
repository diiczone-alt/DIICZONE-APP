'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    FileVideo,
    FileImage,
    MoreHorizontal,
    MessageSquare,
    Download
} from 'lucide-react';
import Link from 'next/link';
import GlassCard from '../../../components/ui/GlassCard';

// Mock Data
const MOCK_PROJECT = {
    id: '1',
    title: 'Campaña Lanzamiento Q1',
    status: 'production',
    deadline: '2024-03-15',
    description: 'Serie de 3 videos para redes sociales anunciando el nuevo producto.',
    deliverables: [
        { id: 'd1', name: 'Reel_Teaser_V1.mp4', type: 'video', status: 'pending_review', date: '2024-02-10', size: '25 MB' },
        { id: 'd2', name: 'Story_Promo_Healthcare.jpg', type: 'image', status: 'approved', date: '2024-02-08', size: '2.5 MB' },
        { id: 'd3', name: 'Guion_Locucion_Final.pdf', type: 'document', status: 'approved', date: '2024-02-05', size: '150 KB' },
    ],
    activity: [
        { id: 'a1', user: 'Editor Mike', action: 'subió un nuevo archivo', target: 'Reel_Teaser_V1.mp4', time: 'Hace 2 horas' },
        { id: 'a2', user: 'Cliente Demo', action: 'aprobó', target: 'Story_Promo_Healthcare.jpg', time: 'Hace 1 día' },
    ]
};

export default function ProjectDetailPage({ params }) {
    const [activeTab, setActiveTab] = useState('files');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <Link
                    href="/dashboard/projects"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a Proyectos</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white">{MOCK_PROJECT.title}</h1>
                            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
                                En Producción
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-2xl">{MOCK_PROJECT.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {new Date(MOCK_PROJECT.deadline).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10">
                {['files', 'activity', 'settings'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'files' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 gap-4"
                    >
                        {MOCK_PROJECT.deliverables.map((file) => (
                            <FileItem key={file.id} file={file} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FileItem({ file }) {
    const Icon = file.type === 'video' ? FileVideo : file.type === 'image' ? FileImage : FileVideo; // Default
    const statusColors = {
        pending_review: 'text-yellow-400',
        approved: 'text-green-400',
        changes_requested: 'text-red-400'
    };

    return (
        <Link href={`/dashboard/projects/1/review/${file.id}`}>
            <GlassCard className="p-4 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{file.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                            <span>•</span>
                            <span className={`capitalize ${statusColors[file.status]}`}>{file.status.replace('_', ' ')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </GlassCard>
        </Link>
    );
}
