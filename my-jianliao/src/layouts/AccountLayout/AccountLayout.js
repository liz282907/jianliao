import React from 'react'
import Brand from '../../components/Brand'
import './AccountLayout.scss'

export const AccountLayout = ({children}) => (
  <div className='app-page'>
    {/*<Brand className='app-aside' />*/}
    <div className='app-main'>
      <div className='app-container'>
        {children}
      </div>
    </div>
  </div>
)

// AccountLayout.propTypes = {
//   children : React.PropTypes.element.isRequired
// }

export default AccountLayout
