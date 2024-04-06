import contactsServices from '../services/contactsServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await contactsServices.listContacts({ owner }, { skip, limit });
    const totalContacts = await contactsServices.countContacts({ owner });

    res.json({ contacts, totalContacts });
};

const getContactById = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const contact = await contactsServices.getContactByFilter({ owner, _id: id });
    if (!contact) {
        throw new HttpError(404, `Contact not found`);
    }

    res.json(contact);
};

const addNewContact = async (req, res) => {
    const { _id: owner } = req.user;
    const newContact = await contactsServices.addContact({ ...req.body, owner });

    res.status(201).json(newContact);
};

const updateExistingContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const updatedContact = await contactsServices.updateContactByFilter({ owner, _id: id }, req.body);
    if (!updatedContact) {
        throw new HttpError(404, `Contact not found`);
    }

    res.json(updatedContact);
};

const deleteExistingContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const deletedContact = await contactsServices.removeContactByFilter({ owner, _id: id });
    if (!deletedContact) {
        throw new HttpError(404, `Contact not found`);
    }

    res.json(deletedContact);
};

const updateContactStatus = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const updatedContact = await contactsServices.updateContactStatusByFilter({ owner, _id: id }, req.body);
    if (!updatedContact) {
        throw new HttpError(404, `Contact not found`);
    }

    res.json(updatedContact);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addNewContact: ctrlWrapper(addNewContact),
    updateExistingContact: ctrlWrapper(updateExistingContact),
    deleteExistingContact: ctrlWrapper(deleteExistingContact),
    updateContactStatus: ctrlWrapper(updateContactStatus),
};