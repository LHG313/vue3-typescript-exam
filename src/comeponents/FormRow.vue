<template>
  <div class="form-row flex">
    <div class="w-32 flex justify-center">
      <span class="flex items-center">{{title}}</span>
    </div>
    <div class="flex-grow">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  name: 'FormRow',
})
</script>

<style lang="postcss">
.form-row-input{
  @apply w-full rounded-sm;
}

textarea.form-row-input{
   min-height: theme('spacing.72');
}

.form-row + .form-row{
   @apply mt-2;
}
</style>

<style scoped>
</style>