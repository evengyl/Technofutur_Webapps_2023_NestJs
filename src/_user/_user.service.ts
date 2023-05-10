import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewUserDonation } from "src/shared/DTO/donations/newUserDonation.dto";
import { NewUser } from "src/shared/DTO/users/newUser.dto";
import { UpdateUserMdp } from "src/shared/DTO/users/updateUserMdp.dto";
import { User } from "src/shared/DTO/users/user.dto";
import { UserId } from "src/shared/DTO/users/userId.dto";
import { UserDonationEntity } from "src/shared/entities/userDonation.entity";
import { UsersEntity } from "src/shared/entities/users.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class UserService
{

    constructor(
        @InjectRepository(UsersEntity) private usersRepo : Repository<UsersEntity>,
        @InjectRepository(UserDonationEntity) private userDonationRepo : Repository<UserDonationEntity>
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

        if(userSaved.affected == 1)
            return userExist.id
        else
            return -1
    }


    async getAllDonation()
    {

    }


    async getDonationByUserId(userId : UserId)
    {

    }


    async addDonationByUser(userId : UserId, newUserDonation : NewUserDonation)
    {

    }
}