<script lang="ts" setup>
import { defineOptions, defineEmits, defineProps, withDefaults } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';

defineOptions({
  name: "DCodeChatSearch",
});

const emit = defineEmits<{
  (e: 'searchUpdated', query: string): void;
}>();

const props = withDefaults(defineProps<{
  currentSearch?: string;
}>(), {
  currentSearch: ''
});
const currentQuery = ref(props.currentSearch || '');

watch(
  () => props.currentSearch,
  (newSearch) => {
    currentQuery.value = newSearch;
  }
);

// Define the search function
const performSearch = () => {
  emit('searchUpdated', currentQuery.value);
};
</script>

<template>
<div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd" />
  </svg>
  <input
    @keyup.enter="performSearch"
    type="text"
    v-model="currentQuery" 
    placeholder="Search chats"
    class="ml-2 w-full outline-none bg-transparent text-gray-600 placeholder-gray-400"
  />
</div>
</template>

<style scoped>

</style>