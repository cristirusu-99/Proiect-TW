import { prop, Typegoose } from 'typegoose';


export class Admin extends Typegoose {

    @prop({ required: true })
    _id: string;

    @prop({ required: true })
    USERNAME: string;

    @prop({ required: true })
    PASSHASH: string;
}