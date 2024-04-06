import Joi from 'joi';

import { emailRegexp } from '../constants/constants.js';

export const userSignupSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});