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