import { Middleware } from '@nuxt/types'

const nonauth: Middleware = ({ store, redirect }) => {
  if (!store.state.authUser) {
    return redirect({ name: 'index' })
  }
}

export default nonauth
