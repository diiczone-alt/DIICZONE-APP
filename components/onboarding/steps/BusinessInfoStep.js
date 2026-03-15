'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function BusinessInfoStep({ onNext, updateData }) {
    const [info, setInfo] = useState({
        services: '',
        mainService: '',
        experience: '',
        teamSize: ''
    });

    const isComplete = info.services && info.mainService && info.experience && info.teamSize;

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
            <div className="text-center mb-8 space-y-2">
                <h2 className="text-3xl font-black text-white">Hablemos de tu Negocio</h2>
                <p className="text-gray-400">Cuéntanos un poco más para entender tu contexto.</p>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pb-10">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">¿Qué servicios ofreces?</label>
                    <textarea
                        value={info.services}
                        onChange={e => setInfo({ ...info, services: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none min-h-[80px]"
                        placeholder="Ej: Consultoría, Diseño, Clases..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">¿Cuál es tu producto/servicio estrella?</label>
                    <input
                        type="text"
                        value={info.mainService}
                        onChange={e => setInfo({ ...info, mainService: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none"
                        placeholder="El que más vendes o quieres potenciar"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Tiempo en el mercado</label>
                        <select
                            value={info.experience}
                            onChange={e => setInfo({ ...info, experience: e.target.value })}
                            className="w-full bg-[#0A0A12] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none appearance-none"
                        >
                            <option value="">Selecciona...</option>
                            <option value="new">Menos de 1 año</option>
                            <option value="1-3">1 - 3 años</option>
                            <option value="3-5">3 - 5 años</option>
                            <option value="5+">Más de 5 años</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Equipo de trabajo</label>
                        <select
                            value={info.teamSize}
                            onChange={e => setInfo({ ...info, teamSize: e.target.value })}
                            className="w-full bg-[#0A0A12] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none appearance-none"
                        >
                            <option value="">Selecciona...</option>
                            <option value="solo">Trabajo solo (Solo-preneur)</option>
                            <option value="small">Equipo pequeño (2-5)</option>
                            <option value="medium">Agencia/Empresa (5-20)</option>
                            <option value="large">Gran Empresa (20+)</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={() => { updateData({ businessInfo: info }); onNext(); }}
                    disabled={!isComplete}
                    className="w-full py-4 bg-white text-black rounded-2xl font-bold mt-4 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Continuar <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
