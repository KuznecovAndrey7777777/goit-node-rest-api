import Joi from 'joi';

import { emailRegexp, passwordRegexp } from '../constants/constants.js';

export const userSingupSinginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).required(),
});