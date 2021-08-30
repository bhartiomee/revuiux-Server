Dev Setup Steps
===========

Prerequisites: Need node.js version 14 to be installed

Steps to RunServer:

1. Run `npm install`
2. Setup your .env file in the format of .env.template
3. Run `sequelize db:migrate` to migrate your models to the mysql. Note: Make sure the database in your .env should be creted in the mysql. Nothing else need to be done in mysql.
4. Run `npm start` to start the server
