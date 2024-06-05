const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/blogs', blogController.getAllBlogs);
router.post('/blogs', blogController.createBlog);
router.post('/comments', blogController.addComment);
router.delete('/comments/:commentId', blogController.deleteComment);

module.exports = router;
