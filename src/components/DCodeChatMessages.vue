<script lang="ts" setup>
import DCodeChatPost from "./DCodeChatPost.vue";
import DCodeChatMessage from "./DCodeChatMessage.vue";
import { defineProps } from 'vue';
import type { Chat } from './types';
import { ref, watch } from 'vue';
import DCodeChatListing from "./DCodeChatListing.vue";
import { inject, onMounted, onBeforeUnmount } from 'vue';

defineOptions({
  name: "DCodeChatMessages"
});

const props = defineProps<{
  chat: Chat | null;
  postUrl: string;
}>();
const localChat = ref<Chat | null>(props.chat);
const postUrl = ref<string>(props.postUrl);

const emitter = inject('localEmitter');
const chatContainer = ref(null);

function handleEvent(payload) {
  if(payload.chat.id != localChat.value?.id) {
    return; // Ignore events for other chats
  }
  for (const message of payload.messages) {
    addNewMessage(message);
  }  
}

function scrollToBottom() {
  setTimeout(() => {
      const el = chatContainer.value;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
  }, 100);
}

onMounted(() => {
  emitter?.on('new-messages', handleEvent);
  scrollToBottom(); // Scroll to bottom on mount
});

onBeforeUnmount(() => {
  emitter?.off('new-messages', handleEvent);
});

watch(
  () => props.chat,
  (newChat) => {
    if(newChat && newChat.id === localChat.value?.id) {
      return; // No need to update if the same chat is passed
    }
    localChat.value = newChat;
    scrollToBottom(); 
  }
);

watch(
  () => props.postUrl,
  (newPostUrl) => {
    postUrl.value = newPostUrl;
  }
);

// Function to add a new message to the chat
function addNewMessage(message: Message) {
  if (!localChat.value) return;

  // Check if the message already exists in the chat
  const existingMessage = localChat.value.messages.find(m => m.id === message.id);
  if (existingMessage) {
    // If the message already exists, update it
    Object.assign(existingMessage, message);
    return;
  }

  localChat.value.messages.push(message);
  scrollToBottom();
}


</script>

<template>
  <div class="dcode-chat__messages w-full flex flex-col flex-1 h-full">
    <div class="dcode-chat__header border-b ml-4 mr-4 pt-4">
      <DCodeChatListing :chat="localChat" v-if="chat" :ignoreUnread="true"/>
    </div>

    <div class="dcode-chat__messages-list p-4 flex-1 overflow-y-auto" ref="chatContainer">
      <div v-if="localChat?.messages?.length === 0" class="text-center text-gray-500">
        No messages yet. Start the conversation!
      </div>
      <div v-for="message in localChat?.messages" :key="message.id" class="mb-4 w-full" >
        <DCodeChatMessage :message="message" />        
      </div>
    </div>
    <div class="m-4">
      <DCodeChatPost :chat="chat" :post-url="postUrl" @message-sent="addNewMessage" />
    </div>
  </div>
</template>

<style scoped>

</style>