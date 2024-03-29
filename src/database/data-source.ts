import "reflect-metadata";
import { DataSource } from "typeorm";
import Moment from "../app/entities/Moment";
import Comment from "../app/entities/Comment";
import { CreateTableMoment1710426123074 } from "./migration/1710426123074-create_table_moment";
import { CreateTableComment1710426206231 } from "./migration/1710426206231-create_table_comment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Moment, Comment],
    subscribers: [],
    ssl: !!process.env.DATABASE_SLL, // Ativa o SSL
    extra: {
        options: {
            project: process.env.ENDPOINT_ID // apenas produção, pode remover para dev
        }
    },
    migrations: [
        CreateTableMoment1710426123074,
        CreateTableComment1710426206231
    ],
})
