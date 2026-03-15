'use client';

import Sidebar from '../../components/layout/Sidebar';
import AIAssistant from '../../components/ui/AIAssistant';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext';

function DashboardContent({ children }) {
    const { isExpanded, isSuppressed } = useSidebar();

    return (
        <div className="h-screen bg-[#050511] text-foreground flex overflow-hidden">
            {!isSuppressed && <Sidebar />}
            <main
                className={`flex-1 flex flex-col min-w-0 h-full relative transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden`}
            >
                {/* Futurustic Grid & Particles - Hidden in studio mode to avoid visual noise */}
                {!isSuppressed && (
                    <>
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_50%)]" />
                    </>
                )}

                {/* Main Content Area - Padding depends on suppression */}
                <div className={`relative z-10 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${isSuppressed ? '' : 'p-8'}`}>
                    {children}
                </div>

                {!isSuppressed && <AIAssistant />}
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // CLIENT GUARD: Only 'client' type allowed here
        const userType = localStorage.getItem('user_type');
        const userRole = localStorage.getItem('user_role');

        if (userType === 'creator') {
            // Redirect to their specific workstation
            const target = userRole === 'EDITOR' ? '/workstation/editor'
                : userRole === 'FILMMAKER' ? '/workstation/filmmaker'
                    : '/workstation/cm';
            router.push(target);
        } else if (userType === 'admin') {
            router.push('/admin');
        }
    }, []);

    return (
        <SidebarProvider>
            <DashboardContent>
                {children}
            </DashboardContent>
        </SidebarProvider>
    );
}
