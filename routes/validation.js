// Validation
const Joi = require('@hapi/joi');

// Register Validation
const register_val = (data) => {
	const schema = {
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	};
	return Joi.validate(data, schema);
};

// Login Validation
const login_val = (data) => {
	const schema = {
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	};
	return Joi.validate(data, schema);
};

module.exports.register_val = register_val;
module.exports.login_val = login_val;
