const express = require("express");
const {
  GetAllPosts,
  GetPostDetailsById,
  DeletePostById,
  UpdatePostDetailsById,
  SearchBlogPost,
  AppPost,
} = require("../controller/PostController");
const router = express.Router();

router.get("/", GetAllPosts);
router.get("/:id", GetPostDetailsById);
router.delete("/:id", DeletePostById);
router.put("/:id", UpdatePostDetailsById);
router.post("/search", SearchBlogPost);
router.post("/", AppPost);

module.exports = router;