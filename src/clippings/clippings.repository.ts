import { EntityRepository, Repository } from 'typeorm';
import { CreateClippingDto } from './dto/create-clipping.dto';
import { Clipping } from './clipping.entity';

@EntityRepository(Clipping)
export class ClippingsRepository extends Repository<Clipping> {
  async saveRecords(clippingsDto: CreateClippingDto[]): Promise<Clipping[]> {
    const clippings: Clipping[] = [];

    for (const clippingDto of clippingsDto) {
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

      clippings.push(clipping);
    }

    return clippings;
  }
}
