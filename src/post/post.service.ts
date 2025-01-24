import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "../database/entities/post.entity";
import {PostDto} from "./dto/post.dto";

@Injectable()
export class PostService {
  private logger: Logger;
  constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: PostDto) {
    try {

      return await this.postRepository.save(
          this.postRepository.create({
            ...createPostDto,
            user_id: '8c88fcc9-473c-4046-aa74-00d108464a21',
          }),
      );
    }catch (e){
      this.logger.error(e);
      throw new BadRequestException('Creat post failed.');
    }
  }

  async update(id: string, updatePostDto: PostDto) {
    try {
      const post = await this.postRepository.findOne({where: {id}});

      if (!post) {
        throw new Error('Post not found');
      }

      await this.postRepository.update({id}, updatePostDto);
      return 'Post updated successfully';
    }catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Update post failed.');
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const post = await this.postRepository.findOne({where: {id}});

      if (!post) {
        throw new Error('Post not found');
      }

      await this.postRepository.delete({id});
      return 'Post deleted successfully';
    } catch (e){
      this.logger.error(e);
      throw new BadRequestException('Delete post failed.');
    }
  }
}
