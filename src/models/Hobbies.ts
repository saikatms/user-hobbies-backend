import mongoose, { Document, Schema } from 'mongoose';

export interface IHobbies {
    name: string;
    user: mongoose.Types.ObjectId;
    passionLevel: string;
    year: number;
}

export interface IHobbiesModel extends IHobbies, Document {}

const HobbiesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        passionLevel: { type: String, required: true },
        year: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IHobbiesModel>('Hobbies', HobbiesSchema, 'Hobbies');
