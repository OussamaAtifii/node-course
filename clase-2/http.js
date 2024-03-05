const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT || 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('Estas en la página principal')
  } else if (req.url === '/wallpaper') {
    fs.readFile('./wall.png', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal Server Error
        res.end('Internal server error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('Estas en la página de contacto')
  } else {
    res.statusCode = 404 // Not Found
    res.end('Página no encontrada')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listen on http://localhost:${desiredPort}`)
})
