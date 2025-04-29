import { Module } from "@nestjs/common";
import { CSVService } from "./csv.service";

@Module({
    providers: [CSVService]
})

export class CSVModule { }