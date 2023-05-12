import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // 生成雪碧图
// @ts-expect-error CDN 拉取依赖
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    confetti: () => void;
  }
}

const app = createApp(App);

app.config.globalProperties.confetti = confetti;

app.mount('#app');
