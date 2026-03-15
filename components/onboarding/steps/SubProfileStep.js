'use client';

import { useState, useEffect } from 'react';

export default function SubProfileStep({ onNext, updateData, profileType }) {
    // Definición de sub-nichos por tipo de perfil
    const subNiches = {
        health: ['Urología', 'Odontología', 'Ginecología', 'Medicina General', 'Psicología', 'Nutrición', 'Estética', 'Otro'],
        business: ['Agencia', 'Consultora', 'Inmobiliaria', 'Software/SaaS', 'Construcción', 'Logística', 'Legal', 'Otro'],
        personal: ['Coach', 'Consultor', 'Autor', 'Speaker', 'Artista', 'Político', 'Deportista', 'Otro'],
        education: ['Idiomas', 'Marketing', 'Programación', 'Finanzas', 'Música', 'Arte', 'Matemáticas', 'Otro'],
        sales: ['Ropa/Moda', 'Tecnología', 'Hogar', 'Cosmética', 'Joyenda', 'Alimentos', 'Mascotas', 'Otro'],
        creator: ['Lifestyle', 'Tech', 'Gaming', 'Educativo', 'Entretenimiento', 'Vlogs', 'Streamer', 'Otro'],
        fitness: ['Personal Ryaner', 'Crossfit', 'Yoga/Pilates', 'Gimnasio Comercial', 'Artes Marciales', 'Otro'],
        food: ['Cafetería', 'Restaurante', 'Bar', 'Fast Food', 'Dark Kitchen', 'Pastelería', 'Otro'],
        other: ['Servicios', 'Comercio', 'Industrial', 'Ong', 'Otro']
    };

    const options = subNiches[profileType] || subNiches['other'];

    const handleSelect = (niche) => {
        updateData({ niche });
        onNext();
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full text-center">
            <div className="mb-10 space-y-2">
                <h2 className="text-3xl font-black text-white">¿Cuál es tu especialidad?</h2>
                <p className="text-gray-400 text-lg">Esto nos ayuda a configurar tu lenguaje y herramientas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto custom-scrollbar pb-10 content-start">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all text-left font-medium text-gray-300 flex items-center justify-between group"
                    >
                        {opt}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
