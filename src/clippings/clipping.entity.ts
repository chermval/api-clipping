import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  book: string;

  @Column()
  author: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  position: string;

  @Column()
  date: string;
}
