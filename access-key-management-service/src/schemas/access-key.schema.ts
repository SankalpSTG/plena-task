import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccessKeyDocument = HydratedDocument<AccessKey>

@Schema({ timestamps: true })
export class AccessKey {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  rateLimit: number; // requests per minute

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: true })
  enabled: boolean;

  createdAt: Date
  updatedAt: Date
}

export const AccessKeySchema = SchemaFactory.createForClass(AccessKey)