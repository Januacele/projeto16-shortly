import db from '../db.js';
import bcrypt from "bcrypt";

export async function register(req, res){
    const user = req.body;
    const salt = 10;
    try {
        const hashPassword = bcrypt.hashSync(user.password, salt);
        
        const query = `
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);
        `;
        const values = [user.name, user.email, hashPassword];
        await db.query(query, values);

        res.sendStatus(201);

    } catch (error) {
        console.log(error.message);
		res.status(500).send("Ocorreu um erro ao cadastrar usuário.");
    }
}
