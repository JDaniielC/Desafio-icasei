import { defineConfig } from 'vite'

export default defineConfig(({ command }) => { 
  const root = 'src'
  const build = {
    outDir: '../dist',
    emptyOutDir: true,
  }

  let config = {
    root, build,
    server: command === 'serve' ? {
      proxy : {
        '/api': {
          target: 'http://127.0.0.1:8000/api/v1',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    } : {}
  }

  return config
})