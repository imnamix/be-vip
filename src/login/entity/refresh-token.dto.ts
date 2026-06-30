import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
