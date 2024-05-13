import { DataSource } from "typeorm";
import dotenv from "dotenv"
import "reflect-metadata";

//---------------------------------------------------------

dotenv.config();

export const datasource = new DataSource({
    type:"mysql",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities: [`${__dirname}/../models/**/*{.ts, .js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts, .js}`],
})