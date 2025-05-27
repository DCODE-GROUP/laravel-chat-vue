<script>
export default {
  name: "LaravelChatSearch"
}
</script>

<template>
<div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd" />
  </svg>
  <input
    type="text"
    placeholder="Search chats"
    class="ml-2 w-full outline-none bg-transparent text-gray-600 placeholder-gray-400"
  />
</div>
</template>

<style scoped>

</style>