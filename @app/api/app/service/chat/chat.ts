import { io } from "../../../index.ts"
import logger from "../../helpers/logger.ts"

const init = () => {
    io.on('connexion', (socket) => {
        logger.info("A new user has connect")

        // socket.emit('history', history);

        socket.on('username', (username: string, userId: string) => {
            socket.data.username = username
            socket.data.userId = userId
        })

        socket.on('user_message', (message: string, avatar: string) => {
            const infos = {
                username: socket.data.username,
                userId: socket.data.userId,
                message: message,
                date: new Date(),
                avatar: avatar
            }
            io.emit('message_to_users', infos)

            // push infos to history with redis

        })
    })
}

export default init