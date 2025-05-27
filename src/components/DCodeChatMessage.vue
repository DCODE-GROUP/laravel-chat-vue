<script setup lang="ts">
import type { Message } from './types'; 

defineOptions({
  name: "DCodeChatMessage"
});

// destructure the props for easier access
const props = defineProps<{
  message: Message;
}>();
const message = props.message;
</script>

<template>
   <div :class="['flex mb-4', message.is_me ? 'justify-end' : 'justify-start']">
      <div
        :class="[
          'flex items-end max-w-2xl space-x-3',
          message.is_me ? 'flex-row-reverse space-x-reverse' : ''
        ]"
      >
        <!-- Avatar -->
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          :class="message.is_me ? 'bg-gray-800' : 'bg-blue-600'"
        >
          <img
            :src="message.user_attributes.user_avatar + '?selected=' + (message.is_me ? 'selected' : '')"
            :alt="message.user_attributes.user_name"
            class="w-full h-full rounded-full object-cover" />

        </div>

        <!-- Message content -->
        <div>
          <div
            class="text-sm font-semibold mb-1"
            :class="message.is_me ? 'text-right text-gray-800' : 'text-left text-gray-800'"
          >
            {{ message.user_attributes.user_name }}
            <span class="ml-2 text-xs text-gray-500">
              {{ new Date(message.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) }}
            </span>
          </div>

          <div
            class="rounded-lg px-4 py-3 text-sm leading-relaxed"
            :class="message.is_me
              ? 'bg-green-100 text-gray-900'
              : 'bg-gray-100 text-gray-800'"
          >
            {{ message.message }}
          </div>
        </div>
      </div>
  </div>
</template>
