import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: '/',
  },
  plugins: [
    handlebars({
      // partialDirectory: resolve(__dirname, 'src/components'),
      helpers: {},
      // context: {
      //   chats
      // },
    }) as unknown as Plugin,
  ],
  build: {
    outDir: resolve(__dirname, 'dist')
    // rollupOptions: {
    //   input: {
    //     index: resolve(__dirname, 'index.html'),
        // login: resolve(__dirname, 'src/pages/login/login.html'),
        // signup: resolve(__dirname, 'src/pages/signup/signup.html'),
        // profile: resolve(__dirname, 'src/pages/profile/profile.html'),
        // profile_edit: resolve(__dirname, 'src/pages/profile/profile-edit.html'),
        // profile_edit_password: resolve(
        //   __dirname,
        //   'src/pages/profile/profile-edit-password.html'
        // ),
        // 404: resolve(__dirname, 'src/pages/error/404.html'),
        // 500: resolve(__dirname, 'src/pages/error/500.html'),
        // chat: resolve(__dirname, 'src/pages/chat/chat.html'),
      // },
    // },
  },
});
