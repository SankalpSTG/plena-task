import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

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

export class PaginationType {
  @Type(() => Number)
  @IsInt()
  limit: number;
  @Type(() => Number)
  @IsInt()
  page: number
}