import React, { Component } from 'react';
import './App.css';

import UserList from './components/user';

class App extends Component {
  constructor() {
    super();
    this.state = {
      debug : {
        request: '',
        response: ''
      }
    }
  }

  render() {
    return (

      <div className="App">
        <UserList debug={this._debug.bind(this)}/>
        <Debug
          data={this.state.debug}/>
      </div>

    )
  }

  _debug({req, res, secondary}) {
    if (secondary && this.state.debug.request !== '') {
      return;
    }
    let request = `${req.method}: ${req.url}`;
    if (req.body !== undefined) {
      request += '\n';
      request += `Body: ${req.body}`;
    }
    const response = JSON.stringify(res);
    this.setState({
       debug : { request, response }
    });
  }
}

const Debug = (props) => (
  <div className="Debug">
    <div className="Debug__block">
      <h2>Request</h2>
      <div>{props.data.request}</div>
    </div>
    <div className="Debug__block">
      <h2>JSON response</h2>
      <div><code>{props.data.response}</code></div>
    </div>
  </div>
)

export default App;
