'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import LeadCard from './LeadCard';

const initialData = {
    columns: {
        'new': { id: 'new', title: 'Nuevo Lead', color: 'border-blue-500' },
        'contacted': { id: 'contacted', title: 'Contactado', color: 'border-indigo-500' },
        'interested': { id: 'interested', title: 'Interesado', color: 'border-purple-500' },
        'quote': { id: 'quote', title: 'Cotización', color: 'border-yellow-500' },
        'negotiation': { id: 'negotiation', title: 'Negociación', color: 'border-orange-500' },
        'won': { id: 'won', title: 'Cerrado - Venta', color: 'border-emerald-500' },
        'lost': { id: 'lost', title: 'Perdido', color: 'border-red-500' },
    },
    columnOrder: ['new', 'contacted', 'interested', 'quote', 'negotiation', 'won', 'lost'],
    leads: {
        'lead-1': { id: 'lead-1', name: 'Dr. Roberto M.', value: 1500, source: 'whatsapp', status: 'new', score: 85, niche: 'Salud' },
        'lead-2': { id: 'lead-2', name: 'Inmobiliaria City', value: 3200, source: 'ads', status: 'contacted', score: 60, niche: 'Real Estate' },
        'lead-3': { id: 'lead-3', name: 'Restaurante K', value: 800, source: 'instagram', status: 'quote', score: 92, niche: 'Gastronomía' },
        'lead-4': { id: 'lead-4', name: 'Abogados & Co', value: 2100, source: 'web', status: 'negotiation', score: 75, niche: 'Legal' },
    },
    columnsData: {
        'new': ['lead-1'],
        'contacted': ['lead-2'],
        'interested': [],
        'quote': ['lead-3'],
        'negotiation': ['lead-4'],
        'won': [],
        'lost': [],
    }
};

export default function PipelineBoard() {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columnsData[source.droppableId];
        const finish = data.columnsData[destination.droppableId];

        if (start === finish) {
            const newLeadIds = Array.from(start);
            newLeadIds.splice(source.index, 1);
            newLeadIds.splice(destination.index, 0, draggableId);

            const newColumnsData = {
                ...data.columnsData,
                [source.droppableId]: newLeadIds,
            };

            setData({ ...data, columnsData: newColumnsData });
        } else {
            const startLeadIds = Array.from(start);
            startLeadIds.splice(source.index, 1);
            const newStart = startLeadIds;

            const finishLeadIds = Array.from(finish);
            finishLeadIds.splice(destination.index, 0, draggableId);
            const newFinish = finishLeadIds;

            const newColumnsData = {
                ...data.columnsData,
                [source.droppableId]: newStart,
                [destination.droppableId]: newFinish,
            };

            setData({ ...data, columnsData: newColumnsData });
        }
    };

    return (
        <div className="h-full overflow-x-auto overflow-y-hidden custom-scrollbar p-6 bg-[#050511]">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 h-full min-w-max">
                    {data.columnOrder.map((columnId) => {
                        const column = data.columns[columnId];
                        const leads = data.columnsData[columnId].map(leadId => data.leads[leadId]);

                        return (
                            <div key={column.id} className="w-80 flex flex-col bg-[#0E0E18] rounded-2xl border border-white/5 h-full max-h-full">
                                {/* Column Header */}
                                <div className={`p-4 border-b border-white/5 flex justify-between items-center border-t-2 ${column.color}`}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-sm">{column.title}</h3>
                                        <span className="bg-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
                                    </div>
                                    <button className="text-gray-500 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Droppable Area */}
                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                                        >
                                            {leads.map((lead, index) => (
                                                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style }}
                                                        >
                                                            <LeadCard lead={lead} isDragging={snapshot.isDragging} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}

                                            {/* Quick Add Button */}
                                            <button className="w-full py-2 flex items-center justify-center gap-2 text-gray-500 hover:bg-white/5 hover:text-gray-300 rounded-xl border border-dashed border-white/10 transition-colors text-sm">
                                                <Plus className="w-4 h-4" /> Añadir
                                            </button>
                                        </div>
                                    )}
                                </Droppable>

                                {/* Column Footer (Total Value) */}
                                <div className="p-3 border-t border-white/5 bg-[#151520] rounded-b-2xl">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500">Valor Total:</span>
                                        <span className="text-white font-bold font-mono">
                                            ${leads.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
