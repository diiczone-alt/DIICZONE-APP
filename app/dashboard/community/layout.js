'use client';

import ClientCMSidebar from '@/components/community/ClientCMSidebar';

export default function CommunityLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050511] p-4 lg:p-8 flex gap-8">
            <ClientCMSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
