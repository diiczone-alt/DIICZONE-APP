import Link from 'next/link';
import { Home, Clapperboard, MonitorPlay, BarChart2, User } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-20 lg:w-64 glass border-r border-white/5 flex flex-col justify-between hidden md:flex z-50 h-screen sticky top-0">
            <div>
                <div className="h-20 flex items-center justify-center border-b border-white/5 mx-4">
                    <h1 className="font-display font-bold text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">DIIC</h1>
                </div>

                <nav className="mt-8 flex flex-col gap-2 px-4">
                    <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all">
                        <Home className="w-6 h-6" />
                        <span className="font-medium hidden lg:block">Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                        <Clapperboard className="w-6 h-6" />
                        <span className="font-medium hidden lg:block">Studio</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                        <MonitorPlay className="w-6 h-6" />
                        <span className="font-medium hidden lg:block">Academia</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                        <BarChart2 className="w-6 h-6" />
                        <span className="font-medium hidden lg:block">Analytics</span>
                    </Link>
                </nav>
            </div>

            <div className="p-4">
                <div className="glass p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center font-bold text-white">MK</div>
                    <div className="hidden lg:block">
                        <div className="text-sm font-bold text-white">Mike Creator</div>
                        <div className="text-xs text-muted-foreground">Pro Plan</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
