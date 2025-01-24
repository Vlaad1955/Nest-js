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

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number,) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
