import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Wiv extends Component {
  state = { height: 0, width: 0 }

  constructor() {
    super()
    this.canvas = React.createRef()
    this.wiv = React.createRef()
  }

  // TODO: componentDidUpdate with props changes

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

    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let x = height * 2 + thickness
    let y = height - Math.sin(((x - count) * tightness) * Math.PI / 180) * height + thickness

    // draw top
    for (x = height * 3; x <= canvas.width - (height * 3); x += 1) {
      y = height - Math.sin(((x - count) * tightness) * Math.PI / 180) * height + thickness
      ctx.lineTo(x, y)
    }

    // draw right
    for (; y <= canvas.height - (height * 3); y += 1) {
      x = (canvas.width - height * 3) + height - Math.cos(((y - count) * tightness) * Math.PI / 180) * height + thickness
      ctx.lineTo(x, y)
    }

    // draw bottom
    for (; x >= (height * 3); x -= 1) {
      y = (canvas.height - height * 3) + height - Math.sin(((x - count) * tightness) * Math.PI / 180) * height + thickness
      ctx.lineTo(x, y)
    }

    // draw left
    for (; y >= (height * 2) + thickness; y -= 1) {
      x = height - Math.cos(((y - count) * tightness) * Math.PI / 180) * height + thickness
      ctx.lineTo(x, y)
    }

    // draw top
    for (; x <= canvas.width - (height * 3); x += 1) {
      y = height - Math.sin(((x - count) * tightness) * Math.PI / 180) * height + thickness
      ctx.lineTo(x, y)
    }

    // pull color from dataset
    ctx.strokeStyle = color
    ctx.lineWidth = thickness

    ctx.stroke()

    // current frame is tracked on per wiv basis. This is to help with speed calculations
    if (count > 100000) {
      count = 0
    }

    count = (count || 0) + speed
    this.count = count

    window.requestAnimationFrame(this.animateLines)
  }

  render() {
    const { height, children } = this.props
    const style = {
      display: 'inline-block',
      borderRadius: height
    }

    const canvasStyle = {
      zIndex: 16,
      position: 'absolute',
      pointerEvents: 'none'
    }

    return (
      <div style={style}>
        {this.state.height && <canvas {...this.state} style={canvasStyle} ref={this.canvas} />}
        <div style={{ padding: height * 4 }} ref={this.wiv}>{children}</div>
      </div>
    )
  }
}

Wiv.propTypes = {
  children: PropTypes.any,
  height: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
  tightness: PropTypes.number,
  thickness: PropTypes.number
}

Wiv.defaultProps = {
  color: '#FF0000',
  speed: 0,
  height: 0,
  tightness: 0,
  thickness: 0
}
