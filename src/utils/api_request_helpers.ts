import { error } from 'console'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

//Interfaces

export interface Racemap_event {
    name: string
    r_id: string
}

export interface Event_shadow_coordinates {
    event_id: string
    lat: number
    lng: number
}

// Function that creates an auth header for requests
export const generateAuthenticationHeader = async (): Promise<string> => {
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
const returnDataFromApiEndpoint = async (url: string): Promise<Response> => {
    let token: string = await generateAuthenticationHeader()
    let header: Headers = new Headers({
        Authorization: `Basic ${token}`,
    })
    const response_data = await fetch(url, { method: 'GET', headers: header })
    // response_data includes the status, headers and the body
    return response_data
}

// Function that uses return_data_from_api_endpoint to collect
export const returnEntiretyOfEvents = async (): Promise<Racemap_event[]> => {
    // Setting up a dictionary that maps the names of the events with corresponding ids
    let entirety_of_events: Racemap_event[] = []

    try {
        // Calling the async function that returns a Promise<Response>
        const response = await returnDataFromApiEndpoint(
            process.env.ALL_EVENTS_URL_ENDPOINT as string
        )

        if (!response.ok) {
            console.log('Network response was not okay (return event_id, name)')
            return []
        }

        const data = await response.json()

        // Looping through the response body
        // Filtering the large response body
        for (const index of data) {
            entirety_of_events.push({ name: index.name, r_id: index.id })
        }

        return entirety_of_events

        //Error handler
    } catch (error) {
        console.log('Error in the fetch operation (event_ids and names)', error)
        // Returns an empty array
        return []
    }
}

export const returnLocationCoordiantes = async (
    given_event_id: string
): Promise<Event_shadow_coordinates> => {
    let matched_event_id_and_country: Event_shadow_coordinates

    const url = process.env.EVENT_URL_ENDPOINT.replace(
        ':event_id',
        given_event_id
    )

    try {
        // Calling the async function that returns a Promise<Response>
        console.log('Cooridnates of event: ' + given_event_id)
        const response = await returnDataFromApiEndpoint(url)
        if (!response.ok) {
            throw new Error(
                `Event ${given_event_id} was not found. Network error `
            )
        }

        const data = await response.json()
        // Returns an array that stores [long, lat, number]

        const coordinates_of_event = data.features[0].geometry.coordinates[0]

        console.log(coordinates_of_event)

        matched_event_id_and_country = {
            event_id: given_event_id,
            // Previosly
            lat: coordinates_of_event[1],
            lng: coordinates_of_event[0],
        }
        return matched_event_id_and_country
    } catch (error) {
        console.log(
            'Error in the fetch operation (start coordinates of each event)',
            error
        )
    }
}
