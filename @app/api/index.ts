import { createServer } from 'http';
import logger from './app/helpers/logger.js';
import './app/helpers/env.load.ts';
import app from './app/index.app.ts';
import { Server } from "socket.io"

const PORT = process.env.PORT || 8080;


const server = createServer(app);
export const io = new Server(server)

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})