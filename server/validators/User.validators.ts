import Joi, { ValidationResult } from 'joi';

export const usernameValidator = Joi.string()
  .required()
  .pattern(/(^[A-Za-z0-9]+(_|.)?[A-Za-z0-9]+$)/, 'Invalid username')
  .min(4)
  .max(50)
  .trim();

export const emailValidator = Joi.string()
  .required()
  .min(5)
  .max(100)
  .email({ minDomainSegments: 2 })
  .trim();

export const nameValidator = Joi.string().required().min(2).max(50).trim();

export const passwordValidator = Joi.string().required().min(6).max(50);

export const bioValidator = Joi.string().required().min(1).max(200).trim();

/**
 * @param user - express user
 */
export const validateUserSignup = (user: any): ValidationResult => {
  const SignupSchema = Joi.object({
    name: nameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator.valid(Joi.ref('password')),
    userType: Joi.string().required(),
    avatar: Joi.string(),
    createdAt: Joi.date().default(Date.now),
  });
  return SignupSchema.validate(user);
};

/**
 * @param user - express user
 * @param hasEmail - email is used for login
 */
export const validateUserLogin = (user: any): ValidationResult => {
  const emailSchema = Joi.object({
    email: emailValidator,
    password: passwordValidator,
  });
  return emailSchema.validate(user);
};

/**
 * @param username
 */
export const validateUsername = (username: string): ValidationResult => {
  const usernameSchema = usernameValidator;
  return usernameSchema.validate(username);
};

/**
 * @param name
 */
export const validateName = (name: string): ValidationResult => {
  const nameSchema = nameValidator;
  return nameSchema.validate(name);
};

/**
 * @param bio
 */
export const validateBio = (bio: string): ValidationResult => {
  const bioSchema = bioValidator;
  return bioSchema.validate(bio);
};

/**
 * @param email
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailSchema = emailValidator;
  return emailSchema.validate(email);
};
