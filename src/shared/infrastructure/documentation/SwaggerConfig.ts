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
                schemas: {
                    BoardResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the board",
                                example: 1,
                            },
                            title: {
                                type: "string",
                                description: "The title of the board",
                                example: "My Board",
                            },
                            description: {
                                type: "string",
                                description: "A brief description of the board",
                                example: "This is my project board",
                            },
                            ownerId: {
                                type: "integer",
                                description: "The ID of the owner of the board",
                                example: 42,
                            },
                        },
                    },
                    CreateBoardResource: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                description: "The title of the board",
                                example: "My New Board",
                            },
                            description: {
                                type: "string",
                                description: "A brief description of the board",
                                example: "A board to manage tasks",
                            },
                            ownerId: {
                                type: "integer",
                                description: "The ID of the owner",
                                example: 1,
                            },
                        },
                    },
                    CreateMemberResource: {
                        type: "object",
                        properties: {
                            userId: {
                                type: "integer",
                                description: "The ID of the user to be added as a member",
                                example: 101,
                            },
                        },
                    },
                    MemberResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the member entry",
                                example: 1,
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user",
                                example: 101,
                            },
                            boardId: {
                                type: "integer",
                                description: "The ID of the board",
                                example: 42,
                            },
                        },
                    },
                    TaskResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the task",
                                example: 1,
                            },
                            title: {
                                type: "string",
                                description: "The title of the task",
                                example: "Complete the report",
                            },
                            description: {
                                type: "string",
                                description: "A brief description of the task",
                                example: "Complete the financial report for Q1",
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user assigned to the task",
                                example: 101,
                            },
                            boardId: {
                                type: "integer",
                                description: "The ID of the board associated with the task",
                                example: 42,
                            },
                            status: {
                                type: "string",
                                description: "The current status of the task",
                                example: "Pending",
                            },
                        },
                    },
                    CreateTaskResource: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                description: "The title of the task",
                                example: "Complete the report",
                            },
                            description: {
                                type: "string",
                                description: "A brief description of the task",
                                example: "Complete the financial report for Q1",
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user assigned to the task",
                                example: 101,
                            },
                            boardId: {
                                type: "integer",
                                description: "The ID of the board associated with the task",
                                example: 42,
                            },
                        },
                    },
                },
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