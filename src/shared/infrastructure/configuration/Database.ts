import {TypeOrmConfigFactory} from "../persistence/orm/configuration/TypeOrmConfigFactory";
import {DataSource} from "typeorm";
import {User} from "../../../iam/domain/model/aggregates/User";

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
    entities: [User],
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