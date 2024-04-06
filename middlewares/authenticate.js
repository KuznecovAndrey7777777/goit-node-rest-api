import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import authServices from '../services/authServices.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw new HttpError(401, 'Not authorized');
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) throw new HttpError(401, 'Invalid token format');
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const { id } = decodedToken;
        const user = await authServices.findUser({ _id: id });
        if (!user || !user.token) throw new HttpError(401, 'User not found or token expired');
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;