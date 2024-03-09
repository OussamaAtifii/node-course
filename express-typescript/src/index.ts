import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json())
app.use('/api/diaries', diaryRouter)

const PORT = process.env.PORT ?? 3001

app.get('/', (_req, _res) => {

})

app.get('/', (_req, _res) => {

})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})