import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { DatabaseService } from 'src/database/database.service';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get('/scrape')
  async scrapeWebsite(@Query('url') url: string) {
    await this.scraperService.scrapeWebsite(url);
    return { message: 'Website scraped successfully' };
  }

  @Get('data')
  async getData() {
    const data = await this.databaseService.getData();
    if (!data) {
      throw new NotFoundException('No data found');
    }
    return { data };
  }
}
