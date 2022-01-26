const nunjucks = require ('nunjucks')
const express = require ('express')
const getLogger = require('./modules/log/index.js')

const SERVER = express()
const log = getLogger("MAIN")

nunjucks.configure(
    'views',
    {
        autoescape: true, 
        express: SERVER
    }
)

SERVER.use('/assets', express.static('assets'))
SERVER.use('/', require('./modules/url2njk/index.js'))

SERVER.listen(process.env.PORT ?? 12345, () => log(`Server has starded on http://localhost:${process.env.PORT ?? 12345}.`))
