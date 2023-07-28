import { NextFunction, Request, Response } from "express";
// import ServerError from "../helpers/errors/server.error.ts";
// import UserInputError from "../helpers/errors/user.input.error.ts";
import pkg from "@tiyyo-stack/schema";

const { ZodError } = pkg;


export default (schema?: any) => async (request: Request, _res: Response, next: NextFunction) => {
    console.log(schema, 'is schema is cast ')
    try {
        await schema.parseAsync(schema);
        console.log(schema, 'from schema validator');
        next();
    } catch (error) {
        // Je dois afficher l'erreur à l'utilisateur
        // STATUS HTTP pour une erreur de saise : 400
        // On réabille l'erreur en suivant notre propre normalisation
        next(error);
    }
}


// async (req: Request, _res: Response, next: NextFunction) => {
//     try {
//         await schema.parseAsync(req.body);
//         next();
//     } catch (error: any) {
//         console.log(error, 'error from schema validator');
        // if (error instanceof ZodError) {
        //     const zodError = error.issues.map((e) => ({
        //         path: e.path[0],
        //         message: e.message
        //     }));
        // console.log('zodError');
        // new UserInputError(zodError);
        // next(error);
//         new ServerError('error');
//         next(error);
//     }
// }