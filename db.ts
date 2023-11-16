import { NextResponse } from 'next/server';
import * as mysql from 'promise-mysql';


const dbsetting =  {
    host: 'localhost',
    port: 3306,
    database: 'itodo',
    user: 'itodoap',
    password: 'Dbadmin2'
}

export async function Dbquery(sql: string) {
    const connection = await mysql.createConnection({
        host: dbsetting.host,
        port: dbsetting.port,
        database: dbsetting.database,
        user: dbsetting.user,
        password: dbsetting.password,
    });
    const result = await connection.query(sql);
    connection.end();

    if(result == null || result == " " || result.length == 0) { 
        return null;
    }
    return result;
}