import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDonationEntity } from "./userDonation.entity";
import { LifetimeEntity } from "./lifetime.entity";

@Entity("users")
export class UsersEntity extends LifetimeEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column( { length : 50, nullable : false, unique : true } )
    login : string

    @Column( { length : 50, nullable : false} )
    mdp : string

    
    /////////////////////////////
    //Part Relational Entities //
    /////////////////////////////
    @OneToMany(() => UserDonationEntity, donation => donation.user, { cascade : ["insert", "update"]})
    @JoinColumn()
    donation : UserDonationEntity[]
}