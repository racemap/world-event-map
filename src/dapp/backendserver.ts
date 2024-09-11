// frontend/src/index.ts
import express, { Application } from 'express'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app: Application = express()

// Retrieve the environment variable or use a default value
const port: number = Number(process.env.SERVER_PORT) || 4000 // Default to 3000 if not set
const host: string = process.env.SERVER_IP || '0.0.0.0' // Default to 0.0.0.0 to allow external access

app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
    res.send('Backend server running')
})

// Start the server
app.listen(port, host, () => {
    console.log(`Backend server is running at http://${host}:${port}`)
})
