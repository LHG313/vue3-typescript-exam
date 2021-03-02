import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 CSS 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import TitleBar from './comeponents/TitleBar.vue'

// 페이지 불러오기
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'

// 라우팅 정보 구성
const routes = [
  { path: '/', component: HomeMainPage },
  { path: '/article/list', component: ArticleListPage }
]

// 라우터 생성
const router = createRouter({
  
  history: createWebHistory(),
  routes
})

// 앱 생성
const app = createApp(App)

app.component('TitleBar', TitleBar);

// 앱에 라우터 적용
app.use(router)

// 앱 표시
app.mount('#app')
