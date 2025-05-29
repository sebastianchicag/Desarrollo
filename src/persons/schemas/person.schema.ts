import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Person extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  position: string;

  @Prop()
  department: string;

  @Prop()
  hireDate: Date;

  @Prop()
  salary: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
