const nunjucks = require ('nunjucks')
const express = require ('express')

const SERVER = express()

nunjucks.configure(
    'views',
    {
        autoescape: true, 
        express: SERVER
    }
)

SERVER.use('/assets', express.static('assets'))

// SERVER.get('/', (req, res) => res.redirect('/app'))
SERVER.use('/', require('./modules/url2njk/index.js'))

SERVER.listen(12345, () => console.log("Server has starded"))
