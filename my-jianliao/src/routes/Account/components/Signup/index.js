import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'signup',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Signup = require('./SignupContainer').default
      const reducer = require('../../../../store/reducers/account').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'account', reducer })

      /*  Return getComponent   */
      cb(null, Signup)

      /* Webpack named bundle   */
    }, 'signup')
  }
})
