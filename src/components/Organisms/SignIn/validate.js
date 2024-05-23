import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "./regex";

export const validateField = (val, field) => {
  switch (field) {
    case "name":
      return !NAME_REGEX.test(val);
    case "email":
      return !EMAIL_REGEX.test(val);
    case "password":
      return !PASSWORD_REGEX.test(val);
  }
};

