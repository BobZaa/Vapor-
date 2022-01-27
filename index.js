import { config as getEnv } from 'dotenv'
import express from 'express'
import nunjucks from 'nunjucks'
import getLogger from './modules/log/index.js'
import { setup as databaseSetup } from './modules/database/index.js'
import url2njk from './modules/url2njk/index.js'

const SERVER = express()
const log = getLogger("  MAIN  ")

log("Starting up the server...")

getEnv()
await databaseSetup()

nunjucks.configure(
    'views',
    {
        autoescape: true, 
        express: SERVER
    }
)

SERVER.use('/assets', express.static('assets'))
SERVER.use('/', url2njk)

SERVER.listen(process.env.PORT ?? 12345, () => log(`Server has starded on http://localhost:${process.env.PORT ?? 12345}.`))
