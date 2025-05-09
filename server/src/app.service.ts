/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { Observable, catchError, map, of } from 'rxjs';
import {
  ApiResponse,
  ItemInfo,
  itemNameMap,
  worldNameMap,
} from './interfaces/item.interface';
import { CSVService } from 'utils/csv-utils/csv.service';


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService,
    private readonly csvService: CSVService
  ) { }

  findAll(): Observable<any> {
    return this.httpService
      .get('https://universalis.app/api/v2/data-centers')
      .pipe(map((response) => response.data));
  }

  findItemPrice(
    itemID: String | String[],
    worldDcRegion: String,
  ): Observable<ItemInfo[]> {
    this.csvService.parseCSV()
    return this.httpService
      .get(
        `https://universalis.app/api/v2/aggregated/${worldDcRegion}/${itemID.toString()}`,
      )
      .pipe(
        map((response: AxiosResponse<ApiResponse>) => {
          //response is always an array, bozo
          const results = Array.isArray(response.data.results)
            ? response.data.results
            : [response.data.results];

          return results.map((result) => ({
            name: itemNameMap.get(String(result.itemId)) || 'Unknown',
            minListingDC: {
              price: result.nq.minListing.dc.price,
              worldName:
                worldNameMap.get(result.nq.minListing.dc.worldId as Number) ||
                'Unknown world',

            },
          }));
        }),
        catchError((error) => {
          console.error('Error fetching item price:', error);
          return of([]);
        }),
      );
  }
}
