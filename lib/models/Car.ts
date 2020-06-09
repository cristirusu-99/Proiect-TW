import { prop, Typegoose } from 'typegoose';


export class Car extends Typegoose {            //Modelul elementelor din tabela Car

    @prop({ required: true })
    _id: string;

    @prop({required:true})
    AN: number;

    @prop({ required: true })
    JUDET: string;

    @prop({ required: true })
    CATEGORIENATIONALA: string;
    
    @prop({ required: true })
    CATEGORIECOMUNITARA: string;

    @prop({ required: true })
    MARCA: string;

    @prop({ required: true })
    DESCRIERECOMERCIALA: string;

    @prop({ required: true })
    TOTALVEHICULE: number;

}