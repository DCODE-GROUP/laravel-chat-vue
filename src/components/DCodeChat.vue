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

defineOptions({
  name: "DCodeChat",
});

const emitter = mitt();
provide('localEmitter', emitter);

const props = withDefaults(defineProps<{
  chats?: Chat[]; // Make it optional with ?
  postRoute?: string; // Optional post route
  heartbeatRoute?: string; // Optional heartbeat route
  loadMessagesRoute?: string; // Optional route to load messages
}>(), {
  chats: () => [] // Default value
});
const localChats = ref<Chat[]>([...props.chats]);
const currentChat = ref<Chat | null>(null);

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
  heartbeat(); // Call the heartbeat function to fetch initial data
});

// Function to set the current chat
const setCurrentChat = (chat: Chat) => {
  currentChat.value = chat;
};

// Setup a function to call the heartbeat endpoint periodically
const heartbeat = async () => {
  try {
    let heartbeatUrl = route(props.heartbeatRoute ? props.heartbeatRoute : 'dcode-chat.heartbeat');
    let lastMessage = currentChat.value?.messages?.length ? currentChat.value.messages[currentChat.value.messages.length - 1] : null;
    const response = await axios.get(heartbeatUrl + '?currentChat=' +currentChat?.value?.id + '&lastMessage=' + lastMessage?.id +'&markAsRead=true');
    setTimeout(heartbeat, 1000);
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
  } catch (error) {
    console.error('Error during heartbeat:', error);
  }
};

</script>

<template>
  <div class="dcode-chat w-full h-full overflow-hidden flex flex-col lg:flex-row">
    <div class="dcode-chat__left-column">
      <DCodeChatLeftColumn :load-messages-route="loadMessagesRoute" :chats="localChats" @selectChat="setCurrentChat" :currentChat="currentChat" />
    </div>
    <div class="dcode-chat__right-column w-full h-full">
      <DCodeChatMessages :chat="currentChat" :post-url="postUrl(currentChat)" v-if="currentChat"/>
    </div>
  </div>


</template>

<style scoped>

</style>