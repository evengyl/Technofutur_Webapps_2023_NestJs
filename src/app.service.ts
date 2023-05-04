import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  async sayHello()
  {
    let messageReturned : any = {
      message : "Bonjour les webapps 23"
    }

    return messageReturned
  }

  async otherFunct()
  {
    return [1,2,3,4]
  }

}
