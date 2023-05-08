import { Controller, Delete, Get, Param, Patch, Post, Body } from "@nestjs/common";
import { IncomingService } from "./_incoming.service";

@Controller("api/incomings")
export class IncomingController
{
    constructor(private readonly incomingServe : IncomingService){}

    @Get()
    getAllAnimals()
    {
        return this.incomingServe.getAllAnimals()
    }


    @Get(":animalId")
    getOneAnimal(
        @Param() animalId : number
    )
    {
        return this.incomingServe.getOneAnimal(animalId)
    }


    @Post()
    incomingAnimal(
        @Body() newAnimal : any
    )
    {
        return this.incomingServe.incomingAnimal(newAnimal)
    }


    @Patch(":animalId")
    departureAnimal(
        @Param() animalId : number
    )
    {
        return this.incomingServe.departureAnimal(animalId)
    }



}