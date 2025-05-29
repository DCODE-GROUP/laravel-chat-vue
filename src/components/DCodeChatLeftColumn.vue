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
  loadMessagesRoute: string;
  searchRoute?: string;
}>();
const localChats = ref<Chat[]>([...props.chats]);
const localCurrentChat = ref<Chat | null>(props.currentChat);

watch(
  () => props.currentChat,
  (newCurrentChat) => {
    localCurrentChat.value = newCurrentChat;
  }
);

watch(
  () => props.chats,
  (newChats) => {
    localChats.value = [...newChats];
  }
);

function handleClick(chat: Chat) {
  // Load the chat messages with axios
  let messagesUrl = route(props.loadMessagesRoute, { chat: chat.id }) + '?markAsRead=true';
  axios.get(messagesUrl)
    .then(response => {
      // Assuming the response contains the chat messages
      // Set this chat as the selected chat and unselect others
      localCurrentChat.value = chat;
      chat = response.data.chat || [];
      // Emit the selectChat event with the clicked chat
      emit('selectChat', chat);
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
  <div class="min-w-64 h-full border-r border-gray-200 bg-white flex flex-col p-4">
    <div class="dcode-chat__search pb-2">
      <DCodeChatSearch @searchUpdated="updateSearch" :search-route="searchRoute" />
    </div>
    <div class="dcode-chat__list">
      <div v-if="localChats.length === 0" class="">
            No match found.
      </div>

      <div v-for="chat in localChats" :key="chat.id" class="dcode-chat__participant" @click="handleClick(chat)">
        <DCodeChatListing :chat="chat" :selected="localCurrentChat?.id==chat.id" :class="{ 'bg-gray-100': chat.id == localCurrentChat?.id }" class="p-4 rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
