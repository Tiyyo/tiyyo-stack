import { NextFunction, Request, Response } from "express";
// import ServerError from "../helpers/errors/server.error.ts";
// import UserInputError from "../helpers/errors/user.input.error.ts";
import pkg from "@tiyyo-stack/schema";
import { AnyZodObject } from "@tiyyo-stack/schema";
import ServerError from "../helpers/errors/server.error.ts";
import ValidationError from "../helpers/errors/validation.error.ts";

const { ZodError, parse, parseAsync, zod } = pkg


export default (schema?: AnyZodObject) => async (request: Request, _res: Response, next: NextFunction) => {
    if (!schema) return next(new ServerError('No schema provided'));
    try {
        await schema.parseAsync(request);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErros: Record<string, string> = {}
            error.issues.map((e) => {
                return fieldErros[e.path[0]] = e.message
            })
            next(new ValidationError("Schema is not valid", fieldErros))
        }
        next(error);
    }
}
