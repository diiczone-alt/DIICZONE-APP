'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Users, Video, PenTool, Code, Mic2, Briefcase, GraduationCap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ZONES = [
    { id: 'cm', name: 'Community Manager', icon: Users, color: 'text-blue-400', href: '/dashboard/cm' },
    { id: 'design', name: 'Diseño Gráfico', icon: PenTool, color: 'text-pink-400', href: '/dashboard/design' },
    { id: 'filmmaker', name: 'Filmmaker Studio', icon: Video, color: 'text-purple-400', href: '/dashboard/filmmaker' },
    { id: 'photo', name: 'Fotografía', icon: Camera, color: 'text-yellow-400', href: '/dashboard/photo' },
    { id: 'dev', name: 'Desarrollo Web', icon: Code, color: 'text-green-400', href: '/dashboard/dev' },
    { id: 'academy', name: 'Academia Digital', icon: GraduationCap, color: 'text-orange-400', href: '/dashboard/academy' },
];

export default function StudioMap() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                Mapa del Estudio
            </h2>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {ZONES.map((zone) => (
                    <motion.div key={zone.id} variants={item}>
                        <Link href={zone.href}>
                            <GlassCard className="h-40 flex flex-col items-center justify-center gap-4 cursor-pointer group hover:bg-white/10">
                                <div className={`p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors`}>
                                    <zone.icon className={`w-8 h-8 ${zone.color}`} />
                                </div>
                                <h3 className="font-semibold text-lg text-gray-200">{zone.name}</h3>
                            </GlassCard>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
