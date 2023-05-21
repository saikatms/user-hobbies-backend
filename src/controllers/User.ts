import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    try {
        const createUser = await user.save();
        return res.status(201).json({ user: createUser });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    console.log('req', req.params);

    try {
        const user = await User.findById(userId);
        return user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((resUser) => res.status(201).json({ user: resUser }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        return user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createUser, getUserById, getAllUsers, updateUser, deleteUser };
