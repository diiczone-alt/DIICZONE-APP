'use client';

import {
    Search, Filter, MoreVertical,
    Shield, Ban, Edit, Trash2
} from 'lucide-react';

export default function AdminUsersPage() {
    // Mock Data
    const users = [
        { id: 1, name: 'Juan Creative', email: 'juan@diic.zone', role: 'Filmmaker', status: 'active', joined: '12 Jan 2025' },
        { id: 2, name: 'Roberto Client', email: 'roberto@tech.com', role: 'Cliente', status: 'active', joined: '05 Feb 2025' },
        { id: 3, name: 'Maria Admin', email: 'maria@diic.zone', role: 'Admin', status: 'active', joined: '01 Jan 2025' },
        { id: 4, name: 'Spam Bot', email: 'bot@spam.com', role: 'User', status: 'banned', joined: 'Today' },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-10">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Gestión de Usuarios</h1>
                    <p className="text-gray-400">Control total de cuentas y permisos.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl transition-colors shadow-lg shadow-amber-600/20">
                        + Crear Usuario
                    </button>
                </div>
            </header>

            <div className="bg-[#0A0A12] border border-white/5 rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            className="w-full bg-[#15151E] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
                        />
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/[0.02] text-xs uppercase font-bold text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Rol</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Fecha Registro</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${user.role === 'Admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-gray-400'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono">
                                    {user.joined}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Editar">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-colors" title="Permisos">
                                            <Shield className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors" title="Banear">
                                            <Ban className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
