'use client';

import {
    Stethoscope, Building2, User, GraduationCap,
    ShoppingBag, Clapperboard, Dumbbell, Utensils, MoreHorizontal
} from 'lucide-react';

export default function ProfileSelectorStep({ onNext, updateData }) {
    const profiles = [
        { id: 'health', label: 'Profesional Salud', icon: Stethoscope, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500' },
        { id: 'business', label: 'Empresa', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500' },
        { id: 'personal', label: 'Marca Personal', icon: User, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500' },
        { id: 'education', label: 'Educación/Cursos', icon: GraduationCap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500' },
        { id: 'sales', label: 'Ventas/E-com', icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500' },
        { id: 'creator', label: 'Creador Contenido', icon: Clapperboard, color: 'text-red-400', bg: 'bg-red-500/10', border: 'hover:border-red-500' },
        { id: 'fitness', label: 'Fitness/Gym', icon: Dumbbell, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'hover:border-orange-500' },
        { id: 'food', label: 'Restaurante', icon: Utensils, color: 'text-green-400', bg: 'bg-green-500/10', border: 'hover:border-green-500' },
        { id: 'other', label: 'Otro', icon: MoreHorizontal, color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'hover:border-gray-500' }
    ];

    const handleSelect = (id) => {
        updateData({ profileType: id }); // Guardamos el tipo
        onNext();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="text-center mb-10 space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-white">¿Qué tipo de perfil tienes?</h2>
                <p className="text-gray-400 text-lg">Selecciona la opción que mejor te describe para adaptar tu sistema.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto w-full flex-1 overflow-y-auto custom-scrollbar pb-10">
                {profiles.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => handleSelect(p.id)}
                        className={`group relative p-6 rounded-2xl border border-white/10 bg-white/5 transition-all hover:scale-[1.02] hover:bg-[#0F0F16] ${p.border} flex flex-col items-center justify-center gap-4 text-center`}
                    >
                        <div className={`p-4 rounded-full ${p.bg} ${p.color} transition-transform group-hover:scale-110 shadow-lg`}>
                            <p.icon className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-white text-lg group-hover:text-gray-100">{p.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
