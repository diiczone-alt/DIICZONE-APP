'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '../../../../components/ui/VideoPlayer';
import FeedbackPanel from '../../../../components/ui/FeedbackPanel';

// Mock Data
const MOCK_COMMENTS = [
    { id: 1, author: 'Director Creativo', initials: 'DC', text: 'El corte está bien, pero la música entra muy tarde.', timestamp: 12.5, isClient: false },
    { id: 2, author: 'Cliente Demo', initials: 'CD', text: 'Me gusta este color, pero el logo se ve pequeño.', timestamp: 45.2, isClient: true },
];

export default function ReviewPage({ params }) {
    const [comments, setComments] = useState(MOCK_COMMENTS);
    const [currentTime, setCurrentTime] = useState(0);

    const handleAddComment = (text) => {
        const newComment = {
            id: Date.now(),
            author: 'Cliente Demo',
            initials: 'CD',
            text: text,
            timestamp: currentTime,
            isClient: true
        };
        setComments([...comments, newComment].sort((a, b) => a.timestamp - b.timestamp));
    };

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-white/10 bg-[#050510] flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/projects/${params.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-white font-semibold">Reel_Teaser_V1.mp4</h1>
                        <p className="text-xs text-gray-500">Versión 1 • Subido hace 2 horas</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                        Solicitar Cambios
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Aprobar Video
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Player Area */}
                <div className="flex-1 flex items-center justify-center bg-black/50 p-8 relative">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

                    <div className="w-full max-w-5xl z-10">
                        <VideoPlayer
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            onTimeUpdate={setCurrentTime}
                            comments={comments}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <FeedbackPanel comments={comments} onAddComment={handleAddComment} />
            </div>
        </div>
    );
}
