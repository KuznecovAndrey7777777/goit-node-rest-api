import express from 'express';

import contactsControllers from '../controllers/contactsControllers.js';
import { addContactSchema, updateContactSchema, updateContactStatusSchema } from '../schemas/contactsSchemas.js';
import validateBody from '../decorators/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

const ensureAuthenticated = authenticate;
const validateContactBody = validateBody(addContactSchema);
const validateUpdateContactBody = validateBody(updateContactSchema);
const validateUpdateContactStatusBody = validateBody(updateContactStatusSchema);

contactsRouter.use(ensureAuthenticated);

contactsRouter.get('/', contactsControllers.getAll);
contactsRouter.post('/', validateContactBody, contactsControllers.addContact);
contactsRouter.get('/:id', isValidId, contactsControllers.getById);
contactsRouter.put('/:id', isValidId, validateUpdateContactBody, contactsControllers.updateContact);
contactsRouter.delete('/:id', isValidId, contactsControllers.deleteContact);
contactsRouter.patch('/:id/favorite', isValidId, validateUpdateContactStatusBody, contactsControllers.updateContactStatus);

export default contactsRouter;