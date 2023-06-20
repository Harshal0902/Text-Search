const joi = require("joi");

module.exports.validatePost = ({ body }) => {
  const schema = joi.object({
    title: joi.string().required().label("Title"),
    description: joi.string().required().label("Description"),
    imageFileSet: joi.string().required().label("imageFileSet"),
    publishedAt: joi.date().default(Date.now()),
  });

  const response = schema.validate(body, { abortEarly: false });
  return response;
};