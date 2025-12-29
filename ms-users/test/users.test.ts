import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs";

const main = async () => {
    const client: ClientProxy = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3002
        }
    });

    try {

        // //listar
        // const lista = await firstValueFrom(client.send(
        //     { cmd: 'users.findAll' }, {})
        // );
        // console.log(lista)


        // // crear
        // const create = await firstValueFrom(client.send(
        //     { cmd: 'users.create' },
        //     { name: 'Jonathan', email: 'jonathan@gmail.com', type: 'STUDENT', isActive: true }
        // ))
        // console.log("CREADO : ", create)


        //actualizar

        const update = await firstValueFrom(client.send(
            { cmd: 'users.update' },
            { id: '693d3f034808bb9bc79630e3', name: 'Jonatan Quispe', email: 'jonatan.quispe@gmail.com', type: 'docente', isActive: false }));
        console.log("ACTUALIZADO: ", update)


        //BUSCAR

        // const search = await firstValueFrom(client.send(
        //     {cmd:'users.findOne'},
        //     {id:'693bece230e9fe146181ea05'}
        // ))

        // console.log('ID BUSCADO: ', search)


        //eliminar

        // const dele = await firstValueFrom(client.send(
        //     {cmd:'users.delete'},
        //     {id:'693d3f034808bb9bc79630e3'}
        // ))

        // console.log('ID ELIMINARDO : ', dele)







    } catch (error) {
        console.log(error)
    } finally {
        console.log('Cerrando la Conexion')
        client.close()
    }


}

main()