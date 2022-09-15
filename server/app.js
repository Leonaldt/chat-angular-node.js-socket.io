const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
})
const PORT = process.env.PORT | 4444

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(msg)

        io.emit('message', msg)
    })

    let sub = setInterval(() => {
        io.to(socket.id).emit('message', {
            from: 'server', message: 'Hello from server!'
        })
    }, 2000)

    socket.on('disconnect', () => {
        clearInterval(sub)
        console.log(`Socket ${socket.id} has just disconnected.`)
    })

    console.log(`Socket ${socket.id} has connected.`)
})

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})