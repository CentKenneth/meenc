import moment from 'moment'
export default async function ({ route, app, redirect }) {
  // check if it has a route hash
  if (!route.hash) {
    return
  }
  if (app.store.state.auth.isLoggedIn) {
    return
  }

  try {
    const str = route.hash
    const result = str.split('#?access_token=')
    const result1 = result[1].split()

    const query = result1[0].split('&')
    const token = query[0]
    const expiry = query[1].split('=')[1]
    const tokenType = query[2].split('=')[1]

    const user = await app.$axios.get('api/authorized/auth-details', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const expiresIn = moment().add(expiry / 86400, 'days')

    app.$cookies.set('expires_in', expiresIn.toDate(), {
      path: '/',
      expires: expiresIn.toDate()
    })
    app.$cookies.set('user', user.data.data, {
      path: '/',
      expires: expiresIn.toDate()
    })
    app.$cookies.set('token_type', tokenType, {
      path: '/',
      expires: expiresIn.toDate()
    })
    app.$cookies.set('token', token, {
      path: '/',
      expires: expiresIn.toDate()
    })

    // set token headers
    app.$axios.setHeader('Authorization', tokenType + token)

    app.store.commit('auth/setBearerToken', token)
    app.store.commit('auth/setAuth', user.data.data)
    app.store.commit('auth/setExpiresIn', expiresIn.toDate())
    app.store.commit('auth/setLogin', true)
    app.$forceUpdate()
  } catch (e) {
    // console.log(e)
  }
}
