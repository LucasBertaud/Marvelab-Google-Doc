import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodologiesService } from './methodologies.service';
import { MethodologiesController } from './methodologies.controller';
import { Methodology } from './entities/methodology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Methodology])],
  controllers: [MethodologiesController],
  providers: [MethodologiesService],
  exports: [MethodologiesService],
})
export class MethodologiesModule {}
