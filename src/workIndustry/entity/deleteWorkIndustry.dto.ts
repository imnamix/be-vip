import { ApiProperty } from "@nestjs/swagger";

export class DeleteWorkIndustryDTO {
  @ApiProperty()
  ids: number[];
}
