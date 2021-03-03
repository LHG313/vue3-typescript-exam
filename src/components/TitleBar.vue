<template>
  <section class="title-bar px-2">
    <h1 class="container mx-auto text-3xl mt-3 mb-3">
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