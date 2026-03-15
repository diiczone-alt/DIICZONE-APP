'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { driveService } from '@/services/driveService';
import { Loader2, Folder, CheckCircle, HardDrive } from 'lucide-react';

export default function DriveSetupStep({ onNext, updateData }) {
    const [status, setStatus] = useState('idle'); // idle, connecting, creating, complete
    const [folders, setFolders] = useState([]);
    const [currentAction, setCurrentAction] = useState('');

    const startSetup = async () => {
        setStatus('connecting');
        setCurrentAction('Conectando con Google Drive...');

        // 1. Simular Auth
        const authData = await driveService.authenticate();
        updateData({ user: authData.user });

        setStatus('creating');
        setCurrentAction('Inicializando estructura de sistema...');

        // 2. Simular Creación Root
        const rootFolder = await driveService.createRootFolder(authData.user.name);
        updateData({ rootFolder });

        // 3. Crear Subcarpetas una por una
        const folderGenerator = driveService.createStructure(rootFolder.id);
        const newFolders = [];

        for await (const folder of folderGenerator) {
            setCurrentAction(`Creando directorio: ${folder.name}...`);
            newFolders.push(folder);
            setFolders([...newFolders]);
        }

        setStatus('complete');
        setCurrentAction('¡Estructura inteligente lista!');
        setTimeout(onNext, 1500); // Auto-avanzar al terminar
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="relative">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 ${status === 'complete' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                    {status === 'connecting' || status === 'creating' ? (
                        <Loader2 className="w-12 h-12 animate-spin" />
                    ) : status === 'complete' ? (
                        <CheckCircle className="w-12 h-12" />
                    ) : (
                        <HardDrive className="w-12 h-12" />
                    )}
                </div>
                {status === 'creating' && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
            </div>

            <div className="space-y-2 max-w-md">
                <h2 className="text-3xl font-black">
                    {status === 'idle' ? 'Estructura Automática' :
                        status === 'complete' ? 'Sistema Configurado' : 'Construyendo tu Ecosistema'}
                </h2>
                <p className="text-gray-400">
                    {status === 'idle'
                        ? 'Vamos a conectar con tu Drive para crear la arquitectura de carpetas inteligente de DIIC ZONE.'
                        : currentAction}
                </p>
            </div>

            {status === 'idle' && (
                <button
                    onClick={startSetup}
                    className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="flex items-center gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo_%282020%29.svg" className="w-5 h-5" alt="Drive" />
                        Conectar Google Drive
                    </span>
                </button>
            )}

            {/* Visualización de Carpetas Creándose */}
            {(status === 'creating' || status === 'complete') && (
                <div className="w-full max-w-md grid grid-cols-2 gap-3 mt-8">
                    {folders.map((folder, i) => (
                        <motion.div
                            key={folder.id}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3 text-left"
                        >
                            <span className="text-xl">{folder.icon}</span>
                            <div className="min-w-0">
                                <div className="text-xs font-bold truncate text-white">{folder.name}</div>
                                <div className="text-[10px] text-emerald-400 font-mono">OK - Created</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
