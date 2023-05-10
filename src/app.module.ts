import { Module } from '@nestjs/common';
import { UserModule } from './_user/_user.module';
import { IncomingModule } from './_incoming/_incoming.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    IncomingModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'legends',
      database: 'tf_webapps_23_spa',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      autoLoadEntities : true,
      synchronize: true,
      //logging : "all"
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
