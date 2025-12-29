
import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { UsersCreateDTO } from "./users.create.dto";

export class UsersUpdateDTO extends PartialType(UsersCreateDTO) {
    @IsString()
    id: string
}