const WebSocket = require('ws'),
  express = require('express'),
  https = require('https'),
  app = express(),
  fs = require('fs');
  
  
const pkey = fs.readFileSync('./public/ssl/key.pem'),
  pcert = fs.readFileSync('./public/ssl/cert.pem'),
  options = {key: pkey, cert: pcert, passphrase: '123456789'};
var wss = null, sslSrv = null;
 
 
 

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello hai !')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


wss = new WebSocket.Server({ port: app.get('port') });
