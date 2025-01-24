
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "../../database/entities/post.entity";

export class UserItemDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    age: number;
}
