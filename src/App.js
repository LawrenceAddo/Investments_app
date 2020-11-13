import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InvestmentAll from './components/investmentAll'

class App extends Component {
  render() {
    return (
      <div>
        <InvestmentAll />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
