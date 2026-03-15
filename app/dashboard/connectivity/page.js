'use client';

import { useState, useEffect } from 'react';
import {
    MessageSquare, Users, Zap, Calendar, TrendingUp, Filter,
    Search, MoreHorizontal, Phone, Video, Send, CheckCircle,
    XCircle, AlertCircle, Clock, Bot, BrainCircuit, GripVertical,
    LayoutDashboard, DollarSign, PieChart, BarChart2,
    ArrowRight, Sparkles, AlertTriangle, Target, ShoppingBag, Bell,
    Megaphone, FolderSync, BellRing, MousePointerClick, MessageCircle, Instagram, Facebook, Globe, Mail, Map, Youtube, FileText, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { supabase } from '@/lib/supabase';
import ChannelsView from '@/components/connectivity/ChannelsView';
import PipelineBoard from '@/components/crm/PipelineBoard';
import ChannelCard from '@/components/connectivity/ChannelCard';
import ConnectionWizard from '@/components/connectivity/ConnectionWizard';
import WhatsAppConfig from '@/components/connectivity/whatsapp/WhatsAppConfig';
import InternalFlowWidget from '@/components/connectivity/InternalFlowWidget';
import VideoProductionDashboard from '@/components/crm/video/VideoProductionDashboard';

// Quick Access Items (1:1 Mapping)
const QUICK_ACCESS = [
    { id: 'channels', label: 'Conectar Canales', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'crm', label: 'CRM & Pipeline', icon: LayoutDashboard, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'agent', label: 'Agente IA de Ventas', icon: Bot, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'automations', label: 'Automatizaciones', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'ads', label: 'Meta Ads', icon: Megaphone, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'notifications', label: 'Notificaciones', icon: BellRing, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'drive', label: 'Drive & Sync', icon: FolderSync, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'calendar', label: 'Calendario & Reuniones', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'roi', label: 'Centro ROI', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
];

export default function ConnectivityDashboard() {
    const [activeTab, setActiveTab] = useState('overview'); // Default to overview
    const [subModule, setSubModule] = useState(null); // 'channels', 'crm', etc.
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [crmStages, setCrmStages] = useState([]);
    const [aiLogs, setAiLogs] = useState([]);
    const [leads, setLeads] = useState([]);
    const [services, setServices] = useState([
        { id: 1, name: 'Paquete Básico', price: '$500', includes: '4 Reels + 10 Stories' },
        { id: 2, name: 'Paquete Pro', price: '$900', includes: '8 Reels + 20 Stories + Community' },
        { id: 3, name: 'Plan Empresarial', price: '$1,500', includes: '12 Reels + Ads Management + Funnel' },
    ]);
    const [templates, setTemplates] = useState([
        { id: 1, name: 'Bienvenida', text: 'Hola 👋 Soy el asistente de DIIC ZONE. ¿Buscas marketing o producción?' },
        { id: 2, name: 'Calificación', text: 'Perfecto. ¿Tu negocio es: Salud, Servicios o E-commerce?' },
        { id: 3, name: 'Propuesta Enviada', text: 'Hola {nombre} 👋 Te comparto la propuesta recomendada...' },
    ]);
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showAutoModal, setShowAutoModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [wizardChannel, setWizardChannel] = useState(null);
    const [configChannel, setConfigChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    const CRM_STAGES = [
        { id: 'new', title: 'Nuevo Lead', color: 'bg-blue-500', count: 0 },
        { id: 'qualifying', title: 'Calificando', color: 'bg-indigo-500', count: 0 },
        { id: 'meeting_pending', title: 'Reunión Pendiente', color: 'bg-purple-500', count: 0 },
        { id: 'meeting_done', title: 'Reunión Realizada', color: 'bg-pink-500', count: 0 },
        { id: 'proposal_sent', title: 'Propuesta Enviada', color: 'bg-yellow-500', count: 0 },
        { id: 'negotiation', title: 'Negociación', color: 'bg-orange-500', count: 0 },
        { id: 'won', title: 'Ganado', color: 'bg-emerald-500', count: 0 },
        { id: 'lost', title: 'Perdido', color: 'bg-gray-500', count: 0 },
        { id: 'dormant', title: 'Dormido', color: 'bg-slate-500', count: 0 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const { data: cData } = await supabase.from('chats').select('*');
            if (cData) setChats(cData);

            const { data: sData } = await supabase.from('crm_stages').select('*');
            if (sData) setCrmStages(sData);

            const { data: aData } = await supabase.from('ai_logs').select('*');
            if (aData) setAiLogs(aData);

            // Mock Leads Data (Phase 1)
            setLeads([
                { id: 1, name: 'Dr. Roberto M.', niche: 'Médico', stage: 'new', score: 45, budget: '$1,500', objective: 'Ventas', last: '2h' },
                { id: 2, name: 'FitLife Gym', niche: 'Gimnasio', stage: 'qualifying', score: 65, budget: '$2,000', objective: 'Redes', last: '1d' },
                { id: 3, name: 'Laura Estética', niche: 'Salud', stage: 'meeting_pending', score: 92, budget: '$3,500', objective: 'Ventas', last: '30m' },
                { id: 4, name: 'InmoGroup', niche: 'Inmobiliaria', stage: 'negotiation', score: 88, budget: '$5,000', objective: 'Lead Gen', last: '5h' },
                { id: 5, name: 'TechStore', niche: 'E-commerce', stage: 'won', score: 95, budget: '$2,800', objective: 'ROAS', last: '1w' },
            ]);

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-[#050511] shadow-2xl ring-1 ring-white/5 relative overflow-hidden h-full">
            {/* Main Content */}
            <main className="h-full relative flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#050511]">

                {/* --- OVERVIEW DASHBOARD (Command Center / Bento Grid) --- */}
                {activeTab === 'overview' && (
                    <div className="flex-1 flex flex-col">
                        {/* Contextual Hero Header (Sticky on Overview) */}
                        <header className="h-40 shrink-0 sticky top-0 z-50 overflow-hidden flex items-center justify-between px-10 border-b border-white/5 bg-[#050511]/80 backdrop-blur-xl transition-all">
                            {/* Premium Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050511] via-[#0f0c29] to-[#0A0F1F] z-0 opacity-90"></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
                            <div className="absolute top-0 right-0 w-[500px] h-full bg-indigo-600/10 blur-[100px] z-0 pointer-events-none"></div>

                            <div className="relative z-10 flex items-center gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 border border-white/10 shadow-[0_0_25px_rgba(99,102,241,0.15)] backdrop-blur-sm">
                                    <Zap className="w-8 h-8 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-display font-bold text-white tracking-tight mb-1 drop-shadow-lg">Conectividad & Automatización</h1>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <p className="text-xs text-indigo-200 uppercase tracking-[0.2em] font-bold opacity-80">Centro de Integraciones • Ventas • Operaciones</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 ml-auto">
                                <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/10 hover:border-white/20 group">
                                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-400" />
                                    <span>Generar Propuesta</span>
                                </button>
                                <button onClick={() => setShowAutoModal(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-indigo-500/50 group">
                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <span>Nueva Auto</span>
                                </button>
                                <button onClick={() => setShowNotifications(!showNotifications)} className={`p-3.5 ${showNotifications ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'} hover:bg-white/10 hover:text-white rounded-xl border border-white/5 transition-all hover:scale-105 active:scale-95 group relative shadow-lg backdrop-blur-md`}>
                                    <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    <span className="absolute top-3 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#050511] shadow-sm animate-pulse"></span>
                                </button>
                            </div>
                        </header>

                        <div className="p-8">
                            <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">

                                {/* LEFT COLUMN (Main Operations) */}
                                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                                    {/* 1. Data Flow Widget (Visual Pipeline) */}
                                    <div className="bg-[#0E0E18] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
                                        <div className="flex justify-between items-center mb-6 relative z-10">
                                            <div>
                                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <BrainCircuit className="w-5 h-5 text-indigo-400" /> Flujo de Conectividad
                                                </h2>
                                                <p className="text-xs text-gray-500">Visualización en tiempo real de tu ecosistema.</p>
                                            </div>
                                            <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg border border-white/5 transition-colors">Ver Detalles</button>
                                        </div>

                                        {/* 1. INTERNAL FLOW (Real-time Animation) */}
                                        <InternalFlowWidget />
                                    </div>

                                    {/* 2. CHANNELS GRID (Specific List) */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-blue-400" /> Mensajería (Atención)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                            <ChannelCard
                                                name="WhatsApp Business"
                                                icon={MessageCircle}
                                                status="connected"
                                                color="text-emerald-400"
                                                bg="bg-emerald-500/10"
                                                type="messaging"
                                                features={['Ventas 24/7', 'Propuestas', 'Estados']}
                                                onConnect={() => setConfigChannel('whatsapp')}
                                            />
                                            <ChannelCard
                                                name="Instagram DM"
                                                icon={Instagram}
                                                status="connected"
                                                color="text-pink-400"
                                                bg="bg-pink-500/10"
                                                type="messaging"
                                                features={['Inbox Unificado', 'Respuestas Rápidas', 'Mentions']}
                                                onConnect={() => setWizardChannel({ name: 'Instagram', icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-500/10', type: 'meta' })}
                                            />
                                            <ChannelCard
                                                name="Messenger"
                                                icon={Facebook}
                                                status="disconnected"
                                                color="text-blue-400"
                                                bg="bg-blue-500/10"
                                                type="messaging"
                                                features={['Inbox Unificado', 'Comentarios', 'Ads']}
                                                onConnect={() => setWizardChannel({ name: 'Messenger', icon: Facebook, color: 'text-blue-400', bg: 'bg-blue-500/10', type: 'meta' })}
                                            />
                                            <ChannelCard
                                                name="WebChat"
                                                icon={Globe}
                                                status="disconnected"
                                                color="text-indigo-400"
                                                bg="bg-indigo-500/10"
                                                type="messaging"
                                                features={['Soporte en vivo', 'Captura Leads', 'FAQs']}
                                                onConnect={() => setWizardChannel({ name: 'WebChat', icon: Globe, color: 'text-indigo-400', bg: 'bg-indigo-500/10', type: 'generic' })}
                                            />
                                            <ChannelCard
                                                name="Telegram Bot"
                                                icon={Bot}
                                                status="disconnected"
                                                color="text-sky-400"
                                                bg="bg-sky-500/10"
                                                type="messaging"
                                                features={['Comunidad', 'Alertas', 'Grupos']}
                                                onConnect={() => setWizardChannel({ name: 'Telegram Bot', icon: Bot, color: 'text-sky-400', bg: 'bg-sky-500/10', type: 'generic' })}
                                            />
                                        </div>

                                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                            <Megaphone className="w-4 h-4 text-purple-400" /> Contenido & Publicación
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                            <ChannelCard
                                                name="Instagram Pub"
                                                icon={Instagram}
                                                status="disconnected"
                                                color="text-pink-400"
                                                bg="bg-pink-500/10"
                                                type="content"
                                                features={['Programar Posts', 'Reels', 'Analytics']}
                                                onConnect={() => setWizardChannel({ name: 'Instagram Pub', icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-500/10', type: 'content' })}
                                            />
                                            <ChannelCard
                                                name="Facebook Page"
                                                icon={Facebook}
                                                status="disconnected"
                                                color="text-blue-600"
                                                bg="bg-blue-600/10"
                                                type="content"
                                                features={['Programar Posts', 'Videos', 'Analytics']}
                                                onConnect={() => setWizardChannel({ name: 'Facebook Page', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10', type: 'content' })}
                                            />
                                            <ChannelCard
                                                name="TikTok"
                                                icon={Video}
                                                status="disconnected"
                                                color="text-black"
                                                bg="bg-gray-500/10"
                                                type="content"
                                                features={['Analytics Básico', 'Respuestas', 'Trends']}
                                                onConnect={() => setWizardChannel({ name: 'TikTok', icon: Video, color: 'text-black', bg: 'bg-gray-500/10', type: 'content' })}
                                            />
                                            <ChannelCard
                                                name="YouTube"
                                                icon={Youtube}
                                                status="disconnected"
                                                color="text-red-500"
                                                bg="bg-red-500/10"
                                                type="content"
                                                features={['Shorts', 'Analytics', 'Comentarios']}
                                                onConnect={() => setWizardChannel({ name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', type: 'content' })}
                                            />
                                        </div>

                                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-gray-400" /> Extras
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                                            <ChannelCard
                                                name="Email"
                                                icon={Mail}
                                                status="connected"
                                                color="text-orange-400"
                                                bg="bg-orange-500/10"
                                                type="extra"
                                                features={['Sync Contactos', 'Enviar Propuestas']}
                                                onConnect={() => setWizardChannel({ name: 'Email', icon: Mail, color: 'text-orange-400', bg: 'bg-orange-500/10', type: 'generic' })}
                                            />
                                            <ChannelCard
                                                name="Google Business"
                                                icon={Map}
                                                status="disconnected"
                                                color="text-blue-500"
                                                bg="bg-blue-600/10"
                                                type="extra"
                                                features={['Gestión Reseñas', 'Mensajes Maps']}
                                                onConnect={() => setWizardChannel({ name: 'Google Business', icon: Map, color: 'text-blue-500', bg: 'bg-blue-600/10', type: 'generic' })}
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Stats Panel (Aurora Effect) */}
                                    <div className="grid grid-cols-2 gap-6 flex-1">
                                        <div className="bg-[#0E0E18] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                                            <h3 className="text-sm font-bold text-gray-400 mb-1">Ventas Totales</h3>
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <span className="text-3xl font-display font-bold text-white">$12,450</span>
                                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">+15%</span>
                                            </div>
                                            <div className="h-24 w-full bg-gradient-to-t from-emerald-500/10 to-transparent rounded-lg border-b border-emerald-500/20 relative">
                                                {/* Mock Chart Line */}
                                                <svg className="absolute bottom-0 w-full h-full text-emerald-500 fill-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                    <path d="M0 35 Q 25 20, 50 25 T 100 10" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                                    <path d="M0 35 Q 25 20, 50 25 T 100 10 V 40 H 0 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="bg-[#0E0E18] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                                            <h3 className="text-sm font-bold text-gray-400 mb-1">Leads Activos</h3>
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <span className="text-3xl font-display font-bold text-white">342</span>
                                                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">+8%</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-[#151520] rounded-lg p-2 text-center">
                                                    <span className="block text-[10px] text-gray-500">Hot</span>
                                                    <span className="block text-sm font-bold text-white">45</span>
                                                </div>
                                                <div className="flex-1 bg-[#151520] rounded-lg p-2 text-center">
                                                    <span className="block text-[10px] text-gray-500">Warm</span>
                                                    <span className="block text-sm font-bold text-white">128</span>
                                                </div>
                                                <div className="flex-1 bg-[#151520] rounded-lg p-2 text-center">
                                                    <span className="block text-[10px] text-gray-500">New</span>
                                                    <span className="block text-sm font-bold text-white">169</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Quick Actions Row */}
                                    <div className="grid grid-cols-4 gap-4">
                                        <button onClick={() => setShowProposalModal(true)} className="bg-[#151520] hover:bg-[#1A1A25] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 group">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <DollarSign className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold text-white">Nueva Propuesta</span>
                                        </button>
                                        <button className="bg-[#151520] hover:bg-[#1A1A25] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 group">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold text-white">Nueva Auto</span>
                                        </button>
                                        <button className="bg-[#151520] hover:bg-[#1A1A25] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 group">
                                            <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Megaphone className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold text-white">Lanzar Ads</span>
                                        </button>
                                        <button className="bg-[#151520] hover:bg-[#1A1A25] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 group">
                                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-bold text-white">Agendar Cita</span>
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN (Tools & Tips) */}
                                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                                    {/* 4. Tools Grid (Compact) */}
                                    <div className="bg-[#0E0E18] border border-white/5 rounded-3xl p-6">
                                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Herramientas</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {QUICK_ACCESS.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { setActiveTab('module'); setSubModule(item.id); }}
                                                    className="p-3 bg-[#151520] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all group flex items-start gap-3"
                                                >
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                                    </div>
                                                    <div className="text-left">
                                                        <h4 className="text-xs font-bold text-white leading-tight mb-0.5 group-hover:text-indigo-400 transition-colors">{item.label}</h4>
                                                        <span className="text-[9px] text-gray-500">Gestionar</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 5. Pro Tips (Dynamic Insights) */}
                                    <div className="bg-gradient-to-b from-indigo-900/10 to-[#0E0E18] border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden flex-1">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <h3 className="text-sm font-bold text-white">Pro Tips</h3>
                                        </div>
                                        <div className="space-y-4 relative z-10">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-xs text-gray-300 leading-relaxed">
                                                    <strong className="text-white block mb-1">Automatiza el seguimiento</strong>
                                                    Los leads que reciben respuesta en &lt;5 min tienen 50% más probabilidad de compra. Activa el Agente IA.
                                                </p>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-xs text-gray-300 leading-relaxed">
                                                    <strong className="text-white block mb-1">Reactiva leads dormidos</strong>
                                                    Usa una campaña de "Regalo Exclusivo" para leads en estado "Dormido".
                                                </p>
                                                <button className="mt-2 text-[10px] text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1">
                                                    Ver Plantilla <ArrowRight className="w-2.5 h-2.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* --- SUB-MODULE VIEWS --- */}
                {activeTab === 'module' && (
                    <div className="flex-1 flex flex-col">
                        {/* Sub-module Header Navigation */}
                        <div className="h-12 border-b border-white/5 flex items-center px-8 gap-4 bg-[#0E0E18]">
                            <button onClick={() => setActiveTab('overview')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                                <ArrowRight className="w-3 h-3 rotate-180" /> Volver
                            </button>
                            <div className="h-4 w-px bg-white/10"></div>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                                {QUICK_ACCESS.find(q => q.id === subModule)?.label}
                            </span>
                        </div>

                        {/* Module Content Container */}
                        <div className="flex-1 relative flex flex-col overflow-hidden">

                            {/* CRM & INBOX */}
                            {subModule === 'crm' && (
                                <div className="flex-1 flex flex-col h-full overflow-hidden">
                                    {/* CRM Header with KPIs */}
                                    <div className="h-auto border-b border-white/5 bg-[#121212] flex flex-col gap-4 p-4">
                                        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                            <button onClick={() => setActiveTab('inbox')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'inbox' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                                                <MessageSquare className="w-3.5 h-3.5 inline mr-2" /> Inbox Unificado
                                            </button>
                                            <button onClick={() => setActiveTab('crm')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'crm' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                                                <LayoutDashboard className="w-3.5 h-3.5 inline mr-2" /> Pipeline Ventas
                                            </button>
                                            <button onClick={() => setActiveTab('production')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'production' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                                                <Clapperboard className={`w-3.5 h-3.5 inline mr-2 ${activeTab === 'production' ? 'text-white' : 'text-indigo-400'}`} /> Producción Video
                                            </button>
                                            <button onClick={() => setActiveTab('kpi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'kpi' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                                                <BarChart2 className="w-3.5 h-3.5 inline mr-2" /> KPIs & Métricas
                                            </button>
                                        </div>
                                        {/* Quick Stats Row */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                            {[
                                                { label: 'Leads del mes', value: '142', color: 'text-white' },
                                                { label: 'Citas agendadas', value: '28', color: 'text-indigo-400' },
                                                { label: 'Ventas cerradas', value: '12', color: 'text-emerald-400' },
                                                { label: 'Facturación', value: '$8,450', color: 'text-white' },
                                                { label: 'ROI estimado', value: '320%', color: 'text-green-400' },
                                                { label: 'Conversión', value: '8.4%', color: 'text-blue-400' },
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-white/5 rounded-lg p-2 px-3 border border-white/5">
                                                    <p className="text-[9px] uppercase tracking-widest text-gray-500">{stat.label}</p>
                                                    <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CRM Content */}
                                    <div className="flex-1 relative flex">

                                        {/* INBOX VIEW */}
                                        {activeTab === 'inbox' && (
                                            <div className="flex-1 flex h-full">
                                                {/* Chat List */}
                                                <div className="w-80 border-r border-white/5 flex flex-col bg-[#0E0E18]">
                                                    <div className="p-4 border-b border-white/5">
                                                        <div className="relative">
                                                            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                                                            <input type="text" placeholder="Buscar chats..." className="w-full bg-[#151520] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
                                                        </div>
                                                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 custom-scrollbar">
                                                            {['Todos', 'Nuevos', 'Seguimiento', 'Urgente'].map(filter => (
                                                                <button key={filter} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-[10px] text-gray-400 whitespace-nowrap border border-white/5 transition-colors">{filter}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                                        {chats.map(chat => (
                                                            <div key={chat.id} onClick={() => setSelectedChat(chat)} className={`p-4 border-b border-white/5 hover:bg-[#151520] cursor-pointer transition-colors ${selectedChat?.id === chat.id ? 'bg-[#151520] border-l-2 border-l-indigo-500' : ''}`}>
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={chat.avatar} className="w-8 h-8 rounded-full" alt={chat.name} />
                                                                        <span className="text-white text-sm font-bold truncate w-24">{chat.name}</span>
                                                                    </div>
                                                                    <span className="text-[10px] text-gray-500">{chat.time}</span>
                                                                </div>
                                                                <p className="text-xs text-gray-400 truncate pl-10 mb-2">{chat.msg}</p>
                                                                <div className="pl-10 flex gap-2">
                                                                    {chat.status === 'bot_active' && <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] rounded border border-indigo-500/20 flex items-center gap-1"><Bot className="w-2.5 h-2.5" /> IA Activa</span>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Chat View */}
                                                <div className="flex-1 flex flex-col bg-[#050511] relative">
                                                    {selectedChat ? (
                                                        <div className="flex-1 p-6 text-white">
                                                            <h3 className="font-bold border-b border-white/10 pb-4 mb-4">{selectedChat.name}</h3>
                                                            <p className="text-gray-400 text-sm">Chat content placeholder...</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                                            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                                                            <p>Selecciona un chat</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* PIPELINE VIEW */}
                                        {activeTab === 'crm' && (
                                            <div className="flex-1 relative flex overflow-hidden">
                                                <PipelineBoard />
                                            </div>
                                        )}



                                        {/* KPI View Placeholder inside CRM */}
                                        {activeTab === 'kpi' && (
                                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                                <p>Detalle de KPIs y Gráficas (Próximamente)</p>
                                            </div>
                                        )}
                                    </div>
                                </div >
                            )
                            }

                            {/* CHANNELS VIEW */}
                            {subModule === 'channels' && <ChannelsView />}

                            {/* AGENT VIEW */}
                            {
                                subModule === 'agent' && (
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="max-w-4xl mx-auto space-y-8">
                                            {/* Agent Toggle & Status */}
                                            <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                                                <div>
                                                    <h2 className="text-xl font-bold text-white">Agente IA de Ventas</h2>
                                                    <p className="text-sm text-gray-400">El agente responderá y calificará leads automáticamente.</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-emerald-400 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Activo</span>
                                                    <div className="w-12 h-6 bg-emerald-500/20 rounded-full border border-emerald-500/30 relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full shadow-lg"></div></div>
                                                </div>
                                            </div>

                                            {/* Niche Selection */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
                                                    <h3 className="text-lg font-bold text-white mb-4">Configuración de Nicho</h3>
                                                    <div className="space-y-3">
                                                        {['Inmobiliaria', 'Gimnasio', 'Restaurante', 'Clínica', 'E-commerce'].map(niche => (
                                                            <label key={niche} className="flex items-center gap-3 p-3 bg-[#151520] rounded-xl border border-white/5 cursor-pointer hover:bg-white/5">
                                                                <input type="radio" name="niche" className="accent-indigo-500" />
                                                                <span className="text-gray-300 text-sm">{niche}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
                                                    <h3 className="text-lg font-bold text-white mb-4">Acciones Permitidas</h3>
                                                    <div className="space-y-3">
                                                        {['Responder chats iniciales', 'Calificar Leads (Hot/Cold)', 'Agendar Citas en Calendario', 'Dar seguimiento post-venta'].map(action => (
                                                            <label key={action} className="flex items-center gap-3 p-3 bg-[#151520] rounded-xl border border-white/5 cursor-pointer hover:bg-white/5">
                                                                <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4 rounded" />
                                                                <span className="text-gray-300 text-sm">{action}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Business Memory Section */}
                                            <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 md:col-span-2">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-bold text-white">Memoria de Negocio (Servicios & Precios)</h3>
                                                    <button className="text-xs bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">Editar Catálogo</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {services.map(svc => (
                                                        <div key={svc.id} className="p-4 bg-[#151520] rounded-xl border border-white/5">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-bold text-white text-sm">{svc.name}</h4>
                                                                <span className="text-emerald-400 font-mono text-xs font-bold">{svc.price}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500">{svc.includes}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quick Texts Section */}
                                            <div className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 md:col-span-2">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-bold text-white">Textos Rápidos (Plantillas)</h3>
                                                    <button className="text-xs bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">Configurar Bot</button>
                                                </div>
                                                <div className="space-y-3">
                                                    {templates.map(tmpl => (
                                                        <div key={tmpl.id} className="p-3 bg-[#151520] rounded-xl border border-white/5 flex flex-col gap-1">
                                                            <div className="flex justify-between">
                                                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{tmpl.name}</span>
                                                                <button className="text-[10px] text-gray-500 hover:text-white">Editar</button>
                                                            </div>
                                                            <p className="text-sm text-gray-300 italic">"{tmpl.text}"</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* AUTOMATIONS (n8n/Make) */}
                            {
                                subModule === 'automations' && (
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="max-w-6xl mx-auto">
                                            <div className="flex justify-between items-center mb-8">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white">Biblioteca de Automatizaciones</h2>
                                                    <p className="text-gray-400">Flujos pre-configurados para tu negocio.</p>
                                                </div>
                                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20">
                                                    <Zap className="w-4 h-4 inline mr-2" /> Crear Flujo
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {[
                                                    { title: 'Lead Entrante -> CRM', desc: 'Guarda leads de FB/IG en el Pipeline.', icon: Filter, active: true },
                                                    { title: 'Cita Agendada -> Calendar', desc: 'Bloquea horario y envía confirmación.', icon: Calendar, active: true },
                                                    { title: 'Reunión Finalizada -> Resumen', desc: 'Genera minuta con IA y envía por WA.', icon: Bot, active: false },
                                                    { title: 'Pago Pendiente -> Aviso', desc: 'Recordatorio automático de facturas.', icon: DollarSign, active: true },
                                                ].map((auto, i) => (
                                                    <div key={i} className="bg-[#0E0E18] border border-white/5 rounded-2xl p-6 relative group hover:border-white/10 transition-colors">
                                                        <div className="absolute top-6 right-6">
                                                            <div className={`w-10 h-6 rounded-full relative cursor-pointer ${auto.active ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-white/5 border border-white/10'}`}>
                                                                <div className={`absolute top-1 w-3.5 h-3.5 rounded-full shadow-lg transition-all ${auto.active ? 'right-1 bg-indigo-500' : 'left-1 bg-gray-500'}`}></div>
                                                            </div>
                                                        </div>
                                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-indigo-400">
                                                            <auto.icon className="w-6 h-6" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white mb-2">{auto.title}</h3>
                                                        <p className="text-sm text-gray-400 mb-6">{auto.desc}</p>
                                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold text-gray-300">Ver Flujo Logic</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* META ADS */}
                            {
                                subModule === 'ads' && (
                                    <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center">
                                        <div className="max-w-lg w-full bg-[#0E0E18] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                                            <Megaphone className="w-16 h-16 text-pink-500 mx-auto mb-6 opacity-80" />
                                            <h2 className="text-2xl font-bold text-white mb-2">Lanzador de Pauta Fácil</h2>
                                            <p className="text-gray-400 text-sm mb-8">Crea campañas profesionales en 3 pasos simples asistido por IA.</p>

                                            <div className="space-y-4 text-left mb-8">
                                                <div className="flex items-center gap-4 p-4 bg-[#151520] rounded-xl border border-white/5 opacity-50">
                                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold text-sm border border-pink-500/20">1</div>
                                                    <div><h4 className="text-white font-bold text-sm">Objetivo</h4><p className="text-xs text-gray-500">¿Qué quieres lograr?</p></div>
                                                </div>
                                                <div className="flex items-center gap-4 p-4 bg-[#151520] rounded-xl border border-white/5 opacity-50">
                                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold text-sm border border-pink-500/20">2</div>
                                                    <div><h4 className="text-white font-bold text-sm">Creativo</h4><p className="text-xs text-gray-500">Selecciona contenido aprobado.</p></div>
                                                </div>
                                                <div className="flex items-center gap-4 p-4 bg-[#151520] rounded-xl border border-white/5 opacity-50">
                                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold text-sm border border-pink-500/20">3</div>
                                                    <div><h4 className="text-white font-bold text-sm">Lanzamiento</h4><p className="text-xs text-gray-500">Presupuesto y segmentación IA.</p></div>
                                                </div>
                                            </div>
                                            <button className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 transition-all transform hover:scale-105">
                                                Iniciar Campaña
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            {/* NOTIFICATIONS */}
                            {
                                subModule === 'notifications' && (
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="max-w-4xl mx-auto bg-[#0E0E18] border border-white/5 rounded-2xl p-6">
                                            <h2 className="text-xl font-bold text-white mb-6">Configurar Notificaciones</h2>
                                            <div className="space-y-4">
                                                {[
                                                    { event: 'Nuevo Lead Calificado', channels: ['WhatsApp', 'Push'] },
                                                    { event: 'Aprobación Requerida (Diseño/Video)', channels: ['Email', 'Push'] },
                                                    { event: 'Reporte Semanal Listo', channels: ['WhatsApp', 'Email'] },
                                                    { event: 'Pago Pendiente / Factura', channels: ['WhatsApp'] },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-[#151520] rounded-xl border border-white/5">
                                                        <div>
                                                            <h4 className="text-white font-bold text-sm">{item.event}</h4>
                                                            <p className="text-xs text-gray-500">Se enviará a: {item.channels.join(', ')}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="px-3 py-1.5 bg-indigo-600/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-colors">Editar</button>
                                                            <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* ROI CENTER */}
                            {
                                subModule === 'roi' && (
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="max-w-6xl mx-auto space-y-8">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white">Centro de Rentabilidad (ROI)</h2>
                                                    <p className="text-gray-400">Analítica financiera de tus campañas y ventas.</p>
                                                </div>
                                                <div className="flex bg-[#0E0E18] p-1 rounded-xl border border-white/5">
                                                    <button className="px-4 py-2 bg-[#151520] text-white text-xs font-bold rounded-lg shadow-sm">Este Mes</button>
                                                    <button className="px-4 py-2 text-gray-500 hover:text-white text-xs font-bold rounded-lg transition-colors">Últimos 3 meses</button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {[
                                                    { label: 'Ventas Generadas', value: '$12,450', change: '+15%', color: 'text-emerald-400', icon: DollarSign },
                                                    { label: 'Leads Entrantes', value: '342', change: '+8%', color: 'text-blue-400', icon: Users },
                                                    { label: 'Costo por Lead (CPL)', value: '$4.20', change: '-5%', color: 'text-yellow-400', icon: Target },
                                                    { label: 'Tasa de Conversión', value: '3.8%', change: '+1.2%', color: 'text-purple-400', icon: TrendingUp },
                                                    { label: 'Facturación Mensual', value: '$8,200', change: '+10%', color: 'text-white', icon: BarChart2 },
                                                    { label: 'Retorno Inversión (ROAS)', value: '4.5x', change: '+0.5', color: 'text-indigo-400', icon: Zap },
                                                ].map((kpi, i) => (
                                                    <div key={i} className="p-6 bg-[#0E0E18] border border-white/5 rounded-2xl relative group hover:border-white/10 transition-colors">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className={`p-3 rounded-xl bg-white/5 ${kpi.color}`}>
                                                                <kpi.icon className="w-6 h-6" />
                                                            </div>
                                                            <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${kpi.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{kpi.change}</span>
                                                        </div>
                                                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{kpi.label}</h3>
                                                        <p className={`text-3xl font-display font-bold ${kpi.color}`}>{kpi.value}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Chart Placeholder */}
                                            <div className="p-8 bg-[#0E0E18] border border-white/5 rounded-3xl min-h-[300px] flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
                                                <div className="text-center z-10">
                                                    <BarChart2 className="w-16 h-16 text-emerald-500/20 mx-auto mb-4" />
                                                    <h3 className="text-white font-bold text-lg">Proyección de Crecimiento</h3>
                                                    <p className="text-gray-500 text-sm">Visualización gráfica disponible en breve.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* OTHER MODULES PLACEHOLDER (Drive, Calendar) */}
                            {
                                ['drive', 'calendar'].includes(subModule) && (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
                                        {subModule === 'drive' && <div className="text-center"><FolderSync className="w-20 h-20 text-orange-400 opacity-20 mx-auto mb-4" /><h2 className="text-2xl font-bold text-white">Drive & Sync</h2><p>Conecta Google Drive y sincroniza la estructura de carpetas.</p></div>}
                                        {subModule === 'calendar' && <div className="text-center"><Calendar className="w-20 h-20 text-purple-400 opacity-20 mx-auto mb-4" /><h2 className="text-2xl font-bold text-white">Calendario & Reuniones</h2><p>Gestiona grabaciones, entregas y resúmenes automáticos.</p></div>}
                                    </div>
                                )
                            }

                            {/* Fallback for safety */}
                            {
                                subModule !== 'crm' && subModule !== 'channels' && subModule !== 'agent' && subModule !== 'automations' && subModule !== 'ads' && subModule !== 'notifications' && !['drive', 'calendar', 'roi'].includes(subModule) && (
                                    <div className="flex-1 flex items-center justify-center text-gray-500">
                                        <p>Módulo {QUICK_ACCESS.find(q => q.id === subModule)?.label} en construcción</p>
                                    </div>
                                )
                            }

                        </div >
                    </div >
                )}
            </main >

            {/* PROPOSAL MODAL */}
            < AnimatePresence >
                {showProposalModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-[#0E0E18] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151520]">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400" /> Generador de Propuestas</h3>
                                <button onClick={() => setShowProposalModal(false)}><XCircle className="w-5 h-5 text-gray-500 hover:text-white" /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Cliente</label>
                                    <select className="w-full bg-[#151520] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        <option>Seleccionar Lead...</option>
                                        {leads.map(l => <option key={l.id}>{l.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tipo</label>
                                        <select className="w-full bg-[#151520] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                            <option>Express (WhatsApp)</option>
                                            <option>Formal (PDF)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Paquete</label>
                                        <select className="w-full bg-[#151520] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                            {services.map(s => <option key={s.id}>{s.name} - {s.price}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Vista Previa (Mensaje)</label>
                                    <textarea className="w-full bg-[#151520] border border-white/10 rounded-xl px-4 py-3 text-white text-sm h-32 focus:outline-none focus:border-indigo-500" defaultValue="Hola! Te adjunto la propuesta para el Plan Básico...\nPrecio: $500\nIncluye: 4 Reels..."></textarea>
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#151520]">
                                <button onClick={() => setShowProposalModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancelar</button>
                                <button onClick={() => setShowProposalModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all">Enviar Propuesta</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* AUTOMATION WIZARD MODAL */}
            < AnimatePresence >
                {showAutoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-[#0E0E18] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
                        >
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151520] relative z-10">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-400" /> Nueva Automatización</h3>
                                <button onClick={() => setShowAutoModal(false)}><XCircle className="w-5 h-5 text-gray-500 hover:text-white" /></button>
                            </div>
                            <div className="p-8 space-y-6 relative z-10">
                                {/* Step 1: Trigger */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-3">1. Disparador (Trigger)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Nuevo Mensaje', 'Comentario Post', 'Lead Form', 'Agendamiento'].map(trigger => (
                                            <button key={trigger} className="p-3 bg-[#151520] border border-white/5 rounded-xl text-left hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-xs text-gray-300 font-bold focus:ring-1 focus:ring-indigo-500">
                                                {trigger}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Step 2: Action */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-3">2. Acción</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 p-3 bg-[#151520] border border-white/5 rounded-xl">
                                            <Bot className="w-4 h-4 text-indigo-400" />
                                            <span className="text-sm text-white">Responder con IA</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#151520] border border-white/5 rounded-xl">
                                            <Users className="w-4 h-4 text-emerald-400" />
                                            <span className="text-sm text-white">Asignar a Pipeline CRM</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                                    <button onClick={() => setShowAutoModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">Cancelar</button>
                                    <button onClick={() => setShowAutoModal(false)} className="px-6 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">Crear Flujo</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* CONNECTION WIZARD */}
            <AnimatePresence>
                {wizardChannel && (
                    <ConnectionWizard
                        channel={wizardChannel}
                        onClose={() => setWizardChannel(null)}
                    />
                )}
            </AnimatePresence>

            {/* WHATSAPP CONFIG */}
            <AnimatePresence>
                {configChannel === 'whatsapp' && (
                    <WhatsAppConfig
                        onClose={() => setConfigChannel(null)}
                    />
                )}
            </AnimatePresence>

            {/* NOTIFICATIONS PANEL (Simple Dropdown Mock) */}
            < AnimatePresence >
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-24 right-10 w-80 bg-[#0E0E18] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 bg-[#151520]">
                            <h4 className="font-bold text-white text-sm">Notificaciones</h4>
                        </div>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
                            {[
                                { text: 'Nuevo lead calificado: Clínica Dental', time: 'Hace 5 min', type: 'lead' },
                                { text: 'Error de conexión: Facebook API', time: 'Hace 20 min', type: 'error' },
                                { text: 'Automatización "Citas" activa', time: 'Hace 1h', type: 'success' },
                            ].map((notif, i) => (
                                <div key={i} className="p-3 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all cursor-pointer">
                                    <p className={`text-xs font-bold mb-1 ${notif.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}>{notif.text}</p>
                                    <span className="text-[10px] text-gray-600">{notif.time}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </div >
    );
}
