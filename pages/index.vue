<template>
  <div class="container">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="max-w-lg">
        <div class="block font-bold mb-2 text-center text-gray-700">
          {{ message }}
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const message = ref('This is a message')

    return {
      message
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.base-color {
  background-color: #032541;
}
</style>
