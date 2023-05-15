/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="vite-plugin-svg-icons/client" />

/**
 * 注意，引入 vite-plugin-svg-icons/client 需要在 vite-plugin-svg-icons/package.json
 * 中的 exports 中新增 "./client": { "types": "./client.d.ts" }
 * 或者直接 import 'vite-plugin-svg-icons/client';
 */

// import 'vite-plugin-svg-icons/client';

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_KEY: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_IMG_BASE_URL: string;
}

declare module 'virtual:fib' {
  const fib: (n: number) => number;
  export default fib;
}

declare module 'virtual:env' {
  const env: Record<string, unknown>;
  export default env;
}
