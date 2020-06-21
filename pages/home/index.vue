<template>
  <div>
    <app-navbar />
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
      <p>Error while fetching posts: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <main class="flex-grow flex justify-center items-center">
        <div class="mx-auto px-4 sm:px-8 py-2 text-center">
          <div class="mt-6">
            <div class="block">
              Upcoming Movies
            </div>
            <div
              class="h-2 bg-gray-400 w-64 mt-4 block mx-auto rounded-sm"
            ></div>
            <div
              class="h-2 bg-gray-400 w-48 mt-2 block mx-auto rounded-sm"
            ></div>
          </div>

          <div class="grid grid-cols-10 gap-4 items-start mt-8 mx-auto px-8">
            <app-card
              v-for="movie in movies"
              :key="movie.id"
              :title="movie.title"
              :poster="movie.poster_path"
              :overview="movie.overview"
              :movie-id="movie.id"
              :release-date="movie.release_date"
            />
          </div>
        </div>
      </main>
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
import AppNavbar from '~/components/Navbar'
import AppCard from '~/components/AppCard'

export default defineComponent({
  components: { AppNavbar, AppCard },
  setup() {
    const movies = ref(null)

    const { $http } = useContext()

    useFetch(async () => {
      movies.value = await $http
        .$get(`upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`)
        .then((movies: any) => movies.results)
    })

    return { movies }
  }
})
</script>
