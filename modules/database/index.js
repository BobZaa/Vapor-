import { Db, MongoClient } from 'mongodb'
import getLogger from '../log/index.js'
import colors from 'colors'

const log = getLogger('Database', "blue")

/**
 * @type {Db}
 */
export let db = null

/**
 * This function sets up and connects to the database.
 * (IMPORTANT: It can fail. On fail the server will refuse to start.)
 */
export async function setup() {
    log("Starting up databases...")

    if (!process.env.MONGO_URI) {
        log("ERROR:".red + " No URI for the database!")
        process.exit(100)
    }

    const Client = new MongoClient(process.env.MONGO_URI)
    await Client.connect()
        .catch(
            err => {
                log(colors.red(`ERROR: Problem connecting.\n${err}`))
                process.exit(101)
            }
        )

    db = Client.db(process.env.MONGO_DB_NAME ?? 'vapor')

    log("Sucessfully connected to the database!")
}
