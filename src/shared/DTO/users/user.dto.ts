import { IsDefined } from "class-validator"
import { UserDonation } from "../donations/userDonation.dto"

export class User{
    
    
    constructor(){

    }

    @IsDefined()
    id : number

    @IsDefined()
    login : string

    @IsDefined()
    mdp : string


    
    /////////////////////////////
    //Part Relational Entities //
    /////////////////////////////
    
    donation : UserDonation[]
}