import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class IncomingService
{

     private animals : any[] = [
        { id : 1, name : "Pupuce", age : 19, specie : "cat", isVaccine : true, isHere : true, isAlive : true },
        { id : 2, name : "Channel", age : 2, specie : "dog", isVaccine : false, isHere : true, isAlive : true },
        { id : 3, name : "Globule", age : 1, specie : "dog", isVaccine : true, isHere : true, isAlive : true },
        { id : 4, name : "Princesse", age : 14, specie : "cat", isVaccine : true, isHere : true, isAlive : true },
        { id : 5, name : "Rantanplan", age : 77, specie : "dog", isVaccine : true, isHere : true, isAlive : true },
    ]

    private species : any[] = ["dog", "cat"]

    async getAllAnimals() : Promise<any[]>
    {
        return this.animals
    }

    async getOneAnimal(animalId : number) : Promise<any>
    {
        return this.verifyAnimalId(animalId)
    }

    async getAllBySpecie(specie : string) : Promise<any[]>
    {
        if(!this.species.includes(specie)) throw new HttpException("Sepcie not found in this SPA", HttpStatus.NOT_FOUND)

        let animalsFound = this.animals.filter(animal => animal.specie == specie)
        return animalsFound
    }


    async incomingAnimal(newAnimal : any) : Promise<any>
    {
        if(!this.species.includes(newAnimal.specie)) throw new HttpException("Sepcie not found in this SPA", HttpStatus.NOT_FOUND)
        
        if(newAnimal.name != undefined && newAnimal.age != undefined && newAnimal.specie != undefined)
        {
            if(typeof newAnimal.isVaccine != 'boolean')
                newAnimal.isVaccine = false
            
            let newId = this.animals.length + 1
            newAnimal.isAlive = true
            newAnimal.isHere = true
            
            this.animals.push({ id : newId, ...newAnimal})
            return this.animals[this.animals.length]
        }
        else
        {
            throw new HttpException("Erreur : Nombre de paramètre body incorrect", HttpStatus.BAD_REQUEST)
        }

    }

    async departureAnimal(animalId : number) : Promise<any>
    {
        await this.verifyAnimalId(animalId)

        let indexAnimal = this.animals.findIndex(animal => animal.id == animalId)
        this.animals[indexAnimal].isHere = false
        return this.animals[indexAnimal]
    }

    async vaccineAnimal(animalId : number) : Promise<any>
    {
        await this.verifyAnimalId(animalId)

        let indexAnimal = this.animals.findIndex(animal => animal.id == animalId)
        this.animals[indexAnimal].isVaccine = true
        return this.animals[indexAnimal]
    }

    async dieAnimal(animalId : number) : Promise<any>
    {
        await this.verifyAnimalId(animalId)

        let indexAnimal = this.animals.findIndex(animal => animal.id == animalId)
        this.animals[indexAnimal].isAlive = false
        return this.animals[indexAnimal]
    }

    async reviveAnimal(animalId : number) : Promise<any>
    {
        await this.verifyAnimalId(animalId)

        let indexAnimal = this.animals.findIndex(animal => animal.id == animalId)
        this.animals[indexAnimal].isAlive = true
        return this.animals[indexAnimal]
    }

    /**
     * for middleware
     * Other method
     */
    async verifyAnimalId(animalId : number) : Promise<any>
    {
        let animalFound = this.animals.find(animal => animal.id == animalId)

        if(animalFound != undefined) 
            return animalFound
        else 
            throw new HttpException("Animal not found in this SPA", HttpStatus.NOT_FOUND)
    }
}