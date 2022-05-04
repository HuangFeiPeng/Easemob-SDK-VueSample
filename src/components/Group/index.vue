<template>
  <div class="app-contanier">
    <div class="group_box">
      <h3>群组部分</h3>

      <div class="createGroupCard">
        群id：<input v-model="groupId" type="text" placeholder="请输入群id" />
        群成员id：<input
          v-model="groupUserId"
          type="text"
          placeholder="请输入群组id"
        />
        文件id：
        <input v-model="fileId" type="text" placeholder="请输入文件id" />
        <form>
          <label for="groupName">
            groupName：<input
              id="groupName"
              v-model="groupName"
              type="text"
              placeholder="请输入群名称"
            />
          </label>
          <br />
          <label for="groupDesc">
            groupDesc:
            <textarea
              v-model="groupDesc"
              id="groupDesc"
              cols="30"
              rows="2"
              placeholder="请输入群详情"
            ></textarea>
            <br />
          </label>
          <label for="members">
            <input
              id="members"
              type="text"
              v-model="memberArr"
              placeholder="请输入要添加的群成员ID"
            /><input type="button" @click="addMember" value="添加" /> members:
            <span>{{ members }}</span>
          </label>
          <br />
          <label for="public">
            public：（是否为公开群）
            <input v-model="isPublic" type="checkbox" name="" id="public" />
          </label>
          <br />
          <label for="approval">
            approval：（加群是否需要审批）
            <input v-model="approval" type="checkbox" name="" id="approval" />
          </label>
          <br />
          <label for="allowinvites">
            allowinvites：（是否允许群成员邀请人加入此群）
            <input
              v-model="allowinvites"
              type="checkbox"
              name=""
              id="allowinvites"
            />
          </label>
          <br />
          <label for="inviteNeedConfirm">
            inviteNeedConfirm：（邀请加群时，受邀用户是否需确认）
            <input
              v-model="inviteNeedConfirm"
              type="checkbox"
              name=""
              id="inviteNeedConfirm"
            />
          </label>
          <br />
        </form>
      </div>
      <div class="button_box">
        <button type="button" @click="createNewGroup">创建群组</button>
        <button type="button" @click="destroyGroup">解散群组</button>
        <button type="button" @click="joinGroup">申请加入群组</button>
        <button type="button" @click="quitGroup">退出群组</button>
        <br />

        <button type="button" @click="getGroupList">获取加入的群组列表</button>
        <button type="button" @click="getListGroup">分页获取公开群</button>
        <button type="button" @click="getMemberList">获取群成员列表</button>
        <br />
        <GroupMember :groupUserId="groupUserId" :groupId="groupId" />
        <GroupInfo
          :groupId="groupId"
          :groupName="groupName"
          :groupDesc="groupDesc"
          :fileId="fileId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, toRaw } from "vue";
import GroupMember from "./components/groupMember.vue";
import GroupInfo from "./components/groupInfo.vue";
export default {
  components: {
    GroupMember,
    GroupInfo,
  },
  setup() {
    const createGroupForm = reactive({
      groupName: "",
      groupDesc: "",
      members: [],
      isPublic: false,
      approval: false,
      allowinvites: false,
      inviteNeedConfirm: true,
    });
    const groupId = ref("");
    const groupUserId = ref("");
    const fileId = ref("");
    let memberArr = ref("");
    let globalCursor = ref(null);
    let pageNum = 1,
      pageSize = 1000;
    //添加群成员列表
    const addMember = () => {
      createGroupForm.members.push(memberArr.value);
      memberArr.value = "";
    };
    //创建群组
    const createNewGroup = () => {
      let option = {
        /* 4.0.3SDK fix 按照文档可不将options放入data对象中 */
        data: {
          groupname: createGroupForm.groupName,
          desc: createGroupForm.groupDesc,
          members: createGroupForm.members,
          public: createGroupForm.isPublic,
          approval: createGroupForm.approval,
          allowinvites: createGroupForm.allowinvites,
          inviteNeedConfirm: createGroupForm.inviteNeedConfirm,
        },
      };
      WebIM.conn
        .createGroup(option)
        .then((res) => console.log("creategroup success", res));
    };
    //解散群组
    const destroyGroup = () => {
      if (groupId.value === "") return alert("群组id不可为空！");
      let option = {
        groupId: groupId.value,
      };
      WebIM.conn
        .destroyGroup(option)
        .then((res) => console.log("destroyGroup success", res));
    };
    //申请加入群组
    const joinGroup = () => {
      if (groupId.value === "") return alert("群组id不可为空！");
      let options = {
        groupId: groupId.value,
        message: "我想申请加入群中。。。。",
      };
      WebIM.conn
        .joinGroup(options)
        .then((res) => console.log("joinGroup apply send", res));
    };
    //退出群组
    const quitGroup = () => {
      if (groupId.value === "") return alert("群组id不可为空！");
      let option = {
        groupId: groupId.value,
      };
      WebIM.conn
        .quitGroup(option)
        .then((res) => console.log("quitGroup success", res));
    };
    //获取用户加入的群组列表
    const getGroupList = () => {
      WebIM.conn
        .getGroup()
        .then((res) => console.log("getGroupList success", res));
    };
    //分页获取公开群
    const getListGroup = () => {
      //cursor: 如果数据还有下一页，API 返回值会包含此字段，传递此字段可获取下一页的数据，默认为null，为null时获取第一页数据
      let limit = 100;
      let option = {
        limit: limit,
        cursor: globalCursor.value,
      };
      WebIM.conn.listGroups(option).then((res) => {
        console.log("getListGroup success", res);
        const { cursor } = res;
        cursor && (globalCursor.value = cursor);
      });
    };
    //获取群成员列表
    const getMemberList = () => {
      if (groupId.value === "") return alert("群组id不可为空！");
      pageNum + 1;
      let options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: groupId.value,
      };
      WebIM.conn.listGroupMembers(options).then((res) => console.log(res));
    };
    return {
      groupId,
      groupUserId,
      fileId,
      memberArr,
      addMember,
      createNewGroup,
      destroyGroup,
      getGroupList,
      joinGroup,
      quitGroup,
      getListGroup,
      getMemberList,
      ...toRefs(createGroupForm),
    };
  },
};
</script>

<style  scoped>
.app-contanier {
  background: rgba(78, 111, 242, 0.281);
  padding: 10px;
}
.createGroupCard {
  max-width: 800px;
  background: rgba(78, 111, 242, 0.74);
  border-radius: 8px;
  padding: 5px;
}
</style>