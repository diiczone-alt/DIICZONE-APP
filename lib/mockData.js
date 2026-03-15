export const MOCK_DATA = {
    products: [
        { id: 1, name: 'Plan Mensual Redes', type: 'service', price: 250, sales: 12, status: 'active', thumb: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Pack Videos Reels', type: 'product', price: 150, sales: 24, status: 'active', thumb: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Consultoría Estrategia', type: 'booking', price: 80, sales: 5, status: 'paused', thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60' },
    ],
    smart_links: [
        { id: 1, name: 'Promo Instagram', url: 'diic.zone/pay/promo-ig', clicks: 145, conv: '8%' },
        { id: 2, name: 'Reserva Cita Dra.', url: 'diic.zone/book/dra-ana', clicks: 89, conv: '12%' },
    ],
    strategies: [
        { id: '1', title: 'Lanzamiento Q3', type: 'sales', status: 'active' },
        { id: '2', title: 'Brand Awareness', type: 'brand', status: 'draft' },
    ],
    chats: [
        { id: 1, name: 'Juan Pérez', platform: 'whatsapp', msg: 'Hola, información precios...', time: '2m', status: 'new', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Gym FitForce', platform: 'instagram', msg: 'Me interesa el plan mensual', time: '15m', status: 'bot_active', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Dra. Ana Lopez', platform: 'whatsapp', msg: 'Confirmada la cita mañana?', time: '1h', status: 'scheduled', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Restaurante Sabor', platform: 'facebook', msg: 'No me gustó el diseño...', time: '3h', status: 'urgent', avatar: 'https://i.pravatar.cc/150?u=4' },
    ],
    crm_stages: [
        { id: 'lead', title: 'Nuevos Leads', color: 'bg-blue-500', items: 5 },
        { id: 'qualifying', title: 'Calificando (IA)', color: 'bg-indigo-500', items: 3 },
        { id: 'offer', title: 'Propuesta Enviada', color: 'bg-yellow-500', items: 2 },
        { id: 'meeting', title: 'Cita Agendada', color: 'bg-purple-500', items: 4 },
        { id: 'closing', title: 'Cierre / Pago', color: 'bg-green-500', items: 1 },
    ],
    ai_logs: [
        { id: 1, action: 'Auto-Respuesta', lead: 'Juan Pérez', detail: 'Envió PDF Precios', time: '1m ago' },
        { id: 2, action: 'Calificación', lead: 'Gym FitForce', detail: 'Detectó interés alto', time: '12m ago' },
        { id: 3, action: 'Agendamiento', lead: 'Dra. Ana', detail: 'Cita Mar 15 - 10:00am', time: '55m ago' },
    ]
};
