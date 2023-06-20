const { Schema, model } = require("mongoose");

const required = true;
const schema = Schema({
  title: { type: String, required },
  description: { type: String, required },
  imageFileSet: { type: String, required },
  publishedAt: { type: Date, default: Date.now() },
});

module.exports = model("posts", schema);