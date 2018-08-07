//http
var express = require('express')
var app = express()
var port = 3001
var server = app.listen(port)
console.log('socketserver started at http://localhost:'+port)
//socket
var conns = []
var io = require('socket.io').listen(server)

io.on('connection', function(client) {  
  conns.push(client)
  console.log('New Connection. Number of conns: ' + conns.length)
	conns.filter(e => e.info != null).map(e => e.info.alias).forEach(e => console.log(e))
  io.sockets.emit('updateConns', conns.map(e => e.info))

  client.on('disconnect', () => {
    conns.splice(conns.indexOf(client), 1)
    client.disconnect()
    console.log('Client Disconnected. Number of conns: : ' +
      conns.length)
    io.sockets.emit('updateConns', conns.map(e => e.info))
  })

  client.on('enterChannel', (info, callback) => {
    if(conns.filter(e => e.info != null).map(e => e.info.alias).indexOf(info.alias) != -1 ) {
	callback(false)
    }
    else{	
      client.info = info
      io.sockets.emit('updateConns', conns.map(e => e.info))
      callback(true)
    }
  })  
  
  
  
  client.on('leaveChannel', info => {
	  const conn = conns.find(e => e.info && (e.info.alias === info.alias && e.info.path === info.path))
	  if(conn) conn.info.alias = null
	  io.sockets.emit('updateConns', conns.map(e => e.info))
  })  

  client.on('newMessage', function(data) {
    if(client.info == null) {
      return
    }
	console.log(client.info.alias + ': ' + data.m)
    client.info.text = data.m
	io.sockets.emit('updateConns', conns.map(e => e.info))
    //client.broadcast.emit('incoming' + client.info.path, data)
  })
})
