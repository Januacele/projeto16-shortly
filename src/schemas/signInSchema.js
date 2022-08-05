import joi from 'joi';

const signUpSchema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().required()
});


export default signUpSchema;