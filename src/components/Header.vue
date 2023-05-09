<template>
  <div>
    <h4 class="title" :class="styles['font-class']">Header</h4>
  </div>
</template>

<script setup lang="ts">
import styles from '../assets/css/index.module.css';
</script>

<style lang="scss" scoped>
// @import '../assets/scss/variable.scss';

.title {
  text-decoration: dashed;
  text-align: center;
  color: $theme-text-color;
}
</style>
