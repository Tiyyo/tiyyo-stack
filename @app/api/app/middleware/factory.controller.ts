import { NextFunction, Request, Response } from "express";
import { Controller } from "../config/types";

export default (controller: Controller) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        next(err);
    }
};