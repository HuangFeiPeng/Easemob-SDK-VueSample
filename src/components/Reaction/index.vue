<script setup>
import { ref } from 'vue'
const msgId = ref('')
const targetId = ref('')
const addReaction = () => {
    WebIM.conn.addReaction({ messageId: msgId.value, reaction: "reaction" });
}

const fetchHistoryMessages = () => {
    WebIM.conn.fetchHistoryMessages({ queue: "pfh", count: 20 }).then((messages) => {
        console.log(messages);
    });
}
</script>
<template>

    <div class="app-contanier">
        <h3>Reaction</h3>
        <div class="reaction_box">
            <input type="text" placeholder="消息ID" v-model="msgId">
            <input type="text" placeholder="目标ID" v-model="targetId">
            <br />
            <button @click="addReaction">添加Reaction</button>
            <button>删除Reaction</button>
            <button>获取某消息的 Reaction 列表</button>
            <button>获取 Reaction 详情</button>
            <button @click="fetchHistoryMessages">获取漫游消息中的 Reaction</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
</style>