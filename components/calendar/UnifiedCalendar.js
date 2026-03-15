'use client';

import { useState } from 'react';
import {
    ChevronLeft, ChevronRight, Video, FileText,
    Instagram, Linkedin, Calendar as CalendarIcon,
    Camera, Users, CheckCircle2, Clock, Star, Plus as PlusIcon,
    Grid as GridIcon, Radio, Layout, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappService } from '../../services/whatsappService';

// Drawers
import ContentDrawer from './drawers/ContentDrawer';
import ProductionDrawer from './drawers/ProductionDrawer';
import MeetingsDrawer from './drawers/MeetingsDrawer';
import DatesDrawer from './drawers/DatesDrawer';

const DAYS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

const CATEGORIES = [
    { id: 'content', label: 'Contenido', color: 'bg-indigo-500', text: 'text-indigo-400' },
    { id: 'production', label: 'Producción', color: 'bg-rose-500', text: 'text-rose-400' },
    { id: 'meetings', label: 'Reuniones', color: 'bg-emerald-500', text: 'text-emerald-400' }
];

export default function UnifiedCalendar({ role = 'cm' }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeDrawer, setActiveDrawer] = useState(null); // 'content', 'production', 'meetings', 'dates'
    const [selectedDay, setSelectedDay] = useState(null);

    const isCM = role === 'cm';
    const isClient = role === 'client';


    // Mock Data based on User Request structure
    const scheduledItems = [
        {
            id: 1,
            date: new Date().getDate(),
            type: 'content',
            title: 'Reel: Lanzamiento',
            platform: 'instagram',
            status: 'scheduled'
        },
        {
            id: 2,
            date: new Date().getDate() + 2,
            type: 'production',
            title: 'Rodaje: Entrevista CEO',
            time: '10:00 AM',
            status: 'confirmed'
        },
        {
            id: 3,
            date: new Date().getDate() + 5,
            type: 'meetings',
            title: 'Revisión Mensual',
            time: '3:00 PM',
            status: 'pending'
        }
    ];

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handleDrawerToggle = (drawerId) => {
        setActiveDrawer(prev => prev === drawerId ? null : drawerId);
    };

    return (
        <div className="flex flex-col h-full gap-6 relative font-sans p-2">

            {/* Drawers Container */}
            <ContentDrawer isOpen={activeDrawer === 'content'} onClose={() => setActiveDrawer(null)} />
            {isCM && <ProductionDrawer isOpen={activeDrawer === 'production'} onClose={() => setActiveDrawer(null)} />}
            <MeetingsDrawer isOpen={activeDrawer === 'meetings'} onClose={() => setActiveDrawer(null)} />
            <DatesDrawer isOpen={activeDrawer === 'dates'} onClose={() => setActiveDrawer(null)} niche="health" />

            {/* --- TOP CREATIVE TOOLBAR --- */}
            <div className="flex flex-wrap items-center justify-between gap-6 px-4 shrink-0">
                <div className="flex items-center gap-8">
                    {/* Month/Year Navigation */}
                    <div className="flex items-center gap-6 group">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg ring-1 ring-white/10">
                                <CalendarIcon className="w-5 h-5 text-purple-300" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-black text-white capitalize tracking-tight drop-shadow-md">
                                    {currentDate.toLocaleString('es-ES', { month: 'long' })}
                                </h2>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{currentDate.getFullYear()}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                            <button
                                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                                className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all transform active:scale-90"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="w-px h-4 bg-white/10"></div>
                            <button
                                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                                className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all transform active:scale-90"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Toggles - PREMIUM PILL STYLE */}
                <div className="flex items-center bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-xl gap-2">
                    {/* Feature: Fechas Importantes */}
                    <button
                        onClick={() => handleDrawerToggle('dates')}
                        className={`group relative px-6 py-2.5 text-xs font-black transition-all rounded-full flex items-center gap-2 overflow-hidden ${activeDrawer === 'dates'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-2 ring-purple-400/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                            }`}
                    >
                        <Sparkles className={`w-3.5 h-3.5 ${activeDrawer === 'dates' ? 'animate-pulse' : ''}`} />
                        <span className="uppercase tracking-widest">Fechas Importantes</span>
                    </button>

                    <div className="h-6 w-px bg-white/10"></div>

                    {CATEGORIES.filter(cat => isCM || cat.id !== 'production').map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleDrawerToggle(cat.id)}
                            className={`group px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-full border border-transparent flex items-center gap-2 ${activeDrawer === cat.id
                                ? `${cat.color} text-white shadow-lg ring-2 ring-white/10`
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${cat.color} ${activeDrawer === cat.id ? 'animate-pulse shadow-[0_0_10px_currentColor]' : 'opacity-40'}`}></span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- CORE CONTENT AREA --- */}
            <div className="flex flex-1 gap-6 min-h-0">
                {/* Main Calendar View - EXPANDED */}
                <div className="flex-1 bg-[#090912]/40 relative p-6 rounded-[2.5rem] border border-white/5 flex flex-col transition-all duration-500 shadow-2xl overflow-hidden group/main">
                    
                    {/* Advanced Aurora Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse-soft"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full"></div>
                    </div>

                    {/* Grid */}
                    <div className="relative grid grid-cols-7 gap-1 flex-1 min-h-0">
                        {/* Headers */}
                        {DAYS.map(d => (
                            <div key={d} className="py-4 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                {d}
                            </div>
                        ))}

                        {/* Blanks */}
                        {Array(getFirstDayOfMonth(currentDate)).fill(null).map((_, i) => (
                            <div key={`blank-${i}`} className="bg-white/[0.01] rounded-2xl m-0.5 border border-white/[0.02]"></div>
                        ))}

                        {/* Days */}
                        {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1).map(day => {
                            const items = scheduledItems.filter(item => item.date === day);
                            const isToday = new Date().getDate() === day;

                            return (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`
                                        relative p-4 rounded-3xl cursor-pointer group transition-all duration-500 m-0.5
                                        ${isToday
                                            ? 'bg-gradient-to-br from-purple-500/15 to-blue-500/15 border border-purple-500/30 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)] ring-1 ring-white/10'
                                            : 'bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.07] hover:border-white/10 hover:shadow-2xl hover:-translate-y-1'}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`
                                            text-sm font-black flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-500
                                            ${isToday
                                                ? 'bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.2)] scale-110'
                                                : 'text-gray-500 group-hover:text-white group-hover:bg-white/10'}
                                        `}>
                                            {day}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 relative z-10">
                                        {items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`
                                                    relative overflow-hidden text-[9px] px-3 py-2 rounded-xl font-black uppercase tracking-widest
                                                    ${item.type === 'content' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/20' : ''}
                                                    ${item.type === 'production' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/20' : ''}
                                                    ${item.type === 'meetings' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : ''}
                                                `}
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Premium Interaction: Light Flare */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Sidebar: Glass Panel - MORE COMPACT/MODERN */}
                <div className="w-80 flex flex-col relative shrink-0">
                    <div className="flex-1 bg-[#090912]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group/sidebar">
                        
                        {/* Decorative Sidebar Aurora */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl animate-pulse"></div>

                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                                {selectedDay ? `Agenda · Día ${selectedDay}` : 'Resumen Semanal'}
                            </h3>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                            {selectedDay ? (
                                <div className="space-y-4">
                                    {scheduledItems.filter(i => i.date === selectedDay).length > 0 ? (
                                        scheduledItems.filter(i => i.date === selectedDay).map((item, idx) => (
                                            <div key={idx} className="p-6 rounded-[1.5rem] bg-white/[0.03] hover:bg-white/[0.06] transition-all border border-white/5 group shadow-lg">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]
                                                        ${item.type === 'content' ? 'bg-indigo-400' : ''}
                                                        ${item.type === 'production' ? 'bg-rose-400' : ''}
                                                        ${item.type === 'meetings' ? 'bg-emerald-400' : ''}
                                                    `}></span>
                                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em]
                                                        ${item.type === 'content' ? 'text-indigo-300' : ''}
                                                        ${item.type === 'production' ? 'text-rose-300' : ''}
                                                        ${item.type === 'meetings' ? 'text-emerald-300' : ''}
                                                    `}>
                                                        {item.type}
                                                    </span>
                                                </div>
                                                <h4 className="text-lg font-black text-white mb-2 leading-tight tracking-tight">{item.title}</h4>
                                                <div className="flex items-center gap-2 text-white/40">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-bold">{item.time || 'Horario Flexible'}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-24 flex flex-col items-center justify-center opacity-30">
                                            <Sparkles className="w-10 h-10 text-white mb-4 animate-bounce-soft" />
                                            <p className="text-[10px] text-white font-black uppercase tracking-[0.3em]">Todo Despejado</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col justify-center items-center gap-8 opacity-20 group-hover/sidebar:opacity-40 transition-opacity duration-1000">
                                    <div className="p-10 rounded-full bg-white/5 border border-white/10 animate-pulse-soft">
                                        <CalendarIcon className="w-16 h-16 text-white" />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-center leading-relaxed">Explora el<br />Tiempo</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


