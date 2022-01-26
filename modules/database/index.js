const SQLite = require('better-sqlite3')
const getLogger = require('../log/index.js')

const log = getLogger('Database', "blue")

/**
 * @type {SQLite.Database}
 */
module.exports.db = null

module.exports.setup = () => {
    log("Starting up databases...")

    const database = new SQLite('./data/database.sqlite')
    database.pragma('journal_mode = WAL')
    database.unsafeMode()

    const isCreated = database.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='setup';").get() ?? false
    if (!isCreated)
        require('./createInitialDatabase.js').setup(database, log)

    module.exports.db = database
    log("Loaded database!")
}
