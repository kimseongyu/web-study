import { Inject, Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';

@Injectable()
export class DatabaseService {
  private db: JsonDB;

  constructor(path) {
    this.db = new JsonDB(new Config('database/scraped-data', true, false, '/'));
  }

  async saveData(data: any) {
    this.db.push('/data', data);
  }

  async getData() {
    return this.db.getData('/data');
  }
}
