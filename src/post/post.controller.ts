import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { PostService } from './post.service';
import {PostDto} from "./dto/post.dto";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard())
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(`create`)
  create(@Body() createPostDto: PostDto) {
    return this.postService.create(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: PostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
