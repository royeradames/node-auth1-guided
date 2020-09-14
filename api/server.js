const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('../users/users-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).json({
    message: err.message
  })
})
server.get('/', (req, res) => {
  res.json({ api: 'up' })
})
server.get('/hash', (req, res) => {
  const password = req.headers.authorization
  const secret = req.headers.secret

  const hash = hashString(secret)

  if (password === 'mellon') {
    res.json({welcome: 'friend', secret, hash})
  } else {
    res.status(401).json({ you: 'cannot pass!'})    
  }
})

function hashString(str){
  // use bcryptjs to hash the str argument and return the hash
  const hash = bscryptjs.hashSync(str, 8) //the higher the number the more sequre your has is but the slower it makes your application. //make the number has big has your server can handle without breaking the user experience 
  return hash
}

module.exports = server
