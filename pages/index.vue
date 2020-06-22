<template>
  <div class="container">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="onLogin"
    >
      <div class="max-w-lg">
        <div class="block font-bold mb-2 text-center text-gray-700">
          Login
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            id="username"
            v-model="credential.username"
            class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            v-model="credential.password"
            class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
          />
        </div>
        <button
          class="mt-3 font-semibold
                base-color w-full text-white rounded-sm
                px-3 py-2 block shadow-xl hover:bg-black"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { redirect, store } = useContext()
    const credential = reactive({
      username: '',
      password: ''
    })

    const onLogin = () => {
      try {
        store.commit('SET_USER', credential)
        store.commit('SET_LOGIN', true)
        redirect({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      onLogin,
      credential
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
