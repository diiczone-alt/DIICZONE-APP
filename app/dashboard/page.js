'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import NewProjectWizard from '@/components/projects/NewProjectWizard';
import {
  Calendar, Zap, BarChart2, Users, ArrowRight, TrendingUp,
  TrendingDown, Clock, CheckCircle2, AlertCircle, Play,
  Image as ImageIcon, Mic, FileText, Activity, Star,
  ChevronRight, Eye, Edit3, Plus
} from 'lucide-react';

// ─── Inline Sparkline (SVG) ─────────────────────────────────────────
function Sparkline({ data = [], color = '#6366f1', height = 40, width = 120 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  const filled = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={filled} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Donut Ring ──────────────────────────────────────────────────────
function DonutRing({ pct = 75, color = '#6366f1', size = 64, label }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">{pct}%</text>
      </svg>
      {label && <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{label}</span>}
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, trendUp, sparkData, color = '#6366f1', icon: Icon }) {
  return (
    <div className="bg-[#0E0E1A] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 transition-all group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle at top right, ${color}08, transparent 70%)` }} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-black text-white">{value}</p>
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {sparkData && <Sparkline data={sparkData} color={color} width={110} height={36} />}
      {(sub || trend) && (
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          {sub && <span className="text-[11px] text-gray-500">{sub}</span>}
          {trend && (
            <span className={`text-[11px] font-bold flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Production Item ─────────────────────────────────────────────────
function ProductionItem({ type, title, status, progress, color, time }) {
  const icons = { reel: <Play className="w-4 h-4" />, design: <ImageIcon className="w-4 h-4" />, audio: <Mic className="w-4 h-4" />, copy: <FileText className="w-4 h-4" /> };
  const colors = {
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-400', border: 'border-amber-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-400', border: 'border-blue-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-400', border: 'border-purple-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-400', border: 'border-emerald-500/20' },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border ${c.border} ${c.bg} group hover:brightness-110 transition-all`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${c.bg} ${c.text}`}>
        {icons[type] || <FileText className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-bold text-white truncate">{title}</span>
          <span className="text-xs font-mono text-gray-500 ml-2">{progress}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className={`text-[10px] font-bold uppercase ${c.text}`}>{status}</span>
          <span className="text-[10px] text-gray-600 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{time}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Module Card ───────────────────────────────────────────────
function ModuleCard({ label, description, href, icon: Icon, gradient, iconColor }) {
  return (
    <Link href={href}>
      <div className={`group p-5 rounded-2xl border border-white/5 bg-gradient-to-br ${gradient} hover:border-white/15 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-black/20 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-white font-bold text-sm">{label}</p>
        <p className="text-gray-500 text-xs mt-0.5">{description}</p>
        <ArrowRight className="w-3 h-3 text-gray-600 absolute bottom-4 right-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
      </div>
    </Link>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [now, setNow] = useState('');

  useEffect(() => {
    const d = new Date();
    setNow(d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
  }, []);

  const kpiCards = [
    { label: 'Interacciones Totales', value: '24,519', sub: 'vs. mes anterior', trend: '+12.5%', trendUp: true, icon: Activity, color: '#6366f1', sparkData: [40, 55, 48, 72, 61, 88, 95, 80, 110, 130, 115, 145] },
    { label: 'Activos Publicados', value: '138', sub: 'este mes', trend: '+8.3%', trendUp: true, icon: CheckCircle2, color: '#10b981', sparkData: [10, 14, 12, 18, 22, 19, 25, 28, 24, 30, 26, 34] },
    { label: 'En Producción', value: '7', sub: 'proyectos activos', trend: '2 urgentes', trendUp: false, icon: AlertCircle, color: '#f59e0b', sparkData: [2, 5, 3, 7, 4, 8, 6, 9, 5, 7, 8, 7] },
    { label: 'Audiencia Total', value: '18.4K', sub: 'seguidores acumulados', trend: '+3.2%', trendUp: true, icon: Users, color: '#ec4899', sparkData: [80, 85, 88, 92, 97, 103, 110, 118, 125, 135, 148, 160] },
  ];

  const productions = [
    { type: 'reel', title: 'Reel: Lanzamiento V2', status: 'Edición', progress: 65, color: 'amber', time: 'Hace 2h' },
    { type: 'design', title: 'Carrusel IA: Tips Pro', status: 'Aprobación', progress: 90, color: 'blue', time: 'Hace 5h' },
    { type: 'audio', title: 'Podcast — Episodio 4', status: 'Programado', progress: 100, color: 'emerald', time: 'Ayer' },
    { type: 'copy', title: 'Email Marketing Q1', status: 'Revisión', progress: 42, color: 'purple', time: '2 días' },
  ];

  const quickModules = [
    { label: 'Calendario', description: 'Eventos y fechas', href: '/dashboard/calendar', icon: Calendar, gradient: 'from-blue-500/15 to-indigo-500/5', iconColor: 'text-blue-400' },
    { label: 'Conectividad', description: 'Redes y automatizaciones', href: '/dashboard/connectivity', icon: Zap, gradient: 'from-amber-500/15 to-orange-500/5', iconColor: 'text-amber-400' },
    { label: 'Métricas', description: 'Analítica y rendimiento', href: '/dashboard/analytics', icon: BarChart2, gradient: 'from-emerald-500/15 to-teal-500/5', iconColor: 'text-emerald-400' },
    { label: 'Comunidad', description: 'Equipo y roles', href: '/dashboard/community', icon: Users, gradient: 'from-purple-500/15 to-pink-500/5', iconColor: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-[#060612] text-white relative">
      <Header />
      <NewProjectWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />

      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-6 pb-20 space-y-8">

        {/* ── HERO GREETING ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {now}
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Carlos.</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Tu ecosistema digital está al <span className="text-emerald-400 font-bold">98%</span> de salud operativa.</p>
          </div>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Nuevo Proyecto
          </button>
        </div>

        {/* ── KPI CARDS (top row) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((c) => <StatCard key={c.label} {...c} />)}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT 8 cols */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Production pipeline */}
            <div className="bg-[#0E0E1A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-1 h-5 rounded-full bg-amber-500 block shadow-[0_0_10px_#f59e0b60]" />
                  <h2 className="text-base font-black text-white">Producción en Curso</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide animate-pulse">Live</span>
                </div>
                <Link href="/dashboard/pipeline" className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                  Ver todo <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {productions.map((p) => <ProductionItem key={p.title} {...p} />)}
              </div>
            </div>

            {/* Quick modules */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-5 rounded-full bg-indigo-500 block" />
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Accesos Rápidos</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickModules.map((m) => <ModuleCard key={m.href} {...m} />)}
              </div>
            </div>
          </div>

          {/* RIGHT 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Zona Creativa mini status */}
            <div className="bg-[#0E0E1A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-5 rounded-full bg-blue-500 block shadow-[0_0_10px_#3b82f660]" />
                <h2 className="text-base font-black text-white">Zona Creativa</h2>
              </div>

              {/* Donut rings row */}
              <div className="flex justify-around mb-5">
                <DonutRing pct={75} color="#6366f1" size={70} label="Video" />
                <DonutRing pct={90} color="#10b981" size={70} label="Diseño" />
                <DonutRing pct={42} color="#f59e0b" size={70} label="Copy" />
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Reel Lanzamiento V2', type: 'VIDEO', pct: '65', color: 'text-indigo-400' },
                  { label: 'Carrusel Tips IA', type: 'DISEÑO', pct: '90', color: 'text-emerald-400' },
                  { label: 'Podcast Ep. 4', type: 'AUDIO', pct: '100', color: 'text-purple-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded bg-white/5 ${item.color}`}>{item.type}</span>
                      <span className="text-xs text-gray-300 font-medium">{item.label}</span>
                    </div>
                    <span className={`text-xs font-black ${item.color}`}>{item.pct}%</span>
                  </div>
                ))}
              </div>

              <Link href="/dashboard/pipeline" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white transition-all border border-white/5">
                Ver Zona Creativa <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Growth snapshot */}
            <div className="bg-[#0E0E1A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-5 rounded-full bg-emerald-500 block" />
                <h2 className="text-base font-black text-white">Crecimiento</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Instagram', val: '12.4K', delta: '+540', pct: 74, color: '#ec4899' },
                  { label: 'TikTok', val: '3.8K', delta: '+210', pct: 38, color: '#6366f1' },
                  { label: 'YouTube', val: '2.2K', delta: '+87', pct: 22, color: '#ef4444' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-gray-400 font-bold">{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{s.val}</span>
                        <span className="text-[10px] font-bold text-emerald-400">{s.delta}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 8px ${s.color}60` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <Sparkline data={[50, 60, 55, 72, 80, 75, 95, 100, 115, 130, 125, 148]} color="#10b981" width={230} height={50} />
                <p className="text-[10px] text-gray-600 mt-1 text-center">Últimos 12 meses · Audiencia total</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060612] flex items-center justify-center text-white">Cargando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
