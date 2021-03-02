<template>
  <header class="header-bar h-40 bg-black text-white">
    <div class="container mx-auto flex h-full">
      <router-link to="/" class="h-full flex items-center">
        <img class="block w-20" src="./assets/logo.png" alt="">
      </router-link>

      <div class="flex-grow"></div>

      <nav class="header-bar__menu-box-1">
        <ul class="flex h-full">
          <li>
            <router-link to="/" class="h-full flex items-center font-bold px-10 hover:bg-white hover:text-black">
              HOME
            </router-link>
          </li>
          <li>
            <router-link to="/article/list" class="h-full flex items-center font-bold px-10 hover:bg-white hover:text-black">
              ARTICLE LIST
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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>

<style>
html, body {
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>