import { Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClippingsService } from './clippings.service';

@Controller('/api/v1/clippings')
export class ClippingsController {
  private logger = new Logger('clippingsController');

  constructor(private clippingsService: ClippingsService) {}

  //Save workout registry
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  save(@UploadedFile() file: Express.Multer.File): {
    this.logger.verbose(`Creating clipping ${file.buffer.toString()}`);
  }
}
