import {TypeOrmConfigFactory} from "../persistence/orm/configuration/TypeOrmConfigFactory";
import {DataSource} from "typeorm";
import {User} from "../../../iam/domain/model/aggregates/User";
import {Board} from "../../../board/domain/model/aggregates/Board";
import {Member} from "../../../board/domain/model/entities/Member";
import {Task} from "../../../task/domain/model/aggregates/Task";
import {Profile} from "../../../profile/domain/model/aggregates/Profile";

const config = TypeOrmConfigFactory.createConfig();

if (!config.host || !config.port || !config.username || !config.password || !config.database) {
    throw new Error('Database configuration is incomplete. Please check your configuration settings.');
}

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [User, Board, Member, Task, Profile],
    synchronize: true,
    logging: false
});

export const initializeDatabase = async (): Promise<void> =>{
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database', error );
        throw error;
    }
}