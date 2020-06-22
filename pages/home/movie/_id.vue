<template>
  <div>
    <template v-if="$fetchState.pending">
      <main class="flex-grow flex justify-center items-center">
        <div class="mx-auto px-4 sm:px-8 py-2 text-center">
          <div class="mt-6">
            <div class="block">
              ...Loading
            </div>
          </div>
        </div>
      </main>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching movie: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <div class="w-full">
        <nav class="bg-gray-900 shadow-lg">
          <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
              <div class="text-base font-bold text-gray-800">
                <n-link
                  :to="{ name: 'index' }"
                  class="block bg-red-600 px-3 py-1 rounded-sm text-white font-semibold"
                >
                  Back
                </n-link>
              </div>
            </div>
          </div>
        </nav>
        <div class="flex bg-white mx-auto" style="height:600px;">
          <div class="flex w-1/2 p-10">
            <img
              :src="`http://image.tmdb.org/t/p/w185${movie.poster_path}`"
              alt="mountains"
              class="rounded-lg"
              style="height:512px"
            />
          </div>
          <div class="flex items-start text-left md:px-5 w-full pt-10">
            <div>
              <h2 class="text-3xl font-semibold text-gray-800">
                {{ movie.title }}
                <span class="font-thin">
                  ({{ movie.release_date | releaseYear }})
                </span>
              </h2>
              <div class="mt-2 text-sm text-gray-600 md:text-base">
                <p class="mt-1 inline">
                  {{ movie.release_date | releaseDate }} &bull;
                  {{ movie.runtime | runtime }}
                </p>
                <p class="mt-2 text-xs">
                  <span
                    v-for="genre in movie.genres"
                    :key="genre.id"
                    class="bg-transparent py-1 px-2 border border-gray-500 rounded mx-1"
                  >
                    {{ genre.name }}
                  </span>
                </p>
                <p class="mt-2 font-light italic">
                  {{ movie.tagline }}
                </p>
                <p class="text-lg mt-2 font-semibold">Overview</p>
                <p class="mt-1">
                  {{ movie.overview }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useContext,
  ref
} from 'nuxt-composition-api'

export default defineComponent({
  filters: {
    releaseYear: (value: string) => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        year: 'numeric'
      })
    },
    releaseDate: (value: string) => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    },
    runtime: (value: number) => {
      const hour = Math.floor(value / 60)
      const minute = value - hour * 2
      const runtime = `${hour}h ${minute}m`
      return runtime
    }
  },
  setup() {
    const movie = ref()

    const { app, params, env } = useContext()

    useFetch(async () => {
      movie.value = await app.$http.$get(
        `movie/${params.value.id}?api_key=${env.TMDB_KEY}`
      )
    })

    return { movie }
  }
})
</script>
