import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
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
});
