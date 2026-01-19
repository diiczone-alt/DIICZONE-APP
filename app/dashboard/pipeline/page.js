'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentService } from '../../../services/contentService';
import PipelineCard from '../../../components/ui/PipelineCard';
import { toast } from 'sonner'; // Assuming we might add simple notifications, or use custom

export default function PipelinePage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const data = await contentService.getPipelineItems();
        // If empty, maybe seed with demo data?
        if (data.length === 0) {
            setItems([
                { id: 'demo1', title: 'Campaña "Seguros" - Parte 1', type: 'reel', status: 'editing', scheduled_date: '2024-02-15', thumbnail_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80' },
                { id: 'demo2', title: 'Post "Beneficios 2024"', type: 'post', status: 'ready', scheduled_date: '2024-01-20', thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80' }
            ]);
        } else {
            setItems(data);
        }
    };

    const handleUpdateDate = async (id, newDate) => {
        // Optimistic update
        setItems(prev => prev.map(item => item.id === id ? { ...item, scheduled_date: newDate } : item));

        // Show notification (Simulating the previous HTML preview logic)
        // In a real app we'd use a Toast component

        if (!id.startsWith('demo')) {
            await contentService.updateItem(id, { scheduled_date: newDate });
        }
    };

    const handleAdvanceStep = async (id, stepId) => {
        // Simple logic to set status based on clicked step
        // In a real app we might validate the transition
        const statusMap = { 'start': 'draft', 'editing': 'editing', 'approval': 'approval', 'copy': 'scheduled', 'ready': 'published' };
        const newStatus = statusMap[stepId];

        setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));

        if (!id.startsWith('demo')) {
            await contentService.updateItem(id, { status: newStatus });
        }
    };

    const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter || (filter === 'design' && i.type === 'post'));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-end">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">Flujo de Producción 🎬</h2>
                    <p className="text-gray-400">Estado en tiempo real de tu contenido en producción.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl">
                    <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Todos</button>
                    <button onClick={() => setFilter('reel')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'reel' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Video/Reels</button>
                    <button onClick={() => setFilter('design')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'design' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Diseño/Fotos</button>
                </div>
            </div>

            <div className="space-y-6">
                {filteredItems.map(item => (
                    <PipelineCard
                        key={item.id}
                        item={item}
                        onUpdateDate={handleUpdateDate}
                        onAdvanceStep={handleAdvanceStep}
                    />
                ))}
            </div>
        </motion.div>
    );
}
