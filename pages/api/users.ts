import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from "crypto";
 
import { NextResponse } from 'next/server';
import { Dbquery } from '../../db';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(Dbquery("select * from users"));
    }

    if (req.method === 'POST') {
        const reqbody = JSON.parse(JSON.stringify(req.body));
        res.status(200).json(Dbquery(
            "insert into users (uuid, oauthid, vender, created_at) values ('"
             + randomUUID() + "', '" 
             + "', '" 
             + "1'," 
             + "now());"));
    }
}