const validationMiddleware = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
      }
      next();
    };
  };
  
  module.exports = validationMiddleware;
  