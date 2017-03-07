import React, { Component } from 'react'
import { Link } from 'react-router'
// import  classnames from 'classnames'

import { Tabs } from 'antd'
import Space from '../UtilComponent/Space'

import locale from '../../constants/localeGuide'
const TabPane = Tabs.TabPane

const util = {
  capitalize: (s) => s[0].toUpperCase() + s.slice(1)
}

class Signup extends Component {

  static propTypes = {}

  constructor (props) {
    super(props)
    const account = props.getAccount()

    this.state = {
      confirmPass: '',
      tab: account[0] === '+' ? 'mobile' : 'email',
      error: '',
      isLoading: false
    }
  }

  renderOkIcon = () => (<span className='icon-ok' />)

  getEmailInput () {
    const { isAccountOk, account, onAccountChange } = this.props
    return (
      <div>
        <input type='email' value={account}
          onChange={onAccountChange}
          placeholder='邮箱' autoFocus />
        {isAccountOk && this.renderOkIcon()}
      </div>
    )
  }

  getMobileInput () {
    return (<input type='mobile' />)
  }

  isPasswordOk = () => validate.isValidPassword(this.props.password)

  isConfirmOk () {
    return this.isPasswordOk() && this.state.confirmPass === this.props.password
  }

  onTabSwitch = (key) => {
    const { onChooseMobile, onChooseEmail } = this.props
    if (this.state.tab === key) return
    this.setState({ tab: key })
    key === 'email' ? onChooseEmail() : onChooseMobile()
  }

  render () {
    /**
     * helpers
     */
    const { password, onPasswordChange, onConfirmChange } = this.props

    return (
      <div>
        <div className='account-switcher'>
          <Tabs defaultActiveKey={this.state.tab} onChange={this.onTabSwitch}>
            <TabPane tab={locale.get('signUpWithEmail')} key='email'>
              <Space height='20px' />
              <div className='form'>
                {this.state.tab === 'email' ? this.getEmailInput() : this.getMobileInput()}
              </div>
              <Space height='10px' />
              <div className='as-line'>
                <input type='password' placeholder={locale.get('passwordNoShortThan6')} value={password} onChange={onPasswordChange} />
                { this.isPasswordOk() && this.renderOkIcon()}
              </div>
              <div className='as-line'>
                <input type='password' placeholder={locale.get('confirmPassword')} value={this.state.confirmPass} onChange={onConfirmChange} />
                { this.isConfirmOk() && this.renderOkIcon()}
              </div>
              <div className='as-line'>
                { this.state.error && (
                  <span className='hint-error'>
                    {this.state.error}
                  </span>
                )}
              </div>
              <div className='as-line-filled'>
                <Button type='primary' disabled={this.state.isLoading}>{locale.get('signUp')}</Button>
              </div>
              <div className='as-line-centered'>
                <span className='text-guide'>
                  {locale.get('alreadyHaveAccount')}
                </span>
                <Space width='5' />
                <Button type='primary' size='small'>
                  <Link to='/account/signin'>{locale.get('signIn')}</Link>
                </Button>
              </div>

            </TabPane>
            <TabPane tab={locale.get('signUpWithMobile')} key='mobile'>Content of Tab Pane 2</TabPane>
          </Tabs>
        </div>
      </div>

    )
  }

}

export default Signup

