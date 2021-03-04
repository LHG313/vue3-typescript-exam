<template>
  <TitleBar>게시물 상세</TitleBar>
  
  <section class="section section-article-write-form px-2">
    <div class="container mx-auto">
      
    </div>
  </section>

  
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IArticle } from '../types/'
import { MainApi } from '../apis/'
export default defineComponent({
  name: 'ArticleListPage',
  props: {
    boardId: {
      type: Number,
      required: true,
      default:1
    }
  },
  setup(props) {
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();
    const state = reactive({
      articles: [] as IArticle[]
    });
    function loadArticles(boardId:number) {
      mainApi.article_list(boardId)
      .then(axiosResponse => {
        state.articles = axiosResponse.data.body.articles;
      });
    }
    onMounted(() => {
      loadArticles(props.boardId);
    });
    watch(() => props.boardId, (newValue, oldValue) => {
      loadArticles(props.boardId);
    })
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