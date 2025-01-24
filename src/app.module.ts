import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import configuration from "./common/config/configuration";

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }), DatabaseModule, UserModule, PostModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
