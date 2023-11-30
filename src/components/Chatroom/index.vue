<template>
  <div class="app-contanier">
    <div class="chatRoom_box">
      <h3>聊天室部分</h3>
      <button @click="joinChatRoom">加入聊天室</button>
      <button @click="leaveChatRoom">离开聊天室</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const joinChatRoom = () => {
      let option = {
        roomId: '195643847016451',
        message: 'reason',
      };
      WebIM.conn
        .joinChatRoom(option)
        .then((res) => console.log(res))
        .catch((e) => {
          console.log('>>>>>加入失败', e);
        });
    };
    //离开聊天室
    const leaveChatRoom = () => {
      let option = {
        roomId: '195643847016451',
      };
      WebIM.conn.leaveChatRoom(option).then((res) => console.log(res));
    };

    return {
      joinChatRoom,
      leaveChatRoom,
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
