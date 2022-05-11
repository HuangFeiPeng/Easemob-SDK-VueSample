<template>
  <div>
    <h3>在线状态订阅</h3>
    <input type="text" v-model="userId" placeholder="输入要订阅的用户id" />
    <button @click="addNewPresenceUser">添加</button>
    <br />
    <button @click="publisOnline">发布在线状态</button>
    <button @click="subscribePresence">订阅用户的在线状态</button>
    <button @click="unsubscribePresence">取消订阅用户的在线状态</button>
    <button @click="getSubscribedPresenceList">查询被订阅用户列表</button>
    <div>
      <div v-for="item in presenceUserIdList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
let presenceUserIdList = reactive([]);
let userId = ref('');
const publisOnline = () => {
  let option = {
    description: 'online',
  };
  WebIM.conn.publishPresence(option).then((res) => {
    console.log('>>>>>>>在线状态发布成功', res);
  });
};
const addNewPresenceUser = () => {
  presenceUserIdList.push(userId.value);
  userId.value = '';
  console.log(presenceUserIdList);
};
const subscribePresence = () => {
  let option = {
    usernames: presenceUserIdList,
    expiry: 7 * 24 * 3600, // 秒
  };
  WebIM.conn.subscribePresence(option).then((res) => {
    console.log('>>>>>订阅成功', res);
  });
};
const unsubscribePresence = () => {
  let option = {
    usernames: presenceUserIdList,
  };
  WebIM.conn.unsubscribePresence(option).then((res) => {
    console.log('>>>>>取消订阅成功', res);
  });
};

const getSubscribedPresenceList = () => {
  let option = {
    pageNum: 0,
    pageSize: 50,
  };
  WebIM.conn.getSubscribedPresenceList(option).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped></style>
