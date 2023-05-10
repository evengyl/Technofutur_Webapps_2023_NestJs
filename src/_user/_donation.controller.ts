import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "./_user.service";
import { UserId } from "src/shared/DTO/users/userId.dto";
import { NewUserDonation } from "src/shared/DTO/donations/newUserDonation.dto";
import { UserDonation } from "src/shared/DTO/donations/userDonation.dto";
import { User } from "src/shared/DTO/users/user.dto";

@Controller("api/donations")
export class DonationContrller{

    constructor(
        private readonly userServe : UserService
    ){}


    /////////////////////////////
    //Part Relational Entities //
    /////////////////////////////
    @Get()
    getAllDonation() : Promise<UserDonation[]>
    {
        return this.userServe.getAllDonation()
    }


    @Get(":userId")
    getDonationByUserId(
        @Param("userId") userId : UserId
    ) : Promise<UserDonation[]>
    {
        return this.userServe.getDonationByUserId(userId)
    }


    @Post(":userId")
    addDonationByUser(
        @Param("userId") userId : UserId,
        @Body(ValidationPipe) newUserDonation : NewUserDonation
    ) : Promise<User>
    {
        return this.userServe.addDonationByUser(userId, newUserDonation)
    }


}