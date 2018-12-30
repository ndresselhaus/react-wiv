# react-wiv

React component for more wiggly divs (an implementation/wrapper of [wiv.js](https://github.com/jjkaufman/wiv.js))

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Originally bootstrapped using [create-react-library](https://github.com/transitive-bullshit/create-react-library)

Demo: https://ndresselhaus.github.io/react-wiv/

## Install

```bash
npm install --save react-wiv
```

## Usage

```jsx
import React, { Component } from 'react'

import Wiv from 'react-wiv'

class Example extends Component {
  render () {
    return (
      <Wiv color="#00FF00" height={4} tightness={6} thickness={2} speed={0.55}>
        HELLO WIGGLES!
      </Wiv>
    )
  }
}
```

## License

MIT © [ndresselhaus](https://github.com/ndresselhaus)
