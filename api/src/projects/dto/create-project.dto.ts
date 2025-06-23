import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Titre du projet',
    example: 'Étude sur les espaces verts et la santé cognitive'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description du projet',
    example: 'Recherche sur l\'impact des espaces verts sur les fonctions cognitives et le stress'
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}