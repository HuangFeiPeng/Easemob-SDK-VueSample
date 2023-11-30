<template>
  <div class="app-header">
    <h1 id="title">环信SDK接口测试Demo</h1>
  </div>
  <Login />
  <Message />
  <UsersInfo />
  <Friend />
  <Group />
  <ChatRoom />
</template>

<script>
import { onBeforeMount } from 'vue';
import Login from './components/Longin/Login.vue';
import Message from './components/Message/Message.vue';
import UsersInfo from './components/UsersInfo/UsersInfo.vue';
import Friend from './components/Friend/index.vue';
import Group from './components/Group/index.vue';
import ChatRoom from './components/Chatroom/index.vue';

export default {
  components: {
    Login,
    Message,
    UsersInfo,
    Friend,
    Group,
    ChatRoom,
  },
  setup() {
    WebIM.conn = new WebIM.connection({
      appKey: 'easemob-demo#support',
      // appKey: '1110201022157933#hwappkey',
      useOwnUploadFun: true,
    });
    const getNowdate = () => {
      var t = new Date();
      var Y = t.getFullYear();

      var M =
        t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;

      var D = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();

      var H = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();

      var F = t.getMinutes();

      var S = t.getSeconds();
      return `${Y}-${M}-${D}-${H}:${F}:${S}`;
    };
    onBeforeMount(() => {
      // WebIM.logger.disableAll();

      //  WebIM.conn.listen({
      //     onOpened: () => {
      //       console.log('connect')
      //     }
      //   });
      /* socket连接相关监听 */
      WebIM.conn.addEventHandler('connectionListen', {
        onConnected: () => {
          console.log('connect success');
        },
        onDisconnected: () => {
          console.log('disconnect success');
        },
        onError: (error) => {
          console.log('on error', error);
        },
      });
      /* message相关 */
      WebIM.conn.addEventHandler('messageListen', {
        onTextMessage: (msg) => {
          console.log('>>>收到TextMessage', getNowdate(), msg);
        }, // 收到文本消息。
        onEmojiMessage: (msg) => {
          console.log('>>>收到EmojiMessage', msg);
        }, // 收到表情消息。
        onImageMessage: (msg) => {
          console.log('>>>收到ImageMessage', msg);
        }, // 收到图片消息。
        onCmdMessage: (msg) => {
          console.log('>>>收到CmdMessage', msg);
        }, // 收到命令消息。
        onAudioMessage: (msg) => {
          console.log('>>>收到AudioMessage', msg);
        }, // 收到音频消息。
        onLocationMessage: (msg) => {
          console.log('>>>收到LocationMessage', msg);
        }, // 收到位置消息。
        onFileMessage: (msg) => {
          console.log('>>>收到FileMessage', msg);
        }, // 收到文件消息。
        onCustomMessage: (msg) => {
          console.log('>>>收到CustomMessage', msg);
        }, // 收到自定义消息。
        onVideoMessage: (msg) => {
          console.log('>>>收到VideoMessage', msg);
        }, // 收到视频消息。
        onRecallMessage: (msg) => {
          console.log('>>>收到RecallMessage', RecallMessage);
        }, // 收到消息撤回回执。
        onReceivedMessage: (msg) => {
          console.log('>>>收到ReceivedMessage', msg);
        }, // 收到消息送达服务器回执。
        onDeliveredMessage: (msg) => {
          console.log('>>>收到DeliveredMessage', msg);
        }, // 收到消息送达客户端回执。
        onReadMessage: (msg) => {
          console.log('>>>收到ReadMessage', msg);
        }, // 收到消息已读回执。
        onMutedMessage: (msg) => {
          console.log('>>>收到MutedMessage', msg);
        }, // 如果用户在 A 群组被禁言，在 A 群发消息会触发该回调且消息不传递给该群的其它成员。
        onChannelMessage: (msg) => {
          console.log('>>>收到ChannelMessage', msg);
        }, // 收到会话已读回执，对方发送 `channel ack` 时会触发该回调。
        onReactionChange: (msg) => {
          console.log('>>>>>>收到ReactionChange', msg);
        },
      });
      /* 处理好友相关 */
      WebIM.conn.addEventHandler('friendListen', {
        // 收到好友邀请触发此方法。
        onContactInvited: (msg) => {
          const { from } = msg;
          const contactInvited = confirm('收到好友请求');
          if (contactInvited) {
            WebIM.conn.acceptContactInvite(from);
          } else {
            WebIM.conn.declineContactInvite(from);
          }
        },
        // 联系人被删除时触发此方法。
        onContactDeleted: (msg) => {
          console.log('%c onContactDeleted', 'background:yellow', msg);
        },
        // 新增联系人会触发此方法。
        onContactAdded: (msg) => {
          console.log('%c onContactAdded', 'background:#cadfca', msg);
        },
        // 好友请求被拒绝时触发此方法。
        onContactRefuse: (msg) => {
          console.log('%c onContactRefuse', 'background:red', msg);
        },
        // 好友请求被同意时触发此方法。
        onContactAgreed: (msg) => {
          console.log('%c onContactAgreed', 'background:green', msg);
        },
      });
      /* group群组聊天室相关 */
      WebIM.conn.addEventHandler('groupListen', {
        onGroupChange: (msg) => {
          console.log('groupListen>>>', msg);
          switch (msg.type) {
            case 'rmGroupMute':
              // 解除群组一键禁言。
              break;
            case 'muteGroup':
              // 设置群组一键禁言。
              break;
            case 'rmUserFromGroupWhiteList':
              // 删除群白名单成员。
              break;
            case 'addUserToGroupWhiteList':
              // 添加群白名单成员。
              break;
            case 'deleteFile':
              // 删除群文件
              break;
            case 'uploadFile':
              // 上传群文件。
              break;
            case 'deleteAnnouncement':
              // 删除群公告。
              break;
            case 'updateAnnouncement':
              // 更新群公告。
              break;
            case 'removeMute':
              // 解除禁言。
              break;
            case 'addMute':
              // 禁言用户。
              break;
            case 'removeAdmin':
              // 移除管理员。
              break;
            case 'addAdmin':
              // 添加管理员。
              break;
            case 'changeOwner':
              // 转让群组。
              break;
            case 'direct_joined':
              // 用户直接被拉进群。
              break;
            case 'leaveGroup':
              // 退群。
              break;
            case 'memberJoinPublicGroupSuccess':
              // 加入公开群成功。
              break;
            case 'removedFromGroup':
              // 从群组移除。
              break;
            case 'invite_decline':
              // 拒绝加群邀请。
              break;
            case 'invite_accept':
              // 接收加群邀请（群含权限情况）。
              break;
            case 'invite':
              // 加群邀请。
              break;
            case 'joinPublicGroupDeclined':
              // 拒绝入群申请。
              break;
            case 'joinPublicGroupSuccess':
              // 同意入群申请。
              break;
            case 'joinGroupNotifications':
              // 申请入群。
              break;
            case 'leave':
              // 退出群。
              break;
            case 'join':
              // 加入群。
              break;
            case 'deleteGroupChat':
              // 解散群。
              break;
            default:
              break;
          }
        },
      });
      /* chatroom相关 */
      WebIM.conn.addEventHandler('chatRoomListen', {
        onChatroomEvent: function (msg) {
          console.log('>>>>>>收到聊天室事件', msg);
          switch (msg.operation) {
            // 解除聊天室一键禁言。聊天室所有成员（除操作者外）会收到该事件。
            case 'unmuteAllMembers':
              break;
            // 聊天室一键禁言。聊天室所有成员（除操作者外）会收到该事件。
            case 'muteAllMembers':
              break;
            // 将成员移出聊天室白名单。被移出的成员收到该事件。
            case 'removeAllowlistMember':
              break;
            // 添加成员至聊天室白名单。被添加的成员收到该事件。
            case 'addUserToAllowlist':
              break;
            // 删除聊天室公告。聊天室的所有成员会收到该事件。
            case 'deleteAnnouncement':
              break;
            // 更新聊天室公告。聊天室的所有成员会收到该事件。
            case 'updateAnnouncement':
              break;
            // 更新聊天室详情。聊天室的所有成员会收到该事件。
            case 'updateInfo':
              break;
            // 解除对指定成员的禁言。被解除禁言的成员会收到该事件。
            case 'unmuteMember':
              break;
            // 有成员被移出聊天室黑名单。被移出的成员会收到该事件。
            case 'unblockMember':
              break;
            // 禁言指定成员。被禁言的成员会收到该事件。
            case 'muteMember':
              break;
            // 移除管理员。被移除的管理员会收到该事件。
            case 'removeAdmin':
              break;
            // 设置管理员。被添加的管理员会收到该事件。
            case 'setAdmin':
              break;
            // 转让聊天室。聊天室全体成员会收到该事件。
            case 'changeOwner':
              break;
            // 解散聊天室。聊天室的所有成员会收到该事件。
            case 'destroy':
              break;
            // 主动退出聊天室。聊天室的所有成员（除退出的成员）会收到该事件。
            case 'memberAbsence':
              break;
            // 有成员被移出聊天室。被踢出聊天室的成员会收到该事件。
            case 'removeMember':
              break;
            // 有用户加入聊天室。聊天室的所有成员（除新成员外）会收到该事件。
            case 'memberPresence':
              break;
            // 有成员修改/设置聊天室自定义属性，聊天室的所有成员会收到该事件。
            case 'updateChatRoomAttributes':
              break;
            // 有成员删除聊天室自定义属性，聊天室所有成员会收到该事件。
            case 'removeChatRoomAttributes':
              break;
            default:
              break;
          }
        },
      });
      /* Presence相关 */
      /* Presence订阅状态变更 */
      WebIM.conn.addEventHandler('presenceListen', {
        onPresenceStatusChange: (msg) => {
          // 这里可以处理订阅用户状态更新后的逻辑。
          console.log('状态更新', msg);
        },
      });
    });
    // const miniCore = new MiniCore({
    //   appKey: 'easemob-demo#support',
    //   delivery: true,
    // });
    // miniCore.addEventHandler('listen', {
    //   onConnected: () => {
    //     console.log('>>>>login successful');
    //   },
    //   onDisconnected: () => {
    //     console.log('>>>>> login failed');
    //   },
    //   onError: (error) => {
    //     console.log(' login failed', error);
    //   },
    //   onTextMessage: (message) => {
    //     console.log('>>>>>>> text message', message);
    //   },
    //   // 当前用户收到消息送达回执。
    //   onDeliveredMessage: function (message) {
    //     console.log('>>>>>>>> message 当前消息收到送达回执', message);
    //   },
    //   // 本机网络连接成功。
    //   onOnline: function () {
    //     console.log('>>>>>>> online');
    //   },
    //   // 本机网络掉线。
    //   onOffline: function () {
    //     console.log('>>>>>>> offline');
    //   },
    //   // 调用过程中出现错误。
    // });
    // console.log('miniCore', miniCore);
    // const loginIM = async () => {
    //   try {
    //     await miniCore.open({
    //       username: 'hfp',
    //       password: '1',
    //     });
    //   } catch (error) {
    //     console.log('>>>>login error', error);
    //   }
    // };
    // setTimeout(() => {
    //   loginIM();
    // }, 2000);
  },
};
</script>
<style>
.app-header {
  /* height: 300px; */
  background: rgba(118, 142, 239, 0.281);
  padding: 10px;
  margin: 20px 0;
}

button {
  margin: 3px;
}
</style>
