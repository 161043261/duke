const http = require('http')

//? 请求方法       request.method
//? HTTP 协议版本  request.httpVersion
//? 请求路径       request.url
//? URL 路径       require('url').parse(request.url).pathname
//? URL 查询字符串 require('url').parse(request.url).query
//? 请求头         request.headers
//? 请求体         request.on('data', function(chunk) {})
//?                request.on('data', function() {})

const server = http.createServer((request, response) => {
  // 对象解构赋值
  let { url, method } = request;
  response.setHeader('Content-Type', 'text/html;charset=utf=8')
  if (url === '/register' && method === 'GET') {
    response.end('注册')
  } else if (url === 'login' && method === 'GET') {
    response.end('登录')
  } else {
    response.end('404 Page Not Found')
  }
})

server.listen(9000, () => {
  console.log("HTTP 服务器监听 9000 号端口")
})
