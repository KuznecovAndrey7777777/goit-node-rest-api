import { Schema, model } from 'mongoose';

import { emailRegexp } from '../constants/constants.js';
import { handleSaveError } from './hooks.js';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            unique: true,
            match: emailRegexp,
            required: [true, 'Set email for contact'],
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Set phone for contact'],
        },
        favorite: {
            type: Boolean,
            default: false,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post(['save', 'findOneAndUpdate'], handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;