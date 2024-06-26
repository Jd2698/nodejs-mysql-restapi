import express from 'express'
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use('/api', indexRoutes)
app.use('/api', usersRoutes)

app.use(async (req, res, next) => {
	res.status(404).json({ message: 'endpoint not found' })
})

export default app
