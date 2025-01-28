import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {Roles} from "../common/decorator/roles.decorator";
import {RoleGuard} from "../common/guards/role.guard";

import {BaseQueryDto} from "../common/validator/base.query.validator";
import {AuthGuard} from "@nestjs/passport";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(`Admin`)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('list')
  findAll(@Query() query: BaseQueryDto) {
    return this.userService.findAll(query);
  }
}
