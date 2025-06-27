import tailwindcss from "@tailwindcss/vite"


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon'],
  future: {
    compatibilityVersion: 4,
  },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devServer: {
    port: 3001,
  }
})