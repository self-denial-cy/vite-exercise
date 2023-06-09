import { build } from 'esbuild';
import path from 'path';
import cdn from './plugins/cdn-import-plugin';
import html from './plugins/html-generate-plugin';

async function run() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: [path.join(__dirname, './src/index.ts')],
    outdir: 'dist',
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [cdn(), html()],
  }).then(() => {
    console.log('🚀 Build Finished');
  });
}

run();
