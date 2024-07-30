// Before lauching the node server
// Runs the functions needed to fetch the information from the racemap_api
// Stores information inside

import { Racemap_event } from '../src/utils/api_request_helpers'

// Imports from src/utils
import { return_entirety_of_events } from '../src/utils/api_request_helpers'

// Returns an empty Promise
const startup_request_api_info = async (): Promise<void> => {
    // Execute all necessary functions for the Preparation of data provided by the racemap api
    const events_and_ids: Racemap_event[] = await return_entirety_of_events()
}
