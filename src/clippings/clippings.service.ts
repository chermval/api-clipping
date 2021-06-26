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

  async findAll(): Promise<Clipping[]> {
    const workouts = await this.clippingsRepository.find({
      order: { book: 'DESC' },
    });

    return workouts;
  }

  save(file: Express.Multer.File): Promise<Clipping[]> {
    const createClippingDto: CreateClippingDto[] =
      this.clippingsUtils.getCreateClippingsDto(file.buffer.toString());

    return this.clippingsRepository.saveRecords(createClippingDto);
  }
}
