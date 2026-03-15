'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Zap, Image, Video, Layout, Settings, FolderOpen, MousePointer2, 
    Share2, Trash2, Edit3, Grid, Layers, Play, CheckCircle, Target, 
    MessageSquare, AlertCircle, FileText, LayoutGrid, Maximize2, Minimize2, 
    Clapperboard, BrainCircuit, Users, History, Megaphone, Smartphone, 
    Trophy, Lightbulb, TrendingUp, Search, Calendar, ChevronDown, MonitorPlay,
    Utensils, User, PhoneCall, Heart, ShieldCheck, Sparkles, Briefcase, ChevronRight,
    ArrowRight, Brain, Rocket, Check, ArrowLeft, ArrowUpRight, BarChart3, 
    CloudLightning, ZapOff, Fingerprint, Box, Shield, Briefcase as PortfolioIcon,
    Link as LinkIcon, CalendarDays, Move, Maximize, Minimize, ZoomIn, ZoomOut,
    ShieldAlert, X, Globe, Lock, Clock, CheckSquare
} from 'lucide-react';
import StrategyNodeEditor from './StrategyNodeEditor';
import { useSidebar } from '@/components/layout/SidebarContext';

// OFFICIAL DIIC ZONE STRATEGIC CATEGORIES
const NODE_CATEGORIES = {
    atracción: { label: 'Atracción', color: 'bg-indigo-600', icon: Sparkles, desc: 'Atrae la atención de tu audiencia ideal.' },
    autoridad: { label: 'Autoridad', color: 'bg-purple-600', icon: ShieldCheck, desc: 'Demuestra que eres un experto en tu campo.' },
    conversión: { label: 'Conversión', color: 'bg-emerald-600', icon: Target, desc: 'Convierte el interés en acciones y ventas.' },
    branding: { label: 'Branding', color: 'bg-rose-600', icon: FileText, desc: 'Construye la identidad y valores de tu marca.' }
};

const NODE_TYPES = {
    // 🧲 Atracción (Contenido Educativo, Viral, Tendencias)
    educativo: { category: 'atracción', label: 'Educación', color: 'bg-indigo-600', border: 'border-indigo-400', icon: BrainCircuit, desc: 'Enseña algo valioso a tu audiencia.', example: 'Cómo aliviar el dolor de espalda en 3 minutos.' },
    tips: { category: 'atracción', label: 'Tips Rápidos', color: 'bg-blue-600', border: 'border-blue-400', icon: Zap, desc: 'Consejos accionables y directos.', example: '3 Herramientas que uso para diseñar.' },
    curiosidades: { category: 'atracción', label: 'Curiosidades', color: 'bg-sky-600', border: 'border-sky-400', icon: Sparkles, desc: 'Datos interesantes que retienen.', example: '¿Sabías que el 80% de las ventas son...?' },
    tendencia: { category: 'atracción', label: 'Tendencias', color: 'bg-cyan-500', border: 'border-cyan-300', icon: Rocket, desc: 'Súbete a la ola del momento.', example: 'Usa este audio viral para tu servicio.' },

    // 🛡️ Autoridad (Testimonios, Procesos, Resultados)
    testimonio: { category: 'autoridad', label: 'Testimonio', color: 'bg-purple-600', border: 'border-purple-400', icon: Users, desc: 'Prueba social de clientes reales.', example: 'Video de un cliente feliz con su resultado.' },
    casos_reales: { category: 'autoridad', label: 'Casos Reales', color: 'bg-fuchsia-600', border: 'border-fuchsia-400', icon: CheckCircle, desc: 'Resultados demostrables paso a paso.', example: 'El cambio de este paciente en 6 meses.' },
    experiencia: { category: 'autoridad', label: 'Experiencia', color: 'bg-violet-600', border: 'border-violet-400', icon: History, desc: 'Demuestra tus años en el campo.', example: 'De aprendiz a experto en 10 años.' },
    preguntas_frecuentes: { category: 'autoridad', label: 'FAQ', color: 'bg-pink-600', border: 'border-pink-400', icon: MessageSquare, desc: 'Resuelve dudas y genera confianza.', example: '¿Duele el procedimiento? Te explico.' },

    // 💰 Conversión (Ofertas, CTA, Venta Directa)
    promocion: { category: 'conversión', label: 'Promoción', color: 'bg-emerald-600', border: 'border-emerald-400', icon: Megaphone, desc: 'Oferta directa, descuento o lead magnet.', example: '20% de descuento solo por esta semana.' },
    cta: { category: 'conversión', label: 'Llamada a la Acción', color: 'bg-teal-600', border: 'border-teal-400', icon: Share2, desc: 'Indica el siguiente paso a seguir.', example: 'Toca el link en mi bio para agendar.' },
    agenda_cita: { category: 'conversión', label: 'Agendar Cita', color: 'bg-green-600', border: 'border-green-400', icon: Calendar, desc: 'Cierre de venta o consulta.', example: 'Paso 1: Elige tu horario en nuestro link.' },
    contacto: { category: 'conversión', label: 'Contacto', color: 'bg-emerald-500', border: 'border-emerald-300', icon: PhoneCall, desc: 'Vía directa de comunicación.', example: 'Escríbeme al DM para asesoría.' },

    // 🎨 Branding (Historia, Valores, Cultura)
    historia: { category: 'branding', label: 'Mi Historia', color: 'bg-rose-600', border: 'border-rose-400', icon: FileText, desc: 'Conecta con el lado humano de tu marca.', example: 'Por qué fundé esta clínica médica.' },
    valores: { category: 'branding', label: 'Valores', color: 'bg-red-500', border: 'border-red-300', icon: Heart, desc: 'Qué defiendes y en qué crees.', example: 'Nuestra ética profesional es lo primero.' },
    cultura: { category: 'branding', label: 'Cultura', color: 'bg-orange-600', border: 'border-orange-400', icon: Users, desc: 'El detrás de cámaras de tu equipo.', example: 'Así celebramos los resultados en equipo.' },

    // 🔄 Legacy & Aliases (to prevent breakage)
    objetivo: { category: 'conversión', label: 'Objetivo', color: 'bg-indigo-600', border: 'border-indigo-400', icon: Target, desc: 'Meta estratégica.' },
    produccion: { category: 'atracción', label: 'Producción', color: 'bg-blue-600', border: 'border-blue-400', icon: Clapperboard, desc: 'Contenido en proceso.' },
    ads: { category: 'conversión', label: 'Ads / Tráfico', color: 'bg-sky-600', border: 'border-sky-400', icon: Megaphone, desc: 'Publicidad pagada.' },
    estrategia: { category: 'autoridad', label: 'Estrategia', color: 'bg-purple-600', border: 'border-purple-400', icon: ShieldCheck, desc: 'Plan maestro.' },
    automatizacion: { category: 'conversión', label: 'Automatización', color: 'bg-teal-600', border: 'border-teal-400', icon: BrainCircuit, desc: 'Flujos automáticos.' },
    analitica: { category: 'autoridad', label: 'Métricas', color: 'bg-rose-600', border: 'border-rose-400', icon: BarChart3, desc: 'Resultados y datos.' },
    diseno: { category: 'atracción', label: 'Diseño', color: 'bg-pink-600', border: 'border-pink-400', icon: Layout, desc: 'Gráficos y visuales.' },
    evento: { category: 'branding', label: 'Evento', color: 'bg-orange-600', border: 'border-orange-400', icon: Calendar, desc: 'Hito o cobertura.' },
    reunion: { category: 'autoridad', label: 'Reunión', color: 'bg-amber-600', border: 'border-amber-400', icon: Users, desc: 'Cita de negocios.' },
    entregable: { category: 'autoridad', label: 'Entregable', color: 'bg-emerald-500', border: 'border-emerald-300', icon: CheckCircle, desc: 'Producto terminado.' },
    lead: { category: 'conversión', label: 'Lead / Prospecto', color: 'bg-blue-400', border: 'border-blue-200', icon: User, desc: 'Potencial cliente captado.' },
    pauta: { category: 'conversión', label: 'Pauta Ads', color: 'bg-indigo-500', border: 'border-indigo-300', icon: Zap, desc: 'Inversión publicitaria.' },
    analisis: { category: 'autoridad', label: 'Análisis', color: 'bg-violet-500', border: 'border-violet-300', icon: Search, desc: 'Estudio de datos.' },
    copy: { category: 'atracción', label: 'Copywriting', color: 'bg-pink-500', border: 'border-pink-300', icon: FileText, desc: 'Textos persuasivos.' },
    script: { category: 'atracción', label: 'Guion / Script', color: 'bg-violet-600', border: 'border-violet-400', icon: FileText, desc: 'Narrativa de video.' },
    edicion: { category: 'atracción', label: 'Edición', color: 'bg-cyan-600', border: 'border-cyan-400', icon: Video, desc: 'Post-producción.' }
};

// STRATEGY TEMPLATES
const STRATEGY_TEMPLATES = [
    {
        id: 'blank',
        title: 'Desde Cero',
        desc: 'Un lienzo en blanco para construir tu propia estrategia.',
        icon: LayoutGrid,
        color: 'bg-gray-600',
        nodes: [],
        edges: []
    },
    {
        id: 'sales',
        title: 'Ventas & Conversión Directa',
        desc: 'Estrategia diseñada para transformar contenido y tráfico en ventas, citas o contratos, con seguimiento claro y cierre medible.',
        icon: Target,
        color: 'bg-emerald-600',
        nodes: [
            // 1. OBJETIVO DE VENTA
            { id: '1', type: 'objetivo', position: { x: 400, y: 50 }, data: { title: 'Objetivo de Venta', kpi: 'Ventas / Citas / ROI', status: 'Prioridad Alta', subtitle: 'Producto / Servicio & Meta' } },

            // 2. CREATIVOS DE CONVERSIÓN
            { id: '2', type: 'produccion', position: { x: 200, y: 250 }, data: { title: 'Creativos de Conversión', subtitle: 'Ads / Reels / Carruseles', desc: 'Piezas diseñadas para vender.' } },

            // 3. CAMPAÑA DE TRÁFICO
            { id: '3', type: 'ads', position: { x: 400, y: 450 }, data: { title: 'Campaña de Tráfico', subtitle: 'Meta Ads / Google', desc: 'Presupuesto & Segmentación.' } },

            // 4. CANAL DE CIERRE
            { id: '4', type: 'cta', position: { x: 400, y: 650 }, data: { title: 'Canal de Cierre', subtitle: 'WhatsApp / Landing / Agenda', desc: 'Donde ocurre la magia.' } },

            // 5. AGENTE DE VENTAS IA
            { id: '5', type: 'automatizacion', position: { x: 600, y: 650 }, data: { title: 'Agente de Ventas IA', subtitle: 'Calificación & Cierre 24/7', desc: 'Responder, filtrar y agendar.' } },

            // 6. CRM DE VENTAS
            { id: '6', type: 'estrategia', position: { x: 400, y: 850 }, data: { title: 'CRM de Ventas', subtitle: 'Gestión del Pipeline', desc: 'Lead -> Interesado -> Cliente.' } },

            // 7. MÉTRICAS DE CONVERSIÓN
            { id: '7', type: 'analitica', position: { x: 400, y: 1050 }, data: { title: 'Métricas de Conversión', subtitle: 'ROI & Costo por Lead', desc: 'Dinero invertido vs generado.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' },
            { id: 'e5-6', source: '5', target: '6' },
            { id: 'e4-6', source: '4', target: '6' },
            { id: 'e6-7', source: '6', target: '7' },
        ]
    },
    {
        id: 'brand',
        title: 'Reconocimiento / Marca',
        desc: 'Estrategia enfocada en visibilidad, autoridad, confianza y presencia constante en redes y canales digitales.',
        icon: Megaphone,
        color: 'bg-purple-600',
        nodes: [
            // 1. OBJETIVO DE MARCA
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Objetivo de Marca', kpi: 'Alcance / Engagement', status: 'Prioridad Alta', subtitle: 'Visibilidad & Autoridad' } },

            // 2. AUDIENCIA OBJETIVO
            { id: '2', type: 'estrategia', x: 400, y: 250, data: { title: 'Audiencia Objetivo', subtitle: 'Perfil & Intereses', desc: 'A quién queremos enamorar.' } },

            // 3. IDENTIDAD & MENSAJE
            { id: '3', type: 'diseno', x: 400, y: 450, data: { title: 'Identidad & Mensaje', subtitle: 'Tono / Valores / Visual', desc: 'Somos expertos, cercanos y confiables.' } },

            // 4. CONTENIDO ESTRATÉGICO
            { id: '4', type: 'produccion', x: 200, y: 650, data: { title: 'Contenido Estratégico', subtitle: 'Reels / Carruseles', desc: 'Educativo, Inspirador, Autoridad.' } },

            // 5. CALENDARIO DE PUBLICACIÓN
            { id: '5', type: 'evento', x: 200, y: 850, data: { title: 'Calendario Publicación', subtitle: 'Frecuencia & Horarios', desc: 'Organización de la parrilla.' } },

            // 6. AMPLIFICACIÓN (Opcional)
            { id: '6', type: 'ads', x: 600, y: 650, data: { title: 'Amplificación', subtitle: 'Pauta Ligera (Alcance)', desc: 'Empuje de visibilidad, no venta directa.' } },

            // 7. MÉTRICAS DE MARCA
            { id: '7', type: 'analitica', x: 400, y: 1050, data: { title: 'Métricas de Marca', subtitle: 'Crecimiento Comunidad', desc: 'Alcance total, Engagement, Seguidores.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' },
            { id: 'e4-6', source: '4', target: '6' },
            { id: 'e5-7', source: '5', target: '7' },
            { id: 'e6-7', source: '6', target: '7' },
        ]
    },
    {
        id: 'production',
        title: 'Producción / Rodaje',
        desc: 'Logística completa para filmmakers, fotografía y cobertura. Desde la idea hasta la entrega final.',
        icon: Clapperboard,
        color: 'bg-rose-600',
        nodes: [
            // 1. TIPO DE PRODUCCIÓN
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Tipo de Producción', kpi: 'Entrega en Fecha', status: 'Prioridad Alta', subtitle: 'Comercial / Evento / Musical' } },

            // 2. GUIÓN / STORYBOARD (Creatividad)
            { id: '2', type: 'copy', x: 200, y: 250, data: { title: 'Guión / Storyboard', subtitle: 'Shotlist & Narrativa', desc: 'Qué vamos a grabar y cómo.' } },

            // 3. LOCACIONES & PERMISOS
            { id: '3', type: 'estrategia', x: 600, y: 250, data: { title: 'Locaciones & Permisos', subtitle: 'Scouting & Logística', desc: 'Dónde y requerimientos legales.' } },

            // 4. EQUIPO TÉCNICO & HUMANO
            { id: '4', type: 'produccion', x: 400, y: 450, data: { title: 'Equipo & Gear', subtitle: 'Crew + Cámaras/Luces', desc: 'Quién graba y con qué.' } },

            // 5. AGENDA DE RODAJE (Call Sheet)
            { id: '5', type: 'evento', x: 400, y: 650, data: { title: 'Agenda de Rodaje', subtitle: 'Día D / Call Sheet', desc: 'Cronograma minuto a minuto.' } },

            // 6. POST-PRODUCCIÓN
            { id: '6', type: 'diseno', x: 400, y: 850, data: { title: 'Post-Producción', subtitle: 'Edición / Color / Sonido', desc: 'Elaboración del producto final.' } },

            // 7. ENTREGA FINAL
            { id: '7', type: 'entregable', x: 400, y: 1050, data: { title: 'Entrega Final', subtitle: 'WeTransfer / Drive', desc: 'Aprobación del cliente.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Type -> Script
            { id: 'e1-3', source: '1', target: '3' }, // Type -> Location
            { id: 'e2-4', source: '2', target: '4' }, // Script -> Crew (Based on script needs)
            { id: 'e3-4', source: '3', target: '4' }, // Location -> Crew (Based on site conditions)
            { id: 'e4-5', source: '4', target: '5' }, // Crew -> Agenda (Scheduling)
            { id: 'e5-6', source: '5', target: '6' }, // Agenda -> Post (Materials to edit)
            { id: 'e6-7', source: '6', target: '7' }, // Post -> Delivery
        ]
    },
    {
        id: 'automation',
        title: 'Automatización & Sistemas',
        desc: 'Convierte DIIC ZONE en una máquina de crecimiento. Automatiza tareas, reduce carga operativa y escala 24/7.',
        icon: BrainCircuit,
        color: 'bg-teal-600',
        nodes: [
            // 1. DETECCIÓN DE PROCESOS (Diagnóstico)
            { id: '1', type: 'analitica', x: 400, y: 50, data: { title: 'Detección de Procesos', kpi: 'Horas Manuales/Mes', status: 'Diagnóstico', subtitle: 'Análisis de Repeticiones' } },

            // 2. SELECCIÓN DE AUTOMATIZACIÓN (Decisión)
            { id: '2', type: 'estrategia', x: 400, y: 250, data: { title: 'Selección de Auto.', subtitle: 'Salud / Negocios / Edu', desc: 'Definir qué bot o flujo activar.' } },

            // 3. CONSTRUCCIÓN AGENTE IA
            { id: '3', type: 'automatizacion', x: 200, y: 450, data: { title: 'Agente IA', subtitle: 'Personalidad & Objetivo', desc: 'Configuración del cerebro digital (GPT/n8n).' } },

            // 4. FLUJOS AUTOMÁTICOS
            { id: '4', type: 'automatizacion', x: 600, y: 450, data: { title: 'Flujos Automáticos', subtitle: 'Triggers & Acciones', desc: 'Respuestas, Citas, Seguimiento.' } },

            // 5. MONITOREO & CONTROL
            { id: '5', type: 'analitica', x: 200, y: 650, data: { title: 'Monitoreo & Control', subtitle: 'Conversiones & Errores', desc: 'KPIs de rendimiento del sistema.' } },

            // 6. LÍMITES & SEGURIDAD
            { id: '6', type: 'estrategia', x: 600, y: 650, data: { title: 'Límites & Seguridad', subtitle: 'Escalado Humano', desc: 'Cuándo interviene una persona.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Detection -> Selection
            { id: 'e2-3', source: '2', target: '3' }, // Selection -> AI Agent
            { id: 'e2-4', source: '2', target: '4' }, // Selection -> Flows
            { id: 'e3-4', source: '3', target: '4' }, // AI Agent -> Flows (Integration)
            { id: 'e4-5', source: '4', target: '5' }, // Flows -> Monitoring
            { id: 'e4-6', source: '4', target: '6' }, // Flows -> Safety
            { id: 'e5-6', source: '5', target: '6' }, // Monitoring -> Safety (Feedback loop)
        ]
    },
    {
        id: 'event',
        title: 'Evento / Cobertura',
        desc: 'Planificación de bodas, corporativos, deportivos o festivales. Cobertura total.',
        icon: CalendarDays,
        color: 'bg-amber-500',
        nodes: [
            // 1. TIPO DE EVENTO
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Tipo de Evento', kpi: 'Cobertura 100%', status: 'Prioridad Alta', subtitle: 'Social / Corporativo / Deportivo' } },

            // 2. LOGÍSTICA (LUGAR & FECHA)
            { id: '2', type: 'estrategia', x: 200, y: 250, data: { title: 'Lugar & Logística', subtitle: 'Scouting & Accesos', desc: 'Permisos, horarios y requerimientos técnicos.' } },

            // 3. RUNDOWN / MINUTO A MINUTO
            { id: '3', type: 'evento', x: 600, y: 250, data: { title: 'Rundown / Agenda', subtitle: 'Minuto a Minuto', desc: 'Momentos clave a capturar.' } },

            // 4. REQUERIMIENTOS DE COBERTURA
            { id: '4', type: 'produccion', x: 400, y: 450, data: { title: 'Cobertura Requerida', subtitle: 'Foto / Video / Drone', desc: 'Formatos y estilo visual.' } },

            // 5. EQUIPO ASIGNADO (CREW)
            { id: '5', type: 'produccion', x: 200, y: 650, data: { title: 'Equipo Asignado', subtitle: 'Shooters & Staff', desc: 'Quién cubre qué área.' } },

            // 6. EDICIÓN & POST (Fast Turnaround?)
            { id: '6', type: 'diseno', x: 600, y: 650, data: { title: 'Edición (Highlights)', subtitle: 'Same Day Edit / Reels', desc: 'Entrega rápida para redes.' } },

            // 7. ENTREGA FINAL
            { id: '7', type: 'entregable', x: 400, y: 850, data: { title: 'Entrega Final', subtitle: 'Galería & Master', desc: 'Material final editado.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Type -> Logistics
            { id: 'e1-3', source: '1', target: '3' }, // Type -> Rundown
            { id: 'e2-4', source: '2', target: '4' }, // Logistics -> Coverage specs
            { id: 'e3-4', source: '3', target: '4' }, // Rundown -> Coverage specs (What to shoot)
            { id: 'e4-5', source: '4', target: '5' }, // Specs -> Crew
            { id: 'e5-6', source: '5', target: '6' }, // Crew -> Editing (Workflow)
            { id: 'e6-7', source: '6', target: '7' }, // Editing -> Delivery
        ]
    },
    {
        id: 'scale',
        title: 'Escala & Optimización',
        desc: 'Para crecer sin caos. Detectar ganadores, replicar lo rentable y escalar inversión con IA.',
        icon: Sparkles,
        color: 'bg-indigo-600',
        nodes: [
            // 1. ANÁLISIS DE RESULTADOS
            { id: '1', type: 'analitica', x: 400, y: 50, data: { title: 'Análisis de Resultados', kpi: 'ROAS / CPA', status: 'En Proceso', subtitle: 'Detectar Ganadores' } },

            // 2. CONTENIDO GANADOR
            { id: '2', type: 'estrategia', x: 200, y: 250, data: { title: 'Contenido Ganador', subtitle: 'Top Performers', desc: 'Qué creativos están convirtiendo más.' } },

            // 3. REPLICACIÓN INTELIGENTE
            { id: '3', type: 'produccion', x: 200, y: 450, data: { title: 'Replicación Inteligente', subtitle: 'Iteraciones / Variaciones', desc: 'Crear versiones del ganador (Hooks/Formatos).' } },

            // 4. AUMENTO DE INVERSIÓN
            { id: '4', type: 'ads', x: 600, y: 250, data: { title: 'Aumento de Inversión', subtitle: 'Escalado Vertical', desc: 'Más presupuesto a lo que funciona.' } },

            // 5. OPTIMIZACIÓN CON IA
            { id: '5', type: 'automatizacion', x: 600, y: 450, data: { title: 'Optimización con IA', subtitle: 'Públicos / Segmentación', desc: 'Ajuste fino para evitar fatiga.' } },

            // 6. DECISIÓN FINAL
            { id: '6', type: 'objetivo', x: 400, y: 650, data: { title: 'Decisión Final', subtitle: 'Escalar / Mantener / Pausar', desc: 'Control total del crecimiento.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Analysis -> Winning Content
            { id: 'e1-4', source: '1', target: '4' }, // Analysis -> Budget Increase
            { id: 'e2-3', source: '2', target: '3' }, // Winning Content -> Replication
            { id: 'e4-5', source: '4', target: '5' }, // Budget -> Optimization
            { id: 'e3-6', source: '3', target: '6' }, // Replication -> Decision
            { id: 'e5-6', source: '5', target: '6' }, // Optimization -> Decision
        ]
    },
    {
        id: 'capacity',
        title: 'Escalado & Capacidad',
        desc: 'Saber cuándo crecer, cuándo pausar y cuándo decir NO. Gestión del crecimiento sin colapso.',
        icon: ShieldAlert,
        color: 'bg-red-600',
        nodes: [
            // 1. CAPACIDAD OPERATIVA
            { id: '1', type: 'analitica', x: 400, y: 50, data: { title: 'Capacidad Operativa', kpi: 'Proyectos / Semana', status: 'Diagnóstico', subtitle: 'Carga Máxima Actual' } },

            // 2. ESTADO DEL EQUIPO
            { id: '2', type: 'analitica', x: 400, y: 250, data: { title: 'Estado del Equipo', subtitle: 'Burnout / Disponibilidad', desc: 'Monitor de salud del equipo.' } },

            // 3. PRIORIZACIÓN DE CLIENTES
            { id: '3', type: 'estrategia', x: 200, y: 450, data: { title: 'Priorización', subtitle: 'Premium / Recurrente', desc: 'Clasificación estratégica.' } },

            // 4. ALERTAS DE RIESGO
            { id: '4', type: 'objetivo', x: 600, y: 450, data: { title: 'Alertas de Riesgo', subtitle: 'Saturación Imminente', desc: 'Avisos automáticos (>80%).' } },

            // 5. TIEMPOS DINÁMICOS
            { id: '5', type: 'automatizacion', x: 200, y: 650, data: { title: 'Tiempos Dinámicos', subtitle: 'Ajuste de Fechas', desc: 'Adaptación a la demanda.' } },

            // 6. ESCALADO INTELIGENTE
            { id: '6', type: 'estrategia', x: 400, y: 850, data: { title: 'Escalado Inteligente', subtitle: 'Subir Tarifas / Waitlist', desc: 'Crecimiento controlado.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Capacity -> Team Status
            { id: 'e2-3', source: '2', target: '3' }, // Team Status -> Prioritization
            { id: 'e2-4', source: '2', target: '4' }, // Team Status -> Risk Alerts
            { id: 'e3-5', source: '3', target: '5' }, // Prioritization -> Dynamic Times
            { id: 'e4-6', source: '4', target: '6' }, // Risk Alerts -> Intelligent Scaling
            { id: 'e5-6', source: '5', target: '6' }, // Dynamic Times -> Intelligent Scaling
        ]
    },
    {
        id: 'reputation',
        title: 'Reputación & Calidad',
        desc: 'Evaluación de desempeño, blindaje de clientes y crecimiento profesional. Mentalidad SaaS empresarial.',
        icon: Users,
        color: 'bg-yellow-600',
        nodes: [
            // 1. PERFIL DE REPUTACIÓN
            { id: '1', type: 'analitica', x: 400, y: 50, data: { title: 'Perfil de Reputación', kpi: 'Nivel 1-5', status: 'Activo', subtitle: 'Creativo / Proveedor' } },

            // 2. MÉTRICAS DE EVALUACIÓN
            { id: '2', type: 'analitica', x: 200, y: 250, data: { title: 'Métricas Evaluación', subtitle: 'Calidad / Puntualidad', desc: 'KPIs de desempeño real.' } },

            // 3. CÁLCULO DE NIVEL
            { id: '3', type: 'automatizacion', x: 600, y: 250, data: { title: 'Cálculo de Nivel', subtitle: 'Algoritmo Automático', desc: 'Sube o baja según KPIs.' } },

            // 4. PROTECCIÓN DE CLIENTE
            { id: '4', type: 'estrategia', x: 400, y: 450, data: { title: 'Protección Cliente', subtitle: 'Blindaje / Seguridad', desc: 'Anti-robo y centralización.' } },

            // 5. BENEFICIOS POR NIVEL
            { id: '5', type: 'objetivo', x: 200, y: 650, data: { title: 'Beneficios por Nivel', subtitle: 'Incentivos / Pagos', desc: 'Más nivel = Mejores proyectos.' } },

            // 6. CONEXIÓN ACADEMIA
            { id: '6', type: 'estrategia', x: 600, y: 650, data: { title: 'Conexión Academia', subtitle: 'Formación / Mejora', desc: 'Capacitación si baja nivel.' } },

            // 7. REVISIÓN PERIÓDICA
            { id: '7', type: 'evento', x: 400, y: 850, data: { title: 'Revisión Periódica', subtitle: 'Auditoría Mensual', desc: 'Feedback y ajustes.' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, // Profile -> Metrics
            { id: 'e1-3', source: '1', target: '3' }, // Profile -> Level Calc
            { id: 'e2-3', source: '2', target: '3' }, // Metrics -> Level Calc
            { id: 'e1-4', source: '1', target: '4' }, // Profile -> Protection (Rules apply to profile)
            { id: 'e3-5', source: '3', target: '5' }, // Level -> Benefits
            { id: 'e3-6', source: '3', target: '6' }, // Level -> Academy (If low)
            { id: 'e3-7', source: '3', target: '7' }, // Level -> Periodic Review
        ]
    },
    {
        id: 'medical',
        title: 'Especialista Médico / Salud',
        desc: 'Estrategia de autoridad y confianza para doctores y clínicas. Captación de pacientes cualificados.',
        icon: ShieldAlert,
        color: 'bg-blue-600',
        nodes: [
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Captación Pacientes', kpi: 'Citas Confirmadas', status: 'Prioridad Alta' } },
            { id: '2', type: 'educativo', x: 200, y: 250, data: { title: 'Contenido de Valor', subtitle: 'Patologías / Tratamientos', desc: 'Educa para generar confianza.' } },
            { id: '3', type: 'testimonio', x: 600, y: 250, data: { title: 'Prueba Social', subtitle: 'Testimonios de Pacientes', desc: 'Validación de resultados.' } },
            { id: '4', type: 'promocion', x: 400, y: 450, data: { title: 'Valoración Gratuita', subtitle: 'Lead Magnet de Salud', desc: 'Entrada al embudo médico.' } },
            { id: '5', type: 'cta', x: 400, y: 650, data: { title: 'Agendamiento WhatsApp', subtitle: 'Cierre con Secretaría', desc: 'Directo a la agenda.' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }, { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    },
    {
        id: 'restaurant',
        title: 'Restaurante / Gastronomía',
        desc: 'Estrategia de antojo para llenar mesas y potenciar el delivery.',
        icon: Utensils,
        color: 'bg-orange-500',
        nodes: [
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Aumento de Reservas', kpi: 'Cubiertos / Mes', status: 'Activo' } },
            { id: '2', type: 'entretenimiento', x: 200, y: 250, data: { title: 'Food Porn / Reels', subtitle: 'Experiencia Visual', desc: 'Antojo puro en alta calidad.' } },
            { id: '3', type: 'informativo', x: 600, y: 250, data: { title: 'Menú & Ubicación', subtitle: 'Info Básica', desc: 'Cómo llegar y qué comer.' } },
            { id: '4', type: 'oferta', x: 400, y: 450, data: { title: 'Promo 2x1 / Evento', subtitle: 'Gancho de Tráfico', desc: 'Motivo para visitarnos HOY.' } },
            { id: '5', type: 'cta', x: 400, y: 650, data: { title: 'Reserva Online', subtitle: 'Link en Bio / Google', desc: 'Fácil, rápido y medible.' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-4', source: '2', target: '4' }, { id: 'e3-4', source: '3', target: '4' },
            { id: 'e4-5', source: '4', target: '5' }
        ]
    },
    {
        id: 'personal_brand',
        title: 'Marca Personal / Infoproducto',
        desc: 'Estrategia de autoridad para vender mentorías, cursos o servicios premium.',
        icon: User,
        color: 'bg-indigo-600',
        nodes: [
            { id: '1', type: 'objetivo', x: 400, y: 50, data: { title: 'Posicionamiento Experto', kpi: 'Marca / Leads VIP', status: 'Alta' } },
            { id: '2', type: 'storytelling', x: 200, y: 250, data: { title: 'Mi Historia de Valor', subtitle: 'Conexión Humana', desc: 'Por qué hago lo que hago.' } },
            { id: '3', type: 'educativo', x: 400, y: 250, data: { title: 'Masterclass / Webinar', subtitle: 'Entrega de Valor', desc: 'Demuestra que sabes de verdad.' } },
            { id: '4', type: 'testimonio', x: 600, y: 250, data: { title: 'Historias de Alumnos', subtitle: 'Resultados Extra', desc: 'Prueba de tu método.' } },
            { id: '5', type: 'oferta', x: 400, y: 450, data: { title: 'Mentoría / High Ticket', subtitle: 'Oferta Principal', desc: 'Solución premium.' } },
            { id: '6', type: 'cta', x: 400, y: 650, data: { title: 'Agendar Llamada', subtitle: 'Cierre por Zoom/WA', desc: 'Cualificación y venta.' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' }, { id: 'e1-4', source: '1', target: '4' },
            { id: 'e2-5', source: '2', target: '5' }, { id: 'e3-5', source: '3', target: '5' }, { id: 'e4-5', source: '4', target: '5' },
            { id: 'e5-6', source: '5', target: '6' }
        ]
    }
];

// MOCK INITIAL STRATEGY
const INITIAL_STRATEGY = {
    id: 'strat-demo-1',
    name: 'Demo Estrategia Pro',
    client: 'Cliente Demo',
    status: 'Activa',
    type: 'Ventas',
    version: 'v1.0',
    updated: 'Ahora mismo',
    nodes: [{ id: '1', type: 'objetivo', x: 400, y: 300, data: { title: 'Inicio Rápido', kpi: 'Definir KPI' } }],
    edges: []
};

export default function StrategyBoard({ role = 'cm', onApprove }) {
    const { setIsSuppressed } = useSidebar();
    // --- STATE ---

    // Core Strategy Data
    const [currentStrategy, setCurrentStrategy] = useState(INITIAL_STRATEGY);
    const [savedStrategies, setSavedStrategies] = useState([INITIAL_STRATEGY]);
    const [nodes, setNodes] = useState(currentStrategy.nodes);
    const [edges, setEdges] = useState(currentStrategy.edges);
    const [view, setView] = useState({ x: 0, y: 0, scale: 1 });

    // UI & Modal States
    const [isStrategiesModalOpen, setIsStrategiesModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isNodeLibraryOpen, setIsNodeLibraryOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editNameMode, setEditNameMode] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState('Guardado');

    // Strategic Pipeline States
    const [activePhase, setActivePhase] = useState('metas');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [pipelineStep, setPipelineStep] = useState(1); // 1: Metas, 2: Briefing, 3: Strategy
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Canvas Interaction States
    const [mode, setMode] = useState('select'); // 'select', 'connect', 'pan'
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState(null);
    const [connectionStart, setConnectionStart] = useState(null);
    const [dragState, setDragState] = useState({ isDragging: false, isPotentialDrag: false, startX: 0, startY: 0, originX: 0, originY: 0, targetId: null });
    
    // Wizard & External Data
    const [wizardStep, setWizardStep] = useState(1);
    const [newStratData, setNewStratData] = useState({ name: '', client: '', type: 'Ventas', template: 'sales' });
    
    const containerRef = useRef(null);
      // --- AI ASSISTANT STATE ---
    const [assistantStep, setAssistantStep] = useState(0);
    const [assistantData, setAssistantData] = useState({
        businessType: '',
        goal: '',
        contentType: '',
        productionLevel: ''
    });

    const generateAIStrategy = () => {
        const { businessType, goal } = assistantData;
        let newNodes = [];
        let newEdges = [];

        // BASE COORDINATES
        const centerX = 400;

        // LOGIC FOR "MÉDICO"
        if (businessType === 'Médico') {
            newNodes = [
                { id: 'n1', type: 'educativo', x: centerX, y: 50, data: { title: 'Educación Médica', objective: 'Generar confianza y autoridad.', status: 'Pendiente' } },
                { id: 'n2', type: 'experiencia', x: centerX - 200, y: 250, data: { title: 'Trayectoria Doctor', objective: 'Validar especialidad.', status: 'Pendiente' } },
                { id: 'n3', type: 'casos_reales', x: centerX + 200, y: 250, data: { title: 'Casos de Éxito', objective: 'Prueba social.', status: 'Pendiente' } },
                { id: 'n4', type: 'preguntas_frecuentes', x: centerX, y: 450, data: { title: 'Dudas Comunes', objective: 'Eliminar objeciones.', status: 'Pendiente' } },
                { id: 'n5', type: 'agenda_cita', x: centerX, y: 650, data: { title: 'Agenda Consulta', objective: 'Conversión final.', status: 'Pendiente' } },
            ];
            newEdges = [
                { id: 'e1-2', source: 'n1', target: 'n2' },
                { id: 'e1-3', source: 'n1', target: 'n3' },
                { id: 'e2-4', source: 'n2', target: 'n4' },
                { id: 'e3-4', source: 'n3', target: 'n4' },
                { id: 'e4-5', source: 'n4', target: 'n5' },
            ];
        } else {
            // GENERIC STRATEGY
            newNodes = [
                { id: 'n1', type: 'educativo', x: centerX, y: 50, data: { title: 'Contenido de Valor', status: 'Pendiente' } },
                { id: 'n2', type: 'testimonio', x: centerX, y: 250, data: { title: 'Prueba Social', status: 'Pendiente' } },
                { id: 'n3', type: 'promocion', x: centerX, y: 450, data: { title: 'Oferta Especial', status: 'Pendiente' } },
                { id: 'n4', type: 'cta', x: centerX, y: 650, data: { title: 'Llamada a la Acción', status: 'Pendiente' } },
            ];
            newEdges = [
                { id: 'e1-2', source: 'n1', target: 'n2' },
                { id: 'e2-3', source: 'n2', target: 'n3' },
                { id: 'e3-4', source: 'n3', target: 'n4' },
            ];
        }

        setNodes(newNodes);
        setEdges(newEdges);
        setStrategicPhase('construction');
        setAssistantStep(0);
    };

    const renderAIAssistant = () => {
        const steps = [
            {
                title: 'Tipo de Negocio',
                options: ['Médico', 'Empresa / Negocio', 'Marca Personal', 'Ecommerce', 'Restaurante'],
                field: 'businessType',
                icon: Briefcase
            },
            {
                title: '¿Qué quieres lograr?',
                options: ['Conseguir Clientes', 'Vender Productos', 'Posicionarme como Experto', 'Crecer en Redes', 'Lanzar un Servicio'],
                field: 'goal',
                icon: Target
            },
            {
                title: 'Tipo de Contenido',
                options: ['Video', 'Diseño / Posts', 'Reels / TikTok', 'Mixto'],
                field: 'contentType',
                icon: Clapperboard
            },
            {
                title: 'Nivel de Producción',
                options: ['Básico (Celular)', 'Medio', 'Profesional'],
                field: 'productionLevel',
                icon: Rocket
            }
        ];

        const current = steps[assistantStep - 1];

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-[#050511]/90 backdrop-blur-2xl" 
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative w-full max-w-4xl h-[600px] bg-white/5 border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[100px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[100px] -ml-48 -mb-48" />

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 flex gap-1 p-3">
                        {steps.map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i < assistantStep ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`} />
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col p-12 pt-16 h-full relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={assistantStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 flex flex-col"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-cyan-500/20 rounded-2xl text-cyan-400">
                                        <current.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">IA Strategist Assistant</p>
                                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{current.title}</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 flex-1 items-start">
                                    {current.options.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setAssistantData({ ...assistantData, [current.field]: opt });
                                                if (assistantStep < steps.length) {
                                                    setAssistantStep(assistantStep + 1);
                                                } else {
                                                    generateAIStrategy();
                                                }
                                            }}
                                            className={`group relative p-6 rounded-[24px] border-2 transition-all flex flex-col items-start gap-2 overflow-hidden ${assistantData[current.field] === opt ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:border-white/20'}`}
                                        >
                                            {assistantData[current.field] === opt && (
                                                <motion.div layoutId="assistant-active" className="absolute inset-0 bg-white" />
                                            )}
                                            <div className="relative z-10 flex w-full justify-between items-center">
                                                <span className={`text-lg font-black uppercase tracking-tighter italic ${assistantData[current.field] === opt ? 'text-black' : 'text-white'}`}>{opt}</span>
                                                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${assistantData[current.field] === opt ? 'text-black' : 'text-white/20'}`} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 pb-12 flex justify-between items-center border-t border-white/5 relative z-10">
                        <button 
                            onClick={() => assistantStep > 1 ? setAssistantStep(assistantStep - 1) : setAssistantStep(0)}
                            className="flex items-center gap-2 text-xs font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </button>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Step {assistantStep} of {steps.length}</p>
                    </div>
                </motion.div>
            </div>
        );
    };
    // --- SIDEBAR SUPPRESSION ---
    useEffect(() => {
        // Suppress sidebar conditionally in strategy phase if user prefers
        // For now, reverting to original always-visible behavior
        // setIsSuppressed(true);

        return () => setIsSuppressed(false);
    }, [setIsSuppressed]);

    // --- AUTO SAVE SIMULATION ---
    useEffect(() => {
        if (!currentStrategy) return;
        const timer = setTimeout(() => {
            setAutoSaveStatus('Guardando...');
            setTimeout(() => {
                const updatedList = savedStrategies.map(s =>
                    s.id === currentStrategy.id ? { ...s, nodes, edges, updated: 'Ahora mismo' } : s
                );
                setSavedStrategies(updatedList);
                setAutoSaveStatus('Guardado ✓');
            }, 800);
        }, 8000); // Simulate autosave interval
        return () => clearTimeout(timer);
    }, [nodes, edges]);

    // --- ACTIONS ---

    const loadStrategy = (strategy) => {
        setCurrentStrategy(strategy);
        setNodes(strategy.nodes);
        setEdges(strategy.edges);
        setView({ x: 0, y: 0, scale: 1 });
        setIsStrategiesModalOpen(false);
        setSelectedNodeId(null);
    };

    const handleCreateStrategy = () => {
        // if (!newStratData.name || newStratData.name.trim().length === 0) return; // Removed Validation
        const strategyName = newStratData.name && newStratData.name.trim().length > 0 ? newStratData.name : 'Nueva Estrategia';

        const template = STRATEGY_TEMPLATES.find(t => t.id === newStratData.template) || STRATEGY_TEMPLATES[0];
        const newStrat = {
            id: `strat-${Date.now()}`,
            name: strategyName,
            client: newStratData.client || 'Sin Cliente',
            type: newStratData.type || 'General',
            updated: 'Ahora mismo',
            status: 'Draft',
            version: 'v1.0',
            nodes: JSON.parse(JSON.stringify(template.nodes)), // Deep copy
            edges: JSON.parse(JSON.stringify(template.edges))
        };

        setSavedStrategies([newStrat, ...savedStrategies]);
        loadStrategy(newStrat);
        setIsCreateModalOpen(false);
        setNewStratData({ name: '', client: '', type: '', template: '' });
        setWizardStep(1);
    };

    // 🚀 BLUEPRINT GENERATOR
    const buildStrategyBlueprint = () => {
        setIsGenerating(true);
        
        // Simular inteligencia de construcción
        setTimeout(() => {
            const template = STRATEGY_TEMPLATES.find(t => t.id === selectedGoal) || STRATEGY_TEMPLATES[0];
            
            // Inyectar nodos y edges al canvas
            setNodes(template.nodes);
            setEdges(template.edges);
            
            setIsGenerating(false);
            setPipelineStep(3);
            setActivePhase('estrategia');
        }, 1500);
    };

    const handleNodeChange = (id, field, value) => {
        setCurrentStrategy(prev => ({ ...prev, name: newName }));
        setEditNameMode(false);
    };

    // --- ALGORITHMS (Auto-Layout) ---
    const autoLayout = () => {
        if (nodes.length === 0) return;
        // Simple BFS Layered Layout (Same as before)
        const adj = {}; const inDegree = {};
        nodes.forEach(n => { adj[n.id] = []; inDegree[n.id] = 0; });
        edges.forEach(e => { if (adj[e.source]) adj[e.source].push(e.target); if (inDegree[e.target] !== undefined) inDegree[e.target]++; });

        const levels = []; const visited = new Set();
        let queue = nodes.filter(n => inDegree[n.id] === 0);
        if (queue.length === 0 && nodes.length > 0) queue = [nodes[0]];
        const nodeLevels = {};
        queue.forEach(n => { nodeLevels[n.id] = 0; visited.add(n.id); });

        let currentLevel = 0;
        while (queue.length > 0) {
            const nextQueue = [];
            if (!levels[currentLevel]) levels[currentLevel] = [];
            for (const node of queue) {
                levels[currentLevel].push(node);
                const neighbors = adj[node.id] || [];
                for (const neighborId of neighbors) {
                    if (!visited.has(neighborId)) {
                        visited.add(neighborId);
                        nodeLevels[neighborId] = currentLevel + 1;
                        nextQueue.push(nodes.find(n => n.id === neighborId));
                    }
                }
            }
            if (nextQueue.length === 0 && visited.size < nodes.length) {
                const unvisited = nodes.find(n => !visited.has(n.id));
                if (unvisited) { visited.add(unvisited.id); nodeLevels[unvisited.id] = 0; levels[0] = levels[0] || []; levels[0].push(unvisited); }
            }
            queue = nextQueue; if (queue.length > 0) currentLevel++;
        }

        const LEVEL_WIDTH = 380; const NODE_HEIGHT = 180;
        const newNodes = nodes.map(node => {
            const levelIndex = nodeLevels[node.id] !== undefined ? nodeLevels[node.id] : 0;
            const nodesInLevel = levels[levelIndex] || [];
            const indexInLevel = nodesInLevel.findIndex(n => n.id === node.id);
            const totalHeight = nodesInLevel.length * NODE_HEIGHT;
            const startY = -(totalHeight / 2) + (NODE_HEIGHT / 2) + 400;
            const x = 100 + (levelIndex * LEVEL_WIDTH);
            const y = startY + (indexInLevel * NODE_HEIGHT);
            return { ...node, x, y };
        });
        setNodes(newNodes);
        if (newNodes.length > 0) setView({ x: -newNodes[0].x + 400, y: -newNodes[0].y + 300, scale: 1 });
    };

    // --- CANVAS ACTIONS ---
    const addNode = (type) => {
        const id = Math.random().toString(36).substr(2, 9);
        const centerX = (-view.x + (containerRef.current.clientWidth / 2)) / view.scale;
        const centerY = (-view.y + (containerRef.current.clientHeight / 2)) / view.scale;
        setNodes(prev => [...prev, { id, type, x: centerX - 128, y: centerY - 50, data: { title: `Nuevo ${NODE_TYPES[type].label}`, status: 'Pendiente', owner: 'Sin Asignar' } }]);
        setSelectedNodeId(id);
        setIsNodeLibraryOpen(false);
    };

    const updateNodeData = (id, newData) => setNodes(prev => prev.map(n => n.id === id ? { ...n, data: newData } : n));
    const deleteNode = (id) => { setNodes(prev => prev.filter(n => n.id !== id)); setEdges(prev => prev.filter(e => e.source !== id && e.target !== id)); setSelectedNodeId(null); };
    const deleteEdge = (id) => { setEdges(prev => prev.filter(e => e.id !== id)); setSelectedEdgeId(null); };

    // --- MOUSE HANDLERS (Same as before) ---
    const handleWheel = useCallback((e) => {
        if (e.ctrlKey) { e.preventDefault(); const delta = -e.deltaY * 0.001; setView(prev => ({ ...prev, scale: Math.min(Math.max(0.2, view.scale + delta), 3) })); }
        else { setView(prev => ({ ...prev, x: prev.x - e.deltaX, y: prev.y - e.deltaY })); }
    }, [view.scale]);

    const handleMouseDown = (e, nodeId = null) => {
        const isCM = role === 'cm';

        if (mode === 'connect' && nodeId && isCM) {
            e.stopPropagation();
            if (!connectionStart) { setConnectionStart(nodeId); }
            else { if (connectionStart !== nodeId) { const newEdge = { id: `e${connectionStart}-${nodeId}`, source: connectionStart, target: nodeId }; if (!edges.find(ed => ed.id === newEdge.id)) setEdges(prev => [...prev, newEdge]); setConnectionStart(null); setMode('select'); } else { setConnectionStart(null); } }
            return;
        }

        const isCanvas = !nodeId;
        if (mode === 'pan' || e.button === 1 || (e.button === 0 && isCanvas)) {
            setDragState({ isDragging: false, isPotentialDrag: true, startX: e.clientX, startY: e.clientY, originX: view.x, originY: view.y, targetId: 'canvas' });
            return;
        }

        if (mode === 'select' && nodeId && isCM) {
            e.stopPropagation();
            const node = nodes.find(n => n.id === nodeId);
            setDragState({ isDragging: false, isPotentialDrag: true, startX: e.clientX, startY: e.clientY, originX: node.x, originY: node.y, targetId: nodeId });
        }

        if (isCanvas) { setSelectedNodeId(null); setSelectedEdgeId(null); setConnectionStart(null); }
    };

    const handleMouseMove = (e) => {
        if (!dragState.isPotentialDrag) return;
        const dx = e.clientX - dragState.startX; const dy = e.clientY - dragState.startY;
        if (!dragState.isDragging && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) { setDragState(prev => ({ ...prev, isDragging: true })); }
        if (dragState.isDragging) { if (dragState.targetId === 'canvas') { setView(prev => ({ ...prev, x: dragState.originX + dx, y: dragState.originY + dy })); } else { const scaledDx = dx / view.scale; const scaledDy = dy / view.scale; setNodes(prev => prev.map(n => n.id === dragState.targetId ? { ...n, x: dragState.originX + scaledDx, y: dragState.originY + scaledDy } : n)); } }
    };
    const handleMouseUp = (e) => { if (dragState.isPotentialDrag) { if (!dragState.isDragging) { if (dragState.targetId !== 'canvas') { setSelectedNodeId(dragState.targetId); } else { setSelectedNodeId(null); } } setDragState({ isDragging: false, isPotentialDrag: false, startX: 0, startY: 0, originX: 0, originY: 0, targetId: null }); } };
    const handleEdgeClick = (e, edgeId) => { e.stopPropagation(); setSelectedEdgeId(edgeId); setSelectedNodeId(null); };

    // -- RENDER HELPERS --
    const getEdgePath = (sourceId, targetId) => {
        const source = nodes.find(n => n.id === sourceId);
        const target = nodes.find(n => n.id === targetId);
        if (!source || !target) return '';
        const sx = source.x + 128; const sy = source.y + 80;
        const tx = target.x + 128; const ty = target.y + 80;
        const dist = Math.abs(tx - sx) * 0.5;
        return `M ${sx} ${sy} C ${sx + dist} ${sy}, ${tx - dist} ${ty}, ${tx} ${ty}`;
    };
    const NodeIcon = ({ type }) => { const Icon = NODE_TYPES[type]?.icon || Target; return <Icon className="w-4 h-4 text-white/70" />; };

    // 🔌 UI COMPONENTS PER PHASE
    const renderMetasView = () => {
        if (!selectedGoal) {
            return (
                <div className="h-full flex flex-col items-center justify-center p-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                            Define tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Objetivo Maestro</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-lg">Selecciona el norte de tu estrategia para desbloquear el flujo de arquitectura.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                        {[
                            { id: 'sales', title: 'Ventas & Conversión', icon: Target, desc: 'Enfocado en ROI, pauta y cierre de clientes.', color: 'from-indigo-600 to-blue-600', glow: 'shadow-indigo-500/20' },
                            { id: 'brand', title: 'Autoridad & Marca', icon: Users, desc: 'Posicionamiento, legado y dominancia de nicho.', iconColor: 'text-purple-400', color: 'from-purple-600 to-fuchsia-600', glow: 'shadow-purple-500/20' },
                            { id: 'automation', title: 'Escala & Automatización', icon: Zap, desc: 'Sistemas, IA y eficiencia operativa.', iconColor: 'text-amber-400', color: 'from-amber-600 to-orange-600', glow: 'shadow-amber-500/20' }
                        ].map((goal) => (
                            <motion.button
                                key={goal.id}
                                whileHover={{ scale: 1.05, y: -10 }}
                                onClick={() => {
                                    setSelectedGoal(goal.id);
                                    setPipelineStep(1);
                                }}
                                className={`relative group bg-[#0E0E18]/80 backdrop-blur-xl border border-white/10 p-10 rounded-[42px] text-left transition-all hover:border-white/20 shadow-2xl ${goal.glow}`}
                            >
                                <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${goal.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <goal.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4">{goal.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">{goal.desc}</p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Iniciar Discovery <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full space-y-8 p-8 max-w-7xl mx-auto"
            >
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/30">Fase 01: Metas</span>
                            <div className="h-px w-8 bg-white/10" />
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Pipeline Activo</span>
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Panel de <span className="text-indigo-500">Inteligencia</span></h2>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setSelectedGoal(null)}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2"
                        >
                            <Edit3 className="w-4 h-4" /> Cambiar Meta
                        </button>
                        <button 
                            onClick={() => {
                                setPipelineStep(2);
                                setActivePhase('briefing');
                            }}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all group flex items-center gap-3"
                        >
                            Continuar al Briefing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    {/* Columna Izquierda: Detalles de la Meta */}
                    <div className="col-span-2 space-y-8">
                        {/* Meta Principal */}
                        <div className="bg-[#0E0E18]/60 backdrop-blur-xl border border-white/10 rounded-[42px] p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target className="w-32 h-32 text-indigo-500" />
                            </div>
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4 block">Objetivo Primario</label>
                            <input 
                                type="text" 
                                defaultValue={
                                    selectedGoal === 'sales' ? "Escalar Ventas en un 40% Q3" : 
                                    selectedGoal === 'brand' ? "Dominancia por Autoridad en Nicho Creativo" : 
                                    selectedGoal === 'automation' ? "Sistematización de Marketing & Ventas" :
                                    "Construir Autoridad en el Nicho"
                                }
                                className="bg-transparent border-none text-3xl font-black text-white w-full focus:outline-none focus:ring-0 placeholder:text-white/10 italic uppercase tracking-tighter"
                            />
                            <div className="mt-8 flex gap-4">
                                <div className="flex-1 bg-white/5 border border-white/5 p-5 rounded-2xl">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Métrica de Control</span>
                                    <span className="text-white font-bold">
                                        {selectedGoal === 'sales' ? "Conversiones CRM" : 
                                        selectedGoal === 'brand' ? "Authority Score (Manual)" : 
                                        selectedGoal === 'automation' ? "Eficiencia Operativa (OpEx)" : "Engagement Rate"}
                                    </span>
                                </div>
                                <div className="flex-1 bg-white/5 border border-white/5 p-5 rounded-2xl">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Timeline</span>
                                    <span className="text-white font-bold">
                                        {selectedGoal === 'brand' ? "180 Días" : 
                                        selectedGoal === 'automation' ? "365 Días" : "90 Días"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* KPI Card */}
                        <div className="bg-indigo-600 rounded-[42px] p-10 shadow-2xl shadow-indigo-900/40 flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <TrendingUp className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-2">KPI Maestro</h3>
                                <p className="text-indigo-200 text-sm font-medium">
                                    {selectedGoal === 'sales' ? "Costo por Adquisición (CPA) Máximo: $15.00" : 
                                    selectedGoal === 'brand' ? "Incremento de Menciones Orgánicas: +150%" : 
                                    selectedGoal === 'automation' ? "Reducción de Tiempo Manual: -70%" :
                                    "Nuevos Seguidores Perfilados"}
                                </p>
                            </div>
                            <div className="mt-auto pt-8">
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-white rounded-full shadow-[0_0_10px_white]" />
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-[10px] font-black text-indigo-200 uppercase">Progreso Global</span>
                                    <span className="text-sm font-black text-white">65%</span>
                                </div>
                            </div>
                        </div>

                        {/* Hitos Clave */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CheckSquare className="w-4 h-4 text-cyan-400" /> Hitos Clave
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: selectedGoal === 'sales' ? 'Estructurar Oferta Irresistible' : selectedGoal === 'brand' ? 'Auditoría de Perfil & Estética' : selectedGoal === 'automation' ? 'Mapeo de Procesos Actuales' : 'Auditoría de Perfil & Bio', done: true },
                                    { label: selectedGoal === 'sales' ? 'Setup de Automatización de Leads' : selectedGoal === 'brand' ? 'Columna Vertebral de Contenido (Storytelling)' : selectedGoal === 'automation' ? 'Integración de Stack Tecnológico' : 'Definición de Pilares de Contenido', done: true },
                                    { label: selectedGoal === 'sales' ? 'Lanzamiento de Campañas Full-Funnel' : selectedGoal === 'brand' ? 'Webinar de Autoridad / Masterclass' : selectedGoal === 'automation' ? 'Despliegue de IA en Atención' : 'Creación de Lead Magnet de Autoridad', done: false },
                                    { label: selectedGoal === 'sales' ? 'Optimización de Creativos (Semana 2)' : selectedGoal === 'brand' ? 'PR & Alianzas Estratégicas' : selectedGoal === 'automation' ? 'Sincronización de Base de Datos' : 'Estrategia de Colaboraciones', done: false },
                                ].map((h, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
                                        <div className={`w-5 h-5 rounded-md border ${h.done ? 'bg-indigo-500 border-indigo-400' : 'border-white/20'} flex items-center justify-center`}>
                                            {h.done && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-sm font-bold ${h.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{h.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                {/* Columna Derecha: Resumen & Acción */}
                <div className="space-y-8">
                    <div className="bg-[#0E0E18]/60 backdrop-blur-xl border border-white/10 rounded-[42px] p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-50" />
                        
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Estado del Research</h4>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-indigo-500' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-widest">Sugerencia AI</span>
                            </div>
                            <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                                Basado en tu meta de {selectedGoal === 'sales' ? 'Ventas' : 'Autoridad'}, recomendamos priorizar la {selectedGoal === 'sales' ? 'captación omnicanal' : 'creación de contenido pilar'} antes de escalar.
                            </p>
                        </div>

                        <button 
                            onClick={buildStrategyBlueprint}
                            disabled={isGenerating}
                            className={`w-full py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl ${
                                isGenerating 
                                ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                                : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-white/10'
                            }`}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Generando Arquitectura...
                                </>
                            ) : (
                                <>
                                    Generar Estrategia <Sparkles className="w-4 h-4" />
                                </>
                            )}
                        </button>
                        
                        <p className="text-center text-[9px] text-gray-500 font-black uppercase tracking-widest">
                            {isGenerating ? 'Calculando nodos y conexiones óptimas...' : 'Este paso generará automáticamente tu blueprint en el lienzo.'}
                        </p>
                    </div>

                    <div className="px-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Análisis en Tiempo Real Activo</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
    };

    const renderBriefingView = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full p-12 max-w-6xl mx-auto"
        >
            <div className="flex justify-between items-start mb-16">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Fase 02: Research & Discovery</span>
                    </div>
                    <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                        Profundizando en <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">la Estrategia</span>
                    </h2>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest block">Proyecto Maestro</span>
                        <span className="text-white font-bold uppercase text-xs">
                            {selectedGoal === 'sales' ? 'Ventas Directas' : selectedGoal === 'brand' ? 'Autoridad de Marca' : 'Escala IA'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-12">
                    {/* Sección 1: Perfil */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20 italic">01</span>
                            <h3 className="text-xl font-black text-white uppercase italic">
                                {selectedGoal === 'sales' ? 'Oferta & Embudo' : selectedGoal === 'automation' ? 'Infraestructura & Procesos' : 'Esencia del Negocio'}
                            </h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    {selectedGoal === 'sales' ? '¿Cuál es la Oferta Irresistible?' : 
                                     selectedGoal === 'brand' ? '¿Cuál es el Legado de la Marca?' : 
                                     selectedGoal === 'automation' ? '¿Qué proceso consume más tiempo hoy?' : '¿Qué resolvemos mejor que nadie?'}
                                </label>
                                <textarea 
                                    className="w-full bg-transparent border-none text-xl font-bold text-white/80 focus:outline-none focus:ring-0 placeholder:text-white/10 resize-none h-24"
                                    placeholder="Define la propuesta de valor aquí..."
                                    defaultValue={
                                        selectedGoal === 'sales' ? "Programa de Acompañamiento 90 Días: De 0 a 20 Pacientes recurrentes garantizados." : 
                                        selectedGoal === 'brand' ? "Ser la voz líder en innovación creativa, inspirando a la próxima generación de directores de producción." :
                                        selectedGoal === 'automation' ? "El seguimiento de leads es manual y lento. Necesitamos un flujo automatizado que califique y agende sin intervención humana." :
                                        "Automatizamos la captura de pacientes mediante estrategias digitales que posicionan al médico como la única opción de autoridad."
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Canal Maestro</label>
                                    <div className="flex flex-wrap gap-2">
                                        {(selectedGoal === 'sales' ? ['Instagram Ads', 'WhatsApp Business', 'Venta Directa'] : 
                                          selectedGoal === 'brand' ? ['YouTube', 'LinkedIn', 'Events'] : 
                                          selectedGoal === 'automation' ? ['CRM / Automation', 'Webhooks', 'IA Agents'] : ['YouTube', 'Podcast', 'LinkedIn']).map(t => (
                                            <span key={t} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedGoal === 'brand' ? 'Personalidad' : selectedGoal === 'automation' ? 'Integraciones' : 'Garantía'}</label>
                                    <p className="text-white font-bold uppercase text-sm">
                                        {selectedGoal === 'brand' ? 'Maverick / Líder Visionario' : 
                                         selectedGoal === 'automation' ? 'Zapier / Make / Cloud' : 'Satisfacción o Retorno de Inversión'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Audiencia */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20 italic">02</span>
                            <h3 className="text-xl font-black text-white uppercase italic">Audiencia Ideal (Avatar)</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 grid grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <p className="text-3xl font-black text-white italic">35-55</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase">Rango de Edad</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl font-black text-white italic">A/B+</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase">Nivel Socioec.</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl font-black text-white italic">ALTA</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase">Intención Compra</p>
                            </div>
                            <div className="col-span-3 pt-6 border-t border-white/5">
                                <p className="text-sm font-medium text-gray-400 leading-relaxed italic">
                                    "Personas con una dolencia crónica que ya han probado soluciones básicas y buscan una alternativa profesional, tecnológica y de alta confianza."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Activos & Recursos */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20 italic">03</span>
                            <h3 className="text-xl font-black text-white uppercase italic">Activos & Recursos Requeridos</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Material de Archivo (Raw)', icon: Video, color: 'text-blue-400' },
                                { label: 'Manual de Marca / Identidad', icon: Layers, color: 'text-purple-400' },
                                { label: 'Acceso a Business Manager', icon: Settings, color: 'text-emerald-400' },
                                { label: 'Lead Magnet / PDF / Workshop', icon: FileText, color: 'text-amber-400' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                                    <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-tight">{item.label}</span>
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto opacity-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Resumen & Acción */}
                <div className="space-y-12">
                    {/* Resumen de Briefing */}
                    <div className="bg-[#0E0E18]/60 backdrop-blur-xl border border-white/10 rounded-[42px] p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent opacity-50" />
                        
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Análisis de Briefing</h4>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <Lightbulb className="w-5 h-5 text-purple-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-widest">Insight Clave</span>
                            </div>
                            <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                                La audiencia busca soluciones definitivas y confía en la autoridad. El contenido debe ser educativo y testimonial, validando la experiencia.
                            </p>
                        </div>

                        <button 
                            onClick={buildStrategyBlueprint}
                            disabled={isGenerating}
                            className={`w-full py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl ${
                                isGenerating 
                                ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                                : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-white/10'
                            }`}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Generando Arquitectura...
                                </>
                            ) : (
                                <>
                                    Generar Estrategia <Sparkles className="w-4 h-4" />
                                </>
                            )}
                        </button>
                        
                        <p className="text-center text-[9px] text-gray-500 font-black uppercase tracking-widest">
                            {isGenerating ? 'Calculando nodos y conexiones óptimas...' : 'Este paso generará automáticamente tu blueprint en el lienzo.'}
                        </p>
                    </div>

                    {/* Stakeholders */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" /> Stakeholders
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20" />
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase">Dicson Espinel</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Director Creativo</p>
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold uppercase">Owner</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div
            className={`h-full w-full bg-[#050511] relative overflow-hidden outline-none ${mode === 'pan' || dragState.targetId === 'canvas' ? 'cursor-grab active:cursor-grabbing' : ''}`}
            ref={containerRef} onWheel={handleWheel} onMouseDown={(e) => handleMouseDown(e, null)} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} tabIndex={0}
        >
            {/* HEADER ESTRATÉGICO */}
            <header className="fixed top-0 left-0 right-0 h-24 bg-[#0A0A0F]/80 backdrop-blur-2xl border-b border-white/5 z-[100] px-12 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-[18px] flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Strategy <span className="text-indigo-500">Board</span></h1>
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em] mt-1">Intelligence Division</p>
                        </div>
                    </div>

                    {/* PIPELINE STEPPER */}
                    {activePhase !== 'estrategia' && (
                        <nav className="flex items-center gap-1">
                            {[
                                { id: 'metas', label: 'Discovery', step: 1 },
                                { id: 'briefing', label: 'Research', step: 2 },
                                { id: 'estrategia', label: 'Architecture', step: 3 }
                            ].map((p, i) => (
                                <React.Fragment key={p.id}>
                                    <button
                                        onClick={() => setActivePhase(p.id)}
                                        className={`group flex items-center gap-3 px-6 py-2 rounded-full transition-all ${
                                            activePhase === p.id 
                                            ? 'bg-white/10 border border-white/10 shadow-lg' 
                                            : 'hover:bg-white/5'
                                        }`}
                                    >
                                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black italic transition-all ${
                                            activePhase === p.id ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-500 group-hover:bg-white/20'
                                        }`}>
                                            0{p.step}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                            activePhase === p.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                                        }`}>
                                            {p.label}
                                        </span>
                                    </button>
                                    {i < 2 && <div className="w-8 h-px bg-white/5" />}
                                </React.Fragment>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    {/* Role-based label */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl mr-4">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-black text-white uppercase tracking-tighter">
                            {role === 'cm' ? 'Estrategia Pro' : 'Mi Estrategia'}
                        </span>
                    </div>

                    {activePhase !== 'estrategia' && (
                        <div className="flex items-center bg-[#0E0E18]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-xl">
                            {[
                                { id: 'metas', label: 'Discovery', icon: Target },
                                { id: 'briefing', label: 'Research', icon: Briefcase },
                                { id: 'estrategia', label: 'Architecture', icon: Move }
                            ].map(phase => (
                                <button
                                    key={phase.id}
                                    onClick={() => setActivePhase(phase.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activePhase === phase.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    <phase.icon className="w-4 h-4" />
                                    <span className="hidden xl:block">{phase.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="h-8 w-px bg-white/10 mx-2"></div>

                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-[#0E0E18]/50 px-3 py-1.5 rounded-full border border-white/5">
                        <span className={`w-2 h-2 rounded-full ${autoSaveStatus.includes('Guardando') ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                        {autoSaveStatus}
                    </div>
                </div>
            </header>

            {/* --- CORE CONTENT RENDERING --- */}
            {activePhase === 'metas' && renderMetasView()}
            {activePhase === 'briefing' && renderBriefingView()}

            {activePhase === 'estrategia' && (
                <>
                    {/* --- CANVAS CONTENT (Same as before) --- */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: `${30 * view.scale}px ${30 * view.scale}px`, backgroundPosition: `${view.x}px ${view.y}px` }} />
                    <div className="absolute top-0 left-0 w-full h-full transform-origin-top-left" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
                        <svg className="absolute top-0 left-0 w-1 h-1 overflow-visible pointer-events-none z-0">
                            {edges.map(edge => {
                                const isSelected = selectedEdgeId === edge.id;
                                return (
                                    <g key={edge.id} className="pointer-events-auto cursor-pointer group" onClick={(e) => handleEdgeClick(e, edge.id)}>
                                        <path d={getEdgePath(edge.source, edge.target)} stroke="transparent" strokeWidth="20" fill="none" />
                                        <path d={getEdgePath(edge.source, edge.target)} stroke={isSelected ? "#EF4444" : "#4b5563"} strokeWidth={isSelected ? "4" : "3"} fill="none" className="transition-colors duration-300 opacity-60 group-hover:stroke-blue-400" />
                                    </g>
                                );
                            })}
                        </svg>
                        {nodes.map(node => {
                            const typeConfig = NODE_TYPES[node.type] || NODE_TYPES.objetivo;
                            const isSelected = selectedNodeId === node.id;
                            const isConnectingSource = connectionStart === node.id;
                            return (
                                <motion.div
                                    key={node.id}
                                    className={`absolute w-64 p-0 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out group
                                        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#050511] border-white z-50' : 'border-white/10 hover:border-white/30 z-10'}
                                        ${isConnectingSource ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-[#050511] shadow-[0_0_50px_rgba(59,130,246,0.5)]' : ''}
                                        bg-[#0E0E18]/90
                                        ${mode === 'select' ? 'cursor-grab active:cursor-grabbing' : ''}
                                        ${mode === 'connect' ? 'cursor-crosshair' : ''}
                                    `}
                                    style={{ left: node.x, top: node.y }}
                                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className={`h-2 w-full rounded-t-2xl ${typeConfig.color}`} />
                                    <div className="p-4">
                                        <div className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex justify-between items-center">
                                            <div className="flex items-center gap-1.5">
                                                <NodeIcon type={node.type} />
                                                <span>{typeConfig.label}</span>
                                            </div>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded bg-white/10`}>{node.data.status}</span>
                                        </div>
                                        <h3 className="text-white font-bold text-lg leading-tight mt-2 mb-1 pointer-events-none">{node.data.title}</h3>
                                        {node.data.subtitle && <p className="text-gray-400 text-xs pointer-events-none">{node.data.subtitle}</p>}
                                        <div className="mt-4 flex items-center justify-between pointer-events-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20"></div>
                                                <span className="text-[10px] text-gray-400 pointer-events-none">{node.data.owner || 'DIIC User'}</span>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
                                                className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* --- STRATEGY MANAGER MODAL --- */}
            <AnimatePresence>
                {isStrategiesModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                        <div className="bg-[#0E0E18] border border-white/10 rounded-2xl w-full max-w-6xl h-[85vh] flex shadow-2xl overflow-hidden">
                            {/* Sidebar */}
                            <div className="w-64 bg-[#13131f] border-r border-white/5 p-6 flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-white mb-6">Mis Estrategias</h2>
                                <button className="flex items-center gap-3 px-4 py-3 bg-white/5 text-white rounded-xl font-bold text-sm border border-white/10 shadow-lg">
                                    <Clock className="w-4 h-4 text-blue-400" /> Recientes
                                </button>
                                <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-colors">
                                    <Users className="w-4 h-4" /> Por Cliente
                                </button>
                                <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-colors">
                                    <FolderOpen className="w-4 h-4" /> Archivadas
                                </button>
                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-colors">
                                        <Download className="w-4 h-4" /> Exportar Todo
                                    </button>
                                </div>
                            </div>

                            {/* Main Grid */}
                            <div className="flex-1 p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="relative w-96">
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                        <input type="text" placeholder="Buscar estrategia, cliente..." className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <button onClick={() => { setIsStrategiesModalOpen(false); setIsCreateModalOpen(true); }} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Nueva Estrategia
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
                                    {savedStrategies.map(strat => (
                                        <div key={strat.id} onClick={() => loadStrategy(strat)} className="bg-[#1A1A24] border border-white/5 rounded-xl p-6 hover:border-blue-500/50 hover:translate-y-[-2px] transition-all cursor-pointer group relative overflow-hidden h-48 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${strat.type === 'Ventas' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                    <Target className="w-5 h-5" />
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${strat.status === 'Activa' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-gray-500/30 text-gray-400'}`}>{strat.status}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">{strat.name}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{strat.client}</p>

                                            <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-3">
                                                <span className="flex items-center gap-1"><History className="w-3 h-3" /> {strat.updated}</span>
                                                <span className="flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> {strat.nodes.length} Componentes</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => setIsStrategiesModalOpen(false)} className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-white/20"><X className="w-5 h-5" /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- CREATE WIZARD MODAL --- */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                        <div className="bg-[#0E0E18] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#13131f]">
                                <h2 className="text-xl font-bold text-white">Crear Nueva Estrategia</h2>
                                <button onClick={() => setIsCreateModalOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                                {/* NAME & CLIENT */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase">Nombre de la Estrategia <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={newStratData.name}
                                            onChange={(e) => setNewStratData({ ...newStratData, name: e.target.value })}
                                            placeholder="Ej: Campaña Black Friday 2026"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white font-medium focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                        {newStratData.name && newStratData.name.length < 4 && <p className="text-xs text-red-400">El nombre es muy corto</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase">Cliente / Marca</label>
                                        <select
                                            value={newStratData.client}
                                            onChange={(e) => setNewStratData({ ...newStratData, client: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white font-medium focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Seleccionar Cliente...</option>
                                            <option value="Interno">Marca Propia (Interno)</option>
                                            <option value="Cliente A">Cliente A</option>
                                            <option value="Cliente B">Cliente B</option>
                                        </select>
                                    </div>
                                </div>

                                {/* STRATEGY TYPE */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase">Tipo de Estrategia</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Ventas', 'Reconocimiento', 'Lanzamiento', 'Contenido'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setNewStratData({ ...newStratData, type })}
                                                className={`p-3 rounded-xl border text-sm font-bold transition-all ${newStratData.type === type ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* TEMPLATE SELECTION */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase">Plantilla Base <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {STRATEGY_TEMPLATES.map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => setNewStratData({ ...newStratData, template: template.id })}
                                                className={`p-4 rounded-xl border text-left transition-all group relative overflow-hidden ${newStratData.template === template.id ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                            >
                                                <div className="flex items-start gap-3 relative z-10">
                                                    <div className={`p-2 rounded-lg ${template.color} text-white`}>
                                                        <template.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold ${newStratData.template === template.id ? 'text-blue-400' : 'text-white'}`}>{template.title}</h4>
                                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{template.desc}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-[#13131f] flex justify-end gap-3">
                                <button onClick={() => setIsCreateModalOpen(false)} className="px-6 py-3 rounded-xl text-gray-400 font-bold text-sm hover:bg-white/5 hover:text-white transition-colors">Cancelar</button>
                                <button
                                    onClick={handleCreateStrategy}
                                    // disabled={!newStratData.name || newStratData.name.trim().length === 0}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2"
                                >
                                    Crear Estrategia <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- TOOLBAR --- */}
            {role === 'cm' && activePhase !== 'objective' && (
                <div className="absolute top-28 left-8 flex flex-col gap-3 z-40">
                    <div className="bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-2">
                        <button 
                            onClick={() => setIsNodeLibraryOpen(!isNodeLibraryOpen)} 
                            className={`p-3 rounded-xl transition-all shadow-lg ${isNodeLibraryOpen ? 'bg-indigo-600 text-white shadow-indigo-900/40' : 'bg-[#1a1a2e] text-indigo-400 hover:bg-indigo-600 hover:text-white'}`} 
                            title="Añadir Componentes"
                        > 
                            <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" /> 
                        </button>
                        <div className="h-px bg-white/10 w-full my-1"></div>
                        <button className={`p-3 rounded-xl transition-colors ${mode === 'select' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10'}`} onClick={() => { setMode('select'); setConnectionStart(null); }} title="Seleccionar"> <MousePointer2 className="w-5 h-5" /> </button>
                        <button className={`p-3 rounded-xl transition-colors ${mode === 'connect' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10'}`} onClick={() => setMode('connect')} title="Conectar"> <LinkIcon className="w-5 h-5" /> </button>
                        <button className={`p-3 rounded-xl transition-colors ${mode === 'pan' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10'}`} onClick={() => { setMode('pan'); setConnectionStart(null); }} title="Mano"> <Move className="w-5 h-5" /> </button>
                        <div className="h-px bg-white/10 w-full my-1"></div>
                        <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative group" onClick={autoLayout} title="Auto-Organizar">
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <div className="h-px bg-white/10 w-full my-1"></div>
                        <button 
                            onClick={() => setIsStrategiesModalOpen(true)} 
                            className="p-3 text-indigo-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors" 
                            title="Mis Estrategias"
                        >
                            <FolderOpen className="w-5 h-5" />
                        </button>
                        <div className="h-px bg-white/10 w-full my-1"></div>
                        <button 
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
                            className={`p-3 rounded-xl transition-colors ${isSettingsOpen ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/40' : 'text-gray-500 hover:text-amber-400 hover:bg-white/10'}`} 
                            title="Configuración de Estrategia"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}


            {/* --- ZOOM CONTROLS --- */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center gap-4 shadow-2xl z-40">
                <button onClick={() => setView(prev => ({ ...prev, scale: Math.max(0.2, prev.scale - 0.1) }))} className="p-2 text-gray-400 hover:text-white transition-colors"> <ZoomOut className="w-4 h-4" /> </button>
                <span className="text-xs font-mono text-gray-500 w-12 text-center">{Math.round(view.scale * 100)}%</span>
                <button onClick={() => setView(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.1) }))} className="p-2 text-gray-400 hover:text-white transition-colors"> <ZoomIn className="w-4 h-4" /> </button>
            </div>

            {/* --- PHASE VIEWS --- */}
            {activePhase === 'objective' && (
                <div className="absolute inset-0 z-30 bg-[#050511] flex flex-col items-center justify-center p-10 overflow-y-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full text-center mb-10">
                        <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
                            <Target className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 tracking-tight italic">Define tu Objetivo Maestro</h2>
                        <p className="text-gray-400 text-lg">¿Qué quieres lograr con esta estrategia? El cerebro de DIIC ZONE se adaptará a tu meta.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                        {[
                            { id: 'sales', title: 'Ventas & Conversión', desc: 'Transformar contenido en ingresos directos y citas.', color: 'bg-emerald-600', icon: Target },
                            { id: 'brand', title: 'Autoridad & Marca', desc: 'Posicionarte como el experto número 1 en tu nicho.', color: 'bg-indigo-600', icon: Users },
                            { id: 'automation', title: 'Escala & Automatización', desc: 'Sistematizar tu marketing para crecer sin caos.', color: 'bg-teal-600', icon: BrainCircuit }
                        ].map(obj => (
                            <button
                                key={obj.id}
                                onClick={() => { setSelectedGoal(obj.id); setActivePhase('briefing'); setPipelineStep(2); }}
                                className="group relative bg-[#0E0E18] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/50 hover:bg-white/5 transition-all text-left shadow-2xl"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${obj.color}/20 flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                                    <obj.icon className={`w-7 h-7 ${obj.color.replace('bg-', 'text-')}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{obj.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{obj.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- NODE LIBRARY OVERLAY --- */}
            <AnimatePresence>
                {isNodeLibraryOpen && (
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        className="absolute left-6 top-6 bottom-6 w-[400px] bg-[#050511]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        <div className="p-8 pb-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Componentes</h3>
                                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em] mt-1">Arquitectura de Marketing</p>
                            </div>
                            <button onClick={() => setIsNodeLibraryOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-500 transition-all"> <X className="w-5 h-5" /> </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-8 custom-scrollbar">
                            {Object.entries(NODE_CATEGORIES).map(([catId, cat]) => (
                                <div key={catId} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl bg-white/5 ${cat.color.replace('bg-', 'text-')}`}>
                                            <cat.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{cat.label}</h4>
                                            <p className="text-[8px] text-gray-500 italic uppercase font-bold tracking-widest">{cat.desc}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.entries(NODE_TYPES)
                                            .filter(([_, type]) => type.category === catId)
                                            .map(([typeId, type]) => (
                                                <button 
                                                    key={typeId}
                                                    onClick={() => {
                                                        addNode(typeId);
                                                        setIsNodeLibraryOpen(false);
                                                    }}
                                                    className="group p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all text-left"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg ${type.color}`}>
                                                                <type.icon className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="text-xs font-black text-white uppercase italic tracking-tighter">{type.label}</span>
                                                        </div>
                                                        <Plus className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                                    </div>
                                                    <p className="text-[10px] text-white/40 leading-relaxed font-medium mb-2">{type.desc}</p>
                                                    {type.example && (
                                                        <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                                                            <p className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest mb-1">Ejemplo IA:</p>
                                                            <p className="text-[9px] text-white/60 italic leading-snug">"{type.example}"</p>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- AI ASSISTANT MODAL --- */}
            <AnimatePresence>
                {assistantStep > 0 && renderAIAssistant()}
            </AnimatePresence>

            {/* --- NODE EDITOR OVERLAY --- */}
            <AnimatePresence>
                {selectedNodeId && nodes.find(n => n.id === selectedNodeId) && (
                    <motion.div 
                        initial={{ x: 500, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        exit={{ x: 500, opacity: 0 }}
                        className="absolute right-8 top-24 bottom-24 w-[450px] z-50 pointer-events-none"
                    >
                        <div 
                            className="h-full w-full pointer-events-auto"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <StrategyNodeEditor 
                                node={nodes.find(n => n.id === selectedNodeId)}
                                onClose={() => setSelectedNodeId(null)}
                                onUpdate={updateNodeData}
                                onDelete={deleteNode}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- GLOBAL SETTINGS OVERLAY --- */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="absolute inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-8 pointer-events-none"
                    >
                        <div className="bg-[#0E0E18] border border-white/10 rounded-3xl w-full max-w-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto">
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div>
                                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Gestión de Estrategia</h2>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Configuración Maestra</p>
                                </div>
                                <button onClick={() => setIsSettingsOpen(false)} className="p-3 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-10 space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Acciones de Limpieza</label>
                                    <div className="grid grid-cols-1 gap-4">
                                        <button 
                                            onClick={() => { if(confirm("¿Seguro que quieres borrar TODOS los componentes?")) { setNodes([]); setEdges([]); setIsSettingsOpen(false); } }}
                                            className="group flex items-center gap-4 bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl hover:bg-amber-500/10 transition-all text-left"
                                        >
                                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                                                <History className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-amber-400">Limpiar Pizarra</h4>
                                                <p className="text-xs text-gray-500">Borra todos los componentes y conexiones sin eliminar el proyecto.</p>
                                            </div>
                                        </button>

                                        <button 
                                            onClick={() => { if(confirm("¿Seguro que quieres eliminar esta estrategia por completo?")) { setSavedStrategies(prev => prev.filter(s => s.id !== currentStrategy.id)); setActivePhase('objective'); setIsSettingsOpen(false); } }}
                                            className="group flex items-center gap-4 bg-red-500/5 border border-red-500/20 p-5 rounded-2xl hover:bg-red-500/10 transition-all text-left"
                                        >
                                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500">
                                                <Trash2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-red-400">Eliminar Estrategia</h4>
                                                <p className="text-xs text-gray-500">Borra este archivo permanentemente y vuelve al inicio.</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex justify-center">
                                    <button onClick={() => setIsSettingsOpen(false)} className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all">
                                        Cerrar Ajustes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {mode === 'connect' && (
                <div className="absolute top-28 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 animate-bounce z-50 pointer-events-none">
                    <LinkIcon className="w-4 h-4" /> {connectionStart ? "¡Click en el destino!" : "Click en componente Origen"}
                </div>
            )}
        </div>
    );
}
