import { Injectable } from '@nestjs/common';
import { UserItemDto } from './dto/user-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";
import {Repository} from "typeorm";
import {BaseQueryDto} from "../common/validator/base.query.validator";
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';


@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query?: BaseQueryDto): Promise<{
    pages: number | undefined;
    entities: UserItemDto[];
    countItems: number | undefined;
    page: number
  }> {
    const options = {
      page: query && query.page !== undefined ? +query.page : 1,
      limit: query && query.limit !== undefined ? +query.limit : 10,
    };

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.select('email, "firstName", age, id, "createdAt"');
    if (query?.search) {
      queryBuilder.where('LOWER(user.firstName) LIKE :search', {
        search: `%${query.search.toLowerCase()}%`,
      });
    }
    const [pagination, rawEntities] = await paginateRawAndEntities(
        queryBuilder,
        options,
    );
    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalPages,
      countItems: pagination.meta.totalItems,
      entities: rawEntities as UserItemDto[],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserItemDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
