import { IsNumber, IsOptional } from "class-validator";

export class UpdateAccessKeyDto {
  @IsOptional()
  @IsNumber()
  rateLimit?: number;
  @IsOptional()
  @IsNumber()
  expiresInSeconds?: number;
}

export class CreateAccessKeyDto {
  @IsNumber()
  rateLimit: number;
  @IsNumber()
  expiresInSeconds: number;
}