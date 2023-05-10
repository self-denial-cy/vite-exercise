<template>
  <div class="vite-app">
    <Header></Header>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { version } from '../package.json';

console.log(version);
console.log(import.meta.env.VITE_KEY);
</script>

<style lang="less">
.vite-app {
  display: flex;
}
</style>
