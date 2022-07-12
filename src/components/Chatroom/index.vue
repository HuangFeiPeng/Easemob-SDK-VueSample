<template>
  <div class="app-contanier">
    <div class="chatRoom_box">
      <h3>聊天室部分</h3>
      <button @click="joinChatRoom">加入聊天室</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const joinChatRoom = () => {
      let option = {
        roomId: '186336627720193',
        message: 'reason'
      }
      WebIM.conn.joinChatRoom(option).then(res => console.log(res)).catch(e => {
        console.log('>>>>>加入失败', e)
      })
    }

    return {
      joinChatRoom
    }
  }
};
</script>

<style  scoped>
.app-contanier {
  background: rgba(78, 111, 242, 0.281);
  padding: 10px;
}
</style>