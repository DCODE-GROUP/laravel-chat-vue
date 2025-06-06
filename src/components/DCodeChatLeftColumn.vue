<script setup lang="ts">
import DCodeChatSearch from './DCodeChatSearch.vue';
import DCodeChatListing from './DCodeChatListing.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
import {route} from 'ziggy-js';
import type { Chat } from './types';

const emit = defineEmits<{
  (e: 'selectChat', chat: Chat): void;
  (e: 'searchUpdated', query: string): void;
}>();

// Define props
const props = defineProps<{
  chats: Chat[];
  currentChat?: Chat | null;
  currentSearch?: string;
  loadMessagesRoute: string;
}>();
const localChats = ref<Chat[]>([...props.chats]);
const localCurrentChat = ref<Chat | null>(props.currentChat);
const localCurrentSearch = ref(props.currentSearch || '');

watch(
  () => props.currentSearch,
  (newCurrentSearch) => {
    localCurrentSearch.value = newCurrentSearch;
  }
);

watch(
  () => props.currentChat,
  (newCurrentChat) => {
    localCurrentChat.value = newCurrentChat;
    sendChatSelectedEvent(newCurrentChat);
  }
);

watch(
  () => props.chats,
  (newChats) => {
    localChats.value = [...newChats];
  }
);

function sendChatSelectedEvent(chat?: Chat) {
  emit('selectChat', chat);
  const chatSelectedEvent = new CustomEvent('dcodechat-chat-selected', {
    detail: {
      chat: chat
    }
  });
  document.dispatchEvent(chatSelectedEvent);
}

function handleClick(chat: Chat) {
  // Load the chat messages with axios
  let messagesUrl = route(props.loadMessagesRoute, { chat: chat.id }) + '?markAsRead=true';
  axios.get(messagesUrl)
    .then(response => {
      localCurrentChat.value = chat;
      chat = response.data.chat || [];
      sendChatSelectedEvent(chat);
    })
    .catch(error => {
      console.error('Error loading chat messages:', error);
    });
}

function updateSearch(query: string) {
  emit('searchUpdated', query);
}
</script>

<template>
  <div class="dcode-chat__left-column-inner min-w-64 h-full border-r border-gray-200 bg-white flex flex-col p-4">
    <div class="dcode-chat__search pb-2">
      <DCodeChatSearch @searchUpdated="updateSearch" :current-search="localCurrentSearch"/>
    </div>
    <div class="dcode-chat__list overflow-y-auto flex-1">
      <div v-if="localChats.length === 0" class="">
            No match found.
      </div>

      <div v-for="chat in localChats" :key="chat.id" class="dcode-chat__participant" @click="handleClick(chat)">
        <DCodeChatListing :load-messages-route="loadMessagesRoute" :chat="chat" :selected="localCurrentChat?.id==chat.id" :class="{ 'bg-gray-100': chat.id == localCurrentChat?.id }" class="p-4 rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
