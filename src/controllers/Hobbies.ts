import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Hobbies from '../models/Hobbies';
import User from '../models/User';

const createHobby = async (req: Request, res: Response, next: NextFunction) => {
    const { user, name, passionLevel, year } = req.body;
    // console.log('req.body', req.body);

    const getUser = await User.find({ _id: user });

    if (getUser.length) {
        const hobby = new Hobbies({
            _id: new mongoose.Types.ObjectId(),
            name,
            user,
            passionLevel,
            year
        });
        try {
            const createHobby = await hobby.save();
            if (createHobby) {
                await User.findByIdAndUpdate({ _id: user }, { $push: { hobbies: createHobby._id } });
            }
            return res.status(201).json({ createHobby });
        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(404).json({ error: 'User Not Found' });
    }
};

const getHobbyById = async (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;

    try {
        const hobby = await Hobbies.findById(hobbyId).populate('user', '-_id name');
        return hobby ? res.status(200).json({ hobby }) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllHobbies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hobbies = await Hobbies.find().populate('user', '-_id name');
        return res.status(200).json({ hobbies });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateHobby = (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;
    console.log(hobbyId);

    return Hobbies.findById(hobbyId)
        .then((hobby) => {
            if (hobby) {
                hobby.set(req.body);

                return hobby
                    .save()
                    .then((resHobby) => res.status(201).json({ hobby: resHobby }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteHobby = async (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;

    try {
        const hobby = await Hobbies.findByIdAndDelete(hobbyId);
        return hobby ? res.status(201).json({ hobby, message: 'Deleted' }) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getUserHobbies = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const hobbies = await Hobbies.find({ user: userId });
        return res.status(200).json({ hobbies });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createHobby, getHobbyById, getUserHobbies, getAllHobbies, updateHobby, deleteHobby };
