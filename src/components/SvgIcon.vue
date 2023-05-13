<template>
  <svg :width="width" :height="height" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      default: '',
    },
    fullname: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#333',
    },
    width: {
      type: Number,
      default: 64,
    },
    height: {
      type: Number,
      default: 64,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.fullname ? props.fullname : `${props.prefix}-${props.name}`}`);
    return { symbolId };
  },
});
</script>
