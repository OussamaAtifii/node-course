import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '03102001',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE name = ?;', [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(movie.id), movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, genre.name FROM movie ' +
        'INNER JOIN movie_genre ON movie.id = movie_genre.movie_id ' +
        'INNER JOIN genre ON genre.id = movie_genre.genre_id ' +
        'WHERE genre.id = ?',
        [id]
      );

      return movies
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movie.length === 0) return null

    return movie
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query(
      'SELECT UUID() uuid;'
    )

    const [{ uuid }] = uuidResult

    await connection.query(
      `insert into movie(id, title, year, director, duration, poster, rate) values
      (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
      [uuid, title, year, director, duration, poster, rate]
    )

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
