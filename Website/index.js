const nunjucks = require ('nunjucks')
const express = require ('express')

const server = express()

nunjucks.configure('HTML', {
   autoescape: true, 
   express: server
})

server.use(express.static('static'))

server.get( 
    '/',
    (req, res) => {
        res.render("main.nj")
    }
)

server.get( 
   '/login',
   (req, res) => {
       res.render("login.nj")
   }
)

server.listen(
   12345, 
   () => {
      console.log("Server has starded") 
   } 
)
