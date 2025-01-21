import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "./dto/create-auth.dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/user`)
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.singUpUser(createAuthDto);
  }

}
