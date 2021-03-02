<template>
  <TitleBar>게시물 리스트</TitleBar>
  
  <section class="section section-article-write-form">
    <div class="container mx-auto">
      <form v-on:submit.prevent="checkAndWriteArticle">
        <FormRow title="제목">
          <input ref="newArticleTitleElRef" class="form-row-input" type="text" placeholder="제목을 입력해주세요.">
        </FormRow>
        <FormRow title="내용">
          <textarea ref="newArticleBodyElRef" class="form-row-input" placeholder="내용을 입력해주세요."></textarea>
        </FormRow>
        <FormRow title="작성">
          <div class="btns">
            <input type="submit" value="작성" class="btn-primary" />
            <input type="button" value="작성" class="btn-secondary" />
            <input type="button" value="작성" class="btn-success" />
            <input type="button" value="작성" class="btn-danger" />
            <input type="button" value="작성" class="btn-warning" />
            <input type="button" value="작성" class="btn-info" />
          </div>
        </FormRow>
      </form>
    </div>
  </section>


  <section class="section section-article-list">
    <div class="container mx-auto">
      <div v-bind:key="article.id" v-for="article in state.articles">
        {{ article.id }} // {{ article.title }} // {{ article.body }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Article } from '../dtos/'
export default defineComponent({
  name: 'ArticleListPage',
  setup() {
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();
    const state = reactive({
      articles: [] as Article[]
    });
    function checkAndWriteArticle() {
      if ( newArticleTitleElRef.value == null ) {
        return;
      }
      const newArticleTitleEl = newArticleTitleElRef.value;
      newArticleTitleEl.value = newArticleTitleEl.value.trim();
      if ( newArticleTitleEl.value.length == 0 ) {
        alert('제목을 입력해주세요.');
        newArticleTitleEl.focus();
        return;
      }
      if ( newArticleBodyElRef.value == null ) {
        return;
      }
      const newArticleBodyEl = newArticleBodyElRef.value;
      newArticleBodyEl.value = newArticleBodyEl.value.trim();
      if ( newArticleBodyEl.value.length == 0 ) {
        alert('내용을 입력해주세요.');
        newArticleBodyEl.focus();
        return;
      }
      writeArtile(newArticleTitleEl.value, newArticleBodyEl.value);
      newArticleTitleEl.value = '';
      newArticleBodyEl.value = '';
      newArticleTitleEl.focus();
    }
    function writeArtile(title:string, body:string) {
      const newArticle = new Article(title, body);
      state.articles.push(newArticle);
    }
    return {
      state,
      checkAndWriteArticle,
      newArticleTitleElRef,
      newArticleBodyElRef
    }
  }
})
</script>

<style scoped>
</style>