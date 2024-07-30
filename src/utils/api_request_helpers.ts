import { error } from 'console'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Function that creates an auth header for requests
export const generate_authentication_header = async (): Promise<string> => {
    // Retrieve the environment variable
    const user_email = process.env.USER_EMAIL
    const user_password = process.env.USER_PASSWORD

    // Merging the environment variables into an Authorization header to send with the request
    // Exporting that it can be used in various requests
    // "Authorization": `Basic ${credentials}`
    const credentials = Buffer.from(`${user_email}:${user_password}`, 'utf-8')

    //Convert the Buffer to a Base64-encoded string
    const base64Credentials = credentials.toString('base64')

    console.log('Creditals: ' + base64Credentials)
    return base64Credentials
}

// Function that returns the data given from any API endpoint --> Multiple usecases
const return_data_from_api_endpoint = async (
    url: string
): Promise<Response> => {
    let token: string = await generate_authentication_header()
    let header: Headers = new Headers({
        Authorization: `Basic ${token}`,
    })
    const data = await fetch(url, { method: 'GET', headers: header })
    console.log(data)
    return data
}

// Function that uses return_data_from_api_endpoint to collect
export const return_entirety_of_events = async (): Promise<void> => {
    return_data_from_api_endpoint(process.env.ALL_EVENTS_URL_ENDPOINT)
        .then((response) => {
            response.json()
        })
        .then((json) => {
            console.log('Response from all Events')
            console.log(json)
        })
        .catch((error) => console.log('Error ', error))
}
