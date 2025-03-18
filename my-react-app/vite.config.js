import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Learning-Managment-system/', // Set this to match your repo name
  plugins: [react()],
});