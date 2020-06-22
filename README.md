# tmdb-app

> A website to display movie from TMDB-api

## To-Do

a list of to work to have been done for this application

- [x] login page for user to sign in to the application, and restrict unauthorized user to access home-page.
- [x] Display list of latest movies in the home page.
- [x] Add option for user to filter the movies in the home-page.
- [x] Add search feature.
- [x] Display the result of filter or search movies in a grid.
- [x] Movie description page with, title, release year and genre of the movie

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# create .env file to store environment
$ cp .env.example

# then change tmdb api-key in .env file with your own.
# and change the base url with https://api.themoviedb.org/3/

# run in development mode
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
