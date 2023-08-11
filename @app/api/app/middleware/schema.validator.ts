import { NextFunction, Request, Response } from "express";
import schemas from "@tiyyo-stack/schema";
import { AnyZodObject } from "@tiyyo-stack/schema";
import ServerError from "../helpers/errors/server.error.ts";
import ValidationError from "../helpers/errors/validation.error.ts";

const { ZodError } = schemas


export default (schema: AnyZodObject, canal: "body" | "params" | "query") => async (request: Request, _res: Response, next: NextFunction) => {

    if (!schema) return next(new ServerError('No schema provided'));
    try {
        await schema.parseAsync(request[canal]);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErros: Record<string, string> = {}
            // We don't use ZodError formErrors accessor because we can't associate the error with the field
            error.issues.map((e) => {
                return fieldErros[e.path[0]] = e.message
            })
            next(new ValidationError("Schema is not valid", fieldErros))
        }
        next(error);
    }
}
