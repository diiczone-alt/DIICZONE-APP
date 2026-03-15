'use client';

import { motion } from 'framer-motion';
import {
    Users, ImageIcon, Mic, UploadCloud, Camera,
    Clapperboard, Star, Globe, Printer, Calendar,
    FileText, MessageSquare, LayoutDashboard, ArrowRight,
    BarChart3, Video, ShoppingBag, CheckCircle2, LayoutGrid
} from 'lucide-react';

const DEPARTMENT_CONTENT = {
    community: {
        icon: Users,
        title: "Community Manager",
        welcome: "👋 Hola, soy tu Community Manager",
        description: "Desde aquí coordinaremos tu contenido, publicaciones, campañas y reportes. Tu equipo creativo se encarga del trabajo, tú ves los resultados.",
        color: "blue",
        actions: [
            { label: "Ver mis proyectos", icon: FileText, mode: "projects" },
            { label: "Ver calendario", icon: Calendar, mode: "calendar" },
            { label: "Hablar con mi CM", icon: MessageSquare, mode: "chat" },
            { label: "Ver reportes", icon: BarChart3, mode: "reports" },
            { label: "Flujo de contenido", icon: LayoutDashboard, mode: "pipeline" }
        ]
    },
    design: {
        icon: ImageIcon,
        title: "Diseño Gráfico",
        welcome: "🎨 Hola, este es tu equipo de diseño",
        description: "Transformamos tus ideas en piezas visuales de alto impacto. Desde posts hasta branding corporativo.",
        color: "purple",
        actions: [
            { label: "Diseños en proceso", icon: LayoutDashboard, mode: "projects" },
            { label: "Solicitar nuevo diseño", icon: ArrowRight, mode: "new" },
            { label: "Ver historial", icon: FileText, mode: "history" }
        ]
    },
    video: {
        icon: UploadCloud,
        title: "Editor de Video",
        welcome: "🎬 Aquí editamos tus videos",
        description: "Carga tu material y nosotros nos encargamos de la magia. Edición profesional, color y sonido.",
        color: "orange",
        actions: [
            { label: "Videos en edición", icon: Clapperboard, mode: "projects" },
            { label: "Subir material", icon: UploadCloud, mode: "upload" },
            { label: "Enviar comentarios", icon: MessageSquare, mode: "chat" }
        ]
    },
    filmmaker: {
        icon: Clapperboard,
        title: "Filmmaker Pro",
        welcome: "🎥 Producción audiovisual",
        description: "Equipos de rodaje y cinematografía para tus campañas más ambiciosas.",
        color: "red",
        actions: [
            { label: "Agendar grabación", icon: Calendar, mode: "schedule" },
            { label: "Ver rodajes", icon: Video, mode: "projects" },
            { label: "Ver entregables", icon: FileText, mode: "assets" }
        ]
    },
    audition: {
        icon: Mic,
        title: "Audio & Producción",
        welcome: "🎧 Audio & Producción sonora",
        description: "Podcast, locución y diseño sonoro con calidad de estudio.",
        color: "fuchsia",
        actions: [
            { label: "Audios en edición", icon: Mic, mode: "projects" },
            { label: "Agendar grabación", icon: Calendar, mode: "schedule" },
            { label: "Descargar masters", icon: FileText, mode: "assets" }
        ]
    },
    photo: {
        icon: Camera,
        title: "Fotografía",
        welcome: "📸 Fotografía profesional",
        description: "Capturamos la esencia de tu marca con equipo Full Frame y retoque de alto nivel.",
        color: "pink",
        actions: [
            { label: "Agendar sesión", icon: Camera, mode: "schedule" },
            { label: "Ver fotos", icon: ImageIcon, mode: "projects" },
            { label: "Descargar material", icon: FileText, mode: "assets" }
        ]
    },
    print: {
        icon: Printer,
        title: "Imprenta & Merch",
        welcome: "🖨️ Imprenta y producción física",
        description: "Tus diseños llevados al mundo real con la mejor calidad de impresión.",
        color: "yellow",
        actions: [
            { label: "Solicitar cotización", icon: ArrowRight, mode: "quote" },
            { label: "Ver pedidos", icon: ShoppingBag, mode: "projects" },
            { label: "Historial", icon: FileText, mode: "history" }
        ]
    },
    models: {
        icon: Star,
        title: "Modelos & Talento",
        welcome: "👤 Modelos y talento creativo",
        description: "Casting y selección de talento especializado para tus producciones.",
        color: "rose",
        actions: [
            { label: "Ver perfiles", icon: Users, mode: "catalog" },
            { label: "Solicitar modelo", icon: Star, mode: "request" },
            { label: "Ver disponibilidad", icon: Calendar, mode: "schedule" }
        ]
    },
    events: {
        icon: Calendar,
        title: "Cobertura de Eventos",
        welcome: "🎉 Cobertura de eventos",
        description: "No te pierdas ningún detalle. Streaming y cobertura en vivo para tus momentos especiales.",
        color: "lime",
        actions: [
            { label: "Solicitar cobertura", icon: ArrowRight, mode: "request" },
            { label: "Ver cronograma", icon: Calendar, mode: "schedule" },
            { label: "Aprobar material", icon: CheckCircle2, mode: "approval" }
        ]
    },
    web: {
        icon: Globe,
        title: "Desarrollo Web",
        welcome: "🌐 Tu presencia digital",
        description: "Diseñamos y desarrollamos sitios web, landing pages y soluciones personalizadas.",
        color: "cyan",
        actions: [
            { label: "Webs en desarrollo", icon: LayoutGrid, mode: "projects" },
            { label: "Pedir ajuste", icon: MessageSquare, mode: "chat" },
            { label: "Métricas", icon: BarChart3, mode: "analytics" }
        ]
    }
};

export default function DepartmentWelcome({ deptId, onAction }) {
    const data = DEPARTMENT_CONTENT[deptId] || DEPARTMENT_CONTENT.community;
    const DeptIcon = data.icon;

    const colorClasses = {
        blue: "from-blue-400 to-indigo-600",
        purple: "from-purple-400 to-fuchsia-600",
        orange: "from-orange-400 to-red-600",
        red: "from-red-400 to-rose-600",
        fuchsia: "from-fuchsia-400 to-purple-600",
        pink: "from-pink-400 to-rose-600",
        yellow: "from-yellow-400 to-orange-600",
        rose: "from-rose-400 to-pink-600",
        lime: "from-lime-400 to-emerald-600",
        cyan: "from-cyan-400 to-blue-600",
    };

    const glowClasses = {
        blue: "bg-blue-500/10",
        purple: "bg-purple-500/10",
        orange: "bg-orange-500/10",
        red: "bg-red-500/10",
        fuchsia: "bg-fuchsia-500/10",
        pink: "bg-pink-500/10",
        yellow: "bg-yellow-500/10",
        rose: "bg-rose-500/10",
        lime: "bg-lime-500/10",
        cyan: "bg-cyan-500/10",
    };

    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className={`absolute top-1/3 left-1/4 w-96 h-96 ${glowClasses[data.color]} rounded-full blur-[128px]`} />
                <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 ${glowClasses[data.color]} rounded-full blur-[128px] opacity-50`} />
                <div className="absolute inset-0 bg-[#050511]" style={{ backgroundImage: 'radial-gradient(#1a1a2e 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', opacity: 0.15 }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Visual Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${colorClasses[data.color]} opacity-10 rounded-full blur-2xl animate-pulse`} />
                        <div className="absolute inset-4 border border-white/5 rounded-full flex items-center justify-center bg-[#0E0E18]/80 backdrop-blur-md shadow-2xl">
                            <DeptIcon className={`w-40 h-40 text-white opacity-20`} strokeWidth={0.5} />

                            {/* Floating Tech Elements */}
                            <div className="absolute inset-0 overflow-hidden rounded-full">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute inset-0 border border-white/5 rounded-full"
                                        style={{ margin: `${i * 40}px` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Central Icon Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050511] border border-white/10 px-6 py-2 rounded-full shadow-2xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{data.title}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Text & Actions Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${glowClasses[data.color]} border border-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-8`}>
                        <span className={`w-2 h-2 rounded-full bg-current animate-pulse`} />
                        Zona Creativa • {data.title}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                        {data.welcome.split(',')[0]},<br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colorClasses[data.color]}`}>
                            {data.welcome.split(',')[1]}
                        </span>.
                    </h1>

                    <p className="text-lg text-gray-400 mb-12 font-light leading-relaxed max-w-xl">
                        {data.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.actions.map((action, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onAction(action.mode)}
                                className={`group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all text-left ${i === 0 ? 'sm:col-span-2 bg-white/10 border-white/10' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                                        <action.icon className="w-5 h-5 text-white/70" />
                                    </div>
                                    <span className="text-sm font-bold text-white tracking-wide uppercase">{action.label}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </motion.button>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + data.color}`} className="w-10 h-10 rounded-full border-2 border-[#050511] bg-gray-800" alt="team" />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            Tu equipo de <strong className="text-white not-italic">{data.title}</strong> está en línea.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
