//Validation
import Joi from '@hapi/joi'
//import {updateOne} from './model/User.js'


//Validate Register
export const registerValidation = (data) => {
    console.log(data);

    const toValidate = {
        name: data.user.name,
        email: data.user.email,
        password: data.user.password,
      //  address: data.user.address,
       // zipcode: data.user.zipcode,
       // phoneNumber: data.user.phoneNumber,
        userType: data.user.userType
    }

    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
  /*      address: Joi.string()
            .min(6),
        zipcode: Joi.number()
            .min(5)
            .required(),
        phoneNumber: Joi.number()
            .min(10)
            .required(),*/
        userType: Joi.number()
            .required(),
    });


    return schema.validate(toValidate);
};

//Validate Login
export const loginValidation = (data) => {

    const toValidate = {
        email: data.user.email,
        password: data.user.password
    }

    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(toValidate);
};

//Validate Email
export const updateEmailValidation = (data) => {

    const toValidate = {
        email: data.email
    };

    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
    });

    return schema.validate(toValidate);
};

//Validate Password
export const UpdatePasswordValidation = (data) => {

    const toValidate = {
        password: data.pass
    };

    const schema = Joi.object({
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(toValidate);
};

//valiate zipcode
export const zipcodeValidation = (data) => {

    const toValidate = {
        zipcode: data.zipcode
    };

    const schema = Joi.object({
        zipcode: Joi.number()
            .min(5)
            .required()
    });
    return schema.validate(toValidate);
};

//valiate Address
export const addressValidation = (data) => {

    const toValidate = {
        address: data.address
    };

    const schema = Joi.object({
        address: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(toValidate);
};

//valiate phone number
export const phoneNumberValidation = (data) => {

    const toValidate = {
        phoneNumber: data.phoneNumber
    };

    const schema = Joi.object({
        phoneNumber: Joi.number()
            .min(10)
            .required()
    });
    return schema.validate(toValidate);
};