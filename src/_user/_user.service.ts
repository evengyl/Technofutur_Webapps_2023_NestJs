import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class UserService
{

    private users : any[] = [
        { id : 1, login : "Sébastien", mdp : "Test1234", active : true },
        { id : 2, login : "Aymeric", mdp : "Test1234", active : true },
        { id : 3, login : "Amandine", mdp : "Test1234", active : true },
        { id : 4, login : "Rémy", mdp : "Test1234", active : true },
        { id : 5, login : "Ferdinando", mdp : "Test1234", active : true },
        { id : 6, login : "Nicolas", mdp : "Test1234", active : true },
        { id : 7, login : "Meroine", mdp : "Test1234", active : true }
    ]

    constructor(){
    }


    async getAll() : Promise<any[]>
    {
        return this.users
    }

    async getOne(userId : number) : Promise<any | undefined>
    {
        let userFoundShort = this.users.find(user => user.id == userId)

        let userFoundLong = this.users.find((user) => {
            if(user.id == userId)
                return user
            else
                return undefined
        })

        //console.log(userFoundLong)
        //console.log(userFoundShort)
        return userFoundShort
    }

    async create(newUser : any) : Promise<{userId : number}>
    {
        let totalUser = this.users.length
        let newId = totalUser + 1

        if(newUser.login != undefined && newUser.mdp != undefined)
        {
            this.users.push({id : newId, ...newUser})
            return { userId : newId }
        }
        else
        {
            throw new HttpException("Erreur : Nombre de paramètre body incorrect", HttpStatus.BAD_REQUEST)
        }

    }

    async updateMdp(userId : number, newMdp : any) : Promise<{userId : number}>
    {
        if(newMdp.mdp == undefined) throw new HttpException("Erreur : Nombre de paramètre body incorrect", HttpStatus.BAD_REQUEST)


        let userIndexFound = this.users.findIndex(user => user.id == userId)

        if(userIndexFound != -1)
        {
            this.users[userIndexFound].mdp = newMdp.mdp
            return { userId : this.users[userIndexFound].id }
        }
        else
            throw new HttpException("Erreur : User not found", HttpStatus.NOT_FOUND)
    }

    async disable(userId : number) : Promise<{userId : number}>
    {
        let userIndexFound = this.users.findIndex(user => user.id == userId)

        if(userIndexFound != -1)
        {
            if(this.users[userIndexFound].active == true)
            {
                this.users[userIndexFound].active == false
                return { userId : this.users[userIndexFound].id }
            }
            else
                throw new HttpException("Erreur : User already desactivated", HttpStatus.BAD_REQUEST)
        }
        else
            throw new HttpException("Erreur : User not found", HttpStatus.NOT_FOUND)
    }
}