import validator from 'validator'

export default {
  isValidEmail:(email) => validator.isEmail(email),
  isValidPassword: (pass) => pass.length >= 6
}

