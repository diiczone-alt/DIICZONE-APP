'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import SocialCard from '../../../components/ui/SocialCard';
import { socialService } from '../../../services/socialService';

// TikTok Icon placeholder
const TikTokIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const PLATFORM_CONFIG = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: Instagram,
        color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500',
        desc: 'Feed, Stories & Reels'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: Facebook,
        color: 'bg-[#1877F2]',
        desc: 'Page Insights'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: TikTokIcon,
        color: 'bg-black border border-white/20',
        desc: 'Trends & Views'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: Youtube,
        color: 'bg-[#FF0000]',
        desc: 'Channel Analytics'
    }
];

export default function SocialPage() {
    const [connections, setConnections] = useState([]);
    const [loadingMap, setLoadingMap] = useState({}); // Track loading state per platform

    useEffect(() => {
        loadConnections();
    }, []);

    const loadConnections = async () => {
        const data = await socialService.getConnections();
        setConnections(data);
    };

    const handleConnect = async (platformId) => {
        setLoadingMap(prev => ({ ...prev, [platformId]: true }));

        const newConnection = await socialService.connectPlatform(platformId);

        if (newConnection) {
            // Update local state with new connection
            setConnections(prev => {
                const base = prev.filter(c => c.platform !== platformId);
                return [...base, newConnection];
            });
        }

        setLoadingMap(prev => ({ ...prev, [platformId]: false }));
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <motion.div variants={item} className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Conexiones Sociales 🌐</h2>
                    <p className="text-gray-400">Gestiona y monitorea tus redes desde un solo lugar.</p>
                </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {PLATFORM_CONFIG.map((config) => {
                    const connection = connections.find(c => c.platform === config.id);
                    return (
                        <SocialCard
                            key={config.id}
                            platform={config.name}
                            icon={config.icon}
                            color={config.color}
                            description={config.desc}
                            isConnected={!!connection}
                            stats={connection?.stats}
                            onConnect={() => handleConnect(config.id)}
                            isLoading={loadingMap[config.id]}
                        />
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
