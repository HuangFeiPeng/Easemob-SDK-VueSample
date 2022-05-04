<template>
  <!-- 登陆注册部分 -->
  <div class="app-contanier">
    <!-- 登陆注册部分 -->
    <div class="login_box">
      <form autocomplete="off">
        <!-- 输入用户ID -->
        <div class="input_list">
          <label for="hxId">
            环信ID：
            <input
              id="hxId"
              type="text"
              v-model.trim="hxId"
              placeholder="输入环信ID..."
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
            />
          </label>
        </div>
        <!-- 输入环信密码 -->
        <div class="input_list">
          <label for="hxPwd">
            环信密码：
            <input
              id="hxPwd"
              type="text"
              v-model.trim="hxPwd"
              placeholder="输入环信密码..."
              @keyup.enter="login"
            />
          </label>
        </div>
        <!-- 输入环信Token -->
        <div class="input_list">
          <label for="hxToken">
            环信token登陆：
            <input
              id="hxToken"
              type="text"
              v-model.trim="hxToken"
              placeholder="输入环信token..."
              @keyup.enter="tokenLogin"
            />
          </label>
        </div>
        <!-- 功能button -->
        <div class="btn_box">
          <button v-if="isLogin" type="button" @click="login">登陆</button>
          <button v-if="isLogin" type="button" @click="tokenLogin">
            Token登陆
          </button>
          <button type="button" v-if="!isLogin" @click="registerUser">
            注册
          </button>
          <button type="button" v-if="isLogin" @click="exit">退出</button>

          <button
            type="button"
            @click="isLogin = !isLogin"
            v-text="isLogin ? '去注册' : '去登陆'"
          ></button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import "./index.css";
export default {
  setup() {
    const isLogin = ref(true);
    const hxId = ref("");
    const hxPwd = ref("");
    const hxToken = ref("");

    const login = async () => {
      let params = {
        user: hxId.value,
        pwd: hxPwd.value,
      };
      try {
        let res = await WebIM.conn.open(params);
        console.log("get token success", res);
      } catch (error) {
        console.log(">>>>login fail", error);
      }
    };
    const tokenLogin = () => {
      let params = {
        user: hxId.value,
        accessToken: hxToken.value,
      };
      WebIM.conn.open(params);
    };
    const exit = () => {
      WebIM.conn.close();
    };
    const registerUser = () => {
      WebIM.conn
        .registerUser({
          username: hxId.value,
          password: hxPwd.value,
        })
        .then((res) => {
          console.log("registerUser success", res);
        })
        .catch((e) => {
          console.log("registerUser fail>>>", e);
        });
    };
    return {
      isLogin,
      hxId,
      hxPwd,
      hxToken,
      login,
      tokenLogin,
      exit,
      registerUser,
    };
  },
};
</script>