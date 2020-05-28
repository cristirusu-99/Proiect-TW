import { prop, Typegoose } from 'typegoose';


export class Admin extends Typegoose {

    @prop({ required: true })
    _id: string;

    @prop({ required: true })
    NUME: string;

    @prop({ required: true })
    PAROLA: string;
}