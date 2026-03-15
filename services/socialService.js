import { supabase } from '../lib/supabase';

export const socialService = {
    // Get all connected social accounts
    async getConnections() {
        try {
            const { data, error } = await supabase
                .from('social_connections')
                .select('*');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching social connections:', error);
            // Fallback/Mock data for Verified Preview if DB is empty
            return [
                {
                    platform: 'Instagram',
                    connected: false,
                    stats: { label: 'Seguidores', value: '---' }
                },
                // ... return empty/mock
            ];
        }
    },

    // Simulate connecting a platform (In reality, this would be an OAuth flow)
    async connectPlatform(platform) {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No auth user');

            // Insert dummy connection with random stats for "Demo" effect
            const mockStats = {
                followers: Math.floor(Math.random() * 50000) + 1000,
                engagement: (Math.random() * 10).toFixed(1) + '%'
            };

            const { data, error } = await supabase
                .from('social_connections')
                .upsert({
                    profile_id: user.id,
                    platform: platform.toLowerCase(),
                    stats: mockStats,
                    handle: `@demo_${platform}`
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error connecting platform:', error);
            return null;
        }
    }
};
