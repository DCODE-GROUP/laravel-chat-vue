<script lang="ts" setup>
import DCodeChatLeftColumn from './DCodeChatLeftColumn.vue';
import DCodeChatMessages from './DCodeChatMessages.vue';
import axios from 'axios';
import { route } from 'ziggy-js';
import { onMounted } from 'vue';
import { ref } from 'vue';
import type { Chat } from './types';
import { provide } from 'vue';
import mitt from 'mitt';
import { use } from 'react';

defineOptions({
  name: "DCodeChat",
});

const emitter = mitt();
provide('localEmitter', emitter);

const props = withDefaults(defineProps<{
  chats?: Chat[];
  initialChatId?: string | null;
  postRoute?: string;
  heartbeatRoute?: string;
  loadMessagesRoute?: string;
  searchRoute?: string;
  useHeartbeat?: boolean; 
  currentQuery?: string;
}>(), {
  chats: () => [],
  useHeartbeat: true 
});
const localChats = ref<Chat[]>([...props.chats]);
const initialChatId = ref<Chat | null>(props.initialChatId || null);
const currentChat = ref<Chat | null>(null);
// If the hosting page doesn't want to use heartbeat, it can set useHeartbeat to false and provide props updates
// via websockets or other means.
const useHeartbeat = ref(props.useHeartbeat);
const currentQuery = ref(props.currentQuery || '');
const loadMessagesRoute = props.loadMessagesRoute ? props.loadMessagesRoute : 'dcode-chat.messages.index';

// Get the post URL for a given chat using the provided postRoute prop
const postUrl = (chat: Chat) => {
  if(!chat) {
    return '';
  }
    return route(props.postRoute ? props.postRoute : 'dcode-chat.messages.store', { chat: chat?.id });
  
};

// On mount, use axios to fetch the initial data
onMounted(async () => {  
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
  currentChat.value = chat;
};

const updateSearch = (query: string) => {
  currentQuery.value = query;  
};

// Setup a function to call the heartbeat endpoint periodically
const heartbeat = async (callback?) => {
  if(!useHeartbeat.value) {
    return; // Exit if heartbeat is not used
  }
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
    setTimeout(heartbeat, 1000);
  } catch (error) {
    console.error('Error during heartbeat:', error);
  }
};

</script>

<template>
  <div class="dcode-chat w-full h-full overflow-hidden flex flex-col lg:flex-row">
    <div class="dcode-chat__left-column">
      <DCodeChatLeftColumn @searchUpdated="updateSearch" :search-route="searchRoute" :load-messages-route="loadMessagesRoute" :chats="localChats" @selectChat="setCurrentChat" :currentChat="currentChat" />
    </div>
    <div class="dcode-chat__right-column w-full h-full">
      <DCodeChatMessages :chat="currentChat" :post-url="postUrl(currentChat)" v-if="currentChat"/>
    </div>
  </div>


</template>

<style scoped>

</style>