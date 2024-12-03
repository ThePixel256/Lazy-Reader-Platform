import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: 'junction.proxy.rlwy.net',
    username: 'root',
    password: 'iSQQhWkSiLgCiQnNQOeucAWeYjTjbBlQ',
    database: 'taskwave',
    dialect: 'mysql',
    port: 38930
});

export default sequelize