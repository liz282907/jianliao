import { combineReducers } from 'redux'
import * as types from '../../constants/actionTypes'

const account = (state = '', action) => {
  switch (action.type) {
    case (types.CHANGE_ACCOUNT):
      return action.account
  }
}

const password = (state = '', action) => {
  switch (action.type) {
    case (types.CHANGE_PASSWORD):
      return action.password
  }
}


export  default combineReducers({
  account,
  password
})



