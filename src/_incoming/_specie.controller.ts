import { Controller, Get, Param } from "@nestjs/common";
import { IncomingService } from "./_incoming.service";

@Controller("api/species")
export class SpecieController
{
    constructor(
        private readonly incomingServe : IncomingService
    ) {}


    @Get(":specie")
    getAllBySpecie(
        @Param() specie : string
    )
    {
        return this.incomingServe.getAllBySpecie(specie)
    }
}