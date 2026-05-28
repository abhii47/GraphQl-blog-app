import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
if(DB_HOST === undefined || DB_NAME === undefined || DB_USER === undefined || DB_PASS === undefined) {
    throw new Error('environment variables must be defined');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
});

export default sequelize;