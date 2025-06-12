import {Client} from 'pg';

const pgDatabase = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'hellen15v',
    database: 'proyectoFutbol',
});

pgDatabase.connect();

export default pgDatabase;

