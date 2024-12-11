import {Application} from "express";
import AppConfig from "../configuration/AppConfig";

export function swaggerConfig(app: Application){
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
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    console.log('Swagger UI available at http://localhost:' + AppConfig.get('app.port') + '/api-docs');
}