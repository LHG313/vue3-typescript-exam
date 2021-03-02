<template>
  <TitleBar>게시물 리스트</TitleBar>
  
  <section class="article-write-form-box">
    <div class="container mx-auto">
      <form action="">
        <FormRow title="제목">
          <input class="form-row-input" type="text" placeholder="제목을 입력해주세요.">
        </FormRow>
        <FormRow title="내용">
          <textarea class="form-row-input" placeholder="내용을 입력해주세요."></textarea>
        </FormRow>
        <FormRow title="작성">
          <input type="button" value="작성" class="btn-primary" />
        </FormRow>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ArticleListPage',
})
</script>

<style scoped>
</style>