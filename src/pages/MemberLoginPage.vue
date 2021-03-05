<template>
  <TitleBar>로그인</TitleBar>

  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined == false" v-on:submit.prevent="checkAndLogin">
          <FormRow title="로그인아이디">
            <input ref="loginIdElRef" class="form-row-input" type="text" placeholder="아이디를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인비밀번호">
            <input ref="loginPwElRef" class="form-row-input" type="password" placeholder="로그인비밀번호를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인">
            <div class="btns">
              <input type="submit" value="로그인" class="btn-primary" />
            </div>
          </FormRow>
        </form>
        <div v-else>
          이미 로그인 되었습니다. <route-link class="btn-link" to="/">홈</route-link> 으로 이동
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
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const loginIdElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    function checkAndLogin() {
      if ( loginIdElRef.value == null ) {
        return;
      }
      const loginIdEl = loginIdElRef.value;
      loginIdEl.value = loginIdEl.value.trim();
      if ( loginIdEl.value.length == 0 ) {
        alert('로그인 아이드를 입력해주세요.');
        loginIdEl.focus();
        return;
      }
      if ( loginPwElRef.value == null ) {
        return;
      }
      const loginPwEl = loginPwElRef.value;
      loginPwEl.value = loginPwEl.value.trim();
      if ( loginPwEl.value.length == 0 ) {
        alert('로그인 비번을 입력해주세요.');
        loginPwEl.focus();
        return;
      }
      login(loginIdEl.value, loginPwEl.value);
    }
    function login(loginId:string, loginPw:string) {
      mainApi.member_authKey(loginId, loginPw)
        .then(axiosResponse => {
          const authKey = axiosResponse.data.body.authKey;
          const loginedMemberId = axiosResponse.data.body.id;
          const loginedMemberName = axiosResponse.data.body.name;
          const loginedMemberNickname = axiosResponse.data.body.nickname;
          localStorage.setItem("authKey", authKey);
          localStorage.setItem("loginedMemberId", loginedMemberId + "");
          localStorage.setItem("loginedMemberName", loginedMemberName);
          localStorage.setItem("loginedMemberNickname", loginedMemberNickname);
          props.globalShare.loginedMember = {
            authKey,
            id:loginedMemberId,
            name:loginedMemberName,
            nicknam:loginedMemberNickname,
          };
          alert(axiosResponse.data.msg);
          router.replace('/')
        });
    }
    return {
      checkAndLogin,
      loginIdElRef,
      loginPwElRef
    }
  }
})
</script>

<style scoped>
</style> 