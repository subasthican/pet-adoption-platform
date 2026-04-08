import { sendError } from "../helpers/response.helper.js";

const notFound = (req, res) => {
  return sendError(res, 404, `Route not found: ${req.originalUrl}`);
};

export default notFound;