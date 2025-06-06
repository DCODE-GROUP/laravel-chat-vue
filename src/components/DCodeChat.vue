<script lang="ts" setup>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import DCodeChatLeftColumn from './DCodeChatLeftColumn.vue';
import DCodeChatMessages from './DCodeChatMessages.vue';
import axios from 'axios';
import { route } from 'ziggy-js';
import { onMounted } from 'vue';
import { ref } from 'vue';
import type { Chat, Message } from './types';
import { provide } from 'vue';
import mitt from 'mitt';

defineOptions({
  name: "DCodeChat",
});

const emitter = mitt();
provide('localEmitter', emitter);

const props = withDefaults(defineProps<{
  reverbKey?: string;
  reverbHost?: string;
  reverbPort?: number;
  reverbSecure?: boolean;
  chats?: Chat[];
  initialChatId?: string | null;
  postRoute?: string;
  heartbeatRoute?: string;
  loadMessagesRoute?: string;
  searchRoute?: string;
  useHeartbeat?: boolean; 
  currentQuery?: string;
  reverbChannel?: string;
  userId?: string | null;
}>(), {
  chats: () => [],
  useHeartbeat: true 
});
const localChats = ref<Chat[]>([...props.chats]);
const initialChatId = ref(props.initialChatId || null);
const reverbChannel = ref(props.reverbChannel || 'dcode-chat');
const currentChat = ref<Chat | null>(null);
// If the hosting page doesn't want to use heartbeat, it can set useHeartbeat to false and provide props updates
// via websockets or other means.
const useHeartbeat = ref(props.useHeartbeat === true );
const reverbSecure = ref(props.reverbSecure === true);

const currentQuery = ref(props.currentQuery || '');
const loadMessagesRoute = props.loadMessagesRoute ? props.loadMessagesRoute : 'dcode-chat.messages.index';

window.Pusher = Pusher;

const EchoInstance = new Echo({
  broadcaster: 'reverb',
  key: props.reverbKey || '',
  wsHost: props.reverbHost || 'localhost',
  wsPort: props.reverbPort || 6001,
  wssPort: props.reverbPort || 6001,
  forceTLS: reverbSecure.value,
  enabledTransports: ['ws', 'wss'],
});


// Get the post URL for a given chat using the provided postRoute prop
const postUrl = (chat: Chat) => {
  if(!chat) {
    return '';
  }
    return route(props.postRoute ? props.postRoute : 'dcode-chat.messages.store', { chat: chat?.id });
  
};

// On mount, use axios to fetch the initial data
onMounted(async () => {  
  EchoInstance.private(reverbChannel.value)
    .listen('.DCodeChatCreatedForUser', (e: { chat: Chat }) => {    
      // Make sure the chat is not already in the localChats array
      if (!localChats.value.find(c => c.id === e.chat.id)) {
        // If not, add it to the localChats array
        localChats.value = [...localChats.value, e.chat];
      }
    })
    .listen('.DCodeChatUnreadStatusChange', (e: { chat: Chat, unreadChats: Chat[] }) => {    
      // Update any unReadChats in the localChats array or add new ones
      const unreadChats = e.unreadChats || [];
      localChats.value = localChats.value.map(chat => {
        const unreadChat = unreadChats.find(uc => uc.id === chat.id);
        if (unreadChat && unreadChat.id !== currentChat.value?.id) {
          return { ...chat, pivot: { ...chat.pivot, has_new_messages: unreadChat.pivot.has_new_messages } };
        }
        return chat;
      });
      
    })
    .listen('.DCodeChatMessageSentForUser', (e: { chat: Chat, message: Message }) => {
      // If the current chat is the one where the message was sent, update it
      emitter.emit('new-messages', { chat: e.chat, messages: [e.message] });
    });
  heartbeat(() => {
    // If an initial chat ID is provided, set the current chat
    if (initialChatId.value) {
      const chat = localChats.value.find(c => c.id === initialChatId.value);
      if (chat) {
        setCurrentChat(chat);
      }
    }
  });
});

// Function to set the current chat
const setCurrentChat = (chat: Chat) => {
  localChats.value = localChats.value.map(c => c.id === chat.id ? chat : c);
  currentChat.value = chat;
};

const updateSearch = (query: string) => {
  currentQuery.value = query;  
};

// Setup a function to call the heartbeat endpoint periodically
const heartbeat = async (callback?) => {
  try {
    let heartbeatUrl = route(props.heartbeatRoute ? props.heartbeatRoute : 'dcode-chat.heartbeat');
    let lastMessage = currentChat.value?.messages?.length ? currentChat.value.messages[currentChat.value.messages.length - 1] : null;
    const params = new URLSearchParams([
      ['query', currentQuery.value || ''],
      ['currentChat', currentChat.value ? currentChat.value.id.toString() : initialChatId.value ? initialChatId.value.toString() : ''],
      ['loadMessagesRoute', loadMessagesRoute],
      ['postRoute', props.postRoute || ''],
      ['searchRoute', props.searchRoute || ''],
      ['lastMessageId', lastMessage ? lastMessage.id.toString() : ''],
      ['markAsRead', 'true']
    ])
    const response = await axios.get(heartbeatUrl , {params});
    // Update the chats with the new data
    localChats.value = response.data.chats || [];
    // If a chat is selected, update its messages
    if (currentChat.value) {
      const chat = localChats.value.find(c => c.id === currentChat.value.id);
      if (chat) {
        currentChat.value = chat; // Update the current chat with the latest data
        if(response.data.newMessages.length > 0) {
          emitter.emit('new-messages', { chat: currentChat.value, messages: response.data.newMessages });
        }
      }
    }
    // If a callback is provided, call it with the response data
    if (callback) {
      callback(response.data);
    }
      if(!useHeartbeat.value) {
    return; // Exit if heartbeat is not used
  }

    setTimeout(heartbeat, 1000);
  } catch (error) {
    console.error('Error during heartbeat:', error);
  }
};

</script>

<template>
  <div class="dcode-chat w-full h-full overflow-hidden flex flex-col lg:flex-row">
    <div class="dcode-chat__left-column">
      <DCodeChatLeftColumn @searchUpdated="updateSearch" :load-messages-route="loadMessagesRoute" :chats="localChats" @selectChat="setCurrentChat" :currentChat="currentChat" />
    </div>
    <div class="dcode-chat__right-column w-full h-full">
      <DCodeChatMessages :load-messages-route="loadMessagesRoute" :user-id="userId" :chat="currentChat" :post-url="postUrl(currentChat)" v-if="currentChat"/>
      <div class="dcode-chat__nochat p-4 h-full" v-if="!currentChat">
        <p >
          Select a chat to start a conversation or view history
        </p>
    </div>
    </div>
  </div>
</template>

<style scoped>

</style>