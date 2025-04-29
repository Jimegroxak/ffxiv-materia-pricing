import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CSVService } from 'utils/csv-utils/csv.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, CSVService],
})
export class AppModule { }
