
import {ApiProperty} from "@nestjs/swagger";

export class UserItemDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    age: number;
}
