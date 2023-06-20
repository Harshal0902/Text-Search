const { isValidObjectId } = require("mongoose");
const PostSchema = require("../models/PostSchema");
const { validatePost } = require("../validators/PostValidator");

module.exports.GetAllPosts = async (req, res) => {
  const data = await PostSchema.find().sort({ _id: -1 });
  return res.status(200).send({ data });
};

module.exports.GetPostDetailsById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: "Invalid Object Id " });
  }
  const data = await PostSchema.findById(id);

  if (!data) {
    return res.status(404).send({ message: "Post not found" });
  }
  return res.status(200).send({ data });
};

module.exports.DeletePostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: "Invalid Object Id " });
  }
  const data = await PostSchema.findOneAndDelete({ _id: id });

  if (data.rowCount === 0) {
    return res
      .status(404)
      .send({ message: "No Data Found To Delete With That Id" });
  }
  return res.status(200).send({ data });
};

module.exports.UpdatePostDetailsById = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: "Invalid Object Id " });
  }
  const { error, value } = validatePost({ body });

  if (error) {
    return res.status(400).send({ message: "InValid Form Data" });
  }
  const data = await PostSchema.findOneAndUpdate({ _id: id }, { ...value });

  if (!data) {
    res.status(404).send({ message: "No Data Found" });
  }

  return res.status(200).send({ data });
};

module.exports.AppPost = async (req, res) => {
  const { body } = req;

  //validate data body
  const { error, value } = validatePost({ body });
  if (error) {
    return res.send({ error, message: "Invalid form Data" });
  }

  const newPost = new PostSchema({ ...value });
  const post = await newPost.save();

  if (!post) {
    return res.send({ message: "Empty Post Object" });
  }
  res.status(200).send({ data: post, message: "Data Added Successfully" });
};

module.exports.SearchBlogPost = async (req, res) => {
  const searchText = String(req.body.search).trim();

  const posts = await PostSchema.find({
    $text: { $search: `${searchText}` },
  });

  res.status(200).json({ posts });
};