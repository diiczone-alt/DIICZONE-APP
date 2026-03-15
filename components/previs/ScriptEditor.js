'use client';

import { useState, useEffect } from 'react';
import {
    FileText, MessageSquare, User, Layout,
    Sparkles, Plus, Trash2, Wand2, Download,
    ChevronDown, ChevronRight, Settings, Printer, FileText as FileTxt
} from 'lucide-react';

export default function ScriptEditor() {
    const [mounted, setMounted] = useState(false);

    // --- State ---
    const [blocks, setBlocks] = useState([
        { id: 1, type: 'scene_heading', content: 'INT. OFICINA - DÍA' },
        { id: 2, type: 'action', content: 'JUAN (30s) está sentado frente a su computadora, visiblemente frustrado.' },
        { id: 3, type: 'character', content: 'JUAN' },
        { id: 4, type: 'dialogue', content: 'No puede ser que esto siga fallando.' },
    ]);
    const [activeBlockId, setActiveBlockId] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // --- Actions ---
    const addBlock = (type) => {
        const newId = Date.now();
        setBlocks([...blocks, { id: newId, type, content: '' }]);
        setActiveBlockId(newId);
    };

    const updateBlock = (id, content) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    };

    const deleteBlock = (id) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const handleKeyDown = (e, id, type) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Smart Typing Logic
            let nextType = 'action';
            if (type === 'scene_heading') nextType = 'action';
            if (type === 'action') nextType = 'character'; // Assumption: usually implies character enters or speaks
            if (type === 'character') nextType = 'dialogue';
            if (type === 'dialogue') nextType = 'character'; // Alternating dialogue

            addBlock(nextType);
        }
        if (e.key === 'Backspace' && blocks.find(b => b.id === id).content === '') {
            e.preventDefault();
            deleteBlock(id);
        }
    };

    const handleAiGenerate = () => {
        setIsThinking(true);
        setTimeout(() => {
            const newId = Date.now();
            const suggestions = [
                { type: 'action', content: 'De repente, la luz se apaga y se escucha un ruido sordo.' },
                { type: 'character', content: 'MISTERIOSO' },
                { type: 'dialogue', content: 'No debiste haber venido aquí.' },
            ];
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

            setBlocks([...blocks, { id: newId, ...randomSuggestion }]);
            setActiveBlockId(newId);
            setIsThinking(false);
        }, 1500); // Mock API delay
    };

    const getBlockStyle = (type) => {
        switch (type) {
            case 'scene_heading': return 'font-bold uppercase text-indigo-400 mt-6 mb-2 tracking-widest';
            case 'action': return 'text-gray-300 mb-4';
            case 'character': return 'font-bold text-white uppercase text-center mt-4';
            case 'dialogue': return 'text-gray-300 text-center max-w-lg mx-auto mb-4';
            case 'parenthetical': return 'text-gray-500 text-center text-sm italic';
            default: return 'text-gray-300';
        }
    };

    // Expert Screenwriter Metrics
    const getStats = () => {
        const textLength = blocks.reduce((acc, b) => acc + b.content.length, 0);
        const pages = (textLength / 3000).toFixed(1); // Industry Std: ~3000 chars per page
        const minutes = pages; // 1 page = 1 minute
        return { pages, minutes };
    };
    const stats = getStats();

    // function ScriptEditor() { ... }
    // function ScriptEditor() { ... }


    // ... existing actions ...

    // --- Export Actions ---
    const handlePrint = () => {
        window.print();
        setShowExportMenu(false);
    };

    const handleDownloadTxt = () => {
        const textContent = blocks.map(b => {
            let line = b.content.toUpperCase(); // Basic formatting
            if (b.type === 'dialogue') line = `\t\t${b.content}`; // Indent dialogue
            if (b.type === 'parenthetical') line = `\t\t(${b.content})`;
            if (b.type === 'character') line = `\n\t${b.content.toUpperCase()}`;
            if (b.type === 'scene_heading') line = `\n\n${b.content.toUpperCase()}\n`;
            return line;
        }).join('\n');

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guion_diic_zone.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setShowExportMenu(false);
    };

    return (
        <div className="flex h-full w-full bg-[#050511] text-white print:bg-white print:text-black">

            {/* 1. Left Sidebar: Structure & AI - Hidden on Print */}
            <div className="w-64 flex flex-col border-r border-white/10 bg-[#0E0E18] print:hidden">
                <div className="p-4 border-b border-white/10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estadísticas</h3>
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-indigo-400 font-bold">{stats.minutes} min</span>
                            <span className="text-[10px] text-gray-600">Tiempo Est.</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-white font-bold">{stats.pages}</span>
                            <span className="text-[10px] text-gray-600">Páginas</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold">{blocks.filter(b => b.type === 'scene_heading').length}</span>
                            <span className="text-[10px] text-gray-600">Escenas</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {blocks.map((block, index) => {
                        // Calc Scene Number dynamically
                        let sceneNum = 0;
                        if (block.type === 'scene_heading') {
                            sceneNum = blocks.slice(0, index + 1).filter(b => b.type === 'scene_heading').length;
                        }
                        return (
                            <div
                                key={block.id}
                                onClick={() => setActiveBlockId(block.id)}
                                className={`px-3 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-2 ${activeBlockId === block.id ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                {block.type === 'scene_heading' && <span className="font-mono font-bold w-4">{sceneNum}.</span>}
                                {block.type === 'character' && <User className="w-3 h-3 shrink-0" />}
                                {block.type === 'dialogue' && <MessageSquare className="w-3 h-3 shrink-0" />}
                                {block.type === 'action' && <FileText className="w-3 h-3 shrink-0" />}
                                <span className="truncate">{block.content || '(Vacío)'}</span>
                            </div>
                        );
                    })}
                </div>

                {/* AI Assistant Teaser */}
                <div className="p-4 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 m-2 rounded-xl border border-indigo-500/30">
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold">AI Copilot</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mb-3">
                        ¿Atascado? Pídeme que continúe el diálogo o sugiera un giro.
                    </p>
                    <button
                        onClick={handleAiGenerate}
                        disabled={isThinking}
                        className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-xs font-bold flex items-center justify-center gap-2"
                    >
                        {isThinking ? <Sparkles className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        {isThinking ? 'Generando...' : 'Generar Ideas'}
                    </button>
                </div>
            </div>

            {/* 2. Main Area: Script Page */}
            <div className="flex-1 overflow-y-auto bg-[#1a1a1a] flex justify-center p-8 font-mono print:bg-white print:p-0 print:block">
                <div className="w-full max-w-3xl min-h-[800px] bg-white text-black p-12 shadow-2xl relative print:shadow-none print:w-full print:max-w-none">
                    {/* Header */}
                    <div className="absolute top-4 right-4 text-xs text-gray-400 font-sans print:hidden">
                        Borrador v1 • {stats.pages} págs
                    </div>

                    {/* Script Content */}
                    <div className="space-y-1">
                        {blocks.map((block, index) => {
                            // Calc Scene Num again for display
                            let sceneNumDisplay = null;
                            if (block.type === 'scene_heading') {
                                sceneNumDisplay = blocks.slice(0, index + 1).filter(b => b.type === 'scene_heading').length;
                            }
                            return (
                                <div key={block.id} className="group relative">
                                    {/* Margin Scene Number (Expert Feature) */}
                                    {sceneNumDisplay && (
                                        <div className="absolute -left-12 top-2 w-8 text-right text-xs font-bold text-gray-400 select-none print:text-black">
                                            {sceneNumDisplay}
                                        </div>
                                    )}

                                    <textarea
                                        value={block.content}
                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, block.id, block.type)}
                                        placeholder={`[${block.type.replace('_', ' ')}]`}
                                        className={`w-full bg-transparent outline-none resize-none overflow-hidden ${getBlockStyle(block.type)}`}
                                        rows={Math.max(1, Math.ceil(block.content.length / 80))}
                                        autoFocus={activeBlockId === block.id}
                                    />
                                    {/* Quick Delete Action - Hidden on Print */}
                                    <button
                                        onClick={() => deleteBlock(block.id)}
                                        className="absolute -right-8 top-0 text-red-400 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded print:hidden"
                                        title="Eliminar bloque"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Add Block Controls - Hidden on Print */}
                    <div className="mt-8 flex items-center justify-center gap-2 print:hidden pb-12">
                        <AddBlockBtn icon={Layout} label="Escena" onClick={() => addBlock('scene_heading')} />
                        <AddBlockBtn icon={FileText} label="Acción" onClick={() => addBlock('action')} />
                        <AddBlockBtn icon={User} label="Personaje" onClick={() => addBlock('character')} />
                        <AddBlockBtn icon={MessageSquare} label="Diálogo" onClick={() => addBlock('dialogue')} />
                    </div>
                </div>
            </div>

            {/* 3. Right Sidebar: Export & Settings - Hidden on Print */}
            <div className="w-16 border-l border-white/10 bg-[#0E0E18] flex flex-col items-center py-4 gap-4 print:hidden relative">

                {/* Export Dropdown Trigger */}
                <div className="relative">
                    <button
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${showExportMenu ? 'bg-indigo-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'}`}
                        title="Exportar"
                    >
                        <Download className="w-5 h-5" />
                    </button>

                    {/* Export Menu */}
                    {showExportMenu && (
                        <div className="absolute right-[calc(100%+0.5rem)] top-0 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
                            <button
                                onClick={handlePrint}
                                className="px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-3 transition-colors"
                            >
                                <Printer className="w-4 h-4" /> Imprimir / PDF
                            </button>
                            <button
                                onClick={handleDownloadTxt}
                                className="px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-3 transition-colors border-t border-white/5"
                            >
                                <FileTxt className="w-4 h-4" /> Texto (.txt)
                            </button>
                        </div>
                    )}
                </div>

                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white" title="Ajustes de Formato">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

        </div>
    );
}

function AddBlockBtn({ icon: Icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs font-bold transition-colors border border-gray-300"
        >
            <Icon className="w-3 h-3" /> {label}
        </button>
    );
}
