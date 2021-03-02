import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'
import './index.css'


const routes = [
  { path: '/', component: HomeMainPage },
  { path: '/article/list', component: ArticleListPage }
]

const router = createRouter({
  
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
