import { Module } from '@nestjs/common';
import { ClippingsController } from './clippings.controller';
import { ClippingsService } from './clippings.service';

@Module({
  imports: [],
  controllers: [ClippingsController],
  providers: [ClippingsService],
})
export class ClippingsModule {}
