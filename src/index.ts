import express, { Application, Request, Response } from 'express'
import config from './config'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import routes from './routes/index'
import errorMiddleware from './middleware/error.middleware'
const PORT = config.port

const app: Application = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'requests limit exceded'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my API')
})

app.use('/api', routes)

app.use(errorMiddleware)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'OPPSSS,  Nothing here' })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

export default app
