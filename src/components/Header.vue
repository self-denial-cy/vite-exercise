<template>
  <div>
    <h4 class="title" :class="styles['font-class']">Header</h4>
    <img class="img-class" src="../assets/imgs/vite.svg" />
    <SvgComponent width="16" height="16" style="display: block; margin: 0 auto"></SvgComponent>
  </div>
</template>

<script setup lang="ts">
import styles from '../assets/css/index.module.css';
import SvgComponent from '../assets/imgs/vite.svg?component';
</script>

<style lang="scss" scoped>
// @import '../assets/scss/variable.scss';

.title {
  text-decoration: dashed;
  text-align: center;
  color: $theme-text-color;
}
</style>

<style lang="less" scoped>
@import url('../assets/less/index.less');
</style>
