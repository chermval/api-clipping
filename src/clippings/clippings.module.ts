import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClippingsController } from './clippings.controller';
import { ClippingsRepository } from './clippings.repository';
import { ClippingsService } from './clippings.service';
import { ClippingsUtils } from './clippings.utils';

@Module({
  imports: [TypeOrmModule.forFeature([ClippingsRepository])],
  controllers: [ClippingsController],
  providers: [ClippingsService, ClippingsUtils],
})
export class ClippingsModule {}
