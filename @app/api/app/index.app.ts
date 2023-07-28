// import path from 'path';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import router from './router/main.router.ts';
import session from 'express-session';
// import * as url from 'url';


const corsOptions = (process.env.CORS_ORIGIN ?? 'localhost') as CorsOptions

// const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app: express.Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_STORAGE_KEY as string,
    resave: false,
    saveUninitialized: false,
}))
app.use(cors(corsOptions))
app.use(router)

export default app