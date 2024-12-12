import express, {Application} from "express";
import {UserRepository} from "./iam/infrastructure/persistence/orm/repositories/UserRepository";
import {AppDataSource} from "./shared/infrastructure/configuration/Database";
import {UserCommandService} from "./iam/application/internal/commandservices/UserCommandService";
import {AuthenticationController} from "./iam/interfaces/rest/AuthenticationController";
import {swaggerConfig} from "./shared/infrastructure/documentation/SwaggerConfig";
import {BoardRepository} from "./board/infrastructure/persistence/orm/repositories/BoardRepository";
import {BoardCommandService} from "./board/application/internal/commandservices/BoardCommandService";
import {BoardQueryService} from "./board/application/internal/queryservices/BoardQueryService";
import {BoardController} from "./board/interfaces/rest/BoardController";
import {BoardMemberController} from "./board/interfaces/rest/BoardMemberController";
import {TaskRepository} from "./task/infrastructure/persistence/orm/repositories/TaskRepository";
import {TaskCommandService} from "./task/application/internal/commandservices/TaskCommandService";
import {TaskQueryService} from "./task/application/internal/queryservices/TaskQueryService";
import {TaskController} from "./task/interfaces/rest/TaskController";
import {ProfileRepository} from "./profile/infrastructure/persistence/orm/repositories/ProfileRepository";
import {ProfileCommandService} from "./profile/application/internal/commandservices/ProfileCommandService";
import {ProfileQueryService} from "./profile/application/internal/queryservices/ProfileQueryService";
import {ProfileController} from "./profile/interfaces/rest/ProfileController";
import {ProfileContextFacade} from "./profile/interfaces/acl/services/ProfileContextFacade";
import {ExternalProfileService} from "./iam/application/internal/outboundservices/acl/ExternalProfileService";
import {UnitOfWork} from "./shared/infrastructure/persistence/orm/repositories/UnitOfWork";

export const createApp = (): Application => {
    const app = express();

    // Enable CORS
    const cors = require('cors');
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express.json())

    // Dependencies
    const unitOfWork = new UnitOfWork(AppDataSource);

    const profileRepository = new ProfileRepository(AppDataSource);
    const profileCommandService = new ProfileCommandService(profileRepository);
    const profileQueryService = new ProfileQueryService(profileRepository);
    const profileContextFacade = new ProfileContextFacade(profileCommandService);
    const profileController = new ProfileController(profileCommandService, profileQueryService);

    const externalProfileService = new ExternalProfileService(profileContextFacade);
    const userRepository = new UserRepository(AppDataSource);
    const userCommandService = new UserCommandService(userRepository, externalProfileService, unitOfWork);
    //const userQueryService = new UserQueryService(userRepository);
    const userController = new AuthenticationController(userCommandService);

    const boardRepository = new BoardRepository(AppDataSource);
    const boardCommandService = new BoardCommandService(boardRepository);
    const boardQueryService = new BoardQueryService(boardRepository);
    const boardController = new BoardController(boardCommandService, boardQueryService);
    const boardMemberController = new BoardMemberController(boardCommandService, boardQueryService);

    const taskRepository = new TaskRepository(AppDataSource);
    const taskCommandService = new TaskCommandService(taskRepository);
    const taskQueryService = new TaskQueryService(taskRepository);
    const taskController = new TaskController(taskCommandService, taskQueryService);

    // Routes
    app.use('/api/v1/authentication', userController.getRoutes());
    app.use('/api/v1/boards', boardController.getRoutes());
    app.use('/api/v1/boards', boardMemberController.getRoutes());
    app.use('/api/v1/tasks', taskController.getRoutes());
    app.use('/api/v1/profiles', profileController.getRoutes());

    // Swagger UI
    swaggerConfig(app);

    return app;
}