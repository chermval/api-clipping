import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clipping } from './clipping.entity';
import { ClippingsRepository } from './clippings.repository';
import { ClippingsUtils } from './clippings.utils';
import { CreateClippingDto } from './dto/create-clipping.dto';

@Injectable()
export class ClippingsService {
  constructor(
    @InjectRepository(ClippingsRepository)
    private clippingsRepository: ClippingsRepository,
    private clippingsUtils: ClippingsUtils,
  ) {}

  save(file: Express.Multer.File): Promise<Clipping> {
    const createClippingDto: CreateClippingDto =
      this.clippingsUtils.getCreateClippingDto(file.buffer.toString());
    return this.clippingsRepository.saveRecord(createClippingDto);
  }
}
