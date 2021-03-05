<template>
<TitleBar>홈 메인</TitleBar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeMainPage',
 props: {
    globalShare: {
      type: Object,
      required: true
    }
  },
})
</script>

<style scoped>

</style>