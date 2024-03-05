// REST es una arquitectura de software
const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json())
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
  'http://localhost:5500',
  'https://movies.com'
]

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  // La cabecera no tendra origin cuando se haga una peticion
  // desde el mismo dominio
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }

  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  console.log(newMovie)
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(400).json({ message: JSON.parse('Movie not found') })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  return res.json({ message: updatedMovie })
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  res.json({ message: 'Movie deleted' })
})

// En caso de put, patch, delete, el navegador primero hace una peticion
// de tipo OPTIONS para saber si el servidor acepta el metodo que se quiere
// ejecutar --> (CORS-Preflight)
app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'PATCH, DELETE')
  }
  res.send(200)
})

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
