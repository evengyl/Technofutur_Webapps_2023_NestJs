import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewUser } from "src/shared/DTO/newUser.dto";
import { UpdateUserMdp } from "src/shared/DTO/updateUserMdp.dto";
import { User } from "src/shared/DTO/user.dto";
import { UserId } from "src/shared/DTO/userId.dto";
import { UsersEntity } from "src/shared/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService
{

    private users : User[] = [
        { id : 1, login : "Sébastien", mdp : "Test1234", active : true },
        { id : 2, login : "Aymeric", mdp : "Test1234", active : true },
        { id : 3, login : "Amandine", mdp : "Test1234", active : true },
        { id : 4, login : "Rémy", mdp : "Test1234", active : true },
        { id : 5, login : "Ferdinando", mdp : "Test1234", active : true },
        { id : 6, login : "Nicolas", mdp : "Test1234", active : true },
        { id : 7, login : "Meroine", mdp : "Test1234", active : true }
    ]

    constructor(
        @InjectRepository(UsersEntity) private usersRepo : Repository<UsersEntity>
    ){}


    async getAll() : Promise<User[]>
    {
        

        /*return await this.usersRepo.find({
            select : { login : true, }, 
            where : { active : true },
            order : { id : "DESC"}
        })*/

        /*return await this.usersRepo.findAndCount({
            select : { login : true, }, 
        number]>    where : { active : true },
            order : { id : "DESC"}
        })
        .then((users) => {
            return users
        })
        .then((users2) => {
            return users2
        })
        .catch(() => {
            throw new HttpException("erreur non connue", HttpStatus.FORBIDDEN)
        })   attention de remettre : Promise<[User[],  en retour de methode*/


        //let data = await this.usersRepo.findAndCountBy({ active : true })
        //console.log(data)


        return await this.usersRepo.find() //select * classique
    }

    async getOne(userId : UserId) : Promise<User>
    {
        /*let oneUser = await this.usersRepo.findOne({
            where : { id : userId}
        })
        .catch(_ => {
            throw new HttpException("erreur non connue", HttpStatus.FORBIDDEN)
        })*/

        //let oneUser = await this.usersRepo.findOneBy({ active : true, id : userId })


        /*let oneUser = await this.usersRepo.findOneOrFail({
            where : { id : userId}
        })
        .catch(_ => {
            throw new HttpException("VIDE", HttpStatus.NOT_FOUND)
        })*/

        let oneUser = await this.usersRepo.findOneByOrFail(
            { active : true, id : userId }
        )
        .catch(_ => {
            throw new HttpException("VIDE", HttpStatus.NOT_FOUND)
        })
        //pour toute options liée au select classique donc les find, voir la doc https://typeorm.io/find-options
        return oneUser
    }

    async create(newUser : NewUser) : Promise<UserId>
    {
        newUser.id = this.users.length + 1
        newUser.active = true

        this.users.push({...newUser})

        return newUser.id    
    }

    async updateMdp(userId : UserId, newMdp : UpdateUserMdp) : Promise<UserId>
    {
        let userIndexFound = this.users.findIndex(user => user.id == userId)

        if(userIndexFound != -1)
        {
            this.users[userIndexFound].mdp = newMdp.mdp
            return this.users[userIndexFound].id
        }
        else
            throw new HttpException("Erreur : User not found", HttpStatus.NOT_FOUND)
    }

    async disable(userId : UserId) : Promise<UserId>
    {
        let userIndexFound = this.users.findIndex(user => user.id == userId)

        if(userIndexFound != -1)
        {
            if(this.users[userIndexFound].active == true)
            {
                this.users[userIndexFound].active == false
                return this.users[userIndexFound].id
            }
            else
                throw new HttpException("Erreur : User already desactivated", HttpStatus.BAD_REQUEST)
        }
        else
            throw new HttpException("Erreur : User not found", HttpStatus.NOT_FOUND)
    }
}