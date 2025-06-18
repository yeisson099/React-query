import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{
 const API_URL = {
   prod: "/api/prod",
   dev: "/api/dev",
 } as const; 

  const ENVIROMENTS = {
    prod: "production",
    dev: "development",
  } as const; 
 

return {
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@hooks": "/src/shared/hooks",
      "@guards": "/src/shared/guards",
      "@utils": "/src/shared/utils",
      "@services": "/src/shared/services",
      "@models": "/src/shared/types",
      "@pages": "/src/pages",
      "@store": "/src/store",
      "@assets": "/src/assets",
      "@sharedComponents": "/src/shared/components",
      "@providers": "/src/shared/providers",
    },
  },
  define: {
    // "process.env.NODE_ENV": JSON.stringify(mode),
    // "process.env.API_BASE_URL":
    //   mode === ENVIROMENTS.prod ? API_URL.prod : API_URL.dev,
    REACT_APP_SUPPORT_PHONE_NUMBER: `"${process.env.VALUE}"`,
  },
};
});
