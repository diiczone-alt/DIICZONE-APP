import Sidebar from '../../components/layout/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050510] text-foreground flex">
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="relative z-10 p-8">
                    {children}
                </div>
                <AIAssistant />
            </main>
        </div>
    );
}
