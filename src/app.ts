import {
    return_location_coordiantes,
    return_entirety_of_events,
    Event_shadow_coordinates,
    Racemap_event,
} from '../src/utils/api_request_helpers'

export const startup_request_api_info = async () => {
    const entirety_of_events: Racemap_event[] =
        await return_entirety_of_events()

    console.log('Number of events: ' + entirety_of_events.length)

    // Array that stores every eventid with the matching first coordinates as its start point
    const location_coordiantes: Event_shadow_coordinates[] = []
    for (const event of entirety_of_events) {
        // Calls the async function return_location_coordiantes
        const esc: Event_shadow_coordinates = await return_location_coordiantes(
            event.r_id
        )

        // Pushes the object to the array
        location_coordiantes.push(esc)
    }
    console.log('Matched events with coordinates')
    console.log(entirety_of_events)
}

// startup_request_api_info()
