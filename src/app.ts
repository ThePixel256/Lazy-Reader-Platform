import express, {Application} from "express";
import {UserRepository} from "./iam/infrastructure/persistence/orm/repositories/UserRepository";
import {AppDataSource} from "./shared/infrastructure/configuration/Database";
import {UserCommandService} from "./iam/application/internal/commandservices/UserCommandService";
import {UserQueryService} from "./iam/application/internal/queryservices/UserQueryService";
import {AuthenticationController} from "./iam/interfaces/rest/AuthenticationController";
import {swaggerConfig} from "./shared/infrastructure/documentation/SwaggerConfig";

export const createApp = (): Application => {
    const app = express();

    // Enable CORS
    const cors = require('cors');
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express.json())

    // Dependencies
    const userRepository = new UserRepository(AppDataSource);
    const userCommandService = new UserCommandService(userRepository);
    const userQueryService = new UserQueryService(userRepository);
    const userController = new AuthenticationController(userCommandService);

    // Routes
    app.use('/api/v1/authentication', userController.getRoutes());

    // Swagger UI
    swaggerConfig(app);

    return app;
}