import { Injectable, Logger } from '@nestjs/common';
import { ClippingType } from './clipping-type.enum';
import { CreateClippingDto } from './dto/create-clipping.dto';

@Injectable()
export class ClippingsUtils {
  private logger = new Logger('ClippingsUtils');
  private SEPARATION_CLIPPING = '==========';
  private SEPARATION_LINE = '\n';
  private SEPARATION_INFO_BOOK = /\((?=[^\(]+$)/;
  private SEPARATION_INFO_CLIPPING = '|';
  private TYPE_BOOKMARK = 'marcador';
  private TYPE_HIGHLIGHT = 'subrayado';
  private TYPE_NOTE = 'nota';
  private createClippingsDto: CreateClippingDto[] = [];

  constructor() {}

  getCreateClippingsDto(fileData: string): CreateClippingDto[] {
    this.logger.verbose(`Getting all clippings of file`);
    const clippings = fileData.split(this.SEPARATION_CLIPPING);

    for (const clipping of clippings) {
      const createClipping = this.getClippingDto(clipping);
      if (createClipping) {
        this.createClippingsDto.push(createClipping);
      }
    }
    return this.createClippingsDto;
  }

  getClippingDto(clipping: string): CreateClippingDto {
    let createClippingDto: CreateClippingDto;
    let clippingLines = this.getClippingsLinesData(clipping);
    clippingLines = this.removeEmptyLines(clippingLines);

    let bookInfo;
    let clippingInfo;
    let description;

    if (clippingLines.length > 0) {
      bookInfo = this.getBookInfo(clippingLines[0]);
      clippingInfo = this.getClippingInfo(clippingLines[1]);
      description = this.getDescription(clippingLines[2]);

      createClippingDto = {
        book: bookInfo[0],
        author: bookInfo[1],
        type: clippingInfo[0],
        description: description,
        position: clippingInfo[1],
        date: clippingInfo[2],
      };
      return createClippingDto;
    }
  }

  getClippingsLinesData(clipping: string): string[] {
    // get array with lines of Clipping
    return clipping.split(this.SEPARATION_LINE).map(function (line) {
      return line.trim();
    });
  }

  removeEmptyLines(clippingLines: string[]): string[] {
    //filter only the lines that have information
    return clippingLines.filter(function (e) {
      return e;
    });
  }

  getBookInfo(clippingLineBookInfo: string): string[] {
    const bookInfo: string[] = clippingLineBookInfo.split(this.SEPARATION_INFO_BOOK);
    bookInfo[0] = bookInfo[0].trim();

    // Get author name
    bookInfo[1] = bookInfo[1].replace(')', '').trim();
    return bookInfo;
  }

  getClippingInfo(clippingLineClippingInfo: string): string[] {
    const clippingInfo: string[] = clippingLineClippingInfo
      .split(this.SEPARATION_INFO_CLIPPING)
      .map(function (element) {
        return element.trim();
      });

    if (clippingInfo.length <= 2) {
      clippingInfo.splice(1, 0, this.getPagePosition(clippingInfo[0]));
    } else {
      clippingInfo[1] =
        this.getPagePosition(clippingInfo[0]) + ', ' + clippingInfo[1];
    }

    clippingInfo[0] = this.getType(clippingInfo[0]);

    return clippingInfo;
  }

  getPagePosition(clippingInfoTypePosition: string): string {
    if (clippingInfoTypePosition.includes('página')) {
      // eslint-disable-next-line prettier/prettier
      return clippingInfoTypePosition.slice(clippingInfoTypePosition.indexOf('página'));
    } else if (clippingInfoTypePosition.includes('posición')) {
      // eslint-disable-next-line prettier/prettier
      return clippingInfoTypePosition.slice(clippingInfoTypePosition.indexOf('posición'));
    }
  }

  getDescription(clippingLineDescription: string): string {
    if (null != clippingLineDescription) {
      return clippingLineDescription;
    }

    return '';
  }

  getType(type: string): string {
    if (type.includes(this.TYPE_BOOKMARK)) {
      return ClippingType.BOOKMARK;
    } else if (type.includes(this.TYPE_HIGHLIGHT)) {
      return ClippingType.HIGHLIGHT;
    } else if (type.includes(this.TYPE_NOTE)) {
      return ClippingType.NOTE;
    } else {
      return ClippingType.NONE;
    }
  }
}
