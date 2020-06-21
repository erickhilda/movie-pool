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
      <main class="flex flex-col flex-grow overflow-hidden">
        <div class="container mx-auto px-6 py-8 h-full flex-grow">
          <div class="">
            <div class="flex flex-col sm:flex-row sm:items-center mb-8">
              <h2 class="text-2xl text-secondary font-bold flex-1">
                Upcoming Movies
              </h2>
              <div class="relative flex-1">
                <input
                  v-model="searchInput"
                  type="search"
                  name="query"
                  class="p-2 text-gray-700 w-full bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  placeholder="Search movie"
                />
                <button
                  type="submit"
                  class="bg-blue-500 text-white rounded font-lg absolute top-0 right-0 bottom-0 mt-1 mr-1 mb-1 px-3 font-semibold"
                  @click="searchMovie"
                >
                  Search
                </button>
              </div>
            </div>
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
    const { $http } = useContext()

    const movies = ref([])
    const genres = ref([])
    useFetch(async () => {
      movies.value = await $http
        .$get(
          `movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        )
        .then((movies: any) => movies.results)
      genres.value = await $http
        .$get(`genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`)
        .then((genres: any) => genres.genres)
    })

    const searchInput = ref('')
    const searchMovie = async () => {
      movies.value = await $http
        .$get(
          `search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${searchInput.value}`
        )
        .then((movies: any) => movies.results)
    }
    return { movies, searchMovie, searchInput, genres }
  }
})
</script>
