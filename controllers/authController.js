import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authServices from '../services/authServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await authServices.findUser({ email });
    if (existingUser) {
        throw new HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({ ...req.body, password: hashedPassword });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await authServices.findUser({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new HttpError(401, 'Email or password is wrong');
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    await authServices.updateUser({ _id: user._id }, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
};

const logout = async (req, res) => {
    const { _id } = req.user;

    await authServices.updateUser({ _id }, { token: null });

    res.status(204).send();
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    logout: ctrlWrapper(logout),
};