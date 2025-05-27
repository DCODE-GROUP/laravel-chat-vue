<script lang="ts" setup>
import type { Chat } from './types';

defineOptions({
  name: "DCodeChatListing"
});

// Define the props for the component
defineProps<{
  chat: Chat;
  ignoreUnread?: boolean; // Optional prop to ignore unread messages
}>();

</script>

<template>
    <div class="flex items-center space-x-3 dcode-chat__listing cursor-default" >
        <div class="relative">
            <div class="w-10 h-10 rounded-full border flex items-center justify-center" :class="{ 'border-green-500': chat?.selected, 'border-gray-300': !chat?.selected }">

                <img :src="chat?.pivot?.chat_avatar + '?selected=' + (chat?.selected ? 'selected':'')" :alt="chat?.pivot?.chat_title" class="w-full h-full rounded-full object-cover">
            </div>
            <div v-if="chat?.pivot?.has_new_messages && !ignoreUnread" class="absolute top-0 left-0 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500"></div>
        </div>

        <div>
            <div class="text-sm font-semibold text-gray-900">
                {{ chat?.pivot?.chat_title }}
            </div>
            <div class="text-sm text-gray-500">
                {{  chat?.pivot?.chat_subtitle }}
            </div>
        </div>
    </div>  
</template>

<style scoped>

</style>