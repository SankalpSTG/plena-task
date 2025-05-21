import { IsBoolean } from "class-validator";
import { IsFalse } from "src/validators/is-false.validator";

export class ToggleAccessKeyType {
  @IsBoolean()
  @IsFalse()
  enabled: boolean
}