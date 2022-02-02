/**
 * This script imports all overrides from 'routes/app/'.
 * It then adds all the respektive overrides for special handling.
 * The files in 'roues/app/' should be formatted as this:
 * > export deafult {
 * >    path: '/the/path/to/override',
 * >    handler: (req, res) => { ... }
 * > }
 */
import { Router } from 'express'
import fs from 'fs'
import getLogger from '../modules/log/index.js'

const log = getLogger("Override", "magenta")
const overrides = Router()
const overrideFiles = fs.readdirSync('./routes/app')

for (const overrideFile of overrideFiles)
    import(`./app/${overrideFile}`)
        .then(
            override => {
                log(`Adding override \`${overrideFile}\`.`)
                overrides.use(override.default.path, override.default.handler)
            }
        ).catch(
            err => log(`Error encountered while loading ${overrideFile}:\n${err}`)
        )

overrides.get('/', (req, res) => res.redirect('/store'))

export default overrides