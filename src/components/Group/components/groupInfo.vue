<template>
  <h4>群属性管理</h4>
  <input type="file" ref="groupFile" />

  <button type="button" @click="getGroupInfo">获取群组信息</button>
  <button type="button" @click="modifyGroup">修改群组信息</button>
  <button type="button" @click="fetchGroupAnnouncement">获取群公告</button>
  <button type="button" @click="updateGroupAnnouncement">
    设置/更新群公告
  </button>
  <button type="button" @click="uploadGroupSharedFile">上传群共享文件</button>
  <button type="button" @click="downloadGroupSharedFile">下载群共享文件</button>
  <button type="button" @click="deleteGroupSharedFile">删除群共享文件</button>
  <button type="button" @click="fetchGroupSharedFileList">
    获取群共享文件列表
  </button>
</template>

<script setup>
import { ref, toRefs, defineProps, onMounted } from "vue";
const props = defineProps(["groupId", "groupName", "groupDesc", "fileId"]);
const { groupId, groupName, groupDesc, fileId } = toRefs(props);
const groupFile = ref(null);
// onMounted(() => {

// });

//获取群组信息
const getGroupInfo = () => {
  let options = {
    groupId: groupId.value, // 群组id
  };
  WebIM.conn.getGroupInfo(options).then((res) => {
    console.log("getGroupInfo success", res.data[0]);
  });
};
//修改群组信息
const modifyGroup = () => {
  let option = {
    groupId: groupId.value,
    groupName: groupName.value,
    description: groupDesc.value,
  };
  WebIM.conn
    .modifyGroup(option)
    .then((res) => console.log("modifyGroup success", res));
};
//获取群公告
const fetchGroupAnnouncement = () => {
  let option = {
    groupId: groupId.value,
  };
  WebIM.conn
    .fetchGroupAnnouncement(option)
    .then((res) => console.log("fetchGroupAnnouncement success", res.data));
};

//设置/修改群公告
const updateGroupAnnouncement = () => {
  let option = {
    groupId: groupId.value,
    announcement: "群公告已设置更新",
  };
  WebIM.conn
    .updateGroupAnnouncement(option)
    .then((res) => console.log("updateGroupAnnouncement success", res.data));
};

//上传群共享文件
const uploadGroupSharedFile = () => {
  const file = groupFile.value.files[0];
  console.log("file", file);
  let option = {
    groupId: groupId.value,
    file: file, // <input type="file"/>获取的文件对象。
    onFileUploadProgress: function (resp) {
      console.log("onFileUploadProgress", resp);
    }, // 上传进度的回调。
    onFileUploadComplete: function (resp) {
      console.log("onFileUploadComplete", resp);
    }, // 上传完成时的回调。
    onFileUploadError: function (e) {}, // 上传失败的回调。
    onFileUploadCanceled: function (e) {}, // 上传取消的回调。
  };
  WebIM.conn.uploadGroupSharedFile(option);
};
//下载群共享文件
const downloadGroupSharedFile = () => {
  let option = {
    groupId: groupId.value,
    fileId: fileId.value, // 文件 ID。
    onFileDownloadComplete: function (resp) {
      console.log("downloadGroupSharedFile success", resp);
    }, // 下载成功的回调。
    onFileDownloadError: function (e) {
      console.log("downloadGroupSharedFile fail", e);
    }, // 下载失败的回调。
  };
  WebIM.conn.downloadGroupSharedFile(option);
};
//删除群共享文件
const deleteGroupSharedFile = () => {
  let option = {
    groupId: groupId.value,
    fileId: fileId.value, // 文件 ID。
  };
  WebIM.conn
    .deleteGroupSharedFile(option)
    .then((res) => console.log("deleteGroupSharedFile success", res.data));
};
//获取群共享文件
const fetchGroupSharedFileList = () => {
  let option = {
    groupId: groupId.value,
  };
  WebIM.conn
    .fetchGroupSharedFileList(option)
    .then((res) => console.log("fetchGroupSharedFileList success", res.data));
};
</script>

<style lang="scss" scoped>
</style>