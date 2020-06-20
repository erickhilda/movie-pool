import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
  if (store.state.authUser) {
    return redirect({ name: 'home' })
  }
}

export default auth
