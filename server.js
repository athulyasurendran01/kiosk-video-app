'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
	
  ws.on('close', () => console.log('Client disconnected'));
  
  console.log('Client connected');
  
  console.log("A new WebSocket client was connected.");
 
  client.on('message', function (message) {
    
  wss.broadcast(message, client);
  
  
   });
  
});


wss.broadcast = function (data, exclude) {
  var i = 0, n = this.clients ? this.clients.length : 0, client = null;
  if (n < 1) return;
  console.log("Broadcasting message to all " + n + " WebSocket clients.");
  for (; i < n; i++) {
    client = this.clients[i];
    // don't send the message to the sender...
    if (client === exclude) continue;
    if (client.readyState === client.OPEN) client.send(data);
    else console.error('Error: the client state is ' + client.readyState);
  }
};


setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
