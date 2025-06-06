<template>
  
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { onMounted } from 'vue';
import axios from 'axios';
import { route } from 'ziggy-js';
import type { Chat } from './types';

defineOptions({
  name: "DCodeChatMonitor",
});

const props = defineProps<{
  userId: string;
  reverbKey?: string;
  reverbHost?: string;
  reverbChannel?: string;
  reverbPort?: number;
  reverbSecure?: boolean;
  heartbeatRoute?: string;
}>();
const reverbChannel = ref(props.reverbChannel || 'dcode-chat');
const reverbSecure = ref(props.reverbSecure === true);

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

onMounted(async () => {  
  EchoInstance.private(reverbChannel.value)
    .listen('.DCodeChatUnreadStatusChange', (e: { chat: Chat, unreadChats: Chat[] }) => {    
        fireUnreadStatusChangeEvent(e.unreadChats);
    });
    // Get initial unread status 
    try {
        let heartbeatUrl = route(props.heartbeatRoute ? props.heartbeatRoute : 'dcode-chat.heartbeat');
        const response = await axios.get(heartbeatUrl);        
        const unreadChats = response.data.chats.filter((chat: Chat) => chat.pivot.has_new_messages);
        
        fireUnreadStatusChangeEvent(unreadChats);
    } catch (error) {
        console.error('Error fetching initial unread status:', error);
    }
});

function fireUnreadStatusChangeEvent(unreadChats: Chat[]) {
  const unreadEvent = new CustomEvent('dcodechat-unread-status-change', {
    detail: {
      unreadChats: unreadChats
    }
  });
  document.dispatchEvent(unreadEvent);
}
</script>