// frontend/src/index.ts
import express, { Application } from 'express'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app: Application = express()

// Retrieve the environment variable or use a default value
const port: number = Number(process.env.CLIENT_PORT) || 3000 // Default to 3000 if not set
const host: string = process.env.CLIENT_IP || '127.0.0.1'

app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
    res.send('Frontend server running')
})

// Start the server
app.listen(port, host, () => {
    console.log(`Frontend server is running at http://${host}:${port}`)
})