import { IsBoolean, IsEmail, IsIn, IsOptional, IsString } from "class-validator";

export class UsersCreateDTO {

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsIn(['STUDENT', 'TEACHER'])
    type: string

    @IsBoolean()
    @IsOptional()
    isActive: boolean
}
