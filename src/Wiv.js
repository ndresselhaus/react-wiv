import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wiv as wivLib } from 'wiv.js/wiv'

const wiv = wivLib()

const speeds = {
  'slow': 0.15,
  'standard': 0.55,
  'fast': 1.55,
  'faster': 3.15,
  'turbo': 6.15
}

export default class Wiv extends Component {
  state = { height: 0, width: 0 }

  constructor() {
    super()
    this.canvas = React.createRef()
    this.wiv = React.createRef()
  }

  componentDidMount() {
    const { offsetHeight, offsetWidth } = this.wiv.current
    this.setState({ height: offsetHeight, width: offsetWidth })
  }

  componentDidUpdate() {
    if (!this.ctx && this.canvas.current) {
      let ctx = this.canvas.current.getContext('2d')
      ctx.strokeStyle = this.props.color
      ctx.lineWidth = this.props.thickness

      this.ctx = ctx
      this.count = 0

      window.requestAnimationFrame(this.animateLines)
    }
  }

  animateLines = () => {
    let { speed, height, tightness, thickness, color } = this.props

    let { ctx, count } = this
    let canvas = this.canvas.current

    speed = typeof speed === 'string' ? speeds[speed] : speed

    this.count = wiv.drawLines(canvas, speed, height, tightness, thickness, /* increment */ 1, count, color, ctx)

    window.requestAnimationFrame(this.animateLines)
  }

  render() {
    const { height, children, className, style } = this.props
    const outerDivStyle = {
      display: 'inline-block',
      borderRadius: height,
      ...style
    }

    const canvasStyle = {
      zIndex: 16,
      position: 'absolute',
      pointerEvents: 'none'
    }

    return (
      <div style={outerDivStyle} className={className}>
        {this.state.height && <canvas {...this.state} style={canvasStyle} ref={this.canvas} />}
        <div style={{ padding: height * 4 }} ref={this.wiv}>{children}</div>
      </div>
    )
  }
}

Wiv.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.keys(speeds))]),
  tightness: PropTypes.number,
  thickness: PropTypes.number
}

Wiv.defaultProps = {
  color: '#FF0000',
  speed: 'standard',
  height: 0,
  tightness: 0,
  thickness: 0
}
