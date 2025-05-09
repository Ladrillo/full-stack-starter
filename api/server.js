const path = require('path')
const express = require('express')
const helmet = require('helmet')

const prisma = require('../prisma/prisma')

const server = express()

server.use(express.json())
server.use(helmet())

server.use(express.static(path.join(__dirname, '../', 'frontend', 'dist')))

server.get('/api/friends', async (req, res, next) => {
  try {
    const friends = await prisma.Friend.findMany()
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

server.use((err, req, res, next) => {
  res.status(500).json(err.message)
})

module.exports = server
