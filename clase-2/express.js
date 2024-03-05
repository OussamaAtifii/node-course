const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

// Middleware que ocurrira antes de cada petición
// app.use((req, res, next) => {
//   console.log('mi primer middleware')
//   // Siempre usar next para realizar las peticiones o se queda en espera
//   next()
// })

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

const PORT = process.env.PORT || 1234

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('404')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
