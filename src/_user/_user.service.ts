import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewUser } from "src/shared/DTO/newUser.dto";
import { UpdateUserMdp } from "src/shared/DTO/updateUserMdp.dto";
import { User } from "src/shared/DTO/user.dto";
import { UserId } from "src/shared/DTO/userId.dto";
import { UsersEntity } from "src/shared/entities/users.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

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

    async create(newUser : NewUser) : Promise<UserId | User>
    {
        let userEntityCreated = this.usersRepo.create({...newUser})

        let resultInsert : InsertResult = await this.usersRepo.insert(userEntityCreated)
        .catch(_ => { throw new InternalServerErrorException("Error on insert user in sql") })

        console.log(resultInsert)
        return resultInsert.identifiers[0].id
        
        /*let resultSave = await this.usersRepo.save(userEntityCreated)
        .catch(_ => {
            throw new InternalServerErrorException("Error on save user in sql")
        })

        let userCreated = new User()
        userCreated.id = resultSave.id
        userCreated.login = resultSave.login

        return userCreated*/
    }

    async updateMdp(userId : UserId, newMdp : UpdateUserMdp) : Promise<UserId>
    {
        let userExist = await this.usersRepo.findOneOrFail({ where : { id : userId }})
        .catch(_ => { throw new HttpException("User not found", HttpStatus.NOT_FOUND)})

        userExist.mdp = newMdp.mdp
        let userSaved = await this.usersRepo.save(userExist)
        .catch(_ => { throw new InternalServerErrorException("Error on save user in sql") })

        let id : UserId = userSaved.id

        return id
    }

    async disable(userId : UserId) : Promise<UserId>
    {
        let userExist = await this.usersRepo.findOneOrFail({ where : { id : userId }})
        .catch(_ => { throw new HttpException("User not found", HttpStatus.NOT_FOUND)})

        userExist.active = false
        let userSaved : UpdateResult = await this.usersRepo.update(userId, userExist)
        .catch(_ => { throw new InternalServerErrorException("Error on save user in sql") })

        console.log(userSaved)

        if(userSaved.affected == 1)
            return userExist.id
        else
            return -1
    }
}