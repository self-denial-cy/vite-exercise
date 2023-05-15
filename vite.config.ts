import { defineConfig, normalizePath } from 'vite';
// import { defineConfig, normalizePath, splitVendorChunkPlugin } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import inspect from 'vite-plugin-inspect';
import autoprefixer from 'autoprefixer';
import svg from 'vite-svg-loader';
// import imagemin from 'vite-plugin-imagemin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import virtual from './plugins/virtual-module';

// 全局 scss 文件的路径，通过 normalizePath 解决 Windows 下的路径问题
const variablePath = normalizePath(path.join(__dirname, './src/assets/scss/variable.scss'));

// console.log(process.env.NODE_ENV);

export default defineConfig({
  base: '/', // 类似 vue-cli 中 publicPath 配置项
  plugins: [
    vue(),
    inspect(),
    svg(),
    // splitVendorChunkPlugin(),
    // 压缩图片资源，减小打包的体积【打包时间会随着图片资源的数量提升，对于包体积和打包时间两者的平衡自行把握】
    // imagemin({
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
    // 生成雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, './src/assets/imgs/sprite')],
    }),
    virtual(),
    chunkSplitPlugin({
      customSplitting: {
        vendor: ['vue'],
      },
    }),
  ],
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
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vendor: ['vue'],
    //     },
    //   },
    // },
    assetsInlineLimit: 8 * 1024, // 静态资源是否提取成单文件的临界值，小于 8KB 的文件被 base64 内联【svg 始终会打包成单文件】
  },
  resolve: {
    alias: {
      // 注意，alias 别名配置不仅在 JavaScript 的 import 语句中生效，在 CSS 代码的 @import 和 url 导入语句中同样生效
      '@assets': path.join(__dirname, './src/assets'),
      '@c': path.join(__dirname, './src/components'),
    },
  },
});
