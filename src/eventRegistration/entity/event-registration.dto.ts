import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateEventRegistrationDTO {
  @ApiProperty()
  @IsInt()
  eventId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: "Mobile number must be a valid 10-digit number." })
  mobile: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateEventRegistrationStatusDTO {
  @ApiProperty({ enum: ["Registered", "Confirmed"] })
  @IsIn(["Registered", "Confirmed"])
  status: string;
}
