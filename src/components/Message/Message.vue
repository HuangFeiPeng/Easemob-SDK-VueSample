<template>
  <div class="app-contanier">
    <h3>消息发送</h3>
    <div class="sendMsg_box">
      <h5>聊天类型设定</h5>
      <form autocomplete="off">
        <label for="singleChat">
          单聊模式：
          <input type="radio" id="singleChat" name="chatType" v-model="nowChatType" value="singleChat" checked />
        </label>
        <br />
        <label for="groupChat">
          群聊模式：
          <input type="radio" id="groupChat" name="chatType" v-model="nowChatType" value="groupChat" />
        </label>
        <br />
        <label for="roomChat">
          聊天室模式：
          <input type="radio" id="roomChat" name="chatType" v-model="nowChatType" value="chatRoom" />
        </label>
        <br />
        <label for="toId">
          目标ID：
          <input type="text" id="toId" v-model="sendTo" placeholder="userId、groupId、roomId" />
        </label>
        <!-- 消息漫游部分的设定 -->
        <div>
          <h5>消息漫游部分的设定</h5>
          <input type="range" max="50" min="5" ref="rangeNum" v-model="msgNum" />{{ '漫游拉取条数：' + msgNum }}
          <h6 style="color: red">
            *默认拉取单聊勾选为群组（发送会话回执类型也在此选择）
          </h6>
          <input v-model="isChecked" type="checkbox" name="isSingle" />
        </div>
        <h5>附件设定</h5>
        <label for="updateFile">
          附件上传：
          <input type="file" id="updateFile" />
        </label>
        <div class="fileType">
          <h6 style="color: red">*发附件记得选类型</h6>
          <label for="img">
            <input type="radio" name="fileMsg" id="img" v-model="pickFileType" value="img" />图片
          </label>
          <label for="video">
            <input type="radio" name="fileMsg" id="video" v-model="pickFileType" value="video" />视频
          </label>
          <label for="audio">
            <input type="radio" name="fileMsg" id="audio" v-model="pickFileType" value="audio" />音频
          </label>
          <label for="allFile">
            <input type="radio" name="fileMsg" id="allFile" v-model="pickFileType" value="file" />全文件
          </label>
        </div>
        <div>
          <h5>撤回设定</h5>
          <h6 style="color: red">*首先选择撤回类型{{ recallType }}</h6>
          <input type="button" value="撤回chat" @click="recallType = 'chat'" />
          <input type="button" value="撤回group" @click="recallType = 'groupchat'" />
          <input type="button" value="撤回room" @click="recallType = 'chatroom'" />
        </div>
        <label for="msgId">
          messageId：
          <input type="text" id="msgId" placeholder="消息mid" v-model="messageId" />
        </label>
        <br />
        <textarea name="" id="textMsgVal" cols="50" rows="5" placeholder="文本消息输入框" v-model="textValue"
          ref="pictureUrl"></textarea>
      </form>
      <button @click="sendText">文本消息</button>
      <button @click="sendLoc">坐标消息</button>
      <!-- <button @click="sendPicture">贴图消息</button> -->
      <button @click="sendUrl">发送URL图片消息</button>
      <button @click="sendUrlFIle">发送URL文件消息</button>
      <button @click="sendCustom">自定义消息</button>
      <button @click="sendCmdMsg">CMD命令消息</button>
      <button @click="updatFilebtn">单纯上传附件</button>
      <!-- <button @click="sendUpdatFile">发送上传的附件</button> -->
      <button @click="sendFile">附件消息</button>
      <br />
      <button @click="recall">撤回消息</button>
      <button @click="historyMsg">消息漫游</button>
      <button @click="initHistoryMsgCache">初始化漫游游标</button>
      <button @click="sessionList">会话列表</button>
      <button @click="delSessionList">删除指定会话</button>
      <button @click="initReadNum">初始化会话unReadNum</button>
    </div>
    <Presence />
    <Reaction />
  </div>
</template>

<script>
import Presence from '../Presence/index.vue';
import Reaction from '../Reaction/index.vue'
import { reactive, toRefs, toRef } from 'vue';
import './index.css';
export default {
  components: {
    Presence,
    Reaction
  },
  setup() {
    const state = reactive({
      pickFileType: 'video', //选中的附件类型
      isChecked: false,
      msgNum: '10', //漫游条数
      isSingle: true,
      recallType: '', //撤回类型,
      messageId: '', //消息mid
      sendTo: '', //目标ID（包含群组以及聊天室ID）
      textValue: '', //文本域的value
      nowChatType: 'singleChat', //选中聊天类型
    });
    //文本消息
    const sendText = () => {
      if (!state.sendTo) return alert('目标Id不可为空！');
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        msg: state.textValue, // 消息内容。
        type: 'txt', // 消息类型。
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then((res) => {
          console.log('消息发送成功', res);
        })
        .catch((e) => {
          console.log('消息发送失败', e);
        });
    };
    //坐标消息
    const sendLoc = () => {
      if (!state.sendTo) return alert('目标Id不可为空！');
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        addr: '中国北京市海淀区南大街2号院-1',
        buildingName: '',
        lat: 39.966218,
        lng: 116.32315,
        type: 'loc', // 消息类型。
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then((res) => {
          console.log('消息发送成功', res);
        })
        .catch((e) => {
          console.log('消息发送失败', e);
        });
    };
    //自定义消息
    const sendCustom = () => {
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        msg: state.textValue, // 消息内容。
        type: 'custom',
        customEvent: 'customEvent', // 自定义事件。
        customExts: {}, // 消息内容，key/value 需要 string 类型。
        ext: {},
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then((res) => {
          console.log('自定义消息发送成功', res); // 消息发送成功。
        })
        .catch((e) => {
          console.log('自定义消息发送失败', e); // 如禁言或拉黑后消息发送失败。
        });
    };
    //URL图片消息
    const sendUrl = () => {
      const url =
        'https://www.easemob.com/themes/official_v3/Public/img/home/link@2x.png?3';
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        msg: state.textValue, // 消息内容。
        type: 'img', // 消息类型，设置为图片。
        url,
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then((res) => {
          console.log('success', res); // 消息发送成功。
        })
        .catch((e) => {
          console.log('fail', e); // 如禁言或拉黑后消息发送失败。
        });
    };
    //URL文件
    const sendUrlFIle = () => {
      const url =
        'https://www.easemob.com/themes/official_v3/Public/img/home/link@2x.png?3';
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        msg: state.textValue, // 消息内容。
        type: 'file', // 消息类型，设置为图片。
        body: {
          url: url,
          type: 'PDF',
          filename: "test文件名称"
        }
      }
      let msg = WebIM.message.create(option);
      console.log('>>>>>>文件URL', msg);
      WebIM.conn
        .send(msg)
        .then((res) => {
          console.log('success', res); // 消息发送成功。
        })
        .catch((e) => {
          console.log('fail', r); // 如禁言或拉黑后消息发送失败。
        });
    }
    //CMD消息
    const sendCmdMsg = () => {
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        to: state.sendTo, // 消息接收方（用户 ID)。
        msg: state.textValue, // 消息内容。
        type: 'cmd', // 消息类型，设置为命令消息。
        action: 'action', // 用户自定义操作。对于命令消息，该字段必填。
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then(() => {
          console.log('success'); // 消息发送成功。
        })
        .catch((e) => {
          console.log('fail', e); // 如禁言获拉黑后消息发送会失败。
        });
    };
    //上传附件接口
    const updatFilebtn = () => {
      let input = document.getElementById('updateFile'); // 选择图片的input
      let file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      let options = {
        apiUrl: '//a1.easemob.com',
        appName: WebIM.conn.context.appName,
        orgName: WebIM.conn.context.orgName,
        accessToken: WebIM.conn.context.restTokenData,
        appKey: WebIM.conn.appKey,
        file: file,
        onFileUploadComplete: function (data) {
          //upload file success
          console.log('>>>>>>附件上传成功', data);
        },
        onFileUploadError: function (e) {
          //upload file error
          console.log('>>>>>>附件上传失败', e);
        },
      };
      WebIM.utils.uploadFile(options);
    };
    //发送附件
    const sendFile = () => {
      let input = document.getElementById('updateFile'); // 选择图片的input
      let file = WebIM.utils.getFileUrl(input); // 将图片转换为 fileObj 格式。
      // 也可将文件自行处理成该格式。
      // let file = {
      //    data: file              file 对象。
      //    filename: 'fileName',   文件名称。
      //    filetype: 'filetype',   文件类型。
      // }
      let option = {
        chatType: state.nowChatType, // 会话类型，设置为单聊。
        type: state.pickFileType, // 消息类型，设置为图片。
        to: state.sendTo, // 消息接收方（用户 ID)。
        file: file,
        onFileUploadError: function () {
          // 消息上传失败。
          console.log('onFileUploadError');
        },
        onFileUploadProgress: function (progress) {
          // 上传进度的回调。
          console.log(progress);
        },
        onFileUploadComplete: function () {
          // 消息上传成功。
          console.log('onFileUploadComplete');
        },
      };
      let msg = WebIM.message.create(option);
      WebIM.conn
        .send(msg)
        .then(() => {
          console.log('Success'); // 消息发送成功。
        })
        .catch((e) => {
          console.log('Fail', e); // 如禁言或拉黑后消息发送失败。
        });
    };
    //撤回消息
    const recall = () => {
      /**
       * 发送撤回消息
       * @param {Object} option -
       * @param {Object} option.mid -   回撤消息id
       * @param {Object} option.to -   消息的接收方
       * @param {Object} option.type -  chat(单聊) groupchat(群组) chatroom(聊天室)
       */
      let option = {
        mid: state.messageId,
        to: state.sendTo,
        type: state.recallType,
      };
      WebIM.conn
        .recallMessage(option)
        .then(() => {
          console.log(`撤回该条消息成功`);
        })
        .catch((e) => {
          console.log('recall error', e);
        });
    };
    //消息漫游
    const historyMsg = () => {
      /**
       * 获取对话历史消息
       * @param {Object} options
       * @param {String} options.queue   - 对方用户id（如果用户id内含有大写字母请改成小写字母）/群组id/聊天室id
       * @param {String} options.count   - 每次拉取条数
       * @param {String} options.count   - 开始拉取的时间ID
       * @param {Boolean} options.isGroup - 是否是群聊，默认为false
       * @param {Function} options.success
       * @param {Funciton} options.fail
       */
      var options = {
        queue: state.sendTo,
        isGroup: state.isChecked, //选中是群组，否则是单聊
        count: state.msgNum,
        start: state.messageId,
        format: true
      };
      WebIM.conn
        .fetchHistoryMessages(options)
        .then((res) => {
          console.log('getHistory success', res);
        })
        .catch((e) => {
          console.log('getHistory fail', e);
        });
    };
    //初始化漫游游标
    const initHistoryMsgCache = () => {
      WebIM.conn.mr_cache = [];
      alert('重置游标成功');
    };
    //会话列表
    const sessionList = () => {
      WebIM.conn
        .getSessionList()
        .then((res) => {
          console.log('getSessionList success', res.data);
          res.data.channel_infos.forEach(item => {
            console.log('>>>>>item', item)
            const msgBody = JSON.parse(item.meta.payload)
            console.log('>>>payload>>>>', msgBody)
          })
        })
        .catch((e) => {
          console.log('getSessionList fail', e);
        });
    };
    //删除会话
    const delSessionList = () => {
      WebIM.conn.deleteSession({
        channel: "pfh",
        chatType: "singleChat",
        deleteRoam: true,
      })
    }
    //清除会话未读
    const initReadNum = () => {
      // 单聊。
      let option = {
        chatType: state.isChecked ? 'groupChat' : 'singleChat', // 会话类型，设置为单聊。
        type: 'channel', // 消息类型。
        to: state.sendTo, // 接收消息对象（用户 ID)。
      };
      let msg = WebIM.message.create(option);
      WebIM.conn.send(msg);
      alert(`初始化${state.isChecked ? '群聊' : '单聊'}会话unReadNum成功`);
    };
    return {
      sendText,
      sendLoc,
      sendCustom,
      sendUrlFIle,
      sendUrl,
      sendCmdMsg,
      updatFilebtn,
      sendFile,
      recall,
      historyMsg,
      initHistoryMsgCache,
      sessionList,
      delSessionList,
      initReadNum,
      ...toRefs(state),
    };
  },
};
</script>
