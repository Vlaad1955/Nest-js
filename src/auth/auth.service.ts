import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, ReturnUserDto} from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import {User} from "../database/entities/user.entity";
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {InjectRedisClient, RedisClient} from "@webeleon/nestjs-redis"
import {JwtService} from "@nestjs/jwt";
import * as process from "process";


@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRedisClient() private readonly redisClient: RedisClient,
      private readonly jwtService: JwtService,
  ) {}
  async singUpUser(createAuthDto: CreateUserDto): Promise<{ accessToken: string }> {
    try {
      const password = await bcrypt.hash(createAuthDto.password, 10);
      const user: User = await this.userRepository.save(
          this.userRepository.create({...createAuthDto, password}),
      );

      const token = await this.singIn(user.id, user.email);

      const redisUserKey = process.env["Redis_UserKey"];
      const redisUserTime = process.env["Redis_UserTime"];

      if (redisUserKey && redisUserTime) {
        await this.redisClient.setEx(`${redisUserKey}-${user.id}`, parseInt(redisUserTime), token);
      } else {
        console.error("Redis_UserKey or Redis_UserTime are undefined.");
      }

      return {accessToken: token};
    }catch (e){
      console.error("Error in signUpUser:", e);
      throw new UnauthorizedException("Failed to sign up user.");
    }

  }

  async validateUser (userId: string, userEmail: string): Promise<User>{
    if (!userId || !userEmail){
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOne({
      where:{
        id:userId,
        email:userEmail,
      }
    });
    if (!user){
      throw new UnauthorizedException();
    }
    return user;
  }

  async singIn(userId: string, userEmail:string): Promise<string>{
    return this.jwtService.sign({id:userId, email:userEmail});
  }
}
