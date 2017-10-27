const WebSocket = require('ws'),
  express = require('express'),
  https = require('https'),
  app = express(),
  fs = require('fs');
  
  
const pkey = fs.readFileSync('./public/ssl/key.pem'),
  pcert = fs.readFileSync('./public/ssl/cert.pem'),
  options = {key: pkey, cert: pcert, passphrase: '123456789'}; 
 

app.set('port', (process.env.PORT || 1255))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello hai !')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


const wss = new WebSocket.Server({ port: app.get('port') });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});