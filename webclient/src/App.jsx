import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import io from 'socket.io-client';

class App extends Component {
  state = {
    alias: localStorage.alias,
    m: '',
    conns: [],
  }

  componentDidMount() {
    this.socket = io('http://localhost:3001')
    this.socket.on('connect', () => this.setState({ isConnected: true }))
    this.socket.on('disconnect', () => this.setState({ isConnected: false }))
    this.socket.on('updateConns', (conns) => this.setState({ conns }))
    
    const info = { path: this.path(), alias: this.state.alias }
    this.socket.emit('enterChannel', info, (success) => {
      if (!success) {
        alert('This alias is taken. Try another one.')
      }
    })
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

  send = (socket, alias) => {
    return (text) => {
      this.state.selected = text;
      socket.emit('newMessage', {id: alias, m: text})
    } 
  }

  render() {
    const send = this.send(this.socket, this.state.alias);
    return (
      <div className="App">
        <h1>{this.state.alias ? 'Hi ' + this.state.alias +'!' : 'Please provide a name for the team to identify you'}</h1>
        {this.state.alias && 
          <button onClick={this.eraseName}>Erase name</button>}
        <p className="App-intro">
          {!this.state.alias && <input onChange={e => {
            this.setState({ newAlias: e.target.value}); 
            this.setState({selected: null})
          }}/>}
          {!this.state.alias && <button onClick={this.onClick}>REGISTER</button>}

          {this.state.conns.filter(c => c && c.path ==='/').map(e => e.alias + ': '+ e.text).join(', ')}

        </p>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Card send={send} selected={this.state.selected} text='0'/>
          <Card send={send} selected={this.state.selected} text='1'/>
          <Card send={send} selected={this.state.selected} text='2'/>
          <Card send={send} selected={this.state.selected} text='3'/>
          <Card send={send} selected={this.state.selected} text='5'/>
          <Card send={send} selected={this.state.selected} text='8'/>
          <Card send={send} selected={this.state.selected} text='13'/>
        </div>
      </div>
    );
  }
}

export default App;
