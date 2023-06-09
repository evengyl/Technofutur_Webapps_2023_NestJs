import { Module } from "@nestjs/common";
import { UserController } from "./_user.controller";
import { UserService } from "./_user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/users.entity";
import { DonationContrller } from "./_donation.controller";
import { UserDonationEntity } from "src/shared/entities/userDonation.entity";

@Module({
    controllers : [
        UserController,
        DonationContrller
    ],
    providers : [UserService],
    imports : [
        TypeOrmModule.forFeature([
            UsersEntity,
            UserDonationEntity
        ])
    ]
})
export class UserModule
{

}