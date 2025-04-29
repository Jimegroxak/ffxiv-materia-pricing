import { Injectable } from "@nestjs/common";
import csv from 'csv-parser'
import fs from 'fs'
import { worldData } from "src/interfaces/worldData.interface";

@Injectable()
export class CSVService {
    parseCSV() {
        const results: worldData[] = []

        fs.createReadStream('worldName.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results)
            })
    }
}