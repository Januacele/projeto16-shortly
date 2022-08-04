
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
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();
}