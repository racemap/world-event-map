import dotenv from "dotenv"

// Load environment variables from .env file 
dotenv.config();

// Retrieve the environment variable 
const user_email = process.env.USER_EMAIL
const user_password = process.env.USER_PASSWORD

// Merging the environment variables into an Authorization header to send with the request
// Exporting that it can be used in various requests
// "Authorization": `Basic ${credentials}`
export const credentials = Buffer.from(`${user_email}:${user_password}`, "base64");

console.log("Creditals: "+ credentials)
