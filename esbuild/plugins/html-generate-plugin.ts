import type { Plugin } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createScript, createLink, generate } from '../utils';

export default function (): Plugin {
  return {
    name: 'esbuild:html',
    setup(build) {
      build.onEnd(async (result) => {
        if (result.errors.length) return;
        const { metafile } = result;
        const scripts = [];
        const links = [];
        if (metafile) {
          const { outputs } = metafile;
          const assets = Object.keys(outputs);
          assets.forEach((asset) => {
            if (asset.endsWith('.js')) {
              scripts.push(createScript(asset));
            } else if (asset.endsWith('.css')) {
              links.push(createLink(asset));
            }
          });
        }
        const content = generate(scripts, links);
        const filename = path.join(process.cwd(), 'index.html');
        await fs.writeFile(filename, content);
      });
    },
  };
}
