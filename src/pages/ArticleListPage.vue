<template>
  <TitleBar>게시물 리스트</TitleBar>
  
  <section class="section section-article-write-form px-2">
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
          </div>
        </FormRow>
      </form>
    </div>
  </section>


  <section class="section section-article-list px-2">
    <div class="container mx-auto">
  
<div class="mt-6" v-bind:key="article.id" v-for="article in state.articles">
  <div class="px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">
        2021-03-02 22:50:10
      </span>
      <a href="#" class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
        자유
        </a>
  </div>
  <div class="mt-2">
    <a href="#" class="text-2xl text-gray-700 font-bold hover:underline">Build
        {{article.title}}
        </a>
      <p class="mt-2 text-gray-600">
        {{article.body}}
      </p>
  </div>
  <div class="flex justify-between items-center mt-4">
    <a href="#" class="text-blue-500 hover:underline">자세히 보기</a>
    <div>
      <a href="#" class="flex items-center">
        <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80" alt="avatar" class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block">
        <h1 class="text-gray-700 font-bold hover:underline">홍길동</h1>
        </a>
        </div>
       </div>
      </div>
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