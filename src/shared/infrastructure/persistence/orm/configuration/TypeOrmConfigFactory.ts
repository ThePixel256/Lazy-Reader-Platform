import {TypeOrmConfig} from "./extensions/TypeOrmConfig";
import appConfig from "../../../configuration/AppConfig";

export class TypeOrmConfigFactory {
    static createConfig(): TypeOrmConfig {
        return {
            host: appConfig.get('mysql.host'),
            port: appConfig.get('mysql.port'),
            username: appConfig.get('mysql.username'),
            password: appConfig.get('mysql.password'),
            database: appConfig.get('mysql.database')
        };
    }
}