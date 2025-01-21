import { Injectable } from '@nestjs/common';
import {CreateUserDto, ReturnUserDto} from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import {User} from "../database/entities/user.entity";
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}
  async singUpUser(createAuthDto: CreateUserDto): Promise<ReturnUserDto> {
    const password = await bcrypt.hash(createAuthDto.password, 10);
    const user: User = await this.userRepository.save(
        this.userRepository.create({ ...createAuthDto, password }),
    );
    return {
      id:createAuthDto.id,
      firstName:createAuthDto.firstName,
      lastName:createAuthDto.lastName,
      age:createAuthDto.age,
      city:createAuthDto.city,
      createdAt:createAuthDto.createdAt,
    };
  }

}
