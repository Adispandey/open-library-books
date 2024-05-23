export const MIN_LENGTH = 8
export const SPECIAL_CHARS_REGEX = /[!@#$%^&*(),.?":{}|<>]/
export const LOWERCASE_REGEX = /[a-z]/
export const UPPERCASE_REGEX = /[A-Z]/
export const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/
export const USERNAME_REGEX = /^(.{4,50})$/
export const NUMERIC_REGEX = /^\d*$/
export const NAME_REGEX = /^[A-Za-z][[a-z]{3,20}(?:\s[A-Za-z]+)?$/
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/