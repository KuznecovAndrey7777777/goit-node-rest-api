import * as contactsService from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
    const result = await contactsService.getAllContacts();
    res.json(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json(result);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
        throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json({ message: "Delete success", ...result });
});

export const createContact = ctrlWrapper(async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json(result);
});

export const updateStatusContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateStatus(id, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
});