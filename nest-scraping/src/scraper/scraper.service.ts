import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ScraperService {
  constructor(private readonly databaseService: DatabaseService) {}

  async scrapeWebsite(url: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      const content = await page.content();
      const $ = await cheerio.load(content);

      const data = [];
      $('h1').each((index, element) => {
        data.push($(element).text());
      });
      console.log(data);
      await this.databaseService.saveData(data);
    } catch (error) {
      console.error('Error scraping website:', error);
    } finally {
      await browser.close();
    }
  }
}
