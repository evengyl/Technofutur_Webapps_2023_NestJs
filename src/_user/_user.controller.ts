import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { UserService } from "./_user.service";
import { UserId } from "src/shared/DTO/userId.dto";
import { User } from "src/shared/DTO/user.dto";
import { NewUser } from "src/shared/DTO/newUser.dto";
import { UpdateUserMdp } from "src/shared/DTO/updateUserMdp.dto";

@Controller("api/users")
export class UserController
{
    constructor(
        private readonly userServe : UserService
    )
    {}

    //CRUD -> Create (ReadAll, ReadOne) Update Delete
    /*
        RestFul 
            users/1/toutCeQueJaiBesoin NOK !!!!
            
            --> step by step OK !!!
            users/1/infos/telSorte1
                users/1/infos/telSorte2
                    users/1/infos/telSorte3
                        users/1/infos/telSorte4
                            users/1/infos/telSorte5
                                users/1/infos/telSorte6


        GraphQL -> non vu en formation (sauf si vous êtes gentils et que le formateur aime les suchi...)
    */


    //  --> GET --> /api/users
    @Get()
    getAllUsers(): Promise<User[]>// : Promise<[User[], number]>
    {
        return this.userServe.getAll()
    }


    // --> GET --> /api/users/:userId
    @Get(":userId")
    getOneUser(
        @Param("userId", ParseIntPipe) userId : UserId
    ) : Promise<User>
    {
        return this.userServe.getOne(userId)
    }


    // --> POST --> /api/users
    @Post()
    createUser(
        @Body(ValidationPipe) newUser : NewUser
    ) : Promise<UserId | User>
    {
        return this.userServe.create(newUser)
    }


    // --> PATCH --> /api/users/:userId
    @Patch(":userId")
    updateUser(
        @Param("userId", ParseIntPipe) userId : UserId,
        @Body() updateUserMdp : UpdateUserMdp
    ) : Promise<UserId>
    {
        return this.userServe.updateMdp(userId, updateUserMdp)
    }


    // --> DELETE --> /api/users/:userId
    @Delete(":userId")
    disableUser(
        @Param("userId", ParseIntPipe) userId : UserId
    ) : Promise<UserId>
    {
        return this.userServe.disable(userId)
    }

}