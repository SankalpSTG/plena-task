import { IsNumber, IsOptional } from "class-validator";

export class UpdateAccessKeyDto {
  rateLimit?: number;
  expiresInSeconds?: number;
}

export class CreateAccessKeyDto {
  rateLimit: number;
  expiresInSeconds: number;
}