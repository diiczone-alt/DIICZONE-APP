import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "DIIC ZONE | Dashboard",
  description: "Plataforma de Producción Creativa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
