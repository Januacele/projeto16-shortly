
import signUpSchema from '../schemas/signUpSchema.js';

export async function checkSignUp(req, res, next){
    const user = req.body;

    try {
        const { error } = signUpSchema.validate(user, {abortEarly: false});
        if(error){
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        }
        if(user.password !== user.confirmPassword){
            res.status(422).send("As senhas precisam ser idênticas");
            return; 
        }
        const query = `
            SELECT email FROM users
            WHERE email = $1
        `;
        const values = [user.email];
        
        const checkExists = await connection.query(query, values);
      
        if (checkExists) {
            res.status(409).send("Email já cadastrado");
            return;
        }
        
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();
}