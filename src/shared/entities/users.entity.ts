import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDonationEntity } from "./userDonation.entity";

@Entity("users")
export class UsersEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column( { length : 50, nullable : false, unique : true } )
    login : string

    @Column( { length : 50, nullable : false} )
    mdp : string

    @Column( { default : true} )
    active : boolean

    @OneToMany(() => UserDonationEntity, donation => donation.user, { cascade : ["insert", "update"]})
    @JoinColumn()
    donation : UserDonationEntity[]
}