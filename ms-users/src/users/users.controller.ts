import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersCreateDTO } from './dtos/users.create.dto';
import { UsersUpdateDTO } from './dtos/users.update.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) { }

    @MessagePattern({ cmd: 'users.findAll' })
    findAll() {
        return this.service.findAll()
    }

    @MessagePattern({ cmd: 'users.findOne' })
    findOne(@Payload('id') id: string) {
        return this.service.findOne(id)
    }

    @MessagePattern({ cmd: 'users.create' })
    create(@Payload() usersCreateDTO: UsersCreateDTO) {
        return this.service.create(usersCreateDTO)
    }

    @MessagePattern({ cmd: 'users.update' })
    update(@Payload() usersUpdateDTO: UsersUpdateDTO) {
        return this.service.update(usersUpdateDTO)
    }

    @MessagePattern({ cmd: 'users.delete' })
    delete(@Payload('id') id: string) {
        return this.service.delete(id)
    }
}
