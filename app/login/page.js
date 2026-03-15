'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    ShieldCheck, User, Palette, Video, Clapperboard,
    Mic, Camera, ArrowRight, MessageSquare, UserCheck, Globe, Printer
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(null);

    const handleLogin = async (role, path) => {
        // 1. Set Internal Auth State (Context)
        try {
            await login('demo@diic.zone', 'password');
        } catch (error) {
            console.error('Login failed (mock):', error);
        }

        // 2. Set Cookie for Middleware (Keep existing logic)
        let cookieRole = role;
        if (role === 'EDITOR') cookieRole = 'CREATIVE_EDITOR';
        if (role === 'FILMMAKER') cookieRole = 'CREATIVE_FILMMAKER';
        if (role === 'DESIGNER') cookieRole = 'CREATIVE_DESIGNER';
        if (role === 'AUDIO') cookieRole = 'CREATIVE_AUDIO';
        if (role === 'CM') cookieRole = 'CREATIVE_CM';
        if (role === 'PHOTO') cookieRole = 'CREATIVE_PHOTO'; // Redirects to /dashboard handled in onClick
        if (role === 'MODEL') cookieRole = 'CREATIVE_MODEL';
        if (role === 'WEB') cookieRole = 'CREATIVE_WEB';
        if (role === 'PRINT') cookieRole = 'CREATIVE_PRINT';
        if (role === 'EVENT') cookieRole = 'CREATIVE_EVENT';

        document.cookie = `user_role=${cookieRole}; path=/; max-age=3600`;
        console.log(`Logging in as ${cookieRole} -> ${path}`);

        // Force refresh to ensure middleware catches the new cookie
        window.location.href = path;
    };

    return (
        <div className="min-h-screen bg-[#050511] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px]" />

            <div className="max-w-4xl w-full relative z-10">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">DIIC ZONE OS</h1>
                    <p className="text-gray-400 text-lg">Selecciona tu perfil de acceso al sistema.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Admin / HQ */}
                    <RoleCard
                        title="Admin / HQ"
                        desc="Control Total & Calidad"
                        icon={ShieldCheck}
                        color="indigo"
                        onClick={() => handleLogin('ADMIN', '/admin')}
                    />

                    {/* Client */}
                    <RoleCard
                        title="Cliente"
                        desc="Dashboard & Progresos"
                        icon={User}
                        color="blue"
                        onClick={() => handleLogin('CLIENT', '/dashboard')}
                    />

                    {/* Creatives Group */}
                    <div className="md:col-span-1 space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-2">Workstations (Creativos)</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <CreativeTinyCard
                                label="Editor"
                                icon={Video}
                                onClick={() => handleLogin('EDITOR', '/workstation/editor')}
                            />
                            <CreativeTinyCard
                                label="Filmmaker"
                                icon={Clapperboard}
                                onClick={() => handleLogin('FILMMAKER', '/workstation/filmmaker')}
                            />
                            <CreativeTinyCard
                                label="Diseño"
                                icon={Palette}
                                onClick={() => handleLogin('DESIGNER', '/workstation/designer')}
                            />
                            <CreativeTinyCard
                                label="Audio"
                                icon={Mic}
                                onClick={() => handleLogin('AUDIO', '/workstation/audio')}
                            />
                            <CreativeTinyCard
                                label="Community Manager"
                                icon={MessageSquare}
                                onClick={() => handleLogin('CM', '/workstation/community-manager')}
                            />
                            <CreativeTinyCard
                                label="Fotografía"
                                icon={Camera}
                                onClick={() => handleLogin('PHOTO', '/workstation/photography/dashboard')}
                            />
                            <CreativeTinyCard
                                label="Modelos"
                                icon={UserCheck}
                                onClick={() => handleLogin('MODEL', '/workstation/talent/dashboard')}
                            />
                            <CreativeTinyCard
                                label="Desarrollo Web"
                                icon={Globe}
                                onClick={() => handleLogin('WEB', '/workstation/web/dashboard')}
                            />
                            <CreativeTinyCard
                                label="Imprenta / Merch"
                                icon={Printer}
                                onClick={() => handleLogin('PRINT', '/workstation/print/dashboard')}
                            />
                            <CreativeTinyCard
                                label="Eventos / Prod"
                                icon={Clapperboard}
                                onClick={() => handleLogin('EVENT', '/workstation/events/dashboard')}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function RoleCard({ title, desc, icon: Icon, color, onClick }) {
    const colors = {
        indigo: 'hover:border-indigo-500/50 hover:shadow-indigo-500/20 group-hover:text-indigo-400',
        blue: 'hover:border-blue-500/50 hover:shadow-blue-500/20 group-hover:text-blue-400',
    };

    return (
        <button
            onClick={onClick}
            className={`text-left p-8 rounded-3xl bg-[#0E0E18] border border-white/10 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] flex flex-col h-full ${colors[color]}`}
        >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors`}>
                <Icon className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{desc}</p>
            <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                Ingresar <ArrowRight className="w-3 h-3" />
            </div>
        </button>
    );
}

function CreativeTinyCard({ label, icon: Icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-4 rounded-xl bg-[#0E0E18] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-center flex flex-col items-center gap-2 group"
        >
            <Icon className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            <span className="text-xs font-bold text-gray-400 group-hover:text-white">{label}</span>
        </button>
    );
}
