const express = require('express')
const next = require('next')
const proxy = require('express-http-proxy')
const { join } = require('path')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use('/assets/materialize', express.static(
    join(__dirname, '..', 'node_modules', 'materialize-css', 'dist')))
  server.use('/api', proxy(
    process.env.SERVICES_HOST || 'http://localhost:3001'))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})