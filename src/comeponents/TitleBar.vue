<template>
  <section class="title-bar">
    <h1 class="container mx-auto">
      <slot></slot>
    </h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleBar',
})
</script>

<style scoped>
</style>