const Joi = require("joi");

const user_validation = async (body) => {
  const schema = Joi.object({
    login_type: Joi.string().valid("cnic", "email").required(),
    cnic: Joi.string()
      .when("login_type", {
        is: "cnic",
        then: Joi.required(),
      })
      .min(13),
    email: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().email().min(5).max(255),
    }),

    first_name: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(3).max(255),
    }),
    last_name: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(3).max(255),
    }),
    contact_number: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(10).max(11),
    }),
    password: Joi.string().required(),
  });
  return schema.validate(body);
};

const login_validation = async (body) => {
  const schema = Joi.object({
    login_type: Joi.string().valid("cnic", "email").required(),
    cnic: Joi.string()
      .when("login_type", {
        is: "cnic",
        then: Joi.required(),
      })
      .min(13),
    email: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().email().min(5).max(255),
    }),

    password: Joi.string().required(),
  });
  return schema.validate(body);
};

function update_user_profile_validation(body) {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(255),
    last_name: Joi.string().required().min(3).max(255),
    contact_number: Joi.string().required().min(10).max(11),
  });
  return schema.validate(body);
}

function change_password_validation(body) {
  const schema = Joi.object({
    old_password: Joi.string().required().min(3).max(255),
    new_password: Joi.string().required().min(3).max(255),
    confirm_password: Joi.string().required(),
  });
  return schema.validate(body);
}

function reset_password_validation(body) {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(255),
    code: Joi.string().required().min(3).max(255),
    password: Joi.string().required().min(3).max(255),
  });
  return schema.validate(body);
}

module.exports = {
  user_validation,
  login_validation,
  update_user_profile_validation,
  change_password_validation,
  reset_password_validation,
};
