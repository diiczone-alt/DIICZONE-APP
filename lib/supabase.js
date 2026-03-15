
import { createClient } from '@supabase/supabase-js'
import { MOCK_DATA } from './mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials missing. App running in UI-only mode with mock data (LocalStorage).')

    // Helper to simulate DB delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Improved Mock with LocalStorage Persistence
    const createChainableMock = (tableName, currentData = null) => {
        return {
            select: function () {
                const stored = typeof window !== 'undefined' ? localStorage.getItem(`mock_db_${tableName}`) : null;
                const data = stored ? JSON.parse(stored) : (MOCK_DATA[tableName] || []);
                return createChainableMock(tableName, data);
            },
            order: function (col, { ascending }) {
                if (!currentData) return this;
                const sorted = [...currentData].sort((a, b) => {
                    const valA = a[col];
                    const valB = b[col];
                    if (valA < valB) return ascending ? -1 : 1;
                    if (valA > valB) return ascending ? 1 : -1;
                    return 0;
                });
                return createChainableMock(tableName, sorted);
            },
            eq: function (col, val) {
                if (!currentData) return this;
                const filtered = currentData.filter(item => item[col] === val);
                return createChainableMock(tableName, filtered);
            },
            in: function () { return this; },
            limit: function (n) {
                if (!currentData) return this;
                return createChainableMock(tableName, currentData.slice(0, n));
            },
            single: async function () {
                await delay(100);
                return { data: currentData && currentData.length > 0 ? currentData[0] : {}, error: null };
            },
            update: async function (updates) {
                await delay(300);
                return { data: updates, error: null };
            },
            insert: async function (item) {
                await delay(500);
                const stored = typeof window !== 'undefined' ? localStorage.getItem(`mock_db_${tableName}`) : null;
                const prevData = stored ? JSON.parse(stored) : [];
                const newItem = { id: Date.now(), ...item };
                const newData = [...prevData, newItem];
                if (typeof window !== 'undefined') {
                    localStorage.setItem(`mock_db_${tableName}`, JSON.stringify(newData));
                }
                console.log(`[MockDB] Inserted into ${tableName}:`, newItem);
                return { data: newItem, error: null };
            },
            delete: async function () { return { data: null, error: null }; },
            then: function (resolve) { resolve({ data: currentData, error: null }); },
        };
    };

    supabaseClient = {
        from: (table) => {
            return createChainableMock(table);
        },
        auth: {
            getUser: () => Promise.resolve({ data: { user: { id: 'mock-user-id', email: 'demo@diic.zone' } }, error: null }),
            getSession: () => Promise.resolve({ data: { session: { user: { id: 'mock-user-id', email: 'demo@diic.zone' } } }, error: null }),
            signInWithPassword: ({ email, password }) => {
                console.log('MOCK AUTH: Signed in', email);
                return Promise.resolve({ data: { user: { id: 'mock-user-id', email }, session: { access_token: 'mock-token' } }, error: null });
            },
            signOut: () => {
                console.log('MOCK AUTH: Signed out');
                return Promise.resolve({ error: null });
            },
            onAuthStateChange: (callback) => {
                return { data: { subscription: { unsubscribe: () => { } } } };
            }
        }
    }
} else {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = supabaseClient
