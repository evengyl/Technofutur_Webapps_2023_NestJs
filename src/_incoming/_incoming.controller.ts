import { Controller, Delete, Get, Param, Patch, Post, Body } from "@nestjs/common";
import { IncomingService } from "./_incoming.service";

@Controller("api/incomings")
export class IncomingController
{
    constructor(private readonly incomingServe : IncomingService){}

    @Get()
    getAllAnimals() : Promise<any[]>
    {
        return this.incomingServe.getAllAnimals()
    }


    @Get(":animalId")
    getOneAnimal(
        @Param("animalId") animalId : number
    ) : Promise<any>
    {
        return this.incomingServe.getOneAnimal(animalId)
    }


    @Post()
    incomingAnimal(
        @Body() newAnimal : any
    ) : Promise<any>
    {
        return this.incomingServe.incomingAnimal(newAnimal)
    }


    @Patch(":animalId")
    departureAnimal(
        @Param("animalId") animalId : number
    ) : Promise<any>
    {
        return this.incomingServe.departureAnimal(animalId)
    }



}