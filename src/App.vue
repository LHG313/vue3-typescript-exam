<template>
  <header class="header-bar h-20 bg-black text-white">
    <div class="container mx-auto flex h-full">
      <router-link to="/" class="h-full flex items-center px-2">
        <img class="block w-10" src="./assets/logo.png" alt="">
      </router-link>

      <div class="flex-grow"></div>

      <nav class="header-bar__menu-box-1  overflow-x-auto">
        <ul class="flex h-full">
          <li>
            <router-link to="/" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              홈
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/member/login" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              로그인
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/member/join" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              회원가입
            </router-link>
          </li>
          <li v-if="globalShare.isLogined">
            <a v-on:click="globalShare.logout" class="cursor-pointer h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              로그아웃
            </a>
          </li>
          <li v-if="globalShare.isLogined">
            <router-link to="/article/write" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              글 작성
            </router-link>
          </li>
          <li>
            <router-link to="/article/list?boardId=1" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              공지사항 리스트
            </router-link>
          </li>
          <li>
            <router-link to="/article/list?boardId=2" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              자유 리스트
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
//import * as Util from './utils/'
export default defineComponent({
  name: 'App',
  props: {
    globalShare: {
      type: Object,
      required: true
    },
  },
  setup() {
    
  }
})
</script>

<style lang="postcss">
.btn-type-1 {
  @apply py-2 px-4 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer;
}
.btn-primary {
  @apply py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 btn-type-1;
}
.btn-secondary {
  @apply py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 btn-type-1;
}
.btn-success {
  @apply py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 btn-type-1;
}
.btn-danger {
  @apply py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 btn-type-1;
}
.btn-warning {
  @apply py-2 px-4 bg-yellow-600 hover:bg-yellow-700 btn-type-1;
}
.btn-info {
  @apply py-2 px-4 bg-purple-600 hover:bg-purple-700 btn-type-1;
}
.btn-link {
  @apply underline text-blue-500 hover:text-red-500 cursor-pointer;
}
.btns > [class*="btn-"] + [class*="btn-"] {
  margin-left: theme('spacing.2');
}
</style>