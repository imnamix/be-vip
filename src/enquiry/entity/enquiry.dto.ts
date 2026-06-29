import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";

export class EnquiryDTO {
  id: number;

  @ApiProperty()
  inquiryType: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  taluka: string;

  @ApiProperty()
  district: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  pinCode: string;

  @ApiProperty()
  nearestViStore: string;

  @ApiProperty()
  requireDigits: string;

  @ApiProperty()
  notRequireDigits: string;

  @ApiProperty()
  total: string;

  @ApiProperty()
  specialRequirements: string;

  @ApiProperty()
  hasNumerologistRef: boolean;

  @ApiProperty()
  numerologistRefName: string;

  @ApiProperty()
  numerologistRefMobile: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  clientMobile: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [String] })
  lookingFor: string[];

  @ApiProperty()
  source: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  isVipNumber: boolean;

  @ApiProperty()
  vipNumber: string;

  @ApiProperty()
  suggestedNumbers: string;

  @ApiProperty()
  confirmedNumber: string;

  @ApiProperty()
  activityLog: string;

  @ApiProperty()
  enquiryNotes: string;

  @ApiProperty()
  paymentProofRef: string;

  @ApiProperty()
  paymentProofUrl: string;

  @ApiProperty()
  numerologistCommissionPaid: boolean;

  created_at: Date;
  updated_at: Date;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  updated_by: number;
}

export class DeleteEnquiryDTO {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  ids?: number[];
}
