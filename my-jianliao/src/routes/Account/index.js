import AccountLayout from '../../Layouts/AccountLayout'
import Signup from './components/Signup/index.js'

// import Counter from '../Counter/index'
import Home from '../Home/index'

export default (store) => ({
  path: 'account',
  indexRoute: { onEnter: (nextState, replace) => replace('/account/signup') },
  component: AccountLayout,
  childRoutes: [
    Signup(store),
    { path: 'signin', component: Home }
    // { path: 'forgot-password', component: Counter(store) },
    // // { path: 'reset-password', component: Home },
    // { path: 'email-sent', component: Signup(store) },
    // { path: 'vefify-email', component: Signup(store) },
    // { path: 'bind-email', component: Signup(store) },
    // { path: 'succeed-binding', component: Signup(store) },
    // { path: '~', component: Signup(store) }
  ]
})
