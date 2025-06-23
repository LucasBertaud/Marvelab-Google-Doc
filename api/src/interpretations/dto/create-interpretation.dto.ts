import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInterpretationDto {
  @ApiProperty({
    description: 'ID du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'Contenu de l\'interprétation',
    example: 'Le lien constant entre l\'exposition à la nature et les bénéfices cognitifs suggère que l\'intégration d\'environnements naturels dans l\'aménagement urbain pourrait avoir des effets positifs à long terme sur la santé publique.'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}