import joi from 'joi';

const urlSchema = joi.object({
    url: joi.string().trim().required()
});


export default urlSchema;