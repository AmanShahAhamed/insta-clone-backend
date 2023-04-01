import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: false })
  mobileNumber: string;

  @Prop()
  fullname: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
