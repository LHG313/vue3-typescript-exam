import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 CSS 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import TitleBar from './components/TitleBar.vue';
import FormRow from './components/FormRow.vue';

// 페이지 불러오기
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'
import ArticleWritePage from './pages/ArticleWritePage.vue'
import ArticleDetailPage from './pages/ArticleDetailPage.vue'

// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();

// 라우팅 정보 구성
const routes = [
  {
    path: '/',
    component: HomeMainPage,
  },
  {
    path: '/article/list',
    component: ArticleListPage,
    props: (route:any) => ({ boardId: route.query.boardId })
  },
  {
    path: '/article/detail',
    component: ArticleDetailPage,
    props: (route:any) => ({ id: route.query.id })
  },
  {
    path: '/article/write',
    component: ArticleWritePage,
    props: (route:any) => ({ boardId: route.query.boardId })
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 앱 생성
const app = createApp(App)

// 전력 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;

// 전역 컴포넌트 등록
app.component('TitleBar', TitleBar);
app.component('FormRow', FormRow);

// 앱에 라우터 적용
app.use(router)

// 앱 표시
app.mount('#app')