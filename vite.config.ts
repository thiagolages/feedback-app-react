import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  // changing the output dir from 'dist' to 'build' when we run 'npm run build' 
  // (which runs "tsc && vite build" as specified in package.json )
  // we're doing this so that when we run 'npm run deploy', it automatically runs
  // the 'predeploy' and 'deploy' entries of package.json and creates the 'build' dir as expected
  build: {
    outDir: 'build/' 
  },
  base: '/feedback-app-react/',
  
  plugins: [react()]
})
