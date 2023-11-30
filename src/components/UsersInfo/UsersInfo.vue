<template>
  <div class="app-contanier">
    <div class="user_Info">
      <h3>用户属性部分</h3>
      昵称：<input type="text" placeholder="nickname" v-model="nickname" />
      <br />
      头像：<input type="text" placeholder="avatarurl" v-model="avatarurl" />
      <br />
      E-mail：<input type="email" placeholder="email" v-model="email" />
      <br />
      phone：<input type="text" placeholder="phone" v-model="phone" />
      <br />
      man：<input type="radio" name="gender" v-model="gender" value="man" />
      woman：<input type="radio" name="gender" v-model="gender" value="woman" />
      <br />
      个性签名：<input type="text" placeholder="sign" v-model="sign" />
      <br />
      生日：<input type="text" placeholder="birth" v-model="birth" />
      <p style="color: red">*以及ext为对象，可以扩展一系列的自定义属性。</p>
      <input
        type="button"
        value="设置当前用户全部属性"
        @click="updateUserInfo"
      />

      <input
        type="button"
        value="获取当前登陆用户属性"
        @click="fetchUserInfoById"
      />
    </div>
  </div>
</template>

<script>
import './index.css';
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      nickname: '昵称',
      avatarurl: 'http://avatarurl',
      mail: '123@qq.com',
      phone: '16888888888',
      gender: 'man',
      birth: '2000-01-01',
      sign: 'a sign',
      email: '1094521084@qq.com',
      ext: {
        nationality: 'China',
        merit: 'Hello，世界！',
      },
    });
    //设置全部用户属性
    const updateUserInfo = () => {
      let options = {
        ...state,
      };
      WebIM.conn.updateUserInfo(options).then((res) => {
        console.log(res);
      });
    };
    //获取用户属性
    const fetchUserInfoById = () => {
      /**
       * @param {String|Array} users - 用户id
       * @param {String|Array} properties - 查询属性
       */
      WebIM.conn.fetchUserInfoById(WebIM.conn.user).then((res) => {
        console.log(res);
      });

      // 同时查询多个用户属性
      // WebIM.conn
      //   .fetchUserInfoById(["user1", "user2"], ["nickname", "avatarurl"])
      //   .then((res) => {
      //     console.log(res);
      //   });
    };
    return {
      updateUserInfo,
      fetchUserInfoById,
      ...toRefs(state),
    };
  },
};
</script>
