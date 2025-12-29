import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersCreateDTO } from './dtos/users.create.dto';
import { UsersUpdateDTO } from './dtos/users.update.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        try {
            return this.prisma.user.findMany()
        } catch (error) {
            throw new RpcException({
                status: 500,
                message: error
            });
        }
    }

    async create(usersCreateDTO: UsersCreateDTO) {
        console.log(usersCreateDTO);
        try {
            return await this.prisma.user.create({ data: usersCreateDTO });
        } catch (error) {
            console.log(error);
            if (error instanceof RpcException) throw error;

            if (error?.code == 'P2002') {
                throw new RpcException({
                    status: 409,
                    message: `El email ${usersCreateDTO.email} ya esta registrado`
                })
            }

            throw new RpcException({
                status: 500,
                message: error
            });
        }
    }

    async findOne(id: string) {
        try {
            const users = await this.prisma.user.findUnique({ where: { id } });

            if (!users) {
                throw new RpcException({
                    status: 404,
                    message: `El Usuario con ID ${id} no encontrado`
                })
            }

            return users
        } catch (error) {
            if (error instanceof RpcException) throw error;

            throw new RpcException({
                status: 500,
                message: error
            });
        }
    }

    async update(usersUpdateDTO: UsersUpdateDTO) {
        const id = usersUpdateDTO.id;
        const { id: _id, ...data } = usersUpdateDTO;

        try {
            await this.findOne(id);
            return await this.prisma.user.update({ where: { id }, data });

        } catch (error) {
            if (error instanceof RpcException) throw error

            if (error?.code === 'P2025')
                throw new RpcException({
                    status: 404,
                    message: `El usuario con ID ${id} no encontrado`
                })

            throw new RpcException({
                status: 500,
                message: error
            });
        }
    }

    //eliminar

    async delete(id: string) {

        try {
            await this.findOne(id);

            return await this.prisma.user.delete({ where: { id } })
        } catch (error) {
            if (error instanceof RpcException) throw error;

            throw new RpcException({
                status: 500,
                message: 'Error interno al eliminar un usuario'
            });
        }

    }
}
