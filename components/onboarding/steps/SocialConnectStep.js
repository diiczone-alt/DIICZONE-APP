'use client';

import { useState } from 'react';
import { Instagram, Facebook, Youtube, Video, CheckCircle2, Link2 } from 'lucide-react';
import { toast } from 'sonner';

const platforms = [
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
    { id: 'tiktok', label: 'TikTok', icon: Video, color: 'text-white' }, // Video icon as proxy
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500' }
];

export default function SocialConnectStep({ onNext, updateData }) {
    const [connected, setConnected] = useState({});

    const toggleConnect = (id) => {
        // Simular flujo OAuth
        if (!connected[id]) {
            const width = 600, height = 700;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            // En producción sería window.open(oauthUrl...)
            toast.promise(
                new Promise(resolve => setTimeout(resolve, 1500)),
                {
                    loading: `Conectando con ${id}...`,
                    success: () => {
                        setConnected(prev => ({ ...prev, [id]: true }));
                        return `${id} conectado correctamente`;
                    },
                    error: 'Error al conectar'
                }
            );
        } else {
            setConnected(prev => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            });
        }
    };

    const handleContinue = () => {
        updateData({ social: Object.keys(connected) });
        onNext();
    };

    return (
        <div className="space-y-8 text-center h-full flex flex-col">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">Ecosistema Social</h2>
                <p className="text-gray-400">Conecta tus canales para automatizar publicaciones y métricas.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 content-center">
                {platforms.map(p => (
                    <button
                        key={p.id}
                        onClick={() => toggleConnect(p.id)}
                        className={`group flex items-center justify-between p-6 rounded-2xl border transition-all ${connected[p.id] ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#0A0A12] ${connected[p.id] ? '' : 'group-hover:scale-110 transition-transform'}`}>
                                <p.icon className={`w-6 h-6 ${p.color}`} />
                            </div>
                            <span className="font-bold text-lg capitalize">{p.label}</span>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${connected[p.id] ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 text-transparent group-hover:border-white/50'}`}>
                            {connected[p.id] ? <CheckCircle2 className="w-5 h-5" /> : <Link2 className="w-4 h-4 text-gray-500" />}
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={handleContinue}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-white/10"
            >
                {Object.keys(connected).length > 0 ? `Continuar (${Object.keys(connected).length} conectados)` : 'Continuar sin conectar'}
            </button>
        </div>
    );
}
