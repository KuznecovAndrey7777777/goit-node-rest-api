import * as contactsService from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = async (req, res) => {
    const result = await contactsService.contactsList();
    res.json(result);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);
    if (!deletedContact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(deletedContact);
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;

    const { error } = createContactSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const result = await contactsService.addContact(name, email, phone);

    res.status(201).json(result);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
        return res.status(400).json({ message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(result);
};

export const updateFavorite = async (req, res) => {
    const { id } = req.params;

    const result = await contactsService.updateStatusContact(id, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json(result);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
};