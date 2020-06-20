<template>
  <div>home</div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'nonauth',
  setup() {}
})
</script>
