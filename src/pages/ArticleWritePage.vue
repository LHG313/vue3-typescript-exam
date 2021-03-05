<template>
  <TitleBar>게시물 작성</TitleBar>
  
  <section class="section section-article-write-form px-2">
    <div class="container mx-auto">
        <div class="px-6 py-6 bg-white rounded-lg shadow-md">
         <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndWriteArticle">
          <FormRow title="게시판">
            <select class="form-row-select" ref="newArticleBoardIdElRef">
              <option value="1">공지사항</option>
              <option value="2">자유</option>
            </select>
          </FormRow>
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
        <div v-else>
          <route-link class="btn-link" to="/member/login">로그인</route-link> 후 이용해주세요.
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { IArticle } from '../types/'
import { MainApi } from '../apis/'
import { Router } from 'vue-router';
export default defineComponent({
  name: 'ArticleWritePage',
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
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const newArticleBoardIdElRef = ref<HTMLInputElement>();
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();
    onMounted(() => {
      if ( newArticleBoardIdElRef.value == null ) {
        return;
      }
      
      newArticleBoardIdElRef.value.value = props.boardId + "";
    })
    const state = reactive({
      articles: [] as IArticle[]
    });
    function checkAndWriteArticle() {
      if ( newArticleBoardIdElRef.value == null ) {
        return;
      }
      const newArticleBoardIdEl = newArticleBoardIdElRef.value;
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
      writeArtile(parseInt(newArticleBoardIdEl.value), newArticleTitleEl.value, newArticleBodyEl.value);
      newArticleTitleEl.value = '';
      newArticleBodyEl.value = '';
      newArticleTitleEl.focus();
    }
    function writeArtile(boardId:number, title:string, body:string) {
      mainApi.article_doWrite(boardId, title, body)
        .then(axiosResponse => {
          const newArticleId = axiosResponse.data.body.id;
          alert(newArticleId + "번 글이 생성되었습니다.");
          router.push("detail?id=" + newArticleId);
        });
    }
    return {
      state,
      checkAndWriteArticle,
      newArticleBoardIdElRef,
      newArticleTitleElRef,
      newArticleBodyElRef
    }
  }
})
</script>

<style scoped>
</style>