import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  state = {
    alias: localStorage.alias,
    m: '',
    conns: [],
  }

  addM() {}

  componentDidMount() {
    this.socket = io('http://localhost:3001')
    this.socket.on('connect', () => this.setState({ isConnected: true }))
    this.socket.on('disconnect', () => this.setState({ isConnected: false }))
    this.socket.on('incoming' + this.path(), this.addM)
    this.socket.on('updateConns', (conns) => this.setState({ conns }))
  }

  path = () => window.location.pathname

  onClick = () => {
    if(!this.state.alias) {
      const alias = this.state.newAlias
      const info = { path: this.path(), alias }
      this.socket.emit('enterChannel', info, (success) => {
        if (success === true) {
          localStorage.alias = alias
          this.setState({ alias })
        }
        else {
          alert('This alias is taken. Try another one.')
        }
      })
    }
    else {
      this.socket.emit('newMessage', {id: this.state.alias, m: this.state.m})
    }
  }

  eraseName = () => {
    this.setState({alias: null}); 
    localStorage.clear('alias');
    this.socket.emit('leaveChannel', { path: this.path(), alias: this.state.alias })
  }

  render() {
    console.log(this.state.conns)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Planning tool</h1>
        </header>
        <h1>{this.state.alias ? 'Hi ' + this.state.alias +'!' : 'Please provide a name for the team to identify you'}</h1>
        {this.state.alias && 
          <button onClick={this.eraseName}>Erase name</button>}
        <p className="App-intro">
          {this.state.alias && <input onChange={e => this.setState({ m: e.target.value})}/>}
          {this.state.alias && <button onClick={this.onClick}>SEND</button>}

          {!this.state.alias && <input onChange={e => this.setState({ newAlias: e.target.value})}/>}
          {!this.state.alias && <button onClick={this.onClick}>REGISTER</button>}

          {this.state.conns.filter(c => c && c.path =='').map(e => e.alias).join(', ')}
        </p>
      </div>
    );
  }
}

export default App;
