import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/User';
import { IHobbies } from '../models/Hobbies';
import Logging from '../library/Logging';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().required()
        })
    },
    hobbies: {
        create: Joi.object<IHobbies>({
            name: Joi.string().required(),
            user: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            passionLevel: Joi.string().valid('Low', 'Medium', 'High', 'Very-High'),
            year: Joi.number().required()

            // passionLevel:
        }),
        update: Joi.object<IHobbies>({
            name: Joi.string().required(),
            user: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            passionLevel: Joi.string().valid('Low', 'Medium', 'High', 'Very-High'),
            year: Joi.number().required()
        })
    }
};
