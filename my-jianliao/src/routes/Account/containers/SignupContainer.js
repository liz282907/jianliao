import { connect } from 'react-redux'
import Signup from '../components/Signup'
import * as types from '../../../constants/actionTypes'

const mapStateToProps = (state) => ({
  account: state.account,
  password: state.password

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

export default connect({
  mapStateToProps,
  mapDispatchToProps
})(Signup)
