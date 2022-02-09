import bodyParser from 'body-parser'
import chokidar from 'chokidar'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import { config as getEnv } from 'dotenv'
import express from 'express'
import nunjucks from 'nunjucks'
import getLogger from './modules/log/index.js'
import sass from 'sass'
import { setup as databaseSetup } from './modules/database/index.js'
import url2njk from './modules/url2njk/index.js'
import api from './routes/api.js'
import { writeFileSync } from 'fs'

const SERVER = express()
const log = getLogger("  MAIN  ", "green")

log("Starting up the server...")

getEnv()
;( process.env.DEBUG && process.env.NO_DB ) || await databaseSetup()

nunjucks.configure(
    'views',
    {
        autoescape: true,
        lstripBlocks: true,
        trimBlocks: true,
        express: SERVER,
        watch: true
    }
)


const logSCSS = getLogger("  SCSS  ", "yellow")
chokidar.watch('./src/scss').on("change", () => {
    logSCSS("SCSS changed; compiling it...")

    const css = sass.compile(
        "./src/scss/main.scss",
        {
            sourceMap: false,
            alertColor: true,
            style: "compressed"
        }
    )

    writeFileSync(
        "./assets/css/main.css",
        // Meh... Didn't find a betetr fix.
        css.css.replace(/var\(-- /g, 'var(--'))
    logSCSS("Rendering done!")
})

SERVER.use(bodyParser.urlencoded({ extended: true }))
SERVER.use(bodyParser.json())
SERVER.use(cookieParser(process.env.COOKIE_SECRET ?? crypto.generateKeySync("aes", { length: 128 }).export().toString(), {}))

SERVER.use('/assets', express.static('assets'))
SERVER.use('/api', api)
SERVER.use('/', url2njk)

SERVER.listen(process.env.PORT ?? 12345, () => log(`Server has starded on http://localhost:${process.env.PORT ?? 12345}.`))
