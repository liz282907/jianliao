import { combineReducers } from 'redux'
import * as types from '../../constants/actionTypes'

const initialState = {
  account: '',
  password: ''
}

const account = (state = initialState.account, action) => {
  switch (action.type) {
    case (types.CHANGE_ACCOUNT):
          return action.account
    default: return state
  }
}

const password = (state = initialState.password, action) => {
  switch (action.type) {
    case (types.CHANGE_PASSWORD):
        return action.password
    default: return state
  }
}
export const getAccount = state => state.account
export const getPassword = state => state.password

const accountObj = (state= initialState,action) => ({
    account: account(state.account,action),
    password: password(state.password,action)
})

export default  accountObj

// export default combineReducers({
//   account,
//   password
// })
