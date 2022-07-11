import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [["@nuxtjs/axios", { proxyHeaders: false }], "@nuxtjs/proxy"],
    axios: {
        proxyHeaders: false,
    },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    css: [
        "assets/css/tailwind.css"
    ],
})
