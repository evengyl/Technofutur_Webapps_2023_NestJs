import { Module } from "@nestjs/common";
import { UserController } from "./_user.controller";
import { UserService } from "./_user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/users.entity";
import { DonationContrller } from "./_donation.controller";

@Module({
    controllers : [
        UserController,
        DonationContrller
    ],
    providers : [UserService],
    imports : [
        TypeOrmModule.forFeature([
            UsersEntity
        ])
    ]
})
export class UserModule
{

}