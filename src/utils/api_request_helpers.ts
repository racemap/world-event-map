import { error } from 'console'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

//Interfaces

export interface Racemap_event {
    name: string
    id: string
}

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
    const response_data = await fetch(url, { method: 'GET', headers: header })
    console.log('Response data')

    // response_data includes the status, headers and the body
    console.log(response_data)
    return response_data
}

// Function that uses return_data_from_api_endpoint to collect
export const return_entirety_of_events = async (): Promise<Racemap_event[]> => {
    // Setting up a dictionary that maps the names of the events with corresponding ids

    let entirety_of_events: Racemap_event[] = []

    // Calling the function that returns a Promise<Response>
    return_data_from_api_endpoint(process.env.ALL_EVENTS_URL_ENDPOINT)
        .then((response: Response) => {
            if (!response.ok) {
                console.log('Network response was not okay')
            }
            return response.json()
        })
        // Data is the body of the response
        .then((data) => {
            console.log('Response from all Events')
            // For future expansions: Leave it here
            //let event_counter: number = 0

            // Reduces the information stored in the response object
            // Usefull for further dedvelopment
            for (const index of data) {
                entirety_of_events.push({ name: index.name, id: index.id })
                //event_counter += 1
            }
        })
        .catch((error) => {
            // Added empty return statement just in case there is an error
            console.log('Error in the fetch operation ', error)

            //Retuns an empty array
            return entirety_of_events
        })

    return entirety_of_events
}
