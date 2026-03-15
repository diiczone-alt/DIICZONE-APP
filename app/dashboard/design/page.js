'use client';

import { useState } from 'react';
import DepartmentWelcome from '@/components/ui/DepartmentWelcome';
import DesignSelection from '@/components/design/DesignSelection';
import DesignWizard from '@/components/design/DesignWizard';
import DesignDashboard from '@/components/design/DesignDashboard';
import AIGenerator from '@/components/design/AIGenerator';

export default function DesignPage() {
    const [view, setView] = useState('welcome'); // welcome, selection, wizard, dashboard, ai
    const [selectedService, setSelectedService] = useState(null);

    // Navigation Handlers
    const handleStart = (mode) => {
        if (mode === 'ai') {
            setView('ai');
        } else if (mode === 'new') {
            setView('selection');
        } else {
            setView('dashboard');
        }
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setView('wizard');
    };

    const handleWizardComplete = () => {
        setView('dashboard');
    };

    return (
        <div className="bg-[#050511] min-h-screen text-white">
            {view === 'welcome' && (
                <DepartmentWelcome
                    deptId="design"
                    onAction={handleStart}
                />
            )}

            {view === 'ai' && (
                <AIGenerator onBack={() => setView('welcome')} />
            )}

            {view === 'selection' && (
                <DesignSelection
                    onSelect={handleServiceSelect}
                    onBack={() => setView('welcome')}
                />
            )}

            {view === 'wizard' && (
                <DesignWizard
                    service={selectedService}
                    onBack={() => setView('selection')}
                    onComplete={handleWizardComplete}
                />
            )}

            {view === 'dashboard' && (
                <DesignDashboard
                    project={{ service: selectedService }}
                    onBack={() => setView('welcome')}
                />
            )}
        </div>
    );
}
