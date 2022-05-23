const { createServer } = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs/promises')
const path = require('path')
const process = require('process')
const crypto = require('crypto')

const app = express()
const server = createServer(app)

app.get('/heartbeat', (req, res) => res.sendStatus(200))

// load 3rd party middleware
//to security of data, cors need to be set with ip or adress that will sent data
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//create_customer
app.get('/yampi/create-customer', async (request, response, next) => {
  try {
    const payload = await fs
      .readFile(path.join(process.cwd(), 'customer-data.json'), 'utf8')
      .then(JSON.parse)

    response.status(200).json(payload)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.get('/yampi/create-customer/hash', async (request, response, next) => {
  try {
    const hash = await fs
      .readFile(path.join(process.cwd(), 'customer-data.json'), 'utf8')
      .then(data => crypto.createHash('md5').update(data).digest('hex'))

    response.status(200).json(hash)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.put('/yampi/create-customer', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'customer-data.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})
app.post('/yampi/create-customer', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'customer-data.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

//order_payd
app.get('/yampi/order', async (request, response, next) => {
  try {
    const payload = await fs
      .readFile(path.join(process.cwd(), 'order.json'), 'utf8')
      .then(JSON.parse)

    response.status(200).json(payload)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.get('/yampi/order/hash', async (request, response, next) => {
  try {
    const hash = await fs
      .readFile(path.join(process.cwd(), 'order.json'), 'utf8')
      .then(data => crypto.createHash('md5').update(data).digest('hex'))

    response.status(200).json(hash)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.put('/yampi/order', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'order.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})
app.post('/yampi/order', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'order.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

//create_student
app.get('/yampi/create-student', async (request, response, next) => {
  try {
    const payload = await fs
      .readFile(path.join(process.cwd(), 'create-student.json'), 'utf8')
      .then(JSON.parse)

    response.status(200).json(payload)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.get('/yampi/create-student/hash', async (request, response, next) => {
  try {
    const hash = await fs
      .readFile(path.join(process.cwd(), 'create-student.json'), 'utf8')
      .then(data => crypto.createHash('md5').update(data).digest('hex'))

    response.status(200).json(hash)
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})

app.put('/yampi/create-student', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'create-student.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})
app.post('/yampi/create-student', async (request, response, next) => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), 'create-student.json'),
      JSON.stringify(request.body)
    )

    response.status(200).json({ message: 'Dados modificados com sucesso' })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' })
  }
})
/**
 * Normalize a port into a number, string, or false.
 *
 * @param {number|string} val
 * @returns {string|number|boolean}
 */
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
const port = normalizePort(process.env.PORT ?? 3500)

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {Error} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('%s requires elevated privileges', bind)
      process.exit(1)
    case 'EADDRINUSE':
      console.error('%s is already in use', bind)
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 *
 * @returns {void}
 */
function onListening() {
  const addr = server.address()

  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

  console.info('listening on %s', bind)
  console.info('connection established')
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

process.on('SIGTERM', () => {
  console.info('received SIGTERM, shutting down server')
  server.close(() => process.exit(0))
})

process.on('SIGINT', () => {
  console.info('received SIGINT, shutting down server')
  server.close(() => process.exit(0))
})
