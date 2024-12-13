import {Application} from "express";
import AppConfig from "../configuration/AppConfig";

export function swaggerConfig(app: Application){
    const swaggerJsDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Task API',
                description: 'A simple API to manage tasks and boards',
                version: '1.0.0',
                license: {
                    name: 'MIT',
                    url: 'https://spdx.org/licenses/MIT.html',
                },
            },
            components: {
                schemas: {
                    SignInResource: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string",
                                description: "The username of the user",
                                example: "john_doe",
                            },
                            password: {
                                type: "string",
                                description: "The password of the user",
                                example: "password123",
                            },
                        },
                        required: ["username", "password"],
                    },
                    SignUpResource: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string",
                                description: "The username of the user",
                                example: "john_doe",
                            },
                            password: {
                                type: "string",
                                description: "The password of the user",
                                example: "password123",
                            },
                            firstName: {
                                type: "string",
                                description: "The first name of the user",
                                example: "John",
                            },
                            lastName: {
                                type: "string",
                                description: "The last name of the user",
                                example: "Doe",
                            },
                            email: {
                                type: "string",
                                description: "The email address of the user",
                                example: "john.doe@example.com",
                            }
                        },
                        required: ["username", "password", "firstName", "lastName", "email", "userId"],
                    },
                    AuthenticatedUserResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the authenticated user",
                                example: 1,
                            },
                            username: {
                                type: "string",
                                description: "The username of the authenticated user",
                                example: "john_doe",
                            },
                            token: {
                                type: "string",
                                description: "The authentication token for the user",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                            },
                        },
                    },
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
                    UpdateTaskResource: {
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
                            status: {
                                type: "string",
                                description: "The current status of the task",
                                example: "Pending",
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user assigned to the task",
                                example: 101,
                            },
                        },
                    },
                    UserResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the user",
                                example: 1,
                            },
                            username: {
                                type: "string",
                                description: "The username of the user",
                                example: "john_doe",
                            },
                            email: {
                                type: "string",
                                description: "The email address of the user",
                                example: "john_doe@example.com"
                            }
                        },
                    },
                    ProfileResource: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The ID of the profile",
                                example: 1,
                            },
                            firstName: {
                                type: "string",
                                description: "The first name of the user",
                                example: "John",
                            },
                            lastName: {
                                type: "string",
                                description: "The last name of the user",
                                example: "Doe",
                            },
                            email: {
                                type: "string",
                                description: "The email address of the user",
                                example: "john.doe@example.com",
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user associated with this profile",
                                example: 101,
                            },
                        },
                    },
                    CreateProfileResource: {
                        type: "object",
                        properties: {
                            firstName: {
                                type: "string",
                                description: "The first name of the user",
                                example: "John",
                            },
                            lastName: {
                                type: "string",
                                description: "The last name of the user",
                                example: "Doe",
                            },
                            email: {
                                type: "string",
                                description: "The email address of the user",
                                example: "john.doe@example.com",
                            },
                            userId: {
                                type: "integer",
                                description: "The ID of the user associated with this profile",
                                example: 101,
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