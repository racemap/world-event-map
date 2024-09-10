import {
    returnLocationCoordiantes,
    returnEntiretyOfEvents,
    Event_shadow_coordinates,
} from '../src/utils/api_request_helpers'

import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export const startupRequestApiInfo = async () => {
    // Entirety if events is used as a way to check if there are any new events
    const entirety_of_events = await returnEntiretyOfEvents()
    console.log('Number of events: ' + Object.keys(entirety_of_events).length)

    for (const [key, value] of entirety_of_events) {
    }
}

startupRequestApiInfo()
