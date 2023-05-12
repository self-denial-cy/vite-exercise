/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Plugin, OnLoadResult } from 'esbuild';
import http from 'node:http';
import https from 'node:https';

export default function (): Plugin {
  return {
    name: 'esbuild:cdn',
    setup(build) {
      build.onResolve({ filter: /^https?:\/\// }, (args) => {
        // console.log(args);
        return {
          path: args.path,
          namespace: 'cdn',
        };
      });

      build.onLoad({ filter: /.*/, namespace: 'cdn' }, async (args) => {
        // console.log(args);

        const contents = await new Promise((resolve, reject) => {
          const fetch = (url: string) => {
            console.log(`Downloading: ${url}`);
            const lib = url.startsWith('https') ? https : http;
            // console.log(lib);
            const req = lib
              .get(url, (res) => {
                // console.log(res);
                if ([301, 302, 307].includes(res.statusCode)) {
                  fetch(new URL(res.headers.location, url).toString());
                  req.destroy();
                } else if (res.statusCode === 200) {
                  const chunks = [];
                  res.on('data', (chunk) => chunks.push(chunk));
                  res.on('end', () => resolve(Buffer.concat(chunks)));
                } else {
                  reject(new Error(`GET ${url} failed: status ${res.statusCode}`));
                }
              })
              .on('error', reject);
          };
          fetch(args.path);
        });

        // console.log(contents);

        return { contents } as OnLoadResult;
      });

      build.onResolve({ filter: /.*/, namespace: 'cdn' }, (args) => {
        // console.log(args);
        return {
          path: new URL(args.path, args.importer).toString(),
          namespace: 'cdn',
        };
      });

      build.onEnd((result) => {
        console.log(result);
      });
    },
  };
}
