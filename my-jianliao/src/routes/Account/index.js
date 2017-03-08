import AccountLayout from '../../Layouts/AccountLayout'
import Signup from './components/Signup/index'

  import Counter from '../Counter/index'


export default (store) => ({
  path: 'account',
  indexRoute: { onEnter: (nextState, replace) => replace('/account/signup') },
  component: AccountLayout,
  childRoutes: [
    { path: 'signup', component: Counter },
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
