import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { Observable, map } from 'rxjs';
import { ApiResponse, ItemInfo, itemNameMap, worldNameMap } from './interfaces/item.interface';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<any> {
    return this.httpService.get('https://universalis.app/api/v2/data-centers').pipe(
      map(response => response.data),
    );
  }

  findItemPrice(itemID: String | String[], worldDcRegion: String): Observable<ItemInfo> | undefined {
    if (typeof itemID === "string")
    {
      const data = this.httpService.get(`https://universalis.app/api/v2/aggregated/${worldDcRegion}/${itemID}`).pipe(
        map((response: AxiosResponse<ApiResponse>) => {
          const itemData = response.data.results[0];
          return {
            name: itemNameMap.get(itemID),
            minListingDC: {
            price: itemData.nq.minListing.dc.price,
            worldName: worldNameMap.get(itemData.nq.minListing.dc.worldId),
            worldId: itemData.nq.minListing.dc.worldId
            }
          }
        })
      )
    }
    
    else if (Array.isArray(itemID)) {
      const data = this.httpService.get(`https://universalis.app/api/v2/aggregated/${worldDcRegion}/${itemID.toString()}`).pipe(
        map((responses: AxiosResponse<ApiResponse[]>) => {
          responses.data.forEach(result => {
            
          });
        })
      )
      
      
      return undefined
    }
  }
}
