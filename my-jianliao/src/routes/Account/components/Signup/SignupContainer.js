import { connect } from 'react-redux'
import Signup from './Signup'
import * as types from '../../../../constants/actionTypes'
import { getAccount,getPassword } from '../../../../store/reducers/account.js'

const mapStateToProps = (state) => ({
  account: getAccount(state.account),
  password: getPassword(state.account)

})

const onAccountChange = (account) => ({
  type: types.CHANGE_ACCOUNT,
  account
})
const onPasswordChange = (password) => ({
  type: types.CHANGE_PASSWORD,
  password
})
const mapDispatchToProps = {
  onAccountChange,
  onPasswordChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

