import React, { Component } from 'react'
import { Link } from 'react-router'
// import  classnames from 'classnames'

import { Tabs, Button } from 'antd'
import Space from '../../../../components/UtilComponent/Space'

import locale from '../../../../constants/localeGuide'
import validator from '../../../../util/validate.js'

const TabPane = Tabs.TabPane

// const util = {
//   capitalize: (s) => s[0].toUpperCase() + s.slice(1)
// }


class Signup extends Component {

  static propTypes = {
    account: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    onAccountChange: React.PropTypes.func.isRequired,
    onPasswordChange: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const account = props.account

    this.state = {
      confirmPass: '',
      tab: account[0] === '+' ? 'mobile' : 'email',
      error: '',
      isLoading: false
    }
  }

  renderOkIcon = () => (<span className="validate-icon"><i className='iconfont icon-Ok'></i></span>)

  proxyInputEvent = (fn)=> (e) => fn(e.currentTarget.value)

  getEmailInput () {
    const { account, onAccountChange } = this.props

    return (
        <input type='email' value={account}
          onChange={this.proxyInputEvent(onAccountChange)}
          placeholder='邮箱' autoFocus />
    )
  }

  getMobileInput () {
    return (<input type='mobile' />)
  }

  isAccountOk = () => validator.isValidEmail(this.props.account)

  isPasswordOk = () => validator.isValidPassword(this.props.password)

  isConfirmOk () {
    return this.isPasswordOk() && this.state.confirmPass === this.props.password
  }

  onTabSwitch = (key) => {
    const { onAccountChange } = this.props
    if (this.state.tab === key) return
    this.setState({ tab: key })
    key === 'email' ? onAccountChange('') : onAccountChange('+86')
  }

  onConfirmChange = (e) => this.setState({ confirmPass: e.currentTarget.value })

  render () {
    /**
     * helpers
     */
    const { password, onPasswordChange } = this.props

    return (
      <div className="form">
        <div className='account-switcher'>
          <Tabs defaultActiveKey={this.state.tab} onChange={this.onTabSwitch} >
            <TabPane tab={locale.get('signUpWithEmail')} key='email'>
              <Space height='20px' />
              <div className='as-line'>
                {this.state.tab === 'email' ? this.getEmailInput() : this.getMobileInput()}
                {this.isAccountOk() && this.renderOkIcon()}
                </div>
              <Space height='10px' />
              <div className='as-line'>
                <input type='password' placeholder={locale.get('passwordNoShortThan6')} value={password}
                  onChange={this.proxyInputEvent(onPasswordChange)} />
                { this.isPasswordOk() && this.renderOkIcon()}
              </div>
              <div className='as-line'>
                <input type='password' placeholder={locale.get('confirmPassword')} value={this.state.confirmPass}
                  onChange={this.onConfirmChange} />
                { this.isConfirmOk() && this.renderOkIcon()}
              </div>
              <Space height='35px' />
              <div className='as-line'>
                { this.state.error && (
                  <span className='hint-error'>
                    {this.state.error}
                  </span>
                )}
              </div>
              <Space height='15px' />
              <div className='as-line-filled'>
                <Button type='primary'  className="button" disabled={this.state.isLoading}>{locale.get('signUp')}</Button>
              </div>
              <Space height='20px' />
              <div className='as-line-centered'>
                <span className='text-guide'>
                  {locale.get('alreadyHaveAccount')}
                </span>
                <Space width='5px' />
                <Button type='dashed' size='small' >
                  <Link to='/account/signin'>{locale.get('signIn')}</Link>
                </Button>
              </div>
            </TabPane>
            <TabPane tab={locale.get('signUpWithMobile')} key='mobile'>手机注册的content</TabPane>
          </Tabs>
        </div>
      </div>

    )
  }

}

export default Signup

