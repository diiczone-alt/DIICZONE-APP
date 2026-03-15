'use client';

import { useState } from 'react';
import { MessageSquare, Calendar, Database, Check, X, Minus } from 'lucide-react';

export default function AnalisisChannelStep({ onNext, updateData }) {
    const [channels, setChannels] = useState({
        whatsapp: null, // 'yes', 'no', 'partial'
        booking: null,
        crm: null
    });

    const handleSelect = (key, value) => {
        setChannels(prev => ({ ...prev, [key]: value }));
    };

    const isComplete = Object.values(channels).every(v => v !== null);

    const questions = [
        {
            id: 'whatsapp',
            label: '¿Gestionas clientes por WhatsApp?',
            icon: MessageSquare,
            desc: 'Para ventas, dudas o soporte.'
        },
        {
            id: 'booking',
            label: '¿Tienes sistema de agendamiento?',
            icon: Calendar,
            desc: 'Calendly, Google Calendar o similar.'
        },
        {
            id: 'crm',
            label: '¿Usas algún software de CRM?',
            icon: Database,
            desc: 'Para seguimiento de leads y ventas.'
        }
    ];

    const OptionButton = ({ status, type, onClick }) => {
        let activeClass = '';
        let icon = null;
        let label = '';

        if (type === 'yes') {
            activeClass = status === 'yes' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/10 text-gray-400 hover:border-emerald-500/50';
            icon = <Check className="w-4 h-4" />;
            label = 'Sí';
        } else if (type === 'no') {
            activeClass = status === 'no' ? 'bg-red-500 border-red-500 text-white' : 'border-white/10 text-gray-400 hover:border-red-500/50';
            icon = <X className="w-4 h-4" />;
            label = 'No';
        } else {
            activeClass = status === 'partial' ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/10 text-gray-400 hover:border-indigo-500/50';
            icon = <Minus className="w-4 h-4" />;
            label = 'A veces';
        }

        return (
            <button
                onClick={onClick}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-medium text-sm ${activeClass}`}
            >
                {icon} {label}
            </button>
        );
    };

    return (
        <div className="space-y-6 text-center h-full flex flex-col pt-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">Canales & Tecnología</h2>
                <p className="text-gray-400">¿Qué herramientas utilizas actualmente?</p>
            </div>

            <div className="flex-1 space-y-6 max-w-lg mx-auto w-full">
                {questions.map((q) => (
                    <div key={q.id} className="bg-white/5 rounded-2xl p-6 text-left space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#0A0A12] rounded-xl text-indigo-400">
                                <q.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{q.label}</h3>
                                <p className="text-sm text-gray-500">{q.desc}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-[#0A0A12] p-2 rounded-2xl">
                            <OptionButton
                                status={channels[q.id]}
                                type="yes"
                                onClick={() => handleSelect(q.id, 'yes')}
                            />
                            <OptionButton
                                status={channels[q.id]}
                                type="partial"
                                onClick={() => handleSelect(q.id, 'partial')}
                            />
                            <OptionButton
                                status={channels[q.id]}
                                type="no"
                                onClick={() => handleSelect(q.id, 'no')}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { updateData({ existingChannels: channels }); onNext(); }}
                disabled={!isComplete}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Confirmar Diagnóstico
            </button>
        </div>
    );
}
