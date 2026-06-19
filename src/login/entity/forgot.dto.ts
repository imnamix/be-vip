import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ForgotDTO {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
