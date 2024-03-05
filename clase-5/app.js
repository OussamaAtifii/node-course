// REST es una arquitectura de software
import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// Como leer un json en ESModules recomendado por ahora

const app = express()

app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/movies', moviesRouter)

// En caso de put, patch, delete, el navegador primero hace una peticion
// de tipo OPTIONS para saber si el servidor acepta el metodo que se quiere
// ejecutar --> (CORS-Preflight)
// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'PATCH, DELETE')
//   }
//   res.send(200)
// })

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
