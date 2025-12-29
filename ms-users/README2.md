===RESTAURAR TODOS LOS PAQUETES===

npm install

======INSTALAR PRISMA DENTRO DE TU PROYECTO YA REALIZADO==

npm install prisma --save-dev
npm install @prisma/client

======INSTALANDO PRISMA CLI ======

npx prisma

===========GENERAR EL CLIENTE DE PRISMA============

npx prisma generate

============para MongoDB=============
npx prisma db push

==========ejecutar o lanzar el proyecto===========
npm run start:dev

============para realizar las pruebas==========

npx ts-node test/users.test.ts

esto te enviara los tcp de: ejemplos

users.findAll
users.create
users.update
users.findOne
users.delete