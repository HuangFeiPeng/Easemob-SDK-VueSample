<template>
  <h4>群成员管理</h4>
  <button type="button" @click="inviteUsertoGroup">邀请用户入群</button>
  <button type="button" @click="removeGroupMember">群组踢人</button>
  <button type="button" @click="changeGroupOwner">变更群主</button>
  <button type="button" @click="addGroupNewAdmin">添加群管理员</button>
  <button type="button" @click="removeGroupAdmin">移除群管理员</button>
  <br />
  <button type="button" @click="getGroupBlacklist">获取群黑名单列表</button>
  <button type="button" @click="blockGroupMembers">添加成员至群黑名单</button>
  <button type="button" @click="unblockGroupMembers">将用户移出群黑名单</button>
  <br />
  <button type="button" @click="getGroupMuteList">获取群禁言列表</button>
  <button type="button" @click="muteGroupMember">禁言指定群成员</button>
  <button type="button" @click="unmuteGroupMember">
    将指定用户移出禁言列表
  </button>
  <button type="button" @click="disableSendGroupMsg">开启群全员禁言</button>
  <button type="button" @click="enableSendGroupMsg">关闭群全员禁言</button>
  <br />
  <button type="button" @click="getGroupWhitelist">获取群白名单列表</button>
  <button type="button" @click="addUsersToGroupWhitelist">
    添加成员至群白名单
  </button>
  <button type="button" @click="removeGroupWhitelistMember">
    将成员移出群白名单
  </button>
  <button type="button" @click="isInGroupWhiteList">
    检查成员是否在群白名单中
  </button>
</template>

<script >
import { reactive, ref, toRefs, watch } from "vue";

export default {
  props: ["groupUserId", "groupId"],
  setup(props) {
    const { groupUserId, groupId } = toRefs(props);
    //邀请群成员入群
    const inviteUsertoGroup = () => {
      let option = {
        users: [groupUserId.value],
        groupId: groupId.value,
      };

      WebIM.conn
        .inviteUsersToGroup(option)
        .then((res) => console.log("inviteUsersToGroup uses send", res.data));
    };
    //群组踢人
    const removeGroupMember = () => {
      let option = {
        groupId: groupId.value,
        username: groupUserId.value,
      };
      WebIM.conn
        .removeGroupMember(option)
        .then((res) => console.log("removeGroupMember success", res));
    };
    //变更群主
    const changeGroupOwner = () => {
      let option = {
        groupId: groupId.value,
        newOwner: groupUserId.value,
      };
      WebIM.conn
        .changeGroupOwner(option)
        .then((res) => console.log("changeGroupOwner", res.data));
    };
    //添加群管理员
    const addGroupNewAdmin = () => {
      let option = {
        groupId: groupId.value,
        username: groupUserId.value,
      };
      WebIM.conn
        .setGroupAdmin(option)
        .then((res) => console.log("setGroupAdmin success", res));
    };
    //移出群管理员
    const removeGroupAdmin = () => {
      let option = {
        groupId: groupId.value,
        username: groupUserId.value,
      };
      WebIM.conn
        .removeAdmin(option)
        .then((res) => console.log("removeAdmin success", res));
    };
    //获取黑名单的用户列表
    const getGroupBlacklist = () => {
      let option = {
        groupId: groupId.value,
      };
      WebIM.conn
        .getGroupBlacklist(option)
        .then((res) => console.log("getGroupBlacklist success", res));
    };
    //添加成员至黑名单
    const blockGroupMembers = () => {
      let option = {
        groupId: groupId.value,
        usernames: [groupUserId.value],
      };
      WebIM.conn
        .blockGroupMembers(option)
        .then((res) => console.log("blockGroupMembers success", res));
    };
    //将成员移出黑名单
    const unblockGroupMembers = () => {
      let option = {
        groupId: groupId.value,
        usernames: [groupUserId.value],
      };
      WebIM.conn
        .unblockGroupMembers(option)
        .then((res) => console.log("unblockGroupMembers success", res));
    };
    //获取禁言列表
    const getGroupMuteList = () => {
      let option = {
        groupId: groupId.value,
      };
      WebIM.conn
        .getGroupMuteList(option)
        .then((res) => console.log("getGroupMuteList success", res.data));
    };
    //将成员加入禁言名单
    const muteGroupMember = () => {
      let option = {
        groupId: groupId.value,
        username: groupUserId.value,
        muteDuration: 886400000, // 禁言时长，单位为毫秒。
      };
      WebIM.conn
        .muteGroupMember(option)
        .then((res) => console.log("muteGroupMember success", res.data));
    };
    //将指定成员移出禁言列表
    const unmuteGroupMember = () => {
      let option = {
        groupId: groupId.value,
        username: groupUserId.value,
      };
      WebIM.conn
        .unmuteGroupMember(option)
        .then((res) => console.log("unmuteGroupMember success", res.data));
    };
    //开启全员群禁言
    const disableSendGroupMsg = () => {
      let options = {
        groupId: groupId.value,
      };
      WebIM.conn
        .disableSendGroupMsg(options)
        .then((res) => console.log("disableSendGroupMsg success", res.data));
    };
    //关闭全员群禁言
    const enableSendGroupMsg = () => {
      let options = {
        groupId: groupId.value,
      };
      WebIM.conn
        .enableSendGroupMsg(options)
        .then((res) => console.log("enableSendGroupMsg success", res.data));
    };

    //获取白名单成员列表
    const getGroupWhitelist = () => {
      let options = {
        groupId: groupId.value,
      };
      WebIM.conn
        .getGroupWhitelist(options)
        .then((res) => console.log("getGroupWhitelist success", res.data));
    };
    //添加成员至群白名单
    const addUsersToGroupWhitelist = () => {
      let option = {
        groupId: groupId.value,
        users: [groupUserId.value],
      };
      WebIM.conn
        .addUsersToGroupWhitelist(option)
        .then((res) =>
          console.log("addUsersToGroupWhitelist success", res.data)
        );
    };
    //移出成员从群禁言白名单
    const removeGroupWhitelistMember = () => {
      let option = {
        groupId: groupId.value,
        userName: groupUserId.value,
      };
      WebIM.conn
        .removeGroupWhitelistMember(option)
        .then((res) =>
          console.log("removeGroupWhitelistMember success", res.data)
        );
    };
    //检测自己或成员是否在群白名单
    //用户可以调用如下 API 检查群成员是否在群白名单中。 应用的管理员可查询所有用户，而普通用户只能查询自己：
    const isInGroupWhiteList = () => {
      let option = {
        groupId: groupId.value,
        userName: groupUserId.value,
      };
      WebIM.conn
        .isInGroupWhiteList(option)
        .then((res) => console.log("isInGroupWhiteList success", res.data));
    };
    return {
      groupUserId,
      inviteUsertoGroup,
      removeGroupMember,
      changeGroupOwner,
      addGroupNewAdmin,
      removeGroupAdmin,
      getGroupBlacklist,
      blockGroupMembers,
      unblockGroupMembers,
      getGroupMuteList,
      muteGroupMember,
      unmuteGroupMember,
      disableSendGroupMsg,
      enableSendGroupMsg,
      getGroupWhitelist,
      addUsersToGroupWhitelist,
      removeGroupWhitelistMember,
      isInGroupWhiteList,
    };
  },
};
</script>


<style  scoped>
</style>