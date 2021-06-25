import { Injectable, Logger } from '@nestjs/common';
import { CreateClippingDto } from './dto/create-clipping.dto';

@Injectable()
export class ClippingsUtils {
  private logger = new Logger('ClippingsUtils');
  private CLIPPING_SEPARATION = '==========';

  getCreateClippingDto(fileData: string): CreateClippingDto {
    this.logger.verbose(`Getting all clippings of file`);
    const clippings = fileData.split(this.CLIPPING_SEPARATION);
    let createClippingDto: CreateClippingDto;

    for (const clipping of clippings) {
      // get array with lines of Clipping
      let clippingLines = clipping.split('\n').map(function (line) {
        return line.trim();
      });

      //filter only the lines that have information
      clippingLines = clippingLines.filter(function (e) {
        return e;
      });

      let bookInfo;
      let clippingInfo;
      let description;
      if (clippingLines.length > 0) {
        bookInfo = clippingLines[0].split('(');
        clippingInfo = clippingLines[1].split('|');

        if (null != clippingLines[2]) {
          description = clippingLines[2];
        }
      }
      this.logger.verbose(`bookInfo: ${bookInfo}`);
      this.logger.verbose(`clippingInfo: ${clippingInfo}`);
      this.logger.verbose(`description: ${description}`);

      //createClippingDto = {
      //  book: infoBook[0],
      //  author: infoBook[1],
      //  type: clippingInfo[0],
      //  description: description,
      //  position: clippingInfo[1],
      //  date: clippingInfo[3],
      //};
    }

    return createClippingDto;
  }

  getBookName(): string {
    return 'all';
  }

  getAuthorName(): string {
    return 'all';
  }

  getTypeOfClipping(): string {
    return 'all';
  }

  getDescription(): string {
    return 'all';
  }

  getPosition(): string {
    return 'all';
  }

  getDate(): string {
    return 'all';
  }
}
