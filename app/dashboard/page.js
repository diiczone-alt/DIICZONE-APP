'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    PlayCircle, Image as ImageIcon, Mic, UploadCloud,
    ExternalLink, User, Video, GraduationCap, LayoutGrid,
    Zap, Lightbulb
} from 'lucide-react';
// import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetchProjects(); // Disabled for preview until dependency is installed
        setProjects([
            { id: 1, title: 'Reel: Lanzamiento V2', type: 'video', status: 'En Revisión', author: 'Sarah' },
            { id: 2, title: 'Carrusel Educativo: Tips IA', type: 'design', status: 'Aprobado', author: 'Alex' }
        ]);
        setLoading(false);
    }, []);

    /*
    async function fetchProjects() {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('status', 'production')
                .limit(5);

            if (error) throw error;
            if (data) setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Fallback mock data if DB is empty/error
            setProjects([
                { id: 1, title: 'Reel: Lanzamiento V2', type: 'video', status: 'En Revisión', author: 'Sarah' },
                { id: 2, title: 'Carrusel Educativo: Tips IA', type: 'design', status: 'Aprobado', author: 'Alex' }
            ]);
        } finally {
            setLoading(false);
        }
    }
    */

    return (
        <div className="flex h-screen bg-[#050511]">
            {/* Sidebar (Simplified for now) */}
            <aside className="w-64 bg-[#0B0B15] border-r border-white/5 p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 px-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">D</div>
                    <span className="font-bold text-xl tracking-tight">DIIC ZONE</span>
                </div>

                <NavItem icon={LayoutGrid} label="Dashboard" active />
                <NavItem icon={Video} label="Studio" />
                <NavItem icon={GraduationCap} label="Academia" />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Hola, Creativo 👋</h1>
                        <p className="text-gray-400">Aquí está el resumen de tu producción hoy.</p>
                    </div>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all">
                        <UploadCloud className="w-4 h-4" /> Nuevo Proyecto
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Proyectos Activos" value={projects.length} icon={Video} color="text-purple-400" bg="bg-purple-500/10" />
                    <StatCard label="Revisiones" value="2" icon={User} color="text-blue-400" bg="bg-blue-500/10" />

                    {/* Convert Drive Widget to React */}
                    <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                                {/* Drive Icon Simulation */}
                                <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg')" }}></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Carpeta Digital</h4>
                                <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Sincronizado
                                </p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                            <ExternalLink className="w-3 h-3" /> Abrir Drive
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pipeline List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Producción en Curso</h3>
                        <div className="space-y-3">
                            {projects.map((project) => (
                                <ProjectItem key={project.id} project={project} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Tips */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" /> Tips Rápidos
                        </h3>
                        <div className="space-y-4">
                            <TipItem
                                title="Hook de 3 Segundos"
                                desc="Capta la atención visualmente en los primeros 3s."
                                icon={Lightbulb}
                            />
                            <TipItem
                                title="Audio en Tendencia"
                                desc="Usa audios virales a volumen bajo."
                                icon={Mic}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active }) {
    return (
        <button className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Icon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
        </button>
    )
}

function StatCard({ label, value, icon: Icon, color, bg }) {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${color} mb-4`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-gray-400 text-sm mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
        </div>
    )
}

function ProjectItem({ project }) {
    const isVideo = project.type === 'video';
    return (
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 group hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isVideo ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                {isVideo ? <PlayCircle className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-white text-sm">{project.title}</h4>
                <p className="text-xs text-gray-500">{project.author || 'Equipo'} • Reciente</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${project.status === 'Aprobado' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                {project.status || 'En Proceso'}
            </span>
        </div>
    )
}

function TipItem({ title, desc, icon: Icon }) {
    return (
        <div className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="mt-1">
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <div>
                <h5 className="text-sm font-bold text-white">{title}</h5>
                <p className="text-xs text-gray-400 mt-1">{desc}</p>
            </div>
        </div>
    )
}
