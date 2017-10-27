const WebSocketServer = require('ws').Server,
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

app.use(function(req, res, next) {
  if(req.headers['x-forwarded-proto']==='http') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.get('/', function(request, response) {
  response.send('Hello hai !')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
