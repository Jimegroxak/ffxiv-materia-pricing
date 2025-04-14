import { Controller, Get, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ItemInfo } from './interfaces/item.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getItemPrice(): Observable<ItemInfo> | undefined {
    const response = this.appService.findItemPrice(['5669','5670'], 'Dynamis');
    return response
  }
}
