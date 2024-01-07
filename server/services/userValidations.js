import Joi from 'joi';

export const validateRegister = (reqBody) => {
    const joiSchema = Joi.object({
        firstName:Joi.string().min(2).max(50).required(),
        lastName:Joi.string().min(2).max(50).required(),
        email:Joi.string().min(5).max(150).email().required(),
        password:Joi.string().min(3).max(16).required(),
        location:Joi.string().min(2).max(30),
        occupation:Joi.string().min(2).max(30),
    })
    return joiSchema.validate(reqBody)
}

export const validateLogin = (reqBody) => {
    const joiSchema = Joi.object({
        email:Joi.string().min(5).max(150).email().required(),
        password:Joi.string().min(3).max(16).required(),
    })
    return joiSchema.validate(reqBody)
}