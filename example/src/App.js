import React, { Component } from 'react'
import WivComponent from 'react-wiv'

// for this demo, we want to use random colors for most wivs, so do a simple wrap
const Wiv = (props) => <WivComponent color={getRandomColor()} {...props} />

export default class App extends Component {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Wiv thickness={6}>
            <Wiv thickness={3}>
              <Wiv speed={0.15} thickness={1}>
                <div style={{ fontSize: '1.3em' }}>
                  <h2 style={{ whiteSpace: 'pre' }}>W I V J S</h2>
                  A library for a more wiggly div.<br />
                  <a href='https://github.com/jjkaufman/wiv.js'>https://github.com/jjkaufman/wiv.js</a>
                </div>
              </Wiv>
              <br />
              <Wiv>
                <h3>I N T R O</h3>
              </Wiv>
              <br />
              <Wiv style={{ width: '30em' }}>
                Things are as they are. Looking out into the universe at night, we make no comparisons between
                right
                and wrong stars, nor between well and badly arranged constellations.
              </Wiv>
              <br />
              <Wiv speed='fast'>
                <h3>C O N F I G</h3>
              </Wiv>
              <br />
              <SpeedAndColor />
              <br />
              <Tightness />
              <br />
              <Thickness />
              <br />
              <Height />
              <br />
              <div style={{ marginTop: 10, fontSize: '0.75em' }}>
                This is a clone of the <a href='https://jjkaufman.github.io/wiv.js/'>wiv.js</a> example page using the React components
              </div>
            </Wiv>
          </Wiv>
        </div>
      </div>
    )
  }
}

function SpeedAndColor() {
  return (
    <React.Fragment>
      <Wiv speed={0.55} color='#FFFF00'>
        Control Speed &amp; Color
      </Wiv>
      <br />
      <Wiv speed='slow' color='red'>
        Slow
      </Wiv>
      <Wiv speed='fast'>
        Fast
      </Wiv>
      <Wiv speed='faster'>
        Faster
      </Wiv>
      <Wiv speed='turbo'>
        Turbo
      </Wiv>
    </React.Fragment>
  )
}

function Tightness() {
  return (
    <React.Fragment>
      <Wiv>
        <b>Control Tightness</b>
      </Wiv>
      <br />
      <Wiv tightness={3}>Loose</Wiv>
      <Wiv tightness={16}>Tight</Wiv>
    </React.Fragment>
  )
}

function Thickness() {
  return (
    <React.Fragment>
      <Wiv>
        <b>Control Thickness</b>
      </Wiv>
      <br />
      <Wiv thickness={1}>Skinny</Wiv>
      <Wiv thickness={4}>Thick</Wiv>
    </React.Fragment>
  )
}

function Height() {
  return (
    <React.Fragment>
      <Wiv>
        <b>Control Height</b>
      </Wiv>
      <br />
      <Wiv height={2}>Shallow</Wiv>
      <Wiv height={8}>Rough</Wiv>
      <Wiv height={16}>Gnarly</Wiv>
    </React.Fragment>
  )
}

function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
