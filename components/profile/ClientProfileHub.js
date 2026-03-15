'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Zap, Gift, User, Settings } from 'lucide-react';
import ClientLevelSystem from './ClientLevelSystem';
import ClientRewards from './ClientRewards';
import ClientAccountSettings from './ClientAccountSettings';

export default function ClientProfileHub() {
    const searchParams = useSearchParams();
    const [subTab, setSubTab] = useState('progress'); // 'progress', 'rewards', 'settings'

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['progress', 'rewards', 'settings'].includes(tabParam)) {
            setSubTab(tabParam);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen">
            {/* Sub-Navigation */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 bg-white/5 border border-white/5 rounded-2xl">
                    <TabButton
                        id="progress"
                        label="Mi Progreso"
                        icon={Zap}
                        active={subTab === 'progress'}
                        onClick={() => setSubTab('progress')}
                    />
                    <TabButton
                        id="rewards"
                        label="Recompensas"
                        icon={Gift}
                        active={subTab === 'rewards'}
                        onClick={() => setSubTab('rewards')}
                    />
                    <TabButton
                        id="settings"
                        label="Cuenta"
                        icon={User}
                        active={subTab === 'settings'}
                        onClick={() => setSubTab('settings')}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-7xl px-4">
                {subTab === 'progress' && <ClientLevelSystem />}
                {subTab === 'rewards' && <ClientRewards />}
                {subTab === 'settings' && <ClientAccountSettings />}
            </div>
        </div>
    );
}

function TabButton({ id, label, icon: Icon, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${active
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}
