import db from '../db.js';
import bcrypt from 'bcrypt';
import signUpSchema from '../schemas/signUpSchema.js';
import signInSchema from '../schemas/signInSchema.js';


export async function checkSignUpSchema(req, res, next){
    const user = req.body;
    try {
        const { error } = signUpSchema.validate(user, {abortEarly: false});
        if(error){
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        }       
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkConfirmPassword(req, res, next){
    const user = req.body;
    try {
        if(user.password !== user.confirmPassword){
            res.status(422).send("As senhas precisam ser idênticas");
            return; 
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkUniqueEmail(req, res, next){
    const user = req.body;
    try {
        const query = `
            SELECT email FROM users
            WHERE email = $1
        `;
        const values = [user.email];
        
        const checkExists = await db.query(query, values);
      
        if (checkExists.rowCount !== 0) {
            res.status(409).send("Email já cadastrado");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkSignInSchema(req, res, next){
    const user = req.body;
    try {
        const { error } = signInSchema.validate(user, {abortEarly: false});
        if(error){
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        }       
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkUserEmail(req, res, next){
    const user = req.body;
    try {
        const queryEmail = `
            SELECT email FROM users
            WHERE email = $1
        `;
        const valuesEmail = [user.email];
        const checkExistsEmail = await db.query(queryEmail, valuesEmail);

        if (checkExistsEmail.rowCount === 0) {
            res.status(401).send("Usuário não encontrado ou senha incorreta");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();
}

export async function checkUserPassword(req, res, next){
    const user = req.body;
    try {
        const queryPassword = `
            SELECT password FROM users
            WHERE email = $1
        `;
        const values = [user.email];
        const checkExistsPassword = await db.query(queryPassword, values);
        const hashPassword = checkExistsPassword.rows[0].password;

        const validation = bcrypt.compareSync(user.password, hashPassword);
      
        if (!validation) {
            res.status(401).send("Usuário não encontrado ou senha incorreta");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkUserId(req, res, next){
    const {id} = req.params;

    try {
        const queryId = `
            SELECT * FROM users
            WHERE id = $1
        `;
        const valuesId = [id];
        const checkExistsId = await db.query(queryId, valuesId);

        if(checkExistsId.rowCount === 0){
            res.status(404).send("Usuário não cadastrado no sistema")
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação do id.");
        return;
    }
    next();
}

export async function checkUserUrl(req, res, next){
    const {id} = req.params;

    try {
        const queryId = `
            SELECT * FROM urls
            WHERE "userId" = $1
        `;
        const valuesId = [id];
        const checkExistsId = await db.query(queryId, valuesId);

        if(checkExistsId.rowCount === 0){
            res.status(404).send("Usuário sem urls encurtadas")
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação do id.");
        return;
    }
    next();
}

export async function checkTokenIsFromUser(req, res, next){
    const {id} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer","").trim();

    try {
        const queryId = `
            SELECT * FROM sessions
            WHERE "userId" = $1
        `;
        const valuesId = [id];
        const result = await db.query(queryId, valuesId);
        const TokenUser = result.rows[0].token;

        if(token !== TokenUser){
            res.status(404).send("Você não tem acesso aos dados desse usuário");
        }
    } catch (error) {
        res.status(500).send("Erro inesperado ao pegar os dados do usuário");
        return;
    }
    next();
}