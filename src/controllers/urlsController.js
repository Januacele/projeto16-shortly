import db from '../db.js';
import { nanoid } from 'nanoid';


export async function shortenUrl(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer","").trim();
    const { url } = req.body;

    const shortUrl = nanoid();

    try {
        const queryUserId = `
            SELECT "userId" FROM sessions
            WHERE token = $1
        `;
        const valueUserId = [token];
        const userIdResult = await db.query(queryUserId, valueUserId);
        const userId = userIdResult.rows[0].userId;

        const queryShotenUrl = `
            INSERT INTO urls (url, short, "userId")
            VALUES ($1, $2, $3) 
        `;
        const valuesShortenUrl = [url, shortUrl, userId];
        await db.query(queryShotenUrl,valuesShortenUrl);

        const response = {
            shortUrl:shortUrl
        };

        res.status(201).send(response);
        
    } catch (error) {
        res.status(500).send("Erro inesperado na validação da url");
        return;
    }

}