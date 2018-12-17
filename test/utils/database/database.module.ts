import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testdb',
      entities: ['./src/data/entities/*.entity.ts'],
    }),
  ],
  providers: [
    DatabaseService,
  ],
  exports: [
    DatabaseService,
  ],
})
export class DatabaseModule { }
