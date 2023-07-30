import { NextFunction, Request, Response } from "express";
import DatabaseError from "../helpers/errors/database.error.ts";
import ServerError from "../helpers/errors/server.error.ts";
import AuthorizationError from "../helpers/errors/unauthorized.error.ts";
import ValidationError from "../helpers/errors/validation.error.ts";
import logger from "../helpers/logger.ts";
import NotFoundError from "../helpers/errors/not.found.error.ts";

export const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        logger.error(error.name + " " + error.message);
        return res.status(error.status).json({
            error: error.fieldErrors,
        });
    }

    if (error instanceof AuthorizationError || error instanceof ServerError || error instanceof DatabaseError || error instanceof NotFoundError) {
        logger.error(error.name + " " + error.message);
        return res.status(error.status).send(error.userMessage);
    }

    if (res.app.get('env') !== 'development') {
        return res.status(500).send('Internal Server Error');
    } else {
        logger.error("Unknow error" + " " + error.message);
        return res.status(500).send(error.message);
    }
}