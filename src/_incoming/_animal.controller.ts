import { Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { IncomingService } from "./_incoming.service";

@Controller("api/animal")
export class AnimalController
{
    constructor(
        private readonly incomingServe : IncomingService
    ) {}

    
    @Patch(":animalId")
    reviveAnimal(
        @Param() animalId : number
    )
    {
        return this.incomingServe.reviveAnimal(animalId)
    }


    @Delete(":animalId")
    dieAnimal(
        @Param() animalId : number
    )
    {
        return this.incomingServe.dieAnimal(animalId)
    }
   
}