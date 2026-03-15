/**
 * Mock Service para simular la interacción con Google Drive durante el onboarding.
 * En producción, esto conectaría con la API real de Google Drive.
 */

export const driveService = {
    /**
     * Simula la autenticación con Google
     */
    authenticate: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    user: {
                        name: "Usuario Demo",
                        email: "usuario@demo.com",
                        avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c"
                    }
                });
            }, 1500);
        });
    },

    /**
     * Simula la creación de la carpeta raíz del cliente
     */
    createRootFolder: async (clientName) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: `folder_root_${Date.now()}`,
                    name: `DIIC ZONE - ${clientName}`,
                    webViewLink: "https://drive.google.com/drive/folders/mock-root-id"
                });
            }, 1000);
        });
    },

    /**
     * Estructura de carpetas estándar para DIIC ZONE
     */
    StandardStructure: [
        { name: "01_Identidad", icon: "🎨", description: "Logos, Manual de Marca, Tipografía" },
        { name: "02_Recursos", icon: "📂", description: "Fotos, Videos, Brutos" },
        { name: "03_Producción", icon: "🎬", description: "Guiones, Proyectos en curso" },
        { name: "04_Publicaciones", icon: "📱", description: "Contenido listo para publicar" },
        { name: "05_Finanzas", icon: "💰", description: "Contratos, Facturas, Cotizaciones" },
        { name: "06_Web", icon: "💻", description: "Assets para sitio web" },
        { name: "07_Automatización", icon: "🤖", description: "Flujos, Scripts" },
        { name: "08_Métricas", icon: "📊", description: "Reportes mensuales" }
    ],

    /**
     * Simula la creación secuencial de subcarpetas
     * Devuelve un generador asíncrono para que la UI pueda animar cada paso
     */
    createStructure: async function* (rootFolderId) {
        for (const folder of this.StandardStructure) {
            // Simular retardo de red variable para realismo
            await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

            yield {
                id: `folder_${folder.name.replace(/\s+/g, '_')}_${Date.now()}`,
                name: folder.name,
                icon: folder.icon,
                status: 'created',
                parentId: rootFolderId
            };
        }
    }
};
