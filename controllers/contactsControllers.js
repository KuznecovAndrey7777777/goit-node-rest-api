import * as contactsService from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
};

export const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await contactsService.getContactById(id);
        if (!contact) {
            return next(HttpError(404, "Not found"));
        }
        res.json(contact);
    } catch (error) {
        next(HttpError(404, "Not found"));
    }
};

export const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedContact = await contactsService.removeContact(id);
        if (!deletedContact) {
            return next(HttpError(404, "Not found"));
        }
        res.json(deletedContact);
    } catch (error) {
        next(HttpError(404, "Not found"));
    }
};

export const createContact = async (req, res, next) => {
    const { name, email, phone } = req.body;

    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
        return next(HttpError(400, error.message));
    }

    try {
        const newContact = await contactsService.addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    const { error } = updateContactSchema.validate({ name, email, phone });
    if (error) {
        return next(HttpError(400, error.message));
    }

    try {
        const updatedContact = await contactsService.updateContact(id, req.body);
        if (!updatedContact) {
            return next(HttpError(404, "Not found"));
        }
        res.json(updatedContact);
    } catch (error) {
        next(HttpError(404, "Not found"));
    }
};

export const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const { error } = favoriteSchema.validate({ favorite });
    if (error) {
        return next(HttpError(400, error.message));
    }

    try {
        const updatedContact = await contactsService.updateStatusContact(contactId, { favorite });
        res.status(200).json(updatedContact);
    } catch (error) {
        next(HttpError(404, "Not found"));
    }
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
};