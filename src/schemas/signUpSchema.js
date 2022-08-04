import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});


export default signUpSchema;