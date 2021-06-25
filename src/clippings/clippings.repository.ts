import { EntityRepository, Repository } from 'typeorm';
import { CreateClippingDto } from './dto/create-clipping.dto';
import { Clipping } from './clipping.entity';

@EntityRepository(Clipping)
export class ClippingsRepository extends Repository<Clipping> {
  async saveRecord(clippingDto: CreateClippingDto): Promise<Clipping> {
    const { book, author, type, description, position, date } = clippingDto;
    const clipping = this.create({
      book,
      author,
      type,
      description,
      position,
      date,
    });

    await this.save(clipping);

    return clipping;
  }
}
