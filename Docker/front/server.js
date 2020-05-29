const express = require('express')
const helmet = require('helmet')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

//Security
app.use(helmet.frameguard())
app.use(helmet.noCache())
app.use(helmet.noSniff())
app.disable('x-powered-by')

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)
