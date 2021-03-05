<template>
  <TitleBar>게시물 리스트</TitleBar>
  
  <section class="section section-article-list px-2">
    <div class="container mx-auto">
      <div class="mt-6" v-bind:key="article.id" v-for="article in state.articles">
        <div class="px-6 py-6 bg-white rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">
              {{ article.regDate }}
            </span>
            <router-link :to="'list?boardId=' + article.boardId" class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
              {{ article.boardId == 1 ? "공지" : "자유" }}
            </router-link>
          </div>
          <div class="mt-2">
            <router-link :to="'detail?id=' + article.id" class="text-2xl text-gray-700 font-bold hover:underline">
              {{ article.title }}
            </router-link>
            <p class="mt-2 text-gray-600">
              {{ article.body }}
            </p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <router-link :to="'detail?id=' + article.id" class="text-blue-500 hover:underline">
              자세히 보기
            </router-link>
            <div>
              <router-link :to="'detail?id=' + article.id" class="flex items-center">
                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80" alt="avatar" class="mx-4 w-10 h-10 object-cover rounded-full">
                <h1 class="text-gray-700 font-bold hover:underline">{{article.extra__writer}}</h1>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
    globalShare: {
      type: Object,
      required: true
    },
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