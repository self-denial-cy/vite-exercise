import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const build = async () => {
  let bundle,
    isFailed = false;
  try {
    bundle = await rollup({
      input: './src/index.js',
      plugins: [resolve(), commonjs()],
    });
    await bundle.generate({
      dir: './dist/umd',
      format: 'umd',
      sourcemap: true,
    });
    await bundle.write({
      dir: './dist/umd',
      format: 'umd',
      sourcemap: true,
    });
  } catch (error) {
    isFailed = true;
    console.error(error);
  }
  if (bundle) {
    await bundle.close();
  }
  process.exit(isFailed ? 1 : 0);
};

build();
