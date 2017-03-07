import AccountLayout from '../../Layouts/AccountLayout'
import Signup from './containers/SignupContainer'

export default (store) => ({
  path: 'account',
  indexRoute: AccountLayout,
  component: AccountLayout,
  childRoutes: [
    { path: 'signup', component: Signup },
    { path: 'signin', component: Signup },
    { path: 'forgot-password', component: Signup },
    { path: 'reset-password', component: Signup },
    { path: 'email-sent', component: Signup },
    { path: 'vefify-email', component: Signup },
    { path: 'bind-email', component: Signup },
    { path: 'succeed-binding', component: Signup },
    { path: '~', component: Signup }
  ]
})
