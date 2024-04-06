import User from '../models/User.js';

const findUser = async (filter) => {
    return await User.findOne(filter);
};

const signup = async (data) => {
    return await User.create(data);
};

const updateUser = async (filter, data) => {
    return await User.findOneAndUpdate(filter, data, { new: true });
};

export default {
    findUser,
    signup,
    updateUser,
};