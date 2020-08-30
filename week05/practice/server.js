const http = require('http')

http.createServer((request, response) => {
  let body = []
  request.on('error', err => {
    console.log(err);
  }).on('data', chunk => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('body: ', body);
    response.writeHead(200, { 'Content-type': 'text/html' })
    response.end('<html><head><meta charset="utf-8" /></head><body>999</body></html>\n')
  })
}).listen(8088)
console.log('start http');



