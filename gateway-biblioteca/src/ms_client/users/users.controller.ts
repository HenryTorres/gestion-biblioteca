import { Body, Controller, Delete, Get, HttpException, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { UsersCreateDTO } from './dtos/users.create.dto';
import { UsersUpdateDTO } from './dtos/users.update.dto';

@Controller('users')
export class UsersController {

    constructor(
        @Inject('NATS-CLIENT')
        private readonly nats: ClientProxy
    ) { }

    @Get()
    findAll() {
        return this.nats.send({ cmd: 'users.findAll' }, {})
            .pipe(catchError((err) => {
                throw new HttpException(err.message, err.status)
            }))
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return this.nats.send({ cmd: 'users.findOne' }, { id })
            .pipe(catchError((err) => {
                throw new HttpException(err.message, err.status)
            }))
    }

    @Post()
    create(@Body() usersCreateDTO: UsersCreateDTO) {
        return this.nats.send({ cmd: 'users.create' }, usersCreateDTO)
            .pipe(catchError((err) => {
                throw new HttpException(err.message, err.status)
            }))
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() usersUpdateDTO: UsersUpdateDTO) {
        return this.nats.send({ cmd: 'users.update' }, { ...usersUpdateDTO, id })
            .pipe(catchError((err) => {
                throw new HttpException(err.message, err.status)
            }))
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.nats.send({ cmd: 'users.delete' }, { id })
            .pipe(catchError((err) => {
                throw new HttpException(err.message, err.status)
            }))
    }
}
