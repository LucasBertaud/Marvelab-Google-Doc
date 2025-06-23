import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty({
    description: 'ID du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'Type de ressource',
    example: 'image',
    enum: ['image', 'graph', 'document', 'data']
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'URL de la ressource',
    example: 'https://example.com/images/petri-dishes.jpg'
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Texte alternatif pour la ressource',
    example: 'Plan de travail en laboratoire avec plusieurs boîtes de pétri',
    required: false
  })
  @IsString()
  @IsOptional()
  alt_text?: string;
}