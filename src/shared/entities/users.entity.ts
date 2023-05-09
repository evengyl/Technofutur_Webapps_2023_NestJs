import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UsersEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column( { length : 50, nullable : false, unique : true } )
    login : string

    @Column( { length : 50} )
    mdp : string

    @Column( { default : true} )
    active : boolean
}