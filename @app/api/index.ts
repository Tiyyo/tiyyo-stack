import { createServer } from 'http';
import logger from './app/helpers/logger.js';
import './app/helpers/env.load.ts';
import app from './app/index.app.ts';
import init from './app/service/chat/chat.ts'

const PORT = process.env.PORT || 8080;

const server = createServer(app);
init(server, {
    cors: {
        origin: "*"
    }
})


server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})