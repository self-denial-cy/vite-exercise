import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import svg from 'vite-svg-loader';

// 全局 scss 文件的路径，通过 normalizePath 解决 Windows 下的路径问题
const variablePath = normalizePath(path.join(__dirname, './src/assets/scss/variable.scss'));

console.log(process.env.NODE_ENV);

export default defineConfig({
  base: '/', // 类似 vue-cli 中 publicPath 配置项
  plugins: [vue(), svg()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    modules: {
      // 通过 generateScopedName 对生成的类名进行自定义，name 表示当前文件名、local 表示类名
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import '${variablePath}';`,
      },
    },
  },
  build: {
    assetsInlineLimit: 8 * 1024, // 静态资源是否提取成单文件的临界值，小于 8KB 的文件被 base64 内联【svg 始终会打包成单文件】
  },
});
