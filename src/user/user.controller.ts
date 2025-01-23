import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { UserService } from './user.service';

import {BaseQueryDto} from "../common/validator/base.query.validator";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //@ApiPaginatedResponse('entities', UserItemDto) не працює
  @Get('list')
  findAll(@Query() query: BaseQueryDto) {
    return this.userService.findAll(query);
  }
}
