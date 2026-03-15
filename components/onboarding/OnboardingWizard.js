'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTS DE ETAPAS (13 PASOS) ---
import AuthStep from './steps/AuthStep';               // Etapa 1
import LegalStep from './steps/LegalStep';             // Etapa 1 (Técnicamente parte del inicio)
import WelcomeStep from './steps/WelcomeStep';         // Etapa 2
import ProfileSelectorStep from './steps/ProfileSelectorStep'; // Etapa 3 (Nuevo)
import SubProfileStep from './steps/SubProfileStep';   // Etapa 4 (Nuevo)
import GoalStep from './steps/GoalStep';               // Etapa 5 (Nuevo)
import BusinessInfoStep from './steps/BusinessInfoStep'; // Etapa 6 (Nuevo)
import CapacityStep from './steps/CapacityStep';       // Etapa 7
import AnalisisChannelStep from './steps/AnalisisChannelStep'; // Etapa 8
import SocialConnectStep from './steps/SocialConnectStep'; // Etapa 9
import BrandIdentityStep from './steps/BrandIdentityStep'; // Etapa 10 (Se usará como base para Identidad)
import DriveSetupStep from './steps/DriveSetupStep';   // Etapa 10 (Auxiliar, se dispara internamente o tras Identidad)
import ResourceUploadStep from './steps/ResourceUploadStep'; // Etapa 10 (Auxiliar)
import LevelCalculationStep from './steps/LevelCalculationStep'; // Etapa 11
import SmartRecommendationStep from './steps/SmartRecommendationStep'; // Etapa 12
import EnvironmentSuccessStep from './steps/EnvironmentSuccessStep'; // Etapa 14 (Final)
// Etapa 13: EnvironmentSuccessStep (Pendiente de crear, usaremos placeholder)

export default function OnboardingWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        auth: {},
        legalAccepted: false,
        profileType: '',  // Etapa 3
        niche: '',        // Etapa 4
        goal: '',         // Etapa 5
        businessInfo: {}, // Etapa 6
        capacity: {},     // Etapa 7
        channels: {},     // Etapa 8
        social: {},       // Etapa 9
        brandIdentity: {},// Etapa 10
        driveData: null,
        resources: []
    });

    const totalSteps = 14;

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleUpdateData = (key, data) => {
        // Soporte para actualizaciones directas de clave-valor o merge de objetos
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            setFormData(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...data } }));
        } else {
            // Si pasamos un valor directo (ej: string)
            setFormData(prev => ({ ...prev, [key]: data }));
            // Para compatibilidad con componentes que esperan merge, idealmente siempre pasar objeto { key: value } o ajustar aquí.
            // En los componentes nuevos (ProfileSelector) paso { profileType: id }, asi que entra al if de arriba si key es el root.
            // AJUSTE: Mis componentes llaman updateData({ profileType: '...' }).
            // Aquí key es la propiedad en formData.
            // Si el componente llama updateData({ valor: x }), y key='profileType', esto anidaría profileType: { valor: x }.
            // Mejor estrategia: los componentes child llaman updateData(objeto_completo_a_mergear_en_root) O updateData(valor, 'key_especifica').
            // MANTENDRÉ la lógica anterior: el padre define el 'key' destino, y el hijo pasa el 'data' a mergear en ese key.
        }
    };

    // Wrapper para componentes nuevos que mandan objeto directo al root (ej: updateData({profileType: 'x'}))
    // En el render diré: updateData={(d) => setFormData(prev => ({...prev, ...d}))} para los que tocan la raíz

    const updateRoot = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <AuthStep onNext={nextStep} />;
            // Nota: Podríamos colapsar Legal dentro de Auth o step 1.5. De momento lo dejamos como 2.
            case 2: return <LegalStep onNext={nextStep} />;
            case 3: return <WelcomeStep onNext={nextStep} />;
            case 4: return <ProfileSelectorStep onNext={nextStep} updateData={updateRoot} />;
            case 5: return <SubProfileStep onNext={nextStep} updateData={updateRoot} profileType={formData.profileType} />;
            case 6: return <GoalStep onNext={nextStep} updateData={updateRoot} />;
            case 7: return <BusinessInfoStep onNext={nextStep} updateData={updateRoot} />;
            case 8: return <CapacityStep onNext={nextStep} updateData={(d) => handleUpdateData('capacity', d)} userType={formData.profileType} niche={formData.niche} />;
            case 9: return <AnalisisChannelStep onNext={nextStep} updateData={(d) => handleUpdateData('channels', d)} />;
            case 10: return <SocialConnectStep onNext={nextStep} updateData={(d) => handleUpdateData('social', d)} />;

            // Etapa 10: Identidad Compleja (Marca + Drive + Recursos)
            // Simplificación: Mostramos BrandIdentity, y DriveSetup puede ser un efecto o pantalla siguiente.
            // El usuario pidió "Aquí recién se crean carpetas".
            case 11: return <BrandIdentityStep onNext={nextStep} updateData={(d) => handleUpdateData('brandIdentity', d)} />;
            // Podríamos insertar ResourceUploadStep aquí como 11.5 o parte de 11.

            case 12: return <LevelCalculationStep onNext={nextStep} formData={formData} />;
            case 13: return <SmartRecommendationStep onNext={nextStep} formData={formData} />;
            case 14: return <EnvironmentSuccessStep onNext={nextStep} formData={formData} />;
            default: return <div className="text-white text-center p-10">¡Entorno Creado! (Fin del flujo)</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A12] text-white flex flex-col items-center justify-center p-6 relative overflow-y-auto custom-scrollbar">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />

            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-8 relative z-10">
                <div className="flex justify-between text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">
                    <span>Adopción DIIC ZONE</span>
                    <span>Etapa {currentStep} de {totalSteps}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-4xl relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/50 min-h-[550px] flex flex-col items-center justify-center"
                    >
                        {renderStep()}

                        {/* Debug Navigation */}
                        <div className="mt-auto px-6 w-full pt-8 flex justify-between border-t border-white/5 opacity-30 hover:opacity-100 transition-opacity">
                            <button onClick={prevStep} disabled={currentStep === 1} className="text-xs text-gray-500 hover:text-white">Atrás</button>
                            <span className="text-xs text-gray-700 font-mono">DEBUG: {currentStep}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
