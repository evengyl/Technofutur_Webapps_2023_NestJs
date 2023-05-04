import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Get } from '@nestjs/common';

@Controller("app")
export class AppController {

  constructor(private readonly appServe : AppService)
  {}

  @Get("sayhello")
  sayHello()
  {
    return this.appServe.sayHello()
  }

  @Get("otherfunct")
  otherFunct()
  {
    return this.appServe.otherFunct()
  }
}




/* Verb HTTP

GET
POST
PUT
PATCH
DELETE
OPTION
HEAD

*/