import { IsNotEmpty } from 'class-validator';

export class CreateClippingDto {
  @IsNotEmpty()
  libro: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  type: string;

  description: string;

  position: string;

  date: string;
}
