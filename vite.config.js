import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// PWA isterseniz:
// import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
plugins: [
react(),
// VitePWA({
// registerType: 'autoUpdate',
// manifest: {
// name: 'Korelee QR Menü',
// short_name: 'Korelee',
// start_url: '/',
// display: 'standalone',
// background_color: '#ffffff',
// theme_color: '#111827',
// icons: [
// { src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
// { src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' }
// ]
// }
// })
]
})