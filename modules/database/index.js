import { Db, MongoClient } from 'mongodb'
import getLogger from '../log/index.js'
import colors from 'colors'

const log = getLogger('Database', "blue")

/**
 * @type {Db}
 */
export let db = null

export async function setup () {
    log("Starting up databases...")

    if (!process.env.MONGO_URI) {
        log("ERROR:".red + " No URI for the database!")
        process.exit(1)
    }

    const Client = new MongoClient(process.env.MONGO_URI)
    await Client.connect()

    db = Client.db(process.env.MONGO_DB_NAME ?? 'vapor')

    log("Loaded database!")
}
