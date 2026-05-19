import { IsString, IsNumber, IsOptional, IsUrl, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMerchantDto {
  @ApiProperty() @IsString() name!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() logoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() coverImageUrl?: string;
  @ApiProperty() @IsEmail() email!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() website?: string;
  @ApiProperty() @IsString() address!: string;
  @ApiProperty() @IsString() city!: string;
  @ApiProperty() @IsString() state!: string;
  @ApiPropertyOptional({ default: 'IN' }) @IsOptional() @IsString() country?: string;
  @ApiProperty() @IsString() postalCode!: string;
  @ApiProperty() @IsNumber() latitude!: number;
  @ApiProperty() @IsNumber() longitude!: number;
  @ApiPropertyOptional({ default: 'Asia/Kolkata' }) @IsOptional() @IsString() timezone?: string;
  @ApiPropertyOptional({ default: 'INR' }) @IsOptional() @IsString() currency?: string;
}
