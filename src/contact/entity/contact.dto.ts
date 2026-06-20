import { ApiProperty } from "@nestjs/swagger";

export class BannerSlide {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  image?: string;
}

export class Address {
  @ApiProperty({ required: false })
  officeNumber?: string;

  @ApiProperty({ required: false })
  building?: string;

  @ApiProperty({ required: false })
  landmark?: string;

  @ApiProperty({ required: false })
  street?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  pincode?: string;

  @ApiProperty({ required: false })
  country?: string;
}

export class WorkingHours {
  @ApiProperty({ required: false })
  monday?: string;

  @ApiProperty({ required: false })
  tuesday?: string;

  @ApiProperty({ required: false })
  wednesday?: string;

  @ApiProperty({ required: false })
  thursday?: string;

  @ApiProperty({ required: false })
  friday?: string;

  @ApiProperty({ required: false })
  saturday?: string;

  @ApiProperty({ required: false })
  sunday?: string;
}

export class SocialLinks {
  @ApiProperty({ required: false })
  facebook?: string;

  @ApiProperty({ required: false })
  instagram?: string;

  @ApiProperty({ required: false })
  youtube?: string;

  @ApiProperty({ required: false })
  x?: string;

  @ApiProperty({ required: false })
  linkedin?: string;
}

export class ContactDTO {
  id: number;

  @ApiProperty({ type: [BannerSlide], required: false })
  bannerSlides?: BannerSlide[];

  @ApiProperty({ required: false })
  contactNumber?: string;

  @ApiProperty({ required: false })
  whatsappNumber?: string;

  @ApiProperty({ required: false })
  officeEmail?: string;

  @ApiProperty({ required: false })
  alternateOfficeEmail?: string;

  @ApiProperty({ type: Address, required: false })
  address?: Address;

  @ApiProperty({ type: WorkingHours, required: false })
  workingHours?: WorkingHours;

  @ApiProperty({ required: false })
  gstNumber?: string;

  @ApiProperty({ required: false })
  googleMapLink?: string;

  @ApiProperty({ type: SocialLinks, required: false })
  socialLinks?: SocialLinks;

  created_at: Date;
  updated_at: Date;

  @ApiProperty({ required: false })
  created_by?: number;

  @ApiProperty({ required: false })
  updated_by?: number;
}

export class DeleteContactDTO {
  @ApiProperty({ type: [Number] })
  ids: number[];
}
