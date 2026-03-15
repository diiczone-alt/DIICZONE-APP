'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Server, FolderGit2, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnvironmentSuccessStep({ onNext, formData }) {
    const router = useRouter();
    const [status, setStatus] = useState('initializing'); // initializing, processing, ready
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const sequence = [
            { msg: 'Conectando con Drive...', delay: 500 },
            { msg: 'Creando estructura de carpetas...', delay: 1500 },
            { msg: 'Configurando CRM...', delay: 2500 },
            { msg: 'Personalizando Dashboard...', delay: 3500 },
            { msg: '¡Todo listo!', delay: 4500, status: 'ready' }
        ];

        let timeouts = [];

        sequence.forEach(({ msg, delay, status: endStatus }) => {
            const t = setTimeout(() => {
                setLogs(prev => [...prev, msg]);
                if (endStatus) setStatus(endStatus);
            }, delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const handleEnterDashboard = () => {
        // Aquí se haría la redirección real
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
            {status !== 'ready' ? (
                // LOADING STATE
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                >
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Server className="w-8 h-8 text-indigo-400" />
                        </div>
                    </div>
                    <div className="space-y-2 text-left bg-black/40 p-6 rounded-xl border border-white/10 font-mono text-sm h-48 overflow-y-auto custom-scrollbar">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-gray-400 flex items-center gap-2"
                            >
                                <span className="text-emerald-500">➜</span> {log}
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-gray-500 animate-pulse">Configurando tu entorno DIIC ZONE...</p>
                </motion.div>
            ) : (
                // SUCCESS STATE
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-8"
                >
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white">¡Entorno Listo!</h2>
                        <p className="text-gray-400 text-lg">
                            Ya tienes un equipo digital acompañándote. <br />
                            Tu sistema de producción, ventas y crecimiento está activo.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 py-6 border-y border-white/5">
                        <div className="flex flex-col items-center gap-2">
                            <FolderGit2 className="w-5 h-5 text-indigo-400" />
                            <span>Drive Conectado</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Server className="w-5 h-5 text-purple-400" />
                            <span>CRM Activo</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                            <span>Panel Personalizado</span>
                        </div>
                    </div>

                    <button
                        onClick={handleEnterDashboard}
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-[1.02] transition-transform shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center gap-3"
                    >
                        Entrar a mi Sistema
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </motion.div>
            )}
        </div>
    );
}
