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

export async function getShortUrl(req, res){
    const {id} = req.params;
    try {
        const queryShortUrl = `
            SELECT id, urls.short as "shortUrl", urls.url
            FROM urls
            WHERE id = $1
        `;
        const valueId = [id];
        const shortUrl = await db.query(queryShortUrl, valueId);
        const urlResult = shortUrl.rows[0];

        const response = {
            id: id,
            shortUrl: urlResult.shortUrl,
            url: urlResult.url
        };

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send("Erro inesperado ao buscar url pelo id");
        return;
    }
}

export async function redirect(req, res){
    const {shortUrl}= req.params;
    try {
        const queryUrl = `
        SELECT urls.id, urls.url, urls."visitCount"
        FROM urls
        WHERE short= $1
    `;
    const valuesUrl = [shortUrl];
    const urlQuery = await db.query(queryUrl, valuesUrl);
    const idUrl = urlQuery.rows[0].id;
    const originalUrl = urlQuery.rows[0].url;
    const newNumberVisits = urlQuery.rows[0].visitCount + 1;

    const queryVisits = `
    UPDATE urls
    SET "visitCount" = $1
    WHERE id = $2
`;
    const valuesVisits = [newNumberVisits, idUrl];
    await db.query(queryVisits, valuesVisits);

    res.redirect(originalUrl);
    
    } catch (error) {
        res.status(500).send("Erro inesperado ao redirecionar a url");
        return;
    }
}