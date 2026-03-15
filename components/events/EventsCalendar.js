'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, Video, Camera, MoreVertical, Calendar as CalendarIcon, Plus } from 'lucide-react';

export default function EventsCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Event Data
    const events = [
        { id: 1, title: 'Campaña Nike Air', type: 'video', date: '2025-10-15', time: '09:00', location: 'Estudio A', status: 'confirmed' },
        { id: 2, title: 'Reunión Creativa', type: 'meeting', date: '2025-10-15', time: '14:00', location: 'Sala Zoom', status: 'pending' },
        { id: 3, title: 'Edición Vlog', type: 'edit', date: '2025-10-16', time: 'All Day', location: 'Suite 1', status: 'in-progress' },
        { id: 4, title: 'Entrega Final', type: 'deadline', date: '2025-10-20', time: '18:00', location: 'Drive', status: 'review' },
        { id: 5, title: 'Sesión Fotográfica', type: 'photo', date: '2025-10-22', time: '10:00', location: 'Locación Ext.', status: 'confirmed' },
    ];

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getDayEvents = (day) => {
        const dayStr = day < 10 ? `0${day}` : day;
        const monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1;
        const dateKey = `${year}-${monthStr}-${dayStr}`;
        return events.filter(e => e.date === dateKey); // Simple string match for logic
    };

    const getEventColor = (type) => {
        switch (type) {
            case 'video': return 'bg-violet-600/20 text-violet-300 border-violet-500/30';
            case 'photo': return 'bg-pink-600/20 text-pink-300 border-pink-500/30';
            case 'meeting': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
            case 'deadline': return 'bg-red-600/20 text-red-300 border-red-500/30';
            default: return 'bg-gray-700/50 text-gray-300';
        }
    };

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black text-white">{monthNames[month]} <span className="text-gray-500 font-medium">{year}</span></h2>
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/5 p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-colors border border-white/5">Hoy</button>
                    <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/20 rounded-xl text-sm font-medium transition-colors">Mes</button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-400 transition-colors border border-white/5">Semana</button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 border border-white/5 rounded-2xl bg-[#0E0E18]/50 overflow-hidden flex flex-col shadow-2xl">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                        <div key={day} className="py-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">{day}</div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6">
                    {/* Empty Cells for start offset */}
                    {Array.from({ length: startDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="border-r border-b border-white/5 bg-white/[0.005]" />
                    ))}

                    {/* Actual Days */}
                    {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = getDayEvents(day);
                        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                        return (
                            <div key={day} className={`border-r border-b border-white/5 p-3 min-h-[100px] relative transition-colors hover:bg-white/[0.02] group ${isToday ? 'bg-primary/-5' : ''}`}>
                                <div className={`flex justify-center items-center w-8 h-8 rounded-full mb-2 ${isToday ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30' : 'text-gray-400 font-medium group-hover:text-white'}`}>
                                    {day}
                                </div>

                                <div className="space-y-1.5">
                                    {dayEvents.map(event => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`text-xs p-1.5 rounded-md border ${getEventColor(event.type)} cursor-pointer hover:brightness-125 transition-all truncate flex items-center gap-1.5`}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                                            <span className="font-medium truncate">{event.title}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Add button on hover */}
                                <button className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        );
                    })}

                    {/* Remaining Empty Cells to fill grid (optional, but good for borders) */}
                    {Array.from({ length: 42 - (days + startDay) }).map((_, i) => (
                        <div key={`end-empty-${i}`} className="border-r border-b border-white/5 bg-white/[0.005]" />
                    ))}
                </div>
            </div>
        </div>
    );
}
