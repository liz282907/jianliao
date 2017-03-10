import React, { Component } from 'react'

class Space extends Component {
  render () {
    const { children, height, width } = this.props
    const style = {
      width: width || '100%',
      height: height || '10px',
      display: width ? 'inline-block' : 'block',
      verticalAlign: 'middle'
    }

    return (
      <span style={style}>
        {children}
      </span>
    )
  }
}

export default Space
