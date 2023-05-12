<template>
  <div class="header">
    <h4 class="title" :class="styles['font-class']">Header</h4>
    <!-- svg 文件在构建时会被打包成 component，因此需要通过 ?url 指定只生成链接地址就行 -->
    <!-- 可能是受 vite-svg-loader 这个插件的影响 -->
    <img class="img-class" src="../assets/imgs/vite.svg?url" />
    <img class="img-class" :src="imgSrc" />
    <SvgComponent width="64" height="64" style="display: block; margin: 0 auto"></SvgComponent>
    <img v-for="(item, index) in icons" :key="index" class="img-class" :src="item" />
    <template v-for="item in iconUrls">
      <SvgIcon v-if="item" :key="item" :name="item"></SvgIcon>
    </template>
  </div>
</template>

<script setup lang="ts">
import styles from '@assets/css/index.module.css';
import SvgComponent from '@assets/imgs/vite.svg?component';
import SvgIcon from '@c/SvgIcon.vue';

const imgSrc = new URL('./logo.svg', import.meta.env.VITE_IMG_BASE_URL).href;

const icons = Object.values(import.meta.glob('../assets/imgs/sprite/*.svg', { eager: true, as: 'url' }));
console.log(icons);

const iconUrls = icons.map((_) => {
  const filename = _.split('/').pop();
  const name = filename?.split('.')[0];
  return name;
});
console.log(iconUrls);
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
@import url('@assets/less/index.less');

.header {
  display: flex;
}
</style>
