<template>
  <div
    class="col-span-5 sm:col-span-5 md:col-span-2 lg:col-span-2 xl:col-span-2"
  >
    <div class="bg-white shadow-lg rounded-lg">
      <div class="md:flex-shrink-0 rouded-md">
        <img
          :src="`http://image.tmdb.org/t/p/w185${poster}`"
          alt="mountains"
          class="w-full object-cover h-full rounded-lg rounded-b-none"
        />
      </div>
      <div class="px-3 py-3">
        <h2 class="font-bold text-lg text-gray-800 tracking-normal text-left">
          {{ title }}
        </h2>
        <p class="text-sm font-light text-gray-700 mr-1 text-left">
          {{ overview | summery(120) }}
        </p>
        <p class="text-sm font-light text-gray-700 mr-1 text-left">
          Release Date: {{ releaseDate | dateFormat }}
        </p>
        <div class="flex justify-end mt-4">
          <n-link
            class="rounded-sm py-1 px-4 bg-green-600 text-white"
            :to="`/home/movie/${movieId}`"
            >Details</n-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  filters: {
    summery: (val: string, num: number) => {
      return val.substring(0, num) + '...'
    },

    dateFormat: (value: string) => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    }
  },
  props: {
    movieId: {
      type: Number,
      required: true
    },
    poster: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    }
  }
})
</script>
