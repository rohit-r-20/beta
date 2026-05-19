import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsString() categoryId!: string;
  @ApiProperty() @IsString() description!: string;
  @ApiProperty() @IsString() shortDescription!: string;
  @ApiPropertyOptional({ default: 'APPOINTMENT' }) @IsOptional() @IsString() serviceType?: string;
  @ApiProperty() @IsInt() @Min(5) durationMinutes!: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @IsInt() @Min(0) bufferMinutes?: number;
  @ApiProperty() @IsNumber() @Min(0) basePrice!: number;
  @ApiPropertyOptional({ default: 'INR' }) @IsOptional() @IsString() currency?: string;
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @IsInt() @Min(1) @Max(1000) maxCapacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) images?: string[];
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
}
