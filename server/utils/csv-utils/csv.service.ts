import { Injectable } from "@nestjs/common";
import * as csv from 'csv-parser'
import * as fs from 'fs'
import { worldData } from '../../src/interfaces/worldData.interface';

@Injectable()
export class CSVService {
    parseCSV() {
        const results: worldData[] = []

        fs.createReadStream('utils/csv-utils/worldName.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results)
            })
    }
}