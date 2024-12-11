import convict from 'convict';
import path from 'path';

const AppConfig = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    app: {
        port: {
            doc: 'The port the app runs on',
            format: Number,
            default: 3000,
            env: 'APP_PORT',
        },
    },
    mysql: {
        host: {
            doc: 'The database host',
            format: String,
            default: 'localhost',
            env: 'MYSQL_HOST',
        },
        port: {
            doc: 'The database port',
            format: Number,
            default: 3306,
            env: 'MYSQL_PORT',
        },
        username: {
            doc: 'The database username',
            format: String,
            default: 'root',
            env: 'MYSQL_USERNAME',
        },
        password: {
            doc: 'The database password',
            format: String,
            default: 'root',
            env: 'MYSQL_PASSWORD',
        },
        database: {
            doc: 'The database name',
            format: String,
            default: 'taskwave',
            env: 'MYSQL_DATABASE',
        },
    },
});

AppConfig.loadFile(path.join(__dirname, 'environments', `${AppConfig.get('env')}.json`));


AppConfig.validate({ allowed: 'strict' });

export default AppConfig;
