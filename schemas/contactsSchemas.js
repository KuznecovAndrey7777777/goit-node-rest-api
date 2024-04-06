import Joi from 'joi';
import { emailRegexp } from '../constants/constants.js';

const baseContactSchema = {
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string(),
    favorite: Joi.boolean(),
};

export const addContactSchema = Joi.object({
    ...baseContactSchema,
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
    ...baseContactSchema,
})
    .min(1)
    .message('Body must have at least one field');

export const updateContactStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
});