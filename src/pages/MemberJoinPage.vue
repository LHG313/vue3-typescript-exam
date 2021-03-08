<template>
  <TitleBar>로그인</TitleBar>

  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined == false" v-on:submit.prevent="checkAndJoin">
          <FormRow title="로그인아이디">
            <input ref="loginIdElRef" class="form-row-input" type="text" placeholder="아이디를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인비밀번호">
            <input ref="loginPwElRef" class="form-row-input" type="password" placeholder="로그인비밀번호를 입력해주세요.">
          </FormRow>
          <FormRow title="로그인비밀번호확인">
            <input ref="loginPwConfirmElRef" class="form-row-input" type="password" placeholder="로그인비밀번호확인을 입력해주세요.">
          </FormRow>
          <FormRow title="이름">
            <input ref="nameElRef" class="form-row-input" type="text" placeholder="이름을 입력해주세요.">
          </FormRow>
          <FormRow title="닉네임">
            <input ref="nicknameElRef" class="form-row-input" type="text" placeholder="닉네임을 입력해주세요.">
          </FormRow>
          <FormRow title="전화번호">
            <input ref="cellphoneNoElRef" class="form-row-input" type="tel" placeholder="전화번호를 입력해주세요.">
          </FormRow>
          <FormRow title="이메일">
            <input ref="emailElRef" class="form-row-input" type="email" placeholder="이메일을 입력해주세요.">
          </FormRow>
          <FormRow title="가입">
            <div class="btns">
              <input type="submit" value="가입" class="btn-primary" />
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
import { MainApi } from '../apis/'
import { Router } from 'vue-router';
export default defineComponent({
  name: 'MemberJoinPage',
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
    const loginPwConfirmElRef = ref<HTMLInputElement>();
    const nameElRef = ref<HTMLInputElement>();
    const nicknameElRef = ref<HTMLInputElement>();
    const cellphoneNoElRef = ref<HTMLInputElement>();
    const emailElRef = ref<HTMLInputElement>();
    function checkAndJoin() {
      // 로그인아이디 체크
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
      // 로그인비번 체크
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
      // 로그인비번확인 체크
      if ( loginPwConfirmElRef.value == null ) {
        return;
      }
      const loginPwConfirmEl = loginPwConfirmElRef.value;
      if ( loginPwEl.value != loginPwConfirmEl.value ) {
        alert('로그인 비번이 일치하지 않습니다.');
        loginPwConfirmEl.focus();
        return;
      }
      // 이름 체크
      if ( nameElRef.value == null ) {
        return;
      }
      const nameEl = nameElRef.value;
      nameEl.value = nameEl.value.trim();
      if ( nameEl.value.length == 0 ) {
        alert('이름을 입력해주세요.');
        nameEl.focus();
        return;
      }
      // 별명 체크
      if ( nicknameElRef.value == null ) {
        return;
      }
      const nicknameEl = nicknameElRef.value;
      nicknameEl.value = nicknameEl.value.trim();
      if ( nicknameEl.value.length == 0 ) {
        alert('별명을 입력해주세요.');
        nicknameEl.focus();
        return;
      }
      // 휴대전화번호 체크
      if ( cellphoneNoElRef.value == null ) {
        return;
      }
      const cellphoneNoEl = cellphoneNoElRef.value;
      cellphoneNoEl.value = cellphoneNoEl.value.trim();
      if ( cellphoneNoEl.value.length == 0 ) {
        alert('휴대전화번호를 입력해주세요.');
        cellphoneNoEl.focus();
        return;
      }
      // 이메일 체크
      if ( emailElRef.value == null ) {
        return;
      }
      const emailEl = emailElRef.value;
      emailEl.value = emailEl.value.trim();
      if ( emailEl.value.length == 0 ) {
        alert('이메일을 입력해주세요.');
        emailEl.focus();
        return;
      }
      join(loginIdEl.value, loginPwEl.value, nameEl.value, nicknameEl.value, cellphoneNoEl.value, emailEl.value);
    }
    function join(loginId:string, loginPw:string, name:string, nickname:string, cellphoneNo:string, email:string) {
      mainApi.member_doJoin(loginId, loginPw, name, nickname, cellphoneNo, email)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          router.replace('/member/login?loginId=' + loginId)
        });
    }
    return {
      checkAndJoin,
      loginIdElRef,
      loginPwElRef,
      loginPwConfirmElRef,
      nameElRef,
      nicknameElRef,
      cellphoneNoElRef,
      emailElRef,
    }
  }
})
</script>

<style scoped>
</style> 