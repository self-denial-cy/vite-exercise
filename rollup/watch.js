import { watch } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const watcher = watch({
  input: './src/index.js',
  output: [
    {
      dir: './dist/esm',
      format: 'esm',
    },
    {
      dir: './dist/cjs',
      format: 'cjs',
    },
  ],
  plugins: [resolve(), commonjs()],
  external: ['lodash'],
  watch: {
    exclude: ['node_modules/**'],
    include: ['src/**'],
  },
});

watcher.on('restart', () => {
  console.log('重新构建...');
});

watcher.on('change', (id) => {
  console.log('发生变动的模块id: ', id);
});

watcher.on('event', (e) => {
  if (e.code === 'BUNDLE_END') {
    console.log('打包信息:', e);
  }
});
