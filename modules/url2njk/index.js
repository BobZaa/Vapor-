import { Router } from 'express'
import fs from 'fs'

const routes = Router()

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