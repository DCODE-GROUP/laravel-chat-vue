<script lang="ts" setup>
import type { Chat, Message } from './types';
import axios from 'axios';
import { watch, ref } from 'vue';

defineOptions({
  name: "DCodeChatListing"
});

// Define the props for the component
const props = defineProps<{
  chat: Chat;
  postUrl: string
}>();

const localChat = ref<Chat | null>(props.chat);
const postUrl = ref<string>(props.postUrl);
const message = ref<string>('');
const hasFocus = ref<boolean>(false);

// define emits for the component
const emit = defineEmits<{
  (e: 'messageSent', message: Message): void;
}>();

// Watch for changes in the chat prop and update localChat accordingly
watch(
  () => props.chat,
  (newChat) => {
    localChat.value = newChat;
  }
);

watch(
  () => props.postUrl,
  (newPostUrl) => {
    postUrl.value = newPostUrl;
  }
);

// Function to send a message
function sendMessage() {
  if (!localChat) return;

  axios.post(postUrl.value, {
    message: message.value
  })
    .then(response => {
      message.value = ''; // Clear the input after sending
      // emit an event to notify parent component
      emit('messageSent', response.data.message);
    })
    .catch(error => {
      // Handle error
      console.error('Error sending message:', error);
    });
}

function handleEnter(event: KeyboardEvent) {
  if (!event.shiftKey && message.value.trim().length > 0) {
    sendMessage();
  }
}

</script>
<template>
  <div :class="hasFocus ? 'border-green-400' : ''" class="flex items-end border w-full rounded-lg bg-white p-4 dcode-chat__post">
    <textarea
      @focusin="hasFocus = true"
      @focusout="hasFocus= false"
      @keydown.enter.prevent="handleEnter"
      type="text"
      placeholder="Send a message..."
      class="w-full flex-grow text-lg outline-none bg-transparent placeholder-gray-500"
      v-model="message"
    ></textarea>
    <button :class="message.length > 0 ? 'dcode-chat__send_ready bg-green-500 text-white' : 'dcode-chat__send_not_ready bg-gray-100 text-gray-300'"  class="ml-4 text-sm px-6 py-2 rounded-xl transition" @click="sendMessage">
      Send
    </button>
  </div>
</template>

<style scoped>

</style>