const Blog = require('../models/blog');
const Comment = require('../models/comment');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ include: Comment });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const newBlog = await Blog.create({ title, author, content });
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    const blog = await Blog.findByPk(blogId);
    if (blog) {
      const comment = await Comment.create({ text, BlogId: blogId });
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.destroy({ where: { id: commentId } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Updated Code

/*
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ include: Comment });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const newBlog = await Blog.create({ title, author, content });
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    const blog = await Blog.findByPk(blogId);
    if (blog) {
      const comment = await Comment.create({ text, BlogId: blogId });
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/