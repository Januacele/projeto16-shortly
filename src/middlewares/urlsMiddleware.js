import db from '../db.js';
import urlSchema from '../schemas/urlSchema.js';


export async function checkToken(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer","").trim();

    if(!token){
        res.status(401).send("Usuário não tem permissão de acesso");
    }

    try {
        const queryToken = `
            SELECT * FROM sessions
            WHERE token = $1
        `;
        const values = [token];
        const checkExists = await db.query(queryToken, values);

        if(checkExists.rowCount === 0){
            res.status(401).send("Usuário não tem permissão de acesso");
            return;
        }

    } catch (error) {
        res.status(500).send("Erro inesperado na validação da sessão");
        return;
    }
    next()
}

export async function checkUrlSchema(req, res, next){
    const url = req.body;
    try {
        const { error } = urlSchema.validate(url, {abortEarly: false });
        if(error){
            res.status(422).send("Erro no envio na URL")
        } 
    } catch (error) {
        res.status(500).send("Erro inesperado na validação da sessão");
        return;
    }
    next();
}

export async function checkShortUrlById(req, res, next){
    const {id} = req.params;
    try {
        const queryShortExist = `
            SELECT short FROM urls
            WHERE id= $1
        `;
        const valueId = [id];
        const shortUrlExists = await db.query(queryShortExist, valueId)

        if(shortUrlExists.rowCount === 0){
            res.status(404).send("Url encurtada não existe");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação da url encurtada");
        return;
    }
    next();
}

export async function checkShortUrlExist(req, res, next){
    const {shortUrl} = req.params;
    try {
        const queryShortExist = `
            SELECT * FROM urls
            WHERE short= $1
        `;
        const valueId = [shortUrl];
        const shortUrlExists = await db.query(queryShortExist, valueId)

        if(shortUrlExists.rowCount === 0){
            res.status(404).send("Url encurtada não existe");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação da url encurtada");
        return;
    }
    next();
}

export async function checkUrlUser(req, res, next){
    const {id} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer","").trim();

    try {
        const queryUser = `
            SELECT sessions."userId" FROM sessions
            WHERE token = $1
        `;
        const valuesUser = [token];
        const queryCheckUser = await db.query(queryUser, valuesUser);
        const checkUserResult = queryCheckUser.rows[0].userId;

        const queryUrl = `
            SELECT urls."userId" FROM urls
            WHERE id = $1
        `;
        const valuesUrl = [id];
        const queryCheckUrl = await db.query(queryUrl, valuesUrl);
        const resultCheckUrl = queryCheckUrl.rows[0].userId;

        if(checkUserResult !== resultCheckUrl){
            res.status(401).send("A url não pertence a esse usuário");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação da url e usuario");
        return;
    }
    next();
}