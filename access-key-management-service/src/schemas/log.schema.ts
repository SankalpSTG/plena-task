import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LogDocument = HydratedDocument<Log>

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  date: Date;

  createdAt: Date
  updatedAt: Date
}

export const LogSchema = SchemaFactory.createForClass(Log)