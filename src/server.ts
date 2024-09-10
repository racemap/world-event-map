import express, { Application } from 'express'
import dotenv from 'dotenv'
import { error } from 'console'

// Load environment variables from .env file
dotenv.config()

const app: Application = express()

// Retrieve the environment variable or choose a default variable
const port: Number = 3050

//Might later add a default ip-address the server listens on

// Start the server after successfully storing the prepared data
// Resolve the promise from startup_request_api_info() after which the node express server should be started

app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
    res.send('Server running')
})

// Add listen_ip here
app.listen(port, () => {
    if (error) {
        console.log('Error' + error)
    }
    console.log(
        `Server is running at http://localhost:${port} inside the container`
    )
})
