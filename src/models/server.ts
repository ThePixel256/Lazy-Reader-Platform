import express, { Application } from 'express';
import RUser from '../routes/user';
import RTask from '../routes/task';
import { User } from './user';
import {Task} from "./task";

class Server{

    private app:Application;
    private port: string ;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.router();
        this.setupSwagger();
        this.DBconnect();
        this.listen();
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Estar corriendo por el puerto: "+this.port);
        })
    }

    router(){
        this.app.use(RUser)
        this.app.use(RTask)
    }

    middlewares(){
        const cors = require('cors');
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        this.app.use(express.json())
    }

    setupSwagger() {
        const swaggerJsDoc = require('swagger-jsdoc');
        const swaggerUi = require('swagger-ui-express');

        const swaggerOptions = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'SHOP API',
                    version: '1.0.0',
                    license: {
                        name: 'MIT',
                        url: 'https://spdx.org/licenses/MIT.html',
                    },
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                            description: 'Enter your Bearer Token in the format: Bearer <token>',
                        },
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
            },
            apis: ['./**/*.ts'], // Rutas a tus archivos de rutas o controladores con comentarios Swagger
        };

        const specs = swaggerJsDoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

        console.log('Swagger UI available at http://localhost:' + this.port + '/api-docs');
    }

    async DBconnect(){
        try {
            await User.sync();
            console.log('The table for the User model was just (re)created!');
            await Task.sync();
            console.log('The table for the Task model was just (re)created!');
            console.log("Conexion exitosa")
        } catch (error) {
            console.log("Error de conexion: ", error);
        }
    }
}

export default Server