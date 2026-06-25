import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsObject } from "class-validator";

export class CreateRoleDTO {
  @ApiProperty({ example: "Sales Manager" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "SM", required: false })
  @IsOptional()
  @IsString()
  badge: string;

  @ApiProperty({ example: "Handles sales inquiries and customers", required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: {
      Dashboard:     { read: true,  write: true,  update: true,  delete: false },
      Users:         { read: true,  write: true,  update: true,  delete: false },
      Roles:         { read: true,  write: false, update: false, delete: false },
      Content:       { read: true,  write: false, update: false, delete: false },
      Events:        { read: true,  write: false, update: false, delete: false },
      Customers:     { read: true,  write: false, update: false, delete: false },
      Reports:       { read: false, write: false, update: false, delete: false },
      Notifications: { read: false, write: false, update: false, delete: false },
    },
    required: false,
  })
  @IsOptional()
  @IsObject()
  permissions: Record<string, { read: boolean; write: boolean; update: boolean; delete: boolean }>;
}

export class UpdateRoleDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  badge: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  permissions: Record<string, { read: boolean; write: boolean; update: boolean; delete: boolean }>;
}

export class DeleteRoleDTO {
  @ApiProperty({ example: [1, 2] })
  ids: number[];
}
