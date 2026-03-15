'use client';

import { useState } from 'react';

import { Calendar, Network, Map, Plus, PenTool } from 'lucide-react';
import UnifiedCalendar from '../../../components/calendar/UnifiedCalendar';
import StrategyBoard from '../../../components/shared/Strategy/StrategyBoard';

import CreativeBoard from '../../../components/events/CreativeBoard';

export default function CalendarPage() {
    return (
        <div className="h-full flex flex-col space-y-4">
            <header className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        Event OS <span className="text-gray-500 font-medium text-lg">/ Calendario Global</span>
                    </h1>
                    <p className="text-gray-400">Centro de control para eventos, estrategia y producción.</p>
                </div>
            </header>

            <div className="relative w-full h-[calc(100vh-8rem)]">
                <UnifiedCalendar />
            </div>
        </div>
    );
}
