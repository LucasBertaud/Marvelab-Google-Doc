import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperimentDto {
  @ApiProperty({
    description: 'The ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The title of the experiment',
    example: 'Exposition à la nature - Étude 1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The protocol of the experiment',
    example: 'Les participants ont été divisés en deux groupes : un groupe marchant 20 minutes dans un parc et un groupe marchant 20 minutes en milieu urbain.',
  })
  @IsString()
  @IsNotEmpty()
  protocol: string;

  @ApiProperty({
    description: 'The results of the experiment',
    example: 'Le groupe exposé à la nature a présenté une baisse de 15% du taux de cortisol.',
    required: false,
  })
  @IsString()
  @IsOptional()
  results?: string;
}
