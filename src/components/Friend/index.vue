<template>
  <div class="app-contanier">
    <div class="friend_box">
      <h3>好友部分</h3>
      <input v-model="userHxId" type="text" placeholder="要申请的目标ID" />
      <br />
      <button @click="getContacts">获取好友列表</button>
      <button @click="addContact">申请添加好友</button>
      <button @click="deleteContact">删除好友</button>
      <br />
      <button @click="getBlacklist">获取黑名单列表</button>
      <button @click="addUsersToBlacklist">添加用户至黑名单</button>
      <button @click="removeUserFromBlackList">将用户从黑名单移出</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const userHxId = ref("");
    //获取好友列表
    const getContacts = () => {
      WebIM.conn
        .getContacts()
        .then((res) => {
          console.log("getContacts success", res.data); // res.data > ['user1', 'user2']
        })
        .catch((e) => {
          console.log("getContacts fail", e);
        });
    };
    //添加好友
    const addContact = () => {
      let message = "加个好友呗!";
      WebIM.conn.addContact(userHxId.value, message);
      console.log("addContact send");
    };
    //删除好友
    const deleteContact = () => {
      WebIM.conn.deleteContact(userHxId.value);
    };

    //获取黑名单列表
    const getBlacklist = () => {
      WebIM.conn.getBlacklist().then((res) => {
        console.log("getBlacklist success", res.data); // res.data > ['user1', 'user2']
      });
    };
    //添加用户至黑名单
    const addUsersToBlacklist = () => {
      /**
       * 添加单个用户 ID；批量添加多个用户 ID 组成的数组，如 ["user1","user2",...]。
       * @param {String|Array} name 用户 ID。
       */
      WebIM.conn.addUsersToBlacklist({
        name: userHxId.value,
      });
    };
    //从黑名单列表中删除
    const removeUserFromBlackList = () => {
      /**
       * 删除单个用户 ID；批量删除多个用户 ID 组成的数组，如["user1","user2",...]。
       * @param {String|Array} name 用户 ID。
       */
      WebIM.conn.removeUserFromBlackList({
        name: userHxId.value,
      });
    };
    return {
      userHxId,
      getContacts,
      addContact,
      deleteContact,
      getBlacklist,
      addUsersToBlacklist,
      removeUserFromBlackList,
    };
  },
};
</script>

<style scoped>
.app-contanier {
  background: rgba(78, 111, 242, 0.281);
  padding: 10px;
}
</style>