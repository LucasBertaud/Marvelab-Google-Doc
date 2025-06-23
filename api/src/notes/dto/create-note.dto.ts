import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'ID du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'Contenu de la note',
    example: 'Plusieurs études ont montré qu\'une exposition régulière aux espaces verts est associée à une réduction du stress et à une amélioration des fonctions cognitives chez les adultes.'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}