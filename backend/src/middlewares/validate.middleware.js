import { sendError } from "../helpers/response.helper.js";

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return sendError(
        res,
        400,
        "Validation failed",
        error.details.map((detail) => detail.message)
      );
    }

    next();
  };
};

export default validate;