import { error } from 'console'

//Interfaces

export interface Event_shadow_coordinates {
    event_id: string
    lat: number
    lng: number
}

// Function that creates an auth header for requests
export const generateAuthenticationHeader = (): string | null => {
    try {
        // Retrieve the environment variable
        const user_email = process.env.USER_EMAIL
        const user_password = process.env.USER_PASSWORD

        if (!user_email || !user_password)
            throw new Error('USER_NAME or USER_PASSWORD not set')

        // Merging the environment variables into an Authorization header to send with the request
        // Exporting that it can be used in various requests
        // "Authorization": `Basic ${credentials}`
        const credentials = Buffer.from(
            `${user_email}:${user_password}`,
            'utf-8'
        )

        //Convert the Buffer to a Base64-encoded string
        const base64Credentials = credentials.toString('base64')
        return base64Credentials
    } catch (error) {
        console.error(getErrorMessage(error))
        return null
    }
}

// Function that returns the data given from any API endpoint --> Multiple usecases
const returnDataFromApiEndpoint = async (url: string): Promise<Response> => {
    let token: string | null = generateAuthenticationHeader()
    let header: Headers = new Headers({
        Authorization: `Basic ${token}`,
    })
    try {
        if (token == null) {
            throw new Error('Token generation was not successful')
        }
        const response_data = await fetch(url, {
            method: 'GET',
            headers: header,
        })
        // response_data includes the status, headers and the body
        return response_data
    } catch (error) {
        console.error(getErrorMessage(error))
        return new Response('Not Found', {
            status: 404,
            statusText: 'Not Found',
        })
    }
}

// Function that uses return_data_from_api_endpoint to collect
export const returnEntiretyOfEvents = async (): Promise<
    Map<number, string>
> => {
    // Setting up a dictionary that maps the names of the events with corresponding ids
    let entiretyOfEventsMap: Map<number, string> = new Map()

    try {
        // Calling the async function that returns a Promise<Response>
        const response = await returnDataFromApiEndpoint(
            'https://racemap.com/api/events?show=hidden,atomiceventsonly,activated'
        )

        //If the response is not ok an error is thrown
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        }

        const data = await response.json()

        // Looping through the response body
        // Filtering the large response body

        for (const entry of data) {
            // Create a new entry to the map
            entiretyOfEventsMap.set(entry.id, entry.name)
        }
        return entiretyOfEventsMap

        //Error handler
    } catch (error) {
        // Output error at error log
        console.error(getErrorMessage(error))
        // Returns an empty array
        return new Map<never, never>()
    }
}

export const returnLocationCoordiantes = async (
    given_event_id: string
): Promise<Event_shadow_coordinates | null> => {
    const url = `https://racemap.com/api/events/${given_event_id}/geo/shadow.json`

    try {
        // Calling the async function that returns a Promise<Response>
        console.log('Cooridnates of event: ' + given_event_id)
        const response = await returnDataFromApiEndpoint(url)
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        }

        const data = await response.json()
        // Returns an array that stores [long, lat, number]

        const coordinates_of_event = data.features[0].geometry.coordinates[0]

        console.log(coordinates_of_event)

        const matched_event_id_and_coordinates = {
            event_id: given_event_id,
            // Previosly
            lat: coordinates_of_event[1],
            lng: coordinates_of_event[0],
        }
        return matched_event_id_and_coordinates
    } catch (error) {
        // Output error at error log level
        console.error(getErrorMessage(error))

        //Return null --> Could not fetch the data in any way
        return null
    }
}

// Utility function
function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}