import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [DatabaseModule, ScraperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
