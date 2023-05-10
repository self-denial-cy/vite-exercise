/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_KEY: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_IMG_BASE_URL: string;
}
