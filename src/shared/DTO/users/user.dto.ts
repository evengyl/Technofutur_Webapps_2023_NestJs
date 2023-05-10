import { IsDefined } from "class-validator"

export class User{
    
    
    constructor(){

    }

    @IsDefined()
    id : number

    @IsDefined()
    login : string

    @IsDefined()
    mdp : string

    @IsDefined()
    active : boolean
}