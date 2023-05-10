<template>
  <div class="vite-app">
    <Header></Header>
    <div class="bg-image"></div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { version } from '../package.json';
import Worker from './workers/index?worker';

// 初始化 Worker 实例
const worker = new Worker();
// 主线程监听 worker 信息
worker.addEventListener('message', (evt) => {
  console.log(evt.data);
});

console.log(version);
console.log(import.meta.env.VITE_KEY);
</script>

<style lang="less">
.vite-app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-image {
  margin-top: 16px;
  width: 480px;
  height: 300px;
  background-image: url('@assets/imgs/bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
</style>
