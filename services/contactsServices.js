import Contact from '../models/Contact.js';

const listContacts = async (filter = {}, setting = {}) => {
    return await Contact.find(filter, '-createdAt -updatedAt', setting).populate('owner', 'email subscription');
};

const countContacts = async (filter) => {
    return await Contact.countDocuments(filter);
};

const addContact = async (data) => {
    return await Contact.create(data);
};

const getContactByFilter = async (filter) => {
    return await Contact.findOne(filter);
};

const updateContactByFilter = async (filter, data) => {
    return await Contact.findOneAndUpdate(filter, data, { new: true });
};

const removeContactByFilter = async (filter) => {
    return await Contact.findOneAndDelete(filter);
};

const updateContactStatusByFilter = async (filter, data) => {
    return await Contact.findOneAndUpdate(filter, data, { new: true });
};

export default {
    listContacts,
    countContacts,
    addContact,
    getContactByFilter,
    updateContactByFilter,
    removeContactByFilter,
    updateContactStatusByFilter,
};