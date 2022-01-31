/**
 * This script automatically loads and renders appropriate templates from the requested url.
 * If a user connectes to /about/our-story the script would check for hese files in thhis order:
 *  1. views/pages/about/our-story.njk
 *  2. views/pages/about/our-stoy/index.njk
 * 
 * If no file is found, and no override or alternative handler exits, the script will return a 404 not found error.
 */
import { Router } from 'express'
import fs from 'fs'
import overrides from '../../routes/overrides.js'

const routes = Router()

routes.use('/', overrides)

routes.get(
    '/*',
    (req, res) => {
        if (fs.existsSync(`views/pages${req.path}.njk`))
            return res.render(`pages${req.path}.njk`)

        if (fs.existsSync(`views/pages${req.path}/index.njk`))
            return res.render(`pages${req.path}/index.njk`)

        return res.status(404).end()
    }
)

export default routes