
import { Server } from 'socket.io'
import logger from "../../helpers/logger.ts"

const init = (server, options) => {
    const io = new Server(server, options)

    io.on('connection', (socket) => {
        logger.info("A new user has logged in")
        console.log(socket.id)

        // socket.emit('history', history);

        socket.on('username', (username: string, userId: string) => {
            console.log(username, userId)
            socket.data.username = username
            socket.data.userId = userId
        })

        socket.on('user_message', (message: string, avatar: string) => {
            const infos = {
                username: socket.data.username,
                userId: socket.data.userId,
                socketId: socket.id,
                message: message,
                date: new Date(),
                avatar: avatar
            }
            console.log(infos)
            io.emit('message_to_users', infos)

            // push infos to history with redis

        })
    })
}

export default init